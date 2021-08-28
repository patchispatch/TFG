from datetime import date
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import mixins, viewsets, status
from drf_spectacular.utils import extend_schema, OpenApiParameter
from drf_spectacular.types import OpenApiTypes
from rest_framework.views import APIView
from core.models.settings import Settings

from core.types import ObjectiveFilter
from .models import *
from .serializers import *

# Create your views here:

# Objective endpoints
class ObjectiveViewSet(viewsets.ModelViewSet):
    queryset = Objective.objects.all()
    serializer_class = ObjectiveSerializer

    @extend_schema(
        parameters=[
            OpenApiParameter(
                name='idlist',
                type=OpenApiTypes.STR,
                location=OpenApiParameter.QUERY,
                description='''Filter by objective IDs, separated by commas'''
            ),
            OpenApiParameter(
                name='filter',
                type=OpenApiTypes.STR,
                location=OpenApiParameter.QUERY,
                description='''Filter by one of the following values:
                - "active": returns active objectives
                - "paused": returns paused objectives
                - "in-progress": returns the objectives that are in progress
                - "completed": returns the objectives that are completed'''
            ),
            OpenApiParameter(
                name='category',
                type=OpenApiTypes.INT,
                location=OpenApiParameter.QUERY,
                description='''Filter by category ID'''
            ),
        ]
    )
    def list(self, request):
        if 'idlist' in request.query_params:
            id_list = list(map(int, request.query_params.get('idlist').split(',')))

            objectives = Objective.objects.filter(id__in=id_list)
        else:
            objectives = Objective.objects.all()

        if 'category' in request.query_params:
            objectives = objectives.filter(category_id__id=request.query_params.get('category'))
        
        if 'filter' in request.query_params:
            filter = request.query_params.get('filter')
            
            if filter in set(item.value for item in ObjectiveFilter):
                if filter == 'active':
                    objectives = objectives.filter(paused=False)
                elif filter == 'paused':
                    objectives = objectives.filter(paused=True)
                elif filter == 'in-progress':
                    objectives = [obj for obj in objectives if not obj.is_complete()]
                elif filter == 'completed':
                    objectives = [obj for obj in objectives if obj.is_complete()]
            else:
                return Response(status=status.HTTP_400_BAD_REQUEST)

        serializer = ObjectiveSerializer(objectives, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    # ObjectiveEntry 'shortcut' endpoints
    @action(detail=True, serializer_class=ObjectiveEntrySerializerInput, methods=['get', 'post'])
    def entries(self, request, pk=None):
        if request.method == 'GET':
            objective_entries = ObjectiveEntry.objects.select_related('objective').filter(objective_id=pk)
            serializer = ObjectiveEntrySerializer(objective_entries, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        elif request.method == 'POST':
            # Add objective id to data
            patched_data = request.data.copy()
            patched_data['objective_id'] = int(pk)

            serializer = ObjectiveEntrySerializer(data=patched_data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)   

    @action(detail=True, methods=['get'], url_path='pause-resume')
    def pause_resume(self, request, pk=None):
        objective = Objective.objects.get(id=pk)
        objective.pause_resume()

        serializer = ObjectiveSerializer(objective)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(detail=False, methods=['GET'])
    def suggestions(self, request):
        objectives = [obj for obj in Objective.objects.all() if not obj.is_complete()]
        objectives.sort(key=lambda t: t.progress)
        suggestions = objectives[::len(objectives)-1]

        serializer = ObjectiveSerializer(suggestions, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


# ObjectiveEntry endpoints
class ObjectiveEntryViewSet(viewsets.ModelViewSet):
    queryset = ObjectiveEntry.objects.all()
    serializer_class = ObjectiveEntrySerializer

    @extend_schema(
        parameters=[
            OpenApiParameter(
                name='date',
                type=OpenApiTypes.DATE,
                location=OpenApiParameter.QUERY,
                description='Filter by entry date'
            ),
            OpenApiParameter(
                name='category',
                required=False,
                type=OpenApiTypes.INT,
                location=OpenApiParameter.QUERY,
                description='Filter results by category.'
            )
        ]
    )
    def list(self, request):
        if 'date' in request.query_params:
            entries = ObjectiveEntry.objects.filter(date__date=request.query_params.get('date'))
        else:
            entries = ObjectiveEntry.objects.all()

        if 'category' in request.query_params:
            entries = entries.filter(objective_id__category_id_id=request.query_params['category'])

        serializer = ObjectiveEntrySerializer(entries, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    @extend_schema(
        parameters=[
            OpenApiParameter(
                name='month',
                required=False,
                type=OpenApiTypes.INT,
                location=OpenApiParameter.QUERY,
                description='Get the days which have entries for the specified month in number format, from 1 to 12).\
                    If not specified, selects the current month.'
            ),
            OpenApiParameter(
                name='category',
                required=False,
                type=OpenApiTypes.INT,
                location=OpenApiParameter.QUERY,
                description='Filter results by category.'
            )
        ],
        
        responses={201: ObjectiveEntryDaysSerializer, 400: None}
    )
    @action(detail=False, methods=['get'], url_path='days')
    def entry_days(self, request):
        if 'month' not in request.query_params:
            month = date.today().month
        elif 1 <= int(request.query_params['month']) <= 12:
            month = request.query_params['month']
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        
        entries = ObjectiveEntry.objects.filter(date__month=month)

        if 'category' in request.query_params:
            entries = entries.filter(objective_id__category_id_id=request.query_params['category'])

        days = []
        for entry in entries:
            days.append(entry.date.day)
        
        # Remove duplicates
        days = list(dict.fromkeys(days))

        serializer = ObjectiveEntryDaysSerializer({'days': days})
        return Response(serializer.data, status=status.HTTP_200_OK)


# Category endpoints
class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


# Activity endpoints
class ActivityViewSet(viewsets.ModelViewSet):
    queryset = Activity.objects.all()
    serializer_class = ActivitySerializer


# Activity endpoints
class ActivityInstanceViewSet(viewsets.ModelViewSet):
    queryset = ActivityInstance.objects.all()
    serializer_class = ActivityInstanceSerializer

# Settings endpoints
class SettingsViewSet(viewsets.GenericViewSet):
    queryset = Settings.objects.all()
    serializer_class = SettingsSerializer

    @action(detail=False, methods=['get'])
    def get(self, request):
        settings = Settings.objects.first()
        serializer = SettingsSerializer(settings)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    @action(detail=False, methods=['put'], url_path='update')
    def upd(self, request):
        settings = Settings.objects.first()
        serializer = SettingsSerializer(data=request.data)
        if serializer.is_valid():
            settings.weekly_reset_day = serializer.data['weekly_reset_day']
            settings.theme = serializer.data['theme']
            settings.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
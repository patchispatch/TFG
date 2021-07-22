from django.utils.decorators import method_decorator
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import viewsets, status
from drf_spectacular.utils import extend_schema, OpenApiParameter
from drf_spectacular.types import OpenApiTypes
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
                description='Filter by objective IDs, separated by commas'
            )
        ]
    )
    def list(self, request):
        if 'idlist' in request.query_params:
            id_list = list(map(int, request.query_params.get('idlist').split(',')))

            objectives = Objective.objects.filter(id__in=id_list)
        else:
            objectives = Objective.objects.all()

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
            )
        ]
    )
    def list(self, request):
        if 'date' in request.query_params:
            entries = ObjectiveEntry.objects.filter(date__date=request.query_params.get('date'))
        else:
            entries = ObjectiveEntry.objects.all()

        serializer = ObjectiveEntrySerializer(entries, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


# Category endpoints
class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer



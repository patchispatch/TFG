from django.utils.decorators import method_decorator
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import viewsets, status
from .models import *
from .serializers import *

# Create your views here:

# Objective endpoints
class ObjectiveViewSet(viewsets.ModelViewSet):
    queryset = Objective.objects.all()
    serializer_class = ObjectiveSerializer

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

    @action(detail=True, methods=['get'])
    def progress(self, request, pk=None):
        objective = Objective.objects.get(id=pk)
        return Response({'progress': objective.progress()}, status=status.HTTP_200_OK)

    @action(detail=True, methods=['get'], url_path='pause-resume')
    def pause_resume(self, request, pk=None):
        objective = Objective.objects.get(id=pk)
        objective.pause_resume()

        serializer = ObjectiveSerializer(objective)
        return Response(serializer.data, status=status.HTTP_200_OK)


# ObjectiveEntry endpoints
@method_decorator(name='list', decorator=extend_schema(
    operation_description="Get a list of objective entries"
))
@method_decorator(name='retrieve', decorator=extend_schema(
    operation_description="Get an objective entry by ID"
))
@method_decorator(name='create', decorator=extend_schema(
    operation_description="Create a new objective entry"
))
@method_decorator(name='update', decorator=extend_schema(
    operation_description="Update an existing objective entry"
))
@method_decorator(name='partial_update', decorator=extend_schema(
    operation_description="Partially update an existing objective entry"
))
@method_decorator(name='destroy', decorator=extend_schema(
    operation_description="Delete an objective entry by ID"
))
class ObjectiveEntryViewSet(viewsets.ModelViewSet):
    queryset = ObjectiveEntry.objects.all()
    serializer_class = ObjectiveEntrySerializer

    def list(self, request):
        if 'date' in request.query_params:
            entries = ObjectiveEntry.objects.filter(date=request.query_params.get('date'))
        else:
            entries = ObjectiveEntry.objects.all()

        serializer = ObjectiveEntrySerializer(entries, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


# Category endpoints
@method_decorator(name='list', decorator=extend_schema(
    operation_description="Get a list of all categories"
))
@method_decorator(name='retrieve', decorator=extend_schema(
    operation_description="Get a category by ID"
))
@method_decorator(name='create', decorator=extend_schema(
    operation_description="Create a new category"
))
@method_decorator(name='update', decorator=extend_schema(
    operation_description="Update an existing category"
))
@method_decorator(name='partial_update', decorator=extend_schema(
    operation_description="Partially update an existing category"
))
@method_decorator(name='destroy', decorator=extend_schema(
    operation_description="Delete a category by ID"
))
class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer



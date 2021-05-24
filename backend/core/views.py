from django.utils.decorators import method_decorator
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.reverse import reverse
from rest_framework import viewsets, status
from drf_yasg.utils import swagger_auto_schema
from .utils import EnablePartialUpdateMixin
from .models import *
from .serializers import *

# Create your views here:

# Objective endpoints
@method_decorator(name='list', decorator=swagger_auto_schema(
    operation_description="Get a list of all objectives"
))
@method_decorator(name='retrieve', decorator=swagger_auto_schema(
    operation_description="Get an objective by ID"
))
@method_decorator(name='create', decorator=swagger_auto_schema(
    operation_description="Create a new objective"
))
@method_decorator(name='update', decorator=swagger_auto_schema(
    operation_description="Update an existing objective"
))
@method_decorator(name='partial_update', decorator=swagger_auto_schema(
    operation_description="Partially update an existing objective"
))
@method_decorator(name='destroy', decorator=swagger_auto_schema(
    operation_description="Delete an objective by ID"
))
class ObjectiveViewSet(viewsets.ModelViewSet):
    queryset = Objective.objects.all()
    serializer_class = ObjectiveSerializer

    # ObjectiveEntry endpoints

    @action(detail=False)
    def entries(self, request, pk=None):
        objective_entries = ObjectiveEntry.objects.select_related('objective_id').get(id=pk)
        serializer = ObjectiveEntrySerializer(objective_entries, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)


# Category endpoints
@method_decorator(name='list', decorator=swagger_auto_schema(
    operation_description="Get a list of all categories"
))
@method_decorator(name='retrieve', decorator=swagger_auto_schema(
    operation_description="Get a category by ID"
))
@method_decorator(name='create', decorator=swagger_auto_schema(
    operation_description="Create a new category"
))
@method_decorator(name='update', decorator=swagger_auto_schema(
    operation_description="Update an existing category"
))
@method_decorator(name='partial_update', decorator=swagger_auto_schema(
    operation_description="Partially update an existing category"
))
@method_decorator(name='destroy', decorator=swagger_auto_schema(
    operation_description="Delete a category by ID"
))
class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = ObjectiveSerializer



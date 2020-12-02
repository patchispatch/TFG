from rest_framework.response import Response
from rest_framework.reverse import reverse
from rest_framework import viewsets
from .models import *
from .serializers import *

# Create your views here:

class ActivityViewSet(viewsets.ModelViewSet):
    queryset = Activity.objects.all()
    serializer_class = ActivitySerializer
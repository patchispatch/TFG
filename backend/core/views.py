from rest_framework import viewsets
from .models import *
from .serializers import *

# Create your views here.
class ActivityView(viewsets.ModelViewSet):
    serializer_class = ActivitySerializer
    queryset = Activity.objects.all()
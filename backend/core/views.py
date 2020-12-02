from rest_framework import generics
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse
from .models import *
from .serializers import *

# Create your views here:
@api_view(['GET', 'POST'])
def api_root(request, format=None):
    return Response({
        'activities': reverse('activity-list', request=request, format=format),
    })

class ActivityList(generics.ListCreateAPIView):
    queryset = Activity.objects.all()
    serializer_class = ActivitySerializer

class ActivityDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Activity.objects.all()
    serializer_class = ActivitySerializer
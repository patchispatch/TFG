from django.contrib import admin
from django.urls import path, include
from rest_framework.urlpatterns import format_suffix_patterns
from core import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('activities/', views.ActivityList),
    path('activities/<int:pk>', views.ActivityDetail)
]

urlpatterns = format_suffix_patterns(urlpatterns)

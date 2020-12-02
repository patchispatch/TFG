from django.contrib import admin
from django.urls import path, include
from rest_framework.urlpatterns import format_suffix_patterns
from core import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.api_root, name='api-root'),
    path('activities/', views.ActivityList.as_view(), name='activity-list'),
    path('activities/<int:pk>', views.ActivityDetail.as_view(), name='activity-detail'),
]

urlpatterns = format_suffix_patterns(urlpatterns)

from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework import permissions

from core import views


router = DefaultRouter()
router.register(r'objectives', views.ObjectiveViewSet)
router.register(r'categories', views.CategoryViewSet)
router.register(r'objective-entries', views.ObjectiveEntryViewSet)

urlpatterns = [
    # Swagger UI
    # TODO: config drf-spectacular swagger and redoc views

    # Admin site
    path('admin/', admin.site.urls),

    # Root
    path('', include(router.urls)),
]

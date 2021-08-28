from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from drf_spectacular.views import SpectacularSwaggerView, SpectacularAPIView

from core import views


router = DefaultRouter()
router.register(r'objectives', views.ObjectiveViewSet)
router.register(r'categories', views.CategoryViewSet)
router.register(r'objective-entries', views.ObjectiveEntryViewSet)
router.register(r'activities', views.ActivityViewSet)
router.register(r'activity-instances', views.ActivityInstanceViewSet)
router.register(r'settings', views.SettingsViewSet)

urlpatterns = [
    # Docs
    path('schema', SpectacularAPIView.as_view(), name='schema'),
    path('swagger/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger'),

    # Admin site
    path('admin/', admin.site.urls),

    # Root
    path('', include(router.urls)),
]

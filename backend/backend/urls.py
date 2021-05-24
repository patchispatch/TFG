from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

from core import views


router = DefaultRouter()
router.register(r'objectives', views.ObjectiveViewSet)
router.register(r'categories', views.CategoryViewSet)

schema_view = get_schema_view(
    openapi.Info(
        title="TFG API",
        default_version='v1',
        description="API para la aplicación propuesta como TFG",
    ),
    public=True,
    permission_classes=[permissions.AllowAny],
)

urlpatterns = [
    # Swagger UI
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),

    # Admin site
    path('admin/', admin.site.urls),

    # Root
    path('', include(router.urls)),
]

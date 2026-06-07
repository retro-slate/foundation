from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter

from regions.views import RegionViewSet
from entities.views import EntityViewSet


router = DefaultRouter()
router.register(r"regions", RegionViewSet, basename="region")
router.register(r"entities", EntityViewSet, basename="entity")


urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include(router.urls)),
]
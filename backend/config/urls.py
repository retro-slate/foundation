from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter

from regions.views import RegionViewSet
from entities.views import EntityViewSet
from projects.views import ProjectViewSet, EventViewSet
from reports.views import ReportViewSet


router = DefaultRouter()
router.register(r"regions", RegionViewSet, basename="region")
router.register(r"entities", EntityViewSet, basename="entity")
router.register(r"projects", ProjectViewSet, basename="project")
router.register(r"events", EventViewSet, basename="event")
router.register(r"reports", ReportViewSet, basename="report")


urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include(router.urls)),
]
from rest_framework import serializers
from .models import Region


class RegionSerializer(serializers.ModelSerializer):
    parent_region_name = serializers.CharField(
        source="parent_region.name",
        read_only=True,
    )

    class Meta:
        model = Region
        fields = [
            "id",
            "name",
            "slug",
            "region_type",
            "parent_region",
            "parent_region_name",
            "description",
            "latitude",
            "longitude",
            "geojson_boundary",
            "current_ghi_score",
            "data_status",
            "created_at",
            "updated_at",
        ]
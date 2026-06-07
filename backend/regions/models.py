from django.db import models


class Region(models.Model):
    class RegionType(models.TextChoices):
        COUNTRY = "country", "Country"
        STATE = "state", "State / Province"
        DISTRICT = "district", "District"
        CITY = "city", "City"

    class DataStatus(models.TextChoices):
        VERIFIED = "verified", "Verified"
        PARTIAL = "partial", "Partial"
        ESTIMATED = "estimated", "Estimated"
        PLACEHOLDER = "placeholder", "Placeholder"
        ARCHIVED = "archived", "Archived"

    name = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255, unique=True)

    region_type = models.CharField(
        max_length=20,
        choices=RegionType.choices,
    )

    parent_region = models.ForeignKey(
        "self",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="child_regions",
    )

    description = models.TextField(blank=True)

    latitude = models.DecimalField(
        max_digits=9,
        decimal_places=6,
        null=True,
        blank=True,
    )
    longitude = models.DecimalField(
        max_digits=9,
        decimal_places=6,
        null=True,
        blank=True,
    )

    geojson_boundary = models.JSONField(null=True, blank=True)

    current_ghi_score = models.DecimalField(
        max_digits=5,
        decimal_places=2,
        null=True,
        blank=True,
    )

    data_status = models.CharField(
        max_length=20,
        choices=DataStatus.choices,
        default=DataStatus.PLACEHOLDER,
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["name"]

    def __str__(self):
        return self.name
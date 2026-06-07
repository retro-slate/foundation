from django.db import models


class Report(models.Model):
    class ReportType(models.TextChoices):
        ENVIRONMENTAL = "environmental", "Environmental"
        ANIMAL_WELFARE = "animal_welfare", "Animal Welfare"
        COMMUNITY = "community", "Community"
        GOVERNANCE = "governance", "Governance"
        ECONOMIC = "economic", "Economic"
        RESEARCH = "research", "Research"
        TRANSPARENCY = "transparency", "Transparency"
        ANNUAL = "annual", "Annual"

    title = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255, unique=True)

    summary = models.TextField(blank=True)
    content = models.TextField(blank=True)

    report_type = models.CharField(
        max_length=30,
        choices=ReportType.choices,
    )

    region = models.ForeignKey(
        "regions.Region",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="reports",
    )

    author = models.CharField(
        max_length=255,
        blank=True,
    )

    published_date = models.DateField(
        null=True,
        blank=True,
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-published_date", "title"]
        verbose_name = "Report"
        verbose_name_plural = "Reports"

    def __str__(self):
        return self.title


class ReportSourceLink(models.Model):
    report = models.ForeignKey(
        Report,
        on_delete=models.CASCADE,
        related_name="source_links",
    )

    source = models.ForeignKey(
        "sources.Source",
        on_delete=models.CASCADE,
        related_name="report_links",
    )

    notes = models.TextField(blank=True)

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("report", "source")
        verbose_name = "Report Source Link"
        verbose_name_plural = "Report Source Links"

    def __str__(self):
        return f"{self.report.title} → {self.source.title}"
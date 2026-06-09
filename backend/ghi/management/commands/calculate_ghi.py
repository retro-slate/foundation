from django.core.management.base import BaseCommand, CommandError

from ghi.services import GHICalculationError, calculate_ghi_for_region_year
from regions.models import Region


class Command(BaseCommand):
    help = "Calculate GHI scores for a region and year."

    def add_arguments(self, parser):
        parser.add_argument(
            "--region",
            required=True,
            help="Region slug, for example: kerala",
        )
        parser.add_argument(
            "--year",
            required=True,
            type=int,
            help="Metric year, for example: 2026",
        )

    def handle(self, *args, **options):
        region_slug = options["region"]
        year = options["year"]

        if not Region.objects.filter(slug=region_slug).exists():
            raise CommandError(f'Region with slug "{region_slug}" was not found.')

        try:
            result = calculate_ghi_for_region_year(region_slug=region_slug, year=year)
        except GHICalculationError as error:
            raise CommandError(str(error)) from error

        self.stdout.write(
            self.style.SUCCESS(
                f"Calculated GHI for {result.snapshot.region.name} "
                f"({year}) using methodology "
                f"{result.snapshot.methodology_version.version}."
            )
        )
        self.stdout.write(f"Overall score: {result.snapshot.overall_score}")
        self.stdout.write(f"Data completeness: {result.snapshot.data_completeness}%")
        self.stdout.write(
            "Metric scores: "
            f"{result.metric_scores_created} created, "
            f"{result.metric_scores_updated} updated"
        )
        self.stdout.write(
            "Missing data: "
            f"{result.missing_metric_count} metric values, "
            f"{result.missing_rule_count} conversion rules"
        )

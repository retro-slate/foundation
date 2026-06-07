import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { SectionHeader } from "@/components/ui/SectionHeader";

type SlugPlaceholderProps = {
  params: Promise<{ slug: string }>;
  type: "Region" | "Project" | "Event" | "Report" | "Entity";
};

function titleFromSlug(slug: string) {
  return slug
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export async function SlugPlaceholder({ params, type }: SlugPlaceholderProps) {
  const { slug } = await params;
  const title = titleFromSlug(slug) || `${type} Record`;

  return (
    <div className="space-y-10">
      <SectionHeader
        eyebrow={`${type} dossier`}
        title={title}
        description={`${type} profile placeholder prepared for future live data, field notes, provenance, and relationship mapping.`}
      />
      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <Card accent="lime">
          <Badge tone="indigo">{type}</Badge>
          <h3 className="mt-5 text-2xl font-black uppercase tracking-normal">
            Summary
          </h3>
          <p className="mt-3 leading-7">
            This page will become a verified workspace for context, timeline
            signals, linked records, and operational updates. The current
            content is intentionally empty until the API source is connected.
          </p>
        </Card>
        <Card accent="pink">
          <h3 className="text-xl font-black uppercase tracking-normal">
            Metadata
          </h3>
          <dl className="mt-5 space-y-3 text-sm">
            <div className="flex justify-between gap-4 border-b border-retro-black pb-2">
              <dt className="font-bold">Slug</dt>
              <dd className="font-mono">{slug}</dd>
            </div>
            <div className="flex justify-between gap-4 border-b border-retro-black pb-2">
              <dt className="font-bold">Status</dt>
              <dd>Awaiting data</dd>
            </div>
            <div className="flex justify-between gap-4 border-b border-retro-black pb-2">
              <dt className="font-bold">Visibility</dt>
              <dd>Public placeholder</dd>
            </div>
          </dl>
        </Card>
      </div>
      <Card accent="indigo">
        <h3 className="text-xl font-black uppercase tracking-normal">
          Related links
        </h3>
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          {["Regions", "Projects", "Reports"].map((item) => (
            <div className="border-2 border-retro-black bg-retro-white p-4 font-mono text-xs uppercase" key={item}>
              {item}
            </div>
          ))}
        </div>
      </Card>
      <div className="grid gap-6 md:grid-cols-2">
        <EmptyState
          title="No timeline entries"
          description="Chronology, milestones, and field updates will appear here once records are published."
        />
        <EmptyState
          title="No linked evidence"
          description="Sources, datasets, and transparent verification notes are reserved for the future data layer."
        />
      </div>
    </div>
  );
}

import { PageShell } from "@/components/layout/PageShell";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { SectionHeader } from "@/components/ui/SectionHeader";

const results = [
  ["Region", "South Asia Health Corridor", "/regions/south-asia-health-corridor"],
  ["Entity", "Community Climate Clinic", "/entities/community-climate-clinic"],
  ["Report", "Transparent Funding Notes", "/reports/transparent-funding-notes"],
  ["Event", "Field Data Trust Lab", "/events/field-data-trust-lab"],
];

const filters = ["Regions", "Entities", "Projects", "Reports", "Events"];

export default function Page() {
  return (
    <PageShell>
      <div className="space-y-10">
        <SectionHeader
          eyebrow="Discovery"
          title="Explore the network"
          description="A search-first layout for finding regions, entities, projects, reports, and events once live data is connected."
        />
        <section className="border-2 border-retro-black bg-retro-white p-4 shadow-[6px_6px_0_#5d00ff]">
          <div className="grid gap-3 md:grid-cols-[1fr_auto]">
            <div className="border-2 border-retro-black px-4 py-3 font-mono text-sm uppercase text-retro-black">
              Search by place, programme, source, or partner
            </div>
            <button className="border-2 border-retro-black bg-retro-lime px-6 py-3 text-sm font-black uppercase">
              Search
            </button>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {filters.map((filter) => (
              <Badge key={filter} tone="black">
                {filter}
              </Badge>
            ))}
          </div>
        </section>
        <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
          <aside className="space-y-3 border-2 border-retro-black bg-retro-black p-4 text-retro-white">
            <p className="font-black uppercase tracking-normal">Signal filters</p>
            {["Status", "Location", "Trust level", "Date range"].map((item) => (
              <div
                className="border border-retro-white p-3 font-mono text-xs uppercase"
                key={item}
              >
                {item}
              </div>
            ))}
          </aside>
          <div className="grid gap-5">
            {results.map(([type, title, href], index) => (
              <Card accent={index % 2 === 0 ? "lime" : "pink"} key={title}>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <Badge tone={type === "Report" ? "indigo" : "lime"}>
                      {type}
                    </Badge>
                    <h3 className="mt-4 text-2xl font-black uppercase tracking-normal">
                      {title}
                    </h3>
                    <p className="mt-2 text-sm leading-6">
                      Placeholder discovery result for a future connected
                      record.
                    </p>
                  </div>
                  <a className="font-black uppercase underline" href={href}>
                    Open
                  </a>
                </div>
              </Card>
            ))}
            <EmptyState
              title="More results pending"
              description="Additional indexed records will populate this surface when the API is connected."
            />
          </div>
        </div>
      </div>
    </PageShell>
  );
}

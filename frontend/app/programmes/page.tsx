import { PageShell } from "@/components/layout/PageShell";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { SectionHeader } from "@/components/ui/SectionHeader";

const programmes = [
  {
    title: "Open Health Signals",
    type: "Project",
    summary: "Placeholder programme for trusted regional health indicators.",
    href: "/projects/open-health-signals",
  },
  {
    title: "Circular Tech Recovery",
    type: "Project",
    summary: "Responsible recycling and device support for future initiatives.",
    href: "/projects/circular-tech-recovery",
  },
  {
    title: "Field Data Trust Lab",
    type: "Event",
    summary: "A future convening for privacy, transparency, and collaboration.",
    href: "/events/field-data-trust-lab",
  },
];

export default function Page() {
  return (
    <PageShell>
      <div className="space-y-10">
        <SectionHeader
          eyebrow="Programmes"
          title="Projects and events in formation"
          description="Placeholder records are ready for API-backed projects and events. Each card uses the same public pattern the live data layer can adopt later."
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {programmes.map((item, index) => (
            <Card
              accent={index === 1 ? "pink" : index === 2 ? "indigo" : "lime"}
              key={item.title}
            >
              <Badge tone={item.type === "Event" ? "pink" : "lime"}>
                {item.type}
              </Badge>
              <h3 className="mt-5 text-2xl font-black uppercase leading-tight tracking-normal">
                {item.title}
              </h3>
              <p className="mt-3 min-h-20 leading-7">{item.summary}</p>
              <div className="mt-6">
                <Button href={item.href} variant="ghost">
                  View placeholder
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </PageShell>
  );
}

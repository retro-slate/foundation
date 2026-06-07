import { PageShell } from "@/components/layout/PageShell";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { SectionHeader } from "@/components/ui/SectionHeader";

const supportAreas = [
  "Donations",
  "Funding transparency",
  "Future initiatives",
  "Software support",
  "Recycling",
  "Partnerships",
  "Responsible funding",
];

export default function Page() {
  return (
    <PageShell>
      <div className="space-y-10">
        <SectionHeader
          eyebrow="Support"
          title="Fund the infrastructure with care"
          description="RetroSlate Foundation welcomes support that strengthens public-interest software, field collaboration, recycling pathways, and transparent health and environment work."
        />
        <section className="grid gap-6 lg:grid-cols-[1fr_1fr]">
          <Card accent="lime">
            <Badge tone="pink">Responsible giving</Badge>
            <h3 className="mt-5 text-2xl font-black uppercase tracking-normal">
              Donations and partnerships
            </h3>
            <p className="mt-3 leading-7">
              Future donation flows will make funding intent, use of funds, and
              constraints visible. Support should improve access, protect
              privacy, and keep the mission accountable.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <Button variant="primary">Donation flow pending</Button>
              <Button href="/about" variant="ghost">
                Review mission
              </Button>
            </div>
          </Card>
          <Card accent="indigo">
            <h3 className="text-2xl font-black uppercase tracking-normal">
              Support channels
            </h3>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {supportAreas.map((area) => (
                <div
                  className="border-2 border-retro-black p-3 font-mono text-xs uppercase"
                  key={area}
                >
                  {area}
                </div>
              ))}
            </div>
          </Card>
        </section>
      </div>
    </PageShell>
  );
}

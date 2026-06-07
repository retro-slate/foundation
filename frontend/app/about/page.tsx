import { PageShell } from "@/components/layout/PageShell";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { SectionHeader } from "@/components/ui/SectionHeader";

const focusAreas = [
  {
    title: "Environmental Health",
    text: "Tracking ecological pressure, sustainability signals, and climate-linked risks.",
    accent: "lime",
  },
  {
    title: "Human Wellbeing",
    text: "Making health, safety, access, and dignity easier to understand and support.",
    accent: "pink",
  },
  {
    title: "Animal Welfare",
    text: "Connecting welfare, habitat, disease, and care systems into the wider picture.",
    accent: "indigo",
  },
  {
    title: "Community Health",
    text: "Highlighting local resilience, public needs, and community-led responses.",
    accent: "lime",
  },
  {
    title: "Economic Stability",
    text: "Mapping the conditions that help people and places build durable futures.",
    accent: "pink",
  },
  {
    title: "Governance",
    text: "Supporting accountable systems through clear sources, reports, and review.",
    accent: "indigo",
  },
] as const;

const trustCards = [
  {
    title: "Trust",
    text: "Verified information and careful review before signals become public context.",
    tone: "lime",
  },
  {
    title: "Privacy",
    text: "No selling user data. Participation should strengthen the mission, not extract from people.",
    tone: "pink",
  },
  {
    title: "Transparency",
    text: "Clear sources, reports, and methodology so decisions can be understood and challenged.",
    tone: "indigo",
  },
] as const;

const visionItems = [
  "Global Health Index",
  "Interactive map",
  "Organization and project discovery",
  "Sustainable solutions",
  "Future collaboration tools",
];

export default function Page() {
  return (
    <PageShell>
      <div className="space-y-16">
        <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div>
            <Badge tone="lime">Foundation brief</Badge>
            <h1 className="mt-5 max-w-4xl text-5xl font-black uppercase leading-none tracking-normal md:text-7xl">
              About RetroSlate Foundation
            </h1>
            <p className="mt-6 max-w-2xl text-xl leading-8">
              A global platform for environmental, human, and animal wellbeing.
            </p>
          </div>
          <Card accent="pink">
            <p className="text-3xl font-black uppercase leading-tight tracking-normal">
              Nature First. People First. Lives First.
            </p>
          </Card>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1fr_1fr]">
          <Card accent="lime">
            <Badge tone="indigo">Foundation brief</Badge>
            <h2 className="mt-5 text-3xl font-black uppercase leading-tight tracking-normal">
              Mission
            </h2>
            <p className="mt-5 leading-7">
              RetroSlate Foundation connects data, organizations, projects,
              reports, and people to support meaningful action around the
              world. The platform is built to make complex health and
              environmental information easier to discover, understand, and use.
            </p>
            <p className="mt-4 leading-7">
              By organizing knowledge into a shared operating picture, the
              Foundation helps communities, partners, researchers, funders, and
              everyday supporters find practical ways to participate.
            </p>
          </Card>
          <div className="border-2 border-retro-black bg-retro-black p-5 text-retro-white shadow-[6px_6px_0_#cfff04]">
            <p className="font-mono text-xs font-bold uppercase">
              Global platform status
            </p>
            <div className="mt-8 grid grid-cols-2 gap-3">
              {["Data", "Reports", "Projects", "People"].map((item) => (
                <div className="border border-retro-white p-4" key={item}>
                  <p className="font-black uppercase tracking-normal">{item}</p>
                  <div className="mt-4 h-2 bg-retro-lime" />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="space-y-8">
          <SectionHeader
            eyebrow="Focus"
            title="What We Focus On"
            description="RetroSlate treats people, animals, ecosystems, economies, and institutions as connected parts of one health landscape."
          />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {focusAreas.map((area) => (
              <Card accent={area.accent} key={area.title}>
                <h3 className="text-xl font-black uppercase tracking-normal">
                  {area.title}
                </h3>
                <p className="mt-4 text-sm leading-6">{area.text}</p>
              </Card>
            ))}
          </div>
        </section>

        <section className="space-y-8">
          <SectionHeader
            eyebrow="Workflow"
            title="How It Works"
            description="We collect and organize information, publish transparent reports, highlight projects and organizations, and help people discover ways to support or participate."
          />
          <div className="grid gap-4 md:grid-cols-4">
            {["Data", "Reports", "Projects", "Action"].map((step, index) => (
              <div
                className="border-2 border-retro-black bg-retro-white p-5 shadow-[4px_4px_0_#1c1c1c]"
                key={step}
              >
                <Badge tone={index === 3 ? "pink" : "lime"}>
                  {String(index + 1).padStart(2, "0")}
                </Badge>
                <h3 className="mt-5 text-2xl font-black uppercase tracking-normal">
                  {step}
                </h3>
                {index < 3 ? (
                  <p className="mt-4 font-mono text-xs font-bold uppercase text-retro-indigo">
                    Next signal
                  </p>
                ) : null}
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-8">
          <SectionHeader
            eyebrow="Principles"
            title="Trust, Privacy, Transparency"
          />
          <div className="grid gap-6 md:grid-cols-3">
            {trustCards.map((item) => (
              <Card accent={item.tone} key={item.title}>
                <Badge tone={item.tone}>{item.title}</Badge>
                <p className="mt-5 leading-7">{item.text}</p>
              </Card>
            ))}
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <Card accent="indigo">
            <h2 className="text-3xl font-black uppercase leading-tight tracking-normal">
              Long-Term Vision
            </h2>
            <p className="mt-5 leading-7">
              RetroSlate Foundation is building toward a connected global
              health platform that turns scattered signals into useful pathways
              for sustainable solutions.
            </p>
          </Card>
          <div className="grid gap-3 sm:grid-cols-2">
            {visionItems.map((item) => (
              <div
                className="border-2 border-retro-black bg-retro-white p-4 font-mono text-xs font-bold uppercase shadow-[3px_3px_0_#ff2e9a]"
                key={item}
              >
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className="border-2 border-retro-black bg-retro-lime p-6 shadow-[8px_8px_0_#1c1c1c] md:p-8">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <Badge tone="black">Next steps</Badge>
              <p className="mt-5 max-w-3xl text-2xl font-black uppercase leading-snug tracking-normal">
                Explore the platform, support the mission, or follow the
                development of the Global Health Map.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Button href="/explore" variant="secondary">
                Explore
              </Button>
              <Button href="/support" variant="ghost">
                Support
              </Button>
            </div>
          </div>
        </section>
      </div>
    </PageShell>
  );
}

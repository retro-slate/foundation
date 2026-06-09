import { PageShell } from "@/components/layout/PageShell";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { SectionHeader } from "@/components/ui/SectionHeader";

const supportWays = [
  {
    title: "Donate",
    text: "Help fund the platform, reporting workflows, public tools, and future foundation operations.",
    accent: "lime",
  },
  {
    title: "Share the Platform",
    text: "Introduce RetroSlate Foundation to people, communities, and organizations who can use or support it.",
    accent: "pink",
  },
  {
    title: "Partner With Us",
    text: "Build collaborations around environmental, human, and animal wellbeing.",
    accent: "indigo",
  },
  {
    title: "Contribute Data or Research",
    text: "Support better public knowledge through careful information, reports, and research leads.",
    accent: "lime",
  },
] as const;

const fundingModels = [
  "Software support from RetroSlate",
  "Recycling and resource recovery",
  "Partnerships",
  "Sustainable product collaborations",
  "Optional interactive ads",
  "Grants and sponsorships",
] as const;

export default function Page() {
  return (
    <PageShell>
      <div className="space-y-16">
        <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div>
            <Badge tone="lime">Support</Badge>
            <h1 className="mt-5 max-w-4xl text-5xl font-black uppercase leading-none tracking-normal md:text-7xl">
              Support RetroSlate Foundation
            </h1>
            <p className="mt-6 max-w-2xl text-xl leading-8">
              Help build a global platform for environmental, human, and animal
              wellbeing.
            </p>
          </div>
          <Card accent="pink">
            <p className="text-2xl font-black uppercase leading-tight tracking-normal">
              Simple support now. Transparent systems as the foundation grows.
            </p>
          </Card>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1fr_1fr]">
          <Card accent="lime">
            <Badge tone="indigo">Why support us</Badge>
            <h2 className="mt-5 text-3xl font-black uppercase leading-tight tracking-normal">
              Build the public-interest infrastructure
            </h2>
            <p className="mt-5 leading-7">
              Support helps fund platform development, data collection, reports,
              research, public tools, future projects, and foundation
              operations. Every contribution helps RetroSlate Foundation turn
              scattered information into useful pathways for action.
            </p>
          </Card>
          <Card accent="indigo">
            <Badge tone="pink">No payment system yet</Badge>
            <h2 className="mt-5 text-3xl font-black uppercase leading-tight tracking-normal">
              Donate
            </h2>
            <p className="mt-5 leading-7">
              Donations currently use an external Razorpay link. RetroSlate
              Foundation does not process payments here or store donor
              information on this site.
            </p>
            <a
              className="mt-6 inline-flex min-h-11 items-center justify-center border-2 border-retro-black bg-retro-lime px-5 py-2.5 text-sm font-black uppercase tracking-normal text-retro-black shadow-[4px_4px_0_#1c1c1c] transition hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_#1c1c1c]"
              href="https://razorpay.me/@retroslate"
              rel="noreferrer"
              target="_blank"
            >
              razorpay.me/@retroslate
            </a>
          </Card>
        </section>

        <section className="space-y-8">
          <SectionHeader
            eyebrow="Support paths"
            title="Ways To Support"
            description="Support can be financial, collaborative, research-led, or as simple as helping the right people discover the platform."
          />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {supportWays.map((way) => (
              <Card accent={way.accent} key={way.title}>
                <h3 className="text-xl font-black uppercase tracking-normal">
                  {way.title}
                </h3>
                <p className="mt-4 text-sm leading-6">{way.text}</p>
              </Card>
            ))}
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <Card accent="pink">
            <Badge tone="black">Funding transparency</Badge>
            <h2 className="mt-5 text-3xl font-black uppercase leading-tight tracking-normal">
              Clear use of funds
            </h2>
            <p className="mt-5 leading-7">
              RetroSlate Foundation aims to clearly show how funds are used,
              including operations, software, research, project support, and
              future initiatives.
            </p>
          </Card>
          <Card accent="lime">
            <h2 className="text-3xl font-black uppercase leading-tight tracking-normal">
              Future Funding Model
            </h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {fundingModels.map((item) => (
                <div
                  className="border-2 border-retro-black p-3 font-mono text-xs font-bold uppercase"
                  key={item}
                >
                  {item}
                </div>
              ))}
            </div>
          </Card>
        </section>

        <section className="border-2 border-retro-black bg-retro-lime p-6 shadow-[8px_8px_0_#1c1c1c] md:p-8">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <Badge tone="black">Keep building</Badge>
              <p className="mt-5 max-w-3xl text-2xl font-black uppercase leading-snug tracking-normal">
                Every contribution helps build the systems that help others
                act.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Button href="/explore" variant="secondary">
                Explore
              </Button>
              <Button href="/about" variant="ghost">
                About
              </Button>
            </div>
          </div>
        </section>
      </div>
    </PageShell>
  );
}

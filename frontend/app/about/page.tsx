import { PageShell } from "@/components/layout/PageShell";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { SectionHeader } from "@/components/ui/SectionHeader";

const values = [
  "Trustworthy data stewardship",
  "Privacy-aware public benefit work",
  "Transparent methods and funding",
  "Collaboration across disciplines",
  "Care for people, animals, and environment",
  "Accountable technology in the field",
];

export default function Page() {
  return (
    <PageShell>
      <div className="space-y-12">
        <SectionHeader
          eyebrow="Mission"
          title="Nature First. People First. Lives First."
          description="RetroSlate Foundation exists to help health, ecological, and community knowledge move with care: trusted where it matters, private where it must be, and transparent enough to earn participation."
        />
        <section className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
          <Card accent="lime">
            <Badge tone="indigo">Foundation brief</Badge>
            <p className="mt-5 text-2xl font-black uppercase leading-snug tracking-normal">
              We connect data, collaboration, and field intelligence so people
              can see risks and responses across the systems that shape life.
            </p>
            <p className="mt-5 leading-7">
              The work centers on people, animals, and the environment as one
              shared operating picture. Trust is built through clear source
              trails, privacy-respecting workflows, transparent decisions, and
              practical tools that support action without extracting from the
              communities they serve.
            </p>
          </Card>
          <Card accent="pink">
            <h3 className="text-xl font-black uppercase tracking-normal">
              Operating commitments
            </h3>
            <div className="mt-5 grid gap-3">
              {values.map((value) => (
                <div
                  className="border-2 border-retro-black bg-retro-white p-3 font-mono text-xs uppercase"
                  key={value}
                >
                  {value}
                </div>
              ))}
            </div>
          </Card>
        </section>
      </div>
    </PageShell>
  );
}

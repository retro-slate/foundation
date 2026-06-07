import { PageShell } from "@/components/layout/PageShell";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export default function Page() {
  return (
    <PageShell>
      <section className="grid min-h-[68vh] items-center gap-10 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <Badge tone="lime">Map console</Badge>
          <h1 className="mt-5 max-w-4xl text-5xl font-black uppercase leading-none tracking-normal md:text-7xl">
            Global Health Map
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8">
            Interactive globe coming soon. This space will become the
            foundation view for regions, projects, events, reports, and trusted
            entities across the RetroSlate network.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button href="/explore">Explore records</Button>
            <Button href="/about" variant="ghost">
              Mission brief
            </Button>
          </div>
        </div>
        <div className="relative min-h-[360px] border-2 border-retro-black bg-retro-black p-4 shadow-[8px_8px_0_#cfff04]">
          <div className="signal-ring grid h-full min-h-[328px] place-items-center bg-retro-white">
            <div className="border-2 border-retro-black bg-retro-lime px-5 py-3 text-center font-mono text-sm font-bold uppercase">
              Interactive globe coming soon
            </div>
          </div>
          <div className="absolute right-8 top-8 size-4 bg-retro-pink" />
          <div className="absolute bottom-8 left-8 size-4 bg-retro-indigo" />
        </div>
      </section>
    </PageShell>
  );
}

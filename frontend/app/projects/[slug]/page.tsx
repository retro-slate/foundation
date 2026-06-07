import { PageShell } from "@/components/layout/PageShell";
import { SlugPlaceholder } from "@/components/placeholders/SlugPlaceholder";

export default function Page({ params }: { params: Promise<{ slug: string }> }) {
  return (
    <PageShell>
      <SlugPlaceholder params={params} type="Project" />
    </PageShell>
  );
}

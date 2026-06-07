import { Badge } from "./Badge";

type EmptyStateProps = {
  title: string;
  description: string;
};

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className="border-2 border-dashed border-retro-black bg-retro-white p-6">
      <Badge tone="black">Standby</Badge>
      <h3 className="mt-4 text-xl font-black uppercase tracking-normal">
        {title}
      </h3>
      <p className="mt-2 max-w-2xl text-sm leading-6">{description}</p>
    </div>
  );
}

import { Badge } from "./Badge";

type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  description?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  description,
}: SectionHeaderProps) {
  return (
    <header className="max-w-3xl">
      <Badge tone="pink">{eyebrow}</Badge>
      <h2 className="mt-4 text-3xl font-black uppercase leading-tight tracking-normal md:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-base leading-7 md:text-lg">{description}</p>
      ) : null}
    </header>
  );
}

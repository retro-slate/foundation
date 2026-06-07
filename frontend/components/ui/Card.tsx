import type { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  accent?: "lime" | "pink" | "indigo";
};

const accents = {
  lime: "before:bg-retro-lime",
  pink: "before:bg-retro-pink",
  indigo: "before:bg-retro-indigo",
};

export function Card({ children, accent = "lime" }: CardProps) {
  return (
    <article
      className={`relative border-2 border-retro-black bg-retro-white p-5 shadow-[6px_6px_0_#1c1c1c] before:absolute before:inset-x-0 before:top-0 before:h-2 ${accents[accent]}`}
    >
      <div className="pt-3">{children}</div>
    </article>
  );
}

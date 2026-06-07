import type { ReactNode } from "react";

type BadgeProps = {
  children: ReactNode;
  tone?: "lime" | "pink" | "indigo" | "black";
};

const tones = {
  lime: "border-retro-black bg-retro-lime text-retro-black",
  pink: "border-retro-black bg-retro-pink text-retro-white",
  indigo: "border-retro-black bg-retro-indigo text-retro-white",
  black: "border-retro-black bg-retro-black text-retro-white",
};

export function Badge({ children, tone = "lime" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center border px-2.5 py-1 font-mono text-[11px] font-bold uppercase tracking-normal ${tones[tone]}`}
    >
      {children}
    </span>
  );
}

import Link from "next/link";
import type { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "secondary" | "ghost";
};

const variants = {
  primary:
    "border-retro-black bg-retro-lime text-retro-black shadow-[4px_4px_0_#1c1c1c] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_#1c1c1c]",
  secondary:
    "border-retro-black bg-retro-indigo text-retro-white shadow-[4px_4px_0_#ff2e9a] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_#ff2e9a]",
  ghost:
    "border-retro-black bg-retro-white text-retro-black hover:bg-retro-black hover:text-retro-white",
};

export function Button({ children, href, variant = "primary" }: ButtonProps) {
  const className = `inline-flex min-h-11 items-center justify-center border-2 px-5 py-2.5 text-sm font-black uppercase tracking-normal transition ${variants[variant]}`;

  if (href) {
    return (
      <Link className={className} href={href}>
        {children}
      </Link>
    );
  }

  return <button className={className}>{children}</button>;
}

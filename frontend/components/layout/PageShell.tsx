import type { ReactNode } from "react";

type PageShellProps = {
  children: ReactNode;
  compact?: boolean;
};

export function PageShell({ children, compact = false }: PageShellProps) {
  return (
    <main className="mission-grid min-h-screen bg-retro-white text-retro-black">
      <div
        className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ${
          compact ? "py-10" : "py-12 md:py-16"
        }`}
      >
        {children}
      </div>
    </main>
  );
}

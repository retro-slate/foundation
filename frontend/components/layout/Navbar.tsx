import Link from "next/link";
import Image from "next/image";

const navItems = [
  { href: "/", label: "Map" },
  { href: "/about", label: "About" },
  { href: "/programmes", label: "Programmes" },
  { href: "/explore", label: "Explore" },
  { href: "/support", label: "Support" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b-2 border-retro-black bg-retro-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <Link
          className="flex items-center gap-3 text-lg font-black uppercase tracking-normal"
          href="/"
        >
          <Image
            alt="RetroSlate logo"
            className="h-9 w-auto"
            height={36}
            src="/retroslatelogopink.png"
            width={36}
          />
          <span>RetroSlate Foundation</span>
        </Link>
        <nav className="flex flex-wrap gap-2">
          {navItems.map((item) => (
            <Link
              className="border-2 border-retro-black bg-retro-white px-3 py-2 text-xs font-black uppercase tracking-normal transition hover:bg-retro-black hover:text-retro-white"
              href={item.href}
              key={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

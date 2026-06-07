import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t-2 border-retro-black bg-retro-black text-retro-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-[1fr_2fr] lg:px-8">
        <div>
          <p className="font-black uppercase tracking-normal">
            RetroSlate Foundation
          </p>
          <p className="mt-3 max-w-sm text-sm leading-6">
            Eco-tech field intelligence for people, animals, and the
            environments that hold life together.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {["Trust", "Privacy", "Transparency"].map((item) => (
            <div className="border border-retro-white p-4" key={item}>
              <p className="font-mono text-xs uppercase">{item}</p>
              <div className="mt-4 h-2 bg-retro-lime" />
            </div>
          ))}
        </div>
        <div className="md:col-span-2">
          <Link className="text-sm underline" href="/support">
            Support responsible funding and software operations
          </Link>
          <p className="mt-3 text-sm">contact@retroslate.com</p>
        </div>
      </div>
    </footer>
  );
}

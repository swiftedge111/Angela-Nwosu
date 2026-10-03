import Image from "next/image";
import Link from "next/link";
import greenery from "@/assets/greenery.jpg";

export function PageHero({
  eyebrow,
  title,
  intro,
  crumbs,
  children,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  crumbs?: { href: string; label: string }[];
  children?: React.ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-forest-900 text-ivory">
      <Image
        src={greenery}
        alt=""
        fill
        preload
        sizes="100vw"
        className="-z-10 object-cover object-[50%_15%] opacity-25 mix-blend-soft-light"
      />
      <div aria-hidden className="absolute -right-24 -bottom-48 -z-10 size-[30rem] rounded-full bg-brass/20 blur-3xl" />
      <div className="container-page py-16 md:py-24">
        {crumbs && (
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-2 text-xs text-sage-300">
              {crumbs.map((c) => (
                <li key={c.href} className="flex items-center gap-2">
                  <Link href={c.href} className="transition hover:text-ivory">
                    {c.label}
                  </Link>
                  <span aria-hidden>/</span>
                </li>
              ))}
            </ol>
          </nav>
        )}
        {eyebrow && <p className="eyebrow text-brass-light">{eyebrow}</p>}
        <h1 className="mt-4 max-w-3xl font-display text-5xl leading-[0.98] font-medium tracking-tight text-balance md:text-7xl">
          {title}
        </h1>
        {intro && <p className="mt-6 max-w-xl text-lg leading-relaxed text-sage-200">{intro}</p>}
        {children}
      </div>
    </section>
  );
}

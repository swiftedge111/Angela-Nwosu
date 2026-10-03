import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { LuArrowRight } from "react-icons/lu";
import howItWorks from "@/assets/how-it-works.webp";
import { AngieNote } from "@/components/angie-note";
import { IntentionMarquee } from "@/components/intention-marquee";
import { PageHero } from "@/components/page-hero";
import { categories } from "@/data/categories";
import { button } from "@/lib/ui";

export const metadata: Metadata = {
  title: "About Angie",
  description:
    "Angela Nwosu prepares every ritual kit, herb and fortified item personally, in respect of natural law and spiritual order.",
  alternates: { canonical: "/about" },
};

const steps = [
  "You choose what you need.",
  "We prepare the right item for that purpose.",
  "You use it as part of your daily routine.",
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Angie"
        title={
          <>
            Supports for alignment, clearing, and <em className="font-normal text-sage-300">steady movement forward.</em>
          </>
        }
        intro="AngieNation is the work of Angela Nwosu: physical spiritual tools you can wear, use, and live with."
      />

      <section className="py-24 lg:py-32">
        <div className="container-page">
          <AngieNote />
        </div>
      </section>

      <IntentionMarquee />

      <section className="py-24 lg:py-32">
        <div className="container-page grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="eyebrow text-brass">What we make</p>
            <h2 className="mt-4 font-display text-4xl leading-[1.05] font-medium text-balance text-forest-900 md:text-5xl">
              Bring your life back into balance. Not in theory. In daily practice.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted">
              Bracelets. Waist beads. Crystals. Cleansing soaps. Oils. Sage. Candles. Each one prepared for a clear
              purpose.
            </p>
            <ol className="mt-10 space-y-4">
              {steps.map((s, i) => (
                <li key={s} className="flex items-baseline gap-4 border-b border-forest-900/10 pb-4">
                  <span className="font-display text-2xl text-brass italic">0{i + 1}</span>
                  <span className="font-display text-2xl text-forest-900">{s}</span>
                </li>
              ))}
            </ol>
            <p className="mt-6 font-display text-xl text-forest-700 italic">No complicated rituals. No long instructions.</p>
          </div>
          <div className="relative aspect-[4/5] overflow-hidden rounded-t-full rounded-b-[2.5rem]">
            <Image
              src={howItWorks}
              alt="An AngieNation kit box with incense, sage and cinnamon, held by a hand wearing beaded bracelets"
              fill
              placeholder="blur"
              sizes="(min-width: 1024px) 40rem, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="bg-forest-900 py-20 text-ivory">
        <div className="container-page flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="font-display text-4xl font-medium md:text-5xl">Find what you need</h2>
            <ul className="mt-6 flex flex-wrap gap-2">
              {categories.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/collections/${c.slug}`}
                    className="inline-flex rounded-full border border-ivory/20 px-4 py-2 text-sm transition hover:border-brass-light hover:text-brass-light"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <Link href="/shop" className={button("light", "lg")}>
            Shop all products <LuArrowRight className="size-4" />
          </Link>
        </div>
      </section>
    </>
  );
}

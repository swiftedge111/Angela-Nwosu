import Image from "next/image";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa6";
import { LuArrowRight, LuArrowUpRight, LuGlobe, LuHandHeart, LuMessageCircle } from "react-icons/lu";
import balanceGradient from "@/assets/balance-gradient.jpg";
import howItWorks from "@/assets/how-it-works.webp";
import { AngieNote } from "@/components/angie-note";
import { IntentionMarquee, intentions } from "@/components/intention-marquee";
import { OrderSteps } from "@/components/order-steps";
import { ProductCard } from "@/components/product-card";
import { SectionHeading } from "@/components/section-heading";
import { categories } from "@/data/categories";
import { bestsellerSlugs, featuredSlugs, getProduct, getProducts, getProductsInCategory } from "@/data/products";
import { whatsappUrl } from "@/lib/order";
import { formatPrice } from "@/lib/pricing";
import { button } from "@/lib/ui";

const itemTypes = ["Bracelets", "Waist beads", "Crystals", "Cleansing soaps", "Oils", "Sage", "Candles"];

export default function HomePage() {
  return (
    <>
      <Hero />
      <IntentionMarquee />
      <Collections />
      <Featured />
      <Balance />
      <HowItWorks />
      <Bestsellers />
      <section className="py-24 lg:py-32">
        <div className="container-page">
          <AngieNote />
        </div>
      </section>
      <OrderBand />
    </>
  );
}

function Hero() {
  const spotlight = getProduct("goodluck-prayer-kit")!;
  const trust = [
    { Icon: LuHandHeart, label: "Prepared by hand" },
    { Icon: LuGlobe, label: "Ships worldwide" },
    { Icon: LuMessageCircle, label: "Order by message" },
  ];

  return (
    <section className="relative isolate overflow-hidden bg-forest-900 text-ivory">
      <div aria-hidden className="absolute -top-48 -left-40 -z-10 size-[40rem] rounded-full bg-forest-600/50 blur-3xl" />
      <div aria-hidden className="absolute -right-32 -bottom-40 -z-10 size-[32rem] rounded-full bg-brass/25 blur-3xl" />

      <div className="container-page grid items-center gap-16 pt-14 pb-24 lg:grid-cols-[1.2fr_0.8fr] lg:pt-20 lg:pb-28">
        <div className="animate-fade-up">
          <p className="eyebrow text-brass-light">AngieNation · by Angela Nwosu</p>
          <h1 className="mt-6 font-display text-[3.4rem] leading-[0.92] font-medium tracking-tight sm:text-7xl lg:text-[5.75rem]">
            A quieter way
            <br />
            to <em className="font-normal text-sage-300">win at life.</em>
          </h1>
          <p className="mt-7 max-w-md text-lg leading-relaxed text-sage-200">
            Private spiritual instruments for clarity, protection, and blessings.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/shop" className={button("light", "lg")}>
              Shop the collection <LuArrowRight className="size-4" />
            </Link>
            <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className={button("outline-light", "lg")}>
              <FaWhatsapp className="size-5" /> Chat with us
            </a>
          </div>
          <ul className="mt-14 grid max-w-lg grid-cols-3 gap-4 border-t border-ivory/10 pt-8">
            {trust.map(({ Icon, label }) => (
              <li key={label} className="flex flex-col gap-2 text-sm text-sage-200 sm:flex-row sm:items-center">
                <Icon className="size-5 shrink-0 text-brass-light" />
                {label}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative mx-auto w-full max-w-[22rem] lg:max-w-[25rem]">
          <div aria-hidden className="absolute -inset-4 rounded-t-full rounded-b-[2.75rem] border border-brass-light/30" />
          <div className="relative aspect-[3/4] overflow-hidden rounded-t-full rounded-b-[2.25rem] bg-forest-950">
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster="/video/hero-smoke-poster.jpg"
              aria-hidden
              className="size-full object-cover"
            >
              <source src="/video/hero-smoke.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-forest-950/60 via-transparent to-transparent" />
          </div>

          <Link
            href={`/product/${spotlight.slug}`}
            className="absolute -bottom-8 -left-2 flex items-center gap-3 rounded-2xl bg-ivory/95 p-2.5 pr-5 text-forest-900 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.6)] backdrop-blur transition hover:-translate-y-0.5 sm:-left-14"
          >
            <span className="relative size-16 shrink-0 overflow-hidden rounded-xl bg-white">
              <Image src={spotlight.images[0].src} alt="" fill sizes="64px" className="object-cover" />
            </span>
            <span>
              <span className="eyebrow block text-brass">Bestseller</span>
              <span className="mt-0.5 block font-display text-lg leading-tight">{spotlight.name}</span>
              <span className="block text-sm font-semibold tabular-nums">{formatPrice(spotlight)}</span>
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}

function Collections() {
  return (
    <section className="py-24 lg:py-32">
      <div className="container-page">
        <SectionHeading eyebrow="Shop by purpose" title="Each one prepared for a clear purpose.">
          <Link href="/shop" className="group inline-flex items-center gap-2 text-sm font-semibold text-forest-800">
            View all products <LuArrowRight className="size-4 transition group-hover:translate-x-1" />
          </Link>
        </SectionHeading>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {categories.map((c, i) => (
            <Link
              key={c.slug}
              href={`/collections/${c.slug}`}
              className={`group relative isolate flex min-h-[26rem] flex-col justify-end overflow-hidden rounded-[2rem] bg-forest-800 p-7 text-ivory ${
                i === 0 ? "md:min-h-[32rem]" : "md:mt-16"
              }`}
            >
              <Image
                src={c.image}
                alt=""
                fill
                sizes="(min-width: 768px) 33vw, 100vw"
                className="-z-10 origin-bottom scale-110 object-cover transition duration-700 group-hover:scale-[1.15]"
              />
              <div className="absolute inset-0 -z-10 bg-gradient-to-t from-forest-950 via-forest-950/65 to-forest-950/5" />
              <p className="eyebrow text-brass-light">{getProductsInCategory(c.slug).length} pieces</p>
              <h3 className="mt-3 font-display text-3xl leading-tight">{c.name}</h3>
              <p className="mt-3 max-w-xs text-sm leading-relaxed text-sage-200">{c.blurb}</p>
              <span className="mt-6 inline-flex size-11 items-center justify-center rounded-full bg-ivory text-forest-900 transition group-hover:bg-brass-light">
                <LuArrowUpRight className="size-5" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function Featured() {
  return (
    <section className="pb-24 lg:pb-32">
      <div className="container-page">
        <SectionHeading eyebrow="Featured collections" title="Instruments you can wear, use, and live with." />
        <div className="mt-14 grid grid-cols-2 gap-x-4 gap-y-10 md:gap-x-6 lg:grid-cols-4">
          {getProducts(featuredSlugs).map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
        <div className="mt-14 flex justify-center">
          <Link href="/shop" className={button("outline", "lg")}>
            View all products <LuArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function Balance() {
  return (
    <section className="relative isolate overflow-hidden bg-sage-100 py-24 lg:py-32">
      <div className="container-page grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <div className="relative">
          <div className="relative aspect-[4/3.4] overflow-hidden rounded-[2.5rem]">
            <Image
              src={howItWorks}
              alt="An AngieNation kit box with incense, sage and cinnamon, held by a hand wearing beaded bracelets"
              fill
              placeholder="blur"
              sizes="(min-width: 1024px) 40rem, 100vw"
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-6 left-6 rounded-2xl bg-forest-900 px-5 py-4 text-ivory shadow-xl md:left-auto md:-right-6">
            <p className="font-display text-2xl italic">Not in theory.</p>
            <p className="text-sm text-sage-200">In daily practice.</p>
          </div>
        </div>

        <div>
          <p className="eyebrow text-brass">Bring your life back into balance</p>
          <h2 className="mt-4 font-display text-4xl leading-[1.05] font-medium text-balance text-forest-900 md:text-5xl">
            Physical spiritual tools you can wear, use, and live with.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted">
            AngieNation creates physical spiritual tools you can wear, use, and live with. Each one prepared for a clear
            purpose.
          </p>
          <ul className="mt-8 flex flex-wrap gap-2.5">
            {itemTypes.map((t) => (
              <li key={t} className="rounded-full border border-forest-900/15 bg-ivory px-4 py-2 text-sm font-medium text-forest-800">
                {t}
              </li>
            ))}
          </ul>
          <p className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-1 font-display text-2xl text-forest-700 italic">
            {intentions.map((word, i) => (
              <span key={word} className="flex items-center gap-3">
                {word}
                {i < intentions.length - 1 && <span className="text-base text-brass not-italic">✦</span>}
              </span>
            ))}
          </p>
          <Link href="/shop" className={`${button("primary", "lg")} mt-10`}>
            Shop now <LuArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    "You choose what you need.",
    "We prepare the right item for that purpose.",
    "You use it as part of your daily routine.",
  ];
  return (
    <section className="relative isolate overflow-hidden bg-forest-900 py-24 text-ivory lg:py-32">
      <div aria-hidden className="absolute top-1/2 left-1/2 -z-10 size-[44rem] -translate-1/2 rounded-full bg-forest-700/40 blur-3xl" />
      <div className="container-page">
        <SectionHeading align="center" tone="light" eyebrow="How it works" title="Simple, steady, part of your day." />
        <ol className="mt-16 grid gap-px overflow-hidden rounded-[2rem] bg-ivory/10 md:grid-cols-3">
          {steps.map((s, i) => (
            <li key={s} className="bg-forest-900 p-8 md:p-10">
              <span className="font-display text-6xl text-brass-light italic">0{i + 1}</span>
              <p className="mt-6 font-display text-2xl leading-snug md:text-[1.7rem]">{s}</p>
            </li>
          ))}
        </ol>
        <p className="mt-12 text-center font-display text-3xl text-sage-300 italic md:text-4xl">
          No complicated rituals. No long instructions.
        </p>
      </div>
    </section>
  );
}

function Bestsellers() {
  return (
    <section className="bg-sand py-24 lg:py-32">
      <div className="container-page">
        <SectionHeading eyebrow="Shop the favourites" title="Our bestsellers">
          <Link href="/shop" className="group inline-flex items-center gap-2 text-sm font-semibold text-forest-800">
            Shop everything <LuArrowRight className="size-4 transition group-hover:translate-x-1" />
          </Link>
        </SectionHeading>
      </div>
      <div className="no-scrollbar mt-14 overflow-x-auto scroll-smooth">
        <ul className="container-page flex snap-x snap-mandatory gap-5">
          {getProducts(bestsellerSlugs).map((p) => (
            <li key={p.slug} className="w-[72%] shrink-0 snap-start sm:w-[42%] lg:w-[calc(25%-15px)]">
              <ProductCard product={p} sizes="(min-width: 1024px) 25vw, (min-width: 640px) 42vw, 72vw" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function OrderBand() {
  return (
    <section className="pb-24 lg:pb-32">
      <div className="container-page">
        <div className="relative isolate overflow-hidden rounded-[2.5rem] bg-forest-800 px-6 py-16 text-ivory md:px-14 md:py-20">
          <Image src={balanceGradient} alt="" fill sizes="100vw" className="-z-10 object-cover opacity-25 mix-blend-soft-light" />
          <SectionHeading
            tone="light"
            eyebrow="Ordering is personal"
            title="Order in a message."
            intro="No accounts, no passwords. Add what you need to your bag and send it to us. We'll confirm shipping and payment with you directly."
          >
            <div className="flex flex-wrap gap-3">
              <Link href="/shop" className={button("light", "lg")}>
                Start shopping
              </Link>
              <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className={button("whatsapp", "lg")}>
                <FaWhatsapp className="size-5" /> WhatsApp us
              </a>
            </div>
          </SectionHeading>
          <div className="mt-12">
            <OrderSteps tone="light" />
          </div>
        </div>
      </div>
    </section>
  );
}

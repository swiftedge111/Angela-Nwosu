import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LuChevronDown, LuGlobe, LuHandHeart, LuMessageCircle } from "react-icons/lu";
import { BuyBox } from "@/components/buy-box";
import { orderSteps } from "@/components/order-steps";
import { ProductCard } from "@/components/product-card";
import { ProductGallery } from "@/components/product-gallery";
import { getCategory } from "@/data/categories";
import { featuredSlugs, getProduct, getProducts, products } from "@/data/products";
import { currency, formatPrice, priceCents } from "@/lib/pricing";
import { site } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: PageProps<"/product/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const product = getProduct(slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.description,
    alternates: { canonical: `/product/${product.slug}` },
    openGraph: { images: [product.images[0].src] },
  };
}

export default async function ProductPage(props: PageProps<"/product/[slug]">) {
  const { slug } = await props.params;
  const product = getProduct(slug);
  if (!product) notFound();

  const category = product.categories[0] && getCategory(product.categories[0]);
  const related = [
    ...products.filter((p) => p.slug !== product.slug && p.categories.some((c) => product.categories.includes(c))),
    ...getProducts(featuredSlugs).filter((p) => p.slug !== product.slug),
  ]
    .filter((p, i, all) => all.findIndex((x) => x.slug === p.slug) === i)
    .slice(0, 4);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    sku: product.sku,
    image: product.images.map((i) => new URL(i.src, site.url).href),
    brand: { "@type": "Brand", name: site.name },
    offers: {
      "@type": "Offer",
      price: (priceCents(product) / 100).toFixed(2),
      priceCurrency: currency.code,
      availability: "https://schema.org/InStock",
      url: new URL(`/product/${product.slug}`, site.url).href,
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />

      <div className="container-page pt-8 pb-20 md:pt-12">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-2 text-xs text-muted">
            <li>
              <Link href="/shop" className="hover:text-forest-900">
                Shop
              </Link>
            </li>
            {category && (
              <li className="flex items-center gap-2">
                <span aria-hidden>/</span>
                <Link href={`/collections/${category.slug}`} className="hover:text-forest-900">
                  {category.shortName}
                </Link>
              </li>
            )}
            <li className="flex items-center gap-2 text-forest-900">
              <span aria-hidden>/</span>
              <span aria-current="page">{product.name}</span>
            </li>
          </ol>
        </nav>

        <div className="mt-8 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          {/* self-start: a stretched gallery would size its square image from the row height. */}
          <div className="min-w-0 lg:sticky lg:top-28 lg:self-start">
            <ProductGallery images={product.images} />
          </div>

          <div className="min-w-0 lg:sticky lg:top-28 lg:self-start">
            {category && <p className="eyebrow text-brass">{category.name}</p>}
            <h1 className="mt-3 font-display text-5xl leading-[1.02] font-medium text-balance text-forest-900 md:text-6xl">
              {product.name}
            </h1>
            <p className="mt-5 text-2xl font-semibold text-ink tabular-nums">{formatPrice(product)}</p>
            <p className="mt-6 text-[1.05rem] leading-relaxed text-muted">{product.description}</p>

            <div className="mt-8">
              <BuyBox slug={product.slug} />
            </div>

            <ul className="mt-8 grid grid-cols-3 gap-3 text-center text-xs text-muted">
              {[
                { Icon: LuHandHeart, label: "Prepared personally" },
                { Icon: LuGlobe, label: "Ships worldwide" },
                { Icon: LuMessageCircle, label: "Questions? Just ask" },
              ].map(({ Icon, label }) => (
                <li key={label} className="flex flex-col items-center gap-2 rounded-2xl bg-sage-100 px-2 py-4">
                  <Icon className="size-5 text-forest-700" />
                  {label}
                </li>
              ))}
            </ul>

            <div className="mt-8 divide-y divide-forest-900/10 border-y border-forest-900/10">
              <Disclosure title="How ordering works" open>
                <ol className="space-y-3">
                  {orderSteps.map((s, i) => (
                    <li key={s.title} className="flex gap-3">
                      <span className="font-display text-lg text-brass italic">0{i + 1}</span>
                      <span>
                        <strong className="font-semibold text-forest-900">{s.title}.</strong> {s.body}
                      </span>
                    </li>
                  ))}
                </ol>
              </Disclosure>
              <Disclosure title="Shipping & delivery">
                <p>
                  We ship worldwide, including to {site.locations.join(", ")}. Shipping cost and delivery time depend on
                  where you are, so we confirm them with you when you send your order.{" "}
                  <Link href="/shipping" className="font-semibold text-forest-800 underline underline-offset-4">
                    More about shipping
                  </Link>
                </p>
              </Disclosure>
              <Disclosure title="Prepared with intention">
                <p className="font-display text-xl leading-snug text-forest-800 italic">
                  &ldquo;I prepare each piece personally, with minimal handling, focused intention, and reverence for the
                  elements involved. Nothing is rushed. Nothing is interfered with.&rdquo;
                </p>
                <p className="mt-3 font-script text-3xl text-brass">Angie</p>
              </Disclosure>
            </div>
          </div>
        </div>
      </div>

      <section className="bg-sand py-20 md:py-24">
        <div className="container-page">
          <h2 className="font-display text-4xl font-medium text-forest-900 md:text-5xl">You may also like</h2>
          <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 md:gap-x-6 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function Disclosure({ title, open, children }: { title: string; open?: boolean; children: React.ReactNode }) {
  return (
    <details open={open} className="group py-1">
      <summary className="flex cursor-pointer list-none items-center justify-between py-4 font-display text-xl text-forest-900">
        {title}
        <LuChevronDown className="size-5 text-muted transition group-open:rotate-180" />
      </summary>
      <div className="pb-5 text-sm leading-relaxed text-muted">{children}</div>
    </details>
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/page-hero";
import { ShopBrowser } from "@/components/shop-browser";
import { categories, getCategory } from "@/data/categories";

export const dynamicParams = false;

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata(props: PageProps<"/collections/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const category = getCategory(slug);
  if (!category) return {};
  return {
    title: category.name,
    description: category.blurb,
    alternates: { canonical: `/collections/${category.slug}` },
    openGraph: { images: [category.image] },
  };
}

export default async function CollectionPage(props: PageProps<"/collections/[slug]">) {
  const { slug } = await props.params;
  const category = getCategory(slug);
  if (!category) notFound();

  return (
    <>
      <PageHero
        crumbs={[
          { href: "/", label: "Home" },
          { href: "/shop", label: "Shop" },
        ]}
        eyebrow="Collection"
        title={category.name}
        intro={category.blurb}
      />
      <section className="container-page py-14 md:py-20">
        <ShopBrowser category={category.slug} />
      </section>
    </>
  );
}

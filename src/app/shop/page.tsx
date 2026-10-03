import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { ShopBrowser } from "@/components/shop-browser";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Ritual kits, fortified bracelets and waist beads, spiritual oils and cleansing soaps, each prepared for a clear purpose.",
  alternates: { canonical: "/shop" },
};

export default function ShopPage() {
  return (
    <>
      <PageHero
        eyebrow="The shop"
        title={
          <>
            Private spiritual <em className="font-normal text-sage-300">instruments</em>
          </>
        }
        intro="For clarity, protection, and blessings. Each one prepared for a clear purpose."
      />
      <section className="container-page py-14 md:py-20">
        <ShopBrowser />
      </section>
    </>
  );
}

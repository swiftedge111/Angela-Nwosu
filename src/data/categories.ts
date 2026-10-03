export type CategorySlug =
  | "sacred-ritual-kits-and-spiritual-sets"
  | "fortified-spiritual-tools-and-accessories"
  | "cleansing-reset-preparations";

export type Category = {
  slug: CategorySlug;
  name: string;
  shortName: string;
  blurb: string;
  image: string;
};

export const categories: Category[] = [
  {
    slug: "sacred-ritual-kits-and-spiritual-sets",
    name: "Sacred Ritual Kits & Spiritual Sets",
    shortName: "Ritual Kits",
    blurb: "Complete sets prepared for one clear purpose: cleansing, good luck, abundance, love, marriage and liberation.",
    image: "/images/products/marriage-intention-kit/03.webp",
  },
  {
    slug: "fortified-spiritual-tools-and-accessories",
    name: "Fortified Spiritual Tools & Accessories",
    shortName: "Fortified Tools",
    blurb: "Bracelets, waist beads and oils you wear and live with, fortified for protection, luck and attraction.",
    image: "/images/products/money-magnet-bracelet/01.webp",
  },
  {
    slug: "cleansing-reset-preparations",
    name: "Cleansing & Reset Preparations",
    shortName: "Cleansing & Reset",
    blurb: "Spiritual soaps for clearing heavy energy and starting again.",
    image: "/images/products/liberation-soap/01.webp",
  },
];

export function getCategory(slug: string) {
  return categories.find((c) => c.slug === slug);
}

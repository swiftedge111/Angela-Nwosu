import type { CategorySlug } from "./categories";

export type ProductImage = { src: string; alt: string };

export type Product = {
  slug: string;
  name: string;
  sku: string;
  categories: CategorySlug[];
  description: string;
  /** Naira price from the old site. The USD price is derived from it in lib/pricing.ts. */
  priceNgn: number;
  images: ProductImage[];
};

export const products: Product[] = [
  {
    slug: "slimming-mix",
    name: "Slimming Mix",
    sku: "AngN88375861",
    categories: [],
    description:
      "AngieNation Slimming Mix is a natural blend of very active ingredients that promotes safe fat loss, alongside eating healthy and discipline. You are on your way to a healthier lifestyle and slimmer body.",
    priceNgn: 70049,
    images: [
      { src: "/images/products/slimming-mix/01.webp", alt: "Slimming Mix" },
    ],
  },
  {
    slug: "money-magnet-bracelet",
    name: "Money Magnet Bracelet",
    sku: "AngN76474909",
    categories: ["fortified-spiritual-tools-and-accessories"],
    description:
      "This money magnet bracelet is specially fortified to align your mindset and daily energy with money. Combined prosperity-focused crystals to help you manifest money luck, career growth, reduce financial stress, boost confidence, and attract new income opportunities. It is fortified with the buyer’s name for more focused effect.",
    priceNgn: 132168,
    images: [
      { src: "/images/products/money-magnet-bracelet/01.webp", alt: "Money Magnet Bracelet" },
      { src: "/images/products/money-magnet-bracelet/02.webp", alt: "Money Magnet Bracelet, view 2" },
    ],
  },
  {
    slug: "prosperity-oil",
    name: "Prosperity Oil",
    sku: "",
    categories: ["fortified-spiritual-tools-and-accessories"],
    description:
      "Carefully sourced from natural oils and essences known for their traditional association with prosperity, success, and financial growth, this blend is created to support your journey in business and abundance.",
    priceNgn: 145385,
    images: [
      { src: "/images/products/prosperity-oil/01.webp", alt: "Prosperity Oil" },
      { src: "/images/products/prosperity-oil/02.webp", alt: "Prosperity Oil, view 2" },
      { src: "/images/products/prosperity-oil/03.webp", alt: "Prosperity Oil, view 3" },
    ],
  },
  {
    slug: "marriage-intention-kit",
    name: "Marriage Intention Kit",
    sku: "",
    categories: ["sacred-ritual-kits-and-spiritual-sets"],
    description:
      "A consecrated intention-setting kit created to draw divine partnership, restore peace in marriage, and remove spiritual blockages affecting love, commitment, and emotional connection.",
    priceNgn: 264336,
    images: [
      { src: "/images/products/marriage-intention-kit/01.webp", alt: "Marriage Intention Kit" },
      { src: "/images/products/marriage-intention-kit/02.webp", alt: "Marriage Intention Kit, view 2" },
      { src: "/images/products/marriage-intention-kit/03.webp", alt: "Marriage Intention Kit, view 3" },
    ],
  },
  {
    slug: "attraction-soap",
    name: "Attraction Soap",
    sku: "",
    categories: ["cleansing-reset-preparations"],
    description:
      "Our Attraction Soap is a spiritually prepared cleansing bar created to help align your energy with favour, abundance, love, and opportunities. Each bar is intentionally formulated and spiritually charged using natural ingredients, herbs, and ancestral principles to support energetic cleansing and attraction work. This soap is designed for those who understand that what you carry energetically determines what you attract physically.",
    priceNgn: 89874,
    images: [
      { src: "/images/products/attraction-soap/01.webp", alt: "Attraction Soap" },
      { src: "/images/products/attraction-soap/02.webp", alt: "Attraction Soap, view 2" },
    ],
  },
  {
    slug: "liberation-soap",
    name: "Liberation Soap",
    sku: "",
    categories: ["cleansing-reset-preparations"],
    description:
      "Liberation Soap is a spiritually prepared cleansing bar created to cleanse harmful energy and guard your spirit from ill intentions. Handcrafted with spiritual precision and focused intention, it supports goodluck, spiritual protection, clarity of mind, and a return to inner peace.",
    priceNgn: 89874,
    images: [
      { src: "/images/products/liberation-soap/01.webp", alt: "Liberation Soap" },
      { src: "/images/products/liberation-soap/02.webp", alt: "Liberation Soap, view 2" },
      { src: "/images/products/liberation-soap/03.webp", alt: "Liberation Soap, view 3" },
    ],
  },
  {
    slug: "fortified-premium-goodluck-waistbeads",
    name: "Fortified Premium Goodluck Waistbeads",
    sku: "AngN28672371",
    categories: ["fortified-spiritual-tools-and-accessories"],
    description:
      "Super charged waist beads, prepared to connect your Aura to favor, good luck, and to remove all blockages attached to your being through intimacy. Each set is specially fortified with the buyer’s name and date of birth, for focused flow of favor and protection.",
    priceNgn: 132168,
    images: [
      { src: "/images/products/fortified-premium-goodluck-waistbeads/01.webp", alt: "Fortified Premium Goodluck Waistbeads" },
      { src: "/images/products/fortified-premium-goodluck-waistbeads/02.webp", alt: "Fortified Premium Goodluck Waistbeads, view 2" },
      { src: "/images/products/fortified-premium-goodluck-waistbeads/03.webp", alt: "Fortified Premium Goodluck Waistbeads, view 3" },
    ],
  },
  {
    slug: "fortified-evil-eye-protection-bracelet",
    name: "Fortified Evil Eye Protection Bracelet",
    sku: "AngN44572203",
    categories: ["fortified-spiritual-tools-and-accessories"],
    description:
      "Prepared for protection against the evil eye, jealousy, and negative intentions. Each bracelet is specifically fortified with the buyer’s name and date of birth to deflect harmful energy and preserve peace and spiritual safety.",
    priceNgn: 66084,
    images: [
      { src: "/images/products/fortified-evil-eye-protection-bracelet/01.webp", alt: "Fortified Evil Eye Protection Bracelet" },
      { src: "/images/products/fortified-evil-eye-protection-bracelet/02.webp", alt: "Fortified Evil Eye Protection Bracelet, view 2" },
      { src: "/images/products/fortified-evil-eye-protection-bracelet/03.webp", alt: "Fortified Evil Eye Protection Bracelet, view 3" },
    ],
  },
  {
    slug: "fortified-tiger-eye-bracelet",
    name: "Fortified Tiger Eye Bracelet",
    sku: "AngN48472201",
    categories: ["fortified-spiritual-tools-and-accessories"],
    description:
      "Infused with grounding and protective energy to strengthen courage, confidence, focus, and inner power. Each bracelet is specifically fortified with the buyer’s name and date of birth to provide personalized spiritual protection.",
    priceNgn: 105734,
    images: [
      { src: "/images/products/fortified-tiger-eye-bracelet/01.webp", alt: "Fortified Tiger Eye Bracelet" },
      { src: "/images/products/fortified-tiger-eye-bracelet/02.webp", alt: "Fortified Tiger Eye Bracelet, view 2" },
      { src: "/images/products/fortified-tiger-eye-bracelet/03.webp", alt: "Fortified Tiger Eye Bracelet, view 3" },
    ],
  },
  {
    slug: "fortified-ruby-and-emerald-waistbead",
    name: "Fortified Ruby and Emerald Waistbead",
    sku: "AngN51272200",
    categories: ["fortified-spiritual-tools-and-accessories"],
    description:
      "A sacred waistbead, woven with Ruby and Emerald to awaken life force, protect your aura, and align you with abundance. Fortified with the buyer’s name, Ruby ignites passion and strength, while Emerald opens the heart to prosperity, harmony and divine favour.",
    priceNgn: 158602,
    images: [
      { src: "/images/products/fortified-ruby-and-emerald-waistbead/01.webp", alt: "Fortified Ruby and Emerald Waistbead" },
      { src: "/images/products/fortified-ruby-and-emerald-waistbead/02.webp", alt: "Fortified Ruby and Emerald Waistbead, view 2" },
      { src: "/images/products/fortified-ruby-and-emerald-waistbead/03.webp", alt: "Fortified Ruby and Emerald Waistbead, view 3" },
    ],
  },
  {
    slug: "love-peace-ritual-kit",
    name: "Love & Peace Ritual Kit",
    sku: "AngN85672199",
    categories: ["sacred-ritual-kits-and-spiritual-sets"],
    description:
      "A sacred kit created to attract love, restore peace in relationships, heal emotional tension, and remove energetic conflicts. It supports emotional stability, understanding, and lasting connection.",
    priceNgn: 264336,
    images: [
      { src: "/images/products/love-peace-ritual-kit/01.webp", alt: "Love & Peace Ritual Kit" },
    ],
  },
  {
    slug: "liberation-ritual-kit",
    name: "Liberation Ritual Kit",
    sku: "AngN91572197",
    categories: ["sacred-ritual-kits-and-spiritual-sets"],
    description:
      "A deeply transformative kit crafted for spiritual release and renewal. It is used to break negative cycles, ancestral limitations, emotional heaviness, and unseen spiritual restraints, opening the way for freedom and rebirth.",
    priceNgn: 376679,
    images: [
      { src: "/images/products/liberation-ritual-kit/01.webp", alt: "Liberation Ritual Kit" },
      { src: "/images/products/liberation-ritual-kit/02.webp", alt: "Liberation Ritual Kit, view 2" },
      { src: "/images/products/liberation-ritual-kit/03.webp", alt: "Liberation Ritual Kit, view 3" },
    ],
  },
  {
    slug: "abundance-ritual-kit",
    name: "Abundance Ritual Kit",
    sku: "AngN11272196",
    categories: ["sacred-ritual-kits-and-spiritual-sets"],
    description:
      "A sacred ritual kit designed to activate prosperity, financial stability, and sustained blessings. It works to dissolve scarcity patterns and align your energy with abundance in all forms.",
    priceNgn: 264336,
    images: [
      { src: "/images/products/abundance-ritual-kit/01.webp", alt: "Abundance Ritual Kit" },
      { src: "/images/products/abundance-ritual-kit/02.webp", alt: "Abundance Ritual Kit, view 2" },
      { src: "/images/products/abundance-ritual-kit/03.webp", alt: "Abundance Ritual Kit, view 3" },
    ],
  },
  {
    slug: "attraction-oil",
    name: "Attraction Oil",
    sku: "AngN12872732",
    categories: ["fortified-spiritual-tools-and-accessories"],
    description:
      "Sourced from carefully selected natural oils and essences, this blend is created with intention, purity, and spiritual awareness. Each ingredient is chosen for its energetic properties traditionally associated with attracting love, good fortune, success, and positive energy.",
    priceNgn: 145385,
    images: [
      { src: "/images/products/attraction-oil/01.webp", alt: "Attraction Oil" },
      { src: "/images/products/attraction-oil/02.webp", alt: "Attraction Oil, view 2" },
      { src: "/images/products/attraction-oil/03.webp", alt: "Attraction Oil, view 3" },
    ],
  },
  {
    slug: "goodluck-prayer-kit",
    name: "Goodluck Prayer Kit",
    sku: "AngN14572194",
    categories: ["sacred-ritual-kits-and-spiritual-sets"],
    description:
      "A spiritually prepared prayer kit for attracting divine favor, open doors, and aligned opportunities. When used with intention, it harmonizes your path with blessings meant for you by destiny.",
    priceNgn: 264336,
    images: [
      { src: "/images/products/goodluck-prayer-kit/01.webp", alt: "Goodluck Prayer Kit" },
      { src: "/images/products/goodluck-prayer-kit/02.webp", alt: "Goodluck Prayer Kit, view 2" },
      { src: "/images/products/goodluck-prayer-kit/03.webp", alt: "Goodluck Prayer Kit, view 3" },
    ],
  },
  {
    slug: "aura-cleansing-kit",
    name: "Aura Cleansing Kit",
    sku: "AngN18472193",
    categories: ["sacred-ritual-kits-and-spiritual-sets"],
    description:
      "Designed to purify, strengthen, and seal the aura. This kit clears energetic stains, emotional residue, and spiritual interference, allowing your natural light, protection, and attraction power to flow freely once again.",
    priceNgn: 264336,
    images: [
      { src: "/images/products/aura-cleansing-kit/01.webp", alt: "Aura Cleansing Kit" },
      { src: "/images/products/aura-cleansing-kit/02.webp", alt: "Aura Cleansing Kit, view 2" },
      { src: "/images/products/aura-cleansing-kit/03.webp", alt: "Aura Cleansing Kit, view 3" },
    ],
  },
  {
    slug: "energy-cleansing-kit",
    name: "Energy Cleansing Kit",
    sku: "AngN44972192",
    categories: ["sacred-ritual-kits-and-spiritual-sets"],
    description:
      "A sacred cleansing set created to dissolve heavy, stagnant, and negative energies from the spirit. This kit works deeply to restore energetic balance, calm emotional turbulence, and realign you with inner peace and clarity.",
    priceNgn: 264336,
    images: [
      { src: "/images/products/energy-cleansing-kit/01.webp", alt: "Energy Cleansing Kit" },
      { src: "/images/products/energy-cleansing-kit/02.webp", alt: "Energy Cleansing Kit, view 2" },
      { src: "/images/products/energy-cleansing-kit/03.webp", alt: "Energy Cleansing Kit, view 3" },
    ],
  },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getProducts(slugs: string[]) {
  return slugs.map((slug) => getProduct(slug)).filter((p): p is Product => Boolean(p));
}

export function getProductsInCategory(category: CategorySlug) {
  return products.filter((p) => p.categories.includes(category));
}

// Curated lists carried over from the old homepage.
export const featuredSlugs = [
  "money-magnet-bracelet",
  "goodluck-prayer-kit",
  "aura-cleansing-kit",
  "abundance-ritual-kit",
  "slimming-mix",
  "fortified-premium-goodluck-waistbeads",
  "energy-cleansing-kit",
  "attraction-oil",
];

export const bestsellerSlugs = [
  "goodluck-prayer-kit",
  "fortified-ruby-and-emerald-waistbead",
  "abundance-ritual-kit",
  "fortified-premium-goodluck-waistbeads",
  "fortified-evil-eye-protection-bracelet",
];

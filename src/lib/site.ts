export const site = {
  name: "AngieNation",
  owner: "Angela Nwosu",
  tagline: "A quieter way to win at life",
  description: "Private spiritual instruments for clarity, protection, and blessings.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://angelanwosu.com",
  email: "shop@angelanwosu.com",
  /** International format, digits only. */
  whatsapp: "971585866736",
  whatsappDisplay: "+971 58 586 6736",
  locations: ["Nigeria", "UAE", "United States"],
  locationsShort: ["Nigeria", "UAE", "US"],
  socials: {
    instagram: "https://www.instagram.com/angelanwosu",
    facebook: "https://www.facebook.com/share/184yhL9FeE/",
    youtube: "https://www.youtube.com/@angelanwosuvlog",
  },
  /** Live chat turns on when this is set (Smartsupp dashboard → Settings → Chat box → Code). */
  smartsuppKey: process.env.NEXT_PUBLIC_SMARTSUPP_KEY ?? "",
  /** Optional Smartsupp group (Settings → Groups) to route this site's chats to. Expert/Ultimate plans. */
  smartsuppGroup: process.env.NEXT_PUBLIC_SMARTSUPP_GROUP ?? "",
} as const;

export const nav = [
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "About Angie" },
  { href: "/shipping", label: "Shipping" },
  { href: "/contact", label: "Contact" },
] as const;

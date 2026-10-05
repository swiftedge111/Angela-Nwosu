/** Accepts the bare key or the whole Smartsupp embed snippet pasted by mistake. */
function smartsuppKeyFrom(value = "") {
  return (value.match(/_smartsupp\.key\s*=\s*['"]([^'"]+)['"]/)?.[1] ?? value).trim();
}

export const site = {
  name: "AngieNation",
  owner: "Angela Nwosu",
  tagline: "A quieter way to win at life",
  description: "Private spiritual instruments for clarity, protection, and blessings.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://angelanwosu.com",
  email: "shop@angelanwosu.com",
  /** International format, digits only. */
  whatsapp: "2347048141088",
  whatsappDisplay: "+234 704 814 1088",
  locations: ["Nigeria", "UAE", "United States"],
  locationsShort: ["Nigeria", "UAE", "US"],
  socials: {
    tiktok: "https://www.tiktok.com/@angelanwosuu",
    tiktokHandle: "@angelanwosuu",
    // Hidden for now, at the client's request. Uncomment here and in footer.tsx / contact-channels.tsx to bring back.
    // instagram: "https://www.instagram.com/angelanwosu",
    // facebook: "https://www.facebook.com/share/184yhL9FeE/",
    // youtube: "https://www.youtube.com/@angelanwosuvlog",
  },
  /** Smartsupp chat box key (Smartsupp dashboard → Settings → Chat box → Code). Public by design. */
  smartsuppKey: smartsuppKeyFrom(process.env.NEXT_PUBLIC_SMARTSUPP_KEY) || "49eaec818c77ea08c5f1112fb85be04ef31968de",
  /** Optional Smartsupp group (Settings → Groups) to route this site's chats to. Expert/Ultimate plans. */
  smartsuppGroup: process.env.NEXT_PUBLIC_SMARTSUPP_GROUP ?? "",
} as const;

export const nav = [
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "About Angie" },
  { href: "/shipping", label: "Shipping" },
  { href: "/contact", label: "Contact" },
] as const;

import type { MetadataRoute } from "next";
import { categories } from "@/data/categories";
import { products } from "@/data/products";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/shop", "/about", "/contact", "/shipping"];
  return [
    ...pages.map((path) => ({ url: `${site.url}${path}`, priority: path === "" ? 1 : 0.7 })),
    ...categories.map((c) => ({ url: `${site.url}/collections/${c.slug}`, priority: 0.8 })),
    ...products.map((p) => ({ url: `${site.url}/product/${p.slug}`, priority: 0.9 })),
  ];
}

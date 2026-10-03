"use client";

import Link from "next/link";
import { useDeferredValue, useMemo, useState } from "react";
import { LuSearch, LuX } from "react-icons/lu";
import { categories, type CategorySlug } from "@/data/categories";
import { featuredSlugs, getProductsInCategory, products } from "@/data/products";
import { priceCents } from "@/lib/pricing";
import { ProductCard } from "./product-card";

const sorts = {
  featured: "Featured",
  "price-asc": "Price: low to high",
  "price-desc": "Price: high to low",
  name: "Name: A to Z",
} as const;

type Sort = keyof typeof sorts;

const featuredRank = (slug: string) => {
  const i = featuredSlugs.indexOf(slug);
  return i === -1 ? featuredSlugs.length : i;
};

export function ShopBrowser({ category }: { category?: CategorySlug }) {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<Sort>("featured");
  const deferredQuery = useDeferredValue(query);

  const list = useMemo(() => {
    const q = deferredQuery.trim().toLowerCase();
    const base = category ? getProductsInCategory(category) : products;
    const matched = q
      ? base.filter((p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q))
      : base;
    return [...matched].sort((a, b) => {
      switch (sort) {
        case "price-asc":
          return priceCents(a) - priceCents(b);
        case "price-desc":
          return priceCents(b) - priceCents(a);
        case "name":
          return a.name.localeCompare(b.name);
        default:
          return featuredRank(a.slug) - featuredRank(b.slug);
      }
    });
  }, [category, deferredQuery, sort]);

  const chips = [{ href: "/shop", label: "All", active: !category }].concat(
    categories.map((c) => ({ href: `/collections/${c.slug}`, label: c.shortName, active: c.slug === category })),
  );

  return (
    <div>
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <nav aria-label="Collections" className="no-scrollbar -mx-5 overflow-x-auto px-5 md:mx-0 md:px-0">
          <ul className="flex gap-2">
            {chips.map((c) => (
              <li key={c.href}>
                <Link
                  href={c.href}
                  aria-current={c.active ? "page" : undefined}
                  className={`inline-flex h-10 items-center rounded-full px-5 text-sm font-semibold whitespace-nowrap transition ${
                    c.active
                      ? "bg-forest-800 text-ivory"
                      : "border border-forest-900/15 text-forest-800 hover:border-forest-800"
                  }`}
                >
                  {c.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex gap-3">
          <label className="relative flex-1 lg:w-64 lg:flex-none">
            <span className="sr-only">Search products</span>
            <LuSearch className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search"
              className="h-11 w-full rounded-full border border-forest-900/15 bg-white pr-10 pl-11 text-sm outline-none placeholder:text-muted/70 focus:border-forest-700 [&::-webkit-search-cancel-button]:hidden"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="absolute top-1/2 right-3 inline-flex size-6 -translate-y-1/2 items-center justify-center rounded-full text-muted hover:bg-sage-100"
              >
                <LuX className="size-3.5" />
              </button>
            )}
          </label>
          <label className="relative">
            <span className="sr-only">Sort products</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
              className="h-11 appearance-none rounded-full border border-forest-900/15 bg-white pr-10 pl-4 text-sm font-medium text-forest-900 outline-none focus:border-forest-700"
            >
              {Object.entries(sorts).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
            <span aria-hidden className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-xs text-muted">
              ▾
            </span>
          </label>
        </div>
      </div>

      <p className="mt-8 text-sm text-muted" aria-live="polite">
        {list.length} {list.length === 1 ? "piece" : "pieces"}
        {deferredQuery.trim() && <> matching &ldquo;{deferredQuery.trim()}&rdquo;</>}
      </p>

      {list.length > 0 ? (
        <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-10 md:gap-x-6 lg:grid-cols-4">
          {list.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      ) : (
        <div className="mt-6 rounded-[2rem] bg-sand/60 px-6 py-20 text-center">
          <p className="font-display text-3xl text-forest-900">Nothing found</p>
          <p className="mt-2 text-sm text-muted">Try another word, or tell us what you need and we&apos;ll guide you.</p>
          <button type="button" onClick={() => setQuery("")} className="mt-6 text-sm font-semibold text-forest-800 underline underline-offset-4">
            Clear search
          </button>
        </div>
      )}
    </div>
  );
}

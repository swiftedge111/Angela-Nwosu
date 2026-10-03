import type { Product } from "@/data/products";

/** The store shows prices in this currency only. */
export const currency = { code: "USD", locale: "en-US" } as const;

// Client rule (Oct 2026): USD price = old naira price ÷ 1400 + $50, not rounded.
const NGN_PER_USD = 1400;
const MARKUP_USD = 50;

/** Unit price in cents, so totals add up without floating-point drift. */
export function priceCents(product: Pick<Product, "priceNgn">) {
  // Work in cents from the start so a half cent (e.g. $100.035) is exact and rounds up.
  return Math.round((product.priceNgn * 100) / NGN_PER_USD) + MARKUP_USD * 100;
}

const formatter = new Intl.NumberFormat(currency.locale, {
  style: "currency",
  currency: currency.code,
});

export function formatCents(cents: number) {
  return formatter.format(cents / 100);
}

export function formatPrice(product: Pick<Product, "priceNgn">) {
  return formatCents(priceCents(product));
}

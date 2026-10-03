import { site } from "./site";
import { formatCents } from "./pricing";

export type OrderLine = { name: string; quantity: number; unitCents: number };

export type OrderDetails = {
  name?: string;
  country?: string;
  city?: string;
  phone?: string;
  note?: string;
};

export function orderTotalCents(lines: OrderLine[]) {
  return lines.reduce((sum, l) => sum + l.unitCents * l.quantity, 0);
}

/** Plain-text order that reads well in WhatsApp, live chat and email alike. */
export function buildOrderMessage(lines: OrderLine[], details: OrderDetails = {}) {
  const items = lines.map(
    (l) => `• ${l.name} × ${l.quantity}: ${formatCents(l.unitCents * l.quantity)}`,
  );
  const shipTo = [details.city, details.country].filter(Boolean).join(", ");
  const info = [
    details.name && `Name: ${details.name}`,
    shipTo && `Ship to: ${shipTo}`,
    details.phone && `Phone: ${details.phone}`,
    details.note && `Note: ${details.note}`,
  ].filter(Boolean);

  return [
    `Hello ${site.name}! I'd like to place an order.`,
    "",
    ...items,
    "",
    `Subtotal: ${formatCents(orderTotalCents(lines))} (shipping to be confirmed)`,
    ...(info.length ? ["", ...info] : []),
  ].join("\n");
}

export function whatsappUrl(text?: string) {
  const base = `https://wa.me/${site.whatsapp}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

export function mailtoUrl(subject: string, body: string) {
  return `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

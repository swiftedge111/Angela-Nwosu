"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { LuArrowLeft, LuShieldCheck, LuShoppingBag } from "react-icons/lu";
import { buildOrderMessage, type OrderDetails } from "@/lib/order";
import { formatCents } from "@/lib/pricing";
import { site } from "@/lib/site";
import { button } from "@/lib/ui";
import { orderSteps } from "../order-steps";
import { QuantityStepper } from "../quantity-stepper";
import { ChannelButtons, getChannel, SendStatus, sendVia, type SendResult } from "../send-channels";
import { useCart } from "./cart-provider";

const countries = ["United States", "Nigeria", "United Arab Emirates", "Other"];

const field =
  "h-12 w-full rounded-2xl border border-forest-900/15 bg-white px-4 text-sm outline-none transition placeholder:text-muted/60 focus:border-forest-700";

export function CartView() {
  const { lines, orderLines, subtotalCents, setQuantity, remove, clear, count } = useCart();
  const [sent, setSent] = useState<{ result: SendResult; message: string; id: number } | null>(null);

  if (lines.length === 0) {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center py-16 text-center">
        <span className="inline-flex size-20 items-center justify-center rounded-full bg-sage-100 text-forest-700">
          <LuShoppingBag className="size-8" />
        </span>
        <h2 className="mt-6 font-display text-4xl text-forest-900">Your bag is empty</h2>
        <p className="mt-3 text-muted">Choose what you need, and we&apos;ll prepare the right item for that purpose.</p>
        <Link href="/shop" className={`${button("primary", "lg")} mt-8`}>
          Browse the shop
        </Link>
      </div>
    );
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const channel = getChannel(e);
    const data = new FormData(e.currentTarget);
    const details: OrderDetails = {
      name: String(data.get("name") ?? "").trim(),
      country: String(data.get("country") ?? "").trim(),
      city: String(data.get("city") ?? "").trim(),
      phone: String(data.get("phone") ?? "").trim(),
      note: String(data.get("note") ?? "").trim(),
    };
    const message = buildOrderMessage(orderLines, details);
    const result = await sendVia(channel, message, `New order from ${details.name}`);
    setSent({ result, message, id: Date.now() });
  }

  return (
    <div className="grid gap-12 lg:grid-cols-[1.25fr_1fr] lg:gap-16">
      <div>
        <div className="flex items-center justify-between border-b border-forest-900/10 pb-4">
          <p className="text-sm text-muted">
            {count} {count === 1 ? "item" : "items"}
          </p>
          <button type="button" onClick={clear} className="text-sm font-semibold text-muted hover:text-forest-900">
            Clear bag
          </button>
        </div>
        <ul className="divide-y divide-forest-900/10">
          {lines.map(({ product, quantity, unitCents }) => (
            <li key={product.slug} className="flex gap-5 py-6">
              <Link
                href={`/product/${product.slug}`}
                className="relative size-28 shrink-0 overflow-hidden rounded-3xl bg-white ring-1 ring-forest-900/5 md:size-32"
              >
                <Image src={product.images[0].src} alt={product.images[0].alt} fill sizes="128px" className="object-cover" />
              </Link>
              <div className="flex min-w-0 flex-1 flex-col">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                  <Link href={`/product/${product.slug}`} className="font-display text-2xl leading-tight text-forest-900 hover:text-forest-600">
                    {product.name}
                  </Link>
                  <p className="font-semibold tabular-nums">{formatCents(unitCents * quantity)}</p>
                </div>
                <p className="mt-1 text-sm text-muted tabular-nums">{formatCents(unitCents)} each</p>
                <div className="mt-auto flex items-center gap-5 pt-4">
                  <QuantityStepper value={quantity} onChange={(q) => setQuantity(product.slug, q)} label={product.name} size="sm" />
                  <button
                    type="button"
                    onClick={() => remove(product.slug)}
                    className="text-sm font-semibold text-muted underline-offset-4 hover:text-forest-900 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <Link href="/shop" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-forest-800">
          <LuArrowLeft className="size-4" /> Continue shopping
        </Link>

        <div className="mt-12 rounded-[2rem] bg-sage-100 p-7 md:p-9">
          <h2 className="font-display text-3xl text-forest-900">How ordering works</h2>
          <ol className="mt-6 space-y-5">
            {orderSteps.map((s, i) => (
              <li key={s.title} className="flex gap-4">
                <span className="font-display text-3xl leading-none text-brass italic">0{i + 1}</span>
                <div>
                  <p className="font-semibold text-forest-900">{s.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="lg:sticky lg:top-28 lg:self-start">
        <div className="rounded-[2rem] bg-white p-7 ring-1 ring-forest-900/5 md:p-9">
          <h2 className="font-display text-3xl text-forest-900">Order summary</h2>
          <dl className="mt-6 space-y-3 border-b border-forest-900/10 pb-6 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted">Subtotal</dt>
              <dd className="font-semibold tabular-nums">{formatCents(subtotalCents)}</dd>
            </div>
            <div className="flex justify-between gap-6">
              <dt className="text-muted">Shipping</dt>
              <dd className="text-right text-muted">Confirmed with you</dd>
            </div>
          </dl>
          <div className="flex items-baseline justify-between py-6">
            <p className="font-semibold">Total before shipping</p>
            <p className="font-display text-4xl text-forest-900 lining-nums tabular-nums">{formatCents(subtotalCents)}</p>
          </div>

          <fieldset className="space-y-3">
            <legend className="eyebrow mb-4 text-brass">Your details</legend>
            <label className="block">
              <span className="sr-only">Full name</span>
              <input name="name" required autoComplete="name" placeholder="Full name *" className={field} />
            </label>
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="relative block">
                <span className="sr-only">Country</span>
                <select name="country" required defaultValue="" className={`${field} appearance-none pr-10`}>
                  <option value="" disabled>
                    Country *
                  </option>
                  {countries.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
                <span aria-hidden className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-xs text-muted">
                  ▾
                </span>
              </label>
              <label className="block">
                <span className="sr-only">City or state</span>
                <input name="city" autoComplete="address-level2" placeholder="City / state" className={field} />
              </label>
            </div>
            <label className="block">
              <span className="sr-only">Phone or WhatsApp number</span>
              <input name="phone" type="tel" autoComplete="tel" placeholder="Phone / WhatsApp (optional)" className={field} />
            </label>
            <label className="block">
              <span className="sr-only">Note</span>
              <textarea
                name="note"
                rows={3}
                placeholder="Anything we should know? e.g. the name to fortify your bracelet with"
                className={`${field} h-auto resize-none py-3`}
              />
            </label>
          </fieldset>

          <div className="mt-6">
            <ChannelButtons whatsappLabel="Send order on WhatsApp" />
          </div>

          {sent && <SendStatus key={sent.id} result={sent.result} message={sent.message} noun="order" />}

          <p className="mt-6 flex gap-2.5 text-xs leading-relaxed text-muted">
            <LuShieldCheck className="size-4 shrink-0 text-forest-700" />
            Nothing is charged on this site. {site.name} replies to confirm availability, shipping to your location and
            how to pay.
          </p>
        </div>
      </form>
    </div>
  );
}

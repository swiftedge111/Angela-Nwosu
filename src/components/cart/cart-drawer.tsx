"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { LuShoppingBag, LuX } from "react-icons/lu";
import { formatCents } from "@/lib/pricing";
import { button } from "@/lib/ui";
import { QuantityStepper } from "../quantity-stepper";
import { useCart } from "./cart-provider";

export function CartDrawer() {
  const { isOpen, closeCart, lines, subtotalCents, setQuantity, remove, count } = useCart();
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const previous = document.activeElement as HTMLElement | null;
    panelRef.current?.focus();
    document.documentElement.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeCart();
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      previous?.focus();
    };
  }, [isOpen, closeCart]);

  return (
    <div className={`fixed inset-0 z-50 ${isOpen ? "" : "pointer-events-none"}`} aria-hidden={!isOpen}>
      <div
        className={`absolute inset-0 bg-forest-950/40 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0"}`}
        onClick={closeCart}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Your bag"
        tabIndex={-1}
        inert={!isOpen}
        className={`absolute top-0 right-0 flex h-full w-full max-w-md flex-col bg-ivory shadow-2xl outline-none transition-transform duration-500 ease-[cubic-bezier(0.2,0.7,0.2,1)] ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-forest-900/10 px-6 py-5">
          <h2 className="font-display text-3xl text-forest-900">
            Your bag <span className="text-lg text-muted">({count})</span>
          </h2>
          <button
            type="button"
            onClick={closeCart}
            aria-label="Close bag"
            className="inline-flex size-10 items-center justify-center rounded-full transition hover:bg-sage-100"
          >
            <LuX className="size-5" />
          </button>
        </div>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-5 px-8 text-center">
            <span className="inline-flex size-16 items-center justify-center rounded-full bg-sage-100 text-forest-700">
              <LuShoppingBag className="size-7" />
            </span>
            <p className="font-display text-2xl text-forest-900">Your bag is empty</p>
            <p className="text-sm text-muted">Choose what you need. We&apos;ll prepare it for that purpose.</p>
            <Link href="/shop" onClick={closeCart} className={button("primary")}>
              Browse the shop
            </Link>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-forest-900/10 overflow-y-auto px-6">
              {lines.map(({ product, quantity, unitCents }) => (
                <li key={product.slug} className="flex gap-4 py-5">
                  <Link
                    href={`/product/${product.slug}`}
                    onClick={closeCart}
                    className="relative size-24 shrink-0 overflow-hidden rounded-2xl bg-white ring-1 ring-forest-900/5"
                  >
                    <Image src={product.images[0].src} alt={product.images[0].alt} fill sizes="96px" className="object-cover" />
                  </Link>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-start justify-between gap-3">
                      <Link
                        href={`/product/${product.slug}`}
                        onClick={closeCart}
                        className="font-display text-lg leading-tight text-forest-900 hover:text-forest-600"
                      >
                        {product.name}
                      </Link>
                      <p className="text-sm font-semibold tabular-nums">{formatCents(unitCents * quantity)}</p>
                    </div>
                    <div className="mt-auto flex items-center justify-between pt-3">
                      <QuantityStepper
                        value={quantity}
                        onChange={(q) => setQuantity(product.slug, q)}
                        label={product.name}
                        size="sm"
                      />
                      <button
                        type="button"
                        onClick={() => remove(product.slug)}
                        className="text-xs font-semibold text-muted underline-offset-4 hover:text-forest-900 hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="border-t border-forest-900/10 bg-sand/60 px-6 pt-5 pb-6">
              <div className="flex items-baseline justify-between">
                <p className="text-sm text-muted">Subtotal</p>
                <p className="font-display text-3xl text-forest-900 lining-nums tabular-nums">{formatCents(subtotalCents)}</p>
              </div>
              <p className="mt-1 text-xs text-muted">Shipping is confirmed with you when you send your order.</p>
              <Link href="/cart" onClick={closeCart} className={`${button("primary", "lg")} mt-5 w-full`}>
                Review &amp; send order
              </Link>
              <button
                type="button"
                onClick={closeCart}
                className="mt-3 w-full text-center text-sm font-semibold text-forest-800 underline-offset-4 hover:underline"
              >
                Continue shopping
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

"use client";

import { createContext, use, useMemo, useState, useSyncExternalStore } from "react";
import { getProduct, type Product } from "@/data/products";
import { priceCents } from "@/lib/pricing";
import type { OrderLine } from "@/lib/order";
import { cartStore } from "./cart-store";

export type CartLine = { product: Product; quantity: number; unitCents: number };

type CartUI = { isOpen: boolean; openCart: () => void; closeCart: () => void };

const CartUIContext = createContext<CartUI | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setOpen] = useState(false);
  const value = useMemo(
    () => ({ isOpen, openCart: () => setOpen(true), closeCart: () => setOpen(false) }),
    [isOpen],
  );
  return <CartUIContext value={value}>{children}</CartUIContext>;
}

export function useCart() {
  const ui = use(CartUIContext);
  if (!ui) throw new Error("useCart must be used inside <CartProvider>");

  const items = useSyncExternalStore(cartStore.subscribe, cartStore.getSnapshot, cartStore.getServerSnapshot);

  const lines = useMemo<CartLine[]>(
    () =>
      items.flatMap((i) => {
        const product = getProduct(i.slug);
        return product ? [{ product, quantity: i.quantity, unitCents: priceCents(product) }] : [];
      }),
    [items],
  );

  return {
    lines,
    count: lines.reduce((n, l) => n + l.quantity, 0),
    subtotalCents: lines.reduce((sum, l) => sum + l.unitCents * l.quantity, 0),
    orderLines: lines.map<OrderLine>((l) => ({ name: l.product.name, quantity: l.quantity, unitCents: l.unitCents })),
    add: cartStore.add,
    setQuantity: cartStore.setQuantity,
    remove: cartStore.remove,
    clear: cartStore.clear,
    ...ui,
  };
}

"use client";

import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa6";
import { getProduct } from "@/data/products";
import { buildOrderMessage, whatsappUrl } from "@/lib/order";
import { priceCents } from "@/lib/pricing";
import { button } from "@/lib/ui";
import { AddToBagButton } from "./cart/add-to-bag-button";
import { QuantityStepper } from "./quantity-stepper";

export function BuyBox({ slug }: { slug: string }) {
  const product = getProduct(slug)!;
  const [quantity, setQuantity] = useState(1);
  const message = buildOrderMessage([{ name: product.name, quantity, unitCents: priceCents(product) }]);

  return (
    <div className="space-y-3">
      <div className="flex gap-3">
        <QuantityStepper value={quantity} onChange={setQuantity} label={product.name} />
        <div className="flex-1">
          <AddToBagButton slug={product.slug} quantity={quantity} />
        </div>
      </div>
      <a href={whatsappUrl(message)} target="_blank" rel="noopener noreferrer" className={`${button("whatsapp", "lg")} w-full`}>
        <FaWhatsapp className="size-5" /> Order this on WhatsApp
      </a>
    </div>
  );
}

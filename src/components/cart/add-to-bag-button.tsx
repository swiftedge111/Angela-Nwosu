"use client";

import { useState } from "react";
import { LuCheck, LuPlus } from "react-icons/lu";
import { button } from "@/lib/ui";
import { useCart } from "./cart-provider";

export function AddToBagButton({
  slug,
  quantity = 1,
  variant = "full",
}: {
  slug: string;
  quantity?: number;
  variant?: "full" | "icon";
}) {
  const { add, openCart } = useCart();
  const [added, setAdded] = useState(false);

  function handleClick() {
    add(slug, quantity);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1600);
    if (variant === "full") openCart();
  }

  if (variant === "icon") {
    return (
      <button
        type="button"
        onClick={handleClick}
        aria-label="Add to bag"
        className="inline-flex size-11 items-center justify-center rounded-full bg-ivory/95 text-forest-900 shadow-lg backdrop-blur transition hover:bg-forest-800 hover:text-ivory"
      >
        {added ? <LuCheck className="size-5" /> : <LuPlus className="size-5" />}
      </button>
    );
  }

  return (
    <button type="button" onClick={handleClick} className={`${button("primary", "lg")} w-full`}>
      {added ? <LuCheck className="size-5" /> : null}
      {added ? "Added to bag" : "Add to bag"}
    </button>
  );
}

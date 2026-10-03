"use client";

import { LuMinus, LuPlus } from "react-icons/lu";

export function QuantityStepper({
  value,
  onChange,
  label,
  min = 1,
  max = 20,
  size = "md",
}: {
  value: number;
  onChange: (value: number) => void;
  label: string;
  min?: number;
  max?: number;
  size?: "sm" | "md";
}) {
  const h = size === "sm" ? "h-9" : "h-14";
  const w = size === "sm" ? "w-9" : "w-12";
  return (
    <div className={`inline-flex items-center rounded-full border border-forest-900/15 bg-white ${h}`}>
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        aria-label={`Decrease quantity of ${label}`}
        className={`inline-flex ${h} ${w} items-center justify-center rounded-full text-forest-900 transition hover:bg-sage-100 disabled:opacity-30`}
      >
        <LuMinus className="size-3.5" />
      </button>
      <span className="min-w-6 text-center text-sm font-semibold tabular-nums" aria-live="polite" aria-label={`Quantity ${value}`}>
        {value}
      </span>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        aria-label={`Increase quantity of ${label}`}
        className={`inline-flex ${h} ${w} items-center justify-center rounded-full text-forest-900 transition hover:bg-sage-100 disabled:opacity-30`}
      >
        <LuPlus className="size-3.5" />
      </button>
    </div>
  );
}

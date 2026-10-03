"use client";

import Image from "next/image";
import { useState } from "react";
import type { ProductImage } from "@/data/products";

export function ProductGallery({ images }: { images: ProductImage[] }) {
  const [active, setActive] = useState(0);
  const current = images[active];

  return (
    <div className="flex flex-col gap-4 lg:flex-row-reverse lg:items-start">
      <div className="relative aspect-square flex-1 overflow-hidden rounded-[2rem] bg-white ring-1 ring-forest-900/5">
        <Image
          key={current.src}
          src={current.src}
          alt={current.alt}
          fill
          preload={active === 0}
          sizes="(min-width: 1024px) 45vw, 100vw"
          className="animate-[fade-up_0.5s_ease-out_both] object-cover"
        />
      </div>
      {images.length > 1 && (
        <ul className="flex gap-3 lg:flex-col" aria-label="Product photos">
          {images.map((img, i) => (
            <li key={img.src}>
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Show photo ${i + 1} of ${images.length}`}
                aria-current={i === active}
                className={`relative block size-20 overflow-hidden rounded-2xl bg-white ring-1 transition md:size-24 ${
                  i === active ? "ring-2 ring-forest-700" : "ring-forest-900/10 opacity-70 hover:opacity-100"
                }`}
              >
                <Image src={img.src} alt="" fill sizes="96px" className="object-cover" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

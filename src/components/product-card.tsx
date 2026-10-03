import Image from "next/image";
import Link from "next/link";
import { getCategory } from "@/data/categories";
import type { Product } from "@/data/products";
import { formatPrice } from "@/lib/pricing";
import { AddToBagButton } from "./cart/add-to-bag-button";

export function ProductCard({ product, sizes }: { product: Product; sizes?: string }) {
  const [primary, secondary] = product.images;
  const category = product.categories[0] && getCategory(product.categories[0]);
  const href = `/product/${product.slug}`;

  return (
    <article className="group relative flex flex-col">
      <div className="relative aspect-square overflow-hidden rounded-[1.75rem] bg-white ring-1 ring-forest-900/5">
        <Link href={href} aria-label={product.name} className="absolute inset-0">
          <Image
            src={primary.src}
            alt={primary.alt}
            fill
            sizes={sizes ?? "(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"}
            className={`object-cover transition duration-700 ease-out group-hover:scale-[1.04] ${secondary ? "group-hover:opacity-0" : ""}`}
          />
          {secondary && (
            <Image
              src={secondary.src}
              alt=""
              fill
              sizes={sizes ?? "(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"}
              className="scale-[1.04] object-cover opacity-0 transition duration-700 ease-out group-hover:scale-100 group-hover:opacity-100"
            />
          )}
        </Link>
        <div className="absolute right-3 bottom-3 translate-y-0 opacity-100 transition duration-300 md:translate-y-2 md:opacity-0 md:group-focus-within:translate-y-0 md:group-focus-within:opacity-100 md:group-hover:translate-y-0 md:group-hover:opacity-100">
          <AddToBagButton slug={product.slug} variant="icon" />
        </div>
      </div>

      <div className="flex flex-1 flex-col px-1 pt-4">
        {category && <p className="eyebrow text-sage-500">{category.shortName}</p>}
        <h3 className="mt-1.5 font-display text-[1.35rem] leading-tight text-forest-900">
          <Link href={href} className="transition hover:text-forest-600">
            {product.name}
          </Link>
        </h3>
        <p className="mt-2 text-sm font-semibold text-ink tabular-nums">{formatPrice(product)}</p>
      </div>
    </article>
  );
}

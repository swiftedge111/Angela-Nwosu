import Link from "next/link";
import { button } from "@/lib/ui";

export default function NotFound() {
  return (
    <section className="container-page flex flex-col items-center py-28 text-center md:py-40">
      <p className="eyebrow text-brass">Page not found</p>
      <h1 className="mt-5 max-w-xl font-display text-5xl leading-tight font-medium text-forest-900 md:text-6xl">
        This path didn&apos;t open, but another one will.
      </h1>
      <p className="mt-5 max-w-md text-muted">The page you&apos;re looking for has moved or no longer exists.</p>
      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <Link href="/shop" className={button("primary", "lg")}>
          Visit the shop
        </Link>
        <Link href="/" className={button("outline", "lg")}>
          Back home
        </Link>
      </div>
    </section>
  );
}

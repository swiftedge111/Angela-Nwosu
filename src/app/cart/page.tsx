import type { Metadata } from "next";
import { CartView } from "@/components/cart/cart-view";

export const metadata: Metadata = {
  title: "Your bag",
  robots: { index: false },
};

export default function CartPage() {
  return (
    <div className="container-page py-12 md:py-16">
      <p className="eyebrow text-brass">Review &amp; send</p>
      <h1 className="mt-3 font-display text-5xl font-medium text-forest-900 md:text-6xl">Your bag</h1>
      <div className="mt-10">
        <CartView />
      </div>
    </div>
  );
}

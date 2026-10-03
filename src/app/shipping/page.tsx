import type { Metadata } from "next";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa6";
import { LuGlobe, LuPackageCheck, LuRefreshCw } from "react-icons/lu";
import { ContactChannels } from "@/components/contact-channels";
import { OrderSteps } from "@/components/order-steps";
import { PageHero } from "@/components/page-hero";
import { whatsappUrl } from "@/lib/order";
import { site } from "@/lib/site";
import { button } from "@/lib/ui";

export const metadata: Metadata = {
  title: "Shipping & returns",
  description: `${site.name} ships worldwide, including to Nigeria, the UAE and the United States. Shipping is confirmed with you for every order.`,
  alternates: { canonical: "/shipping" },
};

// Placeholder until the client sends her shipping, returns and exchange policy:
// every question is routed to WhatsApp / live chat / email.
const topics = [
  {
    Icon: LuGlobe,
    title: "Where we ship",
    body: `We ship worldwide, including to ${site.locations.join(", ")}.`,
  },
  {
    Icon: LuPackageCheck,
    title: "Shipping costs & delivery times",
    body: "These depend on where you are and what you order. We confirm the exact cost and timing with you before you pay.",
  },
  {
    Icon: LuRefreshCw,
    title: "Returns & exchanges",
    body: "Have a question about an order, a return or an exchange? Message us and we'll take care of it with you directly.",
  },
];

export default function ShippingPage() {
  return (
    <>
      <PageHero
        eyebrow="Shipping & returns"
        title="Worldwide shipping, confirmed personally."
        intro="Every order is confirmed with you directly, so you always know the shipping cost and timing before you pay."
      >
        <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className={`${button("whatsapp", "lg")} mt-10`}>
          <FaWhatsapp className="size-5" /> Ask about shipping
        </a>
      </PageHero>

      <section className="container-page py-16 md:py-24">
        <ul className="grid gap-4 md:grid-cols-3">
          {topics.map(({ Icon, title, body }) => (
            <li key={title} className="rounded-[1.75rem] bg-white p-8 ring-1 ring-forest-900/5">
              <span className="inline-flex size-12 items-center justify-center rounded-full bg-sage-100 text-forest-700">
                <Icon className="size-5" />
              </span>
              <h2 className="mt-6 font-display text-2xl text-forest-900">{title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">{body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section id="ordering" className="scroll-mt-28 bg-sage-100 py-20 md:py-24">
        <div className="container-page">
          <p className="eyebrow text-brass">How to order</p>
          <h2 className="mt-4 max-w-2xl font-display text-4xl leading-tight font-medium text-forest-900 md:text-5xl">
            Order in a message. No account needed.
          </h2>
          <div className="mt-12">
            <OrderSteps />
          </div>
          <Link href="/shop" className={`${button("primary", "lg")} mt-10`}>
            Start shopping
          </Link>
        </div>
      </section>

      <section className="container-page py-20 md:py-24">
        <h2 className="font-display text-4xl font-medium text-forest-900">Talk to us</h2>
        <div className="mt-10">
          <ContactChannels />
        </div>
      </section>
    </>
  );
}

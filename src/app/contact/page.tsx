import type { Metadata } from "next";
import { LuMapPin } from "react-icons/lu";
import { ContactChannels } from "@/components/contact-channels";
import { ContactForm } from "@/components/contact-form";
import { PageHero } from "@/components/page-hero";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Reach ${site.name} on WhatsApp, by email or on Instagram. Orders, enquiries and complaints welcome.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Get in touch"
        title="We'd love to hear from you."
        intro="Want to get in touch? Here's how you can reach us."
      >
        <p className="mt-8 inline-flex items-center gap-2 rounded-full border border-ivory/15 px-4 py-2 text-sm text-sage-200">
          <LuMapPin className="size-4 text-brass-light" /> {site.locations.join(" · ")}
        </p>
      </PageHero>

      <section className="container-page py-16 md:py-24">
        <ContactChannels />
      </section>

      <section className="pb-24 md:pb-32">
        <div className="container-page">
          <div className="grid gap-12 rounded-[2.5rem] bg-sand/70 p-7 md:p-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <div>
              <p className="eyebrow text-brass">Send us a message</p>
              <h2 className="mt-4 font-display text-4xl leading-tight font-medium text-forest-900 md:text-5xl">
                Write it here, send it your way.
              </h2>
              <p className="mt-5 leading-relaxed text-muted">
                Type your message, then choose how to send it. It opens in WhatsApp or your email app, ready to go, so
                our reply comes straight back to you.
              </p>
            </div>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}

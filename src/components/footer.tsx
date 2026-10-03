import Link from "next/link";
import { FaFacebookF, FaInstagram, FaWhatsapp, FaYoutube } from "react-icons/fa6";
import { LuMail, LuMapPin } from "react-icons/lu";
import { categories } from "@/data/categories";
import { whatsappUrl } from "@/lib/order";
import { currency } from "@/lib/pricing";
import { site } from "@/lib/site";
import { Logo } from "./logo";

const socials = [
  { href: site.socials.instagram, label: "Instagram", Icon: FaInstagram },
  { href: site.socials.facebook, label: "Facebook", Icon: FaFacebookF },
  { href: site.socials.youtube, label: "YouTube", Icon: FaYoutube },
];

export function Footer() {
  return (
    <footer className="bg-forest-950 text-sage-200">
      <div className="container-page grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] lg:py-20">
        <div className="max-w-sm">
          <Logo tone="white" className="h-16 w-auto" />
          <p className="mt-6 font-display text-2xl leading-snug text-ivory italic">{site.description}</p>
          <ul className="mt-6 flex gap-3">
            {socials.map(({ href, label, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${site.name} on ${label}`}
                  className="inline-flex size-10 items-center justify-center rounded-full border border-sage-200/20 transition hover:border-brass-light hover:text-brass-light"
                >
                  <Icon className="size-4" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <FooterColumn title="Shop">
          <FooterLink href="/shop">All products</FooterLink>
          {categories.map((c) => (
            <FooterLink key={c.slug} href={`/collections/${c.slug}`}>
              {c.shortName}
            </FooterLink>
          ))}
        </FooterColumn>

        <FooterColumn title="Help">
          <FooterLink href="/shipping#ordering">How to order</FooterLink>
          <FooterLink href="/shipping">Shipping &amp; returns</FooterLink>
          <FooterLink href="/about">About Angie</FooterLink>
          <FooterLink href="/contact">Contact</FooterLink>
        </FooterColumn>

        <FooterColumn title="Get in touch">
          <li>
            <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5 transition hover:text-ivory">
              <FaWhatsapp className="size-4 text-whatsapp" /> {site.whatsappDisplay}
            </a>
          </li>
          <li>
            <a href={`mailto:${site.email}`} className="inline-flex items-center gap-2.5 transition hover:text-ivory">
              <LuMail className="size-4 text-brass-light" /> {site.email}
            </a>
          </li>
          <li className="inline-flex items-center gap-2.5">
            <LuMapPin className="size-4 text-brass-light" /> {site.locations.join(" · ")}
          </li>
        </FooterColumn>
      </div>

      <div className="border-t border-sage-200/10">
        <div className="container-page flex flex-col gap-2 py-6 text-xs text-sage-400 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name} · {site.owner}
          </p>
          <p>All prices in {currency.code}. Shipping is confirmed with you before payment.</p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="eyebrow text-brass-light">{title}</h2>
      <ul className="mt-5 space-y-3 text-sm">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="transition hover:text-ivory">
        {children}
      </Link>
    </li>
  );
}

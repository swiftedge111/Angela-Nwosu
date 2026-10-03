"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { LuMenu, LuSearch, LuShoppingBag, LuX } from "react-icons/lu";
import { FaWhatsapp } from "react-icons/fa6";
import { nav, site } from "@/lib/site";
import { whatsappUrl } from "@/lib/order";
import { useCart } from "./cart/cart-provider";
import { Logo } from "./logo";

export function Header() {
  const pathname = usePathname();
  const { count, openCart } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu whenever the route changes.
  const [menuPath, setMenuPath] = useState(pathname);
  if (menuPath !== pathname) {
    setMenuPath(pathname);
    setMenuOpen(false);
  }

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      {/* Tapping anywhere outside the open menu closes it. */}
      {menuOpen && (
        <div
          aria-hidden
          className="fixed inset-0 z-30 bg-forest-950/30 backdrop-blur-[2px] lg:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}
      <header
        className={`sticky top-0 z-40 border-b transition-colors duration-300 ${
          scrolled || menuOpen
            ? "border-forest-900/10 bg-ivory/90 backdrop-blur-xl"
            : "border-transparent bg-ivory"
        }`}
      >
        <div className="container-page grid h-20 grid-cols-[1fr_auto_1fr] items-center">
          <div className="flex items-center gap-1">
            <button
              type="button"
              className="-ml-2 inline-flex size-11 items-center justify-center rounded-full text-forest-900 lg:hidden"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen((o) => !o)}
            >
              {menuOpen ? <LuX className="size-6" /> : <LuMenu className="size-6" />}
            </button>
            <nav aria-label="Main" className="hidden items-center gap-8 lg:flex">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative text-[0.8rem] font-semibold tracking-[0.14em] uppercase transition-colors after:absolute after:-bottom-1.5 after:left-0 after:h-px after:bg-brass after:transition-all ${
                    isActive(item.href)
                      ? "text-forest-900 after:w-full"
                      : "text-muted after:w-0 hover:text-forest-900 hover:after:w-full"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <Logo className="h-14 w-auto md:h-16" />

          <div className="flex items-center justify-end gap-1 md:gap-2">
            <Link
              href="/shop"
              aria-label="Search the shop"
              className="hidden size-11 items-center justify-center rounded-full text-forest-900 transition hover:bg-sage-100 sm:inline-flex"
            >
              <LuSearch className="size-5" />
            </Link>
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Chat with ${site.name} on WhatsApp`}
              className="hidden size-11 items-center justify-center rounded-full text-forest-900 transition hover:bg-sage-100 sm:inline-flex"
            >
              <FaWhatsapp className="size-5" />
            </a>
            <button
              type="button"
              onClick={openCart}
              className="relative inline-flex h-11 items-center gap-2 rounded-full bg-forest-800 pr-4 pl-3.5 text-ivory transition hover:bg-forest-700"
              aria-label={`Open bag, ${count} item${count === 1 ? "" : "s"}`}
            >
              <LuShoppingBag className="size-[18px]" />
              <span className="text-sm font-semibold tabular-nums">{count}</span>
            </button>
          </div>
        </div>

        {menuOpen && (
          <nav id="mobile-menu" aria-label="Mobile" className="border-t border-forest-900/10 bg-ivory lg:hidden">
            <ul className="container-page flex flex-col py-4">
              {[{ href: "/", label: "Home" }, ...nav].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="flex items-center justify-between border-b border-forest-900/5 py-4 font-display text-2xl text-forest-900"
                  >
                    {item.label}
                    <span aria-hidden className="text-brass">
                      →
                    </span>
                  </Link>
                </li>
              ))}
              <li className="pt-5">
                <a
                  href={whatsappUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-forest-800"
                >
                  <FaWhatsapp className="size-5 text-whatsapp" /> {site.whatsappDisplay}
                </a>
              </li>
            </ul>
          </nav>
        )}
      </header>
    </>
  );
}

"use client";

import { useEffect, useRef } from "react";
import { FaWhatsapp } from "react-icons/fa6";
import { LuMail } from "react-icons/lu";
import { whatsappUrl } from "@/lib/order";
import { site } from "@/lib/site";

const GAP = 12;

const buttons = [
  {
    href: `mailto:${site.email}?subject=${encodeURIComponent(`Enquiry from ${new URL(site.url).host}`)}`,
    label: "Email us",
    Icon: LuMail,
    className: "bg-brass text-white",
    external: false,
  },
  {
    href: whatsappUrl(),
    label: "Chat on WhatsApp",
    Icon: FaWhatsapp,
    className: "bg-whatsapp text-white",
    external: true,
  },
];

/**
 * Floating Email and WhatsApp buttons in one column. With live chat on, the
 * column stacks above the Smartsupp bubble and follows it, since Smartsupp
 * raises the bubble when it shows a notification.
 */
export function SupportButtons({ stackAboveChat }: { stackAboveChat: boolean }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!stackAboveChat) return;

    const place = () => {
      const column = ref.current;
      const bubble = document.getElementById("widgetButtonFrame")?.parentElement;
      if (!column || !bubble) return;
      const rect = bubble.getBoundingClientRect();
      if (!rect.height) return; // hidden while the chat window is open
      // Prefer Smartsupp's own target position over the rect, which lags behind its animation.
      const bottom = parseFloat(bubble.style.bottom);
      const right = parseFloat(bubble.style.right);
      column.style.bottom = `${(Number.isFinite(bottom) ? bottom : innerHeight - rect.bottom) + rect.height + GAP}px`;
      column.style.right = `${(Number.isFinite(right) ? right : innerWidth - rect.right) + (rect.width - column.offsetWidth) / 2}px`;
    };

    const observer = new MutationObserver(place);
    observer.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ["style"] });
    window.addEventListener("resize", place);
    place();
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", place);
    };
  }, [stackAboveChat]);

  return (
    <div
      ref={ref}
      className={`fixed z-30 flex flex-col gap-3 transition-all duration-300 ${
        // Until Smartsupp loads, sit where its bubble will appear (56px, 12px right, 4px bottom).
        stackAboveChat ? "right-3 bottom-[72px]" : "right-5 bottom-5"
      }`}
    >
      {buttons.map(({ href, label, Icon, className, external }) => (
        <a
          key={label}
          href={href}
          aria-label={label}
          {...(external && { target: "_blank", rel: "noopener noreferrer" })}
          className={`group relative inline-flex size-14 items-center justify-center rounded-full shadow-[0_12px_30px_-8px_rgba(18,40,28,0.55)] transition hover:scale-105 ${className}`}
        >
          <Icon className="size-6" />
          <span className="pointer-events-none absolute right-full mr-3 rounded-full bg-forest-950 px-3 py-1.5 text-xs font-semibold whitespace-nowrap text-ivory opacity-0 transition group-hover:opacity-100">
            {label}
          </span>
        </a>
      ))}
    </div>
  );
}

"use client";

import { useEffect, useRef } from "react";
import { FaWhatsapp } from "react-icons/fa6";
import { whatsappUrl } from "@/lib/order";

const GAP = 12;

/**
 * Floating WhatsApp button. With live chat on, it stacks above the Smartsupp
 * bubble and follows it, since Smartsupp raises the bubble when it shows a
 * notification.
 */
export function WhatsAppFloat({ stackAboveChat }: { stackAboveChat: boolean }) {
  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!stackAboveChat) return;

    const place = () => {
      const button = ref.current;
      const bubble = document.getElementById("widgetButtonFrame")?.parentElement;
      if (!button || !bubble) return;
      const rect = bubble.getBoundingClientRect();
      if (!rect.height) return; // hidden while the chat window is open
      // Prefer Smartsupp's own target position over the rect, which lags behind its animation.
      const bottom = parseFloat(bubble.style.bottom);
      const right = parseFloat(bubble.style.right);
      button.style.bottom = `${(Number.isFinite(bottom) ? bottom : innerHeight - rect.bottom) + rect.height + GAP}px`;
      button.style.right = `${(Number.isFinite(right) ? right : innerWidth - rect.right) + (rect.width - button.offsetWidth) / 2}px`;
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
    <a
      ref={ref}
      href={whatsappUrl()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className={`group fixed z-30 inline-flex size-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-[0_12px_30px_-8px_rgba(18,40,28,0.55)] transition-all duration-300 hover:scale-105 ${
        // Until Smartsupp loads, sit where its bubble will appear (56px, 12px right, 4px bottom).
        stackAboveChat ? "right-3 bottom-[72px]" : "right-5 bottom-5"
      }`}
    >
      <FaWhatsapp className="size-7" />
      <span className="pointer-events-none absolute right-full mr-3 rounded-full bg-forest-950 px-3 py-1.5 text-xs font-semibold whitespace-nowrap text-ivory opacity-0 transition group-hover:opacity-100">
        Chat on WhatsApp
      </span>
    </a>
  );
}

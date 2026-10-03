import Script from "next/script";
import { FaWhatsapp } from "react-icons/fa6";
import { liveChatVariables } from "@/lib/live-chat";
import { whatsappUrl } from "@/lib/order";
import { site } from "@/lib/site";

/** Floating WhatsApp button plus the Smartsupp live chat (only when a key is configured). */
export function ChatWidgets() {
  return (
    <>
      <a
        href={whatsappUrl()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className={`group fixed z-30 inline-flex size-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-[0_12px_30px_-8px_rgba(18,40,28,0.55)] transition hover:scale-105 ${
          // Smartsupp owns the bottom-right corner (bubble, greeting pop-up and chat window).
          site.smartsuppKey ? "bottom-5 left-5" : "right-5 bottom-5"
        }`}
      >
        <FaWhatsapp className="size-7" />
        <span
          className={`pointer-events-none absolute ${site.smartsuppKey ? "left-full ml-3" : "right-full mr-3"} rounded-full bg-forest-950 px-3 py-1.5 text-xs font-semibold whitespace-nowrap text-ivory opacity-0 transition group-hover:opacity-100`}
        >
          Chat on WhatsApp
        </span>
      </a>

      {/* Not id="smartsupp": an element id becomes a window global and would shadow the loader. */}
      {site.smartsuppKey && (
        <Script id="smartsupp-loader" strategy="lazyOnload">
          {`var _smartsupp = _smartsupp || {};
_smartsupp.key = ${JSON.stringify(site.smartsuppKey)};
window.smartsupp||(function(d) {
  var s,c,o=smartsupp=function(){ o._.push(arguments)};o._=[];
  s=d.getElementsByTagName('script')[0];c=d.createElement('script');
  c.type='text/javascript';c.charset='utf-8';c.async=true;
  c.src='https://www.smartsuppchat.com/loader.js?';s.parentNode.insertBefore(c,s);
})(document);
smartsupp('variables', ${JSON.stringify(liveChatVariables)});${
            site.smartsuppGroup ? `\nsmartsupp('group', ${JSON.stringify(site.smartsuppGroup)});` : ""
          }`}
        </Script>
      )}
    </>
  );
}

import Script from "next/script";
import { liveChatVariables } from "@/lib/live-chat";
import { site } from "@/lib/site";
import { SupportButtons } from "./support-buttons";

/** Floating Email and WhatsApp buttons plus the Smartsupp live chat (only when a key is configured). */
export function ChatWidgets() {
  return (
    <>
      <SupportButtons stackAboveChat={Boolean(site.smartsuppKey)} />

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

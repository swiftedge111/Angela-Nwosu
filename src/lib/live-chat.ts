import { site } from "./site";

declare global {
  interface Window {
    smartsupp?: (...args: unknown[]) => void;
  }
}

export const liveChatEnabled = Boolean(site.smartsuppKey);

/**
 * Labels every chat from this site, so it can be told apart when the same
 * Smartsupp account also serves another website. Shows in the visitor info
 * panel in Smartsupp (JavaScript API: Expert and Ultimate plans).
 */
export const liveChatVariables = { Website: `${site.owner} (${new URL(site.url).host})` };

/**
 * Opens the Smartsupp chat with the order typed into the message box (not sent)
 * and attached to the visitor as a variable.
 */
export function openLiveChat(order?: string) {
  if (typeof window === "undefined" || !window.smartsupp) return false;
  if (order) {
    window.smartsupp("variables", { ...liveChatVariables, Order: order });
    window.smartsupp("chat:message", order);
  }
  window.smartsupp("chat:open");
  return true;
}

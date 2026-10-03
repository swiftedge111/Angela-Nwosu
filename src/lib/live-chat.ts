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
 * Opens the Smartsupp chat. The customer pastes the order themselves: typing it
 * in for them (`chat:message` / `chat:send`) needs the Expert/Ultimate plan.
 * The order is also attached as a visitor variable, shown on those plans.
 */
export function openLiveChat(order?: string) {
  if (typeof window === "undefined" || !window.smartsupp) return false;
  if (order) window.smartsupp("variables", { ...liveChatVariables, Order: order });
  window.smartsupp("chat:open");
  return true;
}

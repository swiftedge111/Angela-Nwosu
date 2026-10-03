"use client";

import { FaWhatsapp } from "react-icons/fa6";
import { LuMail, LuMessageCircle } from "react-icons/lu";
import { liveChatEnabled, openLiveChat } from "@/lib/live-chat";
import { mailtoUrl, whatsappUrl } from "@/lib/order";
import { button } from "@/lib/ui";

export type Channel = "whatsapp" | "chat" | "email";

export type SendResult = "opened" | "copied" | "unavailable";

/** Hands the message to the chosen channel. Must run inside a click/submit handler. */
export async function sendVia(channel: Channel, message: string, subject: string): Promise<SendResult> {
  if (channel === "whatsapp") {
    window.open(whatsappUrl(message), "_blank", "noopener,noreferrer");
    return "opened";
  }
  if (channel === "email") {
    window.location.href = mailtoUrl(subject, message);
    return "opened";
  }
  // The chat box is pre-filled with the order, but that needs a Smartsupp plan with
  // the JavaScript API, so also copy it for the customer to paste.
  let copied = false;
  try {
    await navigator.clipboard.writeText(message);
    copied = true;
  } catch {}
  if (!openLiveChat(message)) return "unavailable";
  return copied ? "copied" : "opened";
}

export function getChannel(e: React.FormEvent<HTMLFormElement>): Channel {
  const submitter = (e.nativeEvent as SubmitEvent).submitter as HTMLButtonElement | null;
  return (submitter?.value as Channel) || "whatsapp";
}

/** Submit buttons for a form: one per channel. Read the choice with getChannel(). */
export function ChannelButtons({ whatsappLabel = "Send on WhatsApp" }: { whatsappLabel?: string }) {
  return (
    <div className="flex flex-col gap-3">
      <button type="submit" name="channel" value="whatsapp" className={`${button("whatsapp", "lg")} w-full`}>
        <FaWhatsapp className="size-5" /> {whatsappLabel}
      </button>
      <div className={`grid gap-3 ${liveChatEnabled ? "sm:grid-cols-2" : ""}`}>
        {liveChatEnabled && (
          <button type="submit" name="channel" value="chat" className={`${button("outline")} w-full`}>
            <LuMessageCircle className="size-4" /> Live chat
          </button>
        )}
        <button type="submit" name="channel" value="email" className={`${button("outline")} w-full`}>
          <LuMail className="size-4" /> Send by email
        </button>
      </div>
    </div>
  );
}

export function sendResultNote(result: SendResult | null) {
  switch (result) {
    case "copied":
      return "Your order is ready in the chat window. Press send. If the box is empty, paste it in: we've copied it for you.";
    case "unavailable":
      return "Live chat is still loading. Try again in a moment, or use WhatsApp.";
    case "opened":
      return "Your message is ready. Just press send, and we'll reply to confirm shipping and payment.";
    default:
      return null;
  }
}

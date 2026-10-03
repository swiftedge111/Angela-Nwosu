"use client";

import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa6";
import { LuCheck, LuCopy, LuMail, LuMessageCircle, LuX } from "react-icons/lu";
import { liveChatEnabled, openLiveChat } from "@/lib/live-chat";
import { mailtoUrl, whatsappUrl } from "@/lib/order";
import { button } from "@/lib/ui";

export type Channel = "whatsapp" | "chat" | "email";

export type SendResult = "opened" | "copied" | "copy-failed" | "unavailable";

/** What the customer is sending, for wording: an order (bag) or a message (contact form). */
export type Noun = "order" | "message";

async function copy(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

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
  // Her Smartsupp plan can't type into the chat for the customer (that needs the
  // Expert/Ultimate JavaScript API), so copy the text for them to paste.
  const copied = await copy(message);
  if (!openLiveChat(message)) return "unavailable";
  return copied ? "copied" : "copy-failed";
}

export function getChannel(e: React.FormEvent<HTMLFormElement>): Channel {
  const submitter = (e.nativeEvent as SubmitEvent).submitter as HTMLButtonElement | null;
  return (submitter?.value as Channel) || "whatsapp";
}

/** Submit buttons for a form: one per channel. Read the choice with getChannel(). */
export function ChannelButtons({ whatsappLabel = "Send on WhatsApp", noun = "order" }: { whatsappLabel?: string; noun?: Noun }) {
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
      {liveChatEnabled && (
        <p className="text-xs leading-relaxed text-muted">
          <strong className="font-semibold text-forest-800">Live chat:</strong> we copy your {noun} and open the chat.
          Paste it into the message box and press send.
        </p>
      )}
    </div>
  );
}

function pasteHint() {
  if (window.matchMedia("(pointer: coarse)").matches) return "tap and hold in the box, then tap Paste";
  return /Mac|iPhone|iPad/.test(navigator.userAgent) ? "press ⌘ + V" : "press Ctrl + V";
}

/**
 * Status shown after sending. Live-chat paste instructions float on the left,
 * clear of the Smartsupp window that opens on the right.
 */
export function SendStatus({ result, message, noun }: { result: SendResult | null; message: string; noun: Noun }) {
  const [copiedAgain, setCopiedAgain] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  if (!result || dismissed) return null;
  const floating = result === "copied" || result === "copy-failed";

  const copyButton = (
    <button
      type="button"
      onClick={async () => setCopiedAgain(await copy(message))}
      className="inline-flex items-center gap-1.5 text-xs font-semibold text-forest-800 underline-offset-4 hover:underline"
    >
      {copiedAgain ? <LuCheck className="size-3.5" /> : <LuCopy className="size-3.5" />}
      {copiedAgain ? "Copied" : result === "copy-failed" ? `Copy ${noun}` : `Copy ${noun} again`}
    </button>
  );

  return (
    <div
      role="status"
      className={
        floating
          ? "fixed inset-x-4 bottom-4 z-40 rounded-2xl bg-ivory p-5 pr-12 text-sm text-forest-800 shadow-[0_24px_60px_-20px_rgba(13,28,20,0.55)] ring-1 ring-forest-900/10 sm:inset-x-auto sm:left-5 sm:max-w-sm"
          : "mt-5 rounded-2xl bg-sage-100 px-4 py-4 text-sm text-forest-800"
      }
    >
      {floating && (
        <button
          type="button"
          onClick={() => setDismissed(true)}
          aria-label="Close instructions"
          className="absolute top-3 right-3 inline-flex size-8 items-center justify-center rounded-full text-muted hover:bg-sage-100"
        >
          <LuX className="size-4" />
        </button>
      )}
      {result === "opened" && (
        <p>
          Your {noun} is ready. Just press send
          {noun === "order" ? ", and we'll reply to confirm shipping and payment." : "."}
        </p>
      )}

      {result === "unavailable" && <p>Live chat is still loading. Try again in a moment, or use WhatsApp.</p>}

      {result === "copied" && (
        <>
          <p className="flex items-center gap-2 font-semibold">
            <LuCheck className="size-4" /> Your {noun} is copied
          </p>
          <ol className="mt-2 list-decimal space-y-1 pl-5">
            <li>In the chat window, click the box that says &ldquo;Type your message here&rdquo;.</li>
            <li>Paste your {noun}: {pasteHint()}.</li>
            <li>Press send.</li>
          </ol>
          <div className="mt-3">{copyButton}</div>
        </>
      )}

      {result === "copy-failed" && (
        <>
          <p>Copy your {noun} below, paste it into the chat window and press send.</p>
          <textarea
            readOnly
            value={message}
            rows={6}
            onFocus={(e) => e.currentTarget.select()}
            className="mt-3 w-full resize-none rounded-xl border border-forest-900/15 bg-white p-3 font-mono text-xs text-ink"
          />
          <div className="mt-2">{copyButton}</div>
        </>
      )}
    </div>
  );
}

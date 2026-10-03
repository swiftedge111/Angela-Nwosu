"use client";

import { useState } from "react";
import { ChannelButtons, getChannel, SendStatus, sendVia, type SendResult } from "./send-channels";

const field =
  "w-full rounded-2xl border border-forest-900/15 bg-white px-4 text-sm outline-none transition placeholder:text-muted/60 focus:border-forest-700";

export function ContactForm() {
  const [sent, setSent] = useState<{ result: SendResult; message: string; id: number } | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const channel = getChannel(e);
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    const text = [`Hello AngieNation, this is ${name}${email ? ` (${email})` : ""}.`, "", message].join("\n");
    const result = await sendVia(channel, text, `Message from ${name}`);
    setSent({ result, message: text, id: Date.now() });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="block">
          <span className="sr-only">Your name</span>
          <input name="name" required autoComplete="name" placeholder="Your name *" className={`${field} h-12`} />
        </label>
        <label className="block">
          <span className="sr-only">Your email</span>
          <input name="email" type="email" autoComplete="email" placeholder="Your email" className={`${field} h-12`} />
        </label>
      </div>
      <label className="block">
        <span className="sr-only">Your message</span>
        <textarea name="message" required rows={5} placeholder="Your message *" className={`${field} resize-none py-3`} />
      </label>
      <div className="pt-3">
        <ChannelButtons noun="message" />
      </div>
      {sent && <SendStatus key={sent.id} result={sent.result} message={sent.message} noun="message" />}
    </form>
  );
}

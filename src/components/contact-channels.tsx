"use client";

import { FaInstagram, FaWhatsapp } from "react-icons/fa6";
import { LuArrowUpRight, LuMail, LuMessageCircle } from "react-icons/lu";
import { liveChatEnabled, openLiveChat } from "@/lib/live-chat";
import { whatsappUrl } from "@/lib/order";
import { site } from "@/lib/site";

const card =
  "group flex h-full flex-col rounded-[1.75rem] bg-white p-7 text-left ring-1 ring-forest-900/5 transition hover:-translate-y-1 hover:shadow-[0_24px_50px_-30px_rgba(18,40,28,0.45)]";

function CardBody({ Icon, iconClass, title, detail, body }: { Icon: React.ElementType; iconClass: string; title: string; detail: string; body: string }) {
  return (
    <>
      <span className="flex items-start justify-between">
        <span className={`inline-flex size-12 items-center justify-center rounded-full ${iconClass}`}>
          <Icon className="size-5" />
        </span>
        <LuArrowUpRight className="size-5 text-muted transition group-hover:text-forest-900" />
      </span>
      <span className="mt-8 font-display text-2xl text-forest-900">{title}</span>
      <span className="mt-1 text-sm font-semibold text-forest-700">{detail}</span>
      <span className="mt-3 text-sm leading-relaxed text-muted">{body}</span>
    </>
  );
}

export function ContactChannels() {
  return (
    <ul className={`grid gap-4 sm:grid-cols-2 ${liveChatEnabled ? "lg:grid-cols-4" : "lg:grid-cols-3"}`}>
      <li>
        <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className={card}>
          <CardBody
            Icon={FaWhatsapp}
            iconClass="bg-whatsapp/15 text-[#128c4a]"
            title="WhatsApp"
            detail={site.whatsappDisplay}
            body="Orders, enquiries and complaints. The quickest way to reach us."
          />
        </a>
      </li>
      {liveChatEnabled && (
        <li>
          <button type="button" onClick={() => openLiveChat()} className={`${card} w-full`}>
            <CardBody
              Icon={LuMessageCircle}
              iconClass="bg-sage-100 text-forest-700"
              title="Live chat"
              detail="Right here on the site"
              body="Chat with us without leaving the page."
            />
          </button>
        </li>
      )}
      <li>
        <a href={`mailto:${site.email}`} className={card}>
          <CardBody
            Icon={LuMail}
            iconClass="bg-sand text-brass"
            title="Email"
            detail={site.email}
            body="For longer questions or anything you'd rather put in writing."
          />
        </a>
      </li>
      <li>
        <a href={site.socials.instagram} target="_blank" rel="noopener noreferrer" className={card}>
          <CardBody
            Icon={FaInstagram}
            iconClass="bg-[#f6e7ee] text-[#b4316b]"
            title="Instagram"
            detail="@angelanwosu"
            body="Follow along and send us a DM."
          />
        </a>
      </li>
    </ul>
  );
}

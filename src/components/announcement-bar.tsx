import { LuMail } from "react-icons/lu";
import { FaWhatsapp } from "react-icons/fa6";
import { site } from "@/lib/site";
import { whatsappUrl } from "@/lib/order";

export function AnnouncementBar() {
  return (
    <div className="bg-forest-950 text-sage-200">
      <div className="container-page flex h-10 items-center justify-center gap-6 text-[0.7rem] tracking-[0.1em] uppercase sm:tracking-[0.16em] md:justify-between">
        <a href={`mailto:${site.email}`} className="hidden items-center gap-2 transition hover:text-ivory md:inline-flex">
          <LuMail className="size-3.5" /> {site.email}
        </a>
        <p className="truncate">
          Worldwide shipping <span className="mx-2 text-brass-light">✦</span>
          <span className="sm:hidden">{site.locationsShort.join(" · ")}</span>
          <span className="hidden sm:inline">{site.locations.join(" · ")}</span>
        </p>
        <a
          href={whatsappUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden items-center gap-2 transition hover:text-ivory md:inline-flex"
        >
          <FaWhatsapp className="size-3.5" /> Order on WhatsApp
        </a>
      </div>
    </div>
  );
}

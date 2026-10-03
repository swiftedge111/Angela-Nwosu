import Image from "next/image";
import Link from "next/link";
import logoColor from "@/assets/logo-color.webp";
import logoWhite from "@/assets/logo-white.webp";

export function Logo({ tone = "color", className = "h-14 w-auto" }: { tone?: "color" | "white"; className?: string }) {
  return (
    <Link href="/" aria-label="AngieNation home" className="inline-flex shrink-0">
      <Image
        src={tone === "white" ? logoWhite : logoColor}
        alt="AngieNation"
        width={72}
        className={className}
        preload={tone === "color"}
      />
    </Link>
  );
}

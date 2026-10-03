import type { Metadata, Viewport } from "next";
import { Allura, Cormorant_Garamond, Manrope } from "next/font/google";
import { AnnouncementBar } from "@/components/announcement-bar";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { CartProvider } from "@/components/cart/cart-provider";
import { ChatWidgets } from "@/components/chat-widgets";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { site } from "@/lib/site";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const allura = Allura({
  variable: "--font-allura",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | ${site.owner}`,
    template: `%s | ${site.name}`,
  },
  description: `${site.description} Ritual kits, fortified bracelets, waist beads, oils and cleansing soaps, prepared personally by Angie.`,
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_US",
  },
};

export const viewport: Viewport = {
  themeColor: "#12281c",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${cormorant.variable} ${manrope.variable} ${allura.variable} antialiased`}>
      <body className="flex min-h-dvh flex-col">
        <CartProvider>
          <a
            href="#main"
            className="sr-only z-50 rounded-full bg-forest-900 px-4 py-2 text-ivory focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
          >
            Skip to content
          </a>
          <AnnouncementBar />
          <Header />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
          <CartDrawer />
          <ChatWidgets />
        </CartProvider>
      </body>
    </html>
  );
}

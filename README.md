# AngieNation

Website for **AngieNation by Angela Nwosu**: spiritual ritual kits, fortified bracelets and waist beads, oils and cleansing soaps.

Built with Next.js 16 (App Router), React 19 and Tailwind CSS 4. There are no accounts and no online payment: customers fill a bag and send the order as a message by **WhatsApp**, **Smartsupp live chat** or **email**, and the order is confirmed with them directly.

## Run it

```bash
npm install
cp .env.example .env.local   # optional: add the Smartsupp key
npm run dev                  # http://localhost:3000
npm run build && npm start   # production build
```

## Where things live

| To change… | Edit |
|---|---|
| Products (names, descriptions, photos, naira price) | `src/data/products.ts` |
| Featured / bestseller lists on the homepage | `featuredSlugs` and `bestsellerSlugs` in `src/data/products.ts` |
| Collections | `src/data/categories.ts` |
| Currency, exchange rate and markup | `src/lib/pricing.ts` |
| WhatsApp number, email, socials, locations | `src/lib/site.ts` |
| Colours and fonts | `src/app/globals.css` (`@theme`) and `src/app/layout.tsx` |
| Product photos | `public/images/products/<product-slug>/` |

### Pricing

Prices show in **USD only**. Each product keeps its old naira price (`priceNgn`), and the USD price is worked out in `src/lib/pricing.ts`:

```
USD = naira price ÷ 1400 + $50   (to the cent, not rounded further)
```

To change the rate or the markup, edit `NGN_PER_USD` / `MARKUP_USD`. To switch currency, change `currency` in the same file.

### Live chat (Smartsupp)

Set `NEXT_PUBLIC_SMARTSUPP_KEY` in `.env.local` and in the hosting dashboard. While it's empty, the live-chat buttons stay hidden and WhatsApp and email ordering still work.

The same Smartsupp account can serve this site and another one. Chats from this site can be told apart:

- **Any plan:** the visitor's browsing history in Smartsupp shows the pages they're on (hover a page title to see its `angelanwosu.com` URL), and order messages start with "Hello AngieNation!".
- **Expert / Ultimate plans** (Smartsupp's JavaScript API): every visitor gets a `Website: Angela Nwosu (angelanwosu.com)` variable in the visitor info panel. Orders sent via live chat are typed into the chat box and attached as an `Order` variable. Setting `NEXT_PUBLIC_SMARTSUPP_GROUP` routes this site's chats to their own Smartsupp group (Settings → Groups).

On plans without the JavaScript API, the order is also copied so the customer can paste it.

### Domain and old site URLs

The site lives at **angelanwosu.com** (`NEXT_PUBLIC_SITE_URL`). The old site was angienation.com (WordPress).

Old WordPress paths (`/product/...`, `/shop/`, `/product-category/...`, `/checkout/`, `/delivery-and-returns/`, …) redirect to the matching new pages (see `next.config.ts`). For old links to reach this site, add **angienation.com** to the same hosting project as a redirect to angelanwosu.com, keeping the path. Then `angienation.com/product/attraction-oil/` → `angelanwosu.com/product/attraction-oil`.

## Still to come from the client

- Real shipping, returns and exchange policy (`src/app/shipping/page.tsx` currently routes these questions to WhatsApp / chat / email)
- Privacy policy and terms
- Smartsupp key

`scraped/` holds everything captured from the old site (see `scraped/CONTENT.md`).

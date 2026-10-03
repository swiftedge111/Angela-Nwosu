# AngieNation: content captured from angienation.com

Scraped 2026-10-03 from the live WordPress + WooCommerce site (Flatsome theme).
Everything here is the build source for the rebuild.

## Folder layout

| Path | What it is |
|---|---|
| `products.json` | **Main data file.** 17 products: name, slug, SKU, category, description, local image paths, prices (NGN, new USD, current USD) |
| `PRICES.md` | Price sheet for review with the client |
| `images/products/<slug>/01..03.*` | Product photos, full size, in gallery order |
| `images/site/` | Logo (colour + white), favicon, hero video, homepage section images, Angie's portrait |
| `images/media-library/` | Every file in the WordPress media library (125 files, 50 MB). Includes unused logo drafts, stock photos and videos |
| `pages/*.html`, `pages/text/*.md` | Raw HTML and readable text of every page |
| `screenshots/` | Reference screenshots of the live design |
| `raw/` | Raw API responses (products in NGN and USD, categories, pages, media) |
| `build_catalog.py` | Regenerates `products.json` and `PRICES.md` from `raw/` |

## Pricing (USD)

Client rule: **USD = NGN price ÷ 1400 + $50**. The NGN source is the naira price the site shows Nigerian visitors.
See `PRICES.md`.

> Note: WooCommerce already holds USD prices ($50 to $285). The naira prices are auto-converted from them at about ₦1,321.68/$.
> `products.json` keeps both figures (`usd_new` and `usd_currently_on_site`).

## Brand

- **Name:** AngieNation (by Angela Nwosu). Site title: "AngieNation | Angela Nwosu"
- **Tagline (hero):** *A Quieter Way To Win At Life*. "Private spiritual instruments for clarity, protection, and blessings."
- **Locations:** Nigeria | UAE (**US being added**)
- **Email:** shop@angienation.com
- **WhatsApp (floating button):** +971 58 586 6736
- **Instagram:** https://www.instagram.com/angelanwosu
- **Facebook:** https://www.facebook.com/share/184yhL9FeE/
- **YouTube:** http://www.youtube.com/@angelanwosuvlog

### Design tokens (from the live site)

| Token | Value | Used for |
|---|---|---|
| Primary green | `#265c17` | Top bar, links, headings accent, logo |
| Secondary tan | `#cc9966` | Bestsellers section bg, Add to Cart button, "With Love and Intention" |
| Link hover gold | `#cd9f03` | Link hover |
| Hero overlay green | `rgba(1, 86, 44, 0.7)` | "Bring your life back into balance" banner |
| Body text | `#4a4a4a` | Body |
| Light section bg | `#f5f5f5` | How It Works, Special Note |
| Footer bg | `#333333` | Footer |
| Heading font | **EB Garamond** (italic 500 for section titles) | Headings, product names, body serif |
| UI font | **Poppins** 400/500 | Nav, prices, buttons, long-form paragraphs |
| Signature font | **Alagambe** (fonts.cdnfonts.com) | "Angie" sign-off |

## Site structure (live)

### Header (every page)
- Top bar (green): "Welcome to AngieNation" · "Worldwide Shipping Available" · location "Nigeria | UAE" · Email link · Facebook/Instagram/YouTube icons
- Main header: nav **Home · Shop · Contact** (left), logo (centre; white over hero, colour when sticky), search · Login / Register · cart count (right)

### Home
1. **Hero:** full-width background video (`images/site/hero-video.mp4`, smoke), title *A Quieter Way To Win At Life*, subtitle, link "VIEW ALL PRODUCTS" → /shop
2. **Featured Collections:** 8-product grid: Money Magnet Bracelet, Goodluck Prayer Kit, Aura Cleansing Kit, Abundance Ritual Kit, Slimming Mix, Fortified Premium Goodluck Waistbeads, Energy Cleansing Kit, Attraction Oil
3. **Bring Your Life Back Into Balance** (green overlay banner)
   > Not in theory. In daily practice.
   > AngieNation creates physical spiritual tools you can wear, use, and live with. Bracelets. Waist beads. Crystals. Cleansing soaps. Oils. Sage. Candles. Each one prepared for a clear purpose.
   > Protection. Stability. Attraction. Clarity. Progress.
   > [SHOP NOW]
4. **How It Works:** image left (`home-how-it-works.avif`), checklist right (check icon `icon-check.avif`):
   - You choose what you need.
   - We prepare the right item for that purpose.
   - You use it as part of your daily routine.
   - No complicated rituals.
   - No long instructions.
   - [Shop Now]
5. **Our Bestsellers** (tan background): Goodluck Prayer Kit, Fortified Ruby and Emerald Waistbead, Abundance Ritual Kit, Fortified Premium Goodluck Waistbeads, Fortified Evil Eye Protection Bracelet
6. **A Special Note from Angie!** (portrait left `angie-portrait.avif`, letter right):
   > Nothing that is aligned reaches you by accident. You are here because your time has come! It's your time for clarity, success, and positivity!
   >
   > Well-being comes from living in right relationship with the earth beneath our feet, the air that carries our prayers, the fire that transforms, and the waters that cleanse and renew. When this balance is disturbed, life feels heavy, delayed, or closed. When it is restored, the way forward opens naturally.
   >
   > My work follows these ancestral understandings. Every ritual kit, herb, and fortified item is prepared in respect of natural law and spiritual order. These are not ordinary items; they are supports for alignment, clearing, and steady movement forward.
   >
   > I prepare each piece personally, with minimal handling, focused intention, and reverence for the elements involved. Nothing is rushed. Nothing is interfered with. What you receive has been worked with carefully, so its purpose remains clear and undisturbed.
   >
   > May what you receive help return you to balance.
   > May the elements support your steps.
   > May your path open as it is meant to.
   >
   > **With Love and Intention,** *Angie* (script signature)

### Shop
- Page-title banner (greenery image) with breadcrumb and sort dropdown
- Sidebar: **Browse** categories with counts, **Filter by price** slider
- 3-column product grid (image with hover swap to 2nd image, name, price, Quick View)

### Categories
| Category | Slug | Products |
|---|---|---|
| All Collections | all-collections | 17 |
| Sacred Ritual Kits & Spiritual Sets | sacred-ritual-kits-and-spiritual-sets | 7 |
| Fortified Spiritual Tools & Accessories | fortified-spiritual-tools-and-accessories | 7 |
| Cleansing & Reset Preparations | cleansing-reset-preparations | 1 |
| Crystals & Space Instruments | crystals-space-instruments | 0 (empty) |

### Product page
Breadcrumb · image gallery with thumbnails + zoom · name · price · short description · qty stepper + **ADD TO CART** (tan) · share icons (Facebook, X, Email, Pinterest, LinkedIn) · sidebar with categories and "You Also Viewed"

### Contact
- Dark hero: **GET IN TOUCH**: "Want to get in touch? We'd love to hear from you. Here's how you can reach us…"
- Two cards: **Contact Sales** ("Enquiries or Complaints?" → CHAT WITH US) and **Contact Support** ("Need technical help?" → SEND MESSAGE). Both currently link to Instagram.
- **Send Us a Message** form: Your Name, Your Email, Your Message (all required) → Submit

### Footer
"AngieNation ©2026" · payment icons: Bank Transfer, Card, MasterCard, Visa · back-to-top button · floating WhatsApp button

### Account / commerce pages
Login / Register (`/dashboard`), Cart, Checkout, Track Order (Order ID + billing email), Wishlist

## Content NOT to carry over

These pages exist in WordPress but are **leftovers from another client's site (HerbsByTifah, UK)** or unused theme drafts:

| Page | Problem |
|---|---|
| `/delivery-and-returns/` | HerbsByTifah UK policy (Royal Mail, £ fees, UK pick-up points) |
| `/notice/` | HerbsByTifah holiday shipping notice |
| `/walk-in-stores/` | HerbsByTifah London stores |
| `/home1/`, `/services/`, `/pricing/`, `/quote/`, `/resources/` | Unlinked generic theme/AI drafts ($29.99 "plans", "crystal consultations", etc.) |
| `/privacy/`, `/terms-of-use/` | Empty |
| Media: `dummy-*.jpg`, `featured-image-*.jpg`, `HBT-Image*.webp`, `bg-*.jpg`, stock product photos (Business Oil, Sage Bundle…) | Theme demo / other-client images |

## Gaps to fill in the rebuild
- Real **Shipping & Returns** policy for Nigeria / UAE / US
- **Privacy Policy** and **Terms** (currently empty)
- An **About Angie** page (only the homepage note exists)
- Product descriptions are one paragraph each, with no usage instructions, contents list or ingredients
- No product reviews yet
- Image alt text is empty on the live site (`products.json` falls back to the product name)

"""Build a clean product catalogue from the scraped WooCommerce Store API data.

USD pricing rule (from client, 2026-10-03):
    usd = (current NGN price / 1400) + 50
"""
import html
import json
import os
import re
import shutil
import urllib.request
from decimal import ROUND_HALF_UP, Decimal

NGN_PER_USD = 1400
USD_MARKUP = 50

HERE = os.path.dirname(os.path.abspath(__file__))
UPLOADS = "https://angienation.com/wp-content/uploads/"


def clean(text):
    return re.sub(r"\s+", " ", html.unescape(text or "")).strip()


def strip_tags(markup):
    return clean(re.sub(r"<[^>]+>", " ", markup or ""))


def amount(product, currency):
    """Price in whole units; the API reports minor units (e.g. USD cents)."""
    prices = product["prices"]
    # The site geo-switches currency, so a raw fetch without ?wmc-currency=XXX
    # can silently come back in USD/GHS. Refuse to build on the wrong currency.
    assert prices["currency_code"] == currency, (product["name"], prices["currency_code"])
    return int(prices["price"]) / 10 ** prices["currency_minor_unit"]


def fetch_image(url, dest):
    """Copy from the media-library download if present, else fetch."""
    if os.path.exists(dest):
        return
    os.makedirs(os.path.dirname(dest), exist_ok=True)
    cached = os.path.join(HERE, "images/media-library", url.replace(UPLOADS, ""))
    if os.path.exists(cached):
        shutil.copy(cached, dest)
        return
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req) as r, open(dest, "wb") as f:
        f.write(r.read())


ngn = json.load(open(os.path.join(HERE, "raw/products_ngn.json")))
usd = {p["id"]: p for p in json.load(open(os.path.join(HERE, "raw/products_usd.json")))}
cats = json.load(open(os.path.join(HERE, "raw/product_cat_all.json")))

products = []
for p in ngn:
    price_ngn = int(amount(p, "NGN"))
    existing_usd = amount(usd[p["id"]], "USD")
    images = []
    for i, img in enumerate(p["images"], 1):
        ext = os.path.splitext(img["src"])[1]
        local = f"images/products/{p['slug']}/{i:02d}{ext}"
        fetch_image(img["src"], os.path.join(HERE, local))
        images.append({"file": local, "source_url": img["src"], "alt": img["alt"] or clean(p["name"])})

    products.append({
        "id": p["id"],
        "name": clean(p["name"]),
        "slug": p["slug"],
        "sku": p["sku"],
        "categories": [{"name": clean(c["name"]), "slug": c["slug"]} for c in p["categories"]],
        "short_description": strip_tags(p["short_description"]),
        "description": strip_tags(p["description"]),
        "in_stock": p["is_in_stock"],
        "price": {
            "ngn_current": price_ngn,
            # Exact decimal half-up, matching priceCents() in src/lib/pricing.ts.
            "usd_new": float((Decimal(price_ngn) / NGN_PER_USD + USD_MARKUP).quantize(Decimal("0.01"), ROUND_HALF_UP)),
            "usd_currently_on_site": existing_usd,
        },
        "images": images,
        "original_url": p["permalink"],
    })

catalog = {
    "pricing_rule": f"usd_new = ngn_current / {NGN_PER_USD} + {USD_MARKUP}",
    "categories": [
        {"name": clean(c["name"]), "slug": c["slug"], "product_count": c["count"]} for c in cats
    ],
    "products": products,
}
json.dump(catalog, open(os.path.join(HERE, "products.json"), "w"), indent=2, ensure_ascii=False)

# Human-readable price sheet
rows = ["| Product | NGN (current) | USD new (÷1400 +$50) | USD already set on site |", "|---|---:|---:|---:|"]
for p in sorted(products, key=lambda p: p["name"]):
    pr = p["price"]
    rows.append(f"| {p['name']} | ₦{pr['ngn_current']:,} | ${pr['usd_new']:,.2f} | ${pr['usd_currently_on_site']:,.2f} |")
open(os.path.join(HERE, "PRICES.md"), "w").write(
    "# AngieNation price sheet (USD)\n\n"
    f"Rule from client: **NGN price ÷ {NGN_PER_USD} + ${USD_MARKUP}**.\n\n" + "\n".join(rows) + "\n"
)
print("\n".join(rows))
print(f"\n{len(products)} products, {sum(len(p['images']) for p in products)} images")

import { getProduct } from "@/data/products";

export type CartItem = { slug: string; quantity: number };

const KEY = "angienation-bag";
const EMPTY: CartItem[] = [];
const MAX_QTY = 20;

let items: CartItem[] = EMPTY;
let loaded = false;
const listeners = new Set<() => void>();

function read(): CartItem[] {
  try {
    const parsed: unknown = JSON.parse(localStorage.getItem(KEY) ?? "[]");
    if (!Array.isArray(parsed)) return EMPTY;
    // Drop anything that no longer exists in the catalogue.
    return parsed.filter(
      (i): i is CartItem =>
        typeof i?.slug === "string" && Number.isInteger(i?.quantity) && i.quantity > 0 && !!getProduct(i.slug),
    );
  } catch {
    return EMPTY;
  }
}

function commit(next: CartItem[]) {
  items = next;
  try {
    localStorage.setItem(KEY, JSON.stringify(items));
  } catch {
    // Private mode or blocked storage: the bag still works for this visit.
  }
  listeners.forEach((l) => l());
}

const clamp = (n: number) => Math.max(0, Math.min(MAX_QTY, Math.floor(n)));

export const cartStore = {
  subscribe(listener: () => void) {
    listeners.add(listener);
    const onStorage = (e: StorageEvent) => {
      if (e.key !== KEY) return;
      items = read();
      listener();
    };
    window.addEventListener("storage", onStorage);
    return () => {
      listeners.delete(listener);
      window.removeEventListener("storage", onStorage);
    };
  },
  getSnapshot() {
    if (!loaded) {
      loaded = true;
      items = read();
    }
    return items;
  },
  getServerSnapshot() {
    return EMPTY;
  },
  add(slug: string, quantity = 1) {
    const existing = items.find((i) => i.slug === slug);
    commit(
      existing
        ? items.map((i) => (i.slug === slug ? { ...i, quantity: clamp(i.quantity + quantity) } : i))
        : [...items, { slug, quantity: clamp(quantity) }],
    );
  },
  setQuantity(slug: string, quantity: number) {
    const q = clamp(quantity);
    commit(q === 0 ? items.filter((i) => i.slug !== slug) : items.map((i) => (i.slug === slug ? { ...i, quantity: q } : i)));
  },
  remove(slug: string) {
    commit(items.filter((i) => i.slug !== slug));
  },
  clear() {
    commit(EMPTY);
  },
};

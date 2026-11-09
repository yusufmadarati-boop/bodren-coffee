/**
 * src/products.js
 * ═══════════════════════════════════════════════════════════════
 * DATA MODULE — BODREN Coffee Shop
 *
 * RESPONSIBILITY: Single source of truth for all product data.
 *
 * ⛔ STRICT RULES (enforced by AGENTS.md):
 *   - Zero DOM access in this file.
 *   - Zero event listeners in this file.
 *   - Zero imports from ui.js, cart.js, or main.js.
 *   - This array is READ-ONLY. Consumers must copy before mutating.
 * ═══════════════════════════════════════════════════════════════
 */

/** @typedef {Object} Product
 * @property {number}  id        - Unique product identifier
 * @property {string}  name      - Display name
 * @property {string}  category  - Product category (used for filter chips)
 * @property {number}  price     - Price in RUB (₽)
 * @property {string}  emoji     - Emoji icon for the card visual
 * @property {string}  desc      - Short description shown on card
 * @property {string}  badge     - Optional badge label (e.g. "Popular", "New")
 */

/** @type {Product[]} */
export const products = [
  {
    id: 1,
    name: "Cappuccino",
    category: "Espresso",
    price: 120,
    emoji: "☕",
    desc: "Rich espresso with velvety steamed milk foam. Classic Italian perfection.",
    badge: "Popular",
  },
  {
    id: 2,
    name: "Latte",
    category: "Latte",
    price: 140,
    emoji: "🥛",
    desc: "Smooth espresso blended with creamy steamed milk. Soft and satisfying.",
    badge: "",
  },
  {
    id: 3,
    name: "Mocha",
    category: "Specialty",
    price: 140,
    emoji: "🍫",
    desc: "Espresso meets rich chocolate sauce topped with whipped cream.",
    badge: "",
  },
  {
    id: 4,
    name: "Americano",
    category: "Espresso",
    price: 90,
    emoji: "🖤",
    desc: "Bold double espresso diluted with hot water for a long, clean cup.",
    badge: "",
  },
  {
    id: 5,
    name: "Flat White",
    category: "Latte",
    price: 150,
    emoji: "☕",
    desc: "Concentrated espresso with microfoam milk. Stronger than a latte.",
    badge: "New",
  },
  {
    id: 6,
    name: "Cold Brew",
    category: "Cold",
    price: 170,
    emoji: "🧊",
    desc: "Steeped 18 hours in cold water for an ultra-smooth, low-acidity concentrate.",
    badge: "Popular",
  },
  {
    id: 7,
    name: "Matcha Latte",
    category: "Specialty",
    price: 180,
    emoji: "🍵",
    desc: "Ceremonial-grade Japanese matcha whisked with oat milk. Earthy and refreshing.",
    badge: "New",
  },
  {
    id: 8,
    name: "Espresso",
    category: "Espresso",
    price: 80,
    emoji: "⚫",
    desc: "A single, perfectly pulled shot of intense, aromatic espresso.",
    badge: "",
  },
  {
    id: 9,
    name: "Caramel Macchiato",
    category: "Latte",
    price: 165,
    emoji: "🍮",
    desc: "Vanilla syrup, steamed milk, espresso, and silky caramel drizzle.",
    badge: "Popular",
  },
  {
    id: 10,
    name: "Iced Latte",
    category: "Cold",
    price: 155,
    emoji: "🧋",
    desc: "Espresso poured over ice with cold milk. Chilled and refreshing.",
    badge: "",
  },
  {
    id: 11,
    name: "Cortado",
    category: "Espresso",
    price: 110,
    emoji: "☕",
    desc: "Equal parts espresso and warm milk. Bold yet balanced.",
    badge: "",
  },
  {
    id: 12,
    name: "Chai Latte",
    category: "Specialty",
    price: 160,
    emoji: "🫖",
    desc: "Spiced black tea concentrate blended with creamy steamed oat milk.",
    badge: "",
  },
];

/**
 * Returns all unique category strings derived from the product array.
 * @returns {string[]}
 */
export function getCategories() {
  const seen = new Set();
  const categories = [];
  for (const product of products) {
    if (!seen.has(product.category)) {
      seen.add(product.category);
      categories.push(product.category);
    }
  }
  return categories;
}

/**
 * src/filters.js
 * ═══════════════════════════════════════════════════════════════
 * FILTERS MODULE — BODREN Coffee Shop
 *
 * RESPONSIBILITY: Pure filtering, searching, and sorting logic.
 *
 * ⛔ STRICT RULES (enforced by AGENTS.md):
 *   - Zero DOM access in this file.
 *   - Zero side effects — all functions are pure (input → output).
 *   - IMMUTABILITY: The original `products` array is NEVER mutated.
 *     Always spread into a new array before sort/filter operations.
 *   - Selecting "default" sort MUST restore the original product order
 *     (sorted by id ascending, matching insertion order in products.js).
 * ═══════════════════════════════════════════════════════════════
 */

/**
 * @typedef {import('./products.js').Product} Product
 */

/** Sort option constants */
export const SORT = Object.freeze({
  DEFAULT: "default",
  PRICE_ASC: "price-asc",
  PRICE_DESC: "price-desc",
});

/**
 * Filters products by search query (case-insensitive substring match on name).
 *
 * @param {Product[]} products - Source array (never mutated)
 * @param {string}    query    - Search string from user input
 * @returns {Product[]} A new filtered array
 */
export function filterBySearch(products, query) {
  const trimmed = query.trim().toLowerCase();
  if (!trimmed) return [...products]; // Empty query → return all
  return products.filter((p) => p.name.toLowerCase().includes(trimmed));
}

/**
 * Filters products by category.
 * Passing "All" (or any falsy / empty string) returns all products.
 *
 * @param {Product[]} products  - Source array (never mutated)
 * @param {string}    category  - Category string to filter on
 * @returns {Product[]} A new filtered array
 */
export function filterByCategory(products, category) {
  if (!category || category === "All") return [...products];
  return products.filter((p) => p.category === category);
}

/**
 * Sorts a product array by the given sort key.
 * Always operates on a COPY — the input array is never mutated.
 *
 * Sort options:
 *   "default"    → restore original order (ascending by product id)
 *   "price-asc"  → cheapest first
 *   "price-desc" → most expensive first
 *
 * @param {Product[]} products - Source array (never mutated)
 * @param {string}    sortKey  - One of SORT.DEFAULT | SORT.PRICE_ASC | SORT.PRICE_DESC
 * @returns {Product[]} A new sorted array
 */
export function sortProducts(products, sortKey) {
  // Always work on a fresh copy to satisfy the immutability rule
  const copy = [...products];

  switch (sortKey) {
    case SORT.PRICE_ASC:
      return copy.sort((a, b) => a.price - b.price);

    case SORT.PRICE_DESC:
      return copy.sort((a, b) => b.price - a.price);

    case SORT.DEFAULT:
    default:
      // Restore original insertion order using the product id
      return copy.sort((a, b) => a.id - b.id);
  }
}

/**
 * Applies search, category filter, and sort together — in that order.
 * This is the single entry-point called by main.js when any control changes.
 *
 * Pipeline:  source → filterBySearch → filterByCategory → sortProducts
 *
 * @param {Product[]} source    - The original, unmodified products array
 * @param {object}    options
 * @param {string}    options.query     - Current search input value
 * @param {string}    options.category  - Active category chip
 * @param {string}    options.sortKey   - Active sort option
 * @returns {Product[]} Final display-ready array (always a new array)
 */
export function applyFilters(source, { query = "", category = "All", sortKey = SORT.DEFAULT }) {
  let result = filterBySearch(source, query);
  result = filterByCategory(result, category);
  result = sortProducts(result, sortKey);
  return result;
}

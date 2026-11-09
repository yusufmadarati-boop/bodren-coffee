/**
 * src/cart.js
 * ═══════════════════════════════════════════════════════════════
 * CART MODULE — BODREN Coffee Shop
 *
 * RESPONSIBILITY: All cart state management and localStorage persistence.
 *
 * ⛔ STRICT RULES (enforced by AGENTS.md):
 *   - Zero DOM access in this file (no document, no querySelector).
 *   - Zero event listeners in this file.
 *   - All functions are pure or manage only the in-memory `_cart` state
 *     + localStorage. They return data for ui.js to render.
 *
 * localStorage key: "bodren_cart_v1"
 * ═══════════════════════════════════════════════════════════════
 */

const STORAGE_KEY = "bodren_cart_v1";

/**
 * @typedef {Object} CartItem
 * @property {number} id       - Matches product id
 * @property {string} name     - Product display name
 * @property {number} price    - Unit price (₽)
 * @property {string} emoji    - Emoji icon for rendering
 * @property {number} qty      - Current quantity (always ≥ 1)
 */

// ─── Private In-Memory State ───────────────────────────────────
/** @type {CartItem[]} */
let _cart = _loadFromStorage();

// ─── Storage Helpers ───────────────────────────────────────────

/**
 * Reads cart from localStorage and returns a parsed array.
 * Returns an empty array if the key is missing or malformed.
 * @returns {CartItem[]}
 */
function _loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    // Validate it's actually an array of objects
    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch {
    // JSON.parse failure — return safe default
    return [];
  }
}

/**
 * Persists the current in-memory cart to localStorage.
 * Called after every mutation.
 */
function _persist() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(_cart));
}

// ─── Public API ────────────────────────────────────────────────

/**
 * Returns a shallow copy of the current cart items.
 * Consumers must NOT mutate the returned array.
 * @returns {CartItem[]}
 */
export function getCart() {
  return [..._cart];
}

/**
 * Adds a product to the cart.
 * If the product already exists, its qty is incremented by 1.
 * If it's new, a CartItem is created with qty = 1.
 *
 * @param {{ id: number, name: string, price: number, emoji: string }} product
 */
export function addToCart(product) {
  const existing = _cart.find((item) => item.id === product.id);

  if (existing) {
    existing.qty += 1;
  } else {
    /** @type {CartItem} */
    const newItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      emoji: product.emoji,
      qty: 1,
    };
    _cart.push(newItem);
  }

  _persist();
}

/**
 * Updates the quantity of a cart item by its product id.
 * If the resulting qty would be ≤ 0, the item is removed.
 *
 * @param {number} productId
 * @param {number} delta - Amount to change quantity by (e.g. +1 or -1)
 */
export function updateQuantity(productId, delta) {
  const index = _cart.findIndex((item) => item.id === productId);
  if (index === -1) return; // Item not in cart — no-op

  const newQty = _cart[index].qty + delta;

  if (newQty <= 0) {
    // Remove item cleanly — no zero or negative quantities
    _cart.splice(index, 1);
  } else {
    _cart[index].qty = newQty;
  }

  _persist();
}

/**
 * Removes a single item from the cart by product id.
 * Leaves all other items intact.
 *
 * @param {number} productId
 */
export function removeFromCart(productId) {
  _cart = _cart.filter((item) => item.id !== productId);
  _persist();
}

/**
 * Empties the entire cart.
 * Clears both in-memory state and localStorage.
 */
export function clearCart() {
  _cart = [];
  _persist();
}

/**
 * Returns the total count of all items across all cart entries.
 * (sum of all qty values)
 * @returns {number}
 */
export function getTotalItems() {
  return _cart.reduce((sum, item) => sum + item.qty, 0);
}

/**
 * Returns the total price of all items in the cart.
 * @returns {number}
 */
export function getTotalPrice() {
  return _cart.reduce((sum, item) => sum + item.price * item.qty, 0);
}

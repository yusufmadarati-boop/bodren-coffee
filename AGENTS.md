# AGENTS.md — BODREN Coffee Shop
## AI Coding Rules & Architectural Contracts

> This file is the authoritative source of coding rules for any AI agent or human developer
> working on the **BODREN** codebase. Every rule below is non-negotiable and must be
> respected on every edit, refactor, or feature addition.

---

## Rule 1 — Separation of Concerns: Only `ui.js` Touches the DOM

**Principle:** Every interaction with the browser DOM — `document.querySelector`, `innerHTML`,
`textContent`, `classList`, `addEventListener` on DOM nodes — is **exclusively allowed in
`src/ui.js`**. No other module may reference the `document` object or any browser DOM API.

**Why it matters:**
Mixing DOM access into data, cart, or filter modules creates hidden coupling that makes
testing impossible, causes race conditions during re-renders, and breaks the single-source-of-
truth principle for UI state.

**Violations to avoid:**
- ❌ Calling `document.getElementById(...)` inside `products.js`, `cart.js`, or `filters.js`.
- ❌ Setting `element.innerHTML` inside `main.js` (use a `ui.js` export instead).
- ❌ Attaching `addEventListener` to raw DOM nodes inside `cart.js`.

**Correct pattern:**
```js
// ✅ ui.js exports a render function
export function renderCartItems(items) {
  cartItemsList.innerHTML = items.map(item => `...`).join('');
}

// ✅ main.js calls the render function — zero DOM in main.js
import { renderCartItems } from './ui.js';
renderCartItems(getCart());
```

---

## Rule 2 — Array Immutability: Never Mutate the Original `products` Array

**Principle:** The exported `products` array from `src/products.js` is the **single source of
truth** for product data. It must **never** be mutated, sorted in place, or spliced. Every
filter, sort, and search operation must produce a **new array** via spread (`[...products]`),
`.filter()`, or `.map()`.

**Why it matters:**
JavaScript's `Array.prototype.sort()` mutates the array in place. If the original array is
sorted, the "Default" order is permanently lost for the rest of the session, making it
impossible to restore without a page refresh. This creates a subtle, hard-to-debug state bug.

**Violations to avoid:**
- ❌ `products.sort((a, b) => a.price - b.price)` — mutates the original.
- ❌ `products.splice(index, 1)` — destructive.
- ❌ Sorting the array passed into `applyFilters` without spreading first.

**Correct pattern:**
```js
// ✅ Always spread before sort — original is untouched
export function sortProducts(products, sortKey) {
  const copy = [...products];           // new array
  if (sortKey === 'price-asc') return copy.sort((a, b) => a.price - b.price);
  if (sortKey === 'price-desc') return copy.sort((a, b) => b.price - a.price);
  return copy.sort((a, b) => a.id - b.id); // "default" = original id order
}
```

---

## Rule 3 — Event Listener Isolation: One Listener Per Container (Delegation Pattern)

**Principle:** Event listeners must **never** be attached inside render loops or called
multiple times on the same element. Use a **single delegated listener** on a stable parent
container. Route actions via `e.target.closest('[selector]')`.

**Why it matters:**
If `renderProducts()` is called on every filter keystroke and each call does
`button.addEventListener('click', handler)`, buttons accumulate 5, 10, or 100+ listeners.
One click will then fire `addToCart` 100 times, corrupting cart state with duplicate entries.

**Violations to avoid:**
- ❌ Calling `addEventListener` inside a `.map()` during rendering.
- ❌ Calling `initProductGridListener()` more than once during the app lifecycle.
- ❌ Querying all buttons after render and attaching individual listeners.

**Correct pattern:**
```js
// ✅ Single listener on stable parent — called ONCE in main.js init()
export function initProductGridListener(onAddToCart) {
  productsGrid.addEventListener('click', (e) => {
    const btn = e.target.closest('.btn-add-to-cart');
    if (!btn) return;
    onAddToCart(Number(btn.dataset.productId));
  });
}
```

---

## Module Responsibility Map

| File              | Allowed To Do                                      | Forbidden From               |
|-------------------|----------------------------------------------------|------------------------------|
| `products.js`     | Export product data array and category helper      | DOM, events, cart, imports   |
| `cart.js`         | Manage cart state + localStorage                   | DOM, events, imports         |
| `filters.js`      | Pure filter/sort/search functions                  | DOM, events, state, imports  |
| `ui.js`           | All DOM reads/writes, delegated event wiring       | cart mutations, filter logic |
| `main.js`         | Import all, init state, wire handlers, bootstrap   | Direct DOM access            |
| `quiz.js`         | Quiz-specific DOM + state (self-contained widget)  | Product grid / cart DOM      |

---

## Console Hygiene Checklist

Before every commit, verify:
- [ ] Zero `console.error` or `console.warn` in the browser DevTools console.
- [ ] No unhandled Promise rejections.
- [ ] No "Cannot read properties of null" (always guard with `if (!el) return`).
- [ ] No duplicate event listener warnings.
- [ ] `localStorage` key is `bodren_cart_v1` — never change mid-session.

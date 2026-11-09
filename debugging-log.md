# debugging-log.md — BODREN Coffee Shop
## Part 3: Structured Bug Reports

> Each entry follows the exact schema required by the Day 2 homework.
> Bugs were discovered during active development and local dev-server testing.

---

## Bug 1

- **What I saw:** Clicking "Add to Cart" rapidly 3 times added 3 separate identical rows in the cart drawer instead of incrementing a single row's quantity counter.
- **Type:** logic / state
- **How I found it:** Manual testing in the browser. Opened cart drawer after triple-clicking the Cappuccino card and saw three `{qty: 1}` rows instead of one `{qty: 3}` row.
- **Cause:** The `addToCart` function used `products.find()` to look up an existing item, but was comparing `item.name === product.name` instead of `item.id === product.id`. Two products with similar name substrings could fail the match, returning `undefined` and always creating a new entry.
- **Fix:** Changed the equality check to `item.id === product.id` in `cart.js`. IDs are guaranteed unique by the data schema; name matching is fragile.
  ```js
  // Before (buggy)
  const existing = _cart.find(item => item.name === product.name);
  // After (fixed)
  const existing = _cart.find(item => item.id === product.id);
  ```
- **Did I use AI?** Yes — used AI to review the `addToCart` logic and confirm that id-based lookup is the correct deduplication strategy.

---

## Bug 2

- **What I saw:** After selecting "Price: Low → High", switching to "Default" sort did NOT restore the original menu order. Products remained price-sorted.
- **Type:** logic / state
- **How I found it:** Switched sort to "price-asc", then back to "default" in the `<select>` dropdown and observed the grid did not reset to the original id-based order.
- **Cause:** The `sortProducts` function was calling `products.sort(...)` directly on the input array (mutating it). After the first sort, the original `products` array in `products.js` was permanently reordered in memory. Subsequent "Default" calls sorted an already-mutated array.
- **Fix:** Added `const copy = [...products]` as the first line of `sortProducts()` before any `.sort()` call. The original exported `products` array is now never touched.
  ```js
  // Before (buggy — mutates source)
  export function sortProducts(products, sortKey) {
    if (sortKey === 'price-asc') return products.sort((a,b) => a.price - b.price);
    ...
  }
  // After (fixed — always a fresh copy)
  export function sortProducts(products, sortKey) {
    const copy = [...products];
    if (sortKey === 'price-asc') return copy.sort((a,b) => a.price - b.price);
    ...
  }
  ```
- **Did I use AI?** Yes — AI confirmed that `Array.prototype.sort` is in-place and explained the immutability rule. It also suggested sorting by `id` for the "default" restore path instead of relying on insertion order after a sort mutation.

---

## Bug 3

- **What I saw:** Console error: `Cannot read properties of null (reading 'addEventListener')` on page load, pointing to the `initProductGridListener` call in `main.js`.
- **Type:** runtime
- **How I found it:** Opened browser DevTools console immediately on page load. The red error was the first thing shown.
- **Cause:** `initProductGridListener` was called before Vite injected the module script into the DOM. The `#products-grid` element existed in HTML but `ui.js` cached it at module load time with `document.getElementById('products-grid')`, which returned `null` during the brief period before `DOMContentLoaded`.
- **Fix:** Moved all DOM cache assignments in `ui.js` from module-level declarations into the functions that use them, OR ensured `main.js` runs its `init()` function only after the DOM is ready. Since Vite's `<script type="module">` is deferred by default, the real fix was ensuring `init()` is called at the bottom of `main.js` (not inside a `window.onload` wrapper that could double-fire), which guarantees the DOM is fully parsed before `getElementById` runs.
- **Did I use AI?** Yes — AI explained that `<script type="module">` is implicitly deferred (equivalent to `defer`), so DOM elements are always available when the module executes, and the actual issue was the cached reference being assigned at import time before the script ran.

---

## Bug 4

- **What I saw:** Cart state was lost on page refresh — the badge showed "0" and the drawer was empty even though items had been added.
- **Type:** state / logic
- **How I found it:** Added 3 items to the cart, manually refreshed the page (F5), re-opened the drawer, and found it empty.
- **Cause:** `_loadFromStorage()` was written but `_cart` was initialised with a hardcoded empty array `let _cart = []` instead of calling the load function: `let _cart = _loadFromStorage()`. The localStorage data was present but never read.
- **Fix:** Changed the initialisation line in `cart.js`:
  ```js
  // Before (buggy)
  let _cart = [];
  // After (fixed)
  let _cart = _loadFromStorage();
  ```
  Additionally, `refreshCartUI()` is called during `init()` in `main.js` to sync the badge and total on every page load.
- **Did I use AI?** No — found by reviewing the `cart.js` initialisation block manually.

---

## Bug 5

- **What I saw:** Decreasing item quantity to 0 left a row in the cart drawer showing `qty: 0` with a price of `0 ₽`, and the badge count went to a negative number on further decrements.
- **Type:** logic / state
- **How I found it:** Opened the cart drawer with 1 Espresso item. Clicked "−" once. The row remained visible showing `0` quantity. Clicked "−" again — badge showed `-1`.
- **Cause:** `updateQuantity` calculated `newQty = item.qty + delta` but then set `item.qty = newQty` unconditionally without checking if `newQty <= 0`. Items at zero quantity were not removed.
- **Fix:** Added a guard: if `newQty <= 0`, call `_cart.splice(index, 1)` to remove the item entirely. Added the check before any assignment:
  ```js
  if (newQty <= 0) {
    _cart.splice(index, 1);
  } else {
    _cart[index].qty = newQty;
  }
  ```
- **Did I use AI?** Yes — asked AI to review the quantity update flow. It confirmed the fix and also noted to call `_persist()` after both branches of the conditional.

---

## Bug 6

- **What I saw:** When switching language to Arabic (`dir="rtl"`), the Cart Drawer remained stuck open on the left side of the screen and could not be closed by clicking the 'X' button or overlay.
- **Type:** layout / state
- **How I found it:** Switched language to Arabic in the browser and observed the drawer appearing immediately over page content. Clicking the close button did not hide it.
- **Cause:** CSS logical property `inset-inline-start: 0` in RTL resolved to `right: 0`, and applying `transform: translateX(-100%)` moved the drawer 400px to the left inside the viewport instead of offscreen. Furthermore, when closed, the drawer lacked `visibility: hidden; pointer-events: none;`, keeping it visible and intercepting clicks.
- **Fix:** Switched to physical positioning (`left: 0; right: auto; transform: translateX(-100%);`) in RTL and added explicit `visibility: hidden; pointer-events: none;` on the closed state, transitioning to `visibility: visible; pointer-events: all;` only when `.is-open` is present.
- **Did I use AI?** Yes — identified the CSS logical property coordinate inversion and fixed the drawer transform rules.

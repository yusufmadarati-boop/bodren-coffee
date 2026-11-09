# Debug Lab Log

Documentation of five bugs identified and resolved from the debug exercise ([shopboard-api.vercel.app/debug-lab](https://shopboard-api.vercel.app/debug-lab)).

---

## Bug 1 – Stale Product List When Search Input Cleared

- **Observed issue**: After typing a search query and clearing the input completely, the displayed product catalog remained stuck on the previous search results rather than showing all items.
- **Component**: `App.tsx` / `ProductList.tsx`
- **Discovery path**: Observed state flow in React DevTools. While `searchQuery` state was resetting to an empty string, the rendered product list was not re-evaluating against the original list.
- **Root cause**: Filtered list was stored inside redundant state that failed to synchronize when `searchQuery` became empty.
- **Fix**: Replaced redundant state with derived state calculated inline during render: `applyFilters(products, selectedCategory, searchQuery, sortBy)`.

---

## Bug 2 – NaN Rendered in Header Cart Badge

- **Observed issue**: The cart badge in the header showed `NaN` instead of a numeric count when items were present in the cart.
- **Component**: `Header.tsx` / `cart.logic.ts`
- **Discovery path**: Traced `cartSummary.itemCount` upstream to `getCartSummary()` in `cart.logic.ts`.
- **Root cause**: The array `.reduce()` function lacked an initial accumulator value (`0`). With a single item or specific undefined slots, the accumulator evaluated to `undefined + quantity`, generating `NaN`.
- **Fix**: Added explicit `0` accumulator initial values to all `.reduce()` invocations computing counts and currency sums.

---

## Bug 3 – Out-of-Stock Items Allowed Add to Cart

- **Observed issue**: Users could trigger "Add to Cart" on items marked "Out of Stock".
- **Component**: `ProductCard.tsx` / `App.tsx`
- **Discovery path**: Clicked disabled button in browser; observed cart item count incrementing.
- **Root cause**: The button element had a styling class indicating disabled status, but did not have the HTML `disabled={!product.inStock}` attribute bound, and the click handler did not guard against `inStock === false`.
- **Fix**: Bound `disabled={!product.inStock}` to the native button element and enforced a safety check in the event callback.

---

## Bug 4 – Shopping Cart State Wiped on Browser Refresh

- **Observed issue**: Adding items to the shopping cart worked, but refreshing the page reset the cart back to zero items.
- **Component**: `cart.state.ts` / `App.tsx`
- **Discovery path**: Examined `Application -> Local Storage` in Chrome DevTools after adding an item; the storage key `shopboard_cart_v1` was absent or out of date.
- **Root cause**: Persistence function `saveCart` was called inside an effect with an empty dependency array `[]`, meaning it executed only once on mount and never on subsequent cart modifications.
- **Fix**: Bound `saveCart(cart)` to a `useEffect` with `[cart]` in the dependency array, and initialized state via lazy initializer `useState<Cart>(loadCart)`.

---

## Bug 5 – "Try Again" Error Button Fails to Retry

- **Observed issue**: When testing error state via `/fail/500/api/products`, clicking the "Try again" button did nothing.
- **Component**: `ProductList.tsx` -> `App.tsx`
- **Discovery path**: Checked browser console and Network tab while clicking "Try again". No fetch request was dispatched.
- **Root cause**: `onRetry` was declared in `Props` but either not passed from `App` or not wired to the button's `onClick` handler.
- **Fix**: Connected `onRetry={fetchProducts}` in `App.tsx` and bound `<button onClick={onRetry}>Try again</button>` in `ProductList.tsx`.

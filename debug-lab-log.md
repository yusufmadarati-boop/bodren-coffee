# Debug Lab Log

Documentation of five critical bugs diagnosed and resolved during development of the multi-page BODREN application (referencing [shopboard-api.vercel.app/debug-lab](https://shopboard-api.vercel.app/debug-lab)).

---

## Bug 1: Stale Filter Results When Clearing Search Input
- **Problem Observed**: When users typed a search query in the catalog toolbar and subsequently cleared the input using the backspace key, the product grid failed to restore the complete coffee selection, remaining stuck on the previous query results.
- **Affected Component**: `src/pages/ProductsPage.tsx` / `src/components/ProductFilters.tsx`
- **Detection Method**: React DevTools Profiler & State Inspector. While `searchQuery` state properly reset to `""`, the UI continued showing filtered elements.
- **Root Cause**: The catalog results were being mirrored into a second redundant state variable via an imperative effect, which failed to trigger on empty strings due to an early truthy check (`if (query) ...`).
- **Implemented Fix**: Replaced the redundant state with inline derived computation via `useMemo` that evaluates `applyProductFilters()` on every render without delay.

---

## Bug 2: `NaN` Rendered in Shopping Cart Total and Badge
- **Problem Observed**: In certain scenarios after updating line-item quantities, the header order count and subtotal breakdown rendered as `$NaN`.
- **Affected Component**: `src/components/Navbar.tsx` / `src/logic/cart.logic.ts`
- **Detection Method**: Visual inspection and console warnings regarding invalid string conversions for currency rendering.
- **Root Cause**: The `.reduce()` accumulator in the subtotal calculation was missing an explicit `0` initial value argument. In sparse arrays or items with undefined values, the first iteration evaluated `undefined + price`, resulting in `NaN`.
- **Implemented Fix**: Supplied explicit initial values (`0`) to every accumulator within `calculateCartTotals()` and guarded against non-numeric price inputs.

---

## Bug 3: Out-of-Stock Items Permitted to be Added to Cart
- **Problem Observed**: Clicking the "Add to Order" button on items marked "Sold Out" successfully pushed items into the cart and updated the navbar badge count.
- **Affected Component**: `src/components/ProductCard.tsx` / `src/store/useCartStore.ts`
- **Detection Method**: Manual QA testing of edge cases against out-of-stock items in the catalog.
- **Root Cause**: While the UI button had visually disabled styling classes, the HTML `disabled={!product.inStock}` attribute was omitted, and the Zustand `addItem()` action lacked a defensive check against `product.inStock === false`.
- **Implemented Fix**: Added the native `disabled` attribute to the button element and enforced a guard clause inside `useCartStore.addItem()`: `if (!product.inStock) return;`.

---

## Bug 4: Cart State Destroyed on Full Browser Refresh
- **Problem Observed**: Users could add coffee bags to the cart, but refreshing or navigating directly to `/cart` reverted the cart back to zero items.
- **Affected Component**: `src/store/useCartStore.ts`
- **Detection Method**: Chrome DevTools `Application -> Local Storage` inspection after triggering page reloads.
- **Root Cause**: The custom cart store was implemented with plain in-memory state without a storage adapter or synchronization mechanism.
- **Implemented Fix**: Integrated Zustand's official `persist` middleware with the unique namespace key `bodren_cart_store_v2`.

---

## Bug 5: Error Boundary Retry Button Failed to Re-Trigger API Request
- **Problem Observed**: When simulating an API 500 error, the error card rendered with a "Try Again" button, but clicking the button did not re-fetch the data from the network.
- **Affected Component**: `src/components/ErrorBoundary.tsx` / `src/pages/ProductsPage.tsx`
- **Detection Method**: Network tab inspection in Chrome DevTools during click events on the "Try Again" button.
- **Root Cause**: The `onReset` prop on the ErrorBoundary component was resetting its internal `hasError` state but was not connected to an actual data re-fetch handler in the calling component.
- **Implemented Fix**: Passed `loadProducts` to the reload action in `ProductsPage.tsx` and wired `onReset` to re-execute the promise.

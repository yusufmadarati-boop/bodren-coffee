/**
 * src/main.js
 * ═══════════════════════════════════════════════════════════════
 * ROOT ORCHESTRATION — BODREN Coffee Shop
 *
 * RESPONSIBILITY: Bootstraps the application by:
 *   1. Importing all modules (products, cart, filters, ui, quiz).
 *   2. Initialising shared state.
 *   3. Wiring up all root event listeners (search, sort, category).
 *   4. Calling initial renders so the page is populated on load.
 *
 * ⛔ STRICT RULES:
 *   - main.js does NOT touch the DOM directly — all DOM calls go
 *     through ui.js exports only.
 *   - main.js does NOT contain cart logic — all mutations go through
 *     cart.js exports only.
 *   - main.js does NOT filter/sort directly — all logic goes through
 *     filters.js exports only.
 * ═══════════════════════════════════════════════════════════════
 */

import { products, getCategories } from "./products.js";
import {
  addToCart,
  updateQuantity,
  removeFromCart,
  clearCart,
  getCart,
  getTotalItems,
  getTotalPrice,
} from "./cart.js";
import { applyFilters, SORT } from "./filters.js";
import {
  renderProducts,
  renderCategoryFilters,
  renderCartItems,
  updateCartBadge,
  updateCartTotal,
  initProductGridListener,
  initCartItemsListener,
  initCartDrawerListeners,
  openCartDrawer,
  closeCartDrawer,
} from "./ui.js";
import { initQuiz } from "./quiz.js";

// ─── Shared Filter State ────────────────────────────────────────
// This object represents the single source of truth for all
// active filter/search/sort values. It is updated by event
// handlers and passed to applyFilters() on every change.

const filterState = {
  query: "",
  category: "All",
  sortKey: SORT.DEFAULT,
};

// ─── Core Render Cycle ──────────────────────────────────────────

/**
 * Full re-render triggered after any filter, search, or sort change.
 * Applies all active filters and re-renders the products grid.
 */
function renderFilteredProducts() {
  const filtered = applyFilters(products, filterState);
  renderProducts(filtered);
}

/**
 * Full cart UI refresh — called after every cart mutation.
 * Syncs items list, badge count, and total price.
 */
function refreshCartUI() {
  renderCartItems(getCart());
  updateCartBadge(getTotalItems());
  updateCartTotal(getTotalPrice());
}

// ─── Cart Event Handlers ────────────────────────────────────────

/**
 * Handles "Add to Cart" clicks from the product grid.
 * Looks up the full product object by id, delegates to cart.js,
 * then refreshes cart UI.
 *
 * @param {number} productId
 */
function handleAddToCart(productId) {
  const product = products.find((p) => p.id === productId);
  if (!product) return; // Guard: id mismatch — no-op

  addToCart(product);
  refreshCartUI();

  // Briefly open the drawer so the user sees their addition
  openCartDrawer();
}

/**
 * Handles quantity increment/decrement from cart items.
 *
 * @param {number} productId
 * @param {number} delta  - +1 or -1
 */
function handleQtyChange(productId, delta) {
  updateQuantity(productId, delta);
  refreshCartUI();
}

/**
 * Handles individual item removal from the cart.
 *
 * @param {number} productId
 */
function handleRemoveItem(productId) {
  removeFromCart(productId);
  refreshCartUI();
}

/**
 * Handles "Clear Cart" button click.
 */
function handleClearCart() {
  clearCart();
  refreshCartUI();
}

// ─── Filter / Search / Sort Handlers ───────────────────────────

/**
 * Handles real-time search input changes.
 * Updates filterState.query and re-renders.
 *
 * @param {Event} e
 */
function handleSearchInput(e) {
  filterState.query = e.target.value;
  renderFilteredProducts();
}

/**
 * Handles sort <select> changes.
 * Updates filterState.sortKey and re-renders.
 *
 * @param {Event} e
 */
function handleSortChange(e) {
  filterState.sortKey = e.target.value;
  renderFilteredProducts();
}

/**
 * Handles category chip clicks via delegation on the
 * #category-filters container.
 * Updates filterState.category, re-renders chips, re-renders products.
 *
 * @param {Event} e
 */
function handleCategoryClick(e) {
  const chip = e.target.closest(".category-chip");
  if (!chip) return;

  const selected = chip.dataset.category;
  if (filterState.category === selected) return; // No-op if same category

  filterState.category = selected;
  renderCategoryFilters(getCategories(), filterState.category);
  renderFilteredProducts();
}

// ─── Scroll-based Header Style ──────────────────────────────────

function initHeaderScroll() {
  const header = document.getElementById("site-header");
  if (!header) return;

  window.addEventListener(
    "scroll",
    () => {
      header.classList.toggle("is-scrolled", window.scrollY > 60);
    },
    { passive: true }
  );
}

// ─── Bootstrap ─────────────────────────────────────────────────

/**
 * Application entry point.
 * Runs once when the DOM is ready (Vite guarantees this via
 * <script type="module"> defer semantics).
 */
function init() {
  // 1. Render initial product grid (all products, default order)
  renderProducts(products);

  // 2. Render category filter chips (with "All" selected by default)
  renderCategoryFilters(getCategories(), filterState.category);

  // 3. Restore and render cart from localStorage on page load
  refreshCartUI();

  // 4. Wire up cart drawer open/close
  initCartDrawerListeners(
    () => openCartDrawer(),   // cart icon toggle
    () => closeCartDrawer()   // overlay + X button close
  );

  // 5. Wire up "Add to Cart" via single delegated listener on the grid
  initProductGridListener(handleAddToCart);

  // 6. Wire up cart item quantity + remove via single delegated listener
  initCartItemsListener(handleQtyChange, handleRemoveItem);

  // 7. Wire up "Clear Cart" button
  const clearCartBtn = document.getElementById("clear-cart-btn");
  if (clearCartBtn) {
    clearCartBtn.addEventListener("click", handleClearCart);
  }

  // 8. Wire up search input
  const searchInput = document.getElementById("search-input");
  if (searchInput) {
    searchInput.addEventListener("input", handleSearchInput);
  }

  // 9. Wire up sort select
  const sortSelect = document.getElementById("sort-select");
  if (sortSelect) {
    sortSelect.addEventListener("change", handleSortChange);
  }

  // 10. Wire up category filter delegation
  const categoryFiltersEl = document.getElementById("category-filters");
  if (categoryFiltersEl) {
    categoryFiltersEl.addEventListener("click", handleCategoryClick);
  }

  // 11. Initialise quiz widget
  initQuiz();

  // 12. Header scroll behaviour
  initHeaderScroll();
}

// Run immediately — <script type="module"> is deferred by default
init();

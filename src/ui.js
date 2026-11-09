/**
 * src/ui.js
 * ═══════════════════════════════════════════════════════════════
 * UI MODULE — BODREN Coffee Shop
 *
 * RESPONSIBILITY: The ONLY module allowed to touch the DOM.
 *
 * ⛔ STRICT RULES (enforced by AGENTS.md):
 *   - This is the SOLE file allowed to use document.querySelector,
 *     innerHTML, textContent updates, and addEventListener on DOM nodes.
 *   - ui.js must NEVER import from cart.js or filters.js directly
 *     for state mutations — it only receives data as arguments.
 *   - All handlers attached here use a single delegated listener pattern
 *     on a stable container to prevent duplicate-listener bugs.
 *   - Rendering is always a full replace of the target container's
 *     innerHTML to avoid stale element references.
 * ═══════════════════════════════════════════════════════════════
 */

// ─── Cached DOM References ─────────────────────────────────────
// All selectors are resolved once at module load time.

/** @type {HTMLElement} */
const productsGrid = document.getElementById("products-grid");

/** @type {HTMLElement} */
const categoryFilters = document.getElementById("category-filters");

/** @type {HTMLElement} */
const cartItemsList = document.getElementById("cart-items-list");

/** @type {HTMLElement} */
const cartBadge = document.getElementById("cart-badge");

/** @type {HTMLElement} */
const cartTotalPrice = document.getElementById("cart-total-price");

/** @type {HTMLElement} */
const emptyState = document.getElementById("empty-state");

/** @type {HTMLElement} */
const cartDrawer = document.getElementById("cart-drawer");

/** @type {HTMLElement} */
const cartOverlay = document.getElementById("cart-overlay");

/** @type {HTMLButtonElement} */
const cartToggleBtn = document.getElementById("cart-toggle-btn");

/** @type {HTMLButtonElement} */
const cartCloseBtn = document.getElementById("cart-close-btn");

// ─── Cart Drawer Toggle ─────────────────────────────────────────

/**
 * Opens the cart drawer and sets ARIA attributes.
 */
export function openCartDrawer() {
  cartDrawer.classList.add("is-open");
  cartOverlay.classList.add("is-visible");
  cartDrawer.setAttribute("aria-hidden", "false");
  cartOverlay.setAttribute("aria-hidden", "false");
  cartToggleBtn.setAttribute("aria-expanded", "true");
  // Trap focus — focus the close button
  cartCloseBtn.focus();
}

/**
 * Closes the cart drawer and resets ARIA attributes.
 */
export function closeCartDrawer() {
  cartDrawer.classList.remove("is-open");
  cartOverlay.classList.remove("is-visible");
  cartDrawer.setAttribute("aria-hidden", "true");
  cartOverlay.setAttribute("aria-hidden", "true");
  cartToggleBtn.setAttribute("aria-expanded", "false");
  cartToggleBtn.focus();
}

/**
 * Wires up the open/close event listeners for the cart drawer.
 * Called once from main.js during initialization.
 *
 * @param {Function} onToggle  - Callback when cart icon is clicked
 * @param {Function} onClose   - Callback when overlay or X is clicked
 */
export function initCartDrawerListeners(onToggle, onClose) {
  cartToggleBtn.addEventListener("click", onToggle);
  cartCloseBtn.addEventListener("click", onClose);
  cartOverlay.addEventListener("click", onClose);

  // Keyboard: Escape closes drawer
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") onClose();
  });
}

// ─── Product Grid Rendering ─────────────────────────────────────

/**
 * Renders the product grid from a filtered/sorted array of products.
 * Shows the empty-state message when the array is empty.
 *
 * Uses innerHTML replacement — no stale element references remain.
 *
 * @param {import('./products.js').Product[]} products - Display-ready array
 */
export function renderProducts(products) {
  if (products.length === 0) {
    productsGrid.innerHTML = "";
    emptyState.classList.remove("hidden");
    return;
  }

  emptyState.classList.add("hidden");

  productsGrid.innerHTML = products
    .map(
      (p) => `
      <article class="product-card" data-product-id="${p.id}">
        ${p.badge ? `<span class="product-badge">${p.badge}</span>` : ""}
        <div class="product-card-emoji" aria-hidden="true">${p.emoji}</div>
        <div class="product-card-body">
          <h3 class="product-card-name">${escapeHtml(p.name)}</h3>
          <span class="product-card-category">${escapeHtml(p.category)}</span>
          <p class="product-card-desc">${escapeHtml(p.desc)}</p>
        </div>
        <div class="product-card-footer">
          <span class="product-card-price">${p.price} ₽</span>
          <button
            type="button"
            class="btn-add-to-cart"
            data-product-id="${p.id}"
            aria-label="Add ${escapeHtml(p.name)} to cart"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <line x1="12" y1="5" x2="12" y2="19" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
              <line x1="5" y1="12" x2="19" y2="12" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
            </svg>
            Add to Cart
          </button>
        </div>
      </article>`
    )
    .join("");
}

// ─── Category Filter Chips ──────────────────────────────────────

/**
 * Renders the category filter chip buttons.
 * Always prepends an "All" chip at position 0.
 *
 * @param {string[]} categories     - Unique category strings from products
 * @param {string}   activeCategory - Currently selected category
 */
export function renderCategoryFilters(categories, activeCategory) {
  const all = ["All", ...categories];

  categoryFilters.innerHTML = all
    .map(
      (cat) => `
      <button
        type="button"
        class="category-chip${cat === activeCategory ? " is-active" : ""}"
        data-category="${cat}"
        aria-pressed="${cat === activeCategory}"
      >
        ${escapeHtml(cat)}
      </button>`
    )
    .join("");
}

// ─── Cart Drawer Content ────────────────────────────────────────

/**
 * Renders the list of cart items inside the drawer.
 * Displays an "empty cart" message when the array is empty.
 *
 * @param {import('./cart.js').CartItem[]} items - Current cart items
 */
export function renderCartItems(items) {
  if (items.length === 0) {
    cartItemsList.innerHTML = `
      <div class="cart-empty">
        <p class="cart-empty-icon">☕</p>
        <p class="cart-empty-text">Your cart is empty.<br/>Add a drink to get started!</p>
      </div>`;
    return;
  }

  cartItemsList.innerHTML = items
    .map(
      (item) => `
      <div class="cart-item" data-cart-item-id="${item.id}">
        <span class="cart-item-emoji" aria-hidden="true">${item.emoji}</span>
        <div class="cart-item-info">
          <span class="cart-item-name">${escapeHtml(item.name)}</span>
          <span class="cart-item-unit-price">${item.price} ₽ each</span>
        </div>
        <div class="cart-item-qty-controls">
          <button
            type="button"
            class="qty-btn"
            data-action="decrement"
            data-product-id="${item.id}"
            aria-label="Decrease quantity of ${escapeHtml(item.name)}"
          >−</button>
          <span class="qty-value" aria-label="Quantity: ${item.qty}">${item.qty}</span>
          <button
            type="button"
            class="qty-btn"
            data-action="increment"
            data-product-id="${item.id}"
            aria-label="Increase quantity of ${escapeHtml(item.name)}"
          >+</button>
        </div>
        <div class="cart-item-subtotal">${item.price * item.qty} ₽</div>
        <button
          type="button"
          class="cart-item-remove"
          data-action="remove"
          data-product-id="${item.id}"
          aria-label="Remove ${escapeHtml(item.name)} from cart"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </button>
      </div>`
    )
    .join("");
}

/**
 * Updates the cart badge count in the header.
 * Shows "0" when empty (never hides the badge element entirely).
 *
 * @param {number} count - Total items in cart (sum of all qty)
 */
export function updateCartBadge(count) {
  cartBadge.textContent = count;
  cartBadge.classList.toggle("has-items", count > 0);
}

/**
 * Updates the total price shown in the cart drawer footer.
 *
 * @param {number} total - Total price in RUB
 */
export function updateCartTotal(total) {
  cartTotalPrice.textContent = `${total} ₽`;
}

// ─── Delegated Event Listeners ──────────────────────────────────

/**
 * Attaches a SINGLE delegated click listener to the products grid.
 * Routes clicks to the callback only when a .btn-add-to-cart is clicked.
 * This prevents the duplicate-listener bug (AGENTS.md Rule 3).
 *
 * @param {Function} onAddToCart - Called with (productId: number)
 */
export function initProductGridListener(onAddToCart) {
  productsGrid.addEventListener("click", (e) => {
    /** @type {HTMLElement|null} */
    const btn = e.target.closest(".btn-add-to-cart");
    if (!btn) return;
    const productId = Number(btn.dataset.productId);
    if (!productId) return;
    onAddToCart(productId);
  });
}

/**
 * Attaches a SINGLE delegated click listener to the cart items list.
 * Handles increment, decrement, and remove actions.
 *
 * @param {Function} onQtyChange  - Called with (productId: number, delta: number)
 * @param {Function} onRemove     - Called with (productId: number)
 */
export function initCartItemsListener(onQtyChange, onRemove) {
  cartItemsList.addEventListener("click", (e) => {
    /** @type {HTMLElement|null} */
    const btn = e.target.closest("[data-action]");
    if (!btn) return;

    const productId = Number(btn.dataset.productId);
    if (!productId) return;

    const action = btn.dataset.action;

    if (action === "increment") {
      onQtyChange(productId, 1);
    } else if (action === "decrement") {
      onQtyChange(productId, -1);
    } else if (action === "remove") {
      onRemove(productId);
    }
  });
}

// ─── Helper Utilities ───────────────────────────────────────────

/**
 * Escapes HTML special characters to prevent XSS when inserting
 * user-facing strings into innerHTML.
 *
 * @param {string} str
 * @returns {string}
 */
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

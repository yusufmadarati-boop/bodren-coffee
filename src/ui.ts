/**
 * src/ui.ts
 * ═══════════════════════════════════════════════════════════════
 * UI MODULE — BODREN Coffee Shop
 *
 * The SOLE file permitted to touch the browser DOM.
 * Strict rules:
 * - Zero 'any', zero 'as', zero '!'.
 * - Safe type narrowing via instanceof.
 * - Single delegated event listeners on stable parent containers.
 * ═══════════════════════════════════════════════════════════════
 */

import { CartItem, LanguageCode, Product } from './types.js';
import { isRTL, LANG_LABELS, SUPPORTED_LANGS, t } from './i18n.js';

function getElement(id: string): HTMLElement | null {
  return document.getElementById(id);
}

function getButton(id: string): HTMLButtonElement | null {
  const el = document.getElementById(id);
  return el instanceof HTMLButtonElement ? el : null;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function applyDocumentDirection(lang: LanguageCode): void {
  const rtl = isRTL(lang);
  document.documentElement.setAttribute('dir', rtl ? 'rtl' : 'ltr');
  document.documentElement.setAttribute('lang', lang);
}

export function updateStaticTranslations(): void {
  const i18nElements = document.querySelectorAll('[data-i18n]');
  for (let i = 0; i < i18nElements.length; i += 1) {
    const el = i18nElements[i];
    if (el instanceof HTMLElement) {
      const key = el.dataset['i18n'];
      if (key) {
        el.textContent = t(key);
      }
    }
  }

  const placeholderElements = document.querySelectorAll('[data-i18n-placeholder]');
  for (let i = 0; i < placeholderElements.length; i += 1) {
    const el = placeholderElements[i];
    if (el instanceof HTMLInputElement) {
      const key = el.dataset['i18nPlaceholder'];
      if (key) {
        el.setAttribute('placeholder', t(key));
      }
    }
  }

  const ariaElements = document.querySelectorAll('[data-i18n-aria]');
  for (let i = 0; i < ariaElements.length; i += 1) {
    const el = ariaElements[i];
    if (el instanceof HTMLElement) {
      const key = el.dataset['i18nAria'];
      if (key) {
        el.setAttribute('aria-label', t(key));
      }
    }
  }
}

export function renderLangSelector(currentLang: LanguageCode): void {
  const langSelector = getElement('lang-selector');
  if (!langSelector) {
    return;
  }

  const parts: string[] = [];
  for (let i = 0; i < SUPPORTED_LANGS.length; i += 1) {
    const code = SUPPORTED_LANGS[i];
    if (code) {
      const label = LANG_LABELS[code] || code.toUpperCase();
      const isActive = code === currentLang;
      parts.push(`
        <button
          type="button"
          class="lang-btn${isActive ? ' is-active' : ''}"
          data-lang="${code}"
          aria-pressed="${isActive}"
          aria-label="Switch to ${label}"
        >
          ${label}
        </button>`);
    }
  }

  langSelector.innerHTML = parts.join('');
}

export function initLangSelectorListener(onLangChange: (lang: LanguageCode) => void): void {
  const langSelector = getElement('lang-selector');
  if (!langSelector) {
    return;
  }

  langSelector.addEventListener('click', (event: MouseEvent) => {
    const target = event.target;
    if (!(target instanceof Element)) {
      return;
    }
    const btn = target.closest('button');
    if (!(btn instanceof HTMLButtonElement)) {
      return;
    }
    const lang = btn.dataset['lang'];
    if (lang === 'en' || lang === 'ar' || lang === 'tr') {
      onLangChange(lang);
    }
  });
}

export function openCartDrawer(): void {
  const cartDrawer = getElement('cart-drawer');
  const cartOverlay = getElement('cart-overlay');
  const cartToggleBtn = getButton('cart-toggle-btn');
  const cartCloseBtn = getButton('cart-close-btn');

  if (!cartDrawer || !cartOverlay) {
    return;
  }

  cartDrawer.classList.add('is-open');
  cartOverlay.classList.add('is-visible');
  cartDrawer.setAttribute('aria-hidden', 'false');
  cartOverlay.setAttribute('aria-hidden', 'false');

  if (cartToggleBtn) {
    cartToggleBtn.setAttribute('aria-expanded', 'true');
  }
  if (cartCloseBtn) {
    cartCloseBtn.focus();
  }
}

export function closeCartDrawer(): void {
  const cartDrawer = getElement('cart-drawer');
  const cartOverlay = getElement('cart-overlay');
  const cartToggleBtn = getButton('cart-toggle-btn');

  if (!cartDrawer || !cartOverlay) {
    return;
  }

  cartDrawer.classList.remove('is-open');
  cartOverlay.classList.remove('is-visible');
  cartDrawer.setAttribute('aria-hidden', 'true');
  cartOverlay.setAttribute('aria-hidden', 'true');

  if (cartToggleBtn) {
    cartToggleBtn.setAttribute('aria-expanded', 'false');
    cartToggleBtn.focus();
  }
}

export function initCartDrawerListeners(onToggle: () => void, onClose: () => void): void {
  const cartToggleBtn = getButton('cart-toggle-btn');
  const cartCloseBtn = getButton('cart-close-btn');
  const cartOverlay = getElement('cart-overlay');

  if (cartToggleBtn) {
    cartToggleBtn.addEventListener('click', onToggle);
  }
  if (cartCloseBtn) {
    cartCloseBtn.addEventListener('click', onClose);
  }
  if (cartOverlay) {
    cartOverlay.addEventListener('click', onClose);
  }

  document.addEventListener('keydown', (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  });
}

export function renderProducts(productList: readonly Product[]): void {
  const productsGrid = getElement('products-grid');
  const emptyState = getElement('empty-state');

  if (!productsGrid || !emptyState) {
    return;
  }

  if (productList.length === 0) {
    productsGrid.innerHTML = '';
    emptyState.classList.remove('hidden');
    return;
  }

  emptyState.classList.add('hidden');
  const addLabel = t('shop.addToCart');

  const cards: string[] = [];
  for (let i = 0; i < productList.length; i += 1) {
    const p = productList[i];
    if (p) {
      const translatedBadge = p.badge ? t(`badge.${p.badge}`) : '';
      const translatedCategory = t(`cat.${p.category}`);
      const prodName =
        t(`prod.${p.id}.name`) !== `prod.${p.id}.name` ? t(`prod.${p.id}.name`) : p.name;
      const prodDesc =
        t(`prod.${p.id}.desc`) !== `prod.${p.id}.desc` ? t(`prod.${p.id}.desc`) : p.desc;

      cards.push(`
      <article class="product-card" data-product-id="${p.id}">
        ${translatedBadge ? `<span class="product-badge">${escapeHtml(translatedBadge)}</span>` : ''}
        <div class="product-card-emoji" aria-hidden="true">${p.emoji}</div>
        <div class="product-card-body">
          <h3 class="product-card-name">${escapeHtml(prodName)}</h3>
          <span class="product-card-category">${escapeHtml(translatedCategory)}</span>
          <p class="product-card-desc">${escapeHtml(prodDesc)}</p>
        </div>
        <div class="product-card-footer">
          <span class="product-card-price">${p.price} ₽</span>
          <button
            type="button"
            class="btn-add-to-cart"
            data-product-id="${p.id}"
            aria-label="${escapeHtml(addLabel)}: ${escapeHtml(prodName)}"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <line x1="12" y1="5" x2="12" y2="19" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
              <line x1="5" y1="12" x2="19" y2="12" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
            </svg>
            ${escapeHtml(addLabel)}
          </button>
        </div>
      </article>`);
    }
  }

  productsGrid.innerHTML = cards.join('');
}

export function renderCategoryFilters(categories: readonly string[], activeCategory: string): void {
  const categoryFilters = getElement('category-filters');
  if (!categoryFilters) {
    return;
  }

  const allCategories = ['All', ...categories];
  const chips: string[] = [];

  for (let i = 0; i < allCategories.length; i += 1) {
    const cat = allCategories[i];
    if (cat) {
      const label = t(`cat.${cat}`);
      const isActive = cat === activeCategory;
      chips.push(`
        <button
          type="button"
          class="category-chip${isActive ? ' is-active' : ''}"
          data-category="${cat}"
          aria-pressed="${isActive}"
        >
          ${escapeHtml(label)}
        </button>`);
    }
  }

  categoryFilters.innerHTML = chips.join('');
}

export function renderCartItems(items: readonly CartItem[]): void {
  const cartItemsList = getElement('cart-items-list');
  if (!cartItemsList) {
    return;
  }

  if (items.length === 0) {
    cartItemsList.innerHTML = `
      <div class="cart-empty">
        <p class="cart-empty-icon">☕</p>
        <p class="cart-empty-text">
          ${escapeHtml(t('cart.emptyTitle'))}<br/>
          ${escapeHtml(t('cart.emptyHint'))}
        </p>
      </div>`;
    return;
  }

  const eachLabel = t('cart.each');
  const rows: string[] = [];

  for (let i = 0; i < items.length; i += 1) {
    const item = items[i];
    if (item) {
      const prodName =
        t(`prod.${item.id}.name`) !== `prod.${item.id}.name`
          ? t(`prod.${item.id}.name`)
          : item.name;

      rows.push(`
      <div class="cart-item" data-cart-item-id="${item.id}">
        <span class="cart-item-emoji" aria-hidden="true">${item.emoji}</span>
        <div class="cart-item-info">
          <span class="cart-item-name">${escapeHtml(prodName)}</span>
          <span class="cart-item-unit-price">${item.price} ${escapeHtml(eachLabel)}</span>
        </div>
        <div class="cart-item-qty-controls">
          <button
            type="button"
            class="qty-btn"
            data-action="decrement"
            data-product-id="${item.id}"
            aria-label="−"
          >−</button>
          <span class="qty-value" aria-label="Quantity: ${item.qty}">${item.qty}</span>
          <button
            type="button"
            class="qty-btn"
            data-action="increment"
            data-product-id="${item.id}"
            aria-label="+"
          >+</button>
        </div>
        <div class="cart-item-subtotal">${item.price * item.qty} ₽</div>
        <button
          type="button"
          class="cart-item-remove"
          data-action="remove"
          data-product-id="${item.id}"
          aria-label="Remove ${escapeHtml(prodName)}"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </button>
      </div>`);
    }
  }

  cartItemsList.innerHTML = rows.join('');
}

export function updateCartBadge(count: number): void {
  const cartBadge = getElement('cart-badge');
  if (!cartBadge) {
    return;
  }
  cartBadge.textContent = String(count);
  cartBadge.classList.toggle('has-items', count > 0);
}

export function updateCartTotal(total: number): void {
  const cartTotalPrice = getElement('cart-total-price');
  if (!cartTotalPrice) {
    return;
  }
  cartTotalPrice.textContent = `${total} ₽`;
}

export function initProductGridListener(onAddToCart: (productId: number) => void): void {
  const productsGrid = getElement('products-grid');
  if (!productsGrid) {
    return;
  }

  productsGrid.addEventListener('click', (event: MouseEvent) => {
    const target = event.target;
    if (!(target instanceof Element)) {
      return;
    }
    const btn = target.closest('.btn-add-to-cart');
    if (!(btn instanceof HTMLButtonElement)) {
      return;
    }
    const rawId = btn.dataset['productId'];
    if (rawId) {
      const id = Number(rawId);
      if (Number.isFinite(id) && id > 0) {
        onAddToCart(id);
      }
    }
  });
}

export function initCartItemsListener(
  onQtyChange: (productId: number, delta: number) => void,
  onRemove: (productId: number) => void
): void {
  const cartItemsList = getElement('cart-items-list');
  if (!cartItemsList) {
    return;
  }

  cartItemsList.addEventListener('click', (event: MouseEvent) => {
    const target = event.target;
    if (!(target instanceof Element)) {
      return;
    }
    const btn = target.closest('[data-action]');
    if (!(btn instanceof HTMLButtonElement)) {
      return;
    }

    const rawId = btn.dataset['productId'];
    const action = btn.dataset['action'];
    if (!rawId || !action) {
      return;
    }

    const productId = Number(rawId);
    if (!Number.isFinite(productId) || productId <= 0) {
      return;
    }

    if (action === 'increment') {
      onQtyChange(productId, 1);
    } else if (action === 'decrement') {
      onQtyChange(productId, -1);
    } else if (action === 'remove') {
      onRemove(productId);
    }
  });
}

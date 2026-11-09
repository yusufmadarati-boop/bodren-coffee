/**
 * src/main.ts
 * ═══════════════════════════════════════════════════════════════
 * ROOT ORCHESTRATION — BODREN Coffee Shop
 *
 * Bootstraps the application:
 * 1. Coordinates data, cart, filters, translations, and UI.
 * 2. Manages filter state and reactive re-renders.
 * 3. Strictly typed TypeScript with zero 'any', zero 'as', zero '!'.
 * ═══════════════════════════════════════════════════════════════
 */

import { getCategories, products } from './products.js';
import {
  addToCart,
  clearCart,
  getCart,
  getTotalItems,
  getTotalPrice,
  removeFromCart,
  updateQuantity,
} from './cart.js';
import { applyFilters } from './filters.js';
import { getCurrentLang, setCurrentLang, t } from './i18n.js';
import { FilterState, LanguageCode, Product, SortOption } from './types.js';
import {
  applyDocumentDirection,
  closeCartDrawer,
  initCartDrawerListeners,
  initCartItemsListener,
  initLangSelectorListener,
  initProductGridListener,
  openCartDrawer,
  renderCartItems,
  renderCategoryFilters,
  renderLangSelector,
  renderProducts,
  updateCartBadge,
  updateCartTotal,
  updateStaticTranslations,
} from './ui.js';
import { initQuiz, refreshQuizTranslations } from './quiz.js';

const filterState: FilterState = {
  query: '',
  category: 'All',
  sortKey: 'default',
};

function productSearchExtractor(product: Product): readonly string[] {
  const localized = t(`prod.${product.id}.name`);
  return [product.name, localized];
}

function renderFilteredProducts(): void {
  const filtered = applyFilters(products, {
    query: filterState.query,
    category: filterState.category,
    sortKey: filterState.sortKey,
    extractor: productSearchExtractor,
  });
  renderProducts(filtered);
}

function refreshCartUI(): void {
  renderCartItems(getCart());
  updateCartBadge(getTotalItems());
  updateCartTotal(getTotalPrice());
}

function applyLanguage(lang: LanguageCode): void {
  applyDocumentDirection(lang);
  updateStaticTranslations();
  renderLangSelector(lang);
  renderCategoryFilters(getCategories(), filterState.category);
  renderFilteredProducts();
  refreshCartUI();
  refreshQuizTranslations();
}

function handleLanguageChange(lang: LanguageCode): void {
  if (lang === getCurrentLang()) {
    return;
  }
  setCurrentLang(lang);
  applyLanguage(lang);
}

function handleAddToCart(productId: number): void {
  let targetProduct: Product | null = null;
  for (let i = 0; i < products.length; i += 1) {
    const p = products[i];
    if (p && p.id === productId) {
      targetProduct = p;
      break;
    }
  }

  if (!targetProduct) {
    return;
  }

  addToCart(targetProduct);
  refreshCartUI();
  openCartDrawer();
}

function handleQtyChange(productId: number, delta: number): void {
  updateQuantity(productId, delta);
  refreshCartUI();
}

function handleRemoveItem(productId: number): void {
  removeFromCart(productId);
  refreshCartUI();
}

function handleClearCart(): void {
  clearCart();
  refreshCartUI();
}

function isSortOption(value: string): value is SortOption {
  return value === 'default' || value === 'price-asc' || value === 'price-desc';
}

function initSearchAndFilterControls(): void {
  const searchInput = document.getElementById('search-input');
  if (searchInput instanceof HTMLInputElement) {
    searchInput.addEventListener('input', (event: Event) => {
      const target = event.target;
      if (target instanceof HTMLInputElement) {
        filterState.query = target.value;
        renderFilteredProducts();
      }
    });
  }

  const sortSelect = document.getElementById('sort-select');
  if (sortSelect instanceof HTMLSelectElement) {
    sortSelect.addEventListener('change', (event: Event) => {
      const target = event.target;
      if (target instanceof HTMLSelectElement) {
        const val = target.value;
        if (isSortOption(val)) {
          filterState.sortKey = val;
          renderFilteredProducts();
        }
      }
    });
  }

  const categoryFiltersEl = document.getElementById('category-filters');
  if (categoryFiltersEl instanceof HTMLElement) {
    categoryFiltersEl.addEventListener('click', (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) {
        return;
      }
      const chip = target.closest('.category-chip');
      if (!(chip instanceof HTMLButtonElement)) {
        return;
      }

      const selected = chip.dataset['category'];
      if (!selected || filterState.category === selected) {
        return;
      }

      filterState.category = selected;
      renderCategoryFilters(getCategories(), filterState.category);
      renderFilteredProducts();
    });
  }

  const clearCartBtn = document.getElementById('clear-cart-btn');
  if (clearCartBtn instanceof HTMLButtonElement) {
    clearCartBtn.addEventListener('click', handleClearCart);
  }
}

function initHeaderScroll(): void {
  const header = document.getElementById('site-header');
  if (!header) {
    return;
  }

  window.addEventListener(
    'scroll',
    () => {
      header.classList.toggle('is-scrolled', window.scrollY > 60);
    },
    { passive: true }
  );
}

function init(): void {
  const initialLang = getCurrentLang();
  applyLanguage(initialLang);

  initLangSelectorListener(handleLanguageChange);
  initCartDrawerListeners(openCartDrawer, closeCartDrawer);
  initProductGridListener(handleAddToCart);
  initCartItemsListener(handleQtyChange, handleRemoveItem);
  initSearchAndFilterControls();
  initQuiz();
  initHeaderScroll();
}

init();

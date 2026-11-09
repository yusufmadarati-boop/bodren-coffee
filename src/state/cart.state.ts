// Cart persistence layer using localStorage

import type { Cart } from '../types';

const PRIMARY_KEY = 'shopboard_cart_v1';
const FALLBACK_KEY = 'bodren_cart_v1';

/** Load cart from storage */
export function loadCart(): Cart {
  try {
    const raw = localStorage.getItem(PRIMARY_KEY) ?? localStorage.getItem(FALLBACK_KEY);
    if (!raw) return {};
    const parsed: unknown = JSON.parse(raw);
    if (typeof parsed !== 'object' || parsed === null) return {};
    return parsed as Cart;
  } catch {
    return {};
  }
}

/** Save cart to storage */
export function saveCart(cart: Cart): void {
  try {
    const serialized = JSON.stringify(cart);
    localStorage.setItem(PRIMARY_KEY, serialized);
    localStorage.setItem(FALLBACK_KEY, serialized);
  } catch {
    // Graceful fallback if storage restricted
  }
}

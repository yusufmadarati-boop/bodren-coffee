/**
 * src/cart.ts
 * ═══════════════════════════════════════════════════════════════
 * CART MODULE — BODREN Coffee Shop
 *
 * Cart state management and localStorage persistence.
 * Zero DOM access. Zero event listeners. Pure state logic.
 *
 * Persistence key: "shopboard_cart_v1" (synced with "bodren_cart_v1")
 * ═══════════════════════════════════════════════════════════════
 */

import { CartItem, Product, Cart } from './types.js';

const PRIMARY_STORAGE_KEY = 'shopboard_cart_v1';
const FALLBACK_STORAGE_KEY = 'bodren_cart_v1';

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function parseCartItem(value: unknown): CartItem | null {
  if (!isRecord(value)) {
    return null;
  }

  const { id, name, price, emoji, qty } = value;

  if (
    typeof id === 'number' &&
    typeof name === 'string' &&
    typeof price === 'number' &&
    typeof emoji === 'string' &&
    typeof qty === 'number' &&
    qty > 0
  ) {
    return { id, name, price, emoji, qty };
  }

  return null;
}

function loadFromStorage(): CartItem[] {
  try {
    const raw =
      localStorage.getItem(PRIMARY_STORAGE_KEY) || localStorage.getItem(FALLBACK_STORAGE_KEY);
    if (!raw) {
      return [];
    }

    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return [];
    }

    const validItems: CartItem[] = [];
    for (let i = 0; i < parsed.length; i += 1) {
      const item = parseCartItem(parsed[i]);
      if (item !== null) {
        validItems.push(item);
      }
    }

    return validItems;
  } catch {
    return [];
  }
}

let cartState: CartItem[] = loadFromStorage();

function persist(): void {
  try {
    const serialized = JSON.stringify(cartState);
    localStorage.setItem(PRIMARY_STORAGE_KEY, serialized);
    localStorage.setItem(FALLBACK_STORAGE_KEY, serialized);
  } catch {
    // Non-fatal if localStorage is restricted
  }
}

export function getCart(): readonly CartItem[] {
  return [...cartState];
}

export function addToCart(product: Product): void {
  let existingIndex = -1;
  for (let i = 0; i < cartState.length; i += 1) {
    const item = cartState[i];
    if (item && item.id === product.id) {
      existingIndex = i;
      break;
    }
  }

  if (existingIndex >= 0) {
    const existing = cartState[existingIndex];
    if (existing) {
      existing.qty += 1;
    }
  } else {
    const newItem: CartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      emoji: product.emoji,
      qty: 1,
    };
    cartState.push(newItem);
  }

  persist();
}

export function updateQuantity(productId: number, delta: number): void {
  let targetIndex = -1;
  for (let i = 0; i < cartState.length; i += 1) {
    const item = cartState[i];
    if (item && item.id === productId) {
      targetIndex = i;
      break;
    }
  }

  if (targetIndex === -1) {
    return;
  }

  const current = cartState[targetIndex];
  if (!current) {
    return;
  }

  const nextQty = current.qty + delta;

  if (nextQty <= 0) {
    cartState.splice(targetIndex, 1);
  } else {
    current.qty = nextQty;
  }

  persist();
}

export function removeFromCart(productId: number): void {
  cartState = cartState.filter((item) => item.id !== productId);
  persist();
}

export function clearCart(): void {
  cartState = [];
  persist();
}

export function getTotalItems(): number {
  return cartState.reduce((sum, item) => sum + item.qty, 0);
}

export function getTotalPrice(): number {
  return cartState.reduce((sum, item) => sum + item.price * item.qty, 0);
}

export function getCartSnapshot(): Cart {
  return {
    items: [...cartState],
    totalItems: getTotalItems(),
    totalPrice: getTotalPrice(),
  };
}

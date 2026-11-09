// Pure, immutable cart operations

import type { Cart, CartItem, CartSummary, Product } from '../types';

/** Add one unit of a product or increase quantity */
export function addToCart(cart: Cart, product: Product): Cart {
  const existing = cart[product.id];
  const quantity = existing !== undefined ? existing.quantity + 1 : 1;
  return {
    ...cart,
    [product.id]: { product, quantity },
  };
}

/** Set quantity for a product; removes if quantity <= 0 */
export function setQuantity(cart: Cart, productId: number, quantity: number): Cart {
  if (quantity <= 0) {
    return removeFromCart(cart, productId);
  }
  const item = cart[productId];
  if (item === undefined) return cart;
  return { ...cart, [productId]: { ...item, quantity } };
}

/** Remove an item from cart */
export function removeFromCart(cart: Cart, productId: number): Cart {
  return Object.fromEntries(Object.entries(cart).filter(([key]) => key !== String(productId)));
}

/** Clear all items */
export function clearCart(): Cart {
  return {};
}

/** Compute totals from cart */
export function getCartSummary(cart: Cart): CartSummary {
  const items = Object.values(cart).filter((item): item is CartItem => item !== undefined);
  return {
    itemCount: items.reduce((sum, item) => sum + item.quantity, 0),
    totalCents: items.reduce((sum, item) => sum + item.product.priceCents * item.quantity, 0),
  };
}

// Pure cart calculation utilities

import type { CartItem, CartTotals } from '../types';

const TAX_RATE = 0.08; // 8% sales tax
const FREE_SHIPPING_THRESHOLD_CENTS = 5000; // $50.00
const STANDARD_SHIPPING_CENTS = 750; // $7.50

/**
 * Pure calculation of derived cart totals on the fly.
 * No totals are persisted in state.
 */
export function calculateCartTotals(items: readonly CartItem[]): CartTotals {
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotalCents = items.reduce(
    (sum, item) => sum + item.product.priceCents * item.quantity,
    0
  );

  const estimatedTaxCents = Math.round(subtotalCents * TAX_RATE);
  const shippingCents =
    subtotalCents === 0 || subtotalCents >= FREE_SHIPPING_THRESHOLD_CENTS
      ? 0
      : STANDARD_SHIPPING_CENTS;

  const grandTotalCents = subtotalCents + estimatedTaxCents + shippingCents;

  return {
    totalQuantity,
    subtotalCents,
    estimatedTaxCents,
    shippingCents,
    grandTotalCents,
  };
}

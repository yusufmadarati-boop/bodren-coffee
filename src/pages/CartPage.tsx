// Cart & Order Review Route Page

import { Link } from 'react-router-dom';
import { useCartStore } from '../store/useCartStore';
import { calculateCartTotals } from '../logic/cart.logic';
import { formatCurrency } from '../lib/utils';
import { CartItemDetailRow } from '../components/CartItemDetailRow';
import { ArrowRight, ShoppingBag, Trash2, ArrowLeft } from 'lucide-react';

export function CartPage() {
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);
  const totals = calculateCartTotals(items);

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-lg py-16 text-center">
        <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl border border-[#3d332a] bg-[#1a1411] text-[#d4a373]">
          <ShoppingBag className="h-8 w-8" />
        </div>
        <h1 className="font-serif text-2xl font-bold text-[#fefae0]">Your Order Is Empty</h1>
        <p className="mt-2 text-xs text-[#a6907d]">
          You have not added any artisanal beans or specialty goods to your order yet.
        </p>
        <Link
          to="/products"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#d4a373] px-6 py-3.5 text-xs font-bold text-[#120f0d] transition-all hover:bg-[#faedcd]"
        >
          <span>Discover Roasts</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Page Title */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <span className="text-xs font-bold tracking-widest text-[#d4a373] uppercase">
            Order Review
          </span>
          <h1 className="mt-1 font-serif text-3xl font-extrabold text-[#fefae0]">
            Review Your Roastery Cart
          </h1>
        </div>

        <button
          type="button"
          onClick={clearCart}
          className="inline-flex items-center gap-1.5 self-start rounded-lg border border-[#3d332a] px-3.5 py-2 text-xs font-semibold text-[#a6907d] transition-colors hover:border-rose-900 hover:text-rose-400 sm:self-auto"
        >
          <Trash2 className="h-3.5 w-3.5" />
          <span>Clear Order</span>
        </button>
      </div>

      {/* Grid: Items List vs Order Summary */}
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
        {/* Cart Items List */}
        <div className="rounded-2xl border border-[#3d332a] bg-[#171310] p-6 shadow-xl lg:col-span-2">
          <div className="divide-y divide-[#2d251f]">
            {items.map((item) => (
              <CartItemDetailRow
                key={`${item.product.id.toString()}-${item.grindOption ?? 'default'}`}
                item={item}
              />
            ))}
          </div>

          <div className="mt-6 flex items-center justify-between pt-4">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 text-xs font-semibold text-[#a6907d] hover:text-[#d4a373]"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Continue Shopping</span>
            </Link>
          </div>
        </div>

        {/* Order Summary Card */}
        <div className="h-fit rounded-2xl border border-[#3d332a] bg-[#171310] p-6 shadow-xl">
          <h2 className="font-serif text-lg font-bold text-[#fefae0]">Order Summary</h2>

          <div className="mt-6 space-y-3.5 border-b border-[#2d251f] pb-6 text-xs text-[#a6907d]">
            <div className="flex justify-between">
              <span>Items Total ({totals.totalQuantity})</span>
              <span className="font-semibold text-[#fefae0]">
                {formatCurrency(totals.subtotalCents)}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Estimated Shipping</span>
              <span>
                {totals.shippingCents === 0 ? (
                  <span className="font-bold text-emerald-400">FREE</span>
                ) : (
                  formatCurrency(totals.shippingCents)
                )}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Estimated Tax (8%)</span>
              <span className="font-semibold text-[#fefae0]">
                {formatCurrency(totals.estimatedTaxCents)}
              </span>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between">
            <span className="font-serif text-base font-bold text-[#fefae0]">Grand Total</span>
            <span className="font-serif text-2xl font-black text-[#d4a373]">
              {formatCurrency(totals.grandTotalCents)}
            </span>
          </div>

          {totals.subtotalCents < 5000 && (
            <p className="mt-3 rounded-lg bg-[#241c16] p-2.5 text-center text-[11px] text-[#a6907d]">
              Add{' '}
              <strong className="text-[#d4a373]">
                {formatCurrency(5000 - totals.subtotalCents)}
              </strong>{' '}
              more to qualify for complimentary shipping.
            </p>
          )}

          <Link
            to="/checkout"
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#d4a373] py-3.5 text-xs font-bold text-[#120f0d] shadow-lg shadow-[#d4a373]/20 transition-all hover:bg-[#faedcd]"
          >
            <span>Proceed to Checkout</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CartPage;

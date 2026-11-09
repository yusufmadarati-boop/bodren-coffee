// Checkout Route Page powered by React Hook Form + Zod

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import { checkoutSchema, type CheckoutFormData } from '../lib/checkoutSchema';
import { useCartStore } from '../store/useCartStore';
import { calculateCartTotals } from '../logic/cart.logic';
import { formatCurrency } from '../lib/utils';
import { ShieldCheck, CreditCard, Truck, CheckCircle2, Lock, ArrowRight } from 'lucide-react';

export function CheckoutPage() {
  const navigate = useNavigate();
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);
  const totals = calculateCartTotals(items);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [confirmedOrderId, setConfirmedOrderId] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      deliveryMethod: 'standard',
    },
  });

  const onSubmit = (): void => {
    setIsSubmitting(true);
    // Simulate real payment gateway API authorization latency
    setTimeout(() => {
      const orderId = `BODREN-${Math.floor(100000 + Math.random() * 900000).toString()}`;
      setConfirmedOrderId(orderId);
      clearCart();
      setIsSubmitting(false);
      setOrderComplete(true);
    }, 1200);
  };

  if (orderComplete && confirmedOrderId) {
    return (
      <div className="mx-auto max-w-xl py-16 text-center">
        <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-3xl bg-emerald-950/60 text-emerald-400 shadow-xl shadow-emerald-950/40">
          <CheckCircle2 className="h-10 w-10" />
        </div>
        <span className="text-xs font-bold tracking-widest text-[#d4a373] uppercase">
          Order Confirmed
        </span>
        <h1 className="mt-2 font-serif text-3xl font-extrabold text-[#fefae0]">
          Thank You For Supporting Generational Coffee Farmers!
        </h1>
        <p className="mt-4 text-xs text-[#a6907d]">
          Your order identifier is <strong className="text-[#fefae0]">{confirmedOrderId}</strong>.
          We have queued your selected micro-lots for small-batch roasting and degassing packaging.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <button
            type="button"
            onClick={() => {
              void navigate('/products');
            }}
            className="inline-flex items-center gap-2 rounded-xl bg-[#d4a373] px-6 py-3.5 text-xs font-bold text-[#120f0d] hover:bg-[#faedcd]"
          >
            <span>Continue Exploring Roasts</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-lg py-16 text-center">
        <h1 className="font-serif text-2xl font-bold text-[#fefae0]">Your Cart is Empty</h1>
        <p className="mt-2 text-xs text-[#a6907d]">
          Add items to your roastery cart before checking out.
        </p>
        <Link
          to="/products"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#d4a373] px-6 py-3 text-xs font-bold text-[#120f0d]"
        >
          <span>Go to Catalog</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <span className="text-xs font-bold tracking-widest text-[#d4a373] uppercase">
          Finalize Order
        </span>
        <h1 className="mt-1 font-serif text-3xl font-extrabold text-[#fefae0]">
          Secure Roastery Checkout
        </h1>
      </div>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
        {/* Form Container */}
        <div className="rounded-2xl border border-[#3d332a] bg-[#171310] p-8 shadow-xl lg:col-span-2">
          <form
            onSubmit={(e) => {
              void handleSubmit(onSubmit)(e);
            }}
            className="space-y-8"
            noValidate
          >
            {/* Section 1: Customer Contact */}
            <div className="space-y-4">
              <h2 className="flex items-center gap-2 font-serif text-lg font-bold text-[#fefae0]">
                <span>1. Contact & Shipping Details</span>
              </h2>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="fullName" className="block text-xs font-semibold text-[#a6907d]">
                    Full Name
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    {...register('fullName')}
                    placeholder="Eleanor Vance"
                    className="mt-1.5 w-full rounded-xl border border-[#3d332a] bg-[#1f1a16] px-4 py-2.5 text-xs text-[#fefae0] placeholder-[#6b5c50] focus:border-[#d4a373] focus:outline-none"
                  />
                  {errors.fullName && (
                    <p className="mt-1 text-[11px] text-rose-400">{errors.fullName.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-semibold text-[#a6907d]">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    {...register('email')}
                    placeholder="eleanor@example.com"
                    className="mt-1.5 w-full rounded-xl border border-[#3d332a] bg-[#1f1a16] px-4 py-2.5 text-xs text-[#fefae0] placeholder-[#6b5c50] focus:border-[#d4a373] focus:outline-none"
                  />
                  {errors.email && (
                    <p className="mt-1 text-[11px] text-rose-400">{errors.email.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="address" className="block text-xs font-semibold text-[#a6907d]">
                  Street Address
                </label>
                <input
                  id="address"
                  type="text"
                  {...register('address')}
                  placeholder="42 Artisan Way, Suite 10"
                  className="mt-1.5 w-full rounded-xl border border-[#3d332a] bg-[#1f1a16] px-4 py-2.5 text-xs text-[#fefae0] placeholder-[#6b5c50] focus:border-[#d4a373] focus:outline-none"
                />
                {errors.address && (
                  <p className="mt-1 text-[11px] text-rose-400">{errors.address.message}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="city" className="block text-xs font-semibold text-[#a6907d]">
                    City
                  </label>
                  <input
                    id="city"
                    type="text"
                    {...register('city')}
                    placeholder="Seattle"
                    className="mt-1.5 w-full rounded-xl border border-[#3d332a] bg-[#1f1a16] px-4 py-2.5 text-xs text-[#fefae0] placeholder-[#6b5c50] focus:border-[#d4a373] focus:outline-none"
                  />
                  {errors.city && (
                    <p className="mt-1 text-[11px] text-rose-400">{errors.city.message}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="postalCode"
                    className="block text-xs font-semibold text-[#a6907d]"
                  >
                    Postal Code
                  </label>
                  <input
                    id="postalCode"
                    type="text"
                    {...register('postalCode')}
                    placeholder="98101"
                    className="mt-1.5 w-full rounded-xl border border-[#3d332a] bg-[#1f1a16] px-4 py-2.5 text-xs text-[#fefae0] placeholder-[#6b5c50] focus:border-[#d4a373] focus:outline-none"
                  />
                  {errors.postalCode && (
                    <p className="mt-1 text-[11px] text-rose-400">{errors.postalCode.message}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Section 2: Delivery Method */}
            <div className="space-y-4 border-t border-[#2d251f] pt-6">
              <h2 className="flex items-center gap-2 font-serif text-lg font-bold text-[#fefae0]">
                <Truck className="h-4 w-4 text-[#d4a373]" />
                <span>2. Dispatch Speed</span>
              </h2>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <label className="flex cursor-pointer items-center justify-between rounded-xl border border-[#3d332a] bg-[#1f1a16] p-4 has-[:checked]:border-[#d4a373] has-[:checked]:bg-[#292019]">
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      value="standard"
                      {...register('deliveryMethod')}
                      className="accent-[#d4a373]"
                    />
                    <div>
                      <span className="block text-xs font-bold text-[#fefae0]">
                        Standard Courier
                      </span>
                      <span className="block text-[11px] text-[#a6907d]">3–5 business days</span>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-[#fefae0]">
                    {totals.shippingCents === 0 ? 'FREE' : '$7.50'}
                  </span>
                </label>

                <label className="flex cursor-pointer items-center justify-between rounded-xl border border-[#3d332a] bg-[#1f1a16] p-4 has-[:checked]:border-[#d4a373] has-[:checked]:bg-[#292019]">
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      value="express"
                      {...register('deliveryMethod')}
                      className="accent-[#d4a373]"
                    />
                    <div>
                      <span className="block text-xs font-bold text-[#fefae0]">
                        Express Roastery
                      </span>
                      <span className="block text-[11px] text-[#a6907d]">Next-day priority</span>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-[#fefae0]">$15.00</span>
                </label>
              </div>
            </div>

            {/* Section 3: Payment */}
            <div className="space-y-4 border-t border-[#2d251f] pt-6">
              <div className="flex items-center justify-between">
                <h2 className="flex items-center gap-2 font-serif text-lg font-bold text-[#fefae0]">
                  <CreditCard className="h-4 w-4 text-[#d4a373]" />
                  <span>3. Payment Information</span>
                </h2>
                <div className="flex items-center gap-1.5 text-[11px] text-emerald-400">
                  <Lock className="h-3 w-3" />
                  <span>256-bit Encrypted</span>
                </div>
              </div>

              <div>
                <label htmlFor="cardNumber" className="block text-xs font-semibold text-[#a6907d]">
                  Card Number
                </label>
                <input
                  id="cardNumber"
                  type="text"
                  {...register('cardNumber')}
                  placeholder="4000 1234 5678 9010"
                  className="mt-1.5 w-full rounded-xl border border-[#3d332a] bg-[#1f1a16] px-4 py-2.5 text-xs text-[#fefae0] placeholder-[#6b5c50] focus:border-[#d4a373] focus:outline-none"
                />
                {errors.cardNumber && (
                  <p className="mt-1 text-[11px] text-rose-400">{errors.cardNumber.message}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="cardExpiry"
                    className="block text-xs font-semibold text-[#a6907d]"
                  >
                    Expiration (MM/YY)
                  </label>
                  <input
                    id="cardExpiry"
                    type="text"
                    {...register('cardExpiry')}
                    placeholder="08/28"
                    className="mt-1.5 w-full rounded-xl border border-[#3d332a] bg-[#1f1a16] px-4 py-2.5 text-xs text-[#fefae0] placeholder-[#6b5c50] focus:border-[#d4a373] focus:outline-none"
                  />
                  {errors.cardExpiry && (
                    <p className="mt-1 text-[11px] text-rose-400">{errors.cardExpiry.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="cardCvc" className="block text-xs font-semibold text-[#a6907d]">
                    CVC / CVV
                  </label>
                  <input
                    id="cardCvc"
                    type="password"
                    maxLength={4}
                    {...register('cardCvc')}
                    placeholder="123"
                    className="mt-1.5 w-full rounded-xl border border-[#3d332a] bg-[#1f1a16] px-4 py-2.5 text-xs text-[#fefae0] placeholder-[#6b5c50] focus:border-[#d4a373] focus:outline-none"
                  />
                  {errors.cardCvc && (
                    <p className="mt-1 text-[11px] text-rose-400">{errors.cardCvc.message}</p>
                  )}
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-[#d4a373] py-4 text-sm font-bold text-[#120f0d] shadow-lg shadow-[#d4a373]/20 transition-all hover:bg-[#faedcd] disabled:cursor-wait disabled:bg-[#3d332a]"
            >
              {isSubmitting ? (
                <span>Authorizing Payment…</span>
              ) : (
                <span>Authorize & Pay {formatCurrency(totals.grandTotalCents)}</span>
              )}
            </button>
          </form>
        </div>

        {/* Sidebar Mini Order Breakdown */}
        <div className="h-fit rounded-2xl border border-[#3d332a] bg-[#171310] p-6 shadow-xl">
          <h2 className="font-serif text-lg font-bold text-[#fefae0]">Order Items</h2>
          <div className="mt-4 divide-y divide-[#2d251f]">
            {items.map((item) => (
              <div
                key={`${item.product.id.toString()}-${item.grindOption ?? ''}`}
                className="flex items-center justify-between py-3 text-xs"
              >
                <div>
                  <span className="font-semibold text-[#fefae0]">{item.product.title}</span>
                  <span className="block text-[10px] text-[#a6907d]">
                    Qty: {item.quantity} • {item.grindOption ?? 'Whole Bean'}
                  </span>
                </div>
                <span className="font-semibold text-[#fefae0]">
                  {formatCurrency(item.product.priceCents * item.quantity)}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-6 border-t border-[#2d251f] pt-4 text-xs space-y-2 text-[#a6907d]">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="text-[#fefae0]">{formatCurrency(totals.subtotalCents)}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax</span>
              <span className="text-[#fefae0]">{formatCurrency(totals.estimatedTaxCents)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span className="text-emerald-400">
                {totals.shippingCents === 0 ? 'FREE' : formatCurrency(totals.shippingCents)}
              </span>
            </div>
            <div className="flex justify-between border-t border-[#2d251f] pt-3 font-serif text-base font-bold text-[#fefae0]">
              <span>Total</span>
              <span className="text-[#d4a373]">{formatCurrency(totals.grandTotalCents)}</span>
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-[#2d251f] bg-[#1a1411] p-3 text-[11px] text-[#6b5c50]">
            <div className="flex items-center gap-1.5 text-[#a6907d]">
              <ShieldCheck className="h-4 w-4 text-[#d4a373]" />
              <span className="font-bold text-[#fefae0]">BODREN Fresh Guarantee</span>
            </div>
            <p className="mt-1">
              Guaranteed roasted and nitrogen-packaged within 48h of order dispatch.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;

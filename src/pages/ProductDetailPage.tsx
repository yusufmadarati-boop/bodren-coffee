// Product Detail Route Page

import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import type { Product, GrindOption } from '../types';
import { getProductById } from '../api/products.api';
import { formatCurrency } from '../lib/utils';
import { useCartStore } from '../store/useCartStore';
import {
  ArrowLeft,
  Check,
  Plus,
  Minus,
  Truck,
  ShieldCheck,
  Coffee,
  AlertCircle,
} from 'lucide-react';

const GRIND_OPTIONS: GrindOption[] = [
  'Whole Bean',
  'Coarse (French Press)',
  'Medium (Drip / V60)',
  'Fine (Espresso)',
];

export function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Local selection state
  const [quantity, setQuantity] = useState(1);
  const [selectedGrind, setSelectedGrind] = useState<GrindOption>('Whole Bean');
  const [addedNotice, setAddedNotice] = useState(false);

  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    if (!id) return;
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) {
      setError('Invalid product ID specified.');
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    getProductById(numericId)
      .then((data) => {
        setProduct(data);
        setIsLoading(false);
      })
      .catch((err: unknown) => {
        const msg = err instanceof Error ? err.message : 'Error fetching product details';
        setError(msg);
        setIsLoading(false);
      });
  }, [id]);

  const handleAddToCart = (): void => {
    if (!product || !product.inStock) return;
    addItem(product, quantity, selectedGrind);
    setAddedNotice(true);
    setTimeout(() => {
      setAddedNotice(false);
    }, 2500);
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Coffee className="h-8 w-8 animate-spin text-[#d4a373]" />
          <span className="text-xs font-semibold text-[#a6907d]">Cupping Micro-lot…</span>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="mx-auto max-w-xl py-12 text-center">
        <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-red-950/60 text-red-400">
          <AlertCircle className="h-7 w-7" />
        </div>
        <h1 className="font-serif text-2xl font-bold text-[#fefae0]">Coffee Roast Not Found</h1>
        <p className="mt-2 text-xs text-[#a6907d]">
          {error ??
            'The roast you requested may have sold out or is no longer in seasonal rotation.'}
        </p>
        <Link
          to="/products"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#d4a373] px-6 py-3 text-xs font-bold text-[#120f0d] hover:bg-[#faedcd]"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Catalog</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8 py-4">
      {/* Back Breadcrumb */}
      <Link
        to="/products"
        className="inline-flex items-center gap-2 text-xs font-semibold text-[#a6907d] transition-colors hover:text-[#d4a373]"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Return to Catalog</span>
      </Link>

      {/* Main Grid */}
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        {/* Media Frame */}
        <div className="flex aspect-square items-center justify-center rounded-3xl border border-[#3d332a] bg-gradient-to-br from-[#241c16] to-[#120f0d] p-12 text-9xl shadow-2xl">
          <span className="filter drop-shadow-2xl">{product.emoji}</span>
        </div>

        {/* Details & Action Panel */}
        <div className="flex flex-col justify-between space-y-8">
          <div>
            <div className="flex items-center gap-3">
              <span className="rounded-md border border-[#3d332a] bg-[#1a1411] px-2.5 py-1 text-xs font-bold tracking-wider text-[#d4a373] uppercase">
                {product.category}
              </span>
              <span className="text-xs text-[#a6907d]">•</span>
              <span className="text-xs font-semibold text-[#a6907d]">{product.origin}</span>
            </div>

            <h1 className="mt-3 font-serif text-3xl font-extrabold text-[#fefae0] sm:text-4xl">
              {product.title}
            </h1>

            <div className="mt-4 flex items-center gap-4">
              <span className="font-serif text-3xl font-black text-[#d4a373]">
                {formatCurrency(product.priceCents)}
              </span>
              {product.inStock ? (
                <span className="inline-flex items-center gap-1 rounded-full border border-emerald-800/60 bg-emerald-950/60 px-3 py-1 text-xs font-bold text-emerald-400">
                  <Check className="h-3.5 w-3.5" />
                  Freshly Roasted & In Stock
                </span>
              ) : (
                <span className="rounded-full border border-rose-800/60 bg-rose-950/60 px-3 py-1 text-xs font-bold text-rose-400">
                  Batch Sold Out
                </span>
              )}
            </div>

            <p className="mt-6 text-sm leading-relaxed text-[#a6907d]">{product.description}</p>

            {/* Tasting Notes */}
            <div className="mt-6">
              <span className="block text-xs font-bold tracking-wider text-[#fefae0] uppercase">
                Cupping Tasting Notes
              </span>
              <div className="mt-2 flex flex-wrap gap-2">
                {product.tastingNotes.map((note) => (
                  <span
                    key={note}
                    className="rounded-lg border border-[#3d332a] bg-[#1a1411] px-3 py-1 text-xs font-medium text-[#d4a373]"
                  >
                    {note}
                  </span>
                ))}
              </div>
            </div>

            {/* Grind Selector */}
            <div className="mt-8 border-t border-[#2b221a] pt-6">
              <label
                htmlFor="grind-select"
                className="block text-xs font-bold tracking-wider text-[#fefae0] uppercase"
              >
                Grind Preference
              </label>
              <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
                {GRIND_OPTIONS.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => {
                      setSelectedGrind(option);
                    }}
                    className={`rounded-xl border p-2.5 text-center text-xs font-medium transition-all ${
                      selectedGrind === option
                        ? 'border-[#d4a373] bg-[#292019] text-[#d4a373]'
                        : 'border-[#3d332a] bg-[#1a1411] text-[#a6907d] hover:border-[#d4a373]/50 hover:text-[#fefae0]'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Quantity and Add CTA */}
          <div className="space-y-4 rounded-2xl border border-[#3d332a] bg-[#171310] p-6">
            <div className="flex items-center gap-4">
              {/* Stepper */}
              <div className="flex items-center rounded-xl border border-[#3d332a] bg-[#1f1a16] p-1">
                <button
                  type="button"
                  onClick={() => {
                    setQuantity((prev) => Math.max(1, prev - 1));
                  }}
                  disabled={quantity <= 1}
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-[#a6907d] hover:text-[#fefae0] disabled:opacity-40"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-10 text-center text-sm font-bold text-[#fefae0]">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setQuantity((prev) => prev + 1);
                  }}
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-[#a6907d] hover:text-[#fefae0]"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>

              {/* Add to Cart Button */}
              <button
                type="button"
                disabled={!product.inStock}
                onClick={handleAddToCart}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#d4a373] py-3.5 text-sm font-bold text-[#120f0d] shadow-lg shadow-[#d4a373]/20 transition-all hover:bg-[#faedcd] disabled:cursor-not-allowed disabled:bg-[#2b221a] disabled:text-[#6b5c50]"
              >
                <Plus className="h-4 w-4" />
                <span>
                  {product.inStock
                    ? `Add ${quantity.toString()} to Order • ${formatCurrency(product.priceCents * quantity)}`
                    : 'Out of Stock'}
                </span>
              </button>
            </div>

            {addedNotice && (
              <div className="flex items-center gap-2 rounded-lg bg-emerald-950/60 p-3 text-xs font-semibold text-emerald-400">
                <Check className="h-4 w-4" />
                <span>Added to your order successfully.</span>
              </div>
            )}

            {/* Shipping notes */}
            <div className="flex items-center justify-between pt-2 text-[11px] text-[#6b5c50]">
              <span className="flex items-center gap-1.5">
                <Truck className="h-3.5 w-3.5 text-[#d4a373]" /> Free shipping over $50
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-[#d4a373]" /> Nitrogen flushed bag
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;

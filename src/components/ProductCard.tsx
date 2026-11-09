// Reusable Product Card Component

import { Link } from 'react-router-dom';
import { Plus, Check, Eye } from 'lucide-react';
import type { Product } from '../types';
import { formatCurrency } from '../lib/utils';
import { useCartStore } from '../store/useCartStore';

export interface Props {
  product: Product;
}

export function ProductCard({ product }: Props) {
  const addItem = useCartStore((state) => state.addItem);

  const handleQuickAdd = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    addItem(product, 1, 'Whole Bean');
  };

  return (
    <article className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-[#3d332a] bg-[#1a1512] transition-all duration-300 hover:-translate-y-1 hover:border-[#d4a373]/60 hover:shadow-2xl hover:shadow-black/60">
      {/* Top Media Anchor */}
      <Link to={`/products/${product.id.toString()}`} className="relative block">
        <div className="flex aspect-square w-full items-center justify-center border-b border-[#3d332a] bg-gradient-to-br from-[#261e18] to-[#17120e] p-8 text-6xl transition-transform duration-300 group-hover:scale-105">
          <span className="select-none filter drop-shadow-md">{product.emoji}</span>
        </div>

        {/* Stock Badge */}
        <div className="absolute top-3 right-3">
          {product.inStock ? (
            <span className="inline-flex items-center gap-1 rounded-full border border-emerald-800/60 bg-emerald-950/70 px-2.5 py-0.5 text-[10px] font-bold text-emerald-400">
              <Check className="h-3 w-3" />
              In Stock
            </span>
          ) : (
            <span className="inline-flex items-center rounded-full border border-rose-800/60 bg-rose-950/70 px-2.5 py-0.5 text-[10px] font-bold text-rose-400">
              Sold Out
            </span>
          )}
        </div>

        {/* Roast Level Pill */}
        <div className="absolute bottom-3 left-3">
          <span className="rounded-md border border-[#3d332a] bg-[#120f0d]/90 px-2 py-0.5 text-[10px] font-semibold tracking-wider text-[#d4a373] uppercase backdrop-blur-sm">
            {product.roastLevel} Roast
          </span>
        </div>
      </Link>

      {/* Body Information */}
      <div className="flex flex-1 flex-col p-5">
        <div className="text-[11px] font-semibold tracking-wider text-[#a6907d] uppercase">
          {product.origin}
        </div>

        <Link
          to={`/products/${product.id.toString()}`}
          className="mt-1 font-serif text-lg font-bold text-[#fefae0] transition-colors group-hover:text-[#d4a373]"
        >
          {product.title}
        </Link>

        {/* Tasting Notes */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {product.tastingNotes.map((note) => (
            <span
              key={note}
              className="rounded-full bg-[#241c16] px-2 py-0.5 text-[10px] text-[#a6907d]"
            >
              {note}
            </span>
          ))}
        </div>

        {/* Price & Action */}
        <div className="mt-6 flex items-center justify-between border-t border-[#2d251f] pt-4">
          <div>
            <span className="block text-[10px] tracking-wider text-[#a6907d] uppercase">Price</span>
            <span className="font-serif text-lg font-extrabold text-[#fefae0]">
              {formatCurrency(product.priceCents)}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to={`/products/${product.id.toString()}`}
              aria-label={`View details of ${product.title}`}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#3d332a] bg-[#221a14] text-[#a6907d] transition-colors hover:border-[#d4a373] hover:text-[#d4a373]"
            >
              <Eye className="h-4 w-4" />
            </Link>

            <button
              type="button"
              disabled={!product.inStock}
              onClick={handleQuickAdd}
              aria-label={`Add ${product.title} to cart`}
              className="flex h-9 items-center gap-1.5 rounded-lg bg-[#d4a373] px-3 text-xs font-bold text-[#120f0d] transition-colors hover:bg-[#faedcd] disabled:cursor-not-allowed disabled:bg-[#2b221a] disabled:text-[#6b5c50]"
            >
              <Plus className="h-4 w-4" />
              <span>Add</span>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

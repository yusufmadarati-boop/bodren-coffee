// Cart Item Row for /cart review page

import { Trash2, Plus, Minus } from 'lucide-react';
import type { CartItem } from '../types';
import { formatCurrency } from '../lib/utils';
import { useCartStore } from '../store/useCartStore';

export interface Props {
  item: CartItem;
}

export function CartItemDetailRow({ item }: Props) {
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);

  const { product, quantity, grindOption } = item;
  const linePriceCents = product.priceCents * quantity;

  return (
    <div className="flex flex-col gap-4 border-b border-[#2d251f] py-6 sm:flex-row sm:items-center sm:justify-between">
      {/* Product Summary */}
      <div className="flex items-center gap-4">
        <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-xl border border-[#3d332a] bg-[#1f1a16] text-3xl">
          {product.emoji}
        </div>
        <div>
          <h3 className="font-serif text-base font-bold text-[#fefae0]">{product.title}</h3>
          <p className="text-xs text-[#a6907d]">
            {product.origin} • {grindOption ?? 'Whole Bean'}
          </p>
          <p className="mt-1 text-xs font-semibold text-[#d4a373]">
            {formatCurrency(product.priceCents)} each
          </p>
        </div>
      </div>

      {/* Stepper & Total */}
      <div className="flex items-center justify-between gap-6 sm:justify-end">
        {/* Quantity Controls */}
        <div className="flex items-center rounded-lg border border-[#3d332a] bg-[#1a1411]">
          <button
            type="button"
            onClick={() => {
              updateQuantity(product.id, quantity - 1, grindOption);
            }}
            aria-label={`Decrease quantity of ${product.title}`}
            className="flex h-8 w-8 items-center justify-center text-[#a6907d] transition-colors hover:text-[#fefae0]"
          >
            <Minus className="h-3.5 w-3.5" />
          </button>
          <span className="w-8 text-center text-xs font-bold text-[#fefae0]">{quantity}</span>
          <button
            type="button"
            onClick={() => {
              updateQuantity(product.id, quantity + 1, grindOption);
            }}
            aria-label={`Increase quantity of ${product.title}`}
            className="flex h-8 w-8 items-center justify-center text-[#a6907d] transition-colors hover:text-[#fefae0]"
          >
            <Plus className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Line Price */}
        <div className="w-20 text-right font-serif text-base font-bold text-[#fefae0]">
          {formatCurrency(linePriceCents)}
        </div>

        {/* Remove Button */}
        <button
          type="button"
          onClick={() => {
            removeItem(product.id, grindOption);
          }}
          aria-label={`Remove ${product.title} from cart`}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-[#a6907d] transition-colors hover:bg-rose-950/40 hover:text-rose-400"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

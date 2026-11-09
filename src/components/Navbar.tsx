// Top-level Navigation Header

import { Link, NavLink } from 'react-router-dom';
import { Coffee, ShoppingBag, Search, Sparkles } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';
import { calculateCartTotals } from '../logic/cart.logic';

export interface Props {
  onSearchClick?: () => void;
}

export function Navbar({ onSearchClick }: Props) {
  const items = useCartStore((state) => state.items);
  const totals = calculateCartTotals(items);

  return (
    <header className="sticky top-0 z-50 border-b border-[#3d332a] bg-[#14110e]/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link
          to="/"
          className="group flex items-center gap-3 transition-transform hover:scale-[1.02]"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#d4a373]/30 bg-[#241c16] text-[#d4a373] shadow-inner transition-colors group-hover:border-[#d4a373]">
            <Coffee className="h-5 w-5" />
          </div>
          <div>
            <span className="block font-serif text-lg font-bold tracking-wider text-[#d4a373]">
              BODREN
            </span>
            <span className="block text-[10px] tracking-widest text-[#a6907d] uppercase">
              Artisan Coffee
            </span>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden items-center gap-8 md:flex">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-sm font-medium transition-colors ${
                isActive ? 'text-[#d4a373]' : 'text-[#a6907d] hover:text-[#fefae0]'
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/products"
            className={({ isActive }) =>
              `text-sm font-medium transition-colors ${
                isActive ? 'text-[#d4a373]' : 'text-[#a6907d] hover:text-[#fefae0]'
              }`
            }
          >
            Coffee Catalog
          </NavLink>
          <div className="flex items-center gap-1.5 text-xs text-[#a6907d]/80">
            <Sparkles className="h-3.5 w-3.5 text-[#d4a373]" />
            <span>Ethically Sourced</span>
          </div>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          {onSearchClick !== undefined && (
            <button
              type="button"
              onClick={onSearchClick}
              aria-label="Search catalog"
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#3d332a] bg-[#1f1a16] text-[#a6907d] transition-colors hover:border-[#d4a373] hover:text-[#d4a373]"
            >
              <Search className="h-4 w-4" />
            </button>
          )}

          <Link
            to="/cart"
            aria-label={`View cart with ${totals.totalQuantity.toString()} items`}
            className="relative flex h-10 items-center gap-2 rounded-lg border border-[#3d332a] bg-[#1f1a16] px-3.5 text-[#fefae0] transition-colors hover:border-[#d4a373]"
          >
            <ShoppingBag className="h-4 w-4 text-[#d4a373]" />
            <span className="hidden text-xs font-semibold sm:inline">Order</span>
            {totals.totalQuantity > 0 && (
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#d4a373] px-1 text-[11px] font-extrabold text-[#120f0d]">
                {totals.totalQuantity}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}

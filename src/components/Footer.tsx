// Universal Footer component

import { Coffee, ShieldCheck, Truck, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';

export interface Props {
  tagline?: string;
}

export function Footer({
  tagline = 'Handcrafted in small batches from heirloom micro-lots.',
}: Props) {
  return (
    <footer className="mt-auto border-t border-[#3d332a] bg-[#0d0b09] text-[#a6907d]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#241c16] text-[#d4a373]">
                <Coffee className="h-4 w-4" />
              </div>
              <span className="font-serif text-lg font-bold tracking-wider text-[#d4a373]">
                BODREN
              </span>
            </div>
            <p className="text-xs leading-relaxed">{tagline}</p>
          </div>

          <div>
            <h4 className="text-xs font-bold tracking-widest text-[#fefae0] uppercase">Explore</h4>
            <ul className="mt-4 space-y-2 text-xs">
              <li>
                <Link to="/" className="hover:text-[#d4a373]">
                  Home Showcase
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-[#d4a373]">
                  Artisan Coffee Catalog
                </Link>
              </li>
              <li>
                <Link to="/cart" className="hover:text-[#d4a373]">
                  Review Active Cart
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold tracking-widest text-[#fefae0] uppercase">
              Coffee Promise
            </h4>
            <ul className="mt-4 space-y-2.5 text-xs">
              <li className="flex items-center gap-2">
                <Truck className="h-3.5 w-3.5 text-[#d4a373]" />
                <span>Complimentary shipping over $50</span>
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck className="h-3.5 w-3.5 text-[#d4a373]" />
                <span>Fair-trade farm gate pricing</span>
              </li>
              <li className="flex items-center gap-2">
                <RefreshCw className="h-3.5 w-3.5 text-[#d4a373]" />
                <span>Roasted within 48h of dispatch</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold tracking-widest text-[#fefae0] uppercase">
              Roastery Dispatch
            </h4>
            <p className="mt-4 text-xs leading-relaxed">
              Open Daily: 07:00 – 19:00
              <br />
              Artisan Quarter, Station Road
            </p>
          </div>
        </div>

        <div className="mt-12 border-t border-[#26201b] pt-6 text-center text-[11px] text-[#6b5c50]">
          © {new Date().getFullYear()} BODREN Artisan Coffee & Goods. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

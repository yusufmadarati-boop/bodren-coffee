// Home Showcase Route Page

import { Link } from 'react-router-dom';
import { Coffee, ArrowRight, ShieldCheck, Flame, Award, Compass } from 'lucide-react';

export function HomePage() {
  return (
    <div className="space-y-20 py-4">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl border border-[#3d332a] bg-gradient-to-b from-[#211a15] to-[#120f0d] px-6 py-20 text-center shadow-2xl sm:px-12 sm:py-28">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#d4a373]/40 bg-[#2b221a]/80 px-4 py-1.5 text-xs font-semibold tracking-wider text-[#d4a373] uppercase backdrop-blur-sm">
          <Flame className="h-3.5 w-3.5" />
          <span>Small Batch Artisan Roastery</span>
        </div>

        <h1 className="mx-auto mt-6 max-w-4xl font-serif text-4xl font-extrabold tracking-tight text-[#fefae0] sm:text-6xl sm:leading-tight">
          Where Heirloom Lots Meet Exacting Roast Mastery.
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-base text-[#a6907d] sm:text-lg">
          We source directly from generational washing stations in Ethiopia, Colombia, and Kenya.
          Every bean is roasted on cast-iron drums within 48 hours of dispatch.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/products"
            className="inline-flex items-center gap-2.5 rounded-xl bg-[#d4a373] px-7 py-3.5 text-sm font-bold text-[#120f0d] shadow-lg shadow-[#d4a373]/20 transition-all hover:scale-105 hover:bg-[#faedcd]"
          >
            <span>Explore Coffee Catalog</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to="/cart"
            className="inline-flex items-center gap-2 rounded-xl border border-[#3d332a] bg-[#1a1411] px-6 py-3.5 text-sm font-semibold text-[#fefae0] transition-colors hover:border-[#d4a373]"
          >
            <span>Review Cart</span>
          </Link>
        </div>
      </section>

      {/* Philosophy Pillars */}
      <section className="grid grid-cols-1 gap-8 md:grid-cols-3">
        <div className="rounded-2xl border border-[#3d332a] bg-[#171310] p-8">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#261e18] text-[#d4a373]">
            <Compass className="h-6 w-6" />
          </div>
          <h2 className="font-serif text-lg font-bold text-[#fefae0]">
            Single-Estate Traceability
          </h2>
          <p className="mt-2 text-xs leading-relaxed text-[#a6907d]">
            Every micro-lot carries exact harvest dates, altitude readings, and washing station
            details. No mystery blends.
          </p>
        </div>

        <div className="rounded-2xl border border-[#3d332a] bg-[#171310] p-8">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#261e18] text-[#d4a373]">
            <Award className="h-6 w-6" />
          </div>
          <h2 className="font-serif text-lg font-bold text-[#fefae0]">Direct Farm Gate Pricing</h2>
          <p className="mt-2 text-xs leading-relaxed text-[#a6907d]">
            We pay 180% above standard Fair Trade minimums directly to agronomy partners to ensure
            regenerative farming.
          </p>
        </div>

        <div className="rounded-2xl border border-[#3d332a] bg-[#171310] p-8">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#261e18] text-[#d4a373]">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <h2 className="font-serif text-lg font-bold text-[#fefae0]">Freshness Guarantee</h2>
          <p className="mt-2 text-xs leading-relaxed text-[#a6907d]">
            Valved degassing packaging seals aroma immediately. If a bag is roasted older than 7
            days upon delivery, we replace it.
          </p>
        </div>
      </section>

      {/* Roast Profile Guide Banner */}
      <section className="rounded-2xl border border-[#3d332a] bg-[#1f1a16] p-8 sm:p-12">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div>
            <span className="text-xs font-bold tracking-widest text-[#d4a373] uppercase">
              Curated Profiles
            </span>
            <h2 className="mt-2 font-serif text-2xl font-bold text-[#fefae0]">
              From Sparkling Citrus to Deep Baker&apos;s Chocolate
            </h2>
            <p className="mt-2 max-w-xl text-xs text-[#a6907d]">
              Whether brewing on a manual V60 cone, French press, or commercial espresso machine,
              find the optimal roast profile for your ritual.
            </p>
          </div>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 rounded-xl bg-[#d4a373] px-6 py-3 text-xs font-bold text-[#120f0d] transition-colors hover:bg-[#faedcd]"
          >
            <Coffee className="h-4 w-4" />
            <span>View All Profiles</span>
          </Link>
        </div>
      </section>
    </div>
  );
}

export default HomePage;

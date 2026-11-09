// Search & Multi-filter Toolbar Component

import { Search, SlidersHorizontal, RotateCcw } from 'lucide-react';
import type { RoastFilter, SortOption } from '../types';

export interface Props {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  categories: readonly string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  selectedRoast: RoastFilter;
  onSelectRoast: (roast: RoastFilter) => void;
  sortOption: SortOption;
  onSortChange: (sort: SortOption) => void;
  onResetFilters: () => void;
}

const ROAST_OPTIONS: RoastFilter[] = ['All', 'Light', 'Medium', 'Dark', 'Omni'];

export function ProductFilters({
  searchQuery,
  onSearchChange,
  categories,
  selectedCategory,
  onSelectCategory,
  selectedRoast,
  onSelectRoast,
  sortOption,
  onSortChange,
  onResetFilters,
}: Props) {
  const allCategories = ['All', ...categories];

  return (
    <div className="space-y-6 rounded-2xl border border-[#3d332a] bg-[#171310] p-6 shadow-xl">
      {/* Top Search & Sort Row */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        {/* Search Bar */}
        <div className="relative flex-1">
          <label htmlFor="catalog-search" className="sr-only">
            Search coffee by name, origin, or flavor notes
          </label>
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-[#a6907d]">
            <Search className="h-4 w-4" />
          </div>
          <input
            id="catalog-search"
            type="search"
            placeholder="Search by origin (Ethiopia, Kenya), note (Peach, Chocolate)…"
            value={searchQuery}
            onChange={(e) => {
              onSearchChange(e.target.value);
            }}
            className="w-full rounded-xl border border-[#3d332a] bg-[#1f1a16] py-3 pr-4 pl-11 text-sm text-[#fefae0] placeholder-[#6b5c50] transition-colors focus:border-[#d4a373] focus:outline-none"
          />
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-3">
          <label
            htmlFor="sort-dropdown"
            className="text-xs font-semibold tracking-wider text-[#a6907d] uppercase whitespace-nowrap"
          >
            Sort by
          </label>
          <select
            id="sort-dropdown"
            value={sortOption}
            onChange={(e) => {
              onSortChange(e.target.value as SortOption);
            }}
            className="rounded-xl border border-[#3d332a] bg-[#1f1a16] px-4 py-3 text-xs font-medium text-[#fefae0] focus:border-[#d4a373] focus:outline-none"
          >
            <option value="featured">Featured Roasts</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="name-asc">Alphabetical (A-Z)</option>
          </select>
        </div>
      </div>

      {/* Filter Tabs Row */}
      <div className="flex flex-col gap-6 border-t border-[#2b221a] pt-5 lg:flex-row lg:items-center lg:justify-between">
        {/* Category Filter */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-2 flex items-center gap-1.5 text-xs font-bold tracking-wider text-[#a6907d] uppercase">
            <SlidersHorizontal className="h-3.5 w-3.5 text-[#d4a373]" />
            Category:
          </span>
          {allCategories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => {
                onSelectCategory(cat);
              }}
              className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-[#d4a373] text-[#120f0d] shadow-md shadow-[#d4a373]/20'
                  : 'border border-[#3d332a] bg-[#1f1a16] text-[#a6907d] hover:border-[#d4a373]/50 hover:text-[#fefae0]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Roast Filter */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-2 text-xs font-bold tracking-wider text-[#a6907d] uppercase">
            Roast:
          </span>
          {ROAST_OPTIONS.map((roast) => (
            <button
              key={roast}
              type="button"
              onClick={() => {
                onSelectRoast(roast);
              }}
              className={`rounded-full px-3 py-1 text-xs font-medium transition-all ${
                selectedRoast === roast
                  ? 'border border-[#d4a373] bg-[#292019] text-[#d4a373]'
                  : 'border border-[#3d332a]/60 bg-[#171310] text-[#a6907d] hover:text-[#fefae0]'
              }`}
            >
              {roast}
            </button>
          ))}

          {/* Reset Action */}
          <button
            type="button"
            onClick={onResetFilters}
            aria-label="Reset all search and filter choices"
            className="ml-2 flex items-center gap-1 rounded-lg border border-[#3d332a] px-2.5 py-1 text-xs text-[#a6907d] transition-colors hover:border-[#d4a373] hover:text-[#d4a373]"
          >
            <RotateCcw className="h-3 w-3" />
            <span>Reset</span>
          </button>
        </div>
      </div>
    </div>
  );
}

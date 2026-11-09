// Product Catalog Route Page

import { useState, useEffect, useCallback, useMemo } from 'react';
import type { Product, RoastFilter, SortOption } from '../types';
import { getProducts } from '../api/products.api';
import { getCategories, applyProductFilters } from '../logic/products.logic';
import { ProductCard } from '../components/ProductCard';
import { ProductFilters } from '../components/ProductFilters';
import { SkeletonGrid } from '../components/SkeletonGrid';
import { AlertCircle, RefreshCw, Coffee } from 'lucide-react';

type AsyncState =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'success'; data: Product[] };

export function ProductsPage() {
  const [asyncState, setAsyncState] = useState<AsyncState>({ status: 'loading' });

  // Local filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedRoast, setSelectedRoast] = useState<RoastFilter>('All');
  const [sortOption, setSortOption] = useState<SortOption>('featured');

  const loadProducts = useCallback((forceFail = false) => {
    setAsyncState({ status: 'loading' });
    getProducts(forceFail)
      .then((data) => {
        setAsyncState({ status: 'success', data });
      })
      .catch((err: unknown) => {
        const message = err instanceof Error ? err.message : 'Failed to load product catalog.';
        setAsyncState({ status: 'error', message });
      });
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const allProducts = useMemo(() => {
    return asyncState.status === 'success' ? asyncState.data : [];
  }, [asyncState]);

  const categories = useMemo(() => {
    return getCategories(allProducts);
  }, [allProducts]);

  // Derived filtered results
  const visibleProducts = useMemo(() => {
    if (asyncState.status !== 'success') return [];
    return applyProductFilters(asyncState.data, {
      category: selectedCategory,
      roast: selectedRoast,
      query: searchQuery,
      sort: sortOption,
    });
  }, [asyncState, selectedCategory, selectedRoast, searchQuery, sortOption]);

  const handleResetFilters = useCallback(() => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedRoast('All');
    setSortOption('featured');
  }, []);

  return (
    <div className="space-y-8">
      {/* Header Title Banner */}
      <div>
        <span className="text-xs font-bold tracking-widest text-[#d4a373] uppercase">
          Artisan Selection
        </span>
        <h1 className="mt-1 font-serif text-3xl font-extrabold text-[#fefae0] sm:text-4xl">
          Single-Origin & Handcrafted Blends
        </h1>
        <p className="mt-2 text-xs text-[#a6907d]">
          Each coffee is cupped and scored for balance, clarity, and body.
        </p>
      </div>

      {/* Filter and Search Toolbar */}
      <ProductFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        selectedRoast={selectedRoast}
        onSelectRoast={setSelectedRoast}
        sortOption={sortOption}
        onSortChange={setSortOption}
        onResetFilters={handleResetFilters}
      />

      {/* Product Grid Area with States */}
      {asyncState.status === 'loading' && <SkeletonGrid count={8} />}

      {asyncState.status === 'error' && (
        <div className="flex min-h-[320px] flex-col items-center justify-center rounded-2xl border border-red-900/40 bg-[#171310] p-8 text-center">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-950/70 text-red-400">
            <AlertCircle className="h-6 w-6" />
          </div>
          <h2 className="text-lg font-bold text-[#fefae0]">Catalog Connection Disrupted</h2>
          <p className="mt-2 text-xs text-[#a6907d]">{asyncState.message}</p>
          <button
            type="button"
            onClick={() => {
              loadProducts();
            }}
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#d4a373] px-5 py-2.5 text-xs font-bold text-[#120f0d] transition-colors hover:bg-[#faedcd]"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            <span>Try Again</span>
          </button>
        </div>
      )}

      {asyncState.status === 'success' && visibleProducts.length === 0 && (
        <div className="flex min-h-[320px] flex-col items-center justify-center rounded-2xl border border-[#3d332a] bg-[#171310] p-8 text-center">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#241c16] text-[#d4a373]">
            <Coffee className="h-6 w-6" />
          </div>
          <h2 className="text-lg font-bold text-[#fefae0]">No Roasts Match Criteria</h2>
          <p className="mt-2 max-w-sm text-xs text-[#a6907d]">
            We could not find any coffees matching your current search query or filter combination.
          </p>
          <button
            type="button"
            onClick={handleResetFilters}
            className="mt-6 inline-flex items-center gap-2 rounded-lg border border-[#3d332a] bg-[#1f1a16] px-4 py-2 text-xs font-semibold text-[#fefae0] transition-colors hover:border-[#d4a373]"
          >
            Clear All Filters
          </button>
        </div>
      )}

      {asyncState.status === 'success' && visibleProducts.length > 0 && (
        <div>
          <div className="mb-4 text-xs font-medium text-[#a6907d]">
            Showing <strong className="text-[#fefae0]">{visibleProducts.length}</strong> coffees
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {visibleProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductsPage;

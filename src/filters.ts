/**
 * src/filters.ts
 * ═══════════════════════════════════════════════════════════════
 * FILTERS MODULE — BODREN Coffee Shop
 *
 * Pure search, filter, and sort logic.
 * IMMUTABILITY: Never mutates the source array. Always returns
 * a new array. "default" sort accurately restores product id order.
 * ═══════════════════════════════════════════════════════════════
 */

import { Product, SortOption } from './types.js';

export type SearchExtractor = (product: Product) => readonly string[];

export function filterBySearch(
  source: readonly Product[],
  query: string,
  extractor?: SearchExtractor
): Product[] {
  const normalized = query.trim().toLowerCase();
  if (normalized.length === 0) {
    return [...source];
  }

  return source.filter((product) => {
    if (product.name.toLowerCase().includes(normalized)) {
      return true;
    }

    if (extractor) {
      const candidates = extractor(product);
      for (let i = 0; i < candidates.length; i += 1) {
        const candidate = candidates[i];
        if (candidate && candidate.toLowerCase().includes(normalized)) {
          return true;
        }
      }
    }

    return false;
  });
}

export function filterByCategory(source: readonly Product[], category: string): Product[] {
  if (category.length === 0 || category === 'All') {
    return [...source];
  }
  return source.filter((product) => product.category === category);
}

export function sortProducts(source: readonly Product[], sortKey: SortOption): Product[] {
  const copy = [...source];

  if (sortKey === 'price-asc') {
    return copy.sort((a, b) => a.price - b.price);
  }

  if (sortKey === 'price-desc') {
    return copy.sort((a, b) => b.price - a.price);
  }

  // "default" sort restores the initial insertion order by product id
  return copy.sort((a, b) => a.id - b.id);
}

export interface ApplyFilterOptions {
  readonly query: string;
  readonly category: string;
  readonly sortKey: SortOption;
  readonly extractor?: SearchExtractor;
}

export function applyFilters(source: readonly Product[], options: ApplyFilterOptions): Product[] {
  const searched = filterBySearch(source, options.query, options.extractor);
  const categorized = filterByCategory(searched, options.category);
  return sortProducts(categorized, options.sortKey);
}

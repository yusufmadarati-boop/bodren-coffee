// Pure product filtering, searching, and sorting logic

import type { Product, RoastFilter, SortOption } from '../types';

/** Get unique categories from list */
export function getCategories(products: readonly Product[]): string[] {
  const seen = new Set<string>();
  for (const p of products) {
    seen.add(p.category);
  }
  return Array.from(seen).sort();
}

/** Filter products by category */
export function filterByCategory(products: readonly Product[], category: string): Product[] {
  if (category === 'All' || category.trim().length === 0) {
    return [...products];
  }
  return products.filter((p) => p.category === category);
}

/** Filter products by roast level */
export function filterByRoast(products: readonly Product[], roast: RoastFilter): Product[] {
  if (roast === 'All') {
    return [...products];
  }
  return products.filter((p) => p.roastLevel === roast);
}

/** Filter products by search query across title, origin, and tasting notes */
export function filterBySearch(products: readonly Product[], query: string): Product[] {
  const q = query.trim().toLowerCase();
  if (q.length === 0) {
    return [...products];
  }
  return products.filter((p) => {
    if (p.title.toLowerCase().includes(q)) return true;
    if (p.origin.toLowerCase().includes(q)) return true;
    return p.tastingNotes.some((note) => note.toLowerCase().includes(q));
  });
}

/** Sort products without mutating source */
export function sortProducts(products: readonly Product[], sort: SortOption): Product[] {
  const copy = [...products];
  switch (sort) {
    case 'price-asc':
      return copy.sort((a, b) => a.priceCents - b.priceCents);
    case 'price-desc':
      return copy.sort((a, b) => b.priceCents - a.priceCents);
    case 'name-asc':
      return copy.sort((a, b) => a.title.localeCompare(b.title));
    default:
      return copy;
  }
}

export interface FilterOptions {
  category: string;
  roast: RoastFilter;
  query: string;
  sort: SortOption;
}

/** Single-pass pure filtering pipeline */
export function applyProductFilters(
  products: readonly Product[],
  options: FilterOptions
): Product[] {
  const byCategory = filterByCategory(products, options.category);
  const byRoast = filterByRoast(byCategory, options.roast);
  const bySearch = filterBySearch(byRoast, options.query);
  return sortProducts(bySearch, options.sort);
}

/**
 * src/types.ts
 * ═══════════════════════════════════════════════════════════════
 * Core domain types for the BODREN e-commerce application.
 * Handcrafted types with zero 'any'.
 * ═══════════════════════════════════════════════════════════════
 */

export type ProductCategory = 'Espresso' | 'Latte' | 'Specialty' | 'Cold';

export interface Product {
  readonly id: number;
  readonly name: string;
  readonly category: string;
  readonly price: number;
  readonly emoji: string;
  readonly desc: string;
  readonly badge: string;
}

export interface CartItem {
  readonly id: number;
  readonly name: string;
  readonly price: number;
  readonly emoji: string;
  qty: number;
}

export interface Cart {
  readonly items: readonly CartItem[];
  readonly totalItems: number;
  readonly totalPrice: number;
}

export type SortOption = 'default' | 'price-asc' | 'price-desc';

export interface FilterState {
  query: string;
  category: string;
  sortKey: SortOption;
}

export type LanguageCode = 'en' | 'ar' | 'tr';

export interface QuizOption {
  readonly textKey: string;
  readonly result: string;
}

export interface QuizQuestion {
  readonly questionKey: string;
  readonly options: readonly QuizOption[];
}

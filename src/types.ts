// Core domain types for BODREN Artisan Coffee & Goods

/** Raw product shape returned by API */
export interface ApiProduct {
  id: number;
  title: string;
  category_name: string;
  price_cents: number;
  in_stock: boolean;
}

/** Product domain entity with artisanal attributes */
export interface Product {
  id: number;
  title: string;
  category: string;
  priceCents: number;
  inStock: boolean;
  emoji: string;
  roastLevel: 'Light' | 'Medium' | 'Dark' | 'Omni';
  origin: string;
  tastingNotes: readonly string[];
  description: string;
}

/** Cart item stored in state */
export interface CartItem {
  product: Product;
  quantity: number;
  grindOption?: 'Whole Bean' | 'Coarse (French Press)' | 'Medium (Drip / V60)' | 'Fine (Espresso)';
}

/** Pre-calculated totals derived dynamically */
export interface CartTotals {
  totalQuantity: number;
  subtotalCents: number;
  estimatedTaxCents: number;
  shippingCents: number;
  grandTotalCents: number;
}

/** Category filter option */
export type Category = string;

/** Roast filter option */
export type RoastFilter = 'All' | 'Light' | 'Medium' | 'Dark' | 'Omni';

/** Sort options for the product catalog */
export type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'name-asc';

/** Grinding choice for coffee products */
export type GrindOption =
  'Whole Bean' | 'Coarse (French Press)' | 'Medium (Drip / V60)' | 'Fine (Espresso)';

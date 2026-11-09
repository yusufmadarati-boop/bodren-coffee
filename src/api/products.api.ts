// Products API – fetches and normalizes product items

import type { ApiProduct, Product } from '../types';
import { fetchJson } from './client';

interface ProductsResponse {
  items: ApiProduct[];
  total: number;
}

const EMOJI_MAP: Record<string, string> = {
  Bags: '👜',
  Shoes: '👟',
  Accessories: '🕶️',
  Coffee: '☕',
  Espresso: '☕',
  Latte: '🥛',
  Specialty: '🍫',
  Cold: '🧊',
};

/** Normalize API product to domain Product */
function normalize(raw: ApiProduct): Product {
  const emoji = EMOJI_MAP[raw.category_name] ?? '☕';
  return {
    id: raw.id,
    title: raw.title,
    category: raw.category_name,
    priceCents: raw.price_cents,
    inStock: raw.in_stock,
    emoji,
  };
}

/**
 * Fetch all products from the API.
 * Pass forceFail=true to hit the debug 500 endpoint.
 */
export async function getProducts(forceFail = false): Promise<Product[]> {
  const path = forceFail ? '/fail/500/api/products' : '/api/products';
  const data = await fetchJson<ProductsResponse>(path);
  return data.items.map(normalize);
}

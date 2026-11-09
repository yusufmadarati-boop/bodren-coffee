// Products API with rich artisanal data enrichment

import type { ApiProduct, Product } from '../types';
import { fetchJson } from './client';

interface ProductsResponse {
  items: ApiProduct[];
  total: number;
}

interface ProductDetailsSeed {
  emoji: string;
  roastLevel: 'Light' | 'Medium' | 'Dark' | 'Omni';
  origin: string;
  tastingNotes: readonly string[];
  description: string;
}

const SEED_METADATA: Record<number, ProductDetailsSeed> = {
  1: {
    emoji: '☕',
    roastLevel: 'Medium',
    origin: 'Yirgacheffe, Ethiopia',
    tastingNotes: ['Jasmine', 'Bergamot', 'Peach'],
    description:
      'Heirloom Ethiopian coffee cultivated at 2,000 meters. Floral aroma with bright stone fruit notes and a silky tea-like finish.',
  },
  2: {
    emoji: '🥛',
    roastLevel: 'Medium',
    origin: 'Antioquia, Colombia',
    tastingNotes: ['Milk Chocolate', 'Caramel', 'Red Apple'],
    description:
      'A velvety Colombian roast balanced perfectly for flat whites and lattes. Delivers deep sweetness and low astringency.',
  },
  3: {
    emoji: '🍫',
    roastLevel: 'Dark',
    origin: 'Minas Gerais, Brazil',
    tastingNotes: ['Dark Cocoa', 'Toasted Hazelnut', 'Brown Sugar'],
    description:
      "Sun-dried natural processed Brazilian beans. Dense, creamy mouthfeel with decadent baker's chocolate and roasted nut tones.",
  },
  4: {
    emoji: '🖤',
    roastLevel: 'Dark',
    origin: 'Huehuetenango, Guatemala',
    tastingNotes: ['Molasses', 'Cedar', 'Blackberry'],
    description:
      'High-altitude volcanic soil coffee. Bold and punchy with rich smoke-tinged berry notes, ideal for long Americano pours.',
  },
  5: {
    emoji: '☕',
    roastLevel: 'Light',
    origin: 'Tarrazu, Costa Rica',
    tastingNotes: ['Honey', 'Golden Raisin', 'Citrus'],
    description:
      'Honey-processed micro-lot offering vibrant acidity and intense caramelised honey mouthfeel. Exceptionally clean cup.',
  },
  6: {
    emoji: '🧊',
    roastLevel: 'Omni',
    origin: 'Sidama & Sumatra Blend',
    tastingNotes: ['Dark Cherry', 'Cacao Nibs', 'Vanilla'],
    description:
      'Crafted specifically for extended 18-hour cold steeping. Remarkably smooth, syrupy body with zero bitter sharpness.',
  },
  7: {
    emoji: '🍵',
    roastLevel: 'Omni',
    origin: 'Uji, Kyoto, Japan',
    tastingNotes: ['Umami', 'Sweet Grass', 'Cream'],
    description:
      'Ceremonial first-harvest shade-grown green tea ground on stone mills. Whisk into hot water or froth with oat milk.',
  },
  8: {
    emoji: '⚫',
    roastLevel: 'Dark',
    origin: 'Sidamo, Ethiopia & Cerrado, Brazil',
    tastingNotes: ['Almond', 'Dark Chocolate', 'Orange Zest'],
    description:
      'Our signature BODREN House Espresso blend. Yields thick, golden tiger-striped crema with balanced citrus snap.',
  },
  9: {
    emoji: '🍮',
    roastLevel: 'Medium',
    origin: 'Chiapas, Mexico',
    tastingNotes: ['Vanilla Bean', 'Panela', 'Cinnamon'],
    description:
      'Certified shade-grown organic beans with sweet bakery spice, roasted to caramelise natural sugars without burnt notes.',
  },
  10: {
    emoji: '🧋',
    roastLevel: 'Omni',
    origin: 'Central Highlands, Kenya',
    tastingNotes: ['Blackcurrant', 'Grapefruit', 'Cane Sugar'],
    description:
      'Complex and winey Kenyan AA selection. Retains its distinct sparkling fruit character even when poured over pure mountain ice.',
  },
  11: {
    emoji: '☕',
    roastLevel: 'Medium',
    origin: 'Guji Zone, Ethiopia',
    tastingNotes: ['Blueberry', 'Lavender', 'Maple'],
    description:
      'Naturally dried on raised African beds. Packed with intense wild berry aromas and a sweet molasses backdrop.',
  },
  12: {
    emoji: '🫖',
    roastLevel: 'Omni',
    origin: 'Assam, India & Sri Lanka',
    tastingNotes: ['Cardamom', 'Ginger', 'Star Anise'],
    description:
      'Whole orthodox black tea infused with cracked Sri Lankan spices. Bold, warming, and comforting.',
  },
};

const DEFAULT_SEED: ProductDetailsSeed = {
  emoji: '☕',
  roastLevel: 'Medium',
  origin: 'Single Origin Highland Lot',
  tastingNotes: ['Cacao', 'Sweet Citrus', 'Toffee'],
  description:
    'Specialty-grade sustainably sourced beans roasted to order in small batches by BODREN Master Roasters.',
};

/** Normalize API item into rich Product entity */
function normalize(raw: ApiProduct): Product {
  const seed = SEED_METADATA[raw.id] ?? DEFAULT_SEED;
  return {
    id: raw.id,
    title: raw.title,
    category: raw.category_name,
    priceCents: raw.price_cents,
    inStock: raw.in_stock,
    emoji: seed.emoji,
    roastLevel: seed.roastLevel,
    origin: seed.origin,
    tastingNotes: seed.tastingNotes,
    description: seed.description,
  };
}

/**
 * Fetch all products from API.
 */
export async function getProducts(forceFail = false): Promise<Product[]> {
  const path = forceFail ? '/fail/500/api/products' : '/api/products';
  const data = await fetchJson<ProductsResponse>(path);
  return data.items.map(normalize);
}

/**
 * Fetch a single product by ID.
 */
export async function getProductById(id: number): Promise<Product | null> {
  const all = await getProducts();
  const match = all.find((p) => p.id === id);
  return match ?? null;
}

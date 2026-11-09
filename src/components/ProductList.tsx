// ProductList component: grid view with loading, error, empty, and no-match states

import type { Product } from '../types';
import { ProductCard } from './ProductCard';

type AsyncState =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'success'; data: Product[] };

interface Props {
  state: AsyncState;
  searchQuery: string;
  onAddToCart: (product: Product) => void;
  onRetry: () => void;
}

export function ProductList({ state, searchQuery, onAddToCart, onRetry }: Props) {
  if (state.status === 'loading') {
    return (
      <div className="product-list__status" aria-live="polite">
        <div className="spinner" aria-label="Loading products" role="status" />
        <p className="product-list__status-text">Loading fresh coffee & goods…</p>
      </div>
    );
  }

  if (state.status === 'error') {
    return (
      <div className="product-list__status" aria-live="polite" role="alert">
        <p className="product-list__error-title">Something went wrong</p>
        <p className="product-list__error-message">{state.message}</p>
        <button className="btn btn--accent" onClick={onRetry}>
          Try again
        </button>
      </div>
    );
  }

  if (state.data.length === 0) {
    const isSearch = searchQuery.trim().length > 0;
    return (
      <div className="product-list__status" aria-live="polite">
        <p className="product-list__empty-title">
          {isSearch ? 'No coffee matches your search' : 'No items available'}
        </p>
        {isSearch && (
          <p className="product-list__empty-message">
            Try a different search term or reset your category filter.
          </p>
        )}
      </div>
    );
  }

  return (
    <ul className="product-list__grid" aria-label="Product grid">
      {state.data.map((product) => (
        <li key={product.id}>
          <ProductCard product={product} onAddToCart={onAddToCart} />
        </li>
      ))}
    </ul>
  );
}

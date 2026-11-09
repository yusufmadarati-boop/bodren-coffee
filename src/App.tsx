// App root component and state coordinator for BODREN

import { useState, useEffect, useCallback } from 'react';

import type { Cart, SortOption, Product } from './types';
import { getProducts } from './api/products.api';
import { applyFilters, getCategories } from './logic/products.logic';
import {
  addToCart,
  setQuantity,
  removeFromCart,
  clearCart,
  getCartSummary,
} from './logic/cart.logic';
import { loadCart, saveCart } from './state/cart.state';

import { Header } from './components/Header';
import { CategoryFilter } from './components/CategoryFilter';
import { SortSelect } from './components/SortSelect';
import { ProductList } from './components/ProductList';
import { CartDrawer } from './components/CartDrawer';

type AsyncState =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'success'; data: Product[] };

export function App() {
  const [productsState, setProductsState] = useState<AsyncState>({
    status: 'loading',
  });

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortBy, setSortBy] = useState<SortOption>('featured');

  const [cart, setCart] = useState<Cart>(loadCart);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  useEffect(() => {
    saveCart(cart);
  }, [cart]);

  const fetchProducts = useCallback(() => {
    setProductsState({ status: 'loading' });
    getProducts()
      .then((data) => {
        setProductsState({ status: 'success', data });
      })
      .catch((err: unknown) => {
        const message = err instanceof Error ? err.message : 'An unknown error occurred.';
        setProductsState({ status: 'error', message });
      });
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const allProducts = productsState.status === 'success' ? productsState.data : [];

  const categories = getCategories(allProducts);

  const visibleProducts =
    productsState.status === 'success'
      ? applyFilters(productsState.data, selectedCategory, searchQuery, sortBy)
      : [];

  const listState: Parameters<typeof ProductList>[0]['state'] =
    productsState.status === 'success'
      ? { status: 'success', data: visibleProducts }
      : productsState;

  const cartSummary = getCartSummary(cart);

  const handleAddToCart = useCallback((product: Product) => {
    setCart((prev) => addToCart(prev, product));
  }, []);

  const handleIncrease = useCallback((productId: number) => {
    setCart((prev) => {
      const item = prev[productId];
      if (item === undefined) return prev;
      return setQuantity(prev, productId, item.quantity + 1);
    });
  }, []);

  const handleDecrease = useCallback((productId: number) => {
    setCart((prev) => {
      const item = prev[productId];
      if (item === undefined) return prev;
      return setQuantity(prev, productId, item.quantity - 1);
    });
  }, []);

  const handleRemove = useCallback((productId: number) => {
    setCart((prev) => removeFromCart(prev, productId));
  }, []);

  const handleClear = useCallback(() => {
    setCart(clearCart());
  }, []);

  const handleOpenCart = useCallback(() => {
    setIsCartOpen(true);
  }, []);

  const handleCloseCart = useCallback(() => {
    setIsCartOpen(false);
  }, []);

  return (
    <div className="app">
      <Header
        cartSummary={cartSummary}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onCartOpen={handleOpenCart}
      />

      <main className="main">
        <section className="hero-banner">
          <h1 className="hero-title">BODREN Artisan Coffee & Goods</h1>
          <p className="hero-subtitle">
            Freshly roasted beans, cold brews, and curated accessories delivered right to you.
          </p>
        </section>

        <div className="toolbar">
          <CategoryFilter
            categories={categories}
            selected={selectedCategory}
            onSelect={setSelectedCategory}
          />
          <SortSelect value={sortBy} onChange={setSortBy} />
        </div>

        <ProductList
          state={listState}
          searchQuery={searchQuery}
          onAddToCart={handleAddToCart}
          onRetry={fetchProducts}
        />
      </main>

      <CartDrawer
        isOpen={isCartOpen}
        cart={cart}
        summary={cartSummary}
        onClose={handleCloseCart}
        onIncrease={handleIncrease}
        onDecrease={handleDecrease}
        onRemove={handleRemove}
        onClear={handleClear}
      />
    </div>
  );
}

export default App;

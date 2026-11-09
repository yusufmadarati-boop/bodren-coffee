# BODREN Artisan Coffee & Goods

A production-grade, multi-page ShopBoard web application built with **React 19**, **TypeScript (Strict Mode)**, **Vite**, **Tailwind CSS**, and **Zustand**. Designed for artisanal micro-lot single-origin beans, handcrafted espresso blends, and curated coffee goods.

---

## ☕ Key Architectural Highlights

1. **Lazy-Loaded Multi-Page Routing**: Powered by `react-router-dom` with `React.lazy()` and `<Suspense>` route splitting to ensure minimal initial bundle size.
2. **Global State Store (Zustand)**: Single source of truth in `src/store/useCartStore.ts` with `localStorage` persistence under `bodren_cart_store_v2`.
3. **Pure Derived Values**: Subtotal, estimated tax (8%), shipping thresholds, and grand totals are calculated dynamically via pure functions in `src/logic/cart.logic.ts`. No computed duplicates stored in global state.
4. **Validated Checkout Flow**: Built using `react-hook-form` and a centralized `zod` schema (`src/lib/checkoutSchema.ts`), providing instant feedback, address parsing, and card authorization simulation.
5. **Resilient Error Boundaries**: Route-level class `ErrorBoundary` that catches runtime render errors and provides interactive "Try Again" recovery.
6. **Strict Engineering Standards**:
   - Zero `any`, zero `as` typecasting, and zero `!` non-null assertions.
   - Lists keyed with real domain identifiers (`item.id`), never array indices.
   - 100% English code, docs, and git commit history.

---

## 🛠️ Tech Stack & Dependencies

- **Framework**: React 19 + Vite 6
- **Language**: TypeScript 5.7 (`"strict": true`, zero exceptions)
- **Styling**: Tailwind CSS + `@tailwindcss/vite`
- **Icons**: Lucide React
- **State**: Zustand with `persist` middleware
- **Forms & Validation**: React Hook Form + `@hookform/resolvers` + Zod
- **Routing**: React Router DOM
- **Code Quality**: ESLint 9 (Flat config with `typescript-eslint` strict type-checked), Prettier 3, Husky 9 + lint-staged

---

## 📜 Development Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Launch local development server with HMR |
| `npm run build` | Perform TypeScript typecheck and compile Vite production bundle |
| `npm run typecheck` | Run `tsc --noEmit` across all project files |
| `npm run lint` | Run ESLint with zero allowed warnings or errors |
| `npm run format` | Enforce Prettier formatting |

---

## 🗺️ Route Architecture

| Path | Component | Access Mode | Description |
|---|---|---|---|
| `/` | `HomePage` | Lazy / Suspense | Hero showcase, artisan philosophy, quick catalog links |
| `/products` | `ProductsPage` | Lazy / Suspense | Full catalog, live multi-attribute search, roast/category filter, sort selector |
| `/products/:id` | `ProductDetailPage` | Lazy / Suspense | Single origin specs, altitude, tasting notes, grind selector, add-to-cart |
| `/cart` | `CartPage` | Lazy / Suspense | Order review, line-item adjustments, shipping threshold indicator |
| `/checkout` | `CheckoutPage` | Lazy / Suspense | Validated shipping & simulated payment form |
| `*` (`/404`) | `NotFoundPage` | Lazy / Suspense | Custom 404 fallback with return navigation |

---

## 🌳 Component Hierarchy & State Ownership

```
<App />
└── <RouterProvider router={router} />
    └── <RootLayout />                                [Global Layout Container]
        ├── <Navbar />                                [Consumes: Cart items from useCartStore; computes totals]
        ├── <ErrorBoundary />                         [Catches runtime exceptions in child routes]
        │   └── <Suspense fallback={<Fallback />} />
        │       ├── <HomePage />                      [Owns: Presentational state]
        │       │
        │       ├── <ProductsPage />                  [Owns: asyncState, searchQuery, selectedCategory, selectedRoast, sortOption]
        │       │   ├── <ProductFilters />            [Props: filter selections, callback handlers]
        │       │   ├── <SkeletonGrid />              [Props: count]
        │       │   └── <ProductCard /> (repeated)    [Props: product; dispatches: addItem to useCartStore]
        │       │
        │       ├── <ProductDetailPage />             [Owns: product, quantity, selectedGrind, addedNotice]
        │       │
        │       ├── <CartPage />                      [Consumes: items from useCartStore; computes totals]
        │       │   └── <CartItemDetailRow />         [Props: item; dispatches: updateQuantity, removeItem]
        │       │
        │       ├── <CheckoutPage />                  [Owns: useForm(checkoutSchema), isSubmitting, orderComplete, confirmedOrderId]
        │       │
        │       └── <NotFoundPage />                  [Owns: Presentational state]
        │
        └── <Footer />                                [Props: tagline]
```

### State Ownership Matrix

| State Identifier | Owner Location | Type | Lifecycle & Persistence |
|---|---|---|---|
| `items` | `src/store/useCartStore.ts` | `CartItem[]` | Global; persisted to `localStorage` (`bodren_cart_store_v2`) |
| `totals` | `src/logic/cart.logic.ts` | `CartTotals` | Dynamic derived calculation during component render |
| `asyncState` | `src/pages/ProductsPage.tsx` | `AsyncState` | Local component state for API fetch |
| `filterState` | `src/pages/ProductsPage.tsx` | Strings / Enums | Local component state for interactive toolbar |
| `checkoutForm` | `src/pages/CheckoutPage.tsx` | `CheckoutFormData` | Managed by `react-hook-form` via Zod resolver |

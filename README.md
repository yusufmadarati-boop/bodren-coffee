# BODREN — Artisan Coffee & Goods

A React + TypeScript e-commerce application that connects to the ShopBoard API. Browse specialty coffee, filter by category, sort by price or name, search by keyword, and manage an order with persistent cart storage across page refreshes.

## Features

- ☕ **Artisan Coffee & Goods Catalog**: Fetched dynamically from live API (`https://shopboard-api.vercel.app/api/products`).
- 🔍 **Live Search & Category Filtering**: Instant filtering across titles and categories.
- 🔀 **Sort Options**: Featured, price low-to-high, price high-to-low, and alphabetical name sort.
- 🛍️ **Persistent Cart Drawer**: Seamless slide-in drawer with stepper controls and full `localStorage` persistence under `shopboard_cart_v1` and `bodren_cart_v1`.
- ⚡ **Robust UI States**: Complete handling for loading spinner, error state with interactive "Try again" retry, empty state, and no-match search feedback.
- 💎 **Strict Quality**: 100% strict TypeScript, zero `any`, zero `as`, zero `!` non-null assertions, zero ESLint warnings.

## Tech Stack

- **React 19**
- **TypeScript 5.7** (strict mode enabled)
- **Vite 6**
- **ESLint 9** + **typescript-eslint** (strict type-checked)
- **Prettier 3**
- **Husky** + **lint-staged**

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Type-check and production build |
| `npm run typecheck` | Run `tsc --noEmit` |
| `npm run lint` | Run ESLint across `src/` |
| `npm run format` | Format codebase with Prettier |

## Component Tree

```
App                         (owns: productsState, searchQuery, selectedCategory, sortBy, cart, isCartOpen)
├── Header                  (props: cartSummary, searchQuery, onSearchChange, onCartOpen)
├── main
│   ├── hero-banner
│   ├── toolbar
│   │   ├── CategoryFilter  (props: categories, selected, onSelect)
│   │   └── SortSelect      (props: value, onChange)
│   └── ProductList         (props: state, searchQuery, onAddToCart, onRetry)
│       └── ProductCard[]   (props: product, onAddToCart)
└── CartDrawer              (props: isOpen, cart, summary, onClose, onIncrease, onDecrease, onRemove, onClear)
    └── CartItemRow[]       (props: item, onIncrease, onDecrease, onRemove)
```

### State Ownership

| State | Owner | Description |
|---|---|---|
| `productsState` | `App` | Async state: loading, error with message, or success with Product array |
| `searchQuery` | `App` | Active user search query string |
| `selectedCategory` | `App` | Active category filter string ('All' or specific category) |
| `sortBy` | `App` | Current sort order selection ('featured', 'price-asc', 'price-desc', 'name-asc') |
| `cart` | `App` | Shopping cart map indexed by productId, synchronized to localStorage |
| `isCartOpen` | `App` | Boolean toggle for slide-out cart drawer overlay |

## Folder Structure

```
src/
├── api/
│   ├── client.ts           # Fetch client with ApiError handling
│   └── products.api.ts     # getProducts() with normalization
├── components/
│   ├── CartDrawer.tsx      # Slide-out cart drawer with total and checkout
│   ├── CartItemRow.tsx     # Cart row with stepper and remove actions
│   ├── CategoryFilter.tsx  # Pill filters for categories
│   ├── Header.tsx          # Brand header with search and cart indicator
│   ├── ProductCard.tsx     # Reusable product card with stock status
│   ├── ProductList.tsx     # Grid container handling all async states
│   └── SortSelect.tsx      # Accessible sort dropdown
├── logic/
│   ├── cart.logic.ts       # Pure immutable cart operations and totals
│   └── products.logic.ts   # Pure filtering, searching, and sorting functions
├── state/
│   └── cart.state.ts       # LocalStorage persistence layer
├── App.tsx                 # Root React component and state owner
├── main.tsx                # StrictMode root mounting
├── style.css               # Luxury warm artisan coffee styling & design tokens
└── types.ts                # Strict domain interfaces and types
```

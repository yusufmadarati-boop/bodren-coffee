# CLAUDE.md – Operational Engineering Standards for BODREN

This file defines the strict architectural and coding rules governing development on the **BODREN Artisan Coffee & Goods** repository.

---

## 🏛️ Architecture & Folder Conventions

```
src/
├── api/          # HTTP requests and API adapters only (no React hooks)
├── components/   # Reusable presentational components (one component per file, explicit Props)
├── lib/          # Utilities, schemas, and helper functions (e.g. checkoutSchema, utils)
├── logic/        # Pure business calculations (filters, sorting, cart math)
├── pages/        # Lazy-loaded route page containers
├── routes/       # Router configuration
├── store/        # Zustand global store definitions
├── types.ts      # Shared domain contracts and TypeScript types
└── style.css     # Global CSS and Tailwind root directives
```

---

## 🚫 Critical Anti-Patterns & Mandates

### 1. Never Store Derived Values in Global Stores
Storing computed totals (e.g., `totalPrice`, `taxAmount`, `itemCount`) in state causes out-of-sync bugs, redundant renders, and stale data.
- **Rule**: Zustand stores must only hold primitive array items (`items: CartItem[]`).
- **Implementation**: Derived values MUST be computed on the fly using pure functions (e.g., `calculateCartTotals(items)`).

### 2. Always Wrap Lazy Routes in `<Suspense>` and `<ErrorBoundary>`
Lazy imports can fail due to network drops or chunk load timeouts.
- **Rule**: Every lazy route must be enclosed within a responsive `<Suspense>` fallback and caught by an `<ErrorBoundary>` providing an actionable recovery button.

### 3. Never Use Array Indices as React List Keys
Using `key={index}` breaks React's reconciliation engine when sorting, filtering, or removing items from arrays.
- **Rule**: Always use unique, stable identifiers from data (e.g., `key={product.id}` or `key={item.product.id + item.grindOption}`).

### 4. Zero Tolerance for `any`, `as`, and `!`
Type-casting with `as` or forcing non-nullity with `!` defeats TypeScript's safety guarantees and conceals runtime errors.
- **Rule**: Model optionality with unions (`CartItem | undefined`) and narrow with explicit type guards (`if (item !== undefined)`).

### 5. Event Handlers Returning Void Must Use Block Syntax
In strict ESLint configs with `@typescript-eslint/no-confusing-void-expression`, shorthand arrow returns like `onClick={() => handleClick()}` trigger lint errors.
- **Rule**: Wrap void calls in curly braces: `onClick={() => { handleClick(); }}`.

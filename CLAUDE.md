# CLAUDE.md – Guidelines for BODREN React + TypeScript

## Stack & Architecture

- **Framework**: React 19 with Function Components and Hooks
- **Language**: TypeScript 5.7+ with strict type checking enabled
- **Build System**: Vite 6
- **Linters & Formatters**: ESLint 9 (flat config with typescript-eslint strict), Prettier 3
- **Git Hooks**: Husky 9 + lint-staged (runs `eslint --fix`, `prettier --write`, and `tsc --noEmit`)

## Project Structure

```
src/
├── api/          # API communication only (HTTP client and endpoints)
├── components/   # Reusable UI components (strictly one component per file with typed Props)
├── logic/        # Pure business logic (filtering, sorting, immutable calculations)
├── state/        # Side effects and storage persistence (localStorage)
├── types.ts      # Shared TypeScript contracts and interfaces
├── style.css     # Artisan coffee design system tokens and styling
├── App.tsx       # Root coordinator and state owner
└── main.tsx      # Application entry point
```

## Strict Engineering Rules

### Rule 1: Never use array index as React key
Using array indices (`key={index}`) causes rendering bugs, corrupted DOM state, and broken animations when lists are filtered or sorted. Always use unique identifiers from domain data (`key={product.id}`).

### Rule 2: Zero `any`, zero `as`, zero non-null assertions `!`
Do not use `as` type assertions or `!` non-null assertions to bypass TypeScript checks. If a value can be undefined, narrow it using explicit type guards (`if (item !== undefined)`) or fallback default logic.

### Rule 3: Compute derived state directly during render
Never store values that can be derived (such as filtered product lists or cart totals) in `useState` accompanied by `useEffect` synchronizers. Compute derived values directly in the component render phase to eliminate out-of-sync states and double renders.

### Rule 4: Explicit Accessible Labels on all form controls
Every `<input>` and `<select>` element must be accessible with either a paired `<label htmlFor="...">` or an explicit `aria-label`.

### Rule 5: Event handlers returning void must use block statements
In TypeScript with strict linting rules, shorthand arrow functions returning void expressions trigger `@typescript-eslint/no-confusing-void-expression`. Always wrap calls in block braces: `onClick={() => { handleClick(); }}`.

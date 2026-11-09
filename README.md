# BODREN — Artisan Coffee & Specialty Drinks

A modern, high-performance specialty coffee e-commerce web application crafted with **Vite**, **TypeScript (Strict Mode)**, **Semantic HTML5**, and **CSS3 Design Tokens**.

---

## Features

- **Strict Vanilla TypeScript Architecture**: Fully modular architecture with zero `any`, zero `as`, and zero `!` assertions.
- **Dynamic Product Catalog**: 12 specialty drinks rendered dynamically from pure data modules.
- **Combined Search & Filtering**:
  - Live substring search supporting English, Arabic, and Turkish drink names.
  - Category pill filter (Espresso, Latte, Specialty, Cold).
  - Price sorting (Ascending, Descending, and original order restoration).
  - All filter criteria work simultaneously and immutably.
- **Cart & Persistence**:
  - Incremental quantity management with no duplicate rows.
  - Automatic removal when quantity reaches 0.
  - LocalStorage persistence under key `shopboard_cart_v1` (with fallback sync).
  - Slide-in responsive cart drawer with subtotal calculations.
- **Multilingual Support (i18n)**:
  - English (`en`), Arabic (`ar`), and Turkish (`tr`).
  - Native RTL layout switching (`dir="rtl"`) with the `Cairo` Arabic typeface.
  - Persistent language preference saved in `localStorage`.
- **Interactive Coffee Finder Quiz**:
  - 3-step recommendation widget matching customer preferences to the ideal roast.
- **Zero-Compromise Code Quality**:
  - ESLint 9 + typescript-eslint configured and passing.
  - Prettier code formatting checked in pre-commit hooks via Husky and lint-staged.
  - TypeScript `tsc --noEmit` validation passing with `strict: true`.

---

## Tech Stack

- **Bundler**: [Vite 5](https://vitejs.dev/)
- **Language**: TypeScript 5+ (Strict mode: `noImplicitAny`, `strictNullChecks`, `noUncheckedIndexedAccess`)
- **Styling**: Vanilla CSS3 with Design Tokens (Custom Properties) & CSS Grid/Flexbox
- **Linting & Formatting**: ESLint 9, Prettier, Husky, lint-staged

---

## Project Structure

```
bodren-coffee/
├── .husky/                 # Git hooks (pre-commit: lint-staged, typecheck)
├── src/
│   ├── types.ts            # Domain types (Product, CartItem, Cart, FilterState)
│   ├── products.ts         # Pure product catalog & category extractor
│   ├── cart.ts             # Cart logic and LocalStorage persistence
│   ├── filters.ts          # Pure search, category filter, and sort pipeline
│   ├── translations.ts     # Multilingual dictionaries (EN, AR, TR)
│   ├── i18n.ts             # Translation lookup, language state & RTL detection
│   ├── ui.ts               # Sole DOM interaction module (safe narrowing)
│   ├── quiz.ts             # Self-contained coffee recommender widget
│   ├── main.ts             # Application bootstrapping & orchestration
│   └── style.css           # Design tokens, responsive layouts, RTL rules
├── index.html              # Semantic HTML5 shell (accessible labels, 1 h1)
├── package.json            # Scripts, dependencies, lint-staged config
├── tsconfig.json           # Strict TypeScript configuration
├── eslint.config.js        # ESLint 9 flat configuration
├── .prettierrc             # Prettier formatting rules
├── .prettierignore         # Prettier ignore list
├── .gitignore              # Git ignore rules
├── DESIGN.md               # Design system & visual specification
├── AGENTS.md               # AI coding rules & module boundaries
└── debugging-log.md        # Structured bug reports
```

---

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Open [http://localhost:5174/](http://localhost:5174/) in your browser.

### 3. Run Quality Checks
```bash
# Typecheck with TypeScript
npm run typecheck

# Lint with ESLint
npm run lint

# Check formatting with Prettier
npm run format:check

# Format code with Prettier
npm run format

# Production build
npm run build
```

---

## Quality Checklist

- [x] All source files in `src/` are `.ts` or `.css`.
- [x] Zero `any`, zero `as`, zero `!` across the entire TypeScript codebase.
- [x] `npm run typecheck` passes with zero errors.
- [x] `npm run lint` passes with zero warnings.
- [x] `npm run format:check` passes with zero formatting issues.
- [x] Semantic HTML with exactly one `<h1>` and accessible labels on all form controls.
- [x] Tested across desktop and mobile screen sizes.
- [x] Full native RTL support with automatic layout and font adjustments.

# AGENTS.md — BODREN Coffee Shop
## Architectural Rules, Stack Specification & AI Guidelines

---

## 1. The Stack

- **Runtime / Language**: Vanilla TypeScript 5+ (`strict: true`, `noImplicitAny: true`, `strictNullChecks: true`, `noUncheckedIndexedAccess: true`).
- **Build Tool**: Vite 5 (Native ES modules, lightning-fast HMR).
- **Styling**: Vanilla CSS3 using Design Tokens (CSS Custom Properties). Zero heavy utility frameworks.
- **Code Quality**: ESLint 9 (Flat Config), Prettier, Husky, lint-staged.
- **Storage**: Browser `localStorage` with dual-key synchronization (`shopboard_cart_v1` primary, `bodren_cart_v1` fallback).
- **Internationalization**: Lightweight custom i18n module supporting English (`en`), Arabic (`ar`), and Turkish (`tr`) with native RTL direction switching (`dir="rtl"`).

---

## 2. Folder Structure & Adding New Features

```
src/
├── types.ts          ← All domain types, interfaces, and unions live here.
├── products.ts       ← Pure product catalog data and category helpers.
├── cart.ts           ← Pure cart state management and localStorage sync.
├── filters.ts        ← Pure functions for search, category filter, and sorting.
├── translations.ts   ← Dictionary tables for all supported languages.
├── i18n.ts           ← Language state, persistence, and translation helper.
├── ui.ts             ← SOLE DOM file. Handles all rendering and delegated events.
├── quiz.ts           ← Self-contained interactive coffee recommender widget.
├── main.ts           ← Application root orchestration and bootstrap.
└── style.css         ← Global design tokens, responsive styles, and RTL rules.
```

### Where does a new feature go?
- **Adding new data fields**: Update `Product` interface in `types.ts`, then add data in `products.ts` and translations in `translations.ts`.
- **Adding a new filter or sorting mode**: Add the pure logic function in `filters.ts`. Never touch the DOM from `filters.ts`.
- **Adding UI components or changing layout**: All HTML generation and element querying must happen inside `ui.ts`.
- **Wiring user interaction**: Register events in `main.ts` using delegated listeners defined in `ui.ts`.
- **Styling updates**: Add variables to the `:root` tokens block in `style.css` before authoring component rules.

---

## 3. Strict AI Rules (From Mistakes Seen During Development)

### Rule 1: Separation of Concerns (Only `ui.ts` Touches the DOM)
*In our own words:*  
AI agents frequently attempt to query or update DOM elements inside business logic files (like creating a notification element directly inside `cart.ts` or reading an input inside `filters.ts`). This couples state logic to the browser environment, breaks automated testing, and causes state desynchronization.
- **Strict Invariant**: No file other than `src/ui.ts` may reference `document`, `window`, or DOM APIs. Logic files must remain 100% pure.

### Rule 2: Array Immutability (Never Mutate the Source Array)
*In our own words:*  
JavaScript's `Array.prototype.sort()` sorts in-place. An AI will often write `products.sort(...)`, permanently corrupting the default order for the remainder of the session. When the user later selects "Default", the original catalog order cannot be restored without a hard page reload.
- **Strict Invariant**: Always shallow-copy arrays (`[...products]`) before sorting or filtering. Selecting "default" must cleanly restore the initial product ID order.

### Rule 3: Event Listener Isolation (Single Delegated Listener)
*In our own words:*  
When re-rendering a list of cards, AI code often attaches `.addEventListener()` to each individual button inside the render loop. As the user searches or filters, hundreds of duplicate listeners accumulate on elements. A single click then triggers multiple cart additions.
- **Strict Invariant**: Event listeners must be attached once at initialization on a stable parent container using event delegation (`event.target.closest(...)`).

### Rule 4: Type Safety Without Shortcuts (No `any`, No `as`, No `!`)
*In our own words:*  
When encountering type mismatches with DOM elements or JSON data, AI code tends to silence the compiler by sprinkling `as unknown as Type`, non-null assertions (`!`), or fallback to `any`.
- **Strict Invariant**: Zero `any`, zero `as`, zero `!`. Narrow types safely using `instanceof HTMLElement`, `typeof`, null-guards, and custom type predicates.

### Rule 5: CSS Logical Properties & RTL Positioning
*In our own words:*  
Combining CSS logical properties like `inset-inline-start: 0` with physical transforms like `transform: translateX(-100%)` in RTL layouts causes drawers to translate into the visible viewport rather than offscreen, permanently trapping overlays on screen.
- **Strict Invariant**: Use explicit physical coordinates (`left: 0; right: auto;`) for directional drawers, paired with `visibility: hidden; pointer-events: none;` on closed states.

---

## 4. Console Hygiene Checklist

- [ ] Zero `console.error` and zero `console.warn` in the browser console.
- [ ] Zero TypeScript errors (`npm run typecheck` exits with 0).
- [ ] Zero ESLint errors or warnings (`npm run lint` exits with 0).
- [ ] Prettier formatting verified (`npm run format:check` exits with 0).

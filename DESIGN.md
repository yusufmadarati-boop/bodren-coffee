# DESIGN.md — BODREN Coffee Shop
## Design System & Visual Specification

> "Pick a reference you like, apply it, then improve on it."

---

## 1. Visual Reference & Moodboard

- **Primary Reference**: High-end artisan coffee e-commerce UI featuring rich dark roasted hues, warm metallic accents, and tactile coffee visuals.
- **Atmosphere**: Modern Dark Luxury. Evoking the warmth and craft of an exclusive specialty coffee roastery with soft glows, steam animations, and refined typography.
- **Enhancements beyond the reference**:
  - Full native RTL support with dedicated Arabic typography (`Cairo`).
  - Fluid responsive layouts across mobile (360px+), tablet, and desktop viewports.
  - Interactive micro-interactions: card hover lifts, animated coffee steam, glowing ambient lighting behind showcase cups.
  - Accessible focus rings and contrast ratios exceeding WCAG AA standards.

---

## 2. Design Tokens System

Defined as CSS Custom Properties in `src/style.css`:

### Color Palette
| Token | Hex / Value | Role |
| :--- | :--- | :--- |
| `--clr-bg-deep` | `#1A120B` | Primary background (Dark Espresso) |
| `--clr-bg-mid` | `#2C1D11` | Section backgrounds (Deep Mocha) |
| `--clr-bg-card` | `#3D2B1F` | Elevated card surfaces |
| `--clr-bg-card-hover` | `#4A3426` | Card hover interaction state |
| `--clr-accent` | `#E4A564` | Warm Amber / Gold for CTAs and highlights |
| `--clr-accent-dark` | `#C8894A` | Hover state for buttons |
| `--clr-accent-glow` | `rgba(228, 165, 100, 0.25)` | Ambient lighting glows |
| `--clr-text-primary` | `#F5EBE0` | Warm Cream for primary headings & labels |
| `--clr-text-secondary` | `#C8A882` | Muted warm tan for body text |
| `--clr-text-muted` | `#8A6E56` | Subdued metadata and unit labels |
| `--clr-border` | `rgba(228, 165, 100, 0.15)` | Subtle structural divider |
| `--clr-border-strong` | `rgba(228, 165, 100, 0.35)` | Interactive borders and active chips |

### Typography Scale
- **Display Font**: `Playfair Display`, serif (for Latin titles and section headers).
- **Body Font**: `Inter`, sans-serif (for UI elements, prices, buttons, and navigation).
- **RTL Arabic Font**: `Cairo`, sans-serif (applied automatically when `dir="rtl"`).

### 8px Spacing Scale
- `var(--space-1)`: 4px
- `var(--space-2)`: 8px
- `var(--space-3)`: 12px
- `var(--space-4)`: 16px
- `var(--space-5)`: 20px
- `var(--space-6)`: 24px
- `var(--space-8)`: 32px
- `var(--space-12)`: 48px
- `var(--space-16)`: 64px
- `var(--space-20)`: 80px
- `var(--space-24)`: 96px

### Radii & Elevation
- Radii: `6px` (inputs/buttons), `12px` (cards/drawers), `20px` (sections), `9999px` (pills).
- Shadows: Card rest shadow `0 4px 24px rgba(0,0,0,0.4)`, card hover shadow `0 8px 40px rgba(0,0,0,0.5), 0 2px 8px rgba(228,165,100,0.15)`.

---

## 3. Component Architecture

1. **Header & Navigation**: Fixed bar with backdrop blur (`blur(16px)`), scroll elevation, language pill toggle, and cart badge counter.
2. **Hero Section**: Dual-column layout with semantic `<h1>`, animated steam cup illustration, and quick-feature drink preview pills.
3. **Menu & Controls**:
   - Single unified search input with accessible `<label>`.
   - Category filter pills with active state indicators.
   - Price sort dropdown (Low→High, High→Low, Default).
4. **Product Grid**: Dynamic cards displaying emoji visuals, category chips, descriptions, prices, and one-click add to cart buttons.
5. **Brand Highlights ("BODREN is")**: 4 feature blocks framing a centered luxury cup showcase.
6. **Coffee Finder Quiz**: 3-question interactive recommender with progress counters and personalized drink matches.
7. **Cart Drawer**: Slide-in overlay with quantity adjusters (`+`, `−`), single item removal, subtotal calculation, and clear cart functionality.

---

## 4. Accessibility & Mobile Responsiveness

- Exactly **one `<h1>`** on the page.
- Every `<input>` and `<select>` has an associated accessible `<label>`.
- Interactive elements feature explicit `:focus-visible` styling (`outline: 2px solid var(--clr-accent)`).
- Full touch targets (minimum 44x44px for buttons).
- Tested across breakpoints: Desktop (1200px+), Tablet (768px-1024px), Mobile (<480px).

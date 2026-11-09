# AGENTS.md – Automated Agent Guidelines for BODREN

This document governs autonomous coding agents modifying this codebase.

## 🎯 Project Scope & Quality Gate
- **Application**: BODREN Artisan Coffee & Goods — a multi-page e-commerce ShopBoard.
- **Strict Quality Rule**: The pipeline will immediately fail if any non-typed shortcut (`any`, `as`, `!`) or dead starter boilerplate is introduced.

## 📋 Pre-Commit Verification Checklist
Before submitting any commit or pull request, the agent must ensure:
1. `npm run typecheck` exits with status `0` (Zero compiler errors).
2. `npm run lint` exits with status `0` (Zero warnings, zero errors).
3. `npm run build` generates clean production chunks under `dist/`.
4. No `console.log` statements exist in production source code.
5. All route pages remain lazy-loaded with explicit `<Suspense>` boundaries.

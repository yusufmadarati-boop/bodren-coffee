# AGENTS.md – Operational Rules for BODREN Project

This file guides automated AI agents modifying this repository.

## Operational Standards

1. **Strict TypeScript & ESLint**:
   - Zero tolerance for `any`, `as`, and `!`.
   - Never suppress compiler or linter errors with `// @ts-ignore` or `eslint-disable`.
   - All code must pass `npm run typecheck` and `npm run lint` cleanly.

2. **Component Conventions**:
   - One component per file inside `src/components/`.
   - Every component must declare an explicit `Props` interface.
   - All React lists must use real data identifiers for `key` props (e.g. `key={item.id}`). Array index keys are strictly forbidden.

3. **State Management**:
   - Keep business logic pure inside `src/logic/`.
   - Keep storage and network effects isolated to `src/state/` and `src/api/`.
   - Do not duplicate derived state into `useState`.

4. **Styling & Assets**:
   - Adhere to the BODREN artisan coffee aesthetic using CSS variables defined in `src/style.css`.
   - Keep English across code, identifiers, docs, and git commit messages.

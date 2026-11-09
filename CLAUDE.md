# CLAUDE.md — BODREN Coffee Shop
## Architectural Rules, Stack Specification & AI Guidelines

Refer to [AGENTS.md](./AGENTS.md) for the authoritative rules and standards.

### Quick Commands
- Development server: `npm run dev`
- Production build: `npm run build`
- Type checking: `npm run typecheck`
- Linting: `npm run lint`
- Code formatting: `npm run format`
- Check formatting: `npm run format:check`

### Coding Standards
1. **Strict TypeScript**: Every file in `src/` is `.ts`. No `any`, no `as`, no `!`.
2. **DOM Isolation**: Only `src/ui.ts` may touch the DOM.
3. **Immutability**: Never mutate `products`. Always copy before sorting/filtering.
4. **Clean Listeners**: Use single delegated listeners on stable containers.

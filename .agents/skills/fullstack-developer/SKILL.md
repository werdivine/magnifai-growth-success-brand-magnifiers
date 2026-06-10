---
name: fullstack-developer
description: Activates when building web applications, APIs, or full-stack features. Covers React/Next.js/TypeScript frontend, Node.js/Python backend, database design, authentication, responsive design, performance optimization, and deployment-ready code.
---

# Full-Stack Developer Skill

You are now operating as an elite full-stack software engineer. Every piece of code you produce must be production-grade, type-safe, and follow modern best practices.

## Frontend Standards

### React / Next.js / TypeScript
- **Always use TypeScript** with strict mode. No `any` types unless absolutely necessary with a documented reason.
- **Component Architecture**: Functional components only. Use custom hooks to extract reusable logic.
- **State Management**: Prefer React Server Components + Server Actions for data mutations. Use `useState`/`useReducer` for local state, Zustand or Jotai for global client state (never Redux for new projects).
- **Styling**: CSS Modules or Vanilla CSS with design tokens. Avoid inline styles. Use CSS custom properties for theming.
- **Performance**: Lazy load routes and heavy components. Use `React.memo`, `useMemo`, `useCallback` only when measurably needed. Image optimization with `next/image`.
- **Accessibility**: Semantic HTML, ARIA labels, keyboard navigation, focus management. Every interactive element must be keyboard-accessible.

### Design Excellence
- Rich, premium aesthetics: gradients, shadows, micro-animations, glassmorphism where appropriate.
- Mobile-first responsive design with fluid typography (`clamp()`).
- Dark mode support via CSS custom properties.
- Loading states, error boundaries, and empty states for every view.

## Backend Standards

### API Design
- RESTful conventions with consistent response shapes: `{ data, error, meta }`.
- Input validation on every endpoint (Zod schemas preferred).
- Proper HTTP status codes (201 for creation, 204 for deletion, 422 for validation errors).
- Rate limiting, CORS configuration, and request logging.

### Database
- Normalized schema design with proper indexes.
- Use migrations for schema changes (Prisma, Drizzle, or Knex).
- Never raw SQL in application code — use an ORM or query builder.
- Connection pooling for production.

### Authentication
- JWT with refresh tokens or session-based with httpOnly cookies.
- Password hashing with bcrypt (cost factor ≥ 12).
- CSRF protection for cookie-based auth.

## Code Quality Rules
1. **No dead code** — remove unused imports, variables, and functions.
2. **DRY but not premature** — extract only after 3+ repetitions.
3. **Error handling** — every async operation wrapped in try/catch with meaningful error messages.
4. **Comments** — explain WHY, not WHAT. Code should be self-documenting.
5. **Git commits** — atomic, descriptive messages following Conventional Commits.

## Workflow
1. Understand requirements fully before writing code.
2. Design the data model first.
3. Build API endpoints with validation.
4. Create UI components with loading/error/empty states.
5. Wire up frontend to backend.
6. Add tests for critical paths.
7. Run the build, fix all errors, verify in browser.

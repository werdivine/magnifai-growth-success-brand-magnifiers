---
description: End-to-end full-stack application building workflow. From requirements to deployed and verified application.
---

# Full-Stack Build Workflow

A systematic approach to building complete web applications from scratch or adding major features.

// turbo-all

## Phase 1: Requirements & Design (PLANNING Mode)
1. **Understand**: Read all requirements. Identify implicit needs.
2. **Research**: Check if similar patterns exist in the codebase.
3. **Design Data Model**: Entity relationships, types, validation rules.
4. **Design API**: Endpoints, request/response shapes, auth requirements.
5. **Design UI**: Component tree, page layouts, user flows.
6. **Create implementation_plan.md**: Document all decisions for user approval.

## Phase 2: Foundation (EXECUTION Mode)
1. **Database/Schema**: Create models, migrations, seed data.
2. **API Layer**: Routes, controllers, validation, error handling.
3. **Run & Verify**: Start server, test endpoints with sample requests.

## Phase 3: Frontend (EXECUTION Mode)
1. **Design System**: Colors, typography, spacing tokens in CSS.
2. **Layout**: Page structure, navigation, routing.
3. **Components**: Build atomic components first, then compose into pages.
4. **Integration**: Wire frontend to API with loading/error states.
5. **Responsiveness**: Test at 375px, 768px, 1024px, 1440px breakpoints.

## Phase 4: Polish (EXECUTION Mode)
1. **Animations**: Micro-interactions, transitions, hover effects.
2. **Error Handling**: Error boundaries, toast notifications, form validation UI.
3. **Accessibility**: Keyboard navigation, screen reader, color contrast.
4. **Performance**: Lazy loading, image optimization, bundle analysis.

## Phase 5: Verify (VERIFICATION Mode)
1. **Build**: `npm run build` must pass cleanly.
2. **Tests**: Run all tests, add tests for critical paths.
3. **Browser Check**: Use browser_subagent to screenshot key pages.
4. **Security**: Quick security audit (hardcoded secrets, XSS, auth checks).
5. **Run `/strict_verification_sop`**.

## Anti-Patterns
- Don't build the entire frontend before testing the API.
- Don't skip the design system — ad-hoc styles create inconsistency.
- Don't add features beyond the requirements (scope creep).
- Don't deploy without running the verification SOP.

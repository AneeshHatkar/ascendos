# CODE_LEDGER

This file records meaningful file changes for ascendOS + Carnos.

## Initial Files

### `.gitignore`
Purpose: Ignore dependencies, secrets, build outputs, `.venv`, logs, and OS/editor junk.

### `docs/source-of-truth/*`
Purpose: Store final synced DOCX and JSON source-of-truth files.

### `README.md`
Purpose: Project overview.

### `SOURCE_OF_TRUTH.md`
Purpose: Quick local summary of the official DOCX/JSON.

### `PROJECT_EXECUTION_LOG.md`
Purpose: Build history.

### `CODE_LEDGER.md`
Purpose: File-by-file change history.

### `DECISIONS.md`
Purpose: Architecture decisions.

### `ERRORS_AND_FIXES.md`
Purpose: Error/fix history.

### `CHANGELOG.md`
Purpose: High-level project changes.

## Phase 2 — Next.js Foundation

### `package.json`
Purpose: Defines npm scripts and Next.js dependencies.
Change: Added Next.js app package metadata and renamed package to `ascendos`.

### `package-lock.json`
Purpose: Locks npm dependency versions.

### `src/app/*`
Purpose: Default Next.js App Router starter files.
Note: These are temporary starter files and will be replaced with ascendOS shell UI.

### `eslint.config.mjs`
Purpose: ESLint configuration for Next.js.

### `next.config.ts`
Purpose: Next.js configuration.

### `postcss.config.mjs`
Purpose: PostCSS/Tailwind configuration.

### `tsconfig.json`
Purpose: TypeScript configuration.

### `public/*`
Purpose: Default public assets from create-next-app.
Note: These may be removed or replaced later.

### `.gitignore`
Purpose: Merged project ignore rules with Next.js ignore rules.

### `README.md`
Purpose: Restored ascendOS project identity and added Next.js development commands.

## Phase 2.6–2.7 — App Shell Structure and Route Registry

### `src/components/*`
Purpose: Holds reusable UI, layout, dashboard, Carnos, form, table, chart, calendar, timeline, privacy, voice, and grimoire components.

### `src/lib/*`
Purpose: Holds domain services and shared logic for routes, Supabase, AI, dates, scoring, audit, security, storage, and analytics.

### `src/lib/routes.ts`
Purpose: Canonical route constants and banned legacy route constants.

### `src/lib/dashboard-registry.ts`
Purpose: Initial dashboard registry for shell navigation and dashboard metadata.

### `src/schemas`
Purpose: Future Zod schema files.

### `src/types`
Purpose: Future shared TypeScript type definitions.

### `supabase/*`
Purpose: Future SQL migrations, seed data, and RLS policy files.

### `tests/*`
Purpose: Future unit, schema, API, RLS, AI fixture, and e2e smoke tests.

## Phase 2.9 — ascendOS Homepage Shell

### `src/app/page.tsx`
Purpose: Replaces default Next.js starter page with the first ascendOS shell screen.
Includes:
- ascendOS identity.
- Carnos Command Foundation label.
- Core promise.
- Proof-based evolution positioning.
- Core signal chips.
- Canonical dashboard registry preview.

## Phase 2.11 — Reusable Shell Components

### `src/components/layout/app-shell.tsx`
Purpose: Shared application shell wrapper.

### `src/components/layout/app-sidebar.tsx`
Purpose: Sidebar navigation using the dashboard registry.

### `src/components/layout/app-topbar.tsx`
Purpose: Shared top navigation/status bar.

### `src/components/dashboard/dashboard-card.tsx`
Purpose: Reusable dashboard preview card.

## Phase 2.13 — Homepage Component Refactor

### `src/app/page.tsx`
Purpose: Uses reusable layout and dashboard card components instead of inline shell markup.

## Phase 2.15 — Core Placeholder Routes

### `src/app/command/page.tsx`
Purpose: Placeholder Command dashboard route.

### `src/app/carnos/page.tsx`
Purpose: Placeholder Carnos dashboard route.

### `src/app/calendar/page.tsx`
Purpose: Placeholder Calendar dashboard route.

### `src/app/timeline/page.tsx`
Purpose: Placeholder Timeline dashboard route.

### `src/app/goals/page.tsx`
Purpose: Placeholder Goals dashboard route.

### `src/app/career/page.tsx`
Purpose: Placeholder Career dashboard route.

### `src/app/learning/page.tsx`
Purpose: Placeholder Learning dashboard route.

### `src/app/analytics/page.tsx`
Purpose: Placeholder Analytics dashboard route.

## Phase 2.17 — Remaining Canonical Placeholder Routes

Purpose: Adds placeholder pages for all remaining canonical dashboard routes so the app shell has complete route coverage before database and AI work begins.

Added route pages:
- `/world-class`
- `/networking`
- `/resume`
- `/interviews`
- `/projects`
- `/research-stanford`
- `/research-lab`
- `/body`
- `/nutrition`
- `/supplements`
- `/sleep-energy`
- `/emotion`
- `/hair-skincare`
- `/life-admin`
- `/finance`
- `/housing`
- `/documents`
- `/creativity`
- `/grimoire`
- `/decisions`
- `/future-simulator`
- `/knowledge`
- `/experiments`
- `/privacy`
- `/custom-trackers`

## Phase 2.19 — Full Dashboard Registry

### `src/lib/dashboard-registry.ts`
Purpose: Full canonical dashboard metadata registry.
Includes:
- Every canonical route.
- Dashboard title.
- Dashboard domain category.
- Dashboard description.

## Phase 2.21–2.22 — Route Validation and Knowledge Route Correction

### `scripts/validate-route-coverage.mjs`
Purpose: Validates canonical route coverage and blocks banned legacy routes.

### `package.json`
Change:
- Added `validate:routes`.
- Added `check`.

### `src/app/knowledge/page.tsx`
Purpose: Correct Knowledge Vault dashboard route.

### Removed `src/app/knowledge-vault/page.tsx`
Reason: Source-of-truth JSON uses `/knowledge`, not `/knowledge-vault`.

### `src/lib/routes.ts`
Change: Corrected canonical route list to use `/knowledge`.

### `src/lib/dashboard-registry.ts`
Change: Corrected Knowledge Vault registry entry to use `/knowledge`.

## Phase 2.23–2.24 — Shared Placeholder Dashboard Component

### `src/components/dashboard/placeholder-dashboard-page.tsx`
Purpose: Shared placeholder dashboard layout used by canonical dashboard pages.

### `src/app/*/page.tsx`
Change: Refactored canonical placeholder pages to use `PlaceholderDashboardPage`.

## Phase 2.26 — Registry Coverage Validation

### `scripts/validate-registry-coverage.mjs`
Purpose: Validates dashboard registry coverage against canonical routes.

### `package.json`
Change:
- Added `validate:registry`.
- Updated `check` to include registry validation.

## Phase 2 Complete — Next.js Foundation and Canonical Shell

Phase 2 established the frontend foundation for ascendOS:
- Next.js app foundation.
- Canonical dashboard route structure.
- Reusable layout shell.
- Dashboard registry.
- Route validation.
- Registry validation.
- Placeholder route coverage.

Phase 3 begins Supabase/Auth foundation.

## Phase 3.1–3.3 — Supabase Foundation

### `.env.example`
Purpose: Documents required Supabase and app environment variables.

### `src/lib/supabase/env.ts`
Purpose: Validates required public Supabase environment variables.

### `src/lib/supabase/browser.ts`
Purpose: Creates the browser Supabase client.

### `src/lib/supabase/server.ts`
Purpose: Creates the server Supabase client using Next.js cookies.

## Phase 3.4 — Supabase Middleware Foundation

### `src/lib/supabase/env.ts`
Change: Added environment presence helper.

### `src/lib/supabase/middleware.ts`
Purpose: Refreshes Supabase sessions in middleware.

### `middleware.ts`
Purpose: Wires Supabase session refresh into Next.js middleware.

## Phase 3.5 — Auth Page Skeleton

### `src/lib/auth/actions.ts`
Purpose: Server actions for login, signup, and signout.

### `src/app/auth/login/page.tsx`
Purpose: Login page.

### `src/app/auth/signup/page.tsx`
Purpose: Signup page.

### `src/app/auth/callback/route.ts`
Purpose: Supabase auth callback route.

### `src/app/auth/signout/route.ts`
Purpose: Signout route.

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

## Phase 3.5B — Auth Action Type Fix

### `src/lib/auth/actions.ts`
Change: Server actions now return `Promise<void>` for direct form action compatibility.

### `src/app/auth/login/page.tsx`
Change: Login form now uses `signInWithPassword` directly.

### `src/app/auth/signup/page.tsx`
Change: Signup form now uses `signUpWithPassword` directly.

## Phase 3.6 — Auth User Helper

### `src/lib/auth/session.ts`
Purpose: Provides safe current-user and required-user helpers for server-side auth checks.

## Phase 3.7 — Auth-Aware Topbar Status

### `src/components/layout/auth-status.tsx`
Purpose: Displays local setup, login/signup, or signed-in status.

### `src/components/layout/app-topbar.tsx`
Change: Uses `AuthStatus`.

## Phase 3.7C — Code Snapshot Generator

### `scripts/generate-code-snapshot.mjs`
Purpose: Generates `CODE_SNAPSHOT.md`, a single markdown file containing the important project code and docs for future chat handoff.

### `CODE_SNAPSHOT.md`
Purpose: Generated codebase snapshot for continuity across chats.

### `package.json`
Change:
- Added `snapshot:code` script.

## Phase 3.8 — Profiles and Carnos Profiles SQL Foundation

### `supabase/migrations/0001_profiles_and_carnos_profiles.sql`
Purpose: First Supabase migration for user identity and Carnos user preferences.
Includes:
- `profiles`
- `carnos_profiles`
- updated_at trigger helper
- auth user creation trigger
- RLS policies
- owner-only access

## Phase 3.9 — SQL Migration Validation

### `scripts/validate-sql-migrations.mjs`
Purpose: Validates SQL migration naming and basic safety rules.

### `package.json`
Change:
- Added `validate:migrations`.
- Updated `check` to include migration validation before build.

## Phase 3.10 — Database TypeScript Types

### `src/types/database.ts`
Purpose: Defines TypeScript row, insert, update, enum, JSON, and Supabase-compatible database types for the first SQL migration.

## Phase 3.11 — Typed Supabase Clients

### `src/lib/supabase/browser.ts`
Change: Browser Supabase client now uses the typed `Database` interface.

### `src/lib/supabase/server.ts`
Change: Server Supabase client now uses the typed `Database` interface.

### `src/lib/supabase/middleware.ts`
Change: Middleware Supabase client now uses the typed `Database` interface.

## Phase 3.12 — Profile Repository Helpers

### `src/lib/profile/queries.ts`
Purpose: Server-side profile data access layer for reading the current user's `profiles` and `carnos_profiles` rows.

### `src/lib/profile/index.ts`
Purpose: Barrel export for profile query helpers.

## Phase 3.13 — Profile Status Card on Command Center

### `src/components/profile/profile-summary-card.tsx`
Purpose: Server component that displays local setup mode or the signed-in user's profile and Carnos profile state.

### `src/app/command/page.tsx`
Change: Replaced generic placeholder with a command center foundation page connected to profile status.

## Phase 3.14 — Supabase Setup Guide and Env Verification

### `scripts/verify-env.mjs`
Purpose: Verifies Supabase public env var presence without breaking local setup mode.

### `docs/setup/SUPABASE_SETUP.md`
Purpose: Step-by-step guide for connecting ascendOS to a real Supabase project safely.

### `package.json`
Change:
- Added `verify:env`.

## Phase 3.15 — Settings Page Skeleton

### `src/app/settings/page.tsx`
Purpose: Settings foundation page for profile, Carnos preferences, memory controls, and privacy/security controls.

### `src/lib/navigation/dashboard-registry.ts`
Change: Added Settings route.

### `scripts/validate-route-coverage.mjs`
Change: Added `/settings` to route validation.

## Phase 3.16 — Protected Route Boundary

### `src/components/auth/protected-page.tsx`
Purpose: Reusable server component for protecting private routes while preserving local setup mode.

### `src/components/auth/index.ts`
Purpose: Barrel export for auth components.

### `docs/setup/PROTECTED_ROUTES.md`
Purpose: Explains when and how to apply route protection safely.

## Phase 3.17 — Auth Smoke-Test Checklist

### `docs/setup/AUTH_SMOKE_TEST.md`
Purpose: Manual checklist for validating local setup mode, connected Supabase auth, profile row creation, Carnos profile row creation, signout, and RLS behavior.

## Phase 3.18 — Phase 3 Final Audit Script

### `scripts/audit-phase-3.mjs`
Purpose: Automated completion gate for Phase 3 Supabase/Auth foundation.

### `package.json`
Change:
- Added `audit:phase3`.
- Added Phase 3 audit to `npm run check`.

## Phase 3.20 — Phase 3 Completion

### `PHASE_STATUS.md`
Purpose: Tracks completed project phases, verification gates, deferred live checks, and next phase.

## Phase 4.1 — Core SQL Spine Plan Lock

### `docs/phase-plans/PHASE_4_CORE_SQL_SPINE.md`
Purpose: Locked Phase 4 implementation plan covering table scope, migration order, RLS rules, deferred items, and completion gates.

### `PHASE_STATUS.md`
Change: Marked Phase 4 as started.

## Phase 4.2 — Audit Logs and AI Actions Migration

### `supabase/migrations/0002_audit_and_ai_actions.sql`
Purpose: Creates the audit and proposed-action foundation for future Carnos writes.
Includes:
- `audit_logs`
- `ai_actions`
- owner-only RLS
- indexes
- AI action status lifecycle

## Phase 4.3 — Chat Sessions and Chat Messages Migration

### `supabase/migrations/0003_chat_foundation.sql`
Purpose: Creates the durable storage foundation for future Carnos conversations.
Includes:
- `chat_sessions`
- `chat_messages`
- chat-to-AI-action linkage
- owner-only RLS
- indexes

## Phase 4.4 — Goals and Goal Milestones Migration

### `supabase/migrations/0004_goals_foundation.sql`
Purpose: Creates the durable SQL foundation for goals and goal milestones.
Includes:
- `goals`
- `goal_milestones`
- owner-only RLS
- parent-goal ownership checks for milestones
- indexes
- AI action and chat message source links

## Phase 4.5 — Daily Logs and Proof Items Migration

### `supabase/migrations/0005_daily_logs_and_proof_items.sql`
Purpose: Creates the proof-first daily execution and evidence foundation.
Includes:
- `daily_logs`
- `proof_items`
- owner-only RLS
- parent ownership checks
- proof/reality scoring
- occurred_at vs logged_at semantics
- AI action and chat message source links

## Phase 4.6 — Tasks and Events Migration

### `supabase/migrations/0006_tasks_and_events.sql`
Purpose: Creates the execution and calendar/timeline foundation.
Includes:
- `tasks`
- `events`
- proof item task FK
- owner-only RLS
- parent ownership checks
- occurred_at vs logged_at event semantics
- AI action and chat message source links

## Phase 4.7 — RLS, Index, and Source-Link Audit

### `scripts/audit-phase-4.mjs`
Purpose: Audits Phase 4 core SQL spine migrations for required files, tables, RLS, policies, indexes, source links, updated_at triggers, daily log uniqueness, proof item task linkage, and forbidden premature memory table creation.

### `package.json`
Change: Added `audit:phase4` and wired it into `npm run check`.

## Phase 4.7a — Phase 4 Audit Script Replacement

### `scripts/audit-phase-4.mjs`
Change: Replaced brittle global ownership check with per-table create-block ownership verification and kept all Phase 4 audit gates.

## Phase 4.7b — Phase 4 Audit and SQL Typo Fix

### `scripts/audit-phase-4.mjs`
Change: Replaced corrupted table-block regex parser with safer string-boundary table block extraction.

### `supabase/migrations/0004_goals_foundation.sql`
Change: Fixed missing space in `references public.profiles`.

### `supabase/migrations/0006_tasks_and_events.sql`
Change: Fixed missing space in `references public.profiles`.

## Phase 4.8 — SQL Migration Validator Upgrade

### `scripts/validate-sql-migrations.mjs`
Purpose: Strengthens general SQL migration validation beyond basic migration presence.
Checks:
- canonical names
- sequence ordering
- empty files
- corrupted copy markers
- missing `references public.*` whitespace
- RLS disable guard
- user-owned table RLS/policy/index baseline
- required Phase 3 profile tables
- premature memory table prevention

## Phase 4.9 — TypeScript Database Types Update

### `src/types/database.ts`
Purpose: Provides typed Supabase table contracts for Phase 3 and Phase 4 tables.
Includes:
- Row, Insert, Update, and Relationship types
- typed status/lifecycle unions
- Json helper type

## Phase 4.9a — Database Type Alias Fix

### `src/types/database.ts`
Change: Restored Phase 3 exported aliases and added Phase 4 table aliases.

## Phase 4.9b — Phase 3 Database Type Compatibility Fix

### `src/types/database.ts`
Change: Restored `profiles.onboarding_status` and `confirmation_required` compatibility while keeping Phase 4 table typings.

## Phase 4.10 — Read-Only Repository Helpers

### `src/lib/repositories/core-read.ts`
Purpose: Provides typed read-only repository helpers for Phase 4 core SQL spine tables.

### `src/lib/repositories/index.ts`
Purpose: Barrel export for repository helpers.\n\n## Phase 4.11 — Phase 4 Documentation and Report

### docs/database/CORE_SQL_SPINE.md
Purpose: Documents Phase 4 core SQL spine tables, safety rules, validation commands, TypeScript types, repositories, and deferred scope.

### docs/phase-reports/PHASE_4_CORE_SQL_SPINE_REPORT.md
Purpose: Records Phase 4 completion report, fixed issues, verification gates, and next phase recommendation.

### PHASE_STATUS.md
Change: Added Phase 4 documentation-added status.\n\n

## Phase 4.12 — Phase 4 Complete Marker

### `PHASE_STATUS.md`
Change: Marked Phase 4 — Core SQL Spine complete.

### `PROJECT_EXECUTION_LOG.md`
Change: Added Phase 4 completion entry.

## Full Source Alignment Audit

### `scripts/audit-source-alignment.mjs`
Purpose: Audits Phases 1–4 against FINAL_SYNCED source-of-truth files and implementation gates.

### `package.json`
Change: Added `audit:source` and wired it into `npm run check`.

## Source Alignment Audit Phase Marker Fix

### `PHASE_STATUS.md`
Change: Added explicit completed baseline markers for Phase 1, Phase 2, Phase 3, and Phase 4.

## Source Alignment Audit Lint Cleanup

### `scripts/audit-source-alignment.mjs`
Change: Removed unused `requireDirectory` helper.

## Phase 5.1 — Core Read UI Integration Plan Lock

### docs/phase-plans/PHASE_5_CORE_READ_UI_INTEGRATION.md
Purpose: Locked Phase 5 implementation plan covering read-only UI integration, priority pages, shared components, auth shell, audits, deferred scope, and completion gates.

### PHASE_STATUS.md
Change: Marked Phase 5 as started.

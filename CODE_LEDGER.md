## Phase 14H Text/Voice-to-Proposed-Action Bridge

Files added:
- `src/lib/voice/voice-action-bridge.ts`
- `src/components/voice/voice-action-bridge-preview.tsx`
- `docs/phase-reports/PHASE_14H_TEXT_VOICE_TO_PROPOSED_ACTION_BRIDGE_REPORT.md`
- `docs/qa/PHASE_14H_TEXT_VOICE_TO_PROPOSED_ACTION_BRIDGE_SMOKE_CHECKLIST.md`
- `scripts/audit-phase-14h.mjs`

Files updated:
- `src/components/voice/carnos-voice-panel-integration.tsx`
- `src/components/voice/index.ts`
- `src/lib/voice/index.ts`
- `package.json`
- `PROJECT_EXECUTION_LOG.md`
- `CODE_LEDGER.md`
- `CHANGELOG.md`
- `PHASE_STATUS.md`

## Phase 14E — Voice UI Components
- Added `src/components/voice/*` display-only component shell.
- Added `scripts/audit-phase-14e.mjs`.
- Updated `package.json` check gate with `audit:phase14e`.
- Patched earlier Phase 14 audits for legal Phase 14E UI compatibility.

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

Purpose: Barrel export for repository helpers.

## Phase 4.11 — Phase 4 Documentation and Report

### docs/database/CORE_SQL_SPINE.md

Purpose: Documents Phase 4 core SQL spine tables, safety rules, validation commands, TypeScript types, repositories, and deferred scope.

### docs/phase-reports/PHASE_4_CORE_SQL_SPINE_REPORT.md

Purpose: Records Phase 4 completion report, fixed issues, verification gates, and next phase recommendation.

### PHASE_STATUS.md

Change: Added Phase 4 documentation-added status.

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

## Phase 5.2 — Shared Dashboard UI Components

### src/components/dashboard/section-card.tsx

Purpose: Reusable display-only dashboard section container.

### src/components/dashboard/empty-state.tsx

Purpose: Reusable display-only empty state component.

### src/components/dashboard/data-list.tsx

Purpose: Reusable display-only list renderer for read pages.

### src/components/dashboard/status-pill.tsx

Purpose: Reusable display-only status label.

### src/components/dashboard/metric-tile.tsx

Purpose: Reusable display-only metric card.

### src/components/dashboard/index.ts

Purpose: Barrel exports for shared dashboard components.

## Phase 5.3 — Authenticated Dashboard Shell Helper

### src/lib/dashboard/auth.ts

Purpose: Provides a safe server-side dashboard auth state helper for read-only dashboard pages.

### src/components/dashboard/authenticated-dashboard-shell.tsx

Purpose: Provides a reusable authenticated dashboard shell with signed-out and unavailable empty states.

### src/components/dashboard/index.ts

Change: Exports AuthenticatedDashboardShell.

## Phase 5.4 — Command Dashboard Read Integration

### src/app/command/page.tsx

Purpose: Connects the command dashboard to read-only repository helpers for goals, tasks, events, proof items, daily logs, and AI actions.

### src/components/dashboard/authenticated-dashboard-shell.tsx

Change: Allows async server-rendered dashboard children so pages can load read data inside the authenticated shell.

## Phase 5.5 — Goals Page Read Integration

### src/app/goals/page.tsx

Purpose: Connects the goals dashboard to the read-only `listGoals` repository helper and renders goal metrics, record list, read warnings, and empty state.

## Phase 5.6 — Timeline Page Read Integration

### src/app/timeline/page.tsx

Purpose: Connects the timeline dashboard to read-only event, proof item, and audit log repository helpers and renders timeline metrics, read warnings, combined record list, and empty state.

## Phase 5.7 — Carnos Page Read Integration

### src/app/carnos/page.tsx

Purpose: Connects the Carnos dashboard to read-only chat session, chat message, and AI action repository helpers while explicitly preserving the no-generation, no-memory, no-execution, no-mutation Phase 5 boundary.

## Phase 5.8 — Calendar Page Read Integration

### src/app/calendar/page.tsx

Purpose: Connects the calendar dashboard to read-only task and event repository helpers and renders calendar metrics, read warnings, combined task/event list, and empty state.

## Phase 5.9 — Proof and Daily Log Read Surfaces

### src/app/world-class/page.tsx

Purpose: Connects the world-class path dashboard to read-only proof item and daily log repository helpers and renders proof/reality metrics plus recent proof records.

### src/app/analytics/page.tsx

Purpose: Connects the analytics dashboard to read-only proof item and daily log repository helpers and renders lightweight proof/daily-log summary metrics plus recent daily logs.

## Phase 5.10 — Core Domain Filtered Reads

### src/components/dashboard/domain-read-page.tsx

Purpose: Reusable read-only domain dashboard that reads goals, tasks, events, and proof items, then filters records by domain-like fields.

### src/app/career/page.tsx

Purpose: Career-domain read-only dashboard surface.

### src/app/learning/page.tsx

Purpose: Learning-domain read-only dashboard surface.

### src/app/body/page.tsx

Purpose: Body-domain read-only dashboard surface.

### src/components/dashboard/index.ts

Change: Exports DomainReadPage.

## Phase 5.11 — Phase 5 Audit Script

### scripts/audit-phase-5.mjs

Purpose: Audits Phase 5 read UI integration and confirms no write, memory, Carnos generation, or execution code entered the phase.

### package.json

Change: Added `audit:phase5` and wired it into `npm run check`.

## Phase 5.12 — Phase 5 Documentation Report

### docs/phase-reports/PHASE_5_CORE_READ_UI_INTEGRATION_REPORT.md

Purpose: Documents Phase 5 read UI integration scope, completed surfaces, explicit non-scope, verification gates, and remaining closure steps.

## Phase 5.13 — Source Alignment Audit Update

### scripts/audit-source-alignment.mjs

Purpose: Extends full source alignment audit coverage through Phase 5 read UI integration and updates the success message to Phases 1–5.

### PROJECT_EXECUTION_LOG.md

Change: Records Phase 5.13 source alignment audit update.

### CODE_LEDGER.md

Change: Records Phase 5.13 source alignment audit update.

## Phase 5.14 — Phase 5 Complete

### PHASE_STATUS.md

Change: Marks Phase 5 complete.

### CHANGELOG.md

Change: Adds Phase 5 completion entry.

### PROJECT_EXECUTION_LOG.md

Change: Records final Phase 5 completion and preserved boundaries.

### CODE_LEDGER.md

Change: Records Phase 5 completion marker.

## Phase 5.15 — Python/ML Intelligence Architecture Patch

### docs/source-of-truth/ascendOS_Carnos_v1_1_COMPLETE_Source_of_Truth_FINAL_SYNCED.json

Change: Added `python_ml_intelligence_worker` with full structured roadmap and safety rules.

### docs/architecture/PYTHON_ML_INTELLIGENCE_WORKER.md

Purpose: Documents the future Python/ML worker layer and non-mutating contract.

### docs/phase-plans/PHASE_5_15_PYTHON_ML_INTELLIGENCE_ARCHITECTURE_PATCH.md

Purpose: Locks scope/non-scope for Phase 5.15 before Phase 6.

### scripts/audit-python-ml-boundary.mjs

Purpose: Verifies Python/ML is documented as non-mutating, planned, and not active runtime yet.

### package.json

Change: Added `audit:pythonml` and wired it into `npm run check`.

## 2026-06-19 23:35 UTC — Phase 6.1 Plan Lock

Added:

- `docs/phase-plans/PHASE_6_SAFE_WRITE_PROPOSED_ACTION_FLOW.md`

Role:

- Official Phase 6 implementation plan.
- Defines safe proposed-action write flow, scope, non-scope, acceptance criteria, and safety boundaries.
- Establishes the required confirmation chain for future write-capable features.

Runtime impact:

- None.

Write impact:

- None.

Python/ML impact:

- None. Python/ML remains architecture-only and non-mutating.

## 2026-06-19 23:44 UTC — Phase 6.2 Action Types

Added:

- `src/lib/actions/action-types.ts`

Role:

- Defines the canonical proposed action type list for Phase 6.
- Exports `ProposedActionType`.
- Exports labels and descriptions for supported action types.
- Exports `isProposedActionType` for safe runtime checks.

Supported action types:

- `create_task`
- `create_goal`
- `create_daily_log`
- `create_proof_item`

Runtime impact:

- Type/registry foundation only.

Write impact:

- No writes are executed in this step.

## 2026-06-19 23:51 UTC — Phase 6.3 Proposed Action Contracts

Added:

- `src/lib/actions/proposed-action-contracts.ts`

Role:

- Defines typed payload contracts for proposed write actions.
- Defines source, domain, priority, task status, goal status, and proof type enums.
- Defines required fields for each proposed action type.
- Defines forbidden client payload fields such as `user_id`, `owner_id`, and service-role-like fields.
- Defines `PROPOSED_ACTION_CONTRACT_VERSION`.

Runtime impact:

- Type foundation only.

Write impact:

- No writes are executed in this step.

## 2026-06-19 23:58 UTC — Phase 6.4 Action Result Types

Added:

- `src/lib/actions/action-results.ts`

Role:

- Defines standard success and error result shapes for proposed action workflows.
- Defines action result error codes for validation, auth, confirmation, database, and unexpected failures.
- Adds small helper constructors and type guards.

Runtime impact:

- Type/helper foundation only.

Write impact:

- No writes are executed in this step.

## 2026-06-20 00:05 UTC — Phase 6.5 Payload Validation

Added:

- `src/lib/actions/validate-proposed-action.ts`

Role:

- Validates proposed action envelopes and payloads.
- Rejects unsupported action types.
- Rejects invalid source/confidence/evidence metadata.
- Rejects forbidden payload fields such as `user_id`, `owner_id`, and service-role-like fields.
- Returns standard `ActionResult` objects.

Runtime impact:

- Validation helper only.

Write impact:

- No writes are executed in this step.

## 2026-06-20 00:09 UTC — Phase 6.6 Audit Helper

Added:

- `src/lib/audit/write-audit-log.ts`

Role:

- Defines `WriteAuditLogInput`.
- Defines `WriteAuditLogResult`.
- Adds `writeAuditLog` helper for inserting into `audit_logs`.
- Returns structured success/error results.

Runtime impact:

- Server-side helper foundation.

Write impact:

- Adds an audit-write helper only.
- Does not execute proposed actions by itself.

## 2026-06-20 04:31 UTC — Phase 6.7 Timeline Helper Boundary

Added:

- `src/lib/timeline/write-timeline-event.ts`

Role:

- Defines timeline helper input/result types.
- Provides `writeTimelineEvent`.
- Returns `status: "skipped"` because the current SQL spine has no `timeline_events` table.

Runtime impact:

- Safe helper boundary only.

Write impact:

- No timeline write is executed in this step.

## 2026-06-20 04:49 UTC — Phase 6.8 Proposed Action Creation Helper

Added:

- `src/lib/actions/create-proposed-action.ts`

Role:

- Defines `CreateProposedActionInput`.
- Defines `CreateProposedActionData`.
- Adds `createProposedAction`.
- Validates proposed action contracts before storage.
- Inserts valid proposals into `ai_actions` as `pending_confirmation`.

Runtime impact:

- Adds safe proposed-action persistence helper.

Write impact:

- Writes only to `ai_actions`.
- Does not write to target domain tables.

## 2026-06-20 05:05 UTC — Phase 6.9 Action Lifecycle Helper

Added:

- `src/lib/actions/action-lifecycle.ts`

Role:

- Defines lifecycle transition types.
- Defines allowed lifecycle transition rules.
- Adds `updateActionLifecycle`.
- Updates `ai_actions.status` and matching lifecycle timestamps.

Runtime impact:

- Adds controlled proposal lifecycle update helper.

Write impact:

- Writes only to `ai_actions`.
- Does not write to target domain tables.

## 2026-06-20 05:18 UTC — Phase 6.10 Execution Dispatcher Boundary

Added:

- `src/lib/actions/execution-dispatcher.ts`

Role:

- Defines `ExecuteApprovedActionInput`.
- Defines `ExecuteApprovedActionData`.
- Adds `executeApprovedAction`.
- Adds dispatcher routing for `create_task`, `create_goal`, `create_daily_log`, and `create_proof_item`.
- Adds `markDispatcherReadyForActionType` as a typed readiness helper.

Runtime impact:

- Adds safe dispatcher boundary.

Write impact:

- Reads from `ai_actions`.
- Does not write to target domain tables.

## 2026-06-20 05:24 UTC — Phase 6.11 Create Task Flow

Added:

- `src/lib/actions/flows/create-task-flow.ts`

Updated:

- `src/lib/actions/execution-dispatcher.ts`

Role:

- Adds `executeCreateTaskAction`.
- Dispatches approved `create_task` actions to the task creation flow.
- Inserts into `tasks`.
- Updates source `ai_actions` to `executed`.
- Writes audit metadata.
- Calls timeline helper boundary.

Write impact:

- Writes to `tasks`.
- Updates `ai_actions`.
- Writes to `audit_logs`.
- Timeline helper remains skipped until timeline schema exists.

## 2026-06-20 18:09 UTC — Phase 6.12 Create Goal Flow

Added:

- `src/lib/actions/flows/create-goal-flow.ts`

Updated:

- `src/lib/actions/execution-dispatcher.ts`

Role:

- Adds `executeCreateGoalAction`.
- Dispatches approved `create_goal` actions to the goal creation flow.
- Inserts into `goals`.
- Updates source `ai_actions` to `executed`.
- Writes audit metadata.
- Calls timeline helper boundary.

Write impact:

- Writes to `goals`.
- Updates `ai_actions`.
- Writes to `audit_logs`.
- Timeline helper remains skipped until timeline schema exists.

## 2026-06-20 18:13 UTC — Phase 6.13 Create Daily Log Flow

Added:

- `src/lib/actions/flows/create-daily-log-flow.ts`

Updated:

- `src/lib/actions/execution-dispatcher.ts`

Role:

- Adds `executeCreateDailyLogAction`.
- Dispatches approved `create_daily_log` actions to the daily log creation flow.
- Inserts into `daily_logs`.
- Updates source `ai_actions` to `executed`.
- Writes audit metadata.
- Calls timeline helper boundary.

Write impact:

- Writes to `daily_logs`.
- Updates `ai_actions`.
- Writes to `audit_logs`.
- Timeline helper remains skipped until timeline schema exists.

## 2026-06-20 18:17 UTC — Phase 6.14 Create Proof Item Flow

Added:

- `src/lib/actions/flows/create-proof-item-flow.ts`

Updated:

- `src/lib/actions/execution-dispatcher.ts`

Role:

- Adds `executeCreateProofItemAction`.
- Dispatches approved `create_proof_item` actions to the proof item creation flow.
- Inserts into `proof_items`.
- Updates source `ai_actions` to `executed`.
- Writes audit metadata.
- Calls timeline helper boundary.
- Validates referenced daily logs, goals, and tasks stay inside user ownership.

Write impact:

- Writes to `proof_items`.
- Updates `ai_actions`.
- Writes to `audit_logs`.
- Timeline helper remains skipped until timeline schema exists.

## 2026-06-20 18:22 UTC — Phase 6.15 Save/Edit/Cancel UI Component

Added:

- `src/components/actions/proposed-action-review-card.tsx`
- `src/components/actions/index.ts`

Role:

- Provides the reusable client-side review card for proposed actions.
- Supports payload preview, JSON edit mode, Save / Confirm callback, and Cancel callback.
- Designed for Phase 6.16 route wiring.

Write impact:

- No direct write impact.
- No Supabase calls.
- No server mutations.

## 2026-06-20 18:30 UTC — Phase 6.16 App Page Wiring

Updated:

- `src/app/carnos/page.tsx`

Role:

- Imports `ProposedActionReviewCard`.
- Renders a sample `ProposedActionContract` in the Carnos dashboard.
- Exposes the Save/Edit/Cancel review UI in-app without direct SQL mutation.

Write impact:

- No direct write impact.
- No Supabase mutation from the page.
- No action execution from the page.

## 2026-06-20 18:38 UTC — Phase 6 Audit Gate

Added:

- `scripts/audit-phase-6.mjs`

Updated:

- `package.json`

Role:

- Adds `npm run audit:phase6`.
- Adds Phase 6 audit to the main `npm run check` pipeline.
- Confirms safe write proposed-action flow structure and UI boundary.

Write impact:

- No runtime write impact.
- Adds static audit enforcement only.

## 2026-06-20 18:47 UTC — Phase 6 Completion Report

Added:

- `docs/phase-reports/PHASE_6_SAFE_WRITE_PROPOSED_ACTION_FLOW_REPORT.md`

Role:

- Final Phase 6 implementation report.
- Documents safe write flow, action types, execution flows, UI boundary, and audit gate.

Write impact:

- Documentation only.

## Phase 7.1 - Plan Lock

- Added docs/phase-plans/PHASE_7_CORE_OPERATING_DASHBOARDS.md.
- No runtime code changed in this step.

## Phase 7.2 - Dashboard Layout Contract

- Added src/lib/dashboard/dashboard-layout-contract.ts.
- Updated src/lib/dashboard/index.ts to export the contract.

## Phase 7.3 - Dashboard Card Registry

- Added src/lib/dashboard/dashboard-card-registry.ts.
- Updated src/lib/dashboard/index.ts to export the registry.

## Phase 7.4 - Shared Dashboard Card Primitives

- Added src/components/dashboard/operating-dashboard-card.tsx.
- Added src/components/dashboard/operating-dashboard-grid.tsx.
- Updated src/components/dashboard/index.ts exports.

## Phase 7.5 - Dashboard Data Aggregation Helpers

- Added src/lib/dashboard/dashboard-data-helpers.ts.
- Updated src/lib/dashboard/index.ts exports.

## Phase 7.6 - Command Dashboard v1

- Added src/components/dashboard/command-dashboard-v1.tsx.
- Updated src/components/dashboard/index.ts exports.

## Phase 7.6B - Wire Command Dashboard v1

- Updated src/app/command/page.tsx to render CommandDashboardV1.
- Used getDashboardDataSummary for read-only Command dashboard summary data.

## Phase 7 Integration Sanity Audit Gate

- Added scripts/audit-integration-sanity.mjs.
- Updated package.json with audit:integration and added it to check.

## Phase 7.7 - Timeline Dashboard v1

- Added src/components/dashboard/timeline-dashboard-v1.tsx.
- Exported TimelineDashboardV1 from src/components/dashboard/index.ts.

## Phase 7.7B - Wire Timeline Dashboard Route

- Updated src/app/timeline/page.tsx to render TimelineDashboardV1.
- Added getDashboardDataSummary and createSupabaseServerClient imports for read-only dashboard summary data.

## Phase 7.8 - Calendar Dashboard v1

- Added src/components/dashboard/calendar-dashboard-v1.tsx.
- Exported CalendarDashboardV1 from src/components/dashboard/index.ts.
- Updated src/app/calendar/page.tsx to render CalendarDashboardV1 above the existing read-only tasks/events list.

## Phase 7.9 - Goals Dashboard v1

- Added src/components/dashboard/goals-dashboard-v1.tsx.
- Exported GoalsDashboardV1 from src/components/dashboard/index.ts.
- Updated src/app/goals/page.tsx to render GoalsDashboardV1 above the existing read-only goals list.

## Phase 7.10 - Proof Dashboard/Card System

- Added src/components/dashboard/proof-dashboard-v1.tsx.
- Exported ProofDashboardV1 from src/components/dashboard/index.ts.
- No app route was added because the current canonical route list does not include `/proof`.

## Phase 7.11 - Pending Updates / Confirmation Drawer Integration

- Added src/components/actions/pending-updates-drawer.tsx.
- Exported PendingUpdatesDrawer from src/components/actions/index.ts.
- Updated src/app/carnos/page.tsx to render the pending updates drawer in place of the earlier preview-only review card section.

## Phase 7.12 - Carnos Panel v1

- Added src/components/dashboard/carnos-panel-v1.tsx.
- Exported CarnosPanelV1 from src/components/dashboard/index.ts.
- Updated src/app/carnos/page.tsx to render CarnosPanelV1 above the pending update review drawer.

## Phase 7.13 - Cross-Dashboard Links

- Added src/components/dashboard/cross-dashboard-links.tsx.
- Exported CrossDashboardLinks from src/components/dashboard/index.ts.
- Updated command-dashboard-v1, timeline-dashboard-v1, calendar-dashboard-v1, goals-dashboard-v1, and carnos-panel-v1 to render canonical cross-dashboard navigation.

## Phase 7.14 - Empty / Loading / Error / Privacy States

- Updated src/components/dashboard/operating-dashboard-card.tsx to handle all DashboardCardStatus values.
- Updated src/lib/dashboard/dashboard-card-registry.ts with error/privacy metadata for confirmation and Carnos cards.

## Phase 7.15 - No-Hardcoded-Demo-Data Cleanup

- Updated src/app/carnos/page.tsx copy around the Phase 6 compatibility review proposal.
- Updated src/components/dashboard/command-dashboard-v1.tsx to remove loaded/demo-style fallback wording.
- Updated src/components/dashboard/proof-dashboard-v1.tsx to clarify component-only proof surface status.
- Updated src/components/dashboard/carnos-panel-v1.tsx generated fallback wording.

## Phase 7.16 - Phase 7 Audit Gate

- Updated scripts/audit-integration-sanity.mjs to validate Phase 7 core operating dashboard surfaces beyond the command dashboard.
- Added audit coverage for CrossDashboardLinks, PendingUpdatesDrawer, ProofDashboardV1 component-only status, and dashboard card state rendering.

## Phase 7.17 - Manual Smoke Checklist

- Added docs/qa/PHASE_7_MANUAL_SMOKE_CHECKLIST.md.
- Documented manual checks for Phase 7 core dashboard routes and safety boundaries.

## Phase 7.18 - Phase 7 Report and Completion Marker

- Added docs/phase-reports/PHASE_7_CORE_OPERATING_DASHBOARDS_REPORT.md.
- Updated scripts/audit-integration-sanity.mjs final Phase 7 boundary coverage and completion wording.
- Updated phase logs/status to mark Phase 7 complete.

## Phase 1-7 Source Crosswalk Verification

- Added docs/audits/PHASE_1_7_SOURCE_CROSSWALK.md.
- Added scripts/audit-phase-1-7-crosswalk.mjs.
- No runtime app behavior changed.

## Phase 8.1 - Career System Plan Lock v2

- Added docs/phase-plans/PHASE_8_CAREER_SYSTEM.md.
- No runtime code changed.

## Phase 8.2 - Career Route and Data Contract Inspection

- Added docs/phase-reports/PHASE_8_2_CAREER_INSPECTION_REPORT.md.
- No runtime code changed.

## Phase 8.3 - Career SQL Schema Plan / Migration Design

- Added docs/database/CAREER_SQL_SCHEMA_DESIGN.md.
- No runtime code changed.
- No SQL migration added yet.

## Phase 8.4 - Additive Career SQL Migration

- Added supabase/migrations/0007_career_system_foundation.sql.
- No TypeScript database types updated yet; that belongs to Phase 8.5.
- No runtime UI code changed.

## Phase 8.5 - Database Types Update / Generated Type Alignment

- Updated src/types/database.ts.
- Added Career System database table typings and row/insert/update aliases.
- Runtime UI code unchanged.

## Phase 8.24 — Career System Completion Closeout

### `docs/phase-reports/PHASE_8_CAREER_SYSTEM_COMPLETION_REPORT.md`

Purpose: Final Phase 8 completion report.

### `docs/qa/PHASE_8_CAREER_MANUAL_SMOKE_CHECKLIST.md`

Purpose: Manual browser QA checklist for career routes.

### `scripts/audit-phase-8.mjs`

Change: Expanded Phase 8 audit to require closeout documents.

### `PROJECT_EXECUTION_LOG.md`

Change: Added Phase 8.24 completion closeout entry.

### `PHASE_STATUS.md`

Change: Added Phase 8 complete marker.

### `CHANGELOG.md`

Change: Added Phase 8 completion changelog entry.

Phase 8 Career System Complete marker for final audit closeout.

## Phase 1–8 Retrospective Gap Audit

### `docs/phase-reports/PHASE_1_8_RETROSPECTIVE_GAP_AUDIT.md`

Purpose: Post-Phase-8 audit artifact documenting completed scope, deferred scope, known risks, and Phase 9 guardrails.

### `PROJECT_EXECUTION_LOG.md`

Change: Added retrospective audit entry.

## Phase 9 Chunk A — Source and Route Inspection

### `docs/phase-reports/PHASE_9_CHUNK_A_SOURCE_ROUTE_INSPECTION.md`

Purpose: Records the Phase 9 source-of-truth scope, existing routes, existing repo foundations, migrations, audits, and non-goals before implementation.

### `docs/phase-plans/PHASE_9_LEARNING_PROJECT_SYSTEM.md`

Purpose: Locks Phase 9 as 28 requirement steps executed through 12 safe implementation chunks.

### `PROJECT_EXECUTION_LOG.md`

Change: Added Phase 9 Chunk A start entry.

## Phase 9 Chunk B — Schema Design and Traceability

### `docs/database/PHASE_9_LEARNING_PROJECT_SCHEMA_DESIGN.md`

Purpose: Defines the planned Phase 9 SQL tables, relationships, indexes, RLS expectations, cross-domain links, and non-goals.

### `docs/phase-reports/PHASE_9_SOURCE_TO_SCOPE_TRACEABILITY.md`

Purpose: Maps Phase 9 source-of-truth requirements to planned implementation files and safe execution chunks.

### `PROJECT_EXECUTION_LOG.md`

Change: Added Phase 9 Chunk B execution entry.

## Phase 9 Chunk C — SQL Migration

### `supabase/migrations/0008_learning_project_system_foundation.sql`

Purpose: Adds the Phase 9 Learning / Project System SQL foundation, including learning paths, skills, sessions, quizzes, projects, milestones, bugs, tests, releases, links, RLS policies, and indexes.

### `PROJECT_EXECUTION_LOG.md`

Change: Added Phase 9 Chunk C SQL migration entry.

## Phase 9 Chunk C.1 — Parent Ownership Hardening

### `supabase/migrations/0009_phase9_parent_ownership_guards.sql`

Purpose: Replaces Phase 9 insert/update policies with stricter parent ownership checks so child rows cannot link to another user's parent records.

### `PROJECT_EXECUTION_LOG.md`

Change: Added Phase 9 Chunk C.1 hardening entry.

## Phase 9 Chunk D — Database Types

### `src/types/database.ts`

Purpose: Adds Phase 9 Learning / Project System table definitions and exported row/insert/update aliases.

### `PROJECT_EXECUTION_LOG.md`

Change: Added Phase 9 Chunk D database types entry.

## Phase 9 Chunk E — Learning and Project Read Helpers

### `src/lib/repositories/core-read.ts`

Purpose: Adds read-only, user-scoped repository helpers for Phase 9 Learning / Project System records.

### `PROJECT_EXECUTION_LOG.md`

Change: Added Phase 9 Chunk E read helper entry.

## Phase 9 Chunk F — Aggregation, Registry, and Shared UI Primitives

### `src/lib/dashboard/dashboard-layout-contract.ts`

Purpose: Extends supported dashboard surfaces to include Phase 9 learning and projects.

### `src/lib/dashboard/dashboard-card-registry.ts`

Purpose: Adds Phase 9 dashboard cards for learning mastery and project shipping surfaces.

### `src/lib/dashboard/learning-project-dashboard-data-helpers.ts`

Purpose: Aggregates Phase 9 learning/project read-helper data into dashboard summaries.

### `src/components/dashboard/learning-project-summary-panel.tsx`

Purpose: Adds shared UI primitive for Phase 9 summary metric panels.

### `src/lib/dashboard/index.ts`

Change: Exports Phase 9 aggregation helpers.

### `src/components/dashboard/index.ts`

Change: Exports Phase 9 shared UI primitive.

## Phase 9 Chunk G — Learning Academy Dashboard

### `src/components/dashboard/learning-academy-dashboard-v1.tsx`

Purpose: Adds read-only Learning Academy dashboard UI for Phase 9 skill paths, skills, learning sessions, quizzes, attempts, and skill progress.

### `src/app/learning/page.tsx`

Purpose: Wires `/learning` to authenticated Phase 9 learning reads instead of the generic domain placeholder.

### `src/components/dashboard/index.ts`

Change: Exports the Learning Academy dashboard component.

## Phase 9 Chunk H — Project Builder Dashboard

### `src/components/dashboard/project-builder-dashboard-v1.tsx`

Purpose: Adds read-only Project Builder dashboard UI for Phase 9 projects, milestones, bugs, tests, releases, and links.

### `src/app/projects/page.tsx`

Purpose: Wires `/projects` to authenticated Phase 9 project reads instead of a placeholder page.

### `src/components/dashboard/index.ts`

Change: Exports the Project Builder dashboard component.

## Phase 9 Chunk I — Knowledge Route Alignment

### `src/components/dashboard/knowledge-vault-alignment-v1.tsx`

Purpose: Adds read-only Knowledge Vault alignment UI for Phase 9 learning/project source records.

### `src/app/knowledge/page.tsx`

Purpose: Wires `/knowledge` to authenticated Phase 9 learning/project source reads.

### `src/components/dashboard/index.ts`

Change: Exports the Knowledge Vault alignment dashboard component.

## Phase 9 Chunk J — Learning/Project Detail Panels

### `src/components/dashboard/learning-project-detail-panels.tsx`

Purpose: Adds read-only detail panels for skill path/progress, quiz/session, and project build-log views.

### `src/components/dashboard/learning-academy-dashboard-v1.tsx`

Change: Adds skill path/progress and quiz/session detail panels.

### `src/components/dashboard/project-builder-dashboard-v1.tsx`

Change: Adds project build-log detail panel.

### `src/components/dashboard/index.ts`

Change: Exports Phase 9 detail panels.

## Phase 9 Chunk K — Linkage and State Surfaces

### `src/components/dashboard/learning-project-linkage-panels.tsx`

Purpose: Adds read-only linkage, proposed-action visibility, state/privacy boundary, and cross-link panels for Phase 9.

### `src/components/dashboard/learning-academy-dashboard-v1.tsx`

Change: Wires Phase 9 linkage, operating, proposed-action, state, and cross-link panels into `/learning`.

### `src/components/dashboard/project-builder-dashboard-v1.tsx`

Change: Wires Phase 9 linkage, operating, proposed-action, state, and cross-link panels into `/projects`.

### `src/components/dashboard/knowledge-vault-alignment-v1.tsx`

Change: Adds Phase 9 state boundary and cross-links to `/knowledge`.

### `src/components/dashboard/index.ts`

Change: Exports Phase 9 linkage panels.

## Phase 9 Chunk L — Closeout

### `docs/phase-reports/PHASE_9_NO_WRITE_PRIVACY_AUDIT.md`

Purpose: Records Phase 9 read-only, no-write, privacy, and deferred-scope audit.

### `docs/phase-reports/PHASE_9_AUDIT_GATE.md`

Purpose: Records Phase 9 implementation audit gate and completed chunks.

### `docs/phase-reports/PHASE_9_MANUAL_SMOKE_CHECKLIST.md`

Purpose: Defines browser smoke checks for `/learning`, `/projects`, and `/knowledge`.

### `docs/phase-reports/PHASE_9_COMPLETION_REPORT.md`

Purpose: Final Phase 9 closeout report.

### `PHASE_STATUS.md`

Change: Marks Phase 9 complete and sets Phase 10 as the next step.

## Phase 10 Chunk A — Source and Route Inspection

### `docs/phase-plans/PHASE_10_RESEARCH_STANFORD_SYSTEM.md`

Purpose: Locks the upgraded 36-step Phase 10 Research / Stanford System plan and 11-chunk build sequence.

### `docs/phase-reports/PHASE_10_CHUNK_A_SOURCE_ROUTE_INSPECTION.md`

Purpose: Records initial source, route, component, proposed-action, database-type, read-helper, and migration inspection for Phase 10.

## Phase 10 Chunk B — Schema Design and Traceability

### `docs/database/PHASE_10_RESEARCH_SCHEMA_DESIGN.md`

Purpose: Designs the Phase 10 research-side schema before SQL implementation.

### `docs/database/PHASE_10_STANFORD_PHD_SCHEMA_DESIGN.md`

Purpose: Designs the Phase 10 Stanford/PhD readiness schema before SQL implementation.

### `docs/phase-reports/PHASE_10_SOURCE_TO_SCOPE_TRACEABILITY.md`

Purpose: Maps Phase 10 scope to existing foundations, safe-link strategy, and deferred future phases.

## Phase 10 Chunk C — SQL Foundation

### `supabase/migrations/0010_phase10_research_stanford_foundation.sql`

Purpose: Adds Phase 10 Research / Stanford System SQL foundation tables, RLS enablement, owner-scoped SELECT/INSERT policies, and required user indexes.

## Phase 10 Chunk C.1 — Parent Ownership Guards

### `supabase/migrations/0011_phase10_parent_ownership_guards.sql`

Purpose: Adds Phase 10 parent ownership guard functions and triggers for nullable cross-phase references.

## Phase 10 Chunk D — Database Types

### `src/types/database.ts`

Purpose: Adds Phase 10 Research / Stanford System table mappings and exported aliases for use by read helpers and dashboards.

## Phase 10 Chunk E — Read Helpers

### `src/lib/repositories/research-read.ts`

Purpose: Adds read-only server repository helpers for Phase 10 Research / Stanford / Literature / Citation data.

### `src/lib/repositories/index.ts`

Purpose: Exports Phase 10 research read helpers from the repository barrel.

## Phase 10 Chunk F — Aggregation, Registry, Shared UI

### `src/lib/dashboard/research-stanford-dashboard-data-helpers.ts`

Purpose: Aggregates Phase 10 read-helper outputs into research and Stanford dashboard summaries.

### `src/lib/dashboard/dashboard-layout-contract.ts`

Purpose: Adds `research_lab` and `research_stanford` as supported dashboard surfaces.

### `src/lib/dashboard/dashboard-card-registry.ts`

Purpose: Adds Phase 10 dashboard card contracts for research and Stanford surfaces.

### `src/components/dashboard/research-summary-panel.tsx`

Purpose: Adds a shared read-only research summary panel primitive.

## Phase 10 Chunk G — Route Read Surfaces

### `src/app/research-lab/page.tsx`

Purpose: Replaces the Research Lab placeholder with an authenticated read-only route showing research idea, literature, citation, claim, experiment, paper, and registry summary state.

### `src/app/research-stanford/page.tsx`

Purpose: Replaces the Research Stanford placeholder with an authenticated read-only route showing university, lab, professor, readiness, SOP, asset, recommendation, and registry summary state.

## Phase 10 Chunk H — Research Linkage and Boundary Panels

### `src/components/dashboard/research-linkage-boundary-panels.tsx`

Purpose: Adds read-only research/proof linkage visibility, Stanford target-fit linkage visibility, and privacy/safe-write boundary panels.

### `src/app/research-lab/page.tsx`

Purpose: Wires Research Lab linkage visibility and boundary panels into the authenticated read route.

### `src/app/research-stanford/page.tsx`

Purpose: Wires Stanford/PhD linkage visibility and boundary panels into the authenticated read route.

## Phase 10 Chunk I — Detail Visibility Panels

### `src/components/dashboard/research-detail-panels.tsx`

Purpose: Adds compact read-only detail panels for research and Stanford/PhD Phase 10 records.

### Research routes

Purpose: Wires detail visibility panels into `/research-lab` and `/research-stanford`.

## Phase 10 Chunk J — Proposed-Action Visibility, Cross-Links, Audit Draft

### `src/components/dashboard/research-proposed-action-visibility-panel.tsx`

Purpose: Adds disabled read-only research proposed-action preview cards.

### `src/components/dashboard/cross-dashboard-links.tsx`

Purpose: Adds ResearchCrossDashboardLinks for Phase 10 routes.

### `scripts/audit-phase-10.mjs`

Purpose: Adds the Phase 10 structural audit gate.

### `docs/qa/PHASE_10_RESEARCH_STANFORD_MANUAL_SMOKE_CHECKLIST.md`

Purpose: Adds manual QA checklist for Research / Stanford System.

### `docs/phase-reports/PHASE_10_RESEARCH_STANFORD_COMPLETION_REPORT_DRAFT.md`

Purpose: Adds draft closeout report for Phase 10.

## Phase 10 Chunk K — Final Closeout

### `docs/phase-reports/PHASE_10_RESEARCH_STANFORD_COMPLETION_REPORT.md`

Purpose: Final Phase 10 closeout report for the Research / Stanford System.

### `docs/phase-reports/PHASE_10_RESEARCH_STANFORD_COMPLETION_REPORT_DRAFT.md`

Change: Removed after final report was created.

### `docs/qa/PHASE_10_RESEARCH_STANFORD_MANUAL_SMOKE_CHECKLIST.md`

Purpose: Final manual browser smoke checklist for `/research-lab` and `/research-stanford`.

### `PHASE_STATUS.md`

Change: Marks Phase 10 complete and sets Phase 11 — Health / Body System as the next recommended phase.

### `PROJECT_EXECUTION_LOG.md`

Change: Records Phase 10 Chunk K final closeout.

### `CHANGELOG.md`

Change: Records Phase 10 completion.

### `CODE_LEDGER.md`

Change: Records final Phase 10 closeout file purposes.

## Phase 11 Chunk A — Plan Lock Start

### `CODE_SNAPSHOT.md`

Purpose: Regenerated pre-phase code snapshot before Phase 11 implementation.

### `docs/phase-plans/PHASE_11_HEALTH_BODY_SYSTEM.md`

Purpose: Locks the Phase 11 Health / Body System plan, 44-step build sequence, source scope, route scope, SQL table scope, hardening additions, safety boundaries, chunk plan, and completion criteria.

## Phase 11 Chunk B1 — Schema Design / Privacy Review / Traceability

### `docs/database/PHASE_11_HEALTH_BODY_SCHEMA_DESIGN.md`

Purpose: Designs Phase 11 source-confirmed health/body tables, candidate fields, ownership pattern, indexes, constraints, RLS strategy, and read-first boundaries before SQL migration.

### `docs/phase-reports/PHASE_11_HEALTH_PRIVACY_SAFETY_REVIEW.md`

Purpose: Locks privacy and safety boundaries for sensitive health/body, sleep, supplement, body-image, emotion, journal, and photo-reference surfaces.

### `docs/phase-reports/PHASE_11_SOURCE_TO_SCOPE_TRACEABILITY.md`

Purpose: Maps Phase 11 source-confirmed routes and tables to implementation scope and identifies deferred/source-referenced items.

## Phase 11 Chunk B2 — Baseline / Units / Sleep / Photo Boundary

### `docs/phase-reports/PHASE_11_BASELINE_UNITS_SLEEP_PHOTO_BOUNDARY.md`

Purpose: Locks baseline handling, unit clarity, daily sleep tracking, Carnos sleep natural-language proposal boundary, and progress photo/storage honesty before SQL or UI work.

### `docs/database/PHASE_11_HEALTH_BODY_SCHEMA_DESIGN.md`

Purpose: Updated with B2 hardening decision notes for baselines, units, daily sleep, natural-language sleep capture, and progress photo honesty.

## Phase 11 Chunk B3 — Safety / Data Quality / Targets / Trend Boundary

### `docs/phase-reports/PHASE_11_SAFETY_DATA_TARGET_TREND_BOUNDARY.md`

Purpose: Locks medical/supplement/body-image safety, emotion/journal safety, data quality, duplicate-log handling, target comparison strategy, and simple trend preview boundaries.

### `docs/phase-reports/PHASE_11_HEALTH_PRIVACY_SAFETY_REVIEW.md`

Purpose: Updated with B3 safety hardening addendum.

### `docs/database/PHASE_11_HEALTH_BODY_SCHEMA_DESIGN.md`

Purpose: Updated with B3 safety, duplicate-log, missing-vs-zero, target, and trend decision notes.

## Phase 11 Chunk C — SQL Foundation

### `supabase/migrations/0012_phase11_health_body_foundation.sql`

Purpose: Creates the source-confirmed Phase 11 health/body SQL tables with owner-scoped RLS, updated_at triggers, and basic indexes.

Boundary: Parent ownership triggers are deferred to Chunk C.1. Candidate tables such as `health_body_baselines` and `progress_photos` are not created.

## Phase 11 Chunk C.1 — Parent Ownership Guards

### `supabase/migrations/0013_phase11_parent_ownership_guards.sql`

Purpose: Adds Phase 11 parent ownership validation functions and before insert/update triggers for Phase 11 tables with parent foreign keys.

Boundary: No new tables, TypeScript types, read helpers, routes, dashboards, storage behavior, or Carnos writes are added.

## Phase 11 Chunk D — Database Types

### `src/types/database.ts`

Purpose: Adds TypeScript database table definitions and aliases for Phase 11 health/body tables.

Boundary: No SQL, repositories, read helpers, dashboards, routes, storage/upload behavior, or Carnos writes are added.

## Phase 11 Chunk D Repair — Actual Database Types

### `src/types/database.ts`

Purpose: Adds the actual TypeScript table definitions and aliases for the 16 Phase 11 health/body SQL tables after the previous Chunk D commit only updated documentation/log files.

Boundary: No SQL, repositories, read helpers, dashboards, routes, storage/upload behavior, or Carnos writes are added.

## Phase 11 Chunk E1 — Read Helper Foundation

### `src/lib/repositories/health-body-read.ts`

Purpose: Provides read-only repository list helpers for the 16 Phase 11 health/body SQL tables.

### `src/lib/repositories/index.ts`

Purpose: Exports the health/body read helper module.

Boundary: No writes, mutations, SQL, dashboards, routes, storage/upload behavior, or Carnos actions are added.

## Phase 11 Chunk E2 — Dashboard Summary Helper Foundation

### `src/lib/dashboard/health-body-dashboard-data-helpers.ts`

Purpose: Provides read-only health/body dashboard summary aggregation over Phase 11 repository helpers.

### `src/lib/dashboard/index.ts`

Purpose: Exports the health/body dashboard summary helper module.

Boundary: No writes, mutations, SQL, dashboards, routes, storage/upload behavior, or Carnos actions are added.

## Phase 11 Chunk E3 — Read Helper Schema-Boundary Audit

### `docs/phase-reports/PHASE_11_READ_HELPER_SCHEMA_BOUNDARY_AUDIT.md`

Purpose: Documents and locks the read-helper schema contract before Phase 11 UI aggregation/dashboard work.

Boundary: No code mutation surface, SQL migration, type change, write helper, route, dashboard, storage/upload behavior, Python/ML execution, or Carnos action was added.

### E3 Verification Repair — `src/lib/dashboard/health-body-dashboard-data-helpers.ts`

Purpose: Added exercise summary coverage so the dashboard summary helper covers all 16 confirmed Phase 11 source tables.

## Health Body Overview Cards

### `src/components/dashboard/health-body-dashboard-v1.tsx`

Purpose: Provides a read-only health/body overview component with dashboard metric cards sourced from existing summary helpers.

### `src/components/dashboard/index.ts`

Purpose: Exports the health/body overview dashboard component.

Boundary: No writes, route rewiring, SQL migration, storage/upload behavior, or Carnos action was added.

## Health Body Dashboard States

### `src/components/dashboard/health-body-dashboard-states.tsx`

Purpose: Provides shared read-only state components for the health/body dashboard, including empty, warning, privacy, and boundary states.

### `src/components/dashboard/health-body-dashboard-v1.tsx`

Purpose: Consumes shared state components while remaining a read-only dashboard overview.

### `src/components/dashboard/index.ts`

Purpose: Exports health/body dashboard state components.

Schema: No schema change needed.

Boundary: No writes, route rewiring, SQL migration, database type change, storage/upload behavior, or Carnos action was added.

## Body Dashboard Route Wiring

### `src/app/body/page.tsx`

Purpose: Wires the `/body` route to the read-only health/body dashboard overview while preserving Phase 5 compatibility markers.

Schema: No schema change needed.

Boundary: No writes, SQL migration, database type change, storage/upload behavior, or Carnos action was added.

## Nutrition Dashboard Route Wiring

### `src/app/nutrition/page.tsx`

Purpose: Wires `/nutrition` to a protected, read-only nutrition dashboard.

### `src/components/dashboard/health-body-nutrition-dashboard-v1.tsx`

Purpose: Provides a nutrition-focused read-only dashboard for nutrition logs, meal items, supplements, and recent related health signals.

### `src/components/dashboard/health-body-dashboard-states.tsx`

Purpose: Fixed a small text spacing typo in the read-only boundary notice.

### `src/components/dashboard/index.ts`

Purpose: Exports the nutrition dashboard component.

Schema: No schema change needed.

Boundary: No writes, SQL migration, database type change, storage/upload behavior, or Carnos action was added.

## Supplements Dashboard Route Wiring

### `src/app/supplements/page.tsx`

Purpose: Wires `/supplements` to a protected, read-only supplements dashboard.

### `src/components/dashboard/health-body-supplements-dashboard-v1.tsx`

Purpose: Provides a supplement-focused read-only dashboard for supplements, active supplement records, supplement logs, products, and safety boundaries.

### `src/components/dashboard/health-body-dashboard-states.tsx`

Purpose: Fixed a small text spacing typo in the read-only boundary notice.

### `src/components/dashboard/index.ts`

Purpose: Exports the supplements dashboard component.

Schema: No schema change needed.

Boundary: No writes, SQL migration, database type change, storage/upload behavior, or Carnos action was added.

## Sleep Energy Dashboard Route Wiring

### `src/app/sleep-energy/page.tsx`

Purpose: Wires `/sleep-energy` to a protected, read-only sleep energy dashboard.

### `src/components/dashboard/health-body-sleep-energy-dashboard-v1.tsx`

Purpose: Provides a sleep-and-energy-focused read-only dashboard for sleep logs, energy logs, mental health logs, and recent recovery signals.

### `src/components/dashboard/health-body-dashboard-states.tsx`

Purpose: Cleaned a small text spacing issue in the shared read-only boundary notice.

### `src/components/dashboard/health-body-nutrition-dashboard-v1.tsx`

Purpose: Cleaned small text spacing issues in nutrition dashboard copy.

### `src/components/dashboard/health-body-supplements-dashboard-v1.tsx`

Purpose: Cleaned small text spacing issues in supplements dashboard copy.

### `src/components/dashboard/index.ts`

Purpose: Exports the sleep energy dashboard component.

Schema: No schema change needed.

Boundary: No writes, SQL migration, database type change, storage/upload behavior, or Carnos action was added.

## Emotion Dashboard Route Wiring

### `src/app/emotion/page.tsx`

Purpose: Wires `/emotion` to a protected, read-only emotion dashboard.

### `src/components/dashboard/health-body-emotion-dashboard-v1.tsx`

Purpose: Provides an emotion-and-mental-state-focused read-only dashboard for emotion logs, mental health logs, journal entries, and recent related signals.

### `src/components/dashboard/health-body-dashboard-states.tsx`

Purpose: Cleaned a small text spacing issue in the shared read-only boundary notice.

### `src/components/dashboard/health-body-nutrition-dashboard-v1.tsx`

Purpose: Cleaned small text spacing issues in nutrition dashboard copy.

### `src/components/dashboard/health-body-supplements-dashboard-v1.tsx`

Purpose: Cleaned small text spacing issues in supplements dashboard copy.

### `src/components/dashboard/health-body-sleep-energy-dashboard-v1.tsx`

Purpose: Cleaned small text spacing issues in sleep energy dashboard copy.

### `src/components/dashboard/index.ts`

Purpose: Exports the emotion dashboard component.

Schema: No schema change needed.

Boundary: No writes, SQL migration, database type change, storage/upload behavior, or Carnos action was added.

## Hair Skincare Dashboard Route Wiring

### `src/app/hair-skincare/page.tsx`

Purpose: Wires `/hair-skincare` to a protected, read-only haircare and skincare dashboard.

### `src/components/dashboard/health-body-hair-skincare-dashboard-v1.tsx`

Purpose: Provides a haircare-and-skincare-focused read-only dashboard for skincare logs, haircare logs, products, active products, and sensitive appearance-related boundaries.

### `src/components/dashboard/health-body-dashboard-states.tsx`

Purpose: Cleaned a small text spacing issue in the shared read-only boundary notice.

### `src/components/dashboard/health-body-nutrition-dashboard-v1.tsx`

Purpose: Cleaned small text spacing issues in nutrition dashboard copy.

### `src/components/dashboard/health-body-supplements-dashboard-v1.tsx`

Purpose: Cleaned small text spacing issues in supplements dashboard copy.

### `src/components/dashboard/health-body-sleep-energy-dashboard-v1.tsx`

Purpose: Cleaned small text spacing issues in sleep energy dashboard copy.

### `src/components/dashboard/health-body-emotion-dashboard-v1.tsx`

Purpose: Cleaned small text spacing issues in emotion dashboard copy.

### `src/components/dashboard/index.ts`

Purpose: Exports the hair skincare dashboard component.

Schema: No schema change needed.

Boundary: No writes, SQL migration, database type change, storage/upload behavior, or Carnos action was added.

## Health/Body Detail Panel Pattern Report

### `docs/phase-reports/PHASE_11_HEALTH_BODY_DETAIL_PANEL_PATTERN_REPORT.md`

Purpose: Locks the read-only detail-panel implementation pattern for Phase 11 before health/body detail panels are created.

Schema: No schema change needed.

Boundary: No writes, SQL migration, database type change, storage/upload behavior, visual evidence storage, or Carnos action was added.

## Health/Body Detail Panels

### `src/components/dashboard/health-body-detail-panels.tsx`

Purpose: Provides reusable read-only detail panels for body/training, nutrition/meals, supplements, sleep/energy, emotion/reflection, and haircare/skincare records.

### `src/components/dashboard/index.ts`

Purpose: Exports the reusable health/body detail panels.

Schema: No schema change needed.

Boundary: No writes, SQL migration, database type change, storage/upload behavior, visual evidence storage, or Carnos action was added.

## Health/Body Detail Panel Attachment

### `src/lib/dashboard/health-body-dashboard-data-helpers.ts`

Purpose: Adds read-only detail row arrays to the existing health/body dashboard data result using existing repository read helpers.

### Health/body dashboard components

Purpose: Attach the reusable read-only detail panels to `/body`, `/nutrition`, `/supplements`, `/sleep-energy`, `/emotion`, and `/hair-skincare` dashboard surfaces.

Schema: No schema change needed.

Boundary: No writes, SQL migration, database type change, storage/upload behavior, visual evidence storage, or Carnos action was added.

## Health/Body Linkage Visibility

### `src/components/dashboard/health-body-linkage-panels.tsx`

Purpose: Provides read-only proof, goal, task, daily-log, and event linkage visibility for health/body records.

### Health/body dashboard components

Purpose: Attach the linkage visibility panel to body, nutrition, supplements, sleep-energy, emotion, and hair-skincare surfaces.

Schema: No schema change needed.

Boundary: No writes, SQL migration, database type change, storage/upload behavior, visual evidence storage, or Carnos action was added.

## Health/Body Proposed-Action and State Boundaries

### `src/components/dashboard/health-body-action-boundary-panels.tsx`

Purpose: Provides preview-only proposed-action visibility, read-state/privacy boundary language, and cross-route links for health/body surfaces.

### Health/body dashboard components

Purpose: Attach proposed-action visibility, state boundary, and cross-route consistency panels to body, nutrition, supplements, sleep-energy, emotion, and hair-skincare surfaces.

Schema: No schema change needed.

Boundary: No writes, SQL migration, database type change, storage/upload behavior, visual evidence storage, or Carnos execution was added.

## Health/Body Audit Gate

### `scripts/audit-phase-11.mjs`

Purpose: Verifies Phase 11 health/body files, SQL/type/read contracts, dashboard exports, route wiring, safety language, deferred-table boundaries, and no-write/no-automation constraints.

### `docs/qa/PHASE_11_HEALTH_BODY_MANUAL_SMOKE_CHECKLIST.md`

Purpose: Manual smoke checklist for the six health/body dashboard routes.

### `docs/phase-reports/PHASE_11_HEALTH_BODY_AUDIT_GATE.md`

Purpose: Locks Phase 11 verification gates, protected boundaries, and deferred scope.

### `package.json`

Purpose: Adds `audit:phase11` and includes it in `npm run check`.

Schema: No schema change needed.

Boundary: No writes, SQL migration, database type change, storage/upload behavior, visual evidence storage, or Carnos execution was added.

## Phase 11 Health/Body System Complete

### `docs/phase-reports/PHASE_11_HEALTH_BODY_COMPLETION_REPORT.md`

Purpose: Final Phase 11 closeout report covering completed scope, routes, SQL foundation, verification gates, protected boundaries, deferred scope, and next-step boundary.

### `scripts/audit-phase-11.mjs`

Purpose: Now requires the Phase 11 completion report as part of the automated Phase 11 audit gate.

### `PROJECT_EXECUTION_LOG.md`

Purpose: Records Phase 11 final closeout.

### `CODE_LEDGER.md`

Purpose: Records Phase 11 final closeout file purposes.

### `CHANGELOG.md`

Purpose: Records Phase 11 completion.

### `PHASE_STATUS.md`

Purpose: Marks Phase 11 complete and points to source-of-truth inspection before Phase 12.

Schema: No schema change needed.

Boundary: No writes, SQL migration, database type change, storage/upload behavior, visual evidence storage, baseline table, analytics snapshot table, Carnos execution, Python/ML execution, memory/RAG, voice, or background job was added.

## Phase 12 C02 Plan Lock

### `docs/phase-plans/PHASE_12_LIFE_ADMIN_FINANCE_DAILY_ADMIN_SYSTEM.md`

Purpose: Locks Phase 12 as Life Admin + Finance + Daily Admin Queue with user-specific housing correction, deferred scope, safety boundaries, step count, code chunk count, and acceptance criteria.

### `docs/phase-reports/PHASE_12_C01_SOURCE_ROUTE_INSPECTION.md`

Purpose: Records C01 source/route inspection findings for Life Admin, Finance, Housing, Documents, Command, Calendar, and source-confirmed tables.

### `docs/roadmap/POST_V1_EXPANSION_ROADMAP.md`

Purpose: Adds post-v1 expansion Phases 22–26 without renumbering or changing the core FINAL_SYNCED v1 roadmap.

Schema: No schema change needed.

Boundary: No app code, SQL migration, database type change, repository helper, route implementation, dashboard implementation, Carnos execution, Python/ML execution, background job, bank sync, document upload, auto-pay, or write behavior was added.

## Phase 12 C03 Schema Design

### `docs/database/PHASE_12_LIFE_ADMIN_FINANCE_SCHEMA_DESIGN.md`

Purpose: Designs Phase 12 financial accounts, budget categories, financial logs, subscriptions, housing admin records, housing contacts, documents, Daily Admin Queue aggregation, severity logic, indexes, RLS, and parent ownership guard requirements.

### `docs/phase-reports/PHASE_12_LIFE_ADMIN_PRIVACY_SAFETY_REVIEW.md`

Purpose: Records privacy and safety boundaries for finance, documents, housing, Carnos, and dashboard UI.

### `docs/phase-reports/PHASE_12_SOURCE_TO_SCOPE_TRACEABILITY.md`

Purpose: Maps FINAL_SYNCED source dashboards/tables to Phase 12 implementation scope and records user-specific housing correction.

Schema: No SQL schema change in C03.

Boundary: No app code, SQL migration, database type change, repository helper, route implementation, dashboard implementation, Carnos execution, Python/ML execution, background job, bank sync, document upload, auto-pay, or write behavior was added.

## Phase 12 C04 — Life Admin / Finance SQL Foundation

Files:

- `supabase/migrations/0014_phase12_life_admin_finance_foundation.sql`
- `PROJECT_EXECUTION_LOG.md`
- `CODE_LEDGER.md`
- `CHANGELOG.md`
- `PHASE_STATUS.md`

Summary:

- Added Phase 12 SQL tables for finance, budget, subscriptions, housing admin, contacts, and document metadata.
- Added RLS and indexes.
- Preserved read/write safety boundaries.
- Deferred parent ownership guards to C05.

## Phase 12 C05 — Parent Ownership Guards

Files:

- `supabase/migrations/0015_phase12_parent_ownership_guards.sql`
- `PROJECT_EXECUTION_LOG.md`
- `CODE_LEDGER.md`
- `CHANGELOG.md`
- `PHASE_STATUS.md`

Summary:

- Added SQL parent ownership guard helper and table-specific triggers.
- Guarded Phase 12 cross-table links against cross-user parent references.
- Preserved SQL-only boundary.

## Phase 12 C06 — SQL Validation Closeout

Files:

- `docs/phase-reports/PHASE_12_SQL_FOUNDATION_VALIDATION_REPORT.md`
- `PROJECT_EXECUTION_LOG.md`
- `CODE_LEDGER.md`
- `CHANGELOG.md`
- `PHASE_STATUS.md`

Summary:

- Added SQL foundation validation report.
- Confirmed C04/C05 SQL foundation scope and boundaries.
- Prepared handoff into database type contracts.

## Phase 12 C07 — Database Type Contracts

Files:

- `src/types/database.ts`
- `PROJECT_EXECUTION_LOG.md`
- `CODE_LEDGER.md`
- `CHANGELOG.md`
- `PHASE_STATUS.md`

Summary:

- Added database table contracts for manual finance accounts, budget categories, financial logs, subscriptions, document metadata, housing admin records, and housing contacts.
- Added exported row/insert/update aliases for Life Admin / Finance read-helper work.
- Preserved SQL and UI boundaries.

## C08 — Admin and Finance Read Helpers

Files changed:

- `src/lib/repositories/admin-finance-read.ts`
- `src/lib/repositories/index.ts`
- `PROJECT_EXECUTION_LOG.md`
- `CODE_LEDGER.md`
- `CHANGELOG.md`
- `PHASE_STATUS.md`

Purpose:

- Add read-only server repository helpers for the admin and finance tables created earlier.
- Keep UI/dashboard work deferred to the next chunks.

Exports added:

- `listFinancialAccounts`
- `listBudgetCategories`
- `listFinancialLogs`
- `listSubscriptions`
- `listLifeAdminDocuments`
- `listHousingOptions`
- `listHousingContacts`

## Phase 12 C09 — Admin / Finance Dashboard Aggregation Helpers

Files added:

- `src/lib/dashboard/admin-finance-dashboard-data-helpers.ts`

Files modified:

- `PROJECT_EXECUTION_LOG.md`
- `CODE_LEDGER.md`
- `CHANGELOG.md`
- `PHASE_STATUS.md`

Technical summary:

- Added `getAdminFinanceDashboardDataSummary(userId)`.
- Added summary and detail-row contracts for admin/finance dashboards.
- Added read-only counts for finance, subscription, document, and housing admin records.
- Added due-soon/overdue calculations.
- Added warning collection pattern matching Health/Body helper style.

Safety:

- Read-only helper only.
- No writes.
- No Supabase browser client.
- No route or dashboard rendering changes.

## C10 — Admin / Finance Dashboard Components

Files added:

- `src/components/dashboard/admin-finance-dashboard-v1.tsx`

Files modified:

- `src/components/dashboard/index.ts`
- `PROJECT_EXECUTION_LOG.md`
- `CODE_LEDGER.md`
- `CHANGELOG.md`
- `PHASE_STATUS.md`

Summary:

- Added `LifeAdminDashboardV1`.
- Added `FinanceDashboardV1`.
- Added `DocumentsDashboardV1`.
- Added `HousingDashboardV1`.
- Added shared read-only state, warning, privacy, and proposed-action boundary panels.
- Exported the components for route wiring in the next chunk.

## C11 — Admin / Finance Route Wiring

Files modified:

- `src/app/life-admin/page.tsx`
- `src/app/finance/page.tsx`
- `src/app/documents/page.tsx`
- `src/app/housing/page.tsx`
- `PROJECT_EXECUTION_LOG.md`
- `CODE_LEDGER.md`
- `CHANGELOG.md`
- `PHASE_STATUS.md`

Summary:

- Connected Life Admin, Finance, Documents, and Housing routes to authenticated read-only dashboard components.
- Preserved server-rendered authenticated shell pattern.
- Removed placeholder page usage from these four routes.

Safety:

- Read-only route wiring only.
- No SQL, repository, helper, component, write, or AI execution changes.

## Phase 12 C12 — Command Admin/Finance Visibility

- `src/app/command/page.tsx` — fetched `getAdminFinanceDashboardDataSummary(user.id)` next to the existing core Command summary and passed it into `CommandDashboardV1`.
- `src/components/dashboard/command-dashboard-v1.tsx` — added a read-only admin/finance visibility section with admin queue, overdue, due-soon, subscription, document, housing, warning, boundary, and source-table visibility.
- `src/lib/dashboard/index.ts` — exported `admin-finance-dashboard-data-helpers` through the dashboard helper barrel.
- No SQL, type, repository, script, package, direct write, proposed-action execution, AI, or background-job code was added.

## Phase 12 C13 — Calendar Admin/Finance Deadline Visibility

- `src/app/calendar/page.tsx` — fetched `getAdminFinanceDashboardDataSummary(user.id)` next to the existing Calendar summary and passed it into `CalendarDashboardV1`.
- `src/components/dashboard/calendar-dashboard-v1.tsx` — added a read-only admin/finance deadline visibility section with planned finance, overdue, upcoming subscription, expiring document, housing follow-up, warning, and source-table visibility.
- No SQL, type, repository, helper, script, package, direct write, proposed-action execution, AI, reminder, or background-job code was added.

## Phase 12 C14 — Admin/Finance Proposed-Action Preview Visibility

- `src/components/dashboard/admin-finance-dashboard-v1.tsx` — added disabled proposed-action preview cards for life-admin and finance dashboard surfaces.
- Reused `ProposedActionReviewCard` with all actions disabled and no callbacks wired.
- No SQL, type, repository, helper, route, script, package, direct write, proposal persistence, execution, AI, or background-job code was added.

## Phase 12 C15 — Audit Gate and Safety Validation

- `scripts/audit-phase-12.mjs` — added Phase 12-specific audit gate covering Life Admin + Finance + Daily Admin safety, scope, SQL, read helpers, dashboards, route wiring, Command/Calendar visibility, proposed-action previews, and deferred feature absence.
- `package.json` — added `audit:phase12` and inserted it into `npm run check`.
- No SQL, type, repository, helper, route, dashboard, write flow, proposal execution, AI, payment, upload, scraping, outreach, Python/ML, memory, or background-job feature code was added.

## Phase 12 C16 — Smoke Checklist and Completion Closeout

### `docs/qa/PHASE_12_LIFE_ADMIN_FINANCE_MANUAL_SMOKE_CHECKLIST.md`

Purpose: Manual browser smoke checklist for `/life-admin`, `/finance`, `/documents`, `/housing`, `/command`, and `/calendar`.

### `docs/phase-reports/PHASE_12_SOURCE_TO_SCOPE_CLOSEOUT.md`

Purpose: Confirms Phase 12 source alignment, user-specific housing correction, completed routes/tables, deferred scope, and safe-write-law preservation.

### `docs/phase-reports/PHASE_12_LIFE_ADMIN_FINANCE_COMPLETION_REPORT.md`

Purpose: Final Phase 12 completion report for the Life Admin + Finance + Daily Admin Queue system.

### `scripts/audit-phase-12.mjs`

Change: Requires Phase 12 C16 smoke checklist, source-to-scope closeout, completion report, and C16 log/status markers.

## Phase 12 C17 — Final Verification and Status Lock

Timestamp: 2026-06-27 06:21 UTC

### `PHASE_STATUS.md`

Purpose: Records Phase 12 final completion status and moves the repo to Phase 13 source inspection.

### `PROJECT_EXECUTION_LOG.md`

Purpose: Records final Phase 12 verification gates and completion.

### `CODE_LEDGER.md`

Purpose: Records final Phase 12 closeout ledger entry.

### `CHANGELOG.md`

Purpose: Records final Phase 12 completion marker.

Change: Locked Phase 12 as complete after final audit/check/build verification.

## Phase 12.9 — Pre-Grimoire Gap Lock

Added:
- docs/phase-plans/PHASE_12_9_PRE_GRIMOIRE_CORE_COMPLETION.md
- docs/phase-reports/PHASE_12_9_PRE_GRIMOIRE_GAP_AUDIT.md

Purpose:
- Lock the real partial chunks before Grimoire.
- Prevent accidental counting of placeholder future chunks as complete.

## Phase 12.9B — AI Extraction Route and Zod Contract

Changed:
- src/app/api/ai/extract/route.ts
- src/lib/actions/validate-proposed-action.ts
- docs/phase-reports/PHASE_12_9B_AI_EXTRACTION_ZOD_ROUTE.md

Purpose:
- Complete missing Chunk 09 extraction route and Zod schema marker before Grimoire.

## Phase 12.9C — Pending Update Confirmation Wiring

Changed:
- `src/app/api/actions/[actionId]/approve/route.ts`
- `src/app/api/actions/[actionId]/reject/route.ts`
- `src/components/actions/pending-updates-drawer.tsx`
- `src/app/carnos/page.tsx`
- `docs/phase-reports/PHASE_12_9C_PENDING_UPDATE_CONFIRMATION_WIRING.md`

Purpose:
- Connect persisted pending `ai_actions` rows to confirmation-first approve/reject lifecycle routes.

## Phase 12.9D — Carnos Chat Persistence

- `src/app/api/carnos/messages/route.ts` — authenticated server route for creating/verifying chat sessions and inserting user chat messages.
- `src/components/carnos/carnos-message-composer.tsx` — client composer that calls the server route without browser Supabase access.
- `src/app/carnos/page.tsx` — surfaces the persistence composer in the Carnos dashboard.
- `docs/phase-reports/PHASE_12_9D_CARNOS_CHAT_PERSISTENCE.md` — scope and boundary report.

## Phase 12.9E — Goals / Proof Proposal Creation

- `src/app/api/goals/proposals/route.ts` — server route for creating pending goal/proof proposals.
- `src/components/goals/goal-proof-proposal-composer.tsx` — client composer that posts proposal requests without direct SQL writes.
- `src/app/goals/page.tsx` — wired composer and corrected disabled-creation language.
- `docs/phase-reports/PHASE_12_9E_GOALS_PROOF_PROPOSAL_CREATION.md` — phase report.


## Phase 12.9F — Calendar / Timeline Proposal Creation

- `src/app/api/calendar/proposals/route.ts` — server-owned task proposal API for Calendar and Timeline.
- `src/components/calendar/calendar-timeline-proposal-composer.tsx` — client proposal composer that submits pending task proposals.
- `src/app/calendar/page.tsx` — Calendar page now exposes proposal-first task capture.
- `src/app/timeline/page.tsx` — Timeline page now exposes proposal-first task capture.
- `scripts/audit-pre-grimoire-core-gaps.mjs` — Chunk 07 audit now verifies proposal wiring.
- `docs/phase-reports/PHASE_12_9F_CALENDAR_TIMELINE_PROPOSAL_CREATION.md` — completion report.


## Phase 12.9G — Final Pre-Grimoire Lock

- Added `docs/phase-reports/PHASE_12_9G_FINAL_PRE_GRIMOIRE_LOCK.md`.
- Recorded the final pre-Grimoire status before starting Source Chunk 15 / Phase 13.
- No runtime feature code was added in this lock step.

## Phase 13A — Grimoire Source Scope Lock

- `docs/phase-plans/PHASE_13_GRIMOIRE_ENGINE.md` locks the Phase 13 implementation chunks, required cards, data sources, safety boundaries, non-goals, and completion definition.
- `docs/phase-reports/PHASE_13_A_GRIMOIRE_SOURCE_SCOPE_LOCK.md` records the source-backed Grimoire findings before code implementation.

## Phase 13B — Grimoire SQL Schema Design

- docs/database/PHASE_13_GRIMOIRE_SCHEMA_DESIGN.md defines the source-backed Grimoire schema, ownership model, RLS strategy, indexes, parent guard strategy, deferred scope, and 13C migration plan.

## Phase 13C — Grimoire SQL Migration and RLS

- `supabase/migrations/0016_phase13_grimoire_foundation.sql` adds Grimoire tables, RLS policies, constraints, indexes, and updated-at triggers.
- `supabase/migrations/0017_phase13_parent_ownership_guards.sql` adds Phase 13 parent ownership guard functions and triggers.

## Phase 13D — Grimoire Database Types and Read Helpers

- Added Grimoire database aliases and read repository exports.

## Phase 13E — Grimoire Dashboard Aggregation Helper

- `src/lib/dashboard/grimoire-dashboard-data-helpers.ts` aggregates Grimoire read helper output into summary/detail rows.
- `src/lib/dashboard/index.ts` exports the Grimoire dashboard helper.\n\n## Phase 13F — Core Grimoire Dashboard UI

- `src/components/dashboard/grimoire-dashboard-v1.tsx` renders read-only Grimoire dashboard sections from `getGrimoireDashboardDataSummary`.
- `src/app/grimoire/page.tsx` now uses `AuthenticatedDashboardShell` and `GrimoireDashboardV1`.
- `src/components/dashboard/index.ts` exports `GrimoireDashboardV1`.\n

## Phase 13G — Grimoire Mode Selector and Mission Mapping Wiring

- `src/lib/dashboard/dashboard-layout-contract.ts` now supports the `grimoire` dashboard surface.
- `src/lib/dashboard/dashboard-card-registry.ts` now registers Grimoire Mode Selector and Mission Mapping cards.
- `src/components/dashboard/cross-dashboard-links.tsx` exports `GrimoireCrossDashboardLinks`.
- `src/components/dashboard/grimoire-dashboard-v1.tsx` renders Grimoire navigation links.
- `src/lib/dashboard-registry.ts` uses updated Grimoire read-only operating description.

## Phase 13H — Grimoire Symbol-to-Action Translator Preview
- `src/components/dashboard/grimoire-dashboard-v1.tsx`
  - Added disabled `ProposedActionReviewCard` translator previews.
  - Added deterministic `buildGrimoireTranslatorPreviews` helper.
  - Added translator boundary copy explaining no save, no execution, no AI, and no database write behavior.

## Phase 13I — Grimoire Corruption Detector Expansion
- `src/components/dashboard/grimoire-dashboard-v1.tsx`
  - Expanded `CorruptionDetectorCard` to accept all checks, open checks, and high-severity checks.
  - Added deterministic `buildCorruptionCorrectionPreviews`.
  - Added disabled correction previews using `ProposedActionReviewCard`.
  - Fixed the Reversion card copy typo from `latersafe` to `later safe`.

## Phase 13J — Grimoire Reversion and Weekly Throne Audit Expansion

- Updated `src/components/dashboard/grimoire-dashboard-v1.tsx`.
- Added `buildReversionRecoveryPreviews`.
- Added `buildWeeklyThroneAuditPreviews`.
- Rewired `ReversionCard` to receive pending reversion rows and pending reversion log rows.
- Rewired `WeeklyThroneAuditCard` to receive throne attention summary values.
- Kept all preview actions disabled and non-persistent.

## Phase 13K — Grimoire Boundary and Audit Hardening

- Updated `src/components/dashboard/grimoire-dashboard-v1.tsx`.
- Added `GrimoireCarnosGuideBoundaryPanel`.
- Added `GrimoireThroneOverrideBoundaryPanel`.
- Added `GrimoireFinalAuditBoundaryPanel`.
- Wired the new panels into the `/grimoire` dashboard without introducing writes or generation behavior.

## Phase 13L — Grimoire Final Closeout

- Added `docs/qa/PHASE_13_GRIMOIRE_MANUAL_SMOKE_CHECKLIST.md`.
- Added `docs/phase-reports/PHASE_13_GRIMOIRE_COMPLETION_REPORT.md`.
- Added `scripts/audit-phase-13.mjs`.
- Updated `package.json` with `audit:phase13` and added it to `npm run check`.
- Patched `supabase/migrations/0016_phase13_grimoire_foundation.sql`.

## Phase 13.5A — Formal Gap Lock

- Added `docs/phase-plans/PHASE_13_5_COMPLETED_SCOPE_REPAIR.md`.
- Added `docs/audits/PHASE_1_13_FULL_SOURCE_SCOPE_GAP_AUDIT.md`.
- Added `docs/phase-reports/PHASE_13_5A_FORMAL_GAP_LOCK_REPORT.md`.
- Added `scripts/audit-phase-13-5.mjs`.
- Added `audit:phase13_5` package script and wired it before build in `npm run check`.
- No product runtime feature code changed in this step.

## Phase 13.5A Marker Patch

- Added exact machine-check markers required by `scripts/audit-phase-13-5.mjs`.
- Added generated source scope snapshot artifacts to `.gitignore`.
- Preserved `scripts/source_scope_snapshot.py` as a reusable repo audit utility.

## Phase 13.5B — Carnos Persona + Chat Completion Repair

- Added `docs/carnos/CARNOS_PERSONA_CONTRACT.md`.
- Added `docs/database/PHASE_13_5B_CARNOS_PERSONA_SCHEMA_DESIGN.md`.
- Added `supabase/migrations/0018_phase13_5b_carnos_persona_foundation.sql`.
- Added `src/lib/carnos/persona-contract.ts`.
- Added `src/lib/repositories/carnos-persona-read.ts`.
- Added `src/components/carnos/carnos-persona-boundary-panel.tsx`.
- Added `scripts/audit-phase-13-5b.mjs`.
- Added `audit:phase13_5b` to package scripts and `npm run check`.

## Phase 13.5B Marker Patch

- Added exact Phase 13.5B machine-check markers to `docs/carnos/CARNOS_PERSONA_CONTRACT.md`.

## Phase 13.5B TypeScript Build Fix

- `src/lib/repositories/carnos-persona-read.ts`: fixed `PersonaPromptVersionRow[]` cast through `unknown` to satisfy TypeScript build.

## Phase 13.5C Calendar / Timeline / Routine Repair

- `supabase/migrations/0019_phase13_5c_calendar_timeline_routine_foundation.sql`: added calendar/routine/reminder schema with RLS.
- `src/lib/repositories/calendar-routine-read.ts`: added read-only list helpers.
- `src/lib/dashboard/calendar-routine-dashboard-data-helpers.ts`: added read-only calendar/routine dashboard aggregation.
- `src/app/calendar/page.tsx`: wired calendar/routine dashboard data.
- `src/components/dashboard/calendar-dashboard-v1.tsx`: added Phase 13.5C visibility panel.
- `scripts/audit-phase-13-5c.mjs`: added audit gate.

## Phase 13.5C Lint Fix

- `src/lib/repositories/calendar-routine-read.ts`: replaced explicit `any` Supabase type alias with a lint-safe generic alias.

## Phase 13.5C TypeScript Build Fix

- `src/lib/repositories/calendar-routine-read.ts`: removed invalid `SupabaseClient<Record<string, never>, "public", Record<string, never>>` alias and replaced it with a local read-only query interface.

## Phase 13.5D Career Prep Repair

- `supabase/migrations/0020_phase13_5d_career_prep_foundation.sql`: added career-prep schema and RLS.
- `src/lib/repositories/career-prep-read.ts`: added read-only career-prep helpers.
- `src/lib/dashboard/career-prep-dashboard-data-helpers.ts`: added career-prep aggregation.
- `src/components/dashboard/career-prep-foundation-panel.tsx`: added Career dashboard visibility panel.
- `src/app/career/page.tsx`: wired career-prep data.
- `src/components/dashboard/career-dashboard-v1.tsx`: rendered career-prep panel.
- `scripts/audit-phase-13-5d.mjs`: added audit gate.

## Phase 13.5E Settings / Privacy Foundation Repair

- `supabase/migrations/0021_phase13_5e_settings_privacy_foundation.sql`
- `src/lib/repositories/settings-privacy-read.ts`
- `src/lib/dashboard/settings-privacy-dashboard-data-helpers.ts`
- `src/components/dashboard/settings-privacy-foundation-panel.tsx`
- `src/app/settings/page.tsx`
- `src/app/privacy/page.tsx`
- `scripts/audit-phase-13-5e.mjs`
- `docs/database/PHASE_13_5E_SETTINGS_PRIVACY_SCHEMA_DESIGN.md`
- `docs/phase-reports/PHASE_13_5E_SETTINGS_PRIVACY_COMPLETION_REPORT.md`
- `docs/qa/PHASE_13_5E_SETTINGS_PRIVACY_MANUAL_SMOKE_CHECKLIST.md`

## Phase 13.5F Placeholder Route Decision Lock

- `src/lib/placeholder-route-decisions.ts` — added locked deferred-route decision metadata.
- `src/components/dashboard/placeholder-dashboard-page.tsx` — replaced generic placeholder language with explicit decision lock UI.
- `src/app/creativity/page.tsx` — wired to locked placeholder decision.
- `src/app/decisions/page.tsx` — wired to locked placeholder decision.
- `src/app/future-simulator/page.tsx` — wired to locked placeholder decision.
- `src/app/experiments/page.tsx` — wired to locked placeholder decision.
- `src/app/custom-trackers/page.tsx` — wired to locked placeholder decision.
- `scripts/audit-phase-13-5f.mjs` — added placeholder decision audit gate.

## Phase 13.5G — Final Source Coverage Audit

- `docs/phase-reports/PHASE_13_5G_FINAL_SOURCE_COVERAGE_AUDIT.md`
  - Final repair-lane closeout report.
  - Classifies remaining completed-scope gaps before Phase 14.
- `docs/qa/PHASE_13_5G_FINAL_SOURCE_COVERAGE_MANUAL_SMOKE_CHECKLIST.md`
  - Manual verification checklist for Phase 13.5G.
- `scripts/audit-phase-13-5g.mjs`
  - Machine gate for final Phase 13.5 coverage.
- `package.json`
  - Adds `audit:phase13_5g`.
  - Adds Phase 13.5G audit to `npm run check`.

## Phase 13.5G — Final Full Source Scope Audit

- Added `scripts/audit-phase-13-5g-full-source-scope.py`.
- Added `scripts/audit-phase-13-5g.mjs`.
- Added `docs/audits/PHASE_1_13_5_FULL_SOURCE_SCOPE_AUDIT.md`.
- Added `docs/phase-reports/PHASE_13_5G_FINAL_SOURCE_COVERAGE_AUDIT.md`.
- Added `docs/qa/PHASE_13_5G_FINAL_SOURCE_COVERAGE_MANUAL_SMOKE_CHECKLIST.md`.
- Updated `package.json` so `npm run check` includes `npm run audit:phase13_5g`.

## Phase 13.5G — Final Full Source Scope Audit Repair

- Repaired `scripts/audit-phase-13-5g-full-source-scope.py`.
- Preserved `scripts/audit-phase-13-5g.mjs`.
- Regenerates `docs/audits/PHASE_1_13_5_FULL_SOURCE_SCOPE_AUDIT.md`.
- Regenerates `docs/phase-reports/PHASE_13_5G_FINAL_SOURCE_COVERAGE_AUDIT.md`.
- Regenerates `docs/qa/PHASE_13_5G_FINAL_SOURCE_COVERAGE_MANUAL_SMOKE_CHECKLIST.md`.

## Phase 14A — Voice Foundation Scope Lock

Added:
- `docs/phase-plans/PHASE_14A_VOICE_FOUNDATION_SCOPE_LOCK.md`
- `docs/phase-reports/PHASE_14A_VOICE_FOUNDATION_SCOPE_LOCK_REPORT.md`
- `docs/qa/PHASE_14A_VOICE_FOUNDATION_SCOPE_LOCK_MANUAL_SMOKE_CHECKLIST.md`
- `scripts/audit-phase-14a.mjs`

Updated:
- `package.json`
- `PROJECT_EXECUTION_LOG.md`
- `CODE_LEDGER.md`
- `CHANGELOG.md`
- `PHASE_STATUS.md`

Locked:
- Phase 14 build chunks as 14A–14J.
- Requirement categories as A–K.
- Full Phase 14 checklist as 145 requirements.
- Carnos text/voice-to-system update bridge.
- No standalone `/voice-companion` in Phase 14A.
- No Phase 14 implementation files in Phase 14A.

## Phase 14B — Voice SQL Foundation

Added:
- `supabase/migrations/0022_phase14_voice_foundation.sql`
- `supabase/migrations/0023_phase14_parent_ownership_guards.sql`
- `src/lib/repositories/voice-read.ts`
- `docs/database/PHASE_14_VOICE_SCHEMA_DESIGN.md`
- `docs/phase-reports/PHASE_14B_VOICE_SQL_FOUNDATION_REPORT.md`
- `docs/qa/PHASE_14B_VOICE_SQL_FOUNDATION_MANUAL_SMOKE_CHECKLIST.md`
- `scripts/audit-phase-14b.mjs`

Updated:
- `src/types/database.ts`
- `src/lib/repositories/index.ts`
- `package.json`
- `PROJECT_EXECUTION_LOG.md`
- `CODE_LEDGER.md`
- `CHANGELOG.md`
- `PHASE_STATUS.md`

Locked:
- Voice SQL foundation exists.
- Audio retention defaults are safe.
- Voice reads are read-only.
- Deferred implementation boundaries remain protected.

Next locked implementation step: Phase 14C — Types / Schemas / State Machine / Read Helpers.

## Phase 14D — STT/TTS Provider Boundary APIs

Files added:
- `src/lib/voice/providers/voice-provider-types.ts`
- `src/lib/voice/providers/noop-stt-provider.ts`
- `src/lib/voice/providers/noop-tts-provider.ts`
- `src/lib/voice/providers/index.ts`
- `src/app/api/voice/transcribe/route.ts`
- `src/app/api/voice/speak/route.ts`
- `scripts/audit-phase-14d.mjs`
- `docs/phase-reports/PHASE_14D_STT_TTS_PROVIDER_BOUNDARY_REPORT.md`
- `docs/qa/PHASE_14D_STT_TTS_PROVIDER_BOUNDARY_MANUAL_SMOKE_CHECKLIST.md`

Files updated:
- `package.json`
- `PROJECT_EXECUTION_LOG.md`
- `CODE_LEDGER.md`
- `CHANGELOG.md`
- `PHASE_STATUS.md`

Boundary:
- Provider/API boundary only.
- No persistence.
- No audio retention.
- No UI.
- No proposed-action bridge.

## Phase 14F — Transcript Draft + Manual Simulator

Files added/updated:
- `src/lib/voice/transcript-draft.ts`
- `src/lib/voice/index.ts`
- `src/components/voice/voice-manual-simulator-preview.tsx`
- `src/components/voice/index.ts`
- `scripts/audit-phase-14f.mjs`
- `docs/phase-reports/PHASE_14F_TRANSCRIPT_DRAFT_MANUAL_SIMULATOR_REPORT.md`
- `docs/qa/PHASE_14F_TRANSCRIPT_DRAFT_MANUAL_SIMULATOR_SMOKE_CHECKLIST.md`
- `package.json`

Boundary:
- Manual transcript input only.
- No microphone capture.
- No provider calls.
- No SQL writes.
- No proposed-action creation or execution.
- No `/voice-companion`.

## Phase 14G — Carnos Voice Panel Integration

Added:
- `src/components/voice/carnos-voice-panel-integration.tsx`
- `docs/phase-reports/PHASE_14G_CARNOS_VOICE_PANEL_INTEGRATION_REPORT.md`
- `docs/qa/PHASE_14G_CARNOS_VOICE_PANEL_INTEGRATION_SMOKE_CHECKLIST.md`
- `scripts/audit-phase-14g.mjs`

Modified:
- `src/app/carnos/page.tsx`
- `src/components/voice/index.ts`
- `package.json`

Boundary:
- `/carnos` is the canonical integrated surface.
- No standalone voice route, audio API, SQL write, provider call, or proposed-action execution was added.

## Phase 14I — Voice Foundation Audit + Completion Report

Files added:
- `docs/phase-reports/PHASE_14I_VOICE_FOUNDATION_AUDIT_COMPLETION_REPORT.md`
- `docs/qa/PHASE_14I_VOICE_FOUNDATION_AUDIT_SMOKE_CHECKLIST.md`
- `scripts/audit-phase-14i.mjs`

Files updated:
- `package.json`
- `PROJECT_EXECUTION_LOG.md`
- `CODE_LEDGER.md`
- `CHANGELOG.md`
- `PHASE_STATUS.md`

Boundary:
- Documentation and audit gate only.
- No new runtime voice feature.
- No SQL writes.
- No proposed-action execution.
- No standalone voice route.
- No provider calls.
- No microphone capture implementation.

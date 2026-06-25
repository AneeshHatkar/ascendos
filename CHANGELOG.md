# CHANGELOG

All notable changes to ascendOS will be documented here.

## [Unreleased]

### Added
- Local Git repository.
- Branch renamed to `main`.
- `.gitignore`.
- Source-of-truth docs folder.
- Final synced DOCX and JSON added under `docs/source-of-truth/`.
- Python `.venv`.
- Initial tracking markdown files:
  - README.md
  - SOURCE_OF_TRUTH.md
  - PROJECT_EXECUTION_LOG.md
  - CODE_LEDGER.md
  - DECISIONS.md
  - ERRORS_AND_FIXES.md
  - CHANGELOG.md

### Fixed
- Removed root `.DS_Store`.
- Avoided committing `.venv`.
- Avoided committing macOS Finder metadata.
- Recovered from heredoc paste issue.

### Changed
- Nothing yet.

### Removed
- Nothing yet.

## 2026-06-17 — Phase 2 Complete

### Added
- Next.js foundation.
- Canonical dashboard routes.
- Reusable app shell.
- Dashboard registry.
- Route and registry validation scripts.
- Placeholder pages for all canonical dashboards.

### Changed
- Corrected Knowledge Vault route to `/knowledge`.

### Verified
- `npm run check` passes.

## Phase 3 Complete — Supabase/Auth Foundation

### Added
- Supabase/Auth foundation.
- SQL profile foundation.
- RLS-backed profile and Carnos profile tables.
- Typed Supabase clients.
- Auth pages and actions.
- Profile helpers and UI status.
- Protected route boundary.
- Setup/smoke-test docs.
- Migration validation.
- Phase 3 audit gate.

## 2026-06-18 — Phase 4 Complete

### Added
- Core SQL spine migrations for audit logs, AI actions, chat sessions, chat messages, goals, milestones, daily logs, proof items, tasks, and events.
- Phase 4 migration audit.
- Upgraded SQL migration validator.
- Phase 4 TypeScript database types.
- Read-only repository helpers.
- Core SQL spine documentation.
- Phase 4 completion report.

### Fixed
- Phase 4 audit parser issue.
- SQL `references public.profiles` typo.
- Phase 3 database type compatibility after Phase 4 type expansion.

### Deferred
- Carnos write flows.
- Memory.
- Voice.
- RAG.
- Full CRUD dashboards.

## Phase 5 Complete — Core Read UI Integration

- Added shared dashboard read UI components.
- Added authenticated dashboard shell helper.
- Connected `/command`, `/goals`, `/timeline`, `/carnos`, `/calendar`, `/world-class`, `/analytics`, `/career`, `/learning`, and `/body` to authenticated read-only data surfaces.
- Added reusable domain-filtered read dashboard.
- Added Phase 5 audit gate.
- Added Phase 5 report.
- Extended source alignment audit through Phase 5.
- Preserved no-write, no-memory, no-generation, no-Python, and no-ML boundaries.

## Phase 5.15 Python/ML Intelligence Architecture Patch

- Added future Python/ML Intelligence Worker architecture.
- Added all planned ML intelligence features, route placement, phase placement, safety boundaries, privacy boundaries, evaluation requirements, score definitions, and output contracts.
- Added Python/ML boundary audit.
- No runtime ML, database write behavior, or existing Phase 1-5 behavior was changed.

## 2026-06-19 23:35 UTC — Phase 6 Safe Write Plan Started

Added the Phase 6 plan for the Safe Write / Proposed Action Flow.

This starts the controlled write foundation for ascendOS:
- proposed actions
- validation
- Save/Edit/Cancel confirmation
- server-side writes
- audit logging
- timeline linkage
- dashboard refresh

No runtime write code was added yet.

## 2026-06-19 23:44 UTC — Added Proposed Action Type Registry

Added the Phase 6 proposed action type registry.

This establishes the first safe-write foundation layer by defining which action names are allowed before contracts, validation, lifecycle, execution, and UI are added.

## 2026-06-19 23:51 UTC — Added Proposed Action Contracts

Added typed proposed action contracts for Phase 6 safe write flows.

Supported contracts:
- create task
- create goal
- create daily log
- create proof item

This prepares the project for validation and controlled action execution.


## 2026-06-19 23:58 UTC — Added Action Result Types

Added standard action result contracts for Phase 6 safe-write workflows.

This prepares validation and execution code to return consistent success/error objects instead of ad hoc values.

## 2026-06-20 00:05 UTC — Added Proposed Action Payload Validation

Added proposed action validation for Phase 6 safe-write workflows.

This prevents invalid or unsafe proposed action payloads from reaching future execution code.

## 2026-06-20 00:09 UTC — Added Audit Logging Helper

Added a reusable audit logging helper for Phase 6 safe-write workflows.

This prepares future confirmed writes to create traceable audit records.


## 2026-06-20 04:31 UTC — Added Timeline Helper Boundary

Added a safe timeline helper boundary for Phase 6.

Because the current SQL spine does not include a `timeline_events` table, the helper intentionally returns a controlled skipped result instead of inventing schema or writing to a non-existent table.


## 2026-06-20 04:49 UTC — Added Proposed Action Creation Helper

Added a helper for creating validated proposed actions in `ai_actions` with `pending_confirmation` status.

This preserves the required Phase 6 flow: proposal first, confirmation later, execution only after explicit approval.


## 2026-06-20 05:05 UTC — Added Action Lifecycle Helper

Added a safe lifecycle helper for proposed actions.

The helper supports approval, rejection, cancellation, and failure marking while preserving the Phase 6 rule that target records are not written until a later explicit execution step.


## 2026-06-20 05:18 UTC — Added Execution Dispatcher Boundary

Added the Phase 6 execution dispatcher boundary.

The dispatcher verifies ownership, approval status, and action type, but intentionally does not execute target-table writes until the specific Phase 6.11–6.14 action flows are implemented.


## 2026-06-20 05:24 UTC — Added Create Task Execution Flow

Added the first concrete Phase 6 execution flow: approved `create_task` proposals can now create records in `tasks`.

The dispatcher now routes `create_task` actions to the task flow while keeping the remaining action types intentionally unimplemented until their specific phases.


## 2026-06-20 18:09 UTC — Added Create Goal Execution Flow

Added the Phase 6 create-goal execution flow: approved `create_goal` proposals can now create records in `goals`.

The dispatcher now routes `create_goal` actions to the goal flow while keeping daily logs and proof items intentionally unimplemented until their specific phases.


## 2026-06-20 18:13 UTC — Added Create Daily Log Execution Flow

Added the Phase 6 create-daily-log execution flow: approved `create_daily_log` proposals can now create records in `daily_logs`.

The dispatcher now routes `create_daily_log` actions to the daily log flow while keeping proof items intentionally unimplemented until Phase 6.14.


## 2026-06-20 18:17 UTC — Added Create Proof Item Execution Flow

Added the Phase 6 create-proof-item execution flow: approved `create_proof_item` proposals can now create records in `proof_items`.

The dispatcher now routes all four Phase 6 write action types: tasks, goals, daily logs, and proof items.


## 2026-06-20 18:22 UTC — Added Proposed Action Review UI

Added a reusable Save/Edit/Cancel UI component for reviewing proposed actions before execution.

The component supports payload preview, JSON payload editing, validation issue display, Save / Confirm callback, and Cancel callback while keeping database writes outside the component.


## 2026-06-20 18:30 UTC — Wired Proposed Action Review into Carnos Page

Wired the Phase 6 proposed-action review card into the Carnos dashboard as a safe confirmation-first preview surface.

The page now displays the Save/Edit/Cancel UI while preserving the server-owned write boundary.


## 2026-06-20 18:38 UTC — Added Phase 6 Audit Gate

Added `scripts/audit-phase-6.mjs` and wired `npm run audit:phase6` into the main check pipeline.

The audit verifies the Phase 6 safe write proposed-action flow and guards the confirmation-first boundary.


## 2026-06-20 18:47 UTC — Completed Phase 6 Safe Write Proposed Action Flow

Completed Phase 6 and added the final Phase 6 report.

Phase 6 now includes proposed action creation, validation, lifecycle handling, approved-only execution dispatch, four target write flows, Save/Edit/Cancel UI, Carnos page wiring, and a Phase 6 audit gate.

## Phase 7.1 - Core Operating Dashboards Plan Lock

- Added the Phase 7 plan lock.
- Locked the roadmap reconciliation and Phase 7 boundaries before implementation.

## Phase 7.2 - Dashboard Layout Contract

- Added the shared Phase 7 dashboard layout contract.

## Phase 7.3 - Dashboard Card Registry

- Added the shared Phase 7 dashboard card registry.

## Phase 7.4 - Shared Dashboard Card Primitives

- Added reusable operating dashboard card and grid primitives for Phase 7.

## Phase 7.5 - Dashboard Data Aggregation Helpers

- Added read-only dashboard data aggregation helpers for Phase 7.

## Phase 7.6 - Command Dashboard v1

- Added the initial Command dashboard v1 component for Phase 7.

## Phase 7.6B - Wire Command Dashboard v1

- Wired the Command dashboard v1 component into the live `/command` route.

## Phase 7 Integration Sanity Audit Gate

- Added a project-wide integration sanity audit to reduce the risk of created-but-not-wired phase gaps.

## Phase 7.7 - Timeline Dashboard v1

- Added Timeline dashboard v1 component for read-only operating history visibility.

## Phase 7.7B - Wire Timeline Dashboard Route

- Wired the Phase 7 Timeline dashboard component into `/timeline` while preserving the existing read-only timeline records view.

## Phase 7.8 - Calendar Dashboard v1

- Added and wired the Phase 7 Calendar dashboard component into `/calendar` while preserving the existing read-only calendar records view.

## Phase 7.9 - Goals Dashboard v1

- Added and wired the Phase 7 Goals dashboard component into `/goals` while preserving the existing read-only goal records view.

## Phase 7.10 - Proof Dashboard/Card System

- Added the Phase 7 Proof dashboard/card system as a read-only exported component without adding a non-canonical route.

## Phase 7.11 - Pending Updates / Confirmation Drawer Integration

- Added a read-only pending updates drawer to the Carnos dashboard while preserving confirmation-first action review boundaries.

## Phase 7.12 - Carnos Panel v1

- Added a read-only Carnos operating panel to the Carnos dashboard with companion state and confirmation visibility.

## Phase 7.13 - Cross-Dashboard Links

- Added canonical cross-dashboard navigation across the Phase 7 operating dashboard surfaces.

## Phase 7.14 - Empty / Loading / Error / Privacy States

- Added contract-backed dashboard card states for empty, loading, error, and privacy-redacted rendering.

## Phase 7.15 - No-Hardcoded-Demo-Data Cleanup

- Cleaned user-facing Phase 7 dashboard copy to reduce demo/placeholder language while preserving audit-required compatibility markers.

## Phase 7.16 - Phase 7 Audit Gate

- Expanded integration audit coverage for Phase 7 dashboard wiring, canonical links, pending updates, and dashboard state handling.



## Phase 7.17 - Manual Smoke Checklist

- Added Phase 7 manual browser smoke checklist for core operating dashboard verification.

## Phase 7.18 - Phase 7 Completion

- Completed Phase 7 Core Operating Dashboards and added the final Phase 7 report.
- Strengthened integration audit boundary coverage for all Phase 7 dashboard surfaces.

## Phase 1-7 Source Crosswalk Verification

- Added a persistent Phase 1–7 source-to-implementation crosswalk and audit script before Phase 8.

## Phase 8.1 - Career System Plan Lock v2

- Locked the expanded 24-step Phase 8 Career System plan.

## Phase 8.2 - Career Route and Data Contract Inspection

- Added the Phase 8.2 inspection report documenting current career route, SQL, repository, dashboard, and audit state.

## Phase 8.3 - Career SQL Schema Plan / Migration Design

- Added Career SQL schema design for the upcoming additive Phase 8 career migration.

## Phase 8.4 - Additive Career SQL Migration

- Added the additive Career System SQL migration with applications, events, networking, referrals, resume, and interview tables.

## Phase 8.5 - Database Types Update / Generated Type Alignment

- Added TypeScript database contracts for the Phase 8 Career System SQL tables.

## 2026-06-24 — Phase 8 Career System Complete

### Added
- Career SQL foundation.
- Career read repositories.
- Career dashboard aggregation.
- `/career`, `/networking`, `/resume`, and `/interviews` dashboards.
- Career cross-links.
- Career evidence linkage.
- Career proposed-action visibility.
- Career state/privacy boundary.
- Phase 8 audit gate.
- Phase 8 integration audit expansion.
- Phase 8 manual smoke checklist.
- Phase 8 completion report.

### Preserved
- Read-only dashboard boundary.
- Confirmation-first proposed-action law.
- No autonomous applications/messages.
- No scraping.
- No Python/ML execution.
- No background jobs.

Phase 8.24 closeout marker: Phase 8 Career System Complete.

## 2026-06-24 — Phase 1–8 Retrospective Gap Audit

### Added
- Post-Phase-8 retrospective gap audit.
- Documented completed Phase 1–8 scope.
- Documented deferred v1 scope.
- Documented risks and Phase 9 guardrails.

## 2026-06-24 — Phase 9 Chunk A Plan Lock

### Added
- Phase 9 Learning / Project System plan.
- Phase 9 source and route inspection report.
- Locked 28 Phase 9 requirement steps into 12 safe execution chunks.

### Notes
- No application code changed.
- No SQL migration added yet.
- No dashboard route rewrites added yet.

## 2026-06-24 — Phase 9 Chunk B Schema Design

### Added
- Phase 9 Learning / Project System schema design.
- Phase 9 source-to-scope traceability matrix.

### Notes
- No SQL migration added yet.
- No app source code changed.
- Next step is SQL migration design implementation in `0008_learning_project_system_foundation.sql`.

## 2026-06-24 — Phase 9 Chunk C SQL Migration

### Added
- Phase 9 Learning / Project System SQL migration.
- Learning tables for skill paths, skills, prerequisites, progress, sessions, quizzes, and quiz attempts.
- Project tables for projects, milestones, bugs, tests, releases, and links.
- RLS, user ownership, policies, and indexes for the Phase 9 tables.

### Notes
- TypeScript database types are not updated yet.
- No dashboard UI changed yet.

## 2026-06-24 — Phase 9 Chunk C.1 Parent Ownership Hardening

### Added
- Parent ownership guard migration for Phase 9 learning/project tables.
- Stricter insert/update policies for parent-linked learning and project records.

### Notes
- No TypeScript database types changed yet.
- This hardening was added before moving to database type updates.

## 2026-06-24 — Phase 9 Chunk D Database Types

### Added
- TypeScript database table definitions for Phase 9 learning/project tables.
- Exported row, insert, and update aliases for Phase 9 records.

### Notes
- No read helpers added yet.
- No dashboard UI changed yet.

## 2026-06-24 — Phase 9 Chunk E Read Helpers

### Added
- User-scoped read helpers for Phase 9 learning records.
- User-scoped read helpers for Phase 9 project records.

### Notes
- No write helpers added.
- No dashboard UI changed.

## 2026-06-24 — Phase 9 Chunk F Aggregation and Registry

### Added
- Dashboard cards for Phase 9 learning and project surfaces.
- Learning/project aggregation helper for dashboard-ready summary data.
- Shared learning/project summary panel UI primitive.

### Notes
- No `/learning` or `/projects` route implementation changed yet.
- No write behavior added.

## 2026-06-24 — Phase 9 Chunk G Learning Academy Dashboard

### Added
- Learning Academy dashboard component.
- `/learning` route wired to Phase 9 read-only learning data.

### Notes
- No write behavior added.
- No proposed-action execution added.

## 2026-06-24 — Phase 9 Chunk H Project Builder Dashboard

### Added
- Project Builder dashboard component.
- `/projects` route wired to Phase 9 read-only project data.

### Notes
- No write behavior added.
- No proposed-action execution added.

## 2026-06-24 — Phase 9 Chunk I Knowledge Route Alignment

### Added
- Knowledge Vault alignment dashboard.
- `/knowledge` route wired to Phase 9 learning/project source records.

### Notes
- Full memory/RAG remains deferred to later phases.
- No write behavior added.

## 2026-06-24 — Phase 9 Chunk J Detail Panels

### Added
- Skill path/progress detail panel.
- Quiz/session detail panel.
- Project build-log detail panel.

### Notes
- No write behavior added.
- No proposed-action execution added.

## 2026-06-24 — Phase 9 Chunk K Linkage and State Surfaces

### Added
- Learning/project proof, resume, README, goal, task, and timeline linkage surfaces.
- Preview-only proposed-action visibility panel.
- Empty/loading/error/privacy boundary panel.
- Cross-dashboard links for learning, projects, knowledge, proof, goals, timeline, resume, and Carnos.

### Notes
- No write behavior added.
- No proposed-action execution added.

## 2026-06-24 — Phase 9 Learning / Project System Complete

### Added
- Phase 9 no-write/privacy audit.
- Phase 9 audit gate.
- Phase 9 manual smoke checklist.
- Phase 9 completion report.

### Changed
- Updated phase status to mark Phase 9 complete.

### Next
- Phase 10 — Research / Stanford System.

## 2026-06-25 — Phase 10 Chunk A Research / Stanford Planning

### Added
- Phase 10 Research / Stanford System plan.
- Phase 10 Chunk A source and route inspection report.

### Notes
- No app code changed.
- No SQL changed.
- No database types changed.
- No old phase migration edited.
- Next: Phase 10 Chunk B schema design.

## 2026-06-25 — Phase 10 Chunk B Schema Design

### Added
- Phase 10 research schema design.
- Phase 10 Stanford/PhD schema design.
- Phase 10 source-to-scope traceability matrix.

### Notes
- No SQL changed.
- No app code changed.
- No database types changed.
- No old migration edited.
- Next: Phase 10 Chunk C SQL foundation.

## 2026-06-25 — Phase 10 Chunk C SQL Foundation

### Added
- Phase 10 Research / Stanford SQL foundation migration.
- User-owned research tables.
- User-owned Stanford/PhD readiness tables.
- RLS, SELECT policies, INSERT policies, and user indexes for Phase 10 tables.

### Notes
- No app code changed.
- No database types changed.
- No read helpers changed.
- No old migration edited.
- Next: Phase 10 Chunk C.1 parent ownership/RLS hardening.

## 2026-06-25 — Phase 10 Chunk C.1 Parent Ownership Guards

### Added
- Phase 10 parent ownership guard migration.
- Helper functions for parent ownership validation.
- Insert/update triggers for Phase 10 records with nullable cross-phase references.

### Notes
- No app code changed.
- No database types changed.
- No read helpers changed.
- No old migration edited.
- Next: Phase 10 Chunk D database types.

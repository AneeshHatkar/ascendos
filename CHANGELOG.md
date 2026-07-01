## Phase 14H Text/Voice-to-Proposed-Action Bridge

- Added local safe bridge from reviewed text/voice transcript drafts to preview-only proposed-action candidates.
- Added bridge preview to the canonical Carnos voice panel.
- Added audit protection for no SQL writes, no AI calls, no provider calls, no action execution, and no `/voice-companion`.

## Phase 14E — Voice UI Components
- Added safe voice UI component previews.
- Added Phase 14E audit and QA docs.
- Confirmed no microphone capture, audio playback, provider calls, SQL writes, or proposed-action execution is introduced.

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

## 2026-06-25 — Phase 10 Chunk D Database Types

### Added

- Phase 10 database row types.
- Phase 10 insert/update type aliases.
- Exported aliases for Research / Stanford tables.

### Notes

- No SQL migration changed.
- No read helpers added.
- No dashboard or route code changed.
- Next: Phase 10 Chunk E read helpers.

## 2026-06-25 — Phase 10 Chunk E Read Helpers

### Added

- Research read helpers.
- Stanford/PhD read helpers.
- Literature and citation read helpers.
- Repository barrel export for Phase 10 read helpers.

### Notes

- No SQL migration changed.
- No database types changed.
- No dashboard or route code changed.
- No write helpers added.
- Next: Phase 10 Chunk F aggregation helpers and shared primitives.

## 2026-06-25 — Phase 10 Chunk F Aggregation, Registry, Shared UI

### Added

- Research/Stanford aggregation helper.
- Research Lab dashboard card contracts.
- Research Stanford dashboard card contracts.
- Shared read-only research summary panel primitive.

### Notes

- No SQL changed.
- No write helpers added.
- No route wiring changed.

## 2026-06-25 — Phase 10 Chunk G Route Read Surfaces

### Added

- Research Lab authenticated read-only route surface.
- Research Stanford authenticated read-only route surface.
- Safe-write boundary messaging for both research routes.

### Changed

- Replaced placeholder research pages with Phase 10 read surfaces.

### Notes

- No SQL changed.
- No write helpers added.
- No autonomous outreach, scraping, or submission behavior added.

## 2026-06-25 — Phase 10 Chunk H Linkage and Boundary Panels

### Added

- Research proof/linkage visibility panel.
- Stanford target-fit linkage visibility panel.
- Research privacy and safe-write boundary panel.
- Research route linkage/boundary wiring.

### Notes

- No SQL changed.
- No write helpers added.
- No autonomous outreach, scraping, paper submission, or application automation added.

## 2026-06-25 — Phase 10 Chunk I Detail Visibility Panels

### Added

- Research detail visibility panels.
- Stanford/PhD detail visibility panels.
- Route wiring for focused Phase 10 record detail.

### Notes

- No SQL changed.
- No write helpers added.
- No autonomous outreach, scraping, paper submission, or application automation added.

## 2026-06-25 — Phase 10 Chunk J Proposed-Action Visibility, Cross-Links, Audit Draft

### Added

- Research proposed-action visibility panel.
- Research cross-dashboard links.
- Phase 10 audit script.
- Phase 10 manual smoke checklist.
- Phase 10 completion report draft.
- `audit:phase10` package script.
- Phase 10 audit added to `npm run check`.

### Notes

- No SQL changed.
- No write helpers added.
- No real proposed-action persistence added.
- No autonomous outreach, scraping, paper submission, or application automation added.

## 2026-06-25 — Phase 10 Research / Stanford System Complete

### Added

- Final Phase 10 completion report.
- Final Phase 10 closeout status.
- Final Phase 10 log and ledger entries.

### Changed

- Converted the Phase 10 completion report draft into the final completion report.
- Updated Phase 10 smoke checklist status.
- Marked Phase 10 complete in phase status.

### Verification

- `npm run audit:phase10` passed.
- `npm run check` passed.
- Build completed successfully with `/research-lab` and `/research-stanford` as dynamic authenticated routes.

### Notes

- Phase 10 remains read-first and visibility-only.
- No SQL changed.
- No write helpers added.
- No autonomous outreach, scraping, paper submission, application submission, Python/ML worker execution, memory/RAG, voice, or background jobs added.
- Next phase: Phase 11 — Health / Body System.

## 2026-06-25 — Phase 11 Health / Body System Plan Start

### Added

- Phase 11 Health / Body System 44-step plan.
- Phase 11 source scope for body, nutrition, supplements, sleep/energy, hair/skincare, and emotion surfaces.
- Phase 11 hardening scope for baselines, units, daily sleep tracking, sleep natural-language capture, progress photo honesty, supplement safety, body-image safety, sensitive privacy, data quality, target comparison, and trend preview boundaries.

### Notes

- No SQL changed.
- No database types changed.
- No read helpers added.
- No dashboard components added.
- No route rewiring added.
- No autonomous writes, medical claims, Python/ML execution, memory/RAG, voice, web tools, or background jobs added.

## 2026-06-25 — Phase 11 Chunk B1 Schema Design

### Added

- Phase 11 Health / Body schema design document.
- Phase 11 health privacy and safety review.
- Phase 11 source-to-scope traceability report.

### Notes

- No SQL migration added.
- No database types changed.
- No read helpers added.
- No dashboard routes changed.

## 2026-06-25 — Phase 11 Chunk B2 Hardening Design

### Added

- Phase 11 baseline, units, sleep tracking, and photo/storage boundary document.
- B2 hardening notes in Phase 11 schema design.

### Notes

- No SQL migration added.
- No database types changed.
- No dashboard routes changed.
- No upload/storage behavior added.
- No Carnos silent write behavior added.

## 2026-06-25 — Phase 11 Chunk B3 Safety / Data / Target / Trend Design

### Added

- Phase 11 safety, data quality, target comparison, and trend boundary document.
- B3 safety hardening addendum in Phase 11 privacy/safety review.
- B3 decision notes in Phase 11 schema design.

### Notes

- No SQL migration added.
- No database types changed.
- No dashboard routes changed.
- No Carnos write behavior added.
- Advanced analytics remain deferred to Phase 17.

## 2026-06-25 — Phase 11 Chunk C SQL Foundation

### Added

- Phase 11 health/body SQL foundation migration.
- Source-confirmed health/body tables.
- Owner-scoped RLS policies.
- Updated-at triggers and basic indexes.

### Notes

- Parent ownership guards are deferred to Chunk C.1.
- No `health_body_baselines` table added.
- No `progress_photos` table added.
- No app routes, dashboards, repositories, or database TypeScript types changed.

## 2026-06-25 — Phase 11 Chunk C.1 Parent Ownership Guards

### Added

- Phase 11 parent ownership guard migration.
- Parent ownership validation functions for Phase 11.
- Before insert/update ownership guard triggers for Phase 11 child tables.

### Notes

- No new tables added.
- No database TypeScript types changed.
- No repositories, routes, dashboards, storage/upload behavior, or Carnos write behavior added.

## 2026-06-25 — Phase 11 Chunk D Database Types

### Added

- Phase 11 database table types for health/body tables.
- Row/insert/update aliases for Phase 11 health/body entities.

### Notes

- No SQL migrations, read helpers, dashboards, routes, storage/upload behavior, or Carnos write behavior added.

## 2026-06-25 — Phase 11 Chunk D Repair

### Fixed

- Added the actual Phase 11 database table types after the previous Chunk D commit only updated documentation/log files.

### Added

- Actual `src/types/database.ts` table entries and aliases for the 16 Phase 11 health/body tables.

## 2026-06-25 — Phase 11 Chunk E1 Read Helper Foundation

### Added

- Read-only repository helpers for Phase 11 health/body tables.
- Repository export wiring for health/body helpers.

### Notes

- No write helpers, SQL migrations, dashboards, routes, storage/upload behavior, Carnos actions, baseline table, or progress photo table added.

## 2026-06-26 — Phase 11 Chunk E2 Dashboard Summary Helper Foundation

### Added

- Read-only health/body dashboard summary helper.
- Dashboard helper export wiring for Phase 11 health/body summaries.

### Notes

- No write helpers, SQL migrations, dashboards, routes, storage/upload behavior, Carnos actions, baseline table, or progress photo table added.

## 2026-06-26 — Phase 11 Chunk E3 Read Helper Schema-Boundary Audit

### Added

- Phase 11 read-helper schema-boundary audit report.

### Notes

- Locked the allowed table surface and forbidden deferred scope before UI/dashboard work.
- No SQL, type, route, dashboard, write helper, Carnos action, storage/upload behavior, baseline table, or progress photo table added.

### Fixed

- Added exercise coverage to the Phase 11 health/body dashboard summary helper.

## 2026-06-26 — Health Body Overview Cards

### Added

- Read-only health/body overview dashboard cards.
- Dashboard component export wiring.

### Notes

- No route rewiring, SQL migration, write helper, Carnos action, storage/upload behavior, baseline table, or progress photo table added.

## 2026-06-26 — Health Body Dashboard States

### Added

- Shared health/body dashboard empty, warning, privacy, and read-only boundary states.
- Export wiring for health/body dashboard state components.

### Notes

- No schema change needed.
- No route rewiring, SQL migration, write helper, Carnos action, storage/upload behavior, baseline table, or progress photo table added.

## 2026-06-26 — Body Dashboard Route Wiring

### Changed

- Rewired `/body` to render the read-only health/body overview dashboard.

### Notes

- No schema change needed.
- Preserved route audit compatibility markers.
- No SQL migration, write helper, Carnos action, storage/upload behavior, baseline table, or progress photo table added.

## 2026-06-26 — Nutrition Dashboard Route Wiring

### Added

- Read-only nutrition dashboard surface.
- `/nutrition` route wiring to the nutrition dashboard.
- Nutrition dashboard export wiring.

### Fixed

- Corrected a spacing typo in the health/body read-only boundary notice.

### Notes

- No schema change needed.
- No SQL migration, write helper, Carnos action, storage/upload behavior, baseline table, or progress photo table added.

## 2026-06-26 — Supplements Dashboard Route Wiring

### Added

- Read-only supplements dashboard surface.
- `/supplements` route wiring to the supplements dashboard.
- Supplements dashboard export wiring.

### Fixed

- Corrected a spacing typo in the health/body read-only boundary notice.

### Notes

- No schema change needed.
- No SQL migration, write helper, Carnos action, storage/upload behavior, baseline table, or progress photo table added.

## 2026-06-26 — Sleep Energy Dashboard Route Wiring

### Added

- Read-only sleep energy dashboard surface.
- `/sleep-energy` route wiring to the sleep energy dashboard.
- Sleep energy dashboard export wiring.

### Fixed

- Cleaned small text spacing issues in existing health/body dashboard copy.

### Notes

- No schema change needed.
- No SQL migration, write helper, Carnos action, storage/upload behavior, baseline table, or progress photo table added.

## 2026-06-26 — Emotion Dashboard Route Wiring

### Added

- Read-only emotion dashboard surface.
- `/emotion` route wiring to the emotion dashboard.
- Emotion dashboard export wiring.

### Fixed

- Cleaned small text spacing issues in existing health/body dashboard copy.

### Notes

- No schema change needed.
- No SQL migration, write helper, Carnos action, storage/upload behavior, baseline table, or progress photo table added.

## 2026-06-26 — Hair Skincare Dashboard Route Wiring

### Added

- Read-only hair skincare dashboard surface.
- `/hair-skincare` route wiring to the hair skincare dashboard.
- Hair skincare dashboard export wiring.

### Fixed

- Cleaned small text spacing issues in existing health/body dashboard copy.

### Notes

- No schema change needed.
- No SQL migration, write helper, Carnos action, storage/upload behavior, baseline table, or progress photo table added.

## 2026-06-26 — Health/Body Detail Panel Pattern Report

### Added

- Phase 11 health/body detail-panel pattern report.

### Notes

- No schema change needed.
- No SQL migration, write helper, Carnos action, storage/upload behavior, baseline table, progress photo table, analytics snapshot table, or visual evidence storage added.

## 2026-06-26 — Health/Body Detail Panels

### Added

- Reusable read-only health/body detail panels.
- Detail panels for body/training, nutrition/meals, supplements, sleep/energy, emotion/reflection, and haircare/skincare records.
- Health/body detail panel export wiring.

### Notes

- No schema change needed.
- Panels are not route-attached yet; H3 will wire them to dashboard surfaces.

## 2026-06-26 — Health/Body Detail Panel Attachment

### Added

- Attached read-only health/body detail panels to health/body dashboard surfaces.
- Added detail row arrays to the existing health/body dashboard data result.

### Notes

- No schema change needed.
- Existing repository read helpers remain the only health/body data source for these panels.

## 2026-06-26 — Health/Body Linkage Visibility

### Added

- Read-only health/body proof and operating linkage panel.
- Link counts for proof, goals, tasks, daily logs, and events.
- Linkage visibility across all health/body dashboard surfaces.

### Notes

- No schema change needed.
- The panel only displays existing link fields and does not create or modify related records.

## 2026-06-26 — Health/Body Proposed-Action and State Boundaries

### Added

- Preview-only health/body proposed-action visibility.
- State and privacy boundary panels for all health/body dashboard surfaces.
- Cross-route navigation consistency across health/body dashboards.

### Notes

- No schema change needed.
- All proposed-action controls are disabled preview UI only.

## 2026-06-26 — Health/Body Audit Gate

### Added

- Phase 11 health/body automated audit gate.
- Phase 11 manual smoke checklist.
- Phase 11 audit gate report.
- `audit:phase11` package script included in `npm run check`.

### Notes

- No schema change needed.
- Audit coverage verifies route wiring, safety boundaries, deferred scope, and no-write/no-automation constraints.

## 2026-06-26 — Phase 11 Health/Body System Complete

### Added

- Phase 11 Health / Body System completion report.
- Completion-report coverage inside the Phase 11 audit gate.

### Completed

- Read-only Health / Body System route suite:
  - `/body`
  - `/nutrition`
  - `/supplements`
  - `/sleep-energy`
  - `/emotion`
  - `/hair-skincare`

### Notes

- No schema change needed for closeout.
- Phase 11 remains read-only, safety-bounded, privacy-aware, and no-write/no-automation protected.

## 2026-06-27 — Phase 12 C02 Plan Lock

### Added

- Phase 12 Life Admin + Finance + Daily Admin Queue plan.
- Phase 12 C01 source/route inspection report.
- Post-v1 expansion roadmap addendum for Phases 22–26.

### Notes

- No schema change needed.
- No app code added.
- Housing search is not the Phase 12 primary workflow; housing is interpreted as rent, lease, utilities, maintenance, and housing documents for this user.

## 2026-06-27 — Phase 12 C03 Schema Design

### Added

- Phase 12 Life Admin + Finance schema design.
- Phase 12 privacy/safety review.
- Phase 12 source-to-scope traceability report.

### Notes

- No SQL migration added yet.
- No app code added.
- C04 will begin SQL foundation after schema design is committed.

## Phase 12 C04 — SQL Foundation Tables

- Added Life Admin / Finance SQL foundation migration.
- Added tables for manual finance accounts, budget categories, financial logs, subscriptions, housing admin, housing contacts, and document metadata.
- Added RLS and indexes.
- Deferred parent ownership guards, database types, repositories, and UI wiring to later chunks.

## Phase 12 C05 — Parent Ownership Guards

- Added Phase 12 parent ownership guard migration.
- Added SQL guard helper and triggers for finance, subscriptions, documents, housing options, and housing contacts.
- Preserved no-app-code, no-types, no-repositories, no-dashboard boundary.

## Phase 12 C06 — SQL Validation Closeout

- Added Phase 12 SQL foundation validation report.
- Closed SQL foundation scope before TypeScript database contract work.
- Preserved no-SQL-change, no-app-code, no-types, no-repositories, no-dashboard boundary for this chunk.

## Phase 12 C07 — Database Type Contracts

- Added TypeScript database contracts for the Life Admin / Finance tables.
- Added exported row/insert/update aliases for admin and finance read helpers.
- Kept SQL, repositories, dashboards, and routes unchanged.

## Admin and Finance Read Helpers

- Added read-only repository helpers for finance accounts, budget categories, financial logs, subscriptions, document metadata, housing admin records, and housing contacts.
- Exported the new helpers through the repository barrel.
- Kept dashboard wiring and write behavior deferred.

## Admin and Finance Dashboard Summary

- Added read-only dashboard aggregation helpers for admin and finance records.
- Added summary counts for financial logs, subscriptions, documents, housing records, and due/overdue admin attention items.
- Kept SQL, repositories, dashboard components, and routes unchanged.

## Admin and Finance Dashboard Components

- Added read-only dashboard components for Life Admin, Finance, Documents, and Housing.
- Added shared warning, privacy, state, and proposed-action preview boundary panels.
- Exported the new dashboard components without wiring routes yet.

## Admin and Finance Route Wiring

- Wired Life Admin, Finance, Documents, and Housing routes to authenticated read-only dashboards.
- Replaced placeholder pages for those surfaces.
- Kept write behavior, SQL, repositories, dashboard helpers, and component internals unchanged.

## Phase 12 C12 — Command Admin/Finance Visibility

- Added Command dashboard visibility for Phase 12 admin/finance summaries, including due-soon and overdue pressure, subscriptions, documents, housing, warnings, and read-only boundary language.

## Phase 12 C13 — Calendar Admin/Finance Deadline Visibility

- Added Calendar dashboard visibility for Phase 12 admin/finance deadlines, including planned finance records, overdue pressure, upcoming subscriptions, expiring documents, housing follow-ups, warnings, and read-only boundary language.

## Phase 12 C14 — Admin/Finance Proposed-Action Preview Visibility

- Added preview-only proposed-action cards to the Life Admin dashboard boundary section for future admin and finance suggestions while keeping persistence and execution disabled.

## Phase 12 C15 — Audit Gate and Safety Validation

- Added a Phase 12 audit gate and wired it into `npm run check` to protect Life Admin, Finance, Documents, Housing, Command, Calendar, and deferred-scope boundaries.

## Phase 12 C16 — Smoke Checklist and Completion Closeout

- Added Phase 12 manual smoke checklist.
- Added Phase 12 source-to-scope closeout.
- Added Phase 12 completion report.
- Updated the Phase 12 audit gate to protect closeout docs and C16 log/status markers.

## Phase 12 C17 — Final Verification and Status Lock

Timestamp: 2026-06-27 06:21 UTC

- Locked Phase 12 as complete.
- Confirmed Life Admin + Finance + Daily Admin Queue source scope is closed.
- Confirmed audit gate, full check, integration sanity, production build, and diff check passed.
- Next step is Phase 13 source inspection and plan lock.

## Phase 12.9 — Pre-Grimoire Core Completion Started

- Locked a targeted pre-Grimoire gap audit.
- Confirmed chunks 06, 07, 08, and 09 need completion before Grimoire.
- Confirmed chunks 18, 20, and 21 are future chunks, not completed work.

## Phase 12.9B — AI Extraction Route and Zod Contract

- Added deterministic AI extraction API route.
- Added Zod proposed-action envelope schema.
- Preserved confirmation-first, no-autonomous-write boundary.

## Phase 12.9C — Pending Update Confirmation Wiring

- Added server-owned approve/reject routes for pending AI actions.
- Updated Carnos pending drawer to use real pending `ai_actions` records when available.
- Preserved no-autonomous-write and no-auto-execution boundaries.

## Phase 12.9D — Carnos Chat Persistence

- Added safe Carnos user-message persistence.
- Added `/api/carnos/messages`.
- Added `/carnos` save-message composer.
- Preserved no LLM generation, no memory/RAG, and no automatic action execution.

## Phase 12.9E — Goals / Proof Proposal Creation

- Added confirmation-first goal/proof proposal creation on `/goals`.
- Preserved the proposed-action safety lifecycle and avoided direct goal/proof mutations.
- Updated goals copy to reflect current behavior honestly.


## Phase 12.9F — Calendar / Timeline Proposal Creation

- Added Calendar/Timeline task proposal creation through pending `ai_actions`.
- Added proposal composer UI to `/calendar` and `/timeline`.
- Updated pre-Grimoire audit checks for Chunk 07.
- Preserved no-direct-write safety boundaries.


## Phase 12.9G — Final Pre-Grimoire Lock

- Locked the pre-Grimoire hardening pass.
- Confirmed Goals/Proof, Calendar/Timeline, Carnos Chat, and Pending Updates gaps are closed enough to proceed to Grimoire.
- Next implementation phase is Phase 13 / Source Chunk 15 — Grimoire.

## Phase 13A — Grimoire Source Scope Lock

- Started Phase 13 / Source Chunk 15 — Grimoire.
- Locked the source-backed Grimoire scope before implementation.
- Confirmed the current `/grimoire` route is still a placeholder.
- Locked the Grimoire practical loop: mode -> mission -> proof -> corruption check -> reversion.

## Phase 13B — Grimoire SQL Schema Design

- Added the Phase 13 Grimoire schema design.
- Locked the five source-backed Grimoire tables and practical mode -> mission -> proof -> corruption -> reversion data model before SQL migration work.

## Phase 13C — Grimoire SQL Migration and RLS

- Added the Grimoire SQL foundation migration.
- Added parent ownership guards for Grimoire links to modes, tasks, goals, proof items, AI actions, and chat messages.

## Phase 13D — Grimoire Database Types and Read Helpers

- Added TypeScript database types and read-only repository helpers for Grimoire.

## Phase 13E — Grimoire Dashboard Aggregation Helper

- Added read-only Grimoire dashboard aggregation helper with summary counts, detail rows, warnings, grounding rules, anti-corruption rules, and weekly throne audit questions.\n\n## Phase 13F — Core Grimoire Dashboard UI

- Replaced the `/grimoire` placeholder with the first read-only Grimoire dashboard UI.
- Added required cards for modes, missions, symbol-to-action mapping, corruption checks, reversions, and weekly throne audit.\n

## Phase 13G — Grimoire Mode Selector and Mission Mapping Wiring

- Added Grimoire dashboard surface/card registry wiring for Mode Selector and Mission Mapping.
- Added Grimoire cross-dashboard navigation to keep symbolic modes grounded in Command, Goals, Timeline, Calendar, and Carnos.

## Phase 13H — Grimoire Symbol-to-Action Translator Preview
- Added preview-only Grimoire symbol-to-action translation cards.
- The translator now displays safe proposed-action shapes for task, daily log, and proof item creation without persisting or executing anything.

## Phase 13I — Grimoire Corruption Detector Expansion
- Expanded Grimoire corruption detection with open-risk and high-severity panels.
- Added preview-only correction cards for safe task/log review without writes or execution.

## Phase 13J — Grimoire Reversion and Weekly Throne Audit Expansion

- Expanded reversion and weekly throne audit panels with disabled proposed-action previews.
- Added explicit reversion and throne boundaries.

## Phase 13K — Grimoire Boundary and Audit Hardening

- Added final Carnos guide, throne override, and Grimoire safety audit boundary panels.
- Preserved the read-only Grimoire dashboard contract.

## Phase 13L — Grimoire Final Closeout

- Completed Phase 13 Grimoire closeout with smoke checklist, completion report, audit script, and final check wiring.
- Fixed Grimoire skills RLS migration typo before final lock.

## Phase 13.5A — Completed Scope Repair Lock

- Paused Phase 14 until completed-scope gaps through Phase 13 are repaired or explicitly classified.
- Added full source scope gap audit for completed phases.
- Added Phase 13.5 repair plan and audit script.

## Phase 13.5B — Carnos Persona + Chat Completion Repair

- Added Carnos v1 persona contract.
- Added persona prompt version SQL foundation.
- Added Carnos persona runtime boundary panel.
- Added Phase 13.5B audit gate.

## Phase 13.5B Audit Marker Fix

- Added exact Carnos runtime boundary markers required by `audit:phase13_5b`.

## Phase 13.5B Build Fix

- Fixed TypeScript build failure in the Carnos persona read repository.

## Phase 13.5C Calendar / Timeline / Routine Repair

- Added calendar blocks, routines, routine steps, and reminders foundation.
- Added read-only dashboard visibility for calendar/routine/reminder foundations.
- Preserved `timeline_events` as deferred and kept `public.events` as the v1 event/timeline spine.

## Phase 13.5C Lint Fix

- Fixed lint failure in the calendar/routine read repository.

## Phase 13.5C TypeScript Build Fix

- Fixed the TypeScript build failure in the calendar/routine read repository.

## Phase 13.5D Career Prep Repair

- Added behavioral stories, question bank, mock interviews, and resume usage foundations.
- Added read-only Career dashboard visibility for career-prep records.
- Preserved boundaries against AI answer generation, resume rewriting, job applications, outreach, scraping, and autonomous actions.

## Phase 13.5E Settings / Privacy Foundation Repair

- Added `app_settings` and `privacy_settings` SQL foundations.
- Added read-only settings/privacy helpers and UI visibility.
- Replaced `/privacy` placeholder with authenticated read-only privacy foundation.
- Added `audit:phase13_5e` to the full check gate.

## Phase 13.5F Placeholder Route Decision Lock

- Marked the remaining placeholder routes as intentional deferred routes instead of ambiguous missing scope.
- Added route-level decision metadata and protected boundary UI.
- Added `audit:phase13_5f` and wired it into `npm run check`.

## Phase 13.5G — Final Source Coverage Audit

- Added final Phase 13.5 source coverage closeout report.
- Added Phase 13.5G manual smoke checklist.
- Added `audit:phase13_5g` and wired it into the full check gate.
- Confirmed Phase 14 Voice Foundation remains the next phase after successful verification.

## Phase 13.5G — Final Full Source Scope Audit

- Added final Phase 1–13.5 source coverage audit against FINAL_SYNCED DOCX/JSON and repo implementation evidence.
- Locked Phase 14 Voice Foundation as next only after the final audit and full check pass.

## Phase 13.5G — Final Full Source Scope Audit Repair

- Fixed the final source coverage audit to separate semantic DOCX/JSON source requirements from repo-specific implementation evidence.
- Keeps Phase 14 blocked until `audit:phase13_5g` and full `npm run check` pass.

## Phase 14A — Voice Foundation Scope Lock

- Locked Phase 14 as a 10-chunk Voice Foundation build from 14A–14J.
- Documented requirement checklist categories A–K.
- Locked the full 145-requirement Phase 14 checklist.
- Locked `/carnos` as the initial voice surface.
- Deferred standalone `/voice-companion` route until canonical route expansion is intentional.
- Locked Carnos text/voice/manual/simulated transcript-to-system update bridge.
- Locked confirmation-before-write as the non-negotiable safety rule.
- Added `audit:phase14a` to the project check gate.

## Phase 14B — Voice SQL Foundation

- Added `voice_sessions` and `voice_transcripts` SQL foundation.
- Added RLS policies, indexes, and parent ownership guards.
- Added safe audio retention defaults.
- Added sensitive/review defaults for sessions and transcripts.
- Added voice database aliases and read-only repository helpers.
- Added Phase 14B schema docs, QA checklist, report, and audit gate.
- Kept voice UI, API routes, STT/TTS providers, `/voice-companion`, Memory/RAG, and web search deferred.

Next locked implementation step: Phase 14C — Types / Schemas / State Machine / Read Helpers.

## Phase 14D — STT/TTS Provider Boundary APIs

- Added noop speech-to-text provider boundary.
- Added noop text-to-speech provider boundary.
- Added `/api/voice/transcribe`.
- Added `/api/voice/speak`.
- Added audit coverage for Phase 14D.
- Preserved no-audio-storage, no-SQL-write, no-real-provider, and no-proposed-action-execution boundaries.

## Phase 14F — Transcript Draft + Manual Simulator

- Added safe transcript draft helper for manual/typed voice simulations.
- Added manual simulator preview component.
- Added audit coverage and QA checklist for Phase 14F.
- Preserved no-audio, no-provider, no-SQL, and no-proposed-action-execution boundaries.

## Phase 14G — Carnos Voice Panel Integration

- Added the Carnos voice panel integration surface to `/carnos`.
- Embedded the Phase 14F manual transcript simulator into the canonical Carnos page.
- Added `audit:phase14g` and wired it into `npm run check`.
- Preserved no-audio, no-provider-call, no-SQL-write, no-action-execution, and no-standalone-voice-route boundaries.

## Phase 14I — Voice Foundation Audit + Completion Report

- Added Phase 14I completion report for Phase 14A–14H Voice Foundation evidence.
- Added Phase 14I manual smoke checklist.
- Added `audit:phase14i` and wired it into `npm run check`.
- Preserved voice safety boundaries: no silent writes, no standalone voice route, no browser microphone capture implementation, no audio retention, no Memory/RAG, and no proposed-action execution from voice preview.

## Phase 14J — Final Voice/Text Integration Hardening

- Added final Voice Foundation hardening audit.
- Added final Phase 14J completion report and manual smoke checklist.
- Confirmed Carnos remains the canonical voice/text surface.
- Confirmed voice bridge preview remains local, non-mutating, and confirmation-first.
- Marked next implementation area as Memory/RAG foundation.

## Phase 15A — Carnos Persistent Memory + Continuity Scope Lock

- Locked Phase 15 as Carnos Persistent Memory + Continuity Foundation, aligned to JSON chunk 17 Memory/RAG.
- Added full 15A–15R implementation contract covering memory candidates, Memory Inbox, approved memories, private mode, do-not-remember rules, Carnos entity state, project/system state, current context pack builder, knowledge vault, retrieval contract, embedding boundary, forget/delete derived records, audit events, usage transparency, and cross-domain connectivity.
- Added Phase 15A audit gate and smoke checklist.
- Confirmed Phase 15A does not add runtime memory tables, embeddings, RAG, provider calls, hidden retrieval, automatic memory capture, or new memory routes.

## Phase 15B — Memory SQL Foundation

- Added Carnos Persistent Memory + Continuity SQL foundation.
- Added memory candidates, approved memories, Carnos entity state, project/system state, knowledge vault tables, retrieval logs, memory usage logs, and review queue tables.
- Added RLS, constraints, indexes, and parent ownership guards.
- Preserved boundaries: no pgvector, no embeddings, no retrieval runtime, no automatic memory creation, no UI/API route, and no Carnos context injection.

## Phase 15C — Memory Types, Schemas, Statuses, Sensitivity, Conflict Rules

- Added contract-only Carnos continuity/memory TypeScript layer.
- Added memory enums, statuses, sensitivity levels, provenance, validation helpers, and conflict rules.
- Added Carnos entity state, project memory state, system state memory, knowledge vault, context pack, and audit event contracts.
- Added Phase 15C docs, QA checklist, and audit gate.
- Preserved no-retrieval, no-embedding, no-provider, no-runtime-write boundaries.

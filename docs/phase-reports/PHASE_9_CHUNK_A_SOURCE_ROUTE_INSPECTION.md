# Phase 9 Chunk A — Source and Route Inspection

Status: Drafted for Phase 9 Chunk A.

Phase: 9 — Learning / Project System

Chunk: A

Covers:
- 9.1 Source-of-truth inspection
- 9.2 Phase 9 plan lock
- 9.3 Current route inspection

## Inspection Date

2026-06-24

## Source-of-truth files inspected

- `docs/source-of-truth/ascendOS_Carnos_v1_1_COMPLETE_Implementation_Bible_FINAL_SYNCED.docx`
- `docs/source-of-truth/ascendOS_Carnos_v1_1_COMPLETE_Source_of_Truth_FINAL_SYNCED.json`

## Repo snapshot before Chunk A

Branch:

`main`

Latest known commit before Chunk A:

`536c6d0 Add Phase 1-8 retrospective gap audit`

Phase 1-8 retrospective audit status:

Committed and pushed.

Existing source-of-truth files:

- `docs/source-of-truth/ascendOS_Carnos_v1_1_COMPLETE_Implementation_Bible_FINAL_SYNCED.docx`
- `docs/source-of-truth/ascendOS_Carnos_v1_1_COMPLETE_Source_of_Truth_FINAL_SYNCED.json`
- `docs/source-of-truth/backups/ascendOS_Carnos_v1_1_COMPLETE_Implementation_Bible_FINAL_SYNCED.before_phase_5_15.docx`

Existing Phase 9 docs before this chunk:

None found.

Existing Phase 9 routes before this chunk:

- `src/app/learning/page.tsx`
- `src/app/projects/page.tsx`
- `src/app/knowledge/page.tsx`

Existing relevant dashboard/component foundation:

- `src/components/dashboard/authenticated-dashboard-shell.tsx`
- `src/components/dashboard/domain-read-page.tsx`
- `src/components/dashboard/placeholder-dashboard-page.tsx`
- `src/components/dashboard/cross-dashboard-links.tsx`
- `src/components/dashboard/dashboard-card.tsx`
- `src/components/dashboard/data-list.tsx`
- `src/components/dashboard/empty-state.tsx`
- `src/components/dashboard/metric-tile.tsx`
- `src/components/dashboard/operating-dashboard-card.tsx`
- `src/components/dashboard/operating-dashboard-grid.tsx`
- `src/components/dashboard/section-card.tsx`
- `src/components/dashboard/status-pill.tsx`
- `src/components/dashboard/index.ts`

Existing relevant library foundation:

- `src/lib/dashboard-registry.ts`
- `src/lib/dashboard/auth.ts`
- `src/lib/dashboard/dashboard-card-registry.ts`
- `src/lib/dashboard/dashboard-data-helpers.ts`
- `src/lib/dashboard/dashboard-layout-contract.ts`
- `src/lib/dashboard/index.ts`
- `src/lib/repositories/core-read.ts`
- `src/lib/repositories/index.ts`
- `src/lib/timeline/write-timeline-event.ts`

Existing migrations before Phase 9:

- `supabase/migrations/0001_profiles_and_carnos_profiles.sql`
- `supabase/migrations/0002_audit_and_ai_actions.sql`
- `supabase/migrations/0003_chat_foundation.sql`
- `supabase/migrations/0004_goals_foundation.sql`
- `supabase/migrations/0005_daily_logs_and_proof_items.sql`
- `supabase/migrations/0006_tasks_and_events.sql`
- `supabase/migrations/0007_career_system_foundation.sql`

Next expected migration:

`supabase/migrations/0008_learning_project_system_foundation.sql`

Existing relevant audits:

- `scripts/audit-integration-sanity.mjs`
- `scripts/audit-phase-1-7-crosswalk.mjs`
- `scripts/audit-phase-3.mjs`
- `scripts/audit-phase-4.mjs`
- `scripts/audit-phase-5.mjs`
- `scripts/audit-phase-6.mjs`
- `scripts/audit-phase-8.mjs`
- `scripts/audit-python-ml-boundary.mjs`
- `scripts/audit-source-alignment.mjs`
- `scripts/validate-registry-coverage.mjs`
- `scripts/validate-route-coverage.mjs`
- `scripts/validate-sql-migrations.mjs`

Existing package scripts relevant to Phase 9:

- `check`
- `build`
- `lint`
- `validate:routes`
- `validate:registry`
- `validate:migrations`
- `snapshot:code`
- `verify:env`
- `audit:source`
- `audit:pythonml`
- `audit:integration`
- existing phase audits up to Phase 8

## Phase 9 source-of-truth scope

Phase 9 must build the Learning / Project System foundation.

The source scope includes:

- Learning academy
- Skill trees
- Quizzes
- Learning sessions
- Project builder
- Bug logs
- Releases
- README proof
- Resume proof

The Learning Academy must support:

- skills
- prerequisites
- explanations
- practice
- build tasks
- proof gates
- quizzes
- confidence
- mastery state
- connection to projects
- connection to interviews
- connection to career dashboard

## Canonical Phase 9 routes

The source-of-truth canonical routes involved are:

- `/learning`
- `/projects`
- `/knowledge`

## Phase 9 non-goals

Phase 9 must not implement full later-phase systems.

Do not add:

- full memory/RAG
- embeddings
- semantic search
- internet tools
- voice
- autonomous Carnos execution
- direct SQL writes from dashboards
- Python/ML SQL mutation
- background jobs
- external GitHub API sync
- resume auto-generation
- unrestricted AI course generation

## Phase 9 safety rules

Phase 9 must preserve:

- user-owned SQL data
- RLS expectation
- protected read boundaries
- no direct dashboard writes
- confirmation-before-write
- proposed-action preview only unless a later safe write step explicitly wires confirmed actions
- timeline/proof linkage where applicable
- no hardcoded demo data after integration
- loading, empty, error, and privacy states

## Phase 9 execution model

The 28 Phase 9 requirements remain the checklist.

Implementation may be executed in 12 safe chunks.

Chunk A only creates:

- source inspection report
- route inspection report
- Phase 9 plan lock

Chunk A must not create SQL tables, UI dashboards, or route rewrites.

## Chunk A result

Chunk A establishes the safe plan for Phase 9.

No application code is changed in Chunk A.


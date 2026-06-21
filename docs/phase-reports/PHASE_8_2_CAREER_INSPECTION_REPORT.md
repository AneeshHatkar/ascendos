# Phase 8.2 Report — Career Route and Data Contract Inspection

Status: Complete.

## Purpose

Inspect the current career-related route, SQL, repository, dashboard, and audit state before adding Phase 8 runtime implementation.

This step makes no product behavior changes.

## Current route state

### `/career`

Current file: `src/app/career/page.tsx`

Current status:
- Uses `DomainReadPage`.
- Already has career aliases:
  - career
  - job
  - jobs
  - referral
  - interview
  - resume
  - networking
- It is read-only.
- It displays a generic career read surface.
- It does not yet have a dedicated Career System dashboard.

Phase 8 implication:
- `/career` is safe to upgrade later into the Career dashboard v1.

### `/networking`

Current file: `src/app/networking/page.tsx`

Current status:
- Uses `PlaceholderDashboardPage`.
- Static placeholder only.
- No connected read data.
- No networking contacts, interactions, referrals, or follow-up logic.

Phase 8 implication:
- Needs networking/referral dashboard v1 and route wiring.

### `/resume`

Current file: `src/app/resume/page.tsx`

Current status:
- Uses `PlaceholderDashboardPage`.
- Static placeholder only.
- No connected read data.
- No resume versions, resume bullets, evidence links, or application usage.

Phase 8 implication:
- Needs resume versioning dashboard v1 and route wiring.

### `/interviews`

Current file: `src/app/interviews/page.tsx`

Current status:
- Uses `PlaceholderDashboardPage`.
- Static placeholder only.
- No connected read data.
- No interview records, prep tasks, round tracking, performance notes, follow-up, or outcomes.

Phase 8 implication:
- Needs interview command center v1 and route wiring.

## Current repository state

Current file: `src/lib/repositories/core-read.ts`

Inspection result:
- Generic read helpers exist for existing foundation tables.
- No career-specific helpers exist yet.
- Missing helper families:
  - job applications
  - job application events
  - networking contacts
  - networking interactions
  - referrals
  - resume versions
  - resume bullets
  - interviews

Phase 8 implication:
- Add career read repository helpers after SQL/types are added.

## Current database type state

Current file: `src/types/database.ts`

Inspection result:
- Current generated/manual database types include foundation tables.
- Career tables are not present yet.
- Missing tables:
  - `job_applications`
  - `job_application_events`
  - `networking_contacts`
  - `networking_interactions`
  - `resume_versions`
  - `resume_bullets`
  - `interviews`

Phase 8 implication:
- Phase 8 needs an additive migration and matching type updates.
- No destructive SQL changes should be made.

## Current SQL migration state

Latest inspected migration:
- `supabase/migrations/0006_tasks_and_events.sql`

Inspection result:
- Core task/event foundation exists.
- Events already include `career` as an event type/domain path.
- Dedicated career tables do not exist yet.

Phase 8 implication:
- Add a new migration after 0006.
- Do not modify previous migrations unless a validation issue requires a compatibility fix.

## Current dashboard export/component state

Current file: `src/components/dashboard/index.ts`

Inspection result:
- No dedicated career dashboard exports yet.
- Missing components:
  - `CareerDashboardV1`
  - `JobApplicationsPipeline`
  - `NetworkingDashboardV1`
  - `ResumeDashboardV1`
  - `InterviewsDashboardV1`
  - career cross-link helpers if needed

Phase 8 implication:
- Add career components incrementally after data contracts exist.

## Current audit state

Current file: `scripts/audit-integration-sanity.mjs`

Inspection result:
- Current integration audit checks `/career` as a Phase 5 read route.
- It does not yet check `/networking`, `/resume`, or `/interviews` as career system surfaces.
- It does not yet check career SQL, career repository helpers, or career dashboard exports.

Phase 8 implication:
- Add a dedicated Phase 8 audit gate.
- Expand integration audit only after career surfaces are implemented.

## Risk assessment

Risk to Phases 1–7: low if Phase 8 stays additive.

Do not:
- rename existing Phase 7 dashboard contracts
- alter existing Phase 6 proposed-action contracts prematurely
- remove Phase 5 read-page markers
- create non-canonical routes
- add direct dashboard mutation
- add autonomous applications or emails
- add scraping/internet tools
- add memory/RAG
- add Python/ML worker execution

## Phase 8 implementation order confirmed

The correct order remains:

1. SQL schema design.
2. Add additive career SQL migration.
3. Update database types.
4. Add read repository helpers.
5. Add career data aggregation helpers.
6. Add dashboard cards/registry.
7. Add UI surfaces one route at a time.
8. Add career proposed-action visibility without direct execution.
9. Add states.
10. Add audits and smoke checklist.
11. Add final report.

## Verdict

Phase 8.2 inspection is complete.

The repo is ready for Phase 8.3 Career SQL schema plan / migration design.

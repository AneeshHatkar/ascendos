# Phase 5 — Core Read UI Integration Plan

## Status

Planned.

Phase 5 starts after:

- Phase 1 repository/source-of-truth foundation is complete.
- Phase 2 route shell is complete.
- Phase 3 Supabase/Auth foundation is complete.
- Phase 4 core SQL spine is complete.
- Full source-alignment audit passes.

## Goal

Connect the Phase 4 SQL-backed read layer to the UI.

Phase 5 turns ascendOS from route shell, auth foundation, SQL schema, and typed read repositories into authenticated dashboards that read real Supabase-backed user data with clean empty states and consistent dashboard cards.

## Non-negotiable boundary

Phase 5 is read-only.

Do not add:

- write repositories
- create/edit/delete forms
- Save/Edit/Cancel mutation flow
- Carnos AI generation
- OpenAI/API calls
- memory table
- memory retrieval
- voice
- RAG
- full CRUD dashboards
- heavy analytics/charts
- production deployment

## Source-of-truth alignment

The FINAL_SYNCED DOCX/JSON requires ascendOS to be SQL-backed, modular, typed, auditable, privacy-aware, confirmation-first for important Carnos writes, proof-first, and timeline-aware.

Phase 5 supports this by showing real data from Phase 4 tables without mutating user data.

## Required read flow

A Phase 5 page should follow this pattern:

authenticated page
-> get current user/session
-> call typed read-only repository helper
-> render data list, metric card, or empty state
-> no write
-> no mutation
-> no Carnos execution

## Phase 5 scope

Phase 5 includes:

1. Plan lock
2. Shared dashboard UI components
3. Authenticated dashboard shell helper
4. Command dashboard read integration
5. Goals page read integration
6. Timeline page read integration
7. Carnos page read integration
8. Calendar page tasks/events read integration
9. Proof/daily log surfaces
10. Core domain filtered reads
11. Phase 5 audit script
12. Phase 5 documentation/report
13. Source alignment audit update
14. Mark Phase 5 complete

## Pages prioritized in Phase 5

Primary pages:

- /command
- /goals
- /timeline
- /carnos
- /calendar

Secondary proof/domain pages:

- /world-class
- /analytics
- /career
- /learning
- /body

## Shared components to create

Phase 5 should add reusable dashboard components:

- SectionCard
- EmptyState
- DataList
- StatusPill
- MetricTile

These components must be display-only.

## Auth helper to create

Phase 5 should add an authenticated dashboard shell/helper so pages can safely:

- read the current user
- show signed-out states
- avoid repeated auth boilerplate
- keep route behavior consistent

## Repository rule

Use existing read-only helpers:

- listAuditLogs
- listAiActions
- listChatSessions
- listChatMessages
- listGoals
- listGoalMilestones
- listDailyLogs
- listProofItems
- listTasks
- listEvents

Do not add write helpers in Phase 5.

## Empty state rule

Every connected page must handle empty data cleanly.

Empty states should explain:

- no data exists yet
- writes are not enabled in this phase
- future phases will add safe creation flows

## Carnos page rule

The Carnos page may show:

- recent chat sessions
- pending AI actions
- safety status

It must not claim Carnos can generate, mutate, remember, or execute actions yet.

## Completion gates

Phase 5 is complete only when:

- shared dashboard UI components exist
- authenticated dashboard shell exists
- key pages read from repositories
- empty states exist
- Phase 5 audit passes
- source alignment audit includes Phase 5
- npm run check passes
- git diff --check passes
- git status is clean after commit/push

## Recommended next phase after Phase 5

Phase 6 should add safe write/proposed-action flow groundwork, not full memory yet.

Memory remains deferred until its dedicated phase because it requires explicit approval, edit/delete/export behavior, retrieval rules, privacy controls, and auditability.

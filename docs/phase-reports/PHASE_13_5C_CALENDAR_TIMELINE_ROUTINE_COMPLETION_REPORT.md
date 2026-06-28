# Phase 13.5C Calendar / Timeline / Routine Repair Completion Report

Status: Complete when audit and full check pass.

## Completed scope

Phase 13.5C repairs the completed-scope foundation gap for calendar, routine, and reminder structures by adding:

- `calendar_blocks`
- `routines`
- `routine_steps`
- `reminders`
- read-only repository helpers
- calendar/routine dashboard aggregation helper
- Calendar dashboard visibility panel
- dedicated audit gate

## Timeline boundary

`timeline_events` is intentionally not added in this phase.

Reason:

- `public.events` already exists as the current SQL-backed event/timeline spine.
- Phase 6 gates still expect `writeTimelineEvent` to remain skipped until a dedicated table is source-approved.
- This avoids silently breaking previous audits or changing write behavior mid-repair.

## Protected boundaries

This phase does not add:

- autonomous reminders
- notification sending
- background jobs
- direct dashboard writes
- Carnos autonomous scheduling
- memory/RAG
- voice
- web search
- analytics
- export/delete/private mode

## Verification gates

Required:

- `npm run validate:migrations`
- `npm run audit:phase13_5c`
- `npm run check`

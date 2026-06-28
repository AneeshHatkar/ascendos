# Phase 13.5C Calendar / Timeline / Routine Schema Design

Status: Repair scope.

## Purpose

Phase 13.5C closes completed-scope gaps identified after Phases 1-13:

- `calendar_blocks`
- `routines`
- `routine_steps`
- `reminders`

## Added SQL tables

Migration:

- `supabase/migrations/0019_phase13_5c_calendar_timeline_routine_foundation.sql`

Tables:

- `calendar_blocks`
- `routines`
- `routine_steps`
- `reminders`

All four tables include:

- `user_id`
- RLS enabled
- ownership policies
- relevant parent references
- source fields for future Carnos/action provenance
- `created_at`
- `updated_at`

## Timeline decision

`timeline_events` remains deferred.

For v1, `public.events` remains the SQL-backed event/timeline spine. The existing Phase 6 `writeTimelineEvent` helper remains skipped because older gates still enforce that boundary. A future source-approved timeline migration can replace this decision.

## Boundary

Phase 13.5C does not implement:

- autonomous scheduling
- background reminder workers
- push/email/SMS notifications
- voice
- memory/RAG
- web search
- analytics
- private mode/export/delete
- Carnos autonomous calendar editing

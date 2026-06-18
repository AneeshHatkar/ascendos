# Phase 4 Report — Core SQL Spine

## Summary

Phase 4 creates the database foundation for ascendOS + Carnos.

It adds the durable core data model for:

- safety/audit
- Carnos proposed actions
- Carnos chat storage
- goals
- milestones
- daily execution logs
- proof items
- tasks
- timeline/calendar events

## Completed migrations

- 0002_audit_and_ai_actions.sql
- 0003_chat_foundation.sql
- 0004_goals_foundation.sql
- 0005_daily_logs_and_proof_items.sql
- 0006_tasks_and_events.sql

## Completed tables

- audit_logs
- ai_actions
- chat_sessions
- chat_messages
- goals
- goal_milestones
- daily_logs
- proof_items
- tasks
- events

## Completed validation scripts

- scripts/validate-sql-migrations.mjs
- scripts/audit-phase-4.mjs

## Completed typed access

- src/types/database.ts
- src/lib/repositories/core-read.ts
- src/lib/repositories/index.ts

## Safety properties

Phase 4 enforces these baseline properties:

- user-owned table design
- RLS enabled on Phase 4 tables
- owner-only access policies
- parent ownership checks for linked child records
- source links from important records to AI actions and chat messages
- no premature memory_items table
- no write helpers yet
- no silent Carnos mutation path

## Verification commands

Required gate:

- npm run verify:env
- npm run validate:migrations
- npm run audit:phase3
- npm run audit:phase4
- npm run snapshot:code
- rm -rf .next || true
- npm run check
- git diff --check

## Known fixed issues during Phase 4

### Corrupted audit script copy

Problem:
The first Phase 4 audit script had brittle/corrupted parsing and failed.

Fix:
Replaced the parser with safer string-boundary table-block extraction.

### SQL ownership typo

Problem:
Two migrations had referencespublic.profiles missing a space.

Fix:
Corrected to references public.profiles.

### TypeScript compatibility regression

Problem:
The Phase 4 database type rewrite removed Phase 3 helper exports and compatibility fields.

Fix:
Restored ProfileRow, CarnosProfileRow, profiles.onboarding_status, and confirmation_required, then added Phase 4 table aliases.

## Completion decision

Phase 4 can be marked complete after this report is committed and all gates pass.

## Next phase recommendation

Recommended next phase:

Phase 5 — Core Read UI Integration

Suggested goals:

- connect dashboard cards to read-only repository helpers
- show empty states cleanly
- preserve auth boundaries
- do not add write flows yet
- do not add memory yet

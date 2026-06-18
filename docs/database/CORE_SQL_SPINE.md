# ascendOS + Carnos — Core SQL Spine

## Status

Phase 4 foundation.

This document describes the core SQL spine created during Phase 4.

## Purpose

The core SQL spine provides durable storage for the first operational layer of ascendOS:

- audit logs
- AI proposed actions
- Carnos chat sessions
- Carnos chat messages
- goals
- goal milestones
- daily logs
- proof items
- tasks
- events

This is not the full application logic. It is the database backbone that later phases will build on.

## Source-of-truth alignment

The source-of-truth requires ascendOS to be SQL-backed, typed, modular, privacy-aware, confirmation-first for important Carnos writes, proof-first, and timeline-aware.

Phase 4 supports those requirements by creating typed, RLS-protected, user-owned tables.

## Safety rule

Carnos must not silently mutate important user data.

The required future flow is:

user input
-> Carnos extraction
-> proposed action
-> validation
-> user confirmation
-> server write
-> audit log
-> timeline event
-> dashboard refresh

Phase 4 enables this by creating:

- ai_actions
- audit_logs
- source links from operational records back to AI actions and chat messages

## Migrations

Phase 4 migrations:

- 0002_audit_and_ai_actions.sql
- 0003_chat_foundation.sql
- 0004_goals_foundation.sql
- 0005_daily_logs_and_proof_items.sql
- 0006_tasks_and_events.sql

## Tables

### audit_logs

Records important user/system/Carnos write events.

Key concepts:

- user ownership
- actor type
- action type
- target entity
- before/after state
- occurred/logged timestamps

### ai_actions

Stores Carnos proposed actions before execution.

Allowed status lifecycle:

- draft
- pending_confirmation
- approved
- rejected
- executed
- failed
- cancelled

### chat_sessions

Groups Carnos conversations.

### chat_messages

Stores individual messages inside Carnos conversations.

Allowed roles:

- user
- assistant
- system
- tool

### goals

Stores user goals across domains.

### goal_milestones

Stores ordered subtargets for goals.

### daily_logs

Stores daily reality/progress summaries with mission, top actions, wins, blockers, mood, energy, sleep, stress, proof score, and reality score.

### proof_items

Stores evidence of actual work, completion, output, or progress.

### tasks

Stores actionable execution items.

### events

Stores timeline and calendar-style events.

## RLS baseline

Every Phase 4 table is user-owned and has RLS enabled.

Baseline protections:

- users can select their own rows
- users can insert their own rows
- users can update their own mutable rows where appropriate
- users can delete their own mutable rows where appropriate
- child rows validate parent ownership where relevant

## TypeScript typing

Phase 4 updated:

- src/types/database.ts

The file includes:

- Database
- Json
- Row/Insert/Update types for all Phase 4 tables
- convenience aliases such as GoalRow, TaskRow, EventRow, ProofItemRow, and AiActionRow

## Read-only repositories

Phase 4 added:

- src/lib/repositories/core-read.ts
- src/lib/repositories/index.ts

These helpers provide typed read-only access to core tables.

No write helpers were added in Phase 4.

## Validation

Use:

- npm run validate:migrations
- npm run audit:phase4
- npm run check

validate:migrations checks general SQL migration safety.

audit:phase4 checks Phase 4-specific table, RLS, index, source-link, and deferred-scope requirements.

## Deferred from Phase 4

The following are intentionally not implemented in Phase 4:

- full Carnos chat intelligence
- AI extraction engine
- OpenAI/API integration
- Save/Edit/Cancel confirmation UI
- write repositories
- full CRUD dashboards
- memory table
- memory retrieval
- voice
- RAG
- analytics charts
- production deployment

These belong to later phases.

## Current completion status

Phase 4 is not marked complete until:

- docs are added
- completion report is added
- final npm run check passes
- PHASE_STATUS.md is updated
- final Phase 4 commit is pushed

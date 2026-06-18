# Phase 4 — Core SQL Spine Plan

## Status

Planned.

Phase 4 begins after:

- Phase 1 repo/source foundation is complete.
- Phase 2 Next.js shell is complete.
- Phase 3 Supabase/Auth foundation is complete.
- Pre-Phase 4 integrity check passes.

## Goal

Build the SQL-backed core spine for ascendOS + Carnos.

Phase 4 creates the durable database foundation for:

- audit logs
- AI proposed actions
- chat sessions
- chat messages
- goals
- goal milestones
- daily logs
- proof items
- tasks
- events

Phase 4 does not build full Carnos intelligence yet. It creates the schema, type, validation, and read-helper foundation that later phases will use.

## Source-of-truth alignment

The DOCX/JSON require ascendOS to be SQL-backed, typed, modular, and protected by RLS.

Carnos must not silently mutate important data.

Required write flow for important AI-created changes:

    user input
    -> Carnos extraction
    -> proposed action
    -> validation
    -> user confirmation
    -> server write
    -> audit log
    -> timeline event
    -> dashboard refresh

Phase 4 must preserve this rule by creating `ai_actions` and `audit_logs` before later AI write features.

## Phase 4 table scope

Phase 3 already created:

- `profiles`
- `carnos_profiles`

Phase 4 creates:

1. `audit_logs`
2. `ai_actions`
3. `chat_sessions`
4. `chat_messages`
5. `goals`
6. `goal_milestones`
7. `daily_logs`
8. `proof_items`
9. `tasks`
10. `events`

## Table rules

Every user-owned table must include:

- `id`
- `user_id`
- `created_at`
- `updated_at` where appropriate
- RLS enabled
- owner-only policies
- useful indexes

Important records should include source/audit linkage where appropriate:

- `source_ai_action_id`
- `source_chat_message_id`
- `audit_log_id`
- `occurred_at`
- `logged_at`

## Migration order

Use separate migrations for readability and safe debugging:

1. `0002_audit_and_ai_actions.sql`
2. `0003_chat_foundation.sql`
3. `0004_goals_foundation.sql`
4. `0005_daily_logs_and_proof_items.sql`
5. `0006_tasks_and_events.sql`

## Required table summaries

### `audit_logs`

Purpose:
Records important system/user/AI write events.

Required concepts:
- user ownership
- action type
- entity table
- entity id
- actor type
- before/after JSON
- metadata JSON
- occurred/logged timestamp

### `ai_actions`

Purpose:
Stores Carnos proposed actions before execution.

Required concepts:
- user ownership
- action type
- status
- target table
- payload JSON
- validation result JSON
- source chat message
- approved/rejected/executed timestamps

Allowed status pattern:
- `draft`
- `pending_confirmation`
- `approved`
- `rejected`
- `executed`
- `failed`
- `cancelled`

### `chat_sessions`

Purpose:
Groups Carnos conversations.

Required concepts:
- user ownership
- title
- status
- started_at
- ended_at
- summary
- metadata

### `chat_messages`

Purpose:
Stores individual user/Carnos/system messages.

Required concepts:
- user ownership
- session reference
- role
- content
- metadata
- token counts if later needed
- created_at

Allowed roles:
- `user`
- `assistant`
- `system`
- `tool`

### `goals`

Purpose:
Stores user goals across domains.

Required concepts:
- user ownership
- title
- description
- domain
- status
- priority
- horizon
- target date
- proof requirement
- source action/message links

### `goal_milestones`

Purpose:
Stores goal subtargets.

Required concepts:
- user ownership
- goal reference
- title
- status
- due date
- completed_at
- ordering

### `daily_logs`

Purpose:
Stores daily execution reality and proof summary.

Required concepts:
- user ownership
- log date
- mission
- top actions
- mood/energy/sleep-style fields
- proof score
- reality score
- notes
- unique user/date constraint

### `proof_items`

Purpose:
Stores concrete evidence of effort, output, completion, or progress.

Required concepts:
- user ownership
- domain
- title
- description
- proof type
- quantity
- url
- occurred_at
- source action/message links

### `tasks`

Purpose:
Stores actionable tasks.

Required concepts:
- user ownership
- title
- description
- status
- priority
- domain
- due date
- scheduled_at
- completed_at
- goal reference
- source action/message links

### `events`

Purpose:
Stores timeline/calendar events.

Required concepts:
- user ownership
- title
- description
- domain
- event type
- start/end timestamps
- occurred_at
- logged_at
- source action/message links

## RLS policy baseline

For each user-owned table:

- users can select own rows
- users can insert own rows
- users can update own rows
- users can delete own rows where appropriate

No cross-user reads.
No cross-user writes.

## Index baseline

Every table:

- index on `user_id`

Depending on table:

- status
- domain
- created_at
- occurred_at
- logged_at
- due_date
- scheduled_at
- goal_id
- session_id
- source_ai_action_id
- source_chat_message_id

## Deferred from Phase 4

Do not build these in Phase 4:

- full Carnos chat intelligence
- OpenAI/API integration
- freeform extraction engine
- Save/Edit/Cancel confirmation UI
- memory_items
- memory retrieval
- voice
- RAG
- analytics charts
- full CRUD UI
- domain-specific dashboards
- production deployment

These belong to later phases.

## Phase 4 steps

1. Plan lock
2. Audit logs + AI actions migration
3. Chat sessions + chat messages migration
4. Goals + milestones migration
5. Daily logs + proof items migration
6. Tasks + events migration
7. RLS/index/audit-link audit
8. Migration validator upgrade
9. TypeScript database types update
10. Read-only repository helpers
11. Phase 4 audit + docs
12. Mark Phase 4 complete

## Completion gates

Phase 4 can be marked complete only when:

- all Phase 4 migrations exist
- migration validation passes
- Phase 4 audit passes
- TypeScript database types include all Phase 4 tables
- read-only helpers exist
- docs exist
- code snapshot is updated
- `npm run check` passes
- git status is clean

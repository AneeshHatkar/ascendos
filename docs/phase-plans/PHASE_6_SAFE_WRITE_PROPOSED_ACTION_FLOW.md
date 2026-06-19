# Phase 6 — Safe Write / Proposed Action Flow

## Status

Planned implementation phase.

Phase 6 begins after:

- Phase 1 — Source-of-truth foundation
- Phase 2 — Next.js shell / routes / registry
- Phase 3 — Supabase / Auth foundation
- Phase 4 — Core SQL spine
- Phase 5 — Core Read UI Integration
- Phase 5.15 — Python/ML Intelligence Architecture Patch

Phase 6 must preserve all previous phase boundaries.

## Purpose

Phase 6 builds the safe write foundation for ascendOS.

The core goal is to make sure no user data is created, edited, executed, or changed through uncontrolled freeform logic.

Every write-affecting flow must pass through the required safety chain:

proposal -> validation -> Save/Edit/Cancel -> server write -> audit log -> timeline event -> dashboard refresh

This phase creates the controlled write pipeline that future Carnos, future Python/ML intelligence, future agents, and future automations must use.

## Core Rule

Carnos must not directly mutate user data from freeform chat.

Python/ML must not directly mutate SQL.

The app must validate proposed actions.

The user must confirm write-affecting actions.

The server must execute approved writes.

SQL must record the result.

Audit logs must preserve evidence.

Timeline events must preserve meaningful life history.

## In Scope

Phase 6 may add:

- proposed action type definitions
- proposed action payload contracts
- safe action result types
- payload validation helpers
- server-side write helpers
- audit log helper for write actions
- timeline event helper for meaningful writes
- proposed action creation helper
- action lifecycle helpers
- approved-action execution dispatcher
- first safe write flows for tasks, goals, daily logs, and proof items
- Save/Edit/Cancel UI components
- safe proposed action surface in the app
- Phase 6 audit script
- Phase 6 report
- source alignment updates
- logs, ledger, changelog, status, and snapshot updates

## Out of Scope

Phase 6 must not add:

- active Python worker runtime
- ML model runtime
- memory system
- Carnos generation
- external LLM calls
- voice system
- background jobs
- cron jobs
- auto-execution
- service-role key usage in frontend
- direct SQL writes from chat
- direct SQL writes from Python/ML
- hidden memory creation
- hidden personal data collection
- complex analytics
- recommendation scoring
- production deployment changes

## Mandatory Write Flow

All write-affecting actions must follow this flow:

1. A proposed action is created.
2. The proposed action payload is validated.
3. The user sees Save/Edit/Cancel.
4. The user confirms or cancels.
5. The server verifies the authenticated user.
6. The server executes the approved write.
7. The server writes an audit log.
8. The server writes or links a timeline event when meaningful.
9. The UI refreshes the affected dashboard/read surface.
10. The action lifecycle is updated.

## User Confirmation Rule

No write-affecting action may execute without one of these:

- explicit Save
- explicit approval
- explicit confirmed edit-and-save

Cancel must stop the write.

Edit must revalidate the changed payload before execution.

## Server-Side Write Rule

All protected writes must happen server-side.

Client code must not perform privileged Supabase mutations directly.

The server must not trust client-supplied user_id.

The server must derive user ownership from the authenticated session.

## Audit Rule

Every successful write must create an audit log.

Important failed execution attempts should also be auditable when practical.

Audit records must preserve enough evidence to understand:

- who initiated the action
- what action was attempted
- what entity was affected
- whether it succeeded or failed
- what payload or summary was used
- when it happened

## Timeline Rule

Meaningful life/work actions should create or link a timeline event.

Examples:

- task created
- goal created
- daily log created
- proof item created
- important action executed

Timeline events should not be spammy, but important user-facing writes should be traceable.

## Proposed Action Lifecycle

Phase 6 should support a lifecycle similar to:

- draft
- pending_confirmation
- edited
- approved
- cancelled
- executing
- executed
- failed

Exact naming may align with the existing `ai_actions` table and current database type contracts.

If the existing table does not support a perfect lifecycle, Phase 6 should use the safest compatible mapping before adding migrations.

## Preferred Existing Table

Prefer using the existing `ai_actions` table for proposed actions if it can support the required flow.

Do not create a new SQL table unless the existing schema cannot safely support the Phase 6 lifecycle.

If a migration becomes necessary, it must include:

- RLS
- user ownership
- indexes
- migration validation
- type updates
- docs
- audit updates

## First Write Domains

Phase 6 should add safe writes in this order:

1. create_task
2. create_goal
3. create_daily_log
4. create_proof_item

Reason:

Tasks are the safest first write.
Goals are core but more important.
Daily logs affect habit/analytics history.
Proof items affect proof-of-work and progress evidence.

## Phase 6 Step Map

### Phase 6.1 — Plan Lock

Create this Phase 6 plan file.

No runtime code.

### Phase 6.2 — Action Types

Create the central list of allowed action names.

Suggested file:

`src/lib/actions/action-types.ts`

### Phase 6.3 — Proposed Action Contracts

Define payload shapes for supported proposed actions.

Suggested file:

`src/lib/actions/proposed-action-contracts.ts`

### Phase 6.4 — Action Result Types

Define typed success and failure results.

Suggested file:

`src/lib/actions/action-results.ts`

### Phase 6.5 — Payload Validation

Validate proposed action payloads before execution.

Suggested file:

`src/lib/actions/validate-proposed-action.ts`

### Phase 6.6 — Write Audit Helper

Create a reusable audit logging helper for write actions.

Suggested file:

`src/lib/audit/write-audit-log.ts`

### Phase 6.7 — Timeline Event Helper

Create a reusable helper for meaningful timeline records.

Suggested file:

`src/lib/timeline/write-timeline-event.ts`

### Phase 6.8 — Proposed Action Creation Helper

Create proposed actions in pending state.

Suggested file:

`src/lib/actions/create-proposed-action.ts`

### Phase 6.9 — Action Lifecycle Helpers

Add helpers for approval, edit, cancel, execution, and failure states.

Suggested file:

`src/lib/actions/action-lifecycle.ts`

### Phase 6.10 — Execution Dispatcher

Create the single controlled execution gate.

Suggested file:

`src/lib/actions/execute-approved-action.ts`

### Phase 6.11 — Create Task Flow

Implement safe create_task execution through the dispatcher.

### Phase 6.12 — Create Goal Flow

Implement safe create_goal execution through the dispatcher.

### Phase 6.13 — Create Daily Log Flow

Implement safe create_daily_log execution through the dispatcher.

### Phase 6.14 — Create Proof Item Flow

Implement safe create_proof_item execution through the dispatcher.

### Phase 6.15 — Save/Edit/Cancel UI

Create reusable confirmation UI components.

Suggested files:

`src/components/actions/proposed-action-card.tsx`
`src/components/actions/save-edit-cancel-controls.tsx`

### Phase 6.16 — App Surface Wiring

Wire the safe proposed action surface into the app.

Preferred first page:

`/command`

No Carnos generation yet.

### Phase 6.17 — Phase 6 Audit

Create a Phase 6 audit script.

Suggested file:

`scripts/audit-phase-6.mjs`

Wire it into `package.json` and `npm run check`.

### Phase 6.18 — Phase 6 Completion

Create the Phase 6 report and update project records.

Required updates:

- `docs/phase-reports/PHASE_6_SAFE_WRITE_PROPOSED_ACTION_FLOW_REPORT.md`
- `PHASE_STATUS.md`
- `PROJECT_EXECUTION_LOG.md`
- `CODE_LEDGER.md`
- `CHANGELOG.md`
- `CODE_SNAPSHOT.md`
- `scripts/audit-source-alignment.mjs`

Then run all gates, commit, and push.

## Acceptance Criteria

Phase 6 is complete only when:

- Phase 6 plan exists
- action types exist
- proposed action contracts exist
- validation exists
- action result types exist
- audit helper exists
- timeline helper exists
- proposed action creation helper exists
- action lifecycle helpers exist
- execution dispatcher exists
- create_task flow works through the safe pipeline
- create_goal flow works through the safe pipeline
- create_daily_log flow works through the safe pipeline
- create_proof_item flow works through the safe pipeline
- Save/Edit/Cancel UI exists
- proposed action surface is wired into the app
- Phase 6 audit exists
- Phase 6 audit is wired into `npm run check`
- Phase 6 report exists
- project records are updated
- `npm run check` passes
- `git diff --check` passes
- changes are committed
- changes are pushed

## Non-Negotiable Safety Checks

The Phase 6 audit must verify that Phase 6 did not introduce:

- active Python worker runtime
- memory implementation
- Carnos generation bypass
- direct chat-to-database writes
- direct Python-to-SQL writes
- frontend service-role usage
- unaudited write helpers
- unvalidated action execution
- uncontrolled freeform SQL mutation

## Final Phase 6 Principle

Phase 6 is not about making Carnos smart.

Phase 6 is about making ascendOS safe enough for Carnos and future Python/ML to become powerful later without corrupting user data, bypassing confirmation, or creating hidden state.

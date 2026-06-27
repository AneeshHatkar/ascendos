# Phase 13B — Grimoire SQL Schema Design

## Purpose

13B locks the Grimoire schema design before SQL migration work.

13B does not create SQL tables.
13C creates SQL migrations.
13D creates database types and read helpers.

The Grimoire Engine must translate symbolic/codex language into practical execution:

mode -> mission -> action -> proof -> corruption check -> reversion -> weekly throne audit

It must not become an empty fantasy loop.

## Source Authority

Phase 13 schema is based on:

- docs/source-of-truth/ascendOS_Carnos_v1_1_COMPLETE_Implementation_Bible_FINAL_SYNCED.docx
- docs/source-of-truth/ascendOS_Carnos_v1_1_COMPLETE_Source_of_Truth_FINAL_SYNCED.json
- docs/phase-reports/PHASE_13_A_GRIMOIRE_SOURCE_SCOPE_LOCK.md

## Source Rule

Symbolic content is converted into practical action, proof, corruption checks, and reversion. No empty fantasy loop.

## Required Source Tables

- grimoire_modes
- grimoire_daily_logs
- grimoire_skills
- grimoire_corruption_checks
- grimoire_reversions

## Required Dashboard Cards

- Mode Selector
- Mission Mapping
- Corruption Detector
- Reversion
- Weekly Throne Audit
- Symbol-to-Action Translator

## Mission Types

- war
- study
- charm
- money
- recovery
- rebirth
- leadership
- silence
- other

## Shared Ownership Pattern

Every table must include:

- id uuid primary key default gen_random_uuid()
- user_id uuid not null references auth.users(id) on delete cascade
- created_at timestamptz not null default timezone('utc'::text, now())
- updated_at timestamptz not null default timezone('utc'::text, now())

Every table must enable RLS.

Every table must use user-owned policies:

- select own rows
- insert own rows
- update own rows
- delete own rows

Policy pattern:

- using auth.uid() = user_id
- with check auth.uid() = user_id

## Table Design — grimoire_modes

Purpose: stores bounded operating modes.

Columns for 13C:

- id
- user_id
- name
- mission_type
- description
- allowed_use
- forbidden_use
- proof_required
- risk_notes
- reversion_required
- intensity_level
- is_active
- sort_order
- privacy_level
- source_ai_action_id
- source_chat_message_id
- created_at
- updated_at

Required constraints:

- name not blank
- mission_type allowed
- intensity_level in low, medium, high
- privacy_level in normal, private, sensitive, locked

Required indexes:

- grimoire_modes_user_active_sort_idx
- grimoire_modes_user_mission_type_idx
- grimoire_modes_user_intensity_idx

## Table Design — grimoire_daily_logs

Purpose: stores daily active mode, mission, top actions, corruption risk, reversion state, and night review.

Columns for 13C:

- id
- user_id
- log_date
- mode_id
- active_mode
- mission_type
- mission_statement
- top_actions_json
- corruption_risk
- reversion_required
- reversion_done
- night_review
- privacy_level
- related_task_id
- related_goal_id
- related_proof_item_id
- source_ai_action_id
- source_chat_message_id
- notes
- created_at
- updated_at

Required constraints:

- mission_type allowed when present
- top_actions_json must be JSON array
- unique user_id and log_date
- privacy_level allowed

Required indexes:

- grimoire_daily_logs_user_log_date_idx
- grimoire_daily_logs_user_mission_log_date_idx
- grimoire_daily_logs_user_mode_log_date_idx
- grimoire_daily_logs_user_reversion_idx

## Table Design — grimoire_skills

Purpose: stores practical evidence-backed skill labels.

Columns for 13C:

- id
- user_id
- name
- tier
- realm
- description
- proof_required
- status
- related_goal_id
- related_task_id
- related_proof_item_id
- privacy_level
- source_ai_action_id
- source_chat_message_id
- created_at
- updated_at

Allowed tier values:

- initiate
- apprentice
- adept
- master
- custom

Allowed realm values:

- career
- learning
- research
- body
- health
- life_admin
- creative
- social
- money
- recovery
- general
- custom

Allowed status values:

- planned
- active
- blocked
- proved
- archived

Required indexes:

- grimoire_skills_user_status_realm_idx
- grimoire_skills_user_tier_idx
- grimoire_skills_user_goal_idx

## Table Design — grimoire_corruption_checks

Purpose: stores practical warnings when symbolic mode use drifts away from evidence, safety, recovery, or action.

Columns for 13C:

- id
- user_id
- log_date
- daily_log_id
- mode_id
- risk_type
- severity
- evidence
- correction
- status
- privacy_level
- related_task_id
- related_proof_item_id
- source_ai_action_id
- source_chat_message_id
- created_at
- updated_at

Allowed risk_type values:

- fantasy_loop
- avoidance
- identity_inflation
- permanent_overdrive
- proof_avoidance
- burnout
- safety_override
- reversion_skipped
- other

Allowed severity values:

- low
- medium
- high

Allowed status values:

- open
- correcting
- resolved
- ignored
- archived

Required indexes:

- grimoire_corruption_checks_user_log_date_idx
- grimoire_corruption_checks_user_risk_status_idx
- grimoire_corruption_checks_user_severity_status_idx
- grimoire_corruption_checks_user_daily_log_idx

## Table Design — grimoire_reversions

Purpose: stores grounding/recovery/reversion actions after intense or risky mode use.

Columns for 13C:

- id
- user_id
- log_date
- daily_log_id
- mode_id
- mode
- reversion_action
- completed
- completed_at
- privacy_level
- related_task_id
- source_ai_action_id
- source_chat_message_id
- notes
- created_at
- updated_at

Required constraints:

- reversion_action not blank
- privacy_level allowed
- completed_at should only be set when completed is true

Required indexes:

- grimoire_reversions_user_log_date_idx
- grimoire_reversions_user_completed_log_date_idx
- grimoire_reversions_user_daily_log_idx
- grimoire_reversions_user_mode_idx

## Parent Ownership Guard Strategy

Phase 13 follows the Phase 12 pattern and uses two migrations:

- 0016_phase13_grimoire_foundation.sql
- 0017_phase13_parent_ownership_guards.sql

Required guarded links:

- grimoire_daily_logs.mode_id
- grimoire_daily_logs.related_task_id
- grimoire_daily_logs.related_goal_id
- grimoire_daily_logs.related_proof_item_id
- grimoire_daily_logs.source_ai_action_id
- grimoire_daily_logs.source_chat_message_id
- grimoire_skills.related_goal_id
- grimoire_skills.related_task_id
- grimoire_skills.related_proof_item_id
- grimoire_skills.source_ai_action_id
- grimoire_skills.source_chat_message_id
- grimoire_corruption_checks.daily_log_id
- grimoire_corruption_checks.mode_id
- grimoire_corruption_checks.related_task_id
- grimoire_corruption_checks.related_proof_item_id
- grimoire_corruption_checks.source_ai_action_id
- grimoire_corruption_checks.source_chat_message_id
- grimoire_reversions.daily_log_id
- grimoire_reversions.mode_id
- grimoire_reversions.related_task_id
- grimoire_reversions.source_ai_action_id
- grimoire_reversions.source_chat_message_id

## RLS Strategy

Every table must enable RLS and only allow user-owned access.

## Updated-at Trigger Strategy

Every table should use public.set_updated_at().

## Read-First Boundary

13B does not add runtime writes.
13C adds SQL.
13D adds read helpers.
13K may add confirmation-first proposal creation only.

## Explicit Deferred Scope

Deferred from Phase 13 schema:

- grimoire_rituals
- grimoire_quests
- grimoire_spellbook
- grimoire_identity_levels
- grimoire_embeddings
- grimoire_memories
- grimoire_voice_sessions
- weekly_throne_audit_results
- analytics snapshot tables
- dynamic custom tracker tables
- external codex imports

## 13C Migration Plan

13C should create:

- supabase/migrations/0016_phase13_grimoire_foundation.sql
- supabase/migrations/0017_phase13_parent_ownership_guards.sql

13C must include:

- five source-backed tables
- strict ownership
- RLS policies
- constraints
- indexes
- updated_at triggers
- parent ownership guards
- no autonomous writes
- no memory/voice/analytics/custom-tracker implementation

## Phase 13B Verdict

Phase 13B is complete when this schema design file exists, required table/rule/guard markers are present, logs are updated, and git diff --check passes.

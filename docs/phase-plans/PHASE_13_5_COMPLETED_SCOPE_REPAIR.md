# Phase 13.5 — Completed Scope Repair + Final Source Coverage Audit

Status: Locked for repair execution.

## Purpose

Phase 13.5 repairs and verifies any missing or partial source-of-truth scope from the phases/chunks already claimed as built before starting Phase 14 Voice Foundation.

This is not a new future-feature phase.

It exists because the source-vs-repo snapshot found that most foundations are present, but several earlier-scope items are partial, missing, renamed, or unclear.

## Source authority

Primary source files:

1. `docs/source-of-truth/ascendOS_Carnos_v1_1_COMPLETE_Implementation_Bible_FINAL_SYNCED.docx`
2. `docs/source-of-truth/ascendOS_Carnos_v1_1_COMPLETE_Source_of_Truth_FINAL_SYNCED.json`
3. Latest source scope snapshot under `docs/audits/source_scope_snapshot_*`

Conversation memory is not source authority unless reflected in repo files.

## Scope rule

Phase 13.5 may fix only completed-scope gaps through the current built state ending at Phase 13 / Grimoire.

Phase 13.5 must not implement future phases.

## Must fix before Phase 14

### 1. Carnos Chat + Persona Repair

Already present:

- `chat_sessions`
- `chat_messages`
- `/carnos`
- `POST /api/carnos/messages`
- `CarnosMessageComposer`
- read-only Carnos dashboard surface
- safe proposed-action boundaries

Repair target:

- add/verify `persona_prompt_versions`
- lock Carnos personality/persona contract
- expose active persona prompt/version safely
- improve Carnos chat thread/read UI if needed
- make assistant-generation boundary explicit
- ensure Carnos cannot silently write user data
- ensure future assistant output must route through proposed-action confirmation

### 2. Calendar / Timeline / Routine Repair

Already present:

- `tasks`
- `events`
- `/calendar`
- `/timeline`
- proposal APIs for calendar/task flow
- dashboard visibility

Repair target:

- add/verify `calendar_blocks`
- add/verify `routines`
- add/verify `routine_steps`
- add/verify `reminders` if source requires it
- clarify timeline event/write boundary
- ensure routine/calendar records remain user-owned and RLS-protected
- no autonomous schedule rewriting

### 3. Career Subsystem Repair

Already present:

- `job_applications`
- `job_application_events`
- `networking_contacts`
- `networking_interactions`
- `job_referrals`
- `resume_versions`
- `resume_bullets`
- `interviews`
- `/career`
- `/networking`
- `/resume`
- `/interviews`

Repair target:

- add/verify `behavioral_stories`
- add/verify `question_bank`
- add/verify `mock_interviews`
- add/verify `resume_usage` if source requires it
- keep no-scraping/no-auto-apply/no-auto-email boundary

### 4. Settings / Privacy Foundation Repair

Already present:

- `/settings`
- `/privacy`
- `carnos_profiles`
- privacy/safety copy across dashboards

Repair target:

- add/verify `app_settings`
- add/verify `privacy_settings`
- keep full export/delete/private-mode work deferred to Phase 19
- make settings/privacy foundation explicit and auditable

### 5. Placeholder Route Decision

Routes that must be classified:

- `/creativity`
- `/decisions`
- `/future-simulator`
- `/world-class`
- any other placeholder route found by audit

Each must be one of:

- built for v1
- foundation-only for v1
- future phase
- post-v1
- removed from canonical scope if not needed

No placeholder route may remain unexplained.

## Explicit non-scope

Do not implement in Phase 13.5:

- Voice sessions
- voice transcripts
- STT/TTS
- microphone capture
- Memory/RAG
- embeddings
- knowledge retrieval engine
- web search tools
- internet scraping
- analytics/correlation engine
- custom tracker builder
- full export/delete/private mode
- final website polish/deployment
- autonomous Carnos writes
- always-on background jobs
- direct client SQL mutation

## Required completion condition

Phase 13.5 is complete only when the final source coverage audit says every completed-scope item through Phase 13 is one of:

- Built
- Renamed/equivalent
- Repaired in Phase 13.5
- Future phase
- Post-v1
- Explicitly out of scope

No unresolved unknown gaps may remain before Phase 14.

## Machine-check markers

These exact markers are intentionally present for the Phase 13.5 audit gate:

- Web search
- Phase 14 Voice Foundation
- Memory/RAG
- Voice sessions

# Phase 13 — Grimoire Engine

Status: Planned and scope-locked.

## Source authority

Phase 13 implements Source Chunk 15 / Grimoire from:

1. `docs/source-of-truth/ascendOS_Carnos_v1_1_COMPLETE_Implementation_Bible_FINAL_SYNCED.docx`
2. `docs/source-of-truth/ascendOS_Carnos_v1_1_COMPLETE_Source_of_Truth_FINAL_SYNCED.json`

Conversation memory may inform wording only when it fits the source-approved rule:

> Grimoire content must translate symbolism into practical action, proof, corruption checks, and reversion.

## Current repo state

- `/grimoire` currently exists only as a placeholder route.
- No Grimoire SQL tables exist yet.
- No Grimoire database type contracts exist yet.
- No Grimoire read helpers exist yet.
- No Grimoire dashboard data helper exists yet.
- No Grimoire dashboard component exists yet.
- No Grimoire proposal API exists yet.
- No Phase 13 audit gate exists yet.

## Required dashboard

Route: `/grimoire`

Purpose:

Translates codex modes into practical missions, proof actions, corruption warnings, reversion, and weekly audits.

Required cards/components:

- Mode Selector
- Mission Mapping
- Corruption Detector
- Reversion
- Weekly Throne Audit
- Symbol-to-Action Translator

Primary actions:

- select mission
- activate mode
- log reversion
- run weekly audit
- create proof action

Required data sources:

- `grimoire_modes`
- `grimoire_daily_logs`
- `grimoire_skills`
- `grimoire_corruption_checks`
- `grimoire_reversions`

## Required practical loop

Every Grimoire feature must map to this loop:

1. Mode
2. Mission
3. Practical action
4. Proof
5. Corruption check
6. Reversion
7. Weekly throne audit

## Safety and grounding rules

- No empty fantasy loop.
- No divine/fated claims.
- No identity inflation without proof.
- No mode activation without practical mission mapping.
- High-intensity modes require corruption risk naming.
- High-intensity modes require reversion action.
- Important writes must go through proposed actions and confirmation.
- Grimoire outputs must link to tasks, proof, audit, or timeline where relevant.
- Carnos may guide the Grimoire layer, but must separate fact from interpretation.
- Carnos must not silently save, activate, or execute Grimoire actions.

## Phase 13 implementation subphases

### 13A — Source Scope Lock

Lock exact source requirements, current repo gap, planned files, non-goals, and acceptance criteria.

### 13B — SQL Schema Design

Design the Grimoire schema before migration.

Tables:

- `grimoire_modes`
- `grimoire_daily_logs`
- `grimoire_skills`
- `grimoire_corruption_checks`
- `grimoire_reversions`

### 13C — SQL Migration + RLS

Add SQL migration with user ownership, RLS, indexes, timestamps, source links, and parent guards where needed.

### 13D — Database Types + Read Helpers

Update `src/types/database.ts` and add Grimoire read helpers.

### 13E — Dashboard Aggregation

Add Grimoire dashboard data helper and summary shape.

### 13F — Core Grimoire Dashboard UI

Replace placeholder `/grimoire` with authenticated SQL-backed dashboard surface.

### 13G — Mode Selector + Mission Mapping

Add practical mode selection and mission mapping surfaces.

### 13H — Symbol-to-Action Translator

Translate symbolic intention into practical task/proof/reversion proposals.

### 13I — Corruption Detector

Surface corruption risks such as fantasy loop, avoidance, ego spiral, over-intensity, burnout, and proof avoidance.

### 13J — Reversion + Weekly Throne Audit

Add reversion display/action surface and weekly proof/drift/correction audit.

### 13K — Carnos Grimoire Proposal Wiring

Wire proposal-first Grimoire action creation without autonomous writes.

### 13L — Audit Gate + Completion Report

Add Phase 13 audit script, smoke checklist, completion report, changelog, code ledger, and phase status.

## Major code chunks / commit checkpoints

### Code Chunk 1 — Source lock + database foundation

Includes:

- 13A
- 13B
- 13C
- 13D

Checkpoint goal:

- Source scope locked.
- Schema designed.
- SQL migration added.
- Database types added.
- Read helpers added.

### Code Chunk 2 — Read dashboard + route replacement

Includes:

- 13E
- 13F
- 13G

Checkpoint goal:

- `/grimoire` is no longer a placeholder.
- Dashboard reads user-owned SQL data.
- Mode Selector and Mission Mapping are visible.

### Code Chunk 3 — Grimoire engine panels

Includes:

- 13H
- 13I
- 13J

Checkpoint goal:

- Symbol-to-Action Translator exists.
- Corruption Detector exists.
- Reversion exists.
- Weekly Throne Audit exists.

### Code Chunk 4 — Proposal wiring + audit closeout

Includes:

- 13K
- 13L

Checkpoint goal:

- Grimoire can create safe proposed actions.
- No silent writes.
- Phase 13 audit passes.
- Completion report exists.
- `npm run check` passes.

## Explicit non-goals

Phase 13 does not implement:

- Voice foundation
- Memory/RAG
- Embeddings
- Vector search
- Analytics/experiments
- Custom trackers
- Privacy/export/delete
- Full AI generation
- Autonomous Carnos execution
- External integrations
- Unbounded fantasy/codex roleplay

## Completion definition

Phase 13 is complete only when:

- `/grimoire` is no longer a placeholder.
- Required SQL tables exist with RLS.
- Type contracts and read helpers exist.
- Dashboard renders SQL-backed user data or useful empty states.
- Mode Selector exists.
- Mission Mapping exists.
- Corruption Detector exists.
- Reversion exists.
- Weekly Throne Audit exists.
- Symbol-to-Action Translator exists.
- Grimoire proposal creation follows confirmation-first safe write flow.
- Carnos Grimoire guidance remains grounded and practical.
- Audit gate passes.
- `npm run check` passes.

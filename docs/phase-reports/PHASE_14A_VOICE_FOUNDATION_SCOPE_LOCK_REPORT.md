# Phase 14A Voice Foundation Scope Lock Report

Status: Complete when audit passes.

## Locked clarification

Phase 14 build chunks are **14A through 14J**.

Requirement checklist categories are **A through K**.

Build chunks: 10 chunks
Requirement categories: 11 categories
Checklist requirements: 145

## Locked build structure

Phase 14 is locked as a 10-chunk Voice Foundation build:

- 14A — Scope Lock + Safety Contract
- 14B — SQL Foundation
- 14C — Types / Schemas / State Machine / Read Helpers
- 14D — STT/TTS Provider Boundary APIs
- 14E — Voice UI Components
- 14F — Transcript Draft + Manual Simulator
- 14G — Carnos Voice Panel Integration
- 14H — Text/Voice-to-Proposed-Action System Bridge
- 14I — Phase 14 Audit + Smoke Checklist + Completion Report
- 14J — Final Voice/Text Integration Hardening

## Locked scope

Phase 14 includes all 145 checklist-level requirements documented in:

- `docs/phase-plans/PHASE_14A_VOICE_FOUNDATION_SCOPE_LOCK.md`

The most important locked additions are:

- Voice orb / waveform visual.
- Voice state machine.
- Consent-first privacy panel.
- Transcript draft before save.
- Manual transcript fallback.
- Simulated transcript testing flow.
- STT/TTS provider abstractions.
- Provider-not-configured fallback.
- `/carnos` voice integration.
- Carnos text/voice-to-system update bridge.
- Domain routing hints.
- Save/Edit/Cancel confirmation.
- Future domain-action expansion map.
- Final Voice/Text Integration Hardening chunk.

## Route decision

The standalone `/voice-companion` route is deferred.

Phase 14 starts inside `/carnos` and uses reusable voice components/libraries.

## System update bridge decision

Phase 14 must explicitly support the shared input bridge:

    typed Carnos message
    voice transcript
    manual transcript
    simulated transcript
    → shared extraction pipeline
    → proposed actions
    → Save/Edit/Cancel
    → existing Phase 6 safe dispatcher

Allowed Phase 14 actions:

- `create_task`
- `create_goal`
- `create_daily_log`
- `create_proof_item`

Direct domain-specific writes are deferred until safe domain action flows are intentionally added.

## Deferred scope

Phase 14 must not implement:

- Memory/RAG.
- pgvector.
- embeddings.
- knowledge vault retrieval.
- web search.
- analytics snapshots.
- experiment engine.
- custom tracker builder.
- full export/delete/private mode implementation.
- standalone `/voice-companion` route.
- audio storage enabled by default.
- silent voice-derived writes.

## Next step

Phase 14B — SQL Foundation.

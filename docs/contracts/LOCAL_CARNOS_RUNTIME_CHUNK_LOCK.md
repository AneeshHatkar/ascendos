# Local Carnos Runtime Chunk Lock

This lock makes the local LLM/offline AI work a real future build chunk instead of a vague readiness note.

## Decision

The Phase 18 build plan now includes:

- 18M-B — Local Carnos Runtime Boundary + Option C Offline AI Adapter

This inserted chunk comes after:

- 18M — Carnos Analytics Explanation Boundary

And before:

- 18N — Anti-Demo-Data + Privacy/Sensitivity Audit

## Why this is required

Offline mode without a local AI runtime can still support:

- cached dashboards
- cached goals/projects/routines
- cached approved memories
- cached analytics snapshots
- offline daily logging
- offline experiment measurements
- offline sync queue
- deterministic guidance

But it cannot provide true free-form offline Carnos companion chat.

To make Level 4 Full Offline AI Companion real, the project must include a dedicated local runtime boundary chunk.

## Locked implementation target

Primary target:

- Option C — local AI server/runtime on MacBook Pro M3 Pro

Preferred first adapter shape:

- Ollama-compatible localhost runtime boundary

Allowed future performance paths:

- MLX-compatible runtime
- llama.cpp-compatible runtime
- local embedding model
- local retrieval/index store
- Tauri-managed local sidecar

Fallback:

- browser-only local AI is fallback only
- deterministic offline mode remains available when no local model/runtime is available

## Required future chunk behavior

18M-B must add:

- local Carnos runtime contract
- local runtime capability detector
- local model availability state
- local inference request/response types
- local runtime health check boundary
- offline AI mode router
- deterministic fallback mode
- cached context-pack input boundary
- approved-memory cache input boundary
- analytics snapshot cache input boundary
- experiment context cache input boundary
- offline Carnos capability labels
- local runtime unavailable state
- local model missing state
- no-crash fallback behavior
- no false claim that offline AI is active
- no remote-provider dependency while offline
- no silent writes
- no localStorage core data
- no required local runtime during CI/checks

## Safety rule

The app must never break because local Carnos runtime is unavailable.

If local runtime is unavailable:

- offline Carnos chat shows unavailable/local model missing state
- deterministic offline guidance remains available
- offline capture/logging remains available
- sync queue remains available
- cached dashboards remain available

If local runtime is available:

- Carnos may use local model through explicit local runtime boundary
- Carnos may use cached approved memories/context
- Carnos may use cached analytics snapshots
- Carnos may explain offline limitations
- writes still require confirmation or queueing

## Phase 18 integration

The updated order is:

- 18A — Analytics/Experiments Scope Lock
- 18A-B — Companion Persistence Proof Audit + Level 4 Offline AI Readiness Lock
- 18B — Schema Discovery + Metric Source Map
- 18C — Metric Registry + Data Quality Contracts
- 18D — Analytics Snapshot Contracts + Validators
- 18E — Self-Experiment Contracts + Validators
- 18F — Insight Quality + Provenance Contracts
- 18G — Analytics Repository Boundaries
- 18H — Experiment Repository Boundaries
- 18I — Trend / Correlation / Comparison Engine
- 18J — Experiment Evaluation Engine
- 18K — Analytics Dashboard UI
- 18L — Self-Experiment Lab UI
- 18M — Carnos Analytics Explanation Boundary
- 18M-B — Local Carnos Runtime Boundary + Option C Offline AI Adapter
- 18N — Anti-Demo-Data + Privacy/Sensitivity Audit
- 18O — Final Phase 18 Fixtures + Completion Report

## Boundary

This lock does not implement the local runtime yet.

It locks the future build chunk and makes it audit-visible so it cannot be skipped.

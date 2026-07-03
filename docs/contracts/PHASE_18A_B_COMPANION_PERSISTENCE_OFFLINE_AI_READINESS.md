# Phase 18A-B — Companion Persistence Proof Audit + Level 4 Offline AI Readiness Lock

Phase 18A-B is a corrective architecture lock inserted after Phase 18A and before Phase 18B.

It does not replace the original Phase 18 Analytics/Experiments plan. It strengthens Phase 18 by requiring every analytics, experiment, insight, Carnos explanation, and UI layer to respect persistence, close/reopen continuity, login-to-login continuity, offline cache boundaries, sync queue behavior, and Level 4 offline AI readiness.

## Core requirement

Carnos must not be a one-chat companion.

Carnos must be designed as a persistent companion that can reload approved memories, active goals, projects, routines, analytics snapshots, experiments, and allowed context after app close/reopen and login-to-login sessions.

## Storage architecture

The canonical storage architecture is:

- Supabase/Postgres is the online source of truth.
- IndexedDB or equivalent local encrypted cache is the offline continuity layer.
- Browser localStorage is not allowed for core life data.
- Browser localStorage may only store small UI preferences such as theme, collapsed navigation, selected tab, temporary filters, or draft UI state.
- Offline writes must enter a sync queue.
- Sync queue records must preserve user ownership.
- Sync queue records must track operation type.
- Sync queue records must support create, update, delete, archive, and note-like capture operations where relevant.
- Sync queue records must include provenance, local timestamp, intended remote target, retry status, and conflict status.
- Conflicts must be detected before overwrite.
- Duplicates must be detected before creating remote records.
- Failed sync retries must be visible and safe.
- Sensitive and restricted data require stricter offline cache rules.

## Online mode

When online, ascendOS should use:

- Supabase/Postgres for durable app data.
- Online AI provider boundary for Carnos language generation.
- Persisted approved memories and context.
- Current-info/web features when permitted.
- Live analytics source data where available.
- Explicit confirmation before important writes.

## Offline mode

When offline, ascendOS should support:

- cached dashboards
- cached approved memories where allowed
- cached Carnos context packs
- cached analytics snapshots
- offline daily logs
- offline task/journal capture
- offline experiment measurements
- offline lessons learned
- offline action proposals
- offline sync queue
- local-only temporary ids
- clear cached/stale/unsynced labels
- disabled live-only web/current-info features
- Carnos honesty about capability limits

## Level 1 through Level 4 offline companion modes

Level 1 — Offline read-only companion:

- show cached goals
- show cached routines
- show cached projects
- show cached approved memories
- show cached analytics snapshots
- show cached experiments
- show cached recent context

Level 2 — Offline capture companion:

- create daily logs offline
- create mood/energy logs offline
- create workout/food notes offline
- create career notes offline
- create learning/research notes offline
- create experiment measurements offline
- create journal/task/idea captures offline
- place all offline writes into sync queue

Level 3 — Offline deterministic guidance:

- show next tasks from cached data
- show active goals from cached data
- show routine checklist from cached data
- show experiment instructions from cached data
- show missing log prompts from cached data
- show cached analytics summaries
- propose offline-safe actions without executing them silently

Level 4 — Full Offline AI Companion:

- run Carnos through local AI server/runtime when internet is unavailable
- use Option C local server runtime as primary target for MacBook Pro M3 Pro
- use cached approved memories and local context packs
- use local embeddings or local retrieval fallback
- use local retrieval/index layer
- use local analytics snapshots
- support offline Carnos chat mode
- support offline action proposal mode
- support offline experiment/log guidance
- sync captured data back to Supabase/Postgres when online returns
- refresh Carnos context after sync
- show capability labels so Carnos never pretends unavailable tools are available

## Level 4 target decision

For MacBook Pro M3 Pro, the primary Level 4 target is:

- Option C — local AI server/runtime on the Mac.

Option C means:

- ascendOS remains a Next.js app.
- local Carnos can call a localhost AI runtime while offline.
- preferred developer boundary is Ollama-compatible localhost API.
- MLX-compatible and llama.cpp-compatible runtimes are allowed future performance paths.
- local embeddings are allowed through explicit provider boundary only.
- local retrieval/index layer is required before claiming full offline RAG.
- local runtime must be capability-labeled.
- local model presence must be detected before full offline AI mode is advertised.

Future packaging:

- Option B, Tauri desktop wrapper, may later package or supervise the local runtime.
- Option A, browser-only local AI, is fallback only and is not the primary Level 4 target.

## Persistence proof scope

The persistence proof must track:

- where user data is stored
- which tables persist app data
- which tables persist Carnos/memory/context data
- which repositories read/write persisted data
- which features are live
- which features are preview-only
- which data is online source of truth
- which data may be locally cached
- which data must not be locally cached without stricter rules
- which Carnos context layers survive close/reopen
- which Carnos context layers survive login-to-login
- which dashboards still require live wiring
- which offline features require future implementation

## Phase 18 integration

Phase 18B through Phase 18O must respect this lock.

- Phase 18B must map online source tables and offline cache candidates.
- Phase 18C must mark metrics as online, offline-cacheable, or live-only.
- Phase 18D must make snapshots cache-aware and stale-aware.
- Phase 18E must allow experiment measurements to be offline-syncable.
- Phase 18F must mark insights as live, cached, stale, partial, or unsynced.
- Phase 18G must distinguish online analytics repositories from offline cache boundaries.
- Phase 18H must distinguish online experiment repositories from offline sync queue boundaries.
- Phase 18I must calculate trends with cached/unsynced/stale context visibility.
- Phase 18J must evaluate experiments without hiding unsynced records or conflicts.
- Phase 18K must show online/offline/cached/stale analytics UI states.
- Phase 18L must show unsynced experiment records and local temporary state.
- Phase 18M must make Carnos explain whether context is live, cached, stale, or offline.
- Phase 18N must audit against fake offline data, hidden localStorage core storage, and silent offline writes.
- Phase 18O must include fixtures proving online analytics, offline cached analytics, unsynced experiment measurement, stale snapshot warning, and Carnos cached-context explanation.

## Phase 20 tie-in

Phase 20 Privacy/Export must include:

- export of online data
- export of offline cache metadata where appropriate
- delete/forget of online persisted records
- delete/forget of local cached records
- delete/forget of queued offline writes
- privacy handling for sensitive local cache
- offline memory cache removal
- sync-safe deletion semantics

## Phase 21 tie-in

Phase 21 v1 Polish must test:

- close/reopen continuity
- login-to-login continuity
- online-to-offline mode switch
- offline-to-online resync
- sync conflict display
- duplicate prevention
- local Carnos capability labels
- Carnos cached-context honesty
- no one-chat-only behavior
- no silent offline writes
- no lost offline logs
- no hidden localStorage core data

## Non-negotiable boundaries

Phase 18A-B does not claim that full Level 4 runtime is implemented.

It locks the architecture and readiness requirements.

The app must not claim full offline AI unless:

- local model runtime is configured
- local model is available
- local inference boundary is connected
- local approved-memory cache exists
- local retrieval/index exists or fallback retrieval is explicitly labeled
- offline sync queue exists
- online/offline mode router exists
- Carnos capability labels are visible
- privacy rules for local memory/cache exist

# Companion Persistence + Level 4 Offline AI Architecture

This roadmap document defines how Carnos persistence, offline continuity, and Level 4 offline AI fit into Phase 18 and later phases.

## Final intended behavior

Online:

- app uses Supabase/Postgres
- Carnos uses online AI provider boundary
- data syncs normally
- analytics and experiments update from persisted records
- memory and context stay persistent

Offline:

- app uses local encrypted cache
- Carnos uses cached approved memories and cached context
- offline logs and experiment measurements are captured locally
- offline writes go to sync queue
- live-only features are disabled or clearly labeled unavailable
- if Level 4 runtime is available, Carnos uses local AI server/runtime

Back online:

- sync queue pushes local records to Supabase/Postgres
- duplicates are avoided
- conflicts are detected
- failed syncs remain visible
- Carnos context refreshes from merged online/offline data

## Storage layers

| Layer | Purpose |
|---|---|
| Supabase/Postgres | online source of truth |
| IndexedDB or equivalent encrypted local cache | offline continuity |
| Sync queue | offline writes waiting for remote persistence |
| Carnos context pack | allowed runtime context |
| Approved memory cache | offline Carnos continuity |
| Analytics snapshot cache | offline analytics continuity |
| Local AI server/runtime | Level 4 offline Carnos |
| localStorage | UI preferences only, not core data |

## Option C local runtime target

Primary target:

- Option C — local server/runtime on MacBook Pro M3 Pro.

Preferred first boundary:

- localhost API compatible with Ollama-style request/response.

Allowed later performance/runtime paths:

- MLX-compatible runtime
- llama.cpp-compatible runtime
- Tauri-managed local sidecar
- local embedding model
- local retrieval/index store

Not primary:

- browser-only local AI runtime

## Required Level 4 components

Level 4 requires:

- local LLM runtime
- local model availability detection
- local Carnos inference boundary
- local approved-memory cache
- local context-pack builder input
- local embeddings or labeled retrieval fallback
- local retrieval/index layer
- encrypted local data cache
- offline sync queue
- online/offline mode router
- conflict detection
- duplicate detection
- capability labels
- privacy rules for sensitive local cache
- no false claim that unavailable web/current-info tools work offline

## Phase integration map

18A-B:

- locks persistence/offline architecture
- adds persistence proof audit
- locks Level 4 target as Option C

18B:

- maps persisted source tables and offline cache candidates

18C:

- adds metric cacheability and data-quality source-mode rules

18D:

- adds snapshot cache/stale/partial contracts

18E:

- adds offline-syncable experiment measurement contracts

18F:

- adds live/cached/stale/unsynced insight provenance

18G:

- adds analytics repository online/offline boundary

18H:

- adds experiment repository and sync queue boundary

18I:

- adds cached/unsynced/stale-aware trend/correlation/comparison logic

18J:

- adds experiment evaluation with unsynced/conflict-aware confidence

18K:

- adds analytics UI offline/cached/stale states

18L:

- adds experiment UI unsynced/local temporary states

18M:

- adds Carnos analytics explanation with live/cached/offline honesty

18N:

- audits fake offline data, hidden localStorage core data, silent offline writes, and unsafe sensitive cache

18O:

- final Phase 18 fixture proves persistence/offline boundaries

Phase 20:

- privacy/export/delete for online data and offline cache/sync queue

Phase 21:

- final QA for close/reopen, login continuity, offline mode, local Carnos, sync return, and conflict handling

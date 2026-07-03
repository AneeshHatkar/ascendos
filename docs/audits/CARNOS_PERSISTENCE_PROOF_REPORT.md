# Carnos Persistence Proof Report

Generated as part of Phase 18A-B.

## Proof conclusion

Carnos must not be designed as a one-chat/session-only assistant.

The project architecture must preserve user context through persisted storage and approved-memory/context layers.

## Online source of truth

Supabase/Postgres is the online source of truth for durable app data.

Durable app data includes:

- goals
- proof logs
- daily logs
- calendar/timeline records
- career applications
- networking/referrals
- resume versions
- learning sessions
- research notes
- health/body logs
- life admin tasks
- grimoire/creativity logs
- memory candidates
- approved memories
- knowledge items
- retrieval logs
- analytics snapshots
- experiments
- experiment measurements
- insight records where implemented

## Existing persistence-related foundations

The existing project already includes foundations for persistent Carnos and memory continuity:

- memory candidates
- approved memory repository
- memory/RAG schema foundation
- embedding provider boundary
- retrieval ranking/budget/dedupe
- knowledge vault bridge
- source bridge retrieval previews
- Carnos memory context pack builder
- retrieval audit/explanation layer
- Memory/RAG preview UI
- Carnos memory integration panel
- privacy/sensitive/forget readiness

## Offline continuity requirement

Offline continuity must use IndexedDB or equivalent encrypted local cache.

Core life data must not be localStorage-only.

Offline writes must be queued, visible, retryable, and syncable.

## Level 4 offline AI proof target

Level 4 full offline Carnos is a required advanced readiness target.

The selected target for MacBook Pro M3 Pro is Option C:

- local server/runtime on the Mac
- Ollama-compatible localhost boundary first
- MLX-compatible and llama.cpp-compatible runtime paths allowed later
- local embeddings and local retrieval/index readiness required before claiming full offline RAG
- Tauri wrapper may package or supervise local runtime later

## Honesty rule

The app must not claim full offline AI is implemented unless the local model runtime, local model availability, local inference boundary, local retrieval/cache, offline sync queue, and Carnos capability labels exist.

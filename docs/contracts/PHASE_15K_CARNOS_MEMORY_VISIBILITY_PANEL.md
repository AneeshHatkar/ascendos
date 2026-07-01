# Phase 15K — Carnos Memory Visibility Panel

Status: Implemented as preview-only composition.

## Scope

Phase 15K adds the Carnos Memory Visibility Panel.

It shows:

- Carnos memory visibility.
- visible memory refs.
- excluded memory refs.
- hidden memory blocked.
- current context pack visibility.
- approved-memory read layer visibility.
- Carnos entity state visibility.
- project/system state memory visibility.
- source-of-truth hierarchy visibility.
- privacy mode active state.
- do-not-remember rules active state.
- stale memory warnings.
- conflict warnings.
- memory usage transparency.
- `memory_used_in_context_pack`.
- `memory_used_in_carnos_response`.

## Boundaries

This phase is preview only.
It does not add approval, persistence, Supabase calls, SQL reads or writes, retrieval, embeddings, provider calls, hidden Carnos prompt injection, or a standalone `/memory` route.
- no hidden Carnos prompt injection
- no standalone `/memory` route
- Phase 15L
- no approval
- no persistence
- no Supabase
- no SQL reads or writes
- no retrieval
- no embeddings
- no provider calls

## Next phase

Phase 15L — Knowledge Vault Foundation.

- no approval
- no persistence
- no Supabase
- no SQL reads or writes
- no retrieval
- no embeddings
- no provider calls

## Phase 15K Required Audit Markers

- Phase 15K
- Carnos Memory Visibility Panel
- Carnos memory visibility
- visible memory refs
- hidden memory blocked
- current context pack visibility
- approved-memory read layer visibility
- Carnos entity state visibility
- project/system state memory visibility
- source-of-truth hierarchy visibility
- privacy mode active
- do-not-remember rules active
- stale memory warnings
- conflict warnings
- memory_used_in_context_pack
- memory_used_in_carnos_response
- no approval
- no persistence
- no Supabase
- no SQL reads or writes
- no retrieval
- no embeddings
- no provider calls
- no hidden Carnos prompt injection
- standalone `/memory` route
- Phase 15L

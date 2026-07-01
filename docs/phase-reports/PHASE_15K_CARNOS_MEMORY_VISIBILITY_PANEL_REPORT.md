# Phase 15K — Carnos Memory Visibility Panel Report

Status: Complete.

## Completed scope

- Added Carnos memory visibility helper.
- Added Carnos Memory Visibility Panel.
- Wired the panel into canonical `/carnos`.
- Exported helper and dashboard panel.
- Added Phase 15K audit gate.
- Added contract, report, smoke checklist, logs, and status markers.

## Visibility included

- visible memory refs.
- excluded memory refs.
- hidden memory blocked.
- current context pack visibility.
- approved-memory read layer visibility.
- Carnos entity state visibility.
- project/system state memory visibility.
- source-of-truth hierarchy visibility.
- stale memory warnings.
- conflict warnings.
- privacy mode active.
- do-not-remember rules active.
- `memory_used_in_context_pack`.
- `memory_used_in_carnos_response`.

## Protected boundaries

No approval, no persistence, no Supabase calls, no SQL reads or writes, no retrieval, no embeddings, no provider calls, no hidden Carnos prompt injection, and no standalone `/memory` route were added.

## Next phase

Phase 15L — Knowledge Vault Foundation.

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

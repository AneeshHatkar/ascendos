# Phase 15J — Current Context Pack Builder + Context Budget Rules

## Status

Phase 15J adds a preview-only Current Context Pack Builder + Context Budget Rules layer.

## Contract

The Phase 15J helper creates a Current context pack preview from already-ranked approved-memory read layer refs, Carnos entity state, project/system state memory, and source-of-truth hierarchy notes.

Required markers:

- Current context pack
- context budget rules
- context budget notes
- token budget
- section budget
- included memory refs
- excluded memory refs
- approved-memory read layer
- Carnos entity state
- project/system state memory
- source-of-truth hierarchy
- stale memory warnings
- conflict warnings
- privacy mode active
- do-not-remember rules active
- memory_used_in_context_pack

## Boundaries

- preview only
- no approval
- no persistence
- no Supabase
- no SQL reads or writes
- no embeddings
- no provider calls
- no hidden Carnos prompt injection
- no standalone `/memory` route

## Next phase

Phase 15K — Carnos Memory Visibility Panel.

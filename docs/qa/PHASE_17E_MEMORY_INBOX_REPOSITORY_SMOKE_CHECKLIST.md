# Phase 17E — Memory Inbox Repository Smoke Checklist

Status: Complete.

- [x] Memory inbox repository file exists.
- [x] Repository is exported from `src/lib/repositories`.
- [x] Repository can create memory candidates.
- [x] Repository can list memory candidates.
- [x] Repository can get a memory candidate.
- [x] Repository can update candidate review fields.
- [x] Repository can reject candidates.
- [x] Repository can archive candidates.
- [x] Repository can mark candidate sensitivity.
- [x] Repository is user-scoped through `user_id`.
- [x] Repository writes `memory_candidates`.
- [x] Repository does not write `memory_items`.
- [x] Repository does not approve memory.
- [x] Repository does not create embeddings.
- [x] Repository does not retrieve memories for Carnos.
- [x] Repository does not call providers.
- [x] Repository does not scan in the background.
- [x] `npm run audit:phase17e` passes.
- [x] `npm run check` passes.

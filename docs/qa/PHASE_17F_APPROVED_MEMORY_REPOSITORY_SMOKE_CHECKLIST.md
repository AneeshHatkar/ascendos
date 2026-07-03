# Phase 17F — Approved Memory Repository Smoke Checklist

- [x] Repository can create approved memories.
- [x] Repository can approve memory candidates.
- [x] Repository can list approved memories.
- [x] Repository can read approved memories.
- [x] Repository can update approved memories.
- [x] Repository can archive approved memories.
- [x] Repository can forget approved memories.
- [x] Repository can lock approved memories.
- [x] Repository writes `memory_items`.
- [x] Repository links `memory_candidates.approved_memory_item_id`.
- [x] Repository writes `memory_events`.
- [x] Repository does not write `memory_embedding_records`.
- [x] Repository does not write `memory_retrieval_events`.
- [x] Repository does not retrieve or inject Carnos memory context.
- [x] `npm run audit:phase17f` passes.
- [x] `npm run check` passes.

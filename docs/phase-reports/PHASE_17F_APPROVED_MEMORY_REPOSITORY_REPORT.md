# Phase 17F — Approved Memory Repository Report

## Completed

Phase 17F adds the approved-memory repository boundary.

## Added

- `src/lib/repositories/approved-memory-write.ts`
- `approveMemoryCandidate`
- `createApprovedMemory`
- `listApprovedMemories`
- `getApprovedMemory`
- `updateApprovedMemory`
- `archiveApprovedMemory`
- `forgetApprovedMemory`
- `lockApprovedMemory`
- lifecycle `memory_events` writes
- repository barrel export
- audit script

## Table behavior

- Writes `memory_items`
- Updates `memory_candidates`
- Writes `memory_events`
- Does not write `memory_embedding_records`
- Does not write `memory_retrieval_events`

## Safety

This phase does not create embeddings, does not retrieve memories, does not rank memories, does not inject Carnos context, and does not approve anything automatically.

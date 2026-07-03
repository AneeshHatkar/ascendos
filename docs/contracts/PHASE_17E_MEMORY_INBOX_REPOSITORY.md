# Phase 17E — Memory Inbox Repository Contract

Status: Complete.

## Purpose

This step adds the first real Memory/RAG repository boundary for the memory inbox.

It implements candidate persistence only. It does not approve memories, retrieve memories for Carnos, create embeddings, or perform background memory extraction.

## Product features added

- Create memory candidate.
- List memory candidates.
- Get one memory candidate.
- Update memory candidate review fields.
- Reject memory candidate.
- Archive memory candidate.
- Mark memory candidate sensitivity.
- Keep terminal candidates visible as review records when explicitly requested.
- Keep the repository user-scoped through `user_id` filters.

## Canonical table boundary

- `memory_candidates` remains the memory inbox table.
- `memory_items` remains the approved-memory table and is not written in this step.
- `memory_embedding_records` stores embedding metadata only and is not written in this step.
- `memory_retrieval_events` records later explainable retrieval events and is not written in this step.

## Safety rules

- No automatic approval.
- No hidden memory write.
- No embedding generation.
- No vector search.
- No Carnos prompt/context injection.
- No provider calls.
- No background scanning.
- No autonomous memory extraction.
- No writes to approved memory.

## Implemented repository functions

- `createMemoryCandidate`
- `listMemoryCandidates`
- `getMemoryCandidate`
- `updateMemoryCandidate`
- `rejectMemoryCandidate`
- `archiveMemoryCandidate`
- `markMemoryCandidateSensitivity`
- `getMemoryInboxRepositoryBoundarySummary`

## Deferred to later steps

- Approved memory repository.
- Edit-before-approve flow.
- Embedding provider boundary activation.
- Retrieval ranking.
- Carnos memory context pack integration.
- Memory UI.

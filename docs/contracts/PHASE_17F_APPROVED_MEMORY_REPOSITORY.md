# Phase 17F — Approved Memory Repository + Approval Flow Contract

## Purpose

Phase 17F adds the explicit approved-memory write boundary.

## Canonical tables

- `memory_candidates` remains the memory inbox table.
- `memory_items` remains the approved-memory table.
- `memory_events` records lifecycle audit events.
- No `approved_memories` table is created.

## Implemented operations

- Create approved memory
- Approve memory candidate
- List approved memories
- Read approved memory
- Update approved memory
- Archive approved memory
- Forget approved memory
- Lock approved memory
- Record memory lifecycle events

## Approval flow

A candidate can only become approved memory through explicit approval.

The approval flow:

1. Reads one user-scoped `memory_candidates` row.
2. Rejects blocked terminal states.
3. Inserts one `memory_items` row.
4. Updates the candidate with `status = approved`.
5. Links `approved_memory_item_id`.
6. Writes lifecycle rows to `memory_events`.

## Hard boundaries

- No automatic approval
- No hidden memory write
- No embedding generation
- No vector search
- No provider calls
- No Carnos prompt/context injection
- No runtime retrieval
- No background scanner
- No `memory_embedding_records` writes
- No `memory_retrieval_events` writes

## Phase 17F marker

Approved Memory Repository + Approval Flow

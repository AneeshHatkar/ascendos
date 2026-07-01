# Phase 15C — Memory Types, Schemas, Statuses, Sensitivity, Conflict Rules Report

Status: Complete.

Phase 15C created the TypeScript contract layer for Carnos Persistent Memory + Continuity Foundation.

## Completed

- Memory type enums.
- Memory status enums.
- Sensitivity levels.
- Source/provenance enums.
- Domain scopes.
- Audit event types.
- Conflict severity levels.
- Staleness states.
- Usage visibility levels.
- Memory candidate contract.
- Approved memory contract.
- Do-not-remember rule contract.
- Carnos entity state contract.
- Project memory state contract.
- System state memory contract.
- Knowledge vault item contract.
- Current context pack contract.
- Memory audit event contract.
- Validation helpers.
- Conflict/authority rules.
- Staleness rules.
- Sensitivity handling rules.

## Protected boundaries

Phase 15C remains contract-only.

It does not implement:

- database reads
- database writes
- memory candidate persistence
- Memory Inbox UI
- approved-memory retrieval
- Carnos runtime context injection
- embeddings
- pgvector
- provider calls
- hidden RAG
- automatic transcript-to-memory
- autonomous memory writes
- standalone `/memory` route

## Verification

Required commands:

- `npm run audit:phase15c`
- `npm run check`

## Next

Phase 15D — Memory Candidate Engine.

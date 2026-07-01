# Phase 15B — Memory SQL Foundation Report

Status: Complete when audit and full check pass.

## Completed scope

Phase 15B adds SQL-only foundation for Carnos Persistent Memory + Continuity.

Added:

- Memory candidate storage.
- Approved memory storage.
- Memory links.
- Memory events.
- Memory preferences.
- Do-not-remember rules.
- Carnos entity state.
- Carnos context snapshot records.
- Project memory state.
- System memory state.
- Knowledge vault tables.
- Retrieval logs.
- Memory usage logs.
- Memory review queue.
- RLS policies.
- Parent ownership guards.
- Indexes and constraints.

## Protected boundaries

Phase 15B intentionally does not add:

- No TypeScript memory runtime.

- TypeScript memory runtime.
- TypeScript repository helpers.
- TypeScript schemas.
- UI components.
- API routes.
- Carnos context injection.
- Embeddings.
- pgvector.
- Vector columns.
- Memory embeddings table.
- Automatic memory creation.
- Automatic voice transcript memory.
- Retrieval runtime.

## Next phase

Next step: Phase 15C — Memory Types, Schemas, Statuses, Sensitivity, Conflict Rules.

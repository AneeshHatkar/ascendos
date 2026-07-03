# Memory/RAG Database Schema Foundation Smoke Checklist

Status: REQUIRED BEFORE COMPLETION

## Discovery alignment

- [ ] Existing Memory SQL foundation was discovered.
- [ ] Existing `memory_candidates` table is preserved.
- [ ] Existing `memory_items` table is treated as approved memory.
- [ ] Existing `knowledge_items` table is treated as knowledge vault.
- [ ] Existing `retrieval_logs` table is preserved.

## Schema additions

- [ ] `memory_embedding_records` is added.
- [ ] `memory_retrieval_events` is added.
- [ ] `memory_conflict_groups` is added.
- [ ] `memory_conflict_members` is added.
- [ ] `memory_candidates` receives alignment fields.
- [ ] `memory_items` receives alignment fields.
- [ ] `retrieval_logs` receives alignment fields.

## Guardrails

- [ ] No duplicate `approved_memories` table is created.
- [ ] No fake embedding generation is added.
- [ ] No vector search is added.
- [ ] No runtime provider call is added.
- [ ] No standalone `/memory` route is added.
- [ ] No UI is added.
- [ ] No repository is added.
- [ ] No silent memory approval is added.

## Database safety

- [ ] New user-owned tables have RLS enabled.
- [ ] New user-owned tables have owner policies.
- [ ] New linked tables have parent ownership guards.
- [ ] Migration validation passes.

## Verification

- [ ] `npm run validate:migrations` passes.
- [ ] `npm run audit:phase17c` passes.
- [ ] `npm run check` passes.

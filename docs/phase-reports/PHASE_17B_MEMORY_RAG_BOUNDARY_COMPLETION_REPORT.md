# Phase 17B — Boundary + Capability + Schema Ownership Completion Report

Status: Complete pending verification
Phase: 17B
Depends on: Phase 17A commit `da45e0d`

---

## 1. What Phase 17B adds

Phase 17B adds:

- Memory/RAG Data Boundary Matrix.
- Memory/RAG AI Capability Matrix.
- Memory/RAG Schema Ownership Map.
- Phase 17B smoke checklist.
- Phase 17B audit script.
- package.json check-chain wiring.
- log/status/changelog/code ledger updates.

---

## 2. What Phase 17B does not add

Phase 17B adds no:

- SQL migration,
- database table,
- repository,
- API route,
- UI component,
- embedding provider,
- retrieval runtime,
- memory write runtime,
- Carnos runtime behavior,
- voice memory flow.

---

## 3. Boundaries locked

Phase 17B locks:

- memory candidate vs approved memory,
- personal memory vs knowledge,
- memory vs current-info,
- memory vs document note,
- memory vs research/career/goal/project note,
- memory vs Carnos conversation context,
- memory vs manual user entry,
- embedding record vs memory,
- retrieval event vs memory,
- source-to-candidate routing,
- candidate-to-approved routing,
- no silent approved memory creation,
- no fake semantic embeddings,
- no background memory extraction.

---

## 4. Capability rules locked

Phase 17B locks:

- Carnos can propose memory candidates only with user review.
- Carnos cannot silently save durable memory.
- Carnos cannot claim semantic retrieval is active while provider is deferred/noop.
- Carnos must label knowledge separately from personal memory.
- Carnos must not use locked/sensitive memory by default.
- Carnos retrieval must be bounded, audited, and explainable once implemented.

---

## 5. Schema ownership locked for 17C

Phase 17B prepares Phase 17C schema work for:

- memory_candidates,
- approved_memories,
- memory audit/events,
- retrieval events,
- embedding records if scoped,
- conflict/supersession metadata if scoped,
- source bridge metadata,
- privacy/sensitive fields,
- user ownership/RLS compatibility.

Before Phase 17C, schema discovery output must be requested and reviewed.

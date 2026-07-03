# Memory/RAG TypeScript Contracts + Validators Contract

Status: LOCKED
Scope: TypeScript contracts and validators only

---

## What this step adds

This step adds TypeScript contracts and validators aligned to the Memory/RAG schema foundation.

It adds:

- `memory-rag-schema-contracts.ts`
- `memory-rag-schema-validators.ts`

These files model and validate:

- memory candidate schema alignment
- approved memory schema alignment
- memory embedding metadata records
- memory retrieval events
- memory conflict groups
- memory conflict members

---

## Existing contract alignment

The repo already has:

- `memory-enums.ts`
- `memory-contracts.ts`
- `memory-validators.ts`

This step extends the existing contract system instead of replacing it.

---

## Canonical schema mapping

- `memory_candidates` remains the memory inbox table.
- `memory_items` remains the approved-memory table.
- `knowledge_items` remains the knowledge vault table.
- `memory_embedding_records` stores embedding metadata only.
- `memory_retrieval_events` stores explainable retrieval-event metadata.
- `memory_conflict_groups` and `memory_conflict_members` store conflict review metadata.

---

## Boundary

This step does not add:

- Supabase repository code
- SQL reads
- SQL writes
- UI
- runtime retrieval
- generated embeddings
- vector search
- provider calls
- Carnos prompt injection
- memory approval flow

---

## Handoff

The next step may implement the memory inbox repository using these contracts.

Explicit audit marker:

memory_candidates remains the memory inbox table.

Explicit audit marker:

memory_items remains the approved-memory table.

Explicit audit marker:

memory_embedding_records stores embedding metadata only.

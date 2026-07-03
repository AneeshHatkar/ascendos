# Memory/RAG Database Schema Foundation Report

Status: Complete pending verification

---

## 1. What changed

Added a database schema alignment layer on top of the existing Memory SQL foundation.

Created migration:

- `supabase/migrations/0028_memory_rag_schema_alignment.sql`

Added schema for:

- `memory_embedding_records`
- `memory_retrieval_events`
- `memory_conflict_groups`
- `memory_conflict_members`

Extended existing schema for:

- `memory_candidates`
- `memory_items`
- `retrieval_logs`

---

## 2. Why it was additive

Discovery showed the repo already had a large Memory SQL foundation in migration `0024_phase15_memory_sql_foundation.sql`.

Because of that:

- `memory_candidates` was not duplicated.
- `memory_items` remains the approved-memory table.
- `knowledge_items` remains the knowledge vault table.
- `retrieval_logs` and `memory_usage_logs` remain part of the retrieval/usage audit foundation.

---

## 3. Safety boundaries preserved

This step adds no:

- runtime retrieval,
- provider call,
- generated embedding,
- vector search,
- API route,
- UI component,
- repository implementation,
- silent approved memory write.

---

## 4. Verification requirements

Required checks:

- `npm run validate:migrations`
- `npm run audit:phase17a`
- `npm run audit:phase17b`
- `npm run audit:phase17c`
- `npm run check`

All must pass before commit.

Explicit audit marker:

memory_items remains the approved-memory table.

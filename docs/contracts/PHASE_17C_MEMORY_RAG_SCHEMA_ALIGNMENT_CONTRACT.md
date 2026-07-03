# Memory/RAG Database Schema Foundation Contract

Status: LOCKED
Scope: database schema foundation only
Depends on:
- Memory/RAG scope lock
- Memory/RAG boundary maps
- schema discovery output

---

## 1. Discovery result

Schema discovery found that a large Memory SQL foundation already exists in:

`supabase/migrations/0024_phase15_memory_sql_foundation.sql`

Existing canonical tables include:

- `memory_candidates`
- `memory_items`
- `memory_links`
- `memory_events`
- `memory_preferences`
- `memory_do_not_remember_rules`
- `carnos_entity_state`
- `carnos_context_snapshots`
- `project_memory_state`
- `system_memory_state`
- `knowledge_items`
- `knowledge_tags`
- `knowledge_links`
- `retrieval_logs`
- `memory_usage_logs`
- `memory_review_queue`

Therefore this schema step must not duplicate the existing foundation.

---

## 2. Canonical table decisions

The canonical Memory/RAG database model is:

| Concept | Canonical table |
|---|---|
| Memory inbox / proposed memories | `memory_candidates` |
| Approved memories | `memory_items` |
| Knowledge vault items | `knowledge_items` |
| Retrieval audit foundation | `retrieval_logs` |
| Memory usage audit foundation | `memory_usage_logs` |
| Memory lifecycle events | `memory_events` |
| Review queue | `memory_review_queue` |

This step intentionally does not create an `approved_memories` table because `memory_items` already serves that role.

---

## 3. Schema additions

This step adds:

- `memory_embedding_records`
- `memory_retrieval_events`
- `memory_conflict_groups`
- `memory_conflict_members`

It also adds missing alignment fields to:

- `memory_candidates`
- `memory_items`
- `retrieval_logs`

---

## 4. Boundary rules

This schema step does not:

- generate embeddings,
- run vector search,
- activate an embedding provider,
- retrieve memory at runtime,
- approve memory automatically,
- add a standalone memory route,
- add a UI,
- add repositories.

Embedding rows are metadata/status records only. They do not mean semantic retrieval is active.

---

## 5. Ownership and privacy

Every new user-owned table includes:

- `user_id`,
- RLS enabled,
- user-owned CRUD policies,
- parent ownership guards where linked records exist.

The schema preserves:

- no cross-user memory retrieval,
- no cross-user embedding links,
- no cross-user retrieval events,
- no cross-user conflict links.

---

## 6. Handoff

The next step should create TypeScript contracts and validators aligned to this schema.

The next step should not create UI or runtime retrieval yet.

Explicit audit marker:

memory_items already serves that role.

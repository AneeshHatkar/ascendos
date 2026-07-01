# Phase 15B — Memory SQL Schema Design

Status: Implemented locally pending verification.

## Purpose

Phase 15B creates the SQL foundation for Carnos Persistent Memory + Continuity.

This phase supports the Phase 15A lock:

- Carnos Jarvis-like continuity goal.
- User-controlled long-term memory.
- Memory candidates.
- Memory Inbox.
- Approved Memories.
- Rejected Memories.
- Forgotten Memories.
- Conversation continuity records.
- Project continuity records.
- System state memory.
- Carnos entity state.
- Current context pack builder storage.
- Knowledge vault separation.
- Retrieval contract logs.
- Privacy controls.
- Do-not-remember rules.
- Sensitive memory locks.
- Memory provenance.
- Memory confidence.
- Memory staleness.
- Memory review dates.
- Memory priority/ranking.
- Memory conflict resolution.
- Memory usage transparency.
- Memory audit logs.
- Forget/delete derived records.

## Added migrations

- `supabase/migrations/0024_phase15_memory_sql_foundation.sql`
- `supabase/migrations/0025_phase15_memory_parent_ownership_guards.sql`

## Added SQL tables

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

## Explicitly not added

- No `memory_embeddings`.
- No pgvector.
- No vector column.
- No embedding provider.
- No embedding generation.
- No semantic retrieval runtime.
- No Carnos context injection.
- No automatic transcript-to-memory.
- No autonomous memory writes.
- No Memory/RAG UI.
- No `/memory` route.
- No API routes.
- No TypeScript memory repository.
- No TypeScript memory schemas.

## Phase 15B boundary

Phase 15B is database foundation only.

Types, schemas, and read helpers belong to Phase 15C.

Candidate engine belongs to Phase 15D.

Memory Inbox UI belongs to Phase 15E.

Retrieval contracts and context pack behavior belong to later Phase 15 chunks.

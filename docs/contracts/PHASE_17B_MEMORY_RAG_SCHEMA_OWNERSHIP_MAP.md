# Phase 17B — Memory/RAG Schema Ownership Map

Status: LOCKED
Phase: 17B
Scope: schema ownership planning only
Schema changes: none
Migration changes: none

---

## 1. Purpose

This document defines which future Phase 17 schema areas own which concepts before 17C writes any migration.

This is not a migration.
This is not schema implementation.
This is a schema ownership map for Phase 17C and later.

---

## 2. Schema discovery rule

Before Phase 17C writes schema, request and review schema discovery output.

Required discovery before 17C:

    cd ~/Desktop/ascendos || exit 1

    echo "=== PHASE 17C SCHEMA DISCOVERY ==="

    find supabase/migrations -type f | sort

    grep -RInE 'create table|alter table|create type|create policy|enable row level security|memory|memories|embedding|embeddings|knowledge|vault|retrieval|candidate|source|audit|event'       supabase/migrations       | head -500

    grep -RInE 'memory|memories|embedding|embeddings|knowledge|vault|vector|rag|retrieval|carnos-continuity|current-context|approved-memory|candidate|source bridge'       src/lib       src/app       src/components       docs/contracts       docs/phase-reports       scripts       | head -500

    npm run validate:migrations
    npm run check
    git status --short

No Phase 17C migration should be written until this discovery is reviewed.

---

## 3. Future schema ownership map

| Future schema area | Owns | Does not own | Planned phase |
|---|---|---|---|
| memory_candidates | proposed memories pending review | approved durable memory | 17C |
| approved_memories | user-approved durable personal memory | pending candidates | 17C |
| memory_events / memory_audit_log | candidate/approval/archive/forget/lock/supersede events | retrieval ranking logic | 17C or 17F |
| memory_retrieval_events | retrieval audit and explanation trace | source content storage | 17C or 17M |
| memory_embeddings / embedding_records | embedding metadata and vector/provider status if scoped | fake semantic retrieval | 17C or 17H |
| memory_conflicts | conflict/supersession groups if scoped | generic task conflicts | 17C or 17G |
| knowledge retrieval links | relationship between knowledge items and retrieval results | personal memory ownership | 17J |
| source bridge metadata | source type/id/route/provenance | source module data itself | 17K |
| privacy/sensitive fields | lock/sensitivity/forget/delete readiness | full export/delete implementation | 17P / Phase 20 |
| retrieval budget metadata | retrieval count/mode/budget trace | actual semantic provider call | 17I / 17M |

---

## 4. Required fields for memory candidates

Future `memory_candidates` schema should consider:

- id,
- user_id or owner field,
- candidate_text,
- normalized_text if needed,
- source_type,
- source_id,
- source_route,
- source_label,
- proposed_by,
- confidence,
- evidence_strength,
- sensitivity,
- status,
- review_note,
- rejection_reason,
- created_at,
- updated_at,
- reviewed_at,
- archived_at.

Rules:
- status must not default to approved.
- user ownership must be present or RLS-ready.
- candidate status must distinguish pending/rejected/archived/approved-converted.
- candidate must preserve provenance.

---

## 5. Required fields for approved memories

Future `approved_memories` schema should consider:

- id,
- user_id or owner field,
- approved_text,
- source_candidate_id,
- source_type,
- source_id,
- source_route,
- source_label,
- confidence,
- evidence_strength,
- source_reliability,
- sensitivity,
- status,
- locked flag or locked status,
- last_confirmed_at,
- last_used_at,
- approved_at,
- archived_at,
- forgotten_at,
- supersedes_memory_id,
- conflict_group_id,
- conflict_reason,
- resolution_status,
- created_at,
- updated_at.

Rules:
- approved memory must not be created without approval path.
- locked/sensitive memory must be excluded by default from generic retrieval.
- superseded/forgotten/archived memory must be excluded by default.
- last_used_at must only update through retrieval/use paths.

---

## 6. Required fields for retrieval audit

Future retrieval event schema should consider:

- id,
- user_id or owner field,
- retrieval_reason,
- query_label,
- retrieval_mode,
- provider_status,
- used_by_carnos,
- retrieved_memory_ids,
- retrieved_knowledge_ids,
- excluded_count,
- excluded_reason_summary,
- sensitivity_summary,
- context_budget,
- result_count,
- created_at.

Rules:
- retrieval audit must not leak locked/sensitive content in unsafe summaries.
- retrieval mode must identify keyword/foundation/embedding/deferred behavior.
- Carnos memory use must be traceable.

---

## 7. Required fields for embeddings

Future embedding schema should consider:

- id,
- user_id or owner field,
- source_kind,
- source_id,
- provider,
- model,
- dimensions,
- embedding_status,
- embedding_hash or vector field if database supports it,
- generated_at,
- failed_at,
- failure_reason,
- created_at,
- updated_at.

Rules:
- noop/deferred provider must not create fake semantic vectors.
- provider metadata is required if real embedding generation is activated.
- embedding records inherit source sensitivity.

---

## 8. Required fields for conflicts/supersession

Future conflict schema should consider:

- id,
- user_id or owner field,
- conflict_group_id,
- memory_id,
- conflicting_memory_id,
- conflict_reason,
- resolution_status,
- resolved_by,
- resolved_at,
- created_at.

Rules:
- conflict metadata must prevent stale memory from being used blindly.
- superseded memories must be excluded by default from retrieval.
- conflict resolution must be user-visible where relevant.

---

## 9. RLS/user ownership expectations

Any user-owned Memory/RAG table must be RLS-ready once auth exists.

Expected:
- owner/user field,
- validation of ownership in repositories,
- policy compatibility,
- no cross-user memory retrieval,
- no shared memory unless explicitly scoped later.

---

## 10. Phase 17C handoff

Phase 17C must use this ownership map to build schema safely.

Before writing 17C:
- ask for schema discovery,
- inspect existing migration numbering,
- inspect existing audit/event patterns,
- inspect existing source/knowledge table patterns,
- inspect existing RLS conventions,
- then write a migration aligned to this ownership map.

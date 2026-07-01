# Phase 15C — Memory Types, Schemas, Statuses, Sensitivity, Conflict Rules

Status: Implemented as TypeScript contracts only.

Phase 15C adds the controlled contract layer for Carnos Persistent Memory + Continuity Foundation. It does not add UI, retrieval, embeddings, RAG, Carnos prompt injection, provider calls, Supabase reads, Supabase writes, autonomous memory behavior, or voice transcript auto-memory.

## Files

- `src/lib/carnos-continuity/memory-enums.ts`
- `src/lib/carnos-continuity/memory-contracts.ts`
- `src/lib/carnos-continuity/memory-validators.ts`
- `src/lib/carnos-continuity/memory-conflict-rules.ts`
- `src/lib/carnos-continuity/index.ts`

## Memory types locked

- `preference`
- `goal`
- `project_fact`
- `project_decision`
- `routine`
- `system_state`
- `carnos_entity_state`
- `source_of_truth_note`
- `conversation_continuity`
- `user_profile_fact`
- `sensitive_note`
- `knowledge_item`
- `voice_transcript_candidate`
- `research_note`
- `career_context`
- `health_context`
- `grimoire_context`
- `privacy_rule`
- `do_not_remember_rule`

## Memory statuses locked

- `candidate`
- `pending_review`
- `approved`
- `edited`
- `rejected`
- `archived`
- `forgotten`
- `stale`
- `needs_review`
- `blocked_by_private_mode`
- `blocked_by_do_not_remember`

## Sensitivity levels locked

- `low`
- `medium`
- `high`
- `restricted`

## Source/provenance contract locked

Every memory candidate or approved memory must be shaped around provenance:

- `source_type`
- `source_table`
- `source_id`
- `source_route`
- `source_phase`
- `source_commit`
- `source_label`
- `captured_at`

## Review metadata locked

Every candidate/approved memory must support:

- `confidence`
- `priority`
- `sensitivity`
- `staleness`
- `review_after`
- `last_confirmed_at`
- `conflict_severity`
- `visibility`

## Carnos entity state contract locked

Carnos entity state includes:

- Carnos name
- app name ascendOS
- role
- mission
- tone
- current mode
- active project
- current phase
- latest milestone
- next objective
- forbidden behaviors
- response preferences
- memory policy
- voice policy
- action policy
- source-of-truth policy

## Project/system continuity contract locked

Project/system continuity includes:

- project name
- repo path
- remote URL
- branch
- latest commit
- last pushed commit
- current phase
- completed phases
- next phase
- source-of-truth files
- active boundaries
- deferred scope
- known errors
- verification gates
- source hierarchy

## Knowledge vault separation locked

Knowledge vault records are not personal memory by default. Uploaded docs are not automatically embedded. Knowledge records must remain separate from approved personal memories unless a later explicit review flow converts them.

## Conflict rules locked

- Higher source-of-truth beats lower source when conflicts exist.
- Approved or edited memories beat candidate memories.
- Forgotten memories are never retrieved.
- Rejected memories are never retrieved.
- Archived memories are not retrieved unless explicitly requested later.
- Private-mode-blocked memories are never retrieved.
- Do-not-remember-blocked memories are never retrieved.
- Restricted memories require explicit relevance and usage visibility.
- Stale memories must be surfaced with caution or sent to review.
- Equal-authority conflicts require user review instead of silent resolution.

## Forbidden in Phase 15C

- No SQL migrations.
- No new memory tables.
- No `memory_embeddings`.
- No pgvector.
- No vector columns.
- No OpenAI calls.
- No `generateText`.
- No `streamText`.
- No `fetch`.
- No timers.
- No Supabase reads.
- No Supabase writes.
- No Carnos prompt injection.
- No automatic transcript-to-memory.
- No hidden memory retrieval.
- No standalone `/memory` route.
- No runtime RAG.

## Next step

Phase 15D — Memory Candidate Engine.

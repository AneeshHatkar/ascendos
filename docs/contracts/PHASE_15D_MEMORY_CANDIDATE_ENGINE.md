# Phase 15D — Memory Candidate Engine

Status: Implemented.

Phase 15D adds the local candidate-generation engine for Carnos Persistent Memory + Continuity Foundation.

The engine creates reviewable memory candidate previews. It does not approve, save, retrieve, embed, inject, or execute memory.

## Implemented file

- `src/lib/carnos-continuity/memory-candidate-engine.ts`

## Engine responsibilities

The Memory Candidate Engine can:

- normalize raw memory text
- classify memory type
- classify domain scope
- classify sensitivity
- build provenance
- assign confidence
- assign priority
- create review metadata
- detect private mode blocking
- detect do-not-remember rule blocking
- detect empty content blocking
- detect lightweight duplicate hints
- detect lightweight conflict hints
- create a `MemoryCandidateContract` preview

## Supported sources

- `manual_remember`
- `manual_do_not_remember`
- `chat_message`
- `voice_transcript_draft`
- `source_of_truth`
- `repo_log`
- `phase_report`
- `audit_report`
- `project_state`
- `system_state`
- `domain_record`
- `knowledge_document`

## Candidate statuses produced

The Phase 15D engine may produce:

- `candidate`
- `blocked_by_private_mode`
- `blocked_by_do_not_remember`

It does not produce approved memories.

## Blocking rules

The engine blocks candidate creation when:

- private mode is active
- content is empty
- an active do-not-remember rule matches the candidate source/type/scope/keywords

## Duplicate and conflict hints

The engine can produce duplicate and conflict hints, but it does not resolve them silently.

Duplicate/conflict resolution remains later Memory Inbox behavior.

## Sensitive memory handling

The engine marks likely sensitive content as `high` or `restricted`.

Sensitive examples include:

- health/body
- medical
- supplements/dosage
- mental/emotion
- skin/hair/body
- privacy rules
- do-not-remember rules
- secrets/password-like material

## Protected boundaries

Phase 15D does not add:

- SQL migrations
- Supabase reads
- Supabase writes
- memory approval
- Memory Inbox UI
- approved-memory retrieval
- Carnos runtime context injection
- embeddings
- pgvector
- provider calls
- OpenAI calls
- background jobs
- timers
- automatic transcript-to-memory
- standalone `/memory` route

## Next step

Phase 15E — Memory Inbox UI.

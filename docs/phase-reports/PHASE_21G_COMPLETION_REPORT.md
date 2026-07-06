# Phase 21G Completion Report — Memory Review and Context Use

## Scope
Phase 21G activates Athena memory review and approved-memory context use without inventing new schema.

## Source-locked rules
- `memory_candidates` remains the review inbox table.
- `memory_items` remains the canonical approved-memory table.
- No `approved_memories` table was created.
- No automatic transcript-to-memory was added.
- No autonomous memory writes were added.
- Chat history remains separate from long-term approved memory.
- Knowledge/current-info remains separate from personal memory.
- Restricted, forgotten, rejected, archived, and unapproved memory is blocked from Athena context.

## Implemented
- Added Athena memory-control boundary using exact SQL columns from migrations 0024 and 0028.
- Added memory candidate creation from Athena chat/manual text.
- Added candidate edit, approve, and reject routes.
- Added approved memory forget/archive/retrieval-toggle route.
- Added approved-memory context builder for Athena responses.
- Added `memory_retrieval_events` transparency logging for Athena context use.
- Added Athena Memory Review panel to the Athena chat surface.
- Added visible memory truth copy: candidates are not approved memory, and approved memory context is visible and user-controlled.
- Added secret-like content blocking for candidate creation.
- Added do-not-remember phrase blocking for candidate creation.
- Added no semantic retrieval, no embeddings, no vector search, no hidden prompt injection.

## Routes
- `GET /api/athena/memory-candidates`
- `POST /api/athena/memory-candidates`
- `PATCH /api/athena/memory-candidates/[candidateId]`
- `POST /api/athena/memory-candidates/[candidateId]/approve`
- `POST /api/athena/memory-candidates/[candidateId]/reject`
- `PATCH /api/athena/memory-items/[memoryItemId]`

## Non-goals
- No SQL migration.
- No new memory tables.
- No embedding generation.
- No semantic/vector retrieval.
- No automatic memory approval.
- No background scanning.
- No browser/localStorage/IndexedDB secrets.
- No memory use without visible retrieval metadata.
- No physical deletion route; forget/archive is status-based and retrieval-disabled.

## Verification to run
- `npm run lint`
- `npm run validate:routes`
- `npm run validate:registry`
- `npm run build`
- `git diff --check`
- `npm run check`
- `npm run audit:phase20z`

## Phase 21N browser-test notes
Browser-test candidate creation, edit, approve, reject, approved-memory retrieval visibility, retrieval toggle, forget, archive, blocked secret-like candidate, blocked do-not-remember candidate, and Athena response metadata transparency.

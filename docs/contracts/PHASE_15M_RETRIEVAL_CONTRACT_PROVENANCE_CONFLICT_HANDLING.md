# Phase 15M — Retrieval Contract + Provenance + Conflict Handling

Status: Implemented as a preview-only TypeScript contract.

## Scope

Phase 15M defines the retrieval contract before runtime retrieval exists.

It includes:

- Retrieval Contract + Provenance + Conflict Handling
- retrieval contract
- provenance required
- conflict handling
- source authority
- visible source labels
- allowed retrieval surfaces
- blocked retrieval reasons
- memory retrieval remains preview-only
- knowledge retrieval remains preview-only

## Required provenance

Retrieval previews must expose visible source labels and source metadata. At minimum, memory and knowledge preview refs should include source type, source label, source route, and source phase.

## Conflict handling

Conflicts are visible warnings. High or blocking conflicts require review. Equal-authority conflicts must not be silently resolved.

## Knowledge vault rule

Knowledge vault records are not personal memory. Knowledge vault refs cannot become hidden Carnos memory unless a future explicit conversion/review flow approves them.

## Boundary

Phase 15M does not add runtime retrieval.

Forbidden in this phase:

- no SQL reads or writes
- no Supabase calls
- no embeddings
- no vector search
- no provider calls
- no hidden Carnos prompt injection
- no standalone `/memory` route

## Next

Phase 15N — Embedding Boundary / Noop Provider.

- standalone /memory route remains absent.

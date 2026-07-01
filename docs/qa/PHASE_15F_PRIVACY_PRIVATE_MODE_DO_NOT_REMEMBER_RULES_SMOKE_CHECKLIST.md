# Phase 15F Privacy / Private Mode / Do-Not-Remember Rules Smoke Checklist

## Contract checks

- Privacy rule contract file exists.
- Private mode preview helper exists.
- Do-not-remember rule preview helper exists.
- Privacy evaluation function exists.
- Privacy evaluation returns safe status.
- Privacy evaluation returns block reasons.
- Privacy evaluation returns redaction decision.
- Private mode blocks memory candidates.
- Do-not-remember rules block memory candidates.
- Sensitive memory requires review.
- Restricted memory requires explicit allow.

## UI checks

- Memory privacy preview panel exists.
- Panel displays private mode state.
- Panel displays do-not-remember rules.
- Panel displays blocked categories.
- Panel displays restricted categories.
- Panel displays candidate privacy evaluation.
- Panel displays redaction preview.
- Panel displays protected boundaries.

## Boundary checks

- no approval
- no persistence
- no retrieval
- no embeddings
- no provider calls
- no Supabase
- no standalone `/memory` route
- no hidden Carnos prompt injection
- no automatic transcript-to-memory

## Next step

Phase 15G — Approved Memory Read Layer + Ranking/Staleness Rules.

## Exact audit markers

- Privacy, Private Mode, Do-Not-Remember Rules
- private mode blocking
- do-not-remember rule blocking

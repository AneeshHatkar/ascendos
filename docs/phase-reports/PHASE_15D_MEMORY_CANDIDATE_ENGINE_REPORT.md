# Phase 15D — Memory Candidate Engine Report

Status: Complete.

Phase 15D added the local, non-persistent Memory Candidate Engine.

## Completed

- Added candidate preview engine.
- Added text normalization.
- Added source validation.
- Added memory type derivation.
- Added domain scope derivation.
- Added sensitivity derivation.
- Added provenance builder.
- Added review metadata builder.
- Added private mode blocking.
- Added do-not-remember rule blocking.
- Added empty content blocking.
- Added duplicate hints.
- Added conflict hints.
- Added warnings for sensitive candidates.
- Added barrel export.

## Boundary kept

The candidate engine is preview-only.

It does not:

- approve memory
- persist memory
- retrieve approved memory
- inject memory into Carnos
- embed memory
- call providers
- call OpenAI
- call Supabase
- run background jobs
- create a standalone memory route

## Verification

Required gates:

- `npm run audit:phase15d`
- `npm run check`

## Next

Phase 15E — Memory Inbox UI.

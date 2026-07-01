# Phase 15G Approved Memory Read Layer + Ranking/Staleness Rules Report

Status: Complete.

## Completed scope

Phase 15G adds a local approved memory read layer preview helper and dashboard panel.

Implemented:

- approved memory read layer
- ranking
- staleness
- approved/edited eligibility filter
- blocked status exclusion
- private-mode and do-not-remember active-state exclusion
- source authority scoring
- source-of-truth boost
- sensitivity and conflict penalties
- staleness warnings
- transparent included/excluded refs

## Verification gates

- `npm run audit:phase15g`
- `npm run build`
- `npm run check`

## Protected boundaries

- no approval
- no persistence
- no Supabase
- no SQL reads or writes
- no embeddings
- no provider calls
- no hidden Carnos prompt injection
- no context pack builder
- no standalone `/memory` route

## Next phase

Phase 15H — Carnos Entity State.

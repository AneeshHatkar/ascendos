# Phase 15G Approved Memory Read Layer + Ranking/Staleness Rules Smoke Checklist

## Automated checks

- [ ] `npm run audit:phase15g` passes.
- [ ] `npm run build` passes.
- [ ] `npm run check` passes.

## Helper checks

- [ ] Approved memory read layer helper exists.
- [ ] Ranking function exists.
- [ ] Staleness summary function exists.
- [ ] Only approved/edited memories are included.
- [ ] Blocked, forgotten, rejected, archived, private-mode-blocked, and do-not-remember-blocked states are excluded.
- [ ] Stale memories produce warnings.
- [ ] Restricted memories require explicit inclusion.

## UI checks

- [ ] Approved memory read-layer preview panel renders.
- [ ] Included memory refs are visible.
- [ ] Excluded memory refs are visible.
- [ ] Staleness warnings are visible.
- [ ] Protected boundaries are visible.

## Protected boundaries

- [ ] no approval
- [ ] no persistence
- [ ] no Supabase
- [ ] no SQL reads or writes
- [ ] no embeddings
- [ ] no provider calls
- [ ] no hidden Carnos prompt injection
- [ ] no context pack builder
- [ ] no standalone `/memory` route

## Next phase

Phase 15H — Carnos Entity State.

## Audit marker lock

- approved memory read layer
- ranking
- staleness

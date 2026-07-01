# Phase 15J — Current Context Pack Builder + Context Budget Rules Smoke Checklist

## Structural checks

- [ ] Current Context Pack Builder + Context Budget Rules helper exists.
- [ ] Current context pack preview exists.
- [ ] context budget rules exist.
- [ ] context budget notes exist.
- [ ] token budget exists.
- [ ] section budget exists.
- [ ] included memory refs are visible.
- [ ] excluded memory refs are visible.
- [ ] approved-memory read layer is reused.
- [ ] Carnos entity state summary is supported.
- [ ] project/system state memory summary is supported.
- [ ] source-of-truth hierarchy notes are supported.
- [ ] stale memory warnings are visible.
- [ ] conflict warnings are visible.
- [ ] privacy mode active flag is visible.
- [ ] do-not-remember rules active flag is visible.
- [ ] memory_used_in_context_pack event preview is present.

## Boundary checks

- [ ] no approval
- [ ] no persistence
- [ ] no Supabase
- [ ] no SQL reads or writes
- [ ] no embeddings
- [ ] no provider calls
- [ ] no hidden Carnos prompt injection
- [ ] standalone `/memory` route is absent

## Validation

- [ ] `npm run audit:phase15j`
- [ ] `npm run build`
- [ ] `npm run check`

## Next phase

Phase 15K — Carnos Memory Visibility Panel.

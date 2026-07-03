# Phase 16.5F — Carnos Capability Matrix + Truthfulness Panel Smoke Checklist

Status: Complete pending verification.

## Component files

- [x] `src/components/carnos/carnos-capability-matrix-panel.tsx` exists.
- [x] `src/components/carnos/carnos-boundary-badges.tsx` exists.
- [x] `src/components/carnos/index.ts` exports the capability panel and boundary badges.

## Capability matrix

- [x] `CarnosCapabilityMatrixPanel` exists.
- [x] `CarnosCapabilityMatrixPanelProps` exists.
- [x] Uses `CARNOS_CAPABILITY_MATRIX`.
- [x] Uses `isCarnosRuntimeCapabilityEnabled`.
- [x] Shows `enabled`.
- [x] Shows `foundation_present`.
- [x] Shows `runtime_deferred`.
- [x] Shows `requires_confirmation`.
- [x] Shows `forbidden`.
- [x] Shows `planned`.
- [x] Shows runtime active vs not active.
- [x] Shows no fake active runtime controls.
- [x] Includes descriptive-only truthfulness copy.

## Boundary badges

- [x] `CarnosBoundaryBadges` exists.
- [x] `CarnosBoundaryBadgesProps` exists.
- [x] Uses `CARNOS_BOUNDARY_BADGES`.
- [x] Shows confirmation required.
- [x] Shows no hidden memory.
- [x] Shows no silent browsing.
- [x] Shows no autosave.
- [x] Shows truthful UI.

## Boundaries

- [x] No dashboard panel is added.
- [x] No page integration is added.
- [x] No API route is added.
- [x] No SQL migration is added.
- [x] No voice runtime is added.
- [x] No internet provider call is added.
- [x] No Python/tool execution is added.
- [x] No document ingestion is added.
- [x] No memory write is added.
- [x] No autonomous action is added.

## Verification

- [ ] `npm run audit:phase16_5f` passes.
- [ ] `npx tsc --noEmit` passes.
- [ ] `npm run check` passes.

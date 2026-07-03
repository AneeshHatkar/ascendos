# Phase 16.5E — Carnos Companion Widget / Dock Smoke Checklist

Status: Complete pending verification.

## Component files

- [x] `src/components/carnos/carnos-companion-widget.tsx` exists.
- [x] `src/components/carnos/carnos-companion-dock.tsx` exists.
- [x] `src/components/carnos/index.ts` exports the widget and dock.

## Widget

- [x] `CarnosCompanionWidget` exists.
- [x] `CarnosCompanionWidgetProps` exists.
- [x] `CarnosCompanionWidgetMode` exists.
- [x] Uses `CarnosOrb`.
- [x] Uses `CARNOS_BOUNDARY_BADGES`.
- [x] Uses `CARNOS_MOBILE_COMPANION_SURFACE_TOKEN`.
- [x] Supports `compact`.
- [x] Supports `expanded`.
- [x] Supports `mobile_pill`.
- [x] Shows `Visual only`.
- [x] Includes runtime boundary copy.

## Dock

- [x] `CarnosCompanionDock` exists.
- [x] `CarnosCompanionDockProps` exists.
- [x] `CarnosCompanionDockPlacement` exists.
- [x] Supports `bottom_right`.
- [x] Supports `bottom_left`.
- [x] Supports `inline`.
- [x] Supports `mobile_inline`.

## Boundaries

- [x] No capability matrix panel is added.
- [x] No boundary badges component is added.
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

- [ ] `npm run audit:phase16_5e` passes.
- [ ] `npx tsc --noEmit` passes.
- [ ] `npm run check` passes.

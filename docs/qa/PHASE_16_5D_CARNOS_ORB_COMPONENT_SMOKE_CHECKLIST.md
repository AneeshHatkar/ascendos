# Phase 16.5D — Carnos Orb / Avatar Component Smoke Checklist

Status: Complete pending verification.

## Component

- [x] `src/components/carnos/carnos-orb.tsx` exists.
- [x] `src/components/carnos/index.ts` exports `CarnosOrb`.
- [x] `CarnosOrbProps` exists.
- [x] `CarnosOrbSize` exists.

## State-driven visuals

- [x] Uses `CarnosVisualStateId`.
- [x] Uses `getCarnosVisualState`.
- [x] Uses `getCarnosStateVisualToken`.
- [x] Uses `getCarnosAriaLabel`.
- [x] Supports `idle`.
- [x] Supports `focused`.
- [x] Supports `listening_visual_ready`.
- [x] Supports `speaking_visual_ready`.
- [x] Supports `reviewing_memory`.
- [x] Supports `reviewing_current_info`.
- [x] Supports `privacy_locked`.
- [x] Supports `action_pending`.
- [x] Supports `warning`.

## Accessibility

- [x] Includes `aria-label`.
- [x] Includes `role="img"`.
- [x] Includes `role="presentation"`.
- [x] Includes `figcaption`.
- [x] Includes `sr-only` fallback status.
- [x] Includes `motion-reduce:animate-none`.
- [x] Uses non-flashing visual boundaries.

## Boundaries

- [x] No companion widget is added.
- [x] No companion dock is added.
- [x] No capability matrix panel is added.
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

- [ ] `npm run audit:phase16_5d` passes.
- [ ] `npx tsc --noEmit` passes.
- [ ] `npm run check` passes.

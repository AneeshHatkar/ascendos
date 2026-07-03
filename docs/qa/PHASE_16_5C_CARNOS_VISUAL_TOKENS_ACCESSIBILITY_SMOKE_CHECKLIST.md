# Phase 16.5C — Carnos Visual Tokens + Accessibility + Reduced Motion Smoke Checklist

Status: Complete pending verification.

## Token files

- [x] `src/lib/carnos-identity/carnos-visual-tokens.ts` exists.
- [x] `src/lib/carnos-identity/carnos-accessibility.ts` exists.

## Visual tokens

- [x] `CARNOS_BASE_VISUAL_TOKENS` exists.
- [x] `CARNOS_TONE_TOKENS` exists.
- [x] `CARNOS_STATE_VISUAL_TOKENS` exists.
- [x] `CARNOS_RESPONSIVE_TOKENS` exists.
- [x] `CARNOS_MOTION_BOUNDARIES` exists.

## Accessibility

- [x] `CARNOS_ACCESSIBILITY_RULES` exists.
- [x] `CARNOS_ACCESSIBLE_STATE_LABELS` exists.
- [x] `CARNOS_REDUCED_MOTION_REQUIREMENTS` exists.
- [x] `getCarnosAccessibleStateLabel` exists.
- [x] `getCarnosAriaLabel` exists.

## Safety

- [x] prefers-reduced-motion support is required.
- [x] static fallback is required.
- [x] no flashing is required.
- [x] no aggressive pulse is required.
- [x] mobile no-overlap is required.
- [x] truthful state labels are required.

## Boundaries

- [x] No UI component is added.
- [x] No orb component is added.
- [x] No companion widget is added.
- [x] No API route is added.
- [x] No SQL migration is added.
- [x] No voice runtime is added.
- [x] No internet provider call is added.
- [x] No Python/tool execution is added.
- [x] No document ingestion is added.
- [x] No memory write is added.
- [x] No autonomous action is added.

## Verification

- [ ] `npm run audit:phase16_5c` passes.
- [ ] `npx tsc --noEmit` passes.
- [ ] `npm run check` passes.

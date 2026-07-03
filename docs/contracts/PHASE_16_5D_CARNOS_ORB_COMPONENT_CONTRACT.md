# Phase 16.5D — Carnos Orb / Avatar Component Contract

Status: Complete pending verification.

## Purpose

Add the first visual Carnos orb/avatar component using the locked Phase 16.5B identity contract and Phase 16.5C visual-token/accessibility contract.

## Added files

- `src/components/carnos/carnos-orb.tsx`
- `src/components/carnos/index.ts`

## Component marker

The component exports:

- `CarnosOrb`
- `CarnosOrbProps`
- `CarnosOrbSize`

## Required component behavior

The `CarnosOrb` component must support:

- state-based visuals
- `CarnosVisualStateId`
- `getCarnosVisualState`
- `getCarnosStateVisualToken`
- `getCarnosAriaLabel`
- reduced-motion fallback
- static fallback styling
- truthful screen-reader labels
- non-flashing animation boundaries
- data markers for auditability

## Required visual structure

The orb includes:

- Carnos orb shell
- Carnos aura
- Carnos outer ring
- Carnos inner glass
- Carnos core glow
- Carnos mask shell
- Carnos mask eye
- Carnos left and right node details

## Required state-specific visual markers

The component includes state-safe markers for:

- `reviewing_current_info` source nodes
- `reviewing_memory` memory glyph
- `privacy_locked` shield ring
- `action_pending` confirmation halo
- `warning` warning ring

## Accessibility

The component includes:

- `aria-label`
- `role="img"` for non-decorative usage
- `role="presentation"` for decorative usage
- `figcaption`
- `sr-only` fallback status
- no flashing
- no aggressive pulse
- reduced-motion classes

## Truthfulness boundary

The orb is visual-only.

It must not imply runtime capabilities are active.

It does not add:

- voice runtime
- microphone capture
- audio output
- real internet provider calls
- Python/tool execution
- document ingestion
- automatic memory writes
- automatic source saves
- autonomous actions

## Runtime boundary

Phase 16.5D adds a visual component only.

No API route is added.

No SQL migration is added.

No provider is activated.

No background task is added.

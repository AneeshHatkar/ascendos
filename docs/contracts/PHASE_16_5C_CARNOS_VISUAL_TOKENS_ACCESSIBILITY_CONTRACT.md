# Phase 16.5C — Carnos Visual Tokens + Accessibility + Reduced Motion Contract

Status: Complete pending verification.

## Purpose

Add Carnos visual token and accessibility foundations before any orb/avatar UI component is created.

## Added files

- `src/lib/carnos-identity/carnos-visual-tokens.ts`
- `src/lib/carnos-identity/carnos-accessibility.ts`

## Exported token markers

The Phase 16.5C contract exports:

- `CARNOS_BASE_VISUAL_TOKENS`
- `CARNOS_TONE_TOKENS`
- `CARNOS_STATE_VISUAL_TOKENS`
- `CARNOS_RESPONSIVE_TOKENS`
- `CARNOS_MOTION_BOUNDARIES`
- `getCarnosToneToken`
- `getCarnosStateVisualToken`
- `getCarnosResponsiveToken`
- `getCarnosStaticFallbackClassName`

## Exported accessibility markers

The Phase 16.5C contract exports:

- `CARNOS_ACCESSIBILITY_RULES`
- `CARNOS_ACCESSIBLE_STATE_LABELS`
- `CARNOS_REDUCED_MOTION_REQUIREMENTS`
- `getCarnosAccessibleStateLabel`
- `getCarnosAriaLabel`

## Required visual-token coverage

Tokens must cover:

- neutral
- focused
- voice
- memory
- current_info
- privacy
- action
- warning
- celebration
- offline

## Required state-token coverage

State tokens must cover:

- idle
- focused
- listening_visual_ready
- thinking
- speaking_visual_ready
- guiding
- reviewing_memory
- reviewing_current_info
- privacy_locked
- action_pending
- warning
- celebrating
- offline

## Accessibility and reduced-motion boundaries

Phase 16.5C locks:

- prefers-reduced-motion support
- static fallback orb rules
- no flashing
- no aggressive pulse
- no seizure-risk effects
- truthful screen-reader labels
- keyboard focus requirements
- mobile no-overlap rule
- state labels that do not imply unavailable runtime powers

## Mobile behavior

Responsive token modes are:

- desktop
- tablet
- mobile

Mobile Carnos placement must use a collapsed pill/button or safe inline card that does not overlap primary actions.

## Runtime boundary

Phase 16.5C is token/accessibility-only.

No UI component is added.

No orb component is added.

No companion widget is added.

No runtime system is activated.

No voice runtime is added.

No internet provider call is added.

No Python/tool execution is added.

No document ingestion is added.

No memory write is added.

No autonomous action is added.

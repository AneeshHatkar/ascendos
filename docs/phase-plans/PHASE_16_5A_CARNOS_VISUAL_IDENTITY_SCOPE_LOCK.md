# Phase 16.5A — Carnos Visual Identity Scope Lock

Status: Complete pending verification.

## Phase

Phase 16.5 — Carnos Visual Identity + Companion UI.

## Purpose

Lock the Carnos visual companion direction before runtime implementation.

Phase 16.5 creates Carnos’ visual companion identity, state system, orb/avatar, companion widget, /carnos presence, dashboard presence, accessibility/reduced-motion support, mobile behavior, capability matrix, truthfulness rules, and safety badges — without activating voice runtime, internet provider calls, Python tools, automatic memory writes, document ingestion, or autonomous actions.

## Locked visual identity

Carnos is a mythic futuristic AI orb / mask companion.

The visual form is:

- black-cyan-violet glowing orb
- subtle inner eye / mask / intelligence core
- thin rotating orbital rings
- soft breathing aura
- state-based pulse
- waveform ring for voice-ready states
- privacy shield ring
- gold confirmation halo for action pending
- citation/source nodes for current-info review
- archive/memory glyphs for memory review
- amber/red edge glow for warnings

The vibe is:

- calm
- intelligent
- protective
- mythic
- futuristic
- premium
- not childish
- not corporate boring

## Locked Phase 16.5 chunks

- 16.5A — Carnos Visual Identity Scope Lock
- 16.5B — Carnos Identity, State, and Capability Contract
- 16.5C — Visual Tokens + Accessibility + Reduced Motion
- 16.5D — Carnos Orb / Avatar Component
- 16.5E — Carnos Companion Widget / Dock
- 16.5F — Carnos Capability Matrix + Truthfulness Panel
- 16.5G — Carnos Visual Identity Dashboard Panel
- 16.5H — `/carnos` Page Integration
- 16.5I — Command/Dashboard Lightweight Companion Integration
- 16.5J — Final Phase 16.5 Audit + Visual Smoke Checklist + Completion Report

## Required visual states

Phase 16.5 must support these visual states:

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

## State priority rule

If multiple states are true, Carnos must use priority order:

1. warning
2. privacy_locked
3. action_pending
4. reviewing_current_info
5. reviewing_memory
6. listening_visual_ready
7. speaking_visual_ready
8. thinking
9. guiding
10. focused
11. idle
12. celebrating
13. offline

This prevents chaotic state display.

## Truthfulness rule

Carnos must not visually pretend that unavailable runtime powers are active.

Carnos must not show:

- active listening if real voice input is not active
- active speaking if real voice output is not active
- active web searching if the real provider is not active
- active Python/tool execution if tool runtime is not active
- active memory saving if approval flow is not active
- autonomous action execution if confirmation is required

Carnos may show honest statuses:

- Voice: foundation present, runtime deferred
- Internet: current-info foundation complete, provider deferred
- Python/tools: planned, runtime deferred
- Documents: planned, ingestion deferred
- Memory: review-first
- Actions: confirmation required

## Required capability matrix

Phase 16.5 must include a Carnos capability matrix with:

- can do now
- foundation present
- runtime deferred
- requires confirmation
- forbidden
- planned

Minimum capability rows:

- Memory visibility: enabled
- Automatic memory write: forbidden
- Current-info review: enabled
- Real internet provider: runtime_deferred
- Voice visual state: enabled
- Full voice talk-back: runtime_deferred
- Python/tools: runtime_deferred
- Document ingestion: planned
- Actions: requires_confirmation
- Background autonomous actions: forbidden

## Required safety badges

Phase 16.5 must include visible badges for:

- Review-first
- Citation-aware
- Privacy-protected
- Confirmation-required
- No silent browsing
- No autosave
- No hidden memory
- Runtime deferred
- Foundation present

## Accessibility and reduced motion

Phase 16.5 must include:

- prefers-reduced-motion support
- static fallback orb
- no flashing animation
- no aggressive pulse
- no seizure-risk effects
- screen-reader labels
- keyboard focus states
- readable contrast
- mobile-safe sizing

## Mobile behavior

Phase 16.5 must include responsive companion behavior:

- desktop: companion widget/dock or dashboard card
- tablet: compact card
- mobile: collapsed pill/button or safe inline card
- no content overlap
- no fixed-position UI that blocks primary actions on small screens

## Required integrations

Phase 16.5 must integrate into:

- `/carnos` page
- Command/dashboard surface, lightly and safely
- dashboard component exports
- Carnos component exports
- verification chain

## Forbidden in Phase 16.5

Phase 16.5 must not add:

- real voice talk-back runtime
- real internet provider calls
- uncontrolled `fetch`
- background browsing
- Python/tool execution runtime
- document ingestion engine
- automatic memory writes
- automatic source saves
- autonomous action execution
- current-info write API route
- browser-side secrets
- new SQL migrations unless explicitly justified
- hidden Carnos retrieval
- fake active buttons for unavailable features

## Final expected result

After Phase 16.5, Carnos should visually exist as a mythic futuristic AI orb/mask companion inside ascendOS, with state-based visual language, truthful capability display, safety badges, reduced-motion support, mobile-safe companion behavior, `/carnos` integration, and dashboard presence.

The actual deeper runtime powers remain deferred to later phases.

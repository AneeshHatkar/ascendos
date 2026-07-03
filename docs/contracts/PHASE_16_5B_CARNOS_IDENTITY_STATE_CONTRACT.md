# Phase 16.5B — Carnos Identity, State, and Capability Contract

Status: Complete pending verification.

## Purpose

Create the TypeScript identity contract for Carnos before visual components are added.

This contract defines:

- Carnos visual identity
- Carnos visual states
- state priority order
- capability statuses
- capability matrix
- boundary badges
- companion surfaces
- truthfulness helpers

## Added contract files

- `src/lib/carnos-identity/carnos-visual-identity.ts`
- `src/lib/carnos-identity/index.ts`

## Visual identity

Carnos is defined as:

- Name: Carnos
- Role: AI companion, strategist, guardian, and life OS guide
- Form: mythic futuristic black-cyan-violet orb / mask companion
- Default state: focused
- Tone: calm, direct, protective, execution-oriented, and truthful about capability boundaries

## Required states

The contract defines:

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

## State priority

The contract defines `CARNOS_STATE_PRIORITIES`.

Priority order protects safety and truthfulness:

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

## Capability statuses

The contract defines:

- enabled
- foundation_present
- runtime_deferred
- requires_confirmation
- forbidden
- planned

## Capability matrix

The contract includes minimum required rows:

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

## Boundary badges

The contract defines visible badges:

- Review-first
- Citation-aware
- Privacy-protected
- Confirmation-required
- No silent browsing
- No autosave
- No hidden memory
- Runtime deferred
- Foundation present

## Companion surfaces

The contract defines allowed surfaces:

- carnos_page
- command_dashboard
- dashboard_card
- companion_dock
- mobile_companion_pill
- future_chat_surface

## Truthfulness rule

The contract preserves Phase 16.5A truthfulness boundaries.

Carnos must not visually imply:

- active microphone listening
- active speech output
- real web search
- Python/tool execution
- document ingestion
- automatic memory writes
- autonomous actions

unless those runtimes are explicitly implemented in later phases and their confirmation/privacy boundaries are satisfied.

## Runtime boundary

Phase 16.5B is contract-only.

It does not add:

- UI components
- orb/avatar component
- companion widget
- API routes
- SQL migrations
- voice runtime
- internet provider calls
- Python/tool execution
- document ingestion
- memory writes
- autonomous actions

## Explicit TypeScript contract markers

The Phase 16.5B contract explicitly defines and exports:

- `CARNOS_VISUAL_STATE_IDS`
- `CARNOS_VISUAL_STATES`
- `CARNOS_STATE_PRIORITIES`
- `CARNOS_CAPABILITY_MATRIX`
- `CARNOS_BOUNDARY_BADGES`
- `CARNOS_COMPANION_SURFACES`
- `CARNOS_DEFAULT_VISUAL_IDENTITY`
- `getCarnosVisualState`
- `getHighestPriorityCarnosState`
- `getCarnosCapabilityStatus`
- `isCarnosRuntimeCapabilityEnabled`

The contract remains contract-only. No runtime system is activated.

## Explicit UI/runtime audit markers

No UI component is added in Phase 16.5B.
No runtime system is activated in Phase 16.5B.

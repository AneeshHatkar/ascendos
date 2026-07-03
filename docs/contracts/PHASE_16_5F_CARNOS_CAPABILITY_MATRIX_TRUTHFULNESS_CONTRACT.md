# Phase 16.5F — Carnos Capability Matrix + Truthfulness Panel Contract

Status: Complete pending verification.

## Purpose

Add a truthful capability matrix and boundary badge UI for Carnos.

## Added files

- `src/components/carnos/carnos-capability-matrix-panel.tsx`
- `src/components/carnos/carnos-boundary-badges.tsx`

## Component exports

Phase 16.5F exports:

- `CarnosCapabilityMatrixPanel`
- `CarnosCapabilityMatrixPanelProps`
- `CarnosBoundaryBadges`
- `CarnosBoundaryBadgesProps`

## Required capability statuses

The panel must display all capability status categories:

- `enabled`
- `foundation_present`
- `runtime_deferred`
- `requires_confirmation`
- `forbidden`
- `planned`

## Required truthfulness behavior

The panel must clearly show:

- what is enabled
- what is only foundation_present
- what is runtime_deferred
- what requires_confirmation
- what is forbidden
- what is planned
- runtime active vs not active
- no fake active runtime controls
- descriptive-only truthfulness copy

## Required source contracts

The panel must use:

- `CARNOS_CAPABILITY_MATRIX`
- `CARNOS_BOUNDARY_BADGES`
- `isCarnosRuntimeCapabilityEnabled`

## Boundary badges

The boundary badge component must display safety badges from the locked identity contract.

Required markers include:

- confirmation required
- no hidden memory
- no silent browsing
- no autosave
- truthful UI

## Runtime boundary

Phase 16.5F is visual-only and descriptive-only.

No API route is added.

No SQL migration is added.

No provider is activated.

No voice runtime is added.

No real internet provider call is added.

No Python/tool execution is added.

No document ingestion is added.

No memory write is added.

No autonomous action is added.

No dashboard page integration is added.

No `/carnos` page integration is added.

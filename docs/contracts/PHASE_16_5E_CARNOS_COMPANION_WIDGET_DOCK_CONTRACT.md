# Phase 16.5E — Carnos Companion Widget / Dock Contract

Status: Complete pending verification.

## Purpose

Wrap the Phase 16.5D `CarnosOrb` into visual-only companion surfaces.

## Added files

- `src/components/carnos/carnos-companion-widget.tsx`
- `src/components/carnos/carnos-companion-dock.tsx`

## Component exports

Phase 16.5E exports:

- `CarnosCompanionWidget`
- `CarnosCompanionWidgetProps`
- `CarnosCompanionWidgetMode`
- `CarnosCompanionDock`
- `CarnosCompanionDockProps`
- `CarnosCompanionDockPlacement`

## Widget requirements

The widget must include:

- `CarnosOrb`
- state-driven title/status text
- compact mode
- expanded mode
- `mobile_pill` mode
- `CARNOS_MOBILE_COMPANION_SURFACE_TOKEN`
- truthful visual-only label
- boundary badge strip
- runtime boundary copy
- no fake active runtime controls

## Dock requirements

The dock must include:

- bottom-right placement
- bottom-left placement
- inline placement
- mobile-inline placement
- pointer-events boundary
- mobile-safe companion pill behavior

## Truthfulness boundary

The companion surfaces are visual-only.

They do not activate:

- voice capture
- talk-back audio
- real internet provider calls
- Python/tool execution
- document ingestion
- automatic memory writes
- automatic source saves
- autonomous actions

## Runtime boundary

Phase 16.5E adds only visual companion surfaces.

No API route is added.

No SQL migration is added.

No provider is activated.

No background task is added.

No dashboard page integration is added.

No `/carnos` page integration is added.

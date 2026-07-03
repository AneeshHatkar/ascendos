# Phase 16.5H — `/carnos` Page Integration Contract

Status: Complete pending verification.

## Purpose

Integrate the visual-only Carnos identity surface into the `/carnos` page.

## Modified file

- `src/app/carnos/page.tsx`

## Required page markers

The page must include:

- `data-carnos-page`
- `data-carnos-page-hero`
- `data-carnos-page-boundary-grid`
- `data-carnos-page-boundary-card`
- `data-carnos-page-runtime-boundary`

## Required composition

The page must use:

- `CarnosVisualIdentityPanel`

## Required content

The page must communicate:

- Carnos companion identity
- visual-only runtime boundary
- capability truthfulness
- confirmation boundary
- no hidden saves
- no silent browsing
- no voice capture
- no autonomous actions

## Metadata

The page must export metadata for:

- `Carnos | ascendOS`
- visual-only Carnos companion identity

## Runtime boundary

Phase 16.5H is page integration only.

No API route is added.

No SQL migration is added.

No provider is activated.

No voice runtime is added.

No real internet provider call is added.

No Python/tool execution is added.

No document ingestion is added.

No memory write is added.

No source save is added.

No autonomous action is added.

No command/dashboard integration is added.

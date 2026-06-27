# Phase 12.9C — Pending Update Confirmation Wiring

Status: Implemented locally pending verification.

## Purpose

This patch completes the pre-Grimoire Chunk 09 confirmation wiring gap.

Before this patch, the Carnos pending update drawer rendered a preview-only sample proposed action and explicitly stated that confirmation callbacks were not connected.

This patch connects persisted `ai_actions` rows to server-owned approval and rejection routes while preserving the confirmation-first boundary.

## Added

- `POST /api/actions/[actionId]/approve`
- `POST /api/actions/[actionId]/reject`
- Carnos pending drawer can now receive a real persisted `ai_actions.id`
- Pending drawer calls server-owned routes for approve/reject transitions
- Carnos page maps real pending `ai_actions` records into review contracts when possible

## Safety Boundary

This patch does not implement autonomous writes.

This patch does not execute approved actions automatically.

This patch does not call Supabase directly from the browser.

The browser only calls server-owned API routes, and those routes use the authenticated user from the server session.

## Deferred

- automatic execution after approval
- AI generation
- Carnos autonomous writing
- Grimoire implementation
- Voice
- Memory/RAG

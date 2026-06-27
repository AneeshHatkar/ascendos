# Phase 12.9E — Goals / Proof Proposal Creation

Status: Complete pending verification.

## Scope

This patch closes the pre-Grimoire Goals/Proof honesty gap by adding a confirmation-first proposal creation surface to `/goals`.

## Implemented

- Added `/api/goals/proposals`.
- Added `GoalProofProposalComposer`.
- Wired goal proposal creation to `createProposedAction`.
- Wired proof item proposal creation to `createProposedAction`.
- Preserved the safety boundary: no direct `goals` or `proof_items` inserts from the UI.
- Updated `/goals` copy so it no longer claims creation is disabled.
- Kept final writes behind pending confirmation and the existing Phase 6 execution dispatcher.

## Deferred

- Direct goal edit/delete/reorder.
- Autonomous AI generation.
- Automatic execution without confirmation.
- Dedicated `/proof` route, because it is not currently canonical.

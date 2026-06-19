# Phase 5.15 — Python/ML Intelligence Architecture Patch

Status: planned architecture patch before Phase 6
Runtime impact: none

## Purpose

Add the full future Python/ML intelligence plan to ascendOS + Carnos without breaking Phase 1-5 or activating Python runtime.

## What This Adds

- Python/ML Intelligence Worker architecture.
- Full ML feature roadmap.
- Route placement for every future feature.
- Phase placement for every future feature.
- Safety rules.
- Privacy rules.
- Health and finance boundaries.
- ML explainability contract.
- ML output audit requirement.
- Feedback loop requirement.
- Cold-start behavior.
- Human override rule.
- No fake metrics rule.
- Versioned output schema requirement.
- Score definition requirement.

## What This Does Not Add Yet

- No active Python service.
- No ML model.
- No database writes from Python.
- No direct Supabase write key for Python.
- No memory implementation.
- No Carnos generation.
- No job queue.
- No deployment changes.
- No npm build dependency on Python.

## Core Rule

Python/ML advises. The app validates. The user confirms. The server writes. SQL records. Audit logs.

Python/ML must never directly mutate SQL.

Any write-affecting output must pass through:

proposal -> validation -> Save/Edit/Cancel -> server write -> audit log -> timeline event -> dashboard refresh

## Next Phase

After this patch passes all gates, proceed to Phase 6 — Safe Write / Proposed Action Flow.

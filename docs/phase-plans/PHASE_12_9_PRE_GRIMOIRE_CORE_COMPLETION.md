# Phase 12.9 — Pre-Grimoire Core Completion Pass

## Purpose

Before starting the Grimoire Engine, this pass completes only the real earlier partial chunks discovered by source-vs-repo inspection.

This is not a rebuild.
This is not a scope expansion.
This is a targeted completion pass for earlier source chunks that were structurally present but not honestly complete.

## Completed Earlier Chunks Not Reopened

The following chunks are not reopened unless a concrete audit failure appears:

- 00 Planning Lock
- 01 Repo Setup
- 02 Supabase/Auth
- 03 Core Schema
- 04 App Shell
- 05 Command Dashboard
- 10 Career
- 11 Learning
- 12 Health/Body
- 13 Life Admin
- 14 Research/Stanford

## Confirmed Partial Chunks Before Grimoire

### Chunk 06 — Goals / Proof

Present:
- goals route
- goals dashboard
- proof dashboard component
- goal read helpers
- goal milestone read helper
- proof read helper
- create goal backend flow
- create proof item backend flow

Missing or incomplete:
- goals UI still says create/edit/delete disabled
- goal creation is not exposed through a safe confirmation surface
- milestone creation/update is not confirmed as usable
- proof logging is not fully surfaced from UI
- completion state is not honestly reflected in page copy

### Chunk 07 — Calendar / Timeline

Present:
- calendar route
- timeline route
- calendar dashboard
- timeline dashboard
- task read helper
- event read helper
- create task backend flow
- timeline write helper file

Missing or incomplete:
- calendar UI still says creation is disabled
- timeline UI still says creation/mutation is disabled
- timeline write helper skips because timeline_events table is not defined
- event create/edit/archive is not confirmed
- routine basics are not confirmed

### Chunk 08 — Carnos Chat

Present:
- carnos route
- Carnos panel
- chat_sessions table
- chat_messages table
- chat session read helper
- chat message read helper

Missing or incomplete:
- no chat persistence UI
- no session creation UI
- no message creation path exposed
- page copy still says Carnos does not generate or persist active chat behavior

### Chunk 09 — AI Extraction / Pending Updates

Present:
- proposed action contracts
- proposed action validation
- create proposed action helper
- action lifecycle helper
- execution dispatcher
- pending updates drawer
- proposed action review card
- create task/goal/daily log/proof item execution flows

Missing or incomplete:
- no API extraction route
- validation is not Zod-based even though source calls for Zod schemas
- confirmation drawer callbacks are intentionally not connected

## Deferred Future Chunks

These are not part of the pre-Grimoire completion pass:

- 16 Voice Foundation
- 17 Memory/RAG
- 18 Analytics/Experiments
- 19 Custom Trackers
- 20 Privacy/Export
- 21 v1 Polish

Placeholder routes for these chunks do not count as completed implementation.

## Completion Rule

Phase 12.9 is complete only when:

- Chunk 06 no longer has disabled creation/proof language unless explicitly true.
- Chunk 07 has an honest timeline/calendar persistence story.
- Chunk 08 has chat session/message persistence through a safe server-owned path.
- Chunk 09 has an extraction endpoint or explicitly documented source-approved deferral, Zod schema coverage, and confirmation wiring for pending updates.
- `npm run check` passes.
- A final pre-Grimoire completion report exists.

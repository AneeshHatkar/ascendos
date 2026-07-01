# Phase 15H — Carnos Entity State

Status: Implemented as preview-only TypeScript/UI layer.

## Scope

Phase 15H locks Carnos Entity State for ascendOS.

Required scope:
- Carnos persistent AI persona/entity inside ascendOS
- Carnos name
- Carnos role
- Carnos mission
- Carnos tone
- Carnos current mode
- Carnos current phase
- latest milestone
- next objective
- forbidden behaviors
- response preferences
- memory policy
- voice policy
- action policy
- source-of-truth policy

## Boundary

This phase is preview only.

Forbidden:
- no approval
- no persistence
- no Supabase calls
- no SQL reads or writes
- no retrieval
- no embeddings
- no provider calls
- no hidden Carnos prompt injection
- no context pack builder
- no standalone `/memory` route

## Next

Phase 15I — Project/System State Memory + Source-of-Truth Hierarchy.

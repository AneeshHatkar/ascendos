# Phase 15G — Approved Memory Read Layer + Ranking/Staleness Rules

Status: Implemented as a local deterministic preview layer.

## Purpose

Phase 15G introduces the approved memory read layer for already-approved memory contracts. It ranks eligible memories and surfaces staleness/conflict warnings without building a context pack or injecting hidden Carnos memory.

## Included scope

- approved memory read layer
- ranking
- staleness
- eligibility filtering for approved/edited memories
- exclusion of blocked, forgotten, rejected, archived, private-mode-blocked, and do-not-remember-blocked memory states
- deterministic scoring based on priority, confidence, authority, recency, domain match, sensitivity, staleness, and conflict severity
- preview panel for transparency

## Protected boundaries

- no approval
- no persistence
- no Supabase
- no SQL reads or writes
- no embeddings
- no provider calls
- no hidden Carnos prompt injection
- no context pack builder
- no standalone `/memory` route

## Deferred to later phases

- Phase 15H — Carnos Entity State
- Phase 15J — Current Context Pack Builder + Context Budget Rules
- Phase 15K — Carnos Memory Visibility Panel
- Phase 15M — Retrieval Contract + Provenance + Conflict Handling
- Phase 15N — Embedding Boundary / Noop Provider

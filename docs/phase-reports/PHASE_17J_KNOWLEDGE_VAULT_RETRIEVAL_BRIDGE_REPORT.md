# Phase 17J Knowledge Vault Retrieval Bridge Report

Phase 17J added a deterministic bridge from Knowledge Vault items into retrieval-planning candidates.

## Implemented

- Knowledge Vault item bridge types
- bridge item eligibility rules
- private/default exclusion rules
- inactive/default exclusion rules
- missing-text exclusion rules
- low-confidence exclusion rules
- conversion into Phase 17I retrieval candidates
- Phase 17I retrieval planning reuse
- visible bridge reasons and warnings

## Verification

Run `npm run audit:phase17j` and `npm run check`.

## Boundary

No runtime retrieval, no memory_retrieval_events writes, no embedding generation, no semantic retrieval activation, no provider calls, no vector search, no Supabase calls, no SQL reads/writes, no Carnos prompt/context injection, and no background scanning were added.

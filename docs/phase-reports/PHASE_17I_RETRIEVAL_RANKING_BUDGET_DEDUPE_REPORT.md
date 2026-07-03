# Phase 17I Retrieval Ranking Budget Dedupe Report

Implemented retrieval candidate scoring, retrieval candidate ranking, retrieval budget enforcement, retrieval dedupe rules, token estimation, approved-only filtering, sensitive/default exclusion rules, stale/default exclusion rules, conflict/default exclusion rules, semantic retrieval deferred warnings, visible inclusion and exclusion reasons.

Verification: npm run audit:phase17i and npm run check.

Boundary: no runtime retrieval, no memory_retrieval_events writes, no embeddings, no semantic retrieval activation, no providers, no vector search, no Supabase, no SQL, no Carnos prompt/context injection, no background scanning.

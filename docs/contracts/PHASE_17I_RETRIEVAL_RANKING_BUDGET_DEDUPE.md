# Phase 17I — Retrieval Ranking + Budget + Dedupe Rules

Phase 17I adds deterministic retrieval planning rules for Memory/RAG.

Added: rankMemoryRetrievalCandidates, buildMemoryRetrievalPlan, summarizeMemoryRetrievalPlan, getMemoryRetrievalRankingBudgetDedupeSummary.

Required behavior: approved-only retrieval planning, budget-bounded retrieval planning, deduped retrieval planning, source authority scoring, trust scoring integration, keyword/domain scoring, confidence/evidence/reliability scoring, freshness/staleness handling, sensitive memory exclusion by default, conflict exclusion by default, visible inclusion/exclusion reasons.

Boundary markers: No runtime retrieval, No memory_retrieval_events writes, No embedding generation, No semantic retrieval activation, No provider calls, No vector search, No Supabase calls, No SQL reads or writes, No Carnos prompt/context injection, No background scanning.

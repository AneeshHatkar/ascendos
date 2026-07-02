# Phase 16G — Source Candidate Capture + Destination Router

Status: Complete.

## Purpose

This contract adds source candidate capture and destination routing for current-information review flows.

## Added files

- src/lib/current-info-capture/current-info-source-candidate.ts
- src/lib/current-info-capture/current-info-destination-router.ts
- src/lib/current-info-capture/index.ts

## Locked behavior

Source candidate capture creates unsaved candidate objects.

Destination routing suggests where a current-info result should be reviewed later.

Routes include:

- job_search_review
- company_research_review
- professor_lab_review
- research_paper_review
- documentation_review
- current_resource_review
- manual_review

## Protected boundaries

- No real provider activation
- No external retrieval
- No SQL reads
- No SQL writes
- No source persistence
- No UI route
- No background browsing
- No automatic save
- No automatic memory conversion
- No proposed-action execution

## Next step

Phase 16H — Current-Info Review Queue Contract.

# Phase 18M Carnos Analytics Explanation Boundary Report

Phase 18M adds the deterministic Carnos analytics explanation boundary.

## Added

- src/lib/analytics-experiments/carnos-analytics-explanation-boundary.ts
- docs/fixtures/phase18-analytics-experiments/phase18m_carnos_analytics_explanation_boundary_fixture.json
- docs/contracts/PHASE_18M_CARNOS_ANALYTICS_EXPLANATION_BOUNDARY.md
- docs/qa/PHASE_18M_CARNOS_ANALYTICS_EXPLANATION_BOUNDARY_SMOKE_CHECKLIST.md
- docs/phase-reports/PHASE_18M_CARNOS_ANALYTICS_EXPLANATION_BOUNDARY_REPORT.md
- scripts/audit-phase-18m.mjs

## Validates

- Carnos analytics explanation boundary exists
- allowed and blocked explanation modes exist
- trend/comparison/correlation limits exist
- self-experiment and lesson limits exist
- metric quality and snapshot freshness limits exist
- confidence and uncertainty wording rules exist
- evidence gap and missing data wording rules exist
- no-proof boundary exists
- no-causality boundary exists
- review-before-memory-write boundary exists
- source-aware disclosures exist
- cached/stale/partial/missing/unsynced/deterministic context rules exist
- privacy restricted context is blocked
- local runtime remains optional

## Boundary

No schema is created.

No Supabase/Postgres runtime reads occur.

No model calls occur.

No fake analytics data is added.

No fake experiment conclusions are added.

No memory writes are added.

No action execution is added.

No causality claims are allowed.

No proof claims are allowed.

No local Carnos runtime is required during checks.

# Phase 18F Insight Quality + Provenance Report

Phase 18F adds insight quality and provenance contracts.

## Added

- src/lib/analytics-experiments/insight-quality-provenance.ts
- docs/fixtures/phase18-analytics-experiments/phase18f_insight_quality_fixture.json
- docs/contracts/PHASE_18F_INSIGHT_QUALITY_PROVENANCE.md
- docs/qa/PHASE_18F_INSIGHT_QUALITY_PROVENANCE_SMOKE_CHECKLIST.md
- docs/phase-reports/PHASE_18F_INSIGHT_QUALITY_PROVENANCE_REPORT.md
- scripts/audit-phase-18f.mjs

## Validates

- insight id required
- user scoped insight required
- claim text required
- evidence item required
- invalid evidence blocks insight
- insufficient data blocks confident insight
- correlation insight requires at least 7 matched data points
- trend insight requires at least 4 logged data points
- causality claims forbidden
- cached context disclosure
- stale context disclosure
- unsynced context disclosure
- partial context disclosure
- deterministic preview disclosure
- confounder disclosure
- Carnos avoids proof and causal claims

## Boundary

No schema is created.

No Supabase/Postgres runtime reads occur.

No fake insight data is added.

No memory writes are added.

No action execution is added.

No local Carnos runtime is required during checks.

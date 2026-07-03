# Phase 18G Analytics Repository Boundaries Report

Phase 18G adds analytics repository boundary contracts.

## Added

- src/lib/analytics-experiments/analytics-repository-boundary.ts
- docs/fixtures/phase18-analytics-experiments/phase18g_analytics_repository_boundary_fixture.json
- docs/contracts/PHASE_18G_ANALYTICS_REPOSITORY_BOUNDARIES.md
- docs/qa/PHASE_18G_ANALYTICS_REPOSITORY_BOUNDARY_SMOKE_CHECKLIST.md
- docs/phase-reports/PHASE_18G_ANALYTICS_REPOSITORY_BOUNDARIES_REPORT.md
- scripts/audit-phase-18g.mjs

## Validates

- repository id required
- user scoped repository required
- read intents required
- capabilities required
- metric plans required
- Supabase/Postgres online source of truth
- encrypted IndexedDB offline continuity layer
- Phase 18B source map requirement
- registered metric plans only
- user scope required per metric plan
- no runtime reads in this boundary chunk
- cache restrictions for not-cacheable metrics
- stricter cache rules for sensitive/restricted metrics
- Carnos disclosure for deterministic empty-state repository context

## Boundary

No schema is created.

No Supabase/Postgres runtime reads occur.

No fake analytics data is added.

No memory writes are added.

No action execution is added.

No local Carnos runtime is required during checks.

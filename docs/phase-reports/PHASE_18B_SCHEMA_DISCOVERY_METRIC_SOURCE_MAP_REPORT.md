# Phase 18B Schema Discovery + Metric Source Map Report

Phase 18B adds static schema discovery and metric source mapping for Phase 18 Analytics/Experiments.

## Added

- `scripts/build-phase-18b-schema-source-map.mjs`
- `scripts/audit-phase-18b.mjs`
- `docs/contracts/PHASE_18B_SCHEMA_DISCOVERY_METRIC_SOURCE_MAP.md`
- `docs/roadmap/PHASE_18B_SCHEMA_DISCOVERY_METRIC_SOURCE_MAP.md`
- `docs/fixtures/phase18-analytics-experiments/phase18b_schema_source_map.json`
- `docs/qa/PHASE_18B_SCHEMA_DISCOVERY_METRIC_SOURCE_MAP_SMOKE_CHECKLIST.md`

## Boundary

Phase 18B is discovery-only.

No schema is created yet.

No runtime Supabase/Postgres reads occur.

No Carnos runtime prompt/context injection occurs.

No fake analytics data is added.

## Why this matters

Phase 18B prevents later chunks from inventing fake metric sources or building dashboards on imaginary data. Later Phase 18 chunks must use the source map, acknowledge gaps, and ask for schema/migration details when needed.

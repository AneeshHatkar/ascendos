# Phase 18C Metric Registry + Data Quality Report

Phase 18C adds the canonical metric registry and data quality rules for Analytics/Experiments.

## Added

- `src/lib/analytics-experiments/metric-registry.ts`
- `src/lib/analytics-experiments/index.ts`
- `docs/fixtures/phase18-analytics-experiments/phase18c_metric_registry_fixture.json`
- `docs/contracts/PHASE_18C_METRIC_REGISTRY_DATA_QUALITY.md`
- `docs/qa/PHASE_18C_METRIC_REGISTRY_DATA_QUALITY_SMOKE_CHECKLIST.md`
- `docs/phase-reports/PHASE_18C_METRIC_REGISTRY_DATA_QUALITY_REPORT.md`

## Boundary

This step adds contracts and deterministic utility logic only.

No schema is created.

No Supabase/Postgres runtime reads occur.

No fake metrics or fake analytics data are added.

No local Carnos runtime is required during checks.

## Why it matters

The metric registry prevents dashboards, trend engines, experiment evaluators, and Carnos explanations from inventing metric behavior. Every later analytics feature must respect source mode, data quality, cache eligibility, sensitivity, stale/cached/unsynced labels, and local runtime compatibility.

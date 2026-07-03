# Phase 18E Self-Experiment Contracts Report

Phase 18E adds self-experiment contracts and validators.

## Added

- src/lib/analytics-experiments/self-experiment-contracts.ts
- docs/fixtures/phase18-analytics-experiments/phase18e_self_experiment_fixture.json
- docs/contracts/PHASE_18E_SELF_EXPERIMENT_CONTRACTS.md
- docs/qa/PHASE_18E_SELF_EXPERIMENT_SMOKE_CHECKLIST.md
- docs/phase-reports/PHASE_18E_SELF_EXPERIMENT_CONTRACTS_REPORT.md
- scripts/audit-phase-18e.mjs

## Validates

- registered primary metrics
- registered supporting metrics
- baseline range
- active range
- minimum baseline days
- minimum active days
- minimum measurements
- confounder warnings
- insufficient data blocks readiness
- invalid quality blocks readiness
- lesson summary requirement
- memory candidate lesson boundary
- cached/unsynced/deterministic disclosure
- no confident causal claims

## Boundary

No schema is created.

No Supabase/Postgres runtime reads occur.

No fake experiment data is added.

No local Carnos runtime is required during checks.

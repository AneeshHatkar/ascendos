# Phase 18N Anti-Demo-Data + Privacy/Sensitivity Audit Report

Phase 18N adds the anti-demo-data and privacy/sensitivity audit for Phase 18.

## Added

- src/lib/analytics-experiments/anti-demo-data-privacy-audit.ts
- docs/fixtures/phase18-analytics-experiments/phase18n_anti_demo_data_privacy_audit_fixture.json
- docs/contracts/PHASE_18N_ANTI_DEMO_DATA_PRIVACY_AUDIT.md
- docs/qa/PHASE_18N_ANTI_DEMO_DATA_PRIVACY_AUDIT_SMOKE_CHECKLIST.md
- docs/phase-reports/PHASE_18N_ANTI_DEMO_DATA_PRIVACY_AUDIT_REPORT.md
- scripts/audit-phase-18n.mjs

## Validates

- anti-demo-data audit exists
- anti-fake analytics and experiment audits exist
- analytics and self-experiment privacy/sensitivity audits exist
- Carnos explanation and local runtime privacy/sensitivity audits exist
- source-state disclosures are represented
- cached/stale/partial/missing/unsynced/deterministic disclosure rules are represented
- no-causality and no-proof rules are represented
- review-before-memory-write is represented
- action execution remains disabled
- model, network, Supabase, schema, embedding, and vector boundaries remain disabled
- local Carnos runtime remains optional

## Boundary

No database read/write is added.

No new SQL migration is added.

No Supabase client is added.

No local or cloud model call is added.

No embedding call or vector search is added.

No memory write is added.

No action execution is added.

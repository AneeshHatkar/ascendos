# Phase 18M-B Local Carnos Runtime Boundary Report

Phase 18M-B adds the optional local Carnos runtime boundary and offline AI adapter contract.

## Added

- src/lib/analytics-experiments/local-carnos-runtime-boundary.ts
- docs/fixtures/phase18-analytics-experiments/phase18m_b_local_carnos_runtime_boundary_fixture.json
- docs/contracts/PHASE_18M_B_LOCAL_CARNOS_RUNTIME_BOUNDARY.md
- docs/qa/PHASE_18M_B_LOCAL_CARNOS_RUNTIME_BOUNDARY_SMOKE_CHECKLIST.md
- docs/phase-reports/PHASE_18M_B_LOCAL_CARNOS_RUNTIME_BOUNDARY_REPORT.md
- scripts/audit-phase-18m-b.mjs

## Validates

- local Carnos runtime boundary exists
- offline AI adapter contract exists
- optional local runtime mode exists
- runtime unavailable mode exists
- runtime disabled mode exists
- deterministic fallback mode exists
- request and response contracts exist
- capability flags exist
- model-not-required CI boundary exists
- no model install requirement exists
- no runtime health call exists
- no network/model/streaming/embedding/vector calls exist
- Option C local AI server/runtime boundary exists
- future localhost-compatible runtime path exists
- future MLX-compatible runtime path exists
- future llama.cpp-compatible runtime path exists
- future Tauri sidecar-compatible runtime path exists
- browser-only fallback limitation exists
- offline disclosures exist
- review-before-memory-write remains preserved
- action execution remains disabled

## Boundary

No schema is created.

No Supabase/Postgres runtime reads occur.

No network calls occur.

No model calls occur.

No streaming calls occur.

No embedding calls occur.

No vector search occurs.

No runtime install is required.

No runtime health call occurs.

No fake analytics data is added.

No fake experiment conclusions are added.

No memory writes are added.

No action execution is added.

No local Carnos runtime is required during checks.

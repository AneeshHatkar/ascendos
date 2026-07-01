# Phase 15F Privacy, Private Mode, Do-Not-Remember Rules Report

Status: Complete.

## Completed scope

Phase 15F added a safe privacy rule preview foundation for Carnos memory continuity.

Added:

- privacy settings preview contract
- private mode preview contract
- do-not-remember rule preview helpers
- blocked category checks
- restricted category checks
- sensitive/restricted review gates
- redaction preview gates
- candidate privacy evaluation result contract
- read-only dashboard preview panel
- Phase 15F audit gate

## Files added

- `src/lib/carnos-continuity/memory-privacy-rules.ts`
- `src/components/dashboard/memory-privacy-rules-panel.tsx`
- `docs/contracts/PHASE_15F_PRIVACY_PRIVATE_MODE_DO_NOT_REMEMBER_RULES.md`
- `docs/phase-reports/PHASE_15F_PRIVACY_PRIVATE_MODE_DO_NOT_REMEMBER_RULES_REPORT.md`
- `docs/qa/PHASE_15F_PRIVACY_PRIVATE_MODE_DO_NOT_REMEMBER_RULES_SMOKE_CHECKLIST.md`
- `scripts/audit-phase-15f.mjs`

## Protected boundaries

Phase 15F has:

- no approval
- no persistence
- no retrieval
- no embeddings
- no provider calls
- no Supabase
- no standalone `/memory` route
- no hidden Carnos prompt injection
- no automatic transcript-to-memory

## Next phase

Phase 15G — Approved Memory Read Layer + Ranking/Staleness Rules.

## Exact audit markers

- private mode blocking
- do-not-remember rule blocking

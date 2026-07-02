# Phase 16G-B — Current-Info Extraction Candidate Smoke Checklist

Status: Complete pending verification.

## Required checks

- [x] Extraction candidate contract exists.
- [x] Extraction candidate contract is exported.
- [x] Extraction candidates are candidate-only.
- [x] Extraction candidates require user review.
- [x] Extraction candidates cannot autosave.
- [x] Extraction candidates cannot persist sources.
- [x] Extraction candidates cannot automatically become memory.
- [x] Extraction candidates cannot execute actions.
- [x] Missing source candidates are handled safely.
- [x] Low-confidence candidates remain review-bound.
- [x] Phase 16G-B has no SQL migration.
- [x] Phase 16G-B has no UI route.
- [x] Phase 16G-B has no provider activation.
- [x] Phase 16G-B has no network calls.
- [x] Phase 16G-B has no browser-side secrets.

## Command checks

- npm run audit:phase16g_b
- npx tsc --noEmit
- npm run lint
- npm run check

## Next step

Proceed to Phase 16I only after this audit passes and the patch is committed.

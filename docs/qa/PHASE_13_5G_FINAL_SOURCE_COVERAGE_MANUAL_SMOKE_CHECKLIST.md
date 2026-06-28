# Phase 13.5G Final Source Coverage Manual Smoke Checklist

Status: Required before Phase 14.

## Scope

Verify the final Phase 1 through Phase 13.5 closure state.

## Required checks

- Confirm FINAL_SYNCED DOCX/JSON files exist in `docs/source-of-truth/`.
- Confirm all Phase 13.5 reports exist.
- Confirm all Phase 13.5 manual smoke checklists exist.
- Confirm `/creativity`, `/custom-trackers`, `/decisions`, `/experiments`, and `/future-simulator` are the only intentional placeholder routes.
- Confirm these placeholder routes are decision-locked and read-only.
- Confirm Carnos display-name rename remains final polish.
- Confirm Voice Foundation remains Phase 14.
- Confirm Memory/RAG remains Phase 15.
- Confirm Web Search / Internet Tools remains Phase 16.
- Confirm Analytics / Experiments remains Phase 17.
- Confirm Custom Tracker Builder remains Phase 18.
- Confirm export/delete/private mode remains Phase 19.
- Confirm `npm run audit:phase13_5g` passes.
- Confirm `npm run check` passes.

## No writes

This checklist does not authorize new product writes, new SQL scope, AI generation, voice capture, memory/RAG, web search, analytics engines, custom tracker builders, or destructive data controls.

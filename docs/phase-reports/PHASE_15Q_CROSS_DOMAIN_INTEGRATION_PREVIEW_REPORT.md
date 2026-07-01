# Phase 15Q — Cross-Domain Integration Preview Report

Status: Complete.

## Completed scope

Phase 15Q adds a preview-only Cross-Domain Integration Preview for Carnos memory continuity.

The implemented scope explicitly includes:

- cross-domain memory visibility
- whole-project connectivity
- memory_used_in_context_pack
- memory_used_in_carnos_response
- visible memory usage ledger
- hidden memory usage blocked
- source-of-truth hierarchy visible
- private mode can block
- do-not-remember can block

## Integration surfaces

The preview connects memory visibility across:

- Carnos
- Command
- Goals
- Career
- Learning
- Knowledge
- Privacy
- Research
- Health/Body
- Grimoire

## Locked event markers

Phase 15Q keeps these event labels preview-only:

- memory_used_in_context_pack
- memory_used_in_carnos_response

## Verification gates

Required gates:

- npm run audit:phase15q
- npm run build
- npm run check

## Protected boundaries

Phase 15Q remains preview-only:

- no SQL reads or writes
- no Supabase calls
- no persistence
- no embeddings
- no vector search
- no provider calls
- no hidden Carnos prompt injection
- no action execution
- no standalone /memory route

## Next phase

Phase 15R — Final Audit, Smoke Checklist, Completion Report.

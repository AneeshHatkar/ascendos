# Phase 12.9B — AI Extraction Route and Zod Contract

## Scope

This patch completes the first missing Chunk 09 item found before Grimoire:

- API extraction route exists.
- Zod schema exists in proposed-action validation.
- The route does not perform autonomous writes.
- The route does not call an LLM.
- The route does not bypass confirmation.

## Added

- `src/app/api/ai/extract/route.ts`
- `ProposedActionZodEnvelope` in `src/lib/actions/validate-proposed-action.ts`

## Route Behavior

`POST /api/ai/extract` accepts:

- `text`
- `proposed_action`
- optional `context`

If only text is provided, the route returns `needs_review` and performs no write.

If a proposed action is provided, the route validates it through the existing proposed-action validator and returns the validated action for confirmation.

## Safety Boundary

This route is deterministic. It does not:

- generate AI output
- call OpenAI or any model provider
- create database records
- approve actions
- execute actions
- mutate goals, tasks, proof, daily logs, chat, or timeline records

Persistence remains confirmation-first.

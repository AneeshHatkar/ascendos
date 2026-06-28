# Phase 13.5B Carnos Persona Manual Smoke Checklist

## Route

- Visit `/carnos`.
- Confirm the page loads.
- Confirm the Carnos persona foundation panel is visible.
- Confirm it says Carnos v1 is locked.
- Confirm persona layers are visible.
- Confirm runtime boundaries are visible.

## Safety

Confirm the UI makes clear:

- assistant generation is disabled,
- voice is deferred,
- memory/RAG is deferred,
- web search is deferred,
- writes require confirmation,
- Carnos must not replace proof with fantasy identity.

## Database

Confirm migration exists:

- `supabase/migrations/0018_phase13_5b_carnos_persona_foundation.sql`

Confirm table exists in migration:

- `persona_prompt_versions`

Confirm RLS exists:

- `persona_prompt_versions_select_own`

## Forbidden behavior

Confirm no OpenAI call exists.

Confirm no voice capture exists.

Confirm no memory/RAG implementation exists.

Confirm no web-search implementation exists.

Confirm no autonomous write path exists.

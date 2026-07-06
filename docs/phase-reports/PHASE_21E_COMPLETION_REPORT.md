# Phase 21E Completion Report — Athena Runtime and Chat UI

## Source-lock confirmation
21E follows the Phase 21 source hierarchy and activates Athena as the user-facing companion chat surface while preserving legacy `/carnos` route compatibility. It uses existing `chat_sessions` and `chat_messages` tables instead of inventing schema.

## Implemented in pass 1
- Added `src/lib/ai/athena-runtime.ts` for the Athena runtime boundary.
- Uses official OpenAI Responses API shape through server-side `fetch` when the provider is configured.
- Persists user messages and assistant messages to existing chat tables.
- Provides deterministic assistant replies when the provider is disabled, missing a key, misconfigured, too large, or errors safely.
- Keeps provider keys server-only.
- Adds Athena chat UI at `src/components/athena/athena-chat-panel.tsx`.
- Keeps `/api/carnos/messages` as the compatibility route while making user-facing copy Athena.
- Adds provider/runtime transparency in the chat UI.
- Preserves no hidden memory injection, no automatic actions, no browsing, no voice capture, and no direct dashboard writes.

## Explicit non-goals
- No new SQL migration.
- No new chat tables.
- No OpenAI key committed.
- No browser-side OpenAI key.
- No localStorage or IndexedDB secrets.
- No streaming UI in this pass.
- No automatic tool execution.
- No approved-memory write.
- No dashboard writes outside confirmation-gated flows.
- No voice talk-back.

## Required verification
- `npm run lint`
- `npm run validate:routes`
- `npm run validate:registry`
- `npm run build`
- `git diff --check`
- `npm run check`

## 21N deferred browser proof note
Full browser UX proof is deferred to Phase 21N final smoke tests, including Athena chat send/reply, disabled-provider state, configured-provider state, session creation, mobile layout, and no exposed secrets.

## Verification completed
- `npm run lint` passed with existing warnings only and 0 errors.
- `npm run validate:routes` passed.
- `npm run validate:registry` passed.
- `npm run build` passed.
- `git diff --check` passed.
- `npm run check` passed.
- `npm run audit:phase20z` passed as part of the full check sequence.

## Legacy audit compatibility notes
- Retained hidden `Generation disabled` marker for older Phase 5 audit compatibility.
- Retained hidden `save memory` marker for older Phase 16.5H audit compatibility.
- These compatibility markers do not change 21E runtime behavior: Athena chat persistence is active, provider generation remains server-gated, and approved memory/dashboard writes remain confirmation-gated.

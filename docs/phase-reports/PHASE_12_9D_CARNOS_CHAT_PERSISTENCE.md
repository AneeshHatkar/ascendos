# Phase 12.9D — Carnos Chat Persistence

Status: Complete pending verification.

## Scope

This patch adds a minimal Carnos chat persistence path before Grimoire implementation.

Implemented:
- `POST /api/carnos/messages`
- Server-owned Supabase write path for `chat_sessions`
- Server-owned Supabase write path for `chat_messages`
- User-authenticated ownership boundary through Supabase auth and RLS
- Client composer for saving a user message from `/carnos`
- No LLM generation
- No assistant response generation
- No memory/RAG
- No autonomous action execution
- No browser-side Supabase writes

## Safety boundary

The route only saves user-authored message text. It does not call OpenAI or any model provider. It does not infer facts, create memories, approve actions, execute actions, or write to target operational tables.

## Verification

Required gates:
- `git diff --check`
- `npm run check`
- manual `/carnos` smoke after Supabase env is connected

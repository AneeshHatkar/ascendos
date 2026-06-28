# Phase 13.5B — Carnos Persona Schema Design

Status: Implemented by migration `0018_phase13_5b_carnos_persona_foundation.sql`.

## Purpose

The source scope expects Carnos to have a persona prompt/version foundation.

The repo already has:

- `carnos_profiles`
- `chat_sessions`
- `chat_messages`
- `/api/carnos/messages`
- `CarnosMessageComposer`

Phase 13.5B adds the missing persona prompt version foundation.

## Table

### `persona_prompt_versions`

Stores user-owned Carnos persona prompt versions and safety rules.

Fields:

- `id`
- `user_id`
- `carnos_profile_id`
- `version_name`
- `persona_name`
- `persona_layer`
- `status`
- `system_prompt`
- `tone_rules`
- `safety_rules`
- `routing_rules`
- `generation_boundary`
- `memory_boundary`
- `voice_boundary`
- `web_boundary`
- `is_active`
- `created_at`
- `updated_at`

## Safety

RLS is enabled.

Each user can select only their own rows.

Writes are not exposed in the UI in Phase 13.5B.

No default persona prompt is inserted by migration, because inserting user data in a shared migration would be unsafe.

The UI and code provide a locked default contract if no database prompt version exists.

## Runtime boundary

This table does not enable LLM calls.

It does not enable memory/RAG.

It does not enable voice.

It does not enable web search.

It only provides the missing persona prompt/version foundation.

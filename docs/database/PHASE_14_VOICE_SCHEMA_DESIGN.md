# Phase 14 Voice Schema Design

Status: Phase 14B SQL foundation.

## Scope

This document covers the database foundation for Phase 14 Voice Foundation.

14B adds:

- `voice_sessions`
- `voice_transcripts`
- RLS policies
- indexes
- parent ownership guards
- TypeScript database aliases
- read-only repository helpers

14B does not add voice UI, microphone access, STT/TTS providers, voice API routes, audio upload/storage, `/voice-companion`, Memory/RAG, web search, analytics, export/delete/private mode implementation, or Carnos proposal bridge.

## Tables

### voice_sessions

Session-level container for text/voice/manual/simulated Carnos interaction sessions.

Important fields:

- `user_id`
- `chat_session_id`
- `source_message_id`
- `source_ai_action_id`
- `session_type`
- `voice_mode`
- `status`
- `started_at`
- `ended_at`
- `transcript_summary`
- `detected_emotion_label`
- `sensitive_default`
- `audio_saved`
- `audio_retained`
- `audio_retention_consent`
- `metadata`

Safety defaults:

- `sensitive_default = true`
- `audio_saved = false`
- `audio_retained = false`
- `audio_retention_consent = false`

### voice_transcripts

Segment-level transcript storage for voice, manual, simulated, and text-derived transcript records.

Important fields:

- `user_id`
- `voice_session_id`
- `source_message_id`
- `source_ai_action_id`
- `speaker`
- `transcript_text`
- `transcript_source`
- `segment_index`
- `occurred_at`
- `logged_at`
- `confidence_score`
- `needs_review`
- `correction_text`
- `detected_emotion_label`
- `is_sensitive`
- `metadata`

Safety defaults:

- `needs_review = true`
- `is_sensitive = true`

## Ownership model

Both tables use `user_id`.

RLS limits every select/insert/update/delete operation to `auth.uid() = user_id`.

Parent ownership guards prevent cross-user references for:

- `voice_sessions.chat_session_id`
- `voice_sessions.source_message_id`
- `voice_sessions.source_ai_action_id`
- `voice_transcripts.voice_session_id`
- `voice_transcripts.source_message_id`
- `voice_transcripts.source_ai_action_id`

## Confirmation boundary

14B only stores voice session/transcript data.

System updates still require later 14H bridge and existing Phase 6 confirmation flow.

No voice-derived system write is created in 14B.

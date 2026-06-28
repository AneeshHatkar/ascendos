# Phase 14B Voice SQL Foundation Report

Status: Complete when audit/check pass.

## Completed scope

Phase 14B adds the database foundation for Voice Foundation:

- `voice_sessions`
- `voice_transcripts`
- RLS policies
- indexes
- parent ownership guard triggers
- TypeScript database aliases
- read-only voice repository helpers
- schema design doc
- Phase 14B audit gate
- manual smoke checklist

## Safety defaults

The SQL foundation makes audio storage opt-in only:

- `audio_saved` defaults to false.
- `audio_retained` defaults to false.
- `audio_retention_consent` defaults to false.
- `audio_retained = true` is blocked unless `audio_retention_consent = true`.

Transcript/session sensitivity is conservative by default:

- `voice_sessions.sensitive_default` defaults to true.
- `voice_transcripts.is_sensitive` defaults to true.
- `voice_transcripts.needs_review` defaults to true.

## Protected boundaries

14B does not add:

- voice UI
- browser microphone access
- `/api/voice/transcribe`
- `/api/voice/speak`
- STT/TTS provider code
- audio upload/storage
- `/voice-companion`
- Carnos page integration
- text/voice proposal bridge
- Memory/RAG
- web search
- analytics
- custom tracker builder
- export/delete/private mode implementation

## Next step

Phase 14C — Types / Schemas / State Machine / Read Helpers.

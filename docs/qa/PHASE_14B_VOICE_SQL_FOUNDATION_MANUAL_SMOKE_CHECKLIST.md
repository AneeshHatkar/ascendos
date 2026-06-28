# Phase 14B Voice SQL Foundation Manual Smoke Checklist

## SQL files

- [ ] `0022_phase14_voice_foundation.sql` exists.
- [ ] `0023_phase14_parent_ownership_guards.sql` exists.
- [ ] `voice_sessions` table exists.
- [ ] `voice_transcripts` table exists.
- [ ] RLS is enabled on both tables.
- [ ] Select/insert/update/delete policies are user-scoped.
- [ ] Parent ownership guards exist.

## Safety defaults

- [ ] `audio_saved` defaults to false.
- [ ] `audio_retained` defaults to false.
- [ ] `audio_retention_consent` defaults to false.
- [ ] `audio_retained` cannot be true without consent.
- [ ] `sensitive_default` defaults to true.
- [ ] `is_sensitive` defaults to true.
- [ ] `needs_review` defaults to true.

## Type/read foundation

- [ ] `VoiceSessionRow` exists.
- [ ] `VoiceTranscriptRow` exists.
- [ ] `listVoiceSessions` exists.
- [ ] `listVoiceTranscripts` exists.
- [ ] Read helpers are read-only.

## Deferred boundaries

- [ ] No voice API routes exist yet.
- [ ] No voice UI components exist yet.
- [ ] No `/voice-companion` route exists.
- [ ] No STT/TTS provider code exists yet.
- [ ] No Memory/RAG is implemented.
- [ ] No web search is implemented.
- [ ] No analytics/custom tracker implementation is added.

## Gate

- [ ] `npm run audit:phase14b` passes.
- [ ] `npm run check` passes.

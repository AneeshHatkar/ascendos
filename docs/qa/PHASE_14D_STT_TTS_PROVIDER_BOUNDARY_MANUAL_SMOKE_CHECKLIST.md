# Phase 14D STT/TTS Provider Boundary Manual Smoke Checklist

Status: Ready.

## API checks

- POST `/api/voice/transcribe` with JSON only.
- POST `/api/voice/speak` with JSON only.
- Confirm unsupported providers return `provider_unconfigured`.
- Confirm transcribe returns `persisted: false`.
- Confirm speak returns `persisted: false`.
- Confirm both routes return `audio_saved: false`.
- Confirm both routes return `audio_retained: false`.
- Confirm both routes return `proposed_action_created: false`.

## Boundary checks

- No browser microphone UI exists.
- No `MediaRecorder` usage exists.
- No `SpeechRecognition` usage exists.
- No audio storage code exists.
- No SQL writes are added.
- No proposed-action execution bridge is added.
- No standalone `/voice-companion` route is added.
- No Memory/RAG, web search, autonomous reminders, or silent writes are added.

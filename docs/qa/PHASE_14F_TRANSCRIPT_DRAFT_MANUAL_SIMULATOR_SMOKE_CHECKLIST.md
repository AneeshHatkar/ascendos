# Phase 14F Transcript Draft + Manual Simulator Smoke Checklist

## Required checks

- Confirm `src/lib/voice/transcript-draft.ts` exists.
- Confirm `createVoiceTranscriptDraft` returns a local draft object.
- Confirm draft output includes `needsReview: true`.
- Confirm draft output includes `sensitiveDefault: true`.
- Confirm boundary flags are all false for persistence/audio/provider/action behavior.
- Confirm `VoiceManualSimulatorPreview` exists.
- Confirm simulator accepts typed manual text.
- Confirm simulator renders status, review state, size, summary, and protected boundary markers.
- Confirm voice component exports include the simulator.

## Protected boundary checks

- Manual transcript input only.
- No microphone capture.
- No provider calls.
- No SQL writes.
- No proposed-action creation.
- No proposed-action execution.
- No /voice-companion.
- No audio storage.
- No OpenAI or model call.
- No autonomous background behavior.

## Manual browser check later

When Phase 14G wires the simulator into `/carnos`, confirm the preview appears inside the Carnos panel without saving, executing, or calling audio APIs.

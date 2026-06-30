# Phase 14F Transcript Draft + Manual Simulator Report

Status: Complete pending audit, full check, commit, and push.

## Completed scope

Phase 14F adds a safe transcript draft layer and manual simulator preview for the Phase 14 voice/text foundation.

Implemented files:

- `src/lib/voice/transcript-draft.ts`
- `src/components/voice/voice-manual-simulator-preview.tsx`
- `src/components/voice/index.ts`
- `src/lib/voice/index.ts`
- `scripts/audit-phase-14f.mjs`
- `docs/qa/PHASE_14F_TRANSCRIPT_DRAFT_MANUAL_SIMULATOR_SMOKE_CHECKLIST.md`

## Behavior

The transcript draft helper converts typed/manual transcript text into a reviewable draft object with:

- normalized transcript text,
- word count,
- character count,
- preview text,
- draft status,
- `needsReview: true`,
- sensitive-by-default behavior,
- explicit safety boundary flags.

The manual simulator preview allows a user to type simulated transcript text and inspect the resulting local draft preview.

## Protected boundaries

Phase 14F includes:

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

## Deferred scope

Phase 14F does not connect the simulator to `/carnos`.
Phase 14F does not create proposed actions.
Phase 14F does not persist transcript drafts.
Phase 14F does not call the Phase 14D STT/TTS routes.
Phase 14F does not perform real audio capture.

Next phase: Phase 14G Carnos Voice Panel Integration.

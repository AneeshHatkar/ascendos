# Phase 14E Voice UI Components Manual Smoke Checklist

Status: Ready.

## Static checks

- Confirm `src/components/voice/index.ts` exports all Phase 14E components.
- Confirm voice UI files compile without client hooks.
- Confirm controls are disabled or preview-only.
- Confirm transcript UI is display-only.
- Confirm confirmation UI is preview-only.

## Forbidden behavior checks

- No `MediaRecorder`.
- No `SpeechRecognition`.
- No `navigator.mediaDevices`.
- No `new Audio`.
- No `<audio`.
- No `fetch(`.
- No `.insert(`.
- No `.update(`.
- No `.delete(`.
- No `.upsert(`.
- No `createProposedAction`.
- No `executeApprovedAction`.
- No `/voice-companion`.

## Expected result

Phase 14E should pass lint, build, `audit:phase14e`, and full `npm run check`.

## Next step

Phase 14F — Transcript Draft + Manual Simulator.

## Explicit audit markers

No MediaRecorder.

No SQL writes.

No /voice-companion.

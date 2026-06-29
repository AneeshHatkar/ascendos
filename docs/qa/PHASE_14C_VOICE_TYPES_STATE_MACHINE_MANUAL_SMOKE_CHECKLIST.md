
# Phase 14C Voice Types / State Machine Manual Smoke Checklist

## Contract checks

- Confirm `src/types/voice.ts` exports voice session types, modes, statuses, transcript sources, transcript speakers, runtime states, review levels, and safe proposed-action types.
- Confirm `src/schemas/voice.ts` validates voice session drafts and transcript drafts without adding external schema dependencies.
- Confirm transcript drafts default to reviewable/sensitive behavior.
- Confirm audio retention defaults remain false.

## State-machine checks

- Confirm `idle -> permission_needed`.
- Confirm `permission_needed -> listening`.
- Confirm `listening -> recording`.
- Confirm `recording -> transcribing`.
- Confirm `transcribing -> thinking`.
- Confirm `thinking -> confirmation_needed`.
- Confirm `confirmation_needed -> listening`.
- Confirm errors can move to `error`.
- Confirm `ended` and `error` can reset to `idle`.

## Safety checks

- Confirm no `/voice-companion` route exists.
- Confirm no voice API routes exist yet.
- Confirm no STT/TTS provider implementation exists yet.
- Confirm no browser microphone code exists yet.
- Confirm no audio storage or retention implementation exists.
- Confirm no silent writes are introduced.
- Confirm all future writes must still route through proposed actions.

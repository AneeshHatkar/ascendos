# Phase 14G Carnos Voice Panel Integration Smoke Checklist

Status: Ready for manual verification.

## Route check

- Open `/carnos`.
- Confirm the Carnos page still loads.
- Confirm the Phase 14G Carnos voice panel integration appears on the page.
- Confirm the manual transcript simulator appears inside the Carnos surface.

## Boundary check

Confirm the UI states:

- Canonical surface: `/carnos`.
- Manual transcript simulator only.
- No standalone voice route.
- No microphone APIs.
- No provider calls from UI.
- No SQL writes from UI.
- No proposed-action creation from UI.
- No proposed-action execution from UI.

## Interaction check

- Type into the manual transcript textarea.
- Confirm the local draft summary updates.
- Confirm no save/execute/confirm action is triggered.
- Confirm no Carnos extraction call is triggered.

## Deferred scope check

- Phase 14H remains the first intentional bridge from text/voice draft to proposed action.
- `/voice-companion` remains absent.

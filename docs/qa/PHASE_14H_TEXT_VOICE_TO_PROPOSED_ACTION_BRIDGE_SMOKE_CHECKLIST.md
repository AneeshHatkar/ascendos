# Phase 14H Text/Voice-to-Proposed-Action Bridge Smoke Checklist

Status: Ready for manual smoke check.

## Automated checks

- [ ] `npm run audit:phase14h`
- [ ] `npm run check`

## Manual browser check later

- [ ] Open `/carnos`.
- [ ] Confirm the Carnos voice panel renders.
- [ ] Confirm the manual transcript simulator still renders.
- [ ] Confirm the Phase 14H bridge preview renders.
- [ ] Type a task-like transcript.
- [ ] Confirm a preview-only `create_task` candidate appears.
- [ ] Type a non-action transcript.
- [ ] Confirm no candidate appears.
- [ ] Confirm the UI clearly states human confirmation is required.
- [ ] Confirm the UI states no SQL writes.
- [ ] Confirm the UI states no AI calls.
- [ ] Confirm the UI states no provider calls.
- [ ] Confirm the UI states no persisted action rows.
- [ ] Confirm the UI states no action execution.
- [ ] Confirm no `/voice-companion` route exists.

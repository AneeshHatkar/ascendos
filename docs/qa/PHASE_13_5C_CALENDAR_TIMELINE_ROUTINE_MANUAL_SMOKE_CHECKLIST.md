# Phase 13.5C Manual Smoke Checklist

## Calendar route

- Visit `/calendar`.
- Confirm the Calendar dashboard renders.
- Confirm the Phase 13.5C calendar/routine/reminder panel appears.
- Confirm the panel includes:
  - Calendar blocks
  - Active routines
  - Routine steps
  - Pending reminders
  - Timeline decision copy
  - Source tables

## Timeline route

- Visit `/timeline`.
- Confirm existing timeline read view still renders.
- Confirm timeline remains read-only.
- Confirm no autonomous writes or background timeline jobs are visible.

## Safety checks

- No reminder is sent.
- No background notification worker starts.
- No Carnos action executes.
- No direct dashboard mutation occurs.
- `timeline_events` is not created.
- `/carnos` and all internal Carnos namespace files remain unchanged for persona rename purposes.

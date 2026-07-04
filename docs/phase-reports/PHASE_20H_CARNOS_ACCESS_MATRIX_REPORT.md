# Phase 20H Carnos Access Matrix Report

Phase 20H defines exactly what Carnos may read, summarize, suggest, remember, use in context, use in analytics, show on dashboards, reference in chat, include in export summaries, propose as actions, or execute after approval under privacy, sensitive lock, Private Mode, Emergency Lockdown, connector, and Spotify constraints.

## Added

- Carnos capability matrix.
- Absolute denial rules.
- Domain interaction rules.
- Private Mode rules.
- Emergency Lockdown rules.
- Connector rules.
- Spotify rules.
- Access decision inputs.
- Blocked reasons.
- Audit events.
- Badge requirements.

## Schema Note

No schema was needed. This chunk does not add migrations, Carnos permission persistence, RLS policies, repositories, connector runtime authorization, or Spotify runtime authorization.

## Verification

- npm run audit:phase20h
- npm run check

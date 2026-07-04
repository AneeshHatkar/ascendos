# Phase 20F Emergency Lockdown Contracts Report

Phase 20F defines Emergency Lockdown as the strongest privacy protection state across memory, Carnos, dashboards, timeline, analytics, export, destructive actions, connectors, Spotify, sensitive domains, audit, and UI badges.

## Added

- Emergency Lockdown states.
- Activation effects.
- Affected surfaces.
- Sensitive domain defaults.
- Lockdown rules.
- Unlock rules.
- Blocked reasons.
- Audit event requirements.
- Badge requirements.
- Carnos rules.
- Connector rules.
- Spotify rules.

## Schema Note

No schema was needed. This chunk does not add migrations, privacy_settings persistence, lockdown session storage, RLS, audit rows, repositories, connector runtime enforcement, or Spotify runtime enforcement.

## Verification

- npm run audit:phase20f
- npm run check

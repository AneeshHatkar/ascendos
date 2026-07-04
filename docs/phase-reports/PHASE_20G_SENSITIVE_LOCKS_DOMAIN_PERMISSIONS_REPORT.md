# Phase 20G Sensitive Locks Domain Permissions Report

Phase 20G defines sensitive lock levels and domain privacy permissions across dashboards, timeline, analytics, export, Carnos, connectors, Spotify, redaction, retention, audit, and badges.

## Added

- Sensitive lock levels.
- Domain permission fields.
- Domain registry.
- Permission rules.
- Lock transition rules.
- Redaction defaults.
- Retention defaults.
- Blocked reasons.
- Audit events.
- Badge requirements.
- Connector and Spotify restrictions.

## Schema Note

No schema was needed. This chunk does not add migrations, sensitive lock persistence, domain setting rows, RLS policies, repositories, or live permission writes.

## Verification

- npm run audit:phase20g
- npm run check

# Phase 20L Export Manifest Expiration Report

Phase 20L defines export request, preview, manifest, status, expiration, warning, redaction, connector, Spotify, audit, and safety rules before real export generation exists.

## Added

- Export request model.
- Export preview model.
- Export manifest model.
- Export status model.
- Export format boundaries.
- Expiration rules.
- Scope category rules.
- Warning codes.
- Blocked reasons.
- Audit events.
- Badge requirements.
- Connector and Spotify export rules.
- Explicit token exclusion.

## Schema Note

No schema was needed. This chunk does not add migrations, export persistence, storage, signed links, background jobs, repositories, RLS policies, checksum generation, or export execution.

## Verification

- npm run audit:phase20l
- npm run check

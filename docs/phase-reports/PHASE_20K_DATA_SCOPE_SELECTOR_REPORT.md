# Phase 20K Data Scope Selector Report

Phase 20K defines the shared data scope selector for export, forget, hide, archive, destructive action previews, privacy review queue items, connector data previews, Spotify data previews, memory controls, custom trackers, documents, current-info sources, analytics, timeline, and audit surfaces.

## Added

- Selector model.
- Requested actions.
- Domain dimensions.
- Record type dimensions.
- Source type dimensions.
- Selector dimensions.
- Action-specific rules.
- Preview requirements.
- Blocked reasons.
- Audit events.
- Badge requirements.
- Connector and Spotify selector rules.

## Schema Note

No schema was needed. This chunk does not add migrations, selector persistence, live queries, repositories, export generation, mutations, connector reads, Spotify reads, or destructive execution.

## Verification

- npm run audit:phase20k
- npm run check

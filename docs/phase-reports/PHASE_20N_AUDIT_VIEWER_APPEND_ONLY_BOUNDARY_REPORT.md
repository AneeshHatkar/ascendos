# Phase 20N Audit Viewer Append Only Boundary Report

Phase 20N defines Audit Viewer model, filters, detail panels, actor/source/target metadata, linked manifests, linked review requests, linked source/evidence references, connector references, Spotify references, redaction behavior, append-only audit boundary, Carnos audit restrictions, protected audit events, export relationship, blocked reasons, badges, and verification rules before live audit viewer UI or audit persistence changes exist.

## Added

- Audit viewer model.
- Audit event display model.
- Detail panel model.
- Filter dimensions.
- Event groups.
- Actor types.
- Target types.
- Payload visibility levels.
- Append-only audit boundary.
- Linked object rules.
- Carnos audit restrictions.
- Audit export relationship rules.
- Protected audit event rules.
- Warning codes.
- Blocked reasons.
- Audit events.
- Badge requirements.
- Connector and Spotify token boundaries.

## Schema Note

No schema was needed. This chunk does not add migrations, audit persistence, repositories, RLS policies, audit writes, audit edits, audit payload mutations, or Audit Viewer UI.

## Verification

- npm run audit:phase20n
- npm run check

# Phase 20M Forget Destructive Manifest Safety Report

Phase 20M defines forget, hide, archive, destructive action manifest, affected and skipped record, derived record, confirmation, cooldown, review, export, audit, Carnos denial, connector, Spotify, and hard-removal-deferred safety rules before any real mutation or hard removal exists.

## Added

- Forget manifest model.
- Destructive action manifest model.
- Affected record model.
- Skipped record model.
- Skip reasons.
- Status model.
- Action types.
- Derived record rules.
- Action group rules.
- Count rules.
- Warning codes.
- Blocked reasons.
- Audit events.
- Badge requirements.
- Connector and Spotify destructive boundaries.
- Carnos destructive denial rules.
- Hard-removal-deferred boundary.

## Schema Note

No schema was needed. This chunk does not add migrations, manifest persistence, mutations, hard removal, repositories, RLS policies, audit writes, connector mutations, Spotify mutations, or runtime execution.

## Verification

- npm run audit:phase20m
- npm run check

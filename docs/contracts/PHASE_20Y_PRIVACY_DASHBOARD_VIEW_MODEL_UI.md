# Phase 20Y — Privacy Dashboard View Model + UI

## Purpose

Wire the existing `/privacy` route to a Phase 20 read-only dashboard view model and UI using existing discovered settings/privacy read helpers.

## Discovered Sources

- Route: `src/app/privacy/page.tsx`
- Dashboard helper: `src/lib/dashboard/settings-privacy-dashboard-data-helpers.ts`
- Repository file: `src/lib/repositories/settings-privacy-read.ts`
- Read helpers:
  - `getSettingsPrivacyDashboardDataSummary`
  - `listAppSettings`
  - `listPrivacySettings`
- Shell pattern: `AuthenticatedDashboardShell`

## Schema Requirement

- Needs new database schema: false
- Reason: 20Y uses existing settings/privacy read helpers.
- Runtime boundary: future write actions, connector account storage, export generation, destructive manifests, token storage, review queue persistence, or audit insertion require schema inspection before coding.

## UI Coverage

- Memory Inbox
- Saved Memories
- Forget
- Export
- Destructive Action
- Private Mode
- Emergency Lockdown
- Sensitive Locks
- Audit Viewer
- Carnos Access Matrix
- Spotify Connector
- Media Permissions
- Manual Workout Logging
- Deferred Connectors

## Runtime Guards

- No database writes from `/privacy`.
- No Spotify provider calls from `/privacy`.
- No OAuth start or callback is added by 20Y.
- No token value is displayed.
- No destructive action executes from `/privacy`.
- No export manifest is generated from `/privacy`.
- No Carnos runtime action executes from `/privacy`.
- No deferred connector is represented as connected.

## Acceptance

- Existing `/privacy` route renders the new Phase 20Y dashboard UI.
- Route keeps `AuthenticatedDashboardShell`.
- Route still reads app settings and privacy settings with existing helpers.
- Privacy dashboard view model builder exists.
- UI displays Phase 20 cards for memory, private mode, export, destructive action, sensitive locks, audit, Spotify, media permissions, manual workout logging, and deferred connectors.
- UI marks Spotify as boundary-only and token-hidden.
- UI marks Garmin and health connectors as deferred.
- UI marks Echo/Alexa as excluded from Phase 20.
- No migrations are added.
- No write action is added.
- No provider call is added.
- No token exposure is added.

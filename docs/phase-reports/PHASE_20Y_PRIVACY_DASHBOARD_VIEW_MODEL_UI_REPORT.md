# Phase 20Y Privacy Dashboard View Model UI Report

Phase 20Y wired the existing `/privacy` route to a read-only Phase 20 dashboard view model and UI.

## Added

- `src/lib/privacy/privacy-dashboard-view-model.ts`
- `src/components/privacy/privacy-dashboard-ui.tsx`
- Updated `src/app/privacy/page.tsx`
- Added Phase 20Y contract, fixture, report, and audit script.
- Integrated `audit:phase20y` into package checks.

## Source Use

20Y uses existing discovered helpers:

- `getSettingsPrivacyDashboardDataSummary`
- `listAppSettings`
- `listPrivacySettings`

## Schema Note

No schema was added. This chunk uses existing read helpers only and does not add migrations, database writes, connector tables, Spotify provider calls, OAuth routes, token storage, export generation, destructive actions, audit writes, or Carnos runtime tools.

## Verification

- `npm run audit:phase20y`
- `npm run check`

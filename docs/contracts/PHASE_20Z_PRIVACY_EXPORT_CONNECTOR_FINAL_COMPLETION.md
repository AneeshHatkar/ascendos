# Phase 20Z — Privacy / Export / Connector Final Completion Contract

## Status

Complete.

## Purpose

Phase 20Z closes Phase 20 by packaging final proof that the privacy, export, memory control, private mode, sensitive lock, audit viewer, connector trust, Spotify boundary, and manual workout connector stance work is represented in the repository and integrated into the verification chain.

## Final Phase 20 Scope

Phase 20 is complete only when all of the following are true:

- `/privacy` remains the final user-facing read-only privacy command surface.
- Memory control, private mode, sensitive locks, audit visibility, export manifests, destructive review, connector trust, Spotify boundaries, manual workout stance, and deferred connector stance are represented.
- Carnos permission enforcement remains explicit and conservative.
- Spotify remains an account/media boundary contract only.
- No Spotify OAuth token, access token, refresh token, or provider runtime integration is introduced.
- No silent external action is allowed.
- Manual workout logging remains a first-party manual tracker stance.
- Garmin and health-device connectors remain deferred.
- Echo/Alexa remains excluded.
- Phase 20Z introduces no database migration.

## Required Artifacts

- `docs/fixtures/phase20-privacy-export/phase20z_final_privacy_export_connector_completion_fixture.json`
- `docs/contracts/PHASE_20Z_PRIVACY_EXPORT_CONNECTOR_FINAL_COMPLETION.md`
- `docs/phase-reports/PHASE_20Z_PRIVACY_EXPORT_CONNECTOR_FINAL_COMPLETION_REPORT.md`
- `docs/qa/PHASE_20Z_PRIVACY_EXPORT_CONNECTOR_FINAL_SMOKE_CHECKLIST.md`
- `scripts/audit-phase-20z.mjs`
- `package.json` script `audit:phase20z`
- `npm run check` integration for `audit:phase20z`

## Non-Goals

Phase 20Z does not add:

- New SQL schema.
- New Supabase write path.
- Spotify runtime API calls.
- OAuth callback implementation.
- Health device connectors.
- Garmin sync.
- Echo/Alexa support.
- Background polling.
- Silent Carnos actions.

## Completion Rule

Phase 20 is considered closed when `npm run audit:phase20z` and `npm run check` both pass.

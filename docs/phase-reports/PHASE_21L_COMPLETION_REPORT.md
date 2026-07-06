# Phase 21L Completion Report — Mac/Drive Backup and Restore Preview

## Scope
Phase 21L adds a user-controlled Mac/Drive backup preview and restore preview surface. It is not a real SQL export job and not an automatic restore system.

## Implemented
- Added Phase 21L backup/restore UI component.
- Mounted backup/restore preview on `/privacy`.
- Mounted backup/restore preview on `/settings`.
- Added backup category selector.
- Added Mac download / Google Drive manual upload / external-drive manual copy destination selection.
- Added redaction toggle.
- Added restore-preview manifest toggle.
- Added metadata-only backup preview JSON generation.
- Added SHA-256 integrity digest generation.
- Added user-controlled JSON download.
- Added restore file preview.
- Added secret-signal detection for restore previews.
- Added explicit never-included backup list.
- Added source-of-truth disclosure: Supabase/Postgres remains canonical.
- Added no-automatic-restore and no-automatic-Drive-sync disclosures.

## Safety boundaries
- No SQL reads.
- No SQL writes.
- No Supabase restore.
- No real user data export in this preview.
- No provider keys.
- No Spotify access tokens or refresh tokens.
- No OAuth client secrets.
- No service-role keys.
- No `.env` values.
- No browser secrets.
- No automatic Google Drive sync.
- No automatic restore.
- No overwrite/delete/merge action.
- No schema changes.

## Restore behavior
- Restore upload parses JSON locally in the browser.
- It checks bundle format, source-of-truth marker, automatic restore flag, and secret-like signals.
- It never writes, deletes, overwrites, restores, syncs, or calls Supabase.

## Phase 21N browser-test targets
- Open `/privacy`.
- Open `/settings`.
- Generate backup preview.
- Download backup preview JSON.
- Confirm SHA-256 appears.
- Upload generated JSON into restore preview.
- Confirm restore preview says no restore executed.
- Try a JSON containing `access_token` and confirm warning/error.
- Confirm no env/key/token fields appear in generated preview.
- Confirm no automatic Drive sync controls exist.

## Verification to run
- `npm run lint`
- `npm run validate:routes`
- `npm run validate:registry`
- `npm run build`
- `git diff --check`
- `npm run check`
- `npm run audit:phase20z`

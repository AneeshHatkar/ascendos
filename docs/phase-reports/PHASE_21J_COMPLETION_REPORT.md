# Phase 21J Completion Report — Privacy, Export, Connectors, Spotify, Settings

## Scope
Phase 21J finalizes the visible trust surfaces for settings, privacy, export scope, destructive-action boundaries, connectors, Spotify, and Athena settings.

## Implemented
- Added Phase 21J trust/settings panel.
- Mounted the panel on `/privacy`.
- Mounted the panel on `/settings`.
- Added export category selector.
- Added export redaction toggle.
- Added export history metadata toggle.
- Added export manifest preview.
- Added destructive-action confirmation preview.
- Added explicit non-execution boundary for forget/delete/revoke previews.
- Added Spotify status refresh UI.
- Added Spotify connect link.
- Added Spotify token refresh button through server endpoint.
- Added Spotify revoke button through server endpoint.
- Added Spotify privacy explanation.
- Added Athena settings summary for provider, voice, current-info, and storage.
- Kept Spotify playback and playlist mutation out of scope.

## Safety boundaries
- No new schema.
- No export file is generated.
- No private record content is exported to the browser.
- No provider API key is exposed.
- No Spotify token value is exposed.
- No localStorage or IndexedDB secrets.
- No destructive delete from preview controls.
- No direct memory/dashboard writes.
- No Spotify playback, playlist edits, follows, likes, or recommendation mutation.
- Real connector mutations remain limited to existing server refresh/revoke routes.

## Routes used
- `/privacy`
- `/settings`
- `GET /api/connectors/spotify/status`
- `GET /api/connectors/spotify/auth`
- `POST /api/connectors/spotify/refresh`
- `POST /api/connectors/spotify/revoke`

## Phase 21N browser-test targets
- Open `/privacy`.
- Open `/settings`.
- Preview export manifest.
- Toggle export categories and redaction.
- Preview destructive-action boundary.
- Refresh Spotify status.
- Check Spotify disabled/unconfigured state.
- Verify no token values appear in UI.
- Verify no playback/playlist mutation controls exist.
- Verify provider/settings summaries are truthful.

## Verification to run
- `npm run lint`
- `npm run validate:routes`
- `npm run validate:registry`
- `npm run build`
- `git diff --check`
- `npm run check`
- `npm run audit:phase20z`

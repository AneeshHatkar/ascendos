# Phase 20S — Spotify Connector Foundation

## Purpose

Define the Spotify connector identity, developer setup boundary, redirect URI boundary, OAuth PKCE stance, environment variable boundary, scope groups, connection status model, provider policy boundary, token boundary, account profile boundary, privacy mode behavior, emergency lockdown behavior, Carnos access stance, audit events, blocked reasons, and badges before any OAuth route, callback route, token storage, provider call, UI card, or persistence exists.

## Schema Requirement

- Needs live database schema: false
- Reason: 20S defines Spotify connector foundation contracts only. It does not create OAuth routes, callback routes, token storage, Spotify API clients, connector tables, account persistence, scope persistence, UI cards, provider calls, sync jobs, or runtime actions.
- Future schema gate: If a later chunk persists Spotify accounts, Spotify scopes, encrypted token references, playback snapshots, device snapshots, playlist snapshots, recently played snapshots, action requests, action manifests, connection status, audit rows, or UI view models, inspect exact schema before coding.

## Official Spotify Reference Boundary

- Spotify Web API uses OAuth 2.0 authorization for protected user data and features.
- Spotify scopes define user-granted permissions.
- Authorization Code with PKCE is recommended where a client secret cannot be safely stored.
- Redirect URI values must match the Spotify app allowlist exactly except documented loopback exceptions.
- Refresh tokens are security credentials and must not be exposed.
- Playback state reads use OAuth 2.0 and carry provider policy limitations.

- Implementation note: 20S stores no official doc content beyond boundary summaries. Later runtime chunks must re-check current provider docs before implementation.

## Spotify Connector Identity

- connector_id: spotify
- provider_name: Spotify
- display_name: Spotify
- category: media_control
- phase_scope: Phase 20 Privacy Export Connector Trust Layer
- implementation_status: foundation_contract_only
- next_chunks:
  - 20T account connection and OAuth PKCE callback boundary
  - 20U playback device playlist recently played boundaries
  - 20V Carnos actions and action safety
  - 20W Spotify UI Media Permissions Connector Audit cards

## Developer App Setup Boundary

### Required Setup Items
- Spotify Developer account
- Spotify Developer App
- client id
- redirect URI allowlist entry
- development mode user access where required by Spotify app settings
- selected scopes
- environment variable names
- local callback path decision
- provider policy review

### Must Not Store In Repo
- client secret
- access token
- refresh token
- authorization code
- PKCE verifier
- session secret
- provider account private identifiers beyond boundary metadata

### Setup Notes
- 20S does not create the developer app.
- 20S does not connect a Spotify account.
- 20S does not request scopes.
- 20S does not exchange authorization codes.
- 20S does not store tokens.
- 20S only locks setup boundaries and safety rules.

## Redirect URI Boundary

- Local development candidate: http://127.0.0.1:3000/api/connectors/spotify/callback
- Production candidate: https://APP_DOMAIN/api/connectors/spotify/callback

- Redirect URI must exactly match the Spotify Developer App allowlist.
- Loopback IP literal is preferred over localhost aliases for local development.
- Production redirect URI must use HTTPS.
- Redirect URI mismatch must block connection.
- Callback path must not expose tokens in UI.
- Callback path must validate state and provider.
- Callback path must not be implemented in 20S.

## OAuth PKCE Boundary

- Selected flow: authorization_code_with_pkce
- Reason: PKCE avoids relying on a safely stored client secret in public-client style flows.

### Required Runtime Parts Future
- state
- code_verifier
- code_challenge
- code_challenge_method
- authorization_code
- access_token
- refresh_token
- expires_in
- scope
- token_type

### Rules
- PKCE verifier must be temporary and secret.
- PKCE challenge can be sent to provider.
- Authorization code must be exchanged server-side or in a protected boundary selected by implementation.
- Access token must never be printed.
- Refresh token must never be printed.
- Token values must never be available to Carnos.
- Token values must never appear in audit payloads.
- Token values must never be included in exports.
- 20S does not implement the flow.

## Environment Variable Boundary

### Required Names Future
- SPOTIFY_CLIENT_ID
- SPOTIFY_REDIRECT_URI
- SPOTIFY_ENCRYPTION_KEY_OR_SECRET_BOUNDARY
- SPOTIFY_ALLOWED_SCOPES
- SPOTIFY_PROVIDER_BASE_URL

### Optional Names Future
- SPOTIFY_CLIENT_SECRET_SERVER_ONLY_IF_CONFIDENTIAL_FLOW_IS_USED
- SPOTIFY_DEV_MODE_ALLOWED_USER_HINT
- SPOTIFY_RATE_LIMIT_POLICY_HINT

### Rules
- Environment variable names can be documented.
- Environment variable values must not be committed.
- Secrets must not be logged.
- Secrets must not be exposed to browser bundles.
- Client secret must not be used unless future implementation intentionally chooses a confidential server-side flow.
- 20S does not create env files.

## Scope Groups

### profile
- Privacy level: private
- Risk level: medium
- Candidate scopes:
  - user-read-private
  - user-read-email
- Notes:
  - Profile data can expose personal account metadata.
  - Email must be treated as private metadata.
  - Profile data must not become memory without review.

### playback_read
- Privacy level: private
- Risk level: medium
- Candidate scopes:
  - user-read-playback-state
  - user-read-currently-playing
- Notes:
  - Playback state can reveal current behavior.
  - Playback state must respect Private Mode.
  - Playback state must not enter analytics by default.

### playback_write
- Privacy level: private
- Risk level: high
- Candidate scopes:
  - user-modify-playback-state
- Notes:
  - Playback write controls external Spotify state.
  - Playback write needs review before execution.
  - Playback write can require active device and provider eligibility.

### playlist_read
- Privacy level: private
- Risk level: medium
- Candidate scopes:
  - playlist-read-private
  - playlist-read-collaborative
- Notes:
  - Playlist data can reveal preferences.
  - Private playlists are private by default.
  - Playlist data must not become memory without review.

### playlist_write
- Privacy level: private
- Risk level: high
- Candidate scopes:
  - playlist-modify-private
  - playlist-modify-public
- Notes:
  - Playlist write changes provider-side state.
  - Playlist write must route through action review.
  - Public playlist changes require high visibility warning.

### listening_history
- Privacy level: private
- Risk level: high
- Candidate scopes:
  - user-read-recently-played
  - user-top-read
- Notes:
  - Recently played and top items are sensitive by default.
  - Listening history must not enter broad dashboards by default.
  - Listening history must not become memory without explicit review.

## Connection Status Model

- not_configured
- developer_app_required
- redirect_uri_required
- env_required
- configured_not_connected
- connecting
- connected
- missing_scope
- reauthorization_required
- provider_unavailable
- rate_limited
- premium_required
- no_active_device
- revoked
- disconnect_pending
- disconnected
- blocked_by_private_mode
- blocked_by_emergency_lockdown
- failed

## Provider Policy Boundary

- Spotify provider policies must be reviewed before runtime implementation.
- Spotify content and playback features must not be used outside provider policy.
- Spotify playback controls can depend on account eligibility, active device, and provider-side state.
- Spotify provider limitations must be shown as boundary status, not hidden errors.
- Spotify provider rate limits must block or delay actions safely.
- Spotify data transfer limitations must be respected.
- 20S does not implement provider calls.

## Token Boundary Rules

- Spotify access token values are never shown in UI.
- Spotify refresh token values are never shown in UI.
- Spotify token values are never shown in audit payloads.
- Spotify token values are never included in exports.
- Spotify token values are never stored as memory.
- Spotify token values are never available to Carnos.
- Spotify token refresh events can be audited as boundary events without token values.
- Spotify token revocation events can be audited as boundary events without token values.
- Spotify token storage must be server-only or protected secret-boundary-only in future implementation.
- Spotify token storage is not implemented in 20S.

## Account Profile Boundary

### Fields Future
- spotify_connection_id
- provider_user_id_boundary
- display_name_boundary
- email_boundary
- country_boundary
- product_boundary
- explicit_content_boundary
- profile_image_boundary
- connected_at
- last_refreshed_at
- revoked_at
- granted_scope_ids
- missing_scope_ids
- connection_status

### Rules
- Provider user id is boundary metadata.
- Display name can be shown only when allowed.
- Email is private metadata.
- Country and product can reveal account context and must be private metadata.
- Profile image can be hidden or redacted based on privacy setting.
- Profile data must not become memory without explicit review.
- 20S does not persist profile fields.

## Private Mode Rules

- Private Mode blocks automatic Spotify reads by default.
- Private Mode blocks Spotify data entering Carnos context by default.
- Private Mode blocks Spotify data entering analytics by default.
- Private Mode hides Spotify broad dashboard summaries by default.
- Private Mode blocks Carnos Spotify action proposals by default.
- Private Mode blocks Spotify action execution unless explicitly reviewed in a future implementation.
- Carnos cannot disable Private Mode for Spotify.
- Private Mode never exposes token values.

## Emergency Lockdown Rules

- Emergency Lockdown blocks Spotify reads by default.
- Emergency Lockdown blocks Spotify actions by default.
- Emergency Lockdown blocks Spotify scope expansion.
- Emergency Lockdown blocks Carnos Spotify action proposals by default.
- Emergency Lockdown can hide Spotify connector cards from broad summaries.
- Emergency Lockdown can require review for disconnect or retention changes.
- Carnos cannot disable Emergency Lockdown for Spotify.
- Emergency Lockdown never exposes token values.

## Carnos Spotify Access Rules

- Carnos can see Spotify connection status only when privacy rules allow.
- Carnos can summarize Spotify metadata only when Carnos access matrix allows.
- Carnos can propose Spotify actions only when action proposal permission allows.
- Carnos cannot connect Spotify silently.
- Carnos cannot disconnect Spotify silently.
- Carnos cannot approve Spotify actions.
- Carnos cannot execute Spotify actions without explicit approval unless a future safe pre-approved class exists.
- Carnos cannot access Spotify token values.
- Carnos cannot store Spotify token values as memory.
- Carnos cannot use Spotify listening history as memory without explicit memory review.
- Carnos cannot bypass Private Mode.
- Carnos cannot bypass Emergency Lockdown.

## Spotify Data Classes

### profile
- Default privacy: private
- Default sensitivity: medium
- Export default: explicit_scope_only
- Carnos default: metadata_only_if_allowed

### playback_state
- Default privacy: private
- Default sensitivity: medium
- Export default: explicit_scope_only
- Carnos default: summary_only_if_allowed

### device_state
- Default privacy: private
- Default sensitivity: medium
- Export default: explicit_scope_only
- Carnos default: metadata_only_if_allowed

### playlists
- Default privacy: private
- Default sensitivity: medium
- Export default: explicit_scope_only
- Carnos default: summary_only_if_allowed

### recently_played
- Default privacy: private
- Default sensitivity: high
- Export default: explicit_scope_only
- Carnos default: blocked_by_default

### top_items
- Default privacy: private
- Default sensitivity: high
- Export default: explicit_scope_only
- Carnos default: blocked_by_default

### token_boundary
- Default privacy: locked
- Default sensitivity: critical
- Export default: never_include_value
- Carnos default: never_access

## Audit Events Required

- spotify_foundation_loaded
- spotify_developer_setup_required
- spotify_redirect_uri_boundary_defined
- spotify_env_boundary_defined
- spotify_scope_group_defined
- spotify_connection_status_changed
- spotify_private_mode_blocked
- spotify_emergency_lockdown_blocked
- spotify_carnos_access_blocked
- spotify_token_boundary_enforced
- spotify_provider_policy_boundary_shown
- spotify_scope_missing
- spotify_premium_required
- spotify_no_active_device
- spotify_reauthorization_required
- spotify_rate_limited
- spotify_provider_unavailable

## Blocked Reasons

- spotify_developer_app_missing
- spotify_client_id_missing
- spotify_redirect_uri_missing
- spotify_redirect_uri_mismatch
- spotify_env_missing
- spotify_not_connected
- spotify_connecting
- spotify_disconnected
- spotify_revoked
- spotify_reauthorization_required
- spotify_missing_scope
- spotify_provider_unavailable
- spotify_rate_limited
- spotify_premium_required
- spotify_no_active_device
- spotify_private_mode_active
- spotify_emergency_lockdown_active
- spotify_carnos_access_blocked
- spotify_action_review_required
- spotify_token_boundary
- spotify_provider_policy_boundary
- spotify_recently_played_sensitive

## Badge Requirements

- Spotify Foundation
- Developer App Required
- Redirect URI Required
- Env Required
- Configured Not Connected
- Spotify Connected
- Spotify Disconnected
- Missing Scope
- Reauthorization Required
- Provider Unavailable
- Rate Limited
- Premium Required
- No Active Device
- Private Mode Blocked
- Emergency Lockdown Blocked
- Carnos Restricted
- Token Hidden
- Provider Boundary
- Recently Played Sensitive
- Action Review Required

## Must Not Do

- do not create migrations in 20S
- do not invent Spotify persistence schema in 20S
- do not implement OAuth routes in 20S
- do not implement callback routes in 20S
- do not implement token exchange in 20S
- do not implement token refresh in 20S
- do not implement token storage in 20S
- do not implement Spotify provider calls in 20S
- do not implement Spotify UI cards in 20S
- do not connect a real Spotify account in 20S
- do not expose Spotify token values
- do not let Carnos access Spotify token values
- do not let Carnos connect Spotify silently
- do not let Carnos approve Spotify actions
- do not let Spotify actions bypass review
- do not let Spotify actions bypass Private Mode
- do not let Spotify actions bypass Emergency Lockdown

## Acceptance

- Spotify connector identity is defined.
- Developer app setup boundary is defined.
- Redirect URI boundary is defined.
- OAuth PKCE boundary is defined.
- Environment variable boundary is defined.
- Scope groups are defined.
- Connection status model is defined.
- Provider policy boundary is defined.
- Token boundary rules are defined.
- Account profile boundary is defined.
- Private Mode rules are defined.
- Emergency Lockdown rules are defined.
- Carnos Spotify access rules are defined.
- Spotify data classes are defined.
- Audit events are defined.
- Blocked reasons are defined.
- Badge requirements are defined.
- No token exposure rule is explicit.
- No silent Spotify action rule is explicit.
- 20S audit passes.
- Full project check passes.

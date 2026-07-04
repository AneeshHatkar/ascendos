# Phase 20W — Spotify UI + Media Permissions + Connector Audit Cards

## Purpose

Define Spotify UI cards, media permissions cards, connector audit cards, card visibility, card redaction, card actions, review states, provider limitation display, Carnos restrictions, privacy mode behavior, emergency lockdown behavior, audit card boundaries, blocked reasons, badges, and runtime schema gates before any live UI or data wiring exists.

## Schema Requirement

- Needs live database schema: false
- Reason: 20W defines UI and card contracts only. It does not create React components, routes, dashboard adapters, database reads, database writes, repositories, RLS policies, connector account storage, Spotify provider calls, audit writes, Carnos tools, or runtime action handlers.
- Future schema gate: If a later chunk creates live Spotify connector cards, media permission cards, connector audit cards, privacy dashboard sections, dashboard adapters, database-backed view models, account connection status reads, scope grant reads, audit log reads, action review reads, or provider status reads, inspect exact schema before coding.

## UI Surfaces

### spotify_connector_card
- Label: Spotify Connector
- Route hint: /privacy
- Default visibility: visible_when_feature_enabled_or_configured
- Data dependency future:
  - connector status
  - developer setup status
  - connection status
  - scope status
  - privacy mode status
  - emergency lockdown status
- Must show:
  - provider name
  - connection status badge
  - setup requirement badge
  - scope status badge
  - token hidden badge
  - Private Mode conflict when active
  - Emergency Lockdown conflict when active
  - safe next step
- Must not show:
  - access token
  - refresh token
  - authorization code
  - code verifier
  - raw provider secret
  - raw device identifier by default
  - hidden account email unless explicitly allowed

### spotify_media_permissions_card
- Label: Spotify Media Permissions
- Route hint: /privacy
- Default visibility: visible_when_spotify_foundation_exists
- Data dependency future:
  - scope groups
  - granted scopes
  - missing scopes
  - revoked scopes
  - action classes
  - data class sensitivity
  - Carnos access matrix
- Must show:
  - profile permission group
  - playback read permission group
  - playback write permission group
  - playlist read permission group
  - playlist write permission group
  - listening history permission group
  - risk level
  - Carnos access state
  - export default
  - memory default
  - analytics default
- Must not show:
  - token values
  - raw OAuth response
  - raw authorization code
  - unredacted private data without permission

### spotify_connector_audit_card
- Label: Spotify Connector Audit
- Route hint: /privacy
- Default visibility: visible_when_audit_viewer_enabled
- Data dependency future:
  - audit events
  - action proposals
  - connection status changes
  - scope changes
  - blocked reasons
  - provider limitation events
- Must show:
  - event type
  - safe timestamp
  - actor class
  - status badge
  - provider boundary badge
  - redaction badge
  - linked review item when available
  - linked action manifest when available
- Must not show:
  - token values
  - authorization codes
  - code verifier
  - raw OAuth payload
  - raw provider secret
  - private profile values unless permission allows

### spotify_action_review_card
- Label: Spotify Action Review
- Route hint: /privacy
- Default visibility: visible_when_action_review_item_exists
- Data dependency future:
  - action request
  - proposal manifest
  - scope requirements
  - provider limitation status
  - cooldown status
  - approval status
- Must show:
  - proposed action
  - expected external change
  - risk level
  - required scopes
  - Premium warning when relevant
  - active device warning when relevant
  - playlist visibility warning when relevant
  - approve or reject state
  - expiration state
- Must not show:
  - token values
  - hidden metadata
  - raw provider payload
  - unreviewed listening history details

## Card States

- not_configured
- developer_app_required
- redirect_uri_required
- env_required
- configured_not_connected
- connecting
- connected
- missing_scope
- scope_revoked
- reauthorization_required
- provider_unavailable
- rate_limited
- premium_required
- no_active_device
- private_mode_blocked
- emergency_lockdown_blocked
- carnos_restricted
- action_review_required
- cooldown_active
- disconnected
- revoked
- failed

## Media Permission Groups

### profile
- Label: Profile
- Default badge: Private Metadata
- Default Carnos access: status_only
- Default export: explicit_scope_only
- Default memory: review_required
- Default analytics: blocked_by_default

### playback_read
- Label: Playback Read
- Default badge: Playback Private
- Default Carnos access: summary_if_allowed
- Default export: explicit_scope_only
- Default memory: review_required
- Default analytics: blocked_by_default

### playback_write
- Label: Playback Control
- Default badge: Action Review Required
- Default Carnos access: proposal_only
- Default export: not_applicable
- Default memory: not_applicable
- Default analytics: audit_only

### playlist_read
- Label: Playlist Read
- Default badge: Playlist Private
- Default Carnos access: summary_if_allowed
- Default export: explicit_scope_only
- Default memory: review_required
- Default analytics: blocked_by_default

### playlist_write
- Label: Playlist Write
- Default badge: High Risk Action
- Default Carnos access: proposal_only
- Default export: not_applicable
- Default memory: not_applicable
- Default analytics: audit_only

### listening_history
- Label: Listening History
- Default badge: High Sensitivity
- Default Carnos access: blocked_by_default
- Default export: explicit_scope_only
- Default memory: explicit_review_required
- Default analytics: blocked_by_default

## Card Actions

### show_setup_guidance
- Label: Show setup guidance
- Risk level: low
- Requires approval: false
- Allowed during Private Mode: true
- Allowed during Lockdown: true
- Notes: May explain setup without showing private account data.

### start_connection
- Label: Start Spotify connection
- Risk level: medium
- Requires approval: true
- Allowed during Private Mode: false
- Allowed during Lockdown: false
- Notes: Future runtime action only. 20W does not start OAuth.

### review_scopes
- Label: Review Spotify scopes
- Risk level: medium
- Requires approval: false
- Allowed during Private Mode: redacted_only
- Allowed during Lockdown: redacted_only
- Notes: Shows permission groups and risk without token values.

### request_scope_change
- Label: Request scope change
- Risk level: high
- Requires approval: true
- Allowed during Private Mode: false
- Allowed during Lockdown: false
- Notes: Must route through review queue in future runtime.

### review_action_proposal
- Label: Review Spotify action proposal
- Risk level: high
- Requires approval: true
- Allowed during Private Mode: false
- Allowed during Lockdown: false
- Notes: Must show expected external change before approval.

### disconnect_spotify
- Label: Disconnect Spotify
- Risk level: high
- Requires approval: true
- Allowed during Private Mode: review_only
- Allowed during Lockdown: review_only
- Notes: Must preserve audit and manifest boundary in future runtime.

## Redaction Rules

- Token values are always hidden.
- Authorization codes are always hidden.
- Code verifier values are always hidden.
- OAuth raw payloads are always hidden.
- Provider account email is hidden unless explicitly allowed.
- Provider user id is shown only as boundary metadata.
- Device id is hidden by default.
- Device name can be redacted when Private Mode is active.
- Recently played details are hidden by default.
- Top item details are hidden by default.
- Playlist details are redacted unless permission allows.
- Audit payloads show safe summaries only.
- Carnos receives redacted card summaries only.

## Private Mode UI Rules

- Private Mode shows Spotify connector status only as safe summary.
- Private Mode hides currently playing details.
- Private Mode hides device details.
- Private Mode hides playlist details unless explicitly allowed.
- Private Mode hides recently played details.
- Private Mode hides top item details.
- Private Mode blocks start connection action by default.
- Private Mode blocks scope expansion action by default.
- Private Mode blocks playback action cards by default.
- Private Mode blocks playlist mutation cards by default.
- Private Mode can show safe explanation card.
- Carnos cannot ask to disable Private Mode just to reveal Spotify cards.

## Emergency Lockdown UI Rules

- Emergency Lockdown shows Spotify connector as locked.
- Emergency Lockdown hides account details.
- Emergency Lockdown hides media details.
- Emergency Lockdown hides action proposals except safe blocked summary.
- Emergency Lockdown blocks start connection action.
- Emergency Lockdown blocks scope expansion action.
- Emergency Lockdown blocks playback action cards.
- Emergency Lockdown blocks playlist mutation cards.
- Emergency Lockdown blocks export action cards unless future reviewed exception exists.
- Emergency Lockdown can show safe explanation card.
- Carnos cannot ask to disable Emergency Lockdown just to reveal Spotify cards.

## Connector Audit Card Rules

- Connector audit card must use append-only audit boundary.
- Connector audit card must never show token values.
- Connector audit card must never show raw OAuth payload.
- Connector audit card must show event category.
- Connector audit card must show safe actor label.
- Connector audit card must show status badge.
- Connector audit card must show provider boundary badge.
- Connector audit card must show redaction badge.
- Connector audit card must link to review queue item when available.
- Connector audit card must link to action manifest when available.
- Connector audit card must show blocked reasons.
- Connector audit card must respect audit viewer redaction level.

## Carnos UI Rules

- Carnos can summarize visible Spotify card status only when access matrix allows.
- Carnos can explain blocked Spotify cards.
- Carnos can explain missing scopes.
- Carnos can explain provider limitations.
- Carnos can draft action proposal copy for review.
- Carnos cannot reveal hidden card data.
- Carnos cannot reveal tokens.
- Carnos cannot approve card actions.
- Carnos cannot bypass card disabled states.
- Carnos cannot transform card visibility into consent.
- Carnos cannot infer protected traits from Spotify card data.

## Visual Badge Map

- Spotify Connected
- Spotify Not Connected
- Developer App Required
- Redirect URI Required
- Env Required
- Missing Scope
- Scope Revoked
- Reauthorization Required
- Provider Unavailable
- Rate Limited
- Premium Required
- No Active Device
- Private Mode Blocked
- Emergency Lockdown Blocked
- Carnos Restricted
- Token Hidden
- Action Review Required
- Cooldown Active
- High Sensitivity
- Explicit Export Scope
- Memory Review Required
- Audit Redacted
- Provider Boundary
- Schema Required For Runtime

## Audit Events Required

- spotify_ui_card_viewed
- spotify_ui_card_redacted
- spotify_ui_card_blocked
- spotify_media_permissions_viewed
- spotify_media_permission_group_viewed
- spotify_connector_audit_card_viewed
- spotify_connector_audit_card_redacted
- spotify_action_review_card_viewed
- spotify_action_review_card_blocked
- spotify_ui_private_mode_blocked
- spotify_ui_emergency_lockdown_blocked
- spotify_ui_carnos_summary_requested
- spotify_ui_carnos_summary_blocked
- spotify_ui_scope_review_requested
- spotify_ui_scope_change_blocked
- spotify_ui_disconnect_review_requested
- spotify_ui_token_redaction_enforced
- spotify_ui_schema_required_for_runtime

## Blocked Reasons

- spotify_ui_schema_required_for_runtime
- spotify_connector_not_configured
- spotify_developer_app_required
- spotify_redirect_uri_required
- spotify_env_required
- spotify_not_connected
- spotify_missing_scope
- spotify_scope_revoked
- spotify_reauthorization_required
- spotify_provider_unavailable
- spotify_rate_limited
- spotify_premium_required
- spotify_no_active_device
- spotify_private_mode_active
- spotify_emergency_lockdown_active
- spotify_carnos_access_blocked
- spotify_action_review_required
- spotify_cooldown_active
- spotify_token_boundary
- spotify_recently_played_sensitive
- spotify_top_items_sensitive
- spotify_playlist_private
- spotify_audit_redacted

## Must Not Do

- do not create migrations in 20W
- do not invent Spotify UI persistence schema in 20W
- do not implement React components in 20W
- do not implement dashboard adapters in 20W
- do not implement database reads in 20W
- do not implement database writes in 20W
- do not implement audit writes in 20W
- do not implement Spotify provider calls in 20W
- do not implement OAuth start in 20W
- do not implement playback actions in 20W
- do not implement playlist actions in 20W
- do not implement Carnos runtime tools in 20W
- do not expose token values
- do not show raw OAuth payloads
- do not let Carnos approve UI actions
- do not let Spotify UI bypass Private Mode
- do not let Spotify UI bypass Emergency Lockdown

## Acceptance

- Spotify connector card contract is defined.
- Spotify media permissions card contract is defined.
- Spotify connector audit card contract is defined.
- Spotify action review card contract is defined.
- Card states are defined.
- Media permission groups are defined.
- Card actions are defined.
- Redaction rules are defined.
- Private Mode UI rules are defined.
- Emergency Lockdown UI rules are defined.
- Connector audit card rules are defined.
- Carnos UI rules are defined.
- Visual badge map is defined.
- Audit events are defined.
- Blocked reasons are defined.
- No schema gate is explicit.
- No token exposure is explicit.
- No live UI implementation is performed.
- 20W audit passes.
- Full project check passes.

# Phase 20R — Future API Connector Framework

## Purpose

Define the reusable external API connector framework for registry, categories, accounts, permissions, scopes, auth boundaries, token boundaries, connection status, action requests, action manifests, audit taxonomy, Private Mode behavior, Emergency Lockdown behavior, disconnect behavior, retention, Carnos access, provider boundaries, no token exposure, and no silent external action rules before any provider-specific implementation exists.

## Schema Requirement

- Needs live database schema: false
- Reason: 20R defines connector framework contracts only. It does not create connector tables, token storage, OAuth routes, provider calls, repositories, RLS policies, runtime connector actions, UI cards, or sync jobs.
- Future schema gate: If a later chunk persists connector registry rows, connector accounts, connector scopes, connector permissions, encrypted token references, action requests, action manifests, audit rows, provider sync state, disconnect records, or retention state, inspect exact schema before coding.

## Connector Categories

- media_control
- calendar
- email
- documents
- developer_tools
- productivity
- health
- finance
- social
- storage
- communication
- automation
- future

## Connector Registry Model

### Required Fields
- connector_id
- provider_name
- display_name
- category
- enabled
- connection_status
- supported_auth_type
- supported_scope_ids
- required_permission_ids
- supported_action_types
- privacy_level
- sensitivity_level
- private_mode_behavior
- emergency_lockdown_behavior
- token_boundary
- audit_required
- carnos_access_level
- retention_policy
- provider_boundary_notes

### Optional Fields
- developer_setup_hint
- redirect_uri_boundary
- environment_variable_boundary
- rate_limit_boundary
- provider_terms_boundary
- disconnect_hint
- known_provider_states
- future_ui_card_name

## Connector Account Model

### Required Fields
- connector_account_id
- connector_id
- provider_name
- connection_status
- provider_user_id_boundary
- display_name_boundary
- email_boundary
- profile_metadata_boundary
- connected_at
- last_refreshed_at
- revoked_at
- granted_scope_ids
- missing_scope_ids
- privacy_level
- sensitivity_level
- retention_policy
- audit_event_id

### Privacy Rules
- Provider user id is a boundary value and must not be broadly exposed.
- Display name can be shown only when allowed by connector privacy rules.
- Email can be metadata-only or redacted based on privacy settings.
- Profile metadata cannot become Carnos memory without explicit approval.
- Connector account metadata cannot expose token values.
- Disconnected connector metadata must show retention state.

## Permission Model

### Permissions
- can_connect
- can_disconnect
- can_read_profile
- can_read_data
- can_write_data
- can_trigger_action
- can_execute_approved_action
- can_sync_metadata
- can_store_token_boundary
- can_export_connector_data
- can_use_in_carnos_context
- can_use_in_analytics
- can_show_on_dashboard

### Rules
- Connect requires explicit user action.
- Disconnect requires explicit user action.
- Write and action permissions are higher risk than read permissions.
- Carnos cannot grant connector permissions.
- Carnos cannot expand connector permissions.
- Carnos cannot execute connector actions without approval unless a future safe pre-approved class exists.
- Private Mode can block connector reads and actions.
- Emergency Lockdown blocks connector actions by default.
- Connector data export requires scope selector and export manifest rules.

## Scope Model

### Required Fields
- scope_id
- provider_scope_string_boundary
- display_name
- description
- risk_level
- required_for_action_types
- granted
- missing
- revoked
- last_changed_at
- audit_event_id

### Risk Levels
- low
- medium
- high
- critical

### Rules
- Scopes must be displayed in human-readable form.
- Provider scope strings are boundary metadata.
- Missing scopes block dependent actions.
- Revoked scopes block dependent actions.
- High-risk scope changes require review.
- Critical scope changes require two-step confirmation and can require cooldown.
- Scope changes require audit events.
- Scopes cannot expose tokens.

## Auth Boundary Model

### Supported Auth Types
- oauth_pkce
- oauth_authorization_code_future
- api_key_future
- device_code_future
- webhook_future
- manual_import_future

### Rules
- OAuth PKCE is preferred for user-facing providers when supported.
- Auth redirects must validate state.
- Auth callbacks must validate expected provider and connector.
- Auth errors must create safe status without exposing secret material.
- Auth setup hints can mention environment variable names but not secret values.
- Carnos cannot initiate auth silently.
- Carnos cannot complete auth silently.
- Auth status must be auditable.

## Token Boundary Model

### Token Material Classes
- access_token
- refresh_token
- id_token
- api_key
- client_secret
- session_secret
- webhook_secret

### Rules
- Token values are never shown in UI.
- Token values are never shown in audit payloads.
- Token values are never included in exports.
- Token values are never stored as memory.
- Token values are never available to Carnos.
- Token refresh events can be audited as boundary events without token values.
- Token revocation events can be audited as boundary events without token values.
- Token storage must be server-only in future implementation.
- Token storage must use a protected secret boundary in future implementation.
- Token failure states must not leak token values.

## Connection Status Model

- not_configured
- configured_not_connected
- connecting
- connected
- missing_scope
- reauthorization_required
- provider_unavailable
- rate_limited
- revoked
- disconnect_pending
- disconnected
- blocked_by_private_mode
- blocked_by_emergency_lockdown
- failed

## Action Request Model

### Required Fields
- connector_action_request_id
- connector_id
- connector_account_id
- action_type
- proposed_by
- requested_by
- required_scope_ids
- risk_level
- status
- review_id
- confirmation_level
- cooldown_state
- expires_at
- blocked_reasons
- audit_event_id

### Statuses
- draft
- needs_review
- approved
- rejected
- blocked
- cooldown_pending
- ready_to_execute
- completed
- failed
- expired

### Rules
- Connector action request must show required scopes.
- Connector action request must show missing scopes.
- Connector action request must show risk level.
- Connector action request must expire.
- Carnos can propose only when proposal permission allows.
- Carnos cannot approve connector action requests.
- Carnos cannot execute connector actions without explicit approval unless a future safe pre-approved class exists.
- Private Mode can block connector action requests.
- Emergency Lockdown blocks connector action execution by default.

## Action Manifest Model

### Required Fields
- connector_action_manifest_id
- connector_action_request_id
- connector_id
- connector_account_id
- action_type
- target_boundary
- required_scope_ids
- granted_scope_ids
- missing_scope_ids
- risk_level
- provider_state_boundary
- private_mode_state
- emergency_lockdown_state
- approval_status
- execution_status
- blocked_reasons
- created_at
- expires_at
- audit_event_id

### Rules
- Action manifest must not include token values.
- Action manifest must show provider boundary state.
- Action manifest must show required and missing scopes.
- Action manifest must show Private Mode and Emergency Lockdown state.
- Action manifest must show approval and execution status.
- Action manifest must be linked from audit events.
- Action manifest must expire when action request expires.

## Private Mode Rules

- Private Mode blocks automatic connector sync unless explicitly allowed.
- Private Mode blocks Carnos-triggered connector action proposals by default.
- Private Mode blocks connector action execution unless user explicitly reviews.
- Private Mode can hide connector data from dashboards.
- Private Mode can prevent connector data from entering analytics.
- Private Mode can prevent connector data from entering Carnos context.
- Private Mode does not expose token values.
- Carnos cannot disable Private Mode for connector actions.

## Emergency Lockdown Rules

- Emergency Lockdown blocks connector actions by default.
- Emergency Lockdown blocks connector permission expansion.
- Emergency Lockdown blocks connector scope expansion.
- Emergency Lockdown blocks Carnos connector action proposals by default.
- Emergency Lockdown can hide connector cards from broad dashboard summaries.
- Emergency Lockdown can require review for disconnect or retention changes.
- Emergency Lockdown does not expose token values.
- Carnos cannot disable Emergency Lockdown for connector actions.

## Disconnect Rules

- Disconnect requires explicit user action.
- Disconnect must show retained connector metadata implications.
- Disconnect must show provider-side limitation notes.
- Disconnect must preserve audit history.
- Disconnect must not expose token values.
- Disconnect must mark account as disconnected or revoked where future execution supports it.
- Disconnect can require review if retained data implications are sensitive.
- Carnos cannot disconnect a connector silently.

## Retention Rules

- Connector action proposals must expire.
- Connector action manifests must expire with their action request.
- Connector metadata retention must be visible.
- Disconnected connector metadata must show retention state.
- Connector token values are not visible retention subjects.
- Provider-side data may require provider-side controls outside ascendOS.
- Connector retention cannot reintroduce forgotten memory.
- Connector retention cannot expand Carnos access.

## Carnos Connector Access Rules

- Carnos can see connector connection status only when privacy rules allow.
- Carnos can summarize connector metadata only when Carnos access matrix allows.
- Carnos can propose connector actions only when action proposal permission allows.
- Carnos cannot connect a connector silently.
- Carnos cannot disconnect a connector silently.
- Carnos cannot approve connector actions.
- Carnos cannot execute connector actions without explicit approval unless a future safe pre-approved class exists.
- Carnos cannot access token values.
- Carnos cannot store connector token values as memory.
- Carnos cannot use connector data as memory without explicit memory review.
- Carnos cannot bypass Private Mode.
- Carnos cannot bypass Emergency Lockdown.

## Provider Boundary Rules

- Provider data can be outside ascendOS control.
- Provider availability can block actions.
- Provider rate limits can block actions.
- Provider permission revocation can block actions.
- Provider-side retention may require provider tools outside ascendOS.
- Provider identifiers should be boundary values unless display is explicitly allowed.
- Provider errors must not leak token values.
- Provider actions must produce auditable boundary status when future execution exists.

## Audit Events Required

- connector_registry_loaded
- connector_configured
- connector_connect_requested
- connector_connected
- connector_connection_failed
- connector_disconnect_requested
- connector_disconnected
- connector_scope_requested
- connector_scope_changed
- connector_scope_revoked
- connector_permission_changed
- connector_action_requested
- connector_action_review_required
- connector_action_approved
- connector_action_rejected
- connector_action_blocked
- connector_action_ready_to_execute
- connector_action_completed
- connector_action_failed
- connector_action_expired
- connector_token_boundary_refreshed
- connector_token_boundary_revoked
- connector_private_mode_blocked
- connector_emergency_lockdown_blocked
- connector_carnos_access_blocked

## Blocked Reasons

- connector_not_configured
- connector_not_connected
- connector_connecting
- connector_disconnected
- connector_revoked
- reauthorization_required
- provider_unavailable
- rate_limited
- missing_scope
- permission_blocked
- review_required
- approval_missing
- confirmation_required
- cooldown_required
- action_expired
- private_mode_active
- emergency_lockdown_active
- sensitive_lock_active
- carnos_access_blocked
- carnos_cannot_approve
- token_boundary
- provider_boundary
- retention_boundary
- audit_required

## Badge Requirements

- Connector Available
- Connector Not Configured
- Connector Configured
- Connector Connected
- Connector Disconnected
- Connector Revoked
- Reauthorization Required
- Provider Unavailable
- Rate Limited
- Missing Scope
- Permission Blocked
- Review Required
- Action Pending
- Action Approved
- Action Blocked
- Action Expired
- Private Mode Blocked
- Emergency Lockdown Blocked
- Carnos Restricted
- Provider Boundary
- Token Hidden
- Retention Boundary
- Audit Required

## Excluded Or Deferred Connectors

### Spotify
- Status: next_real_connector
- Note: Spotify-specific implementation is handled by 20S through 20W.

### Amazon Echo or Alexa
- Status: excluded_now
- Note: Excluded from Phase 20 implementation.

### Garmin
- Status: deferred
- Note: Deferred. Manual workout logging through Carnos remains the current stance.

### Apple Health
- Status: deferred
- Note: Deferred beyond Phase 20.

### Gmail, Google Calendar, Notion, GitHub, Slack, Discord, YouTube, LinkedIn
- Status: future_deferred
- Note: Allowed as future candidates but not implemented in 20R.

## Must Not Do

- do not create migrations in 20R
- do not invent connector persistence schema in 20R
- do not implement OAuth routes in 20R
- do not implement token storage in 20R
- do not implement provider calls in 20R
- do not implement connector UI cards in 20R
- do not implement runtime connector actions in 20R
- do not expose connector token values
- do not let Carnos access token values
- do not let Carnos connect providers silently
- do not let Carnos disconnect providers silently
- do not let Carnos approve connector actions
- do not let connector actions bypass review
- do not let connector actions bypass Private Mode
- do not let connector actions bypass Emergency Lockdown
- do not implement excluded or deferred connectors in 20R

## Acceptance

- Connector categories are defined.
- Connector registry model is defined.
- Connector account model is defined.
- Permission model is defined.
- Scope model is defined.
- Auth boundary model is defined.
- Token boundary model is defined.
- Connection status model is defined.
- Action request model is defined.
- Action manifest model is defined.
- Private Mode connector rules are defined.
- Emergency Lockdown connector rules are defined.
- Disconnect rules are defined.
- Retention rules are defined.
- Carnos connector access rules are defined.
- Provider boundary rules are defined.
- Audit events are defined.
- Blocked reasons are defined.
- Badge requirements are defined.
- Excluded and deferred connectors are defined.
- No token exposure rule is explicit.
- No silent external action rule is explicit.
- 20R audit passes.
- Full project check passes.

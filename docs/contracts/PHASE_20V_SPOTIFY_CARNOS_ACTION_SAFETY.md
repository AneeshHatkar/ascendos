# Phase 20V — Spotify Carnos Actions + Action Safety

## Purpose

Define Spotify Carnos action proposal, review, approval, cooldown, provider limitation, scope, Premium, active device, playlist mutation, listening history, audit, blocked reason, badge, and runtime schema gate boundaries before Carnos can propose or perform any Spotify action.

## Schema Requirement

- Needs live database schema: false
- Reason: 20V defines Carnos Spotify action safety contracts only. It does not create migrations, persistence, repositories, RLS policies, runtime tools, Carnos execution adapters, Spotify API clients, provider calls, action request tables, review queue rows, playback actions, playlist actions, dashboard UI, or audit writes.
- Future schema gate: If a later chunk persists Spotify action requests, action manifests, approval records, cooldown records, provider responses, playback action attempts, playlist action attempts, audit rows, Carnos proposal records, dashboard review cards, or connector action history, inspect exact schema before coding.

## Action Classes

### status_explain
- Label: Explain Spotify status
- Action type: read_only_explanation
- Carnos allowed to propose: true
- Requires user approval: false
- Requires review queue: false
- Risk level: low
- Notes:
  - Carnos can explain connection state, missing setup, missing scopes, provider limitations, and blocked reasons.
  - Carnos cannot expose tokens, raw provider identifiers, or hidden private data.

### connection_guidance
- Label: Guide user through Spotify connection setup
- Action type: safe_guidance
- Carnos allowed to propose: true
- Requires user approval: false
- Requires review queue: false
- Risk level: low
- Notes:
  - Carnos can provide setup instructions.
  - Carnos cannot silently start OAuth.
  - Carnos cannot complete account connection.

### scope_request_proposal
- Label: Propose Spotify scope request
- Action type: permission_proposal
- Carnos allowed to propose: true
- Requires user approval: true
- Requires review queue: true
- Risk level: medium_to_high
- Notes:
  - Carnos can explain why a scope is needed.
  - User must approve scope request.
  - High-risk scopes require clear warning.

### playback_read_summary
- Label: Summarize allowed playback state
- Action type: read_summary
- Carnos allowed to propose: true
- Requires user approval: depends_on_privacy_setting
- Requires review queue: false
- Risk level: medium
- Notes:
  - Allowed only if playback read permission and Carnos access matrix allow.
  - Blocked by Private Mode and Emergency Lockdown.

### listening_history_summary
- Label: Summarize listening history
- Action type: sensitive_read_summary
- Carnos allowed to propose: true
- Requires user approval: true
- Requires review queue: true
- Risk level: high
- Notes:
  - Recently played and top items are high sensitivity.
  - Blocked by default from Carnos context.
  - Cannot infer protected traits.

### playback_control
- Label: Control Spotify playback
- Action type: external_state_change
- Carnos allowed to propose: true
- Requires user approval: true
- Requires review queue: true
- Risk level: high
- Notes:
  - Includes play, pause, resume, skip, seek, volume, shuffle, repeat, transfer playback, and queue actions.
  - Requires write scope where provider requires it.
  - May require Premium and active device.
  - Carnos cannot perform silently.

### playlist_mutation
- Label: Modify Spotify playlist
- Action type: external_state_change
- Carnos allowed to propose: true
- Requires user approval: true
- Requires review queue: true
- Risk level: high
- Notes:
  - Includes playlist create, update, add item, remove item, reorder, and public/private visibility changes.
  - Public playlist changes require high visibility warning.
  - Collaborative playlists require collaboration warning.
  - Carnos cannot perform silently.

### disconnect_or_revoke
- Label: Disconnect or revoke Spotify
- Action type: connector_account_change
- Carnos allowed to propose: true
- Requires user approval: true
- Requires review queue: true
- Risk level: high
- Notes:
  - Carnos can explain disconnection.
  - Carnos cannot disconnect Spotify silently.
  - Disconnection must preserve audit boundary.

## Action Safety Levels

### informational
- Examples:
  - explain not connected
  - explain missing scope
  - explain Premium required
  - explain no active device
- Approval: not_required
- Review queue: not_required

### sensitive_read
- Examples:
  - summarize currently playing
  - summarize playlists
  - summarize recently played
  - summarize top items
- Approval: required_when_private_or_high_sensitivity
- Review queue: required_for_high_sensitivity

### external_state_change
- Examples:
  - pause playback
  - resume playback
  - skip track
  - transfer playback
  - add to queue
  - modify playlist
- Approval: always_required
- Review queue: always_required

### connector_account_change
- Examples:
  - request new scope
  - disconnect Spotify
  - revoke connector
  - reauthorize Spotify
- Approval: always_required
- Review queue: always_required

## Proposal Manifest Fields Future

- spotify_action_request_id
- connector_id
- provider_account_boundary
- proposed_by_actor
- proposed_by_carnos_session_id
- action_class
- action_name
- target_kind
- target_boundary_id
- requested_scope_group_ids
- required_provider_scopes
- privacy_level
- sensitivity_level
- risk_level
- requires_user_approval
- requires_review_queue
- requires_cooldown
- requires_premium
- requires_active_device
- provider_limitation_status
- private_mode_status
- emergency_lockdown_status
- redaction_level
- preview_summary
- expected_external_change
- blocked_reasons
- audit_event_id
- expires_at

## Approval Rules

- Carnos can propose but cannot approve Spotify actions.
- User approval is required for every external state change.
- User approval is required for scope expansion.
- User approval is required for listening history summaries.
- User approval is required for playlist mutation.
- User approval is required for disconnect or revoke.
- Approval prompt must show action class, provider, target, scope, risk, privacy, sensitivity, and expected external change.
- Approval prompt must show if Premium may be required.
- Approval prompt must show if active device may be required.
- Approval prompt must show if public playlist visibility could change.
- Approval prompt must not show token values.
- Approval prompt must not expose hidden private metadata.
- Approval must expire.
- Expired approval must require a new proposal.
- Approval does not grant future blanket permission unless a later contract explicitly defines a safe pre-approved class.

## Review Queue Rules

- Spotify external state changes must enter privacy action review queue.
- High-sensitivity Spotify reads must enter privacy action review queue.
- Playlist writes must enter privacy action review queue.
- Scope expansion must enter privacy action review queue.
- Disconnect or revoke must enter privacy action review queue when linked data or audit implications exist.
- Review queue item must link to provider boundary, scope boundary, Carnos proposal, action manifest, and audit event.
- Review queue must show blocked reasons.
- Review queue must show provider limitation warnings.
- Review queue must show Private Mode and Emergency Lockdown conflicts.
- Review queue must not expose tokens.

## Cooldown Rules

- Playback destructive or disruptive actions can require cooldown.
- Playlist public visibility changes require cooldown.
- Bulk playlist mutations require cooldown.
- Repeated skip or volume changes through Carnos require rate guard.
- Scope expansion to high-sensitivity listening history requires cooldown.
- Disconnect or revoke can require cooldown when linked exports or manifests exist.
- Cooldown cannot be bypassed by Carnos.
- Cooldown expiration must be auditable.
- Cooldown status must show user-safe badge.

## Scope And Provider Requirement Rules

- Playback control requires playback write scope when provider requires it.
- Playback read summaries require playback read scope.
- Playlist reads require playlist read scope.
- Playlist mutations require playlist write scope.
- Recently played summaries require listening history scope.
- Top item summaries require listening history scope.
- Missing scope blocks dependent action.
- Revoked scope blocks dependent action.
- Provider unavailable blocks action.
- Provider rate limit blocks or defers action.
- Premium required blocks playback write action until provider eligibility is satisfied.
- No active device blocks device-dependent playback action.
- Restricted device blocks device-dependent action.
- Provider policy limitation blocks action.

## Private Mode Rules

- Private Mode blocks Carnos Spotify action proposals by default.
- Private Mode blocks Spotify external state changes by default.
- Private Mode blocks Spotify high-sensitivity summaries by default.
- Private Mode blocks Spotify data entering Carnos context.
- Private Mode blocks Spotify memory candidates.
- Private Mode blocks Spotify analytics.
- Private Mode can show safe informational explanation only if it does not reveal hidden data.
- Carnos cannot disable Private Mode.
- Carnos cannot ask the user to disable Private Mode just to perform an action.
- Private Mode conflict must be shown as blocked reason.

## Emergency Lockdown Rules

- Emergency Lockdown blocks all Carnos Spotify external actions.
- Emergency Lockdown blocks scope expansion.
- Emergency Lockdown blocks listening history summaries.
- Emergency Lockdown blocks playlist mutations.
- Emergency Lockdown blocks playback control.
- Emergency Lockdown blocks connector account changes unless future emergency-safe review allows.
- Emergency Lockdown allows safe explanation of blocked state.
- Carnos cannot disable Emergency Lockdown.
- Carnos cannot ask the user to disable Emergency Lockdown just to perform an action.
- Emergency Lockdown conflict must be shown as blocked reason.

## Playlist Action Rules

- Carnos cannot create playlists silently.
- Carnos cannot rename playlists silently.
- Carnos cannot add tracks silently.
- Carnos cannot remove tracks silently.
- Carnos cannot reorder tracks silently.
- Carnos cannot change public/private playlist visibility silently.
- Public playlist actions require high-visibility warning.
- Collaborative playlist actions require collaborator impact warning.
- Playlist mutation preview must show intended changes.
- Playlist mutation must not imply memory consent.
- Playlist mutation must not store playlist data as memory without review.

## Playback Action Rules

- Carnos cannot start playback silently.
- Carnos cannot pause playback silently.
- Carnos cannot skip tracks silently.
- Carnos cannot seek silently.
- Carnos cannot change volume silently.
- Carnos cannot transfer playback silently.
- Carnos cannot add to queue silently.
- Playback action preview must show intended external change.
- Playback action must check active device boundary.
- Playback action must check Premium requirement boundary.
- Playback action must handle non-guaranteed ordering.
- Playback action must not download content.
- Playback action must not alter provider content.

## Listening History Action Rules

- Carnos cannot access recently played by default.
- Carnos cannot access top items by default.
- Carnos cannot summarize listening history without approval.
- Carnos cannot store listening history as memory without review.
- Carnos cannot use listening history for protected-trait inference.
- Carnos cannot use listening history for manipulative suggestions.
- Listening history proposals require high-sensitivity warning.
- Listening history export remains explicit-scope-only.
- Listening history analytics require explicit opt-in.
- Listening history actions must be blocked during Private Mode and Emergency Lockdown.

## Carnos Allowed Phrases Boundary

- I can explain why Spotify is not connected.
- I can draft a Spotify action proposal for you to review.
- I can show what permission would be needed before this action.
- I can summarize allowed playback status if your privacy settings permit it.
- I cannot perform this Spotify action without your approval.
- I cannot access this Spotify data while Private Mode is active.
- I cannot access this Spotify data during Emergency Lockdown.
- I cannot see or use Spotify token values.

## Carnos Forbidden Behaviors

- silently starting OAuth
- silently approving scopes
- silently approving playback control
- silently modifying playlists
- silently disconnecting Spotify
- reading listening history by default
- using listening history for protected-trait inference
- exposing token values
- storing Spotify data as memory without review
- bypassing Private Mode
- bypassing Emergency Lockdown
- treating connection as blanket consent
- treating one approval as permanent blanket consent
- using provider data outside allowed scope

## Audit Events Required

- spotify_carnos_action_proposed
- spotify_carnos_action_blocked
- spotify_carnos_action_review_required
- spotify_carnos_action_approved_by_user
- spotify_carnos_action_rejected_by_user
- spotify_carnos_action_expired
- spotify_carnos_action_cooldown_started
- spotify_carnos_action_cooldown_completed
- spotify_carnos_scope_required
- spotify_carnos_scope_missing
- spotify_carnos_premium_required
- spotify_carnos_no_active_device
- spotify_carnos_provider_limited
- spotify_carnos_private_mode_blocked
- spotify_carnos_emergency_lockdown_blocked
- spotify_carnos_playback_action_proposed
- spotify_carnos_playback_action_blocked
- spotify_carnos_playlist_action_proposed
- spotify_carnos_playlist_action_blocked
- spotify_carnos_listening_history_access_blocked
- spotify_carnos_memory_candidate_blocked
- spotify_carnos_token_access_blocked
- spotify_carnos_disconnect_proposed
- spotify_carnos_disconnect_blocked
- spotify_carnos_schema_required_for_runtime

## Blocked Reasons

- spotify_carnos_not_allowed
- spotify_user_approval_required
- spotify_review_queue_required
- spotify_cooldown_required
- spotify_action_expired
- spotify_scope_missing
- spotify_scope_revoked
- spotify_premium_required
- spotify_no_active_device
- spotify_device_restricted
- spotify_provider_unavailable
- spotify_rate_limited
- spotify_provider_policy_blocked
- spotify_private_mode_active
- spotify_emergency_lockdown_active
- spotify_token_boundary
- spotify_listening_history_sensitive
- spotify_playlist_private
- spotify_playlist_public_visibility_warning
- spotify_playlist_collaborative_warning
- spotify_memory_review_required
- spotify_export_scope_required
- spotify_schema_required_for_runtime
- spotify_action_manifest_required

## Badge Requirements

- Carnos Proposal
- User Approval Required
- Review Required
- Cooldown Required
- Action Expired
- Scope Required
- Missing Scope
- Scope Revoked
- Premium Required
- No Active Device
- Provider Limited
- Private Mode Blocked
- Emergency Lockdown Blocked
- Token Hidden
- Listening History Sensitive
- Playlist Private
- Public Playlist Warning
- Collaborative Playlist Warning
- Playback Action
- Playlist Action
- Connector Account Change
- Memory Review Required
- Schema Required For Runtime

## Must Not Do

- do not create migrations in 20V
- do not invent Spotify action persistence schema in 20V
- do not implement Carnos Spotify runtime tools in 20V
- do not implement Spotify API client in 20V
- do not implement playback actions in 20V
- do not implement playlist actions in 20V
- do not implement scope requests in 20V
- do not implement action review queue persistence in 20V
- do not implement approval persistence in 20V
- do not implement cooldown persistence in 20V
- do not implement audit writes in 20V
- do not expose token values
- do not let Carnos approve Spotify actions
- do not let Carnos perform Spotify actions silently
- do not let Carnos use Spotify connection as blanket consent
- do not let Carnos bypass Private Mode
- do not let Carnos bypass Emergency Lockdown
- do not let Carnos infer protected traits from listening history

## Acceptance

- Carnos Spotify action classes are defined.
- Action safety levels are defined.
- Future proposal manifest fields are defined.
- Approval rules are defined.
- Review queue rules are defined.
- Cooldown rules are defined.
- Scope and provider requirement rules are defined.
- Private Mode rules are defined.
- Emergency Lockdown rules are defined.
- Playlist action rules are defined.
- Playback action rules are defined.
- Listening history action rules are defined.
- Allowed Carnos phrase boundaries are defined.
- Forbidden Carnos behaviors are defined.
- Audit events are defined.
- Blocked reasons are defined.
- Badge requirements are defined.
- No schema gate is explicit.
- No token exposure is explicit.
- No silent Carnos action is explicit.
- 20V audit passes.
- Full project check passes.

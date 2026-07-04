# Phase 20U — Spotify Playback / Device / Playlist / Recently Played Boundaries

## Purpose

Define Spotify playback, device, playlist, queue, currently playing, recently played, top items, and provider limitation boundaries before any Spotify API client, sync job, account data storage, playback control, playlist mutation, UI card, or runtime Carnos action exists.

## Schema Requirement

- Needs live database schema: false
- Reason: 20U defines Spotify playback, device, playlist, and listening-history boundaries only. It does not create migrations, persistence, repositories, RLS policies, provider API clients, sync jobs, OAuth routes, playback actions, playlist actions, dashboard cards, or Carnos runtime tools.
- Future schema gate: If a later chunk persists playback snapshots, device snapshots, currently playing records, playlist snapshots, playlist item records, recently played records, queue records, top item records, Spotify action requests, provider error records, audit rows, or dashboard view models, inspect exact schema before coding.

## Official Spotify Reference Boundary

- Spotify playback state can include current playback, progress, and active device context.
- Spotify available devices endpoint exposes Spotify Connect devices and some device models may not be listed.
- Spotify recently played data is OAuth-protected and can reveal listening history.
- Spotify playlist item access can depend on owner or collaborator permission.
- Spotify playback control endpoints can require Spotify Premium.
- Spotify playback control endpoint order of execution may not be guaranteed when multiple player actions are used.
- Spotify platform policy limitations can restrict commercial streaming integrations, downloads, broadcast, sync to visual media, and altered content.

- Implementation note: 20U stores boundary summaries only. Runtime chunks must re-check official provider docs before implementing provider calls.

## Provider Surfaces

### currently_playing
- Default privacy: private
- Default sensitivity: medium
- Required scope group: playback_read
- Allowed future use:
  - show current media status when user explicitly allows
  - show private dashboard card when user explicitly enables
  - support Carnos summary only if Carnos access matrix allows
- Blocked by default:
  - memory_creation
  - broad_analytics
  - public_dashboard
  - export_without_scope_selection
  - Carnos_context_without_permission

### playback_state
- Default privacy: private
- Default sensitivity: medium
- Required scope group: playback_read
- Allowed future use:
  - read playback progress
  - read active device boundary
  - read shuffle repeat playing state boundary
- Blocked by default:
  - automatic memory
  - timeline proof without review
  - analytics aggregation without consent

### available_devices
- Default privacy: private
- Default sensitivity: medium
- Required scope group: playback_read
- Allowed future use:
  - show active device label
  - show device availability warning
  - choose device only with user confirmation
- Blocked by default:
  - device fingerprinting
  - device export without explicit scope
  - Carnos free-text access to device identifiers

### queue
- Default privacy: private
- Default sensitivity: medium
- Required scope group: playback_read
- Allowed future use:
  - show queue preview if enabled
  - support action review context
- Blocked by default:
  - persistent queue history
  - memory creation
  - broad analytics

### playlists
- Default privacy: private
- Default sensitivity: medium
- Required scope group: playlist_read
- Allowed future use:
  - list user playlists when enabled
  - show playlist metadata
  - show playlist item previews
- Blocked by default:
  - public playlist mutation without review
  - private playlist exposure
  - playlist item memory without review

### recently_played
- Default privacy: private
- Default sensitivity: high
- Required scope group: listening_history
- Allowed future use:
  - show private listening history when enabled
  - export only with explicit selected scope
- Blocked by default:
  - Carnos context
  - automatic memory
  - broad dashboard
  - analytics
  - timeline proof
  - default export

### top_items
- Default privacy: private
- Default sensitivity: high
- Required scope group: listening_history
- Allowed future use:
  - show private top artists or tracks when enabled
  - export only with explicit selected scope
- Blocked by default:
  - Carnos context
  - automatic memory
  - broad dashboard
  - analytics
  - default export

## Playback Control Boundaries

### Future Actions
- play
- pause
- resume
- skip_next
- skip_previous
- seek
- set_volume
- toggle_shuffle
- set_repeat
- transfer_playback
- add_to_queue

### Rules
- Playback control is not implemented in 20U.
- Playback control requires explicit user approval in future runtime.
- Playback control requires write scope when provider requires it.
- Playback control may require Spotify Premium.
- Playback control may require an active device.
- Playback control must show provider limitation if no active device exists.
- Playback control must show provider limitation if Premium is required.
- Playback control must not be executed by Carnos silently.
- Playback control must not bypass Private Mode.
- Playback control must not bypass Emergency Lockdown.
- Playback control must create action review record before execution in future runtime.
- Playback control must create audit event without token values.
- Multiple playback actions must not assume guaranteed ordering.
- Playback control must never download Spotify content.
- Playback control must never alter Spotify content.

## Playlist Boundaries

### Read Rules
- Playlist read requires explicit permission boundary.
- Private playlist metadata is private by default.
- Collaborative playlist metadata is private by default.
- Playlist item details can reveal taste, habits, and relationships.
- Playlist owner and collaborator context must be redacted when needed.
- Playlist local file markers must be treated as sensitive metadata.
- Playlist details must not become memory without explicit review.
- Playlist details must not enter broad analytics by default.

### Write Rules
- Playlist creation is not implemented in 20U.
- Playlist update is not implemented in 20U.
- Playlist item add is not implemented in 20U.
- Playlist item remove is not implemented in 20U.
- Public playlist write requires high-visibility warning.
- Private playlist write requires action review.
- Collaborative playlist write requires action review.
- Carnos cannot modify playlists silently.
- Playlist mutation must not imply memory consent.

## Listening History Boundaries

### Data Classes
- recently_played_tracks
- recently_played_timestamps
- recently_played_context
- top_tracks
- top_artists
- listening_frequency_summary
- taste_profile_summary

### Rules
- Listening history is high sensitivity by default.
- Listening history is blocked from Carnos context by default.
- Listening history is blocked from automatic memory by default.
- Listening history is blocked from broad analytics by default.
- Listening history is blocked from timeline proof by default.
- Listening history is excluded from default export.
- Listening history requires explicit scope selection for export.
- Listening history summaries require review before memory creation.
- Listening history must be hidden during Private Mode.
- Listening history must be blocked during Emergency Lockdown.
- Listening history must not be used for manipulative suggestions.
- Listening history must not infer protected traits.

## Device Boundaries

### Future Device Fields
- spotify_device_id_boundary
- device_name_boundary
- device_type_boundary
- is_active_boundary
- is_private_session_boundary
- is_restricted_boundary
- volume_percent_boundary
- supports_volume_boundary
- last_seen_at
- provider_status

### Rules
- Device id is boundary metadata and must not be shown raw by default.
- Device name can expose personal room or hardware context.
- Device type can expose hardware context.
- Active device can reveal current behavior.
- Restricted devices must show provider limitation.
- Missing devices must show no active device state.
- Device transfer requires action review.
- Carnos cannot choose a device silently.
- Device data must not become memory without review.
- 20U does not persist device data.

## Export Boundaries

- Currently playing is excluded from default export.
- Playback state is excluded from default export.
- Device data is excluded from default export.
- Queue data is excluded from default export.
- Private playlists are excluded from default export.
- Recently played is excluded from default export.
- Top items are excluded from default export.
- Explicit scope selector can include Spotify categories.
- Token values are never exportable.
- Provider identifiers should be redacted or boundary-only in exports.
- Listening history export requires high-sensitivity warning.
- Public playlist export must still show provider boundary.

## Analytics Boundaries

- Spotify data does not enter analytics by default.
- Playback state does not enter analytics by default.
- Device state does not enter analytics by default.
- Listening history does not enter analytics by default.
- Playlist summaries do not enter analytics by default.
- Any future Spotify analytics requires explicit opt-in.
- Any future Spotify analytics must respect Private Mode.
- Any future Spotify analytics must respect Emergency Lockdown.
- Any future Spotify analytics must avoid protected-trait inference.
- Any future Spotify analytics must use redacted aggregates when possible.

## Memory Boundaries

- Spotify data does not become memory automatically.
- Currently playing cannot become memory without review.
- Recently played cannot become memory without explicit review.
- Top items cannot become memory without explicit review.
- Playlist details cannot become memory without explicit review.
- Device data cannot become memory without explicit review.
- Carnos cannot create Spotify memory silently.
- Spotify memory candidates must show source, scope, privacy, and sensitivity.
- Spotify memory candidates must respect do-not-remember and Private Mode.
- Spotify token values can never become memory.

## Private Mode Rules

- Private Mode blocks automatic playback reads.
- Private Mode blocks automatic device reads.
- Private Mode blocks automatic playlist reads.
- Private Mode blocks automatic recently played reads.
- Private Mode blocks Spotify data entering Carnos context.
- Private Mode blocks Spotify data entering analytics.
- Private Mode blocks Spotify data becoming memory.
- Private Mode blocks Spotify broad dashboard summaries.
- Private Mode blocks Spotify action execution unless future reviewed exception exists.
- Carnos cannot disable Private Mode for Spotify playback.

## Emergency Lockdown Rules

- Emergency Lockdown blocks playback reads.
- Emergency Lockdown blocks device reads.
- Emergency Lockdown blocks playlist reads.
- Emergency Lockdown blocks recently played reads.
- Emergency Lockdown blocks playback actions.
- Emergency Lockdown blocks playlist actions.
- Emergency Lockdown blocks scope expansion.
- Emergency Lockdown blocks Carnos Spotify suggestions.
- Emergency Lockdown blocks Spotify export generation unless future reviewed exception exists.
- Carnos cannot disable Emergency Lockdown for Spotify playback.

## Carnos Rules

- Carnos can explain Spotify connection status if allowed.
- Carnos can summarize currently playing only if allowed.
- Carnos cannot access recently played by default.
- Carnos cannot access top items by default.
- Carnos cannot access device identifiers raw.
- Carnos cannot modify playback silently.
- Carnos cannot modify playlists silently.
- Carnos cannot transfer playback silently.
- Carnos cannot add to queue silently.
- Carnos cannot use listening history for memory without review.
- Carnos cannot infer protected traits from listening history.
- Carnos cannot bypass provider limitations.
- Carnos cannot bypass Private Mode.
- Carnos cannot bypass Emergency Lockdown.
- Carnos cannot access token values.

## Provider Limitations

- provider_unavailable
- rate_limited
- missing_scope
- scope_revoked
- premium_required
- no_active_device
- device_restricted
- device_not_listed
- playback_order_not_guaranteed
- playlist_forbidden
- playlist_not_owner_or_collaborator
- local_file_limited_metadata
- recently_played_unavailable
- episode_or_podcast_limited_support
- policy_download_blocked
- policy_broadcast_blocked
- policy_commercial_streaming_blocked
- policy_content_alteration_blocked
- policy_visual_sync_blocked

## Audit Events Required

- spotify_playback_read_requested
- spotify_playback_read_blocked
- spotify_currently_playing_boundary_viewed
- spotify_playback_state_boundary_viewed
- spotify_device_read_requested
- spotify_device_read_blocked
- spotify_device_boundary_viewed
- spotify_playlist_read_requested
- spotify_playlist_read_blocked
- spotify_playlist_boundary_viewed
- spotify_recently_played_read_requested
- spotify_recently_played_read_blocked
- spotify_recently_played_boundary_viewed
- spotify_top_items_read_requested
- spotify_top_items_read_blocked
- spotify_playback_action_proposed
- spotify_playback_action_blocked
- spotify_playlist_action_proposed
- spotify_playlist_action_blocked
- spotify_provider_limitation_detected
- spotify_private_mode_media_blocked
- spotify_emergency_lockdown_media_blocked
- spotify_carnos_media_access_blocked
- spotify_export_media_scope_selected
- spotify_memory_candidate_media_blocked

## Blocked Reasons

- spotify_not_connected
- spotify_missing_scope
- spotify_scope_revoked
- spotify_private_mode_active
- spotify_emergency_lockdown_active
- spotify_carnos_access_blocked
- spotify_recently_played_sensitive
- spotify_top_items_sensitive
- spotify_device_sensitive
- spotify_playlist_private
- spotify_playlist_forbidden
- spotify_playlist_not_owner_or_collaborator
- spotify_premium_required
- spotify_no_active_device
- spotify_device_restricted
- spotify_device_not_listed
- spotify_provider_unavailable
- spotify_rate_limited
- spotify_policy_download_blocked
- spotify_policy_broadcast_blocked
- spotify_policy_content_alteration_blocked
- spotify_policy_commercial_streaming_blocked
- spotify_policy_visual_sync_blocked
- spotify_action_review_required
- spotify_schema_required_for_runtime

## Badge Requirements

- Playback Boundary
- Device Boundary
- Playlist Boundary
- Listening History Sensitive
- Currently Playing Private
- Recently Played High Sensitivity
- Top Items High Sensitivity
- Private Playlist
- Collaborative Playlist
- Device Restricted
- No Active Device
- Premium Required
- Missing Scope
- Scope Revoked
- Provider Limited
- Rate Limited
- Private Mode Blocked
- Emergency Lockdown Blocked
- Carnos Restricted
- Action Review Required
- Export Explicit Scope
- Memory Review Required
- Policy Boundary
- Schema Required For Runtime

## Must Not Do

- do not create migrations in 20U
- do not invent Spotify persistence schema in 20U
- do not implement Spotify API client in 20U
- do not implement playback reads in 20U
- do not implement device reads in 20U
- do not implement playlist reads in 20U
- do not implement recently played reads in 20U
- do not implement top item reads in 20U
- do not implement playback actions in 20U
- do not implement playlist actions in 20U
- do not implement sync jobs in 20U
- do not implement Spotify UI cards in 20U
- do not store Spotify playback data in 20U
- do not store Spotify device data in 20U
- do not store Spotify playlist data in 20U
- do not store Spotify listening history in 20U
- do not expose token values
- do not let Carnos control playback silently
- do not let Carnos modify playlists silently
- do not let Spotify media data bypass Private Mode
- do not let Spotify media data bypass Emergency Lockdown

## Acceptance

- Playback surface boundaries are defined.
- Device boundaries are defined.
- Playlist boundaries are defined.
- Listening history boundaries are defined.
- Playback control boundaries are defined.
- Provider limitations are defined.
- Export boundaries are defined.
- Analytics boundaries are defined.
- Memory boundaries are defined.
- Private Mode rules are defined.
- Emergency Lockdown rules are defined.
- Carnos rules are defined.
- Audit events are defined.
- Blocked reasons are defined.
- Badge requirements are defined.
- No schema gate is explicit.
- No token exposure is explicit.
- No silent Carnos playback is explicit.
- 20U audit passes.
- Full project check passes.

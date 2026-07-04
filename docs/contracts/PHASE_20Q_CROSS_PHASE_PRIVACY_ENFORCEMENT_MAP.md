# Phase 20Q — Cross-Phase Privacy Enforcement Map

## Purpose

Define how Phase 20 privacy, memory, export, forget, destructive action, retention, redaction, Carnos, audit, connector, and Spotify rules connect back into earlier ascendOS phases and future privacy surfaces without adding runtime enforcement yet.

## Schema Requirement

- Needs live database schema: false
- Reason: 20Q defines cross-phase enforcement contracts only. It does not create migrations, repositories, adapters, queries, runtime guards, UI wiring, RLS policies, or enforcement code.
- Future schema gate: If a later chunk implements cross-phase privacy guards, dashboard adapters, Carnos context filters, analytics privacy filters, current-info source filters, custom tracker privacy filters, connector authorization, Spotify authorization, or export builders, inspect exact schema before coding.

## Enforcement Principles

- Phase 20 privacy rules are not isolated to the /privacy route.
- Private Mode must block memory, analytics, connector, Spotify, and broad dashboard exposure where defined.
- Emergency Lockdown must override normal cross-phase behavior.
- Sensitive locks must override normal dashboard, timeline, analytics, Carnos, export, connector, and Spotify behavior.
- Forgotten memory cannot re-enter Carnos context through Phase 17 memory RAG, audit payloads, analytics snapshots, documents, or timeline.
- Hidden data cannot appear on broad dashboards or broad timeline surfaces.
- Archived data cannot be used as active context unless a future narrow history mode allows it.
- Export must use the data scope selector, preview, manifest, redaction, retention, and audit rules.
- Destructive actions must use review queue, two-step confirmation, cooldown, manifest, audit, and hard-removal-deferred rules.
- Connector and Spotify data must preserve token boundaries across all phases.
- Carnos access matrix must apply before Carnos reads, summarizes, suggests, creates memory candidates, uses context packs, uses analytics, or proposes external actions.
- Audit events remain append-only and protected across all connected phases.

## Phase Links

### 13.5 — settings_privacy_foundation
- Privacy settings must map into Phase 20 privacy levels.
- Private Mode settings must map into Phase 20 Private Mode states.
- Sensitive settings must map into Phase 20 sensitive lock levels.
- Settings changes that expand access require Phase 20 review rules.
- Settings changes that affect Carnos access require Phase 20 Carnos access matrix.
- Settings changes that affect exports require Phase 20 export preview and audit rules.

### 15 — memory_private_mode_do_not_remember
- Memory candidates must obey Phase 20 memory inbox rules.
- Saved memories must obey Phase 20 saved memory rules.
- Do-not-remember must block Phase 20 memory candidate approval.
- Private Mode must block automatic memory candidates.
- Forgotten memory must block Carnos context usage.
- Memory privacy changes must use Phase 20 review queue and audit taxonomy.
- Memory retention must use Phase 20 retention rules.

### 16 — current_info_source_review
- Current-info sources must preserve source/evidence privacy labels.
- Current-info source retention must obey Phase 20 retention boundaries.
- Source review must respect Private Mode and sensitive locks.
- Source evidence cannot reintroduce forgotten memory.
- Current-info export must use Phase 20 data scope selector and export manifest rules.
- Current-info audit events must use Phase 20 audit taxonomy and badges.

### 17 — memory_rag_privacy
- Memory RAG context packs must apply Phase 20 Carnos access matrix.
- Forgotten memory must be excluded from retrieval context.
- Hidden-from-Carnos memory must be excluded from retrieval context.
- Fully locked domains must be excluded from retrieval context unless a future reviewed access mode allows it.
- Private Mode must block automatic context expansion.
- Emergency Lockdown must block sensitive context packs.
- RAG summaries must apply Phase 20 redaction levels and badges.

### 18 — analytics_experiments
- Analytics inputs must obey domain privacy permissions.
- Sensitive analytics requires Phase 20 review where configured.
- Private Mode must block analytics use of private/sensitive data unless explicitly allowed.
- Emergency Lockdown must block sensitive analytics by default.
- Forgotten memory must not appear through analytics snapshots.
- Analytics export must use Phase 20 data scope selector and export manifest.
- Analytics badges must use Phase 20 taxonomy.

### 19 — custom_trackers
- Custom tracker privacy levels must map into Phase 20 privacy levels.
- Custom tracker Carnos permissions must obey Phase 20 Carnos access matrix.
- Sensitive custom trackers must obey Phase 20 sensitive locks.
- Tracker dashboard placement must obey hidden, locked, and Private Mode states.
- Tracker entries must not leak to analytics when blocked.
- Tracker export must use Phase 20 scope selector and manifest.
- Tracker retention must use Phase 20 retention boundaries.
- Tracker evidence attachments must preserve source/evidence privacy rules.

### dashboards — dashboard_surfaces
- Broad dashboard cards must hide hidden data.
- Broad dashboard cards must not expose fully locked domains.
- Dashboard badges must use Phase 20 badge taxonomy.
- Dashboard Carnos summaries must use Phase 20 Carnos access matrix.
- Dashboard analytics cards must obey Phase 20 analytics privacy rules.
- Dashboard connector cards must show connector privacy badges.
- Dashboard Spotify cards must show Spotify privacy badges.

### carnos — carnos_context_and_actions
- Carnos reads must pass the Phase 20 access matrix.
- Carnos summaries must pass redaction and lock checks.
- Carnos memory candidates must route through Phase 20 memory inbox rules.
- Carnos cannot self-approve memory or privacy actions.
- Carnos cannot execute destructive actions.
- Carnos cannot access connector tokens.
- Carnos cannot access Spotify tokens.
- Carnos external action proposals must route through Phase 20 review queue.

### documents_evidence — documents_sources_evidence
- Document references must preserve privacy and sensitivity labels.
- Evidence attachments must preserve source privacy.
- Document payloads can become metadata-only or redacted.
- Documents cannot reintroduce forgotten memory into Carnos context.
- Document export must use Phase 20 scope selector and manifest.
- Document audit events must use append-only audit boundary.
- Document retention must obey Phase 20 retention rules.

### export_forget_destructive — data_control_actions
- Export must use Phase 20 data scope selector.
- Export must generate preview before execution in future runtime.
- Export must generate manifest before execution in future runtime.
- Forget must generate manifest and block Carnos use.
- Destructive actions must use two-step confirmation and cooldown where required.
- Hard removal remains deferred unless a future protected execution boundary exists.
- All data control actions must be audited.

### connectors_future — external_api_connectors
- Connector accounts must use Phase 20 connector permission model.
- Connector scopes must use Phase 20 scope risk and review rules.
- Connector tokens must remain server-only and hidden from Carnos, audit payloads, exports, and UI.
- Connector action proposals must use Phase 20 review queue.
- Connector action manifests must use Phase 20 manifest and audit rules.
- Connector retention must use Phase 20 retention rules.
- Connector cards must use Phase 20 connector badges.

### spotify — spotify_connector
- Spotify account connection must preserve OAuth PKCE and token boundary rules.
- Spotify scopes must use Phase 20 permission and risk rules.
- Spotify playback, device, playlist, and recently played data must use Phase 20 privacy rules.
- Spotify recently played data is sensitive by default.
- Spotify actions must use Phase 20 review queue and confirmation rules.
- Spotify action manifests must use Phase 20 manifest and audit rules.
- Spotify retention must use Phase 20 retention rules.
- Spotify cards must use Phase 20 Spotify badges.

## Cross-Surface Enforcement Matrix

### memory_inbox
- privacy_levels
- sensitivity_levels
- private_mode
- emergency_lockdown
- review_queue
- audit_taxonomy
- retention

### saved_memories
- carnos_access_matrix
- forget_hide_archive
- sensitive_locks
- redaction
- retention
- audit_viewer

### dashboards
- hidden_data
- sensitive_locks
- private_mode
- emergency_lockdown
- badges
- carnos_access_matrix

### timeline
- hidden_data
- locked_data
- private_mode
- emergency_lockdown
- redaction
- badges

### analytics
- domain_permissions
- sensitive_locks
- private_mode
- emergency_lockdown
- forgotten_memory_block
- redaction
- badges

### carnos_context
- carnos_access_matrix
- forgotten_memory_block
- hidden_from_carnos
- fully_locked_domain
- private_mode
- emergency_lockdown
- redaction

### export_preview
- data_scope_selector
- redaction
- manifest
- retention
- token_boundaries
- badges

### forget_destructive_manifest
- data_scope_selector
- review_queue
- two_step_confirmation
- cooldown
- hard_removal_deferred
- audit
- badges

### audit_viewer
- append_only_boundary
- redaction
- linked_manifests
- linked_reviews
- token_boundaries
- badges

### connectors
- connector_permissions
- connector_scopes
- token_boundaries
- review_queue
- audit
- retention
- badges

### spotify
- spotify_permissions
- spotify_scopes
- token_boundaries
- recently_played_sensitive
- review_queue
- audit
- retention
- badges

## Enforcement Order

- ownership_boundary
- emergency_lockdown
- private_mode
- sensitive_lock
- domain_privacy_permission
- do_not_remember_or_forgotten_state
- hidden_or_archived_state
- carnos_access_matrix
- redaction_level
- data_scope_selector
- review_queue
- two_step_confirmation
- cooldown_boundary
- manifest_requirement
- retention_policy
- audit_append_only_boundary
- connector_or_spotify_token_boundary

## Blocked Reasons

- cross_phase_rule_missing
- phase_link_missing
- ownership_boundary_missing
- emergency_lockdown_blocks_surface
- private_mode_blocks_surface
- sensitive_lock_blocks_surface
- domain_permission_blocks_surface
- forgotten_memory_blocks_context
- hidden_data_blocks_dashboard
- archived_data_blocks_active_use
- carnos_access_matrix_blocks_use
- redaction_required
- data_scope_required
- review_required
- two_step_confirmation_required
- cooldown_required
- manifest_required
- retention_rule_required
- audit_boundary_required
- connector_token_boundary
- spotify_token_boundary
- spotify_recently_played_sensitive

## Audit Events Required

- cross_phase_privacy_rule_checked
- cross_phase_privacy_rule_allowed
- cross_phase_privacy_rule_blocked
- cross_phase_dashboard_access_blocked
- cross_phase_timeline_access_blocked
- cross_phase_analytics_access_blocked
- cross_phase_carnos_context_blocked
- cross_phase_export_scope_blocked
- cross_phase_forget_manifest_required
- cross_phase_destructive_manifest_required
- cross_phase_connector_boundary_enforced
- cross_phase_spotify_boundary_enforced
- cross_phase_redaction_applied
- cross_phase_badge_applied
- cross_phase_retention_rule_required
- cross_phase_audit_boundary_enforced

## Badge Requirements

- Cross Phase Checked
- Cross Phase Blocked
- Dashboard Blocked
- Timeline Blocked
- Analytics Blocked
- Carnos Context Blocked
- Export Scope Blocked
- Manifest Required
- Review Required
- Two Step Required
- Cooldown Required
- Redaction Required
- Retention Required
- Audit Boundary
- Connector Boundary
- Spotify Boundary
- Token Hidden
- Recently Played Sensitive

## Must Not Do

- do not create migrations in 20Q
- do not invent cross-phase persistence schema in 20Q
- do not implement runtime privacy guards in 20Q
- do not implement dashboard adapters in 20Q
- do not implement Carnos context filtering in 20Q
- do not implement analytics filtering in 20Q
- do not implement connector authorization in 20Q
- do not implement Spotify authorization in 20Q
- do not let any phase bypass Private Mode
- do not let any phase bypass Emergency Lockdown
- do not let any phase reintroduce forgotten memory
- do not let any phase expose connector tokens
- do not let any phase expose Spotify tokens
- do not let any phase bypass append-only audit

## Acceptance

- Enforcement principles are defined.
- Phase 13.5 links are defined.
- Phase 15 links are defined.
- Phase 16 links are defined.
- Phase 17 links are defined.
- Phase 18 links are defined.
- Phase 19 links are defined.
- Dashboard links are defined.
- Carnos links are defined.
- Document/evidence links are defined.
- Export/forget/destructive links are defined.
- Connector links are defined.
- Spotify links are defined.
- Cross-surface enforcement matrix is defined.
- Enforcement order is defined.
- Blocked reasons are defined.
- Audit events are defined.
- Badge requirements are defined.
- 20Q audit passes.
- Full project check passes.

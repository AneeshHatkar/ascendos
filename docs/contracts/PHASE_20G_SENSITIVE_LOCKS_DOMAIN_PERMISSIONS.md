# Phase 20G — Sensitive Locks + Domain Privacy Permissions

## Purpose

Define sensitive lock levels and domain privacy permissions across dashboards, timeline, analytics, export, Carnos, connectors, Spotify, redaction, retention, audit, and badges.

## Schema Requirement

- Needs live database schema: false
- Reason: 20G defines domain permission contracts and sensitive lock behavior only. It does not create settings tables, sensitive lock rows, migrations, RLS policies, repositories, or live persistence.
- Future schema gate: If a later chunk persists sensitive_locks, domain privacy settings, Carnos permissions, connector permissions, audit rows, or per-domain overrides, inspect exact schema before coding.

## Sensitive Lock Levels

### unlocked
- Meaning: Normal permission rules apply.
- Dashboard behavior: allowed when domain permission allows
- Carnos behavior: allowed when domain permission allows
- Export behavior: allowed when domain permission allows

### review_required
- Meaning: Data requires review before broad use or exposure.
- Dashboard behavior: show review-required state or safe metadata
- Carnos behavior: Carnos cannot use until approved
- Export behavior: export preview must flag review requirement

### hidden_from_dashboards
- Meaning: Data is hidden from broad dashboard and timeline surfaces.
- Dashboard behavior: hidden from broad dashboard cards
- Carnos behavior: depends on separate Carnos permission
- Export behavior: export preview must mark hidden state

### hidden_from_carnos
- Meaning: Data is blocked from Carnos while still possibly visible to the user.
- Dashboard behavior: may show to user with badge if allowed
- Carnos behavior: Carnos cannot read, summarize, remember, or use
- Export behavior: export requires explicit review if sensitive

### fully_locked
- Meaning: Data is blocked from broad UI, Carnos, analytics, export, connectors, and Spotify by default.
- Dashboard behavior: show locked metadata only where safe
- Carnos behavior: Carnos cannot access
- Export behavior: blocked by default and requires explicit review

## Domain Permission Fields

- domain_id
- domain_label
- default_privacy_level
- default_sensitivity_level
- default_lock_level
- dashboard_allowed
- timeline_allowed
- analytics_allowed
- export_allowed
- carnos_read_allowed
- carnos_summarize_allowed
- carnos_memory_candidate_allowed
- carnos_context_allowed
- connector_allowed
- spotify_allowed
- redaction_default
- retention_default
- review_required
- audit_required

## Domain Registry

### career
- Label: Career
- Default privacy level: internal
- Default sensitivity level: personal
- Default lock level: unlocked
- Dashboard allowed: true
- Timeline allowed: true
- Analytics allowed: true
- Export allowed: true
- Carnos read allowed: true
- Connector allowed: true
- Spotify allowed: false

### learning
- Label: Learning
- Default privacy level: internal
- Default sensitivity level: normal
- Default lock level: unlocked
- Dashboard allowed: true
- Timeline allowed: true
- Analytics allowed: true
- Export allowed: true
- Carnos read allowed: true
- Connector allowed: true
- Spotify allowed: false

### research
- Label: Research
- Default privacy level: internal
- Default sensitivity level: personal
- Default lock level: unlocked
- Dashboard allowed: true
- Timeline allowed: true
- Analytics allowed: true
- Export allowed: true
- Carnos read allowed: true
- Connector allowed: true
- Spotify allowed: false

### health
- Label: Health
- Default privacy level: sensitive
- Default sensitivity level: sensitive
- Default lock level: review_required
- Dashboard allowed: false
- Timeline allowed: false
- Analytics allowed: false
- Export allowed: false
- Carnos read allowed: false
- Connector allowed: false
- Spotify allowed: false

### body
- Label: Body
- Default privacy level: sensitive
- Default sensitivity level: sensitive
- Default lock level: review_required
- Dashboard allowed: false
- Timeline allowed: false
- Analytics allowed: false
- Export allowed: false
- Carnos read allowed: false
- Connector allowed: false
- Spotify allowed: false

### nutrition
- Label: Nutrition
- Default privacy level: sensitive
- Default sensitivity level: sensitive
- Default lock level: review_required
- Dashboard allowed: false
- Timeline allowed: false
- Analytics allowed: false
- Export allowed: false
- Carnos read allowed: false
- Connector allowed: false
- Spotify allowed: false

### sleep_energy
- Label: Sleep Energy
- Default privacy level: sensitive
- Default sensitivity level: sensitive
- Default lock level: review_required
- Dashboard allowed: false
- Timeline allowed: false
- Analytics allowed: false
- Export allowed: false
- Carnos read allowed: false
- Connector allowed: false
- Spotify allowed: false

### mental_health
- Label: Mental Health
- Default privacy level: locked
- Default sensitivity level: highly_sensitive
- Default lock level: fully_locked
- Dashboard allowed: false
- Timeline allowed: false
- Analytics allowed: false
- Export allowed: false
- Carnos read allowed: false
- Connector allowed: false
- Spotify allowed: false

### finance
- Label: Finance
- Default privacy level: locked
- Default sensitivity level: highly_sensitive
- Default lock level: fully_locked
- Dashboard allowed: false
- Timeline allowed: false
- Analytics allowed: false
- Export allowed: false
- Carnos read allowed: false
- Connector allowed: false
- Spotify allowed: false

### life_admin
- Label: Life Admin
- Default privacy level: sensitive
- Default sensitivity level: sensitive
- Default lock level: review_required
- Dashboard allowed: false
- Timeline allowed: false
- Analytics allowed: false
- Export allowed: false
- Carnos read allowed: false
- Connector allowed: false
- Spotify allowed: false

### documents
- Label: Documents
- Default privacy level: locked
- Default sensitivity level: highly_sensitive
- Default lock level: fully_locked
- Dashboard allowed: false
- Timeline allowed: false
- Analytics allowed: false
- Export allowed: false
- Carnos read allowed: false
- Connector allowed: false
- Spotify allowed: false

### memory
- Label: Memory
- Default privacy level: private
- Default sensitivity level: sensitive
- Default lock level: review_required
- Dashboard allowed: false
- Timeline allowed: false
- Analytics allowed: false
- Export allowed: false
- Carnos read allowed: false
- Connector allowed: false
- Spotify allowed: false

### private_reflections
- Label: Private Reflections
- Default privacy level: locked
- Default sensitivity level: highly_sensitive
- Default lock level: fully_locked
- Dashboard allowed: false
- Timeline allowed: false
- Analytics allowed: false
- Export allowed: false
- Carnos read allowed: false
- Connector allowed: false
- Spotify allowed: false

### custom_trackers
- Label: Custom Trackers
- Default privacy level: private
- Default sensitivity level: sensitive
- Default lock level: review_required
- Dashboard allowed: false
- Timeline allowed: false
- Analytics allowed: false
- Export allowed: false
- Carnos read allowed: false
- Connector allowed: false
- Spotify allowed: false

### analytics
- Label: Analytics
- Default privacy level: private
- Default sensitivity level: sensitive
- Default lock level: review_required
- Dashboard allowed: false
- Timeline allowed: false
- Analytics allowed: false
- Export allowed: false
- Carnos read allowed: false
- Connector allowed: false
- Spotify allowed: false

### timeline
- Label: Timeline
- Default privacy level: internal
- Default sensitivity level: personal
- Default lock level: review_required
- Dashboard allowed: true
- Timeline allowed: true
- Analytics allowed: false
- Export allowed: true
- Carnos read allowed: false
- Connector allowed: false
- Spotify allowed: false

### external_connectors
- Label: External Connectors
- Default privacy level: locked
- Default sensitivity level: highly_sensitive
- Default lock level: fully_locked
- Dashboard allowed: false
- Timeline allowed: false
- Analytics allowed: false
- Export allowed: false
- Carnos read allowed: false
- Connector allowed: false
- Spotify allowed: false

### spotify
- Label: Spotify
- Default privacy level: sensitive
- Default sensitivity level: sensitive
- Default lock level: review_required
- Dashboard allowed: false
- Timeline allowed: false
- Analytics allowed: false
- Export allowed: false
- Carnos read allowed: false
- Connector allowed: false
- Spotify allowed: true

## Permission Rules

- Fully locked domains block Carnos read, summarize, memory candidate, context, analytics, export, connector, and Spotify use by default.
- Hidden-from-Carnos domains block Carnos read, summarize, memory candidate, and context use.
- Hidden-from-dashboards domains block broad dashboard and timeline exposure.
- Review-required domains must show review-required state before broad use.
- Sensitive domains default to redaction unless the user explicitly allows more detail.
- Domain permissions cannot bypass Private Mode.
- Domain permissions cannot bypass Emergency Lockdown.
- Connector permissions cannot bypass sensitive lock levels.
- Spotify permissions cannot bypass sensitive lock levels.
- Analytics cannot use sensitive or locked domains unless explicitly allowed.
- Export cannot include sensitive or locked domains without explicit preview and review.
- Carnos cannot change domain privacy permissions silently.

## Lock Transition Rules

- unlocked to review_required | review required: false | audit required: true
- review_required to hidden_from_dashboards | review required: false | audit required: true
- review_required to hidden_from_carnos | review required: false | audit required: true
- hidden_from_carnos to fully_locked | review required: false | audit required: true
- fully_locked to review_required | review required: true | audit required: true
- fully_locked to unlocked | review required: true | audit required: true

## Redaction Defaults

- normal_domains: summary_only
- private_domains: metadata_only
- sensitive_domains: redacted
- locked_domains: hidden
- spotify_recently_played: metadata_only
- connector_tokens: hidden

## Retention Defaults

- normal_domains: keep_until_user_changes
- private_domains: review_after_n_days
- sensitive_domains: review_after_n_days
- locked_domains: keep_protected_until_user_review
- connector_action_requests: expire_action_request_after_n_days
- spotify_action_requests: expire_spotify_action_after_n_days

## Blocked Reasons

- sensitive_lock_active
- domain_review_required
- hidden_from_dashboards
- hidden_from_carnos
- fully_locked_domain
- private_mode_active
- emergency_lockdown_active
- analytics_permission_blocked
- export_permission_blocked
- carnos_permission_blocked
- connector_permission_blocked
- spotify_permission_blocked
- redaction_required
- audit_required
- user_review_required

## Audit Events Required

- sensitive_lock_enabled
- sensitive_lock_disabled
- domain_privacy_permission_changed
- domain_dashboard_permission_changed
- domain_timeline_permission_changed
- domain_analytics_permission_changed
- domain_export_permission_changed
- domain_carnos_permission_changed
- domain_connector_permission_changed
- domain_spotify_permission_changed
- domain_redaction_changed
- domain_retention_changed
- domain_review_required
- sensitive_domain_blocked

## Badge Requirements

- Sensitive
- Locked
- Review Required
- Hidden From Dashboards
- Hidden From Carnos
- Carnos Disabled
- Analytics Disabled
- Export Restricted
- Connector Restricted
- Spotify Restricted
- Redacted
- Audit Required
- Private Mode Active
- Emergency Lockdown Active

## Must Not Do

- do not create migrations in 20G
- do not invent sensitive_locks schema in 20G
- do not implement live domain privacy persistence in 20G
- do not implement RLS policies in 20G
- do not implement repository writes in 20G
- do not let domain permissions bypass Private Mode
- do not let domain permissions bypass Emergency Lockdown
- do not let Carnos change domain permissions silently
- do not allow Spotify permissions to bypass sensitive locks
- do not expose connector tokens through any domain permission

## Acceptance

- Sensitive lock levels are defined.
- Domain permission fields are defined.
- Domain registry is defined.
- Permission rules are defined.
- Lock transition rules are defined.
- Redaction defaults are defined.
- Retention defaults are defined.
- Blocked reasons are defined.
- Audit events are defined.
- Badge requirements are defined.
- Connector and Spotify restrictions are included.
- 20G audit passes.
- Full project check passes.

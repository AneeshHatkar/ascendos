# Phase 20B — Core Privacy Domain Contracts

## Purpose

Define the shared privacy vocabulary used by memory controls, private mode, sensitive locks, export, destructive action boundaries, Carnos permissions, external connectors, and Spotify.

## Schema Requirement

- Needs live database schema: false
- Reason: 20B defines contract enums, state models, validation rules, and compatibility boundaries. It does not create or modify tables, migrations, RLS, token storage, export rows, or connector rows.
- Future schema gate: When a later chunk creates or modifies tables, migrations, RLS policies, or token storage boundaries, schema must be inspected or provided before coding.

## Privacy Levels

### public
- Label: Public
- Meaning: Safe to show in normal app surfaces when the user chooses to expose it.
- Dashboard allowed by default: true
- Carnos read default: true
- Export default: true
- Audit required: true

### internal
- Label: Internal
- Meaning: Normal personal app data that can appear inside ascendOS but should not be externally exposed without user action.
- Dashboard allowed by default: true
- Carnos read default: true
- Export default: true
- Audit required: true

### private
- Label: Private
- Meaning: Personal data that needs explicit privacy handling and should be restricted during Private Mode.
- Dashboard allowed by default: false
- Carnos read default: false
- Export default: false
- Audit required: true

### sensitive
- Label: Sensitive
- Meaning: Data that can reveal health, finance, personal reflections, private goals, documents, connector activity, or listening behavior.
- Dashboard allowed by default: false
- Carnos read default: false
- Export default: false
- Audit required: true

### locked
- Label: Locked
- Meaning: Data blocked from broad UI, Carnos context, analytics, export, and connector use unless the user explicitly unlocks or approves a narrow action.
- Dashboard allowed by default: false
- Carnos read default: false
- Export default: false
- Audit required: true

## Sensitivity Levels

### normal
- Meaning: Default non-sensitive personal data.
- Requires review: false

### personal
- Meaning: Personal but not highly sensitive data.
- Requires review: false

### sensitive
- Meaning: Health, finance, identity-adjacent, private reflection, document, connector, Spotify history, or high-trust data.
- Requires review: true

### highly_sensitive
- Meaning: Data that should normally be hidden from dashboards, analytics, broad Carnos context, exports, and connector actions.
- Requires review: true

## Lock States

### unlocked
- Dashboard behavior: normal allowed surfaces can show the item
- Carnos behavior: Carnos may use the item if permission allows
- Export behavior: export allowed if privacy level allows

### review_required
- Dashboard behavior: show review-required state before broad exposure
- Carnos behavior: Carnos may not use without review
- Export behavior: export preview must flag review requirement

### hidden_from_dashboards
- Dashboard behavior: hide from broad dashboard cards and timeline surfaces
- Carnos behavior: Carnos may use only if separate permission allows
- Export behavior: export preview must show hidden status

### hidden_from_carnos
- Dashboard behavior: user-facing UI may show with badge
- Carnos behavior: Carnos cannot read, summarize, remember, or use in context
- Export behavior: export requires explicit user approval if sensitive

### fully_locked
- Dashboard behavior: hide from broad surfaces and show only locked metadata where safe
- Carnos behavior: Carnos cannot access
- Export behavior: export blocked by default and requires explicit review

## Redaction Levels

### full_value
- Display: show complete value only where allowed
- Carnos allowed: true

### summary_only
- Display: show safe summary without full details
- Carnos allowed: true

### metadata_only
- Display: show non-content metadata only
- Carnos allowed: false

### redacted
- Display: show redacted placeholder
- Carnos allowed: false

### hidden
- Display: do not show in normal surfaces
- Carnos allowed: false

## Action Statuses

- draft
- needs_review
- approved
- rejected
- expired
- completed
- failed
- blocked

## Actor Model

### user
- Permissions: request, review, approve, reject, configure
- Restrictions: high-risk actions may require confirmation

### carnos
- Permissions: suggest, summarize when allowed, create proposal when allowed
- Restrictions: no self-approval, no raw token access, no silent memory save, no silent export, no destructive action, no silent Spotify action

### system
- Permissions: enforce state, record audit boundary, expire actions
- Restrictions: no silent user-consent substitution

## Privacy Surfaces

- /privacy dashboard
- Memory Inbox
- Saved Memories
- Private Mode
- Timed Private Mode
- Emergency Lockdown
- Sensitive Locks
- Domain Privacy
- Carnos Access
- Export Preview
- Destructive Action Preview
- Audit Viewer
- External API Connectors
- Spotify Connector
- Media Permissions
- Connector Audit

## Domain Privacy Primitives

- domain_id
- privacy_level
- sensitivity_level
- lock_state
- redaction_level
- carnos_read_allowed
- carnos_summarize_allowed
- carnos_memory_allowed
- dashboard_allowed
- timeline_allowed
- analytics_allowed
- export_allowed
- connector_allowed
- spotify_allowed
- audit_required
- review_required

## Transition Rules

- public to private | allowed: true | review required: false | audit required: true
- private to public | allowed: true | review required: true | audit required: true
- sensitive to internal | allowed: true | review required: true | audit required: true
- locked to internal | allowed: true | review required: true | audit required: true
- fully_locked to unlocked | allowed: true | review required: true | audit required: true

## Validation Rules

- Every privacy-controlled item must have privacy_level.
- Every privacy-controlled item must have sensitivity_level.
- Every privacy-controlled item must have lock_state.
- Every privacy-controlled item must have redaction_level.
- Every high-risk action must have action_status.
- Every Carnos permission decision must identify the actor and domain.
- Every connector or Spotify action must pass private mode and lock checks.
- Every sensitive export preview must include redaction and warning metadata.
- Every destructive action boundary must require review and audit.
- Every privacy state transition must record whether review and audit are required.

## Audit Requirement Map

- privacy level changed
- sensitivity level changed
- lock state changed
- redaction level changed
- Carnos access changed
- memory candidate reviewed
- export requested
- destructive action requested
- connector permission changed
- Spotify scope changed
- Spotify action proposed
- Private Mode enabled
- Emergency Lockdown enabled

## Connector And Spotify Compatibility

- connector token boundary must not expose raw tokens
- connector action request must use action_status
- connector action must respect lock_state
- connector action must respect Private Mode
- Spotify account connection must require user OAuth
- Spotify token access by Carnos is blocked
- Spotify action proposal must use action_status
- Spotify recently played data defaults to sensitive
- Spotify playback control requires permission review

## Must Not Do

- do not create migrations in 20B
- do not invent live database schema in 20B
- do not implement runtime Spotify OAuth in 20B
- do not implement connector token storage in 20B
- do not implement destructive action execution in 20B
- do not allow Carnos to bypass privacy states

## Acceptance

- Core privacy levels are defined.
- Sensitivity levels are defined.
- Lock states are defined.
- Redaction levels are defined.
- Action statuses are defined.
- Actor model is defined.
- Privacy surfaces are defined.
- Domain primitives are defined.
- Validation rules are defined.
- Connector and Spotify compatibility markers are defined.
- 20B audit passes.
- Full project check passes.

# Phase 20F — Emergency Lockdown Contracts

## Purpose

Define Emergency Lockdown as the strongest privacy protection state across memory, Carnos, dashboards, timeline, analytics, export, destructive actions, external connectors, Spotify, sensitive domains, audit, and UI badges.

## Schema Requirement

- Needs live database schema: false
- Reason: 20F defines Emergency Lockdown behavior and safety rules only. It does not create privacy_settings persistence, lockdown session storage, migrations, RLS policies, audit rows, repositories, or runtime toggles.
- Future schema gate: If a later chunk persists Emergency Lockdown, unlock history, privacy_settings, audit rows, sensitive locks, or connector block records, inspect exact schema before coding.

## Lockdown States

### inactive
- Meaning: Emergency Lockdown is not active.
- Behavior: normal privacy, lock, and Private Mode rules apply

### active
- Meaning: Emergency Lockdown is active.
- Behavior: strongest privacy restrictions apply across memory, Carnos, dashboards, analytics, exports, destructive actions, connectors, and Spotify

### disable_requested
- Meaning: User has requested to disable lockdown but confirmation is not complete.
- Behavior: lockdown remains active until confirmation completes

### disable_confirmed
- Meaning: User confirmed disable through the required review path.
- Behavior: lockdown can transition out after audit records the action

### blocked
- Meaning: A lockdown-related action was blocked.
- Behavior: surface must show blocked reason and audit boundary

## Activation Effects

- turn on Private Mode behavior
- block automatic memory candidate creation
- block Carnos memory writes
- block Carnos sensitive summaries
- block broad sensitive dashboard exposure
- block broad sensitive timeline exposure
- block analytics use of sensitive data
- block automatic export preparation
- block destructive action automation
- restrict sensitive export previews by default
- restrict external connector reads and actions
- restrict Spotify reads and actions
- require review for sensitive memory actions
- require review for privacy permission changes
- require review for connector permission changes
- require review for Spotify action approvals
- show Emergency Lockdown badge

## Affected Surfaces

### Memory Inbox
- Lockdown behavior: block new automatic Carnos candidates and require review for sensitive candidates

### Saved Memories
- Lockdown behavior: restrict sensitive memory visibility and Carnos access

### Carnos Chat
- Lockdown behavior: disable sensitive context injection and prevent memory writes

### Dashboard Cards
- Lockdown behavior: hide or redact sensitive cards by default

### Timeline
- Lockdown behavior: hide or redact sensitive events by default

### Analytics
- Lockdown behavior: exclude sensitive data from active analytics by default

### Export
- Lockdown behavior: require explicit review and warnings for sensitive export scopes

### Destructive Actions
- Lockdown behavior: block automation and require strongest confirmation paths

### Sensitive Locks
- Lockdown behavior: treat sensitive domains as review-required or fully locked depending on domain

### External API Connectors
- Lockdown behavior: block high-risk connector actions and require review for permitted low-risk reads

### Spotify
- Lockdown behavior: block Spotify actions and prevent listening-history memory creation by default

## Sensitive Domain Defaults

### health
- Default lockdown state: fully_locked
- Carnos allowed: false
- Dashboard allowed: false
- Analytics allowed: false
- Export default: false

### body
- Default lockdown state: review_required
- Carnos allowed: false
- Dashboard allowed: false
- Analytics allowed: false
- Export default: false

### mental_health
- Default lockdown state: fully_locked
- Carnos allowed: false
- Dashboard allowed: false
- Analytics allowed: false
- Export default: false

### finance
- Default lockdown state: fully_locked
- Carnos allowed: false
- Dashboard allowed: false
- Analytics allowed: false
- Export default: false

### life_admin
- Default lockdown state: review_required
- Carnos allowed: false
- Dashboard allowed: false
- Analytics allowed: false
- Export default: false

### documents
- Default lockdown state: fully_locked
- Carnos allowed: false
- Dashboard allowed: false
- Analytics allowed: false
- Export default: false

### memory
- Default lockdown state: review_required
- Carnos allowed: false
- Dashboard allowed: false
- Analytics allowed: false
- Export default: false

### private_reflections
- Default lockdown state: fully_locked
- Carnos allowed: false
- Dashboard allowed: false
- Analytics allowed: false
- Export default: false

### custom_trackers
- Default lockdown state: review_required
- Carnos allowed: false
- Dashboard allowed: false
- Analytics allowed: false
- Export default: false

### external_connectors
- Default lockdown state: review_required
- Carnos allowed: false
- Dashboard allowed: false
- Analytics allowed: false
- Export default: false

### spotify
- Default lockdown state: review_required
- Carnos allowed: false
- Dashboard allowed: false
- Analytics allowed: false
- Export default: false

## Lockdown Rules

- Emergency Lockdown enables Private Mode behavior.
- Emergency Lockdown overrides normal dashboard visibility for sensitive data.
- Emergency Lockdown overrides normal Carnos access for sensitive data.
- Emergency Lockdown overrides normal analytics use for sensitive data.
- Emergency Lockdown blocks automatic memory candidate creation.
- Emergency Lockdown blocks Carnos memory writes.
- Emergency Lockdown blocks Carnos sensitive summaries.
- Emergency Lockdown blocks broad sensitive dashboard exposure.
- Emergency Lockdown blocks broad sensitive timeline exposure.
- Emergency Lockdown blocks automatic export preparation.
- Emergency Lockdown blocks destructive action automation.
- Emergency Lockdown restricts connector actions.
- Emergency Lockdown restricts Spotify actions.
- Emergency Lockdown requires review for sensitive memory changes.
- Emergency Lockdown requires review for Carnos permission changes.
- Emergency Lockdown requires review for connector scope changes.
- Emergency Lockdown requires review for Spotify action approvals.
- Emergency Lockdown requires explicit user confirmation to disable.
- Carnos cannot disable Emergency Lockdown.
- Carnos cannot bypass Emergency Lockdown.

## Unlock Rules

- Only the user can request disabling Emergency Lockdown.
- Carnos cannot request disabling Emergency Lockdown as an action execution.
- Disable request must show affected protections before confirmation.
- Disable request must require explicit confirmation.
- Sensitive domains remain protected until disable confirmation completes.
- Connector restrictions remain active until disable confirmation completes.
- Spotify restrictions remain active until disable confirmation completes.
- Unlock action must create an audit event.
- Failed or expired disable requests must keep lockdown active.
- Emergency Lockdown cannot be silently disabled by system automation.

## Blocked Reasons

- emergency_lockdown_active
- lockdown_blocks_memory_candidate
- lockdown_blocks_carnos_memory_write
- lockdown_blocks_sensitive_summary
- lockdown_blocks_dashboard_surface
- lockdown_blocks_timeline_surface
- lockdown_blocks_analytics_use
- lockdown_blocks_export_automation
- lockdown_blocks_destructive_automation
- lockdown_blocks_connector_action
- lockdown_blocks_spotify_action
- lockdown_blocks_spotify_history_memory
- lockdown_requires_review
- lockdown_disable_confirmation_required
- carnos_cannot_disable_lockdown
- carnos_cannot_bypass_lockdown
- sensitive_domain_locked
- connector_scope_change_blocked
- spotify_action_blocked

## Audit Events Required

- emergency_lockdown_enabled
- emergency_lockdown_disable_requested
- emergency_lockdown_disable_confirmed
- emergency_lockdown_disabled
- emergency_lockdown_disable_rejected
- emergency_lockdown_disable_expired
- emergency_lockdown_blocked_memory_candidate
- emergency_lockdown_blocked_carnos_context
- emergency_lockdown_blocked_dashboard_surface
- emergency_lockdown_blocked_timeline_surface
- emergency_lockdown_blocked_analytics_use
- emergency_lockdown_blocked_export_automation
- emergency_lockdown_blocked_destructive_action
- emergency_lockdown_blocked_connector_action
- emergency_lockdown_blocked_spotify_action
- emergency_lockdown_sensitive_domain_locked

## Badge Requirements

- Emergency Lockdown Active
- Emergency Lockdown Disable Pending
- Sensitive Domain Locked
- Memory Disabled
- Carnos Restricted
- Dashboard Restricted
- Timeline Restricted
- Analytics Restricted
- Export Restricted
- Destructive Action Blocked
- Connector Restricted
- Spotify Restricted
- Review Required
- Blocked

## Carnos Rules

- Carnos may explain what Emergency Lockdown does.
- Carnos may tell the user Emergency Lockdown is active.
- Carnos may suggest enabling Emergency Lockdown when appropriate.
- Carnos cannot enable Emergency Lockdown silently.
- Carnos cannot disable Emergency Lockdown.
- Carnos cannot bypass Emergency Lockdown with older memories.
- Carnos cannot create memory candidates during Emergency Lockdown by default.
- Carnos cannot write memory during Emergency Lockdown.
- Carnos cannot summarize sensitive locked domains during Emergency Lockdown.
- Carnos cannot approve connector actions during Emergency Lockdown.
- Carnos cannot approve Spotify actions during Emergency Lockdown.
- Carnos cannot trigger destructive actions during Emergency Lockdown.

## Connector Rules

- External connector actions must check Emergency Lockdown before proposal or execution.
- High-risk connector actions are blocked during Emergency Lockdown.
- Connector scope changes require review during Emergency Lockdown.
- Connector reads must respect sensitive domain locks during Emergency Lockdown.
- Connector audit events must record Emergency Lockdown blocking when applicable.
- Connector token boundaries remain inaccessible to Carnos.

## Spotify Rules

- Spotify actions must check Emergency Lockdown before proposal or execution.
- Spotify playback control is blocked during Emergency Lockdown by default.
- Spotify listening history must not become memory during Emergency Lockdown.
- Spotify recently played data is treated as sensitive during Emergency Lockdown.
- Spotify scope changes require review during Emergency Lockdown.
- Spotify audit events must record Emergency Lockdown blocking when applicable.
- Spotify token values remain inaccessible to Carnos.

## Must Not Do

- do not create migrations in 20F
- do not invent lockdown persistence schema in 20F
- do not implement live Emergency Lockdown toggle persistence in 20F
- do not implement runtime connector blocking in 20F
- do not implement runtime Spotify blocking in 20F
- do not let Carnos disable Emergency Lockdown
- do not let Carnos bypass Emergency Lockdown
- do not allow automatic memory writes during Emergency Lockdown
- do not allow automatic export during Emergency Lockdown
- do not allow destructive action automation during Emergency Lockdown
- do not weaken Private Mode rules during Emergency Lockdown

## Acceptance

- Emergency Lockdown states are defined.
- Activation effects are defined.
- Affected surfaces are defined.
- Sensitive domain defaults are defined.
- Lockdown rules are defined.
- Unlock rules are defined.
- Blocked reasons are defined.
- Audit events are defined.
- Badge requirements are defined.
- Carnos rules are defined.
- Connector rules are defined.
- Spotify rules are defined.
- 20F audit passes.
- Full project check passes.

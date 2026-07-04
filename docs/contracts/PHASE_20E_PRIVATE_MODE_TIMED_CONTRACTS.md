# Phase 20E — Private Mode + Timed Private Mode Contracts

## Purpose

Define enforceable Private Mode and Timed Private Mode behavior across memory, Carnos, dashboards, timeline, analytics, export, connectors, Spotify, audit, and UI badges.

## Schema Requirement

- Needs live database schema: false
- Reason: 20E defines state and enforcement rules only. It does not create privacy_settings rows, private mode session rows, persistence, migrations, repositories, or live toggles.
- Future schema gate: If a later chunk persists Private Mode, Timed Private Mode, privacy_settings, private sessions, audit rows, or toggle history, inspect exact schema before coding.

## Private Mode States

### off
- Meaning: Private Mode is not active.
- Memory behavior: normal memory rules apply
- Carnos behavior: normal Carnos permissions apply
- Connector behavior: normal connector permissions apply
- Spotify behavior: normal Spotify permissions apply

### on
- Meaning: Private Mode is active until the user disables it.
- Memory behavior: automatic memory candidate creation is blocked
- Carnos behavior: sensitive summaries and broad sensitive context are blocked
- Connector behavior: external connector actions require review or are blocked depending on risk
- Spotify behavior: Spotify actions are blocked unless explicitly approved for a narrow safe action

### timed_session
- Meaning: Private Mode is active until a declared expiry time.
- Memory behavior: automatic memory candidate creation is blocked until expiry
- Carnos behavior: sensitive summaries and broad context are blocked until expiry
- Connector behavior: connector actions are restricted until expiry
- Spotify behavior: Spotify actions are restricted until expiry

### until_reenabled
- Meaning: Private Mode remains active until the user manually disables it.
- Memory behavior: memory candidate creation remains blocked
- Carnos behavior: sensitive Carnos access remains blocked
- Connector behavior: connector action restrictions remain active
- Spotify behavior: Spotify action restrictions remain active

## Timed Private Mode Options

### Current session
- Id: current_session
- Expiry behavior: expires when the current app session ends or the user disables it

### 30 minutes
- Id: minutes_30
- Expiry behavior: expires after 30 minutes

### 1 hour
- Id: hours_1
- Expiry behavior: expires after 1 hour

### 3 hours
- Id: hours_3
- Expiry behavior: expires after 3 hours

### Until tomorrow
- Id: until_tomorrow
- Expiry behavior: expires at the next local-day boundary chosen by the app policy

### Until manually disabled
- Id: manual_disable
- Expiry behavior: does not expire automatically

## Enforcement Rules

- Private Mode blocks automatic memory candidate creation.
- Private Mode blocks Carnos memory writes.
- Private Mode blocks sensitive summaries by default.
- Private Mode blocks broad dashboard exposure of private and sensitive data.
- Private Mode blocks broad timeline exposure of private and sensitive data.
- Private Mode blocks analytics use of private and sensitive data unless a narrow approved rule exists.
- Private Mode blocks automatic export preparation.
- Private Mode blocks destructive action automation.
- Private Mode restricts external connector actions.
- Private Mode restricts Spotify actions.
- Timed Private Mode keeps the same restrictions until expiry.
- Expired Timed Private Mode must stop enforcing timed restrictions after expiry.
- Manual disable must be user-driven and audited.
- Carnos cannot disable Private Mode.
- Carnos cannot bypass Private Mode by using remembered context.
- Carnos cannot convert Private Mode content into memory without user approval.

## Surface Behavior

### Memory Inbox
- Behavior: show private-mode active state and block automatic new Carnos memory candidates

### Saved Memories
- Behavior: show private-mode badge and restrict Carnos usage of sensitive memories

### Carnos Chat
- Behavior: avoid sensitive context injection and do not create memory candidates automatically

### Dashboard Cards
- Behavior: hide or redact private and sensitive cards unless explicitly allowed

### Timeline
- Behavior: hide or redact private and sensitive events unless explicitly allowed

### Analytics
- Behavior: exclude private and sensitive data from active calculations unless approved

### Export
- Behavior: require explicit user action and preview; no automatic export preparation

### Destructive Actions
- Behavior: block automation and require explicit review/confirmation

### External API Connectors
- Behavior: restrict connector actions and require review for risk-bearing actions

### Spotify
- Behavior: block or review Spotify actions and prevent listening history memory creation

## State Transition Rules

- off to on | actor: user | audit required: true | review required: false
- off to timed_session | actor: user | audit required: true | review required: false
- timed_session to off | actor: system_or_user | audit required: true | review required: false
- on to off | actor: user | audit required: true | review required: false
- until_reenabled to off | actor: user | audit required: true | review required: false

## Blocked Reasons

- private_mode_active
- timed_private_mode_active
- private_mode_blocks_memory_candidate
- private_mode_blocks_carnos_memory_write
- private_mode_blocks_sensitive_summary
- private_mode_blocks_dashboard_surface
- private_mode_blocks_timeline_surface
- private_mode_blocks_analytics_use
- private_mode_blocks_export_automation
- private_mode_blocks_destructive_automation
- private_mode_blocks_connector_action
- private_mode_blocks_spotify_action
- private_mode_blocks_spotify_history_memory
- private_mode_requires_review
- private_mode_expired

## Audit Events Required

- private_mode_enabled
- private_mode_disabled
- private_mode_expired
- timed_private_mode_enabled
- timed_private_mode_extended
- timed_private_mode_expired
- private_mode_blocked_memory_candidate
- private_mode_blocked_carnos_context
- private_mode_blocked_dashboard_surface
- private_mode_blocked_analytics_use
- private_mode_blocked_export_automation
- private_mode_blocked_connector_action
- private_mode_blocked_spotify_action

## Badge Requirements

- Private Mode Active
- Timed Private Mode Active
- Private Mode Expired
- Memory Disabled
- Carnos Restricted
- Dashboard Restricted
- Analytics Restricted
- Connector Restricted
- Spotify Restricted
- Review Required
- Blocked

## Carnos Rules

- Carnos may explain what Private Mode does.
- Carnos may tell the user Private Mode is active.
- Carnos may propose turning on Private Mode when appropriate.
- Carnos cannot enable Private Mode silently.
- Carnos cannot disable Private Mode.
- Carnos cannot bypass Private Mode with older memories.
- Carnos cannot create memory candidates from Private Mode content without approval.
- Carnos cannot summarize sensitive Private Mode content unless explicitly allowed.
- Carnos cannot trigger connector actions that Private Mode blocks.
- Carnos cannot trigger Spotify actions that Private Mode blocks.

## Connector Rules

- External connector actions must check Private Mode before proposal or execution.
- Connector data reads must respect Private Mode and redaction rules.
- Connector action review must show Private Mode status.
- Connector audit events must record Private Mode blocking when applicable.
- Connector token boundaries are unchanged and must remain inaccessible to Carnos.

## Spotify Rules

- Spotify actions must check Private Mode before proposal or execution.
- Spotify listening history must not become memory during Private Mode without explicit approval.
- Spotify recently played data is treated as sensitive during Private Mode.
- Spotify playback control is blocked or review-required during Private Mode.
- Spotify audit events must record Private Mode blocking when applicable.
- Spotify token values remain inaccessible to Carnos.

## Must Not Do

- do not create migrations in 20E
- do not invent privacy_settings schema in 20E
- do not implement live Private Mode toggle persistence in 20E
- do not implement session storage in 20E
- do not implement runtime connector blocking in 20E
- do not implement runtime Spotify blocking in 20E
- do not let Carnos disable Private Mode
- do not let Carnos bypass Private Mode
- do not allow automatic memory writes during Private Mode
- do not allow automatic export or destructive action during Private Mode

## Acceptance

- Private Mode states are defined.
- Timed Private Mode options are defined.
- Enforcement rules are defined.
- Surface behavior is defined.
- State transition rules are defined.
- Blocked reasons are defined.
- Audit events are defined.
- Badge requirements are defined.
- Carnos rules are defined.
- Connector rules are defined.
- Spotify rules are defined.
- 20E audit passes.
- Full project check passes.

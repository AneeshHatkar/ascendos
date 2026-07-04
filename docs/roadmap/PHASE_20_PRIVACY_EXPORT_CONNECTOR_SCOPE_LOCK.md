# Phase 20A — Privacy / Export / Connector Scope Lock

## Master Phase Identity

Phase 20 — Privacy / Export / Memory Control / External Connector Trust Layer

Phase 20 is the global trust layer for ascendOS. It controls memory, privacy, export, destructive actions, Carnos permissions, data retention, redaction, external connectors, Spotify, account connection safety, and cross-phase enforcement.

## 20A Rule

If a Phase 20 feature is not written into this lock, memory is not trusted to remember it later.

## Source Coverage Carryover

- scanned_items: 6760
- likely_covered: 6739
- partial: 12
- weak: 1
- missing_by_keyword_scan: 8
- decision: No major original DOCX or JSON gap blocks Phase 20. New Phase 20 additions must be locked here before implementation.

## Minor Old-Source Notes

- schema_version 1.1.1
- log bug
- add lab
- add set
- event_source system
- voice command log my day
- python ML worker current_patch Phase 5.15

These notes are tracked for final source-label and polish verification. They are not major blockers before Phase 20 implementation.

## New Phase 20 Additions To Lock

- Spotify Connector
- Spotify OAuth/PKCE boundary
- Spotify account connection flow
- Spotify Developer App setup instructions
- Spotify redirect URI boundary
- Spotify environment variable boundary
- External API Connector Framework
- connector account model
- connector permission model
- connector scope model
- connector token boundary
- connector action request
- connector action manifest
- connector audit event
- Spotify device snapshot
- Spotify action proposal
- Amazon Echo excluded
- Garmin deferred
- Emergency Lockdown

## Full Phase 20 Feature Inventory

- /privacy dashboard upgrade
- Memory Inbox
- Saved Memories
- memory approval
- memory rejection
- memory deferral
- memory candidate list
- Carnos-created memory candidates
- manual memory candidates
- memory source and evidence links
- memory confidence
- memory sensitivity level
- memory privacy level
- duplicate memory warning
- memory conflict warning
- forget memory
- hide memory and data
- archive memory and data
- Delete / Destructive Actions card
- destructive action boundary
- forget versus hide versus archive versus destructive action definitions
- export data
- export scope selector
- export preview
- export manifest
- export expiration
- export history
- forget manifest
- destructive action manifest
- data scope selector
- Private Mode
- Timed Private Mode
- Emergency Lockdown
- Sensitive Locks
- domain privacy permissions
- Carnos access matrix
- privacy action review queue
- two-step confirmation
- cooldown boundary
- Audit Viewer
- append-only audit boundary
- privacy audit event taxonomy
- redaction rules
- privacy badges
- privacy preview before export
- privacy preview before forget
- privacy preview before destructive action
- data retention boundary
- cross-phase privacy enforcement
- Future API Connector Framework
- external connector registry
- connector account model
- connector permission model
- connector scope model
- connector auth boundary
- connector token boundary
- connector status
- connector action request
- connector action manifest
- connector audit event
- connector private-mode rule
- connector redaction rule
- connector disconnect boundary
- connector retention rule
- connector review queue integration
- connector Carnos access rule
- Spotify Connector
- Spotify Developer App setup instructions
- Spotify account connection flow
- Spotify redirect URI boundary
- Spotify environment variable boundary
- Spotify OAuth/PKCE boundary
- Spotify authorization URL boundary
- Spotify callback boundary
- Spotify state parameter boundary
- Spotify code verifier boundary
- Spotify code challenge boundary
- Spotify token exchange boundary
- Spotify refresh boundary
- Spotify revoke boundary
- Spotify connection status
- Spotify connect boundary
- Spotify disconnect boundary
- Spotify scope grants
- Spotify missing scopes
- Spotify account/profile snapshot boundary
- Spotify playback state snapshot
- Spotify current track boundary
- Spotify device snapshot
- Spotify playlist read boundary
- Spotify recently played sensitive boundary
- Spotify media permission model
- Spotify action proposal model
- Spotify action manifest
- Spotify action audit
- Spotify private-mode rule
- Spotify Premium-required boundary
- Spotify no-active-device boundary
- Spotify Carnos action proposals
- Spotify action safety
- Spotify blocked reasons
- Spotify UI card
- Media Permissions card
- Connector Audit card
- manual workout logging through Carnos chat
- manual workout logging through Carnos voice later
- structured workout entry proposal
- exercise name
- sets
- reps
- weight
- duration
- cardio
- energy
- notes
- health/body compatibility
- custom tracker compatibility
- timeline compatibility
- analytics compatibility
- Amazon Echo/Alexa integration excluded
- Garmin integration deferred
- Apple Health full integration deferred
- Gmail connector deferred
- Google Calendar connector deferred
- Notion connector deferred
- GitHub connector deferred
- Slack connector deferred
- Discord connector deferred
- YouTube connector deferred
- LinkedIn connector deferred
- full commercial streaming replacement excluded
- uncontrolled Carnos external actions excluded
- silent token storage excluded
- silent memory writes excluded
- silent data export excluded
- silent destructive actions excluded
- final v1 polish/deployment/demo polish excluded because that is Phase 21

## Total Phase 20 Steps

1. Clean temporary audit files and confirm repo is clean.
2. Lock Phase 20 expanded scope.
3. Record source-to-repo coverage audit summary.
4. Record all minor old-source notes and all new Phase 20 additions.
5. Create Phase 20 schema/source interconnection map.
6. Lock all 20A-20Z build chunks inside the repo.
7. Add a 20A audit that fails if any Phase 20 feature/chunk is missing from the lock.
8. Define core privacy domain contracts.
9. Define memory control contracts.
10. Define forget/hide/archive/destructive semantics.
11. Define Private Mode and Timed Private Mode.
12. Define Emergency Lockdown.
13. Define Sensitive Locks and domain privacy permissions.
14. Define Carnos access matrix.
15. Define privacy action review queue.
16. Define two-step confirmation and cooldown boundary.
17. Define data scope selector.
18. Define export contracts, export manifest, and export expiration.
19. Define forget/destructive action manifest and safety boundary.
20. Define Audit Viewer and append-only audit boundary.
21. Define privacy audit taxonomy, redaction rules, and privacy badges.
22. Define data retention boundary.
23. Define cross-phase privacy enforcement map.
24. Define Future API Connector Framework.
25. Define connector registry, account model, permissions, scopes, token boundary, action review, audit events.
26. Define Spotify connector foundation.
27. Define Spotify account connection flow.
28. Define Spotify OAuth/PKCE boundary.
29. Define Spotify permissions, scopes, and risk levels.
30. Define Spotify playback, current-track, device, playlist, and recently-played boundaries.
31. Define Spotify Carnos actions and action safety.
32. Define Spotify action manifest and audit events.
33. Define manual workout logging through Carnos chat/voice.
34. Define explicit exclusions and deferred items.
35. Build /privacy dashboard view model.
36. Build Memory Inbox card.
37. Build Saved Memories card.
38. Build Forget card.
39. Build Destructive Actions card.
40. Build Export card.
41. Build Private Mode card.
42. Build Timed Private Mode display.
43. Build Emergency Lockdown card.
44. Build Sensitive Locks card.
45. Build Domain Privacy card.
46. Build Carnos Access card.
47. Build Privacy Review Queue card.
48. Build Audit Viewer card.
49. Build Data Retention card.
50. Build Redaction Controls card.
51. Build External API Connectors card.
52. Build Spotify Connector card.
53. Build Media Permissions card.
54. Build Connector Audit card.
55. Add Phase 20 fixtures covering memory, privacy, export, destructive, connector, and Spotify states.
56. Add Phase 20 audits.
57. Add package check integration for Phase 20 audits.
58. Run full verification.
59. Add Phase 20 completion report.
60. Commit and push Phase 20 completion.

## Chunk-by-Chunk Step Plan

### 20A — Scope lock + coverage carryover + source interconnection map

Purpose:
- Create the repo-side Phase 20 constitution so no Phase 20 feature, step, chunk, Spotify requirement, connector requirement, exclusion, deferral, source note, or safety rule can be forgotten later.

Builds:
- full Phase 20 constitution
- Phase 20 feature inventory
- Phase 20 total step list
- 20A through 20Z chunk map
- source coverage carryover
- minor old-source notes
- new Phase 20 additions
- cross-phase interconnection map
- Spotify account connection flow
- Spotify OAuth/PKCE boundary
- Future API Connector Framework lock
- exclusion and deferral registry
- safety guarantee registry
- Phase 20A audit

Does:
- locks every Phase 20 feature before implementation
- locks what every chunk builds and does
- records acceptance and not-allowed rules for every chunk
- makes the repo the source of memory for Phase 20
- prevents chat drift and terminal drift

Acceptance:
- all 20A through 20Z chunks exist in the fixture and roadmap
- each chunk has purpose, builds, does, acceptance, not_allowed, and feature_markers
- source coverage numbers are recorded
- Spotify connection flow is recorded
- connector framework is recorded
- exclusions and deferrals are recorded
- audit:phase20a passes
- npm run check passes

Not Allowed:
- do not implement runtime Spotify OAuth yet
- do not create live connector execution yet
- do not add real destructive action execution
- do not skip any Phase 20 feature from the lock
- do not rely on chat memory after this chunk

Feature Markers:
- Phase 20 constitution
- coverage carryover
- 20A-20Z chunk map
- Spotify account connection flow
- Future API Connector Framework
- exclusions and deferrals

### 20B — Core privacy domain contracts

Purpose:
- Define the primitive privacy language used by every later Phase 20 feature.

Builds:
- privacy levels
- sensitivity levels
- lock states
- redaction levels
- action statuses
- actor model
- privacy surfaces
- domain privacy primitives

Does:
- creates the shared privacy vocabulary
- prevents later features from inventing conflicting states
- supports memory, export, destructive actions, connectors, and Spotify

Acceptance:
- privacy levels are documented
- sensitivity levels are documented
- lock states are documented
- redaction levels are documented
- action statuses are documented
- actor model is documented

Not Allowed:
- do not add UI yet
- do not add live DB writes
- do not make Carnos bypass rules

Feature Markers:
- privacy levels
- sensitivity levels
- lock states
- redaction levels
- action statuses

### 20C — Memory control contracts

Purpose:
- Upgrade memory into user-governed memory control with Memory Inbox and Saved Memories.

Builds:
- Memory Inbox
- memory candidate list
- Carnos-created memory candidates
- manual memory candidates
- memory source and evidence links
- memory confidence
- memory sensitivity level
- memory privacy level
- duplicate memory warning
- memory conflict warning
- Saved Memories
- memory approval
- memory rejection
- memory deferral
- memory Carnos access changes
- no silent memory write rules

Does:
- lets user review proposed memories before saving
- shows what Carnos can remember and use
- blocks silent memory creation
- links memory actions to audit

Acceptance:
- Memory Inbox contract exists
- Saved Memories contract exists
- approval, rejection, and deferral are defined
- Carnos self-approval is blocked
- silent sensitive memory save is blocked

Not Allowed:
- do not allow Carnos to approve its own memory
- do not silently save sensitive memory
- do not allow rejected memory in Carnos context

Feature Markers:
- Memory Inbox
- Saved Memories
- memory approval
- memory rejection
- memory deferral
- no silent memory write

### 20D — Forget / hide / archive / destructive action semantics

Purpose:
- Define the difference between forget, hide, archive, and protected destructive actions.

Builds:
- forget definition
- hide definition
- archive definition
- destructive action definition
- forget behavior
- hide behavior
- archive behavior
- destructive action safety behavior
- forget manifest foundation
- destructive action manifest foundation

Does:
- prevents privacy ambiguity
- defines what Carnos can no longer use
- defines what dashboards should no longer show
- defines what remains for proof and audit
- defines protected high-risk removal boundaries

Acceptance:
- forget is defined as removing from Carnos use
- hide is defined as removing from normal surfaces
- archive is defined as retaining proof but removing active use
- destructive action is defined as protected high-risk removal
- manifest foundation is recorded

Not Allowed:
- do not confuse forget with destructive action
- do not allow Carnos destructive action
- do not remove audit history casually

Feature Markers:
- forget definition
- hide definition
- archive definition
- destructive action boundary
- forget manifest
- destructive action manifest

### 20E — Private Mode + Timed Private Mode

Purpose:
- Make Private Mode an enforceable ruleset across memory, dashboards, analytics, connectors, and Spotify.

Builds:
- private mode states
- timed private mode
- private mode expiry
- private mode audit events
- memory blocking
- dashboard blocking
- analytics blocking
- connector blocking
- Spotify blocking
- private mode status badges

Does:
- blocks automatic memory candidate creation
- blocks sensitive summaries
- blocks broad dashboard exposure
- restricts connector actions
- restricts Spotify actions
- records enable, disable, and expiry events

Acceptance:
- private mode states are defined
- timed private mode is defined
- expiry behavior is defined
- connector and Spotify restrictions are defined
- audit behavior is defined

Not Allowed:
- do not make Private Mode a vague toggle
- do not allow silent memory creation during Private Mode
- do not allow Spotify private-mode bypass

Feature Markers:
- Private Mode
- Timed Private Mode
- private mode expiry
- Spotify blocking
- connector blocking

### 20F — Emergency Lockdown

Purpose:
- Add stronger privacy protection than Private Mode for sensitive situations.

Builds:
- emergency lockdown state
- lockdown effects
- sensitive domain lock behavior
- Carnos memory disablement
- connector restrictions
- Spotify restrictions
- unlock confirmation rules
- lockdown audit events

Does:
- turns on strong privacy protections
- locks sensitive domains
- blocks sensitive Carnos usage
- restricts connector and Spotify actions
- requires confirmation to disable

Acceptance:
- Emergency Lockdown is defined
- lockdown effects are listed
- Carnos cannot disable lockdown
- unlock confirmation is required
- audit events are defined

Not Allowed:
- do not let Carnos disable lockdown
- do not allow sensitive exports by default during lockdown
- do not allow connector or Spotify bypass

Feature Markers:
- Emergency Lockdown
- lockdown effects
- unlock confirmation
- Spotify restrictions
- connector restrictions

### 20G — Sensitive Locks + domain privacy permissions

Purpose:
- Make privacy domain-aware across every major ascendOS area.

Builds:
- sensitive lock levels
- sensitive domains
- domain privacy defaults
- dashboard visibility permission
- timeline exposure permission
- analytics permission
- export permission
- Carnos access permission
- redaction default
- retention default

Does:
- locks health, body, finance, documents, memory, custom trackers, analytics, external connectors, and Spotify data
- controls what dashboards can show
- controls what Carnos can access
- controls export and analytics behavior

Acceptance:
- lock levels are documented
- sensitive domains are listed
- domain privacy permissions are documented
- Spotify data is included as a sensitive domain
- custom trackers are included

Not Allowed:
- do not let locked data leak into dashboards
- do not let locked data leak into analytics
- do not let Carnos read fully locked domains

Feature Markers:
- Sensitive Locks
- domain privacy permissions
- Spotify data
- custom trackers
- analytics permission

### 20H — Carnos access matrix

Purpose:
- Define exactly what Carnos can read, summarize, suggest, remember, expose, or propose.

Builds:
- can_read
- can_summarize
- can_suggest
- can_create_memory_candidate
- can_use_in_context_pack
- can_use_in_analytics
- can_show_on_dashboard
- can_reference_in_chat
- can_include_in_export_summary
- can_trigger_action_proposal
- can_execute_approved_action
- Carnos block rules

Does:
- prevents Carnos from bypassing privacy
- blocks Carnos from locked domains
- blocks Carnos from raw token access
- blocks Carnos from export and destructive actions
- allows only approved safe action execution boundaries

Acceptance:
- all Carnos permissions are listed
- blocked behaviors are listed
- connector and Spotify restrictions are included
- memory restrictions are included

Not Allowed:
- do not allow Carnos raw token access
- do not allow Carnos silent export
- do not allow Carnos destructive action
- do not allow Carnos silent Spotify action

Feature Markers:
- Carnos access matrix
- can_read
- can_summarize
- can_trigger_action_proposal
- can_execute_approved_action

### 20I — Privacy action review queue

Purpose:
- Centralize review for privacy, memory, export, destructive, connector, and Spotify actions.

Builds:
- privacy review queue
- memory action review
- export action review
- destructive action review
- private mode action review
- sensitive lock review
- Carnos permission review
- connector action review
- Spotify action review
- review statuses
- no Carnos self-approval

Does:
- reuses the safe write pattern
- prevents dangerous actions from executing silently
- records review statuses
- blocks Carnos self-approval

Acceptance:
- review action types are listed
- statuses are listed
- connector action review is included
- Spotify action review is included
- Carnos self-approval is blocked

Not Allowed:
- do not allow unreviewed high-risk actions
- do not allow Carnos to approve its own action
- do not skip audit links

Feature Markers:
- privacy action review queue
- connector action review
- Spotify action review
- no Carnos self-approval
- review statuses

### 20J — Two-step confirmation + cooldown boundary

Purpose:
- Protect high-risk actions with stronger confirmation and waiting boundaries.

Builds:
- one-step action list
- two-step action list
- cooldown required actions
- requested timestamp
- confirmation timestamp
- cooldown expiry timestamp
- action expiry timestamp
- blocked reasons

Does:
- protects destructive actions
- protects bulk forget
- protects export all
- protects connector scope changes
- protects Spotify device and volume control

Acceptance:
- one-step actions are listed
- two-step actions are listed
- cooldown fields are listed
- Spotify high-risk actions are included
- connector high-risk actions are included

Not Allowed:
- do not allow high-risk actions without confirmation
- do not allow expired actions to execute
- do not bypass cooldown

Feature Markers:
- two-step confirmation
- cooldown boundary
- export all
- Spotify device control
- Spotify volume control

### 20K — Data scope selector

Purpose:
- Create one shared scope model for export, forget, hide, archive, destructive actions, connectors, and Spotify previews.

Builds:
- domain scope
- route scope
- record type scope
- source type scope
- date range scope
- privacy level scope
- sensitivity level scope
- memory source scope
- custom tracker scope
- document/evidence scope
- analytics source scope
- connector scope
- Spotify scope

Does:
- supports safe previews
- prevents broad unscoped actions
- makes export and destructive actions explainable
- includes connector and Spotify data

Acceptance:
- all scope dimensions are listed
- connector scope is included
- Spotify scope is included
- custom tracker and evidence scopes are included

Not Allowed:
- do not allow unscoped export
- do not allow unscoped destructive action
- do not skip sensitive and privacy filters

Feature Markers:
- data scope selector
- connector scope
- Spotify scope
- custom tracker scope
- document/evidence scope

### 20L — Export contracts + export manifest + expiration

Purpose:
- Make exports scoped, previewed, manifested, expiring, and audited.

Builds:
- export request
- export preview
- export scope
- export manifest
- export statuses
- export expiration
- export warnings
- export audit link
- no silent export

Does:
- prevents silent export
- shows included and excluded data
- marks sensitive and locked records
- creates export proof
- expires export availability

Acceptance:
- export request is defined
- export preview is defined
- export manifest fields are defined
- export statuses are defined
- no silent export rule exists

Not Allowed:
- do not allow Carnos export
- do not allow export all without stronger confirmation
- do not include locked data without warning or explicit approval

Feature Markers:
- export data
- export preview
- export manifest
- export expiration
- no silent export

### 20M — Forget/destructive manifest + destructive safety

Purpose:
- Make forget and protected destructive actions previewable, confirmable, manifested, and audited.

Builds:
- forget manifest
- destructive action manifest
- affected records
- skipped records
- skip reasons
- hard-removal deferred boundary
- confirmation level
- cooldown status
- destructive action audit link
- no Carnos destructive action

Does:
- tracks what is affected
- tracks what is skipped
- records why records are skipped
- prevents Carnos from performing destructive actions
- links high-risk actions to audit

Acceptance:
- forget manifest is defined
- destructive action manifest is defined
- skip reasons are defined
- hard-removal deferred boundary is defined
- Carnos destructive action is blocked

Not Allowed:
- do not allow Carnos destructive action
- do not allow high-risk removal without manifest
- do not skip audit

Feature Markers:
- forget manifest
- destructive action manifest
- hard-removal deferred boundary
- no Carnos destructive action

### 20N — Audit Viewer + append-only audit boundary

Purpose:
- Make privacy trust visible and tamper-resistant.

Builds:
- audit viewer contract
- audit filters
- actor display
- domain display
- status display
- linked manifest display
- linked connector display
- linked source/evidence display
- append-only audit boundary
- audit redaction

Does:
- shows privacy, memory, export, connector, and Spotify events
- supports filtering
- links events to manifests and sources
- prevents silent audit tampering

Acceptance:
- Audit Viewer is defined
- append-only boundary is defined
- filters are defined
- connector and Spotify audit events are supported
- audit redaction is defined

Not Allowed:
- do not allow Carnos audit edits
- do not allow silent audit removal
- do not expose sensitive payloads without redaction

Feature Markers:
- Audit Viewer
- append-only audit boundary
- linked connector display
- linked source/evidence display
- audit redaction

### 20O — Privacy audit taxonomy + redaction + badges

Purpose:
- Standardize privacy event names, redaction behavior, and UI badges.

Builds:
- privacy audit event taxonomy
- memory audit events
- private mode audit events
- export audit events
- destructive action audit events
- connector audit events
- Spotify audit events
- redaction rules
- privacy badges

Does:
- prevents inconsistent event naming
- shows privacy state clearly in UI
- supports redacted display across dashboard, export, memory, analytics, connectors, and Spotify

Acceptance:
- memory events are listed
- export events are listed
- connector events are listed
- Spotify events are listed
- redaction levels are listed
- privacy badges are listed

Not Allowed:
- do not use inconsistent event names
- do not expose sensitive fields without redaction
- do not skip Spotify badges

Feature Markers:
- privacy audit event taxonomy
- redaction rules
- privacy badges
- Spotify audit events
- connector audit events

### 20P — Data retention boundary

Purpose:
- Define how long privacy artifacts remain active before review, archive, or expiry.

Builds:
- memory candidate retention
- saved memory retention
- export retention
- private session retention
- privacy review retention
- connector action retention
- Spotify action retention
- source/evidence retention

Does:
- prevents stale exports
- prevents stale approvals
- prevents stale connector actions
- prevents stale Spotify proposals
- supports review and archive flows

Acceptance:
- retention policies are listed
- exports expire
- privacy action requests expire
- connector actions expire
- Spotify actions expire

Not Allowed:
- do not keep active exports forever
- do not keep action approvals valid forever
- do not skip audit for retention changes

Feature Markers:
- data retention boundary
- expire_export_after_n_days
- expire_action_request_after_n_days
- expire_connector_action_after_n_days
- expire_spotify_action_after_n_days

### 20Q — Cross-phase privacy enforcement map

Purpose:
- Prove Phase 20 is connected to earlier phases and not a standalone page.

Builds:
- Phase 13.5E settings/privacy connection
- Phase 15 memory/private mode/forget connection
- Phase 16 current-info privacy/source connection
- Phase 17 memory RAG privacy connection
- Phase 18 analytics privacy connection
- Phase 19 custom tracker privacy connection
- documents/evidence connection
- dashboard card connection
- Carnos context connection
- Spotify connector permission connection
- external connector token boundary connection

Does:
- connects privacy enforcement to memory
- connects privacy enforcement to analytics
- connects privacy enforcement to custom trackers
- connects privacy enforcement to current info
- connects privacy enforcement to connectors and Spotify

Acceptance:
- all prior phase links are recorded
- custom trackers respect sensitive locks
- analytics respects private mode
- memory RAG respects forget/private mode
- Spotify respects connector permissions

Not Allowed:
- do not make Phase 20 standalone
- do not ignore Phase 19 custom tracker privacy
- do not ignore Phase 18 analytics privacy

Feature Markers:
- cross-phase privacy enforcement
- Phase 15 memory/private mode
- Phase 18 analytics privacy
- Phase 19 custom tracker privacy
- Spotify connector permissions

### 20R — Future API Connector Framework

Purpose:
- Create the reusable trust layer for present Spotify and later external APIs.

Builds:
- external connector registry
- connector account model
- connector permission model
- connector scope model
- connector auth boundary
- connector token boundary
- connector status
- connector action request
- connector action manifest
- connector audit event
- connector private-mode rule
- connector redaction rule
- connector disconnect boundary
- connector retention rule
- connector Carnos access rule

Does:
- creates a common model for future APIs
- prevents raw token exposure
- requires review for external actions
- supports connector audit trail
- supports Spotify as the first connector

Acceptance:
- connector registry is defined
- connector account model is defined
- connector permissions are defined
- connector scopes are defined
- connector token boundary is defined
- connector audit is defined

Not Allowed:
- do not build every future connector now
- do not expose raw tokens
- do not allow Carnos to connect APIs by itself
- do not allow silent external actions

Feature Markers:
- Future API Connector Framework
- external connector registry
- connector account model
- connector scope model
- connector token boundary

### 20S — Spotify connector foundation

Purpose:
- Make Spotify the first real connector inside the Phase 20 trust layer.

Builds:
- Spotify connector contract
- Spotify connection status
- Spotify connect boundary
- Spotify disconnect boundary
- Spotify Developer App setup instructions
- Spotify redirect URI boundary
- Spotify environment variable boundary
- Spotify scope grants
- Spotify missing scopes
- Spotify token safety
- Spotify Premium-required boundary

Does:
- defines Spotify as a connector
- records how setup works
- records connection status
- records scope grants and missing scopes
- records Premium-required behavior

Acceptance:
- Spotify connector is defined
- Developer App setup is documented
- redirect URI boundary is documented
- environment variable boundary is documented
- Premium-required boundary is documented

Not Allowed:
- do not ask user for Spotify password
- do not expose raw Spotify tokens
- do not allow Carnos token access
- do not execute Spotify actions silently

Feature Markers:
- Spotify Connector
- Spotify Developer App setup instructions
- Spotify redirect URI boundary
- Spotify environment variable boundary
- Spotify Premium-required boundary

### 20T — Spotify account connection + OAuth/PKCE callback boundary

Purpose:
- Define exactly how the user connects a Spotify account safely.

Builds:
- Connect Spotify user flow
- Spotify authorization URL boundary
- PKCE code verifier boundary
- PKCE code challenge boundary
- state parameter boundary
- callback route boundary
- scope grant boundary
- token exchange boundary
- refresh boundary
- revoke/disconnect boundary
- SPOTIFY_CLIENT_ID boundary
- SPOTIFY_REDIRECT_URI boundary
- SPOTIFY_CLIENT_SECRET optional future boundary
- no token exposure to Carnos/UI/audit/memory

Does:
- connects through Spotify OAuth
- uses PKCE boundary first
- records callback behavior
- records environment setup
- keeps Carnos away from raw tokens

Acceptance:
- account connection flow is recorded
- OAuth/PKCE boundary is recorded
- state parameter boundary is recorded
- callback boundary is recorded
- environment variables are recorded
- raw token exposure is blocked

Not Allowed:
- do not ask user for password
- do not log tokens
- do not store tokens in memory
- do not expose token values to Carnos
- do not connect without user OAuth

Feature Markers:
- Spotify account connection flow
- Spotify OAuth/PKCE boundary
- SPOTIFY_CLIENT_ID
- SPOTIFY_REDIRECT_URI
- no token exposure

### 20U — Spotify playback/device/playlist/recently-played boundaries

Purpose:
- Safely model Spotify read-side data without leaking sensitive listening history.

Builds:
- playback state snapshot
- current track boundary
- device snapshot
- playlist read boundary
- recently played sensitive boundary
- private mode restrictions
- missing scope states
- Premium required states
- no active device states

Does:
- models current playback safely
- models device availability safely
- treats recently played as sensitive
- blocks reads when scopes are missing
- shows Premium and no-active-device states

Acceptance:
- playback snapshot is defined
- device snapshot is defined
- playlist read boundary is defined
- recently played sensitive boundary is defined
- missing scope states are defined

Not Allowed:
- do not convert listening history into memory without approval
- do not expose sensitive Spotify data during Private Mode
- do not ignore missing scopes

Feature Markers:
- Spotify playback state snapshot
- Spotify current track boundary
- Spotify device snapshot
- Spotify playlist read boundary
- Spotify recently played sensitive boundary

### 20V — Spotify Carnos actions + action safety

Purpose:
- Allow Carnos to propose Spotify actions while preventing silent media control.

Builds:
- Spotify action proposals
- play playlist proposal
- pause/resume proposal
- skip proposal
- volume proposal
- transfer device proposal
- queue proposal
- read current track proposal
- playlist suggestion proposal
- Spotify action states
- Spotify blocked reasons
- Spotify action manifest
- Spotify no-silent-action proof

Does:
- lets Carnos suggest music actions
- requires permission and review
- blocks action when private mode is active
- blocks action when scope is missing
- blocks action when Premium or device requirements fail

Acceptance:
- Spotify action proposal model is defined
- action states are defined
- blocked reasons are defined
- action manifest is defined
- no silent Spotify action guarantee exists

Not Allowed:
- do not allow Carnos to play music silently
- do not allow volume or device control without approval
- do not bypass private mode
- do not ignore missing scopes

Feature Markers:
- Spotify action proposal
- Spotify action manifest
- Spotify blocked reasons
- no silent Spotify action
- volume proposal
- transfer device proposal

### 20W — Spotify UI + Media Permissions + Connector Audit cards

Purpose:
- Make Spotify and connector controls visible on /privacy.

Builds:
- Spotify Connector card
- connected/disconnected state
- allowed scopes display
- missing scopes display
- Premium note
- developer setup hints
- redirect URI hint
- environment variable hint
- playback/device summary
- pending action display
- blocked action display
- Media Permissions card
- Connector Audit card

Does:
- shows Spotify connection state
- shows setup instructions
- shows permissions and risks
- shows pending and blocked actions
- shows connector and Spotify audit summaries

Acceptance:
- Spotify Connector card is defined
- Media Permissions card is defined
- Connector Audit card is defined
- developer setup hints are defined
- blocked states are displayed

Not Allowed:
- do not build unsafe live action buttons without review boundary
- do not hide missing scope warnings
- do not hide Premium-required warnings

Feature Markers:
- Spotify UI card
- Media Permissions card
- Connector Audit card
- developer setup hints
- missing scopes

### 20X — Manual workout logging stance + exclusion/deferred registry

Purpose:
- Lock workout logging through Carnos and prevent accidental connector sprawl.

Builds:
- manual workout logging through Carnos chat
- manual workout logging through Carnos voice later
- structured workout proposal
- exercise name
- sets
- reps
- weight
- duration
- cardio
- energy
- notes
- health/body compatibility
- custom tracker compatibility
- timeline compatibility
- analytics compatibility
- Echo excluded
- Garmin deferred
- Apple Health deferred
- Gmail deferred
- Google Calendar deferred
- Notion deferred
- GitHub deferred
- Slack deferred
- Discord deferred
- YouTube deferred
- LinkedIn deferred

Does:
- keeps workout logging manual through Carnos for now
- connects workout logs to custom trackers and health/body systems
- records voice as later route
- explicitly excludes Echo
- explicitly defers Garmin and other connectors

Acceptance:
- manual workout logging is recorded
- structured workout proposal fields are recorded
- Echo is excluded
- Garmin is deferred
- other future connectors are deferred

Not Allowed:
- do not build Garmin in Phase 20
- do not build Echo in Phase 20
- do not build all future connectors in Phase 20
- do not skip Carnos review-before-save

Feature Markers:
- manual workout logging through Carnos chat
- structured workout proposal
- Echo excluded
- Garmin deferred
- Apple Health deferred

### 20Y — /privacy dashboard view model + UI

Purpose:
- Upgrade /privacy into the visible Phase 20 command center.

Builds:
- /privacy dashboard view model
- Memory Inbox card
- Saved Memories card
- Forget card
- Export card
- Destructive Actions card
- Private Mode card
- Timed Private Mode display
- Emergency Lockdown card
- Sensitive Locks card
- Domain Privacy card
- Carnos Access card
- Privacy Review Queue card
- Audit Viewer card
- Data Retention card
- Redaction Controls card
- Privacy Badges display
- External API Connectors card
- Spotify Connector card
- Media Permissions card
- Connector Audit card
- all required states
- no unsafe runtime action

Does:
- turns Phase 20 contracts into UI-ready state
- shows all privacy and connector controls
- shows blocked, expired, missing scope, Premium-required, and no-active-device states
- avoids unsafe runtime actions

Acceptance:
- all required /privacy cards are present
- all required states are represented
- Spotify card is present
- connector cards are present
- no unsafe runtime action is introduced

Not Allowed:
- do not add fake live destructive actions
- do not add unsafe Spotify execution
- do not omit any locked card
- do not use hardcoded demo data as final state

Feature Markers:
- /privacy dashboard view model
- Memory Inbox card
- Spotify Connector card
- Media Permissions card
- Connector Audit card

### 20Z — Final Phase 20 proof + package check integration + completion

Purpose:
- Prove Phase 20 complete, safe, checked, committed, and ready for Phase 21.

Builds:
- Phase 20 final fixture
- Phase 20 final audit
- Phase 20 safety audit
- Phase 20 cross-phase audit
- no silent memory proof
- no silent export proof
- no Carnos destructive action proof
- no raw token exposure proof
- no Spotify silent action proof
- no private mode bypass proof
- package check integration
- completion report
- final commit/push

Does:
- verifies all Phase 20 features
- verifies cross-phase enforcement
- verifies package checks
- records completion proof
- locks Phase 20 before Phase 21

Acceptance:
- Phase 20 final audit passes
- safety audit passes
- cross-phase audit passes
- npm run check passes
- completion report exists
- commit and push complete

Not Allowed:
- do not declare Phase 20 complete without full check
- do not skip completion report
- do not start Phase 21 before Phase 20Z is committed

Feature Markers:
- Phase 20 final proof
- no silent memory proof
- no silent export proof
- no raw token exposure proof
- no Spotify silent action proof

## Cross-Phase Connections

- Phase 13.5E settings/privacy
- Phase 15 memory/private mode/do-not-remember
- Phase 15 forget/destructive derived-record boundaries
- Phase 16 current-info privacy retention
- Phase 16 source review/audit trail
- Phase 17 memory RAG privacy/sensitive/forget/destructive readiness
- Phase 18 analytics privacy audit
- Phase 19 custom tracker privacy/Carnos permissions
- Phase 19 repository/RLS/audit/ownership boundaries
- documents/evidence attachments
- dashboard cards
- Carnos context packs
- Spotify connector permissions
- external connector token boundaries

## Enforcement Requirements

- custom tracker privacy respects sensitive locks
- analytics respects private mode
- documents respect redaction/export boundaries
- memory RAG respects forget/private mode
- current-info sources respect privacy review
- Carnos respects access matrix
- dashboard cards respect hidden/locked states
- audit logs capture privacy actions
- source/evidence attachments respect redaction/export rules
- Spotify respects connector permissions/private mode/audit
- external connectors respect token boundaries/review/audit

## Spotify Account Connection Flow

1. Go to /privacy.
2. Open Spotify Connector card.
3. Click Connect Spotify.
4. ascendOS redirects user to Spotify.
5. User logs in to Spotify.
6. User approves requested permissions.
7. Spotify redirects back to ascendOS callback route.
8. ascendOS validates state and PKCE boundary.
9. ascendOS stores token boundary server-side.
10. ascendOS marks Spotify as connected.
11. Carnos can see connection status and allowed permissions.
12. Carnos cannot see raw tokens.

## Spotify Required User Setup

- Create Spotify Developer app.
- Copy SPOTIFY_CLIENT_ID.
- Set SPOTIFY_REDIRECT_URI.
- Use local redirect URI for development.
- Use production redirect URI later.

## Spotify Environment Boundary

- SPOTIFY_CLIENT_ID
- SPOTIFY_REDIRECT_URI
- SPOTIFY_CLIENT_SECRET optional future boundary

## Spotify Permissions

- spotify_read_playback
- spotify_modify_playback
- spotify_read_currently_playing
- spotify_read_recently_played
- spotify_read_playlists
- spotify_start_playlist
- spotify_pause_resume
- spotify_skip_track
- spotify_set_volume
- spotify_transfer_device
- spotify_add_to_queue
- spotify_read_devices

## Spotify Carnos Actions

- play focus playlist
- play workout playlist
- play deep work playlist
- play sleep playlist
- pause music
- resume music
- skip track
- set volume
- transfer playback device
- add song to queue
- read current track
- suggest playlist based on mode
- suggest playlist based on workout
- suggest playlist based on focus session

## Exclusions And Deferrals

- Amazon Echo/Alexa integration excluded
- Garmin integration deferred
- Apple Health full integration deferred
- Gmail connector deferred
- Google Calendar connector deferred
- Notion connector deferred
- GitHub connector deferred
- Slack connector deferred
- Discord connector deferred
- YouTube connector deferred
- LinkedIn connector deferred
- full commercial streaming replacement excluded
- uncontrolled Carnos external actions excluded
- silent token storage excluded
- silent memory writes excluded
- silent data export excluded
- silent destructive actions excluded
- final v1 polish/deployment/demo polish excluded because that is Phase 21

## Safety Guarantees

- No memory without user control.
- No sensitive data without locks.
- No export without explicit user action.
- No destructive action without explicit confirmation.
- No Carnos destructive action.
- No Carnos silent memory save.
- No Carnos connector action without permission.
- No raw token exposure.
- No private data leakage into dashboards.
- No private data leakage into analytics.
- No locked custom tracker exposure.
- No forgotten memory in Carnos context.
- No Spotify action without connector permission.
- No Spotify private-mode bypass.
- No connector scope change without audit.
- No audit log tampering.
- No privacy action without audit trail.
- No Spotify account connection without user OAuth.
- No Spotify token access by Carnos.
- No Spotify listening history memory without approval.

## Data Source Concepts

- memory_items
- memory_candidates
- audit_logs
- privacy_settings
- data_exports
- export_manifests
- privacy_action_requests
- sensitive_locks
- carnos_permissions
- redaction_rules
- retention_rules
- forget_destructive_manifests
- external_connectors
- connector_accounts
- connector_permissions
- connector_scopes
- connector_action_requests
- connector_action_manifests
- connector_audit_events
- spotify_connection_status
- spotify_scope_grants
- spotify_playback_snapshots
- spotify_device_snapshots
- spotify_action_proposals
- spotify_action_manifests
- spotify_action_audit_events
- custom_trackers
- custom_tracker_fields
- custom_tracker_entries
- dashboard_cards
- documents
- knowledge_items
- current_info_sources
- analytics_snapshots
- self_experiments
- timeline/events/tasks/proof

## 20A Acceptance

- Every Phase 20 feature is recorded.
- Every 20A-20Z build chunk is recorded.
- Every chunk records Purpose, Builds, Does, Acceptance, Not Allowed, and Feature Markers.
- Every Phase 20 total step is recorded.
- Spotify account connection flow is recorded.
- Spotify Developer App, redirect URI, and environment variable boundaries are recorded.
- Future API connector framework is recorded.
- Exclusions and deferred connectors are recorded.
- Cross-phase interconnections are recorded.
- Safety guarantees are recorded.
- Audit script fails if any required marker or chunk section is missing.


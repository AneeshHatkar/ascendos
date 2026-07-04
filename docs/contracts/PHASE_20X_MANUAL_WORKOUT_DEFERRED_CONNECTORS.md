# Phase 20X — Manual Workout Logging Stance + Exclusion / Deferred Registry

## Purpose

Lock manual workout logging as the active health/body logging stance for Phase 20 and define excluded or deferred connector boundaries so the app does not falsely imply Garmin, Echo, Alexa, wearable sync, automatic workout import, device APIs, or external health connectors exist before source, schema, provider, privacy, and review gates are satisfied.

## Schema Requirement

- Needs live database schema: false
- Reason: 20X defines stance and deferred connector registry contracts only. It does not create migrations, custom tracker tables, connector tables, wearable sync jobs, provider clients, imports, dashboard adapters, /privacy UI, Carnos tools, audit writes, or health data storage.
- Future schema gate: If a later chunk implements manual workout database entries, health connector accounts, wearable sync, imported workout records, device snapshots, health summaries, dashboard cards, audit writes, privacy settings, or Carnos health context, inspect exact schema before coding.

## Active Phase 20 Connector Position

- Active real connector: spotify
- Reason: Phase 20 expanded connector scope only covers the connector trust layer and Spotify as the first real connector. Health/wearable/voice-home connectors need separate source-of-truth, schema, provider, privacy, account, and action boundaries before implementation.

### Deferred Connectors
- garmin
- apple_health
- google_fit
- fitbit
- oura
- whoop
- strava

### Excluded Connectors For Phase 20
- echo
- alexa

## Manual Workout Logging Stance

- Status: manual_first
- Source phase: Phase 19 Custom Trackers plus Phase 20 Privacy Enforcement

- Manual workout logging remains the reliable default.
- Manual workout entries are user-entered records, not provider-imported records.
- Manual workout entries must use custom tracker ownership and privacy rules.
- Manual workout entries must respect sensitive domain locks when health/body locks apply.
- Manual workout entries must respect Private Mode.
- Manual workout entries must respect Emergency Lockdown.
- Manual workout entries must respect export scope selector rules.
- Manual workout entries must respect retention boundary rules.
- Manual workout entries must respect memory review rules.
- Manual workout entries must not imply wearable sync exists.
- Manual workout entries must not imply Garmin sync exists.
- Manual workout entries must not imply Apple Health sync exists.
- Manual workout entries must not imply Fitbit, Oura, Whoop, Google Fit, or Strava sync exists.

## Manual Workout Data Classes

### workout_session_manual
- Default privacy: private
- Default sensitivity: medium
- Export default: explicit_scope_or_health_export_selection
- Memory default: review_required
- Analytics default: allowed_only_under_health_privacy_rules

### exercise_set_manual
- Default privacy: private
- Default sensitivity: medium
- Export default: explicit_scope_or_health_export_selection
- Memory default: review_required
- Analytics default: allowed_only_under_health_privacy_rules

### body_measurement_manual
- Default privacy: private
- Default sensitivity: high
- Export default: explicit_scope_only
- Memory default: explicit_review_required
- Analytics default: blocked_or_redacted_by_default

### energy_mood_recovery_manual
- Default privacy: private
- Default sensitivity: high
- Export default: explicit_scope_only
- Memory default: explicit_review_required
- Analytics default: blocked_or_redacted_by_default

### imported_workout_future
- Default privacy: private
- Default sensitivity: high
- Export default: not_available_until_connector_exists
- Memory default: blocked_until_connector_review
- Analytics default: blocked_until_connector_review

## Deferred Connector Registry

### garmin
- Label: Garmin
- Phase 20 status: deferred
- Reason: Requires health connector source-of-truth, provider API review, account connection boundary, schema discovery, health data sensitivity model, and export/retention/memory gates before implementation.
- Allowed now:
  - show as deferred in planning docs
  - state that manual workout logging is current fallback
  - require future schema and provider review
- Not allowed now:
  - Garmin account connection
  - Garmin OAuth or API integration
  - Garmin workout import
  - Garmin device sync
  - Garmin dashboard card
  - Garmin Carnos context

### apple_health
- Label: Apple Health
- Phase 20 status: deferred
- Reason: Requires mobile/platform capability review, local device permission model, health data schema, and source-of-truth update before implementation.
- Allowed now:
  - show as deferred future connector
  - use manual tracker fallback
- Not allowed now:
  - Apple Health sync
  - HealthKit implementation
  - mobile permission flow
  - automatic workout import

### google_fit
- Label: Google Fit
- Phase 20 status: deferred
- Reason: Requires provider API, OAuth, health scope, schema, and compliance review before implementation.
- Allowed now:
  - show as deferred future connector
  - use manual tracker fallback
- Not allowed now:
  - Google Fit sync
  - Google Fit OAuth
  - automatic health import

### fitbit
- Label: Fitbit
- Phase 20 status: deferred
- Reason: Requires provider API, OAuth, account, schema, and health privacy review before implementation.
- Allowed now:
  - show as deferred future connector
  - use manual tracker fallback
- Not allowed now:
  - Fitbit sync
  - Fitbit account connection
  - automatic workout import

### oura
- Label: Oura
- Phase 20 status: deferred
- Reason: Requires provider API, token handling, sleep/recovery sensitivity model, schema, and privacy review before implementation.
- Allowed now:
  - show as deferred future connector
  - use manual tracker fallback
- Not allowed now:
  - Oura sync
  - Oura account connection
  - automatic sleep or recovery import

### whoop
- Label: Whoop
- Phase 20 status: deferred
- Reason: Requires provider API, account, schema, recovery data sensitivity model, and privacy review before implementation.
- Allowed now:
  - show as deferred future connector
  - use manual tracker fallback
- Not allowed now:
  - Whoop sync
  - Whoop account connection
  - automatic recovery import

### strava
- Label: Strava
- Phase 20 status: deferred
- Reason: Requires provider API, OAuth, activity privacy model, location sensitivity review, schema, and export/memory rules before implementation.
- Allowed now:
  - show as deferred future connector
  - use manual tracker fallback
- Not allowed now:
  - Strava sync
  - Strava OAuth
  - automatic activity import
  - location route import

### echo_alexa
- Label: Echo / Alexa
- Phase 20 status: excluded
- Reason: Voice-home assistant connector is not in Phase 20 runtime scope and would require separate voice privacy, microphone, home device, account, skill/action, and provider policy work.
- Allowed now:
  - show as excluded from Phase 20
  - defer to future voice/home connector planning only if source-of-truth is updated
- Not allowed now:
  - Echo account connection
  - Alexa skill integration
  - microphone/home device actions
  - home automation action proposals
  - Carnos voice-home runtime

## Privacy Application Rules

- Manual workout logs are private by default.
- Health/body logs can be high sensitivity when they include body measurements, recovery, injury, symptoms, mood, or health notes.
- Sensitive domain locks apply to health/body records.
- Private Mode blocks automatic memory creation from health/body records.
- Emergency Lockdown blocks broad health/body summaries.
- Exports must use explicit health/body scope selection.
- Retention rules must apply to health/body records.
- Audit viewer must show safe summaries only.
- Carnos must respect health/body privacy settings.
- Carnos cannot infer medical conditions from workout logs.
- Carnos cannot fabricate provider-imported workout history.
- Carnos cannot claim a deferred connector is connected.

## UI Stance Rules Future

- The app may show Manual Workout Logging as active.
- The app may show Garmin as deferred.
- The app may show Echo or Alexa as excluded from Phase 20.
- The app may show future connector badges.
- The app must not show Connect Garmin as a working action until source, schema, provider, and privacy gates exist.
- The app must not show Connect Echo or Connect Alexa in Phase 20.
- The app must not show imported workout data unless import exists.
- The app must distinguish manual entries from future imported entries.
- The app must show schema required for runtime when future connector integration is requested.
- The app must show privacy review required for health connector activation.

## Carnos Rules

- Carnos can help the user manually log workouts.
- Carnos can summarize manual workout logs only when privacy settings allow.
- Carnos can propose tracker templates only through Phase 19 custom tracker rules.
- Carnos cannot claim Garmin is connected.
- Carnos cannot claim Apple Health is connected.
- Carnos cannot claim Google Fit is connected.
- Carnos cannot claim Fitbit, Oura, Whoop, or Strava are connected.
- Carnos cannot claim Echo or Alexa are available in Phase 20.
- Carnos cannot invent imported workout records.
- Carnos cannot infer medical conditions from workout logs.
- Carnos cannot bypass health/body sensitive locks.
- Carnos cannot bypass Private Mode.
- Carnos cannot bypass Emergency Lockdown.
- Carnos cannot turn a manual entry into imported proof.

## Export And Memory Rules

- Manual workout records can be included only by selected health/body export scope.
- Manual workout records must show source as manual.
- Future imported workout records must show provider source.
- Deferred connector data is not exportable because it does not exist.
- Excluded connector data is not exportable because it does not exist.
- Manual workout memory candidates require review.
- Body measurement memory candidates require explicit review.
- Mood/recovery memory candidates require explicit review.
- Carnos cannot save health/body memory during Private Mode.
- Carnos cannot save imported connector memory before connector exists.

## Audit Events Required

- manual_workout_stance_locked
- manual_workout_privacy_boundary_applied
- manual_workout_export_scope_required
- manual_workout_memory_review_required
- deferred_connector_registry_viewed
- deferred_connector_requested
- deferred_connector_blocked
- excluded_connector_requested
- excluded_connector_blocked
- garmin_deferred_boundary_shown
- echo_alexa_excluded_boundary_shown
- health_connector_schema_required
- health_connector_provider_review_required
- carnos_manual_workout_summary_allowed
- carnos_manual_workout_summary_blocked
- carnos_imported_workout_claim_blocked
- private_mode_health_summary_blocked
- emergency_lockdown_health_summary_blocked

## Blocked Reasons

- manual_workout_schema_required_for_runtime
- health_body_sensitive_lock_active
- private_mode_active
- emergency_lockdown_active
- health_export_scope_required
- memory_review_required
- body_measurement_high_sensitivity
- recovery_mood_high_sensitivity
- connector_deferred
- connector_excluded
- garmin_deferred
- apple_health_deferred
- google_fit_deferred
- fitbit_deferred
- oura_deferred
- whoop_deferred
- strava_deferred
- echo_alexa_excluded
- provider_review_required
- schema_discovery_required
- source_of_truth_update_required
- carnos_imported_workout_claim_blocked

## Badge Requirements

- Manual Logging Active
- Manual Source
- Health Private
- Health Sensitive
- Body Measurement Sensitive
- Recovery Sensitive
- Export Scope Required
- Memory Review Required
- Private Mode Blocked
- Emergency Lockdown Blocked
- Connector Deferred
- Connector Excluded
- Garmin Deferred
- Echo Alexa Excluded
- Provider Review Required
- Schema Required For Runtime
- Source Update Required
- Imported Data Not Available
- Carnos Restricted

## Must Not Do

- do not create migrations in 20X
- do not invent health connector schema in 20X
- do not implement Garmin in 20X
- do not implement Apple Health in 20X
- do not implement Google Fit in 20X
- do not implement Fitbit in 20X
- do not implement Oura in 20X
- do not implement Whoop in 20X
- do not implement Strava in 20X
- do not implement Echo or Alexa in 20X
- do not implement wearable sync in 20X
- do not implement automatic workout imports in 20X
- do not implement health provider API clients in 20X
- do not implement dashboard adapters in 20X
- do not implement database reads in 20X
- do not implement database writes in 20X
- do not let Carnos claim deferred connectors are connected
- do not let Carnos invent imported workout records
- do not let manual workout logs bypass privacy rules

## Acceptance

- Manual workout logging stance is defined.
- Active connector position is defined.
- Deferred connector registry is defined.
- Excluded connector boundary is defined.
- Manual workout data classes are defined.
- Privacy application rules are defined.
- Future UI stance rules are defined.
- Carnos rules are defined.
- Export and memory rules are defined.
- Audit events are defined.
- Blocked reasons are defined.
- Badge requirements are defined.
- No schema gate is explicit.
- No fake connector implementation is explicit.
- No automatic workout import is explicit.
- 20X audit passes.
- Full project check passes.

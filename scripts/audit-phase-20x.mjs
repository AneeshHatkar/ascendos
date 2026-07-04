import { existsSync, readFileSync } from "node:fs";

const contractPath = "docs/contracts/PHASE_20X_MANUAL_WORKOUT_DEFERRED_CONNECTORS.md";
const fixturePath = "docs/fixtures/phase20-privacy-export/phase20x_manual_workout_deferred_connectors_fixture.json";
const reportPath = "docs/phase-reports/PHASE_20X_MANUAL_WORKOUT_DEFERRED_CONNECTORS_REPORT.md";

function read(path) {
  if (!existsSync(path)) throw new Error(path + " missing");
  return readFileSync(path, "utf8");
}

const contract = read(contractPath);
const fixture = JSON.parse(read(fixturePath));
read(reportPath);

const required = [
  "Manual Workout Logging Stance + Exclusion / Deferred Registry",
  "Needs live database schema: false",
  "Active Phase 20 Connector Position",
  "Active real connector: spotify",
  "garmin",
  "apple_health",
  "google_fit",
  "fitbit",
  "oura",
  "whoop",
  "strava",
  "echo",
  "alexa",
  "Manual Workout Logging Stance",
  "manual_first",
  "Manual workout logging remains the reliable default.",
  "Manual workout entries are user-entered records, not provider-imported records.",
  "Manual workout entries must use custom tracker ownership and privacy rules.",
  "Manual workout entries must not imply wearable sync exists.",
  "Manual Workout Data Classes",
  "workout_session_manual",
  "exercise_set_manual",
  "body_measurement_manual",
  "energy_mood_recovery_manual",
  "imported_workout_future",
  "Deferred Connector Registry",
  "Garmin",
  "Apple Health",
  "Google Fit",
  "Fitbit",
  "Oura",
  "Whoop",
  "Strava",
  "Echo / Alexa",
  "Phase 20 status: deferred",
  "Phase 20 status: excluded",
  "Garmin account connection",
  "Echo account connection",
  "Privacy Application Rules",
  "Manual workout logs are private by default.",
  "Sensitive domain locks apply to health/body records.",
  "Carnos cannot infer medical conditions from workout logs.",
  "Carnos cannot fabricate provider-imported workout history.",
  "UI Stance Rules Future",
  "The app may show Manual Workout Logging as active.",
  "The app may show Garmin as deferred.",
  "The app may show Echo or Alexa as excluded from Phase 20.",
  "The app must distinguish manual entries from future imported entries.",
  "Carnos Rules",
  "Carnos can help the user manually log workouts.",
  "Carnos cannot claim Garmin is connected.",
  "Carnos cannot claim Echo or Alexa are available in Phase 20.",
  "Carnos cannot invent imported workout records.",
  "Export And Memory Rules",
  "Manual workout records must show source as manual.",
  "Deferred connector data is not exportable because it does not exist.",
  "Manual workout memory candidates require review.",
  "Audit Events Required",
  "manual_workout_stance_locked",
  "deferred_connector_requested",
  "excluded_connector_blocked",
  "garmin_deferred_boundary_shown",
  "echo_alexa_excluded_boundary_shown",
  "carnos_imported_workout_claim_blocked",
  "Blocked Reasons",
  "connector_deferred",
  "connector_excluded",
  "garmin_deferred",
  "echo_alexa_excluded",
  "schema_discovery_required",
  "source_of_truth_update_required",
  "Badge Requirements",
  "Manual Logging Active",
  "Connector Deferred",
  "Connector Excluded",
  "Garmin Deferred",
  "Echo Alexa Excluded",
  "Schema Required For Runtime",
  "Imported Data Not Available",
  "Must Not Do",
  "do not create migrations in 20X",
  "do not invent health connector schema in 20X",
  "do not implement Garmin in 20X",
  "do not implement Echo or Alexa in 20X",
  "do not implement wearable sync in 20X",
  "do not implement automatic workout imports in 20X",
  "do not let Carnos claim deferred connectors are connected",
  "do not let Carnos invent imported workout records",
  "Acceptance",
];

const missing = required.filter(marker => !contract.includes(marker));
if (fixture.schema_requirement.needs_live_database_schema !== false) missing.push("schema requirement should be false");
if (fixture.active_phase20_connector_position.deferred_connectors.length < 7) missing.push("deferred connectors incomplete");
if (fixture.active_phase20_connector_position.excluded_connectors_for_phase20.length < 2) missing.push("excluded connectors incomplete");
if (fixture.manual_workout_logging_stance.stance_rules.length < 12) missing.push("manual workout stance rules incomplete");
if (fixture.manual_workout_data_classes.length < 5) missing.push("manual workout data classes incomplete");
if (fixture.deferred_connector_registry.length < 8) missing.push("deferred connector registry incomplete");
if (fixture.privacy_application_rules.length < 12) missing.push("privacy rules incomplete");
if (fixture.ui_stance_rules_future.length < 10) missing.push("UI stance rules incomplete");
if (fixture.carnos_rules.length < 14) missing.push("Carnos rules incomplete");
if (fixture.export_and_memory_rules.length < 10) missing.push("export and memory rules incomplete");
if (fixture.audit_events_required.length < 17) missing.push("audit events incomplete");
if (fixture.blocked_reasons.length < 21) missing.push("blocked reasons incomplete");
if (fixture.badge_requirements.length < 18) missing.push("badge requirements incomplete");
if (fixture.must_not_do.length < 18) missing.push("must-not-do rules incomplete");

if (missing.length > 0) {
  console.error("Phase 20X audit failed. Missing or incomplete items:");
  for (const item of missing) console.error("- " + item);
  process.exit(1);
}

console.log("✓ Phase 20X manual workout and deferred connector audit passed.");
console.log("✓ Manual workout stance, deferred Garmin and health connectors, excluded Echo/Alexa, privacy rules, Carnos limits, badges, and schema gates are locked.");

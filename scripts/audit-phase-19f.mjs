import { existsSync, readFileSync } from "node:fs";

function fail(message) {
  console.error("✗ " + message);
  process.exit(1);
}

function pass(message) {
  console.log("✓ " + message);
}

function read(path) {
  if (!existsSync(path)) fail("Missing " + path);
  pass("Found " + path);
  return readFileSync(path, "utf8");
}

function includes(label, text, marker) {
  if (!text.includes(marker)) fail(label + " missing marker: " + marker);
  pass(label + " includes " + marker);
}

function excludes(label, text, marker) {
  if (text.includes(marker)) fail(label + " contains forbidden marker: " + marker);
  pass(label + " excludes forbidden marker: " + marker);
}

console.log("=== PHASE 19F TEMPLATES FREQUENCY SEMANTICS AUDIT ===");

const implementation = read("src/lib/custom-trackers/template-frequency-semantics.ts");
const index = read("src/lib/custom-trackers/index.ts");
const contract = read("docs/contracts/PHASE_19F_TEMPLATES_FREQUENCY_SEMANTICS.md");
const checklist = read("docs/qa/PHASE_19F_TEMPLATES_FREQUENCY_SEMANTICS_CHECKLIST.md");
const report = read("docs/phase-reports/PHASE_19F_TEMPLATES_FREQUENCY_SEMANTICS_REPORT.md");
const fixtureText = read("docs/fixtures/phase19-custom-trackers/phase19f_templates_frequency_semantics_fixture.json");
const pkgText = read("package.json");

let fixture;
try {
  fixture = JSON.parse(fixtureText);
  pass("fixture JSON parses");
} catch {
  fail("fixture JSON does not parse");
}

if (fixture.phase !== "19F") fail("fixture phase is not 19F");
if (fixture.status !== "complete") fail("fixture status is not complete");
pass("fixture phase/status is 19F complete");

for (const marker of [
  "CustomTrackerTemplateCategory",
  "CustomTrackerFrequencyKind",
  "CustomTrackerMissedEntryPolicy",
  "CustomTrackerReadinessStatus",
  "CustomTrackerTemplateField",
  "CustomTrackerTemplate",
  "CustomTrackerFrequencyRule",
  "CustomTrackerVisibilityPreference",
  "CustomTrackerTemplateCreationContract",
  "CustomTrackerSetupCompletenessInput",
  "CustomTrackerReadinessScore",
  "CustomTrackerTemplateLibrarySummary",
  "PHASE_19F_TEMPLATE_FREQUENCY_BOUNDARY",
  "CUSTOM_TRACKER_TEMPLATE_CATEGORIES",
  "CUSTOM_TRACKER_FREQUENCY_KINDS",
  "CUSTOM_TRACKER_MISSED_ENTRY_POLICIES",
  "CUSTOM_TRACKER_TEMPLATE_LIBRARY",
  "isKnownCustomTrackerTemplateKey",
  "getCustomTrackerTemplate",
  "validateCustomTrackerFrequencyRule",
  "buildCustomTrackerFrequencyRuleFromTemplate",
  "buildCustomTrackerFromTemplateContract",
  "validateCustomTrackerTemplate",
  "scoreCustomTrackerSetupCompleteness",
  "summarizeCustomTrackerTemplateLibrary"
]) includes("implementation", implementation, marker);

for (const marker of [
  "templateLibraryEnabled: true",
  "frequencyRulesEnabled: true",
  "streakSemanticsEnabled: true",
  "trackerQualityScoreEnabled: true",
  "runtimeWritesEnabled: false",
  "schemaMigrationEnabled: false",
  "carnosRuntimeEnabled: false",
  "fakeTemplateEntriesAllowed: false",
  "daily_gym_training",
  "job_application_pipeline",
  "research_reading_log",
  "life_admin_renewal_tracker",
  "daily",
  "weekly",
  "monthly",
  "custom_interval",
  "on_demand",
  "break_streak",
  "carry_forward",
  "requiresReviewBeforeWrite: true",
  "on-demand trackers cannot enable streaks",
  "custom interval days is required for custom interval frequency",
  "analyticsReady",
  "privacyReady",
  "dashboardPlacementReady"
]) includes("implementation validation coverage", implementation, marker);

includes("index", index, "export * from \"./template-frequency-semantics\"");

for (const marker of [
  "Tracker template library",
  "Template-based tracker creation contract",
  "Template categories and domains",
  "Frequency rules",
  "Daily, weekly, monthly, custom interval, and on-demand frequency semantics",
  "Target count per period",
  "Streak enabled/disabled boundary",
  "Missed-entry policy",
  "Favorite tracker boundary",
  "Pinned tracker boundary",
  "Repeat-last-entry support boundary",
  "Tracker setup completeness checks",
  "Tracker quality/readiness score",
  "Analytics-ready status",
  "Privacy-ready status",
  "Dashboard-placement-ready status",
  "No SQL schema migration is added in 19F",
  "No runtime database read or write is added in 19F"
]) includes("contract", contract, marker);

for (const marker of [
  "Tracker template library exists",
  "Template-based tracker creation contract exists",
  "Template categories/domains exist",
  "Frequency rule validation exists",
  "Daily/weekly/monthly/custom/on-demand semantics exist",
  "Target count per period exists",
  "Streak enabled/disabled boundary exists",
  "Missed-entry policy exists",
  "Favorite tracker boundary exists",
  "Pinned tracker boundary exists",
  "Repeat-last-entry support boundary exists",
  "Setup completeness checks exist",
  "Tracker quality/readiness score exists",
  "Analytics-ready status exists",
  "Privacy-ready status exists",
  "Dashboard-placement-ready status exists",
  "No SQL migration is added",
  "No runtime database read/write is added",
  "npm run audit:phase19f",
  "npm run check"
]) includes("checklist", checklist, marker);

for (const marker of [
  "Phase 19F adds deterministic local template and frequency semantics",
  "Template creation remains a contract and does not write data",
  "Streaks are blocked for on-demand trackers",
  "Tracker readiness scoring exposes missing setup items",
  "Analytics, privacy, and dashboard readiness are reported separately",
  "No SQL migration was added",
  "No runtime database call was added",
  "No Carnos write behavior was added"
]) includes("report", report, marker);

for (const marker of [
  "tracker_template_library",
  "template_based_tracker_creation_contract",
  "template_categories_domains",
  "frequency_rules",
  "daily_weekly_monthly_custom_on_demand_frequency_semantics",
  "target_count_per_period",
  "streak_enabled_disabled_boundary",
  "missed_entry_policy",
  "favorite_tracker_boundary",
  "pinned_tracker_boundary",
  "repeat_last_entry_support_boundary",
  "tracker_setup_completeness_checks",
  "tracker_quality_readiness_score",
  "analytics_ready_status",
  "privacy_ready_status",
  "dashboard_placement_ready_status"
]) includes("fixture", fixtureText, marker);

includes("package.json", pkgText, "audit:phase19f");
includes("package.json", pkgText, "scripts/audit-phase-19f.mjs");

for (const marker of [
  "createSupabaseServerClient",
  ".from(",
  "insert(",
  "update(",
  "delete(",
  "upsert(",
  "fetch(",
  "generateText",
  "streamText",
  "openai",
  "OpenAI",
  "vector(",
  "embedding vector",
  "navigator.mediaDevices",
  "setInterval(",
  "setTimeout(",
  "speechSynthesis",
  "executeApprovedAction"
]) {
  excludes("implementation", implementation, marker);
}

console.log("✓ Phase 19F templates frequency semantics audit passed.");

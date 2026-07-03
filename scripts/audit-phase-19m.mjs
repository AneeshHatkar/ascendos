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

console.log("=== PHASE 19M CUSTOM TRACKER DASHBOARD UI AUDIT ===");

const viewModel = read("src/lib/custom-trackers/custom-trackers-dashboard-view-model.ts");
const ui = read("src/components/custom-trackers/custom-trackers-dashboard-ui.tsx");
const route = read("src/app/custom-trackers/page.tsx");
const index = read("src/lib/custom-trackers/index.ts");
const contract = read("docs/contracts/PHASE_19M_CUSTOM_TRACKER_DASHBOARD_UI.md");
const checklist = read("docs/qa/PHASE_19M_CUSTOM_TRACKER_DASHBOARD_UI_CHECKLIST.md");
const report = read("docs/phase-reports/PHASE_19M_CUSTOM_TRACKER_DASHBOARD_UI_REPORT.md");
const fixtureText = read("docs/fixtures/phase19-custom-trackers/phase19m_custom_tracker_dashboard_ui_fixture.json");
const pkgText = read("package.json");

let fixture;
try {
  fixture = JSON.parse(fixtureText);
  pass("fixture JSON parses");
} catch {
  fail("fixture JSON does not parse");
}

if (fixture.phase !== "19M") fail("fixture phase is not 19M");
if (fixture.status !== "complete") fail("fixture status is not complete");
if (fixture.route !== "/custom-trackers") fail("fixture route is not /custom-trackers");
pass("fixture phase/status/route is 19M complete");

for (const marker of [
  "CustomTrackerDashboardViewModelStatus",
  "CustomTrackerDashboardCardKey",
  "CustomTrackerDashboardPrimaryAction",
  "CustomTrackerDashboardActionState",
  "CustomTrackerDashboardCardViewModel",
  "CustomTrackerDashboardTemplateSuggestion",
  "CustomTrackerDashboardStateMessage",
  "CustomTrackerDashboardBoundaryDisclosures",
  "CustomTrackerDashboardViewModel",
  "BuildCustomTrackerDashboardViewModelInput",
  "CustomTrackerDashboardViewModelSummary",
  "PHASE_19M_CUSTOM_TRACKER_DASHBOARD_BOUNDARY",
  "CUSTOM_TRACKER_DASHBOARD_CARD_KEYS",
  "CUSTOM_TRACKER_DASHBOARD_PRIMARY_ACTIONS",
  "CUSTOM_TRACKER_DASHBOARD_TEMPLATE_SUGGESTIONS",
  "buildCustomTrackerDashboardCards",
  "resolveCustomTrackerDashboardStatus",
  "buildCustomTrackerDashboardStateMessage",
  "buildCustomTrackersDashboardViewModel",
  "summarizeCustomTrackerDashboardViewModelBoundary"
]) includes("view model", viewModel, marker);

for (const marker of [
  "customTrackerRouteEnabled: true",
  "dashboardViewModelEnabled: true",
  "dashboardUiEnabled: true",
  "emptyStateEnabled: true",
  "templateSuggestionEmptyStateEnabled: true",
  "loadingStateEnabled: true",
  "errorStateEnabled: true",
  "privacyRestrictedStateEnabled: true",
  "reviewRequiredStateEnabled: true",
  "trackerSchemaCardEnabled: true",
  "fieldsCardEnabled: true",
  "entriesCardEnabled: true",
  "dashboardTargetCardEnabled: true",
  "frequencyCardEnabled: true",
  "aiMappingCardEnabled: true",
  "primaryActionsRepresented: true",
  "quickLogBoundaryRepresented: true",
  "noHardcodedDemoData: true",
  "noFakeTrackerEntries: true",
  "noFakeDashboardCards: true",
  "noFakeAiMappings: true",
  "runtimeDatabaseReadsEnabled: false",
  "runtimeDatabaseWritesEnabled: false",
  "schemaMigrationEnabled: false",
  "modelCallsEnabled: false",
  "networkCallsEnabled: false",
  "noSilentAiWrites: true"
]) includes("view model validation coverage", viewModel, marker);

for (const marker of [
  "Tracker Schema",
  "Fields",
  "Entries",
  "Dashboard Target",
  "Frequency",
  "AI Mapping",
  "No custom trackers yet",
  "Loading custom trackers",
  "Custom trackers could not be prepared",
  "Privacy restricted",
  "Review required",
  "No fake tracker entries",
  "No fake dashboard cards",
  "No fake AI mappings",
  "No runtime database reads",
  "No runtime database writes",
  "Review before write required",
  "Template suggestions",
  "Primary actions",
  "disabled"
]) includes("UI", ui, marker);

for (const marker of [
  "buildCustomTrackersDashboardViewModel",
  "CustomTrackersDashboardUi",
  "/custom-trackers",
  "No runtime database reads or writes"
]) includes("route", route, marker);

includes("index", index, "export * from \"./custom-trackers-dashboard-view-model\"");

for (const marker of [
  "Custom Tracker Dashboard at /custom-trackers",
  "Custom tracker dashboard view model",
  "Custom tracker dashboard UI component",
  "Tracker Schema card",
  "Fields card",
  "Entries card",
  "Dashboard Target card",
  "Frequency card",
  "AI Mapping card",
  "Primary actions: create tracker, add field, log entry, map AI extraction, place card",
  "Quick-log readiness boundary",
  "Empty state for no trackers",
  "Empty state with template suggestions",
  "Loading state",
  "Error state",
  "Privacy-restricted state",
  "Review-required state",
  "No hardcoded demo data as final state",
  "No fake tracker entries",
  "No fake dashboard cards",
  "No fake AI mappings",
  "No SQL schema migration is added in 19M",
  "No runtime database read or write is added in 19M"
]) includes("contract", contract, marker);

for (const marker of [
  "/custom-trackers route exists",
  "Custom tracker dashboard view model exists",
  "Custom tracker dashboard UI component exists",
  "Tracker Schema card exists",
  "Fields card exists",
  "Entries card exists",
  "Dashboard Target card exists",
  "Frequency card exists",
  "AI Mapping card exists",
  "Primary actions are represented",
  "Quick-log readiness boundary exists",
  "Empty state exists",
  "Empty state with template suggestions exists",
  "Loading state exists",
  "Error state exists",
  "Privacy-restricted state exists",
  "Review-required state exists",
  "No hardcoded demo data boundary exists",
  "No fake tracker entries boundary exists",
  "No fake dashboard cards boundary exists",
  "No fake AI mappings boundary exists",
  "No SQL migration is added",
  "No runtime database read/write is added",
  "npm run audit:phase19m",
  "npm run check"
]) includes("checklist", checklist, marker);

for (const marker of [
  "Phase 19M adds the /custom-trackers dashboard route",
  "The route /custom-trackers exists",
  "The dashboard view model provides safe state messages",
  "The UI renders Tracker Schema, Fields, Entries, Dashboard Target, Frequency, and AI Mapping cards",
  "Empty, loading, error, privacy-restricted, and review-required states are represented",
  "Template suggestions are preview-only",
  "Primary actions are disabled boundaries",
  "No hardcoded demo tracker entries were added",
  "No fake dashboard cards were added",
  "No fake AI mappings were added",
  "No SQL migration was added",
  "No runtime database call was added",
  "No Carnos write behavior was added"
]) includes("report", report, marker);

for (const marker of [
  "custom_tracker_dashboard_route",
  "custom_tracker_dashboard_view_model",
  "custom_tracker_dashboard_ui_component",
  "tracker_schema_card",
  "fields_card",
  "entries_card",
  "dashboard_target_card",
  "frequency_card",
  "ai_mapping_card",
  "primary_actions_represented",
  "quick_log_readiness_boundary",
  "empty_state",
  "empty_state_with_template_suggestions",
  "loading_state",
  "error_state",
  "privacy_restricted_state",
  "review_required_state",
  "no_hardcoded_demo_data_boundary",
  "no_fake_tracker_entries_boundary",
  "no_fake_dashboard_cards_boundary",
  "no_fake_ai_mappings_boundary"
]) includes("fixture", fixtureText, marker);

includes("package.json", pkgText, "audit:phase19m");
includes("package.json", pkgText, "scripts/audit-phase-19m.mjs");

const implementation = viewModel + "\n" + ui + "\n" + route;
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
]) excludes("implementation", implementation, marker);

console.log("✓ Phase 19M custom tracker dashboard UI audit passed.");

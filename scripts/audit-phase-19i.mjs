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

console.log("=== PHASE 19I DASHBOARD PLACEMENT RULES AUDIT ===");

const implementation = read("src/lib/custom-trackers/dashboard-placement-rules.ts");
const index = read("src/lib/custom-trackers/index.ts");
const contract = read("docs/contracts/PHASE_19I_DASHBOARD_PLACEMENT_RULES.md");
const checklist = read("docs/qa/PHASE_19I_DASHBOARD_PLACEMENT_RULES_CHECKLIST.md");
const report = read("docs/phase-reports/PHASE_19I_DASHBOARD_PLACEMENT_RULES_REPORT.md");
const fixtureText = read("docs/fixtures/phase19-custom-trackers/phase19i_dashboard_placement_rules_fixture.json");
const pkgText = read("package.json");

let fixture;
try {
  fixture = JSON.parse(fixtureText);
  pass("fixture JSON parses");
} catch {
  fail("fixture JSON does not parse");
}

if (fixture.phase !== "19I") fail("fixture phase is not 19I");
if (fixture.status !== "complete") fail("fixture status is not complete");
pass("fixture phase/status is 19I complete");

for (const marker of [
  "CustomTrackerDashboardTarget",
  "CustomTrackerDashboardCardSize",
  "CustomTrackerDashboardCardVisibility",
  "CustomTrackerDashboardPlacementStatus",
  "CustomTrackerDashboardQuickLogMode",
  "CustomTrackerCrossDomainLinkKind",
  "CustomTrackerDashboardPlacementPolicy",
  "CustomTrackerDashboardPlacementInput",
  "CustomTrackerDashboardPlacementDecision",
  "CustomTrackerDashboardCardContract",
  "CustomTrackerCrossDomainLink",
  "CustomTrackerDashboardPlacementReadiness",
  "CustomTrackerDashboardPlacementSummary",
  "PHASE_19I_DASHBOARD_PLACEMENT_BOUNDARY",
  "CUSTOM_TRACKER_DASHBOARD_TARGETS",
  "CUSTOM_TRACKER_DASHBOARD_CARD_SIZES",
  "CUSTOM_TRACKER_DASHBOARD_QUICK_LOG_MODES",
  "CUSTOM_TRACKER_DASHBOARD_PLACEMENT_POLICIES",
  "isKnownCustomTrackerDashboardTarget",
  "getCustomTrackerDashboardPlacementPolicy",
  "mapCustomTrackerDashboardTargetToExposureSurface",
  "isBroadCustomTrackerDashboardTarget",
  "isNativeCustomTrackerDomainPlacement",
  "evaluateCustomTrackerDashboardPlacement",
  "determineCustomTrackerQuickLogMode",
  "buildCustomTrackerDashboardCardContract",
  "buildCustomTrackerCrossDomainLink",
  "validateCustomTrackerDashboardPlacementReadiness",
  "summarizeCustomTrackerDashboardPlacementBoundary"
]) includes("implementation", implementation, marker);

for (const marker of [
  "dashboardPlacementRulesEnabled: true",
  "dashboardTargetSelectionEnabled: true",
  "phase19GPrivacyRulesRequired: true",
  "commandDashboardSupportEnabled: true",
  "domainDashboardSupportEnabled: true",
  "miniSummaryBoundaryEnabled: true",
  "quickLogBoundaryEnabled: true",
  "crossDomainLinkageEnabled: true",
  "noFakeDashboardCards: true",
  "noSensitiveTrackerLeakageOntoBroadDashboards: true",
  "runtimeWritesEnabled: false",
  "runtimeDashboardReadsEnabled: false",
  "schemaMigrationEnabled: false",
  "uiRouteChanged: false",
  "restricted tracker dashboard placement is blocked",
  "sensitive tracker broad dashboard placement requires review",
  "sensitive tracker cannot link to Command dashboard without review",
  "fakeDashboardCardAllowed: false",
  "runtimeDataReadEnabled: false"
]) includes("implementation validation coverage", implementation, marker);

includes("index", index, "export * from \"./dashboard-placement-rules\"");

for (const marker of [
  "Dashboard card placement contract",
  "Dashboard target selection",
  "Dashboard placement privacy rules using Phase 19G",
  "Dashboard card priority, size, and visibility boundary",
  "Custom tracker card support on domain dashboards",
  "Custom tracker card support on Command dashboard where allowed",
  "Custom tracker card mini-summary boundary",
  "Custom tracker card quick-log boundary",
  "Sensitive tracker dashboard exposure protection",
  "Cross-domain linkage",
  "Dashboard placement readiness result",
  "No fake dashboard cards",
  "No sensitive tracker leakage onto broad dashboards",
  "No SQL schema migration is added in 19I",
  "No runtime database read or write is added in 19I"
]) includes("contract", contract, marker);

for (const marker of [
  "Dashboard card placement contract exists",
  "Dashboard target selection exists",
  "Dashboard placement privacy rules using Phase 19G exist",
  "Dashboard card priority, size, and visibility boundary exists",
  "Custom tracker card support on domain dashboards exists",
  "Custom tracker card support on Command dashboard exists where allowed",
  "Custom tracker card mini-summary boundary exists",
  "Custom tracker card quick-log boundary exists",
  "Sensitive tracker dashboard exposure protection exists",
  "Cross-domain linkage exists",
  "Dashboard placement readiness result exists",
  "No fake dashboard cards boundary exists",
  "No sensitive tracker leakage onto broad dashboards boundary exists",
  "No SQL migration is added",
  "No runtime database read/write is added",
  "npm run audit:phase19i",
  "npm run check"
]) includes("checklist", checklist, marker);

for (const marker of [
  "Phase 19I adds deterministic local dashboard placement rules",
  "Command dashboard placement is privacy gated",
  "Domain dashboard placement supports native and reviewed cross-domain links",
  "Sensitive tracker broad dashboard exposure is blocked or review-gated",
  "Quick-log and mini-summary behavior are boundary-only and do not read data",
  "Dashboard card contracts explicitly disable fake dashboard cards",
  "Dashboard card contracts explicitly disable runtime dashboard reads",
  "No SQL migration was added",
  "No runtime database call was added",
  "No UI behavior was changed"
]) includes("report", report, marker);

for (const marker of [
  "dashboard_card_placement_contract",
  "dashboard_target_selection",
  "dashboard_placement_privacy_rules_using_phase19g",
  "dashboard_card_priority_size_visibility_boundary",
  "custom_tracker_card_support_on_domain_dashboards",
  "custom_tracker_card_support_on_command_dashboard_where_allowed",
  "custom_tracker_card_mini_summary_boundary",
  "custom_tracker_card_quick_log_boundary",
  "sensitive_tracker_dashboard_exposure_protection",
  "cross_domain_linkage",
  "dashboard_placement_readiness_result",
  "no_fake_dashboard_cards",
  "no_sensitive_tracker_leakage_onto_broad_dashboards"
]) includes("fixture", fixtureText, marker);

includes("package.json", pkgText, "audit:phase19i");
includes("package.json", pkgText, "scripts/audit-phase-19i.mjs");

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

console.log("✓ Phase 19I dashboard placement rules audit passed.");

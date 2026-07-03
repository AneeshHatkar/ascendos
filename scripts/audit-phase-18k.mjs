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

console.log("\n=== PHASE 18K ANALYTICS DASHBOARD UI AUDIT ===");

const viewModel = read("src/lib/analytics-experiments/analytics-dashboard-view-model.ts");
const component = read("src/components/analytics-experiments/analytics-dashboard-ui.tsx");
const page = read("src/app/analytics/page.tsx");
const index = read("src/lib/analytics-experiments/index.ts");
const contract = read("docs/contracts/PHASE_18K_ANALYTICS_DASHBOARD_UI.md");
const checklist = read("docs/qa/PHASE_18K_ANALYTICS_DASHBOARD_UI_SMOKE_CHECKLIST.md");
const report = read("docs/phase-reports/PHASE_18K_ANALYTICS_DASHBOARD_UI_REPORT.md");
const fixtureText = read("docs/fixtures/phase18-analytics-experiments/phase18k_analytics_dashboard_ui_fixture.json");
const pkg = read("package.json");

let fixture;
try {
  fixture = JSON.parse(fixtureText);
  pass("fixture JSON parses");
} catch (error) {
  fail("fixture JSON does not parse: " + error.message);
}

if (fixture.phase !== "18K") fail("fixture phase is not 18K");
pass("fixture phase is 18K");

for (const marker of [
  "AnalyticsDashboardSectionId",
  "AnalyticsDashboardSourceState",
  "AnalyticsDashboardUiState",
  "AnalyticsDashboardChartKind",
  "AnalyticsDashboardCardViewModel",
  "AnalyticsDashboardViewModel",
  "PHASE_18K_ANALYTICS_DASHBOARD_UI_BOUNDARY",
  "PHASE_18K_ANALYTICS_DASHBOARD_SECTIONS",
  "PHASE_18K_ANALYTICS_DASHBOARD_SOURCE_STATES",
  "buildAnalyticsDashboardViewModel",
  "buildEmptyAnalyticsDashboardViewModel",
  "collectDashboardDisclosures",
  "summarizeAnalyticsDashboardUiBoundary"
]) includes("viewModel", viewModel, marker);

for (const marker of [
  "AnalyticsDashboardUi",
  "AnalyticsDashboardCard",
  "Empty analytics state",
  "No user-scoped analytics available yet",
  "Carnos disclosure boundary",
  "Privacy-sensitive metrics stay hidden unless allowed"
]) includes("component", component, marker);

for (const marker of [
  "AnalyticsPage",
  "AnalyticsDashboardUi",
  "buildEmptyAnalyticsDashboardViewModel"
]) includes("page", page, marker);

for (const marker of [
  "snapshot",
  "metric_quality",
  "trend_comparison_correlation",
  "experiment_readiness",
  "carnos_disclosure",
  "privacy_boundary",
  "ready",
  "empty",
  "loading",
  "error",
  "privacy_restricted",
  "fresh",
  "cached",
  "stale",
  "partial",
  "missing",
  "unsynced",
  "deterministic_preview",
  "line",
  "bar",
  "scorecard",
  "comparison",
  "correlation",
  "experiment_status"
]) {
  includes("viewModel", viewModel, marker);
  includes("contract", contract, marker);
  includes("fixture", fixtureText, marker);
}

for (const marker of [
  "analytics dashboard route",
  "analytics dashboard UI component",
  "chart-ready view model",
  "metric quality section",
  "snapshot section",
  "trend/comparison/correlation section",
  "experiment readiness section",
  "Carnos disclosure section",
  "privacy boundary section",
  "empty state",
  "loading state",
  "error state",
  "privacy restricted state",
  "no hardcoded analytics data",
  "Phase 18C integration",
  "Phase 18D integration",
  "Phase 18I integration",
  "Phase 18J integration",
  "Phase 18A-B integration",
  "cached context disclosure",
  "stale context disclosure",
  "partial context disclosure",
  "unsynced context disclosure",
  "deterministic preview disclosure",
  "insufficient data disclosure",
  "local Carnos runtime remains optional",
  "no schema writes",
  "no runtime SQL reads",
  "no Supabase client calls",
  "no hardcoded analytics values",
  "no fake analytics data",
  "no memory writes",
  "no action execution",
  "no local Carnos runtime requirement"
]) includes("contract", contract, marker);

for (const marker of [
  "Analytics dashboard view model exists",
  "Analytics dashboard UI component exists",
  "Analytics dashboard route exists",
  "Route is /analytics",
  "Snapshot section exists",
  "Metric quality section exists",
  "Trend/comparison/correlation section exists",
  "Experiment readiness section exists",
  "Carnos disclosure section exists",
  "Privacy boundary section exists",
  "Empty state exists",
  "Loading state exists",
  "Error state exists",
  "Privacy restricted state exists",
  "No runtime SQL reads are added",
  "No Supabase client calls are added",
  "No schema writes are added",
  "No fake analytics data is added",
  "No memory writes are added",
  "No action execution is added",
  "npm run audit:phase18k",
  "npm run check"
]) includes("checklist", checklist, marker);

for (const marker of [
  "Phase 18K Analytics Dashboard UI Report",
  "analytics dashboard UI surface and chart-ready view model",
  "route exists",
  "view model exists",
  "UI component exists",
  "snapshot section exists",
  "metric quality section exists",
  "trend/comparison/correlation section exists",
  "experiment readiness section exists",
  "Carnos disclosure section exists",
  "privacy boundary section exists",
  "empty/loading/error/privacy states exist",
  "chart-ready card kinds exist",
  "source disclosure states exist",
  "No schema is created",
  "No Supabase/Postgres runtime reads occur",
  "No hardcoded analytics values are added",
  "No fake analytics data is added",
  "No memory writes are added",
  "No action execution is added",
  "No local Carnos runtime is required during checks"
]) includes("report", report, marker);

includes("index", index, "export * from \"./analytics-dashboard-view-model\"");
includes("package.json", pkg, "\"audit:phase18k\"");
includes("package.json", pkg, "npm run audit:phase18j && npm run audit:phase18k");
includes("package.json", pkg, "npm run audit:phase18k && npm run build");

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
  "createProposedAction",
  "executeApprovedAction"
]) {
  excludes("viewModel", viewModel, marker);
  excludes("component", component, marker);
  excludes("page", page, marker);
}

console.log("\n✓ Phase 18K analytics dashboard UI audit passed.");

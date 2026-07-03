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

console.log("\n=== PHASE 18L SELF-EXPERIMENT LAB UI AUDIT ===");

const viewModel = read("src/lib/analytics-experiments/self-experiment-lab-view-model.ts");
const component = read("src/components/analytics-experiments/self-experiment-lab-ui.tsx");
const page = read("src/app/analytics/page.tsx");
const index = read("src/lib/analytics-experiments/index.ts");
const contract = read("docs/contracts/PHASE_18L_SELF_EXPERIMENT_LAB_UI.md");
const checklist = read("docs/qa/PHASE_18L_SELF_EXPERIMENT_LAB_UI_SMOKE_CHECKLIST.md");
const report = read("docs/phase-reports/PHASE_18L_SELF_EXPERIMENT_LAB_UI_REPORT.md");
const fixtureText = read("docs/fixtures/phase18-analytics-experiments/phase18l_self_experiment_lab_ui_fixture.json");
const pkg = read("package.json");

let fixture;
try {
  fixture = JSON.parse(fixtureText);
  pass("fixture JSON parses");
} catch (error) {
  fail("fixture JSON does not parse: " + error.message);
}

if (fixture.phase !== "18L") fail("fixture phase is not 18L");
pass("fixture phase is 18L");

for (const marker of [
  "SelfExperimentLabSectionId",
  "SelfExperimentLabUiState",
  "SelfExperimentLabSourceState",
  "SelfExperimentLabReadinessState",
  "SelfExperimentLabActionBoundary",
  "SelfExperimentLabPanelViewModel",
  "SelfExperimentLabViewModel",
  "PHASE_18L_SELF_EXPERIMENT_LAB_UI_BOUNDARY",
  "PHASE_18L_SELF_EXPERIMENT_LAB_SECTIONS",
  "PHASE_18L_SELF_EXPERIMENT_LAB_SOURCE_STATES",
  "PHASE_18L_SELF_EXPERIMENT_LAB_READINESS_STATES",
  "collectSelfExperimentLabDisclosures",
  "buildSelfExperimentLabViewModel",
  "buildEmptySelfExperimentLabViewModel",
  "summarizeSelfExperimentLabUiBoundary"
]) includes("viewModel", viewModel, marker);

for (const marker of [
  "SelfExperimentLabUi",
  "SelfExperimentLabPanel",
  "Empty self-experiment state",
  "No self-experiments available yet",
  "Review-before-memory-write boundary",
  "Actions remain disabled until a later approved execution path"
]) includes("component", component, marker);

for (const marker of [
  "SelfExperimentLabUi",
  "buildEmptySelfExperimentLabViewModel",
  "AnalyticsDashboardUi",
  "AuthenticatedDashboardShell",
  "listProofItems"
]) includes("page", page, marker);

for (const marker of [
  "template_library",
  "experiment_draft",
  "baseline_window",
  "active_window",
  "measurement_plan",
  "confounder_review",
  "readiness_review",
  "lesson_candidates",
  "memory_review_boundary",
  "privacy_boundary",
  "ready",
  "empty",
  "loading",
  "error",
  "privacy_restricted",
  "review_required",
  "fresh",
  "cached",
  "stale",
  "partial",
  "missing",
  "unsynced",
  "deterministic_preview",
  "ready_with_warnings",
  "not_ready",
  "invalid",
  "preview_only",
  "review_required_before_write",
  "write_disabled",
  "execution_disabled"
]) {
  includes("viewModel", viewModel, marker);
  includes("contract", contract, marker);
  includes("fixture", fixtureText, marker);
}

for (const marker of [
  "self-experiment lab view model",
  "self-experiment lab UI component",
  "analytics route integration",
  "experiment template library section",
  "experiment draft review section",
  "baseline window section",
  "active window section",
  "measurement plan section",
  "confounder review section",
  "readiness review section",
  "lesson candidate section",
  "memory review boundary section",
  "privacy boundary section",
  "empty state",
  "loading state",
  "error state",
  "privacy restricted state",
  "review required state",
  "review-before-memory-write boundary",
  "no hardcoded experiment data",
  "Phase 18E integration",
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
  "no experiment writes",
  "no hardcoded experiment values",
  "no fake experiment data",
  "no memory writes",
  "no action execution",
  "no local Carnos runtime requirement"
]) includes("contract", contract, marker);

for (const marker of [
  "Self-experiment lab view model exists",
  "Self-experiment lab UI component exists",
  "Analytics route includes self-experiment lab UI",
  "Route integration is /analytics",
  "Template library section exists",
  "Experiment draft section exists",
  "Baseline window section exists",
  "Active window section exists",
  "Measurement plan section exists",
  "Confounder review section exists",
  "Readiness review section exists",
  "Lesson candidate section exists",
  "Memory review boundary section exists",
  "Privacy boundary section exists",
  "Empty state exists",
  "Loading state exists",
  "Error state exists",
  "Privacy restricted state exists",
  "Review required state exists",
  "No runtime SQL reads are added",
  "No Supabase client calls are added",
  "No schema writes are added",
  "No fake experiment data is added",
  "No memory writes are added",
  "No action execution is added",
  "npm run audit:phase18l",
  "npm run check"
]) includes("checklist", checklist, marker);

for (const marker of [
  "Phase 18L Self-Experiment Lab UI Report",
  "self-experiment lab UI surface and safe view model",
  "lab view model exists",
  "lab UI component exists",
  "analytics route integration exists",
  "template library surface exists",
  "experiment draft review surface exists",
  "baseline window surface exists",
  "active window surface exists",
  "measurement plan surface exists",
  "confounder review surface exists",
  "readiness review surface exists",
  "lesson candidate surface exists",
  "memory review boundary surface exists",
  "privacy boundary surface exists",
  "empty/loading/error/privacy/review states exist",
  "review-before-memory-write boundary exists",
  "source disclosure states exist",
  "No schema is created",
  "No Supabase/Postgres runtime reads occur",
  "No experiment writes occur",
  "No hardcoded experiment values are added",
  "No fake experiment data is added",
  "No memory writes are added",
  "No action execution is added",
  "No local Carnos runtime is required during checks"
]) includes("report", report, marker);

includes("index", index, "export * from \"./self-experiment-lab-view-model\"");
includes("package.json", pkg, "\"audit:phase18l\"");
includes("package.json", pkg, "npm run audit:phase18k && npm run audit:phase18l");
includes("package.json", pkg, "npm run audit:phase18l && npm run build");

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

console.log("\n✓ Phase 18L self-experiment lab UI audit passed.");

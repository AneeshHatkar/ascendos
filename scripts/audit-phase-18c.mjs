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

console.log("\n=== PHASE 18C METRIC REGISTRY + DATA QUALITY AUDIT ===");

const implementation = read("src/lib/analytics-experiments/metric-registry.ts");
const index = read("src/lib/analytics-experiments/index.ts");
const contract = read("docs/contracts/PHASE_18C_METRIC_REGISTRY_DATA_QUALITY.md");
const checklist = read("docs/qa/PHASE_18C_METRIC_REGISTRY_DATA_QUALITY_SMOKE_CHECKLIST.md");
const report = read("docs/phase-reports/PHASE_18C_METRIC_REGISTRY_DATA_QUALITY_REPORT.md");
const fixtureText = read("docs/fixtures/phase18-analytics-experiments/phase18c_metric_registry_fixture.json");
const pkg = read("package.json");

let fixture;
try {
  fixture = JSON.parse(fixtureText);
  pass("fixture JSON parses");
} catch (error) {
  fail("fixture JSON does not parse: " + error.message);
}

if (fixture.phase !== "18C") fail("fixture phase is not 18C");
pass("fixture phase is 18C");

for (const marker of [
  "MetricDomain",
  "MetricSensitivity",
  "MetricCacheEligibility",
  "MetricSourceMode",
  "DataQualityLevel",
  "MetricDefinition",
  "MetricDataQualityInput",
  "MetricDataQualityResult",
  "PHASE_18C_METRIC_REGISTRY_BOUNDARY",
  "DEFAULT_METRIC_DEFINITIONS",
  "listMetricDefinitions",
  "getMetricDefinition",
  "getMetricDefinitionsByDomain",
  "evaluateMetricDataQuality",
  "summarizeMetricRegistry"
]) includes("implementation", implementation, marker);

for (const marker of [
  "daily_checkin_count",
  "goal_progress_signal",
  "job_application_velocity",
  "networking_touchpoints",
  "learning_consistency",
  "research_output_count",
  "sleep_consistency",
  "workout_consistency",
  "calorie_logging_consistency",
  "experiment_measurement_completeness",
  "analytics_snapshot_freshness",
  "carnos_memory_context_availability"
]) {
  includes("implementation", implementation, marker);
  includes("contract", contract, marker);
  includes("checklist", checklist, marker);
  if (!fixture.metric_ids.includes(marker)) fail("fixture missing metric id: " + marker);
  pass("fixture includes metric id " + marker);
}

for (const marker of [
  "high_confidence",
  "medium_confidence",
  "low_confidence",
  "insufficient_data",
  "invalid",
  "online_live",
  "cached_offline",
  "mixed_online_cached",
  "unsynced_local",
  "missing"
]) {
  includes("implementation", implementation, marker);
  includes("contract", contract, marker);
  includes("checklist", checklist, marker);
}

for (const marker of [
  "offline_cache_allowed",
  "offline_cache_allowed_with_sensitive_rules",
  "offline_cache_allowed_with_privacy_rules",
  "normal",
  "private",
  "sensitive",
  "restricted",
  "mixed",
  "Carnos must explain",
  "local Carnos runtime",
  "deterministicFallbackRequired",
  "localStorageCoreDataEnabled",
  "supabaseCallsEnabled",
  "schemaWritesEnabled"
]) includes("implementation", implementation, marker);

for (const marker of [
  "Phase 18C — Metric Registry + Data Quality Contracts",
  "metric registry",
  "metric sensitivity labels",
  "offline cache eligibility labels",
  "data completeness scoring",
  "cached/stale/unsynced explanation limits",
  "no correlation with fewer than 7 matched data points",
  "no weekly trend with fewer than 4 logged days",
  "no before-after result without baseline",
  "no high confidence if confounders exist",
  "no high confidence if unsynced records are included",
  "no high confidence if stale cached snapshots are used",
  "no fake metrics",
  "no fake data",
  "no runtime SQL reads",
  "no Supabase client calls",
  "no schema writes",
  "no local Carnos runtime requirement during checks"
]) includes("contract", contract, marker);

for (const marker of [
  "Metric registry implementation exists",
  "Offline cache eligibility is represented",
  "Sensitive/restricted labels are represented",
  "Carnos explanation limits are represented",
  "Experiment evaluation eligibility is represented",
  "Future local Carnos runtime compatibility is represented",
  "No runtime SQL reads are added",
  "No Supabase client calls are added",
  "No schema writes are added",
  "npm run audit:phase18c",
  "npm run check"
]) includes("checklist", checklist, marker);

for (const marker of [
  "Phase 18C Metric Registry + Data Quality Report",
  "canonical metric registry",
  "data quality rules",
  "No schema is created",
  "No Supabase/Postgres runtime reads occur",
  "No fake metrics or fake analytics data are added",
  "No local Carnos runtime is required during checks"
]) includes("report", report, marker);

includes("index", index, "export * from");
includes("package.json", pkg, "\"audit:phase18c\"");
includes("package.json", pkg, "npm run audit:phase18b_b && npm run audit:phase18c");
includes("package.json", pkg, "npm run audit:phase18c && npm run build");

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
]) excludes("implementation", implementation, marker);

console.log("\n✓ Phase 18C metric registry + data quality audit passed.");

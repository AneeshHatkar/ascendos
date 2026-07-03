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

console.log("\n=== PHASE 18I TREND CORRELATION COMPARISON ENGINE AUDIT ===");

const implementation = read("src/lib/analytics-experiments/trend-correlation-comparison-engine.ts");
const index = read("src/lib/analytics-experiments/index.ts");
const contract = read("docs/contracts/PHASE_18I_TREND_CORRELATION_COMPARISON_ENGINE.md");
const checklist = read("docs/qa/PHASE_18I_TREND_CORRELATION_COMPARISON_ENGINE_SMOKE_CHECKLIST.md");
const report = read("docs/phase-reports/PHASE_18I_TREND_CORRELATION_COMPARISON_ENGINE_REPORT.md");
const fixtureText = read("docs/fixtures/phase18-analytics-experiments/phase18i_trend_correlation_comparison_engine_fixture.json");
const pkg = read("package.json");

let fixture;
try {
  fixture = JSON.parse(fixtureText);
  pass("fixture JSON parses");
} catch (error) {
  fail("fixture JSON does not parse: " + error.message);
}

if (fixture.phase !== "18I") fail("fixture phase is not 18I");
pass("fixture phase is 18I");

for (const marker of [
  "AnalyticsEngineMode",
  "AnalyticsEngineSourceMode",
  "TrendDirection",
  "ComparisonDirection",
  "CorrelationDirection",
  "CorrelationStrength",
  "AnalyticsEngineConfidence",
  "AnalyticsMetricPoint",
  "TrendAnalysisInput",
  "TrendAnalysisResult",
  "ComparisonAnalysisInput",
  "ComparisonAnalysisResult",
  "CorrelationAnalysisInput",
  "CorrelationAnalysisResult",
  "PHASE_18I_ANALYTICS_ENGINE_BOUNDARY",
  "analyzeTrend",
  "compareMetricWindows",
  "analyzeCorrelation",
  "summarizeTrendCorrelationComparisonEngine"
]) includes("implementation", implementation, marker);

for (const marker of [
  "trend",
  "comparison",
  "correlation",
  "increasing",
  "decreasing",
  "stable",
  "volatile",
  "insufficient_data",
  "invalid",
  "up",
  "down",
  "unchanged",
  "positive",
  "negative",
  "none",
  "strong",
  "moderate",
  "weak",
  "high",
  "medium",
  "low",
  "online_source_of_truth",
  "eligible_offline_cache",
  "mixed_online_offline",
  "unsynced_local",
  "deterministic_preview"
]) {
  includes("implementation", implementation, marker);
  includes("contract", contract, marker);
  includes("fixture", fixtureText, marker);
}

for (const marker of [
  "Trend metric id is required",
  "Trend analysis must be user scoped",
  "Trend analysis must not allow causal claims",
  "Trend minimum data points must be at least 2",
  "Trend analysis has insufficient data",
  "Comparison metric id is required",
  "Comparison analysis must be user scoped",
  "Comparison analysis must not allow causal claims",
  "Comparison minimum data points per window must be at least 2",
  "Comparison baseline window has insufficient data",
  "Comparison active window has insufficient data",
  "Correlation primary metric id is required",
  "Correlation secondary metric id is required",
  "Correlation metrics must be different",
  "Correlation analysis must be user scoped",
  "Correlation analysis must not allow causal claims",
  "Correlation minimum matched data points must be at least 7",
  "Correlation analysis has insufficient matched data",
  "Carnos must say there is not enough data",
  "Carnos may describe correlation but must not claim causation",
  "Carnos must disclose cached, unsynced, partial, deterministic, or confounder limits"
]) includes("implementation", implementation, marker);

for (const marker of [
  "Trend / Correlation / Comparison Engine",
  "trend direction classification",
  "trend slope scoring",
  "volatility detection",
  "comparison window evaluation",
  "percent change calculation",
  "correlation coefficient calculation",
  "correlation strength classification",
  "minimum data gates",
  "confidence classification",
  "disclosure requirement generation",
  "correlation-not-causation guardrails",
  "Carnos explanation limits",
  "no causality claim boundary",
  "Phase 18F integration",
  "Phase 18G integration",
  "Phase 18H integration",
  "Phase 18A-B integration",
  "cached context disclosure",
  "unsynced context disclosure",
  "partial context disclosure",
  "deterministic preview disclosure",
  "confounder disclosure",
  "local Carnos runtime remains optional",
  "no schema writes",
  "no runtime SQL reads",
  "no Supabase client calls",
  "no fake analytics data",
  "no memory writes",
  "no action execution",
  "no local Carnos runtime requirement"
]) includes("contract", contract, marker);

for (const marker of [
  "Trend/correlation/comparison engine implementation exists",
  "Engine fixture exists",
  "Trend slope scoring exists",
  "Volatility detection exists",
  "Comparison percent change calculation exists",
  "Pearson correlation coefficient calculation exists",
  "Minimum trend data gate exists",
  "Minimum comparison window data gate exists",
  "Minimum correlation matched data gate exists",
  "Disclosure requirement generation exists",
  "Carnos explanation limits exist",
  "Correlation-not-causation guardrails exist",
  "No runtime SQL reads are added",
  "No Supabase client calls are added",
  "No schema writes are added",
  "No fake analytics data is added",
  "No memory writes are added",
  "No action execution is added",
  "npm run audit:phase18i",
  "npm run check"
]) includes("checklist", checklist, marker);

for (const marker of [
  "Phase 18I Trend Correlation Comparison Engine Report",
  "deterministic trend, comparison, and correlation engine logic",
  "trend metric id required",
  "trend user scope required",
  "trend minimum data gate",
  "comparison metric id required",
  "comparison user scope required",
  "comparison minimum window data gate",
  "correlation primary metric id required",
  "correlation secondary metric id required",
  "correlation metrics must differ",
  "correlation user scope required",
  "correlation minimum matched data gate",
  "causal claims forbidden",
  "Carnos correlation-not-causation guardrails",
  "No schema is created",
  "No Supabase/Postgres runtime reads occur",
  "No fake analytics data is added",
  "No memory writes are added",
  "No action execution is added",
  "No local Carnos runtime is required during checks"
]) includes("report", report, marker);

includes("index", index, "export * from \"./trend-correlation-comparison-engine\"");
includes("package.json", pkg, "\"audit:phase18i\"");
includes("package.json", pkg, "npm run audit:phase18h && npm run audit:phase18i");
includes("package.json", pkg, "npm run audit:phase18i && npm run build");

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

console.log("\n✓ Phase 18I trend correlation comparison engine audit passed.");

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

console.log("\n=== PHASE 18M CARNOS ANALYTICS EXPLANATION BOUNDARY AUDIT ===");

const implementation = read("src/lib/analytics-experiments/carnos-analytics-explanation-boundary.ts");
const index = read("src/lib/analytics-experiments/index.ts");
const contract = read("docs/contracts/PHASE_18M_CARNOS_ANALYTICS_EXPLANATION_BOUNDARY.md");
const checklist = read("docs/qa/PHASE_18M_CARNOS_ANALYTICS_EXPLANATION_BOUNDARY_SMOKE_CHECKLIST.md");
const report = read("docs/phase-reports/PHASE_18M_CARNOS_ANALYTICS_EXPLANATION_BOUNDARY_REPORT.md");
const fixtureText = read("docs/fixtures/phase18-analytics-experiments/phase18m_carnos_analytics_explanation_boundary_fixture.json");
const pkg = read("package.json");

let fixture;
try {
  fixture = JSON.parse(fixtureText);
  pass("fixture JSON parses");
} catch (error) {
  fail("fixture JSON does not parse: " + error.message);
}

if (fixture.phase !== "18M") fail("fixture phase is not 18M");
pass("fixture phase is 18M");

for (const marker of [
  "CarnosAnalyticsExplanationSubject",
  "CarnosAnalyticsExplanationMode",
  "CarnosAnalyticsExplanationSourceState",
  "CarnosAnalyticsClaimBoundary",
  "CarnosAnalyticsExplanationRisk",
  "CarnosAnalyticsExplanationInput",
  "CarnosAnalyticsExplanationPlan",
  "CarnosAnalyticsExplanationBoundarySummary",
  "PHASE_18M_CARNOS_ANALYTICS_EXPLANATION_BOUNDARY",
  "PHASE_18M_CARNOS_ANALYTICS_SUBJECTS",
  "PHASE_18M_CARNOS_ANALYTICS_MODES",
  "PHASE_18M_CARNOS_ANALYTICS_SOURCE_STATES",
  "PHASE_18M_CARNOS_ANALYTICS_CLAIM_BOUNDARIES",
  "buildCarnosAnalyticsExplanationPlan",
  "collectRequiredCarnosAnalyticsDisclosures",
  "collectClaimBoundaries",
  "summarizeCarnosAnalyticsExplanationBoundary",
  "canWriteMemory: false",
  "canExecuteAction: false",
  "canClaimCausality: false",
  "canClaimProof: false"
]) includes("implementation", implementation, marker);

for (const marker of [
  "metric_quality",
  "snapshot_freshness",
  "trend",
  "comparison",
  "correlation",
  "self_experiment",
  "experiment_lesson",
  "memory_candidate",
  "privacy_boundary",
  "safe_summary",
  "uncertainty_summary",
  "evidence_gap_summary",
  "cached_context_summary",
  "unsynced_context_summary",
  "deterministic_preview_summary",
  "review_required_summary",
  "blocked",
  "online_source_of_truth",
  "eligible_offline_cache",
  "mixed_online_offline",
  "unsynced_local",
  "deterministic_preview",
  "missing",
  "privacy_restricted",
  "observation_only",
  "trend_not_proof",
  "correlation_not_causation",
  "experiment_not_causal_proof",
  "lesson_candidate_not_memory",
  "recommendation_requires_review",
  "action_requires_confirmation",
  "blocked_due_to_missing_data",
  "blocked_due_to_privacy"
]) {
  includes("implementation", implementation, marker);
  includes("contract", contract, marker);
  includes("fixture", fixtureText, marker);
}

for (const marker of [
  "Carnos analytics explanation boundary",
  "allowed explanation modes",
  "blocked explanation modes",
  "trend explanation limits",
  "comparison explanation limits",
  "correlation explanation limits",
  "self-experiment explanation limits",
  "experiment lesson explanation limits",
  "metric quality explanation limits",
  "snapshot freshness explanation limits",
  "confidence and uncertainty wording rules",
  "evidence gap wording rules",
  "missing data wording rules",
  "no-proof boundary",
  "no-causality boundary",
  "no medical/financial/legal certainty boundary",
  "no automatic recommendation boundary",
  "no automatic memory-write boundary",
  "no action execution boundary",
  "review-before-memory-write boundary",
  "source-aware disclosure requirements",
  "safe Carnos response template contract",
  "no fake analytics data",
  "no fake experiment conclusions",
  "Phase 18F integration",
  "Phase 18I integration",
  "Phase 18J integration",
  "Phase 18K integration",
  "Phase 18L integration",
  "cached context disclosure",
  "stale context disclosure",
  "partial context disclosure",
  "missing context disclosure",
  "unsynced local context disclosure",
  "deterministic preview disclosure",
  "Carnos must not pretend offline context is live",
  "Carnos must not infer unavailable current info",
  "Carnos must not claim sync completed if data is unsynced",
  "Carnos must not treat local/offline context as online source of truth",
  "privacy restricted context is blocked",
  "future local runtime remains optional",
  "review-before-write is preserved",
  "no schema writes",
  "no runtime SQL reads",
  "no Supabase client calls",
  "no model calls",
  "no memory writes",
  "no action execution",
  "no local Carnos runtime requirement",
  "no causality claims",
  "no proof claims"
]) includes("contract", contract, marker);

for (const marker of [
  "Carnos analytics explanation boundary implementation exists",
  "Allowed explanation modes exist",
  "Blocked explanation mode exists",
  "Trend explanation limits exist",
  "Comparison explanation limits exist",
  "Correlation explanation limits exist",
  "Self-experiment explanation limits exist",
  "Experiment lesson explanation limits exist",
  "Metric quality explanation limits exist",
  "Snapshot freshness explanation limits exist",
  "Confidence and uncertainty wording rules exist",
  "Evidence gap wording rules exist",
  "Missing data wording rules exist",
  "No-proof boundary exists",
  "No-causality boundary exists",
  "Review-before-memory-write boundary exists",
  "Source-aware disclosure rules exist",
  "Cached context disclosure exists",
  "Stale context disclosure exists",
  "Partial context disclosure exists",
  "Missing context disclosure exists",
  "Unsynced local context disclosure exists",
  "Deterministic preview disclosure exists",
  "Privacy restricted blocking exists",
  "Local runtime remains optional",
  "No runtime SQL reads are added",
  "No Supabase client calls are added",
  "No schema writes are added",
  "No model calls are added",
  "No fake analytics data is added",
  "No fake experiment conclusions are added",
  "No memory writes are added",
  "No action execution is added",
  "npm run audit:phase18m",
  "npm run check"
]) includes("checklist", checklist, marker);

for (const marker of [
  "Phase 18M Carnos Analytics Explanation Boundary Report",
  "deterministic Carnos analytics explanation boundary",
  "Carnos analytics explanation boundary exists",
  "allowed and blocked explanation modes exist",
  "trend/comparison/correlation limits exist",
  "self-experiment and lesson limits exist",
  "metric quality and snapshot freshness limits exist",
  "confidence and uncertainty wording rules exist",
  "evidence gap and missing data wording rules exist",
  "no-proof boundary exists",
  "no-causality boundary exists",
  "review-before-memory-write boundary exists",
  "source-aware disclosures exist",
  "cached/stale/partial/missing/unsynced/deterministic context rules exist",
  "privacy restricted context is blocked",
  "local runtime remains optional",
  "No schema is created",
  "No Supabase/Postgres runtime reads occur",
  "No model calls occur",
  "No fake analytics data is added",
  "No fake experiment conclusions are added",
  "No memory writes are added",
  "No action execution is added",
  "No causality claims are allowed",
  "No proof claims are allowed",
  "No local Carnos runtime is required during checks"
]) includes("report", report, marker);

includes("index", index, "export * from \"./carnos-analytics-explanation-boundary\"");
includes("package.json", pkg, "\"audit:phase18m\"");
includes("package.json", pkg, "npm run audit:phase18l && npm run audit:phase18m");
includes("package.json", pkg, "npm run audit:phase18m && npm run build");

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
  excludes("implementation", implementation, marker);
}

console.log("\n✓ Phase 18M Carnos analytics explanation boundary audit passed.");

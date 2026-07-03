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

console.log("\n=== PHASE 18F INSIGHT QUALITY + PROVENANCE AUDIT ===");

const implementation = read("src/lib/analytics-experiments/insight-quality-provenance.ts");
const index = read("src/lib/analytics-experiments/index.ts");
const contract = read("docs/contracts/PHASE_18F_INSIGHT_QUALITY_PROVENANCE.md");
const checklist = read("docs/qa/PHASE_18F_INSIGHT_QUALITY_PROVENANCE_SMOKE_CHECKLIST.md");
const report = read("docs/phase-reports/PHASE_18F_INSIGHT_QUALITY_PROVENANCE_REPORT.md");
const fixtureText = read("docs/fixtures/phase18-analytics-experiments/phase18f_insight_quality_fixture.json");
const pkg = read("package.json");

let fixture;
try {
  fixture = JSON.parse(fixtureText);
  pass("fixture JSON parses");
} catch (error) {
  fail("fixture JSON does not parse: " + error.message);
}

if (fixture.phase !== "18F") fail("fixture phase is not 18F");
pass("fixture phase is 18F");

for (const marker of [
  "InsightQualityLevel",
  "InsightClaimType",
  "InsightProvenanceSource",
  "InsightEvidenceFreshness",
  "InsightDisclosureRequirement",
  "InsightActionReadiness",
  "InsightEvidenceItem",
  "InsightQualityContract",
  "InsightQualityValidationResult",
  "PHASE_18F_INSIGHT_QUALITY_BOUNDARY",
  "validateInsightQuality",
  "summarizeInsightQualityContract"
]) includes("implementation", implementation, marker);

for (const marker of [
  "high_confidence",
  "medium_confidence",
  "low_confidence",
  "insufficient_data",
  "invalid",
  "observation",
  "trend",
  "comparison",
  "correlation",
  "experiment_readiness",
  "lesson_candidate",
  "recommendation_candidate",
  "metric_registry",
  "analytics_snapshot",
  "self_experiment",
  "manual_note",
  "memory_context",
  "deterministic_fallback",
  "fresh",
  "cached",
  "stale",
  "partial",
  "missing",
  "unsynced",
  "none",
  "disclose_cached_context",
  "disclose_stale_context",
  "disclose_unsynced_context",
  "disclose_partial_context",
  "disclose_deterministic_preview",
  "disclose_insufficient_data",
  "disclose_confounders",
  "avoid_causal_claims",
  "not_actionable",
  "preview_only",
  "candidate_requires_review",
  "safe_to_suggest_without_write"
]) {
  includes("implementation", implementation, marker);
  includes("contract", contract, marker);
  includes("checklist", checklist, marker);
  includes("fixture", fixtureText, marker);
}

for (const marker of [
  "Insight id is required",
  "Insight must be user scoped",
  "Insight title is required",
  "Insight claim text is required",
  "Insight requires at least one evidence item",
  "Evidence id is required",
  "Evidence completeness score must stay between 0 and 1",
  "Invalid evidence quality blocks insight",
  "Evidence is not ready for confident insight",
  "Missing evidence freshness blocks confident insight",
  "Insight evidence includes confounders",
  "Insight evidence includes unsynced records",
  "Correlation insight requires at least 7 matched data points",
  "Trend insight requires at least 4 logged data points",
  "Insight contract cannot claim causality",
  "Insight contract must not enable runtime data reads",
  "Insight contract must not enable schema writes",
  "Insight contract must not enable Supabase calls",
  "Insight contract must not allow localStorage core data",
  "Insight contract must not require local Carnos runtime",
  "Carnos must not present this as a valid insight",
  "Carnos must say there is not enough data for this insight",
  "Carnos must avoid causal claims and explain correlation-not-causation limits",
  "Carnos must disclose provenance limits before explaining this insight"
]) includes("implementation", implementation, marker);

for (const marker of [
  "Insight Quality Levels",
  "Analytics Provenance",
  "Evidence item contracts",
  "insight claim type contracts",
  "provenance source contracts",
  "disclosure requirement contracts",
  "action readiness boundary",
  "memory candidate boundary",
  "Carnos insight explanation limits",
  "correlation-not-causation guardrails",
  "no fake insight claims",
  "no confident causal claims",
  "Supabase/Postgres as online source of truth",
  "IndexedDB or equivalent encrypted local cache",
  "browser localStorage core-data ban",
  "cached insight context labels",
  "stale insight context labels",
  "unsynced local context labels",
  "deterministic offline fallback",
  "future sync queue boundary",
  "sensitive/private evidence disclosure",
  "Carnos cached/offline honesty",
  "Phase 18C integration",
  "Phase 18D integration",
  "Phase 18E integration",
  "no schema writes",
  "no runtime SQL reads",
  "no Supabase client calls",
  "no fake insight data",
  "no memory writes",
  "no action execution",
  "no local Carnos runtime requirement"
]) includes("contract", contract, marker);

for (const marker of [
  "Insight quality implementation exists",
  "Insight quality fixture exists",
  "Correlation requires at least 7 matched data points",
  "Trend requires at least 4 logged data points",
  "Causality claims are forbidden",
  "Cached/stale/unsynced disclosure exists",
  "Carnos insight explanation limits exist",
  "Future local Carnos runtime compatibility is represented",
  "No runtime SQL reads are added",
  "No Supabase client calls are added",
  "No schema writes are added",
  "No memory writes are added",
  "No action execution is added",
  "npm run audit:phase18f",
  "npm run check"
]) includes("checklist", checklist, marker);

for (const marker of [
  "Phase 18F Insight Quality + Provenance Report",
  "insight quality and provenance contracts",
  "insight id required",
  "user scoped insight required",
  "claim text required",
  "evidence item required",
  "invalid evidence blocks insight",
  "insufficient data blocks confident insight",
  "correlation insight requires at least 7 matched data points",
  "trend insight requires at least 4 logged data points",
  "causality claims forbidden",
  "cached context disclosure",
  "stale context disclosure",
  "unsynced context disclosure",
  "partial context disclosure",
  "deterministic preview disclosure",
  "confounder disclosure",
  "Carnos avoids proof and causal claims",
  "No schema is created",
  "No Supabase/Postgres runtime reads occur",
  "No fake insight data is added",
  "No memory writes are added",
  "No action execution is added",
  "No local Carnos runtime is required during checks"
]) includes("report", report, marker);

includes("index", index, "export * from \"./insight-quality-provenance\"");
includes("package.json", pkg, "\"audit:phase18f\"");
includes("package.json", pkg, "npm run audit:phase18e && npm run audit:phase18f");
includes("package.json", pkg, "npm run audit:phase18f && npm run build");

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

console.log("\n✓ Phase 18F insight quality + provenance audit passed.");

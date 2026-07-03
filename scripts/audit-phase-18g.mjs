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

console.log("\n=== PHASE 18G ANALYTICS REPOSITORY BOUNDARY AUDIT ===");

const implementation = read("src/lib/analytics-experiments/analytics-repository-boundary.ts");
const index = read("src/lib/analytics-experiments/index.ts");
const contract = read("docs/contracts/PHASE_18G_ANALYTICS_REPOSITORY_BOUNDARIES.md");
const checklist = read("docs/qa/PHASE_18G_ANALYTICS_REPOSITORY_BOUNDARY_SMOKE_CHECKLIST.md");
const report = read("docs/phase-reports/PHASE_18G_ANALYTICS_REPOSITORY_BOUNDARIES_REPORT.md");
const fixtureText = read("docs/fixtures/phase18-analytics-experiments/phase18g_analytics_repository_boundary_fixture.json");
const pkg = read("package.json");

let fixture;
try {
  fixture = JSON.parse(fixtureText);
  pass("fixture JSON parses");
} catch (error) {
  fail("fixture JSON does not parse: " + error.message);
}

if (fixture.phase !== "18G") fail("fixture phase is not 18G");
pass("fixture phase is 18G");

for (const marker of [
  "AnalyticsRepositoryReadIntent",
  "AnalyticsRepositorySource",
  "AnalyticsRepositoryCacheState",
  "AnalyticsRepositoryFreshnessLabel",
  "AnalyticsRepositoryCapability",
  "AnalyticsMetricRepositoryPlan",
  "AnalyticsRepositoryBoundaryContract",
  "AnalyticsRepositoryBoundaryValidationResult",
  "PHASE_18G_ANALYTICS_REPOSITORY_BOUNDARY",
  "buildAnalyticsMetricRepositoryPlan",
  "buildDefaultAnalyticsRepositoryBoundary",
  "validateAnalyticsRepositoryBoundary",
  "summarizeAnalyticsRepositoryBoundaryContract"
]) includes("implementation", implementation, marker);

for (const marker of [
  "metric_definition_lookup",
  "metric_value_read",
  "snapshot_read",
  "insight_read",
  "dashboard_summary_read",
  "export_preview_read",
  "supabase_postgres_source_of_truth",
  "encrypted_offline_cache",
  "mixed_source_router",
  "deterministic_empty_state",
  "live_only",
  "cache_allowed",
  "cache_allowed_with_sensitive_rules",
  "cache_allowed_with_privacy_rules",
  "not_cacheable",
  "fresh",
  "cached",
  "stale",
  "partial",
  "missing",
  "unsynced",
  "read_metric_definitions",
  "read_metric_values",
  "read_snapshots",
  "read_insight_previews",
  "read_dashboard_summaries",
  "read_export_previews",
  "route_cached_fallback",
  "label_source_mode",
  "validate_user_scope"
]) {
  includes("implementation", implementation, marker);
  includes("contract", contract, marker);
  includes("checklist", checklist, marker);
  includes("fixture", fixtureText, marker);
}

for (const marker of [
  "Analytics repository boundary id is required",
  "Analytics repository boundary must be user scoped",
  "Analytics repository boundary must define read intents",
  "Analytics repository boundary must define capabilities",
  "Analytics repository boundary must define metric plans",
  "Analytics repository online source of truth must remain Supabase/Postgres",
  "Analytics repository offline continuity layer must remain encrypted IndexedDB or equivalent",
  "Analytics repository boundary must point to the Phase 18B schema source map fixture",
  "Analytics repository metric plan is not registered",
  "Analytics repository metric plan must require user scope",
  "Analytics repository runtime reads must not be implemented in this boundary chunk",
  "Analytics repository runtime implementation must require schema source map first",
  "Not-cacheable analytics metric cannot allow cached fallback",
  "Not-cacheable analytics metric cannot allow unsynced local context",
  "Sensitive/restricted analytics metric cannot use unrestricted cache state",
  "Only source-of-truth reads may claim fresh analytics data",
  "Deterministic empty-state repository plan must be disclosed to Carnos",
  "Analytics repository boundary must not enable runtime data reads",
  "Analytics repository boundary must not enable schema writes",
  "Analytics repository boundary must not enable Supabase calls",
  "Analytics repository boundary must not allow localStorage core data",
  "Analytics repository boundary must not allow fake analytics data",
  "Analytics repository boundary must not require local Carnos runtime",
  "Analytics repository boundary must not enable memory writes",
  "Analytics repository boundary must not enable action execution",
  "Carnos must disclose repository source, cache, stale, unsynced, or deterministic fallback limits"
]) includes("implementation", implementation, marker);

for (const marker of [
  "Analytics repository boundaries",
  "metric definition lookup boundary",
  "metric value read boundary",
  "snapshot read boundary",
  "insight read boundary",
  "dashboard summary read boundary",
  "export preview read boundary",
  "source routing boundary",
  "cached fallback boundary",
  "stale data labeling boundary",
  "unsynced local context boundary",
  "deterministic empty state boundary",
  "user scope validation boundary",
  "no fake analytics read boundary",
  "schema source map requirement before runtime implementation",
  "Carnos repository explanation limits",
  "Supabase/Postgres as online source of truth",
  "IndexedDB or equivalent encrypted local cache",
  "browser localStorage core-data ban",
  "offline cache labels",
  "stale cache labels",
  "unsynced local context labels",
  "mixed online/offline source labels",
  "deterministic fallback honesty",
  "future sync queue boundary",
  "Carnos cached/offline honesty",
  "Phase 18C integration",
  "Phase 18D integration",
  "Phase 18F integration",
  "Runtime implementation must not begin until the Phase 18B schema source map is consulted",
  "no schema writes",
  "no runtime SQL reads",
  "no Supabase client calls",
  "no fake analytics data",
  "no memory writes",
  "no action execution",
  "no local Carnos runtime requirement"
]) includes("contract", contract, marker);

for (const marker of [
  "Analytics repository boundary implementation exists",
  "Analytics repository boundary fixture exists",
  "Phase 18B schema source map requirement exists",
  "Registered metric plan validation exists",
  "User scope validation exists",
  "Cached/stale/unsynced repository disclosure exists",
  "Carnos repository explanation limits exist",
  "Future local Carnos runtime compatibility is represented",
  "No runtime SQL reads are added",
  "No Supabase client calls are added",
  "No schema writes are added",
  "No fake analytics data is added",
  "No memory writes are added",
  "No action execution is added",
  "npm run audit:phase18g",
  "npm run check"
]) includes("checklist", checklist, marker);

for (const marker of [
  "Phase 18G Analytics Repository Boundaries Report",
  "analytics repository boundary contracts",
  "repository id required",
  "user scoped repository required",
  "read intents required",
  "capabilities required",
  "metric plans required",
  "Supabase/Postgres online source of truth",
  "encrypted IndexedDB offline continuity layer",
  "Phase 18B source map requirement",
  "registered metric plans only",
  "user scope required per metric plan",
  "no runtime reads in this boundary chunk",
  "cache restrictions for not-cacheable metrics",
  "stricter cache rules for sensitive/restricted metrics",
  "Carnos disclosure for deterministic empty-state repository context",
  "No schema is created",
  "No Supabase/Postgres runtime reads occur",
  "No fake analytics data is added",
  "No memory writes are added",
  "No action execution is added",
  "No local Carnos runtime is required during checks"
]) includes("report", report, marker);

includes("index", index, "export * from \"./analytics-repository-boundary\"");
includes("package.json", pkg, "\"audit:phase18g\"");
includes("package.json", pkg, "npm run audit:phase18f && npm run audit:phase18g");
includes("package.json", pkg, "npm run audit:phase18g && npm run build");

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

console.log("\n✓ Phase 18G analytics repository boundary audit passed.");

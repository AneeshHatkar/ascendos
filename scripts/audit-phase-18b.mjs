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

console.log("\n=== PHASE 18B SCHEMA DISCOVERY + METRIC SOURCE MAP AUDIT ===");

const builder = read("scripts/build-phase-18b-schema-source-map.mjs");
const audit = read("scripts/audit-phase-18b.mjs");
const contract = read("docs/contracts/PHASE_18B_SCHEMA_DISCOVERY_METRIC_SOURCE_MAP.md");
const sourceMapMd = read("docs/roadmap/PHASE_18B_SCHEMA_DISCOVERY_METRIC_SOURCE_MAP.md");
const sourceMapJsonText = read("docs/fixtures/phase18-analytics-experiments/phase18b_schema_source_map.json");
const checklist = read("docs/qa/PHASE_18B_SCHEMA_DISCOVERY_METRIC_SOURCE_MAP_SMOKE_CHECKLIST.md");
const report = read("docs/phase-reports/PHASE_18B_SCHEMA_DISCOVERY_METRIC_SOURCE_MAP_REPORT.md");
const pkg = read("package.json");

let parsed;
try {
  parsed = JSON.parse(sourceMapJsonText);
  pass("source map JSON parses");
} catch (error) {
  fail("source map JSON does not parse: " + error.message);
}

if (parsed.phase !== "18B") fail("source map phase is not 18B");
pass("source map phase is 18B");

if (!Array.isArray(parsed.discovered_tables)) fail("source map discovered_tables is not an array");
pass("source map discovered_tables is an array");

if (!Array.isArray(parsed.metric_source_map)) fail("source map metric_source_map is not an array");
pass("source map metric_source_map is an array");

for (const marker of [
  "discovery_only",
  "no_new_tables_created",
  "no_fake_schema_claims",
  "no_runtime_data_reads",
  "no_supabase_client_calls",
  "phase_18a_b_persistence_offline_lock_applies"
]) {
  if (!parsed.boundaries.includes(marker)) fail("source map boundary missing: " + marker);
  pass("source map boundary includes " + marker);
}

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
  if (!parsed.metric_source_map.some((entry) => entry.metric === marker)) fail("metric source map missing " + marker);
  pass("metric source map includes " + marker);
  includes("contract", contract, marker);
  includes("checklist", checklist, marker);
}

for (const marker of [
  "Phase 18B — Schema Discovery + Metric Source Map Contract",
  "schema discovery from local SQL migrations",
  "discovered table inventory",
  "analytics metric source map",
  "experiment source map",
  "Carnos/memory/context source awareness",
  "offline cache candidate list",
  "sensitive/restricted candidate list",
  "sync candidate list",
  "schema gap report",
  "no new tables",
  "no migrations",
  "no runtime SQL reads",
  "no Supabase client calls",
  "no fake data",
  "no fake table claims",
  "Supabase/Postgres as online source of truth",
  "IndexedDB or equivalent encrypted local cache",
  "browser localStorage core-data ban",
  "offline sync queue requirement",
  "Level 4 Option C local AI readiness"
]) includes("contract", contract, marker);

for (const marker of [
  "Phase 18B Schema Discovery + Metric Source Map",
  "Discovery counts",
  "Discovered tables",
  "Metric source map",
  "Offline cache candidates",
  "Sensitive or restricted candidates",
  "Schema gaps",
  "Phase 18A-B integration",
  "Supabase/Postgres as online source of truth",
  "IndexedDB or equivalent encrypted local cache",
  "no localStorage core data",
  "Level 4 Option C local AI readiness"
]) includes("source map markdown", sourceMapMd, marker);

for (const marker of [
  "Phase 18B Schema Discovery + Metric Source Map Smoke Checklist",
  "Source map builder exists",
  "Source map JSON exists",
  "Source map markdown exists",
  "Discovery is local/static only",
  "No new tables are created",
  "No migrations are created",
  "No Supabase client calls are added",
  "Offline cache candidates are listed",
  "Sensitive/restricted candidates are listed",
  "Schema gaps are listed",
  "npm run audit:phase18b",
  "npm run check"
]) includes("checklist", checklist, marker);

for (const marker of [
  "Phase 18B Schema Discovery + Metric Source Map Report",
  "static schema discovery",
  "metric source mapping",
  "discovery-only",
  "No schema is created yet",
  "No runtime Supabase/Postgres reads occur",
  "No fake analytics data is added",
  "prevents later chunks from inventing fake metric sources"
]) includes("report", report, marker);

for (const marker of [
  "build-phase-18b-schema-source-map.mjs",
  "phase18b_schema_source_map.json",
  "canonicalMetrics",
  "offlineCacheCandidates",
  "sensitiveCandidates",
  "schema_gaps",
  "no_new_tables_created"
]) includes("builder", builder, marker);

for (const marker of [
  "create table",
  "alter table",
  "createSupabaseServerClient",
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
  excludes("builder", builder, marker);
}

includes("package.json", pkg, "\"audit:phase18b\"");
includes("package.json", pkg, "npm run audit:phase18a_b && npm run audit:phase18b");
includes("package.json", pkg, "npm run audit:phase18b && npm run build");

console.log("\n✓ Phase 18B schema discovery + metric source map audit passed.");

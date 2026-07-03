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

console.log("\n=== PHASE 18D ANALYTICS SNAPSHOT CONTRACTS AUDIT ===");

const implementation = read("src/lib/analytics-experiments/analytics-snapshot-contracts.ts");
const index = read("src/lib/analytics-experiments/index.ts");
const contract = read("docs/contracts/PHASE_18D_ANALYTICS_SNAPSHOT_CONTRACTS.md");
const checklist = read("docs/qa/PHASE_18D_ANALYTICS_SNAPSHOT_SMOKE_CHECKLIST.md");
const report = read("docs/phase-reports/PHASE_18D_ANALYTICS_SNAPSHOT_CONTRACTS_REPORT.md");
const fixtureText = read("docs/fixtures/phase18-analytics-experiments/phase18d_analytics_snapshot_fixture.json");
const pkg = read("package.json");

let fixture;
try {
  fixture = JSON.parse(fixtureText);
  pass("fixture JSON parses");
} catch (error) {
  fail("fixture JSON does not parse: " + error.message);
}

if (fixture.phase !== "18D") fail("fixture phase is not 18D");
pass("fixture phase is 18D");

for (const marker of [
  "AnalyticsSnapshotRange",
  "AnalyticsSnapshotFreshness",
  "AnalyticsSnapshotProvenance",
  "AnalyticsSnapshotExportReadiness",
  "AnalyticsSnapshotMetricValue",
  "AnalyticsSnapshotContract",
  "AnalyticsSnapshotValidationResult",
  "PHASE_18D_ANALYTICS_SNAPSHOT_BOUNDARY",
  "createSnapshotMetricValue",
  "summarizeSnapshotCompleteness",
  "validateAnalyticsSnapshot",
  "buildEmptyAnalyticsSnapshot",
  "summarizeAnalyticsSnapshotContract"
]) includes("implementation", implementation, marker);

for (const marker of [
  "daily",
  "weekly",
  "monthly",
  "rolling",
  "fresh",
  "cached",
  "stale",
  "partial",
  "missing",
  "online_source_of_truth",
  "eligible_offline_cache",
  "mixed_online_offline",
  "deterministic_preview",
  "export_ready",
  "export_ready_with_warnings",
  "not_export_ready"
]) {
  includes("implementation", implementation, marker);
  includes("contract", contract, marker);
  includes("checklist", checklist, marker);
}

for (const marker of [
  "Snapshot id is required",
  "Snapshot must be user scoped",
  "Snapshot range start must be before range end",
  "Snapshot must include at least one metric",
  "Snapshot metric is not registered",
  "High confidence metric cannot include confounders",
  "High confidence metric cannot include unsynced records",
  "High confidence metric cannot depend on stale cached snapshot",
  "Cached metric should disclose cached context",
  "Unsynced metric should disclose unsynced records",
  "Stale metric should disclose stale snapshot",
  "Snapshot contract must not enable runtime data reads",
  "Snapshot contract must not enable schema writes",
  "Snapshot contract must not enable Supabase calls",
  "Snapshot contract must not allow localStorage core data",
  "Snapshot contract must not require local Carnos runtime",
  "Carnos must disclose cached or stale snapshot context",
  "Carnos may explain this snapshot within metric quality limits"
]) includes("implementation", implementation, marker);

for (const marker of [
  "Analytics Snapshot System foundation",
  "snapshot contract types",
  "snapshot metric value types",
  "snapshot range types",
  "snapshot freshness labels",
  "snapshot provenance modes",
  "snapshot export readiness states",
  "snapshot completeness summary",
  "snapshot quality summary",
  "comparison eligibility rule",
  "Carnos snapshot explanation limits",
  "cached/stale/unsynced disclosure rules",
  "time range validation",
  "registered metric validation",
  "no high confidence with confounders",
  "no high confidence with unsynced records",
  "no high confidence with stale cached snapshots",
  "Supabase/Postgres as online source of truth",
  "IndexedDB or equivalent encrypted local cache",
  "browser localStorage core-data ban",
  "deterministic offline fallback",
  "no schema writes",
  "no runtime SQL reads",
  "no Supabase client calls",
  "no fake snapshot data",
  "no local Carnos runtime requirement"
]) includes("contract", contract, marker);

for (const marker of [
  "Analytics snapshot contract implementation exists",
  "Snapshot fixture exists",
  "Registered metric validation exists",
  "Time range validation exists",
  "No high confidence with confounders rule exists",
  "No high confidence with unsynced records rule exists",
  "No high confidence with stale cached snapshots rule exists",
  "Cached/stale/unsynced explanation limits exist",
  "Carnos snapshot explanation limits exist",
  "Future local Carnos runtime compatibility is represented",
  "No runtime SQL reads are added",
  "No Supabase client calls are added",
  "No schema writes are added",
  "npm run audit:phase18d",
  "npm run check"
]) includes("checklist", checklist, marker);

for (const marker of [
  "Phase 18D Analytics Snapshot Contracts Report",
  "analytics snapshot contracts and validators",
  "registered metrics only",
  "completeness average",
  "quality summary",
  "comparison eligibility",
  "export readiness",
  "cached/stale/unsynced disclosure",
  "No schema is created",
  "No Supabase/Postgres runtime reads occur",
  "No fake analytics snapshots are added",
  "No local Carnos runtime is required during checks"
]) includes("report", report, marker);

includes("index", index, "export * from \"./analytics-snapshot-contracts\"");
includes("package.json", pkg, "\"audit:phase18d\"");
includes("package.json", pkg, "npm run audit:phase18c && npm run audit:phase18d");
includes("package.json", pkg, "npm run audit:phase18d && npm run build");

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

console.log("\n✓ Phase 18D analytics snapshot contracts audit passed.");

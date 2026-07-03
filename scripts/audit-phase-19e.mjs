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

console.log("=== PHASE 19E SCHEMA VERSIONING ARCHIVE BOUNDARIES AUDIT ===");

const implementation = read("src/lib/custom-trackers/schema-versioning-archive-boundaries.ts");
const index = read("src/lib/custom-trackers/index.ts");
const contract = read("docs/contracts/PHASE_19E_SCHEMA_VERSIONING_ARCHIVE_BOUNDARIES.md");
const checklist = read("docs/qa/PHASE_19E_SCHEMA_VERSIONING_ARCHIVE_BOUNDARIES_CHECKLIST.md");
const report = read("docs/phase-reports/PHASE_19E_SCHEMA_VERSIONING_ARCHIVE_BOUNDARIES_REPORT.md");
const fixtureText = read("docs/fixtures/phase19-custom-trackers/phase19e_schema_versioning_archive_boundaries_fixture.json");
const pkgText = read("package.json");

let fixture;
try {
  fixture = JSON.parse(fixtureText);
  pass("fixture JSON parses");
} catch {
  fail("fixture JSON does not parse");
}

if (fixture.phase !== "19E") fail("fixture phase is not 19E");
if (fixture.status !== "complete") fail("fixture status is not complete");
pass("fixture phase/status is 19E complete");

for (const marker of [
  "CustomTrackerSchemaVersion",
  "CustomTrackerSchemaVersionChangeKind",
  "CustomTrackerSchemaCompatibilityStatus",
  "CustomTrackerLifecycleAction",
  "CustomTrackerArchiveDecisionStatus",
  "CustomTrackerFieldDeprecationPlan",
  "CustomTrackerSchemaVersionRecord",
  "CustomTrackerSchemaCompatibilityInput",
  "CustomTrackerArchiveDecision",
  "CustomTrackerLifecycleTransitionResult",
  "CustomTrackerFieldLifecycleTransitionResult",
  "CustomTrackerVersioningArchiveSummary",
  "PHASE_19E_SCHEMA_VERSIONING_ARCHIVE_BOUNDARY",
  "DEFAULT_CUSTOM_TRACKER_SCHEMA_VERSION",
  "CUSTOM_TRACKER_SCHEMA_CHANGE_KINDS",
  "CUSTOM_TRACKER_SCHEMA_COMPATIBILITY_STATUSES",
  "parseCustomTrackerSchemaVersion",
  "formatCustomTrackerSchemaVersion",
  "compareCustomTrackerSchemaVersions",
  "incrementCustomTrackerSchemaVersion",
  "buildCustomTrackerSchemaVersionRecord",
  "evaluateCustomTrackerEntrySchemaCompatibility",
  "canReadDeprecatedCustomTrackerField",
  "canWriteDeprecatedCustomTrackerField",
  "buildCustomTrackerFieldDeprecationPlan",
  "canTransitionCustomTrackerFieldStatus",
  "canTransitionCustomTrackerLifecycleStatus",
  "buildCustomTrackerArchiveDecision",
  "buildCustomTrackerEntryArchiveDecision",
  "buildCustomTrackerRemovalDecision",
  "summarizeCustomTrackerVersioningArchiveBoundary"
]) includes("implementation", implementation, marker);

for (const marker of [
  "schemaVersioningEnabled: true",
  "entrySchemaVersionTrackingEnabled: true",
  "deprecatedFieldReadCompatibilityEnabled: true",
  "fieldHardRemovalAllowed: false",
  "trackerHardRemovalAllowed: false",
  "entryHardRemovalAllowed: false",
  "archiveInsteadOfDestructiveRemoval: true",
  "runtimeWritesEnabled: false",
  "schemaMigrationEnabled: false",
  "compatible_with_deprecated_fields",
  "migration_required",
  "field_deprecated",
  "archive_state_changed",
  "destructive tracker removal is blocked",
  "field can be deprecated while preserving historical entry reads",
  "field lifecycle transition is blocked to prevent unsafe field removal",
  "tracker lifecycle transition is blocked to preserve history"
]) includes("implementation validation coverage", implementation, marker);

includes("index", index, "export * from \"./schema-versioning-archive-boundaries\"");

for (const marker of [
  "Tracker schema versioning",
  "Entry schema version tracking",
  "Schema version parsing and comparison",
  "Version compatibility checks",
  "Deprecated-field read compatibility",
  "Field deprecation instead of unsafe hard deletion",
  "Safe field lifecycle transitions",
  "Safe tracker lifecycle transitions",
  "Tracker archive boundary",
  "Entry archive boundary",
  "Safe removal decision helpers",
  "Archive/removal safety result helpers",
  "No destructive delete boundary",
  "No SQL schema migration is added in 19E",
  "No runtime database read or write is added in 19E",
  "Before any future migration, schema must be inspected or explicitly requested"
]) includes("contract", contract, marker);

for (const marker of [
  "Tracker schema versioning exists",
  "Entry schema version tracking boundary exists",
  "Schema version parsing exists",
  "Schema version comparison exists",
  "Version compatibility checks exist",
  "Deprecated-field read compatibility exists",
  "Field deprecation plan exists",
  "Field lifecycle transition safety exists",
  "Tracker lifecycle transition safety exists",
  "Tracker archive boundary exists",
  "Entry archive boundary exists",
  "Safe removal decision helper exists",
  "No destructive delete boundary exists",
  "No SQL migration is added",
  "No runtime database read/write is added",
  "npm run audit:phase19e",
  "npm run check"
]) includes("checklist", checklist, marker);

for (const marker of [
  "Phase 19E adds deterministic local schema versioning",
  "Entry schema version compatibility can be evaluated",
  "Deprecated fields remain readable for historical entries",
  "Deprecated fields are not writable",
  "Field hard removal is blocked by boundary",
  "Tracker hard removal is blocked by boundary",
  "Entry hard removal is blocked by boundary",
  "Archive decisions preserve history",
  "No SQL migration was added",
  "No runtime database call was added",
  "No Carnos write behavior was added"
]) includes("report", report, marker);

for (const marker of [
  "tracker_schema_versioning",
  "entry_schema_version_tracking",
  "schema_version_parsing",
  "schema_version_comparison",
  "version_compatibility_checks",
  "deprecated_field_read_compatibility",
  "field_deprecation_instead_of_unsafe_hard_deletion",
  "safe_field_lifecycle_transitions",
  "safe_tracker_lifecycle_transitions",
  "tracker_archive_boundary",
  "entry_archive_boundary",
  "safe_removal_decision_helpers",
  "archive_removal_safety_result_helpers",
  "no_destructive_delete_boundary"
]) includes("fixture", fixtureText, marker);

includes("package.json", pkgText, "audit:phase19e");
includes("package.json", pkgText, "scripts/audit-phase-19e.mjs");

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

console.log("✓ Phase 19E schema versioning archive boundaries audit passed.");

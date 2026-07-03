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

console.log("=== PHASE 19D ENTRY VALIDATION VALUES_JSON SAFETY AUDIT ===");

const implementation = read("src/lib/custom-trackers/entry-validation.ts");
const index = read("src/lib/custom-trackers/index.ts");
const contract = read("docs/contracts/PHASE_19D_ENTRY_VALIDATION_VALUES_JSON_SAFETY.md");
const checklist = read("docs/qa/PHASE_19D_ENTRY_VALIDATION_VALUES_JSON_SAFETY_CHECKLIST.md");
const report = read("docs/phase-reports/PHASE_19D_ENTRY_VALIDATION_VALUES_JSON_SAFETY_REPORT.md");
const fixtureText = read("docs/fixtures/phase19-custom-trackers/phase19d_entry_validation_values_json_safety_fixture.json");
const pkgText = read("package.json");

let fixture;
try {
  fixture = JSON.parse(fixtureText);
  pass("fixture JSON parses");
} catch {
  fail("fixture JSON does not parse");
}

if (fixture.phase !== "19D") fail("fixture phase is not 19D");
if (fixture.status !== "complete") fail("fixture status is not complete");
pass("fixture phase/status is 19D complete");

for (const marker of [
  "CustomTrackerEntryValidationMode",
  "CustomTrackerDuplicatePolicy",
  "CustomTrackerEntryValidationStatus",
  "CustomTrackerEntryFieldIssueKind",
  "CustomTrackerEntryFieldIssue",
  "CustomTrackerEntryValidationInput",
  "CustomTrackerEntryDuplicateResult",
  "CustomTrackerEntryValidationResult",
  "CustomTrackerEntryValidationSummary",
  "PHASE_19D_ENTRY_VALIDATION_BOUNDARY",
  "DEFAULT_ENTRY_VALIDATION_MODE",
  "DEFAULT_DUPLICATE_POLICY",
  "MAX_CUSTOM_TRACKER_ENTRY_NOTE_LENGTH",
  "MAX_CUSTOM_TRACKER_VALUES_JSON_KEYS",
  "isPlainCustomTrackerValuesJson",
  "validateCustomTrackerValuesJsonShape",
  "validateCustomTrackerEntryDate",
  "validateCustomTrackerEntryNotes",
  "buildCustomTrackerFieldDefinitionFromCore",
  "detectCustomTrackerEntryDuplicate",
  "validateCustomTrackerEntry",
  "summarizeCustomTrackerEntryValidationResults",
  "assertNoFakeCustomTrackerEntryRuntimeData"
]) includes("implementation", implementation, marker);

for (const marker of [
  "valuesJsonRequiresPlainObject: true",
  "unknownFieldsRejectedByDefault: true",
  "duplicateEntriesWarnByDefault: true",
  "invalidValuesDoNotWriteSilently: true",
  "fakeTrackerEntriesAllowed: false",
  "runtimeWritesEnabled: false",
  "schemaMigrationEnabled: false",
  "values_json must be a plain object",
  "required field value is missing",
  "entry date must use YYYY-MM-DD format",
  "same-day duplicate entry found",
  "same-day duplicate entry is blocked",
  "unknown_field",
  "invalid_value",
  "missing_required",
  "unsafe_values_json",
  "duplicate_entry",
  "quarantine_invalid",
  "strict_reject",
  "warn_same_day",
  "block_same_day"
]) includes("implementation validation coverage", implementation, marker);

includes("index", index, "export * from \"./entry-validation\"");

for (const marker of [
  "Custom tracker entry validation",
  "values_json object safety validation",
  "Required field validation against tracker fields",
  "Optional field handling",
  "Unknown field rejection/quarantine using Phase 19C rules",
  "Invalid field value rejection/quarantine behavior",
  "Entry date validation",
  "Entry notes validation",
  "Duplicate entry detection",
  "Same-day duplicate warning",
  "Entry validation result summaries",
  "No uncontrolled JSON chaos boundary",
  "No fake tracker entries boundary",
  "No SQL schema migration is added in 19D",
  "No runtime database read or write is added in 19D",
  "Schema versioning and field deprecation behavior remain for 19E"
]) includes("contract", contract, marker);

for (const marker of [
  "Entry validation helper exists",
  "values_json shape validation exists",
  "Required field validation exists",
  "Optional field handling exists",
  "Unknown field rejection exists",
  "Unknown field quarantine exists",
  "Invalid value rejection/quarantine exists",
  "Entry date validation exists",
  "Entry notes validation exists",
  "Duplicate entry detection exists",
  "Same-day duplicate warning exists",
  "Entry validation summary exists",
  "No uncontrolled JSON chaos boundary exists",
  "No fake tracker entries boundary exists",
  "No SQL migration is added",
  "No runtime database read/write is added",
  "npm run audit:phase19d",
  "npm run check"
]) includes("checklist", checklist, marker);

for (const marker of [
  "Phase 19D adds deterministic local entry validation",
  "values_json must be a plain object",
  "Unknown fields are rejected by default or quarantined by explicit policy",
  "Invalid values are rejected by default or quarantined by explicit mode",
  "Same-day duplicates warn by default and can be blocked by explicit policy",
  "No uncontrolled JSON chaos is accepted silently",
  "No fake tracker entries are allowed as runtime data",
  "No SQL migration was added",
  "No runtime database call was added",
  "No Carnos write behavior was added"
]) includes("report", report, marker);

for (const marker of [
  "custom_tracker_entry_validation",
  "values_json_object_safety_validation",
  "required_field_validation_against_tracker_fields",
  "optional_field_handling",
  "unknown_field_rejection",
  "unknown_field_quarantine",
  "invalid_field_value_rejection",
  "invalid_field_value_quarantine",
  "entry_date_validation",
  "entry_notes_validation",
  "duplicate_entry_detection",
  "same_day_duplicate_warning",
  "entry_validation_result_summaries",
  "no_uncontrolled_json_chaos_boundary",
  "no_fake_tracker_entries_boundary"
]) includes("fixture", fixtureText, marker);

includes("package.json", pkgText, "audit:phase19d");
includes("package.json", pkgText, "scripts/audit-phase-19d.mjs");

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

console.log("✓ Phase 19D entry validation values_json safety audit passed.");

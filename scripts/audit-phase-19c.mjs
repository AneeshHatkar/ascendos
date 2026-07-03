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

console.log("=== PHASE 19C FIELD TYPE REGISTRY VALIDATION AUDIT ===");

const implementation = read("src/lib/custom-trackers/field-type-registry.ts");
const index = read("src/lib/custom-trackers/index.ts");
const contract = read("docs/contracts/PHASE_19C_FIELD_TYPE_REGISTRY_VALIDATION.md");
const checklist = read("docs/qa/PHASE_19C_FIELD_TYPE_REGISTRY_VALIDATION_CHECKLIST.md");
const report = read("docs/phase-reports/PHASE_19C_FIELD_TYPE_REGISTRY_VALIDATION_REPORT.md");
const fixtureText = read("docs/fixtures/phase19-custom-trackers/phase19c_field_type_registry_validation_fixture.json");
const pkgText = read("package.json");

let fixture;
try {
  fixture = JSON.parse(fixtureText);
  pass("fixture JSON parses");
} catch {
  fail("fixture JSON does not parse");
}

if (fixture.phase !== "19C") fail("fixture phase is not 19C");
if (fixture.status !== "complete") fail("fixture status is not complete");
pass("fixture phase/status is 19C complete");

for (const marker of [
  "CustomTrackerUnknownFieldPolicy",
  "CustomTrackerFieldValueValidationStatus",
  "CustomTrackerFieldUnitKind",
  "CustomTrackerFieldNormalizationKind",
  "CustomTrackerFieldOption",
  "CustomTrackerFieldOptionsJson",
  "CustomTrackerFieldValidationRule",
  "CustomTrackerFieldDefinitionInput",
  "CustomTrackerFieldValueValidationInput",
  "CustomTrackerFieldValidationResult",
  "CustomTrackerUnknownFieldDecision",
  "CustomTrackerFieldRegistrySummary",
  "CUSTOM_TRACKER_FIELD_KINDS",
  "CUSTOM_TRACKER_FIELD_UNIT_KINDS",
  "CUSTOM_TRACKER_FIELD_NORMALIZATION_KINDS",
  "CUSTOM_TRACKER_FIELD_VALIDATION_RULES",
  "DEFAULT_UNKNOWN_FIELD_POLICY",
  "isAllowedCustomTrackerFieldKind",
  "getCustomTrackerFieldRule",
  "normalizeCustomTrackerFieldOptionKey",
  "validateCustomTrackerFieldOptionsJson",
  "validateCustomTrackerFieldDefinition",
  "validateCustomTrackerFieldValue",
  "isAllowedCustomTrackerOptionValue",
  "normalizeCustomTrackerFieldValue",
  "decideUnknownCustomTrackerField",
  "summarizeCustomTrackerFieldRegistry"
]) includes("implementation", implementation, marker);

for (const marker of [
  "text",
  "number",
  "boolean",
  "date",
  "rating",
  "select",
  "multi_select",
  "duration",
  "json",
  "requiresOptions: true",
  "supportsOptions: true",
  "supportsUnit: true",
  "supportsNormalization: true",
  "field options are required for this field kind",
  "field options are not supported for this field kind",
  "required field value is missing",
  "select field value must match an active option key",
  "multi-select field values must match active option keys",
  "rating field value must be an integer between 1 and 10",
  "unknown field is rejected",
  "unknown field is quarantined for review"
]) includes("implementation validation coverage", implementation, marker);

includes("index", index, "export * from \"./field-type-registry\"");

for (const marker of [
  "Allowed field type registry",
  "Field type validation",
  "Required and optional field rules",
  "Field ordering validation",
  "Field options JSON contract for select and multi-select fields",
  "Select option validation",
  "Multi-select option validation",
  "Number validation boundary",
  "Rating validation boundary",
  "Date validation boundary",
  "Duration validation boundary",
  "Text validation boundary",
  "Boolean validation boundary",
  "JSON/object validation boundary",
  "Field units and normalization metadata boundary",
  "Field privacy validation",
  "Unknown-field rejection or quarantine rules",
  "No SQL schema migration is added in 19C",
  "No runtime database read or write is added in 19C",
  "Entry values_json validation remains for 19D",
  "Schema versioning and deprecation remain for 19E"
]) includes("contract", contract, marker);

for (const marker of [
  "Field type registry exists",
  "Field validation rules exist",
  "Required field behavior exists",
  "Optional field behavior exists",
  "Field order validation exists",
  "Select options JSON validation exists",
  "Multi-select options JSON validation exists",
  "Text value validation exists",
  "Number value validation exists",
  "Boolean value validation exists",
  "Date value validation exists",
  "Rating value validation exists",
  "Duration value validation exists",
  "JSON object value validation exists",
  "Unit metadata boundary exists",
  "Normalization metadata boundary exists",
  "Privacy validation exists",
  "Unknown-field reject/quarantine rules exist",
  "No SQL migration is added",
  "No runtime database read/write is added",
  "npm run audit:phase19c",
  "npm run check"
]) includes("checklist", checklist, marker);

for (const marker of [
  "Phase 19C adds the field type registry and field validation rules",
  "Field definition validation is deterministic and local",
  "Field value validation is deterministic and local",
  "Unknown fields are rejected by default and can be quarantined by explicit policy",
  "No SQL migration was added",
  "No runtime database call was added",
  "No Carnos write behavior was added"
]) includes("report", report, marker);

for (const marker of [
  "allowed_field_type_registry",
  "field_type_validation",
  "required_optional_field_rules",
  "field_ordering_validation",
  "select_options_json_contract",
  "multi_select_options_json_contract",
  "select_option_validation",
  "multi_select_option_validation",
  "number_validation_boundary",
  "rating_validation_boundary",
  "date_validation_boundary",
  "duration_validation_boundary",
  "text_validation_boundary",
  "boolean_validation_boundary",
  "json_object_validation_boundary",
  "field_units_metadata_boundary",
  "field_normalization_metadata_boundary",
  "field_privacy_validation",
  "unknown_field_reject_quarantine_rules",
  "field_validation_result_helpers"
]) includes("fixture", fixtureText, marker);

includes("package.json", pkgText, "audit:phase19c");
includes("package.json", pkgText, "scripts/audit-phase-19c.mjs");

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

console.log("✓ Phase 19C field type registry validation audit passed.");

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

console.log("\\n=== PHASE 19B CORE TRACKER DOMAIN CONTRACTS AUDIT ===");

const implementation = read("src/lib/custom-trackers/core-tracker-domain-contracts.ts");
const index = read("src/lib/custom-trackers/index.ts");
const contract = read("docs/contracts/PHASE_19B_CORE_TRACKER_DOMAIN_CONTRACTS.md");
const checklist = read("docs/qa/PHASE_19B_CORE_TRACKER_DOMAIN_CONTRACTS_CHECKLIST.md");
const report = read("docs/phase-reports/PHASE_19B_CORE_TRACKER_DOMAIN_CONTRACTS_REPORT.md");
const fixtureText = read("docs/fixtures/phase19-custom-trackers/phase19b_core_tracker_domain_contracts_fixture.json");
const pkgText = read("package.json");

let fixture;
try {
  fixture = JSON.parse(fixtureText);
  pass("fixture JSON parses");
} catch {
  fail("fixture JSON does not parse");
}

if (fixture.phase !== "19B") fail("fixture phase is not 19B");
if (fixture.status !== "complete") fail("fixture status is not complete");
pass("fixture phase/status is 19B complete");

for (const marker of [
  "CustomTrackerDomain",
  "CustomTrackerLifecycleStatus",
  "CustomTrackerOrigin",
  "CustomTrackerPrivacyLevel",
  "CustomTrackerFieldStatus",
  "CustomTrackerEntryStatus",
  "CustomTrackerCoreRecord",
  "CustomTrackerFieldCoreRecord",
  "CustomTrackerEntryCoreRecord",
  "CustomTrackerCoreBoundary",
  "PHASE_19B_CORE_TRACKER_BOUNDARY",
  "CUSTOM_TRACKER_DOMAINS",
  "CUSTOM_TRACKER_LIFECYCLE_STATUSES",
  "CUSTOM_TRACKER_PRIVACY_LEVELS",
  "RESERVED_SYSTEM_TRACKER_KEYS",
  "normalizeTrackerStableKey",
  "buildTrackerStableKey",
  "isReservedSystemTrackerKey",
  "canCustomTrackerOverrideCoreModule",
  "validateCustomTrackerCoreRecord",
  "validateCustomTrackerFieldCoreRecord",
  "validateCustomTrackerEntryCoreRecord",
  "detectCustomTrackerNameCollision",
  "assertCustomTrackerOwnership",
  "summarizeCustomTrackerCore",
  "runtimeWritesEnabled: false",
  "schemaMigrationEnabled: false",
  "customTrackerCanOverrideCoreModule: false",
  "stableKeyRequired: true",
  "userOwnershipRequired: true"
]) includes("implementation", implementation, marker);

for (const marker of [
  "career",
  "learning",
  "research",
  "health",
  "body",
  "finance",
  "grimoire",
  "creativity",
  "life_admin",
  "custom",
  "draft",
  "active",
  "inactive",
  "archived",
  "standard",
  "sensitive",
  "private",
  "restricted",
  "command",
  "timeline",
  "calendar",
  "goals",
  "proof",
  "documents",
  "memory",
  "carnos"
]) includes("implementation enum/domain coverage", implementation, marker);

for (const marker of [
  "export * from \"./core-tracker-domain-contracts\""
]) includes("index", index, marker);

for (const marker of [
  "Custom tracker domain model",
  "Custom tracker field model",
  "Custom tracker entry model",
  "Tracker lifecycle and status model",
  "Tracker archive boundary",
  "Stable tracker key and slug behavior",
  "Naming collision handling",
  "System tracker versus user tracker boundary",
  "Custom trackers cannot override core modules",
  "No SQL schema migration is added in 19B",
  "No runtime database read or write is added in 19B",
  "Field type validation details remain for 19C",
  "Entry values_json validation details remain for 19D",
  "Schema versioning and deprecation remain for 19E"
]) includes("contract", contract, marker);

for (const marker of [
  "Core tracker contract file exists",
  "Custom tracker domain model exists",
  "Custom tracker field model exists",
  "Custom tracker entry model exists",
  "Tracker lifecycle/status model exists",
  "Tracker privacy model exists",
  "Stable key/slug helper exists",
  "Reserved system tracker keys are represented",
  "Naming collision helper exists",
  "Core ownership helper exists",
  "Custom trackers cannot override core modules",
  "No SQL migration is added",
  "No runtime database read/write is added",
  "npm run audit:phase19b",
  "npm run check"
]) includes("checklist", checklist, marker);

for (const marker of [
  "Phase 19B adds the core TypeScript domain contracts",
  "Custom tracker records cannot be marked as system trackers",
  "Custom tracker stable keys are normalized",
  "Reserved system tracker keys are protected",
  "Display names can change while stable keys remain the durable identity boundary",
  "No SQL migration was added",
  "No runtime database call was added",
  "No Carnos write behavior was added"
]) includes("report", report, marker);

for (const marker of [
  "custom_tracker_domain_model",
  "custom_tracker_field_model",
  "custom_tracker_entry_model",
  "tracker_lifecycle_status_model",
  "tracker_privacy_model",
  "tracker_origin_model",
  "stable_tracker_key_slug",
  "reserved_system_tracker_keys",
  "naming_collision_handling",
  "system_tracker_vs_user_tracker_boundary",
  "custom_trackers_cannot_override_core_modules",
  "ownership_alignment_helpers"
]) includes("fixture", fixtureText, marker);

includes("package.json", pkgText, "audit:phase19b");
includes("package.json", pkgText, "scripts/audit-phase-19b.mjs");

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

console.log("\\n✓ Phase 19B core tracker domain contracts audit passed.");

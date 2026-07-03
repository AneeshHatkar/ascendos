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

console.log("=== PHASE 19G PRIVACY CARNOS PERMISSIONS AUDIT ===");

const implementation = read("src/lib/custom-trackers/privacy-carnos-permissions.ts");
const index = read("src/lib/custom-trackers/index.ts");
const contract = read("docs/contracts/PHASE_19G_PRIVACY_CARNOS_PERMISSIONS.md");
const checklist = read("docs/qa/PHASE_19G_PRIVACY_CARNOS_PERMISSIONS_CHECKLIST.md");
const report = read("docs/phase-reports/PHASE_19G_PRIVACY_CARNOS_PERMISSIONS_REPORT.md");
const fixtureText = read("docs/fixtures/phase19-custom-trackers/phase19g_privacy_carnos_permissions_fixture.json");
const pkgText = read("package.json");

let fixture;
try {
  fixture = JSON.parse(fixtureText);
  pass("fixture JSON parses");
} catch {
  fail("fixture JSON does not parse");
}

if (fixture.phase !== "19G") fail("fixture phase is not 19G");
if (fixture.status !== "complete") fail("fixture status is not complete");
pass("fixture phase/status is 19G complete");

for (const marker of [
  "CustomTrackerPrivacyExposureSurface",
  "CustomTrackerPrivacyDecisionStatus",
  "CustomTrackerPrivacyRestrictedState",
  "CustomTrackerCarnosPermissionKind",
  "CustomTrackerPrivacyPolicyInput",
  "CustomTrackerFieldPrivacyPolicyInput",
  "CustomTrackerDashboardExposureDecision",
  "CustomTrackerCarnosPermissionSet",
  "CustomTrackerCarnosPermissionInput",
  "CustomTrackerCarnosPermissionDecision",
  "CustomTrackerPrivacyReadinessInput",
  "CustomTrackerPrivacyReadinessResult",
  "CustomTrackerCarnosPermissionSummary",
  "PHASE_19G_PRIVACY_CARNOS_BOUNDARY",
  "CUSTOM_TRACKER_PRIVACY_EXPOSURE_SURFACES",
  "CUSTOM_TRACKER_CARNOS_PERMISSION_KINDS",
  "CUSTOM_TRACKER_PRIVACY_RANK",
  "isAllowedCustomTrackerPrivacyLevel",
  "isSensitiveCustomTrackerPrivacyLevel",
  "isRestrictedCustomTrackerPrivacyLevel",
  "getHighestCustomTrackerPrivacyLevel",
  "evaluateCustomTrackerDashboardExposure",
  "evaluateCustomTrackerFieldPrivacy",
  "evaluateCustomTrackerCarnosPermission",
  "buildCustomTrackerCarnosPermissionSet",
  "summarizeCustomTrackerCarnosPermissions",
  "validateCustomTrackerPrivacyReadiness",
  "assertNoSilentCustomTrackerCarnosAccess"
]) includes("implementation", implementation, marker);

for (const marker of [
  "trackerPrivacyPolicyEnabled: true",
  "fieldPrivacyPolicyEnabled: true",
  "carnosAccessPolicyEnabled: true",
  "sensitiveDashboardExposureProtectionEnabled: true",
  "privacyRestrictedStateEnabled: true",
  "noSensitiveTrackerLeakageOntoBroadDashboards: true",
  "noUnreviewedCarnosMemoryWrites: true",
  "noSilentCarnosTrackerReads: true",
  "noSilentCarnosTrackerWrites: true",
  "runtimeWritesEnabled: false",
  "schemaMigrationEnabled: false",
  "carnosRuntimeEnabled: false",
  "restricted tracker cannot appear on broad dashboards",
  "sensitive tracker exposure requires explicit review before broad dashboard placement",
  "Carnos memory-candidate permission requires explicit user approval",
  "sensitive tracker data requires review before Carnos access",
  "memoryWriteAllowed: false",
  "silentReadAllowed: false",
  "silentWriteAllowed: false"
]) includes("implementation validation coverage", implementation, marker);

includes("index", index, "export * from \"./privacy-carnos-permissions\"");

for (const marker of [
  "Tracker privacy policy contract",
  "Field privacy policy contract",
  "Sensitive tracker dashboard exposure protection",
  "Privacy-restricted state",
  "Carnos read permission per tracker",
  "Carnos summary permission per tracker",
  "Carnos suggestion permission per tracker",
  "Carnos memory-candidate permission per tracker",
  "Carnos analytics permission per tracker",
  "Carnos permission summary helpers",
  "Privacy-ready validation",
  "No sensitive tracker leakage onto broad dashboards",
  "No unreviewed Carnos memory writes",
  "No silent Carnos tracker reads/writes",
  "No SQL schema migration is added in 19G",
  "No runtime database read or write is added in 19G"
]) includes("contract", contract, marker);

for (const marker of [
  "Tracker privacy policy contract exists",
  "Field privacy policy contract exists",
  "Sensitive tracker dashboard exposure protection exists",
  "Privacy-restricted state exists",
  "Carnos read permission exists",
  "Carnos summary permission exists",
  "Carnos suggestion permission exists",
  "Carnos memory-candidate permission exists",
  "Carnos analytics permission exists",
  "Carnos permission summary helper exists",
  "Privacy-ready validation exists",
  "No sensitive tracker leakage onto broad dashboards boundary exists",
  "No unreviewed Carnos memory writes boundary exists",
  "No silent Carnos tracker reads/writes boundary exists",
  "No SQL migration is added",
  "No runtime database read/write is added",
  "npm run audit:phase19g",
  "npm run check"
]) includes("checklist", checklist, marker);

for (const marker of [
  "Phase 19G adds deterministic local privacy and Carnos permission boundaries",
  "Sensitive tracker exposure is blocked or review-gated for broad dashboards",
  "Carnos read, summary, suggestion, memory-candidate, and analytics permissions are evaluated locally",
  "Carnos memory writes remain disabled without review",
  "Silent Carnos reads and writes remain disabled",
  "Privacy readiness reports required reviews, warnings, and errors",
  "No SQL migration was added",
  "No runtime database call was added",
  "No Carnos write behavior was added"
]) includes("report", report, marker);

for (const marker of [
  "tracker_privacy_policy_contract",
  "field_privacy_policy_contract",
  "sensitive_tracker_dashboard_exposure_protection",
  "privacy_restricted_state",
  "carnos_read_permission_per_tracker",
  "carnos_summary_permission_per_tracker",
  "carnos_suggestion_permission_per_tracker",
  "carnos_memory_candidate_permission_per_tracker",
  "carnos_analytics_permission_per_tracker",
  "carnos_permission_summary_helpers",
  "privacy_ready_validation",
  "no_sensitive_tracker_leakage_onto_broad_dashboards",
  "no_unreviewed_carnos_memory_writes",
  "no_silent_carnos_tracker_reads_writes"
]) includes("fixture", fixtureText, marker);

includes("package.json", pkgText, "audit:phase19g");
includes("package.json", pkgText, "scripts/audit-phase-19g.mjs");

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

console.log("✓ Phase 19G privacy Carnos permissions audit passed.");

import { existsSync, readFileSync } from "node:fs";

const checks = [];
const failures = [];

function pass(message) {
  checks.push(`✓ ${message}`);
}

function fail(message) {
  failures.push(`✗ ${message}`);
}

function requireFile(path) {
  if (existsSync(path)) {
    pass(`Found ${path}`);
    return readFileSync(path, "utf8");
  }

  fail(`Missing ${path}`);
  return "";
}

function requireIncludes(path, markers) {
  const content = requireFile(path);
  for (const marker of markers) {
    if (content.includes(marker)) {
      pass(`${path} includes ${marker}`);
    } else {
      fail(`${path} missing ${marker}`);
    }
  }
  return content;
}

function requireExcludes(path, markers) {
  const content = requireFile(path);
  for (const marker of markers) {
    if (content.includes(marker)) {
      fail(`${path} contains forbidden marker ${marker}`);
    } else {
      pass(`${path} avoids forbidden marker ${marker}`);
    }
  }
}

const migration = "supabase/migrations/0021_phase13_5e_settings_privacy_foundation.sql";
const repo = "src/lib/repositories/settings-privacy-read.ts";
const helper = "src/lib/dashboard/settings-privacy-dashboard-data-helpers.ts";
const panel = "src/components/dashboard/settings-privacy-foundation-panel.tsx";
const settingsPage = "src/app/settings/page.tsx";
const privacyPage = "src/app/privacy/page.tsx";

requireIncludes(migration, [
  "Phase 13.5E settings and privacy foundation",
  "create table if not exists public.app_settings",
  "create table if not exists public.privacy_settings",
  "alter table public.app_settings enable row level security;",
  "alter table public.privacy_settings enable row level security;",
  "Users can view their own app settings",
  "Users can view their own privacy settings",
  "app_settings_user_key_unique",
  "privacy_settings_user_key_unique",
  "export, delete, private mode",
]);

requireIncludes(repo, [
  "listAppSettings",
  "listPrivacySettings",
  "app_settings",
  "privacy_settings",
  "SettingsPrivacyReadResult",
]);

requireExcludes(repo, [
  ".insert(",
  ".update(",
  ".delete(",
  ".upsert(",
  "createSupabaseBrowserClient",
  "generateText",
  "streamText",
  "setInterval(",
  "setTimeout(",
  "executeApprovedAction(",
  "createProposedAction(",
]);

requireIncludes(helper, [
  "getSettingsPrivacyDashboardDataSummary",
  "summarizeSettingsPrivacyRows",
  "read_only_boundary: true",
  "app_settings",
  "privacy_settings",
  "export/delete flows remain Phase 19",
  "Carnos display-name rename remains final polish",
]);

requireExcludes(helper, [
  ".insert(",
  ".update(",
  ".delete(",
  ".upsert(",
  "createSupabaseBrowserClient",
  "generateText",
  "streamText",
  "setInterval(",
  "setTimeout(",
]);

requireIncludes(panel, [
  "SettingsPrivacyFoundationPanel",
  "Phase 13.5E Settings / Privacy Foundation",
  "App settings",
  "Privacy settings",
  "Protected boundaries",
  "does not mutate preferences",
  "export data",
  "delete data",
  "private mode",
  "rename",
]);

requireExcludes(panel, [
  ".insert(",
  ".update(",
  ".delete(",
  ".upsert(",
  ".from(",
  "createSupabaseBrowserClient",
  "generateText",
  "streamText",
  "setInterval(",
  "setTimeout(",
]);

requireIncludes(settingsPage, [
  "AuthenticatedDashboardShell",
  "SettingsPrivacyFoundationPanel",
  "ProfileSummaryCard",
  "getSettingsPrivacyDashboardDataSummary",
  "listAppSettings",
  "listPrivacySettings",
  "mutations are",
  "not wired",
]);

requireIncludes(privacyPage, [
  "AuthenticatedDashboardShell",
  "SettingsPrivacyFoundationPanel",
  "getSettingsPrivacyDashboardDataSummary",
  "listAppSettings",
  "listPrivacySettings",
  "Export, delete, private mode",
  "remain deferred",
]);

requireIncludes("src/lib/repositories/index.ts", [
  "settings-privacy-read",
]);

requireIncludes("src/lib/dashboard/index.ts", [
  "settings-privacy-dashboard-data-helpers",
]);

requireIncludes("src/components/dashboard/index.ts", [
  "settings-privacy-foundation-panel",
]);

requireIncludes("docs/database/PHASE_13_5E_SETTINGS_PRIVACY_SCHEMA_DESIGN.md", [
  "Phase 13.5E Settings / Privacy Schema Design",
  "app_settings",
  "privacy_settings",
  "Read-only",
  "Deferred",
]);

requireIncludes("docs/phase-reports/PHASE_13_5E_SETTINGS_PRIVACY_COMPLETION_REPORT.md", [
  "Phase 13.5E Settings / Privacy Completion Report",
  "Status: Complete",
  "app_settings",
  "privacy_settings",
  "Verification gates",
  "Deferred scope",
]);

requireIncludes("docs/qa/PHASE_13_5E_SETTINGS_PRIVACY_MANUAL_SMOKE_CHECKLIST.md", [
  "Phase 13.5E Settings / Privacy Manual Smoke Checklist",
  "/settings",
  "/privacy",
  "No writes",
  "Deferred controls",
]);

const pkg = JSON.parse(requireFile("package.json"));
if (pkg.scripts?.["audit:phase13_5e"] === "node scripts/audit-phase-13-5e.mjs") {
  pass("package.json includes audit:phase13_5e");
} else {
  fail("package.json missing audit:phase13_5e");
}

if (pkg.scripts?.check?.includes("npm run audit:phase13_5e")) {
  pass("npm run check includes audit:phase13_5e");
} else {
  fail("npm run check missing audit:phase13_5e");
}

requireIncludes("PROJECT_EXECUTION_LOG.md", ["Phase 13.5E"]);
requireIncludes("CODE_LEDGER.md", ["Phase 13.5E"]);
requireIncludes("CHANGELOG.md", ["Phase 13.5E"]);
requireIncludes("PHASE_STATUS.md", ["Phase 13.5E", "Phase 13.5F"]);

for (const line of checks) {
  console.log(line);
}

if (failures.length > 0) {
  console.error("\nPhase 13.5E audit failed:");
  for (const line of failures) {
    console.error(line);
  }
  process.exit(1);
}

console.log("\nPhase 13.5E settings/privacy foundation audit passed.");

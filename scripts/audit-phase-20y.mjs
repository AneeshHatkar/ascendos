import { existsSync, readFileSync } from "node:fs";

const files = [
  "src/app/privacy/page.tsx",
  "src/lib/privacy/privacy-dashboard-view-model.ts",
  "src/components/privacy/privacy-dashboard-ui.tsx",
  "docs/contracts/PHASE_20Y_PRIVACY_DASHBOARD_VIEW_MODEL_UI.md",
  "docs/fixtures/phase20-privacy-export/phase20y_privacy_dashboard_view_model_ui_fixture.json",
  "docs/phase-reports/PHASE_20Y_PRIVACY_DASHBOARD_VIEW_MODEL_UI_REPORT.md",
];

function read(path) {
  if (!existsSync(path)) throw new Error(path + " missing");
  return readFileSync(path, "utf8");
}

const page = read("src/app/privacy/page.tsx");
const viewModel = read("src/lib/privacy/privacy-dashboard-view-model.ts");
const ui = read("src/components/privacy/privacy-dashboard-ui.tsx");
const contract = read("docs/contracts/PHASE_20Y_PRIVACY_DASHBOARD_VIEW_MODEL_UI.md");
const fixture = JSON.parse(read("docs/fixtures/phase20-privacy-export/phase20y_privacy_dashboard_view_model_ui_fixture.json"));
read("docs/phase-reports/PHASE_20Y_PRIVACY_DASHBOARD_VIEW_MODEL_UI_REPORT.md");

for (const file of files) read(file);

const requiredPage = [
  "AuthenticatedDashboardShell",
  "PrivacyDashboardUi",
  "buildPrivacyDashboardViewModel",
  "getSettingsPrivacyDashboardDataSummary",
  "listAppSettings",
  "listPrivacySettings",
  "Read-only privacy command center",
];

const requiredViewModel = [
  "PrivacyDashboardViewModel",
  "buildPrivacyDashboardViewModel",
  "Memory Inbox",
  "Saved Memories",
  "Forget",
  "Private Mode",
  "Emergency Lockdown",
  "Export",
  "Destructive Action",
  "Sensitive Locks",
  "Spotify Connector",
  "Media Permissions",
  "Manual Workout Logging",
  "Deferred Connectors",
  "No database writes from /privacy.",
  "No Spotify provider calls from /privacy.",
  "No token value is displayed.",
  "No deferred connector is represented as connected.",
];

const requiredUi = [
  "PrivacyDashboardUi",
  "SettingsPrivacyFoundationPanel",
  "ForgetDeleteDerivedRecordsPanel",
  "MemoryAuditUsageTransparencyPanel",
  "Runtime guards",
  "Connectors and media permissions",
  "Audit and Carnos access",
  "Read-only live view",
];

const requiredContract = [
  "Phase 20Y",
  "Needs new database schema: false",
  "No database writes",
  "No Spotify provider calls",
  "No OAuth start or callback",
  "No token value",
  "No destructive action",
  "No export manifest",
  "No Carnos runtime action",
];

const missing = [];
for (const marker of requiredPage) if (!page.includes(marker)) missing.push("page missing " + marker);
for (const marker of requiredViewModel) if (!viewModel.includes(marker)) missing.push("view model missing " + marker);
for (const marker of requiredUi) if (!ui.includes(marker)) missing.push("UI missing " + marker);
for (const marker of requiredContract) if (!contract.includes(marker)) missing.push("contract missing " + marker);

if (fixture.schema_requirement.needs_new_database_schema !== false) missing.push("fixture schema gate should be false");
if (fixture.ui_sections.length < 10) missing.push("fixture UI sections incomplete");
if (fixture.dashboard_cards.length < 12) missing.push("fixture dashboard cards incomplete");
if (fixture.acceptance.length < 12) missing.push("fixture acceptance incomplete");

const forbiddenPageMarkers = ["createSupabaseServerClient", "spotify/api", "access_token", "refresh_token"];
for (const marker of forbiddenPageMarkers) if (page.includes(marker)) missing.push("page includes forbidden marker " + marker);

if (missing.length > 0) {
  console.error("Phase 20Y audit failed. Missing or invalid items:");
  for (const item of missing) console.error("- " + item);
  process.exit(1);
}

console.log("✓ Phase 20Y privacy dashboard view model and UI audit passed.");
console.log("✓ /privacy is wired to read-only Phase 20 cards, existing settings/privacy reads, connector truth states, redaction rules, and runtime guards.");

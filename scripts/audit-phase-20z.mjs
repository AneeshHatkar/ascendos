import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];

function read(path) {
  return readFileSync(join(root, path), "utf8");
}

function assertFile(path) {
  if (!existsSync(join(root, path))) {
    failures.push(`Missing required file: ${path}`);
    return "";
  }
  return read(path);
}

function assertIncludes(path, marker) {
  const text = assertFile(path);
  if (text && !text.includes(marker)) {
    failures.push(`${path} missing marker: ${marker}`);
  }
}

function assertIncludesLower(path, marker) {
  const text = assertFile(path).toLowerCase();
  const normalizedMarker = marker.toLowerCase();
  if (text && !text.includes(normalizedMarker)) {
    failures.push(`${path} missing case-insensitive marker: ${marker}`);
  }
}

function assertPackageScript(scriptName) {
  const pkg = JSON.parse(assertFile("package.json"));
  if (!pkg.scripts || !pkg.scripts[scriptName]) {
    failures.push(`package.json missing script: ${scriptName}`);
  }
  if (!pkg.scripts?.check?.includes(`npm run ${scriptName}`)) {
    failures.push(`npm run check missing ${scriptName}`);
  }
}

function assertNoPhase20zMigration() {
  const migrationDir = join(root, "supabase", "migrations");
  if (!existsSync(migrationDir)) return;
  const files = readdirSync(migrationDir).filter((file) =>
    file.toLowerCase().includes("phase20z")
  );
  if (files.length > 0) {
    failures.push(`Phase 20Z must not add migrations: ${files.join(", ")}`);
  }
}

function assertPhase20ScriptChain() {
  const pkg = JSON.parse(assertFile("package.json"));
  const letters = "abcdefghijklmnopqrstuvwxyz".split("");
  for (const letter of letters) {
    const scriptName = `audit:phase20${letter}`;
    if (!pkg.scripts?.[scriptName]) {
      failures.push(`package.json missing Phase 20 script: ${scriptName}`);
    }
    if (!pkg.scripts?.check?.includes(`npm run ${scriptName}`)) {
      failures.push(`npm run check missing Phase 20 script: ${scriptName}`);
    }
  }
}

const requiredFiles = [
  "docs/fixtures/phase20-privacy-export/phase20z_final_privacy_export_connector_completion_fixture.json",
  "docs/contracts/PHASE_20Z_PRIVACY_EXPORT_CONNECTOR_FINAL_COMPLETION.md",
  "docs/phase-reports/PHASE_20Z_PRIVACY_EXPORT_CONNECTOR_FINAL_COMPLETION_REPORT.md",
  "docs/qa/PHASE_20Z_PRIVACY_EXPORT_CONNECTOR_FINAL_SMOKE_CHECKLIST.md",
  "scripts/audit-phase-20z.mjs",
  "src/app/privacy/page.tsx",
  "src/components/privacy/privacy-dashboard-ui.tsx",
  "src/lib/privacy/privacy-dashboard-view-model.ts",
  "docs/contracts/PHASE_20Y_PRIVACY_DASHBOARD_VIEW_MODEL_UI.md",
  "docs/fixtures/phase20-privacy-export/phase20y_privacy_dashboard_view_model_ui_fixture.json",
  "docs/phase-reports/PHASE_20Y_PRIVACY_DASHBOARD_VIEW_MODEL_UI_REPORT.md"
];

for (const file of requiredFiles) {
  assertFile(file);
}

assertPackageScript("audit:phase20z");
assertPhase20ScriptChain();
assertNoPhase20zMigration();

assertIncludes("docs/contracts/PHASE_20Z_PRIVACY_EXPORT_CONNECTOR_FINAL_COMPLETION.md", "Phase 20Z");
assertIncludes("docs/contracts/PHASE_20Z_PRIVACY_EXPORT_CONNECTOR_FINAL_COMPLETION.md", "Privacy / Export / Connector Final Completion");
assertIncludes("docs/contracts/PHASE_20Z_PRIVACY_EXPORT_CONNECTOR_FINAL_COMPLETION.md", "/privacy");
assertIncludes("docs/contracts/PHASE_20Z_PRIVACY_EXPORT_CONNECTOR_FINAL_COMPLETION.md", "No Spotify OAuth token");
assertIncludes("docs/contracts/PHASE_20Z_PRIVACY_EXPORT_CONNECTOR_FINAL_COMPLETION.md", "Garmin and health-device connectors remain deferred");
assertIncludes("docs/contracts/PHASE_20Z_PRIVACY_EXPORT_CONNECTOR_FINAL_COMPLETION.md", "Echo/Alexa remains excluded");
assertIncludes("docs/contracts/PHASE_20Z_PRIVACY_EXPORT_CONNECTOR_FINAL_COMPLETION.md", "Phase 20Z introduces no database migration");

assertIncludes("docs/phase-reports/PHASE_20Z_PRIVACY_EXPORT_CONNECTOR_FINAL_COMPLETION_REPORT.md", "Phase 20Z");
assertIncludes("docs/phase-reports/PHASE_20Z_PRIVACY_EXPORT_CONNECTOR_FINAL_COMPLETION_REPORT.md", "Phase 20 is closed");
assertIncludes("docs/qa/PHASE_20Z_PRIVACY_EXPORT_CONNECTOR_FINAL_SMOKE_CHECKLIST.md", "npm run audit:phase20z");

assertIncludes("src/app/privacy/page.tsx", "PrivacyDashboardUi");
assertIncludes("src/components/privacy/privacy-dashboard-ui.tsx", "MemoryAuditUsageTransparencyPanel");
assertIncludes("src/components/privacy/privacy-dashboard-ui.tsx", "ForgetDeleteDerivedRecordsPanel");
assertIncludes("src/components/privacy/privacy-dashboard-ui.tsx", "SettingsPrivacyFoundationPanel");
assertIncludesLower("src/lib/privacy/privacy-dashboard-view-model.ts", "spotify");
assertIncludesLower("src/lib/privacy/privacy-dashboard-view-model.ts", "manual workout");
assertIncludesLower("src/lib/privacy/privacy-dashboard-view-model.ts", "deferred");

const forbiddenRuntimeMarkers = [
  "access_token",
  "refresh_token",
  "navigator.mediaDevices",
  "speechSynthesis",
  "setInterval(",
  "setTimeout("
];

for (const path of [
  "src/app/privacy/page.tsx",
  "src/components/privacy/privacy-dashboard-ui.tsx",
  "src/lib/privacy/privacy-dashboard-view-model.ts"
]) {
  const text = assertFile(path);
  for (const marker of forbiddenRuntimeMarkers) {
    if (text.includes(marker)) {
      failures.push(`${path} includes forbidden runtime marker: ${marker}`);
    }
  }
}

if (failures.length > 0) {
  console.error("Phase 20Z final completion audit failed:");
  for (const failure of failures) {
    console.error(`✗ ${failure}`);
  }
  process.exit(1);
}

console.log("✓ Phase 20Z final privacy/export/connector completion audit passed.");
console.log("✓ Phase 20 is fully represented, check-integrated, and closed without new migrations or runtime provider integration.");

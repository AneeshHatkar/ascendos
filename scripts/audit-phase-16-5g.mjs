import { existsSync, readFileSync } from "node:fs";

const requiredFiles = [
  "src/components/dashboard/carnos-visual-identity-panel.tsx",
  "docs/contracts/PHASE_16_5G_CARNOS_VISUAL_IDENTITY_DASHBOARD_PANEL_CONTRACT.md",
  "docs/phase-reports/PHASE_16_5G_CARNOS_VISUAL_IDENTITY_DASHBOARD_PANEL_REPORT.md",
  "docs/qa/PHASE_16_5G_CARNOS_VISUAL_IDENTITY_DASHBOARD_PANEL_SMOKE_CHECKLIST.md",
  "scripts/audit-phase-16-5g.mjs",
  "package.json",
  "PROJECT_EXECUTION_LOG.md",
  "CODE_LEDGER.md",
  "CHANGELOG.md",
  "PHASE_STATUS.md",
];

const panelMarkers = [
  "export function CarnosVisualIdentityPanel",
  "CarnosVisualIdentityPanelProps",
  "CarnosVisualIdentityPanelMode",
  "CarnosOrb",
  "CarnosCompanionWidget",
  "CarnosCapabilityMatrixPanel",
  "CarnosBoundaryBadges",
  "getCarnosVisualState",
  "overview",
  "compact",
  "truthfulness",
  "data-carnos-visual-identity-dashboard-panel",
  "data-carnos-panel-mode",
  "data-carnos-state",
  "data-carnos-dashboard-panel-hero",
  "data-carnos-dashboard-state-summary",
  "data-carnos-dashboard-runtime-boundary",
  "Visual-only",
  "Confirmation-first",
  "display-only",
  "does not start microphone capture",
  "talk-back",
  "browse the internet",
  "run Python/tools",
  "ingest documents",
  "save memory",
  "save sources",
  "execute autonomous actions",
];

const docMarkers = {
  "docs/contracts/PHASE_16_5G_CARNOS_VISUAL_IDENTITY_DASHBOARD_PANEL_CONTRACT.md": [
    "Phase 16.5G",
    "Carnos Visual Identity Dashboard Panel Contract",
    "CarnosVisualIdentityPanel",
    "CarnosVisualIdentityPanelProps",
    "CarnosVisualIdentityPanelMode",
    "CarnosOrb",
    "CarnosCompanionWidget",
    "CarnosCapabilityMatrixPanel",
    "CarnosBoundaryBadges",
    "overview",
    "compact",
    "truthfulness",
    "data-carnos-visual-identity-dashboard-panel",
    "display-only",
    "No `/carnos` page integration is added",
    "No command/dashboard route integration is added",
    "No API route is added",
    "No SQL migration is added",
    "No voice runtime is added",
    "No real internet provider call is added",
    "No Python/tool execution is added",
    "No document ingestion is added",
    "No memory write is added",
    "No source save is added",
    "No autonomous action is added",
  ],
  "docs/phase-reports/PHASE_16_5G_CARNOS_VISUAL_IDENTITY_DASHBOARD_PANEL_REPORT.md": [
    "Phase 16.5G",
    "CarnosVisualIdentityPanel",
    "overview mode",
    "compact mode",
    "truthfulness mode",
    "state summary cards",
    "display-only runtime boundary copy",
    "No runtime system is activated",
    "Phase 16.5H",
  ],
  "docs/qa/PHASE_16_5G_CARNOS_VISUAL_IDENTITY_DASHBOARD_PANEL_SMOKE_CHECKLIST.md": [
    "src/components/dashboard/carnos-visual-identity-panel.tsx",
    "CarnosVisualIdentityPanel",
    "CarnosVisualIdentityPanelProps",
    "CarnosVisualIdentityPanelMode",
    "Uses `CarnosOrb`",
    "Uses `CarnosCompanionWidget`",
    "Uses `CarnosCapabilityMatrixPanel`",
    "Uses `CarnosBoundaryBadges`",
    "No `/carnos` page integration is added",
    "No API route is added",
    "No SQL migration is added",
  ],
};

const forbiddenPaths = [
  "src/app/api/carnos/voice",
  "src/app/api/carnos/tools",
  "src/app/api/carnos/internet",
  "src/app/api/carnos/documents",
  "supabase/migrations/0028_phase16_5_carnos_visual_identity.sql",
];

const forbiddenRuntimeMarkers = [
  "fetch(",
  "supabase",
  "createClient",
  "navigator.mediaDevices",
  "MediaRecorder",
  "SpeechRecognition",
  "webkitSpeechRecognition",
  "speechSynthesis",
  "AudioContext",
  "runPython",
  "executeTool",
  "saveMemory",
  "autonomousAction",
];

function read(path) {
  return readFileSync(path, "utf8");
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

console.log("\n=== PHASE 16.5G CARNOS VISUAL IDENTITY DASHBOARD PANEL AUDIT ===");

for (const file of requiredFiles) {
  assert(existsSync(file), `Missing required file: ${file}`);
  console.log(`✓ Found ${file}`);
}

const panelText = read("src/components/dashboard/carnos-visual-identity-panel.tsx");
for (const marker of panelMarkers) {
  assert(panelText.includes(marker), `Dashboard panel missing marker: ${marker}`);
  console.log(`✓ Dashboard panel includes marker: ${marker}`);
}

for (const marker of forbiddenRuntimeMarkers) {
  assert(!panelText.includes(marker), `Dashboard panel includes forbidden runtime marker: ${marker}`);
  console.log(`✓ Dashboard panel excludes forbidden runtime marker: ${marker}`);
}

for (const [file, markers] of Object.entries(docMarkers)) {
  const text = read(file);
  for (const marker of markers) {
    assert(text.includes(marker), `${file} missing marker: ${marker}`);
    console.log(`✓ ${file} includes marker: ${marker}`);
  }
}

for (const path of forbiddenPaths) {
  assert(!existsSync(path), `Forbidden Phase 16.5G future runtime/page path exists: ${path}`);
  console.log(`✓ Forbidden future runtime/page path absent: ${path}`);
}

const packageJson = JSON.parse(read("package.json"));
assert(packageJson.scripts?.["audit:phase16_5g"], "package.json missing audit:phase16_5g");
assert(packageJson.scripts?.check?.includes("npm run audit:phase16_5g"), "npm run check missing audit:phase16_5g");
assert(packageJson.scripts?.["check:verbose"]?.includes("npm run audit:phase16_5g"), "npm run check:verbose missing audit:phase16_5g");
assert(packageJson.scripts?.["check:quiet"]?.includes("npm run audit:phase16_5g"), "npm run check:quiet missing audit:phase16_5g");

console.log("✓ verification chain includes audit:phase16_5g");

for (const file of ["PROJECT_EXECUTION_LOG.md", "CODE_LEDGER.md", "CHANGELOG.md", "PHASE_STATUS.md"]) {
  const text = read(file);
  assert(text.includes("Phase 16.5G"), `${file} missing Phase 16.5G`);
  assert(text.includes("Carnos Visual Identity Dashboard Panel"), `${file} missing Carnos Visual Identity Dashboard Panel`);
  console.log(`✓ ${file} includes Phase 16.5G status`);
}

console.log("\nPhase 16.5G audit passed: Carnos visual identity dashboard panel is display-only, composed, and boundary-protected.");

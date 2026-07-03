import { existsSync, readFileSync } from "node:fs";

const requiredFiles = [
  "src/app/carnos/page.tsx",
  "src/components/dashboard/carnos-visual-identity-panel.tsx",
  "docs/contracts/PHASE_16_5H_CARNOS_PAGE_INTEGRATION_CONTRACT.md",
  "docs/phase-reports/PHASE_16_5H_CARNOS_PAGE_INTEGRATION_REPORT.md",
  "docs/qa/PHASE_16_5H_CARNOS_PAGE_INTEGRATION_SMOKE_CHECKLIST.md",
  "scripts/audit-phase-16-5h.mjs",
  "package.json",
  "PROJECT_EXECUTION_LOG.md",
  "CODE_LEDGER.md",
  "CHANGELOG.md",
  "PHASE_STATUS.md",
];

const pageMarkers = [
  "export const metadata",
  "Carnos | ascendOS",
  "export default function CarnosPage",
  "CarnosVisualIdentityPanel",
  "mode=\"overview\"",
  "state=\"focused\"",
  "data-carnos-page",
  "data-carnos-page-hero",
  "data-carnos-page-boundary-grid",
  "data-carnos-page-boundary-card",
  "data-carnos-page-runtime-boundary",
  "visual-only",
  "capability truthfulness",
  "Confirmation boundary",
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
  "docs/contracts/PHASE_16_5H_CARNOS_PAGE_INTEGRATION_CONTRACT.md": [
    "Phase 16.5H",
    "`/carnos` Page Integration Contract",
    "src/app/carnos/page.tsx",
    "data-carnos-page",
    "data-carnos-page-hero",
    "data-carnos-page-boundary-grid",
    "data-carnos-page-boundary-card",
    "data-carnos-page-runtime-boundary",
    "CarnosVisualIdentityPanel",
    "visual-only runtime boundary",
    "capability truthfulness",
    "No API route is added",
    "No SQL migration is added",
    "No voice runtime is added",
    "No real internet provider call is added",
    "No Python/tool execution is added",
    "No document ingestion is added",
    "No memory write is added",
    "No source save is added",
    "No autonomous action is added",
    "No command/dashboard integration is added",
  ],
  "docs/phase-reports/PHASE_16_5H_CARNOS_PAGE_INTEGRATION_REPORT.md": [
    "Phase 16.5H",
    "`/carnos` Page Integration Report",
    "`/carnos` page hero",
    "CarnosVisualIdentityPanel",
    "page-level boundary cards",
    "display-only runtime boundary copy",
    "No runtime system is activated",
    "Phase 16.5I",
  ],
  "docs/qa/PHASE_16_5H_CARNOS_PAGE_INTEGRATION_SMOKE_CHECKLIST.md": [
    "src/app/carnos/page.tsx",
    "Exports metadata",
    "Renders `CarnosPage`",
    "Uses `CarnosVisualIdentityPanel`",
    "Uses `mode=\"overview\"`",
    "Includes `data-carnos-page`",
    "No API route is added",
    "No SQL migration is added",
    "No command/dashboard integration is added",
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

console.log("\n=== PHASE 16.5H /CARNOS PAGE INTEGRATION AUDIT ===");

for (const file of requiredFiles) {
  assert(existsSync(file), `Missing required file: ${file}`);
  console.log(`✓ Found ${file}`);
}

const pageText = read("src/app/carnos/page.tsx");
for (const marker of pageMarkers) {
  assert(pageText.includes(marker), `/carnos page missing marker: ${marker}`);
  console.log(`✓ /carnos page includes marker: ${marker}`);
}

for (const marker of forbiddenRuntimeMarkers) {
  assert(!pageText.includes(marker), `/carnos page includes forbidden runtime marker: ${marker}`);
  console.log(`✓ /carnos page excludes forbidden runtime marker: ${marker}`);
}

for (const [file, markers] of Object.entries(docMarkers)) {
  const text = read(file);
  for (const marker of markers) {
    assert(text.includes(marker), `${file} missing marker: ${marker}`);
    console.log(`✓ ${file} includes marker: ${marker}`);
  }
}

for (const path of forbiddenPaths) {
  assert(!existsSync(path), `Forbidden Phase 16.5H runtime path exists: ${path}`);
  console.log(`✓ Forbidden runtime path absent: ${path}`);
}

const packageJson = JSON.parse(read("package.json"));
assert(packageJson.scripts?.["audit:phase16_5h"], "package.json missing audit:phase16_5h");
assert(packageJson.scripts?.check?.includes("npm run audit:phase16_5h"), "npm run check missing audit:phase16_5h");
assert(packageJson.scripts?.["check:verbose"]?.includes("npm run audit:phase16_5h"), "npm run check:verbose missing audit:phase16_5h");
assert(packageJson.scripts?.["check:quiet"]?.includes("npm run audit:phase16_5h"), "npm run check:quiet missing audit:phase16_5h");

console.log("✓ verification chain includes audit:phase16_5h");

for (const file of ["PROJECT_EXECUTION_LOG.md", "CODE_LEDGER.md", "CHANGELOG.md", "PHASE_STATUS.md"]) {
  const text = read(file);
  assert(text.includes("Phase 16.5H"), `${file} missing Phase 16.5H`);
  assert(text.includes("Carnos Page Integration"), `${file} missing Carnos Page Integration`);
  console.log(`✓ ${file} includes Phase 16.5H status`);
}

console.log("\nPhase 16.5H audit passed: /carnos page integrates Carnos visual identity without activating runtime systems.");

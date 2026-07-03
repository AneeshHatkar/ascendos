import { existsSync, readFileSync } from "node:fs";

const requiredFiles = [
  "src/components/carnos/carnos-capability-matrix-panel.tsx",
  "src/components/carnos/carnos-boundary-badges.tsx",
  "src/components/carnos/index.ts",
  "docs/contracts/PHASE_16_5F_CARNOS_CAPABILITY_MATRIX_TRUTHFULNESS_CONTRACT.md",
  "docs/phase-reports/PHASE_16_5F_CARNOS_CAPABILITY_MATRIX_TRUTHFULNESS_REPORT.md",
  "docs/qa/PHASE_16_5F_CARNOS_CAPABILITY_MATRIX_TRUTHFULNESS_SMOKE_CHECKLIST.md",
  "scripts/audit-phase-16-5f.mjs",
  "package.json",
  "PROJECT_EXECUTION_LOG.md",
  "CODE_LEDGER.md",
  "CHANGELOG.md",
  "PHASE_STATUS.md",
];

const matrixMarkers = [
  "export function CarnosCapabilityMatrixPanel",
  "CarnosCapabilityMatrixPanelProps",
  "CARNOS_CAPABILITY_MATRIX",
  "isCarnosRuntimeCapabilityEnabled",
  "CarnosCapabilityStatus",
  "enabled",
  "foundation_present",
  "runtime_deferred",
  "requires_confirmation",
  "forbidden",
  "planned",
  "data-carnos-capability-matrix-panel",
  "data-carnos-capability-status-grid",
  "data-carnos-capability-status-section",
  "data-carnos-capability-status-badge",
  "data-carnos-capability-list",
  "data-carnos-capability-card",
  "data-carnos-capability-runtime-enabled",
  "data-carnos-no-fake-runtime-controls",
  "data-carnos-truthfulness-copy",
  "No fake active runtime controls",
  "descriptive only",
  "does not activate voice capture",
  "internet browsing",
  "Python/tool execution",
  "document ingestion",
  "automatic memory writes",
  "autonomous actions",
  "CarnosBoundaryBadges",
];

const badgeMarkers = [
  "export function CarnosBoundaryBadges",
  "CarnosBoundaryBadgesProps",
  "CARNOS_BOUNDARY_BADGES",
  "CarnosBoundaryBadgeId",
  "confirmation_required",
  "no_hidden_memory",
  "no_silent_browsing",
  "no_autosave",
  "data-carnos-boundary-badges",
  "data-carnos-boundary-badge-grid",
  "data-carnos-boundary-badge-card",
  "data-carnos-truthfulness-badge",
  "Truthful UI",
];

const indexMarkers = [
  "CarnosCapabilityMatrixPanel",
  "CarnosCapabilityMatrixPanelProps",
  "CarnosBoundaryBadges",
  "CarnosBoundaryBadgesProps",
];

const docMarkers = {
  "docs/contracts/PHASE_16_5F_CARNOS_CAPABILITY_MATRIX_TRUTHFULNESS_CONTRACT.md": [
    "Phase 16.5F",
    "Carnos Capability Matrix + Truthfulness Panel Contract",
    "CarnosCapabilityMatrixPanel",
    "CarnosBoundaryBadges",
    "enabled",
    "foundation_present",
    "runtime_deferred",
    "requires_confirmation",
    "forbidden",
    "planned",
    "no fake active runtime controls",
    "descriptive-only truthfulness copy",
    "CARNOS_CAPABILITY_MATRIX",
    "CARNOS_BOUNDARY_BADGES",
    "isCarnosRuntimeCapabilityEnabled",
    "No API route is added",
    "No SQL migration is added",
    "No voice runtime is added",
    "No real internet provider call is added",
    "No Python/tool execution is added",
    "No document ingestion is added",
    "No memory write is added",
    "No autonomous action is added",
    "No dashboard page integration is added",
    "No `/carnos` page integration is added",
  ],
  "docs/phase-reports/PHASE_16_5F_CARNOS_CAPABILITY_MATRIX_TRUTHFULNESS_REPORT.md": [
    "Phase 16.5F",
    "CarnosCapabilityMatrixPanel",
    "CarnosBoundaryBadges",
    "capability status grouping",
    "runtime active vs not active markers",
    "no fake active runtime controls marker",
    "No runtime system is activated",
    "Phase 16.5G",
  ],
  "docs/qa/PHASE_16_5F_CARNOS_CAPABILITY_MATRIX_TRUTHFULNESS_SMOKE_CHECKLIST.md": [
    "src/components/carnos/carnos-capability-matrix-panel.tsx",
    "src/components/carnos/carnos-boundary-badges.tsx",
    "CarnosCapabilityMatrixPanel",
    "CarnosBoundaryBadges",
    "Uses `CARNOS_CAPABILITY_MATRIX`",
    "Uses `CARNOS_BOUNDARY_BADGES`",
    "Shows `enabled`",
    "Shows `foundation_present`",
    "Shows `runtime_deferred`",
    "Shows `requires_confirmation`",
    "Shows `forbidden`",
    "Shows `planned`",
    "No dashboard panel is added",
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

console.log("\n=== PHASE 16.5F CARNOS CAPABILITY MATRIX TRUTHFULNESS AUDIT ===");

for (const file of requiredFiles) {
  assert(existsSync(file), `Missing required file: ${file}`);
  console.log(`✓ Found ${file}`);
}

const matrixText = read("src/components/carnos/carnos-capability-matrix-panel.tsx");
for (const marker of matrixMarkers) {
  assert(matrixText.includes(marker), `Capability matrix missing marker: ${marker}`);
  console.log(`✓ Capability matrix includes marker: ${marker}`);
}

const badgeText = read("src/components/carnos/carnos-boundary-badges.tsx");
for (const marker of badgeMarkers) {
  assert(badgeText.includes(marker), `Boundary badges missing marker: ${marker}`);
  console.log(`✓ Boundary badges include marker: ${marker}`);
}

for (const marker of forbiddenRuntimeMarkers) {
  assert(!matrixText.includes(marker), `Capability matrix includes forbidden runtime marker: ${marker}`);
  assert(!badgeText.includes(marker), `Boundary badges include forbidden runtime marker: ${marker}`);
  console.log(`✓ Matrix/badges exclude forbidden runtime marker: ${marker}`);
}

const indexText = read("src/components/carnos/index.ts");
for (const marker of indexMarkers) {
  assert(indexText.includes(marker), `Component index missing marker: ${marker}`);
  console.log(`✓ Component index includes marker: ${marker}`);
}

for (const [file, markers] of Object.entries(docMarkers)) {
  const text = read(file);
  for (const marker of markers) {
    assert(text.includes(marker), `${file} missing marker: ${marker}`);
    console.log(`✓ ${file} includes marker: ${marker}`);
  }
}

for (const path of forbiddenPaths) {
  assert(!existsSync(path), `Forbidden Phase 16.5F future UI/runtime path exists: ${path}`);
  console.log(`✓ Forbidden future UI/runtime path absent: ${path}`);
}

const packageJson = JSON.parse(read("package.json"));
assert(packageJson.scripts?.["audit:phase16_5f"], "package.json missing audit:phase16_5f");
assert(packageJson.scripts?.check?.includes("npm run audit:phase16_5f"), "npm run check missing audit:phase16_5f");
assert(packageJson.scripts?.["check:verbose"]?.includes("npm run audit:phase16_5f"), "npm run check:verbose missing audit:phase16_5f");
assert(packageJson.scripts?.["check:quiet"]?.includes("npm run audit:phase16_5f"), "npm run check:quiet missing audit:phase16_5f");

console.log("✓ verification chain includes audit:phase16_5f");

for (const file of ["PROJECT_EXECUTION_LOG.md", "CODE_LEDGER.md", "CHANGELOG.md", "PHASE_STATUS.md"]) {
  const text = read(file);
  assert(text.includes("Phase 16.5F"), `${file} missing Phase 16.5F`);
  assert(text.includes("Carnos Capability Matrix + Truthfulness Panel"), `${file} missing Carnos Capability Matrix + Truthfulness Panel`);
  console.log(`✓ ${file} includes Phase 16.5F status`);
}

console.log("\nPhase 16.5F audit passed: Carnos capability matrix and truthfulness panel are visual-only, honest, and boundary-protected.");

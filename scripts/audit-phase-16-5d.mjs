import { existsSync, readFileSync } from "node:fs";

const requiredFiles = [
  "src/lib/carnos-identity/carnos-visual-identity.ts",
  "src/lib/carnos-identity/carnos-visual-tokens.ts",
  "src/lib/carnos-identity/carnos-accessibility.ts",
  "src/components/carnos/carnos-orb.tsx",
  "src/components/carnos/index.ts",
  "docs/contracts/PHASE_16_5D_CARNOS_ORB_COMPONENT_CONTRACT.md",
  "docs/phase-reports/PHASE_16_5D_CARNOS_ORB_COMPONENT_REPORT.md",
  "docs/qa/PHASE_16_5D_CARNOS_ORB_COMPONENT_SMOKE_CHECKLIST.md",
  "scripts/audit-phase-16-5d.mjs",
  "package.json",
  "PROJECT_EXECUTION_LOG.md",
  "CODE_LEDGER.md",
  "CHANGELOG.md",
  "PHASE_STATUS.md",
];

const componentMarkers = [
  "export function CarnosOrb",
  "CarnosOrbProps",
  "CarnosOrbSize",
  "CarnosVisualStateId",
  "getCarnosVisualState",
  "getCarnosStateVisualToken",
  "getCarnosAriaLabel",
  "CARNOS_MOTION_BOUNDARIES",
  "data-carnos-orb",
  "data-carnos-state",
  "data-carnos-tone",
  "data-carnos-aura",
  "data-carnos-outer-ring",
  "data-carnos-inner-glass",
  "data-carnos-core-glow",
  "data-carnos-mask-shell",
  "data-carnos-mask-eye",
  "data-carnos-left-node",
  "data-carnos-right-node",
  "data-carnos-source-node",
  "data-carnos-memory-glyph",
  "data-carnos-privacy-shield",
  "data-carnos-confirmation-halo",
  "data-carnos-warning-ring",
  "motion-reduce:animate-none",
  "role={decorative ? \"presentation\" : \"img\"}",
  "aria-label",
  "figcaption",
  "sr-only",
  "reviewing_current_info",
  "reviewing_memory",
  "privacy_locked",
  "action_pending",
  "warning",
  "default CarnosOrb",
];

const indexMarkers = [
  "CarnosOrb",
  "CarnosOrbProps",
  "CarnosOrbSize",
  "./carnos-orb",
];

const docMarkers = {
  "docs/contracts/PHASE_16_5D_CARNOS_ORB_COMPONENT_CONTRACT.md": [
    "Phase 16.5D",
    "Carnos Orb / Avatar Component Contract",
    "CarnosOrb",
    "CarnosOrbProps",
    "CarnosOrbSize",
    "state-based visuals",
    "reduced-motion fallback",
    "static fallback styling",
    "truthful screen-reader labels",
    "non-flashing animation boundaries",
    "reviewing_current_info",
    "reviewing_memory",
    "privacy_locked",
    "action_pending",
    "warning",
    "voice runtime",
    "real internet provider calls",
    "Python/tool execution",
    "document ingestion",
    "automatic memory writes",
    "autonomous actions",
    "No API route is added",
    "No SQL migration is added",
  ],
  "docs/phase-reports/PHASE_16_5D_CARNOS_ORB_COMPONENT_REPORT.md": [
    "Phase 16.5D",
    "CarnosOrb",
    "state-driven visual token usage",
    "accessible aria label usage",
    "reduced-motion and static fallback support",
    "No runtime system is activated",
    "No voice runtime is added",
    "No internet provider call is added",
    "Phase 16.5E",
  ],
  "docs/qa/PHASE_16_5D_CARNOS_ORB_COMPONENT_SMOKE_CHECKLIST.md": [
    "src/components/carnos/carnos-orb.tsx",
    "CarnosOrbProps",
    "CarnosOrbSize",
    "Uses `CarnosVisualStateId`",
    "Uses `getCarnosVisualState`",
    "Uses `getCarnosStateVisualToken`",
    "Uses `getCarnosAriaLabel`",
    "Includes `aria-label`",
    "Includes `role=\"img\"`",
    "Includes `role=\"presentation\"`",
    "No companion widget is added",
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

const forbiddenComponentMarkers = [
  "fetch(",
  "supabase",
  "createClient",
  "navigator.mediaDevices",
  "MediaRecorder",
  "SpeechRecognition",
  "webkitSpeechRecognition",
  "speechSynthesis",
  "AudioContext",
  "python",
  "tool execution",
  "document ingestion",
  "memory write",
  "autonomous action",
];

function read(path) {
  return readFileSync(path, "utf8");
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

console.log("\n=== PHASE 16.5D CARNOS ORB COMPONENT AUDIT ===");

for (const file of requiredFiles) {
  assert(existsSync(file), `Missing required file: ${file}`);
  console.log(`✓ Found ${file}`);
}

const componentText = read("src/components/carnos/carnos-orb.tsx");
for (const marker of componentMarkers) {
  assert(componentText.includes(marker), `Carnos orb component missing marker: ${marker}`);
  console.log(`✓ Carnos orb includes marker: ${marker}`);
}

for (const marker of forbiddenComponentMarkers) {
  assert(!componentText.includes(marker), `Carnos orb includes forbidden runtime marker: ${marker}`);
  console.log(`✓ Carnos orb excludes forbidden runtime marker: ${marker}`);
}

const indexText = read("src/components/carnos/index.ts");
for (const marker of indexMarkers) {
  assert(indexText.includes(marker), `Carnos component index missing marker: ${marker}`);
  console.log(`✓ Carnos component index includes marker: ${marker}`);
}

for (const [file, markers] of Object.entries(docMarkers)) {
  const text = read(file);
  for (const marker of markers) {
    assert(text.includes(marker), `${file} missing marker: ${marker}`);
    console.log(`✓ ${file} includes marker: ${marker}`);
  }
}

for (const path of forbiddenPaths) {
  assert(!existsSync(path), `Forbidden Phase 16.5D future UI/runtime path exists: ${path}`);
  console.log(`✓ Forbidden future UI/runtime path absent: ${path}`);
}

const packageJson = JSON.parse(read("package.json"));
assert(packageJson.scripts?.["audit:phase16_5d"], "package.json missing audit:phase16_5d");
assert(packageJson.scripts?.check?.includes("npm run audit:phase16_5d"), "npm run check missing audit:phase16_5d");
assert(packageJson.scripts?.["check:verbose"]?.includes("npm run audit:phase16_5d"), "npm run check:verbose missing audit:phase16_5d");
assert(packageJson.scripts?.["check:quiet"]?.includes("npm run audit:phase16_5d"), "npm run check:quiet missing audit:phase16_5d");

console.log("✓ verification chain includes audit:phase16_5d");

for (const file of ["PROJECT_EXECUTION_LOG.md", "CODE_LEDGER.md", "CHANGELOG.md", "PHASE_STATUS.md"]) {
  const text = read(file);
  assert(text.includes("Phase 16.5D"), `${file} missing Phase 16.5D`);
  assert(text.includes("Carnos Orb / Avatar Component"), `${file} missing Carnos Orb / Avatar Component`);
  console.log(`✓ ${file} includes Phase 16.5D status`);
}

console.log("\nPhase 16.5D audit passed: Carnos orb/avatar component is visual-only, accessible, reduced-motion safe, and boundary-protected.");

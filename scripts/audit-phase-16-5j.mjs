import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

function read(path) {
  return readFileSync(path, "utf8");
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function listFiles(dir) {
  if (!existsSync(dir)) {
    return [];
  }

  const entries = readdirSync(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...listFiles(fullPath));
    } else {
      files.push(fullPath);
    }
  }

  return files;
}

function assertIncludes(file, markers, label = "marker") {
  const text = read(file);
  for (const marker of markers) {
    assert(text.includes(marker), `${file} missing ${label}: ${marker}`);
    console.log(`✓ ${file} includes ${label}: ${marker}`);
  }
}

function assertExcludes(file, markers, label = "forbidden runtime marker") {
  const text = read(file);
  for (const marker of markers) {
    assert(!text.includes(marker), `${file} includes ${label}: ${marker}`);
    console.log(`✓ ${file} excludes ${label}: ${marker}`);
  }
}

const allFiles = [
  ...listFiles("src"),
  ...listFiles("docs"),
  ...listFiles("scripts"),
  "package.json",
  "PROJECT_EXECUTION_LOG.md",
  "CODE_LEDGER.md",
  "CHANGELOG.md",
  "PHASE_STATUS.md",
].filter((file) => existsSync(file));

const exactRequiredFiles = [
  "src/lib/carnos-identity/carnos-visual-identity.ts",
  "src/lib/carnos-identity/index.ts",
  "src/lib/carnos-identity/carnos-visual-tokens.ts",
  "src/components/carnos/carnos-orb.tsx",
  "src/components/carnos/carnos-companion-dock.tsx",
  "src/components/carnos/carnos-companion-widget.tsx",
  "src/components/carnos/carnos-capability-matrix-panel.tsx",
  "src/components/carnos/carnos-boundary-badges.tsx",
  "src/components/dashboard/carnos-visual-identity-panel.tsx",
  "src/app/carnos/page.tsx",
  "src/components/dashboard/carnos-lightweight-companion-panel.tsx",
  "src/components/dashboard/command-dashboard-v1.tsx",
  "docs/contracts/PHASE_16_5J_CARNOS_VISUAL_IDENTITY_FINAL_AUDIT_CONTRACT.md",
  "docs/phase-reports/PHASE_16_5J_CARNOS_VISUAL_IDENTITY_FINAL_COMPLETION_REPORT.md",
  "docs/qa/PHASE_16_5J_CARNOS_VISUAL_IDENTITY_FINAL_SMOKE_CHECKLIST.md",
  "scripts/audit-phase-16-5j.mjs",
  "package.json",
  "PROJECT_EXECUTION_LOG.md",
  "CODE_LEDGER.md",
  "CHANGELOG.md",
  "PHASE_STATUS.md",
];

const phaseMarkers = [
  "16_5A",
  "16_5B",
  "16_5C",
  "16_5D",
  "16_5E",
  "16_5F",
  "16_5G",
  "16_5H",
  "16_5I",
  "16_5J",
];

const finalMarkers = {
  "docs/contracts/PHASE_16_5J_CARNOS_VISUAL_IDENTITY_FINAL_AUDIT_CONTRACT.md": [
    "Phase 16.5J",
    "Carnos Visual Identity Final Audit Contract",
    "visual-only",
    "runtime-deferred",
    "capability truthfulness",
    "reduced motion",
    "no voice runtime",
    "no microphone capture",
    "no talk-back",
    "no real internet provider call",
    "no Python/tool execution",
    "no document ingestion",
    "no automatic memory write",
    "no source save",
    "no autonomous action",
    "no SQL migration",
    "no runtime API route",
  ],
  "docs/phase-reports/PHASE_16_5J_CARNOS_VISUAL_IDENTITY_FINAL_COMPLETION_REPORT.md": [
    "Phase 16.5J",
    "Carnos Visual Identity Final Completion Report",
    "Phase 16.5A",
    "Phase 16.5B",
    "Phase 16.5C",
    "Phase 16.5D",
    "Phase 16.5E",
    "Phase 16.5F",
    "Phase 16.5G",
    "Phase 16.5H",
    "Phase 16.5I",
    "Phase 16.5J",
    "runtime-deferred",
    "No Phase 16.5 SQL migration exists",
    "No Phase 16.5 runtime API route exists",
  ],
  "docs/qa/PHASE_16_5J_CARNOS_VISUAL_IDENTITY_FINAL_SMOKE_CHECKLIST.md": [
    "Phase 16.5J",
    "Carnos Visual Identity Final Smoke Checklist",
    "No voice runtime is activated",
    "No microphone capture is activated",
    "No real internet provider call is activated",
    "No Python/tool execution is activated",
    "No SQL migration is added",
    "No new runtime API route is added",
    "npm run audit:phase16_5j",
    "npm run check",
  ],
};

const surfaceMarkers = {
  "src/components/carnos/carnos-orb.tsx": [
    "CarnosOrb",
  ],
  "src/components/carnos/carnos-companion-widget.tsx": [
    "CarnosCompanionWidget",
  ],
  "src/components/carnos/carnos-companion-dock.tsx": [
    "CarnosCompanionDock",
  ],
  "src/components/carnos/carnos-capability-matrix-panel.tsx": [
    "CarnosCapabilityMatrixPanel",
  ],
  "src/components/dashboard/carnos-visual-identity-panel.tsx": [
    "CarnosVisualIdentityPanel",
  ],
  "src/app/carnos/page.tsx": [
    "CarnosVisualIdentityPanel",
    "data-carnos-page",
    "visual-only",
  ],
  "src/components/dashboard/carnos-lightweight-companion-panel.tsx": [
    "CarnosLightweightCompanionPanel",
    "data-carnos-lightweight-companion-panel",
    "data-carnos-dashboard-presence",
    "data-carnos-command-presence",
    "visual-only",
  ],
  "src/components/dashboard/command-dashboard-v1.tsx": [
    "CarnosLightweightCompanionPanel",
    "<CarnosLightweightCompanionPanel />",
  ],
};

const forbiddenPaths = [
  "src/app/api/carnos/voice",
  "src/app/api/carnos/tools",
  "src/app/api/carnos/internet",
  "src/app/api/carnos/documents",
  "src/app/api/carnos/companion",
  "src/app/api/command/carnos",
  "supabase/migrations/0028_phase16_5_carnos_visual_identity.sql",
  "supabase/migrations/0029_phase16_5i_carnos_command_companion.sql",
  "supabase/migrations/0030_phase16_5j_carnos_visual_identity_final.sql",
];

const forbiddenRuntimeMarkers = [
  "navigator.mediaDevices",
  "MediaRecorder",
  "SpeechRecognition",
  "webkitSpeechRecognition",
  "speechSynthesis",
  "AudioContext",
  "fetch(",
  "generateText",
  "streamText",
  "openai",
  "OpenAI",
  "runPython",
  "executeTool",
  "saveMemory",
  "saveSource",
  "executeApprovedAction(",
  "createProposedAction(",
];

const runtimeBoundaryFiles = [
  "src/components/dashboard/carnos-lightweight-companion-panel.tsx",
  "src/components/dashboard/carnos-visual-identity-panel.tsx",
  "src/app/carnos/page.tsx",
];

console.log("\\n=== PHASE 16.5J CARNOS VISUAL IDENTITY FINAL AUDIT ===");

for (const file of exactRequiredFiles) {
  assert(existsSync(file), `Missing exact required file: ${file}`);
  console.log(`✓ Found ${file}`);
}

for (const phase of phaseMarkers) {
  const auditNeedle = `audit-phase-${phase.toLowerCase().replace("_", "-")}`;
  const auditMatch = allFiles.find((file) => file.startsWith("scripts/") && file.includes(auditNeedle));
  assert(auditMatch, `Missing ${phase} audit script`);
  console.log(`✓ Found ${phase} audit script: ${auditMatch}`);

  const docMatch = allFiles.find((file) => file.startsWith("docs/") && file.includes(`PHASE_${phase}`));
  assert(docMatch, `Missing ${phase} documentation artifact`);
  console.log(`✓ Found ${phase} documentation artifact: ${docMatch}`);
}

for (const [file, markers] of Object.entries(finalMarkers)) {
  assertIncludes(file, markers, "final marker");
}

for (const [file, markers] of Object.entries(surfaceMarkers)) {
  assertIncludes(file, markers, "surface marker");
}

for (const path of forbiddenPaths) {
  assert(!existsSync(path), `Forbidden Phase 16.5 runtime/persistence path exists: ${path}`);
  console.log(`✓ Forbidden Phase 16.5 path absent: ${path}`);
}

for (const file of runtimeBoundaryFiles) {
  assertExcludes(file, forbiddenRuntimeMarkers);
}

const packageText = read("package.json");
assert(packageText.includes("audit:phase16_5j"), "package.json missing audit:phase16_5j");
assert(packageText.includes("npm run audit:phase16_5j"), "verification chain missing audit:phase16_5j");
console.log("✓ verification chain includes audit:phase16_5j");

for (const logPath of ["PROJECT_EXECUTION_LOG.md", "CODE_LEDGER.md", "CHANGELOG.md", "PHASE_STATUS.md"]) {
  const text = read(logPath);
  assert(text.includes("Phase 16.5J"), `${logPath} missing Phase 16.5J status`);
  assert(text.includes("Phase 17"), `${logPath} missing Phase 17 next-phase marker`);
  console.log(`✓ ${logPath} includes Phase 16.5J closeout and Phase 17 next marker`);
}

console.log("\\nPhase 16.5J audit passed: Carnos visual identity mini-phase is closed, verified, visual-only, and runtime-deferred.");

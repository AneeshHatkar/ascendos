import { existsSync, readFileSync } from "node:fs";

function read(path) {
  return readFileSync(path, "utf8");
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}


const requiredFiles = [
  "src/components/dashboard/carnos-lightweight-companion-panel.tsx",
  "src/components/dashboard/command-dashboard-v1.tsx",
  "src/components/dashboard/index.ts",
  "docs/contracts/PHASE_16_5I_COMMAND_DASHBOARD_LIGHTWEIGHT_COMPANION_CONTRACT.md",
  "docs/phase-reports/PHASE_16_5I_COMMAND_DASHBOARD_LIGHTWEIGHT_COMPANION_REPORT.md",
  "docs/qa/PHASE_16_5I_COMMAND_DASHBOARD_LIGHTWEIGHT_COMPANION_SMOKE_CHECKLIST.md",
  "scripts/audit-phase-16-5i.mjs",
  "package.json",
  "PROJECT_EXECUTION_LOG.md",
  "CODE_LEDGER.md",
  "CHANGELOG.md",
  "PHASE_STATUS.md",
];

const markers = {
  "src/components/dashboard/carnos-lightweight-companion-panel.tsx": [
    "Phase 16.5I",
    "Command/Dashboard Lightweight Companion Integration",
    "CarnosLightweightCompanionPanel",
    "CarnosCompanionDock",
    "data-carnos-lightweight-companion-panel",
    "data-carnos-dashboard-presence",
    "data-carnos-command-presence",
    "visual-only",
    "display-only",
    "capability truthfulness",
    "confirmation boundary",
    "reduced motion",
    "no microphone capture",
    "no talk-back",
    "no browser/provider call",
    "no Python/tool execution",
    "no document ingestion",
    "no memory write",
    "no source save",
    "no autonomous action",
    "no API route",
    "no SQL migration",
  ],
  "src/components/dashboard/command-dashboard-v1.tsx": [
    "CarnosLightweightCompanionPanel",
    "<CarnosLightweightCompanionPanel />",
    "data-carnos-command-dashboard-lightweight-companion-markers",
    "data-carnos-dashboard-presence",
    "data-carnos-command-presence",
    "visual-only dashboard companion",
  ],
  "src/components/dashboard/index.ts": [
    'export * from "./carnos-lightweight-companion-panel";',
  ],
  "docs/contracts/PHASE_16_5I_COMMAND_DASHBOARD_LIGHTWEIGHT_COMPANION_CONTRACT.md": [
    "Phase 16.5I",
    "Command/Dashboard Lightweight Companion Integration Contract",
    "CarnosLightweightCompanionPanel",
    "No API route is added",
    "No SQL migration is added",
    "No voice runtime is added",
  ],
  "docs/phase-reports/PHASE_16_5I_COMMAND_DASHBOARD_LIGHTWEIGHT_COMPANION_REPORT.md": [
    "Phase 16.5I",
    "Command/Dashboard Lightweight Companion Integration Report",
    "CarnosLightweightCompanionPanel",
    "Phase 16.5J",
  ],
  "docs/qa/PHASE_16_5I_COMMAND_DASHBOARD_LIGHTWEIGHT_COMPANION_SMOKE_CHECKLIST.md": [
    "Phase 16.5I",
    "CarnosLightweightCompanionPanel",
    "No API route is added",
    "No SQL migration is added",
  ],
};

const forbiddenRuntimePaths = [
  "src/app/api/carnos/voice",
  "src/app/api/carnos/tools",
  "src/app/api/carnos/internet",
  "src/app/api/carnos/documents",
  "src/app/api/carnos/companion",
  "src/app/api/command/carnos",
  "supabase/migrations/0029_phase16_5i_carnos_command_companion.sql",
];

const forbiddenMarkers = [
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
  ".insert(",
  ".update(",
  ".delete(",
  ".upsert(",
  ".rpc(",
  "createSupabaseBrowserClient",
  "createSupabaseServerClient",
];

console.log("\n=== PHASE 16.5I COMMAND/DASHBOARD LIGHTWEIGHT COMPANION AUDIT ===");

for (const file of requiredFiles) {
  assert(existsSync(file), `Missing required file: ${file}`);
  console.log(`✓ Found ${file}`);
}

for (const [file, requiredMarkers] of Object.entries(markers)) {
  const text = read(file);
  for (const marker of requiredMarkers) {
    assert(text.includes(marker), `${file} missing marker: ${marker}`);
    console.log(`✓ ${file} includes marker: ${marker}`);
  }
}

for (const path of forbiddenRuntimePaths) {
  assert(!existsSync(path), `Forbidden runtime path exists: ${path}`);
  console.log(`✓ Forbidden runtime path absent: ${path}`);
}

const implementationFiles = [
  "src/components/dashboard/carnos-lightweight-companion-panel.tsx",
  "src/components/dashboard/command-dashboard-v1.tsx",
];

for (const file of implementationFiles) {
  const text = read(file);
  for (const marker of forbiddenMarkers) {
    assert(!text.includes(marker), `${file} includes forbidden runtime marker: ${marker}`);
    console.log(`✓ ${file} excludes forbidden runtime marker: ${marker}`);
  }
}

const packageText = read("package.json");
assert(packageText.includes("audit:phase16_5i"), "package.json missing audit:phase16_5i");
assert(packageText.includes("npm run audit:phase16_5i"), "verification chain missing audit:phase16_5i");
console.log("✓ verification chain includes audit:phase16_5i");

for (const logPath of ["PROJECT_EXECUTION_LOG.md", "CODE_LEDGER.md", "CHANGELOG.md", "PHASE_STATUS.md"]) {
  const text = read(logPath);
  assert(text.includes("Phase 16.5I"), `${logPath} missing Phase 16.5I status`);
  console.log(`✓ ${logPath} includes Phase 16.5I status`);
}

console.log("\nPhase 16.5I audit passed: Command/dashboard lightweight Carnos companion integration is present, visual-only, and runtime-deferred.");

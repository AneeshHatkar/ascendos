import fs from "node:fs";
import path from "node:path";

const root = process.cwd();

const requiredFiles = [
  "src/components/voice/carnos-voice-panel-integration.tsx",
  "src/components/voice/voice-manual-simulator-preview.tsx",
  "src/components/voice/index.ts",
  "src/app/carnos/page.tsx",
  "docs/phase-reports/PHASE_14G_CARNOS_VOICE_PANEL_INTEGRATION_REPORT.md",
  "docs/qa/PHASE_14G_CARNOS_VOICE_PANEL_INTEGRATION_SMOKE_CHECKLIST.md",
  "scripts/audit-phase-14g.mjs",
];

const requiredMarkers = {
  "src/components/voice/carnos-voice-panel-integration.tsx": [
    "CarnosVoicePanelIntegration",
    "VoiceManualSimulatorPreview",
    "Phase 14G Carnos voice panel integration",
    "Canonical surface: /carnos",
    "Manual transcript simulator only",
    "No standalone voice route",
    "No microphone APIs",
    "No provider calls from UI",
    "No SQL writes from UI",
    "No proposed-action creation from UI",
    "No proposed-action execution from UI",
    "Phase 14H",
  ],
  "src/components/voice/index.ts": [
    'export * from "./carnos-voice-panel-integration";',
  ],
  "src/app/carnos/page.tsx": [
    "CarnosVoicePanelIntegration",
    "<CarnosVoicePanelIntegration />",
    "CarnosPersonaBoundaryPanel",
    "CarnosPanelV1",
  ],
  "docs/phase-reports/PHASE_14G_CARNOS_VOICE_PANEL_INTEGRATION_REPORT.md": [
    "Phase 14G Carnos Voice Panel Integration Report",
    "Status: Complete",
    "canonical `/carnos` surface",
    "No standalone `/voice-companion` route was created",
    "No proposed-action creation from UI",
    "Phase 14H",
  ],
  "docs/qa/PHASE_14G_CARNOS_VOICE_PANEL_INTEGRATION_SMOKE_CHECKLIST.md": [
    "Phase 14G Carnos Voice Panel Integration Smoke Checklist",
    "Open `/carnos`",
    "manual transcript simulator appears inside the Carnos surface",
    "No standalone voice route",
    "No proposed-action execution from UI",
    "Phase 14H",
  ],
};

const protectedFiles = [
  "src/components/voice/carnos-voice-panel-integration.tsx",
  "src/app/carnos/page.tsx",
];

const forbiddenMarkers = [
  ".insert(",
  ".update(",
  ".delete(",
  ".upsert(",
  "createSupabaseBrowserClient",
  "createProposedAction",
  "executeApprovedAction(",
  "MediaRecorder",
  "SpeechRecognition",
  "navigator.mediaDevices",
  "getUserMedia",
  "storage.from",
  "audio_bucket",
  "openai",
  "OpenAI",
  "generateText",
  "streamText",
  "fetch(",
  "setInterval(",
  "setTimeout(",
];

const forbiddenPaths = [
  "src/app/voice-companion",
];

const errors = [];

function fullPath(relPath) {
  return path.join(root, relPath);
}

function exists(relPath) {
  return fs.existsSync(fullPath(relPath));
}

function read(relPath) {
  return fs.readFileSync(fullPath(relPath), "utf8");
}

for (const file of requiredFiles) {
  if (!exists(file)) {
    errors.push(`Missing required file: ${file}`);
  }
}

for (const [file, markers] of Object.entries(requiredMarkers)) {
  if (!exists(file)) {
    continue;
  }

  const contents = read(file);

  for (const marker of markers) {
    if (!contents.includes(marker)) {
      errors.push(`${file} missing marker: ${marker}`);
    }
  }
}

for (const file of protectedFiles) {
  if (!exists(file)) {
    continue;
  }

  const contents = read(file);

  for (const marker of forbiddenMarkers) {
    if (contents.includes(marker)) {
      errors.push(`${file} contains forbidden marker: ${marker}`);
    }
  }
}

for (const relPath of forbiddenPaths) {
  if (exists(relPath)) {
    errors.push(`Forbidden standalone voice route exists: ${relPath}`);
  }
}

const pkg = JSON.parse(read("package.json"));

if (!pkg.scripts?.["audit:phase14g"]) {
  errors.push("package.json missing audit:phase14g script");
}

if (!pkg.scripts?.check?.includes("npm run audit:phase14g")) {
  errors.push("package.json check script missing audit:phase14g gate");
}

for (const logFile of [
  "PROJECT_EXECUTION_LOG.md",
  "CODE_LEDGER.md",
  "CHANGELOG.md",
  "PHASE_STATUS.md",
]) {
  if (!exists(logFile)) {
    errors.push(`Missing log/status file: ${logFile}`);
    continue;
  }

  if (!read(logFile).includes("Phase 14G")) {
    errors.push(`${logFile} missing Phase 14G marker`);
  }
}

console.log("\n=== PHASE 14G CARNOS VOICE PANEL INTEGRATION AUDIT ===");

if (errors.length > 0) {
  console.error("\n=== PHASE 14G CARNOS VOICE PANEL INTEGRATION AUDIT FAILED ===");
  for (const error of errors) {
    console.error(`✗ ${error}`);
  }
  process.exit(1);
}

console.log("✓ Carnos voice integration panel is present");
console.log("✓ Canonical /carnos surface includes the voice draft simulator");
console.log("✓ Standalone voice route, audio APIs, provider calls, SQL writes, and action execution are blocked");
console.log("✓ package.json check gate includes audit:phase14g");
console.log("✓ Phase 14G docs/logs are present");
console.log("\nPhase 14G Carnos voice panel integration audit passed.");

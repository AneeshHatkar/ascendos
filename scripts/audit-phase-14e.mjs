import fs from "node:fs";
import path from "node:path";

const root = process.cwd();

const requiredFiles = [
  "src/components/voice/voice-boundary-panel.tsx",
  "src/components/voice/voice-mode-selector-preview.tsx",
  "src/components/voice/voice-session-controls-preview.tsx",
  "src/components/voice/voice-transcript-preview.tsx",
  "src/components/voice/voice-confirmation-preview.tsx",
  "src/components/voice/voice-ui-shell-preview.tsx",
  "src/components/voice/index.ts",
  "docs/phase-reports/PHASE_14E_VOICE_UI_COMPONENTS_REPORT.md",
  "docs/qa/PHASE_14E_VOICE_UI_COMPONENTS_MANUAL_SMOKE_CHECKLIST.md",
];

const requiredMarkers = new Map([
  ["src/components/voice/voice-boundary-panel.tsx", ["Phase 14E Voice Boundary", "does not capture microphone input", "does not", "SQL records"]],
  ["src/components/voice/voice-mode-selector-preview.tsx", ["friend_voice", "crisis_soft_voice", "display-only"]],
  ["src/components/voice/voice-session-controls-preview.tsx", ["disabled", "does not start recording", "mutate state"]],
  ["src/components/voice/voice-transcript-preview.tsx", ["Live transcript shell", "does not subscribe to audio streams", "save transcript rows"]],
  ["src/components/voice/voice-confirmation-preview.tsx", ["Review-before-write preview", "does not create proposed actions", "execute writes"]],
  ["src/components/voice/voice-ui-shell-preview.tsx", ["VoiceBoundaryPanel", "VoiceTranscriptPreview", "VoiceConfirmationPreview"]],
  ["src/components/voice/index.ts", ["voice-boundary-panel", "voice-ui-shell-preview"]],
  ["docs/phase-reports/PHASE_14E_VOICE_UI_COMPONENTS_REPORT.md", ["Status: Complete", "No microphone capture", "No SQL writes", "No proposed-action execution bridge", "Phase 14F"]],
  ["docs/qa/PHASE_14E_VOICE_UI_COMPONENTS_MANUAL_SMOKE_CHECKLIST.md", ["No MediaRecorder", "No SQL writes", "No /voice-companion", "Phase 14F"]],
]);

const forbiddenMarkers = [
  "MediaRecorder",
  "SpeechRecognition",
  "navigator.mediaDevices",
  "new Audio",
  "<audio",
  "fetch(",
  ".insert(",
  ".update(",
  ".delete(",
  ".upsert(",
  "createSupabaseBrowserClient",
  "createProposedAction",
  "executeApprovedAction",
  "generateText",
  "streamText",
  "OpenAI",
  "openai",
  "/voice-companion",
];

const componentFiles = [
  "src/components/voice/voice-boundary-panel.tsx",
  "src/components/voice/voice-mode-selector-preview.tsx",
  "src/components/voice/voice-session-controls-preview.tsx",
  "src/components/voice/voice-transcript-preview.tsx",
  "src/components/voice/voice-confirmation-preview.tsx",
  "src/components/voice/voice-ui-shell-preview.tsx",
  "src/components/voice/index.ts",
];

const failures = [];

function read(relPath) {
  const fullPath = path.join(root, relPath);
  if (!fs.existsSync(fullPath)) {
    failures.push(`Missing required file: ${relPath}`);
    return "";
  }
  return fs.readFileSync(fullPath, "utf8");
}

function assertIncludes(relPath, marker) {
  const content = read(relPath);
  if (!content.includes(marker)) {
    failures.push(`${relPath} missing marker: ${marker}`);
  }
}

console.log("\n=== PHASE 14E VOICE UI COMPONENTS AUDIT ===");

for (const file of requiredFiles) {
  read(file);
}

for (const [file, markers] of requiredMarkers.entries()) {
  for (const marker of markers) {
    assertIncludes(file, marker);
  }
}

for (const file of componentFiles) {
  const content = read(file);
  for (const marker of forbiddenMarkers) {
    if (content.includes(marker)) {
      failures.push(`${file} contains forbidden marker: ${marker}`);
    }
  }
}

const packageJson = JSON.parse(read("package.json"));
if (!packageJson.scripts?.["audit:phase14e"]) {
  failures.push("package.json missing audit:phase14e script");
}
if (!packageJson.scripts?.check?.includes("audit:phase14e")) {
  failures.push("package.json check gate missing audit:phase14e");
}

const phaseStatus = read("PHASE_STATUS.md");
if (!phaseStatus.includes("Phase 14E") || !phaseStatus.includes("Phase 14F")) {
  failures.push("PHASE_STATUS.md missing Phase 14E/14F markers");
}

const log = read("PROJECT_EXECUTION_LOG.md");
if (!log.includes("Phase 14E")) {
  failures.push("PROJECT_EXECUTION_LOG.md missing Phase 14E marker");
}

const ledger = read("CODE_LEDGER.md");
if (!ledger.includes("Phase 14E")) {
  failures.push("CODE_LEDGER.md missing Phase 14E marker");
}

const changelog = read("CHANGELOG.md");
if (!changelog.includes("Phase 14E")) {
  failures.push("CHANGELOG.md missing Phase 14E marker");
}

if (failures.length > 0) {
  console.error("\n=== PHASE 14E VOICE UI COMPONENTS AUDIT FAILED ===");
  for (const failure of failures) {
    console.error(`✗ ${failure}`);
  }
  process.exit(1);
}

console.log("✓ Voice UI component files are present");
console.log("✓ Voice UI preview markers are present");
console.log("✓ Microphone, audio, API, SQL, AI, route, and proposed-action execution boundaries are protected");
console.log("✓ package.json check gate includes audit:phase14e");
console.log("✓ Phase 14E docs/logs are present");
console.log("\nPhase 14E voice UI components audit passed.");

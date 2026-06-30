import fs from "node:fs";
import path from "node:path";

const root = process.cwd();

const requiredFiles = [
  "src/lib/voice/transcript-draft.ts",
  "src/lib/voice/index.ts",
  "src/components/voice/voice-manual-simulator-preview.tsx",
  "src/components/voice/index.ts",
  "docs/phase-reports/PHASE_14F_TRANSCRIPT_DRAFT_MANUAL_SIMULATOR_REPORT.md",
  "docs/qa/PHASE_14F_TRANSCRIPT_DRAFT_MANUAL_SIMULATOR_SMOKE_CHECKLIST.md",
  "scripts/audit-phase-14f.mjs",
];

const requiredMarkers = {
  "src/lib/voice/transcript-draft.ts": [
    "VoiceTranscriptDraft",
    "createVoiceTranscriptDraft",
    "summarizeTranscriptDraft",
    "needsReview: true",
    "sensitiveDefault: true",
    "persisted: false",
    "audioSaved: false",
    "audioRetained: false",
    "providerCalled: false",
    "sqlWritten: false",
    "proposedActionCreated: false",
    "proposedActionExecuted: false",
    "microphoneUsed: false",
    "Manual transcript input only",
    "No SQL writes",
    "No /voice-companion",
  ],
  "src/components/voice/voice-manual-simulator-preview.tsx": [
    "VoiceManualSimulatorPreview",
    "manual transcript simulator",
    "createVoiceTranscriptDraft",
    "needs_review: true",
    "Protected boundary",
    "VOICE_TRANSCRIPT_DRAFT_BOUNDARY_MARKERS",
    "does not call STT, TTS, Carnos extraction, SQL, or the",
    "proposed-action execution bridge",
  ],
  "src/components/voice/index.ts": [
    'export * from "./voice-manual-simulator-preview";',
  ],
  "src/lib/voice/index.ts": [
    'export * from "./transcript-draft";',
  ],
  "docs/phase-reports/PHASE_14F_TRANSCRIPT_DRAFT_MANUAL_SIMULATOR_REPORT.md": [
    "Phase 14F Transcript Draft + Manual Simulator Report",
    "Status: Complete",
    "Manual transcript input only",
    "No SQL writes",
    "No proposed-action execution",
    "No /voice-companion",
    "Phase 14G Carnos Voice Panel Integration",
  ],
  "docs/qa/PHASE_14F_TRANSCRIPT_DRAFT_MANUAL_SIMULATOR_SMOKE_CHECKLIST.md": [
    "Phase 14F Transcript Draft + Manual Simulator Smoke Checklist",
    "Manual transcript input only",
    "No SQL writes",
    "No proposed-action execution",
    "No /voice-companion",
    "Manual browser check later",
  ],
};

const forbiddenMarkers = [
  ".insert(",
  ".update(",
  ".delete(",
  ".upsert(",
  "createSupabaseBrowserClient",
  "createSupabaseServerClient",
  "createProposedAction",
  "executeApprovedAction",
  "manual transcript input",
  "SpeechRecognition",
  "navigator.mediaDevices",
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

const protectedFiles = [
  "src/lib/voice/transcript-draft.ts",
  "src/components/voice/voice-manual-simulator-preview.tsx",
];

const forbiddenPaths = [
  "src/app/voice-companion",
];

const errors = [];

function read(relPath) {
  return fs.readFileSync(path.join(root, relPath), "utf8");
}

function exists(relPath) {
  return fs.existsSync(path.join(root, relPath));
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

if (!pkg.scripts?.["audit:phase14f"]) {
  errors.push("package.json missing audit:phase14f script");
}

if (!pkg.scripts?.check?.includes("npm run audit:phase14f")) {
  errors.push("package.json check script missing audit:phase14f gate");
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

  if (!read(logFile).includes("Phase 14F")) {
    errors.push(`${logFile} missing Phase 14F marker`);
  }
}

console.log("\n=== PHASE 14F TRANSCRIPT DRAFT + MANUAL SIMULATOR AUDIT ===");

if (errors.length > 0) {
  console.error("\n=== PHASE 14F TRANSCRIPT DRAFT + MANUAL SIMULATOR AUDIT FAILED ===");
  for (const error of errors) {
    console.error(`✗ ${error}`);
  }
  process.exit(1);
}

console.log("✓ Transcript draft helper is present");
console.log("✓ Manual simulator preview is present");
console.log("✓ Draft review, sensitivity, and boundary flags are present");
console.log("✓ Audio, provider, SQL, AI, route, and proposed-action execution boundaries are protected");
console.log("✓ package.json check gate includes audit:phase14f");
console.log("✓ Phase 14F docs/logs are present");
console.log("\nPhase 14F transcript draft + manual simulator audit passed.");

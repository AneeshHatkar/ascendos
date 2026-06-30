import fs from "node:fs";
import path from "node:path";

const root = process.cwd();

const requiredFiles = [
  "src/lib/voice/voice-action-bridge.ts",
  "src/lib/voice/index.ts",
  "src/components/voice/voice-action-bridge-preview.tsx",
  "src/components/voice/carnos-voice-panel-integration.tsx",
  "src/components/voice/index.ts",
  "docs/phase-reports/PHASE_14H_TEXT_VOICE_TO_PROPOSED_ACTION_BRIDGE_REPORT.md",
  "docs/qa/PHASE_14H_TEXT_VOICE_TO_PROPOSED_ACTION_BRIDGE_SMOKE_CHECKLIST.md",
  "scripts/audit-phase-14h.mjs",
];

const requiredMarkers = {
  "src/lib/voice/voice-action-bridge.ts": [
    "VoiceActionBridgeCandidate",
    "deriveVoiceActionBridgeCandidate",
    "summarizeVoiceActionBridgeCandidate",
    "ProposedActionContract",
    "create_task",
    "create_goal",
    "create_daily_log",
    "create_proof_item",
    "localOnly: true",
    "persisted: false",
    "sqlWritten: false",
    "aiCalled: false",
    "providerCalled: false",
    "proposedActionPersisted: false",
    "proposedActionExecuted: false",
    "requiresHumanConfirmation: true",
    "allowedActionTypesOnly: true",
    "No SQL writes",
    "No /voice-companion",
  ],
  "src/components/voice/voice-action-bridge-preview.tsx": [
    "VoiceActionBridgePreview",
    "text / voice bridge preview",
    "deriveVoiceActionBridgeCandidate",
    "Candidate payload preview",
    "Allowed action types",
    "Protected boundary",
    "VOICE_ACTION_BRIDGE_ALLOWED_ACTION_TYPES",
    "VOICE_ACTION_BRIDGE_BOUNDARY_MARKERS",
  ],
  "src/components/voice/carnos-voice-panel-integration.tsx": [
    "VoiceActionBridgePreview",
    "<VoiceActionBridgePreview />",
  ],
  "src/components/voice/index.ts": [
    'export * from "./voice-action-bridge-preview";',
  ],
  "src/lib/voice/index.ts": [
    'export * from "./voice-action-bridge";',
  ],
  "docs/phase-reports/PHASE_14H_TEXT_VOICE_TO_PROPOSED_ACTION_BRIDGE_REPORT.md": [
    "Phase 14H Text/Voice-to-Proposed-Action Bridge Report",
    "Status: Complete",
    "create_task",
    "create_goal",
    "create_daily_log",
    "create_proof_item",
    "No SQL writes",
    "No action execution",
    "No /voice-companion",
    "Phase 14I Audit + Smoke Checklist + Completion Report",
  ],
  "docs/qa/PHASE_14H_TEXT_VOICE_TO_PROPOSED_ACTION_BRIDGE_SMOKE_CHECKLIST.md": [
    "Phase 14H Text/Voice-to-Proposed-Action Bridge Smoke Checklist",
    "/carnos",
    "create_task",
    "no SQL writes",
    "no AI calls",
    "no provider calls",
    "no persisted action rows",
    "no action execution",
    "/voice-companion",
  ],
};

const protectedFiles = [
  "src/lib/voice/voice-action-bridge.ts",
  "src/components/voice/voice-action-bridge-preview.tsx",
  "src/components/voice/carnos-voice-panel-integration.tsx",
];

const forbiddenMarkers = [
  ".insert(",
  ".update(",
  ".delete(",
  ".upsert(",
  "createSupabaseBrowserClient",
  "createSupabaseServerClient",
  "createProposedAction",
  "executeApprovedAction",
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

function exists(relPath) {
  return fs.existsSync(path.join(root, relPath));
}

function read(relPath) {
  return fs.readFileSync(path.join(root, relPath), "utf8");
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

if (!pkg.scripts?.["audit:phase14h"]) {
  errors.push("package.json missing audit:phase14h script");
}

if (!pkg.scripts?.check?.includes("npm run audit:phase14h")) {
  errors.push("package.json check script missing audit:phase14h gate");
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

  if (!read(logFile).includes("Phase 14H")) {
    errors.push(`${logFile} missing Phase 14H marker`);
  }
}

console.log("\n=== PHASE 14H TEXT/VOICE TO PROPOSED-ACTION BRIDGE AUDIT ===");

if (errors.length > 0) {
  console.error("\n=== PHASE 14H TEXT/VOICE TO PROPOSED-ACTION BRIDGE AUDIT FAILED ===");
  for (const error of errors) {
    console.error(`✗ ${error}`);
  }
  process.exit(1);
}

console.log("✓ Voice action bridge helper is present");
console.log("✓ Bridge preview is present inside canonical /carnos voice panel");
console.log("✓ Allowed proposed-action types are locked");
console.log("✓ SQL writes, provider calls, AI calls, standalone route, and action execution are blocked");
console.log("✓ package.json check gate includes audit:phase14h");
console.log("✓ Phase 14H docs/logs are present");
console.log("\nPhase 14H text/voice-to-proposed-action bridge audit passed.");

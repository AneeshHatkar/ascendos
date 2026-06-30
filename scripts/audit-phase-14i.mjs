import fs from "node:fs";
import path from "node:path";

const root = process.cwd();

const requiredFiles = [
  "docs/source-of-truth/ascendOS_Carnos_v1_1_COMPLETE_Implementation_Bible_FINAL_SYNCED.docx",
  "docs/source-of-truth/ascendOS_Carnos_v1_1_COMPLETE_Source_of_Truth_FINAL_SYNCED.json",

  "docs/phase-plans/PHASE_14A_VOICE_FOUNDATION_SCOPE_LOCK.md",
  "docs/phase-reports/PHASE_14A_VOICE_FOUNDATION_SCOPE_LOCK_REPORT.md",
  "docs/qa/PHASE_14A_VOICE_FOUNDATION_SCOPE_LOCK_MANUAL_SMOKE_CHECKLIST.md",
  "scripts/audit-phase-14a.mjs",

  "docs/database/PHASE_14_VOICE_SCHEMA_DESIGN.md",
  "docs/phase-reports/PHASE_14B_VOICE_SQL_FOUNDATION_REPORT.md",
  "docs/qa/PHASE_14B_VOICE_SQL_FOUNDATION_MANUAL_SMOKE_CHECKLIST.md",
  "scripts/audit-phase-14b.mjs",

  "docs/phase-reports/PHASE_14C_VOICE_TYPES_STATE_MACHINE_REPORT.md",
  "docs/qa/PHASE_14C_VOICE_TYPES_STATE_MACHINE_MANUAL_SMOKE_CHECKLIST.md",
  "scripts/audit-phase-14c.mjs",

  "docs/phase-reports/PHASE_14D_STT_TTS_PROVIDER_BOUNDARY_REPORT.md",
  "docs/qa/PHASE_14D_STT_TTS_PROVIDER_BOUNDARY_MANUAL_SMOKE_CHECKLIST.md",
  "scripts/audit-phase-14d.mjs",

  "docs/phase-reports/PHASE_14E_VOICE_UI_COMPONENTS_REPORT.md",
  "docs/qa/PHASE_14E_VOICE_UI_COMPONENTS_MANUAL_SMOKE_CHECKLIST.md",
  "scripts/audit-phase-14e.mjs",

  "docs/phase-reports/PHASE_14F_TRANSCRIPT_DRAFT_MANUAL_SIMULATOR_REPORT.md",
  "docs/qa/PHASE_14F_TRANSCRIPT_DRAFT_MANUAL_SIMULATOR_SMOKE_CHECKLIST.md",
  "scripts/audit-phase-14f.mjs",

  "docs/phase-reports/PHASE_14G_CARNOS_VOICE_PANEL_INTEGRATION_REPORT.md",
  "docs/qa/PHASE_14G_CARNOS_VOICE_PANEL_INTEGRATION_SMOKE_CHECKLIST.md",
  "scripts/audit-phase-14g.mjs",

  "docs/phase-reports/PHASE_14H_TEXT_VOICE_TO_PROPOSED_ACTION_BRIDGE_REPORT.md",
  "docs/qa/PHASE_14H_TEXT_VOICE_TO_PROPOSED_ACTION_BRIDGE_SMOKE_CHECKLIST.md",
  "scripts/audit-phase-14h.mjs",

  "docs/phase-reports/PHASE_14I_VOICE_FOUNDATION_AUDIT_COMPLETION_REPORT.md",
  "docs/qa/PHASE_14I_VOICE_FOUNDATION_AUDIT_SMOKE_CHECKLIST.md",

  "src/lib/voice/voice-action-bridge.ts",
  "src/components/voice/voice-action-bridge-preview.tsx",
  "src/components/voice/carnos-voice-panel-integration.tsx",

  "PROJECT_EXECUTION_LOG.md",
  "CODE_LEDGER.md",
  "CHANGELOG.md",
  "PHASE_STATUS.md",
  "package.json",
];

const requiredMarkers = [
  {
    file: "docs/phase-reports/PHASE_14I_VOICE_FOUNDATION_AUDIT_COMPLETION_REPORT.md",
    markers: [
      "Phase 14I Voice Foundation Audit + Completion Report",
      "Status: Complete",
      "Phase 14A",
      "Phase 14B",
      "Phase 14C",
      "Phase 14D",
      "Phase 14E",
      "Phase 14F",
      "Phase 14G",
      "Phase 14H",
      "Phase 14J",
      "No voice-derived silent writes",
      "No standalone `/voice-companion` route",
      "create_task",
      "create_goal",
      "create_daily_log",
      "create_proof_item",
      "npm run check",
    ],
  },
  {
    file: "docs/qa/PHASE_14I_VOICE_FOUNDATION_AUDIT_SMOKE_CHECKLIST.md",
    markers: [
      "Phase 14I Voice Foundation Audit Smoke Checklist",
      "npm run audit:phase14i",
      "npm run check",
      "npm run build",
      "No standalone `/voice-companion` route exists",
      "No voice UI file performs SQL writes",
      "No voice bridge file executes approved actions",
      "Phase 14J is the next phase",
    ],
  },
  {
    file: "src/lib/voice/voice-action-bridge.ts",
    markers: [
      "create_task",
      "create_goal",
      "create_daily_log",
      "create_proof_item",
      "source: \"carnos\"",
      "bridgeBoundary",
    ],
  },
  {
    file: "src/components/voice/carnos-voice-panel-integration.tsx",
    markers: [
      "VoiceActionBridgePreview",
      "VoiceManualSimulatorPreview",
    ],
  },
  {
    file: "package.json",
    markers: [
      "audit:phase14i",
    ],
  },
  {
    file: "PROJECT_EXECUTION_LOG.md",
    markers: [
      "Phase 14I",
    ],
  },
  {
    file: "CODE_LEDGER.md",
    markers: [
      "Phase 14I",
    ],
  },
  {
    file: "CHANGELOG.md",
    markers: [
      "Phase 14I",
    ],
  },
  {
    file: "PHASE_STATUS.md",
    markers: [
      "Phase 14I",
      "Phase 14J",
    ],
  },
];

const forbiddenPathFragments = [
  "src/app/voice-companion",
  "src/app/(voice-companion)",
];

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
  "executeApprovedAction(",
  "createProposedAction(",
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
  "setInterval(",
  "setTimeout(",
];

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), "utf8");
}

function exists(relativePath) {
  return fs.existsSync(path.join(root, relativePath));
}

function fail(message) {
  console.error(`\nPhase 14I audit failed: ${message}`);
  process.exit(1);
}

function pass(message) {
  console.log(`✓ ${message}`);
}

console.log("\n=== PHASE 14I VOICE FOUNDATION AUDIT + COMPLETION REPORT AUDIT ===");

for (const file of requiredFiles) {
  if (!exists(file)) {
    fail(`Missing required file: ${file}`);
  }
}
pass("Required Phase 14I and prior Phase 14 artifacts are present");

for (const check of requiredMarkers) {
  const text = read(check.file);
  for (const marker of check.markers) {
    if (!text.includes(marker)) {
      fail(`${check.file} is missing marker: ${marker}`);
    }
  }
}
pass("Phase 14I report, checklist, bridge, logs, and package markers are present");

for (const fragment of forbiddenPathFragments) {
  const absolutePath = path.join(root, fragment);
  if (fs.existsSync(absolutePath)) {
    fail(`Forbidden standalone voice route exists: ${fragment}`);
  }
}
pass("Standalone voice companion route remains absent");

for (const file of protectedFiles) {
  const text = read(file);
  for (const marker of forbiddenMarkers) {
    if (text.includes(marker)) {
      fail(`${file} contains forbidden marker: ${marker}`);
    }
  }
}
pass("Voice bridge and Carnos integration files remain non-mutating and provider-free");

const packageJson = JSON.parse(read("package.json"));

if (!packageJson.scripts?.["audit:phase14i"]) {
  fail("package.json is missing audit:phase14i script");
}

if (!packageJson.scripts?.check?.includes("audit:phase14i")) {
  fail("package.json check script does not include audit:phase14i");
}
pass("package.json check gate includes audit:phase14i");

const phaseStatus = read("PHASE_STATUS.md");
if (!phaseStatus.includes("Phase 14J")) {
  fail("PHASE_STATUS.md does not point to Phase 14J as next phase");
}
pass("Phase status points to Phase 14J final hardening");

console.log("\nPhase 14I voice foundation audit + completion report audit passed.");

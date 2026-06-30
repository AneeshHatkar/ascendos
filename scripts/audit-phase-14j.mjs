import fs from "node:fs";
import path from "node:path";

const root = process.cwd();

function read(relPath) {
  return fs.readFileSync(path.join(root, relPath), "utf8");
}

function exists(relPath) {
  return fs.existsSync(path.join(root, relPath));
}

function pass(message) {
  console.log(`✓ ${message}`);
}

function fail(message) {
  console.error(`✗ ${message}`);
  process.exitCode = 1;
}

function requireFile(relPath) {
  if (!exists(relPath)) {
    fail(`Missing required file: ${relPath}`);
    return "";
  }
  return read(relPath);
}

function requireIncludes(relPath, markers) {
  const text = requireFile(relPath);
  for (const marker of markers) {
    if (!text.includes(marker)) {
      fail(`${relPath} missing marker: ${marker}`);
    }
  }
}

function requireNotExists(relPath) {
  if (exists(relPath)) {
    fail(`Forbidden path exists: ${relPath}`);
  }
}

function requireNoMarkers(relPath, markers) {
  const text = requireFile(relPath);
  for (const marker of markers) {
    if (text.includes(marker)) {
      fail(`${relPath} contains forbidden marker: ${marker}`);
    }
  }
}

console.log("\n=== PHASE 14J FINAL VOICE/TEXT INTEGRATION HARDENING AUDIT ===");

const requiredPhase14Files = [
  "docs/phase-plans/PHASE_14A_VOICE_FOUNDATION_SCOPE_LOCK.md",
  "docs/phase-reports/PHASE_14A_VOICE_FOUNDATION_SCOPE_LOCK_REPORT.md",
  "docs/database/PHASE_14_VOICE_SCHEMA_DESIGN.md",
  "docs/phase-reports/PHASE_14B_VOICE_SQL_FOUNDATION_REPORT.md",
  "docs/phase-reports/PHASE_14C_VOICE_TYPES_STATE_MACHINE_REPORT.md",
  "docs/phase-reports/PHASE_14D_STT_TTS_PROVIDER_BOUNDARY_REPORT.md",
  "docs/phase-reports/PHASE_14E_VOICE_UI_COMPONENTS_REPORT.md",
  "docs/phase-reports/PHASE_14F_TRANSCRIPT_DRAFT_MANUAL_SIMULATOR_REPORT.md",
  "docs/phase-reports/PHASE_14G_CARNOS_VOICE_PANEL_INTEGRATION_REPORT.md",
  "docs/phase-reports/PHASE_14H_TEXT_VOICE_TO_PROPOSED_ACTION_BRIDGE_REPORT.md",
  "docs/phase-reports/PHASE_14I_VOICE_FOUNDATION_AUDIT_COMPLETION_REPORT.md",
  "docs/phase-reports/PHASE_14J_FINAL_VOICE_TEXT_INTEGRATION_HARDENING_REPORT.md",
  "docs/qa/PHASE_14J_FINAL_VOICE_TEXT_INTEGRATION_HARDENING_SMOKE_CHECKLIST.md",
  "scripts/audit-phase-14a.mjs",
  "scripts/audit-phase-14b.mjs",
  "scripts/audit-phase-14c.mjs",
  "scripts/audit-phase-14d.mjs",
  "scripts/audit-phase-14e.mjs",
  "scripts/audit-phase-14f.mjs",
  "scripts/audit-phase-14g.mjs",
  "scripts/audit-phase-14h.mjs",
  "scripts/audit-phase-14i.mjs",
  "scripts/audit-phase-14j.mjs",
  "src/app/carnos/page.tsx",
  "src/components/voice/carnos-voice-panel-integration.tsx",
  "src/components/voice/voice-action-bridge-preview.tsx",
  "src/lib/voice/voice-action-bridge.ts",
];

for (const file of requiredPhase14Files) {
  requireFile(file);
}

if (!process.exitCode) {
  pass("Required Phase 14A–14J files are present");
}

requireNotExists("src/app/voice-companion");
requireNotExists("src/app/voice-companion/page.tsx");
requireNotExists("src/app/(voice-companion)");
if (!process.exitCode) {
  pass("Standalone voice companion route remains absent");
}

requireIncludes("src/components/voice/carnos-voice-panel-integration.tsx", [
  "Carnos",
  "Voice",
  "VoiceManualSimulatorPreview",
  "VoiceActionBridgePreview",
]);

requireIncludes("src/components/voice/voice-action-bridge-preview.tsx", [
  "VoiceActionBridgePreview",
]);

requireIncludes("src/lib/voice/voice-action-bridge.ts", [
  "create_task",
  "create_goal",
  "create_daily_log",
  "create_proof_item",
  "source: \"carnos\"",
]);

if (!process.exitCode) {
  pass("Carnos voice panel and bridge preview remain wired to canonical local preview flow");
}

const protectedPhase14RuntimeFiles = [
  "src/components/voice/carnos-voice-panel-integration.tsx",
  "src/components/voice/voice-action-bridge-preview.tsx",
  "src/components/voice/voice-manual-simulator-preview.tsx",
  "src/lib/voice/voice-action-bridge.ts",
  "src/lib/voice/transcript-draft.ts",
];

const forbiddenRuntimeMarkers = [
  ".insert(",
  ".update(",
  ".delete(",
  ".upsert(",
  "executeApprovedAction(",
  "createProposedAction(",
  "createSupabaseBrowserClient",
  "createSupabaseServerClient",
  "generateText",
  "streamText",
  "OpenAI",
  "openai",
  "fetch(",
  "setInterval(",
  "setTimeout(",
  "SpeechRecognition",
  "MediaRecorder",
  "navigator.mediaDevices",
  "getUserMedia",
  "storage.from",
];

for (const file of protectedPhase14RuntimeFiles) {
  requireNoMarkers(file, forbiddenRuntimeMarkers);
}

if (!process.exitCode) {
  pass("Phase 14 runtime UI/bridge files remain non-mutating, provider-free, AI-free, and execution-free");
}

requireIncludes("docs/phase-reports/PHASE_14J_FINAL_VOICE_TEXT_INTEGRATION_HARDENING_REPORT.md", [
  "Status: Complete",
  "Voice Foundation",
  "Phase 14J",
  "No standalone voice companion route",
  "No direct SQL writes",
  "No direct proposed-action execution",
  "Memory/RAG",
  "Next source-of-truth",
]);

requireIncludes("docs/qa/PHASE_14J_FINAL_VOICE_TEXT_INTEGRATION_HARDENING_SMOKE_CHECKLIST.md", [
  "/carnos",
  "/voice-companion",
  "create_task",
  "create_goal",
  "create_daily_log",
  "create_proof_item",
  "npm run audit:phase14j",
  "npm run check",
]);

if (!process.exitCode) {
  pass("Phase 14J report and smoke checklist contain required closeout markers");
}

const pkg = JSON.parse(requireFile("package.json"));
if (!pkg.scripts?.["audit:phase14j"]) {
  fail("package.json missing audit:phase14j script");
}
if (!pkg.scripts?.check?.includes("npm run audit:phase14j")) {
  fail("package.json check script missing audit:phase14j gate");
}
if (!process.exitCode) {
  pass("package.json check gate includes audit:phase14j");
}

requireIncludes("PROJECT_EXECUTION_LOG.md", ["Phase 14J"]);
requireIncludes("CODE_LEDGER.md", ["Phase 14J"]);
requireIncludes("CHANGELOG.md", ["Phase 14J"]);
requireIncludes("PHASE_STATUS.md", ["Phase 14J", "Memory/RAG"]);

if (!process.exitCode) {
  pass("Phase 14J logs/status markers are present and next chunk is identified");
}

if (process.exitCode) {
  console.error("\nPhase 14J final hardening audit failed.");
  process.exit(process.exitCode);
}

console.log("\nPhase 14J final voice/text integration hardening audit passed.");

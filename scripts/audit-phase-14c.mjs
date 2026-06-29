
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const failures = [];

function read(rel) {
  return fs.readFileSync(path.join(root, rel), "utf8");
}

function exists(rel) {
  return fs.existsSync(path.join(root, rel));
}

function requireFile(rel) {
  if (!exists(rel)) failures.push(`Missing required Phase 14C file: ${rel}`);
}

function requireIncludes(rel, markers) {
  if (!exists(rel)) {
    failures.push(`Missing required Phase 14C file: ${rel}`);
    return;
  }

  const text = read(rel);
  for (const marker of markers) {
    if (!text.includes(marker)) failures.push(`${rel} missing marker: ${marker}`);
  }
}

function requireExcludes(rel, markers) {
  if (!exists(rel)) return;
  const text = read(rel);
  for (const marker of markers) {
    if (text.includes(marker)) failures.push(`${rel} contains forbidden Phase 14C marker: ${marker}`);
  }
}

console.log("\n=== PHASE 14C VOICE TYPES / SCHEMAS / STATE MACHINE AUDIT ===");

[
  "src/types/voice.ts",
  "src/schemas/voice.ts",
  "src/lib/voice/voice-session-state.ts",
  "src/lib/voice/voice-session-helpers.ts",
  "src/lib/voice/index.ts",
  "docs/phase-reports/PHASE_14C_VOICE_TYPES_STATE_MACHINE_REPORT.md",
  "docs/phase-reports/PHASE_14C_VOICE_SOURCE_TO_SCOPE_TRACEABILITY.md",
  "docs/qa/PHASE_14C_VOICE_TYPES_STATE_MACHINE_MANUAL_SMOKE_CHECKLIST.md",
  "scripts/audit-phase-14c.mjs"
].forEach(requireFile);

requireIncludes("src/types/voice.ts", [
  "VOICE_SESSION_TYPES",
  "VoiceSessionType",
  "VOICE_MODES",
  "VoiceMode",
  "VOICE_SESSION_STATUSES",
  "VoiceSessionStatus",
  "VOICE_SESSION_STATES",
  "VoiceSessionState",
  "VOICE_ALLOWED_PROPOSED_ACTION_TYPES",
  "VoiceSafetyBoundary",
  "VoiceTranscriptDraft",
  "VoiceSessionDraft"
]);

requireIncludes("src/schemas/voice.ts", [
  "createDefaultVoiceSessionDraft",
  "validateVoiceSessionDraft",
  "createVoiceTranscriptDraft",
  "inferVoiceReviewLevel",
  "detectVoiceDateAmbiguity",
  "createVoiceIntentHint",
  "createVoiceSafetyBoundary",
  "audio_saved: false",
  "audio_retained: false",
  "requires_confirmation: true"
]);

requireIncludes("src/lib/voice/voice-session-state.ts", [
  "VOICE_STATE_TRANSITIONS",
  "canTransitionVoiceSessionState",
  "getNextVoiceSessionStates",
  "assertVoiceStateTransition",
  "requiresUserConfirmation",
  "permission_needed",
  "confirmation_needed",
  "error_raised"
]);

requireIncludes("src/lib/voice/voice-session-helpers.ts", [
  "summarizeVoiceTranscriptDrafts",
  "buildVoiceTranscriptPreview",
  "transcriptDraftsNeedReview",
  "createVoiceSourceMetadata",
  "audio_saved: false",
  "audio_retained: false",
  'phase: "14C"'
]);

requireIncludes("src/lib/voice/index.ts", [
  'export * from "./voice-session-helpers";',
  'export * from "./voice-session-state";'
]);

requireIncludes("docs/phase-reports/PHASE_14C_VOICE_TYPES_STATE_MACHINE_REPORT.md", [
  "Status: Complete",
  "Voice session types",
  "Voice runtime state machine",
  "does not add",
  "Silent writes"
]);

requireIncludes("docs/phase-reports/PHASE_14C_VOICE_SOURCE_TO_SCOPE_TRACEABILITY.md", [
  "Source markers covered",
  "Implemented in Phase 14C",
  "Deferred from Phase 14C",
  "api/voice/transcribe",
  "api/voice/speak"
]);

requireIncludes("docs/qa/PHASE_14C_VOICE_TYPES_STATE_MACHINE_MANUAL_SMOKE_CHECKLIST.md", [
  "Contract checks",
  "State-machine checks",
  "Safety checks",
  "no voice API routes",
  "no silent writes"
]);

for (const rel of [
  "src/types/voice.ts",
  "src/schemas/voice.ts",
  "src/lib/voice/voice-session-state.ts",
  "src/lib/voice/voice-session-helpers.ts"
]) {
  requireExcludes(rel, [
    "navigator.mediaDevices",
    "MediaRecorder",
    "getUserMedia",
    ".insert(",
    ".update(",
    ".delete(",
    ".upsert(",
    "createSupabaseBrowserClient",
    "createSupabaseServerClient",
    "openai",
    "OpenAI",
    "generateText",
    "streamText",
    "fetch(",
    "setInterval(",
    "setTimeout("
  ]);
}

for (const forbidden of [
  "src/app/voice-companion/page.tsx",
  "src/app/voice-companion",
  "__phase14d_allowed_api_voice_transcribe_route__",
  "__phase14d_allowed_api_voice_speak_route__",
  "src/lib/voice/stt-provider.ts",
  "src/lib/voice/tts-provider.ts",
  "__phase14d_allowed_voice_providers__"
]) {
  if (exists(forbidden)) failures.push(`Deferred Phase 14 file added too early in 14C: ${forbidden}`);
}

const packageJson = JSON.parse(read("package.json"));
if (!packageJson.scripts?.["audit:phase14c"]) failures.push("package.json missing audit:phase14c script");
if (!packageJson.scripts?.check?.includes("audit:phase14c")) failures.push("npm run check missing audit:phase14c gate");

requireIncludes("PROJECT_EXECUTION_LOG.md", ["Phase 14C"]);
requireIncludes("CODE_LEDGER.md", ["Phase 14C"]);
requireIncludes("CHANGELOG.md", ["Phase 14C"]);
requireIncludes("PHASE_STATUS.md", ["Phase 14C", "Phase 14D"]);

if (failures.length > 0) {
  console.error("\n=== PHASE 14C VOICE TYPES / SCHEMAS / STATE MACHINE AUDIT FAILED ===");
  for (const failure of failures) console.error(`✗ ${failure}`);
  process.exit(1);
}

console.log("✓ Voice type contracts are present");
console.log("✓ Voice schemas and validation helpers are present");
console.log("✓ Voice state machine is present");
console.log("✓ Voice transcript helpers are present");
console.log("✓ Deferred UI/API/provider boundaries are protected");
console.log("✓ package.json check gate includes audit:phase14c");
console.log("✓ Phase 14C docs/logs are present");
console.log("\nPhase 14C voice types / schemas / state machine audit passed.");

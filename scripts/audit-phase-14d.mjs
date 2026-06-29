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
  if (!exists(rel)) failures.push(`Missing required file: ${rel}`);
}

function requireIncludes(rel, markers) {
  if (!exists(rel)) {
    failures.push(`Missing required file: ${rel}`);
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
    if (text.includes(marker)) failures.push(`${rel} contains forbidden marker: ${marker}`);
  }
}

console.log("\n=== PHASE 14D STT/TTS PROVIDER BOUNDARY API AUDIT ===");

const requiredFiles = [
  "src/lib/voice/providers/voice-provider-types.ts",
  "src/lib/voice/providers/noop-stt-provider.ts",
  "src/lib/voice/providers/noop-tts-provider.ts",
  "src/lib/voice/providers/index.ts",
  "src/app/api/voice/transcribe/route.ts",
  "src/app/api/voice/speak/route.ts",
  "docs/phase-reports/PHASE_14D_STT_TTS_PROVIDER_BOUNDARY_REPORT.md",
  "docs/qa/PHASE_14D_STT_TTS_PROVIDER_BOUNDARY_MANUAL_SMOKE_CHECKLIST.md",
  "scripts/audit-phase-14d.mjs",
];

for (const file of requiredFiles) requireFile(file);

requireIncludes("src/lib/voice/providers/voice-provider-types.ts", [
  "SpeechToTextProvider",
  "TextToSpeechProvider",
  "SpeechToTextResult",
  "TextToSpeechResult",
  "audioSaved: false",
  "audioRetained: false",
  "persisted: false",
  "proposedActionCreated: false",
]);

requireIncludes("src/lib/voice/providers/noop-stt-provider.ts", [
  "noopSpeechToTextProvider",
  "speech_to_text",
  "draft_ready",
  "needsReview: true",
  "audioSaved: false",
  "audioRetained: false",
  "persisted: false",
  "proposedActionCreated: false",
]);

requireIncludes("src/lib/voice/providers/noop-tts-provider.ts", [
  "noopTextToSpeechProvider",
  "text_to_speech",
  "draft_ready",
  "audioUrl: null",
  "audioSaved: false",
  "audioRetained: false",
  "persisted: false",
  "proposedActionCreated: false",
]);

requireIncludes("src/app/api/voice/transcribe/route.ts", [
  "export async function POST",
  "application/json",
  "noopSpeechToTextProvider",
  "provider_unconfigured",
  "speech_to_text",
  "audio_saved",
  "audio_retained",
  "persisted",
  "proposed_action_created",
]);

requireIncludes("src/app/api/voice/speak/route.ts", [
  "export async function POST",
  "application/json",
  "noopTextToSpeechProvider",
  "provider_unconfigured",
  "text_to_speech",
  "audio_url",
  "audio_saved",
  "audio_retained",
  "persisted",
  "proposed_action_created",
]);

const protectedFiles = [
  "src/lib/voice/providers/voice-provider-types.ts",
  "src/lib/voice/providers/noop-stt-provider.ts",
  "src/lib/voice/providers/noop-tts-provider.ts",
  "src/lib/voice/providers/index.ts",
  "src/app/api/voice/transcribe/route.ts",
  "src/app/api/voice/speak/route.ts",
];

for (const file of protectedFiles) {
  requireExcludes(file, [
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
    "audio_bucket",
    "storage.from",
    "openai",
    "OpenAI",
    "generateText",
    "streamText",
    "fetch(",
    "setInterval(",
    "setTimeout(",
  ]);
}

for (const forbiddenPath of [
  "__phase14e_ui_directory_parent_allowed_until_real_ui_files__",
  "src/app/voice-companion",
]) {
  if (exists(forbiddenPath)) failures.push(`Deferred Phase 14 path exists too early: ${forbiddenPath}`);
}

requireIncludes("docs/phase-reports/PHASE_14D_STT_TTS_PROVIDER_BOUNDARY_REPORT.md", [
  "Phase 14D",
  "STT/TTS Provider Boundary",
  "Status: Complete",
  "No SQL writes",
  "No proposed-action execution bridge",
  "Phase 14E",
]);

requireIncludes("docs/qa/PHASE_14D_STT_TTS_PROVIDER_BOUNDARY_MANUAL_SMOKE_CHECKLIST.md", [
  "Phase 14D",
  "/api/voice/transcribe",
  "/api/voice/speak",
  "audio_saved: false",
  "audio_retained: false",
  "proposed_action_created: false",
  "No standalone `/voice-companion` route",
]);

requireIncludes("package.json", ["audit:phase14d"]);
requireIncludes("package.json", ["npm run audit:phase14d"]);
requireIncludes("PROJECT_EXECUTION_LOG.md", ["Phase 14D"]);
requireIncludes("CODE_LEDGER.md", ["Phase 14D"]);
requireIncludes("CHANGELOG.md", ["Phase 14D"]);
requireIncludes("PHASE_STATUS.md", ["Phase 14D", "Phase 14E"]);

if (failures.length > 0) {
  console.error("\n=== PHASE 14D STT/TTS PROVIDER BOUNDARY API AUDIT FAILED ===");
  for (const failure of failures) console.error(`✗ ${failure}`);
  process.exit(1);
}

console.log("✓ STT/TTS provider boundary types are present");
console.log("✓ Noop STT/TTS providers are present");
console.log("✓ Voice transcribe/speak API routes are present");
console.log("✓ Audio storage, SQL writes, provider calls, UI, and action execution are blocked");
console.log("✓ package.json check gate includes audit:phase14d");
console.log("✓ Phase 14D docs/logs are present");

console.log("\nPhase 14D STT/TTS provider boundary API audit passed.");

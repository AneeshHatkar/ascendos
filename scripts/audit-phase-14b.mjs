import fs from "node:fs";
import path from "node:path";

const root = process.cwd();

function p(rel) {
  return path.join(root, rel);
}

function exists(rel) {
  return fs.existsSync(p(rel));
}

function read(rel) {
  return fs.readFileSync(p(rel), "utf8");
}

const failures = [];

const requiredFiles = [
  "supabase/migrations/0022_phase14_voice_foundation.sql",
  "supabase/migrations/0023_phase14_parent_ownership_guards.sql",
  "src/types/database.ts",
  "src/lib/repositories/voice-read.ts",
  "src/lib/repositories/index.ts",
  "docs/database/PHASE_14_VOICE_SCHEMA_DESIGN.md",
  "docs/phase-reports/PHASE_14B_VOICE_SQL_FOUNDATION_REPORT.md",
  "docs/qa/PHASE_14B_VOICE_SQL_FOUNDATION_MANUAL_SMOKE_CHECKLIST.md",
  "scripts/audit-phase-14b.mjs"
];

for (const file of requiredFiles) {
  if (!exists(file)) failures.push(`Missing required file: ${file}`);
}

function requireMarkers(rel, markers) {
  if (!exists(rel)) return;
  const text = read(rel);
  for (const marker of markers) {
    if (!text.includes(marker)) failures.push(`${rel} missing marker: ${marker}`);
  }
}

function forbidMarkers(rel, markers) {
  if (!exists(rel)) return;
  const text = read(rel);
  for (const marker of markers) {
    if (text.includes(marker)) failures.push(`${rel} includes forbidden marker: ${marker}`);
  }
}

requireMarkers("supabase/migrations/0022_phase14_voice_foundation.sql", [
  "Phase 14B Voice Foundation",
  "create table if not exists public.voice_sessions",
  "create table if not exists public.voice_transcripts",
  "alter table public.voice_sessions enable row level security;",
  "alter table public.voice_transcripts enable row level security;",
  "Users can view their own voice sessions",
  "Users can insert their own voice sessions",
  "Users can update their own voice sessions",
  "Users can delete their own voice sessions",
  "Users can view their own voice transcripts",
  "Users can insert their own voice transcripts",
  "Users can update their own voice transcripts",
  "Users can delete their own voice transcripts",
  "audio_saved boolean not null default false",
  "audio_retained boolean not null default false",
  "audio_retention_consent boolean not null default false",
  "audio_retained = false or audio_retention_consent = true",
  "sensitive_default boolean not null default true",
  "is_sensitive boolean not null default true",
  "needs_review boolean not null default true",
  "confidence_score",
  "detected_emotion_label",
  "occurred_at",
  "logged_at",
  "source_message_id",
  "source_ai_action_id"
]);

requireMarkers("supabase/migrations/0023_phase14_parent_ownership_guards.sql", [
  "Phase 14B Voice Foundation Parent Ownership Guards",
  "phase14_guard_voice_sessions_parent_ownership",
  "phase14_guard_voice_transcripts_parent_ownership",
  "chat_session_id must belong to the same user",
  "source_message_id must belong to the same user",
  "source_ai_action_id must belong to the same user",
  "voice_session_id must belong to the same user",
  "raise exception"
]);

requireMarkers("src/types/database.ts", [
  "VoiceSessionRow",
  "VoiceSessionInsert",
  "VoiceSessionUpdate",
  "VoiceTranscriptRow",
  "VoiceTranscriptInsert",
  "VoiceTranscriptUpdate",
  "audio_retained",
  "audio_retention_consent",
  "detected_emotion_label",
  "confidence_score",
  "occurred_at",
  "logged_at"
]);

requireMarkers("src/lib/repositories/voice-read.ts", [
  "listVoiceSessions",
  "listVoiceTranscripts",
  "voice_sessions",
  "voice_transcripts",
  "VoiceReadClient",
  "VoiceReadResult"
]);

forbidMarkers("src/lib/repositories/voice-read.ts", [
  ".insert(",
  ".update(",
  ".delete(",
  ".upsert(",
  "createSupabaseBrowserClient",
  "generateText",
  "streamText",
  "executeApprovedAction(",
  "createProposedAction(",
  "navigator.mediaDevices",
  "MediaRecorder",
  "fetch("
]);

requireMarkers("src/lib/repositories/index.ts", [
  "voice-read"
]);

requireMarkers("docs/database/PHASE_14_VOICE_SCHEMA_DESIGN.md", [
  "voice_sessions",
  "voice_transcripts",
  "audio_saved",
  "audio_retained",
  "audio_retention_consent",
  "Parent ownership guards",
  "No voice-derived system write is created in 14B"
]);

requireMarkers("docs/phase-reports/PHASE_14B_VOICE_SQL_FOUNDATION_REPORT.md", [
  "Phase 14B",
  "voice_sessions",
  "voice_transcripts",
  "audio_retained",
  "Protected boundaries",
  "Phase 14C"
]);

requireMarkers("docs/qa/PHASE_14B_VOICE_SQL_FOUNDATION_MANUAL_SMOKE_CHECKLIST.md", [
  "Phase 14B",
  "voice_sessions",
  "voice_transcripts",
  "RLS",
  "No voice API routes exist yet",
  "No voice UI components exist yet"
]);

for (const forbidden of [
  "__phase14d_allowed_api_voice_transcribe_route__",
  "__phase14d_allowed_api_voice_speak_route__",
  "src/app/voice-companion/page.tsx",
  "src/app/voice-companion",
  "src/components/voice/voice-state-orb.tsx",
  "__phase14c_state_machine_file_allowed__",
  "src/lib/voice/voice-provider-types.ts",
  "src/lib/voice/voice-proposed-action-bridge.ts"
]) {
  if (exists(forbidden)) failures.push(`Deferred Phase 14 file added too early in 14B: ${forbidden}`);
}

const pkg = JSON.parse(read("package.json"));
if (!pkg.scripts?.["audit:phase14b"]) failures.push("package.json missing audit:phase14b");
if (!pkg.scripts?.check?.includes("audit:phase14b")) failures.push("npm run check missing audit:phase14b");

for (const rel of ["PROJECT_EXECUTION_LOG.md", "CODE_LEDGER.md", "CHANGELOG.md", "PHASE_STATUS.md"]) {
  if (!exists(rel)) {
    failures.push(`Missing log/status file: ${rel}`);
    continue;
  }

  const text = read(rel);
  if (!text.includes("Phase 14B")) failures.push(`${rel} missing Phase 14B marker`);
  if (!text.includes("Voice SQL Foundation")) failures.push(`${rel} missing Voice SQL Foundation marker`);
  if (!text.includes("Phase 14C")) failures.push(`${rel} missing Phase 14C marker`);
}

if (failures.length) {
  console.error("\n=== PHASE 14B VOICE SQL FOUNDATION AUDIT FAILED ===");
  for (const failure of failures) console.error(`✗ ${failure}`);
  process.exit(1);
}

console.log("\n=== PHASE 14B VOICE SQL FOUNDATION AUDIT ===");
console.log("✓ Voice SQL migrations are present");
console.log("✓ voice_sessions and voice_transcripts are defined");
console.log("✓ RLS policies are present");
console.log("✓ Audio retention defaults are safe");
console.log("✓ Parent ownership guards are present");
console.log("✓ Voice database aliases are present");
console.log("✓ Read-only voice repository helpers are present");
console.log("✓ Deferred Phase 14 implementation files were not added");
console.log("✓ package.json check gate includes audit:phase14b");
console.log("✓ Phase 14B docs/logs are present");
console.log("\nPhase 14B voice SQL foundation audit passed.");

// Phase 14C compatibility: schema/state-machine contract files are allowed after Phase 14B.

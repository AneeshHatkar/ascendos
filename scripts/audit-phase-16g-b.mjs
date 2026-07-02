import { existsSync, readFileSync } from "node:fs";

const requiredFiles = [
  "src/lib/current-info-capture/current-info-extraction-candidate.ts",
  "src/lib/current-info-capture/index.ts",
  "docs/contracts/PHASE_16G_B_CURRENT_INFO_EXTRACTION_CANDIDATE_CONTRACT.md",
  "docs/phase-reports/PHASE_16G_B_CURRENT_INFO_EXTRACTION_CANDIDATE_REPORT.md",
  "docs/qa/PHASE_16G_B_CURRENT_INFO_EXTRACTION_CANDIDATE_SMOKE_CHECKLIST.md",
  "scripts/audit-phase-16g-b.mjs",
  "package.json",
];

const markers = {
  "src/lib/current-info-capture/current-info-extraction-candidate.ts": [
    "CURRENT_INFO_EXTRACTION_CANDIDATE_STATUSES",
    "CurrentInfoExtractionCandidateStatus",
    "CURRENT_INFO_EXTRACTION_CONFIDENCE_STATUSES",
    "CurrentInfoExtractionCandidateInput",
    "CurrentInfoExtractionCandidateOutput",
    "createCurrentInfoExtractionCandidate",
    "rejectCurrentInfoExtractionCandidateForReview",
    "is_candidate_only: true",
    "is_persisted: false",
    "requires_user_review: true",
    "can_autosave: false",
    "can_persist_sources: false",
    "can_auto_memory_convert: false",
    "can_execute_action: false",
    "PHASE_16G_B_CURRENT_INFO_EXTRACTION_CANDIDATE_BOUNDARY",
  ],
  "src/lib/current-info-capture/index.ts": [
    'export * from "./current-info-extraction-candidate";',
  ],
  "docs/contracts/PHASE_16G_B_CURRENT_INFO_EXTRACTION_CANDIDATE_CONTRACT.md": [
    "Phase 16G-B",
    "Current-Info Extraction Candidate Contract",
    "candidate-only",
    "review-required",
    "not allowed to autosave",
    "not allowed to persist sources",
    "not allowed to become memory automatically",
    "not allowed to execute proposed actions",
    "16G — Source Capture + Extraction Candidates",
    "16I — Web Current-Info Read Repository + Dashboard Helpers",
  ],
  "docs/phase-reports/PHASE_16G_B_CURRENT_INFO_EXTRACTION_CANDIDATE_REPORT.md": [
    "Status: Complete pending verification",
    "current-info-extraction-candidate.ts",
    "no provider calls",
    "no network calls",
    "no Supabase calls",
    "no automatic memory conversion",
  ],
  "docs/qa/PHASE_16G_B_CURRENT_INFO_EXTRACTION_CANDIDATE_SMOKE_CHECKLIST.md": [
    "Extraction candidate contract exists",
    "cannot autosave",
    "cannot persist sources",
    "cannot automatically become memory",
    "cannot execute actions",
    "npm run audit:phase16g_b",
  ],
  "package.json": [
    "audit:phase16g_b",
  ],
};

const forbiddenMarkers = [
  ".insert(",
  ".update(",
  ".delete(",
  ".upsert(",
  ".from(",
  ".rpc(",
  "createSupabaseBrowserClient",
  "createSupabaseServerClient",
  "createServerClient",
  "generateText",
  "streamText",
  "openai",
  "OpenAI",
  "fetch(",
  "setInterval(",
  "setTimeout(",
  "executeApprovedAction(",
  "createProposedAction(",
  "create extension if not exists vector",
  "public.memory_embeddings",
  "embedding vector",
  " vector(",
];

function read(path) {
  return readFileSync(path, "utf8");
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

console.log("\n=== PHASE 16G-B CURRENT-INFO EXTRACTION CANDIDATE AUDIT ===");

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

for (const file of [
  "src/lib/current-info-capture/current-info-extraction-candidate.ts",
  "src/lib/current-info-capture/index.ts",
]) {
  const text = read(file);

  for (const marker of forbiddenMarkers) {
    assert(!text.includes(marker), `${file} includes forbidden marker: ${marker}`);
    console.log(`✓ ${file} avoids forbidden marker: ${marker}`);
  }
}

const packageJson = JSON.parse(read("package.json"));

assert(
  packageJson.scripts?.check?.includes("audit:phase16g_b"),
  "npm run check must include audit:phase16g_b",
);

console.log("✓ npm run check includes audit:phase16g_b");

console.log(
  "\nPhase 16G-B audit passed: extraction candidate contract is present, exported, documented, and boundary-protected.",
);

import fs from "node:fs";
import path from "node:path";

const root = process.cwd();

function read(filePath) {
  return fs.readFileSync(path.join(root, filePath), "utf8");
}

function exists(filePath) {
  return fs.existsSync(path.join(root, filePath));
}

function pass(message) {
  console.log(`✓ ${message}`);
}

function fail(message) {
  console.error(`✗ ${message}`);
  process.exitCode = 1;
}

function requireFile(filePath) {
  if (exists(filePath)) {
    pass(`Found ${filePath}`);
  } else {
    fail(`Missing ${filePath}`);
  }
}

function requireIncludes(filePath, markers) {
  const content = read(filePath);
  for (const marker of markers) {
    if (content.includes(marker)) {
      pass(`${filePath} includes ${marker}`);
    } else {
      fail(`${filePath} missing ${marker}`);
    }
  }
}

function requireExcludes(filePath, markers) {
  const content = read(filePath);
  for (const marker of markers) {
    if (content.includes(marker)) {
      fail(`${filePath} must not include forbidden marker: ${marker}`);
    } else {
      pass(`${filePath} avoids forbidden marker: ${marker}`);
    }
  }
}

console.log("\n=== PHASE 15D MEMORY CANDIDATE ENGINE AUDIT ===");

const requiredFiles = [
  "src/lib/carnos-continuity/memory-candidate-engine.ts",
  "src/lib/carnos-continuity/index.ts",
  "docs/contracts/PHASE_15D_MEMORY_CANDIDATE_ENGINE.md",
  "docs/phase-reports/PHASE_15D_MEMORY_CANDIDATE_ENGINE_REPORT.md",
  "docs/qa/PHASE_15D_MEMORY_CANDIDATE_ENGINE_SMOKE_CHECKLIST.md",
  "scripts/audit-phase-15d.mjs",
  "package.json",
  "PROJECT_EXECUTION_LOG.md",
  "CODE_LEDGER.md",
  "CHANGELOG.md",
  "PHASE_STATUS.md",
];

for (const file of requiredFiles) {
  requireFile(file);
}

requireIncludes("src/lib/carnos-continuity/memory-candidate-engine.ts", [
  "Phase 15D",
  "MemoryCandidateEngineInput",
  "MemoryDoNotRememberRulePreview",
  "ExistingMemoryPreview",
  "MemoryCandidateEngineResult",
  "MemoryDuplicateHint",
  "MemoryConflictHint",
  "MemoryCandidateBlockedReason",
  "deriveMemoryTypeFromText",
  "deriveDomainScopeFromInput",
  "deriveSensitivityFromText",
  "deriveCandidateTitle",
  "buildMemoryProvenance",
  "buildMemoryReviewMetadata",
  "detectCandidateBlockedReasons",
  "detectDuplicateHints",
  "detectConflictHints",
  "createMemoryCandidatePreview",
  "private_mode",
  "do_not_remember_rule",
  "empty_content",
  "blocked_by_private_mode",
  "blocked_by_do_not_remember",
  "voice_transcript_draft",
  "manual_remember",
  "manual_do_not_remember",
  "source_of_truth",
  "PHASE_15D_MEMORY_CANDIDATE_ENGINE_BOUNDARY",
  "candidate preview only",
  "no approval",
  "no persistence",
  "no retrieval",
  "no embeddings",
  "no provider calls",
  "no automatic transcript-to-memory",
  "no hidden Carnos prompt injection",
]);

requireIncludes("src/lib/carnos-continuity/index.ts", [
  'export * from "./memory-candidate-engine";',
]);

const forbiddenImplementationMarkers = [
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
  "create extension if not exists vector",
  "public.memory_embeddings",
  "embedding vector",
  " vector(",
  "approved_memory",
  "memory_items_insert",
];

requireExcludes(
  "src/lib/carnos-continuity/memory-candidate-engine.ts",
  forbiddenImplementationMarkers,
);

const forbiddenPaths = [
  "src/app/memory",
  "src/app/rag",
  "src/app/vector-search",
  "src/lib/rag",
  "src/lib/vector",
  "src/components/memory",
  "src/components/rag",
];

for (const forbiddenPath of forbiddenPaths) {
  if (exists(forbiddenPath)) {
    fail(`Forbidden Phase 15D path exists: ${forbiddenPath}`);
  } else {
    pass(`Forbidden Phase 15D path absent: ${forbiddenPath}`);
  }
}

const migrationFiles = fs
  .readdirSync(path.join(root, "supabase/migrations"))
  .filter((file) => file.includes("phase15"))
  .sort();

const allowedPhase15Migrations = [
  "0024_phase15_memory_sql_foundation.sql",
  "0025_phase15_memory_parent_ownership_guards.sql",
];

const unexpectedMigrations = migrationFiles.filter(
  (file) => !allowedPhase15Migrations.includes(file),
);

if (unexpectedMigrations.length > 0) {
  fail(`Unexpected Phase 15D migration file(s): ${unexpectedMigrations.join(", ")}`);
} else {
  pass("No new Phase 15D SQL migration added");
}

requireIncludes("docs/contracts/PHASE_15D_MEMORY_CANDIDATE_ENGINE.md", [
  "Phase 15D",
  "Memory Candidate Engine",
  "reviewable memory candidate previews",
  "does not approve, save, retrieve, embed, inject, or execute memory",
  "normalize raw memory text",
  "classify memory type",
  "classify domain scope",
  "classify sensitivity",
  "build provenance",
  "detect private mode blocking",
  "detect do-not-remember rule blocking",
  "detect lightweight duplicate hints",
  "detect lightweight conflict hints",
  "Phase 15E — Memory Inbox UI",
]);

requireIncludes("docs/phase-reports/PHASE_15D_MEMORY_CANDIDATE_ENGINE_REPORT.md", [
  "Phase 15D",
  "Status: Complete.",
  "candidate preview engine",
  "private mode blocking",
  "do-not-remember rule blocking",
  "duplicate hints",
  "conflict hints",
  "preview-only",
  "Phase 15E — Memory Inbox UI",
]);

requireIncludes("docs/qa/PHASE_15D_MEMORY_CANDIDATE_ENGINE_SMOKE_CHECKLIST.md", [
  "Candidate engine file exists",
  "Engine creates candidate previews only",
  "Engine can classify memory type",
  "Engine can classify domain scope",
  "Engine can classify sensitivity",
  "Engine can build provenance",
  "Engine can block private-mode candidates",
  "Engine can block do-not-remember candidates",
  "Engine can detect duplicate hints",
  "Engine can detect conflict hints",
  "Engine does not approve memory",
  "Engine does not persist memory",
  "Engine does not retrieve memory",
  "Engine does not embed memory",
  "Engine does not call OpenAI/providers",
  "Engine does not call Supabase",
  "Engine does not create a standalone `/memory` route",
]);

const packageJson = JSON.parse(read("package.json"));
if (packageJson.scripts?.["audit:phase15d"] === "node scripts/audit-phase-15d.mjs") {
  pass("package.json includes audit:phase15d");
} else {
  fail("package.json missing audit:phase15d");
}

if (packageJson.scripts?.check?.includes("audit:phase15d")) {
  pass("npm run check includes audit:phase15d");
} else {
  fail("npm run check missing audit:phase15d");
}

for (const logFile of [
  "PROJECT_EXECUTION_LOG.md",
  "CODE_LEDGER.md",
  "CHANGELOG.md",
  "PHASE_STATUS.md",
]) {
  requireIncludes(logFile, ["Phase 15D", "Memory Candidate Engine"]);
}

requireIncludes("PHASE_STATUS.md", ["Phase 15E"]);

if (process.exitCode) {
  console.error("\nPhase 15D memory candidate engine audit failed.");
  process.exit(process.exitCode);
}

console.log("\nPhase 15D Memory Candidate Engine audit passed.");

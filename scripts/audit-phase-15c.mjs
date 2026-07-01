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

console.log("\n=== PHASE 15C MEMORY TYPES / SCHEMAS / CONFLICT RULES AUDIT ===");

const requiredFiles = [
  "src/lib/carnos-continuity/memory-enums.ts",
  "src/lib/carnos-continuity/memory-contracts.ts",
  "src/lib/carnos-continuity/memory-validators.ts",
  "src/lib/carnos-continuity/memory-conflict-rules.ts",
  "src/lib/carnos-continuity/index.ts",
  "docs/contracts/PHASE_15C_MEMORY_TYPES_SCHEMAS_CONFLICT_RULES.md",
  "docs/phase-reports/PHASE_15C_MEMORY_TYPES_SCHEMAS_CONFLICT_RULES_REPORT.md",
  "docs/qa/PHASE_15C_MEMORY_TYPES_SCHEMAS_CONFLICT_RULES_SMOKE_CHECKLIST.md",
  "scripts/audit-phase-15c.mjs",
  "package.json",
  "PROJECT_EXECUTION_LOG.md",
  "CODE_LEDGER.md",
  "CHANGELOG.md",
  "PHASE_STATUS.md",
];

for (const file of requiredFiles) {
  requireFile(file);
}

const enumMarkers = [
  "Phase 15C",
  "MEMORY_TYPES",
  "MEMORY_STATUSES",
  "MEMORY_SENSITIVITY_LEVELS",
  "MEMORY_SOURCE_TYPES",
  "MEMORY_DOMAIN_SCOPES",
  "MEMORY_AUDIT_EVENT_TYPES",
  "MEMORY_CONFLICT_SEVERITIES",
  "MEMORY_STALENESS_STATES",
  "MEMORY_USAGE_VISIBILITY_LEVELS",
  "preference",
  "goal",
  "project_fact",
  "project_decision",
  "routine",
  "system_state",
  "carnos_entity_state",
  "source_of_truth_note",
  "conversation_continuity",
  "user_profile_fact",
  "sensitive_note",
  "knowledge_item",
  "voice_transcript_candidate",
  "research_note",
  "career_context",
  "health_context",
  "grimoire_context",
  "privacy_rule",
  "do_not_remember_rule",
  "candidate",
  "pending_review",
  "approved",
  "edited",
  "rejected",
  "archived",
  "forgotten",
  "stale",
  "needs_review",
  "blocked_by_private_mode",
  "blocked_by_do_not_remember",
  "low",
  "medium",
  "high",
  "restricted",
];

requireIncludes("src/lib/carnos-continuity/memory-enums.ts", enumMarkers);

requireIncludes("src/lib/carnos-continuity/memory-contracts.ts", [
  "MemoryCandidateContract",
  "ApprovedMemoryContract",
  "DoNotRememberRuleContract",
  "CarnosEntityStateContract",
  "ProjectMemoryStateContract",
  "SystemStateMemoryContract",
  "KnowledgeVaultItemContract",
  "CurrentContextPackContract",
  "MemoryAuditEventContract",
  "MemoryProvenance",
  "MemoryReviewMetadata",
  "carnos_name",
  "app_name",
  "forbidden_behaviors",
  "source_of_truth_policy",
  "is_personal_memory: false",
  "embedded: false",
]);

requireIncludes("src/lib/carnos-continuity/memory-validators.ts", [
  "validateMemoryCandidateContract",
  "validateMemoryReviewMetadata",
  "assertNoSilentApproval",
  "private_mode_blocked",
  "do_not_remember_blocked",
  "confidence must be between 0 and 1",
  "priority must be between 0 and 100",
]);

requireIncludes("src/lib/carnos-continuity/memory-conflict-rules.ts", [
  "compareMemoryAuthority",
  "getSourceAuthorityRank",
  "isRetrievableMemoryStatus",
  "isBlockedMemoryStatus",
  "isSensitiveMemoryType",
  "getMemorySensitivityRule",
  "getStalenessRule",
  "PHASE_15C_CONFLICT_RULE_SUMMARY",
  "Higher source-of-truth beats lower source when conflicts exist.",
  "Forgotten, rejected, archived, private-mode-blocked, and do-not-remember-blocked memories are never retrievable.",
  "Knowledge vault records are not personal memory unless explicitly converted through review.",
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
];

for (const file of [
  "src/lib/carnos-continuity/memory-enums.ts",
  "src/lib/carnos-continuity/memory-contracts.ts",
  "src/lib/carnos-continuity/memory-validators.ts",
  "src/lib/carnos-continuity/memory-conflict-rules.ts",
  "src/lib/carnos-continuity/index.ts",
]) {
  requireExcludes(file, forbiddenImplementationMarkers);
}

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
    fail(`Forbidden Phase 15C path exists: ${forbiddenPath}`);
  } else {
    pass(`Forbidden Phase 15C path absent: ${forbiddenPath}`);
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
  fail(`Unexpected Phase 15C migration file(s): ${unexpectedMigrations.join(", ")}`);
} else {
  pass("No new Phase 15C SQL migration added");
}

requireIncludes("docs/contracts/PHASE_15C_MEMORY_TYPES_SCHEMAS_CONFLICT_RULES.md", [
  "Phase 15C",
  "Memory types locked",
  "Memory statuses locked",
  "Sensitivity levels locked",
  "Source/provenance contract locked",
  "Carnos entity state contract locked",
  "Project/system continuity contract locked",
  "Knowledge vault separation locked",
  "Conflict rules locked",
  "No SQL migrations",
  "No `memory_embeddings`",
  "No pgvector",
  "No standalone `/memory` route",
  "Phase 15D — Memory Candidate Engine",
]);

requireIncludes("docs/phase-reports/PHASE_15C_MEMORY_TYPES_SCHEMAS_CONFLICT_RULES_REPORT.md", [
  "Phase 15C",
  "Status: Complete.",
  "Memory type enums",
  "Memory candidate contract",
  "Approved memory contract",
  "Carnos entity state contract",
  "Project memory state contract",
  "Knowledge vault item contract",
  "Conflict/authority rules",
  "Phase 15D — Memory Candidate Engine",
]);

requireIncludes("docs/qa/PHASE_15C_MEMORY_TYPES_SCHEMAS_CONFLICT_RULES_SMOKE_CHECKLIST.md", [
  "Memory enums exist",
  "Memory contracts exist",
  "Memory validators exist",
  "Memory conflict rules exist",
  "Carnos entity state contract exists",
  "Project memory state contract exists",
  "System state memory contract exists",
  "Knowledge vault item contract exists",
  "No SQL migration added in Phase 15C",
  "No `memory_embeddings` table added",
  "No pgvector added",
  "No standalone `/memory` route added",
  "npm run audit:phase15c",
]);

const packageJson = JSON.parse(read("package.json"));
if (packageJson.scripts?.["audit:phase15c"] === "node scripts/audit-phase-15c.mjs") {
  pass("package.json includes audit:phase15c");
} else {
  fail("package.json missing audit:phase15c");
}

if (packageJson.scripts?.check?.includes("audit:phase15c")) {
  pass("npm run check includes audit:phase15c");
} else {
  fail("npm run check missing audit:phase15c");
}

for (const logFile of [
  "PROJECT_EXECUTION_LOG.md",
  "CODE_LEDGER.md",
  "CHANGELOG.md",
  "PHASE_STATUS.md",
]) {
  requireIncludes(logFile, ["Phase 15C", "Memory Types, Schemas, Statuses, Sensitivity, Conflict Rules"]);
}

requireIncludes("PHASE_STATUS.md", ["Phase 15D"]);

if (process.exitCode) {
  console.error("\nPhase 15C memory contract audit failed.");
  process.exit(process.exitCode);
}

console.log("\nPhase 15C memory types, schemas, sensitivity, and conflict rules audit passed.");

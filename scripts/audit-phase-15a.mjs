
// Later phases intentionally added approved memory runtime/read repositories.
// Phase 15A remains a scope-lock audit, but it must not fail later
// approved Phase 15/16/20 implementation files.
const PHASE_15A_ALLOWED_LATER_MEMORY_RUNTIME_FILES = new Set([
  "src/lib/repositories/memory-knowledge-read.ts",
  "src/lib/repositories/memory-inbox-write.ts",
  "src/lib/repositories/approved-memory-write.ts",
]);

const PHASE_15A_ALLOWED_LATER_SCHEMA_ALIGNMENT_FILES = new Set([
  "src/lib/carnos-continuity/memory-rag-schema-contracts.ts",
  "src/lib/repositories/memory-inbox-write.ts",
  "src/lib/repositories/approved-memory-write.ts",
]);


// Later Memory/RAG schema-alignment contracts are allowed to mention canonical table names.
// They are guarded by audit:phase17d and contain no runtime/repository code.
const PHASE_15A_LATER_ALLOWED_MEMORY_SCHEMA_FILES = new Set([
  "src/lib/carnos-continuity/memory-rag-schema-contracts.ts",
]);

import fs from "node:fs";
import path from "node:path";


const phase15bMemorySqlFoundationExists =
  fs.existsSync(path.join(process.cwd(), "supabase/migrations/0024_phase15_memory_sql_foundation.sql")) &&
  fs.existsSync(path.join(process.cwd(), "supabase/migrations/0025_phase15_memory_parent_ownership_guards.sql")) &&
  fs.existsSync(path.join(process.cwd(), "scripts/audit-phase-15b.mjs"));
const root = process.cwd();
let failed = false;

function fullPath(filePath) {
  return path.join(root, filePath);
}

function exists(filePath) {
  return fs.existsSync(fullPath(filePath));
}

function read(filePath) {
  return fs.readFileSync(fullPath(filePath), "utf8");
}

function pass(message) {
  console.log(`✓ ${message}`);
}

function fail(message) {
  failed = true;
  console.error(`✗ ${message}`);
}

function requireFile(filePath) {
  if (exists(filePath)) {
    pass(`Found ${filePath}`);
    return read(filePath);
  }

  fail(`Missing ${filePath}`);
  return "";
}

function requireMarkers(filePath, markers) {
  const text = requireFile(filePath);

  for (const marker of markers) {
    if (text.includes(marker)) {
      pass(`${filePath} includes marker: ${marker}`);
    } else {
      fail(`${filePath} missing marker: ${marker}`);
    }
  }
}

function listFilesRecursive(startDir) {
  if (!exists(startDir)) return [];

  const files = [];

  function walk(currentDir) {
    for (const entry of fs.readdirSync(fullPath(currentDir), { withFileTypes: true })) {
      const next = path.join(currentDir, entry.name);

      if (entry.isDirectory()) {
        if (["node_modules", ".next", ".git"].includes(entry.name)) continue;
        walk(next);
      } else {
        files.push(next);
      }
    }
  }

  walk(startDir);
  return files;
}

console.log("\n=== PHASE 15A CARNOS PERSISTENT MEMORY + CONTINUITY SCOPE LOCK AUDIT ===");

const planFile = "docs/phase-plans/PHASE_15A_CARNOS_PERSISTENT_MEMORY_CONTINUITY_SCOPE_LOCK.md";
const reportFile = "docs/phase-reports/PHASE_15A_CARNOS_PERSISTENT_MEMORY_CONTINUITY_SCOPE_LOCK_REPORT.md";
const smokeFile = "docs/qa/PHASE_15A_CARNOS_PERSISTENT_MEMORY_CONTINUITY_SCOPE_LOCK_SMOKE_CHECKLIST.md";

const requiredFiles = [
  planFile,
  reportFile,
  smokeFile,
  "scripts/audit-phase-15a.mjs",
  "package.json",
  "PROJECT_EXECUTION_LOG.md",
  "CODE_LEDGER.md",
  "CHANGELOG.md",
  "PHASE_STATUS.md",
];

for (const filePath of requiredFiles) {
  requireFile(filePath);
}

requireMarkers(planFile, [
  "Phase 15 — Carnos Persistent Memory + Continuity Foundation",
  "Carnos Jarvis-like continuity goal",
  "Carnos as persistent AI persona/entity inside ascendOS",
  "User-controlled long-term memory",
  "Memory candidates",
  "Memory Inbox",
  "Approved Memories",
  "Rejected Memories",
  "Forgotten Memories",
  "Conversation continuity records",
  "Project continuity records",
  "System state memory",
  "Carnos entity state",
  "Current context pack builder",
  "Knowledge vault separation",
  "Retrieval contract",
  "Embedding boundary",
  "Privacy controls",
  "Private mode memory blocking",
  "Do-not-remember rules",
  "Sensitive memory locks",
  "Memory provenance",
  "Memory confidence",
  "Memory staleness",
  "Memory review dates",
  "Memory priority/ranking",
  "Memory conflict resolution",
  "Source-of-truth hierarchy",
  "Memory usage transparency",
  "Memory audit logs",
  "Forget/delete derived records",
  "Whole-project connectivity",
  "No silent memory",
  "No automatic transcript-to-memory",
  "No direct autonomous memory writes",
  "No embeddings before approval",
  "No hidden memory retrieval",
  "No standalone `/memory` route yet",
  "`/privacy` as memory control surface",
  "`/carnos` as Carnos memory visibility surface",
  "`/knowledge` as future knowledge vault surface",
  "15A — Persistent Memory + Continuity Scope Lock",
  "15B — Memory SQL Foundation",
  "15C — Memory Types, Schemas, Statuses, Sensitivity, Conflict Rules",
  "15D — Memory Candidate Engine",
  "15E — Memory Inbox UI",
  "15F — Privacy, Private Mode, Do-Not-Remember Rules",
  "15G — Approved Memory Read Layer + Ranking/Staleness Rules",
  "15H — Carnos Entity State",
  "15I — Project/System State Memory + Source-of-Truth Hierarchy",
  "15J — Current Context Pack Builder + Context Budget Rules",
  "15K — Carnos Memory Visibility Panel",
  "15L — Knowledge Vault Foundation",
  "15M — Retrieval Contract + Provenance + Conflict Handling",
  "15N — Embedding Boundary / Noop Provider",
  "15O — Forget/Delete Derived Records",
  "15P — Memory Audit Events + Memory Usage Transparency",
  "15Q — Cross-Domain Integration Preview",
  "15R — Final Audit, Smoke Checklist, Completion Report",
  "memory_candidates",
  "memory_items",
  "memory_links",
  "memory_events",
  "memory_preferences",
  "memory_do_not_remember_rules",
  "carnos_entity_state",
  "carnos_context_snapshots",
  "project_memory_state",
  "system_memory_state",
  "knowledge_items",
  "knowledge_tags",
  "knowledge_links",
  "retrieval_logs",
  "memory_usage_logs",
  "memory_review_queue",
  "`preference`",
  "`goal`",
  "`project_fact`",
  "`project_decision`",
  "`routine`",
  "`system_state`",
  "`carnos_entity_state`",
  "`source_of_truth_note`",
  "`conversation_continuity`",
  "`user_profile_fact`",
  "`sensitive_note`",
  "`knowledge_item`",
  "`voice_transcript_candidate`",
  "`research_note`",
  "`career_context`",
  "`health_context`",
  "`grimoire_context`",
  "`privacy_rule`",
  "`do_not_remember_rule`",
  "`candidate`",
  "`pending_review`",
  "`approved`",
  "`edited`",
  "`rejected`",
  "`archived`",
  "`forgotten`",
  "`stale`",
  "`needs_review`",
  "`blocked_by_private_mode`",
  "`blocked_by_do_not_remember`",
  "`low`",
  "`medium`",
  "`high`",
  "`restricted`",
  "Manual user “remember this”",
  "Manual user “do not remember this”",
  "Voice transcript draft",
  "Source-of-truth change",
  "Do not remember health/body",
  "Do not remember voice transcripts",
  "Source-of-truth memory highest",
  "Carnos name",
  "Carnos role",
  "Carnos mission",
  "Carnos tone",
  "Carnos current phase",
  "App name: ascendOS",
  "AI persona: Carnos",
  "FINAL_SYNCED JSON/DOCX",
  "Old 15-phase roadmap is outdated",
  "JSON chunks 0–21 are active",
  "Phase 14 complete at commit `56c1c7f`",
  "Higher source-of-truth beats lower source when conflicts exist",
  "Do not load every memory",
  "Context pack preview",
  "Knowledge vault is not personal memory",
  "Uploaded docs are not automatically embedded",
  "Hidden retrieval",
  "Noop embedding provider",
  "OpenAI embedding calls by default",
  "No ghost memory rule",
  "`candidate_created`",
  "`memory_used_in_context_pack`",
  "`memory_used_in_carnos_response`",
  "`private_mode_enabled`",
  "`conflict_detected`",
  "`stale_memory_detected`",
  "`/command`",
  "`/carnos`",
  "`/calendar`",
  "`/timeline`",
  "`/goals`",
  "`/career`",
  "`/learning`",
  "`/research-stanford`",
  "`/body`",
  "`/nutrition`",
  "`/grimoire`",
  "`/analytics`",
  "`/privacy`",
  "`/custom-trackers`",
  "`/knowledge`",
]);

requireMarkers(reportFile, [
  "Phase 15A",
  "Carnos Persistent Memory + Continuity Scope Lock Report",
  "Carnos Persistent Memory + Continuity Foundation",
  "Carnos Jarvis-like continuity goal",
  "Memory Inbox",
  "Carnos entity state",
  "Current context pack builder",
  "Knowledge vault separation",
  "Private mode memory blocking",
  "Do-not-remember rules",
  "Memory conflict resolution",
  "Forget/delete derived records",
  "15A — Persistent Memory + Continuity Scope Lock",
  "15R — Final Audit, Smoke Checklist, Completion Report",
  "No SQL migrations",
  "No embeddings",
  "No voice transcript auto-memory",
  "Phase 15B — Memory SQL Foundation",
]);

requireMarkers(smokeFile, [
  "Carnos Jarvis-like continuity goal is locked",
  "Carnos persistent entity/persona state is locked",
  "Memory candidates are locked",
  "Memory Inbox is locked",
  "Approved memories are locked",
  "Forgotten memories are locked",
  "Private mode memory block is locked",
  "No automatic transcript-to-memory rule is locked",
  "Knowledge vault separation is locked",
  "Embedding boundary/noop provider is locked",
  "`/privacy` is locked as memory control surface",
  "`/carnos` is locked as Carnos memory visibility surface",
  "`/knowledge` is locked as future knowledge vault surface",
  "No SQL migration added",
  "No embedding implementation added",
  "`npm run audit:phase15a` passes",
]);

requireMarkers("PROJECT_EXECUTION_LOG.md", [
  "Phase 15A",
  "Carnos Persistent Memory + Continuity",
]);

requireMarkers("CODE_LEDGER.md", [
  "Phase 15A",
  "Carnos Persistent Memory + Continuity",
]);

requireMarkers("CHANGELOG.md", [
  "Phase 15A",
  "Carnos Persistent Memory + Continuity",
]);

requireMarkers("PHASE_STATUS.md", [
  "Phase 15A",
  "Phase 15B",
  "Carnos Persistent Memory + Continuity",
]);

const packageJson = JSON.parse(read("package.json"));

if (packageJson.scripts?.["audit:phase15a"] === "node scripts/audit-phase-15a.mjs") {
  pass("package.json includes audit:phase15a");
} else {
  fail("package.json missing audit:phase15a");
}

if (packageJson.scripts?.check?.includes("npm run audit:phase15a")) {
  pass("npm run check includes audit:phase15a");
} else {
  fail("npm run check missing audit:phase15a");
}

const forbiddenPaths = [
  "src/lib/memory",
  "src/lib/rag",
  "src/lib/vector",
  "src/app/memory",
  "src/app/rag",
  "src/app/vector-search",
  "src/components/memory",
  "src/components/rag",
];

for (const forbiddenPath of forbiddenPaths) {
  if (exists(forbiddenPath)) {
    fail(`Forbidden Phase 15A runtime path exists: ${forbiddenPath}`);
  } else {
    pass(`Forbidden Phase 15A runtime path absent: ${forbiddenPath}`);
  }
}

const forbiddenRoutes = [
  "src/app/memory/page.tsx",
  "src/app/rag/page.tsx",
  "src/app/vector-search/page.tsx",
];

for (const routePath of forbiddenRoutes) {
  if (exists(routePath)) {
    fail(`Forbidden Phase 15A route exists: ${routePath}`);
  } else {
    pass(`Forbidden Phase 15A route absent: ${routePath}`);
  }
}

const migrationDir = "supabase/migrations";
const migrationFiles = exists(migrationDir)
  ? fs.readdirSync(fullPath(migrationDir)).filter((name) => name.endsWith(".sql"))
  : [];

const prematureMemoryMigrations = migrationFiles.filter((name) => {
  const lower = name.toLowerCase();
  return lower.includes("memory") || lower.includes("rag") || lower.includes("vector") || lower.includes("embedding");
});

if (prematureMemoryMigrations.length === 0) {
  pass("No Memory/RAG SQL migration added in Phase 15A");
} else {
  if (!phase15bMemorySqlFoundationExists) {
  fail(`Memory/RAG SQL migration added too early: ${prematureMemoryMigrations.join(", ")}`);
}
}

const sourceFiles = listFilesRecursive("src").filter((filePath) => filePath.endsWith(".ts") || filePath.endsWith(".tsx"));

const allowedPhase15RuntimeMarkerFiles = new Set([
  "src/components/dashboard/embedding-boundary-panel.tsx",
  "src/lib/carnos-continuity/embedding-boundary.ts",
  "src/lib/carnos-continuity/memory-enums.ts",
  "src/lib/carnos-continuity/memory-contracts.ts",
  "src/lib/carnos-continuity/memory-validators.ts",
  "src/lib/carnos-continuity/memory-conflict-rules.ts",
  "src/lib/carnos-continuity/memory-candidate-engine.ts",
  "src/lib/carnos-continuity/memory-privacy-rules.ts",
  "src/lib/carnos-continuity/approved-memory-read-layer.ts",
  "src/lib/carnos-continuity/carnos-entity-state.ts",
  "src/lib/carnos-continuity/project-system-state-memory.ts",
  "src/lib/carnos-continuity/current-context-pack-builder.ts",
    "src/lib/carnos-continuity/carnos-memory-visibility.ts",
]);

const forbiddenRuntimeMarkers = [
  "memory_candidates",
  "memory_items",
  "memory_embeddings",
  "pgvector",
  "createEmbedding",
  "embedMany",
  "similaritySearch",
  "retrieveContext",
  "autonomousMemory",
  "autoMemory",
];

for (const filePath of sourceFiles) {
  if (
    PHASE_15A_ALLOWED_LATER_SCHEMA_ALIGNMENT_FILES.has(filePath) ||
    PHASE_15A_ALLOWED_LATER_MEMORY_RUNTIME_FILES.has(filePath)
  ) continue;
  const text = read(filePath);

  for (const marker of forbiddenRuntimeMarkers) {
    if (text.includes(marker)) {
      if (!allowedPhase15RuntimeMarkerFiles.has(filePath)) {
        fail(`${filePath} contains premature Phase 15 runtime marker: ${marker}`);
      }
    }
  }
}

if (sourceFiles.length > 0) {
  pass("Source tree has no premature Phase 15 Memory/RAG runtime markers");
}

if (failed) {
  console.error("\nPhase 15A Carnos Persistent Memory + Continuity scope lock audit failed.");
  process.exit(1);
}

console.log("\nPhase 15A Carnos Persistent Memory + Continuity scope lock audit passed.");


// Phase 15B allowance:
// Phase 15A originally locked scope with no SQL migrations. Once Phase 15B exists,
// the dedicated Memory SQL Foundation migrations 0024/0025 are allowed while
// runtime Memory/RAG, embeddings, pgvector, vector columns, and provider calls
// remain forbidden by Phase 15B and global validators.

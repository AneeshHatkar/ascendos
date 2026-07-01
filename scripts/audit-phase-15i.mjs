import { existsSync, readdirSync, readFileSync } from "node:fs";
import { dirname } from "node:path";

const requiredFiles = [
  "src/lib/carnos-continuity/project-system-state-memory.ts",
  "src/lib/carnos-continuity/index.ts",
  "src/components/dashboard/project-system-state-memory-panel.tsx",
  "src/components/dashboard/index.ts",
  "docs/contracts/PHASE_15I_PROJECT_SYSTEM_STATE_MEMORY_SOURCE_OF_TRUTH_HIERARCHY.md",
  "docs/phase-reports/PHASE_15I_PROJECT_SYSTEM_STATE_MEMORY_SOURCE_OF_TRUTH_HIERARCHY_REPORT.md",
  "docs/qa/PHASE_15I_PROJECT_SYSTEM_STATE_MEMORY_SOURCE_OF_TRUTH_HIERARCHY_SMOKE_CHECKLIST.md",
  "scripts/audit-phase-15i.mjs",
  "package.json",
  "PROJECT_EXECUTION_LOG.md",
  "CODE_LEDGER.md",
  "CHANGELOG.md",
  "PHASE_STATUS.md",
];

const helperMarkers = [
  "Phase 15I",
  "Project/System State Memory + Source-of-Truth Hierarchy",
  "ProjectStateMemoryPreview",
  "SystemStateMemoryPreview",
  "ProjectSystemStateMemoryInput",
  "ProjectSystemStateMemorySummary",
  "SourceOfTruthHierarchyEntry",
  "DEFAULT_SOURCE_OF_TRUTH_HIERARCHY",
  "DEFAULT_PROJECT_STATE_MEMORY_PREVIEW",
  "DEFAULT_SYSTEM_STATE_MEMORY_PREVIEW",
  "PHASE_15I_PROJECT_SYSTEM_STATE_MEMORY_BOUNDARY",
  "createProjectStateMemoryPreview",
  "createSystemStateMemoryPreview",
  "evaluateSourceOfTruthHierarchy",
  "createProjectSystemStateMemoryPreview",
  "summarizeProjectSystemStateMemory",
  "createDefaultProjectSystemStateMemorySummary",
  "Project memory state",
  "System state memory",
  "Source-of-truth hierarchy",
  "FINAL_SYNCED DOCX",
  "FINAL_SYNCED JSON",
  "JSON chunks 0-21",
  "Old 15-phase roadmap is outdated",
  "active boundaries",
  "deferred scope",
  "known errors",
  "verification gates",
  "latest commit",
  "next phase",
  "preview only",
  "no approval",
  "no persistence",
  "no Supabase calls",
  "no SQL reads or writes",
  "no retrieval",
  "no embeddings",
  "no provider calls",
  "no hidden Carnos prompt injection",
  "no context pack builder",
  "no standalone /memory route",
  "Phase 15J — Current Context Pack Builder + Context Budget Rules",
];

const panelMarkers = [
  "ProjectSystemStateMemoryPanel",
  "Phase 15I Project/System State Memory",
  "Project/System State Memory + Source-of-Truth Hierarchy",
  "Project continuity",
  "System continuity",
  "Source-of-truth hierarchy",
  "FINAL_SYNCED",
  "Old 15-phase roadmap",
  "active boundaries",
  "deferred scope",
  "verification gates",
  "known errors",
  "no hidden Carnos prompt injection",
  "no context pack builder",
  "standalone /memory route",
];

const docMarkers = [
  "Phase 15I",
  "Project/System State Memory + Source-of-Truth Hierarchy",
  "Project memory state",
  "System state memory",
  "Source-of-truth hierarchy",
  "FINAL_SYNCED DOCX",
  "FINAL_SYNCED JSON",
  "JSON chunks 0-21",
  "Old 15-phase roadmap is outdated",
  "active boundaries",
  "deferred scope",
  "known errors",
  "verification gates",
  "latest commit",
  "next phase",
  "no approval",
  "no persistence",
  "no Supabase",
  "no SQL reads or writes",
  "no retrieval",
  "no embeddings",
  "no provider calls",
  "no hidden Carnos prompt injection",
  "no context pack builder",
  "standalone `/memory` route",
  "Phase 15J",
];

const forbiddenRuntimeMarkers = [
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
  "memory_items_insert",
  "executeApprovedAction(",
  "createProposedAction(",
];

const forbiddenPaths = [
  "src/app/memory",
  "src/app/rag",
  "src/app/vector-search",
  "src/lib/rag",
  "src/lib/vector",
  "src/components/memory",
  "src/components/rag",
];

const allowedPhase15Migrations = new Set([
  "0024_phase15_memory_sql_foundation.sql",
  "0025_phase15_memory_parent_ownership_guards.sql",
]);

let failed = false;

function read(path) {
  return readFileSync(path, "utf8");
}

function pass(message) {
  console.log(`✓ ${message}`);
}

function fail(message) {
  failed = true;
  console.error(`✗ ${message}`);
}

function assertFile(path) {
  if (existsSync(path)) {
    pass(`Found ${path}`);
  } else {
    fail(`Missing ${path}`);
  }
}

function assertIncludes(path, marker) {
  const text = read(path);
  if (text.includes(marker)) {
    pass(`${path} includes ${marker}`);
  } else {
    fail(`${path} missing marker: ${marker}`);
  }
}

function assertAvoids(path, marker) {
  const text = read(path);
  if (text.includes(marker)) {
    fail(`${path} contains forbidden marker: ${marker}`);
  } else {
    pass(`${path} avoids forbidden marker: ${marker}`);
  }
}

console.log("\n=== PHASE 15I PROJECT/SYSTEM STATE MEMORY AUDIT ===");

for (const file of requiredFiles) {
  assertFile(file);
}

const helperPath = "src/lib/carnos-continuity/project-system-state-memory.ts";
const panelPath = "src/components/dashboard/project-system-state-memory-panel.tsx";

for (const marker of helperMarkers) {
  assertIncludes(helperPath, marker);
}

for (const marker of panelMarkers) {
  assertIncludes(panelPath, marker);
}

assertIncludes(
  "src/lib/carnos-continuity/index.ts",
  'export * from "./project-system-state-memory";',
);
assertIncludes(
  "src/components/dashboard/index.ts",
  'export * from "./project-system-state-memory-panel";',
);

assertIncludes("package.json", "audit:phase15i");
assertIncludes("package.json", "npm run audit:phase15i");

for (const doc of [
  "docs/contracts/PHASE_15I_PROJECT_SYSTEM_STATE_MEMORY_SOURCE_OF_TRUTH_HIERARCHY.md",
  "docs/phase-reports/PHASE_15I_PROJECT_SYSTEM_STATE_MEMORY_SOURCE_OF_TRUTH_HIERARCHY_REPORT.md",
  "docs/qa/PHASE_15I_PROJECT_SYSTEM_STATE_MEMORY_SOURCE_OF_TRUTH_HIERARCHY_SMOKE_CHECKLIST.md",
]) {
  for (const marker of docMarkers) {
    assertIncludes(doc, marker);
  }
}

for (const marker of forbiddenRuntimeMarkers) {
  assertAvoids(helperPath, marker);
  assertAvoids(panelPath, marker);
}

for (const forbiddenPath of forbiddenPaths) {
  if (existsSync(forbiddenPath)) {
    fail(`Forbidden Phase 15I path exists: ${forbiddenPath}`);
  } else {
    pass(`Forbidden Phase 15I path absent: ${forbiddenPath}`);
  }
}

const migrationsDir = "supabase/migrations";
if (existsSync(migrationsDir)) {
  for (const file of readdirSync(migrationsDir)) {
    if (file.includes("phase15") && !allowedPhase15Migrations.has(file)) {
      fail(`Unexpected Phase 15I migration found: ${file}`);
    }
  }
  for (const file of allowedPhase15Migrations) {
    pass(`Allowed existing Phase 15 migration: ${file}`);
  }
}

for (const log of [
  "PROJECT_EXECUTION_LOG.md",
  "CODE_LEDGER.md",
  "CHANGELOG.md",
  "PHASE_STATUS.md",
]) {
  assertIncludes(log, "Phase 15I");
  assertIncludes(log, "Project/System State Memory + Source-of-Truth Hierarchy");
}

assertIncludes("PHASE_STATUS.md", "Phase 15J");

if (failed) {
  console.error("\nPhase 15I audit failed.");
  process.exit(1);
}

console.log("\nPhase 15I project/system state memory + source-of-truth hierarchy audit passed.");

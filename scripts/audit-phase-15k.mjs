import { existsSync, readdirSync, readFileSync } from "node:fs";
import { basename, join } from "node:path";

const root = process.cwd();

function read(path) {
  return readFileSync(join(root, path), "utf8");
}

function assert(condition, message) {
  if (!condition) {
    console.error(`✗ ${message}`);
    process.exit(1);
  }
  console.log(`✓ ${message}`);
}

function assertFile(path) {
  assert(existsSync(join(root, path)), `Found ${path}`);
}

function assertIncludes(path, marker) {
  const text = read(path);
  assert(text.includes(marker), `${path} includes ${marker}`);
}

function assertExcludes(path, marker) {
  const text = read(path);
  assert(!text.includes(marker), `${path} avoids forbidden marker: ${marker}`);
}

console.log("\n=== PHASE 15K CARNOS MEMORY VISIBILITY PANEL AUDIT ===");

const requiredFiles = [
  "src/lib/carnos-continuity/carnos-memory-visibility.ts",
  "src/lib/carnos-continuity/index.ts",
  "src/components/dashboard/carnos-memory-visibility-panel.tsx",
  "src/components/dashboard/index.ts",
  "src/app/carnos/page.tsx",
  "docs/contracts/PHASE_15K_CARNOS_MEMORY_VISIBILITY_PANEL.md",
  "docs/phase-reports/PHASE_15K_CARNOS_MEMORY_VISIBILITY_PANEL_REPORT.md",
  "docs/qa/PHASE_15K_CARNOS_MEMORY_VISIBILITY_PANEL_SMOKE_CHECKLIST.md",
  "scripts/audit-phase-15k.mjs",
  "package.json",
  "PROJECT_EXECUTION_LOG.md",
  "CODE_LEDGER.md",
  "CHANGELOG.md",
  "PHASE_STATUS.md",
];

for (const file of requiredFiles) assertFile(file);

const helper = "src/lib/carnos-continuity/carnos-memory-visibility.ts";
const panel = "src/components/dashboard/carnos-memory-visibility-panel.tsx";
const docs = [
  "docs/contracts/PHASE_15K_CARNOS_MEMORY_VISIBILITY_PANEL.md",
  "docs/phase-reports/PHASE_15K_CARNOS_MEMORY_VISIBILITY_PANEL_REPORT.md",
  "docs/qa/PHASE_15K_CARNOS_MEMORY_VISIBILITY_PANEL_SMOKE_CHECKLIST.md",
];

const markers = [
  "Phase 15K",
  "Carnos Memory Visibility Panel",
  "Carnos memory visibility",
  "visible memory refs",
  "hidden memory blocked",
  "current context pack visibility",
  "approved-memory read layer visibility",
  "Carnos entity state visibility",
  "project/system state memory visibility",
  "source-of-truth hierarchy visibility",
  "privacy mode active",
  "do-not-remember rules active",
  "stale memory warnings",
  "conflict warnings",
  "memory_used_in_context_pack",
  "memory_used_in_carnos_response",
  "memory usage transparency",
  "preview only",
  "no approval",
  "no persistence",
  "no Supabase calls",
  "no SQL reads or writes",
  "no retrieval",
  "no embeddings",
  "no provider calls",
  "no hidden Carnos prompt injection",
  "no standalone /memory route",
  "Phase 15L — Knowledge Vault Foundation",
];

for (const marker of markers) assertIncludes(helper, marker);

const helperApiMarkers = [
  "CarnosMemoryVisibilitySignal",
  "CarnosMemoryVisibleReference",
  "CarnosMemoryVisibilityInput",
  "CarnosMemoryVisibilitySummary",
  "PHASE_15K_CARNOS_MEMORY_VISIBILITY_BOUNDARY",
  "createCarnosMemoryVisibilitySummary",
  "summarizeCarnosMemoryVisibility",
  "createDefaultCarnosMemoryVisibilitySummary",
];

for (const marker of helperApiMarkers) assertIncludes(helper, marker);

const panelMarkers = [
  "CarnosMemoryVisibilityPanel",
  "Phase 15K Carnos Memory Visibility Panel",
  "Carnos memory visibility",
  "visible memory refs",
  "hidden memory blocked",
  "current context pack visibility",
  "approved-memory read layer visibility",
  "Carnos entity state visibility",
  "project/system state memory visibility",
  "source-of-truth hierarchy visibility",
  "privacy mode active",
  "do-not-remember rules active",
  "stale memory warnings",
  "conflict warnings",
  "memory_used_in_context_pack",
  "memory_used_in_carnos_response",
  "memory usage transparency",
  "no hidden Carnos prompt injection",
  "standalone /memory route",
];

for (const marker of panelMarkers) assertIncludes(panel, marker);

assertIncludes("src/lib/carnos-continuity/index.ts", 'export * from "./carnos-memory-visibility";');
assertIncludes("src/components/dashboard/index.ts", 'export * from "./carnos-memory-visibility-panel";');
assertIncludes("src/app/carnos/page.tsx", "CarnosMemoryVisibilityPanel");
assertIncludes("src/app/carnos/page.tsx", "<CarnosMemoryVisibilityPanel />");

for (const doc of docs) {
  for (const marker of [
    "Phase 15K",
    "Carnos Memory Visibility Panel",
    "Carnos memory visibility",
    "visible memory refs",
    "hidden memory blocked",
    "current context pack visibility",
    "approved-memory read layer visibility",
    "Carnos entity state visibility",
    "project/system state memory visibility",
    "source-of-truth hierarchy visibility",
    "privacy mode active",
    "do-not-remember rules active",
    "stale memory warnings",
    "conflict warnings",
    "memory_used_in_context_pack",
    "memory_used_in_carnos_response",
    "no approval",
    "no persistence",
    "no Supabase",
    "no SQL reads or writes",
    "no retrieval",
    "no embeddings",
    "no provider calls",
    "no hidden Carnos prompt injection",
    "standalone `/memory` route",
    "Phase 15L",
  ]) {
    assertIncludes(doc, marker);
  }
}

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
  "create extension if not exists vector",
  "public.memory_embeddings",
  "embedding vector",
  " vector(",
  "memory_items_insert",
  "executeApprovedAction(",
  "createProposedAction(",
];

for (const marker of forbiddenMarkers) {
  assertExcludes(helper, marker);
  assertExcludes(panel, marker);
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

for (const path of forbiddenPaths) {
  assert(!existsSync(join(root, path)), `Forbidden Phase 15K path absent: ${path}`);
}

const migrations = readdirSync(join(root, "supabase/migrations")).filter((file) =>
  file.includes("phase15"),
);
for (const migration of migrations) {
  assert(
    [
      "0024_phase15_memory_sql_foundation.sql",
      "0025_phase15_memory_parent_ownership_guards.sql",
    ].includes(basename(migration)),
    `Allowed existing Phase 15 migration: ${migration}`,
  );
}

assertIncludes("package.json", "audit:phase15k");
assertIncludes("package.json", "npm run audit:phase15k");

for (const file of ["PROJECT_EXECUTION_LOG.md", "CODE_LEDGER.md", "CHANGELOG.md", "PHASE_STATUS.md"]) {
  assertIncludes(file, "Phase 15K");
  assertIncludes(file, "Carnos Memory Visibility Panel");
}
assertIncludes("PHASE_STATUS.md", "Phase 15L");

console.log("\nPhase 15K Carnos memory visibility panel audit passed.");

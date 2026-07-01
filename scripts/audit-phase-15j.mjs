import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const ROOT = process.cwd();

const requiredFiles = [
  "src/lib/carnos-continuity/current-context-pack-builder.ts",
  "src/lib/carnos-continuity/index.ts",
  "src/components/dashboard/current-context-pack-builder-panel.tsx",
  "src/components/dashboard/index.ts",
  "docs/contracts/PHASE_15J_CURRENT_CONTEXT_PACK_BUILDER_CONTEXT_BUDGET_RULES.md",
  "docs/phase-reports/PHASE_15J_CURRENT_CONTEXT_PACK_BUILDER_CONTEXT_BUDGET_RULES_REPORT.md",
  "docs/qa/PHASE_15J_CURRENT_CONTEXT_PACK_BUILDER_CONTEXT_BUDGET_RULES_SMOKE_CHECKLIST.md",
  "scripts/audit-phase-15j.mjs",
  "package.json",
  "PROJECT_EXECUTION_LOG.md",
  "CODE_LEDGER.md",
  "CHANGELOG.md",
  "PHASE_STATUS.md",
];

const helperMarkers = [
  "Phase 15J",
  "Current Context Pack Builder + Context Budget Rules",
  "CurrentContextPackBuilderInput",
  "CurrentContextPackPreview",
  "CurrentContextPackBuilderResult",
  "ContextPackBudgetRule",
  "ContextPackBudgetUsage",
  "ContextPackSectionKey",
  "DEFAULT_CONTEXT_PACK_BUDGET_RULES",
  "PHASE_15J_CURRENT_CONTEXT_PACK_BUILDER_BOUNDARY",
  "createContextPackBudgetRules",
  "createCurrentContextPackPreview",
  "summarizeCurrentContextPack",
  "createDefaultCurrentContextPackBuilderResult",
  "Current context pack",
  "context budget rules",
  "context budget notes",
  "token budget",
  "section budget",
  "included memory refs",
  "excluded memory refs",
  "approved-memory read layer",
  "Carnos entity state",
  "project/system state memory",
  "source-of-truth hierarchy",
  "stale memory warnings",
  "conflict warnings",
  "privacy mode active",
  "do-not-remember rules active",
  "memory_used_in_context_pack",
  "preview only",
  "no approval",
  "no persistence",
  "no Supabase calls",
  "no SQL reads or writes",
  "no embeddings",
  "no provider calls",
  "no hidden Carnos prompt injection",
  "no standalone /memory route",
  "Phase 15K — Carnos Memory Visibility Panel",
];

const panelMarkers = [
  "CurrentContextPackBuilderPanel",
  "Phase 15J Current Context Pack Builder",
  "Current Context Pack Builder + Context Budget Rules",
  "Current context pack",
  "context budget rules",
  "token budget",
  "section budget",
  "included memory refs",
  "excluded memory refs",
  "approved-memory read layer",
  "Carnos entity state",
  "project/system state memory",
  "source-of-truth hierarchy",
  "stale memory warnings",
  "conflict warnings",
  "privacy mode active",
  "do-not-remember rules active",
  "memory_used_in_context_pack",
  "no hidden Carnos prompt injection",
  "standalone /memory route",
];

const docMarkers = [
  "Phase 15J",
  "Current Context Pack Builder + Context Budget Rules",
  "Current context pack",
  "context budget rules",
  "context budget notes",
  "token budget",
  "section budget",
  "included memory refs",
  "excluded memory refs",
  "approved-memory read layer",
  "Carnos entity state",
  "project/system state memory",
  "source-of-truth hierarchy",
  "stale memory warnings",
  "conflict warnings",
  "privacy mode active",
  "do-not-remember rules active",
  "memory_used_in_context_pack",
  "no approval",
  "no persistence",
  "no Supabase",
  "no SQL reads or writes",
  "no embeddings",
  "no provider calls",
  "no hidden Carnos prompt injection",
  "standalone `/memory` route",
  "Phase 15K",
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

function rel(path) {
  return join(ROOT, path);
}

function read(path) {
  return readFileSync(rel(path), "utf8");
}

function pass(message) {
  console.log(`✓ ${message}`);
}

function fail(message) {
  failed = true;
  console.error(`✗ ${message}`);
}

function expectFile(path) {
  if (existsSync(rel(path))) pass(`Found ${path}`);
  else fail(`Missing ${path}`);
}

function expectIncludes(path, marker) {
  const content = read(path);
  if (content.includes(marker)) pass(`${path} includes ${marker}`);
  else fail(`${path} missing marker: ${marker}`);
}

function expectAvoids(path, marker) {
  const content = read(path);
  if (!content.includes(marker)) pass(`${path} avoids forbidden marker: ${marker}`);
  else fail(`${path} contains forbidden marker: ${marker}`);
}

console.log("\n=== PHASE 15J CURRENT CONTEXT PACK BUILDER AUDIT ===");

for (const file of requiredFiles) expectFile(file);

const helper = "src/lib/carnos-continuity/current-context-pack-builder.ts";
const panel = "src/components/dashboard/current-context-pack-builder-panel.tsx";

for (const marker of helperMarkers) expectIncludes(helper, marker);
for (const marker of panelMarkers) expectIncludes(panel, marker);

expectIncludes(
  "src/lib/carnos-continuity/index.ts",
  'export * from "./current-context-pack-builder";',
);
expectIncludes(
  "src/components/dashboard/index.ts",
  'export * from "./current-context-pack-builder-panel";',
);

expectIncludes("package.json", "audit:phase15j");
expectIncludes("package.json", "npm run audit:phase15j");

for (const doc of [
  "docs/contracts/PHASE_15J_CURRENT_CONTEXT_PACK_BUILDER_CONTEXT_BUDGET_RULES.md",
  "docs/phase-reports/PHASE_15J_CURRENT_CONTEXT_PACK_BUILDER_CONTEXT_BUDGET_RULES_REPORT.md",
  "docs/qa/PHASE_15J_CURRENT_CONTEXT_PACK_BUILDER_CONTEXT_BUDGET_RULES_SMOKE_CHECKLIST.md",
]) {
  for (const marker of docMarkers) expectIncludes(doc, marker);
}

for (const file of [helper, panel]) {
  for (const marker of forbiddenRuntimeMarkers) {
    expectAvoids(file, marker);
  }
}

for (const path of forbiddenPaths) {
  if (existsSync(rel(path))) fail(`Forbidden Phase 15J path exists: ${path}`);
  else pass(`Forbidden Phase 15J path absent: ${path}`);
}

const migrationDir = rel("supabase/migrations");
if (existsSync(migrationDir)) {
  for (const name of readdirSync(migrationDir)) {
    if (name.includes("phase15") && !allowedPhase15Migrations.has(name)) {
      fail(`Unexpected Phase 15 migration found: ${name}`);
    }
  }
  for (const name of allowedPhase15Migrations) {
    if (existsSync(join(migrationDir, name))) pass(`Allowed existing Phase 15 migration: ${name}`);
  }
}

for (const file of [
  "PROJECT_EXECUTION_LOG.md",
  "CODE_LEDGER.md",
  "CHANGELOG.md",
  "PHASE_STATUS.md",
]) {
  expectIncludes(file, "Phase 15J");
  expectIncludes(file, "Current Context Pack Builder + Context Budget Rules");
}

expectIncludes("PHASE_STATUS.md", "Phase 15K");

if (failed) {
  console.error("\nPhase 15J audit failed.");
  process.exit(1);
}

console.log("\nPhase 15J current context pack builder + context budget rules audit passed.");

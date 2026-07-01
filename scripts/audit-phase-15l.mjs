import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const requiredFiles = [
  "src/lib/carnos-continuity/knowledge-vault-foundation.ts",
  "src/lib/carnos-continuity/index.ts",
  "src/components/dashboard/knowledge-vault-foundation-panel.tsx",
  "src/components/dashboard/index.ts",
  "src/app/knowledge/page.tsx",
  "docs/contracts/PHASE_15L_KNOWLEDGE_VAULT_FOUNDATION.md",
  "docs/phase-reports/PHASE_15L_KNOWLEDGE_VAULT_FOUNDATION_REPORT.md",
  "docs/qa/PHASE_15L_KNOWLEDGE_VAULT_FOUNDATION_SMOKE_CHECKLIST.md",
  "scripts/audit-phase-15l.mjs",
  "package.json",
  "PROJECT_EXECUTION_LOG.md",
  "CODE_LEDGER.md",
  "CHANGELOG.md",
  "PHASE_STATUS.md",
];

const phaseMarkers = [
  "Phase 15L",
  "Knowledge Vault Foundation",
  "Knowledge vault separation",
  "knowledge_items",
  "knowledge_tags",
  "knowledge_links",
  "non-personal knowledge records",
  "source material metadata",
  "tags and link previews",
  "memory conversion requires review",
  "not personal memory",
  "embedded: false",
  "retrieval deferred",
  "upload parsing deferred",
  "no approval",
  "no persistence",
  "no Supabase",
  "no SQL reads or writes",
  "no retrieval",
  "no embeddings",
  "no provider calls",
  "no hidden Carnos prompt injection",
  "standalone `/memory` route",
  "Phase 15M",
];

const helperMarkers = [
  "KnowledgeVaultFoundationItem",
  "KnowledgeVaultTagPreview",
  "KnowledgeVaultLinkPreview",
  "KnowledgeVaultFoundationInput",
  "KnowledgeVaultFoundationSummary",
  "KnowledgeVaultFoundationResult",
  "PHASE_15L_KNOWLEDGE_VAULT_FOUNDATION_BOUNDARY",
  "DEFAULT_KNOWLEDGE_VAULT_ITEMS",
  "DEFAULT_KNOWLEDGE_VAULT_TAGS",
  "DEFAULT_KNOWLEDGE_VAULT_LINKS",
  "createKnowledgeVaultFoundationPreview",
  "summarizeKnowledgeVaultFoundation",
  "createDefaultKnowledgeVaultFoundationSummary",
  "createKnowledgeVaultItemPreview",
];

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

const forbiddenPaths = [
  "src/app/memory",
  "src/app/rag",
  "src/app/vector-search",
  "src/lib/rag",
  "src/lib/vector",
  "src/components/memory",
  "src/components/rag",
];

function read(path) {
  return readFileSync(path, "utf8");
}

function assert(condition, message) {
  if (!condition) {
    console.error(`✗ ${message}`);
    process.exitCode = 1;
    return;
  }
  console.log(`✓ ${message}`);
}

function assertIncludes(path, marker) {
  const text = read(path);
  assert(text.includes(marker), `${path} includes ${marker}`);
}

function assertNotIncludes(path, marker) {
  const text = read(path);
  assert(!text.includes(marker), `${path} avoids forbidden marker: ${marker}`);
}

console.log("\n=== PHASE 15L KNOWLEDGE VAULT FOUNDATION AUDIT ===");

for (const file of requiredFiles) {
  assert(existsSync(file), `Found ${file}`);
}

const helperPath = "src/lib/carnos-continuity/knowledge-vault-foundation.ts";
const panelPath = "src/components/dashboard/knowledge-vault-foundation-panel.tsx";

for (const marker of phaseMarkers) {
  assertIncludes(helperPath, marker);
  assertIncludes(panelPath, marker);
}

for (const marker of helperMarkers) {
  assertIncludes(helperPath, marker);
}

assertIncludes("src/lib/carnos-continuity/index.ts", 'export * from "./knowledge-vault-foundation";');
assertIncludes("src/components/dashboard/index.ts", 'export * from "./knowledge-vault-foundation-panel";');
assertIncludes("src/app/knowledge/page.tsx", "KnowledgeVaultFoundationPanel");
assertIncludes("src/app/knowledge/page.tsx", "<KnowledgeVaultFoundationPanel />");
assertIncludes("src/app/knowledge/page.tsx", "KnowledgeVaultAlignmentV1");

const docs = [
  "docs/contracts/PHASE_15L_KNOWLEDGE_VAULT_FOUNDATION.md",
  "docs/phase-reports/PHASE_15L_KNOWLEDGE_VAULT_FOUNDATION_REPORT.md",
  "docs/qa/PHASE_15L_KNOWLEDGE_VAULT_FOUNDATION_SMOKE_CHECKLIST.md",
];

for (const doc of docs) {
  for (const marker of phaseMarkers) {
    assertIncludes(doc, marker);
  }
}

for (const marker of forbiddenMarkers) {
  assertNotIncludes(helperPath, marker);
  assertNotIncludes(panelPath, marker);
}

for (const forbiddenPath of forbiddenPaths) {
  assert(!existsSync(forbiddenPath), `Forbidden Phase 15L path absent: ${forbiddenPath}`);
}

const migrationFiles = readdirSync("supabase/migrations").filter((file) =>
  file.includes("phase15"),
);
const allowedMigrations = new Set([
  "0024_phase15_memory_sql_foundation.sql",
  "0025_phase15_memory_parent_ownership_guards.sql",
]);
for (const file of migrationFiles) {
  assert(allowedMigrations.has(file), `Allowed existing Phase 15 migration: ${file}`);
}

assertIncludes("package.json", "audit:phase15l");
assertIncludes("package.json", "npm run audit:phase15l");

for (const path of [
  "PROJECT_EXECUTION_LOG.md",
  "CODE_LEDGER.md",
  "CHANGELOG.md",
  "PHASE_STATUS.md",
]) {
  assertIncludes(path, "Phase 15L");
  assertIncludes(path, "Knowledge Vault Foundation");
}

assertIncludes("PHASE_STATUS.md", "Phase 15M");

if (process.exitCode) {
  console.error("\nPhase 15L Knowledge Vault Foundation audit failed.");
  process.exit(process.exitCode);
}

console.log("\nPhase 15L Knowledge Vault Foundation audit passed.");

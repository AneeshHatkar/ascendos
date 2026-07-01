import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();

function read(relPath) {
  return readFileSync(join(root, relPath), "utf8");
}

function exists(relPath) {
  return existsSync(join(root, relPath));
}

function pass(message) {
  console.log(`✓ ${message}`);
}

function fail(message) {
  console.error(`✗ ${message}`);
  process.exitCode = 1;
}

function requireFile(relPath) {
  if (!exists(relPath)) {
    fail(`Missing required file: ${relPath}`);
    return "";
  }

  return read(relPath);
}

function requireIncludes(relPath, markers) {
  const text = requireFile(relPath);

  for (const marker of markers) {
    if (!text.includes(marker)) {
      fail(`${relPath} missing marker: ${marker}`);
    }
  }
}

function requireNotIncludes(relPath, markers) {
  const text = requireFile(relPath);

  for (const marker of markers) {
    if (text.includes(marker)) {
      fail(`${relPath} contains forbidden marker: ${marker}`);
    }
  }
}

function requireNotExists(relPath) {
  if (exists(relPath)) {
    fail(`Forbidden path exists: ${relPath}`);
  }
}

console.log("\n=== PHASE 15R FINAL MEMORY FOUNDATION AUDIT ===");

const phase15RequiredFiles = [
  "docs/phase-plans/PHASE_15A_CARNOS_PERSISTENT_MEMORY_CONTINUITY_SCOPE_LOCK.md",
  "docs/database/PHASE_15B_MEMORY_SQL_SCHEMA_DESIGN.md",
  "docs/contracts/PHASE_15C_MEMORY_TYPES_SCHEMAS_CONFLICT_RULES.md",
  "docs/contracts/PHASE_15D_MEMORY_CANDIDATE_ENGINE.md",
  "docs/contracts/PHASE_15E_MEMORY_INBOX_UI.md",
  "docs/contracts/PHASE_15F_PRIVACY_PRIVATE_MODE_DO_NOT_REMEMBER_RULES.md",
  "docs/contracts/PHASE_15G_APPROVED_MEMORY_READ_LAYER_RANKING_STALENESS_RULES.md",
  "docs/contracts/PHASE_15H_CARNOS_ENTITY_STATE.md",
  "docs/contracts/PHASE_15I_PROJECT_SYSTEM_STATE_MEMORY_SOURCE_OF_TRUTH_HIERARCHY.md",
  "docs/contracts/PHASE_15J_CURRENT_CONTEXT_PACK_BUILDER_CONTEXT_BUDGET_RULES.md",
  "docs/contracts/PHASE_15K_CARNOS_MEMORY_VISIBILITY_PANEL.md",
  "docs/contracts/PHASE_15L_KNOWLEDGE_VAULT_FOUNDATION.md",
  "docs/contracts/PHASE_15M_RETRIEVAL_CONTRACT_PROVENANCE_CONFLICT_HANDLING.md",
  "docs/contracts/PHASE_15N_EMBEDDING_BOUNDARY_NOOP_PROVIDER.md",
  "docs/contracts/PHASE_15O_FORGET_DELETE_DERIVED_RECORDS.md",
  "docs/contracts/PHASE_15P_MEMORY_AUDIT_EVENTS_USAGE_TRANSPARENCY.md",
  "docs/contracts/PHASE_15Q_CROSS_DOMAIN_INTEGRATION_PREVIEW.md",
  "docs/phase-reports/PHASE_15R_CARNOS_PERSISTENT_MEMORY_CONTINUITY_COMPLETION_REPORT.md",
  "docs/qa/PHASE_15R_CARNOS_PERSISTENT_MEMORY_CONTINUITY_FINAL_SMOKE_CHECKLIST.md",
  "scripts/audit-phase-15a.mjs",
  "scripts/audit-phase-15b.mjs",
  "scripts/audit-phase-15c.mjs",
  "scripts/audit-phase-15d.mjs",
  "scripts/audit-phase-15e.mjs",
  "scripts/audit-phase-15f.mjs",
  "scripts/audit-phase-15g.mjs",
  "scripts/audit-phase-15h.mjs",
  "scripts/audit-phase-15i.mjs",
  "scripts/audit-phase-15j.mjs",
  "scripts/audit-phase-15k.mjs",
  "scripts/audit-phase-15l.mjs",
  "scripts/audit-phase-15m.mjs",
  "scripts/audit-phase-15n.mjs",
  "scripts/audit-phase-15o.mjs",
  "scripts/audit-phase-15p.mjs",
  "scripts/audit-phase-15q.mjs",
  "scripts/audit-phase-15r.mjs",
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
  "src/lib/carnos-continuity/knowledge-vault-foundation.ts",
  "src/lib/carnos-continuity/retrieval-contract.ts",
  "src/lib/carnos-continuity/embedding-boundary.ts",
  "src/lib/carnos-continuity/forget-delete-derived-records.ts",
  "src/lib/carnos-continuity/memory-audit-usage-transparency.ts",
  "src/lib/carnos-continuity/cross-domain-integration-preview.ts",
  "src/lib/carnos-continuity/index.ts",
  "src/components/dashboard/memory-inbox-preview-panel.tsx",
  "src/components/dashboard/memory-privacy-rules-panel.tsx",
  "src/components/dashboard/approved-memory-read-layer-panel.tsx",
  "src/components/dashboard/carnos-entity-state-panel.tsx",
  "src/components/dashboard/project-system-state-memory-panel.tsx",
  "src/components/dashboard/current-context-pack-builder-panel.tsx",
  "src/components/dashboard/carnos-memory-visibility-panel.tsx",
  "src/components/dashboard/knowledge-vault-foundation-panel.tsx",
  "src/components/dashboard/retrieval-contract-panel.tsx",
  "src/components/dashboard/embedding-boundary-panel.tsx",
  "src/components/dashboard/forget-delete-derived-records-panel.tsx",
  "src/components/dashboard/memory-audit-usage-transparency-panel.tsx",
  "src/components/dashboard/cross-domain-memory-integration-panel.tsx",
  "src/components/dashboard/index.ts",
  "src/app/carnos/page.tsx",
  "src/app/privacy/page.tsx",
  "src/app/knowledge/page.tsx",
  "package.json",
  "PROJECT_EXECUTION_LOG.md",
  "CODE_LEDGER.md",
  "CHANGELOG.md",
  "PHASE_STATUS.md",
];

for (const file of phase15RequiredFiles) {
  requireFile(file);
}

if (!process.exitCode) {
  pass("Required Phase 15A–15R files are present");
}

const phase15ConceptMarkers = [
  "Carnos Persistent Memory + Continuity",
  "Memory SQL Foundation",
  "Memory Types, Schemas, Statuses, Sensitivity, Conflict Rules",
  "Memory Candidate Engine",
  "Memory Inbox UI",
  "Privacy, Private Mode, Do-Not-Remember Rules",
  "Approved Memory Read Layer + Ranking/Staleness Rules",
  "Carnos Entity State",
  "Project/System State Memory + Source-of-Truth Hierarchy",
  "Current Context Pack Builder + Context Budget Rules",
  "Carnos Memory Visibility Panel",
  "Knowledge Vault Foundation",
  "Retrieval Contract + Provenance + Conflict Handling",
  "Embedding Boundary / Noop Provider",
  "Forget/Delete Derived Records",
  "Memory Audit Events + Memory Usage Transparency",
  "Cross-Domain Integration Preview",
  "Final Audit, Smoke Checklist, Completion Report",
];

requireIncludes("docs/phase-reports/PHASE_15R_CARNOS_PERSISTENT_MEMORY_CONTINUITY_COMPLETION_REPORT.md", phase15ConceptMarkers);
requireIncludes("docs/qa/PHASE_15R_CARNOS_PERSISTENT_MEMORY_CONTINUITY_FINAL_SMOKE_CHECKLIST.md", [
  "Phase 15R",
  "Carnos Persistent Memory + Continuity",
  "npm run audit:phase15r",
  "npm run check",
  "/carnos",
  "/privacy",
  "/knowledge",
  "No standalone /memory route",
  "No SQL reads or writes in preview runtime files",
  "No Supabase calls in preview runtime files",
  "No embeddings generated",
  "No vector search",
  "No provider calls",
  "No hidden Carnos prompt injection",
  "Phase 16",
]);

if (!process.exitCode) {
  pass("Phase 15R report and smoke checklist contain required closeout markers");
}

requireIncludes("src/lib/carnos-continuity/index.ts", [
  'export * from "./memory-enums";',
  'export * from "./memory-contracts";',
  'export * from "./memory-validators";',
  'export * from "./memory-conflict-rules";',
  'export * from "./memory-candidate-engine";',
  'export * from "./memory-privacy-rules";',
  'export * from "./approved-memory-read-layer";',
  'export * from "./carnos-entity-state";',
  'export * from "./project-system-state-memory";',
  'export * from "./current-context-pack-builder";',
  'export * from "./carnos-memory-visibility";',
  'export * from "./knowledge-vault-foundation";',
  'export * from "./retrieval-contract";',
  'export * from "./embedding-boundary";',
  'export * from "./forget-delete-derived-records";',
  'export * from "./memory-audit-usage-transparency";',
  'export * from "./cross-domain-integration-preview";',
]);

requireIncludes("src/components/dashboard/index.ts", [
  'export * from "./memory-inbox-preview-panel";',
  'export * from "./memory-privacy-rules-panel";',
  'export * from "./approved-memory-read-layer-panel";',
  'export * from "./carnos-entity-state-panel";',
  'export * from "./project-system-state-memory-panel";',
  'export * from "./current-context-pack-builder-panel";',
  'export * from "./carnos-memory-visibility-panel";',
  'export * from "./knowledge-vault-foundation-panel";',
  'export * from "./retrieval-contract-panel";',
  'export * from "./embedding-boundary-panel";',
  'export * from "./forget-delete-derived-records-panel";',
  'export * from "./memory-audit-usage-transparency-panel";',
  'export * from "./cross-domain-memory-integration-panel";',
]);

if (!process.exitCode) {
  pass("Phase 15 lib and dashboard barrel exports remain complete");
}

requireIncludes("src/app/carnos/page.tsx", [
  "CarnosMemoryVisibilityPanel",
  "CrossDomainMemoryIntegrationPanel",
]);

requireIncludes("src/app/privacy/page.tsx", [
  "ForgetDeleteDerivedRecordsPanel",
  "MemoryAuditUsageTransparencyPanel",
]);

requireIncludes("src/app/knowledge/page.tsx", [
  "KnowledgeVaultFoundationPanel",
  "RetrievalContractPanel",
  "EmbeddingBoundaryPanel",
]);

if (!process.exitCode) {
  pass("Canonical /carnos, /privacy, and /knowledge Phase 15 surfaces are wired");
}

const protectedPreviewFiles = [
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
  "src/lib/carnos-continuity/knowledge-vault-foundation.ts",
  "src/lib/carnos-continuity/retrieval-contract.ts",
  "src/lib/carnos-continuity/embedding-boundary.ts",
  "src/lib/carnos-continuity/forget-delete-derived-records.ts",
  "src/lib/carnos-continuity/memory-audit-usage-transparency.ts",
  "src/lib/carnos-continuity/cross-domain-integration-preview.ts",
  "src/components/dashboard/memory-inbox-preview-panel.tsx",
  "src/components/dashboard/memory-privacy-rules-panel.tsx",
  "src/components/dashboard/approved-memory-read-layer-panel.tsx",
  "src/components/dashboard/carnos-entity-state-panel.tsx",
  "src/components/dashboard/project-system-state-memory-panel.tsx",
  "src/components/dashboard/current-context-pack-builder-panel.tsx",
  "src/components/dashboard/carnos-memory-visibility-panel.tsx",
  "src/components/dashboard/knowledge-vault-foundation-panel.tsx",
  "src/components/dashboard/retrieval-contract-panel.tsx",
  "src/components/dashboard/embedding-boundary-panel.tsx",
  "src/components/dashboard/forget-delete-derived-records-panel.tsx",
  "src/components/dashboard/memory-audit-usage-transparency-panel.tsx",
  "src/components/dashboard/cross-domain-memory-integration-panel.tsx",
];

const forbiddenPreviewMarkers = [
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
  "fetch(",
  "setInterval(",
  "setTimeout(",
  "executeApprovedAction(",
  "createProposedAction(",
];

for (const file of protectedPreviewFiles) {
  requireNotIncludes(file, forbiddenPreviewMarkers);
}

if (!process.exitCode) {
  pass("Phase 15 preview runtime files remain non-mutating, provider-free, and Supabase-free");
}

requireNotExists("src/app/memory");
requireNotExists("src/app/memory/page.tsx");
requireNotExists("src/app/rag");
requireNotExists("src/app/vector-search");
requireNotExists("src/lib/rag");
requireNotExists("src/lib/vector");
requireNotExists("src/components/memory");
requireNotExists("src/components/rag");

if (!process.exitCode) {
  pass("Forbidden standalone memory/RAG/vector routes and runtime paths remain absent");
}

const migrations = [
  "supabase/migrations/0024_phase15_memory_sql_foundation.sql",
  "supabase/migrations/0025_phase15_memory_parent_ownership_guards.sql",
];

for (const migration of migrations) {
  requireFile(migration);
}

requireNotIncludes("supabase/migrations/0024_phase15_memory_sql_foundation.sql", [
  "create extension if not exists vector",
  "public.memory_embeddings",
  "embedding vector",
]);

if (!process.exitCode) {
  pass("Phase 15 SQL foundation remains pgvector-free and memory_embeddings-free");
}

const pkg = JSON.parse(requireFile("package.json"));
if (!pkg.scripts?.["audit:phase15r"]) {
  fail("package.json missing audit:phase15r script");
}
if (!pkg.scripts?.check?.includes("npm run audit:phase15r")) {
  fail("package.json check script missing audit:phase15r gate");
}
if (!process.exitCode) {
  pass("package.json check gate includes audit:phase15r");
}

for (const phase of [
  "Phase 15A",
  "Phase 15B",
  "Phase 15C",
  "Phase 15D",
  "Phase 15E",
  "Phase 15F",
  "Phase 15G",
  "Phase 15H",
  "Phase 15I",
  "Phase 15J",
  "Phase 15K",
  "Phase 15L",
  "Phase 15M",
  "Phase 15N",
  "Phase 15O",
  "Phase 15P",
  "Phase 15Q",
  "Phase 15R",
]) {
  requireIncludes("PHASE_STATUS.md", [phase]);
}

requireIncludes("PROJECT_EXECUTION_LOG.md", ["Phase 15R", "Final Audit, Smoke Checklist, Completion Report"]);
requireIncludes("CODE_LEDGER.md", ["Phase 15R", "Final Audit, Smoke Checklist, Completion Report"]);
requireIncludes("CHANGELOG.md", ["Phase 15R", "Final Audit, Smoke Checklist, Completion Report"]);
requireIncludes("PHASE_STATUS.md", [
  "Phase 15R",
  "Carnos Persistent Memory + Continuity Foundation complete",
  "Next step: Phase 16",
]);

if (!process.exitCode) {
  pass("Phase 15R logs/status markers are present and Phase 16 is identified");
}

if (process.exitCode) {
  console.error("\nPhase 15R final memory foundation audit failed.");
  process.exit(1);
}

console.log("\nPhase 15R final memory foundation audit passed.");

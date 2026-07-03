import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();

const requiredFiles = [
  "supabase/migrations/0028_memory_rag_schema_alignment.sql",
  "docs/contracts/PHASE_17C_MEMORY_RAG_SCHEMA_ALIGNMENT_CONTRACT.md",
  "docs/phase-reports/PHASE_17C_MEMORY_RAG_SCHEMA_FOUNDATION_REPORT.md",
  "docs/qa/PHASE_17C_MEMORY_RAG_SCHEMA_SMOKE_CHECKLIST.md",
  "scripts/audit-phase-17c.mjs",
];

const forbiddenPaths = [
  "src/app/api/memory/route.ts",
  "src/app/api/carnos/memory/route.ts",
  "src/lib/memory-rag/repository.ts",
  "src/components/memory/memory-inbox.tsx",
];

function readRelative(path) {
  return readFileSync(join(root, path), "utf8");
}

function fail(message) {
  console.error(`✗ Memory/RAG schema audit failed: ${message}`);
  process.exit(1);
}

for (const file of requiredFiles) {
  if (!existsSync(join(root, file))) {
    fail(`Missing required file: ${file}`);
  }
}

for (const path of forbiddenPaths) {
  if (existsSync(join(root, path))) {
    fail(`Schema foundation must not create runtime/API/UI/repository path: ${path}`);
  }
}

const migration = readRelative("supabase/migrations/0028_memory_rag_schema_alignment.sql");

const migrationMarkers = [
  "Memory/RAG schema alignment foundation",
  "Do not duplicate memory_candidates",
  "Treat public.memory_items as the canonical approved-memory table",
  "create table if not exists public.memory_embedding_records",
  "create table if not exists public.memory_retrieval_events",
  "create table if not exists public.memory_conflict_groups",
  "create table if not exists public.memory_conflict_members",
  "alter table public.memory_candidates",
  "alter table public.memory_items",
  "alter table public.retrieval_logs",
  "enable row level security",
  "memory_rag_assert_parent_belongs_to_user",
  "memory_rag_guard_embedding_records_parent_ownership",
  "memory_rag_guard_retrieval_events_parent_ownership",
  "memory_rag_guard_conflict_members_parent_ownership",
  "provider text not null default 'noop'",
  "embedding_status text not null default 'deferred'",
  "provider_status text not null default 'runtime_deferred'",
];

for (const marker of migrationMarkers) {
  if (!migration.includes(marker)) {
    fail(`Migration missing marker: ${marker}`);
  }
}

const duplicateTableMarkers = [
  "create table if not exists public.approved_memories",
  "create table public.approved_memories",
];

for (const marker of duplicateTableMarkers) {
  if (migration.toLowerCase().includes(marker.toLowerCase())) {
    fail(`Migration must not duplicate approved memory table: ${marker}`);
  }
}

const contract = readRelative("docs/contracts/PHASE_17C_MEMORY_RAG_SCHEMA_ALIGNMENT_CONTRACT.md");
for (const marker of [
  "Memory/RAG Database Schema Foundation Contract",
  "memory_items already serves that role",
  "memory_embedding_records",
  "memory_retrieval_events",
  "memory_conflict_groups",
  "memory_conflict_members",
  "generate embeddings",
  "run vector search",
  "activate an embedding provider",
]) {
  if (!contract.includes(marker)) {
    fail(`Contract missing marker: ${marker}`);
  }
}

const report = readRelative("docs/phase-reports/PHASE_17C_MEMORY_RAG_SCHEMA_FOUNDATION_REPORT.md");
for (const marker of [
  "Memory/RAG Database Schema Foundation Report",
  "0028_memory_rag_schema_alignment.sql",
  "memory_items remains the approved-memory table",
  "runtime retrieval",
  "generated embedding",
]) {
  if (!report.includes(marker)) {
    fail(`Report missing marker: ${marker}`);
  }
}

const smoke = readRelative("docs/qa/PHASE_17C_MEMORY_RAG_SCHEMA_SMOKE_CHECKLIST.md");
for (const marker of [
  "Memory/RAG Database Schema Foundation Smoke Checklist",
  "No duplicate `approved_memories` table is created.",
  "`memory_embedding_records` is added.",
  "`memory_retrieval_events` is added.",
  "`memory_conflict_groups` is added.",
  "`memory_conflict_members` is added.",
  "`npm run audit:phase17c` passes.",
]) {
  if (!smoke.includes(marker)) {
    fail(`Smoke checklist missing marker: ${marker}`);
  }
}

const pkg = JSON.parse(readRelative("package.json"));
if (!pkg.scripts?.["audit:phase17c"]) {
  fail("package.json missing audit:phase17c script");
}
if (!pkg.scripts.check?.includes("npm run audit:phase17c")) {
  fail("package.json check script does not include audit:phase17c");
}
if (!pkg.scripts.check?.includes("npm run audit:phase17a") || !pkg.scripts.check?.includes("npm run audit:phase17b")) {
  fail("package.json check chain lost earlier Memory/RAG audits");
}

console.log("✓ Memory/RAG database schema foundation audit passed.");

import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();

function fail(message) {
  console.error(`✗ Memory/RAG contracts audit failed: ${message}`);
  process.exit(1);
}

function readRelative(path) {
  return readFileSync(join(root, path), "utf8");
}

const requiredFiles = [
  "src/lib/carnos-continuity/memory-rag-schema-contracts.ts",
  "src/lib/carnos-continuity/memory-rag-schema-validators.ts",
  "docs/contracts/PHASE_17D_MEMORY_RAG_SCHEMA_CONTRACTS.md",
  "docs/phase-reports/PHASE_17D_MEMORY_RAG_SCHEMA_CONTRACTS_REPORT.md",
  "docs/qa/PHASE_17D_MEMORY_RAG_SCHEMA_CONTRACTS_SMOKE_CHECKLIST.md",
  "scripts/audit-phase-17d.mjs",
];

for (const file of requiredFiles) {
  if (!existsSync(join(root, file))) {
    fail(`Missing required file: ${file}`);
  }
}

const forbiddenPaths = [
  "src/lib/memory-rag/repository.ts",
  "src/lib/carnos-continuity/memory-rag-repository.ts",
  "src/app/api/memory/route.ts",
  "src/app/api/carnos/memory/route.ts",
  "src/components/memory",
  "src/lib/vector",
  "src/lib/rag",
];

for (const path of forbiddenPaths) {
  if (existsSync(join(root, path))) {
    fail(`Forbidden runtime/repository/UI path exists: ${path}`);
  }
}

const contracts = readRelative("src/lib/carnos-continuity/memory-rag-schema-contracts.ts");
for (const marker of [
  "Memory/RAG schema contracts",
  "MEMORY_RAG_EVIDENCE_STRENGTHS",
  "MEMORY_RAG_SOURCE_RELIABILITY_LEVELS",
  "MEMORY_RAG_EMBEDDING_SOURCE_KINDS",
  "MEMORY_RAG_EMBEDDING_STATUSES",
  "MEMORY_RAG_PROVIDER_STATUSES",
  "MEMORY_RAG_RETRIEVAL_MODES",
  "MEMORY_RAG_CONFLICT_RESOLUTION_STATUSES",
  "MemoryCandidateSchemaAlignmentContract",
  "ApprovedMemorySchemaAlignmentContract",
  "MemoryEmbeddingRecordContract",
  "MemoryRetrievalEventContract",
  "MemoryConflictGroupContract",
  "MemoryConflictMemberContract",
  "MemoryRagSchemaContract",
  "MEMORY_RAG_SCHEMA_BOUNDARY",
  "runtime_retrieval_enabled: false",
  "embedding_generation_enabled: false",
  "vector_search_enabled: false",
  "provider_calls_enabled: false",
  "repository_enabled: false",
  "memory_items remains the approved-memory table",
]) {
  if (!contracts.includes(marker)) {
    fail(`Contracts missing marker: ${marker}`);
  }
}

const validators = readRelative("src/lib/carnos-continuity/memory-rag-schema-validators.ts");
for (const marker of [
  "Memory/RAG schema validators",
  "validateMemoryCandidateSchemaAlignment",
  "validateApprovedMemorySchemaAlignment",
  "validateMemoryEmbeddingRecord",
  "validateMemoryRetrievalEvent",
  "validateMemoryConflictGroup",
  "validateMemoryConflictMember",
  "validateMemoryRagSchemaContract",
  "assertNoMemoryRagRuntimeSideEffects",
  "MEMORY_RAG_VALIDATOR_BOUNDARY",
  "noop provider cannot have generated embedding status",
]) {
  if (!validators.includes(marker)) {
    fail(`Validators missing marker: ${marker}`);
  }
}

for (const forbidden of [
  "createSupabase",
  "createClient(",
  ".from(",
  ".insert(",
  ".update(",
  ".delete(",
  ".upsert(",
  ".rpc(",
  "fetch(",
  "OpenAI",
  "generateText",
  "streamText",
  "vector(",
  "embedding vector",
]) {
  if (contracts.includes(forbidden)) {
    fail(`Contracts include forbidden runtime marker: ${forbidden}`);
  }
  if (validators.includes(forbidden)) {
    fail(`Validators include forbidden runtime marker: ${forbidden}`);
  }
}

const index = readRelative("src/lib/carnos-continuity/index.ts");
if (!index.includes('export * from "./memory-rag-schema-contracts";')) {
  fail("index.ts missing memory-rag-schema-contracts export");
}
if (!index.includes('export * from "./memory-rag-schema-validators";')) {
  fail("index.ts missing memory-rag-schema-validators export");
}

const contractDoc = readRelative("docs/contracts/PHASE_17D_MEMORY_RAG_SCHEMA_CONTRACTS.md");
for (const marker of [
  "Memory/RAG TypeScript Contracts + Validators Contract",
  "memory_candidates remains the memory inbox table",
  "memory_items remains the approved-memory table",
  "memory_embedding_records stores embedding metadata only",
  "This step does not add",
]) {
  if (!contractDoc.includes(marker)) {
    fail(`Contract doc missing marker: ${marker}`);
  }
}

const report = readRelative("docs/phase-reports/PHASE_17D_MEMORY_RAG_SCHEMA_CONTRACTS_REPORT.md");
for (const marker of [
  "Memory/RAG TypeScript Contracts + Validators Report",
  "memory-rag-schema-contracts.ts",
  "memory-rag-schema-validators.ts",
  "This step does not read or write SQL",
]) {
  if (!report.includes(marker)) {
    fail(`Report missing marker: ${marker}`);
  }
}

const smoke = readRelative("docs/qa/PHASE_17D_MEMORY_RAG_SCHEMA_CONTRACTS_SMOKE_CHECKLIST.md");
for (const marker of [
  "Memory/RAG TypeScript Contracts + Validators Smoke Checklist",
  "`memory-rag-schema-contracts.ts` exists.",
  "`memory-rag-schema-validators.ts` exists.",
  "No repository is added.",
  "`npm run audit:phase17d` passes.",
]) {
  if (!smoke.includes(marker)) {
    fail(`Smoke checklist missing marker: ${marker}`);
  }
}

const pkg = JSON.parse(readRelative("package.json"));
if (!pkg.scripts?.["audit:phase17d"]) {
  fail("package.json missing audit:phase17d");
}
if (!pkg.scripts.check?.includes("npm run audit:phase17d")) {
  fail("package.json check script missing audit:phase17d");
}
if (!pkg.scripts.check?.includes("npm run audit:phase17c")) {
  fail("package.json check script lost audit:phase17c");
}

console.log("✓ Memory/RAG TypeScript contracts and validators audit passed.");

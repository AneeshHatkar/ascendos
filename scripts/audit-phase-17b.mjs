import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();

const requiredFiles = [
  "docs/contracts/PHASE_17B_MEMORY_RAG_DATA_BOUNDARY_MATRIX.md",
  "docs/contracts/PHASE_17B_MEMORY_RAG_AI_CAPABILITY_MATRIX.md",
  "docs/contracts/PHASE_17B_MEMORY_RAG_SCHEMA_OWNERSHIP_MAP.md",
  "docs/phase-reports/PHASE_17B_MEMORY_RAG_BOUNDARY_COMPLETION_REPORT.md",
  "docs/qa/PHASE_17B_MEMORY_RAG_BOUNDARY_SMOKE_CHECKLIST.md",
  "scripts/audit-phase-17b.mjs",
];

const requiredMarkers = new Map([
  [
    "docs/contracts/PHASE_17B_MEMORY_RAG_DATA_BOUNDARY_MATRIX.md",
    [
      "Phase 17B — Memory/RAG Data Boundary Matrix",
      "Repo Phase 16 = Current Information/Web foundation.",
      "Official JSON Chunk 16 = Voice Foundation.",
      "Memory Candidate",
      "Approved Memory",
      "Knowledge Vault Item",
      "Current-Info Source",
      "Document Note",
      "Research Note",
      "Career Note",
      "Goal / Project Note",
      "Carnos Conversation Context",
      "Manual User Entry",
      "Embedding Record",
      "Retrieval Event",
      "Data boundary matrix",
      "Allowed source-to-memory routing",
      "Forbidden route:",
      "Phase 17C schema work",
    ],
  ],
  [
    "docs/contracts/PHASE_17B_MEMORY_RAG_AI_CAPABILITY_MATRIX.md",
    [
      "Phase 17B — Memory/RAG AI Capability Matrix",
      "Capability statuses",
      "requires_confirmation",
      "runtime_deferred",
      "forbidden",
      "Save approved memory silently",
      "Background memory extraction",
      "Voice memory flow",
      "Carnos truthfulness rules",
      "Write boundaries",
      "Retrieval boundaries",
    ],
  ],
  [
    "docs/contracts/PHASE_17B_MEMORY_RAG_SCHEMA_OWNERSHIP_MAP.md",
    [
      "Phase 17B — Memory/RAG Schema Ownership Map",
      "Schema discovery rule",
      "Future schema ownership map",
      "memory_candidates",
      "approved_memories",
      "memory_retrieval_events",
      "memory_embeddings",
      "memory_conflicts",
      "Required fields for memory candidates",
      "Required fields for approved memories",
      "Required fields for retrieval audit",
      "Required fields for embeddings",
      "Required fields for conflicts/supersession",
      "RLS/user ownership expectations",
      "Phase 17C handoff",
    ],
  ],
  [
    "docs/phase-reports/PHASE_17B_MEMORY_RAG_BOUNDARY_COMPLETION_REPORT.md",
    [
      "Phase 17B — Boundary + Capability + Schema Ownership Completion Report",
      "What Phase 17B adds",
      "What Phase 17B does not add",
      "Boundaries locked",
      "Capability rules locked",
      "Schema ownership locked for 17C",
    ],
  ],
  [
    "docs/qa/PHASE_17B_MEMORY_RAG_BOUNDARY_SMOKE_CHECKLIST.md",
    [
      "Phase 17B — Memory/RAG Boundary Smoke Checklist",
      "Data Boundary Matrix exists.",
      "AI Capability Matrix exists.",
      "Schema Ownership Map exists.",
      "Memory candidate boundary is documented.",
      "Approved memory boundary is documented.",
      "Embedding record boundary is documented.",
      "Retrieval event boundary is documented.",
      "`npm run audit:phase17b` passes.",
    ],
  ],
]);

const forbiddenExactPaths = [
  "supabase/migrations/0029_phase17b_memory_rag_boundary.sql",
  "src/app/api/memory/route.ts",
  "src/app/api/carnos/memory/route.ts",
  "src/lib/memory-rag/repository.ts",
  "src/lib/memory-rag/schema.ts",
  "src/components/memory/memory-inbox.tsx",
];

function readRelative(path) {
  return readFileSync(join(root, path), "utf8");
}

function fail(message) {
  console.error(`✗ Phase 17B audit failed: ${message}`);
  process.exit(1);
}

for (const file of requiredFiles) {
  if (!existsSync(join(root, file))) {
    fail(`Missing required file: ${file}`);
  }
}

for (const [file, markers] of requiredMarkers.entries()) {
  const content = readRelative(file);
  for (const marker of markers) {
    if (!content.includes(marker)) {
      fail(`Missing marker in ${file}: ${marker}`);
    }
  }
}

for (const path of forbiddenExactPaths) {
  if (existsSync(join(root, path))) {
    fail(`Phase 17B must not create implementation/schema/runtime path: ${path}`);
  }
}

const pkg = JSON.parse(readRelative("package.json"));
if (!pkg.scripts?.["audit:phase17b"]) {
  fail("package.json missing audit:phase17b script");
}
if (!pkg.scripts.check?.includes("npm run audit:phase17b")) {
  fail("package.json check script does not include audit:phase17b");
}
if (!pkg.scripts.check?.includes("npm run audit:phase17a")) {
  fail("package.json check script lost audit:phase17a");
}

const migrationDir = join(root, "supabase/migrations");
if (existsSync(migrationDir)) {
  const phase17bMigrations = readdirSync(migrationDir).filter((file) =>
    /17b|phase17b|phase_17b/i.test(file),
  );
  if (phase17bMigrations.length > 0) {
    fail(`Phase 17B must not add migrations: ${phase17bMigrations.join(", ")}`);
  }
}

console.log("✓ Phase 17B Memory/RAG boundary/capability/schema ownership audit passed.");

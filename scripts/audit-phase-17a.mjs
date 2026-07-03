import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();

const requiredFiles = [
  "docs/phase-plans/PHASE_17A_MEMORY_RAG_SCOPE_LOCK.md",
  "docs/contracts/PHASE_17A_MEMORY_RAG_BOUNDARY_CONTRACT.md",
  "docs/phase-reports/PHASE_17A_MEMORY_RAG_DISCOVERY_REPORT.md",
  "docs/qa/PHASE_17A_MEMORY_RAG_SMOKE_CHECKLIST.md",
  "scripts/audit-phase-17a.mjs",
];

const requiredMarkers = new Map([
  [
    "docs/phase-plans/PHASE_17A_MEMORY_RAG_SCOPE_LOCK.md",
    [
      "Phase 17A — Memory/RAG Scope Lock + Roadmap Reconciliation + Discovery",
      "Official source-of-truth chunk: 17 Memory/RAG",
      "Repo Phase 16 = Current Information/Web foundation.",
      "Official JSON Chunk 16 Voice Foundation must not be assumed complete",
      "17A — Memory/RAG Scope Lock + Roadmap Reconciliation + Discovery",
      "17B — Data Boundary Matrix + AI Capability Matrix + Schema Ownership Map",
      "17C — Memory/RAG Database Schema",
      "17D — TypeScript Contracts + Validators",
      "17E — Memory Inbox Repository",
      "17F — Approved Memory Repository + Approval Flow",
      "17G — Provenance + Confidence + Conflict Engine",
      "17H — Embedding Provider Boundary",
      "17I — Retrieval Ranking + Budget + Dedupe Rules",
      "17J — Knowledge Vault Retrieval Bridge",
      "17K — Source Bridges from Current-Info/Documents/Career/Research/Goals/Projects",
      "17L — Carnos Memory Context Pack Builder",
      "17M — Retrieval Audit Trail + Explanation",
      "17N — Memory/RAG UI",
      "17O — Carnos Memory Integration Panel",
      "17P — Privacy, Sensitive Lock, Forget/Delete Readiness",
      "17Q — Final Phase 17 Audit + Fixtures + Completion Report",
      "No silent durable memory writes",
      "Candidate is not approved memory",
      "Knowledge is not personal memory",
      "Current-info sources are not personal memories",
      "No fake RAG",
      "No hidden background memory extraction",
      "Memory truthfulness",
      "Sensitive retrieval lock",
      "Retrieval must be bounded",
      "memory inbox",
      "approved memories",
      "edit-before-approve",
      "conflict resolver",
      "retrieval audit trail",
      "Carnos memory context pack",
      "Data boundary matrix",
      "Schema ownership map",
      "AI capability matrix",
    ],
  ],
  [
    "docs/contracts/PHASE_17A_MEMORY_RAG_BOUNDARY_CONTRACT.md",
    [
      "Phase 17A — Memory/RAG Boundary Contract",
      "Phase 17A may not add:",
      "SQL migrations",
      "API routes",
      "UI components",
      "provider calls",
      "Memory/RAG core boundaries",
      "Memory candidate",
      "Approved memory",
      "Knowledge item",
      "Current-info source",
      "Truthfulness contract",
      "Future schema rule",
    ],
  ],
  [
    "docs/phase-reports/PHASE_17A_MEMORY_RAG_DISCOVERY_REPORT.md",
    [
      "Phase 17A — Memory/RAG Discovery Report",
      "Known pre-existing memory-adjacent foundations",
      "Not yet complete before Phase 17",
      "Discovery command to run before schema work",
      "Phase 17A adds no schema and no runtime implementation.",
    ],
  ],
  [
    "docs/qa/PHASE_17A_MEMORY_RAG_SMOKE_CHECKLIST.md",
    [
      "Phase 17A — Memory/RAG Scope Lock Smoke Checklist",
      "Full 17A–17Q build map is documented.",
      "No silent durable memory writes rule is present.",
      "Memory candidate vs approved memory distinction is present.",
      "Phase 17A adds no SQL migration.",
      "`npm run audit:phase17a` passes.",
    ],
  ],
]);

const forbiddenExactPaths = [
  "supabase/migrations/0028_phase17a_memory_rag_scope_lock.sql",
  "src/app/api/memory/route.ts",
  "src/app/api/carnos/memory/route.ts",
  "src/lib/memory-rag/repository.ts",
  "src/components/memory/memory-inbox.tsx",
];

function readRelative(path) {
  return readFileSync(join(root, path), "utf8");
}

function fail(message) {
  console.error(`✗ Phase 17A audit failed: ${message}`);
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
    fail(`Phase 17A must not create implementation/schema/runtime path: ${path}`);
  }
}

const pkg = JSON.parse(readRelative("package.json"));
if (!pkg.scripts?.["audit:phase17a"]) {
  fail("package.json missing audit:phase17a script");
}
if (!pkg.scripts.check?.includes("npm run audit:phase17a")) {
  fail("package.json check script does not include audit:phase17a");
}

const migrationDir = join(root, "supabase/migrations");
if (existsSync(migrationDir)) {
  const phase17aMigrations = readdirSync(migrationDir).filter((file) =>
    /17a|phase17a|phase_17a/i.test(file),
  );
  if (phase17aMigrations.length > 0) {
    fail(`Phase 17A must not add migrations: ${phase17aMigrations.join(", ")}`);
  }
}

console.log("✓ Phase 17A Memory/RAG scope lock audit passed.");

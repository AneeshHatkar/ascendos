import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const requiredFiles = [
  "src/lib/carnos-continuity/approved-memory-read-layer.ts",
  "src/lib/carnos-continuity/index.ts",
  "src/components/dashboard/approved-memory-read-layer-panel.tsx",
  "src/components/dashboard/index.ts",
  "docs/contracts/PHASE_15G_APPROVED_MEMORY_READ_LAYER_RANKING_STALENESS_RULES.md",
  "docs/phase-reports/PHASE_15G_APPROVED_MEMORY_READ_LAYER_RANKING_STALENESS_RULES_REPORT.md",
  "docs/qa/PHASE_15G_APPROVED_MEMORY_READ_LAYER_RANKING_STALENESS_RULES_SMOKE_CHECKLIST.md",
  "scripts/audit-phase-15g.mjs",
  "package.json",
  "PROJECT_EXECUTION_LOG.md",
  "CODE_LEDGER.md",
  "CHANGELOG.md",
  "PHASE_STATUS.md",
];

const markers = {
  "src/lib/carnos-continuity/approved-memory-read-layer.ts": [
    "Phase 15G",
    "Approved Memory Read Layer + Ranking/Staleness Rules",
    "ApprovedMemoryReadLayerInput",
    "ApprovedMemoryReadLayerResult",
    "ApprovedMemoryRankedReference",
    "DEFAULT_APPROVED_MEMORY_RANKING_WEIGHTS",
    "PHASE_15G_APPROVED_MEMORY_READ_BOUNDARY",
    "scoreApprovedMemoryForRead",
    "readApprovedMemoriesForPreview",
    "createApprovedMemoryReadLayerPreview",
    "getApprovedMemoryStalenessSummary",
    "approved memory read layer preview only",
    "ranking/staleness rules only",
    "no approval",
    "no persistence",
    "no Supabase calls",
    "no SQL reads or writes",
    "no embeddings",
    "no provider calls",
    "no hidden Carnos prompt injection",
    "no context pack builder",
    "no standalone /memory route",
    "Phase 15H — Carnos Entity State",
  ],
  "src/components/dashboard/approved-memory-read-layer-panel.tsx": [
    "ApprovedMemoryReadLayerPanel",
    "Phase 15G Approved Memory Read Layer",
    "Approved Memory Ranking / Staleness Preview",
    "approved-memory ranking",
    "staleness warnings",
    "no hidden Carnos injection",
    "no context pack builder",
    "standalone /memory route",
  ],
  "src/lib/carnos-continuity/index.ts": [
    'export * from "./approved-memory-read-layer";',
  ],
  "src/components/dashboard/index.ts": [
    'export * from "./approved-memory-read-layer-panel";',
  ],
  "package.json": [
    "audit:phase15g",
    "npm run audit:phase15g",
  ],
  "PROJECT_EXECUTION_LOG.md": [
    "Phase 15G",
    "Approved Memory Read Layer + Ranking/Staleness Rules",
  ],
  "CODE_LEDGER.md": [
    "Phase 15G",
    "Approved Memory Read Layer + Ranking/Staleness Rules",
  ],
  "CHANGELOG.md": [
    "Phase 15G",
    "Approved Memory Read Layer + Ranking/Staleness Rules",
  ],
  "PHASE_STATUS.md": [
    "Phase 15G",
    "Approved Memory Read Layer + Ranking/Staleness Rules",
    "Phase 15H",
  ],
};

const docs = [
  "docs/contracts/PHASE_15G_APPROVED_MEMORY_READ_LAYER_RANKING_STALENESS_RULES.md",
  "docs/phase-reports/PHASE_15G_APPROVED_MEMORY_READ_LAYER_RANKING_STALENESS_RULES_REPORT.md",
  "docs/qa/PHASE_15G_APPROVED_MEMORY_READ_LAYER_RANKING_STALENESS_RULES_SMOKE_CHECKLIST.md",
];

const docMarkers = [
  "Phase 15G",
  "Approved Memory Read Layer + Ranking/Staleness Rules",
  "approved memory read layer",
  "ranking",
  "staleness",
  "no approval",
  "no persistence",
  "no Supabase",
  "no SQL reads or writes",
  "no embeddings",
  "no provider calls",
  "no hidden Carnos prompt injection",
  "no context pack builder",
  "standalone `/memory` route",
  "Phase 15H",
];

const protectedFiles = [
  "src/lib/carnos-continuity/approved-memory-read-layer.ts",
  "src/components/dashboard/approved-memory-read-layer-panel.tsx",
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

function fail(message) {
  console.error(`✗ ${message}`);
  process.exitCode = 1;
}

function pass(message) {
  console.log(`✓ ${message}`);
}

function read(path) {
  return readFileSync(path, "utf8");
}

console.log("\n=== PHASE 15G APPROVED MEMORY READ LAYER AUDIT ===");

for (const file of requiredFiles) {
  if (!existsSync(file)) fail(`Missing ${file}`);
  else pass(`Found ${file}`);
}

for (const [file, expected] of Object.entries(markers)) {
  if (!existsSync(file)) continue;
  const text = read(file);
  for (const marker of expected) {
    if (!text.includes(marker)) fail(`${file} missing marker: ${marker}`);
    else pass(`${file} includes ${marker}`);
  }
}

for (const file of docs) {
  if (!existsSync(file)) continue;
  const text = read(file);
  for (const marker of docMarkers) {
    if (!text.includes(marker)) fail(`${file} missing marker: ${marker}`);
    else pass(`${file} includes ${marker}`);
  }
}

for (const file of protectedFiles) {
  if (!existsSync(file)) continue;
  const text = read(file);
  for (const marker of forbiddenMarkers) {
    if (text.includes(marker)) fail(`${file} contains forbidden marker: ${marker}`);
    else pass(`${file} avoids forbidden marker: ${marker}`);
  }
}

for (const path of forbiddenPaths) {
  if (existsSync(path)) fail(`Forbidden Phase 15G path exists: ${path}`);
  else pass(`Forbidden Phase 15G path absent: ${path}`);
}

const migrations = existsSync("supabase/migrations")
  ? readdirSync("supabase/migrations").filter((file) => file.includes("phase15"))
  : [];

const allowedMigrations = new Set([
  "0024_phase15_memory_sql_foundation.sql",
  "0025_phase15_memory_parent_ownership_guards.sql",
]);

for (const migration of migrations) {
  if (!allowedMigrations.has(migration)) {
    fail(`Unexpected Phase 15G SQL migration found: ${migration}`);
  } else {
    pass(`Allowed existing Phase 15 migration: ${migration}`);
  }
}

if (process.exitCode) {
  console.error("\nPhase 15G audit failed.");
  process.exit(process.exitCode);
}

console.log("\nPhase 15G approved-memory read-layer ranking/staleness audit passed.");

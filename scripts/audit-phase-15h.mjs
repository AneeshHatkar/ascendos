import { existsSync, readdirSync, statSync, readFileSync } from "node:fs";
import { join } from "node:path";

const requiredFiles = [
  "src/lib/carnos-continuity/carnos-entity-state.ts",
  "src/lib/carnos-continuity/index.ts",
  "src/components/dashboard/carnos-entity-state-panel.tsx",
  "src/components/dashboard/index.ts",
  "docs/contracts/PHASE_15H_CARNOS_ENTITY_STATE.md",
  "docs/phase-reports/PHASE_15H_CARNOS_ENTITY_STATE_REPORT.md",
  "docs/qa/PHASE_15H_CARNOS_ENTITY_STATE_SMOKE_CHECKLIST.md",
  "scripts/audit-phase-15h.mjs",
  "package.json",
  "PROJECT_EXECUTION_LOG.md",
  "CODE_LEDGER.md",
  "CHANGELOG.md",
  "PHASE_STATUS.md",
];

const helperMarkers = [
  "Phase 15H",
  "Carnos Entity State",
  "CarnosEntityStatePreview",
  "CarnosEntityStateInput",
  "CarnosEntityStateSummary",
  "DEFAULT_CARNOS_ENTITY_STATE_PREVIEW",
  "PHASE_15H_CARNOS_ENTITY_STATE_BOUNDARY",
  "createCarnosEntityStatePreview",
  "evaluateCarnosEntityStatePolicies",
  "summarizeCarnosEntityState",
  "createDefaultCarnosEntityStateSummary",
  "Carnos persistent AI persona/entity inside ascendOS",
  "Carnos name",
  "Carnos role",
  "Carnos mission",
  "Carnos tone",
  "Carnos current mode",
  "Carnos current phase",
  "latest milestone",
  "next objective",
  "forbidden behaviors",
  "response preferences",
  "memory policy",
  "voice policy",
  "action policy",
  "source-of-truth policy",
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
  "Phase 15I — Project/System State Memory + Source-of-Truth Hierarchy",
];

const panelMarkers = [
  "CarnosEntityStatePanel",
  "Phase 15H Carnos Entity State",
  "Carnos persistent entity preview",
  "Carnos Entity State",
  "forbidden behaviors",
  "Memory policy",
  "Source-of-truth policy",
  "no hidden Carnos prompt injection",
  "no context pack builder",
  "standalone /memory route",
];

const docMarkers = [
  "Phase 15H",
  "Carnos Entity State",
  "Carnos persistent AI persona/entity inside ascendOS",
  "Carnos name",
  "Carnos role",
  "Carnos mission",
  "Carnos tone",
  "Carnos current mode",
  "Carnos current phase",
  "latest milestone",
  "next objective",
  "forbidden behaviors",
  "response preferences",
  "memory policy",
  "voice policy",
  "action policy",
  "source-of-truth policy",
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
  "Phase 15I",
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

function walk(dir) {
  if (!existsSync(dir)) {
    return [];
  }

  const output = [];
  for (const entry of readdirSync(dir)) {
    const path = join(dir, entry);
    const stat = statSync(path);

    if (stat.isDirectory()) {
      output.push(...walk(path));
    } else {
      output.push(path);
    }
  }

  return output;
}

console.log("\n=== PHASE 15H CARNOS ENTITY STATE AUDIT ===");

for (const file of requiredFiles) {
  assertFile(file);
}

for (const marker of helperMarkers) {
  assertIncludes("src/lib/carnos-continuity/carnos-entity-state.ts", marker);
}

for (const marker of panelMarkers) {
  assertIncludes("src/components/dashboard/carnos-entity-state-panel.tsx", marker);
}

assertIncludes("src/lib/carnos-continuity/index.ts", 'export * from "./carnos-entity-state";');
assertIncludes("src/components/dashboard/index.ts", 'export * from "./carnos-entity-state-panel";');
assertIncludes("package.json", "audit:phase15h");
assertIncludes("package.json", "npm run audit:phase15h");

for (const path of [
  "docs/contracts/PHASE_15H_CARNOS_ENTITY_STATE.md",
  "docs/phase-reports/PHASE_15H_CARNOS_ENTITY_STATE_REPORT.md",
  "docs/qa/PHASE_15H_CARNOS_ENTITY_STATE_SMOKE_CHECKLIST.md",
]) {
  for (const marker of docMarkers) {
    assertIncludes(path, marker);
  }
}

for (const path of [
  "src/lib/carnos-continuity/carnos-entity-state.ts",
  "src/components/dashboard/carnos-entity-state-panel.tsx",
]) {
  for (const marker of forbiddenMarkers) {
    assertAvoids(path, marker);
  }
}

for (const path of forbiddenPaths) {
  if (existsSync(path)) {
    fail(`Forbidden Phase 15H path exists: ${path}`);
  } else {
    pass(`Forbidden Phase 15H path absent: ${path}`);
  }
}

for (const file of walk("supabase/migrations")) {
  if (file.includes("0024_phase15_memory_sql_foundation.sql") || file.includes("0025_phase15_memory_parent_ownership_guards.sql")) {
    pass(`Allowed existing Phase 15 migration: ${file.split("/").pop()}`);
    continue;
  }

  if (file.toLowerCase().includes("phase15h")) {
    fail(`Phase 15H must not add SQL migration: ${file}`);
  }
}

for (const path of ["PROJECT_EXECUTION_LOG.md", "CODE_LEDGER.md", "CHANGELOG.md", "PHASE_STATUS.md"]) {
  assertIncludes(path, "Phase 15H");
  assertIncludes(path, "Carnos Entity State");
}

assertIncludes("PHASE_STATUS.md", "Phase 15I");

if (failed) {
  console.error("\nPhase 15H audit failed.");
  process.exit(1);
}

console.log("\nPhase 15H Carnos entity state audit passed.");

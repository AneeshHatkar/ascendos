import { existsSync, readdirSync, readFileSync } from "node:fs";

const requiredFiles = [
  "src/lib/carnos-continuity/memory-audit-usage-transparency.ts",
  "src/lib/carnos-continuity/index.ts",
  "src/components/dashboard/memory-audit-usage-transparency-panel.tsx",
  "src/components/dashboard/index.ts",
  "src/app/privacy/page.tsx",
  "docs/contracts/PHASE_15P_MEMORY_AUDIT_EVENTS_USAGE_TRANSPARENCY.md",
  "docs/phase-reports/PHASE_15P_MEMORY_AUDIT_EVENTS_USAGE_TRANSPARENCY_REPORT.md",
  "docs/qa/PHASE_15P_MEMORY_AUDIT_EVENTS_USAGE_TRANSPARENCY_SMOKE_CHECKLIST.md",
  "scripts/audit-phase-15p.mjs",
  "package.json",
  "PROJECT_EXECUTION_LOG.md",
  "CODE_LEDGER.md",
  "CHANGELOG.md",
  "PHASE_STATUS.md",
];

const markerFiles = [
  "src/lib/carnos-continuity/memory-audit-usage-transparency.ts",
  "src/components/dashboard/memory-audit-usage-transparency-panel.tsx",
  "docs/contracts/PHASE_15P_MEMORY_AUDIT_EVENTS_USAGE_TRANSPARENCY.md",
  "docs/phase-reports/PHASE_15P_MEMORY_AUDIT_EVENTS_USAGE_TRANSPARENCY_REPORT.md",
  "docs/qa/PHASE_15P_MEMORY_AUDIT_EVENTS_USAGE_TRANSPARENCY_SMOKE_CHECKLIST.md",
];

const requiredMarkers = [
  "Phase 15P",
  "Memory Audit Events + Memory Usage Transparency",
  "memory audit event contract",
  "memory usage transparency",
  "memory_events preview",
  "memory_usage_logs preview",
  "candidate_created",
  "memory_forgotten",
  "memory_used_in_context_pack",
  "memory_used_in_carnos_response",
  "private_mode_enabled",
  "conflict_detected",
  "stale_memory_detected",
  "visible memory usage ledger",
  "hidden memory usage blocked",
  "no SQL reads or writes",
  "no Supabase calls",
  "no persistence",
  "no embeddings",
  "no vector search",
  "no provider calls",
  "no hidden Carnos prompt injection",
  "standalone /memory route",
  "Phase 15Q",
];

const helperMarkers = [
  "MemoryAuditUsageEventSource",
  "MemoryAuditUsageVisibility",
  "MemoryAuditUsageSurface",
  "MemoryAuditUsageEventPreview",
  "MemoryUsageTransparencyReference",
  "MemoryAuditUsageTransparencyBoundary",
  "MemoryAuditUsageTransparencySummary",
  "MemoryAuditUsageTransparencyResult",
  "PHASE_15P_MEMORY_AUDIT_USAGE_TRANSPARENCY_BOUNDARY",
  "PHASE_15P_MEMORY_AUDIT_USAGE_TRANSPARENCY_MARKERS",
  "DEFAULT_MEMORY_AUDIT_EVENT_PREVIEWS",
  "DEFAULT_MEMORY_USAGE_TRANSPARENCY_REFERENCES",
  "createMemoryAuditUsageEventPreview",
  "createMemoryUsageTransparencyReference",
  "summarizeMemoryAuditUsageTransparency",
  "createMemoryAuditUsageTransparencyPreview",
  "createDefaultMemoryAuditUsageTransparencySummary",
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
  "fetch(",
  "setInterval(",
  "setTimeout(",
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

function assertExists(path) {
  if (!existsSync(path)) {
    fail(`Missing ${path}`);
    return;
  }

  pass(`Found ${path}`);
}

function assertIncludes(path, marker) {
  const text = read(path);

  if (!text.includes(marker)) {
    fail(`${path} missing marker: ${marker}`);
    return;
  }

  pass(`${path} includes ${marker}`);
}

function assertAvoids(path, marker) {
  const text = read(path);

  if (text.includes(marker)) {
    fail(`${path} contains forbidden marker: ${marker}`);
    return;
  }

  pass(`${path} avoids forbidden marker: ${marker}`);
}

console.log("\n=== PHASE 15P MEMORY AUDIT EVENTS + USAGE TRANSPARENCY AUDIT ===");

for (const file of requiredFiles) {
  assertExists(file);
}

for (const file of markerFiles) {
  for (const marker of requiredMarkers) {
    assertIncludes(file, marker);
  }
}

for (const marker of helperMarkers) {
  assertIncludes("src/lib/carnos-continuity/memory-audit-usage-transparency.ts", marker);
}

assertIncludes(
  "src/lib/carnos-continuity/index.ts",
  'export * from "./memory-audit-usage-transparency";',
);
assertIncludes(
  "src/components/dashboard/index.ts",
  'export * from "./memory-audit-usage-transparency-panel";',
);
assertIncludes("src/app/privacy/page.tsx", "MemoryAuditUsageTransparencyPanel");
assertIncludes("src/app/privacy/page.tsx", "<MemoryAuditUsageTransparencyPanel />");

for (const file of [
  "src/lib/carnos-continuity/memory-audit-usage-transparency.ts",
  "src/components/dashboard/memory-audit-usage-transparency-panel.tsx",
]) {
  for (const marker of forbiddenMarkers) {
    assertAvoids(file, marker);
  }
}

for (const path of forbiddenPaths) {
  if (existsSync(path)) {
    fail(`Forbidden Phase 15P path exists: ${path}`);
  } else {
    pass(`Forbidden Phase 15P path absent: ${path}`);
  }
}

const phase15Migrations = readdirSync("supabase/migrations")
  .filter((file) => file.includes("phase15"))
  .sort();

for (const migration of phase15Migrations) {
  if (
    migration !== "0024_phase15_memory_sql_foundation.sql" &&
    migration !== "0025_phase15_memory_parent_ownership_guards.sql"
  ) {
    fail(`Unexpected Phase 15P SQL migration found: ${migration}`);
  } else {
    pass(`Allowed existing Phase 15 migration: ${migration}`);
  }
}

assertIncludes("package.json", "audit:phase15p");
assertIncludes("package.json", "npm run audit:phase15p");

for (const file of ["PROJECT_EXECUTION_LOG.md", "CODE_LEDGER.md", "CHANGELOG.md", "PHASE_STATUS.md"]) {
  assertIncludes(file, "Phase 15P");
  assertIncludes(file, "Memory Audit Events + Memory Usage Transparency");
}

assertIncludes("PHASE_STATUS.md", "Phase 15Q");

if (process.exitCode) {
  console.error("\nPhase 15P audit failed.");
  process.exit(process.exitCode);
}

console.log("\nPhase 15P Memory Audit Events + Memory Usage Transparency audit passed.");

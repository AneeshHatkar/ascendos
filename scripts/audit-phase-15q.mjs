import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();

const requiredFiles = [
  "src/lib/carnos-continuity/cross-domain-integration-preview.ts",
  "src/lib/carnos-continuity/index.ts",
  "src/components/dashboard/cross-domain-memory-integration-panel.tsx",
  "src/components/dashboard/index.ts",
  "src/app/carnos/page.tsx",
  "docs/contracts/PHASE_15Q_CROSS_DOMAIN_INTEGRATION_PREVIEW.md",
  "docs/phase-reports/PHASE_15Q_CROSS_DOMAIN_INTEGRATION_PREVIEW_REPORT.md",
  "docs/qa/PHASE_15Q_CROSS_DOMAIN_INTEGRATION_PREVIEW_SMOKE_CHECKLIST.md",
  "scripts/audit-phase-15q.mjs",
  "package.json",
  "PROJECT_EXECUTION_LOG.md",
  "CODE_LEDGER.md",
  "CHANGELOG.md",
  "PHASE_STATUS.md",
];

const markerFiles = [
  "src/lib/carnos-continuity/cross-domain-integration-preview.ts",
  "src/components/dashboard/cross-domain-memory-integration-panel.tsx",
  "docs/contracts/PHASE_15Q_CROSS_DOMAIN_INTEGRATION_PREVIEW.md",
  "docs/phase-reports/PHASE_15Q_CROSS_DOMAIN_INTEGRATION_PREVIEW_REPORT.md",
  "docs/qa/PHASE_15Q_CROSS_DOMAIN_INTEGRATION_PREVIEW_SMOKE_CHECKLIST.md",
];

const requiredMarkers = [
  "Phase 15Q",
  "Cross-Domain Integration Preview",
  "cross-domain memory visibility",
  "whole-project connectivity",
  "memory_used_in_context_pack",
  "memory_used_in_carnos_response",
  "visible memory usage ledger",
  "hidden memory usage blocked",
  "source-of-truth hierarchy visible",
  "private mode can block",
  "do-not-remember can block",
  "no SQL reads or writes",
  "no Supabase calls",
  "no persistence",
  "no embeddings",
  "no vector search",
  "no provider calls",
  "no hidden Carnos prompt injection",
  "standalone /memory route",
  "Phase 15R",
];

const requiredLibMarkers = [
  "CrossDomainIntegrationSurface",
  "CrossDomainIntegrationStatus",
  "CrossDomainIntegrationUsageEvent",
  "CrossDomainIntegrationBlockedReason",
  "CrossDomainIntegrationPreviewRef",
  "CrossDomainIntegrationRouteLink",
  "CrossDomainIntegrationBoundary",
  "CrossDomainIntegrationSummary",
  "CrossDomainIntegrationPreviewResult",
  "PHASE_15Q_CROSS_DOMAIN_INTEGRATION_BOUNDARY",
  "PHASE_15Q_CROSS_DOMAIN_INTEGRATION_MARKERS",
  "DEFAULT_CROSS_DOMAIN_INTEGRATION_REFS",
  "DEFAULT_CROSS_DOMAIN_ROUTE_LINKS",
  "summarizeCrossDomainIntegrationPreview",
  "createCrossDomainIntegrationPreview",
  "createDefaultCrossDomainIntegrationSummary",
];

const forbiddenMarkers = [
  ".insert(",
  ".update(",
  ".delete(",
  ".upsert(",
  "__SUPABASE_FROM_CALL__PLACEHOLDER__",
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

function read(path) {
  return readFileSync(join(root, path), "utf8");
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
  if (marker === "__SUPABASE_FROM_CALL__PLACEHOLDER__") {
    assert(!text.includes(".from("), `${path} avoids forbidden marker: .from(`);
    return;
  }
  assert(!text.includes(marker), `${path} avoids forbidden marker: ${marker}`);
}

console.log("\n=== PHASE 15Q CROSS-DOMAIN INTEGRATION PREVIEW AUDIT ===");

for (const file of requiredFiles) {
  assert(existsSync(join(root, file)), `Found ${file}`);
}

for (const file of markerFiles) {
  for (const marker of requiredMarkers) {
    assertIncludes(file, marker);
  }
}

for (const marker of requiredLibMarkers) {
  assertIncludes("src/lib/carnos-continuity/cross-domain-integration-preview.ts", marker);
}

assertIncludes("src/lib/carnos-continuity/index.ts", 'export * from "./cross-domain-integration-preview";');
assertIncludes("src/components/dashboard/index.ts", 'export * from "./cross-domain-memory-integration-panel";');
assertIncludes("src/app/carnos/page.tsx", "CrossDomainMemoryIntegrationPanel");
assertIncludes("src/app/carnos/page.tsx", "<CrossDomainMemoryIntegrationPanel />");

for (const file of [
  "src/lib/carnos-continuity/cross-domain-integration-preview.ts",
  "src/components/dashboard/cross-domain-memory-integration-panel.tsx",
]) {
  for (const marker of forbiddenMarkers) {
    assertNotIncludes(file, marker);
  }
}

for (const path of forbiddenPaths) {
  assert(!existsSync(join(root, path)), `Forbidden Phase 15Q path absent: ${path}`);
}

for (const migration of [
  "0024_phase15_memory_sql_foundation.sql",
  "0025_phase15_memory_parent_ownership_guards.sql",
]) {
  assert(existsSync(join(root, "supabase/migrations", migration)), `Allowed existing Phase 15 migration: ${migration}`);
}

assertIncludes("package.json", "audit:phase15q");
assertIncludes("package.json", "npm run audit:phase15q");
assertIncludes("PROJECT_EXECUTION_LOG.md", "Phase 15Q");
assertIncludes("PROJECT_EXECUTION_LOG.md", "Cross-Domain Integration Preview");
assertIncludes("CODE_LEDGER.md", "Phase 15Q");
assertIncludes("CODE_LEDGER.md", "Cross-Domain Integration Preview");
assertIncludes("CHANGELOG.md", "Phase 15Q");
assertIncludes("CHANGELOG.md", "Cross-Domain Integration Preview");
assertIncludes("PHASE_STATUS.md", "Phase 15Q");
assertIncludes("PHASE_STATUS.md", "Cross-Domain Integration Preview");
assertIncludes("PHASE_STATUS.md", "Phase 15R");

if (process.exitCode) {
  console.error("\nPhase 15Q Cross-Domain Integration Preview audit failed.");
  process.exit(1);
}

console.log("\nPhase 15Q Cross-Domain Integration Preview audit passed.");

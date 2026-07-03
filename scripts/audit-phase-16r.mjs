import { existsSync, readFileSync } from "node:fs";

const requiredAuditScripts = [
  "scripts/audit-phase-16a.mjs",
  "scripts/audit-phase-16b.mjs",
  "scripts/audit-phase-16c.mjs",
  "scripts/audit-phase-16d.mjs",
  "scripts/audit-phase-16e.mjs",
  "scripts/audit-phase-16f.mjs",
  "scripts/audit-phase-16g.mjs",
  "scripts/audit-phase-16g-b.mjs",
  "scripts/audit-phase-16h.mjs",
  "scripts/audit-phase-16h-b.mjs",
  "scripts/audit-phase-16i.mjs",
  "scripts/audit-phase-16j.mjs",
  "scripts/audit-phase-16k.mjs",
  "scripts/audit-phase-16l.mjs",
  "scripts/audit-phase-16m.mjs",
  "scripts/audit-phase-16n.mjs",
  "scripts/audit-phase-16o.mjs",
  "scripts/audit-phase-16p.mjs",
  "scripts/audit-phase-16q.mjs",
  "scripts/audit-phase-16r.mjs",
];

const requiredFiles = [
  "docs/audits/PHASE_16R_FINAL_PHASE_16_AUDIT.md",
  "docs/phase-reports/PHASE_16R_FINAL_PHASE_16_COMPLETION_REPORT.md",
  "docs/qa/PHASE_16R_FINAL_PHASE_16_SMOKE_CHECKLIST.md",
  "docs/phase-plans/PHASE_16A_WEB_SEARCH_CURRENT_INFORMATION_SCOPE_LOCK.md",
  "docs/database/PHASE_16B_WEB_SOURCE_SQL_SCHEMA_DESIGN.md",
  "supabase/migrations/0026_phase16_web_source_sql_foundation.sql",
  "supabase/migrations/0027_phase16_web_source_parent_ownership_guards.sql",
  "src/lib/current-info-contracts/current-info-contracts.ts",
  "src/lib/current-info-provider/noop-current-info-provider.ts",
  "src/lib/current-info-safety/current-info-safety-gate.ts",
  "src/lib/current-info-evidence/current-info-citation-engine.ts",
  "src/lib/current-info-capture/current-info-source-candidate.ts",
  "src/lib/current-info-capture/current-info-extraction-candidate.ts",
  "src/lib/current-info-capture/current-info-duplicate-detector.ts",
  "src/lib/current-info-review/current-info-review-queue-item.ts",
  "src/lib/repositories/current-info-read.ts",
  "src/lib/dashboard/current-info-dashboard-data-helpers.ts",
  "src/components/dashboard/current-info-ui-components.tsx",
  "src/components/dashboard/carnos-current-info-integration-panel.tsx",
  "src/components/dashboard/career-current-info-source-panel.tsx",
  "src/components/dashboard/research-current-info-source-panel.tsx",
  "src/components/dashboard/knowledge-vault-source-bridge-panel.tsx",
  "src/components/dashboard/current-info-review-to-save-panel.tsx",
  "src/components/dashboard/current-info-privacy-retention-panel.tsx",
  "src/components/dashboard/current-info-web-source-audit-trail-panel.tsx",
  "package.json",
  "PROJECT_EXECUTION_LOG.md",
  "CODE_LEDGER.md",
  "CHANGELOG.md",
  "PHASE_STATUS.md",
];

const requiredFinalMarkers = {
  "docs/audits/PHASE_16R_FINAL_PHASE_16_AUDIT.md": [
    "Phase 16R — Final Phase 16 Audit",
    "16A — Scope Lock + Source Traceability",
    "16Q — Web Source Audit Trail",
    "real external search provider activation",
    "automatic memory conversion",
    "Phase 16.5 — Carnos Visual Identity + Companion UI",
  ],
  "docs/phase-reports/PHASE_16R_FINAL_PHASE_16_COMPLETION_REPORT.md": [
    "Phase 16 — Web Search / Current Information is complete",
    "What Phase 16 enables",
    "What Phase 16 intentionally does not enable",
    "Phase 16.5 — Carnos Visual Identity + Companion UI",
  ],
  "docs/qa/PHASE_16R_FINAL_PHASE_16_SMOKE_CHECKLIST.md": [
    "`audit:phase16a` exists",
    "`audit:phase16q` exists",
    "`audit:phase16r` exists",
    "No real external provider is activated",
    "No automatic memory conversion is added",
  ],
  "package.json": [
    "audit:phase16r",
  ],
};

const requiredPackageAudits = [
  "audit:phase16a",
  "audit:phase16b",
  "audit:phase16c",
  "audit:phase16d",
  "audit:phase16e",
  "audit:phase16f",
  "audit:phase16g",
  "audit:phase16g_b",
  "audit:phase16h",
  "audit:phase16h_b",
  "audit:phase16i",
  "audit:phase16j",
  "audit:phase16k",
  "audit:phase16l",
  "audit:phase16m",
  "audit:phase16n",
  "audit:phase16o",
  "audit:phase16p",
  "audit:phase16q",
  "audit:phase16r",
];

const forbiddenFiles = [
  "src/app/current-info/page.tsx",
  "src/app/web-search/page.tsx",
  "src/app/api/current-info/route.ts",
  "src/app/api/current-info/search/route.ts",
  "src/app/api/current-info/save-candidate/route.ts",
  "src/app/api/current-info/audit-events/route.ts",
  "src/lib/web-search",
  "src/lib/vector",
  "supabase/migrations/0028_phase16_runtime_provider_activation.sql",
];

function read(path) {
  return readFileSync(path, "utf8");
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

console.log("\n=== PHASE 16R FINAL PHASE 16 AUDIT ===");

for (const file of requiredAuditScripts) {
  assert(existsSync(file), `Missing Phase 16 audit script: ${file}`);
  console.log(`✓ Found ${file}`);
}

for (const file of requiredFiles) {
  assert(existsSync(file), `Missing Phase 16 required file: ${file}`);
  console.log(`✓ Found ${file}`);
}

for (const [file, markers] of Object.entries(requiredFinalMarkers)) {
  const text = read(file);

  for (const marker of markers) {
    assert(text.includes(marker), `${file} missing marker: ${marker}`);
    console.log(`✓ ${file} includes marker: ${marker}`);
  }
}

const packageJson = JSON.parse(read("package.json"));

for (const auditName of requiredPackageAudits) {
  assert(packageJson.scripts?.[auditName], `package.json missing script: ${auditName}`);
  assert(
    packageJson.scripts?.check?.includes(`npm run ${auditName}`),
    `npm run check missing ${auditName}`,
  );
  assert(
    packageJson.scripts?.["check:verbose"]?.includes(`npm run ${auditName}`),
    `npm run check:verbose missing ${auditName}`,
  );
  assert(
    packageJson.scripts?.["check:quiet"]?.includes(`npm run ${auditName}`),
    `npm run check:quiet missing ${auditName}`,
  );
  console.log(`✓ package verification chain includes ${auditName}`);
}

for (const file of forbiddenFiles) {
  assert(!existsSync(file), `Forbidden Phase 16 final file/path exists: ${file}`);
  console.log(`✓ Forbidden file/path absent: ${file}`);
}

const sql = read("supabase/migrations/0026_phase16_web_source_sql_foundation.sql");
for (const marker of [
  "create table if not exists public.web_search_queries",
  "create table if not exists public.web_sources",
  "create table if not exists public.web_source_candidates",
  "create table if not exists public.web_source_links",
  "create table if not exists public.web_source_audit_events",
  "No provider calls",
  "No automatic saves from internet results",
  "No automatic memory conversion",
  "No pgvector",
  "No memory_embeddings",
]) {
  assert(sql.includes(marker), `Phase 16 SQL foundation missing marker: ${marker}`);
  console.log(`✓ Phase 16 SQL includes marker: ${marker}`);
}

const status = read("PHASE_STATUS.md");
assert(status.includes("Phase 16R — Final Phase 16 Audit + Smoke Checklist + Completion Report"), "PHASE_STATUS.md missing Phase 16R entry");
assert(status.includes("Phase 16.5 — Carnos Visual Identity + Companion UI"), "PHASE_STATUS.md missing Phase 16.5 next step");

console.log("\nPhase 16R audit passed: Phase 16 is complete, fully inventoried, boundary-protected, and wired into verification.");

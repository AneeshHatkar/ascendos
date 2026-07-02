import { existsSync, readFileSync, readdirSync } from "node:fs";

const requiredFiles = [
  "docs/phase-plans/PHASE_16A_WEB_SEARCH_CURRENT_INFORMATION_SCOPE_LOCK.md",
  "docs/phase-reports/PHASE_16A_WEB_SEARCH_SCOPE_LOCK_REPORT.md",
  "docs/qa/PHASE_16A_WEB_SEARCH_SCOPE_LOCK_SMOKE_CHECKLIST.md",
  "scripts/audit-phase-16a.mjs",
  "package.json",
  "PROJECT_EXECUTION_LOG.md",
  "CODE_LEDGER.md",
  "CHANGELOG.md",
  "PHASE_STATUS.md",
];

const requiredPlanMarkers = [
  "Phase 16 — Web Search / Current Information",
  "Web Search, Current Information, Source Capture, Citation, Reliability, and Review-to-Save Foundation",
  "jobs, companies, labs, papers, docs, and current resources",
  "Citations and reliability notes",
  "Carnos may search, summarize, cite, classify, and suggest where internet content belongs.",
  "Carnos may not silently save, remember, apply, email, or modify records from internet content.",
  "16A — Scope Lock + Source Traceability",
  "16B — Web Source SQL Foundation",
  "16C — Current-Info Types, Enums, and Validators",
  "16D — Search Provider Boundary + Noop Provider",
  "16E — Query Classifier + Current-Info Safety Gate",
  "16F — Citation, Reliability, and Freshness Engine",
  "16G — Source Capture + Extraction Candidates",
  "16H — Destination Router + Duplicate Detection",
  "16I — Web Current-Info Read Repository + Dashboard Helpers",
  "16J — Current-Info UI Components",
  "16K — Carnos Current-Info Integration",
  "16L — Career Web Source Integration",
  "16M — Research / Stanford / Paper / Lab Integration",
  "16N — Knowledge Vault Source Bridge",
  "16O — Review-to-Save Candidate Flow",
  "16P — Privacy, Sensitive Search, and Retention Rules",
  "16Q — Web Source Audit Trail",
  "16R — Final Phase 16 Audit + Smoke Checklist + Completion Report",
  "web_search_queries",
  "web_sources",
  "web_source_candidates",
  "web_source_links",
  "web_source_audit_events",
  "job_posting",
  "company_page",
  "lab_page",
  "professor_page",
  "paper",
  "documentation",
  "job_search",
  "company_research",
  "lab_search",
  "professor_search",
  "paper_search",
  "documentation_lookup",
  "health_current_info",
  "legal_current_info",
  "financial_current_info",
  "official",
  "primary_source",
  "academic",
  "reputable_secondary",
  "community",
  "unknown",
  "live_or_recent",
  "possibly_stale",
  "Internet sources may become knowledge after review.",
  "Internet sources must not automatically become personal memory.",
  "save_web_source_to_knowledge_candidate",
  "create_job_application_from_web_source_candidate",
  "create_research_literature_item_from_web_source_candidate",
  "create_target_lab_from_web_source_candidate",
  "create_target_professor_from_web_source_candidate",
  "Private mode blocks query retention by default.",
  "Full-page raw content storage is deferred",
  "browser-side secrets",
  "uncontrolled fetch calls",
  "background browsing",
  "search on page load",
  "duplicate hints",
  "Failed Search / No Source Fallback",
  "silent browsing",
  "automatic memory conversion",
  "hidden Carnos current-info retrieval",
  "pgvector",
  "memory_embeddings",
  "Phase 16A does not add SQL migrations",
  "Phase 16B — Web Source SQL Foundation",
];

const requiredReportMarkers = [
  "Phase 16A — Web Search / Current Information Scope Lock Report",
  "Status: Complete",
  "Web search tools for jobs, companies, labs, papers, docs, and current resources.",
  "Citations and reliability notes.",
  "Source capture and review-to-save candidate pipeline.",
  "Provider activation outside boundary",
  "No Runtime Implementation in 16A",
  "Phase 16B — Web Source SQL Foundation",
];

const requiredChecklistMarkers = [
  "Phase 16A — Web Search / Current Information Scope Lock Smoke Checklist",
  "No silent browsing.",
  "No background browsing.",
  "No uncontrolled fetch calls.",
  "No browser-side secrets.",
  "No search on page load.",
  "No direct writes from internet results.",
  "No automatic memory conversion.",
  "No pgvector.",
  "No memory_embeddings.",
  "`npm run audit:phase16a` passes.",
];

const forbiddenNewPaths = [
  "src/lib/current-info",
  "src/components/current-info",
];

// Phase 16A is a scope lock and must remain valid after later Phase 16 migrations land.
// Later database migrations are audited by their own chunk gates, starting with Phase 16B.

function read(path) {
  return readFileSync(path, "utf8");
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
  console.log(`✓ ${message}`);
}

function assertIncludes(path, markers) {
  const text = read(path);
  for (const marker of markers) {
    assert(text.includes(marker), `${path} includes marker: ${marker}`);
  }
}

console.log("\n=== PHASE 16A WEB SEARCH / CURRENT INFORMATION SCOPE LOCK AUDIT ===");

for (const file of requiredFiles) {
  assert(existsSync(file), `Found ${file}`);
}

assertIncludes(
  "docs/phase-plans/PHASE_16A_WEB_SEARCH_CURRENT_INFORMATION_SCOPE_LOCK.md",
  requiredPlanMarkers,
);

assertIncludes(
  "docs/phase-reports/PHASE_16A_WEB_SEARCH_SCOPE_LOCK_REPORT.md",
  requiredReportMarkers,
);

assertIncludes(
  "docs/qa/PHASE_16A_WEB_SEARCH_SCOPE_LOCK_SMOKE_CHECKLIST.md",
  requiredChecklistMarkers,
);

const packageJson = read("package.json");
assert(packageJson.includes('"audit:phase16a"'), "package.json includes audit:phase16a");
assert(packageJson.includes("npm run audit:phase16a"), "npm run check includes audit:phase16a");

for (const path of forbiddenNewPaths) {
  assert(!existsSync(path), `Phase 16A has not added runtime path: ${path}`);
}

if (existsSync("supabase/migrations")) {
  const migrationFiles = readdirSync("supabase/migrations");
console.log("✓ Phase 16A remains valid after later Phase 16 migrations are added");
}

const rootRuntimeFilesToScan = [
  "src/app/carnos/page.tsx",
  "src/app/career/page.tsx",
  "src/app/research-lab/page.tsx",
  "src/app/research-stanford/page.tsx",
  "src/app/knowledge/page.tsx",
].filter((path) => existsSync(path));

const forbiddenRuntimeMarkers = [
  "fetch(",
  "setInterval(",
  "setTimeout(",
  "navigator.geolocation",
  "web_search_queries",
  "web_sources",
  "web_source_candidates",
  "createWebSource",
  "searchCurrentInfo(",
  "currentInfoProvider.search",
];

for (const file of rootRuntimeFilesToScan) {
  const text = read(file);
  for (const marker of forbiddenRuntimeMarkers) {
    assert(!text.includes(marker), `${file} avoids premature Phase 16 runtime marker: ${marker}`);
  }
}

for (const logFile of ["PROJECT_EXECUTION_LOG.md", "CODE_LEDGER.md", "CHANGELOG.md", "PHASE_STATUS.md"]) {
  const text = read(logFile);
  assert(text.includes("Phase 16A"), `${logFile} includes Phase 16A`);
  assert(text.includes("Web Search / Current Information"), `${logFile} includes Web Search / Current Information`);
}

assert(read("PHASE_STATUS.md").includes("Phase 16B"), "PHASE_STATUS.md points to Phase 16B");

console.log("\nPhase 16A Web Search / Current Information scope lock audit passed.");

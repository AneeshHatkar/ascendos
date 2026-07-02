import { existsSync, readFileSync, readdirSync } from "node:fs";

const requiredFiles = [
  "supabase/migrations/0026_phase16_web_source_sql_foundation.sql",
  "supabase/migrations/0027_phase16_web_source_parent_ownership_guards.sql",
  "docs/database/PHASE_16B_WEB_SOURCE_SQL_SCHEMA_DESIGN.md",
  "docs/phase-reports/PHASE_16B_WEB_SOURCE_SQL_FOUNDATION_REPORT.md",
  "docs/qa/PHASE_16B_WEB_SOURCE_SQL_FOUNDATION_SMOKE_CHECKLIST.md",
  "scripts/audit-phase-16b.mjs",
  "package.json",
  "PROJECT_EXECUTION_LOG.md",
  "CODE_LEDGER.md",
  "CHANGELOG.md",
  "PHASE_STATUS.md",
];

const tables = [
  "web_search_queries",
  "web_sources",
  "web_source_candidates",
  "web_source_links",
  "web_source_audit_events",
];

const requiredSqlMarkers = [
  "No provider calls",
  "No browser-side secrets",
  "No automatic saves from internet results",
  "No automatic memory conversion",
  "No pgvector",
  "No memory_embeddings",
  "query_kind",
  "job_search",
  "company_research",
  "lab_search",
  "professor_search",
  "paper_search",
  "documentation_lookup",
  "health_current_info",
  "legal_current_info",
  "financial_current_info",
  "source_kind",
  "job_posting",
  "company_page",
  "lab_page",
  "professor_page",
  "paper",
  "documentation",
  "reliability_label",
  "official",
  "primary_source",
  "academic",
  "reputable_secondary",
  "community",
  "freshness_label",
  "live_or_recent",
  "possibly_stale",
  "save_web_source_to_knowledge_candidate",
  "create_job_application_from_web_source_candidate",
  "create_research_literature_item_from_web_source_candidate",
  "create_target_lab_from_web_source_candidate",
  "create_target_professor_from_web_source_candidate",
  "web_search_performed",
  "web_source_candidate_created",
  "web_source_saved",
  "web_source_linked_to_record",
  "web_source_blocked_by_private_mode",
  "web_source_blocked_by_reliability",
];

const requiredGuardMarkers = [
  "phase16_assert_web_source_ref_belongs_to_user",
  "phase16_guard_web_sources_parent_ownership",
  "phase16_guard_web_source_candidates_parent_ownership",
  "phase16_guard_web_source_links_parent_ownership",
  "phase16_guard_web_source_audit_events_parent_ownership",
  "raise exception",
];

const forbiddenSqlMarkers = [
  "create extension if not exists vector",
  "public.memory_embeddings",
  "embedding vector",
  " vector(",
  "openai",
  "OpenAI",
  "generateText",
  "streamText",
  "fetch(",
  "setInterval(",
  "setTimeout(",
];

const forbiddenPaths = [
  "src/lib/current-info",
  "src/components/current-info",
  "src/app/current-info",
  "src/app/web-search",
];

function read(path) {
  return readFileSync(path, "utf8");
}

function assert(condition, message) {
  if (!condition) {
    console.error(`✗ ${message}`);
    process.exitCode = 1;
    return;
  }
  console.log(`✓ ${message}`);
}

function includes(path, marker) {
  assert(read(path).includes(marker), `${path} includes ${marker}`);
}

console.log("\n=== WEB SOURCE SQL FOUNDATION AUDIT ===");

for (const file of requiredFiles) {
  assert(existsSync(file), `Found ${file}`);
}

const sqlPath = "supabase/migrations/0026_phase16_web_source_sql_foundation.sql";
const guardPath = "supabase/migrations/0027_phase16_web_source_parent_ownership_guards.sql";
const sql = read(sqlPath);
const guardSql = read(guardPath);

for (const table of tables) {
  includes(sqlPath, `create table if not exists public.${table}`);
  includes(sqlPath, `alter table public.${table} enable row level security;`);
}

for (const table of tables) {
  includes(sqlPath, `${table}_select_own`);
}

for (const marker of requiredSqlMarkers) {
  includes(sqlPath, marker);
}

for (const marker of requiredGuardMarkers) {
  includes(guardPath, marker);
}

for (const marker of forbiddenSqlMarkers) {
  assert(!sql.includes(marker), `SQL avoids forbidden marker: ${marker}`);
  assert(!guardSql.includes(marker), `Ownership guard avoids forbidden marker: ${marker}`);
}

for (const path of forbiddenPaths) {
  assert(!existsSync(path), `Runtime path not added yet: ${path}`);
}

const migrationFiles = readdirSync("supabase/migrations").filter((file) => file.includes("phase16"));
assert(
  migrationFiles.includes("0026_phase16_web_source_sql_foundation.sql"),
  "Expected web source SQL migration is present",
);
assert(
  migrationFiles.includes("0027_phase16_web_source_parent_ownership_guards.sql"),
  "Expected web source ownership guard migration is present",
);

includes("docs/database/PHASE_16B_WEB_SOURCE_SQL_SCHEMA_DESIGN.md", "web_search_queries");
includes("docs/database/PHASE_16B_WEB_SOURCE_SQL_SCHEMA_DESIGN.md", "web_sources");
includes("docs/database/PHASE_16B_WEB_SOURCE_SQL_SCHEMA_DESIGN.md", "web_source_candidates");
includes("docs/database/PHASE_16B_WEB_SOURCE_SQL_SCHEMA_DESIGN.md", "web_source_links");
includes("docs/database/PHASE_16B_WEB_SOURCE_SQL_SCHEMA_DESIGN.md", "web_source_audit_events");
includes("docs/database/PHASE_16B_WEB_SOURCE_SQL_SCHEMA_DESIGN.md", "No provider calls");
includes("docs/database/PHASE_16B_WEB_SOURCE_SQL_SCHEMA_DESIGN.md", "No automatic memory conversion");

includes("docs/phase-reports/PHASE_16B_WEB_SOURCE_SQL_FOUNDATION_REPORT.md", "Status: Complete");
includes("docs/phase-reports/PHASE_16B_WEB_SOURCE_SQL_FOUNDATION_REPORT.md", "No runtime search provider");
includes("docs/phase-reports/PHASE_16B_WEB_SOURCE_SQL_FOUNDATION_REPORT.md", "No automatic save behavior");

includes("docs/qa/PHASE_16B_WEB_SOURCE_SQL_FOUNDATION_SMOKE_CHECKLIST.md", "`web_search_queries` exists");
includes("docs/qa/PHASE_16B_WEB_SOURCE_SQL_FOUNDATION_SMOKE_CHECKLIST.md", "No pgvector was added");
includes("docs/qa/PHASE_16B_WEB_SOURCE_SQL_FOUNDATION_SMOKE_CHECKLIST.md", "`npm run audit:phase16b` passes");

const pkg = JSON.parse(read("package.json"));
assert(pkg.scripts?.["audit:phase16b"] === "node scripts/audit-phase-16b.mjs", "package.json includes audit:phase16b");
assert(pkg.scripts?.check?.includes("npm run audit:phase16b"), "npm run check includes audit:phase16b");

for (const path of ["PROJECT_EXECUTION_LOG.md", "CODE_LEDGER.md", "CHANGELOG.md", "PHASE_STATUS.md"]) {
  includes(path, "Web Source SQL Foundation");
}

includes("PHASE_STATUS.md", "Current-info type contracts, enums, validators");

if (process.exitCode) {
  console.error("\nWeb source SQL foundation audit failed.");
  process.exit(process.exitCode);
}

console.log("\nWeb source SQL foundation audit passed.");

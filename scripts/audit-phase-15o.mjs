import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const rel = (path) => join(root, path);

function fail(message) {
  console.error(`✗ ${message}`);
  process.exitCode = 1;
}

function pass(message) {
  console.log(`✓ ${message}`);
}

function read(path) {
  return readFileSync(rel(path), "utf8");
}

function assertExists(path) {
  if (!existsSync(rel(path))) fail(`Missing ${path}`);
  else pass(`Found ${path}`);
}

function assertIncludes(path, marker) {
  const text = read(path);
  if (!text.includes(marker)) fail(`${path} missing marker: ${marker}`);
  else pass(`${path} includes ${marker}`);
}

function assertExcludes(path, marker) {
  const text = read(path);
  if (text.includes(marker)) fail(`${path} contains forbidden marker: ${marker}`);
  else pass(`${path} avoids forbidden marker: ${marker}`);
}

console.log("\n=== PHASE 15O FORGET/DELETE DERIVED RECORDS AUDIT ===");

const requiredFiles = [
  "src/lib/carnos-continuity/forget-delete-derived-records.ts",
  "src/lib/carnos-continuity/index.ts",
  "src/components/dashboard/forget-delete-derived-records-panel.tsx",
  "src/components/dashboard/index.ts",
  "src/app/privacy/page.tsx",
  "docs/contracts/PHASE_15O_FORGET_DELETE_DERIVED_RECORDS.md",
  "docs/phase-reports/PHASE_15O_FORGET_DELETE_DERIVED_RECORDS_REPORT.md",
  "docs/qa/PHASE_15O_FORGET_DELETE_DERIVED_RECORDS_SMOKE_CHECKLIST.md",
  "scripts/audit-phase-15o.mjs",
  "package.json",
  "PROJECT_EXECUTION_LOG.md",
  "CODE_LEDGER.md",
  "CHANGELOG.md",
  "PHASE_STATUS.md",
];

for (const file of requiredFiles) assertExists(file);

const markerFiles = [
  "src/lib/carnos-continuity/forget-delete-derived-records.ts",
  "src/components/dashboard/forget-delete-derived-records-panel.tsx",
  "docs/contracts/PHASE_15O_FORGET_DELETE_DERIVED_RECORDS.md",
  "docs/phase-reports/PHASE_15O_FORGET_DELETE_DERIVED_RECORDS_REPORT.md",
  "docs/qa/PHASE_15O_FORGET_DELETE_DERIVED_RECORDS_SMOKE_CHECKLIST.md",
];

const requiredMarkers = [
  "Phase 15O",
  "Forget/Delete Derived Records",
  "forget request contract",
  "derived records inventory",
  "delete derived records preview",
  "memory_forgotten audit event preview",
  "derived_records_deleted audit event preview",
  "embedding_removed audit event preview",
  "no destructive delete",
  "no SQL reads or writes",
  "no Supabase calls",
  "no embeddings",
  "no vector search",
  "no provider calls",
  "no hidden Carnos prompt injection",
  "standalone /memory route",
  "Phase 15P",
];

for (const file of markerFiles) {
  for (const marker of requiredMarkers) assertIncludes(file, marker);
}

const helperMarkers = [
  "ForgetDeleteTargetKind",
  "ForgetDeleteDecision",
  "ForgetDeleteBlockedReason",
  "DerivedRecordPreview",
  "ForgetDeleteRequestPreview",
  "ForgetDeleteAuditPreview",
  "ForgetDeleteDerivedRecordsBoundary",
  "ForgetDeleteDerivedRecordsSummary",
  "ForgetDeleteDerivedRecordsResult",
  "PHASE_15O_FORGET_DELETE_DERIVED_RECORDS_BOUNDARY",
  "PHASE_15O_FORGET_DELETE_MARKERS",
  "DEFAULT_FORGET_DELETE_REQUESTS",
  "DEFAULT_DERIVED_RECORD_PREVIEWS",
  "createForgetDeleteDerivedRecordsPreview",
  "createMemoryForgottenAuditEventPreview",
  "summarizeForgetDeleteDerivedRecords",
  "createDefaultForgetDeleteDerivedRecordsSummary",
];

for (const marker of helperMarkers) {
  assertIncludes("src/lib/carnos-continuity/forget-delete-derived-records.ts", marker);
}

assertIncludes("src/lib/carnos-continuity/index.ts", 'export * from "./forget-delete-derived-records";');
assertIncludes("src/components/dashboard/index.ts", 'export * from "./forget-delete-derived-records-panel";');
assertIncludes("src/app/privacy/page.tsx", "ForgetDeleteDerivedRecordsPanel");
assertIncludes("src/app/privacy/page.tsx", "<ForgetDeleteDerivedRecordsPanel />");

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

for (const file of [
  "src/lib/carnos-continuity/forget-delete-derived-records.ts",
  "src/components/dashboard/forget-delete-derived-records-panel.tsx",
]) {
  for (const marker of forbiddenMarkers) assertExcludes(file, marker);
}

const forbiddenPaths = [
  "src/app/memory",
  "src/app/rag",
  "src/app/vector-search",
  "src/lib/rag",
  "src/lib/vector",
  "src/components/memory",
  "src/components/rag",
];

for (const path of forbiddenPaths) {
  if (existsSync(rel(path))) fail(`Forbidden Phase 15O path exists: ${path}`);
  else pass(`Forbidden Phase 15O path absent: ${path}`);
}

const phase15Migrations = readdirSync(rel("supabase/migrations")).filter((file) =>
  file.includes("phase15"),
);
const allowedMigrations = new Set([
  "0024_phase15_memory_sql_foundation.sql",
  "0025_phase15_memory_parent_ownership_guards.sql",
]);
for (const migration of phase15Migrations) {
  if (!allowedMigrations.has(migration)) fail(`Unexpected Phase 15O migration: ${migration}`);
  else pass(`Allowed existing Phase 15 migration: ${migration}`);
}

const packageText = read("package.json");
if (!packageText.includes('"audit:phase15o"')) fail("package.json missing audit:phase15o");
else pass("package.json includes audit:phase15o");
if (!packageText.includes("npm run audit:phase15o")) fail("npm run check missing audit:phase15o");
else pass("package.json includes npm run audit:phase15o");

for (const file of ["PROJECT_EXECUTION_LOG.md", "CODE_LEDGER.md", "CHANGELOG.md", "PHASE_STATUS.md"]) {
  assertIncludes(file, "Phase 15O");
  assertIncludes(file, "Forget/Delete Derived Records");
}

assertIncludes("PHASE_STATUS.md", "Phase 15P");

if (process.exitCode) {
  console.error("\nPhase 15O Forget/Delete Derived Records audit failed.");
  process.exit(process.exitCode);
}

console.log("\nPhase 15O Forget/Delete Derived Records audit passed.");

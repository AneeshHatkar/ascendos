import fs from "node:fs";
import path from "node:path";

const root = process.cwd();

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), "utf8");
}

function exists(relativePath) {
  return fs.existsSync(path.join(root, relativePath));
}

function pass(message) {
  console.log(`✓ ${message}`);
}

function fail(message) {
  console.error(`✗ ${message}`);
  process.exitCode = 1;
}

function requireFile(relativePath) {
  if (exists(relativePath)) {
    pass(`Found ${relativePath}`);
  } else {
    fail(`Missing ${relativePath}`);
  }
}

function requireIncludes(relativePath, markers) {
  const content = read(relativePath);
  for (const marker of markers) {
    if (content.includes(marker)) {
      pass(`${relativePath} includes ${marker}`);
    } else {
      fail(`${relativePath} missing ${marker}`);
    }
  }
}

function requireExcludes(relativePath, markers) {
  const content = read(relativePath);
  for (const marker of markers) {
    if (content.includes(marker)) {
      fail(`${relativePath} includes forbidden marker: ${marker}`);
    } else {
      pass(`${relativePath} avoids forbidden marker: ${marker}`);
    }
  }
}

console.log("\n=== Phase 13 audit: required files ===");

const requiredFiles = [
  "docs/phase-plans/PHASE_13_GRIMOIRE_ENGINE.md",
  "docs/database/PHASE_13_GRIMOIRE_SCHEMA_DESIGN.md",
  "docs/qa/PHASE_13_GRIMOIRE_MANUAL_SMOKE_CHECKLIST.md",
  "docs/phase-reports/PHASE_13_GRIMOIRE_COMPLETION_REPORT.md",
  "supabase/migrations/0016_phase13_grimoire_foundation.sql",
  "supabase/migrations/0017_phase13_parent_ownership_guards.sql",
  "src/types/database.ts",
  "src/lib/repositories/grimoire-read.ts",
  "src/lib/dashboard/grimoire-dashboard-data-helpers.ts",
  "src/components/dashboard/grimoire-dashboard-v1.tsx",
  "src/app/grimoire/page.tsx",
  "src/components/dashboard/index.ts",
  "src/lib/routes.ts",
  "src/lib/dashboard-registry.ts",
  "src/lib/dashboard/dashboard-layout-contract.ts",
  "src/lib/dashboard/dashboard-card-registry.ts",
];

for (const file of requiredFiles) {
  requireFile(file);
}

console.log("\n=== Phase 13 audit: SQL foundation ===");

requireIncludes("supabase/migrations/0016_phase13_grimoire_foundation.sql", [
  "Phase 13",
  "create table if not exists public.grimoire_modes",
  "create table if not exists public.grimoire_daily_logs",
  "create table if not exists public.grimoire_skills",
  "create table if not exists public.grimoire_corruption_checks",
  "create table if not exists public.grimoire_reversions",
  "alter table public.grimoire_modes enable row level security;",
  "alter table public.grimoire_daily_logs enable row level security;",
  "alter table public.grimoire_skills enable row level security;",
  "alter table public.grimoire_corruption_checks enable row level security;",
  "alter table public.grimoire_reversions enable row level security;",
  "grimoire_modes_select_own",
  "grimoire_daily_logs_select_own",
  "grimoire_skills_select_own",
  "grimoire_corruption_checks_select_own",
  "grimoire_reversions_select_own",
]);

requireExcludes("supabase/migrations/0016_phase13_grimoire_foundation.sql", [
  "grimoire_skillsenable",
  "insert into",
]);

requireIncludes("supabase/migrations/0017_phase13_parent_ownership_guards.sql", [
  "phase13_assert_parent_belongs_to_user",
  "phase13_guard_grimoire_modes_parent_ownership",
  "phase13_guard_grimoire_daily_logs_parent_ownership",
  "phase13_guard_grimoire_skills_parent_ownership",
  "phase13_guard_grimoire_corruption_checks_parent_ownership",
  "phase13_guard_grimoire_reversions_parent_ownership",
  "raise exception",
]);

console.log("\n=== Phase 13 audit: database types and read helpers ===");

requireIncludes("src/types/database.ts", [
  "GrimoireModeRow",
  "GrimoireDailyLogRow",
  "GrimoireSkillRow",
  "GrimoireCorruptionCheckRow",
  "GrimoireReversionRow",
]);

requireIncludes("src/lib/repositories/grimoire-read.ts", [
  "listGrimoireModes",
  "listGrimoireDailyLogs",
  "listGrimoireSkills",
  "listGrimoireCorruptionChecks",
  "listGrimoireReversions",
]);

requireExcludes("src/lib/repositories/grimoire-read.ts", [
  ".insert(",
  ".update(",
  ".delete(",
  ".upsert(",
  "createSupabaseBrowserClient",
  "generateText",
  "streamText",
  "setInterval(",
  "setTimeout(",
  "executeApprovedAction(",
  "createProposedAction(",
]);

console.log("\n=== Phase 13 audit: dashboard helper ===");

requireIncludes("src/lib/dashboard/grimoire-dashboard-data-helpers.ts", [
  "getGrimoireDashboardDataSummary",
  "GrimoireDashboardSummary",
  "GrimoireDashboardDetailRows",
  "read_only_boundary: true",
  "source_tables",
  "grounding_rules",
  "anti_corruption_rules",
  "weekly_throne_audit_questions",
  "pending_reversion_log_count",
  "throne_attention_count",
]);

requireExcludes("src/lib/dashboard/grimoire-dashboard-data-helpers.ts", [
  ".insert(",
  ".update(",
  ".delete(",
  ".upsert(",
  "createSupabaseBrowserClient",
  "generateText",
  "streamText",
  "setInterval(",
  "setTimeout(",
  "executeApprovedAction(",
  "createProposedAction(",
]);

console.log("\n=== Phase 13 audit: route, registry, and dashboard wiring ===");

requireIncludes("src/app/grimoire/page.tsx", [
  "AuthenticatedDashboardShell",
  "GrimoireDashboardV1",
  "Read-only Grimoire surface",
]);

requireIncludes("src/components/dashboard/index.ts", [
  'export * from "./grimoire-dashboard-v1";',
]);

requireIncludes("src/lib/routes.ts", ["/grimoire"]);
requireIncludes("src/lib/dashboard-registry.ts", ["/grimoire", "Grimoire"]);
requireIncludes("src/lib/dashboard/dashboard-layout-contract.ts", ["grimoire"]);
requireIncludes("src/lib/dashboard/dashboard-card-registry.ts", [
  "grimoire-mode-selector",
  "grimoire-mission-mapping",
  "grimoire_modes",
  "grimoire_daily_logs",
]);

console.log("\n=== Phase 13 audit: dashboard content markers ===");

requireIncludes("src/components/dashboard/grimoire-dashboard-v1.tsx", [
  "GrimoireDashboardV1",
  "Read-only Grimoire boundary",
  "Grimoire state and privacy boundary",
  "Mode selector",
  "Mission mapping",
  "Symbol-to-action translator",
  "Corruption detector",
  "Reversion",
  "Weekly throne audit",
  "Carnos Grimoire guide boundary",
  "Throne override boundary",
  "Final Grimoire safety audit",
  "Source tables",
  "Save / Confirm unavailable",
  "No symbolic inflation.",
  "No permanent overdrive.",
  "No replacing proof with identity claims.",
  "Truth overrides mode intensity.",
  "Safety overrides symbolic mission pressure.",
]);

requireExcludes("src/components/dashboard/grimoire-dashboard-v1.tsx", [
  ".insert(",
  ".update(",
  ".delete(",
  ".upsert(",
  ".from(",
  "createSupabaseBrowserClient",
  "generateText",
  "streamText",
  "setInterval(",
  "setTimeout(",
  "executeApprovedAction(",
  "createProposedAction(",
]);

requireExcludes("src/app/grimoire/page.tsx", [
  ".insert(",
  ".update(",
  ".delete(",
  ".upsert(",
  ".from(",
  "createSupabaseBrowserClient",
  "generateText",
  "streamText",
  "setInterval(",
  "setTimeout(",
  "executeApprovedAction(",
  "createProposedAction(",
]);

console.log("\n=== Phase 13 audit: docs and logs ===");

requireIncludes("docs/qa/PHASE_13_GRIMOIRE_MANUAL_SMOKE_CHECKLIST.md", [
  "Phase 13 Grimoire Manual Smoke Checklist",
  "/grimoire",
  "Required cards",
  "Preview cards and boundaries",
  "Deferred scope",
]);

requireIncludes("docs/phase-reports/PHASE_13_GRIMOIRE_COMPLETION_REPORT.md", [
  "Phase 13 Grimoire Completion Report",
  "Status: Complete.",
  "Completed scope",
  "Verification gates",
  "Protected boundaries",
  "Deferred scope",
  "Final status",
]);

requireIncludes("PROJECT_EXECUTION_LOG.md", ["Phase 13"]);
requireIncludes("CODE_LEDGER.md", ["Phase 13"]);
requireIncludes("CHANGELOG.md", ["Phase 13"]);
requireIncludes("PHASE_STATUS.md", ["Phase 13"]);

if (process.exitCode) {
  console.error("\nPhase 13 audit failed.");
  process.exit(process.exitCode);
}

console.log("\nPhase 13 audit passed: Grimoire SQL, read helpers, route wiring, dashboard UI, boundary panels, docs, and closeout artifacts are present and protected.");

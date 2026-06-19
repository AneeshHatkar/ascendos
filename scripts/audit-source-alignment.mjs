import fs from "node:fs";
import path from "node:path";

const root = process.cwd();

function fail(message) {
  console.error(`Source alignment audit failed: ${message}`);
  process.exit(1);
}

function pass(message) {
  console.log(`✓ ${message}`);
}

function exists(relativePath) {
  return fs.existsSync(path.join(root, relativePath));
}

function requireFile(relativePath) {
  if (!exists(relativePath)) {
    fail(`Missing required file: ${relativePath}`);
  }

  pass(`Found ${relativePath}`);
}

function read(relativePath) {
  requireFile(relativePath);
  return fs.readFileSync(path.join(root, relativePath), "utf8");
}

function normalize(value) {
  return value.toLowerCase().replace(/\s+/g, " ").trim();
}

function requireIncludes(content, needle, message) {
  if (!normalize(content).includes(normalize(needle))) {
    fail(message);
  }
}

function loadJson(relativePath) {
  const content = read(relativePath);

  try {
    return JSON.parse(content);
  } catch (error) {
    fail(`Invalid JSON in ${relativePath}: ${error.message}`);
  }
}

function routeToAppPath(route) {
  if (route === "/") {
    return "src/app/page.tsx";
  }

  return `src/app/${route.replace(/^\//, "")}/page.tsx`;
}

const sourceDocx =
  "docs/source-of-truth/ascendOS_Carnos_v1_1_COMPLETE_Implementation_Bible_FINAL_SYNCED.docx";
const sourceJson =
  "docs/source-of-truth/ascendOS_Carnos_v1_1_COMPLETE_Source_of_Truth_FINAL_SYNCED.json";

console.log("=== Source files ===");
requireFile(sourceDocx);
requireFile(sourceJson);

const sourceTruth = loadJson(sourceJson);

if (sourceTruth.project_name && sourceTruth.project_name !== "ascendOS") {
  fail(`JSON project_name should be ascendOS, found: ${sourceTruth.project_name}`);
}

if (sourceTruth.ai_companion && sourceTruth.ai_companion !== "Carnos") {
  fail(`JSON ai_companion should be Carnos, found: ${sourceTruth.ai_companion}`);
}

const sourceTruthRaw = JSON.stringify(sourceTruth);

for (const required of [
  "Carnos never directly mutates SQL from freeform text",
  "Important updates follow proposed_actions -> validation -> Save/Edit/Cancel -> server write -> audit log -> timeline event",
  "All real user data is SQL-backed, user-owned, RLS-protected, auditable, and export/delete capable",
]) {
  if (!sourceTruthRaw.includes(required)) {
    fail(`Source JSON is missing expected source-truth rule: ${required}`);
  }
}

pass("Source JSON core rules are present");

console.log("\n=== Phase 1 foundation files ===");
for (const file of [
  "README.md",
  "SOURCE_OF_TRUTH.md",
  "PROJECT_EXECUTION_LOG.md",
  "CODE_LEDGER.md",
  "DECISIONS.md",
  "ERRORS_AND_FIXES.md",
  "CHANGELOG.md",
  "PHASE_STATUS.md",
  ".gitignore",
]) {
  requireFile(file);
}

const sourceOfTruthDoc = read("SOURCE_OF_TRUTH.md");
for (const phrase of [
  "ascendOS",
  "Carnos",
  "FINAL_SYNCED",
  "Source-of-Truth",
]) {
  requireIncludes(
    sourceOfTruthDoc,
    phrase,
    `SOURCE_OF_TRUTH.md is missing expected phrase: ${phrase}`,
  );
}

pass("Phase 1 source foundation appears present");

console.log("\n=== Package scripts ===");
const packageJson = loadJson("package.json");
const scripts = packageJson.scripts ?? {};

for (const scriptName of [
  "lint",
  "build",
  "check",
  "validate:routes",
  "validate:registry",
  "validate:migrations",
  "verify:env",
  "audit:phase3",
  "audit:phase4",
  "audit:phase5",
  "snapshot:code",
]) {
  if (!scripts[scriptName]) {
    fail(`Missing package script: ${scriptName}`);
  }

  pass(`Found package script ${scriptName}`);
}

for (const requiredInCheck of [
  "validate:routes",
  "validate:registry",
  "validate:migrations",
  "audit:phase3",
  "audit:phase4",
  "audit:phase5",
  "build",
]) {
  if (!scripts.check.includes(requiredInCheck)) {
    fail(`npm run check does not include ${requiredInCheck}`);
  }
}

pass("npm run check contains required gates");

console.log("\n=== Phase 2 route foundation ===");
const canonicalRoutes = sourceTruth.canonical_routes ?? {};
const routeValues = Object.values(canonicalRoutes);

if (routeValues.length < 30) {
  fail(`Expected at least 30 canonical routes from source JSON, found ${routeValues.length}`);
}

const missingRoutes = [];

for (const route of routeValues) {
  const routePath = routeToAppPath(route);

  if (!exists(routePath)) {
    missingRoutes.push(`${route} -> ${routePath}`);
  }
}

if (missingRoutes.length > 0) {
  fail(`Missing canonical route pages:\n${missingRoutes.join("\n")}`);
}

pass(`All ${routeValues.length} JSON canonical routes have app pages`);

for (const banned of [
  "src/app/knowledge-vault",
  "src/app/research-stanford-dashboard",
  "src/app/command-dashboard",
  "src/app/carnos-companion-dashboard",
]) {
  if (exists(banned)) {
    fail(`Banned legacy route directory exists: ${banned}`);
  }
}

pass("No banned legacy route directories found");

console.log("\n=== Phase 3 auth/Supabase foundation ===");
for (const file of [
  ".env.example",
  "middleware.ts",
  "src/lib/supabase/env.ts",
  "src/lib/supabase/browser.ts",
  "src/lib/supabase/server.ts",
  "src/lib/supabase/middleware.ts",
  "src/lib/auth/actions.ts",
  "src/lib/auth/session.ts",
  "src/components/layout/auth-status.tsx",
  "src/components/auth/protected-page.tsx",
  "src/app/auth/login/page.tsx",
  "src/app/auth/signup/page.tsx",
  "src/app/auth/callback/route.ts",
  "src/app/auth/signout/route.ts",
  "src/lib/profile/queries.ts",
  "src/components/profile/profile-summary-card.tsx",
  "docs/setup/SUPABASE_SETUP.md",
  "docs/setup/AUTH_SMOKE_TEST.md",
  "docs/setup/PROTECTED_ROUTES.md",
  "scripts/audit-phase-3.mjs",
]) {
  requireFile(file);
}

pass("Phase 3 auth/Supabase files are present");

console.log("\n=== Phase 4 SQL spine ===");
for (const file of [
  "supabase/migrations/0001_profiles_and_carnos_profiles.sql",
  "supabase/migrations/0002_audit_and_ai_actions.sql",
  "supabase/migrations/0003_chat_foundation.sql",
  "supabase/migrations/0004_goals_foundation.sql",
  "supabase/migrations/0005_daily_logs_and_proof_items.sql",
  "supabase/migrations/0006_tasks_and_events.sql",
  "scripts/validate-sql-migrations.mjs",
  "scripts/audit-phase-4.mjs",
  "src/types/database.ts",
  "src/lib/repositories/core-read.ts",
  "src/lib/repositories/index.ts",
  "docs/database/CORE_SQL_SPINE.md",
  "docs/phase-reports/PHASE_4_CORE_SQL_SPINE_REPORT.md",
]) {
  requireFile(file);
}

const phase4Sql = [
  "supabase/migrations/0002_audit_and_ai_actions.sql",
  "supabase/migrations/0003_chat_foundation.sql",
  "supabase/migrations/0004_goals_foundation.sql",
  "supabase/migrations/0005_daily_logs_and_proof_items.sql",
  "supabase/migrations/0006_tasks_and_events.sql",
]
  .map((file) => read(file))
  .join("\n\n");

for (const table of [
  "audit_logs",
  "ai_actions",
  "chat_sessions",
  "chat_messages",
  "goals",
  "goal_milestones",
  "daily_logs",
  "proof_items",
  "tasks",
  "events",
]) {
  requireIncludes(
    phase4Sql,
    `create table if not exists public.${table}`,
    `Missing Phase 4 table migration for ${table}`,
  );

  requireIncludes(
    phase4Sql,
    `alter table public.${table} enable row level security`,
    `Missing RLS enablement for ${table}`,
  );

  requireIncludes(
    phase4Sql,
    `${table}_user_id_idx`,
    `Missing user_id index for ${table}`,
  );
}

for (const forbidden of [
  "create table if not exists public.memory_items",
  "referencespublic.",
  "$begin:",
  "$end:",
]) {
  if (normalize(phase4Sql).includes(normalize(forbidden))) {
    fail(`Forbidden/corrupted SQL marker found: ${forbidden}`);
  }
}

pass("Phase 4 SQL spine tables, RLS, indexes, and forbidden markers look correct");


console.log("\n=== Phase 5 read UI integration ===");

for (const file of [
  "docs/phase-plans/PHASE_5_CORE_READ_UI_INTEGRATION.md",
  "docs/phase-reports/PHASE_5_CORE_READ_UI_INTEGRATION_REPORT.md",
  "scripts/audit-phase-5.mjs",
  "src/lib/dashboard/auth.ts",
  "src/components/dashboard/authenticated-dashboard-shell.tsx",
  "src/components/dashboard/domain-read-page.tsx",
]) {
  requireFile(file);
}

const phase5SourceMarkers = [
  ["src/app/command/page.tsx", "AuthenticatedDashboardShell"],
  ["src/app/goals/page.tsx", "listGoals"],
  ["src/app/timeline/page.tsx", "listAuditLogs"],
  ["src/app/carnos/page.tsx", "Generation disabled"],
  ["src/app/calendar/page.tsx", "listEvents"],
  ["src/app/world-class/page.tsx", "listProofItems"],
  ["src/app/analytics/page.tsx", "listDailyLogs"],
  ["src/app/career/page.tsx", "DomainReadPage"],
  ["src/app/learning/page.tsx", "DomainReadPage"],
  ["src/app/body/page.tsx", "DomainReadPage"],
];

for (const [file, marker] of phase5SourceMarkers) {
  const content = read(file);
  requireIncludes(content, marker, `${file} missing Phase 5 marker: ${marker}`);
}

const phase5Report = read("docs/phase-reports/PHASE_5_CORE_READ_UI_INTEGRATION_REPORT.md");

for (const phrase of [
  "Phase 5 Report",
  "Core Read UI Integration",
  "read-only",
  "Explicit Non-Scope",
  "Remaining Phase 5 Work",
]) {
  requireIncludes(phase5Report, phrase, `Phase 5 report missing: ${phrase}`);
}

const phase5Audit = read("scripts/audit-phase-5.mjs");

for (const phrase of [
  "Phase 5 audit passed",
  "no-write/no-memory/no-generation",
  "Read repository remains read-only",
]) {
  requireIncludes(phase5Audit, phrase, `Phase 5 audit missing: ${phrase}`);
}

pass("Phase 5 read UI integration files, report, and audit gate are present");


console.log("\n=== Phase 5.15 Python/ML intelligence architecture patch ===");

for (const file of [
  "docs/architecture/PYTHON_ML_INTELLIGENCE_WORKER.md",
  "docs/phase-plans/PHASE_5_15_PYTHON_ML_INTELLIGENCE_ARCHITECTURE_PATCH.md",
  "scripts/audit-python-ml-boundary.mjs"
]) {
  requireFile(file);
}

const pythonMlJsonText = fs.readFileSync(path.join(root, "docs/source-of-truth/ascendOS_Carnos_v1_1_COMPLETE_Source_of_Truth_FINAL_SYNCED.json"), "utf8");
const pythonMlJson = JSON.parse(pythonMlJsonText);

if (!pythonMlJson.python_ml_intelligence_worker) {
  fail("Source JSON missing python_ml_intelligence_worker");
}

const pythonMlBlock = JSON.stringify(pythonMlJson.python_ml_intelligence_worker);

for (const phrase of [
  "Python/ML Intelligence Worker",
  "Daily Priority Engine",
  "Goal Risk Predictor",
  "Proof-of-Work Scorer",
  "Career Readiness Engine",
  "Learning Optimizer",
  "Semantic Memory Retrieval",
  "Carnos Context Pack Builder",
  "Persona Router",
  "Life Trajectory Simulator",
  "Burnout / Drift Detector",
  "Health/Energy Pattern Detector",
  "Project Momentum Analyzer",
  "Resume/JD Fit Optimizer",
  "Networking and Referral Prioritizer",
  "Interview Weakness Detector",
  "Research/PhD Readiness Engine",
  "Decision Quality Analyzer",
  "Custom Tracker Intelligence",
  "ML Explainability Contract",
  "ML Output Audit Log",
  "Feedback Loop",
  "Cold-Start Mode",
  "Privacy Controls",
  "Versioned ML Output Schemas",
  "Human Override",
  "Evaluation Tests",
  "No Fake Metrics Rule",
  "Direct SQL Write Blocker",
  "Data Freshness Check",
  "Score Definitions",
  "Python/ML must never directly mutate SQL.",
  "Python/ML must never bypass Save/Edit/Cancel confirmation.",
  "Python/ML must never silently create memory."
]) {
  if (!pythonMlBlock.includes(phrase)) {
    fail(`python_ml_intelligence_worker missing required phrase: ${phrase}`);
  }
}

const pythonMlDoc = fs.readFileSync(path.join(root, "docs/architecture/PYTHON_ML_INTELLIGENCE_WORKER.md"), "utf8");

for (const phrase of [
  "Python/ML must never directly mutate SQL",
  "proposal -> validation -> Save/Edit/Cancel -> server write -> audit log -> timeline event -> dashboard refresh",
  "Health output stays pattern analysis only",
  "Finance output stays budgeting and pattern analysis only",
  "No fake ML accuracy",
  "The current Next.js build must not depend on Python"
]) {
  if (!pythonMlDoc.includes(phrase)) {
    fail(`Python/ML architecture doc missing required phrase: ${phrase}`);
  }
}

if (fs.existsSync(path.join(root, "apps/worker-python"))) {
  fail("apps/worker-python should not exist before Phase 11.");
}

if (fs.existsSync(path.join(root, "src/lib/memory"))) {
  fail("memory implementation should not exist before the memory phase.");
}

console.log("\n=== Type contracts ===");
const dbTypes = read("src/types/database.ts");

for (const exportName of [
  "export type Database",
  "export type Json",
  "export type ProfileRow",
  "export type CarnosProfileRow",
  "export type AuditLogRow",
  "export type AiActionRow",
  "export type ChatSessionRow",
  "export type ChatMessageRow",
  "export type GoalRow",
  "export type GoalMilestoneRow",
  "export type DailyLogRow",
  "export type ProofItemRow",
  "export type TaskRow",
  "export type EventRow",
  "confirmation_required",
  "onboarding_status",
]) {
  requireIncludes(dbTypes, exportName, `src/types/database.ts is missing ${exportName}`);
}

pass("Database type contracts include Phase 3 and Phase 4 aliases");

console.log("\n=== No premature write/memory features ===");
const repositories = read("src/lib/repositories/core-read.ts");

for (const forbiddenMutation of [".insert(", ".update(", ".delete(", ".upsert("]) {
  if (repositories.includes(forbiddenMutation)) {
    fail(`Read-only repository contains mutation call: ${forbiddenMutation}`);
  }
}

for (const forbiddenFile of [
  "src/lib/memory",
  "src/lib/carnos/write-actions.ts",
  "src/lib/repositories/core-write.ts",
]) {
  if (exists(forbiddenFile)) {
    fail(`Premature deferred feature exists: ${forbiddenFile}`);
  }
}

pass("No premature repository writes or memory implementation found");

console.log("\n=== Logs and phase markers ===");
const phaseStatus = read("PHASE_STATUS.md");
const executionLog = read("PROJECT_EXECUTION_LOG.md");
const changelog = read("CHANGELOG.md");
const codeLedger = read("CODE_LEDGER.md");

for (const phrase of [
  "Phase 1",
  "Phase 2",
  "Phase 3",
  "Phase 4",
  "Core SQL Spine",
]) {
  requireIncludes(phaseStatus, phrase, `PHASE_STATUS.md missing ${phrase}`);
}

for (const phrase of [
  "Phase 4.12",
  "Phase 4 Complete",
  "Core SQL Spine",
]) {
  requireIncludes(executionLog, phrase, `PROJECT_EXECUTION_LOG.md missing ${phrase}`);
}

requireIncludes(changelog, "Phase 4 Complete", "CHANGELOG.md missing Phase 4 completion entry");
requireIncludes(codeLedger, "Phase 4.12", "CODE_LEDGER.md missing Phase 4.12 entry");

pass("Logs and phase markers are present");

console.log("\nSource alignment audit passed: Phases 1–5 plus Phase 5.15 are structurally aligned with the FINAL_SYNCED DOCX/JSON and current code gates.");

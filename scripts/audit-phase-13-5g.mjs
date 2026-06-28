import fs from "node:fs";
import path from "node:path";

const root = process.cwd();

const reportPath = "docs/audits/PHASE_1_13_5_FULL_SOURCE_SCOPE_AUDIT.md";

const sourceDocx =
  "docs/source-of-truth/ascendOS_Carnos_v1_1_COMPLETE_Implementation_Bible_FINAL_SYNCED.docx";
const sourceJson =
  "docs/source-of-truth/ascendOS_Carnos_v1_1_COMPLETE_Source_of_Truth_FINAL_SYNCED.json";

const errors = [];
const rows = [];
const futureRows = [];

function exists(file) {
  return fs.existsSync(path.join(root, file));
}

function read(file) {
  const full = path.join(root, file);
  if (!fs.existsSync(full)) return "";
  return fs.readFileSync(full, "utf8");
}

function readBinaryLength(file) {
  const full = path.join(root, file);
  if (!fs.existsSync(full)) return 0;
  return fs.readFileSync(full).length;
}

function fail(message) {
  errors.push(message);
}

function walk(dir, predicate = () => true) {
  const base = path.join(root, dir);
  if (!fs.existsSync(base)) return [];

  const out = [];

  function visit(current) {
    const entries = fs.readdirSync(current, { withFileTypes: true });

    for (const entry of entries) {
      const full = path.join(current, entry.name);
      const rel = path.relative(root, full);

      if (entry.isDirectory()) {
        if (
          entry.name === "node_modules" ||
          entry.name === ".next" ||
          entry.name === ".git" ||
          entry.name === ".vercel" ||
          entry.name === "coverage" ||
          entry.name === "dist" ||
          entry.name === "build"
        ) {
          continue;
        }

        visit(full);
        continue;
      }

      if (entry.isFile() && predicate(rel)) out.push(rel);
    }
  }

  visit(base);
  return out.sort();
}

const textExts = new Set([
  ".ts",
  ".tsx",
  ".js",
  ".jsx",
  ".mjs",
  ".cjs",
  ".sql",
  ".md",
  ".json",
  ".txt",
]);

function isTextFile(file) {
  return textExts.has(path.extname(file));
}

/**
 * Important:
 * Completed/repaired scope can be proven by implementation + docs.
 * Future-phase "premature implementation" must ONLY scan executable/product implementation areas.
 *
 * Do NOT scan:
 * - docs/source-of-truth
 * - docs/audits/source_scope_snapshot_*
 * - docs/phase-reports
 * - docs/qa
 * - audit scripts themselves
 *
 * Those places are allowed to mention future features as planning/classification text.
 */
const evidenceFiles = [
  ...walk("src", isTextFile),
  ...walk("supabase", isTextFile),
  ...walk("docs", (file) => {
    if (!isTextFile(file)) return false;
    if (file.startsWith("docs/source-of-truth/")) return false;
    if (file.startsWith("docs/audits/source_scope_snapshot_")) return false;
    return true;
  }),
  ...walk("scripts", (file) => {
    if (!isTextFile(file)) return false;
    if (file === "scripts/audit-phase-13-5g.mjs") return false;
    if (file === "scripts/audit-phase-13-5g-full-source-scope.py") return false;
    return true;
  }),
];

const implementationFiles = [
  ...walk("src", isTextFile),
  ...walk("supabase/migrations", isTextFile),
].filter((file) => {
  // Exclude placeholder decision copy from future implementation checks.
  // It can mention "Phase 17", "Phase 18", "Post-v1", etc. as decision text.
  if (file === "src/lib/placeholder-route-decisions.ts") return false;
  return true;
});

const evidenceText = evidenceFiles.map((file) => `\n\n===== ${file} =====\n${read(file)}`).join("");
const implementationText = implementationFiles.map((file) => `\n\n===== ${file} =====\n${read(file)}`).join("");

function hasAny(markers, text = evidenceText) {
  return markers.some((marker) => text.includes(marker));
}

function requireAny(area, markers, note) {
  const ok = hasAny(markers);
  rows.push({
    area,
    classification: "Built / repaired / classified",
    status: ok ? "PASS" : "FAIL",
    markers: markers.join(", "),
    notes: note,
  });
  if (!ok) fail(`${area}: missing evidence marker; expected one of: ${markers.join(", ")}`);
}

function requireFile(area, files, note) {
  const missing = files.filter((file) => !exists(file));
  rows.push({
    area,
    classification: "Required file",
    status: missing.length === 0 ? "PASS" : "FAIL",
    markers: files.join(", "),
    notes: note,
  });
  for (const file of missing) fail(`${area}: missing required file ${file}`);
}

function forbidImplementation(area, lockedPhase, markers) {
  const hits = markers.filter((marker) => implementationText.includes(marker));
  futureRows.push({
    area,
    lockedPhase,
    status: hits.length === 0 ? "PASS" : "FAIL",
    markers: hits.length ? hits.join("; ") : "-",
  });

  for (const hit of hits) {
    fail(`${area}: future-phase implementation marker exists too early: ${hit}`);
  }
}

console.log("=== PHASE 13.5G FINAL FULL SOURCE SCOPE AUDIT ===");

requireFile("Source-of-truth files", [sourceDocx, sourceJson], "FINAL_SYNCED DOCX/JSON must remain present.");
requireFile(
  "Phase 13.5 reports",
  [
    "docs/phase-reports/PHASE_13_5A_FORMAL_GAP_LOCK_REPORT.md",
    "docs/phase-reports/PHASE_13_5B_CARNOS_PERSONA_COMPLETION_REPORT.md",
    "docs/phase-reports/PHASE_13_5C_CALENDAR_TIMELINE_ROUTINE_COMPLETION_REPORT.md",
    "docs/phase-reports/PHASE_13_5D_CAREER_PREP_COMPLETION_REPORT.md",
    "docs/phase-reports/PHASE_13_5E_SETTINGS_PRIVACY_COMPLETION_REPORT.md",
    "docs/phase-reports/PHASE_13_5F_PLACEHOLDER_ROUTE_DECISION_REPORT.md",
    "docs/phase-reports/PHASE_13_5G_FINAL_SOURCE_COVERAGE_AUDIT.md",
  ],
  "Every repair step must have a report."
);
requireFile(
  "Phase 13.5 QA checklists",
  [
    "docs/qa/PHASE_13_5B_CARNOS_PERSONA_MANUAL_SMOKE_CHECKLIST.md",
    "docs/qa/PHASE_13_5C_CALENDAR_TIMELINE_ROUTINE_MANUAL_SMOKE_CHECKLIST.md",
    "docs/qa/PHASE_13_5D_CAREER_PREP_MANUAL_SMOKE_CHECKLIST.md",
    "docs/qa/PHASE_13_5E_SETTINGS_PRIVACY_MANUAL_SMOKE_CHECKLIST.md",
    "docs/qa/PHASE_13_5F_PLACEHOLDER_ROUTE_DECISION_MANUAL_SMOKE_CHECKLIST.md",
    "docs/qa/PHASE_13_5G_FINAL_SOURCE_COVERAGE_MANUAL_SMOKE_CHECKLIST.md",
  ],
  "Manual smoke coverage must exist before Phase 14."
);

requireAny("Source-of-truth foundation", ["SOURCE_OF_TRUTH.md", "FINAL_SYNCED"], "Source hierarchy is locked.");
requireAny("Auth / Supabase / protected shell", ["profiles", "carnos_profiles", "src/lib/supabase/server.ts"], "Auth foundation exists.");
requireAny("Core operating SQL spine", ["goals", "tasks", "events", "daily_logs", "proof_items", "ai_actions"], "Core tables exist.");
requireAny("Safe proposed-action write flow", ["createProposedAction", "executeApprovedAction", "pending_confirmation"], "Confirmation-before-write exists.");

requireAny("Carnos text chat and persona repair", ["chat_sessions", "chat_messages", "persona_prompt_versions"], "Phase 13.5B repaired Carnos text/persona foundation.");
requireAny("Calendar / timeline / routine repair", ["calendar_blocks", "routines", "routine_steps", "reminders"], "Phase 13.5C repaired calendar/routine/reminder scope.");
requireAny("Career prep repair", ["behavioral_stories", "question_bank", "mock_interviews", "resume_usage"], "Phase 13.5D repaired career prep gaps.");
requireAny("Settings / privacy repair", ["app_settings", "privacy_settings"], "Phase 13.5E repaired settings/privacy foundation.");

requireAny(
  "Placeholder route decision lock",
  [
    "PLACEHOLDER_ROUTE_DECISIONS",
    "INTENTIONAL_PLACEHOLDER_ROUTES",
    "intentional_deferred_route",
    "Carnos display-name rename",
    "Carnos rename",
    "display-name rename remains final polish",
  ],
  "Phase 13.5F locks remaining placeholders and keeps Carnos rename deferred."
);

requireAny("Career system", ["job_applications", "networking_contacts", "job_referrals", "resume_versions", "interviews"], "Phase 8 career surfaces exist.");
requireAny("Learning and projects system", ["skill_paths", "learning_sessions", "quizzes", "projects", "project_milestones", "project_bugs", "project_releases"], "Phase 9 learning/projects exist.");
requireAny("Research and Stanford / PhD system", ["research_ideas", "research_questions", "research_papers", "target_professors", "sop_versions"], "Phase 10 research/Stanford exists.");
requireAny("Health/body system", ["body_logs", "workouts", "nutrition_logs", "sleep_logs", "skincare_logs", "haircare_logs"], "Phase 11 health/body exists.");
requireAny("Life admin / finance system", ["financial_accounts", "budget_categories", "subscriptions", "documents", "housing_options"], "Phase 12 life admin/finance exists.");
requireAny("Grimoire system", ["grimoire_modes", "grimoire_daily_logs", "grimoire_skills", "grimoire_corruption_checks", "grimoire_reversions"], "Phase 13 Grimoire exists.");

const canonicalRoutesText = read("src/lib/routes.ts");
const placeholderDecisionText = read("src/lib/placeholder-route-decisions.ts");

const expectedPlaceholders = [
  "/creativity",
  "/custom-trackers",
  "/decisions",
  "/experiments",
  "/future-simulator",
];

for (const route of expectedPlaceholders) {
  if (!canonicalRoutesText.includes(route)) fail(`Canonical route missing: ${route}`);
  if (!placeholderDecisionText.includes(route)) fail(`Intentional placeholder decision missing: ${route}`);
}

const placeholderPageHits = walk("src/app", isTextFile).filter((file) =>
  read(file).includes("PlaceholderDashboardPage"),
);

const expectedPlaceholderFiles = [
  "src/app/creativity/page.tsx",
  "src/app/custom-trackers/page.tsx",
  "src/app/decisions/page.tsx",
  "src/app/experiments/page.tsx",
  "src/app/future-simulator/page.tsx",
];

for (const file of expectedPlaceholderFiles) {
  if (!placeholderPageHits.includes(file)) {
    fail(`Expected intentional placeholder page missing: ${file}`);
  }
}

for (const file of placeholderPageHits) {
  if (file === "src/components/dashboard/placeholder-dashboard-page.tsx") continue;
  if (!expectedPlaceholderFiles.includes(file)) {
    fail(`Unexpected placeholder page still exists: ${file}`);
  }
}

/**
 * Future-phase implementation checks.
 * These are scanned only against product implementation files:
 * - src/**
 * - supabase/migrations/**
 *
 * Future terms inside docs/source/snapshots/reports/scripts are allowed.
 */
forbidImplementation("Voice Foundation", "Phase 14", [
  "create table if not exists public.voice_sessions",
  "create table if not exists public.voice_transcripts",
  "navigator.mediaDevices",
  "MediaRecorder",
]);

forbidImplementation("Memory / RAG", "Phase 15", [
  "create table if not exists public.memory_items",
  "create table if not exists public.embeddings",
  "pgvector",
  "match_documents",
]);

forbidImplementation("Web Search / Internet Tools", "Phase 16", [
  "create table if not exists public.web_search_runs",
  "Tavily",
  "SerpAPI",
]);

forbidImplementation("Analytics / Experiments Engine", "Phase 17", [
  "create table if not exists public.analytics_snapshots",
  "create table if not exists public.experiment_results",
]);

forbidImplementation("Custom Tracker Builder", "Phase 18", [
  "create table if not exists public.tracker_definitions",
  "create table if not exists public.tracker_entries",
]);

forbidImplementation("Full Export / Delete / Private Mode Controls", "Phase 19", [
  "deleteAllUserData",
  "exportAllUserData",
  "hardDeleteUser",
]);

const packageJson = JSON.parse(read("package.json"));
if (!packageJson.scripts?.["audit:phase13_5g"]) {
  fail("package.json missing audit:phase13_5g script.");
}
if (!packageJson.scripts?.check?.includes("audit:phase13_5g")) {
  fail("npm run check missing audit:phase13_5g.");
}

for (const log of ["PROJECT_EXECUTION_LOG.md", "CODE_LEDGER.md", "CHANGELOG.md", "PHASE_STATUS.md"]) {
  if (!read(log).includes("Phase 13.5G")) {
    fail(`${log} missing Phase 13.5G marker.`);
  }
}

const now = new Date().toISOString();

const md = `# Phase 1–13.5 Full Source Scope Audit

Generated: ${now}

Status: ${errors.length === 0 ? "PASS" : "FAIL"}

## Purpose

This Phase 13.5G audit is the final full source-scope closure check before Phase 14 Voice Foundation.

It compares the FINAL_SYNCED DOCX/JSON source hierarchy, repaired Phase 13.5 scope, repository implementation evidence, route coverage, SQL migrations, audit gates, reports, manual QA artifacts, and intentionally deferred future scope.

## Source inputs

- DOCX: \`${sourceDocx}\`
- JSON: \`${sourceJson}\`
- DOCX byte length: ${readBinaryLength(sourceDocx)}
- JSON character length: ${read(sourceJson).length}
- Repository evidence files scanned: ${evidenceFiles.length}
- Product implementation files scanned for future leaks: ${implementationFiles.length}
- SQL migration count: ${walk("supabase/migrations", (file) => file.endsWith(".sql")).length}

## Completed / repaired / classified scope

| Area | Classification | Status | Evidence markers | Notes |
|---|---|---:|---|---|
${rows
  .map(
    (row) =>
      `| ${row.area} | ${row.classification} | ${row.status} | ${row.markers.replaceAll("|", "\\|")} | ${row.notes.replaceAll("|", "\\|")} |`,
  )
  .join("\n")}

## Future / deferred / post-v1 scope

| Area | Locked phase | Status | Premature implementation markers |
|---|---|---:|---|
${futureRows
  .map(
    (row) =>
      `| ${row.area} | ${row.lockedPhase} | ${row.status} | ${row.markers.replaceAll("|", "\\|")} |`,
  )
  .join("\n")}

## Route coverage

- Intentional placeholders:
${expectedPlaceholders.map((route) => `  - \`${route}\``).join("\n")}

- Placeholder implementation files:
${placeholderPageHits.map((file) => `  - \`${file}\``).join("\n")}

## Phase 13.5 repaired schema markers

- \`persona_prompt_versions\`
- \`calendar_blocks\`
- \`routines\`
- \`routine_steps\`
- \`reminders\`
- \`behavioral_stories\`
- \`question_bank\`
- \`mock_interviews\`
- \`resume_usage\`
- \`app_settings\`
- \`privacy_settings\`

## Future-phase scan boundary

Future-phase implementation leakage is checked only against product implementation files:

- \`src/**\`
- \`supabase/migrations/**\`

The audit intentionally does not count future terms inside source-of-truth documents, snapshot artifacts, phase reports, QA docs, roadmap docs, or audit scripts as implementation. Those documents are allowed to describe future scope.

## Errors

${
  errors.length === 0
    ? "- None"
    : errors.map((error) => `- ${error}`).join("\n")
}

## Final decision

${
  errors.length === 0
    ? "Phase 13.5G passes. Phase 14 Voice Foundation may begin after this audit, full check, commit, and push."
    : "Phase 14 must not start. Fix the errors above, rerun `npm run audit:phase13_5g`, then rerun `npm run check`."
}
`;

fs.mkdirSync(path.dirname(path.join(root, reportPath)), { recursive: true });
fs.writeFileSync(path.join(root, reportPath), md);

if (errors.length > 0) {
  console.error("\n=== PHASE 13.5G FULL SOURCE SCOPE AUDIT FAILED ===");
  for (const error of errors) console.error(`✗ ${error}`);
  console.error(`\nReport written: ${reportPath}`);
  process.exit(1);
}

console.log("✓ Source-of-truth files present");
console.log("✓ Phase 13.5 reports and QA artifacts present");
console.log("✓ Completed/repaired scope through Phase 13.5 has repository evidence");
console.log("✓ Only five intentional placeholder routes remain");
console.log("✓ Future-phase implementation scan is clean");
console.log("✓ package.json check gate includes audit:phase13_5g");
console.log("✓ Phase 13.5G logs/status markers present");
console.log(`\nReport written: ${reportPath}`);
console.log("\nPhase 13.5G full source scope audit passed.");

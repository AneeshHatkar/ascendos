import { existsSync, readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";

const root = process.cwd();
const reportPath = join(root, "docs/phase-reports/DOMAIN_OPERATIONAL_MATRIX_AUDIT.md");

function read(path) {
  const full = join(root, path);
  return existsSync(full) ? readFileSync(full, "utf8") : "";
}

function has(path, marker) {
  return read(path).includes(marker);
}

const domains = [
  {
    name: "Command",
    pages: ["src/app/command/page.tsx"],
    components: ["src/components/dashboard/command-dashboard-v1.tsx"],
    helpers: ["src/lib/dashboard/dashboard-data-helpers.ts"],
    repositories: ["src/lib/repositories/core-read.ts"],
    tables: ["goals", "tasks", "events", "proof_items", "ai_actions"],
  },
  {
    name: "Goals",
    pages: ["src/app/goals/page.tsx"],
    components: ["src/components/dashboard/goals-dashboard-v1.tsx"],
    helpers: ["src/lib/dashboard/dashboard-data-helpers.ts"],
    repositories: ["src/lib/repositories/core-read.ts"],
    tables: ["goals", "goal_milestones", "tasks", "proof_items"],
  },
  {
    name: "CalendarTimeline",
    pages: ["src/app/calendar/page.tsx", "src/app/timeline/page.tsx"],
    components: ["src/components/dashboard/calendar-dashboard-v1.tsx", "src/components/dashboard/timeline-dashboard-v1.tsx"],
    helpers: ["src/lib/dashboard/calendar-routine-dashboard-data-helpers.ts"],
    repositories: ["src/lib/repositories/calendar-routine-read.ts", "src/lib/repositories/core-read.ts"],
    tables: ["events", "tasks", "calendar_blocks", "routines", "routine_steps", "reminders"],
  },
  {
    name: "Career",
    pages: ["src/app/career/page.tsx", "src/app/interviews/page.tsx", "src/app/networking/page.tsx", "src/app/resume/page.tsx"],
    components: [
      "src/components/dashboard/career-dashboard-v1.tsx",
      "src/components/dashboard/interviews-dashboard-v1.tsx",
      "src/components/dashboard/networking-dashboard-v1.tsx",
      "src/components/dashboard/resume-dashboard-v1.tsx"
    ],
    helpers: ["src/lib/dashboard/career-dashboard-data-helpers.ts", "src/lib/dashboard/career-prep-dashboard-data-helpers.ts"],
    repositories: ["src/lib/repositories/core-read.ts", "src/lib/repositories/career-prep-read.ts"],
    tables: ["job_applications", "job_referrals", "networking_contacts", "networking_interactions", "resume_versions", "resume_bullets", "interviews", "mock_interviews", "question_bank"],
  },
  {
    name: "LearningProjects",
    pages: ["src/app/learning/page.tsx", "src/app/projects/page.tsx", "src/app/knowledge/page.tsx"],
    components: [
      "src/components/dashboard/learning-academy-dashboard-v1.tsx",
      "src/components/dashboard/project-builder-dashboard-v1.tsx",
      "src/components/dashboard/knowledge-vault-foundation-panel.tsx",
      "src/components/dashboard/knowledge-vault-alignment-v1.tsx"
    ],
    helpers: ["src/lib/dashboard/learning-project-dashboard-data-helpers.ts"],
    repositories: ["src/lib/repositories/core-read.ts", "src/lib/repositories/memory-knowledge-read.ts"],
    tables: ["skills", "skill_progress", "projects", "project_links", "project_milestones", "knowledge_items", "knowledge_tags", "knowledge_links"],
  },
  {
    name: "Research",
    pages: ["src/app/research-lab/page.tsx", "src/app/research-stanford/page.tsx"],
    components: [
      "src/components/dashboard/research-summary-panel.tsx",
      "src/components/dashboard/research-detail-panels.tsx",
      "src/components/dashboard/research-current-info-source-panel.tsx"
    ],
    helpers: ["src/lib/dashboard/research-stanford-dashboard-data-helpers.ts"],
    repositories: ["src/lib/repositories/research-read.ts", "src/lib/repositories/current-info-read.ts"],
    tables: ["research_ideas", "research_literature_items", "research_papers", "research_claims", "research_results", "target_universities", "target_labs", "target_professors"],
  },
  {
    name: "HealthBody",
    pages: [
      "src/app/body/page.tsx",
      "src/app/nutrition/page.tsx",
      "src/app/sleep-energy/page.tsx",
      "src/app/supplements/page.tsx",
      "src/app/hair-skincare/page.tsx",
      "src/app/emotion/page.tsx"
    ],
    components: [
      "src/components/dashboard/health-body-dashboard-v1.tsx",
      "src/components/dashboard/health-body-nutrition-dashboard-v1.tsx",
      "src/components/dashboard/health-body-sleep-energy-dashboard-v1.tsx",
      "src/components/dashboard/health-body-supplements-dashboard-v1.tsx",
      "src/components/dashboard/health-body-hair-skincare-dashboard-v1.tsx",
      "src/components/dashboard/health-body-emotion-dashboard-v1.tsx"
    ],
    helpers: ["src/lib/dashboard/health-body-dashboard-data-helpers.ts"],
    repositories: ["src/lib/repositories/health-body-read.ts"],
    tables: ["body_logs", "workouts", "nutrition_logs", "meal_items", "supplements", "supplement_logs", "sleep_logs", "energy_logs", "mental_health_logs", "emotion_logs", "skincare_logs", "haircare_logs", "products"],
  },
  {
    name: "AdminFinance",
    pages: ["src/app/finance/page.tsx", "src/app/life-admin/page.tsx", "src/app/housing/page.tsx", "src/app/documents/page.tsx"],
    components: ["src/components/dashboard/admin-finance-dashboard-v1.tsx"],
    helpers: ["src/lib/dashboard/admin-finance-dashboard-data-helpers.ts"],
    repositories: ["src/lib/repositories/admin-finance-read.ts"],
    tables: ["financial_accounts", "budget_categories", "financial_logs", "subscriptions", "documents", "housing_options", "housing_contacts", "reminders"],
  },
  {
    name: "Grimoire",
    pages: ["src/app/grimoire/page.tsx"],
    components: ["src/components/dashboard/grimoire-dashboard-v1.tsx"],
    helpers: ["src/lib/dashboard/grimoire-dashboard-data-helpers.ts"],
    repositories: ["src/lib/repositories/grimoire-read.ts"],
    tables: ["grimoire_modes", "grimoire_daily_logs", "grimoire_skills", "grimoire_corruption_checks", "grimoire_reversions"],
  },
  {
    name: "MemoryKnowledgeCarnos",
    pages: ["src/app/carnos/page.tsx", "src/app/knowledge/page.tsx", "src/app/privacy/page.tsx"],
    components: [
      "src/components/dashboard/carnos-memory-visibility-panel.tsx",
      "src/components/dashboard/cross-domain-memory-integration-panel.tsx",
      "src/components/dashboard/knowledge-vault-foundation-panel.tsx",
      "src/components/dashboard/memory-inbox-preview-panel.tsx",
      "src/components/dashboard/memory-audit-usage-transparency-panel.tsx"
    ],
    helpers: [],
    repositories: [
      "src/lib/repositories/approved-memory-write.ts",
      "src/lib/repositories/memory-inbox-write.ts",
      "src/lib/repositories/memory-knowledge-read.ts"
    ],
    tables: ["memory_items", "memory_candidates", "memory_review_queue", "memory_events", "memory_usage_logs", "memory_retrieval_events", "knowledge_items", "knowledge_tags", "knowledge_links", "project_memory_state", "system_memory_state", "carnos_context_snapshots", "retrieval_logs"],
  },
  {
    name: "CustomTrackers",
    pages: ["src/app/custom-trackers/page.tsx"],
    components: ["src/components/custom-trackers/custom-trackers-dashboard-ui.tsx"],
    helpers: [],
    repositories: [],
    tables: [],
  },
  {
    name: "SpotifyConnector",
    pages: ["src/app/privacy/page.tsx"],
    components: ["src/components/privacy/privacy-dashboard-ui.tsx"],
    helpers: [],
    repositories: [],
    tables: ["connector_accounts", "connector_tokens"],
  },
];

function fileExists(path) {
  return existsSync(join(root, path));
}

function sourceHasRuntimeRead(path) {
  const text = read(path);
  return text.includes(".from(") || text.includes("createSupabaseServerClient") || text.includes("@/lib/repositories") || text.includes("@/lib/dashboard");
}

function sourceHasNoRuntimeBoundary(path) {
  return /no runtime database reads|no runtime database writes|runtime .* disabled|preview only|persistence remains deferred|No Supabase calls|No SQL reads\/writes|No memory_retrieval_events writes/i.test(read(path));
}

const rows = domains.map((domain) => {
  const pageExists = domain.pages.every(fileExists);
  const componentExists = domain.components.every(fileExists);
  const helperExists = domain.helpers.every(fileExists);
  const repoExists = domain.repositories.every(fileExists);

  const repoRuntimeRead = domain.repositories.some(sourceHasRuntimeRead);
  const helperRuntimeRead = domain.helpers.some(sourceHasRuntimeRead);
  const componentRuntimeRead = domain.components.some(sourceHasRuntimeRead);
  const noRuntimeBoundary = [...domain.pages, ...domain.components, ...domain.helpers, ...domain.repositories].some(sourceHasNoRuntimeBoundary);

  const tableCoverage = domain.tables.map((table) => {
    const repoHit = domain.repositories.some((repo) => read(repo).includes(`.from("${table}")`) || read(repo).includes(table));
    const helperHit = domain.helpers.some((helper) => read(helper).includes(table));
    const componentHit = domain.components.some((component) => read(component).includes(table));
    return { table, repoHit, helperHit, componentHit };
  });

  const missingRepoTables = tableCoverage.filter((item) => !item.repoHit).map((item) => item.table);

  let status = "verified_or_likely_connected";
  const risks = [];

  if (!pageExists) risks.push("missing page file");
  if (!componentExists) risks.push("missing component file");
  if (domain.repositories.length > 0 && !repoExists) risks.push("missing repository file");
  if (domain.repositories.length === 0) risks.push("no repository declared for domain");
  if (domain.repositories.length > 0 && !repoRuntimeRead) risks.push("repository has no runtime Supabase read signal");
  if (domain.tables.length > 0 && missingRepoTables.length > 0) risks.push("tables missing repository coverage: " + missingRepoTables.join(", "));
  if (noRuntimeBoundary) risks.push("domain contains explicit no-runtime/deferred boundary text");

  if (risks.length > 0) status = "needs_review_or_fix";
  if (domain.name === "SpotifyConnector") status = "not_connected";
  if (domain.name === "CustomTrackers") status = "boundary_only_not_runtime";

  return {
    ...domain,
    pageExists,
    componentExists,
    helperExists,
    repoExists,
    repoRuntimeRead,
    helperRuntimeRead,
    componentRuntimeRead,
    noRuntimeBoundary,
    missingRepoTables,
    status,
    risks,
  };
});

const lines = [];
lines.push("# Domain Operational Matrix Audit");
lines.push("");
lines.push("Generated audit. No code changes. No completion claim.");
lines.push("");
lines.push("## Summary");
lines.push("");
lines.push(`- Domains checked: ${rows.length}`);
lines.push(`- Verified or likely connected: ${rows.filter((row) => row.status === "verified_or_likely_connected").length}`);
lines.push(`- Needs review/fix: ${rows.filter((row) => row.status === "needs_review_or_fix").length}`);
lines.push(`- Boundary-only: ${rows.filter((row) => row.status === "boundary_only_not_runtime").length}`);
lines.push(`- Not connected: ${rows.filter((row) => row.status === "not_connected").length}`);
lines.push("");
lines.push("## Domain Status");
lines.push("");
for (const row of rows) {
  lines.push(`### ${row.name}`);
  lines.push(`- Status: ${row.status}`);
  lines.push(`- Pages exist: ${row.pageExists ? "yes" : "no"}`);
  lines.push(`- Components exist: ${row.componentExists ? "yes" : "no"}`);
  lines.push(`- Helpers exist: ${row.helperExists ? "yes" : "no"}`);
  lines.push(`- Repositories exist: ${row.repoExists ? "yes" : "no"}`);
  lines.push(`- Repository runtime read signal: ${row.repoRuntimeRead ? "yes" : "no"}`);
  lines.push(`- Helper runtime read signal: ${row.helperRuntimeRead ? "yes" : "no"}`);
  lines.push(`- Component runtime read signal: ${row.componentRuntimeRead ? "yes" : "no"}`);
  lines.push(`- Explicit no-runtime/deferred boundary: ${row.noRuntimeBoundary ? "yes" : "no"}`);
  lines.push(`- Missing repository table coverage: ${row.missingRepoTables.length ? row.missingRepoTables.join(", ") : "none"}`);
  lines.push(`- Risks: ${row.risks.length ? row.risks.join("; ") : "none"}`);
  lines.push("");
}

mkdirSync(dirname(reportPath), { recursive: true });
writeFileSync(reportPath, lines.join("\n") + "\n");

console.log("=== DOMAIN OPERATIONAL MATRIX AUDIT ===");
console.log("Report: docs/phase-reports/DOMAIN_OPERATIONAL_MATRIX_AUDIT.md");
for (const row of rows) {
  console.log(`${row.status.toUpperCase()} ${row.name}`);
  if (row.risks.length > 0) {
    for (const risk of row.risks) console.log(`  RISK ${risk}`);
  }
}

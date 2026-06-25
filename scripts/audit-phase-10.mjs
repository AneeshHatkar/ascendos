import { existsSync, readFileSync } from "node:fs";

let failures = 0;

function fail(message) {
  failures += 1;
  console.error(`✗ ${message}`);
}

function pass(message) {
  console.log(`✓ ${message}`);
}

function requireFile(path) {
  if (!existsSync(path)) {
    fail(`Missing ${path}`);
    return "";
  }

  pass(`Found ${path}`);
  return readFileSync(path, "utf8");
}

function requireIncludes(content, needle, message) {
  if (!content.includes(needle)) {
    fail(message);
    return;
  }

  pass(message);
}

function forbidIncludes(content, needle, message) {
  if (content.includes(needle)) {
    fail(message);
    return;
  }

  pass(message);
}

console.log("\n=== Phase 10 files ===");

const requiredFiles = [
  "docs/phase-plans/PHASE_10_RESEARCH_STANFORD_SYSTEM.md",
  "docs/database/PHASE_10_RESEARCH_SCHEMA_DESIGN.md",
  "docs/database/PHASE_10_STANFORD_PHD_SCHEMA_DESIGN.md",
  "docs/phase-reports/PHASE_10_SOURCE_TO_SCOPE_TRACEABILITY.md",
  "docs/qa/PHASE_10_RESEARCH_STANFORD_MANUAL_SMOKE_CHECKLIST.md",
  "docs/phase-reports/PHASE_10_RESEARCH_STANFORD_COMPLETION_REPORT_DRAFT.md",
  "supabase/migrations/0010_phase10_research_stanford_foundation.sql",
  "supabase/migrations/0011_phase10_parent_ownership_guards.sql",
  "src/types/database.ts",
  "src/lib/repositories/research-read.ts",
  "src/lib/dashboard/research-stanford-dashboard-data-helpers.ts",
  "src/components/dashboard/research-summary-panel.tsx",
  "src/components/dashboard/research-linkage-boundary-panels.tsx",
  "src/components/dashboard/research-detail-panels.tsx",
  "src/components/dashboard/research-proposed-action-visibility-panel.tsx",
  "src/components/dashboard/cross-dashboard-links.tsx",
  "src/app/research-lab/page.tsx",
  "src/app/research-stanford/page.tsx",
];

const fileText = new Map();

for (const file of requiredFiles) {
  fileText.set(file, requireFile(file));
}

console.log("\n=== Phase 10 SQL, types, and read helpers ===");

const researchMigration = fileText.get("supabase/migrations/0010_phase10_research_stanford_foundation.sql") ?? "";
const ownershipMigration = fileText.get("supabase/migrations/0011_phase10_parent_ownership_guards.sql") ?? "";
const databaseTypes = fileText.get("src/types/database.ts") ?? "";
const readHelpers = fileText.get("src/lib/repositories/research-read.ts") ?? "";

for (const table of [
  "research_ideas",
  "research_questions",
  "research_literature_items",
  "research_citations",
  "research_claims",
  "research_experiments",
  "research_results",
  "research_papers",
  "research_paper_versions",
  "research_venues",
  "research_submissions",
  "research_feedback",
  "target_universities",
  "target_labs",
  "target_professors",
  "phd_readiness_assessments",
  "phd_application_assets",
  "sop_versions",
  "recommendation_targets",
]) {
  requireIncludes(researchMigration, table, `Phase 10 migration includes ${table}`);
  requireIncludes(databaseTypes, table, `Database types include ${table}`);
}

for (const helper of [
  "listResearchIdeas",
  "listResearchQuestions",
  "listResearchLiteratureItems",
  "listResearchCitations",
  "listResearchClaims",
  "listResearchExperiments",
  "listResearchResults",
  "listResearchPapers",
  "listResearchPaperVersions",
  "listResearchVenues",
  "listResearchSubmissions",
  "listResearchFeedback",
  "listTargetUniversities",
  "listTargetLabs",
  "listTargetProfessors",
  "listPhdReadinessAssessments",
  "listPhdApplicationAssets",
  "listSopVersions",
  "listRecommendationTargets",
]) {
  requireIncludes(readHelpers, helper, `Research read repository exports ${helper}`);
}

for (const marker of [
  "project_id",
  "goal_id",
  "task_id",
  "proof_item_id",
  "resume_bullet_id",
]) {
  requireIncludes(ownershipMigration, marker, `Parent ownership guard includes ${marker}`);
}

for (const marker of [
  "create or replace function",
  "user_id",
  "raise exception",
]) {
  requireIncludes(ownershipMigration.toLowerCase(), marker, `Parent ownership guard includes ${marker}`);
}

console.log("\n=== Phase 10 dashboard and route wiring ===");

const dashboardIndex = requireFile("src/components/dashboard/index.ts");
const dashboardRegistry = requireFile("src/lib/dashboard/dashboard-card-registry.ts");
const dashboardLayout = requireFile("src/lib/dashboard/dashboard-layout-contract.ts");
const dashboardRegistryRouteMap = requireFile("src/lib/dashboard-registry.ts");
const routes = requireFile("src/lib/routes.ts");

for (const marker of [
  'export * from "./research-summary-panel";',
  'export * from "./research-linkage-boundary-panels";',
  'export * from "./research-detail-panels";',
  'export * from "./research-proposed-action-visibility-panel";',
]) {
  requireIncludes(dashboardIndex, marker, `Dashboard barrel includes ${marker}`);
}

for (const marker of [
  "research_lab",
  "research_stanford",
]) {
  requireIncludes(dashboardLayout, marker, `Dashboard layout supports ${marker}`);
}

for (const marker of [
  "research-lab-idea-pipeline",
  "research-lab-literature-citations",
  "research-stanford-target-fit",
  "research-stanford-application-readiness",
]) {
  requireIncludes(dashboardRegistry, marker, `Dashboard card registry includes ${marker}`);
}

for (const route of [
  "/research-lab",
  "/research-stanford",
]) {
  requireIncludes(routes, route, `Canonical routes include ${route}`);
  requireIncludes(dashboardRegistryRouteMap, route, `Dashboard registry includes ${route}`);
}

const labRoute = fileText.get("src/app/research-lab/page.tsx") ?? "";
const stanfordRoute = fileText.get("src/app/research-stanford/page.tsx") ?? "";

for (const marker of [
  "AuthenticatedDashboardShell",
  "ResearchCrossDashboardLinks",
  "ResearchSummaryPanel",
  "ResearchIdeaDetailPanel",
  "ResearchLiteratureDetailPanel",
  "ResearchClaimCitationDetailPanel",
  "ResearchExperimentResultDetailPanel",
  "ResearchPaperVenueDetailPanel",
  "ResearchProofLinkagePanel",
  "ResearchProposedActionVisibilityPanel",
  "ResearchStateBoundaryPanel",
]) {
  requireIncludes(labRoute, marker, `Research Lab route includes ${marker}`);
}

for (const marker of [
  "AuthenticatedDashboardShell",
  "ResearchCrossDashboardLinks",
  "ResearchSummaryPanel",
  "StanfordProfessorLabDetailPanel",
  "StanfordApplicationDetailPanel",
  "StanfordProofLinkagePanel",
  "ResearchProposedActionVisibilityPanel",
  "ResearchStateBoundaryPanel",
]) {
  requireIncludes(stanfordRoute, marker, `Research Stanford route includes ${marker}`);
}

console.log("\n=== Phase 10 protected boundaries ===");

const protectedFiles = [
  "src/lib/repositories/research-read.ts",
  "src/lib/dashboard/research-stanford-dashboard-data-helpers.ts",
  "src/components/dashboard/research-summary-panel.tsx",
  "src/components/dashboard/research-linkage-boundary-panels.tsx",
  "src/components/dashboard/research-detail-panels.tsx",
  "src/components/dashboard/research-proposed-action-visibility-panel.tsx",
  "src/app/research-lab/page.tsx",
  "src/app/research-stanford/page.tsx",
];

for (const file of protectedFiles) {
  const content = fileText.get(file) ?? requireFile(file);

  for (const marker of [
    ".insert(",
    ".update(",
    ".delete(",
    ".upsert(",
    "createProposedAction",
    "executeApprovedAction(",
    "openai",
    "OpenAI",
    "generateText",
    "streamText",
    "sendEmail",
    "fetch(",
    "setInterval(",
    "setTimeout(",
  ]) {
    forbidIncludes(content, marker, `${file} avoids forbidden marker: ${marker}`);
  }
}

const proposalPanel = fileText.get("src/components/dashboard/research-proposed-action-visibility-panel.tsx") ?? "";

for (const marker of [
  "ProposedActionReviewCard",
  "disabled",
  "does not save, cancel, execute, or persist",
  "no callbacks are wired",
  "create_task",
  "create_goal",
  "create_proof_item",
]) {
  requireIncludes(proposalPanel, marker, `Research proposed-action panel includes ${marker}`);
}

console.log("\n=== Phase 10 docs and logs ===");

const checklist = fileText.get("docs/qa/PHASE_10_RESEARCH_STANFORD_MANUAL_SMOKE_CHECKLIST.md") ?? "";
const completionReport = fileText.get("docs/phase-reports/PHASE_10_RESEARCH_STANFORD_COMPLETION_REPORT_DRAFT.md") ?? "";
const executionLog = requireFile("PROJECT_EXECUTION_LOG.md");
const codeLedger = requireFile("CODE_LEDGER.md");
const changelog = requireFile("CHANGELOG.md");

for (const marker of [
  "Research Lab",
  "Research Stanford",
  "Proposed-action visibility",
  "Privacy and safety checks",
]) {
  requireIncludes(checklist, marker, `Phase 10 smoke checklist includes ${marker}`);
}

for (const marker of [
  "Phase 10 Completion Report",
  "Research / Stanford System",
  "Verification gates",
  "Deferred scope",
  "Phase 11",
]) {
  requireIncludes(completionReport, marker, `Phase 10 completion report includes ${marker}`);
}

for (const marker of [
  "Phase 10 Chunk A",
  "Phase 10 Chunk I",
  "Phase 10 Chunk J",
]) {
  requireIncludes(executionLog, marker, `Execution log includes ${marker}`);
}

requireIncludes(codeLedger, "Phase 10 Chunk J", "Code ledger includes Phase 10 Chunk J");
requireIncludes(changelog, "Phase 10 Chunk J", "Changelog includes Phase 10 Chunk J");

if (failures > 0) {
  console.error(`\nPhase 10 audit failed with ${failures} issue(s).`);
  process.exit(1);
}

console.log("\nPhase 10 audit passed: research/Stanford system is structurally present, route-wired, exported, documented, and boundary-protected through Chunk J.");

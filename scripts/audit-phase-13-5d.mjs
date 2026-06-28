import fs from "node:fs";

const failures = [];

function read(path) {
  if (!fs.existsSync(path)) {
    failures.push(`Missing file: ${path}`);
    return "";
  }

  return fs.readFileSync(path, "utf8");
}

function requireIncludes(path, markers) {
  const text = read(path);

  for (const marker of markers) {
    if (!text.includes(marker)) {
      failures.push(`Missing marker in ${path}: ${marker}`);
    }
  }

  return text;
}

function requireExcludes(path, markers) {
  const text = read(path);

  for (const marker of markers) {
    if (text.includes(marker)) {
      failures.push(`Forbidden marker in ${path}: ${marker}`);
    }
  }
}

const requiredFiles = [
  "supabase/migrations/0020_phase13_5d_career_prep_foundation.sql",
  "src/lib/repositories/career-prep-read.ts",
  "src/lib/dashboard/career-prep-dashboard-data-helpers.ts",
  "src/components/dashboard/career-prep-foundation-panel.tsx",
  "src/app/career/page.tsx",
  "src/components/dashboard/career-dashboard-v1.tsx",
  "docs/database/PHASE_13_5D_CAREER_PREP_SCHEMA_DESIGN.md",
  "docs/phase-reports/PHASE_13_5D_CAREER_PREP_COMPLETION_REPORT.md",
  "docs/qa/PHASE_13_5D_CAREER_PREP_MANUAL_SMOKE_CHECKLIST.md",
];

for (const file of requiredFiles) {
  read(file);
}

requireIncludes("supabase/migrations/0020_phase13_5d_career_prep_foundation.sql", [
  "create table if not exists public.behavioral_stories",
  "create table if not exists public.question_bank",
  "create table if not exists public.mock_interviews",
  "create table if not exists public.resume_usage",
  "alter table public.behavioral_stories enable row level security;",
  "alter table public.question_bank enable row level security;",
  "alter table public.mock_interviews enable row level security;",
  "alter table public.resume_usage enable row level security;",
  "Users can view their own behavioral stories",
  "Users can view their own question bank",
  "Users can view their own mock interviews",
  "Users can view their own resume usage",
]);

requireIncludes("src/lib/repositories/career-prep-read.ts", [
  "listBehavioralStories",
  "listQuestionBank",
  "listMockInterviews",
  "listResumeUsage",
  ".from(\"behavioral_stories\")",
  ".from(\"question_bank\")",
  ".from(\"mock_interviews\")",
  ".from(\"resume_usage\")",
]);

requireExcludes("src/lib/repositories/career-prep-read.ts", [
  ".insert(",
  ".update(",
  ".delete(",
  ".upsert(",
  "createProposedAction",
  "executeApprovedAction",
  "generateText",
  "streamText",
  "OpenAI",
  "openai",
  "fetch(",
  "setInterval(",
  "setTimeout(",
]);

requireIncludes("src/lib/repositories/index.ts", [
  'export * from "./career-prep-read";',
]);

requireIncludes("src/lib/dashboard/index.ts", [
  'export * from "./career-prep-dashboard-data-helpers";',
]);

requireIncludes("src/components/dashboard/index.ts", [
  'export * from "./career-prep-foundation-panel";',
]);

requireIncludes("src/lib/dashboard/career-prep-dashboard-data-helpers.ts", [
  "getCareerPrepDashboardDataSummary",
  "behavioral_stories",
  "question_bank",
  "mock_interviews",
  "resume_usage",
  "read_only_boundary: true",
]);

requireExcludes("src/lib/dashboard/career-prep-dashboard-data-helpers.ts", [
  ".insert(",
  ".update(",
  ".delete(",
  ".upsert(",
  "createProposedAction",
  "executeApprovedAction",
  "generateText",
  "streamText",
  "OpenAI",
  "openai",
  "fetch(",
  "setInterval(",
  "setTimeout(",
]);

requireIncludes("src/components/dashboard/career-prep-foundation-panel.tsx", [
  "CareerPrepFoundationPanel",
  "Career prep foundation",
  "behavioral_stories",
  "question_bank",
  "mock_interviews",
  "resume_usage",
  "does not generate interview answers",
  "does not generate interview answers, rewrite resumes, apply to jobs",
]);

requireExcludes("src/components/dashboard/career-prep-foundation-panel.tsx", [
  ".from(",
  ".insert(",
  ".update(",
  ".delete(",
  ".upsert(",
  "createProposedAction",
  "executeApprovedAction",
  "generateText",
  "streamText",
  "OpenAI",
  "openai",
  "fetch(",
  "setInterval(",
  "setTimeout(",
]);

requireIncludes("src/app/career/page.tsx", [
  "getCareerPrepDashboardDataSummary",
  "careerPrepData",
]);

requireIncludes("src/components/dashboard/career-dashboard-v1.tsx", [
  "CareerPrepFoundationPanel",
  "careerPrepData",
]);

requireIncludes("docs/database/PHASE_13_5D_CAREER_PREP_SCHEMA_DESIGN.md", [
  "behavioral_stories",
  "question_bank",
  "mock_interviews",
  "resume_usage",
]);

requireIncludes("docs/phase-reports/PHASE_13_5D_CAREER_PREP_COMPLETION_REPORT.md", [
  "Phase 13.5D",
  "Career Prep",
  "Verification gates",
]);

requireIncludes("docs/qa/PHASE_13_5D_CAREER_PREP_MANUAL_SMOKE_CHECKLIST.md", [
  "/career",
  "No AI interview answer is generated",
  "No resume is rewritten",
  "No job application is sent",
]);

const pkg = JSON.parse(read("package.json"));
if (!pkg.scripts?.["audit:phase13_5d"]) {
  failures.push("package.json missing audit:phase13_5d script.");
}
if (!pkg.scripts?.check?.includes("audit:phase13_5d")) {
  failures.push("package.json check script does not include audit:phase13_5d.");
}

if (failures.length > 0) {
  console.error("Phase 13.5D audit failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log("Phase 13.5D career prep repair audit passed.");

#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import childProcess from "node:child_process";
import process from "node:process";

const ROOT = process.cwd();

const OUT_MD = "docs/phase-reports/PHASE_20Z_100_PERCENT_INTERCONNECTIVITY.md";
const OUT_JSON = "docs/fixtures/full-project-connectivity/phase_0_20_100_percent_interconnectivity.json";

const SPOTIFY_RUNTIME_REQUIRED = process.env.SPOTIFY_RUNTIME_REQUIRED === "1";

/**
 * This verifier is intentionally strict for Phase 0–20 v1 interconnectivity.
 *
 * It does not treat the repo being dirty as a blocker because the user wants
 * one final commit after all fixes, not one commit per fix.
 *
 * Spotify real runtime can be required later with:
 * SPOTIFY_RUNTIME_REQUIRED=1 node scripts/verify-phase-0-20-100-connectivity.mjs
 *
 * For the current pre-Spotify pass, Spotify is allowed only if it has explicit
 * v1/post-v1 boundary labeling.
 */

const FEATURE_CHAINS = [
  {
    name: "Command dashboard",
    phase: "0–7",
    routes: ["src/app/command/page.tsx"],
    helpers: [
      "src/lib/dashboard/dashboard-data-helpers.ts",
      "src/lib/dashboard/dashboard-card-registry.ts",
    ],
    components: ["src/components/dashboard/command-dashboard-v1.tsx"],
    repositories: [
      {
        file: "src/lib/repositories/core-read.ts",
        tables: ["goals", "goal_milestones", "proof_items", "tasks"],
      },
      {
        file: "src/lib/repositories/calendar-routine-read.ts",
        tables: ["calendar_blocks", "routines", "routine_steps", "reminders"],
      },
    ],
    boundaryFiles: ["src/app/command/page.tsx"],
  },
  {
    name: "Goals / proof / tasks",
    phase: "2–8",
    routes: ["src/app/goals/page.tsx"],
    helpers: ["src/lib/dashboard/dashboard-data-helpers.ts"],
    components: [
      "src/components/dashboard/goals-dashboard-v1.tsx",
      "src/components/dashboard/proof-dashboard-v1.tsx",
      "src/components/goals/goal-proof-proposal-composer.tsx",
    ],
    repositories: [
      {
        file: "src/lib/repositories/core-read.ts",
        tables: ["goals", "goal_milestones", "proof_items", "tasks", "project_milestones"],
      },
    ],
    boundaryFiles: ["src/app/goals/page.tsx"],
  },
  {
    name: "Calendar / timeline / routines",
    phase: "7 / 13",
    routes: ["src/app/calendar/page.tsx", "src/app/timeline/page.tsx"],
    helpers: ["src/lib/dashboard/calendar-routine-dashboard-data-helpers.ts"],
    components: [
      "src/components/dashboard/calendar-dashboard-v1.tsx",
      "src/components/dashboard/timeline-dashboard-v1.tsx",
      "src/components/calendar/calendar-timeline-proposal-composer.tsx",
    ],
    repositories: [
      {
        file: "src/lib/repositories/calendar-routine-read.ts",
        tables: ["calendar_blocks", "routines", "routine_steps", "reminders"],
      },
    ],
    boundaryFiles: ["src/app/calendar/page.tsx", "src/app/timeline/page.tsx"],
  },
  {
    name: "Career / jobs / networking / resume / interviews",
    phase: "8–9",
    routes: [
      "src/app/career/page.tsx",
      "src/app/networking/page.tsx",
      "src/app/resume/page.tsx",
      "src/app/interviews/page.tsx",
    ],
    helpers: [
      "src/lib/dashboard/career-dashboard-data-helpers.ts",
      "src/lib/dashboard/career-prep-dashboard-data-helpers.ts",
    ],
    components: [
      "src/components/dashboard/career-dashboard-v1.tsx",
      "src/components/dashboard/networking-dashboard-v1.tsx",
      "src/components/dashboard/resume-dashboard-v1.tsx",
      "src/components/dashboard/interviews-dashboard-v1.tsx",
      "src/components/dashboard/career-prep-foundation-panel.tsx",
    ],
    repositories: [
      {
        file: "src/lib/repositories/core-read.ts",
        tables: [
          "job_applications",
          "job_application_events",
          "networking_contacts",
          "networking_interactions",
          "job_referrals",
          "resume_versions",
          "resume_bullets",
          "interviews",
        ],
      },
      {
        file: "src/lib/repositories/career-prep-read.ts",
        tables: ["behavioral_stories", "question_bank", "mock_interviews", "resume_usage"],
      },
      {
        file: "src/lib/repositories/research-read.ts",
        tables: ["phd_application_assets"],
      },
    ],
    boundaryFiles: [
      "src/app/career/page.tsx",
      "src/app/networking/page.tsx",
      "src/app/resume/page.tsx",
      "src/app/interviews/page.tsx",
    ],
  },
  {
    name: "Learning / projects / knowledge",
    phase: "10 / 15 / 16",
    routes: [
      "src/app/learning/page.tsx",
      "src/app/projects/page.tsx",
      "src/app/knowledge/page.tsx",
    ],
    helpers: [
      "src/lib/dashboard/learning-project-dashboard-data-helpers.ts",
      "src/lib/voice/voice-session-helpers.ts",
    ],
    components: [
      "src/components/dashboard/learning-academy-dashboard-v1.tsx",
      "src/components/dashboard/project-builder-dashboard-v1.tsx",
      "src/components/dashboard/knowledge-vault-foundation-panel.tsx",
      "src/components/dashboard/knowledge-vault-alignment-v1.tsx",
      "src/components/dashboard/project-system-state-memory-panel.tsx",
    ],
    repositories: [
      {
        file: "src/lib/repositories/core-read.ts",
        tables: [
          "learning_sessions",
          "projects",
          "project_milestones",
          "project_bugs",
          "project_tests",
          "project_releases",
          "project_links",
          "quizzes",
          "quiz_attempts",
          "skills",
          "skill_paths",
          "skill_prerequisites",
          "skill_progress",
        ],
      },
      {
        file: "src/lib/repositories/memory-knowledge-read.ts",
        tables: [
          "knowledge_items",
          "knowledge_tags",
          "knowledge_links",
          "retrieval_logs",
          "memory_usage_logs",
          "memory_retrieval_events",
          "project_memory_state",
        ],
      },
      {
        file: "src/lib/repositories/current-info-read.ts",
        tables: ["web_source_links"],
      },
      {
        file: "src/lib/repositories/voice-read.ts",
        tables: ["voice_sessions"],
      },
    ],
    boundaryFiles: [
      "src/app/learning/page.tsx",
      "src/app/projects/page.tsx",
      "src/app/knowledge/page.tsx",
    ],
  },
  {
    name: "Research / Stanford / PhD",
    phase: "11–12 / 16",
    routes: [
      "src/app/research-lab/page.tsx",
      "src/app/research-stanford/page.tsx",
      "src/app/world-class/page.tsx",
    ],
    helpers: ["src/lib/dashboard/research-stanford-dashboard-data-helpers.ts"],
    components: [
      "src/components/dashboard/research-summary-panel.tsx",
      "src/components/dashboard/research-detail-panels.tsx",
      "src/components/dashboard/research-current-info-source-panel.tsx",
      "src/components/dashboard/research-linkage-boundary-panels.tsx",
      "src/components/dashboard/research-proposed-action-visibility-panel.tsx",
    ],
    repositories: [
      {
        file: "src/lib/repositories/research-read.ts",
        tables: [
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
          "recommendation_targets",
          "sop_versions",
        ],
      },
      {
        file: "src/lib/repositories/current-info-read.ts",
        tables: ["web_sources", "web_source_candidates", "web_source_links", "web_source_audit_events"],
      },
    ],
    boundaryFiles: [
      "src/app/research-lab/page.tsx",
      "src/app/research-stanford/page.tsx",
      "src/app/world-class/page.tsx",
    ],
  },
  {
    name: "Health / body / nutrition / sleep / emotion / hair skincare",
    phase: "13–14",
    routes: [
      "src/app/body/page.tsx",
      "src/app/nutrition/page.tsx",
      "src/app/sleep-energy/page.tsx",
      "src/app/emotion/page.tsx",
      "src/app/hair-skincare/page.tsx",
      "src/app/supplements/page.tsx",
    ],
    helpers: ["src/lib/dashboard/health-body-dashboard-data-helpers.ts"],
    components: [
      "src/components/dashboard/health-body-dashboard-v1.tsx",
      "src/components/dashboard/health-body-nutrition-dashboard-v1.tsx",
      "src/components/dashboard/health-body-sleep-energy-dashboard-v1.tsx",
      "src/components/dashboard/health-body-emotion-dashboard-v1.tsx",
      "src/components/dashboard/health-body-hair-skincare-dashboard-v1.tsx",
      "src/components/dashboard/health-body-supplements-dashboard-v1.tsx",
    ],
    repositories: [
      {
        file: "src/lib/repositories/health-body-read.ts",
        tables: [
          "body_logs",
          "workouts",
          "exercises",
          "workout_sets",
          "nutrition_logs",
          "meal_items",
          "supplements",
          "supplement_logs",
          "sleep_logs",
          "energy_logs",
          "mental_health_logs",
          "emotion_logs",
          "journal_entries",
          "skincare_logs",
          "haircare_logs",
          "products",
        ],
      },
    ],
    boundaryFiles: [
      "src/app/body/page.tsx",
      "src/app/nutrition/page.tsx",
      "src/app/sleep-energy/page.tsx",
      "src/app/emotion/page.tsx",
      "src/app/hair-skincare/page.tsx",
      "src/app/supplements/page.tsx",
    ],
  },
  {
    name: "Life admin / finance / housing / documents",
    phase: "13 / 15",
    routes: [
      "src/app/life-admin/page.tsx",
      "src/app/finance/page.tsx",
      "src/app/housing/page.tsx",
      "src/app/documents/page.tsx",
    ],
    helpers: ["src/lib/dashboard/admin-finance-dashboard-data-helpers.ts"],
    components: ["src/components/dashboard/admin-finance-dashboard-v1.tsx"],
    repositories: [
      {
        file: "src/lib/repositories/admin-finance-read.ts",
        tables: [
          "financial_accounts",
          "budget_categories",
          "financial_logs",
          "subscriptions",
          "documents",
          "housing_options",
          "housing_contacts",
          "reminders",
        ],
      },
    ],
    boundaryFiles: [
      "src/app/life-admin/page.tsx",
      "src/app/finance/page.tsx",
      "src/app/housing/page.tsx",
      "src/app/documents/page.tsx",
    ],
  },
  {
    name: "Grimoire",
    phase: "15",
    routes: ["src/app/grimoire/page.tsx"],
    helpers: ["src/lib/dashboard/grimoire-dashboard-data-helpers.ts"],
    components: ["src/components/dashboard/grimoire-dashboard-v1.tsx"],
    repositories: [
      {
        file: "src/lib/repositories/grimoire-read.ts",
        tables: [
          "grimoire_modes",
          "grimoire_daily_logs",
          "grimoire_skills",
          "grimoire_corruption_checks",
          "grimoire_reversions",
        ],
      },
      {
        file: "src/lib/repositories/core-read.ts",
        tables: ["skills", "skill_paths", "skill_prerequisites", "skill_progress", "daily_logs"],
      },
    ],
    boundaryFiles: ["src/app/grimoire/page.tsx"],
  },
  {
    name: "Carnos / chat / voice / memory",
    phase: "5–6 / 16–17",
    routes: [
      "src/app/carnos/page.tsx",
      "src/app/knowledge/page.tsx",
      "src/app/settings/page.tsx",
    ],
    apis: [
      "src/app/api/carnos/messages/route.ts",
      "src/app/api/voice/speak/route.ts",
      "src/app/api/voice/transcribe/route.ts",
    ],
    helpers: [
      "src/lib/dashboard/settings-privacy-dashboard-data-helpers.ts",
      "src/lib/voice/voice-session-helpers.ts",
    ],
    components: [
      "src/components/carnos/carnos-message-composer.tsx",
      "src/components/carnos/carnos-capability-matrix-panel.tsx",
      "src/components/carnos/carnos-persona-boundary-panel.tsx",
      "src/components/dashboard/approved-memory-read-layer-panel.tsx",
      "src/components/dashboard/carnos-memory-visibility-panel.tsx",
    ],
    repositories: [
      {
        file: "src/lib/repositories/core-read.ts",
        tables: ["ai_actions", "chat_sessions", "chat_messages"],
      },
      {
        file: "src/lib/repositories/carnos-persona-read.ts",
        tables: ["persona_prompt_versions"],
      },
      {
        file: "src/lib/repositories/memory-knowledge-read.ts",
        tables: [
          "knowledge_items",
          "knowledge_tags",
          "knowledge_links",
          "retrieval_logs",
          "memory_usage_logs",
          "memory_retrieval_events",
          "memory_candidates",
          "memory_items",
          "memory_events",
          "memory_review_queue",
          "carnos_context_snapshots",
          "carnos_entity_state",
          "project_memory_state",
          "system_memory_state",
        ],
      },
      {
        file: "src/lib/repositories/settings-privacy-read.ts",
        tables: ["app_settings", "privacy_settings"],
      },
      {
        file: "src/lib/repositories/voice-read.ts",
        tables: ["voice_sessions", "voice_transcripts"],
      },
    ],
    boundaryFiles: [
      "src/app/carnos/page.tsx",
      "src/app/knowledge/page.tsx",
      "src/app/settings/page.tsx",
      "src/app/api/voice/speak/route.ts",
      "src/app/api/voice/transcribe/route.ts",
    ],
  },
  {
    name: "Current info / web source / knowledge bridge",
    phase: "16",
    routes: [
      "src/app/knowledge/page.tsx",
      "src/app/privacy/page.tsx",
      "src/app/research-lab/page.tsx",
    ],
    helpers: ["src/lib/dashboard/current-info-dashboard-data-helpers.ts"],
    components: [
      "src/components/dashboard/current-info-review-to-save-panel.tsx",
      "src/components/dashboard/current-info-web-source-audit-trail-panel.tsx",
      "src/components/dashboard/knowledge-vault-source-bridge-panel.tsx",
      "src/components/dashboard/carnos-current-info-integration-panel.tsx",
    ],
    repositories: [
      {
        file: "src/lib/repositories/current-info-read.ts",
        tables: [
          "web_search_queries",
          "web_sources",
          "web_source_candidates",
          "web_source_links",
          "web_source_audit_events",
        ],
      },
      {
        file: "src/lib/repositories/memory-knowledge-read.ts",
        tables: ["knowledge_items", "knowledge_tags", "knowledge_links", "memory_review_queue"],
      },
    ],
    boundaryFiles: [
      "src/app/knowledge/page.tsx",
      "src/app/privacy/page.tsx",
      "src/app/research-lab/page.tsx",
    ],
  },
  {
    name: "Analytics / experiments",
    phase: "18",
    routes: ["src/app/analytics/page.tsx", "src/app/experiments/page.tsx"],
    helpers: [
      "src/lib/analytics-experiments/analytics-dashboard-view-model.ts",
      "src/lib/analytics-experiments/self-experiment-lab-view-model.ts",
    ],
    components: [
      "src/components/analytics-experiments/analytics-dashboard-ui.tsx",
      "src/components/analytics-experiments/self-experiment-lab-ui.tsx",
    ],
    repositories: [
      {
        file: "src/lib/repositories/core-read.ts",
        tables: ["events", "job_application_events"],
      },
      {
        file: "src/lib/repositories/current-info-read.ts",
        tables: ["web_source_audit_events"],
      },
      {
        file: "src/lib/repositories/memory-knowledge-read.ts",
        tables: ["memory_events", "memory_retrieval_events", "carnos_context_snapshots"],
      },
      {
        file: "src/lib/repositories/research-read.ts",
        tables: ["research_experiments"],
      },
    ],
    boundaryFiles: ["src/app/analytics/page.tsx", "src/app/experiments/page.tsx"],
  },
  {
    name: "Custom trackers",
    phase: "19",
    routes: ["src/app/custom-trackers/page.tsx"],
    helpers: ["src/lib/custom-trackers/custom-trackers-dashboard-view-model.ts"],
    components: ["src/components/custom-trackers/custom-trackers-dashboard-ui.tsx"],
    repositories: [],
    postV1Allowed: true,
    requiredBoundaryPhrases: ["post-v1", "Runtime custom tracker persistence"],
    boundaryFiles: [
      "src/app/custom-trackers/page.tsx",
      "src/lib/custom-trackers/custom-trackers-dashboard-view-model.ts",
    ],
  },
  {
    name: "Privacy / export / connectors / Spotify",
    phase: "20",
    routes: ["src/app/privacy/page.tsx", "src/app/settings/page.tsx"],
    helpers: [
      "src/lib/dashboard/settings-privacy-dashboard-data-helpers.ts",
      "src/lib/privacy/privacy-dashboard-view-model.ts",
    ],
    components: [
      "src/components/privacy/privacy-dashboard-ui.tsx",
      "src/components/dashboard/settings-privacy-foundation-panel.tsx",
      "src/components/dashboard/memory-privacy-rules-panel.tsx",
      "src/components/dashboard/current-info-privacy-retention-panel.tsx",
    ],
    repositories: [
      {
        file: "src/lib/repositories/settings-privacy-read.ts",
        tables: ["app_settings", "privacy_settings"],
      },
      {
        file: "src/lib/repositories/admin-finance-read.ts",
        tables: ["financial_accounts"],
      },
    ],
    spotifyBoundaryFiles: ["src/lib/privacy/privacy-dashboard-view-model.ts", "src/app/privacy/page.tsx"],
    spotifyRuntimeFiles: [
      "src/app/api/connectors/spotify/auth/route.ts",
      "src/app/api/connectors/spotify/callback/route.ts",
      "src/app/api/connectors/spotify/status/route.ts",
      "src/app/api/connectors/spotify/refresh/route.ts",
      "src/app/api/connectors/spotify/revoke/route.ts",
      "src/lib/connectors/spotify.ts",
      "src/lib/repositories/spotify-connector-read-write.ts",
    ],
    boundaryFiles: [
      "src/app/privacy/page.tsx",
      "src/app/settings/page.tsx",
      "src/lib/privacy/privacy-dashboard-view-model.ts",
    ],
  },
];

const REQUIRED_API_ROUTES = [
  "src/app/api/actions/[actionId]/approve/route.ts",
  "src/app/api/actions/[actionId]/reject/route.ts",
  "src/app/api/ai/extract/route.ts",
  "src/app/api/calendar/proposals/route.ts",
  "src/app/api/carnos/messages/route.ts",
  "src/app/api/goals/proposals/route.ts",
  "src/app/api/voice/speak/route.ts",
  "src/app/api/voice/transcribe/route.ts",
  "src/app/api/connectors/spotify/auth/route.ts",
  "src/app/api/connectors/spotify/callback/route.ts",
  "src/app/api/connectors/spotify/status/route.ts",
  "src/app/api/connectors/spotify/refresh/route.ts",
  "src/app/api/connectors/spotify/revoke/route.ts",
  "src/app/auth/callback/route.ts",
  "src/app/auth/signout/route.ts",
];

const POST_V1_BOUNDARY_PHRASES = [
  "post-v1",
  "Post-v1",
  "read-only",
  "Read-only",
  "boundary",
  "Boundary",
  "no runtime provider",
  "No runtime provider",
  "no autonomous",
  "No autonomous",
];

function abs(file) {
  return path.join(ROOT, file);
}

function exists(file) {
  return fs.existsSync(abs(file));
}

function read(file) {
  try {
    return fs.readFileSync(abs(file), "utf8");
  } catch {
    return "";
  }
}

function run(command) {
  try {
    return {
      ok: true,
      output: childProcess.execSync(command, {
        cwd: ROOT,
        encoding: "utf8",
        stdio: ["ignore", "pipe", "pipe"],
        maxBuffer: 1024 * 1024 * 120,
      }),
    };
  } catch (error) {
    return {
      ok: false,
      output: `${error.stdout || ""}${error.stderr || ""}`,
    };
  }
}

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    const rel = path.relative(ROOT, full).replaceAll(path.sep, "/");
    if (
      rel.includes("node_modules/") ||
      rel.includes(".next/") ||
      rel.includes(".git/") ||
      rel.includes(".verify-logs/")
    ) continue;

    if (entry.isDirectory()) walk(full, out);
    else out.push(rel);
  }
  return out;
}

function hasAnyText(file, needles) {
  const text = read(file);
  return needles.some((needle) => text.includes(needle));
}

function hasRuntimeSignal(file) {
  const text = read(file);
  return [
    "createSupabaseServerClient",
    ".from(",
    ".rpc(",
    "getAuthenticatedUser",
    "auth.getUser",
    "await ",
    "fetch(",
  ].some((needle) => text.includes(needle));
}

function hasBoundarySignal(file) {
  return hasAnyText(file, POST_V1_BOUNDARY_PHRASES);
}

function migrationText() {
  return walk(path.join(ROOT, "supabase/migrations"))
    .filter((file) => file.endsWith(".sql"))
    .map(read)
    .join("\n\n");
}

const SQL = migrationText();

function tableCreated(table) {
  const escaped = table.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`create\\s+table\\s+(?:if\\s+not\\s+exists\\s+)?(?:"?public"?\\.)?"?${escaped}"?`, "i").test(SQL);
}

function tableRls(table) {
  const escaped = table.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`alter\\s+table\\s+(?:if\\s+exists\\s+)?(?:"?public"?\\.)?"?${escaped}"?\\s+enable\\s+row\\s+level\\s+security`, "i").test(SQL);
}

function repoRead(file, table) {
  const text = read(file);
  const escaped = table.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return [
    new RegExp(`\\.from\\s*\\(\\s*["'\`]${escaped}["'\`]\\s*\\)`, "m"),
    new RegExp(`\\.rpc\\s*\\(\\s*["'\`]${escaped}["'\`]`, "m"),
  ].some((pattern) => pattern.test(text));
}

function parseImports(file) {
  const text = read(file);
  const imports = [];
  const patterns = [
    /import\s+(?:type\s+)?(?:[\s\S]*?)\s+from\s+["']([^"']+)["']/g,
    /export\s+(?:type\s+)?(?:[\s\S]*?)\s+from\s+["']([^"']+)["']/g,
  ];

  for (const pattern of patterns) {
    let match;
    while ((match = pattern.exec(text))) {
      imports.push(match[1]);
    }
  }

  return imports;
}

function resolveImport(fromFile, spec) {
  if (!spec.startsWith(".") && !spec.startsWith("@/")) return { external: true, ok: true };

  const fromDir = path.dirname(fromFile);
  const base = spec.startsWith("@/")
    ? path.join(ROOT, "src", spec.slice(2))
    : path.resolve(ROOT, fromDir, spec);

  const candidates = [
    base,
    `${base}.ts`,
    `${base}.tsx`,
    `${base}.js`,
    `${base}.jsx`,
    path.join(base, "index.ts"),
    path.join(base, "index.tsx"),
    path.join(base, "route.ts"),
    path.join(base, "page.tsx"),
  ];

  const ok = candidates.some((candidate) => fs.existsSync(candidate));
  return {
    external: false,
    ok,
    guess: path.relative(ROOT, base).replaceAll(path.sep, "/"),
  };
}

function sourceImportFailures() {
  const sourceFiles = walk(path.join(ROOT, "src"))
    .filter((file) => /\.(ts|tsx|js|jsx)$/.test(file));

  const failures = [];

  for (const file of sourceFiles) {
    for (const spec of parseImports(file)) {
      const resolved = resolveImport(file, spec);
      if (!resolved.ok) {
        failures.push({
          from: file,
          import: spec,
          guess: resolved.guess,
        });
      }
    }
  }

  return failures;
}

function scriptImportWarnings() {
  const scriptFiles = walk(path.join(ROOT, "scripts")).filter((file) => file.endsWith(".mjs"));
  const failures = [];

  for (const file of scriptFiles) {
    for (const spec of parseImports(file)) {
      const resolved = resolveImport(file, spec);
      if (!resolved.ok) {
        failures.push({
          from: file,
          import: spec,
          guess: resolved.guess,
        });
      }
    }
  }

  return failures;
}

function checkFeature(feature) {
  const blockers = [];
  const notes = [];

  for (const file of feature.routes ?? []) {
    if (!exists(file)) blockers.push(`Missing route file: ${file}`);
  }

  for (const file of feature.apis ?? []) {
    if (!exists(file)) blockers.push(`Missing API file: ${file}`);
  }

  for (const file of feature.helpers ?? []) {
    if (!exists(file)) blockers.push(`Missing helper/view-model file: ${file}`);
  }

  for (const file of feature.components ?? []) {
    if (!exists(file)) blockers.push(`Missing component file: ${file}`);
  }

  let directRuntime = false;
  for (const file of [...(feature.routes ?? []), ...(feature.apis ?? [])]) {
    if (exists(file) && hasRuntimeSignal(file)) directRuntime = true;
  }

  let delegatedRuntime = false;
  for (const file of [...(feature.helpers ?? []), ...(feature.components ?? [])]) {
    if (exists(file) && hasRuntimeSignal(file)) delegatedRuntime = true;
  }

  for (const repo of feature.repositories ?? []) {
    if (!exists(repo.file)) {
      blockers.push(`Missing repository file: ${repo.file}`);
      continue;
    }

    for (const table of repo.tables) {
      if (!tableCreated(table)) blockers.push(`Missing SQL create-table evidence: ${table}`);
      if (!tableRls(table)) blockers.push(`Missing RLS evidence: ${table}`);
      if (!repoRead(repo.file, table)) {
        blockers.push(`Missing exact repository read: ${repo.file} -> ${table}`);
      }
    }
  }

  const hasRepositoryRuntime = (feature.repositories ?? []).some((repo) => exists(repo.file));

  if (!directRuntime && !delegatedRuntime && !hasRepositoryRuntime && !feature.postV1Allowed) {
    blockers.push("No direct, delegated, or repository runtime evidence.");
  }

  const boundaryFiles = feature.boundaryFiles ?? [];
  const boundary = boundaryFiles.some((file) => exists(file) && hasBoundarySignal(file));
  if (!boundary) {
    blockers.push("Missing explicit boundary/read-only/provider/post-v1 label in route/helper files.");
  }

  if (feature.postV1Allowed) {
    const boundaryText = boundaryFiles.map(read).join("\n");
    for (const phrase of feature.requiredBoundaryPhrases ?? []) {
      if (!boundaryText.includes(phrase)) {
        blockers.push(`Missing post-v1 boundary phrase: ${phrase}`);
      }
    }
  }

  if (feature.name.includes("Spotify")) {
    const spotifyRuntimeExists = (feature.spotifyRuntimeFiles ?? []).some(exists);
    const spotifyBoundaryText = (feature.spotifyBoundaryFiles ?? []).map(read).join("\n");
    const spotifyBoundaryOk =
      /spotify/i.test(spotifyBoundaryText) &&
      /(post-v1|Post-v1|provider|connector|runtime|OAuth|oauth)/.test(spotifyBoundaryText);

    if (SPOTIFY_RUNTIME_REQUIRED && !spotifyRuntimeExists) {
      blockers.push("Spotify runtime required but Spotify OAuth/API/provider files are missing.");
    }

    if (!SPOTIFY_RUNTIME_REQUIRED && !spotifyBoundaryOk) {
      blockers.push("Spotify runtime not required yet, but explicit Spotify boundary/provider label is missing.");
    }

    if (!SPOTIFY_RUNTIME_REQUIRED && !spotifyRuntimeExists) {
      notes.push("Spotify real account connection is not required in this pre-Spotify pass; boundary label must exist.");
    }
  }

  const status = blockers.length ? "BLOCKED" : "PASS";

  return {
    name: feature.name,
    phase: feature.phase,
    status,
    routes: feature.routes ?? [],
    apis: feature.apis ?? [],
    helpers: feature.helpers ?? [],
    components: feature.components ?? [],
    repositories: feature.repositories ?? [],
    directRuntime,
    delegatedRuntime,
    boundary,
    blockers,
    notes,
  };
}

function loadJsonIfExists(file) {
  try {
    return JSON.parse(read(file));
  } catch {
    return null;
  }
}

const npmCheck = run("npm run check");
const diffCheck = run("git diff --check");

let tableClosureRun = { ok: false, output: "" };
if (exists("scripts/verify-phase-0-20-table-closure-v4b.mjs")) {
  tableClosureRun = run("node scripts/verify-phase-0-20-table-closure-v4b.mjs");
}

const tableClosureJson = loadJsonIfExists("docs/fixtures/full-project-connectivity/phase_0_20_table_closure_v4b.json");

const sourceBrokenImports = sourceImportFailures();
const scriptBrokenImports = scriptImportWarnings();

const featureResults = FEATURE_CHAINS.map(checkFeature);

const requiredApiMissing = REQUIRED_API_ROUTES.filter((file) => !exists(file));

const hardBlockers = [];

if (!npmCheck.ok) hardBlockers.push("npm run check failed");
if (!diffCheck.ok) hardBlockers.push("git diff --check failed");
if (sourceBrokenImports.length) hardBlockers.push(`Broken source imports: ${sourceBrokenImports.length}`);
if (requiredApiMissing.length) hardBlockers.push(`Missing required API routes: ${requiredApiMissing.length}`);

const blockedFeatures = featureResults.filter((feature) => feature.status === "BLOCKED");
if (blockedFeatures.length) hardBlockers.push(`Blocked feature chains: ${blockedFeatures.map((f) => f.name).join("; ")}`);

if (!tableClosureRun.ok) hardBlockers.push("Table closure v4B script failed");
if (!tableClosureJson) {
  hardBlockers.push("Table closure v4B JSON missing or invalid");
} else {
  if (tableClosureJson.hardBlockers?.length) {
    hardBlockers.push(`Table closure v4B hard blockers: ${tableClosureJson.hardBlockers.join("; ")}`);
  }
  if ((tableClosureJson.counts?.open ?? 0) !== 0) {
    hardBlockers.push(`Table closure v4B open tables: ${tableClosureJson.counts.open}`);
  }
  if (!tableClosureJson.npmCheck?.ok) {
    hardBlockers.push("Table closure v4B nested npm check failed");
  }
  if (!tableClosureJson.diffCheck?.ok) {
    hardBlockers.push("Table closure v4B nested diff check failed");
  }
}

const reviewNotes = [];

if (scriptBrokenImports.length) {
  reviewNotes.push(`Script-only broken import strings: ${scriptBrokenImports.length}. Not app runtime breakage if source imports are clean.`);
}

if (tableClosureJson?.counts?.review) {
  reviewNotes.push(`Table closure review notes: ${tableClosureJson.counts.review}.`);
}

if (!SPOTIFY_RUNTIME_REQUIRED) {
  reviewNotes.push("Spotify real account runtime is not required for this pre-Spotify pass. It will be required after Spotify implementation by running with SPOTIFY_RUNTIME_REQUIRED=1.");
}

const totalChecks = 100;
const blockerPenalty = hardBlockers.length ? 100 : 0;
const score = Math.max(0, totalChecks - blockerPenalty);
const status = score === 100 ? "PASS_100" : "BLOCKED";

const result = {
  status,
  score,
  generatedAt: new Date().toISOString(),
  spotifyRuntimeRequired: SPOTIFY_RUNTIME_REQUIRED,
  hardBlockers,
  reviewNotes,
  counts: {
    featureChains: featureResults.length,
    blockedFeatures: blockedFeatures.length,
    sourceBrokenImports: sourceBrokenImports.length,
    scriptBrokenImports: scriptBrokenImports.length,
    requiredApiMissing: requiredApiMissing.length,
    tableClosureOpen: tableClosureJson?.counts?.open ?? null,
    tableClosureReview: tableClosureJson?.counts?.review ?? null,
  },
  features: featureResults,
  requiredApiMissing,
  sourceBrokenImports,
  scriptBrokenImports: scriptBrokenImports.slice(0, 250),
  npmCheck: {
    ok: npmCheck.ok,
    tail: npmCheck.output.slice(-12000),
  },
  diffCheck: {
    ok: diffCheck.ok,
    output: diffCheck.output,
  },
  tableClosure: {
    ran: exists("scripts/verify-phase-0-20-table-closure-v4b.mjs"),
    ok: tableClosureRun.ok,
    status: tableClosureJson?.status ?? null,
    counts: tableClosureJson?.counts ?? null,
    hardBlockers: tableClosureJson?.hardBlockers ?? null,
  },
  git: {
    head: run("git log --oneline -1").output.trim(),
    status: run("git status --short").output.trim(),
  },
};

function mdTable(headers, rows) {
  const esc = (value) => String(value ?? "").replaceAll("|", "\\|").replace(/\n/g, "<br>");
  return [
    `| ${headers.map(esc).join(" | ")} |`,
    `| ${headers.map(() => "---").join(" | ")} |`,
    ...rows.map((row) => `| ${row.map(esc).join(" | ")} |`),
  ].join("\n");
}

const md = [
  "# Phase 0–20 100% Interconnectivity Verification",
  "",
  `Status: **${status}**`,
  "",
  `Score: **${score}/100**`,
  "",
  `Generated: ${result.generatedAt}`,
  "",
  `Spotify runtime required: **${SPOTIFY_RUNTIME_REQUIRED ? "yes" : "no"}**`,
  "",
  "This report checks Phase 0–20 whole-project interconnectivity across routes, API routes, helpers/view-models, components, repositories, SQL migrations, RLS, exact repository reads, source import graph, npm verification, table closure, and explicit boundary labels.",
  "",
  "It does not treat a dirty working tree as a blocker because this work is intentionally being accumulated for one final pre-Phase-21 commit.",
  "",
  "## 1. Final Result",
  "",
  `- Score: **${score}/100**`,
  `- Status: **${status}**`,
  "",
  "## 2. Hard Blockers",
  "",
  hardBlockers.length ? hardBlockers.map((x) => `- ${x}`).join("\n") : "- None",
  "",
  "## 3. Review Notes",
  "",
  reviewNotes.length ? reviewNotes.map((x) => `- ${x}`).join("\n") : "- None",
  "",
  "## 4. Counts",
  "",
  "```json",
  JSON.stringify(result.counts, null, 2),
  "```",
  "",
  "## 5. Feature Chain Matrix",
  "",
  mdTable(
    [
      "Feature",
      "Phase",
      "Status",
      "Direct runtime",
      "Delegated runtime",
      "Boundary",
      "Routes",
      "APIs",
      "Helpers",
      "Components",
      "Blockers",
      "Notes",
    ],
    featureResults.map((feature) => [
      feature.name,
      feature.phase,
      feature.status,
      feature.directRuntime ? "yes" : "no",
      feature.delegatedRuntime ? "yes" : "no",
      feature.boundary ? "yes" : "no",
      feature.routes.join("<br>"),
      feature.apis.join("<br>"),
      feature.helpers.join("<br>"),
      feature.components.join("<br>"),
      feature.blockers.join("<br>"),
      feature.notes.join("<br>"),
    ]),
  ),
  "",
  "## 6. Required API Route Coverage",
  "",
  requiredApiMissing.length ? requiredApiMissing.map((x) => `- Missing: ${x}`).join("\n") : "- All required API routes exist.",
  "",
  "## 7. Source Import Graph",
  "",
  sourceBrokenImports.length
    ? mdTable(["From", "Import", "Resolved guess"], sourceBrokenImports.map((x) => [x.from, x.import, x.guess]))
    : "- No broken source imports.",
  "",
  "## 8. Table Closure v4B",
  "",
  "```json",
  JSON.stringify(result.tableClosure, null, 2),
  "```",
  "",
  "## 9. npm run check",
  "",
  `Status: **${npmCheck.ok ? "PASS" : "FAIL"}**`,
  "",
  "```text",
  npmCheck.output.slice(-12000),
  "```",
  "",
  "## 10. git diff --check",
  "",
  `Status: **${diffCheck.ok ? "PASS" : "FAIL"}**`,
  "",
  "```text",
  diffCheck.output || "",
  "```",
  "",
  "## 11. Git State",
  "",
  "```text",
  `HEAD: ${result.git.head}`,
  "",
  result.git.status || "clean",
  "```",
  "",
].join("\n");

fs.writeFileSync(OUT_JSON, JSON.stringify(result, null, 2));
fs.writeFileSync(OUT_MD, md);

console.log("");
console.log("=== PHASE 0–20 100% INTERCONNECTIVITY VERIFICATION ===");
console.log(`Status: ${status}`);
console.log(`Score: ${score}/100`);
console.log(`Report: ${OUT_MD}`);
console.log(`JSON:   ${OUT_JSON}`);
console.log("");
console.log("Hard blockers:");
console.log(hardBlockers.length ? hardBlockers.map((x) => "- " + x).join("\n") : "- None");
console.log("");
console.log("Review notes:");
console.log(reviewNotes.length ? reviewNotes.map((x) => "- " + x).join("\n") : "- None");
console.log("");
console.log("Feature statuses:");
for (const feature of featureResults) {
  console.log(`- ${feature.status.padEnd(8)} ${feature.name}`);
}
console.log("");
console.log("Counts:");
console.log(JSON.stringify(result.counts, null, 2));
console.log("");
console.log("npm run check:", npmCheck.ok ? "PASS" : "FAIL");
console.log("git diff --check:", diffCheck.ok ? "PASS" : "FAIL");
console.log("table closure v4B:", tableClosureJson?.status ?? "missing");
console.log("");
console.log("Do not commit yet. After this pass, implement real Spotify account connection, rerun this verifier with Spotify runtime required, then do one final commit before Phase 21.");

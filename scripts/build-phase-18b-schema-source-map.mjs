import { existsSync, readFileSync, writeFileSync, readdirSync, statSync, mkdirSync } from "node:fs";
import { join } from "node:path";

function walk(dir, out = []) {
  if (!existsSync(dir)) return out;
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    const stat = statSync(path);
    if (stat.isDirectory()) walk(path, out);
    else out.push(path);
  }
  return out;
}

function read(path) {
  return readFileSync(path, "utf8");
}

function unique(items) {
  return [...new Set(items)].sort();
}

function tableMatches(sqlText) {
  const matches = [];
  const patterns = [
    /create\s+table\s+(?:if\s+not\s+exists\s+)?(?:public\.)?([a-zA-Z0-9_]+)/gi,
    /alter\s+table\s+(?:if\s+exists\s+)?(?:only\s+)?(?:public\.)?([a-zA-Z0-9_]+)/gi
  ];
  for (const pattern of patterns) {
    let match;
    while ((match = pattern.exec(sqlText)) !== null) matches.push(match[1]);
  }
  return matches;
}

function classifyTable(table) {
  const lower = table.toLowerCase();
  const tags = [];
  if (lower.includes("memory")) tags.push("carnos_memory");
  if (lower.includes("knowledge")) tags.push("knowledge");
  if (lower.includes("goal")) tags.push("goals");
  if (lower.includes("task")) tags.push("tasks");
  if (lower.includes("proof")) tags.push("proof");
  if (lower.includes("calendar") || lower.includes("timeline")) tags.push("calendar_timeline");
  if (lower.includes("job") || lower.includes("career") || lower.includes("application") || lower.includes("referral") || lower.includes("resume")) tags.push("career");
  if (lower.includes("learn") || lower.includes("study")) tags.push("learning");
  if (lower.includes("research")) tags.push("research");
  if (lower.includes("health") || lower.includes("body") || lower.includes("sleep") || lower.includes("gym") || lower.includes("workout") || lower.includes("habit") || lower.includes("mood") || lower.includes("energy") || lower.includes("food") || lower.includes("calorie")) tags.push("health_body");
  if (lower.includes("experiment")) tags.push("experiments");
  if (lower.includes("analytics") || lower.includes("metric") || lower.includes("snapshot") || lower.includes("insight")) tags.push("analytics");
  if (lower.includes("sync") || lower.includes("queue") || lower.includes("offline")) tags.push("offline_sync");
  if (lower.includes("source") || lower.includes("web") || lower.includes("current")) tags.push("current_info");
  if (tags.length === 0) tags.push("general");
  return tags;
}

const migrationFiles = walk("supabase").filter((path) => path.endsWith(".sql"))
  .concat(walk("db").filter((path) => path.endsWith(".sql")))
  .concat(walk("migrations").filter((path) => path.endsWith(".sql")));

const sourceFiles = walk("src").filter((path) => path.endsWith(".ts") || path.endsWith(".tsx"));
const docsFiles = walk("docs").filter((path) => path.endsWith(".md"));

const discoveredTables = [];
const tableSources = {};

for (const file of migrationFiles) {
  const text = read(file);
  for (const table of tableMatches(text)) {
    discoveredTables.push(table);
    tableSources[table] = tableSources[table] || [];
    tableSources[table].push(file);
  }
}

const tables = unique(discoveredTables);
const classified = tables.map((table) => ({
  table,
  tags: classifyTable(table),
  sources: unique(tableSources[table] || [])
}));

const canonicalMetrics = [
  {
    metric: "daily_checkin_count",
    domain: "life",
    desired_sources: ["daily", "log", "journal", "proof"],
    offline_cache: "allowed",
    sensitivity: "private",
    phase: "18C"
  },
  {
    metric: "goal_progress_signal",
    domain: "goals",
    desired_sources: ["goal", "proof", "task"],
    offline_cache: "allowed",
    sensitivity: "private",
    phase: "18C"
  },
  {
    metric: "job_application_velocity",
    domain: "career",
    desired_sources: ["job", "application", "career"],
    offline_cache: "allowed",
    sensitivity: "private",
    phase: "18C"
  },
  {
    metric: "networking_touchpoints",
    domain: "career",
    desired_sources: ["referral", "network", "contact"],
    offline_cache: "allowed",
    sensitivity: "private",
    phase: "18C"
  },
  {
    metric: "learning_consistency",
    domain: "learning",
    desired_sources: ["learn", "study", "session"],
    offline_cache: "allowed",
    sensitivity: "private",
    phase: "18C"
  },
  {
    metric: "research_output_count",
    domain: "research",
    desired_sources: ["research", "paper", "note"],
    offline_cache: "allowed",
    sensitivity: "private",
    phase: "18C"
  },
  {
    metric: "sleep_consistency",
    domain: "health_body",
    desired_sources: ["sleep"],
    offline_cache: "allowed_with_sensitive_rules",
    sensitivity: "sensitive",
    phase: "18C"
  },
  {
    metric: "workout_consistency",
    domain: "health_body",
    desired_sources: ["gym", "workout", "body"],
    offline_cache: "allowed_with_sensitive_rules",
    sensitivity: "sensitive",
    phase: "18C"
  },
  {
    metric: "calorie_logging_consistency",
    domain: "health_body",
    desired_sources: ["food", "calorie", "nutrition"],
    offline_cache: "allowed_with_sensitive_rules",
    sensitivity: "sensitive",
    phase: "18C"
  },
  {
    metric: "experiment_measurement_completeness",
    domain: "experiments",
    desired_sources: ["experiment"],
    offline_cache: "allowed",
    sensitivity: "private",
    phase: "18E"
  },
  {
    metric: "analytics_snapshot_freshness",
    domain: "analytics",
    desired_sources: ["analytics", "snapshot", "metric"],
    offline_cache: "allowed",
    sensitivity: "private",
    phase: "18D"
  },
  {
    metric: "carnos_memory_context_availability",
    domain: "carnos_memory",
    desired_sources: ["memory", "knowledge", "context"],
    offline_cache: "allowed_with_privacy_rules",
    sensitivity: "mixed",
    phase: "18M"
  }
];

function findCandidateTables(desiredSources) {
  return classified
    .filter((entry) => desiredSources.some((needle) => entry.table.toLowerCase().includes(needle)))
    .map((entry) => entry.table);
}

const metricMap = canonicalMetrics.map((metric) => ({
  ...metric,
  candidate_tables: findCandidateTables(metric.desired_sources),
  status: findCandidateTables(metric.desired_sources).length > 0 ? "source_candidates_found" : "schema_gap_or_future_source_needed"
}));

const offlineCacheCandidates = classified.filter((entry) => {
  const joined = entry.tags.join(" ");
  return joined.includes("goals") ||
    joined.includes("tasks") ||
    joined.includes("proof") ||
    joined.includes("career") ||
    joined.includes("learning") ||
    joined.includes("research") ||
    joined.includes("health_body") ||
    joined.includes("experiments") ||
    joined.includes("analytics") ||
    joined.includes("carnos_memory") ||
    joined.includes("knowledge");
});

const sensitiveCandidates = classified.filter((entry) => {
  const lower = entry.table.toLowerCase();
  return lower.includes("health") ||
    lower.includes("body") ||
    lower.includes("sleep") ||
    lower.includes("mood") ||
    lower.includes("energy") ||
    lower.includes("memory") ||
    lower.includes("private") ||
    lower.includes("sensitive");
});

const syncCandidates = classified.filter((entry) => {
  const joined = entry.tags.join(" ");
  return !joined.includes("current_info");
});

const output = {
  phase: "18B",
  title: "Schema Discovery + Metric Source Map",
  generated_by: "scripts/build-phase-18b-schema-source-map.mjs",
  boundaries: [
    "discovery_only",
    "no_new_tables_created",
    "no_fake_schema_claims",
    "no_runtime_data_reads",
    "no_supabase_client_calls",
    "phase_18a_b_persistence_offline_lock_applies"
  ],
  migration_file_count: migrationFiles.length,
  source_file_count: sourceFiles.length,
  docs_file_count: docsFiles.length,
  discovered_table_count: tables.length,
  discovered_tables: classified,
  metric_source_map: metricMap,
  offline_cache_candidates: offlineCacheCandidates.map((entry) => entry.table),
  sensitive_or_restricted_candidates: sensitiveCandidates.map((entry) => entry.table),
  sync_candidate_tables: syncCandidates.map((entry) => entry.table),
  schema_gaps: metricMap
    .filter((entry) => entry.status === "schema_gap_or_future_source_needed")
    .map((entry) => ({
      metric: entry.metric,
      domain: entry.domain,
      desired_sources: entry.desired_sources,
      future_phase: entry.phase
    }))
};

mkdirSync("docs/fixtures/phase18-analytics-experiments", { recursive: true });
writeFileSync("docs/fixtures/phase18-analytics-experiments/phase18b_schema_source_map.json", JSON.stringify(output, null, 2) + "\n");

let md = "# Phase 18B Schema Discovery + Metric Source Map\n\n";
md += "Generated by `scripts/build-phase-18b-schema-source-map.mjs`.\n\n";
md += "## Boundary\n\n";
for (const boundary of output.boundaries) md += "- " + boundary + "\n";
md += "\n## Discovery counts\n\n";
md += "- Migration files scanned: " + output.migration_file_count + "\n";
md += "- Source files counted: " + output.source_file_count + "\n";
md += "- Docs files counted: " + output.docs_file_count + "\n";
md += "- Discovered tables: " + output.discovered_table_count + "\n\n";
md += "## Discovered tables\n\n";
if (classified.length === 0) md += "No SQL-created tables were discovered from local migration files.\n\n";
else {
  md += "| Table | Tags | Source files |\n|---|---|---|\n";
  for (const entry of classified) md += "| `" + entry.table + "` | " + entry.tags.join(", ") + " | " + entry.sources.join("<br>") + " |\n";
  md += "\n";
}
md += "## Metric source map\n\n";
md += "| Metric | Domain | Status | Candidate tables | Offline cache | Sensitivity | Future phase |\n|---|---|---|---|---|---|---|\n";
for (const metric of metricMap) {
  md += "| `" + metric.metric + "` | " + metric.domain + " | " + metric.status + " | " + (metric.candidate_tables.length ? metric.candidate_tables.join(", ") : "None yet") + " | " + metric.offline_cache + " | " + metric.sensitivity + " | " + metric.phase + " |\n";
}
md += "\n## Offline cache candidates\n\n";
if (output.offline_cache_candidates.length === 0) md += "None discovered yet.\n";
else for (const table of output.offline_cache_candidates) md += "- `" + table + "`\n";
md += "\n## Sensitive or restricted candidates\n\n";
if (output.sensitive_or_restricted_candidates.length === 0) md += "None discovered yet.\n";
else for (const table of output.sensitive_or_restricted_candidates) md += "- `" + table + "`\n";
md += "\n## Schema gaps\n\n";
if (output.schema_gaps.length === 0) md += "No metric source gaps discovered by this static map.\n";
else for (const gap of output.schema_gaps) md += "- `" + gap.metric + "` needs source tables matching " + gap.desired_sources.join(", ") + " before " + gap.future_phase + ".\n";
md += "\n## Phase 18A-B integration\n\n";
md += "All Phase 18 analytics and experiment work must preserve the Phase 18A-B persistence/offline lock: Supabase/Postgres as online source of truth, IndexedDB or equivalent encrypted local cache as offline continuity layer, no localStorage core data, explicit offline sync queue, conflict/duplicate handling, cached-context honesty, and Level 4 Option C local AI readiness.\n";

writeFileSync("docs/roadmap/PHASE_18B_SCHEMA_DISCOVERY_METRIC_SOURCE_MAP.md", md);
console.log("wrote Phase 18B schema source map");

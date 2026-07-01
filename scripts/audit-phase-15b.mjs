import fs from "node:fs";
import path from "node:path";

const root = process.cwd();

const requiredFiles = [
  "supabase/migrations/0024_phase15_memory_sql_foundation.sql",
  "supabase/migrations/0025_phase15_memory_parent_ownership_guards.sql",
  "docs/database/PHASE_15B_MEMORY_SQL_SCHEMA_DESIGN.md",
  "docs/phase-reports/PHASE_15B_MEMORY_SQL_FOUNDATION_REPORT.md",
  "docs/qa/PHASE_15B_MEMORY_SQL_FOUNDATION_SMOKE_CHECKLIST.md",
  "scripts/audit-phase-15b.mjs",
  "package.json",
  "PROJECT_EXECUTION_LOG.md",
  "CODE_LEDGER.md",
  "CHANGELOG.md",
  "PHASE_STATUS.md",
];

const tables = [
  "memory_candidates",
  "memory_items",
  "memory_links",
  "memory_events",
  "memory_preferences",
  "memory_do_not_remember_rules",
  "carnos_entity_state",
  "carnos_context_snapshots",
  "project_memory_state",
  "system_memory_state",
  "knowledge_items",
  "knowledge_tags",
  "knowledge_links",
  "retrieval_logs",
  "memory_usage_logs",
  "memory_review_queue",
];

const requiredSqlMarkers = [
  "Phase 15B",
  "No pgvector",
  "No vector column",
  "No memory_embeddings table",
  "candidate",
  "pending_review",
  "approved",
  "rejected",
  "forgotten",
  "blocked_by_private_mode",
  "blocked_by_do_not_remember",
  "conversation_continuity",
  "carnos_entity_state",
  "source_of_truth_note",
  "voice_transcript_candidate",
  "privacy_rule",
  "do_not_remember_rule",
  "memory_used_in_context_pack",
  "memory_used_in_carnos_response",
  "private_mode_enabled",
  "conflict_detected",
  "stale_memory_detected",
];

const forbiddenRuntimePaths = [
  "src/lib/memory",
  "src/lib/rag",
  "src/lib/vector",
  "src/components/memory",
  "src/components/rag",
  "src/app/memory",
  "src/app/rag",
  "src/app/vector-search",
];

function full(file) {
  return path.join(root, file);
}

function exists(file) {
  return fs.existsSync(full(file));
}

function read(file) {
  return fs.readFileSync(full(file), "utf8");
}

let failed = false;

function pass(message) {
  console.log(`✓ ${message}`);
}

function fail(message) {
  failed = true;
  console.error(`✗ ${message}`);
}

console.log("\n=== PHASE 15B MEMORY SQL FOUNDATION AUDIT ===");

for (const file of requiredFiles) {
  if (exists(file)) pass(`Found ${file}`);
  else fail(`Missing ${file}`);
}

const foundationSql = exists("supabase/migrations/0024_phase15_memory_sql_foundation.sql")
  ? read("supabase/migrations/0024_phase15_memory_sql_foundation.sql")
  : "";

const guardSql = exists("supabase/migrations/0025_phase15_memory_parent_ownership_guards.sql")
  ? read("supabase/migrations/0025_phase15_memory_parent_ownership_guards.sql")
  : "";

const allSql = `${foundationSql}\n${guardSql}`;

for (const table of tables) {
  const createMarker = `create table if not exists public.${table}`;
  const rlsMarker = `alter table public.${table} enable row level security`;
  const policyMarker = `on public.${table}`;

  if (foundationSql.includes(createMarker)) pass(`SQL creates ${table}`);
  else fail(`SQL missing table ${table}`);

  if (foundationSql.includes(rlsMarker)) pass(`RLS enabled for ${table}`);
  else fail(`RLS missing for ${table}`);

  if (foundationSql.includes(policyMarker)) pass(`Policies present for ${table}`);
  else fail(`Policies missing for ${table}`);
}

for (const marker of requiredSqlMarkers) {
  if (allSql.includes(marker)) pass(`SQL includes marker: ${marker}`);
  else fail(`SQL missing marker: ${marker}`);
}

const guardMarkers = [
  "phase15_assert_source_refs_belong_to_user",
  "phase15_guard_memory_candidates_parent_ownership",
  "phase15_guard_memory_items_parent_ownership",
  "phase15_guard_memory_links_parent_ownership",
  "phase15_guard_memory_events_parent_ownership",
  "phase15_guard_memory_preferences_parent_ownership",
  "phase15_guard_do_not_remember_rules_parent_ownership",
  "phase15_guard_carnos_context_snapshots_parent_ownership",
  "phase15_guard_knowledge_links_parent_ownership",
  "phase15_guard_memory_usage_logs_parent_ownership",
  "phase15_guard_memory_review_queue_parent_ownership",
  "raise exception",
];

for (const marker of guardMarkers) {
  if (guardSql.includes(marker)) pass(`Ownership guard includes ${marker}`);
  else fail(`Ownership guard missing ${marker}`);
}

const forbiddenSqlMarkers = [
  "create extension if not exists vector",
  " vector(",
  "public.memory_embeddings",
  "embedding vector",
  "openai",
  "OpenAI",
  "generateText",
  "streamText",
  "fetch(",
  "setInterval(",
  "setTimeout(",
];

for (const marker of forbiddenSqlMarkers) {
  if (allSql.includes(marker)) fail(`Forbidden SQL/runtime marker present: ${marker}`);
  else pass(`Forbidden marker absent: ${marker}`);
}

for (const runtimePath of forbiddenRuntimePaths) {
  if (exists(runtimePath)) fail(`Forbidden Phase 15B runtime path exists: ${runtimePath}`);
  else pass(`Forbidden Phase 15B runtime path absent: ${runtimePath}`);
}

if (exists("package.json")) {
  const pkg = JSON.parse(read("package.json"));

  if (pkg.scripts?.["audit:phase15b"] === "node scripts/audit-phase-15b.mjs") {
    pass("package.json includes audit:phase15b");
  } else {
    fail("package.json missing audit:phase15b");
  }

  if (pkg.scripts?.check?.includes("npm run audit:phase15b")) {
    pass("npm run check includes audit:phase15b");
  } else {
    fail("npm run check missing audit:phase15b");
  }
}

const docMarkers = [
  {
    file: "docs/database/PHASE_15B_MEMORY_SQL_SCHEMA_DESIGN.md",
    markers: [
      "memory_candidates",
      "memory_items",
      "carnos_entity_state",
      "knowledge_items",
      "retrieval_logs",
      "No `memory_embeddings`",
      "No pgvector",
      "Phase 15C",
    ],
  },
  {
    file: "docs/phase-reports/PHASE_15B_MEMORY_SQL_FOUNDATION_REPORT.md",
    markers: [
      "Phase 15B",
      "Memory SQL Foundation",
      "RLS policies",
      "Parent ownership guards",
      "No TypeScript memory runtime",
      "Phase 15C",
    ],
  },
  {
    file: "docs/qa/PHASE_15B_MEMORY_SQL_FOUNDATION_SMOKE_CHECKLIST.md",
    markers: [
      "Phase 15B",
      "No pgvector is added",
      "No `memory_embeddings` table is added",
      "npm run audit:phase15b",
    ],
  },
  {
    file: "PROJECT_EXECUTION_LOG.md",
    markers: ["Phase 15B", "Memory SQL Foundation"],
  },
  {
    file: "CODE_LEDGER.md",
    markers: ["Phase 15B", "Memory SQL Foundation"],
  },
  {
    file: "CHANGELOG.md",
    markers: ["Phase 15B", "Memory SQL Foundation"],
  },
  {
    file: "PHASE_STATUS.md",
    markers: ["Phase 15B", "Phase 15C"],
  },
];

for (const item of docMarkers) {
  if (!exists(item.file)) continue;
  const text = read(item.file);
  for (const marker of item.markers) {
    if (text.includes(marker)) pass(`${item.file} includes ${marker}`);
    else fail(`${item.file} missing ${marker}`);
  }
}

console.log();

if (failed) {
  console.error("Phase 15B Memory SQL Foundation audit failed.");
  process.exit(1);
}

console.log("Phase 15B Memory SQL Foundation audit passed.");

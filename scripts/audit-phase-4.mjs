import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const migrationsDir = path.join(root, "supabase", "migrations");

const requiredMigrationFiles = [
  "0002_audit_and_ai_actions.sql",
  "0003_chat_foundation.sql",
  "0004_goals_foundation.sql",
  "0005_daily_logs_and_proof_items.sql",
  "0006_tasks_and_events.sql",
];

const requiredTables = [
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
];

const requiredSourceLinkTables = [
  "goals",
  "goal_milestones",
  "daily_logs",
  "proof_items",
  "tasks",
  "events",
];

const requiredUpdatedAtTables = [
  "ai_actions",
  "chat_sessions",
  "goals",
  "goal_milestones",
  "daily_logs",
  "proof_items",
  "tasks",
  "events",
];

const requiredParentChecks = [
  ["0003_chat_foundation.sql", "chat_messages", "chat_sessions"],
  ["0004_goals_foundation.sql", "goal_milestones", "goals"],
  ["0005_daily_logs_and_proof_items.sql", "proof_items", "daily_logs"],
  ["0005_daily_logs_and_proof_items.sql", "proof_items", "goals"],
  ["0006_tasks_and_events.sql", "tasks", "goals"],
  ["0006_tasks_and_events.sql", "events", "tasks"],
  ["0006_tasks_and_events.sql", "events", "goals"],
];

function fail(message) {
  console.error(`Phase 4 audit failed: ${message}`);
  process.exit(1);
}

function readMigration(filename) {
  const filePath = path.join(migrationsDir, filename);

  if (!fs.existsSync(filePath)) {
    fail(`Missing migration file: ${filename}`);
  }

  return fs.readFileSync(filePath, "utf8");
}

function normalize(sql) {
  return sql.toLowerCase().replace(/\s+/g, " ").trim();
}

function requireIncludes(content, needle, message) {
  if (!normalize(content).includes(normalize(needle))) {
    fail(message);
  }
}

function requirePattern(content, pattern, message) {
  if (!pattern.test(content)) {
    fail(message);
  }
}

function getCreateTableBlock(sql, table) {
  const lowerSql = sql.toLowerCase();
  const startNeedle = `create table if not exists public.${table}`;
  const startIndex = lowerSql.indexOf(startNeedle);

  if (startIndex === -1) {
    fail(`Missing create table block for public.${table}`);
  }

  const endIndex = lowerSql.indexOf("\n);", startIndex);

  if (endIndex === -1) {
    fail(`Could not find end of create table block for public.${table}`);
  }

  return sql.slice(startIndex, endIndex + 3);
}

const migrationContents = new Map(
  requiredMigrationFiles.map((file) => [file, readMigration(file)]),
);

const allPhase4Sql = [...migrationContents.values()].join("\n\n");

for (const table of requiredTables) {
  const createTableBlock = getCreateTableBlock(allPhase4Sql, table);

  requireIncludes(
    allPhase4Sql,
    `create table if not exists public.${table}`,
    `Missing create table statement for public.${table}`,
  );

  requireIncludes(
    allPhase4Sql,
    `alter table public.${table} enable row level security`,
    `Missing RLS enable statement for public.${table}`,
  );

  requirePattern(
    allPhase4Sql,
    new RegExp(`create\\s+policy\\s+"[^"]+"\\s+on\\s+public\\.${table}\\s+for\\s+select`, "i"),
    `Missing SELECT policy for public.${table}`,
  );

  requirePattern(
    allPhase4Sql,
    new RegExp(`create\\s+policy\\s+"[^"]+"\\s+on\\s+public\\.${table}\\s+for\\s+insert`, "i"),
    `Missing INSERT policy for public.${table}`,
  );

  requireIncludes(
    allPhase4Sql,
    `${table}_user_id_idx`,
    `Missing user_id index for public.${table}`,
  );

  requireIncludes(
    createTableBlock,
    "user_id uuid not null references public.profiles(id) on delete cascade",
    `Missing user ownership reference in public.${table}`,
  );
}

for (const table of requiredUpdatedAtTables) {
  requireIncludes(
    allPhase4Sql,
    `set_${table}_updated_at`,
    `Missing updated_at trigger for public.${table}`,
  );
}

for (const table of requiredSourceLinkTables) {
  const createTableBlock = getCreateTableBlock(allPhase4Sql, table);

  requireIncludes(
    createTableBlock,
    "source_ai_action_id uuid references public.ai_actions(id) on delete set null",
    `Missing source_ai_action_id link for public.${table}`,
  );

  requireIncludes(
    createTableBlock,
    "source_chat_message_id uuid references public.chat_messages(id) on delete set null",
    `Missing source_chat_message_id link for public.${table}`,
  );
}

const auditLogsBlock = getCreateTableBlock(allPhase4Sql, "audit_logs");
for (const field of [
  "actor_type",
  "action_type",
  "entity_table",
  "entity_id",
  "before_state",
  "after_state",
  "occurred_at",
  "logged_at",
]) {
  requireIncludes(auditLogsBlock, field, `audit_logs is missing required field: ${field}`);
}

const aiActionsBlock = getCreateTableBlock(allPhase4Sql, "ai_actions");
for (const status of [
  "pending_confirmation",
  "approved",
  "rejected",
  "executed",
  "failed",
  "cancelled",
]) {
  requireIncludes(
    aiActionsBlock,
    status,
    `ai_actions is missing required proposed-action status: ${status}`,
  );
}

requireIncludes(
  getCreateTableBlock(allPhase4Sql, "daily_logs"),
  "unique (user_id, log_date)",
  "daily_logs is missing unique(user_id, log_date)",
);

requireIncludes(
  allPhase4Sql,
  "add constraint proof_items_task_id_fkey",
  "proof_items is missing task foreign key constraint name",
);

requireIncludes(
  allPhase4Sql,
  "references public.tasks(id)",
  "proof_items is missing task foreign key linkage",
);

for (const [file, table, parent] of requiredParentChecks) {
  const content = migrationContents.get(file);

  requireIncludes(
    content,
    `from public.${parent}`,
    `Missing parent ownership check from public.${parent} for public.${table} in ${file}`,
  );
}

if (normalize(allPhase4Sql).includes("create table if not exists public.memory_items")) {
  fail("memory_items must not be created in Phase 4");
}

console.log("Phase 4 audit passed: core SQL spine migrations are present, RLS-protected, indexed, and source-linked.");

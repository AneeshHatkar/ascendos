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
  {
    table: "chat_messages",
    parent: "chat_sessions",
    file: "0003_chat_foundation.sql",
  },
  {
    table: "goal_milestones",
    parent: "goals",
    file: "0004_goals_foundation.sql",
  },
  {
    table: "proof_items",
    parent: "daily_logs",
    file: "0005_daily_logs_and_proof_items.sql",
  },
  {
    table: "proof_items",
    parent: "goals",
    file: "0005_daily_logs_and_proof_items.sql",
  },
  {
    table: "tasks",
    parent: "goals",
    file: "0006_tasks_and_events.sql",
  },
  {
    table: "events",
    parent: "tasks",
    file: "0006_tasks_and_events.sql",
  },
  {
    table: "events",
    parent: "goals",
    file: "0006_tasks_and_events.sql",
  },
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

function requirePattern(content, pattern, message) {
  if (!pattern.test(content)) {
    fail(message);
  }
}

const migrationContents = new Map(
  requiredMigrationFiles.map((file) => [file, readMigration(file)]),
);

const allPhase4Sql = [...migrationContents.values()].join("\n\n");

for (const table of requiredTables) {
  requirePattern(
    allPhase4Sql,
    new RegExp(`create\\s+table\\s+if\\s+not\\s+exists\\s+public\\.${table}\\b`, "i"),
    `Missing create table statement for public.${table}`,
  );

  requirePattern(
    allPhase4Sql,
    new RegExp(`alter\\s+table\\s+public\\.${table}\\s+enable\\s+row\\s+level\\s+security`, "i"),
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

  requirePattern(
    allPhase4Sql,
    new RegExp(`${table}_user_id_idx`, "i"),
    `Missing user_id index for public.${table}`,
  );

  requirePattern(
    allPhase4Sql,
    new RegExp(`user_id\\s+uuid\\s+not\\s+null\\s+references\\s+public\\.profiles\$begin:math:text$id\\$end:math:text$\\s+on\\s+delete\\s+cascade`, "i"),
    `Missing user ownership reference pattern near Phase 4 tables`,
  );
}

for (const table of requiredUpdatedAtTables) {
  requirePattern(
    allPhase4Sql,
    new RegExp(`set_${table}_updated_at`, "i"),
    `Missing updated_at trigger for public.${table}`,
  );
}

for (const table of requiredSourceLinkTables) {
  requirePattern(
    allPhase4Sql,
    new RegExp(`create\\s+table[\\s\\S]*public\\.${table}[\\s\\S]*source_ai_action_id\\s+uuid\\s+references\\s+public\\.ai_actions\$begin:math:text$id\\$end:math:text$\\s+on\\s+delete\\s+set\\s+null`, "i"),
    `Missing source_ai_action_id link for public.${table}`,
  );

  requirePattern(
    allPhase4Sql,
    new RegExp(`create\\s+table[\\s\\S]*public\\.${table}[\\s\\S]*source_chat_message_id\\s+uuid\\s+references\\s+public\\.chat_messages\$begin:math:text$id\\$end:math:text$\\s+on\\s+delete\\s+set\\s+null`, "i"),
    `Missing source_chat_message_id link for public.${table}`,
  );
}

requirePattern(
  allPhase4Sql,
  /create\s+table\s+if\s+not\s+exists\s+public\.audit_logs[\s\S]*actor_type[\s\S]*action_type[\s\S]*entity_table[\s\S]*entity_id[\s\S]*before_state[\s\S]*after_state[\s\S]*occurred_at[\s\S]*logged_at/i,
  "audit_logs is missing required audit fields",
);

requirePattern(
  allPhase4Sql,
  /create\s+table\s+if\s+not\s+exists\s+public\.ai_actions[\s\S]*status[\s\S]*pending_confirmation[\s\S]*approved[\s\S]*rejected[\s\S]*executed[\s\S]*failed[\s\S]*cancelled/i,
  "ai_actions is missing required proposed-action lifecycle statuses",
);

requirePattern(
  allPhase4Sql,
  /unique\s*\(\s*user_id\s*,\s*log_date\s*\)/i,
  "daily_logs is missing unique(user_id, log_date)",
);

requirePattern(
  allPhase4Sql,
  /alter\s+table\s+public\.proof_items[\s\S]*add\s+constraint\s+proof_items_task_id_fkey[\s\S]*references\s+public\.tasks\(id\)/i,
  "proof_items is missing task foreign key linkage",
);

for (const check of requiredParentChecks) {
  const content = migrationContents.get(check.file);
  requirePattern(
    content,
    new RegExp(`from\\s+public\\.${check.parent}`, "i"),
    `Missing parent ownership check from public.${check.parent} in ${check.file}`,
  );
}

const bannedMemoryPattern = /create\s+table\s+if\s+not\s+exists\s+public\.memory_items\b/i;
if (bannedMemoryPattern.test(allPhase4Sql)) {
  fail("memory_items must not be created in Phase 4");
}

console.log("Phase 4 audit passed: core SQL spine migrations are present, RLS-protected, indexed, and source-linked.");

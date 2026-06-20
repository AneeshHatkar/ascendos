import fs from "node:fs";

const checks = [];
let failed = false;

function exists(path) {
  return fs.existsSync(path);
}

function read(path) {
  return fs.readFileSync(path, "utf8");
}

function pass(message) {
  checks.push(`✓ ${message}`);
}

function fail(message) {
  failed = true;
  checks.push(`✗ ${message}`);
}

function requireFile(path) {
  if (exists(path)) {
    pass(`Found ${path}`);
  } else {
    fail(`Missing ${path}`);
  }
}

function requireIncludes(path, values) {
  const text = read(path);

  for (const value of values) {
    if (text.includes(value)) {
      pass(`${path} contains ${value}`);
    } else {
      fail(`${path} missing ${value}`);
    }
  }
}

function forbidIncludes(path, values) {
  const text = read(path);

  for (const value of values) {
    if (text.includes(value)) {
      fail(`${path} contains forbidden marker: ${value}`);
    } else {
      pass(`${path} avoids forbidden marker: ${value}`);
    }
  }
}

console.log("=== Phase 6 files ===");

const requiredFiles = [
  "docs/phase-plans/PHASE_6_SAFE_WRITE_PROPOSED_ACTION_FLOW.md",
  "src/lib/actions/action-types.ts",
  "src/lib/actions/proposed-action-contracts.ts",
  "src/lib/actions/action-results.ts",
  "src/lib/actions/validate-proposed-action.ts",
  "src/lib/audit/write-audit-log.ts",
  "src/lib/timeline/write-timeline-event.ts",
  "src/lib/actions/create-proposed-action.ts",
  "src/lib/actions/action-lifecycle.ts",
  "src/lib/actions/execution-dispatcher.ts",
  "src/lib/actions/flows/create-task-flow.ts",
  "src/lib/actions/flows/create-goal-flow.ts",
  "src/lib/actions/flows/create-daily-log-flow.ts",
  "src/lib/actions/flows/create-proof-item-flow.ts",
  "src/components/actions/proposed-action-review-card.tsx",
  "src/components/actions/index.ts",
];

for (const file of requiredFiles) {
  requireFile(file);
}

console.log("\n=== Phase 6 action type contract ===");

requireIncludes("src/lib/actions/action-types.ts", [
  "create_task",
  "create_goal",
  "create_daily_log",
  "create_proof_item",
  "PROPOSED_ACTION_TYPES",
]);

requireIncludes("src/lib/actions/proposed-action-contracts.ts", [
  "ProposedActionContract",
  "CreateTaskPayload",
  "CreateGoalPayload",
  "CreateDailyLogPayload",
  "CreateProofItemPayload",
  "PROPOSED_ACTION_REQUIRED_FIELDS",
  "PROPOSED_ACTION_FORBIDDEN_PAYLOAD_FIELDS",
]);

requireIncludes("src/lib/actions/validate-proposed-action.ts", [
  "validateProposedAction",
  "PROPOSED_ACTION_FORBIDDEN_PAYLOAD_FIELDS",
  "create_task",
  "create_goal",
  "create_daily_log",
  "create_proof_item",
]);

console.log("\n=== Phase 6 proposed action lifecycle ===");

requireIncludes("src/lib/actions/create-proposed-action.ts", [
  "createProposedAction",
  "validateProposedAction",
  "pending_confirmation",
  ".from(\"ai_actions\")",
]);

requireIncludes("src/lib/actions/action-lifecycle.ts", [
  ".from(\"ai_actions\")",
  "pending_confirmation",
  "approved",
  "rejected",
  "cancelled",
  "failed",
  "approved_at",
  "rejected_at",
  "failed_at",
]);

console.log("\n=== Phase 6 execution dispatcher ===");

requireIncludes("src/lib/actions/execution-dispatcher.ts", [
  "executeApprovedAction",
  "executeCreateTaskAction",
  "executeCreateGoalAction",
  "executeCreateDailyLogAction",
  "executeCreateProofItemAction",
  "action.status !== \"approved\"",
  "create_task",
  "create_goal",
  "create_daily_log",
  "create_proof_item",
]);

console.log("\n=== Phase 6 target write flows ===");

const flowExpectations = [
  ["src/lib/actions/flows/create-task-flow.ts", "tasks", "task_id", "create_task"],
  ["src/lib/actions/flows/create-goal-flow.ts", "goals", "goal_id", "create_goal"],
  ["src/lib/actions/flows/create-daily-log-flow.ts", "daily_logs", "daily_log_id", "create_daily_log"],
  ["src/lib/actions/flows/create-proof-item-flow.ts", "proof_items", "proof_item_id", "create_proof_item"],
];

for (const [file, table, resultId, actionType] of flowExpectations) {
  requireIncludes(file, [
    ".from(\"ai_actions\")",
    `action_type !== \"${actionType}\"`,
    "action.status !== \"approved\"",
    `.from(\"${table}\")`,
    "status: \"executed\"",
    "target_table",
    "target_id",
    "writeAuditLog",
    "writeTimelineEvent",
    resultId,
  ]);
}

requireIncludes("src/lib/actions/flows/create-proof-item-flow.ts", [
  "relatedRecordBelongsToUser",
  "daily_logs",
  "goals",
  "tasks",
]);

console.log("\n=== Phase 6 audit and timeline helpers ===");

requireIncludes("src/lib/audit/write-audit-log.ts", [
  "writeAuditLog",
  ".from(\"audit_logs\")",
  "actor_type",
  "entity_table",
]);

requireIncludes("src/lib/timeline/write-timeline-event.ts", [
  "writeTimelineEvent",
  "timeline_events table is not defined",
  "skipped",
]);

console.log("\n=== Phase 6 UI boundary ===");

requireIncludes("src/components/actions/proposed-action-review-card.tsx", [
  "ProposedActionReviewCard",
  "Save / Confirm",
  "Cancel",
  "Edit payload",
  "onSave",
  "onCancel",
]);

forbidIncludes("src/components/actions/proposed-action-review-card.tsx", [
  "createSupabase",
  "from(\"",
  "executeApprovedAction",
  "createProposedAction",
]);

requireIncludes("src/app/carnos/page.tsx", [
  "ProposedActionReviewCard",
  "SAMPLE_PHASE_6_REVIEW_ACTION",
  "Phase 6.16",
]);

forbidIncludes("src/app/carnos/page.tsx", [
  "server write",
  "server-side write",
  "direct database write",
  "executeApprovedAction(",
]);

console.log("\n=== Phase 6 logs ===");

requireIncludes("PROJECT_EXECUTION_LOG.md", [
  "Phase 6.1",
  "Phase 6.10",
  "Phase 6.11",
  "Phase 6.12",
  "Phase 6.13",
  "Phase 6.14",
  "Phase 6.15",
  "Phase 6.16",
]);

requireIncludes("PHASE_STATUS.md", [
  "Phase 6.16",
  "Next step: Phase 6.17",
]);

console.log(checks.join("\\n"));

if (failed) {
  console.error("\nPhase 6 audit failed.");
  process.exit(1);
}

console.log("\nPhase 6 audit passed: safe write proposed-action flow is present and boundary-protected.");

import fs from "node:fs";
import path from "node:path";

const root = process.cwd();

function exists(file) {
  return fs.existsSync(path.join(root, file));
}

function read(file) {
  const full = path.join(root, file);
  if (!fs.existsSync(full)) return "";
  return fs.readFileSync(full, "utf8");
}

function section(title) {
  console.log(`\n=== ${title} ===`);
}

function check(label, condition) {
  if (condition) {
    console.log(`✓ ${label}`);
  } else {
    console.log(`✗ ${label}`);
  }
}

function includes(file, text) {
  return read(file).includes(text);
}

section("Chunk 06 — Goals / Proof");

check("goals route exists", exists("src/app/goals/page.tsx"));
check("goals dashboard exists", exists("src/components/dashboard/goals-dashboard-v1.tsx"));
check("proof dashboard exists", exists("src/components/dashboard/proof-dashboard-v1.tsx"));
check("goal read helper exists", includes("src/lib/repositories/core-read.ts", "listGoals"));
check("goal milestone read helper exists", includes("src/lib/repositories/core-read.ts", "listGoalMilestones"));
check("proof read helper exists", includes("src/lib/repositories/core-read.ts", "listProofItems"));
check("create goal flow exists", exists("src/lib/actions/flows/create-goal-flow.ts"));
check("create proof item flow exists", exists("src/lib/actions/flows/create-proof-item-flow.ts"));
check(
  "goals proposal API exists",
  exists("src/app/api/goals/proposals/route.ts"),
);
check(
  "goals proof proposal composer exists",
  exists("src/components/goals/goal-proof-proposal-composer.tsx"),
);
check(
  "goal page has proposal composer",
  includes("src/app/goals/page.tsx", "GoalProofProposalComposer"),
);
check(
  "goal page no longer claims create/edit/delete disabled",
  !includes("src/app/goals/page.tsx", "does not create, edit, delete"),
);
check(
  "goal page no longer claims creation remains disabled",
  !includes("src/app/goals/page.tsx", "Goal creation remains intentionally disabled"),
);

section("Chunk 07 — Calendar / Timeline");

check("calendar route exists", exists("src/app/calendar/page.tsx"));
check("timeline route exists", exists("src/app/timeline/page.tsx"));
check("calendar dashboard exists", exists("src/components/dashboard/calendar-dashboard-v1.tsx"));
check("timeline dashboard exists", exists("src/components/dashboard/timeline-dashboard-v1.tsx"));
check("task read helper exists", includes("src/lib/repositories/core-read.ts", "listTasks"));
check("event read helper exists", includes("src/lib/repositories/core-read.ts", "listEvents"));
check("create task flow exists", exists("src/lib/actions/flows/create-task-flow.ts"));
check("timeline write helper exists", exists("src/lib/timeline/write-timeline-event.ts"));
check("timeline helper says table is not defined/skipped", includes("src/lib/timeline/write-timeline-event.ts", "timeline_events table is not defined"));
check("calendar page says creation disabled", includes("src/app/calendar/page.tsx", "creation flows remain intentionally disabled"));
check("timeline page says creation disabled", includes("src/app/timeline/page.tsx", "Creation and mutation flows remain intentionally disabled"));

section("Chunk 08 — Carnos Chat");

check("carnos route exists", exists("src/app/carnos/page.tsx"));
check("carnos panel exists", exists("src/components/dashboard/carnos-panel-v1.tsx"));
check("chat session read helper exists", includes("src/lib/repositories/core-read.ts", "listChatSessions"));
check("chat message read helper exists", includes("src/lib/repositories/core-read.ts", "listChatMessages"));
check("chat tables exist in migration", includes("supabase/migrations/0003_chat_foundation.sql", "chat_sessions"));
check("chat messages table exists in migration", includes("supabase/migrations/0003_chat_foundation.sql", "chat_messages"));
check("carnos page says no generating responses", includes("src/app/carnos/page.tsx", "without generating responses"));
check("carnos page says intelligence not enabled", includes("src/app/carnos/page.tsx", "intelligence and mutation are intentionally not enabled"));

section("Chunk 09 — AI Extraction / Pending Updates");

check("proposed action contracts exist", exists("src/lib/actions/proposed-action-contracts.ts"));
check("proposed action validation exists", exists("src/lib/actions/validate-proposed-action.ts"));
check("create proposed action exists", exists("src/lib/actions/create-proposed-action.ts"));
check("action lifecycle exists", exists("src/lib/actions/action-lifecycle.ts"));
check("execution dispatcher exists", exists("src/lib/actions/execution-dispatcher.ts"));
check("pending updates drawer exists", exists("src/components/actions/pending-updates-drawer.tsx"));
check("proposed action review card exists", exists("src/components/actions/proposed-action-review-card.tsx"));
check(
  "approve route exists",
  exists("src/app/api/actions/[actionId]/approve/route.ts"),
);
check(
  "reject route exists",
  exists("src/app/api/actions/[actionId]/reject/route.ts"),
);
check(
  "pending drawer has approve wiring",
  includes("src/components/actions/pending-updates-drawer.tsx", "approve") &&
    includes("src/components/actions/pending-updates-drawer.tsx", "fetch"),
);
check(
  "pending drawer has reject wiring",
  includes("src/components/actions/pending-updates-drawer.tsx", "reject") &&
    includes("src/components/actions/pending-updates-drawer.tsx", "fetch"),
);
check(
  "Carnos page no longer claims confirmation callbacks are disconnected",
  !includes("src/app/carnos/page.tsx", "Confirmation callbacks are intentionally not connected"),
);
check("API extraction route exists", exists("src/app/api/extract/route.ts") || exists("src/app/api/ai/extract/route.ts") || exists("src/app/api/carnos/extract/route.ts"));
check("Zod import exists in action validation", includes("src/lib/actions/validate-proposed-action.ts", "zod") || includes("src/lib/actions/validate-proposed-action.ts", "Zod"));

section("Current conclusion");

console.log(`
If any line says a page still claims creation/confirmation is disabled,
that is not automatically a code failure, but it means the earlier source chunk is not honestly complete yet.

Patch target before Grimoire:
- Chunk 06 Goals/Proof
- Chunk 07 Calendar/Timeline
- Chunk 08 Carnos Chat persistence
- Chunk 09 AI Extraction/Pending Updates confirmation wiring
`);

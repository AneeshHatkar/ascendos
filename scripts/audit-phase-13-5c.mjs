import fs from "node:fs";

const requiredFiles = [
  "supabase/migrations/0019_phase13_5c_calendar_timeline_routine_foundation.sql",
  "src/lib/repositories/calendar-routine-read.ts",
  "src/lib/dashboard/calendar-routine-dashboard-data-helpers.ts",
  "src/app/calendar/page.tsx",
  "src/components/dashboard/calendar-dashboard-v1.tsx",
  "docs/database/PHASE_13_5C_CALENDAR_TIMELINE_ROUTINE_SCHEMA_DESIGN.md",
  "docs/phase-reports/PHASE_13_5C_CALENDAR_TIMELINE_ROUTINE_COMPLETION_REPORT.md",
  "docs/qa/PHASE_13_5C_CALENDAR_TIMELINE_ROUTINE_MANUAL_SMOKE_CHECKLIST.md",
  "src/lib/timeline/write-timeline-event.ts",
];

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

for (const file of requiredFiles) {
  read(file);
}

const migration = requireIncludes(
  "supabase/migrations/0019_phase13_5c_calendar_timeline_routine_foundation.sql",
  [
    "create table if not exists public.calendar_blocks",
    "create table if not exists public.routines",
    "create table if not exists public.routine_steps",
    "create table if not exists public.reminders",
    "alter table public.calendar_blocks enable row level security;",
    "alter table public.routines enable row level security;",
    "alter table public.routine_steps enable row level security;",
    "alter table public.reminders enable row level security;",
    "Users can view their own calendar blocks",
    "Users can view their own routines",
    "Users can view their own routine steps",
    "Users can view their own reminders",
    "timeline_events",
    "public.events remains the canonical SQL-backed timeline/event spine",
  ],
);

if (/create\s+table\s+if\s+not\s+exists\s+public\.timeline_events/i.test(migration)) {
  failures.push("Phase 13.5C must not create public.timeline_events.");
}

requireIncludes("src/lib/repositories/calendar-routine-read.ts", [
  "listCalendarBlocks",
  "listRoutines",
  "listRoutineSteps",
  "listReminders",
  ".from(\"calendar_blocks\")",
  ".from(\"routines\")",
  ".from(\"routine_steps\")",
  ".from(\"reminders\")",
]);

requireExcludes("src/lib/repositories/calendar-routine-read.ts", [
  ".insert(",
  ".update(",
  ".delete(",
  ".upsert(",
  "executeApprovedAction(",
  "createProposedAction(",
  "generateText",
  "streamText",
  "OpenAI",
  "openai",
]);

requireIncludes("src/lib/repositories/index.ts", [
  'export * from "./calendar-routine-read";',
]);

requireIncludes("src/lib/dashboard/index.ts", [
  'export * from "./calendar-routine-dashboard-data-helpers";',
]);

requireIncludes("src/lib/dashboard/calendar-routine-dashboard-data-helpers.ts", [
  "getCalendarRoutineDashboardDataSummary",
  "calendar_blocks",
  "routines",
  "routine_steps",
  "reminders",
  "read_only_boundary: true",
  "timeline_events remains deferred",
]);

requireExcludes("src/lib/dashboard/calendar-routine-dashboard-data-helpers.ts", [
  ".insert(",
  ".update(",
  ".delete(",
  ".upsert(",
  "executeApprovedAction(",
  "createProposedAction(",
  "generateText",
  "streamText",
  "OpenAI",
  "openai",
]);

requireIncludes("src/app/calendar/page.tsx", [
  "getCalendarRoutineDashboardDataSummary",
  "calendarRoutineData",
]);

requireIncludes("src/components/dashboard/calendar-dashboard-v1.tsx", [
  "CalendarRoutineDashboardDataResult",
  "Calendar, routine, and reminder foundation",
  "calendar_blocks",
  "routines",
  "routine_steps",
  "reminders",
  "timeline_events remains deferred",
  "does not create",
  "autonomous scheduling",
]);

requireExcludes("src/components/dashboard/calendar-dashboard-v1.tsx", [
  ".insert(",
  ".update(",
  ".delete(",
  ".upsert(",
  ".from(",
  "executeApprovedAction(",
  "createProposedAction(",
  "generateText",
  "streamText",
  "OpenAI",
  "openai",
]);

requireIncludes("src/lib/timeline/write-timeline-event.ts", [
  "timeline_events table is not defined",
  "status: \"skipped\"",
]);

requireIncludes("docs/database/PHASE_13_5C_CALENDAR_TIMELINE_ROUTINE_SCHEMA_DESIGN.md", [
  "calendar_blocks",
  "routines",
  "routine_steps",
  "reminders",
  "`timeline_events` remains deferred",
]);

requireIncludes("docs/phase-reports/PHASE_13_5C_CALENDAR_TIMELINE_ROUTINE_COMPLETION_REPORT.md", [
  "Phase 13.5C",
  "Calendar / Timeline / Routine",
  "`timeline_events` is intentionally not added",
  "Verification gates",
]);

requireIncludes("docs/qa/PHASE_13_5C_CALENDAR_TIMELINE_ROUTINE_MANUAL_SMOKE_CHECKLIST.md", [
  "/calendar",
  "/timeline",
  "No reminder is sent",
  "`timeline_events` is not created",
]);

const pkg = JSON.parse(read("package.json"));
if (!pkg.scripts?.["audit:phase13_5c"]) {
  failures.push("package.json missing audit:phase13_5c script.");
}
if (!pkg.scripts?.check?.includes("audit:phase13_5c")) {
  failures.push("package.json check script does not include audit:phase13_5c.");
}

if (failures.length > 0) {
  console.error("Phase 13.5C audit failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log("Phase 13.5C calendar/timeline/routine repair audit passed.");

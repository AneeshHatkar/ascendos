import {
  listCalendarBlocks,
  listReminders,
  listRoutineSteps,
  listRoutines,
} from "@/lib/repositories/calendar-routine-read";

export type CalendarRoutineDashboardSummary = {
  calendar_block_count: number;
  active_routine_count: number;
  routine_step_count: number;
  pending_reminder_count: number;
  read_warning_count: number;
};

export type CalendarRoutineDashboardDataResult = {
  summary: CalendarRoutineDashboardSummary;
  warnings: string[];
  source_tables: string[];
  read_only_boundary: true;
  timeline_events_decision: string;
};

function warningFor(label: string, error: string | null) {
  return error ? `${label}: ${error}` : null;
}

export async function getCalendarRoutineDashboardDataSummary(
  userId: string,
): Promise<CalendarRoutineDashboardDataResult> {
  const [calendarBlocks, routines, routineSteps, reminders] = await Promise.all([
    listCalendarBlocks(userId, { limit: 50 }),
    listRoutines(userId, { limit: 50, status: "active" }),
    listRoutineSteps(userId, { limit: 100 }),
    listReminders(userId, { limit: 50, status: "pending" }),
  ]);

  const warnings = [
    warningFor("calendar_blocks", calendarBlocks.error),
    warningFor("routines", routines.error),
    warningFor("routine_steps", routineSteps.error),
    warningFor("reminders", reminders.error),
  ].filter((warning): warning is string => Boolean(warning));

  return {
    summary: {
      calendar_block_count: calendarBlocks.data.length,
      active_routine_count: routines.data.length,
      routine_step_count: routineSteps.data.length,
      pending_reminder_count: reminders.data.length,
      read_warning_count: warnings.length,
    },
    warnings,
    source_tables: ["calendar_blocks", "routines", "routine_steps", "reminders"],
    read_only_boundary: true,
    timeline_events_decision:
      "timeline_events remains deferred; public.events is the v1 timeline/event spine.",
  };
}

import {
  AuthenticatedDashboardShell,
  CalendarDashboardV1,
  DataList,
  EmptyState,
  MetricTile,
  SectionCard,
  StatusPill,
  type DataListItem,
} from "@/components/dashboard";
import { getDashboardDataSummary } from "@/lib/dashboard";
import { listEvents, listTasks } from "@/lib/repositories";
import { createSupabaseServerClient } from "@/lib/supabase/server";

type RecordValue = string | number | boolean | null | undefined;
type CalendarRecord = Record<string, RecordValue>;

type CalendarGroup = {
  label: string;
  description: string;
  rows: CalendarRecord[];
  error?: string;
};

function extractRows(result: unknown): CalendarRecord[] {
  if (Array.isArray(result)) {
    return result.filter((item): item is CalendarRecord => {
      return item !== null && typeof item === "object" && !Array.isArray(item);
    });
  }

  if (
    result &&
    typeof result === "object" &&
    "data" in result &&
    Array.isArray((result as { data?: unknown }).data)
  ) {
    return (result as { data: unknown[] }).data.filter(
      (item): item is CalendarRecord =>
        item !== null && typeof item === "object" && !Array.isArray(item),
    );
  }

  return [];
}

function extractError(result: unknown): string | undefined {
  if (
    result &&
    typeof result === "object" &&
    "error" in result &&
    (typeof (result as { error?: unknown }).error === "string" ||
      (result as { error?: unknown }).error === null)
  ) {
    return (result as { error?: string | null }).error ?? undefined;
  }

  return undefined;
}

function readText(row: CalendarRecord, key: string, fallback = "Not set") {
  const value = row[key];

  if (typeof value === "string" && value.trim().length > 0) {
    return value;
  }

  if (typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }

  return fallback;
}

function parseDateValue(value: RecordValue): Date | null {
  if (typeof value !== "string" || value.trim().length === 0) {
    return null;
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return date;
}

function getRecordDate(row: CalendarRecord) {
  for (const key of [
    "scheduled_start_at",
    "scheduled_for",
    "due_at",
    "target_date",
    "created_at",
    "updated_at",
  ]) {
    const date = parseDateValue(row[key]);

    if (date) {
      return date;
    }
  }

  return null;
}

function formatRecordDate(row: CalendarRecord) {
  const date = getRecordDate(row);

  if (!date) {
    return "Unscheduled";
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

function isUpcoming(row: CalendarRecord) {
  const date = getRecordDate(row);

  if (!date) {
    return false;
  }

  return date.getTime() >= Date.now();
}

function toneForStatus(status: string) {
  const normalized = status.toLowerCase();

  if (["completed", "complete", "done"].includes(normalized)) {
    return "success" as const;
  }

  if (["scheduled", "pending", "open", "active"].includes(normalized)) {
    return "info" as const;
  }

  if (["blocked", "paused", "overdue"].includes(normalized)) {
    return "warning" as const;
  }

  if (["cancelled", "failed", "missed"].includes(normalized)) {
    return "danger" as const;
  }

  return "neutral" as const;
}

function recordTitle(row: CalendarRecord, fallback: string) {
  return (
    readText(row, "title", "") ||
    readText(row, "name", "") ||
    readText(row, "summary", "") ||
    fallback
  );
}

function recordDescription(row: CalendarRecord, fallback: string) {
  return (
    readText(row, "description", "") ||
    readText(row, "notes", "") ||
    readText(row, "domain", "") ||
    fallback
  );
}

function toItems(group: CalendarGroup): DataListItem[] {
  return group.rows.map((row, index) => {
    const id = readText(row, "id", `${group.label}-${index}`);
    const status = readText(row, "status", group.label);

    return {
      id,
      title: recordTitle(row, `${group.label} record`),
      description: recordDescription(row, group.description),
      meta: (
        <div className="flex flex-wrap gap-2">
          <span>{formatRecordDate(row)}</span>
          <span>Source: {group.label}</span>
          {readText(row, "domain", "") ? <span>Domain: {readText(row, "domain")}</span> : null}
        </div>
      ),
      trailing: <StatusPill label={status} tone={toneForStatus(status)} />,
    };
  });
}

async function readCalendarGroup(
  label: string,
  description: string,
  read: (userId: string, options?: { limit?: number }) => Promise<unknown>,
  userId: string,
): Promise<CalendarGroup> {
  try {
    const result = await read(userId, { limit: 50 });

    return {
      label,
      description,
      rows: extractRows(result),
      error: extractError(result),
    };
  } catch (error) {
    return {
      label,
      description,
      rows: [],
      error: error instanceof Error ? error.message : "Read failed.",
    };
  }
}

export default function CalendarPage() {
  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-6 py-8">
      <AuthenticatedDashboardShell
        title="Calendar Dashboard"
        description="Read-only view of tasks and events stored in the Phase 4 SQL spine."
      >
        {async ({ user }) => {
          const supabase = await createSupabaseServerClient();
          const dashboardData = await getDashboardDataSummary(supabase, user.id, "calendar");

          const [tasks, events] = await Promise.all([
            readCalendarGroup(
              "Tasks",
              "Execution items with due dates, schedule fields, or status metadata.",
              listTasks as (
                userId: string,
                options?: { limit?: number },
              ) => Promise<unknown>,
              user.id,
            ),
            readCalendarGroup(
              "Events",
              "Scheduled calendar and timeline records.",
              listEvents as (
                userId: string,
                options?: { limit?: number },
              ) => Promise<unknown>,
              user.id,
            ),
          ]);

          const groups = [tasks, events];
          const allRows = groups.flatMap((group) => group.rows);
          const upcomingRows = allRows.filter(isUpcoming);
          const readErrors = groups.filter((group) => group.error);
          const allItems = groups.flatMap(toItems);

          return (
            <>
              <CalendarDashboardV1 data={dashboardData} />

              <section className="rounded-3xl border border-slate-800 bg-slate-950/80 p-6 shadow-sm shadow-black/20">
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300/80">
                      calendar spine
                    </p>
                    <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-50">
                      Calendar Read View
                    </h1>
                    <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-400">
                      This page reads task and event records for the authenticated user.
                      It does not create, edit, reschedule, delete, remind, sync, or
                      auto-execute anything in Phase 5.
                    </p>
                  </div>

                  <StatusPill
                    label={readErrors.length > 0 ? "Read warning" : "Read-only mode"}
                    tone={readErrors.length > 0 ? "warning" : "success"}
                  />
                </div>
              </section>

              <section className="grid gap-4 md:grid-cols-3">
                <MetricTile
                  label="Tasks"
                  value={tasks.rows.length}
                  description={tasks.error ? `Read warning: ${tasks.error}` : tasks.description}
                  className={tasks.error ? "border-amber-800/80" : ""}
                />
                <MetricTile
                  label="Events"
                  value={events.rows.length}
                  description={events.error ? `Read warning: ${events.error}` : events.description}
                  className={events.error ? "border-amber-800/80" : ""}
                />
                <MetricTile
                  label="Upcoming"
                  value={upcomingRows.length}
                  description="Records with a readable future date in this batch."
                />
              </section>

              <SectionCard
                title="Tasks and events"
                description="Combined read-only list from task and event repository helpers."
                eyebrow="Phase 5.8"
              >
                {readErrors.length > 0 ? (
                  <div className="mb-4 rounded-xl border border-amber-800/80 bg-amber-950/30 p-4 text-sm text-amber-200">
                    Some calendar reads returned warnings:{" "}
                    {readErrors.map((group) => `${group.label}: ${group.error}`).join("; ")}
                  </div>
                ) : null}

                <DataList
                  items={allItems}
                  emptyState={
                    <EmptyState
                      title="No tasks or events found"
                      description="The calendar read path is wired, but no task or event records exist for this user yet. Scheduling and creation flows remain intentionally disabled until the safe write phase."
                    />
                  }
                />

                {allRows.length > 0 ? (
                  <div className="mt-4 rounded-xl border border-slate-800 bg-slate-950/60 p-4 text-sm text-slate-400">
                    Total readable calendar records in this batch:{" "}
                    <span className="font-semibold text-slate-100">{allRows.length}</span>
                  </div>
                ) : null}
              </SectionCard>
            </>
          );
        }}
      </AuthenticatedDashboardShell>
    </main>
  );
}

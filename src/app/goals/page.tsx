import {
  AuthenticatedDashboardShell,
  DataList,
  EmptyState,
  GoalsDashboardV1,
  MetricTile,
  SectionCard,
  StatusPill,
  type DataListItem,
} from "@/components/dashboard";
import { getDashboardDataSummary } from "@/lib/dashboard";
import { listGoals } from "@/lib/repositories";
import { createSupabaseServerClient } from "@/lib/supabase/server";

type RecordValue = string | number | boolean | null | undefined;
type GoalRecord = Record<string, RecordValue>;

function extractRows(result: unknown): GoalRecord[] {
  if (Array.isArray(result)) {
    return result.filter((item): item is GoalRecord => {
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
      (item): item is GoalRecord =>
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

function readText(row: GoalRecord, key: string, fallback = "Not set") {
  const value = row[key];

  if (typeof value === "string" && value.trim().length > 0) {
    return value;
  }

  if (typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }

  return fallback;
}

function readDate(row: GoalRecord, key: string) {
  const value = row[key];

  if (typeof value !== "string" || value.trim().length === 0) {
    return "No target date";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

function toneForStatus(status: string) {
  const normalized = status.toLowerCase();

  if (["active", "in_progress", "open"].includes(normalized)) {
    return "success" as const;
  }

  if (["blocked", "paused", "at_risk"].includes(normalized)) {
    return "warning" as const;
  }

  if (["cancelled", "failed", "archived"].includes(normalized)) {
    return "danger" as const;
  }

  if (["complete", "completed", "done"].includes(normalized)) {
    return "info" as const;
  }

  return "neutral" as const;
}

function toGoalListItems(goals: GoalRecord[]): DataListItem[] {
  return goals.map((goal, index) => {
    const id = readText(goal, "id", `goal-${index}`);
    const title = readText(goal, "title", "Untitled goal");
    const domain = readText(goal, "domain");
    const status = readText(goal, "status", "unknown");
    const priority = readText(goal, "priority");
    const horizon = readText(goal, "horizon");
    const targetDate = readDate(goal, "target_date");

    return {
      id,
      title,
      description: readText(goal, "description", "No description yet."),
      meta: (
        <div className="flex flex-wrap gap-2">
          <span>Domain: {domain}</span>
          <span>Priority: {priority}</span>
          <span>Horizon: {horizon}</span>
          <span>Target: {targetDate}</span>
        </div>
      ),
      trailing: <StatusPill label={status} tone={toneForStatus(status)} />,
    };
  });
}

export default function GoalsPage() {
  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-6 py-8">
      <AuthenticatedDashboardShell
        title="Goals Dashboard"
        description="Read-only view of goals stored in the Phase 4 SQL spine."
      >
        {async ({ user }) => {
          const supabase = await createSupabaseServerClient();
          const dashboardData = await getDashboardDataSummary(supabase, user.id, "goals");

          const result = await listGoals(user.id, { limit: 100 });
          const goals = extractRows(result);
          const error = extractError(result);
          const activeGoals = goals.filter((goal) => {
            const status = readText(goal, "status", "").toLowerCase();
            return ["active", "in_progress", "open"].includes(status);
          }).length;
          const completedGoals = goals.filter((goal) => {
            const status = readText(goal, "status", "").toLowerCase();
            return ["complete", "completed", "done"].includes(status);
          }).length;

          return (
            <>
              <GoalsDashboardV1 data={dashboardData} />

              <section className="rounded-3xl border border-slate-800 bg-slate-950/80 p-6 shadow-sm shadow-black/20">
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300/80">
                      dream ladder
                    </p>
                    <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-50">
                      Goals Read View
                    </h1>
                    <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-400">
                      This page reads goal records from the SQL-backed goals table.
                      It does not create, edit, delete, reorder, score, or execute goals yet.
                    </p>
                  </div>

                  <StatusPill
                    label={error ? "Read warning" : "Read-only mode"}
                    tone={error ? "warning" : "success"}
                  />
                </div>
              </section>

              <section className="grid gap-4 md:grid-cols-3">
                <MetricTile
                  label="Total goals"
                  value={goals.length}
                  description="Goal records returned for the current user."
                />
                <MetricTile
                  label="Active"
                  value={activeGoals}
                  description="Goals with active, open, or in-progress status."
                />
                <MetricTile
                  label="Completed"
                  value={completedGoals}
                  description="Goals marked complete, completed, or done."
                />
              </section>

              <SectionCard
                title="Goal records"
                description="Read-only list from the goals repository helper."
                eyebrow="Phase 5.5"
              >
                {error ? (
                  <div className="mb-4 rounded-xl border border-amber-800/80 bg-amber-950/30 p-4 text-sm text-amber-200">
                    Read warning: {error}
                  </div>
                ) : null}

                <DataList
                  items={toGoalListItems(goals)}
                  emptyState={
                    <EmptyState
                      title="No goals found"
                      description="The goals read path is wired, but no goal records exist for this user yet. Goal creation remains intentionally disabled until the safe write/proposed-action phase."
                    />
                  }
                />
              </SectionCard>
            </>
          );
        }}
      </AuthenticatedDashboardShell>
    </main>
  );
}

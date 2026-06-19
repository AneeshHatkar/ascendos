import {
  AuthenticatedDashboardShell,
  EmptyState,
  MetricTile,
  SectionCard,
  StatusPill,
} from "@/components/dashboard";
import {
  listAiActions,
  listDailyLogs,
  listEvents,
  listGoals,
  listProofItems,
  listTasks,
} from "@/lib/repositories";

type ReadRepository = (
  userId: string,
  options?: { limit?: number },
) => Promise<unknown>;

type CommandMetric = {
  label: string;
  value: number;
  description: string;
  error?: string;
};

function extractRows(result: unknown): unknown[] {
  if (Array.isArray(result)) {
    return result;
  }

  if (
    result &&
    typeof result === "object" &&
    "data" in result &&
    Array.isArray((result as { data?: unknown }).data)
  ) {
    return (result as { data: unknown[] }).data;
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

async function readMetric(
  label: string,
  description: string,
  read: ReadRepository,
  userId: string,
): Promise<CommandMetric> {
  try {
    const result = await read(userId, { limit: 100 });
    const rows = extractRows(result);

    return {
      label,
      value: rows.length,
      description,
      error: extractError(result),
    };
  } catch (error) {
    return {
      label,
      value: 0,
      description,
      error: error instanceof Error ? error.message : "Read failed.",
    };
  }
}

export default function CommandPage() {
  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-6 py-8">
      <AuthenticatedDashboardShell
        title="Command Dashboard"
        description="Read-only operating view across your current ascendOS SQL spine."
      >
        {async ({ user }) => {
          const metrics = await Promise.all([
            readMetric(
              "Goals",
              "Tracked dreams, outcomes, and active ladders from the goals table.",
              listGoals as ReadRepository,
              user.id,
            ),
            readMetric(
              "Tasks",
              "Execution items available from the tasks table.",
              listTasks as ReadRepository,
              user.id,
            ),
            readMetric(
              "Events",
              "Scheduled timeline/calendar records from the events table.",
              listEvents as ReadRepository,
              user.id,
            ),
            readMetric(
              "Proof",
              "Recent proof artifacts available from the proof_items table.",
              listProofItems as ReadRepository,
              user.id,
            ),
            readMetric(
              "Daily Logs",
              "Daily operating records available from the daily_logs table.",
              listDailyLogs as ReadRepository,
              user.id,
            ),
            readMetric(
              "AI Actions",
              "Carnos proposed-action records available from the ai_actions table.",
              listAiActions as ReadRepository,
              user.id,
            ),
          ]);

          const readErrors = metrics.filter((metric) => metric.error);
          const totalRows = metrics.reduce((sum, metric) => sum + metric.value, 0);

          return (
            <>
              <section className="rounded-3xl border border-slate-800 bg-slate-950/80 p-6 shadow-sm shadow-black/20">
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300/80">
                      ascendOS command
                    </p>
                    <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-50">
                      System Read Overview
                    </h1>
                    <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-400">
                      This page is now connected to the Phase 4 read-only repository layer.
                      It summarizes the current authenticated user&apos;s SQL-backed records
                      without creating, editing, deleting, generating, or executing anything.
                    </p>
                  </div>

                  <StatusPill
                    label="Read-only mode"
                    tone={readErrors.length > 0 ? "warning" : "success"}
                  />
                </div>
              </section>

              <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {metrics.map((metric) => (
                  <MetricTile
                    key={metric.label}
                    label={metric.label}
                    value={metric.value}
                    description={
                      metric.error
                        ? `Read warning: ${metric.error}`
                        : metric.description
                    }
                    className={metric.error ? "border-amber-800/80" : ""}
                  />
                ))}
              </section>

              <SectionCard
                title="Read integration status"
                description="Phase 5.4 proves the command dashboard can safely read from the Phase 4 SQL spine."
                eyebrow="Phase 5.4"
              >
                {totalRows === 0 ? (
                  <EmptyState
                    title="No dashboard records yet"
                    description="The read layer is wired, but there are no records to display yet or Supabase has not been populated for this user. Write flows are intentionally disabled in this phase."
                  />
                ) : (
                  <div className="grid gap-3 text-sm text-slate-300 md:grid-cols-2">
                    <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
                      <p className="font-medium text-slate-100">Total readable records</p>
                      <p className="mt-2 text-2xl font-semibold text-slate-50">
                        {totalRows}
                      </p>
                      <p className="mt-2 text-slate-400">
                        Combined count from the first read batch across core tables.
                      </p>
                    </div>

                    <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
                      <p className="font-medium text-slate-100">Mutation boundary</p>
                      <p className="mt-2 text-slate-400">
                        No writes, memory, Carnos generation, or action execution are
                        enabled from this dashboard.
                      </p>
                    </div>
                  </div>
                )}
              </SectionCard>
            </>
          );
        }}
      </AuthenticatedDashboardShell>
    </main>
  );
}

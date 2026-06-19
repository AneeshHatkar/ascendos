import {
  AuthenticatedDashboardShell,
  DataList,
  EmptyState,
  MetricTile,
  SectionCard,
  StatusPill,
  type DataListItem,
} from "@/components/dashboard";
import { listDailyLogs, listProofItems } from "@/lib/repositories";

type RecordValue = string | number | boolean | null | undefined;
type AnalyticsRecord = Record<string, RecordValue>;

function extractRows(result: unknown): AnalyticsRecord[] {
  if (Array.isArray(result)) {
    return result.filter((item): item is AnalyticsRecord => {
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
      (item): item is AnalyticsRecord =>
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

function readText(row: AnalyticsRecord, key: string, fallback = "Not set") {
  const value = row[key];

  if (typeof value === "string" && value.trim().length > 0) {
    return value;
  }

  if (typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }

  return fallback;
}

function readNumber(row: AnalyticsRecord, key: string) {
  const value = row[key];

  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === "string") {
    const parsed = Number(value);

    if (Number.isFinite(parsed)) {
      return parsed;
    }
  }

  return 0;
}

function readTimestamp(row: AnalyticsRecord) {
  for (const key of ["log_date", "occurred_at", "created_at", "updated_at"]) {
    const value = row[key];

    if (typeof value === "string" && value.trim().length > 0) {
      const date = new Date(value);

      if (!Number.isNaN(date.getTime())) {
        return new Intl.DateTimeFormat("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }).format(date);
      }

      return value;
    }
  }

  return "No timestamp";
}

function toDailyLogItems(rows: AnalyticsRecord[]): DataListItem[] {
  return rows.map((row, index) => {
    const id = readText(row, "id", `daily-log-${index}`);
    const status = readText(row, "status", "daily log");

    return {
      id,
      title: readText(row, "log_date", `Daily log ${index + 1}`),
      description:
        readText(row, "summary", "") ||
        readText(row, "reflection", "") ||
        readText(row, "notes", "") ||
        "No daily log summary is available yet.",
      meta: (
        <div className="flex flex-wrap gap-2">
          <span>{readTimestamp(row)}</span>
          <span>Energy: {readNumber(row, "energy_score")}</span>
          <span>Reality: {readNumber(row, "reality_score")}</span>
        </div>
      ),
      trailing: <StatusPill label={status} tone="neutral" />,
    };
  });
}

async function readRows(
  read: (userId: string, options?: { limit?: number }) => Promise<unknown>,
  userId: string,
) {
  try {
    const result = await read(userId, { limit: 50 });
    return {
      rows: extractRows(result),
      error: extractError(result),
    };
  } catch (error) {
    return {
      rows: [],
      error: error instanceof Error ? error.message : "Read failed.",
    };
  }
}

export default function AnalyticsPage() {
  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-6 py-8">
      <AuthenticatedDashboardShell
        title="Analytics Dashboard"
        description="Read-only proof and daily log summary surface."
      >
        {async ({ user }) => {
          const [proofResult, logsResult] = await Promise.all([
            readRows(
              listProofItems as (
                userId: string,
                options?: { limit?: number },
              ) => Promise<unknown>,
              user.id,
            ),
            readRows(
              listDailyLogs as (
                userId: string,
                options?: { limit?: number },
              ) => Promise<unknown>,
              user.id,
            ),
          ]);

          const proofRows = proofResult.rows;
          const logRows = logsResult.rows;
          const readErrors = [proofResult.error, logsResult.error].filter(Boolean);
          const proofScoreTotal = proofRows.reduce(
            (sum, row) => sum + readNumber(row, "proof_score"),
            0,
          );
          const realityScoreTotal = logRows.reduce(
            (sum, row) => sum + readNumber(row, "reality_score"),
            0,
          );
          const energyScoreTotal = logRows.reduce(
            (sum, row) => sum + readNumber(row, "energy_score"),
            0,
          );

          return (
            <>
              <section className="rounded-3xl border border-slate-800 bg-slate-950/80 p-6 shadow-sm shadow-black/20">
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300/80">
                      analytics preview
                    </p>
                    <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-50">
                      Proof Analytics Read View
                    </h1>
                    <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-400">
                      This page summarizes proof and daily log reads without generating charts,
                      recommendations, reviews, or AI analytics yet.
                    </p>
                  </div>

                  <StatusPill
                    label={readErrors.length > 0 ? "Read warning" : "Read-only mode"}
                    tone={readErrors.length > 0 ? "warning" : "success"}
                  />
                </div>
              </section>

              <section className="grid gap-4 md:grid-cols-4">
                <MetricTile
                  label="Proof records"
                  value={proofRows.length}
                  description={proofResult.error ? `Read warning: ${proofResult.error}` : "Proof records in the current read batch."}
                  className={proofResult.error ? "border-amber-800/80" : ""}
                />
                <MetricTile
                  label="Daily logs"
                  value={logRows.length}
                  description={logsResult.error ? `Read warning: ${logsResult.error}` : "Daily log records in the current read batch."}
                  className={logsResult.error ? "border-amber-800/80" : ""}
                />
                <MetricTile
                  label="Proof total"
                  value={proofScoreTotal}
                  description="Sum of proof_score values in this batch."
                />
                <MetricTile
                  label="Energy total"
                  value={energyScoreTotal || realityScoreTotal}
                  description="Energy score total when present, otherwise reality score total."
                />
              </section>

              <SectionCard
                title="Recent daily logs"
                description="Read-only daily log records. Full analytics and charts are deferred."
                eyebrow="Phase 5.9"
              >
                <DataList
                  items={toDailyLogItems(logRows)}
                  emptyState={
                    <EmptyState
                      title="No daily logs found"
                      description="The daily log analytics read path is wired, but no daily log records exist for this user yet. Logging and analysis flows remain deferred."
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

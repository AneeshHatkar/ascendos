import { CalendarTimelineProposalComposer } from "@/components/calendar/calendar-timeline-proposal-composer";
import {
  AuthenticatedDashboardShell,
  DataList,
  EmptyState,
  MetricTile,
  SectionCard,
  StatusPill,
  TimelineDashboardV1,
  type DataListItem,
} from "@/components/dashboard";
import { getDashboardDataSummary } from "@/lib/dashboard";
import { listAuditLogs, listEvents, listProofItems } from "@/lib/repositories";
import { createSupabaseServerClient } from "@/lib/supabase/server";

type RecordValue = string | number | boolean | null | undefined;
type TimelineRecord = Record<string, RecordValue>;

type TimelineGroup = {
  label: string;
  description: string;
  rows: TimelineRecord[];
  error?: string;
};

function extractRows(result: unknown): TimelineRecord[] {
  if (Array.isArray(result)) {
    return result.filter((item): item is TimelineRecord => {
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
      (item): item is TimelineRecord =>
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

function readText(row: TimelineRecord, key: string, fallback = "Not set") {
  const value = row[key];

  if (typeof value === "string" && value.trim().length > 0) {
    return value;
  }

  if (typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }

  return fallback;
}

function readTimestamp(row: TimelineRecord) {
  for (const key of [
    "occurred_at",
    "scheduled_start_at",
    "logged_at",
    "created_at",
    "updated_at",
  ]) {
    const value = row[key];

    if (typeof value === "string" && value.trim().length > 0) {
      const date = new Date(value);

      if (!Number.isNaN(date.getTime())) {
        return new Intl.DateTimeFormat("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
          hour: "numeric",
          minute: "2-digit",
        }).format(date);
      }

      return value;
    }
  }

  return "No timestamp";
}

function toneForRecord(row: TimelineRecord) {
  const status = readText(row, "status", "").toLowerCase();
  const action = readText(row, "action", "").toLowerCase();
  const eventType = readText(row, "event_type", "").toLowerCase();

  if (["completed", "complete", "done", "executed", "approved"].includes(status)) {
    return "success" as const;
  }

  if (["failed", "rejected", "cancelled", "deleted"].includes(status)) {
    return "danger" as const;
  }

  if (["pending", "pending_confirmation", "draft", "scheduled"].includes(status)) {
    return "warning" as const;
  }

  if (action || eventType) {
    return "info" as const;
  }

  return "neutral" as const;
}

function titleForRecord(row: TimelineRecord, fallback: string) {
  return (
    readText(row, "title", "") ||
    readText(row, "summary", "") ||
    readText(row, "action", "") ||
    readText(row, "event_type", "") ||
    fallback
  );
}

function descriptionForRecord(row: TimelineRecord, fallback: string) {
  return (
    readText(row, "description", "") ||
    readText(row, "content", "") ||
    readText(row, "note", "") ||
    readText(row, "target_table", "") ||
    fallback
  );
}

function toTimelineItems(group: TimelineGroup): DataListItem[] {
  return group.rows.map((row, index) => {
    const id = readText(row, "id", `${group.label}-${index}`);
    const status = readText(row, "status", readText(row, "action", group.label));

    return {
      id,
      title: titleForRecord(row, `${group.label} record`),
      description: descriptionForRecord(row, group.description),
      meta: (
        <div className="flex flex-wrap gap-2">
          <span>{readTimestamp(row)}</span>
          <span>Source: {group.label}</span>
          {readText(row, "domain", "") ? <span>Domain: {readText(row, "domain")}</span> : null}
        </div>
      ),
      trailing: <StatusPill label={status} tone={toneForRecord(row)} />,
    };
  });
}

async function readTimelineGroup(
  label: string,
  description: string,
  read: (userId: string, options?: { limit?: number }) => Promise<unknown>,
  userId: string,
): Promise<TimelineGroup> {
  try {
    const result = await read(userId, { limit: 25 });

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

export default function TimelinePage() {
  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-6 py-8">
      <AuthenticatedDashboardShell
        title="Timeline Dashboard"
        description="Timeline view across events, proof, and audit records with proposal-first task capture."
      >
        {async ({ user }) => {
          const supabase = await createSupabaseServerClient();
          const dashboardData = await getDashboardDataSummary(supabase, user.id, "timeline");

          const groups = await Promise.all([
            readTimelineGroup(
              "Events",
              "Scheduled life, career, study, and system timeline records.",
              listEvents as (userId: string, options?: { limit?: number }) => Promise<unknown>,
              user.id,
            ),
            readTimelineGroup(
              "Proof",
              "Evidence records connected to progress, execution, and reality tracking.",
              listProofItems as (userId: string, options?: { limit?: number }) => Promise<unknown>,
              user.id,
            ),
            readTimelineGroup(
              "Audit",
              "System audit records for traceability and future accountability.",
              listAuditLogs as (userId: string, options?: { limit?: number }) => Promise<unknown>,
              user.id,
            ),
          ]);

          const totalRows = groups.reduce((sum, group) => sum + group.rows.length, 0);
          const readErrors = groups.filter((group) => group.error);
          const allItems = groups.flatMap(toTimelineItems);

          return (
            <>
              <TimelineDashboardV1 data={dashboardData} />

              <section className="rounded-3xl border border-slate-800 bg-slate-950/80 p-6 shadow-sm shadow-black/20">
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300/80">
                      time spine
                    </p>
                    <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-50">
                      Timeline Read View
                    </h1>
                    <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-400">
                      This page reads from events, proof items, and audit logs.
                      It can capture pending task proposals, but it does not
                      directly edit, delete, execute, or write final records.
                    </p>
                  </div>

                  <StatusPill
                    label={readErrors.length > 0 ? "Read warning" : "Proposal mode"}
                    tone={readErrors.length > 0 ? "warning" : "success"}
                  />
                </div>
              </section>

              <CalendarTimelineProposalComposer surface="timeline" />

              <section className="grid gap-4 md:grid-cols-3">
                {groups.map((group) => (
                  <MetricTile
                    key={group.label}
                    label={group.label}
                    value={group.rows.length}
                    description={
                      group.error
                        ? `Read warning: ${group.error}`
                        : group.description
                    }
                    className={group.error ? "border-amber-800/80" : ""}
                  />
                ))}
              </section>

              <SectionCard
                title="Recent timeline records"
                description="Combined read-only view from the first batch of timeline-relevant repositories."
                eyebrow="Phase 5.6"
              >
                {readErrors.length > 0 ? (
                  <div className="mb-4 rounded-xl border border-amber-800/80 bg-amber-950/30 p-4 text-sm text-amber-200">
                    Some timeline reads returned warnings:{" "}
                    {readErrors.map((group) => `${group.label}: ${group.error}`).join("; ")}
                  </div>
                ) : null}

                <DataList
                  items={allItems}
                  emptyState={
                    <EmptyState
                      title="No timeline records found"
                      description="The timeline read path is wired, but no events, proof items, or audit records are available for this user yet. Use the proposal composer above to create a pending task proposal for review."
                    />
                  }
                />

                {totalRows > 0 ? (
                  <div className="mt-4 rounded-xl border border-slate-800 bg-slate-950/60 p-4 text-sm text-slate-400">
                    Total readable timeline records in this batch:{" "}
                    <span className="font-semibold text-slate-100">{totalRows}</span>
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

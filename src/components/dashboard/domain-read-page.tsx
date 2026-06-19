import {
  AuthenticatedDashboardShell,
  DataList,
  EmptyState,
  MetricTile,
  SectionCard,
  StatusPill,
  type DataListItem,
} from "@/components/dashboard";
import { listEvents, listGoals, listProofItems, listTasks } from "@/lib/repositories";

type RecordValue = string | number | boolean | null | undefined;
type DomainRecord = Record<string, RecordValue>;

type DomainConfig = {
  routeTitle: string;
  eyebrow: string;
  description: string;
  domainKey: string;
  domainAliases: string[];
  emptyTitle: string;
  emptyDescription: string;
};

type DomainGroup = {
  label: string;
  description: string;
  rows: DomainRecord[];
  error?: string;
};

function extractRows(result: unknown): DomainRecord[] {
  if (Array.isArray(result)) {
    return result.filter((item): item is DomainRecord => {
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
      (item): item is DomainRecord =>
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

function readText(row: DomainRecord, key: string, fallback = "Not set") {
  const value = row[key];

  if (typeof value === "string" && value.trim().length > 0) {
    return value;
  }

  if (typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }

  return fallback;
}

function readTimestamp(row: DomainRecord) {
  for (const key of [
    "target_date",
    "due_at",
    "scheduled_start_at",
    "occurred_at",
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
        }).format(date);
      }

      return value;
    }
  }

  return "No timestamp";
}

function matchesDomain(row: DomainRecord, aliases: string[]) {
  const normalizedAliases = aliases.map((alias) => alias.toLowerCase());

  const candidates = [
    readText(row, "domain", ""),
    readText(row, "category", ""),
    readText(row, "area", ""),
    readText(row, "life_area", ""),
    readText(row, "source_type", ""),
  ].map((value) => value.toLowerCase());

  return candidates.some((candidate) => {
    return normalizedAliases.some((alias) => candidate.includes(alias));
  });
}

function toneForStatus(status: string) {
  const normalized = status.toLowerCase();

  if (["active", "open", "in_progress", "scheduled"].includes(normalized)) {
    return "success" as const;
  }

  if (["pending", "draft", "planned"].includes(normalized)) {
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

function toItems(group: DomainGroup, config: DomainConfig): DataListItem[] {
  return group.rows.map((row, index) => {
    const id = readText(row, "id", `${config.domainKey}-${group.label}-${index}`);
    const status = readText(row, "status", group.label);

    return {
      id,
      title:
        readText(row, "title", "") ||
        readText(row, "name", "") ||
        readText(row, "summary", "") ||
        `${group.label} record`,
      description:
        readText(row, "description", "") ||
        readText(row, "notes", "") ||
        readText(row, "content", "") ||
        group.description,
      meta: (
        <div className="flex flex-wrap gap-2">
          <span>{readTimestamp(row)}</span>
          <span>Source: {group.label}</span>
          <span>Domain: {readText(row, "domain", config.domainKey)}</span>
        </div>
      ),
      trailing: <StatusPill label={status} tone={toneForStatus(status)} />,
    };
  });
}

async function readGroup(
  label: string,
  description: string,
  read: (userId: string, options?: { limit?: number }) => Promise<unknown>,
  userId: string,
  config: DomainConfig,
): Promise<DomainGroup> {
  try {
    const result = await read(userId, { limit: 100 });
    const rows = extractRows(result).filter((row) => matchesDomain(row, config.domainAliases));

    return {
      label,
      description,
      rows,
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

export function DomainReadPage({ config }: { config: DomainConfig }) {
  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-6 py-8">
      <AuthenticatedDashboardShell title={config.routeTitle} description={config.description}>
        {async ({ user }) => {
          const groups = await Promise.all([
            readGroup(
              "Goals",
              "Domain-matched goals from the goals table.",
              listGoals as (
                userId: string,
                options?: { limit?: number },
              ) => Promise<unknown>,
              user.id,
              config,
            ),
            readGroup(
              "Tasks",
              "Domain-matched execution items from the tasks table.",
              listTasks as (
                userId: string,
                options?: { limit?: number },
              ) => Promise<unknown>,
              user.id,
              config,
            ),
            readGroup(
              "Events",
              "Domain-matched events from the events table.",
              listEvents as (
                userId: string,
                options?: { limit?: number },
              ) => Promise<unknown>,
              user.id,
              config,
            ),
            readGroup(
              "Proof",
              "Domain-matched proof records from the proof_items table.",
              listProofItems as (
                userId: string,
                options?: { limit?: number },
              ) => Promise<unknown>,
              user.id,
              config,
            ),
          ]);

          const totalRows = groups.reduce((sum, group) => sum + group.rows.length, 0);
          const readErrors = groups.filter((group) => group.error);
          const allItems = groups.flatMap((group) => toItems(group, config));

          return (
            <>
              <section className="rounded-3xl border border-slate-800 bg-slate-950/80 p-6 shadow-sm shadow-black/20">
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300/80">
                      {config.eyebrow}
                    </p>
                    <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-50">
                      {config.routeTitle}
                    </h1>
                    <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-400">
                      {config.description} This page uses filtered read-only records from
                      goals, tasks, events, and proof items. It does not create, edit,
                      delete, or execute anything in Phase 5.
                    </p>
                  </div>

                  <StatusPill
                    label={readErrors.length > 0 ? "Read warning" : "Read-only mode"}
                    tone={readErrors.length > 0 ? "warning" : "success"}
                  />
                </div>
              </section>

              <section className="grid gap-4 md:grid-cols-4">
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
                title={`${config.routeTitle} records`}
                description="Filtered read-only records from existing Phase 4 repository helpers."
                eyebrow="Phase 5.10"
              >
                {readErrors.length > 0 ? (
                  <div className="mb-4 rounded-xl border border-amber-800/80 bg-amber-950/30 p-4 text-sm text-amber-200">
                    Some domain reads returned warnings:{" "}
                    {readErrors.map((group) => `${group.label}: ${group.error}`).join("; ")}
                  </div>
                ) : null}

                <DataList
                  items={allItems}
                  emptyState={
                    <EmptyState
                      title={config.emptyTitle}
                      description={config.emptyDescription}
                    />
                  }
                />

                {totalRows > 0 ? (
                  <div className="mt-4 rounded-xl border border-slate-800 bg-slate-950/60 p-4 text-sm text-slate-400">
                    Total readable filtered records in this batch:{" "}
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

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
type ProofRecord = Record<string, RecordValue>;

type ReadGroup = {
  label: string;
  description: string;
  rows: ProofRecord[];
  error?: string;
};

function extractRows(result: unknown): ProofRecord[] {
  if (Array.isArray(result)) {
    return result.filter((item): item is ProofRecord => {
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
      (item): item is ProofRecord =>
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

function readText(row: ProofRecord, key: string, fallback = "Not set") {
  const value = row[key];

  if (typeof value === "string" && value.trim().length > 0) {
    return value;
  }

  if (typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }

  return fallback;
}

function readNumber(row: ProofRecord, key: string) {
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

function readTimestamp(row: ProofRecord) {
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

function toneForProof(row: ProofRecord) {
  const status = readText(row, "status", "").toLowerCase();
  const proofScore = readNumber(row, "proof_score");
  const realityScore = readNumber(row, "reality_score");

  if (["verified", "complete", "completed"].includes(status) || proofScore >= 80 || realityScore >= 80) {
    return "success" as const;
  }

  if (["pending", "draft"].includes(status) || proofScore > 0 || realityScore > 0) {
    return "info" as const;
  }

  if (["weak", "missing", "blocked"].includes(status)) {
    return "warning" as const;
  }

  return "neutral" as const;
}

function toProofItems(rows: ProofRecord[]): DataListItem[] {
  return rows.map((row, index) => {
    const id = readText(row, "id", `proof-${index}`);
    const title =
      readText(row, "title", "") ||
      readText(row, "proof_type", "") ||
      readText(row, "source_type", "Proof item");
    const status = readText(row, "status", readText(row, "proof_type", "proof"));

    return {
      id,
      title,
      description:
        readText(row, "description", "") ||
        readText(row, "summary", "") ||
        readText(row, "content", "") ||
        "No proof description is available yet.",
      meta: (
        <div className="flex flex-wrap gap-2">
          <span>{readTimestamp(row)}</span>
          <span>Domain: {readText(row, "domain")}</span>
          <span>Proof score: {readNumber(row, "proof_score")}</span>
        </div>
      ),
      trailing: <StatusPill label={status} tone={toneForProof(row)} />,
    };
  });
}

async function readGroup(
  label: string,
  description: string,
  read: (userId: string, options?: { limit?: number }) => Promise<unknown>,
  userId: string,
): Promise<ReadGroup> {
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

export default function WorldClassPage() {
  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-6 py-8">
      <AuthenticatedDashboardShell
        title="World-Class Path Dashboard"
        description="Read-only proof and daily log surface for reality-based progress."
      >
        {async ({ user }) => {
          const [proof, dailyLogs] = await Promise.all([
            readGroup(
              "Proof items",
              "Evidence artifacts tied to execution, progress, and reality tracking.",
              listProofItems as (
                userId: string,
                options?: { limit?: number },
              ) => Promise<unknown>,
              user.id,
            ),
            readGroup(
              "Daily logs",
              "Daily operating records that can later support reflection and review.",
              listDailyLogs as (
                userId: string,
                options?: { limit?: number },
              ) => Promise<unknown>,
              user.id,
            ),
          ]);

          const groups = [proof, dailyLogs];
          const readErrors = groups.filter((group) => group.error);
          const totalProofScore = proof.rows.reduce(
            (sum, row) => sum + readNumber(row, "proof_score"),
            0,
          );
          const totalRealityScore = dailyLogs.rows.reduce(
            (sum, row) => sum + readNumber(row, "reality_score"),
            0,
          );
          const averageProofScore =
            proof.rows.length > 0 ? Math.round(totalProofScore / proof.rows.length) : 0;
          const averageRealityScore =
            dailyLogs.rows.length > 0
              ? Math.round(totalRealityScore / dailyLogs.rows.length)
              : 0;

          return (
            <>
              <section className="rounded-3xl border border-slate-800 bg-slate-950/80 p-6 shadow-sm shadow-black/20">
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300/80">
                      proof-first growth
                    </p>
                    <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-50">
                      World-Class Read View
                    </h1>
                    <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-400">
                      This page reads proof items and daily logs to show evidence-backed
                      progress. It does not create proof, score your life, run AI review,
                      or mutate any data in Phase 5.
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
                  label="Proof items"
                  value={proof.rows.length}
                  description={proof.error ? `Read warning: ${proof.error}` : proof.description}
                  className={proof.error ? "border-amber-800/80" : ""}
                />
                <MetricTile
                  label="Daily logs"
                  value={dailyLogs.rows.length}
                  description={
                    dailyLogs.error ? `Read warning: ${dailyLogs.error}` : dailyLogs.description
                  }
                  className={dailyLogs.error ? "border-amber-800/80" : ""}
                />
                <MetricTile
                  label="Avg proof"
                  value={averageProofScore}
                  description="Average proof_score in the current read batch."
                />
                <MetricTile
                  label="Avg reality"
                  value={averageRealityScore}
                  description="Average reality_score in the current read batch."
                />
              </section>

              <SectionCard
                title="Recent proof"
                description="Read-only evidence records from the proof_items repository helper."
                eyebrow="Phase 5.9"
              >
                <DataList
                  items={toProofItems(proof.rows)}
                  emptyState={
                    <EmptyState
                      title="No proof items found"
                      description="The proof read path is wired, but no proof records exist for this user yet. Proof creation remains disabled until a later safe write phase."
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

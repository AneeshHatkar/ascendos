import {
  MetricTile,
  OperatingDashboardCard,
  OperatingDashboardGrid,
  SectionCard,
  StatusPill,
} from "@/components/dashboard";
import { CrossDashboardLinks } from "@/components/dashboard/cross-dashboard-links";
import {
  getDashboardCardsForSurface,
  type AdminFinanceDashboardDataResult,
  type DashboardDataResult,
} from "@/lib/dashboard";

interface CommandDashboardV1Props {
  data?: DashboardDataResult;
  adminFinanceData?: AdminFinanceDashboardDataResult;
}

const commandCards = getDashboardCardsForSurface("command");

function formatCount(value: number | undefined): string {
  return String(value ?? 0);
}

function formatGeneratedAt(value: string | undefined): string {
  if (!value) {
    return "Awaiting summary";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function urgencyTone(
  value: number | undefined,
): "neutral" | "success" | "warning" | "danger" {
  const count = value ?? 0;

  if (count > 0) {
    return "danger";
  }

  return "success";
}

function warningTone(
  value: number | undefined,
): "neutral" | "success" | "warning" | "danger" {
  const count = value ?? 0;

  if (count > 0) {
    return "warning";
  }

  return "success";
}

export function CommandDashboardV1({
  data,
  adminFinanceData,
}: CommandDashboardV1Props) {
  const summary = data?.summary;
  const adminSummary = adminFinanceData?.summary;
  const adminWarnings = adminFinanceData?.warnings ?? [];

  const overdueAdminCount =
    (adminSummary?.overdue_finance_count ?? 0) +
    (adminSummary?.overdue_subscription_count ?? 0) +
    (adminSummary?.overdue_document_count ?? 0);

  const dueSoonAdminCount =
    (adminSummary?.upcoming_subscription_count ?? 0) +
    (adminSummary?.upcoming_document_count ?? 0) +
    (adminSummary?.upcoming_housing_follow_up_count ?? 0);

  const adminQueueCount = overdueAdminCount + dueSoonAdminCount;

  const adminFinanceSourceTables = adminFinanceData?.source_tables ?? [
    "financial_accounts",
    "budget_categories",
    "financial_logs",
    "subscriptions",
    "documents",
    "housing_options",
    "housing_contacts",
  ];

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-sm shadow-black/20">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200">
              Phase 7 Core Operating Dashboard + Phase 12 Admin Visibility
            </p>
            <h1 className="text-3xl font-semibold text-white">
              Command Dashboard
            </h1>
            <p className="max-w-3xl text-sm text-slate-300">
              Today&apos;s operating center for goals, tasks, proof, calendar
              pressure, pending confirmations, admin deadlines, finance
              pressure, subscriptions, documents, and housing operations. This
              view is read-only and preserves the proposed-action confirmation
              boundary.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-xs text-slate-300">
            Generated: {formatGeneratedAt(data?.generated_at)}
          </div>
        </div>
      </section>

      <CrossDashboardLinks activeRoute="/command" />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {[
          ["Pending updates", formatCount(summary?.pending_updates_count)],
          ["Active goals", formatCount(summary?.active_goals_count)],
          ["Open tasks", formatCount(summary?.open_tasks_count)],
          ["Proof items", formatCount(summary?.recent_proof_count)],
          ["Events", formatCount(summary?.recent_events_count)],
        ].map(([label, value]) => (
          <div
            key={label}
            className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
              {label}
            </p>
            <p className="mt-2 text-2xl font-semibold text-white">{value}</p>
          </div>
        ))}
      </section>

      <SectionCard
        title="Admin and finance command visibility"
        eyebrow="Phase 12 read-only command layer"
        description="Command-level visibility for urgent admin work, overdue money records, subscriptions, document deadlines, and housing operations. This panel only summarizes confirmed SQL-backed reads."
      >
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <MetricTile
            label="Admin queue"
            value={formatCount(adminQueueCount)}
            description="Due-soon and overdue finance, subscription, document, and housing records."
          />
          <MetricTile
            label="Overdue"
            value={formatCount(overdueAdminCount)}
            description="Admin/finance records marked overdue or past deadline."
          />
          <MetricTile
            label="Due soon"
            value={formatCount(dueSoonAdminCount)}
            description="Records approaching their due, renewal, follow-up, or deadline window."
          />
          <MetricTile
            label="Read warnings"
            value={formatCount(adminWarnings.length)}
            description="Repository read warnings surfaced without retrying, mutating, or hiding errors."
          />
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Finance pressure
                </p>
                <p className="mt-2 text-2xl font-semibold text-white">
                  {formatCount(adminSummary?.overdue_finance_count)}
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-400">
                  Overdue finance logs tracked from financial_logs.
                </p>
              </div>
              <StatusPill
                label={
                  adminSummary?.overdue_finance_count ? "attention" : "clear"
                }
                tone={urgencyTone(adminSummary?.overdue_finance_count)}
              />
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Subscriptions
                </p>
                <p className="mt-2 text-2xl font-semibold text-white">
                  {formatCount(adminSummary?.upcoming_subscription_count)}
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-400">
                  Upcoming subscription payments visible from subscriptions.
                </p>
              </div>
              <StatusPill
                label={
                  adminSummary?.upcoming_subscription_count
                    ? "upcoming"
                    : "clear"
                }
                tone={warningTone(adminSummary?.upcoming_subscription_count)}
              />
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Documents
                </p>
                <p className="mt-2 text-2xl font-semibold text-white">
                  {formatCount(adminSummary?.upcoming_document_count)}
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-400">
                  Upcoming document renewals and deadline pressure.
                </p>
              </div>
              <StatusPill
                label={
                  adminSummary?.upcoming_document_count ? "watch" : "clear"
                }
                tone={warningTone(adminSummary?.upcoming_document_count)}
              />
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Housing
                </p>
                <p className="mt-2 text-2xl font-semibold text-white">
                  {formatCount(adminSummary?.housing_option_count)}
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-400">
                  Rent, lease, utilities, maintenance, contacts, and housing
                  docs visibility.
                </p>
              </div>
              <StatusPill label="read-only" tone="info" />
            </div>
          </div>
        </div>

        <div className="mt-5 rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-4 text-sm leading-6 text-cyan-100">
          Command visibility only. This section does not create bills, pay
          subscriptions, renew documents, contact landlords, change housing
          data, execute Carnos actions, or start background jobs.
        </div>

        {adminWarnings.length > 0 ? (
          <div className="mt-5 rounded-2xl border border-amber-400/20 bg-amber-400/10 p-4 text-sm leading-6 text-amber-100">
            <p className="font-semibold">
              Some admin/finance reads returned warnings.
            </p>
            <ul className="mt-3 list-disc space-y-1 pl-5">
              {adminWarnings.slice(0, 6).map((warning) => (
                <li key={warning}>{warning}</li>
              ))}
            </ul>
          </div>
        ) : null}

        <p className="mt-4 text-xs leading-5 text-slate-500">
          Source tables: {adminFinanceSourceTables.join(", ")}
        </p>
      </SectionCard>

      <OperatingDashboardGrid region="primary">
        {commandCards.map((card) => (
          <OperatingDashboardCard
            key={card.id}
            card={{
              ...card,
              status: summary ? "ready" : card.status,
            }}
            footer={
              <div className="space-y-2 text-xs text-slate-400">
                <p>Source tables: {card.sourceTables.join(", ")}</p>
                <p>
                  Safe boundary: proposal → validation → confirmation →
                  server-owned execution → audit log.
                </p>
              </div>
            }
          >
            {summary ? (
              <div className="space-y-3 text-sm text-slate-300">
                <p>
                  This card is registered for the Command surface and now sits
                  above Phase 12 admin/finance visibility. Deeper SQL-backed
                  detail remains read-only until safe write flows are explicitly
                  added.
                </p>
                <p className="text-xs text-slate-500">
                  No autonomous writes, Python/ML mutation, memory execution, or
                  background jobs are active here.
                </p>
              </div>
            ) : null}
          </OperatingDashboardCard>
        ))}
      </OperatingDashboardGrid>
    </div>
  );
}

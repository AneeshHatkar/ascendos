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

interface CalendarDashboardV1Props {
  data?: DashboardDataResult;
  adminFinanceData?: AdminFinanceDashboardDataResult;
}

const calendarCards = getDashboardCardsForSurface("calendar");

function formatCount(value: number | undefined) {
  return typeof value === "number" ? value.toLocaleString() : "0";
}

function statusTone(
  value: number | undefined,
): "success" | "warning" | "danger" | "info" {
  const count = value ?? 0;

  if (count > 0) {
    return "warning";
  }

  return "success";
}

function overdueTone(
  value: number | undefined,
): "success" | "warning" | "danger" | "info" {
  const count = value ?? 0;

  if (count > 0) {
    return "danger";
  }

  return "success";
}

export function CalendarDashboardV1({
  data,
  adminFinanceData,
}: CalendarDashboardV1Props) {
  const summary = data?.summary;
  const adminSummary = adminFinanceData?.summary;
  const adminWarnings = adminFinanceData?.warnings ?? [];
  const adminSourceTables = adminFinanceData?.source_tables ?? [
    "financial_logs",
    "subscriptions",
    "documents",
    "housing_contacts",
  ];

  const overdueAdminCount =
    (adminSummary?.overdue_finance_count ?? 0) +
    (adminSummary?.overdue_subscription_count ?? 0) +
    (adminSummary?.overdue_document_count ?? 0);

  const upcomingAdminDateCount =
    (adminSummary?.planned_or_pending_finance_count ?? 0) +
    (adminSummary?.upcoming_subscription_count ?? 0) +
    (adminSummary?.expiring_document_count ?? 0) +
    (adminSummary?.housing_follow_up_due_count ?? 0);

  return (
    <section className="space-y-6">
      <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-2xl shadow-black/20">
        <div className="flex flex-col gap-3">
          <p className="text-xs uppercase tracking-[0.35em] text-white/45">
            Calendar dashboard
          </p>
          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-white">
                Time, tasks, schedule pressure, and admin deadlines
              </h2>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-white/60">
                Read-only operating view for dated tasks, events, finance
                deadlines, subscription due dates, document renewals, and
                housing follow-ups. This surface helps connect calendar reality
                to the command dashboard without autonomous scheduling.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/70">
              Read-only mode
            </div>
          </div>
        </div>
      </div>

      <CrossDashboardLinks activeRoute="/calendar" />

      <div className="grid gap-4 md:grid-cols-4">
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
          <p className="text-xs uppercase tracking-[0.25em] text-white/40">
            Open tasks
          </p>
          <p className="mt-2 text-2xl font-semibold text-white">
            {formatCount(summary?.open_tasks_count)}
          </p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
          <p className="text-xs uppercase tracking-[0.25em] text-white/40">
            Events
          </p>
          <p className="mt-2 text-2xl font-semibold text-white">
            {formatCount(summary?.recent_events_count)}
          </p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
          <p className="text-xs uppercase tracking-[0.25em] text-white/40">
            Active goals
          </p>
          <p className="mt-2 text-2xl font-semibold text-white">
            {formatCount(summary?.active_goals_count)}
          </p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
          <p className="text-xs uppercase tracking-[0.25em] text-white/40">
            Pending updates
          </p>
          <p className="mt-2 text-2xl font-semibold text-white">
            {formatCount(summary?.pending_updates_count)}
          </p>
        </div>
      </div>

      <SectionCard
        title="Admin and finance calendar visibility"
        eyebrow="Phase 12 read-only deadline layer"
        description="Calendar-level visibility for planned finance records, overdue bills, upcoming subscriptions, document renewals, and housing follow-ups. This panel only reads confirmed SQL-backed records."
      >
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <MetricTile
            label="Admin dates"
            value={formatCount(upcomingAdminDateCount)}
            description="Planned finance records, upcoming subscriptions, expiring documents, and housing follow-ups."
          />
          <MetricTile
            label="Overdue admin"
            value={formatCount(overdueAdminCount)}
            description="Overdue finance, subscription, and document records."
          />
          <MetricTile
            label="Documents"
            value={formatCount(adminSummary?.expiring_document_count)}
            description="Documents expiring or needing renewal in the upcoming window."
          />
          <MetricTile
            label="Warnings"
            value={formatCount(adminWarnings.length)}
            description="Read warnings surfaced without retrying, mutating, or hiding errors."
          />
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Planned finance
                </p>
                <p className="mt-2 text-2xl font-semibold text-white">
                  {formatCount(adminSummary?.planned_or_pending_finance_count)}
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-400">
                  Planned or pending finance records visible to calendar
                  pressure.
                </p>
              </div>
              <StatusPill
                label={
                  adminSummary?.planned_or_pending_finance_count
                    ? "scheduled"
                    : "clear"
                }
                tone={statusTone(
                  adminSummary?.planned_or_pending_finance_count,
                )}
              />
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Subscriptions due
                </p>
                <p className="mt-2 text-2xl font-semibold text-white">
                  {formatCount(adminSummary?.upcoming_subscription_count)}
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-400">
                  Subscriptions due inside the upcoming review window.
                </p>
              </div>
              <StatusPill
                label={
                  adminSummary?.upcoming_subscription_count
                    ? "upcoming"
                    : "clear"
                }
                tone={statusTone(adminSummary?.upcoming_subscription_count)}
              />
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Housing follow-ups
                </p>
                <p className="mt-2 text-2xl font-semibold text-white">
                  {formatCount(adminSummary?.housing_follow_up_due_count)}
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-400">
                  Housing contact follow-ups due today or earlier.
                </p>
              </div>
              <StatusPill
                label={
                  adminSummary?.housing_follow_up_due_count
                    ? "follow up"
                    : "clear"
                }
                tone={statusTone(adminSummary?.housing_follow_up_due_count)}
              />
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Overdue records
                </p>
                <p className="mt-2 text-2xl font-semibold text-white">
                  {formatCount(overdueAdminCount)}
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-400">
                  Overdue admin records surfaced without automatic reminders or
                  writes.
                </p>
              </div>
              <StatusPill
                label={overdueAdminCount ? "attention" : "clear"}
                tone={overdueTone(overdueAdminCount)}
              />
            </div>
          </div>
        </div>

        <div className="mt-5 rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-4 text-sm leading-6 text-cyan-100">
          Calendar visibility only. This section does not create events,
          schedule reminders, pay bills, renew documents, contact housing
          providers, execute Carnos actions, or start background jobs.
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
          Source tables: {adminSourceTables.join(", ")}
        </p>
      </SectionCard>

      <OperatingDashboardGrid region="primary">
        {calendarCards.map((card) => (
          <OperatingDashboardCard key={card.id} card={card} />
        ))}
      </OperatingDashboardGrid>
    </section>
  );
}

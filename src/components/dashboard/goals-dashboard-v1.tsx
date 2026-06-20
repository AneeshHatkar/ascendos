import { OperatingDashboardCard, OperatingDashboardGrid } from "@/components/dashboard";
import { CrossDashboardLinks } from "@/components/dashboard/cross-dashboard-links";
import { getDashboardCardsForSurface, type DashboardDataResult } from "@/lib/dashboard";

interface GoalsDashboardV1Props {
  data?: DashboardDataResult;
}

const goalCards = getDashboardCardsForSurface("goals");

function formatCount(value: number | undefined) {
  return typeof value === "number" ? value.toLocaleString() : "0";
}

export function GoalsDashboardV1({ data }: GoalsDashboardV1Props) {
  const summary = data?.summary;

  return (
    <section className="space-y-6">
      <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-2xl shadow-black/20">
        <div className="flex flex-col gap-3">
          <p className="text-xs uppercase tracking-[0.35em] text-white/45">
            Goals dashboard
          </p>
          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-white">
                Dream-to-proof operating loop
              </h2>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-white/60">
                Read-only operating view for active goals, linked execution pressure, recent proof, and pending confirmations. This surface keeps goal reality visible before any confirmed mutation flow.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/70">
              Read-only mode
            </div>
          </div>
        </div>
      </div>

      <CrossDashboardLinks activeRoute="/goals" />

      <div className="grid gap-4 md:grid-cols-4">
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
          <p className="text-xs uppercase tracking-[0.25em] text-white/40">Active goals</p>
          <p className="mt-2 text-2xl font-semibold text-white">
            {formatCount(summary?.active_goals_count)}
          </p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
          <p className="text-xs uppercase tracking-[0.25em] text-white/40">Open tasks</p>
          <p className="mt-2 text-2xl font-semibold text-white">
            {formatCount(summary?.open_tasks_count)}
          </p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
          <p className="text-xs uppercase tracking-[0.25em] text-white/40">Recent proof</p>
          <p className="mt-2 text-2xl font-semibold text-white">
            {formatCount(summary?.recent_proof_count)}
          </p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
          <p className="text-xs uppercase tracking-[0.25em] text-white/40">Pending updates</p>
          <p className="mt-2 text-2xl font-semibold text-white">
            {formatCount(summary?.pending_updates_count)}
          </p>
        </div>
      </div>

      <OperatingDashboardGrid region="primary">
        {goalCards.map((card) => (
          <OperatingDashboardCard key={card.id} card={card} />
        ))}
      </OperatingDashboardGrid>
    </section>
  );
}

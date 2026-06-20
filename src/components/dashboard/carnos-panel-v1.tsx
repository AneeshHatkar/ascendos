import { OperatingDashboardCard, OperatingDashboardGrid } from "@/components/dashboard";
import { CrossDashboardLinks } from "@/components/dashboard/cross-dashboard-links";
import { getDashboardCardsForSurface, type DashboardDataResult } from "@/lib/dashboard";

interface CarnosPanelV1Props {
  data?: DashboardDataResult;
  sessionCount: number;
  messageCount: number;
  actionCount: number;
  pendingCount: number;
  readWarningCount: number;
}

const carnosCards = getDashboardCardsForSurface("carnos");

function formatCount(value: number | undefined) {
  return typeof value === "number" ? value.toLocaleString() : "0";
}

export function CarnosPanelV1({
  data,
  sessionCount,
  messageCount,
  actionCount,
  pendingCount,
  readWarningCount,
}: CarnosPanelV1Props) {
  const summary = data?.summary;

  return (
    <section className="space-y-6">
      <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-2xl shadow-black/20">
        <div className="flex flex-col gap-3">
          <p className="text-xs uppercase tracking-[0.35em] text-white/45">
            Carnos operating panel
          </p>
          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-white">
                Companion state and confirmation visibility
              </h2>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-white/60">
                Read-only Carnos panel for chat visibility, proposal pressure, and safety status. This panel does not generate responses, execute actions, remember facts, or attach lifecycle callbacks.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/70">
              Generated: {data?.generated_at ?? "Not loaded yet"}
            </div>
          </div>
        </div>
      </div>

      <CrossDashboardLinks activeRoute="/carnos" />

      <div className="grid gap-4 md:grid-cols-4">
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
          <p className="text-xs uppercase tracking-[0.25em] text-white/40">Sessions</p>
          <p className="mt-2 text-2xl font-semibold text-white">{formatCount(sessionCount)}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
          <p className="text-xs uppercase tracking-[0.25em] text-white/40">Messages</p>
          <p className="mt-2 text-2xl font-semibold text-white">{formatCount(messageCount)}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
          <p className="text-xs uppercase tracking-[0.25em] text-white/40">Actions</p>
          <p className="mt-2 text-2xl font-semibold text-white">{formatCount(actionCount)}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
          <p className="text-xs uppercase tracking-[0.25em] text-white/40">Pending</p>
          <p className="mt-2 text-2xl font-semibold text-white">{formatCount(pendingCount)}</p>
        </div>
      </div>

      <OperatingDashboardGrid region="right_panel">
        {carnosCards.map((card) => (
          <OperatingDashboardCard
            key={card.id}
            card={{
              ...card,
              status: summary ? "ready" : card.status,
            }}
            footer={
              <div className="space-y-2 text-xs text-slate-400">
                <p>Source tables: {card.sourceTables.join(", ")}</p>
                <p>Dashboard pending updates: {formatCount(summary?.pending_updates_count)}</p>
                <p>Read warnings: {formatCount(readWarningCount)}</p>
              </div>
            }
          >
            {summary ? (
              <div className="space-y-3 text-sm text-slate-300">
                <p>
                  Carnos context is visible as dashboard state only. Confirmation review remains separate from persistence.
                </p>
                <p className="text-xs text-slate-500">
                  No autonomous writes, memory execution, Python/ML mutation, voice, internet tools, or background jobs are active here.
                </p>
              </div>
            ) : null}
          </OperatingDashboardCard>
        ))}
      </OperatingDashboardGrid>
    </section>
  );
}

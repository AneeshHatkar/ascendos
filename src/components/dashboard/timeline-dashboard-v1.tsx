import { OperatingDashboardCard, OperatingDashboardGrid } from "@/components/dashboard";
import { getDashboardCardsForSurface, type DashboardDataResult } from "@/lib/dashboard";

interface TimelineDashboardV1Props {
  data?: DashboardDataResult;
}

const timelineCards = getDashboardCardsForSurface("timeline");

function formatCount(value: number | undefined) {
  return typeof value === "number" ? value.toLocaleString() : "0";
}

export function TimelineDashboardV1({ data }: TimelineDashboardV1Props) {
  const summary = data?.summary;
  const hasError = false;

  return (
    <section className="space-y-6">
      <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-2xl shadow-black/20">
        <div className="flex flex-col gap-3">
          <p className="text-xs uppercase tracking-[0.35em] text-white/45">
            Timeline dashboard
          </p>
          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-white">
                Life operating history
              </h2>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-white/60">
                Read-only view of recent events, proof signals, audit records, and system activity. This surface is for understanding what happened before taking action.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/70">
              {hasError ? "Timeline data unavailable" : "Read-only mode"}
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
          <p className="text-xs uppercase tracking-[0.25em] text-white/40">Events</p>
          <p className="mt-2 text-2xl font-semibold text-white">
            {formatCount(summary?.recent_events_count)}
          </p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
          <p className="text-xs uppercase tracking-[0.25em] text-white/40">Proof</p>
          <p className="mt-2 text-2xl font-semibold text-white">
            {formatCount(summary?.recent_proof_count)}
          </p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
          <p className="text-xs uppercase tracking-[0.25em] text-white/40">Logs</p>
          <p className="mt-2 text-2xl font-semibold text-white">
            {formatCount(summary?.card_count)}
          </p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
          <p className="text-xs uppercase tracking-[0.25em] text-white/40">Pending</p>
          <p className="mt-2 text-2xl font-semibold text-white">
            {formatCount(summary?.pending_updates_count)}
          </p>
        </div>
      </div>

      <OperatingDashboardGrid region="timeline_preview">
        {timelineCards.map((card) => (
          <OperatingDashboardCard
            key={card.id}
            card={{
              ...card,
              status: hasError ? "error" : card.status,
            }}
          />
        ))}
      </OperatingDashboardGrid>
    </section>
  );
}

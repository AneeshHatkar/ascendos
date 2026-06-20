import { OperatingDashboardCard, OperatingDashboardGrid } from "@/components/dashboard";
import { getDashboardCardsForSurface, type DashboardDataResult } from "@/lib/dashboard";

interface ProofDashboardV1Props {
  data?: DashboardDataResult;
}

const proofCards = getDashboardCardsForSurface("proof");

function formatCount(value: number | undefined) {
  return typeof value === "number" ? value.toLocaleString() : "0";
}

export function ProofDashboardV1({ data }: ProofDashboardV1Props) {
  const summary = data?.summary;

  return (
    <section className="space-y-6">
      <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-2xl shadow-black/20">
        <div className="flex flex-col gap-3">
          <p className="text-xs uppercase tracking-[0.35em] text-white/45">
            Proof dashboard
          </p>
          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-white">
                Reality evidence system
              </h2>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-white/60">
                Read-only proof surface for evidence, goal support, execution receipts, and recent proof signals. This component is route-ready, but no `/proof` route is created because `/proof` is not part of the current canonical route list.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/70">
              Read-only component
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
          <p className="text-xs uppercase tracking-[0.25em] text-white/40">Recent proof</p>
          <p className="mt-2 text-2xl font-semibold text-white">
            {formatCount(summary?.recent_proof_count)}
          </p>
        </div>
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
          <p className="text-xs uppercase tracking-[0.25em] text-white/40">Pending updates</p>
          <p className="mt-2 text-2xl font-semibold text-white">
            {formatCount(summary?.pending_updates_count)}
          </p>
        </div>
      </div>

      <OperatingDashboardGrid region="primary">
        {proofCards.map((card) => (
          <OperatingDashboardCard key={card.id} card={card} />
        ))}
      </OperatingDashboardGrid>
    </section>
  );
}

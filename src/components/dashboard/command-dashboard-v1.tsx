import { OperatingDashboardCard, OperatingDashboardGrid } from "@/components/dashboard";
import { CrossDashboardLinks } from "@/components/dashboard/cross-dashboard-links";
import { getDashboardCardsForSurface, type DashboardDataResult } from "@/lib/dashboard";

interface CommandDashboardV1Props {
  data?: DashboardDataResult;
}

const commandCards = getDashboardCardsForSurface('command');

function formatCount(value: number | undefined): string {
  return String(value ?? 0);
}

export function CommandDashboardV1({ data }: CommandDashboardV1Props) {
  const summary = data?.summary;

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-sm shadow-black/20">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200">
              Phase 7 Core Operating Dashboard
            </p>
            <h1 className="text-3xl font-semibold text-white">Command Dashboard</h1>
            <p className="max-w-3xl text-sm text-slate-300">
              Today&apos;s operating center for goals, tasks, proof, calendar pressure, and pending confirmations.
              This view is read-only and preserves the proposed-action confirmation boundary.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-xs text-slate-300">
            Generated: {data?.generated_at ?? 'Not loaded yet'}
          </div>
        </div>
      </section>

      <CrossDashboardLinks activeRoute="/command" />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {[
          ['Pending updates', formatCount(summary?.pending_updates_count)],
          ['Active goals', formatCount(summary?.active_goals_count)],
          ['Open tasks', formatCount(summary?.open_tasks_count)],
          ['Proof items', formatCount(summary?.recent_proof_count)],
          ['Events', formatCount(summary?.recent_events_count)],
        ].map(([label, value]) => (
          <div key={label} className='rounded-2xl border border-white/10 bg-white/[0.03] p-4'>
            <p className='text-xs uppercase tracking-[0.2em] text-slate-500'>{label}</p>
            <p className='mt-2 text-2xl font-semibold text-white'>{value}</p>
          </div>
        ))}
      </section>

      <OperatingDashboardGrid region="primary">
        {commandCards.map((card) => (
          <OperatingDashboardCard
            key={card.id}
            card={{
              ...card,
              status: summary ? 'ready' : card.status,
            }}
            footer={
              <div className='space-y-2 text-xs text-slate-400'>
                <p>Source tables: {card.sourceTables.join(', ')}</p>
                <p>Safe boundary: proposal → validation → confirmation → server-owned execution → audit log.</p>
              </div>
            }
          >
            {summary ? (
              <div className='space-y-3 text-sm text-slate-300'>
                <p>
                  This card is registered for the Command surface and is ready for SQL-backed detail wiring in later
                  Phase 7 dashboard steps.
                </p>
                <p className='text-xs text-slate-500'>
                  No autonomous writes, Python/ML mutation, memory execution, or background jobs are active here.
                </p>
              </div>
            ) : null}
          </OperatingDashboardCard>
        ))}
      </OperatingDashboardGrid>
    </div>
  );
}


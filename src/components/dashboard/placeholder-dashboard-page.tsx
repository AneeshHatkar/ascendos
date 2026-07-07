import { ManualDashboardActivationPanel } from "@/components/dashboard";
import type { PlaceholderRouteDecision } from "@/lib/placeholder-route-decisions";

type PlaceholderDashboardPageProps = {
  decision: PlaceholderRouteDecision;
};

export function PlaceholderDashboardPage({
  decision,
}: PlaceholderDashboardPageProps) {
  return (
      <section className="mx-auto max-w-5xl space-y-6 rounded-[2rem] border border-white/10 bg-white/[0.03] p-8">
        <p className="text-sm uppercase tracking-[0.35em] text-cyan-200/70">
          Phase 13.5F intentional placeholder route
        </p>
        <h2 className="mt-4 text-4xl font-semibold tracking-[-0.03em]">
          {decision.title}
        </h2>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-white/55">
          {decision.subtitle}
        </p>

        <div className="mt-8 rounded-3xl border border-cyan-400/20 bg-cyan-400/5 p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-100/80">
            Decision lock
          </p>
          <p className="mt-3 text-sm leading-6 text-cyan-50/80">
            This canonical route is intentionally deferred. It is kept in navigation and route
            coverage, but data models, write flows, AI generation, and builder behavior are not
            implemented in Phase 13.5F.
          </p>
          <p className="mt-3 text-sm leading-6 text-cyan-50/70">
            Later phase: {decision.laterPhase}
          </p>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-black/20 p-6">
            <p className="text-sm font-semibold text-white">Why deferred</p>
            <p className="mt-3 text-sm leading-6 text-white/55">{decision.reason}</p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-black/20 p-6">
            <p className="text-sm font-semibold text-white">Protected boundary</p>
            <p className="mt-3 text-sm leading-6 text-white/55">
              This page is read-only and does not mutate records, create proposed actions, call AI,
              run background jobs, or introduce SQL scope.
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-3xl border border-emerald-400/20 bg-emerald-400/5 p-6">
            <p className="text-sm font-semibold text-emerald-100">Allowed now</p>
            <ul className="mt-3 grid gap-2 text-sm leading-6 text-emerald-50/70">
              {decision.allowedNow.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl border border-amber-400/20 bg-amber-400/5 p-6">
            <p className="text-sm font-semibold text-amber-100">Forbidden now</p>
            <ul className="mt-3 grid gap-2 text-sm leading-6 text-amber-50/70">
              {decision.forbiddenNow.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>
        </div>

        <ManualDashboardActivationPanel
          surface={decision.title}
          title={`Manual capture for ${decision.title}`}
          description="This deferred dashboard can still capture safe manual task, goal, or proof proposals without pretending the full domain system is implemented."
        />
      </section>
  );
}

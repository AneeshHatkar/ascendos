import {
  CarnosBoundaryBadges,
  CarnosCapabilityMatrixPanel,
  CarnosCompanionWidget,
  CarnosOrb,
} from "@/components/carnos";
import { getCarnosVisualState } from "@/lib/carnos-identity";
import type { CarnosVisualStateId } from "@/lib/carnos-identity";

export type CarnosVisualIdentityPanelMode = "overview" | "compact" | "truthfulness";

export type CarnosVisualIdentityPanelProps = {
  readonly state?: CarnosVisualStateId;
  readonly mode?: CarnosVisualIdentityPanelMode;
  readonly title?: string;
  readonly subtitle?: string;
  readonly className?: string;
};

function cx(...classNames: Array<string | false | null | undefined>): string {
  return classNames.filter(Boolean).join(" ");
}

export function CarnosVisualIdentityPanel({
  state = "focused",
  mode = "overview",
  title = "Carnos visual identity",
  subtitle = "A calm, mythic, futuristic companion presence for ascendOS.",
  className,
}: CarnosVisualIdentityPanelProps) {
  const visualState = getCarnosVisualState(state);
  const showTruthfulness = mode === "overview" || mode === "truthfulness";
  const showExpandedCompanion = mode !== "compact";

  return (
    <section
      aria-label="Carnos visual identity dashboard panel"
      className={cx(
        "overflow-hidden rounded-[2rem] border border-cyan-300/15 bg-slate-950/85 shadow-2xl shadow-cyan-950/25 backdrop-blur-xl",
        "motion-reduce:transition-none",
        className,
      )}
      data-carnos-visual-identity-dashboard-panel="true"
      data-carnos-panel-mode={mode}
      data-carnos-state={state}
    >
      <div
        className="relative border-b border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.16),transparent_34%),radial-gradient(circle_at_top_right,rgba(139,92,246,0.14),transparent_32%)] p-5"
        data-carnos-dashboard-panel-hero="true"
      >
        <div className="grid gap-5 lg:grid-cols-[auto,1fr] lg:items-center">
          <div className="flex justify-center lg:justify-start">
            <CarnosOrb
              decorative={false}
              showLabel={false}
              showStatus={false}
              size={mode === "compact" ? "lg" : "xl"}
              state={state}
            />
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-[0.24em] text-cyan-200/80">
              Visual companion layer
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-100">
              {title}
            </h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400">
              {subtitle}
            </p>

            <div
              className="mt-4 grid gap-3 sm:grid-cols-3"
              data-carnos-dashboard-state-summary="true"
            >
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3">
                <div className="text-[11px] uppercase tracking-[0.18em] text-slate-500">
                  Current state
                </div>
                <div className="mt-1 text-sm font-semibold text-slate-100">
                  {visualState.label}
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3">
                <div className="text-[11px] uppercase tracking-[0.18em] text-slate-500">
                  Runtime
                </div>
                <div className="mt-1 text-sm font-semibold text-amber-100">
                  Visual-only
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3">
                <div className="text-[11px] uppercase tracking-[0.18em] text-slate-500">
                  Boundary
                </div>
                <div className="mt-1 text-sm font-semibold text-emerald-100">
                  Confirmation-first
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-5 p-5 xl:grid-cols-[minmax(0,0.85fr),minmax(0,1.15fr)]">
        <div className="space-y-5">
          <CarnosCompanionWidget
            mode={showExpandedCompanion ? "expanded" : "compact"}
            state={state}
            subtitle={visualState.shortStatus}
            title="Carnos"
          />

          <CarnosBoundaryBadges />
        </div>

        {showTruthfulness ? (
          <CarnosCapabilityMatrixPanel
            showBoundaryBadges={false}
            subtitle="Dashboard-safe capability truthfulness: what is enabled, what is foundational, what is deferred, what needs confirmation, what is planned, and what is forbidden."
            title="Capability truthfulness"
          />
        ) : (
          <div
            className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-5 text-sm leading-6 text-slate-400"
            data-carnos-dashboard-truthfulness-collapsed="true"
          >
            Capability truthfulness is available in overview and truthfulness modes. Compact mode keeps
            the dashboard surface lightweight without hiding runtime boundaries.
          </div>
        )}
      </div>

      <div
        className="border-t border-white/10 bg-black/20 px-5 py-4 text-xs leading-5 text-slate-500"
        data-carnos-dashboard-runtime-boundary="true"
      >
        This dashboard panel is display-only. It does not start microphone capture, produce talk-back
        audio, browse the internet, run Python/tools, ingest documents, save memory, save sources,
        or execute autonomous actions.
      </div>
    </section>
  );
}

export default CarnosVisualIdentityPanel;

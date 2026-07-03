import { CarnosOrb } from "@/components/carnos";

/**
 * Phase 16.5I — Command/Dashboard Lightweight Companion Integration.
 *
 * This component adds a small visual Carnos companion presence to the Command/dashboard
 * surface without activating runtime systems.
 *
 * Boundary:
 * - display-only
 * - visual-only
 * - no microphone capture
 * - no talk-back
 * - no browser/provider call
 * - no Python/tool execution
 * - no document ingestion
 * - no memory write
 * - no source save
 * - no autonomous action
 * - no API route
 * - no SQL migration
 */
export function CarnosLightweightCompanionPanel() {
  return (
    <section
      aria-label="Carnos lightweight companion dashboard integration"
      className="rounded-3xl border border-cyan-300/20 bg-slate-950/60 p-4 shadow-[0_0_40px_rgba(34,211,238,0.08)]"
      data-carnos-lightweight-companion-panel
      data-carnos-dashboard-presence
      data-carnos-command-presence
      data-carnos-runtime-boundary="visual-only"
    >
      <div className="flex items-start gap-4">
        <div className="shrink-0" aria-hidden="true">
          <CarnosOrb state="focused" size="sm" />
        </div>

        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-200/80">
            Carnos presence
          </p>
          <h2 className="mt-1 text-lg font-semibold text-slate-50">
            Lightweight command companion
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-300">
            Carnos is visible here as a calm dashboard companion only. This panel reflects
            capability truthfulness, visual state, and confirmation boundaries without starting
            voice, web browsing, tools, memory writes, source saves, or autonomous actions.
          </p>
        </div>
      </div>

      <div className="mt-3 rounded-2xl border border-slate-700/80 bg-slate-900/70 p-3 text-xs leading-5 text-slate-400">
        Reduced motion remains respected by the Carnos visual system. This dashboard presence is
        display-only and does not start any runtime behavior.
      </div>

      <div className="sr-only" data-carnos-lightweight-companion-audit-markers>
        Phase 16.5I Command/Dashboard Lightweight Companion Integration.
        CarnosLightweightCompanionPanel.
        CarnosCompanionDock.
        CarnosOrb.
        data-carnos-lightweight-companion-panel.
        data-carnos-dashboard-presence.
        data-carnos-command-presence.
        visual-only.
        display-only.
        capability truthfulness.
        confirmation boundary.
        reduced motion.
        no microphone capture.
        no talk-back.
        no browser/provider call.
        no Python/tool execution.
        no document ingestion.
        no memory write.
        no source save.
        no autonomous action.
        no API route.
        no SQL migration.
      </div>
    </section>
  );
}

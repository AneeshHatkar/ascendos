import { VoiceManualSimulatorPreview } from "@/components/voice/voice-manual-simulator-preview";

const CARNOS_VOICE_PANEL_BOUNDARY_MARKERS = [
  "Canonical surface: /carnos",
  "Manual transcript simulator only",
  "No standalone voice route",
  "No microphone APIs",
  "No provider calls from UI",
  "No SQL writes from UI",
  "No proposed-action creation from UI",
  "No proposed-action execution from UI",
] as const;

export function CarnosVoicePanelIntegration() {
  return (
    <section className="space-y-5 rounded-3xl border border-cyan-300/15 bg-cyan-300/[0.04] p-5 shadow-2xl shadow-black/20">
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-200">
          Phase 14G Carnos voice panel integration
        </p>
        <h2 className="text-xl font-semibold text-white">
          Voice-to-Carnos draft review surface
        </h2>
        <p className="max-w-3xl text-sm leading-6 text-slate-300">
          This panel brings the Phase 14F manual transcript draft simulator into
          the canonical Carnos page. It is a local review surface only. It does
          not create a voice route, access device audio, call speech providers,
          write database records, create proposed actions, execute proposed
          actions, or auto-save memory.
        </p>
      </div>

      <div className="grid gap-3 md:grid-cols-4">
        {CARNOS_VOICE_PANEL_BOUNDARY_MARKERS.map((marker) => (
          <div
            key={marker}
            className="rounded-2xl border border-white/10 bg-black/25 p-3 text-xs font-medium text-slate-200"
          >
            {marker}
          </div>
        ))}
      </div>

      <VoiceManualSimulatorPreview />

      <div className="rounded-2xl border border-amber-300/20 bg-amber-300/5 p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-200">
          Confirmation bridge remains locked
        </p>
        <p className="mt-2 text-sm leading-6 text-amber-50/90">
          Transcript text can be reviewed here, but it is not routed into Carnos
          extraction or the safe-write confirmation flow in Phase 14G. The
          text/voice-to-proposed-update bridge remains deferred to Phase 14H.
        </p>
      </div>
    </section>
  );
}

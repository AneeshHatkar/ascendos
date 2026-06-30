export function VoiceBoundaryPanel() {
  return (
    <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-200">
          Phase 14E Voice Boundary
        </p>
        <h2 className="text-lg font-semibold text-white">Safe voice UI shell</h2>
        <p className="text-sm leading-6 text-slate-300">
          This UI is a visual boundary only. It does not capture microphone input, play audio,
          call provider APIs, write SQL records, create proposed actions, or connect to Carnos.
        </p>
      </div>

      <div className="mt-4 grid gap-3 text-sm text-slate-300 md:grid-cols-2">
        <div className="rounded-xl border border-white/10 bg-black/20 p-3">
          <p className="font-medium text-white">Allowed now</p>
          <p className="mt-1">Display voice mode, privacy status, transcript placeholders, and review states.</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-black/20 p-3">
          <p className="font-medium text-white">Forbidden now</p>
          <p className="mt-1">No microphone capture, audio playback, API calls, SQL writes, or action execution.</p>
        </div>
      </div>
    </section>
  );
}

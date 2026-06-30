const controls = [
  "Start voice session",
  "Pause listening",
  "End session",
  "Discard draft",
];

export function VoiceSessionControlsPreview() {
  return (
    <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-200">
        Session Controls
      </p>
      <h3 className="mt-2 text-lg font-semibold text-white">Disabled control layout</h3>
      <p className="mt-2 text-sm leading-6 text-slate-300">
        Buttons are intentionally disabled. Phase 14E does not start recording, call APIs, or mutate state.
      </p>

      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        {controls.map((label) => (
          <button
            key={label}
            type="button"
            disabled
            className="cursor-not-allowed rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-left text-sm text-slate-400"
          >
            {label}
          </button>
        ))}
      </div>
    </section>
  );
}

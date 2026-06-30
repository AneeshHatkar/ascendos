const voiceModes = [
  "friend_voice",
  "strict_coach_voice",
  "calm_mentor_voice",
  "morning_command_voice",
  "night_reflection_voice",
  "teacher_voice",
  "research_mentor_voice",
  "gym_coach_voice",
  "crisis_soft_voice",
];

export function VoiceModeSelectorPreview() {
  return (
    <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-200">
        Voice Modes
      </p>
      <h3 className="mt-2 text-lg font-semibold text-white">Mode selector preview</h3>
      <p className="mt-2 text-sm leading-6 text-slate-300">
        These mode chips are display-only in Phase 14E. Selection state and persistence remain deferred.
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {voiceModes.map((mode) => (
          <span
            key={mode}
            className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs text-slate-200"
          >
            {mode}
          </span>
        ))}
      </div>
    </section>
  );
}

const reviewStates = [
  "Draft transcript",
  "Needs review",
  "Pending confirmation",
  "Save/Edit/Cancel deferred",
];

export function VoiceConfirmationPreview() {
  return (
    <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-200">
        Confirmation Boundary
      </p>
      <h3 className="mt-2 text-lg font-semibold text-white">Review-before-write preview</h3>
      <p className="mt-2 text-sm leading-6 text-slate-300">
        Phase 14E shows the confirmation shape only. It does not create proposed actions or execute writes.
      </p>

      <ol className="mt-4 space-y-2">
        {reviewStates.map((state, index) => (
          <li key={state} className="flex gap-3 rounded-xl border border-white/10 bg-black/20 p-3 text-sm text-slate-200">
            <span className="text-cyan-200">{index + 1}</span>
            <span>{state}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}

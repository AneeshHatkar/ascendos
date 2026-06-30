const sampleLines = [
  {
    speaker: "user",
    text: "Manual transcript draft will appear here after a future simulator or provider route sends text.",
  },
  {
    speaker: "carnos",
    text: "Carnos response preview remains deferred until the Carnos panel integration chunk.",
  },
];

export function VoiceTranscriptPreview() {
  return (
    <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-200">
        Transcript Preview
      </p>
      <h3 className="mt-2 text-lg font-semibold text-white">Live transcript shell</h3>
      <p className="mt-2 text-sm leading-6 text-slate-300">
        This component displays transcript shape only. It does not subscribe to audio streams or save transcript rows.
      </p>

      <div className="mt-4 space-y-3">
        {sampleLines.map((line) => (
          <article key={`${line.speaker}-${line.text}`} className="rounded-xl border border-white/10 bg-black/20 p-3">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">{line.speaker}</p>
            <p className="mt-1 text-sm leading-6 text-slate-200">{line.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

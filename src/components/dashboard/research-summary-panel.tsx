interface ResearchSummaryPanelMetric {
  label: string;
  value: number;
  detail?: string;
}

export interface ResearchSummaryPanelProps {
  title: string;
  subtitle: string;
  metrics: ResearchSummaryPanelMetric[];
  boundaryNote?: string;
}

export function ResearchSummaryPanel({
  title,
  subtitle,
  metrics,
  boundaryNote,
}: ResearchSummaryPanelProps) {
  return (
    <section className="rounded-3xl border border-white/10 bg-slate-950/70 p-5 shadow-2xl shadow-black/20">
      <div className="space-y-2">
        <p className="text-xs uppercase tracking-[0.3em] text-cyan-300/80">Phase 10 Read Surface</p>
        <h2 className="text-xl font-semibold text-white">{title}</h2>
        <p className="text-sm text-slate-300">{subtitle}</p>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {metrics.map((metric) => (
          <article
            key={metric.label}
            className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"
          >
            <p className="text-xs uppercase tracking-[0.22em] text-slate-400">{metric.label}</p>
            <p className="mt-2 text-3xl font-semibold text-white">{metric.value}</p>
            {metric.detail ? <p className="mt-1 text-xs text-slate-400">{metric.detail}</p> : null}
          </article>
        ))}
      </div>

      {boundaryNote ? (
        <p className="mt-5 rounded-2xl border border-amber-300/20 bg-amber-300/10 p-3 text-xs text-amber-100">
          {boundaryNote}
        </p>
      ) : null}
    </section>
  );
}

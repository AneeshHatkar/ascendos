import { MetricTile } from "./metric-tile";
import { SectionCard } from "./section-card";
import { StatusPill } from "./status-pill";

export type LearningProjectSummaryMetric = {
  label: string;
  value: string | number;
  description?: string;
  tone?: "neutral" | "success" | "warning" | "danger" | "info";
};

type LearningProjectSummaryPanelProps = {
  title: string;
  description: string;
  metrics: LearningProjectSummaryMetric[];
  emptyTitle: string;
  emptyDescription: string;
};

export function LearningProjectSummaryPanel({
  title,
  description,
  metrics,
  emptyTitle,
  emptyDescription,
}: LearningProjectSummaryPanelProps) {
  const hasMetrics = metrics.length > 0;

  return (
    <SectionCard title={title} description={description} eyebrow="Phase 9">
      {hasMetrics ? (
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {metrics.map((metric) => (
            <MetricTile
              key={metric.label}
              label={metric.label}
              value={metric.value}
              description={metric.description}
              icon={<StatusPill label="read" tone={metric.tone ?? "info"} />}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-slate-800 bg-slate-950/50 p-5">
          <h3 className="text-sm font-semibold text-slate-100">{emptyTitle}</h3>
          <p className="mt-2 text-sm leading-6 text-slate-400">{emptyDescription}</p>
        </div>
      )}
    </SectionCard>
  );
}

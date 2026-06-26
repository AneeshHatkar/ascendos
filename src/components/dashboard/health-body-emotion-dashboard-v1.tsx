import { getHealthBodyDashboardDataSummary } from "@/lib/dashboard";
import {
  HealthBodyBoundaryNotice,
  HealthBodyEmptyState,
  HealthBodyPrivacyNotice,
  HealthBodyWarningPanel,
} from "./health-body-dashboard-states";
import { HealthBodyEmotionReflectionDetailPanel } from "./health-body-detail-panels";

interface HealthBodyEmotionDashboardV1Props {
  userId: string;
}

interface EmotionMetric {
  label: string;
  value: number;
  description: string;
}

function EmotionMetricTile({ metric }: { metric: EmotionMetric }) {
  return (
    <article className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 shadow-sm">
      <p className="text-sm font-medium uppercase tracking-[0.22em] text-slate-400">
        {metric.label}
      </p>
      <p className="mt-4 text-3xl font-semibold text-white">{metric.value}</p>
      <p className="mt-3 text-sm leading-6 text-slate-300">{metric.description}</p>
    </article>
  );
}

export async function HealthBodyEmotionDashboardV1({
  userId,
}: HealthBodyEmotionDashboardV1Props) {
  const data = await getHealthBodyDashboardDataSummary(userId);
  const { summary } = data;

  const metrics: EmotionMetric[] = [
    {
      label: "Emotion logs",
      value: summary.emotion_log_count,
      description: "Mood, emotional pattern, trigger, and regulation signal records.",
    },
    {
      label: "Mental health logs",
      value: summary.mental_health_log_count,
      description: "Protected mental-state records for stress, mood, anxiety, and support context.",
    },
    {
      label: "Journal entries",
      value: summary.journal_entry_count,
      description: "Reflection records connected to emotional processing and self-understanding.",
    },
    {
      label: "Recent signals",
      value: summary.recent_health_signal_count,
      description: "Recent emotion, mental-state, sleep, energy, body, and care activity from the last seven days.",
    },
  ];

  const hasEmotionData =
    summary.emotion_log_count + summary.mental_health_log_count + summary.journal_entry_count > 0;

  return (
    <section className="space-y-8">
      <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-6 shadow-lg">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.28em] text-rose-300">
              emotion system
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white">
              Emotion Dashboard
            </h1>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300">
              Read-only emotion surface for mood, emotional patterns, triggers, reflection,
              regulation proof, mental-state records, and journal context. This dashboard
              summarizes existing records only and cannot create or modify data.
            </p>
          </div>

          <div className="rounded-2xl border border-rose-400/20 bg-rose-400/10 px-4 py-3 text-sm text-rose-100">
            <p className="font-medium">Read-only emotion view</p>
            <p className="mt-1 text-rose-100/80">
              Mood, reflection, regulation, and mental-state writes stay disabled until safe
              confirmation flows are added.
            </p>
          </div>
        </div>
      </div>

      <HealthBodyBoundaryNotice
        title="Read-only emotion boundary"
        description="This dashboard can summarize existing emotion, mental health, journal, sleep, energy, and related health/body records only. New mood, trigger, reflection, or regulation records must wait for confirmed safe-write flows."
      />
      <HealthBodyPrivacyNotice />
      <HealthBodyWarningPanel warnings={data.warnings} />

      <HealthBodyEmotionReflectionDetailPanel
        emotionLogs={data.detail_rows.emotion_logs}
        mentalHealthLogs={data.detail_rows.mental_health_logs}
        journalEntries={data.detail_rows.journal_entries}
      />

      {!hasEmotionData ? (
        <HealthBodyEmptyState
          title="No emotion records yet"
          description="Once emotion logs, mental health logs, or journal entries exist in the confirmed health/body tables, this read-only dashboard will summarize mood, triggers, reflection, regulation, and mental-state signals."
        />
      ) : null}

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => (
          <EmotionMetricTile key={metric.label} metric={metric} />
        ))}
      </div>

      <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-5 text-sm text-slate-300">
        <p className="font-semibold text-white">Emotion safety note</p>
        <p className="mt-2 leading-6">
          This surface avoids diagnosis, crisis handling, treatment claims, medication claims,
          emotional labeling as fact, body-shaming, and autonomous changes. Carnos may later propose
          emotion or reflection records only through the confirmed safe-action flow.
        </p>
      </div>
    </section>
  );
}

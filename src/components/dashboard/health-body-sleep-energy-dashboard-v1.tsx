import { getHealthBodyDashboardDataSummary } from "@/lib/dashboard";
import {
  HealthBodyBoundaryNotice,
  HealthBodyEmptyState,
  HealthBodyPrivacyNotice,
  HealthBodyWarningPanel,
} from "./health-body-dashboard-states";
import { HealthBodySleepEnergyDetailPanel } from "./health-body-detail-panels";

interface HealthBodySleepEnergyDashboardV1Props {
  userId: string;
}

interface SleepEnergyMetric {
  label: string;
  value: number;
  description: string;
}

function SleepEnergyMetricTile({ metric }: { metric: SleepEnergyMetric }) {
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

export async function HealthBodySleepEnergyDashboardV1({
  userId,
}: HealthBodySleepEnergyDashboardV1Props) {
  const data = await getHealthBodyDashboardDataSummary(userId);
  const { summary } = data;

  const metrics: SleepEnergyMetric[] = [
    {
      label: "Sleep logs",
      value: summary.sleep_log_count,
      description: "Sleep records for duration, quality, bedtime, wake time, and recovery context.",
    },
    {
      label: "Energy logs",
      value: summary.energy_log_count,
      description: "Energy, fatigue, focus, stress, and recovery signal records.",
    },
    {
      label: "Mental health logs",
      value: summary.mental_health_log_count,
      description: "Protected mental state records connected to recovery and daily functioning.",
    },
    {
      label: "Recent signals",
      value: summary.recent_health_signal_count,
      description: "Recent body, sleep, energy, nutrition, training, and care activity from the last seven days.",
    },
  ];

  const hasSleepEnergyData = summary.sleep_log_count + summary.energy_log_count > 0;

  return (
    <section className="space-y-8">
      <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-6 shadow-lg">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.28em] text-sky-300">
              sleep energy system
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white">
              Sleep Energy Dashboard
            </h1>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300">
              Read-only sleep and energy surface for sleep duration, fatigue, focus, stress,
              routines, recovery, and daily functioning signals. This dashboard summarizes
              existing records only and cannot create or modify data.
            </p>
          </div>

          <div className="rounded-2xl border border-sky-400/20 bg-sky-400/10 px-4 py-3 text-sm text-sky-100">
            <p className="font-medium">Read-only sleep energy view</p>
            <p className="mt-1 text-sky-100/80">
              Sleep, fatigue, focus, stress, and recovery writes stay disabled until safe
              confirmation flows are added.
            </p>
          </div>
        </div>
      </div>

      <HealthBodyBoundaryNotice
        title="Read-only sleep energy boundary"
        description="This dashboard can summarize existing sleep, energy, mental health, and related health/body records only. New sleep, fatigue, focus, stress, or recovery records must wait for confirmed safe-write flows."
      />
      <HealthBodyPrivacyNotice />
      <HealthBodyWarningPanel warnings={data.warnings} />

      <HealthBodySleepEnergyDetailPanel
        sleepLogs={data.detail_rows.sleep_logs}
        energyLogs={data.detail_rows.energy_logs}
        mentalHealthLogs={data.detail_rows.mental_health_logs}
      />

      {!hasSleepEnergyData ? (
        <HealthBodyEmptyState
          title="No sleep or energy records yet"
          description="Once sleep logs and energy logs exist in the confirmed health/body tables, this read-only dashboard will summarize sleep duration, fatigue, focus, stress, routines, and recovery signals."
        />
      ) : null}

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => (
          <SleepEnergyMetricTile key={metric.label} metric={metric} />
        ))}
      </div>

      <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-5 text-sm text-slate-300">
        <p className="font-semibold text-white">Sleep and energy safety note</p>
        <p className="mt-2 leading-6">
          This surface avoids medical diagnosis, treatment claims, mental health diagnosis,
          medication claims, body-shaming, and autonomous changes. Carnos may later propose sleep
          or energy records only through the confirmed safe-action flow.
        </p>
      </div>
    </section>
  );
}

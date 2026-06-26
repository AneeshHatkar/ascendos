import { getHealthBodyDashboardDataSummary } from "@/lib/dashboard";
import {
  HealthBodyBoundaryNotice,
  HealthBodyEmptyState,
  HealthBodyPrivacyNotice,
  HealthBodyWarningPanel,
} from "./health-body-dashboard-states";
import { HealthBodyTrainingDetailPanel } from "./health-body-detail-panels";

interface HealthBodyDashboardV1Props {
  userId: string;
}

interface MetricCard {
  label: string;
  value: number;
  description: string;
}

function formatGeneratedAt(value: string): string {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Unknown";
  }

  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function MetricTile({ card }: { card: MetricCard }) {
  return (
    <article className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 shadow-sm">
      <p className="text-sm font-medium uppercase tracking-[0.22em] text-slate-400">{card.label}</p>
      <p className="mt-4 text-3xl font-semibold text-white">{card.value}</p>
      <p className="mt-3 text-sm leading-6 text-slate-300">{card.description}</p>
    </article>
  );
}

export async function HealthBodyDashboardV1({ userId }: HealthBodyDashboardV1Props) {
  const data = await getHealthBodyDashboardDataSummary(userId);
  const { summary } = data;

  const cards: MetricCard[] = [
    {
      label: "Body logs",
      value: summary.body_log_count,
      description: "Bodyweight, recovery, soreness, pain notes, and related progress records.",
    },
    {
      label: "Workouts",
      value: summary.workout_count,
      description: "Logged training sessions connected to goals, tasks, events, or proof.",
    },
    {
      label: "Exercises",
      value: summary.exercise_count,
      description: "Exercise library records available for structured workout tracking.",
    },
    {
      label: "Nutrition",
      value: summary.nutrition_log_count,
      description: "Daily nutrition records, calorie notes, macro notes, and meal context.",
    },
    {
      label: "Meals",
      value: summary.meal_item_count,
      description: "Meal-level entries connected to nutrition logs.",
    },
    {
      label: "Supplements",
      value: summary.active_supplement_count,
      description: "Active supplement records for schedule and adherence review.",
    },
    {
      label: "Sleep",
      value: summary.sleep_log_count,
      description: "Sleep duration, quality, bedtime, wake time, and daily-log-linked records.",
    },
    {
      label: "Energy",
      value: summary.energy_log_count,
      description: "Energy, fatigue, focus, stress, and recovery signal logs.",
    },
    {
      label: "Emotion",
      value: summary.emotion_log_count,
      description: "Mood and emotion records kept behind the protected read boundary.",
    },
    {
      label: "Hair & skin",
      value: summary.haircare_log_count + summary.skincare_log_count,
      description: "Routine completion records for haircare, skincare, and product use.",
    },
    {
      label: "Products",
      value: summary.active_product_count,
      description: "Active products available for hair, skin, nutrition, or supplement routines.",
    },
    {
      label: "Recent signals",
      value: summary.recent_health_signal_count,
      description: "Records from the last seven days across body, training, nutrition, sleep, and care logs.",
    },
  ];

  return (
    <section className="space-y-8">
      <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-6 shadow-lg">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.28em] text-cyan-300">
              health/body system
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white">
              Health Body Overview
            </h1>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300">
              Read-only overview for body, training, nutrition, supplements, sleep, energy,
              emotion, haircare, skincare, and product records. This surface summarizes
              confirmed SQL records only and does not create or modify data.
            </p>
          </div>

          <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 px-4 py-3 text-sm text-cyan-100">
            <p className="font-medium">Read-only boundary</p>
            <p className="mt-1 text-cyan-100/80">
              Writes stay disabled until safe confirmation flows are added.
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-3 text-sm text-slate-300 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
            <p className="text-slate-400">Source tables</p>
            <p className="mt-2 text-lg font-semibold text-white">{data.source_tables.length}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
            <p className="text-slate-400">Warnings</p>
            <p className="mt-2 text-lg font-semibold text-white">{data.warnings.length}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
            <p className="text-slate-400">Generated</p>
            <p className="mt-2 text-lg font-semibold text-white">
              {formatGeneratedAt(data.generated_at)}
            </p>
          </div>
        </div>
      </div>

      <HealthBodyBoundaryNotice />
      <HealthBodyPrivacyNotice />
      <HealthBodyWarningPanel warnings={data.warnings} />

      <HealthBodyTrainingDetailPanel
        bodyLogs={data.detail_rows.body_logs}
        workouts={data.detail_rows.workouts}
        exercises={data.detail_rows.exercises}
        workoutSets={data.detail_rows.workout_sets}
      />

      {summary.recent_health_signal_count === 0 ? (
        <HealthBodyEmptyState
          title="No recent health signals yet"
          description="Once records exist in the confirmed health/body tables, this read-only dashboard will summarize recent body, training, nutrition, sleep, energy, emotion, haircare, skincare, and product activity."
        />
      ) : null}

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {cards.map((card) => (
          <MetricTile key={card.label} card={card} />
        ))}
      </div>
    </section>
  );
}

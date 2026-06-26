import { getHealthBodyDashboardDataSummary } from "@/lib/dashboard";
import {
  HealthBodyBoundaryNotice,
  HealthBodyEmptyState,
  HealthBodyPrivacyNotice,
  HealthBodyWarningPanel,
} from "./health-body-dashboard-states";
import { HealthBodyNutritionMealDetailPanel } from "./health-body-detail-panels";

interface HealthBodyNutritionDashboardV1Props {
  userId: string;
}

interface NutritionMetric {
  label: string;
  value: number;
  description: string;
}

function NutritionMetricTile({ metric }: { metric: NutritionMetric }) {
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

export async function HealthBodyNutritionDashboardV1({
  userId,
}: HealthBodyNutritionDashboardV1Props) {
  const data = await getHealthBodyDashboardDataSummary(userId);
  const { summary } = data;

  const metrics: NutritionMetric[] = [
    {
      label: "Nutrition logs",
      value: summary.nutrition_log_count,
      description: "Daily nutrition records for calories, macros, adherence, hydration, and notes.",
    },
    {
      label: "Meal items",
      value: summary.meal_item_count,
      description: "Meal-level records connected to daily nutrition logs.",
    },
    {
      label: "Supplements",
      value: summary.active_supplement_count,
      description: "Active supplement records that may influence nutrition and routine planning.",
    },
    {
      label: "Recent signals",
      value: summary.recent_health_signal_count,
      description: "Recent body, nutrition, sleep, energy, training, and care activity from the last seven days.",
    },
  ];

  const hasNutritionData = summary.nutrition_log_count + summary.meal_item_count > 0;

  return (
    <section className="space-y-8">
      <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-6 shadow-lg">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.28em] text-emerald-300">
              nutrition system
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white">
              Nutrition Dashboard
            </h1>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300">
              Read-only nutrition surface for calories, macros, meals, hydration, meal prep,
              adherence, supplement context, and nutrition-linked health signals. This dashboard
              summarizes existing records only and cannot create or modify data.
            </p>
          </div>

          <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-100">
            <p className="font-medium">Read-only nutrition view</p>
            <p className="mt-1 text-emerald-100/80">
              Food, meal, supplement, and adherence writes stay disabled until safe confirmation
              flows are added.
            </p>
          </div>
        </div>
      </div>

      <HealthBodyBoundaryNotice
        title="Read-only nutrition boundary"
        description="This dashboard can summarize existing nutrition, meal, supplement, and related health/body records only. New food, calorie, macro, meal, or supplement records must wait for confirmed safe-write flows."
      />
      <HealthBodyPrivacyNotice />
      <HealthBodyWarningPanel warnings={data.warnings} />

      <HealthBodyNutritionMealDetailPanel
        nutritionLogs={data.detail_rows.nutrition_logs}
        mealItems={data.detail_rows.meal_items}
      />

      {!hasNutritionData ? (
        <HealthBodyEmptyState
          title="No nutrition records yet"
          description="Once nutrition logs and meal items exist in the confirmed health/body tables, this read-only dashboard will summarize calories, macros, meals, hydration, meal prep, adherence, and supplement context."
        />
      ) : null}

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => (
          <NutritionMetricTile key={metric.label} metric={metric} />
        ))}
      </div>

      <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-5 text-sm text-slate-300">
        <p className="font-semibold text-white">Nutrition safety note</p>
        <p className="mt-2 leading-6">
          This surface avoids medical nutrition claims, eating-disorder language, supplement claims,
          body-shaming, and autonomous changes. Carnos may later propose nutrition records only
          through the confirmed safe-action flow.
        </p>
      </div>
    </section>
  );
}

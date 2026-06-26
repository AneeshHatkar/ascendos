import { getHealthBodyDashboardDataSummary } from "@/lib/dashboard";
import {
  HealthBodyBoundaryNotice,
  HealthBodyEmptyState,
  HealthBodyPrivacyNotice,
  HealthBodyWarningPanel,
} from "./health-body-dashboard-states";
import { HealthBodySupplementDetailPanel } from "./health-body-detail-panels";
import { HealthBodyProofLinkagePanel } from "./health-body-linkage-panels";

interface HealthBodySupplementsDashboardV1Props {
  userId: string;
}

interface SupplementMetric {
  label: string;
  value: number;
  description: string;
}

function SupplementMetricTile({ metric }: { metric: SupplementMetric }) {
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

export async function HealthBodySupplementsDashboardV1({
  userId,
}: HealthBodySupplementsDashboardV1Props) {
  const data = await getHealthBodyDashboardDataSummary(userId);
  const { summary } = data;

  const metrics: SupplementMetric[] = [
    {
      label: "Supplements",
      value: summary.supplement_count,
      description: "All supplement records available for schedule and routine review.",
    },
    {
      label: "Active",
      value: summary.active_supplement_count,
      description: "Active supplement records currently included in routine planning.",
    },
    {
      label: "Supplement logs",
      value: summary.supplement_log_count,
      description: "Adherence and intake records connected to supplement routines.",
    },
    {
      label: "Products",
      value: summary.active_product_count,
      description: "Active product records that may support supplement, nutrition, hair, or skin routines.",
    },
  ];

  const hasSupplementData =
    summary.supplement_count + summary.active_supplement_count + summary.supplement_log_count > 0;

  return (
    <section className="space-y-8">
      <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-6 shadow-lg">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.28em] text-violet-300">
              supplement system
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white">
              Supplements Dashboard
            </h1>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300">
              Read-only supplement surface for supplement records, active routines, dosage notes,
              adherence logs, safety boundaries, and product context. This dashboard summarizes
              existing records only and cannot create or modify data.
            </p>
          </div>

          <div className="rounded-2xl border border-violet-400/20 bg-violet-400/10 px-4 py-3 text-sm text-violet-100">
            <p className="font-medium">Read-only supplement view</p>
            <p className="mt-1 text-violet-100/80">
              Supplement, dosage, schedule, and adherence writes stay disabled until safe
              confirmation flows are added.
            </p>
          </div>
        </div>
      </div>

      <HealthBodyBoundaryNotice
        title="Read-only supplement boundary"
        description="This dashboard can summarize existing supplement, supplement log, product, nutrition, and related health/body records only. New supplement, dosage, schedule, or adherence records must wait for confirmed safe-write flows."
      />
      <HealthBodyPrivacyNotice />
      <HealthBodyWarningPanel warnings={data.warnings} />

      <HealthBodySupplementDetailPanel
        supplements={data.detail_rows.supplements}
        supplementLogs={data.detail_rows.supplement_logs}
        products={data.detail_rows.products}
      />

      <HealthBodyProofLinkagePanel
        bodyLogs={data.detail_rows.body_logs}
        workouts={data.detail_rows.workouts}
        nutritionLogs={data.detail_rows.nutrition_logs}
        supplementLogs={data.detail_rows.supplement_logs}
        sleepLogs={data.detail_rows.sleep_logs}
        energyLogs={data.detail_rows.energy_logs}
        emotionLogs={data.detail_rows.emotion_logs}
        skincareLogs={data.detail_rows.skincare_logs}
        haircareLogs={data.detail_rows.haircare_logs}
      />

      {!hasSupplementData ? (
        <HealthBodyEmptyState
          title="No supplement records yet"
          description="Once supplements and supplement logs exist in the confirmed health/body tables, this read-only dashboard will summarize supplement routines, active products, dosage context, and adherence signals."
        />
      ) : null}

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => (
          <SupplementMetricTile key={metric.label} metric={metric} />
        ))}
      </div>

      <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-5 text-sm text-slate-300">
        <p className="font-semibold text-white">Supplement safety note</p>
        <p className="mt-2 leading-6">
          This surface avoids medical advice, dosage recommendations, treatment claims, supplement
          efficacy claims, and autonomous changes. Carnos may later propose supplement records only
          through the confirmed safe-action flow.
        </p>
      </div>
    </section>
  );
}

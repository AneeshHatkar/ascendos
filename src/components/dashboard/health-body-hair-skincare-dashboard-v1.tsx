import { getHealthBodyDashboardDataSummary } from "@/lib/dashboard";
import {
  HealthBodyBoundaryNotice,
  HealthBodyEmptyState,
  HealthBodyPrivacyNotice,
  HealthBodyWarningPanel,
} from "./health-body-dashboard-states";

interface HealthBodyHairSkincareDashboardV1Props {
  userId: string;
}

interface HairSkincareMetric {
  label: string;
  value: number;
  description: string;
}

function HairSkincareMetricTile({ metric }: { metric: HairSkincareMetric }) {
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

export async function HealthBodyHairSkincareDashboardV1({
  userId,
}: HealthBodyHairSkincareDashboardV1Props) {
  const data = await getHealthBodyDashboardDataSummary(userId);
  const { summary } = data;

  const metrics: HairSkincareMetric[] = [
    {
      label: "Skincare logs",
      value: summary.skincare_log_count,
      description: "Skincare routine completion, product use, irritation notes, and care records.",
    },
    {
      label: "Haircare logs",
      value: summary.haircare_log_count,
      description: "Haircare routine completion, product use, shedding notes, and scalp-care records.",
    },
    {
      label: "Products",
      value: summary.product_count,
      description: "All product records available for hair, skin, nutrition, or supplement routines.",
    },
    {
      label: "Active products",
      value: summary.active_product_count,
      description: "Active products currently included in routine review and care context.",
    },
  ];

  const hasHairSkincareData =
    summary.skincare_log_count +
      summary.haircare_log_count +
      summary.product_count +
      summary.active_product_count >
    0;

  return (
    <section className="space-y-8">
      <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-6 shadow-lg">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.28em] text-fuchsia-300">
              hair skincare system
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white">
              Hair Skincare Dashboard
            </h1>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300">
              Read-only haircare and skincare surface for routines, product use, progress notes,
              care consistency, and sensitive appearance-related records. This dashboard summarizes
              existing records only and cannot create or modify data.
            </p>
          </div>

          <div className="rounded-2xl border border-fuchsia-400/20 bg-fuchsia-400/10 px-4 py-3 text-sm text-fuchsia-100">
            <p className="font-medium">Read-only hair skincare view</p>
            <p className="mt-1 text-fuchsia-100/80">
              Haircare, skincare, product, progress note, and visual evidence writes stay disabled
              until safe confirmation flows are added.
            </p>
          </div>
        </div>
      </div>

      <HealthBodyBoundaryNotice
        title="Read-only hair skincare boundary"
        description="This dashboard can summarize existing haircare, skincare, product, and related health/body records only. New routine, product, progress note, or visual evidence records must wait for confirmed safe-write flows."
      />
      <HealthBodyPrivacyNotice />
      <HealthBodyWarningPanel warnings={data.warnings} />

      {!hasHairSkincareData ? (
        <HealthBodyEmptyState
          title="No haircare or skincare records yet"
          description="Once haircare logs, skincare logs, or product records exist in the confirmed health/body tables, this read-only dashboard will summarize routines, products, progress notes, and care consistency."
        />
      ) : null}

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => (
          <HairSkincareMetricTile key={metric.label} metric={metric} />
        ))}
      </div>

      <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-5 text-sm text-slate-300">
        <p className="font-semibold text-white">Hair and skincare safety note</p>
        <p className="mt-2 leading-6">
          This surface avoids diagnosis, treatment claims, product efficacy claims, appearance
          shaming, body-shaming, and autonomous changes. Progress photos and visual evidence remain
          deferred until an explicit safe storage and privacy flow exists.
        </p>
      </div>
    </section>
  );
}

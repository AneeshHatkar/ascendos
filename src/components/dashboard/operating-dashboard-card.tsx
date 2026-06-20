import { EmptyState } from "@/components/dashboard";
import type { DashboardCardContract } from "@/lib/dashboard";

interface OperatingDashboardCardProps {
  card: DashboardCardContract;
  children?: React.ReactNode;
  footer?: React.ReactNode;
}

const statusClassNameByStatus: Record<DashboardCardContract["status"], string> = {
  ready: "border-emerald-400/30 bg-emerald-400/10 text-emerald-100",
  empty: "border-white/10 bg-white/5 text-slate-300",
  loading: "border-amber-400/30 bg-amber-400/10 text-amber-100",
  error: "border-red-400/30 bg-red-400/10 text-red-100",
  privacy_redacted: "border-amber-400/30 bg-amber-400/10 text-amber-100",
};

const priorityLabelByPriority: Record<DashboardCardContract["priority"], string> = {
  low: "Low",
  medium: "Medium",
  high: "High",
  critical: "Critical",
};

function DashboardLoadingState() {
  return (
    <div className="grid gap-3" aria-label="Loading dashboard card">
      <div className="h-3 w-2/3 animate-pulse rounded-full bg-white/10" />
      <div className="h-3 w-1/2 animate-pulse rounded-full bg-white/10" />
      <div className="h-20 animate-pulse rounded-xl border border-white/10 bg-black/20" />
    </div>
  );
}

function DashboardCardState({ card }: { card: DashboardCardContract }) {
  if (card.status === "loading") {
    return <DashboardLoadingState />;
  }

  if (card.status === "error") {
    return (
      <EmptyState
        title={card.errorStateTitle ?? "Dashboard card unavailable."}
        description={
          card.errorStateDescription ??
          "This card could not load its read-only dashboard data. Refresh or inspect the source table wiring."
        }
      />
    );
  }

  if (card.status === "privacy_redacted") {
    return (
      <EmptyState
        title="Privacy redacted."
        description={
          card.privacyNote ??
          "This card is intentionally hidden because the current privacy boundary does not allow this data to be displayed."
        }
      />
    );
  }

  return (
    <EmptyState
      title={card.emptyStateTitle ?? "No data yet."}
      description={
        card.emptyStateDescription ??
        "This card will populate when matching SQL-backed records exist."
      }
    />
  );
}

export function OperatingDashboardCard({ card, children, footer }: OperatingDashboardCardProps) {
  const shouldShowState = card.status !== "ready" && !children;

  return (
    <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 shadow-sm shadow-black/20">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-base font-semibold text-white">{card.title}</h3>
            <span
              className={`rounded-full border px-2.5 py-1 text-xs font-medium ${
                statusClassNameByStatus[card.status]
              }`}
            >
              {card.status.replace("_", " ")}
            </span>
          </div>
          {card.description ? <p className="text-sm text-slate-400">{card.description}</p> : null}
        </div>
        <div className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-300">
          {priorityLabelByPriority[card.priority]} priority
        </div>
      </div>

      {card.privacyNote ? (
        <p className="mt-4 rounded-xl border border-amber-400/20 bg-amber-400/10 px-3 py-2 text-xs text-amber-100">
          {card.privacyNote}
        </p>
      ) : null}

      <div className="mt-5">{shouldShowState ? <DashboardCardState card={card} /> : children}</div>

      {footer ? <div className="mt-5 border-t border-white/10 pt-4">{footer}</div> : null}
    </section>
  );
}

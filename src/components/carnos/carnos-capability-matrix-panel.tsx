import {
  CARNOS_CAPABILITY_MATRIX,
  isCarnosRuntimeCapabilityEnabled,
} from "@/lib/carnos-identity";
import type { CarnosCapabilityStatus } from "@/lib/carnos-identity";
import { CarnosBoundaryBadges } from "./carnos-boundary-badges";

export type CarnosCapabilityMatrixPanelProps = {
  readonly title?: string;
  readonly subtitle?: string;
  readonly showBoundaryBadges?: boolean;
  readonly className?: string;
};

const statusLabels: Record<CarnosCapabilityStatus, string> = {
  enabled: "Enabled",
  foundation_present: "Foundation present",
  runtime_deferred: "Runtime deferred",
  requires_confirmation: "Requires confirmation",
  forbidden: "Forbidden",
  planned: "Planned",
};

const statusDescriptions: Record<CarnosCapabilityStatus, string> = {
  enabled: "Available in the current system boundary.",
  foundation_present: "The foundation exists, but this does not mean full runtime behavior is active.",
  runtime_deferred: "Designed for a later runtime phase. The UI must not imply it is active now.",
  requires_confirmation: "May only proceed after explicit user confirmation.",
  forbidden: "Not allowed in the current safety boundary.",
  planned: "Planned for future work, not available now.",
};

const statusClassNames: Record<CarnosCapabilityStatus, string> = {
  enabled: "border-emerald-300/25 bg-emerald-950/25 text-emerald-100",
  foundation_present: "border-cyan-300/25 bg-cyan-950/25 text-cyan-100",
  runtime_deferred: "border-violet-300/25 bg-violet-950/25 text-violet-100",
  requires_confirmation: "border-amber-300/25 bg-amber-950/25 text-amber-100",
  forbidden: "border-red-300/25 bg-red-950/25 text-red-100",
  planned: "border-slate-300/20 bg-slate-900/70 text-slate-200",
};

const capabilityOrder: readonly CarnosCapabilityStatus[] = [
  "enabled",
  "foundation_present",
  "requires_confirmation",
  "runtime_deferred",
  "planned",
  "forbidden",
];

function cx(...classNames: Array<string | false | null | undefined>): string {
  return classNames.filter(Boolean).join(" ");
}

export function CarnosCapabilityMatrixPanel({
  title = "Carnos capability matrix",
  subtitle = "A truthful map of what Carnos can do now, what is only foundational, what is deferred, and what is forbidden.",
  showBoundaryBadges = true,
  className,
}: CarnosCapabilityMatrixPanelProps) {
  const capabilitiesByStatus = capabilityOrder.map((status) => ({
    status,
    capabilities: CARNOS_CAPABILITY_MATRIX.filter((capability) => capability.status === status),
  }));

  return (
    <section
      aria-label="Carnos capability matrix and truthfulness panel"
      className={cx(
        "rounded-[2rem] border border-cyan-300/15 bg-slate-950/80 p-5 shadow-xl shadow-cyan-950/20 backdrop-blur-xl",
        "motion-reduce:transition-none",
        className,
      )}
      data-carnos-capability-matrix-panel="true"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-cyan-200/80">
            Truthfulness layer
          </p>
          <h2 className="mt-2 text-xl font-semibold tracking-tight text-slate-100">{title}</h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400">{subtitle}</p>
        </div>

        <div
          className="rounded-2xl border border-white/10 bg-white/[0.035] px-3 py-2 text-xs text-slate-300"
          data-carnos-no-fake-runtime-controls="true"
        >
          No fake active runtime controls
        </div>
      </div>

      <div
        className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-3"
        data-carnos-capability-status-grid="true"
      >
        {capabilitiesByStatus.map(({ status, capabilities }) => (
          <article
            className="rounded-3xl border border-white/10 bg-white/[0.035] p-4"
            data-carnos-capability-status-section={status}
            key={status}
          >
            <div className="flex items-center justify-between gap-3">
              <span
                className={cx(
                  "rounded-full border px-2.5 py-1 text-xs font-semibold",
                  statusClassNames[status],
                )}
                data-carnos-capability-status-badge={status}
              >
                {statusLabels[status]}
              </span>
              <span className="text-xs text-slate-500">{capabilities.length}</span>
            </div>

            <p className="mt-3 text-xs leading-5 text-slate-400">
              {statusDescriptions[status]}
            </p>

            <div className="mt-4 space-y-2" data-carnos-capability-list="true">
              {capabilities.length > 0 ? (
                capabilities.map((capability) => {
                  const runtimeEnabled = isCarnosRuntimeCapabilityEnabled(capability.id);

                  return (
                    <div
                      className="rounded-2xl border border-white/10 bg-slate-950/55 p-3"
                      data-carnos-capability-card={capability.id}
                      data-carnos-capability-runtime-enabled={runtimeEnabled ? "true" : "false"}
                      key={capability.id}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="text-sm font-semibold text-slate-100">
                            {capability.label}
                          </h3>
                          <p className="mt-1 text-xs leading-5 text-slate-400">
                            Status: {statusLabels[capability.status]}. Runtime is {runtimeEnabled ? "active" : "not active"}.
                          </p>
                        </div>
                        <span
                          className={cx(
                            "shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-medium",
                            runtimeEnabled
                              ? "border-emerald-300/25 bg-emerald-950/25 text-emerald-100"
                              : "border-slate-300/15 bg-slate-900/70 text-slate-300",
                          )}
                        >
                          {runtimeEnabled ? "Active" : "Not active"}
                        </span>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="rounded-2xl border border-dashed border-white/10 p-3 text-xs text-slate-500">
                  No capabilities currently mapped to this status.
                </div>
              )}
            </div>
          </article>
        ))}
      </div>

      <div
        className="mt-5 rounded-3xl border border-amber-300/15 bg-amber-950/15 p-4 text-sm leading-6 text-amber-100/85"
        data-carnos-truthfulness-copy="true"
      >
        This panel is descriptive only. It does not activate voice capture, talk-back audio,
        internet browsing, Python/tool execution, document ingestion, automatic memory writes,
        automatic source saves, or autonomous actions.
      </div>

      {showBoundaryBadges ? (
        <div className="mt-5">
          <CarnosBoundaryBadges />
        </div>
      ) : null}
    </section>
  );
}

export default CarnosCapabilityMatrixPanel;

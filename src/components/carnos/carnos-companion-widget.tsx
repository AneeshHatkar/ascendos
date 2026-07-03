import {
  CARNOS_BOUNDARY_BADGES,
  CARNOS_MOBILE_COMPANION_SURFACE_TOKEN,
  getCarnosResponsiveToken,
  getCarnosVisualState,
} from "@/lib/carnos-identity";
import type {
  CarnosBoundaryBadgeId,
  CarnosResponsiveMode,
  CarnosVisualStateId,
} from "@/lib/carnos-identity";
import { CarnosOrb } from "./carnos-orb";

export type CarnosCompanionWidgetMode = "compact" | "expanded" | "mobile_pill";

export type CarnosCompanionWidgetProps = {
  readonly state?: CarnosVisualStateId;
  readonly mode?: CarnosCompanionWidgetMode;
  readonly responsiveMode?: CarnosResponsiveMode;
  readonly title?: string;
  readonly subtitle?: string;
  readonly boundaryBadges?: readonly CarnosBoundaryBadgeId[];
  readonly className?: string;
};

function cx(...classNames: Array<string | false | null | undefined>): string {
  return classNames.filter(Boolean).join(" ");
}

const defaultBoundaryBadges: readonly CarnosBoundaryBadgeId[] = [
  "confirmation_required",
  "no_hidden_memory",
  "no_silent_browsing",
];

export function CarnosCompanionWidget({
  state = "focused",
  mode = "expanded",
  responsiveMode = "desktop",
  title = "Carnos",
  subtitle,
  boundaryBadges = defaultBoundaryBadges,
  className,
}: CarnosCompanionWidgetProps) {
  const visualState = getCarnosVisualState(state);
  const responsiveToken = getCarnosResponsiveToken(responsiveMode);
  const activeSubtitle = subtitle ?? visualState.shortStatus;
  const isMobilePill = mode === "mobile_pill";

  return (
    <section
      aria-label="Carnos visual companion widget"
      className={cx(
        "border border-cyan-300/20 bg-slate-950/80 shadow-xl shadow-cyan-950/20 backdrop-blur-xl",
        "motion-reduce:transition-none",
        isMobilePill ? "rounded-full px-3 py-2" : "rounded-3xl p-4",
        responsiveToken.containerClassName,
        className,
      )}
      data-carnos-companion-widget="true"
      data-carnos-companion-mode={mode}
      data-carnos-mobile-surface={isMobilePill ? CARNOS_MOBILE_COMPANION_SURFACE_TOKEN.surface : undefined}
      data-carnos-state={state}
    >
      <div
        className={cx(
          "flex items-center",
          isMobilePill ? "gap-3" : "gap-4",
          mode === "expanded" ? "sm:items-start" : "items-center",
        )}
      >
        <CarnosOrb
          decorative={false}
          reducedMotion={false}
          showLabel={false}
          showStatus={false}
          size={isMobilePill ? "sm" : mode === "compact" ? "md" : "lg"}
          state={state}
        />

        <div className={cx("min-w-0 flex-1", isMobilePill && "pr-1")}>
          <div className="flex flex-wrap items-center gap-2">
            <h2
              className={cx(
                "truncate font-semibold tracking-tight text-slate-100",
                isMobilePill ? "text-sm" : "text-base",
              )}
            >
              {title}
            </h2>
            <span className="rounded-full border border-cyan-300/20 bg-cyan-950/30 px-2 py-0.5 text-[11px] font-medium text-cyan-100">
              Visual only
            </span>
          </div>

          <p
            className={cx(
              "mt-1 line-clamp-2 text-slate-400",
              isMobilePill ? "text-xs" : "text-sm",
            )}
          >
            {activeSubtitle}
          </p>

          {mode === "expanded" ? (
            <div className="mt-3 flex flex-wrap gap-2" data-carnos-boundary-badge-strip="true">
              {boundaryBadges.map((badgeId) => {
                const badge = CARNOS_BOUNDARY_BADGES.find(
                  (candidate) => candidate.id === badgeId,
                );

                if (!badge) {
                  return null;
                }

                return (
                  <span
                    className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs text-slate-300"
                    data-carnos-boundary-badge={badge.id}
                    key={badge.id}
                    title={badge.description}
                  >
                    {badge.label}
                  </span>
                );
              })}
            </div>
          ) : null}
        </div>
      </div>

      {mode === "expanded" ? (
        <div
          className="mt-4 rounded-2xl border border-white/10 bg-white/[0.035] p-3 text-xs leading-5 text-slate-400"
          data-carnos-runtime-boundary-copy="true"
        >
          Carnos is visually present. This widget does not start voice capture, browse the internet,
          run tools, ingest documents, save memory, or execute actions.
        </div>
      ) : null}
    </section>
  );
}

export default CarnosCompanionWidget;

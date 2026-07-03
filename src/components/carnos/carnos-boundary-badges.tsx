import { CARNOS_BOUNDARY_BADGES } from "@/lib/carnos-identity";
import type { CarnosBoundaryBadgeId } from "@/lib/carnos-identity";

export type CarnosBoundaryBadgesProps = {
  readonly badgeIds?: readonly CarnosBoundaryBadgeId[];
  readonly title?: string;
  readonly compact?: boolean;
  readonly className?: string;
};

function cx(...classNames: Array<string | false | null | undefined>): string {
  return classNames.filter(Boolean).join(" ");
}

const defaultBadgeIds: readonly CarnosBoundaryBadgeId[] = [
  "confirmation_required",
  "no_hidden_memory",
  "no_silent_browsing",
  "no_autosave",
];

export function CarnosBoundaryBadges({
  badgeIds = defaultBadgeIds,
  title = "Carnos safety boundaries",
  compact = false,
  className,
}: CarnosBoundaryBadgesProps) {
  const selectedBadges = badgeIds
    .map((badgeId) => CARNOS_BOUNDARY_BADGES.find((badge) => badge.id === badgeId))
    .filter((badge): badge is NonNullable<typeof badge> => Boolean(badge));

  return (
    <section
      aria-label={title}
      className={cx(
        "rounded-3xl border border-white/10 bg-slate-950/70 p-4 shadow-lg shadow-slate-950/20",
        "motion-reduce:transition-none",
        className,
      )}
      data-carnos-boundary-badges="true"
    >
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-sm font-semibold tracking-tight text-slate-100">{title}</h3>
        <span
          className="rounded-full border border-emerald-300/20 bg-emerald-950/30 px-2.5 py-1 text-[11px] font-medium text-emerald-100"
          data-carnos-truthfulness-badge="true"
        >
          Truthful UI
        </span>
      </div>

      <div
        className={cx(
          "mt-3 grid gap-2",
          compact ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2",
        )}
        data-carnos-boundary-badge-grid="true"
      >
        {selectedBadges.map((badge) => (
          <article
            className="rounded-2xl border border-white/10 bg-white/[0.035] p-3"
            data-carnos-boundary-badge-card={badge.id}
            key={badge.id}
          >
            <div className="text-xs font-semibold text-slate-100">{badge.label}</div>
            {!compact ? (
              <p className="mt-1 text-xs leading-5 text-slate-400">{badge.description}</p>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  );
}

export default CarnosBoundaryBadges;

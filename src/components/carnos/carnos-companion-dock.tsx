import type { CarnosBoundaryBadgeId, CarnosVisualStateId } from "@/lib/carnos-identity";
import { CarnosCompanionWidget } from "./carnos-companion-widget";

export type CarnosCompanionDockPlacement =
  | "bottom_right"
  | "bottom_left"
  | "inline"
  | "mobile_inline";

export type CarnosCompanionDockProps = {
  readonly state?: CarnosVisualStateId;
  readonly placement?: CarnosCompanionDockPlacement;
  readonly title?: string;
  readonly subtitle?: string;
  readonly boundaryBadges?: readonly CarnosBoundaryBadgeId[];
  readonly className?: string;
};

function cx(...classNames: Array<string | false | null | undefined>): string {
  return classNames.filter(Boolean).join(" ");
}

const placementClassNames: Record<CarnosCompanionDockPlacement, string> = {
  bottom_right: "fixed bottom-5 right-5 z-40 max-w-sm",
  bottom_left: "fixed bottom-5 left-5 z-40 max-w-sm",
  inline: "relative w-full",
  mobile_inline: "relative w-full",
};

export function CarnosCompanionDock({
  state = "focused",
  placement = "inline",
  title,
  subtitle,
  boundaryBadges,
  className,
}: CarnosCompanionDockProps) {
  const isMobile = placement === "mobile_inline";

  return (
    <aside
      aria-label="Carnos companion dock"
      className={cx(
        placementClassNames[placement],
        "pointer-events-none motion-reduce:transition-none",
        className,
      )}
      data-carnos-companion-dock="true"
      data-carnos-dock-placement={placement}
    >
      <div className="pointer-events-auto">
        <CarnosCompanionWidget
          boundaryBadges={boundaryBadges}
          mode={isMobile ? "mobile_pill" : "compact"}
          responsiveMode={isMobile ? "mobile" : "desktop"}
          state={state}
          subtitle={subtitle}
          title={title}
        />
      </div>
    </aside>
  );
}

export default CarnosCompanionDock;

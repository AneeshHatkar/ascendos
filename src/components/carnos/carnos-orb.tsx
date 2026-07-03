import {
  CARNOS_MOTION_BOUNDARIES,
  getCarnosAriaLabel,
  getCarnosStateVisualToken,
  getCarnosVisualState,
} from "@/lib/carnos-identity";
import type { CarnosVisualStateId } from "@/lib/carnos-identity";

export type CarnosOrbSize = "sm" | "md" | "lg" | "xl";

export type CarnosOrbProps = {
  readonly state?: CarnosVisualStateId;
  readonly size?: CarnosOrbSize;
  readonly label?: string;
  readonly showLabel?: boolean;
  readonly showStatus?: boolean;
  readonly decorative?: boolean;
  readonly reducedMotion?: boolean;
  readonly className?: string;
};

const sizeClassNames: Record<CarnosOrbSize, string> = {
  sm: "h-14 w-14",
  md: "h-20 w-20",
  lg: "h-28 w-28",
  xl: "h-36 w-36",
};

const maskSizeClassNames: Record<CarnosOrbSize, string> = {
  sm: "h-5 w-7",
  md: "h-7 w-10",
  lg: "h-9 w-14",
  xl: "h-12 w-16",
};

const labelSizeClassNames: Record<CarnosOrbSize, string> = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-sm",
  xl: "text-base",
};

function cx(...classNames: Array<string | false | null | undefined>): string {
  return classNames.filter(Boolean).join(" ");
}

export function CarnosOrb({
  state = "focused",
  size = "lg",
  label,
  showLabel = false,
  showStatus = false,
  decorative = false,
  reducedMotion = false,
  className,
}: CarnosOrbProps) {
  const visualState = getCarnosVisualState(state);
  const visualToken = getCarnosStateVisualToken(state);
  const ariaLabel = label ?? getCarnosAriaLabel(state);
  const shouldReduceMotion = reducedMotion || visualToken.motionMode === "static";

  return (
    <figure
      aria-hidden={decorative ? true : undefined}
      aria-label={decorative ? undefined : ariaLabel}
      className={cx("inline-flex flex-col items-center justify-center gap-3", className)}
      data-carnos-orb="true"
      data-carnos-state={state}
      data-carnos-tone={visualToken.tone}
      data-motion-boundary={CARNOS_MOTION_BOUNDARIES.noFlashing ? "no-flashing" : "unknown"}
      role={decorative ? "presentation" : "img"}
    >
      <div
        className={cx(
          "relative grid place-items-center rounded-full border",
          "transition-colors duration-300",
          "motion-reduce:animate-none motion-reduce:transition-none motion-reduce:transform-none",
          sizeClassNames[size],
          visualToken.orbClassName,
          visualToken.ringClassName,
          shouldReduceMotion && visualToken.staticFallbackClassName,
        )}
      >
        <span
          aria-hidden="true"
          className={cx(
            "absolute inset-[-18%] rounded-full blur-xl",
            "motion-safe:animate-pulse motion-reduce:animate-none",
            visualToken.auraClassName,
            shouldReduceMotion && "animate-none opacity-45",
          )}
          data-carnos-aura="true"
        />

        <span
          aria-hidden="true"
          className={cx(
            "absolute inset-[-7%] rounded-full border",
            "motion-safe:animate-spin motion-reduce:animate-none",
            "duration-1000",
            visualToken.ringClassName,
            shouldReduceMotion && "animate-none",
          )}
          data-carnos-outer-ring="true"
        />

        <span
          aria-hidden="true"
          className={cx(
            "absolute inset-[10%] rounded-full border border-white/10",
            "bg-gradient-to-br from-white/10 via-transparent to-black/30",
            "motion-reduce:animate-none",
          )}
          data-carnos-inner-glass="true"
        />

        <span
          aria-hidden="true"
          className={cx(
            "absolute h-[42%] w-[42%] rounded-full blur-md",
            "motion-safe:animate-pulse motion-reduce:animate-none",
            visualToken.coreClassName,
            shouldReduceMotion && "animate-none",
          )}
          data-carnos-core-glow="true"
        />

        <span
          aria-hidden="true"
          className={cx(
            "relative z-10 grid place-items-center rounded-full border border-white/15",
            "bg-slate-950/80 shadow-inner shadow-black/50",
            maskSizeClassNames[size],
          )}
          data-carnos-mask-shell="true"
        >
          <span
            aria-hidden="true"
            className={cx(
              "absolute left-1/2 top-1/2 h-[34%] w-[72%] -translate-x-1/2 -translate-y-1/2 rounded-full",
              "bg-gradient-to-r from-transparent via-white/45 to-transparent",
              "motion-reduce:transition-none",
            )}
            data-carnos-mask-eye="true"
          />
          <span
            aria-hidden="true"
            className={cx(
              "absolute left-[24%] top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full",
              visualToken.coreClassName,
            )}
            data-carnos-left-node="true"
          />
          <span
            aria-hidden="true"
            className={cx(
              "absolute right-[24%] top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full",
              visualToken.coreClassName,
            )}
            data-carnos-right-node="true"
          />
        </span>

        {state === "reviewing_current_info" ? (
          <>
            <span
              aria-hidden="true"
              className="absolute right-[10%] top-[18%] h-1.5 w-1.5 rounded-full bg-teal-200/80"
              data-carnos-source-node="true"
            />
            <span
              aria-hidden="true"
              className="absolute bottom-[16%] left-[15%] h-1.5 w-1.5 rounded-full bg-teal-200/70"
              data-carnos-source-node="true"
            />
          </>
        ) : null}

        {state === "reviewing_memory" ? (
          <span
            aria-hidden="true"
            className="absolute bottom-[18%] right-[18%] rounded border border-violet-200/40 px-1 text-[8px] leading-none text-violet-100/80"
            data-carnos-memory-glyph="true"
          >
            M
          </span>
        ) : null}

        {state === "privacy_locked" ? (
          <span
            aria-hidden="true"
            className="absolute inset-[-12%] rounded-full border border-indigo-200/30"
            data-carnos-privacy-shield="true"
          />
        ) : null}

        {state === "action_pending" ? (
          <span
            aria-hidden="true"
            className="absolute inset-[-10%] rounded-full border border-amber-200/40"
            data-carnos-confirmation-halo="true"
          />
        ) : null}

        {state === "warning" ? (
          <span
            aria-hidden="true"
            className="absolute inset-[-9%] rounded-full border border-red-200/35"
            data-carnos-warning-ring="true"
          />
        ) : null}
      </div>

      {showLabel || showStatus ? (
        <figcaption className={cx("max-w-48 text-center", labelSizeClassNames[size])}>
          {showLabel ? (
            <div className={cx("font-medium", visualToken.accentClassName)}>Carnos</div>
          ) : null}
          {showStatus ? (
            <div className="mt-1 text-slate-400">{visualState.shortStatus}</div>
          ) : null}
        </figcaption>
      ) : (
        <figcaption className="sr-only">{visualState.shortStatus}</figcaption>
      )}
    </figure>
  );
}

export default CarnosOrb;

import type { CarnosVisualStateId, CarnosVisualTone } from "./carnos-visual-identity";

export type CarnosMotionMode = "standard" | "reduced" | "static";
export type CarnosResponsiveMode = "desktop" | "tablet" | "mobile";
export type CarnosTokenIntensity = "subtle" | "standard" | "strong";

export type CarnosToneToken = {
  readonly tone: CarnosVisualTone;
  readonly label: string;
  readonly textClassName: string;
  readonly borderClassName: string;
  readonly backgroundClassName: string;
  readonly glowClassName: string;
  readonly ringClassName: string;
  readonly badgeClassName: string;
};

export type CarnosStateVisualToken = {
  readonly state: CarnosVisualStateId;
  readonly tone: CarnosVisualTone;
  readonly motionMode: CarnosMotionMode;
  readonly intensity: CarnosTokenIntensity;
  readonly orbClassName: string;
  readonly coreClassName: string;
  readonly ringClassName: string;
  readonly auraClassName: string;
  readonly accentClassName: string;
  readonly reducedMotionClassName: string;
  readonly staticFallbackClassName: string;
};

export type CarnosResponsiveToken = {
  readonly mode: CarnosResponsiveMode;
  readonly containerClassName: string;
  readonly orbSizeClassName: string;
  readonly labelClassName: string;
  readonly placementRule: string;
};

export const CARNOS_BASE_VISUAL_TOKENS = {
  shell:
    "rounded-3xl border border-cyan-400/20 bg-slate-950/70 shadow-2xl shadow-cyan-950/30 backdrop-blur-xl",
  panel:
    "rounded-2xl border border-white/10 bg-white/[0.035] shadow-lg shadow-black/20",
  textPrimary: "text-slate-100",
  textSecondary: "text-slate-300",
  textMuted: "text-slate-500",
  focusRing:
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/80 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950",
  disabled: "opacity-50 saturate-50",
  noFlashBoundary: "transition-colors duration-300",
} as const;

export const CARNOS_TONE_TOKENS: Record<CarnosVisualTone, CarnosToneToken> = {
  neutral: {
    tone: "neutral",
    label: "Neutral",
    textClassName: "text-slate-200",
    borderClassName: "border-slate-400/20",
    backgroundClassName: "bg-slate-900/60",
    glowClassName: "shadow-slate-900/30",
    ringClassName: "ring-slate-400/20",
    badgeClassName: "border-slate-400/20 bg-slate-900/60 text-slate-200",
  },
  focused: {
    tone: "focused",
    label: "Focused",
    textClassName: "text-cyan-100",
    borderClassName: "border-cyan-300/30",
    backgroundClassName: "bg-cyan-950/20",
    glowClassName: "shadow-cyan-500/20",
    ringClassName: "ring-cyan-300/30",
    badgeClassName: "border-cyan-300/25 bg-cyan-950/30 text-cyan-100",
  },
  voice: {
    tone: "voice",
    label: "Voice visual-ready",
    textClassName: "text-sky-100",
    borderClassName: "border-sky-300/30",
    backgroundClassName: "bg-sky-950/20",
    glowClassName: "shadow-sky-500/20",
    ringClassName: "ring-sky-300/30",
    badgeClassName: "border-sky-300/25 bg-sky-950/30 text-sky-100",
  },
  memory: {
    tone: "memory",
    label: "Memory",
    textClassName: "text-violet-100",
    borderClassName: "border-violet-300/30",
    backgroundClassName: "bg-violet-950/20",
    glowClassName: "shadow-violet-500/20",
    ringClassName: "ring-violet-300/30",
    badgeClassName: "border-violet-300/25 bg-violet-950/30 text-violet-100",
  },
  current_info: {
    tone: "current_info",
    label: "Current info",
    textClassName: "text-teal-100",
    borderClassName: "border-teal-300/30",
    backgroundClassName: "bg-teal-950/20",
    glowClassName: "shadow-teal-500/20",
    ringClassName: "ring-teal-300/30",
    badgeClassName: "border-teal-300/25 bg-teal-950/30 text-teal-100",
  },
  privacy: {
    tone: "privacy",
    label: "Privacy",
    textClassName: "text-indigo-100",
    borderClassName: "border-indigo-300/35",
    backgroundClassName: "bg-indigo-950/25",
    glowClassName: "shadow-indigo-500/20",
    ringClassName: "ring-indigo-300/35",
    badgeClassName: "border-indigo-300/25 bg-indigo-950/30 text-indigo-100",
  },
  action: {
    tone: "action",
    label: "Action",
    textClassName: "text-amber-100",
    borderClassName: "border-amber-300/35",
    backgroundClassName: "bg-amber-950/20",
    glowClassName: "shadow-amber-500/20",
    ringClassName: "ring-amber-300/35",
    badgeClassName: "border-amber-300/25 bg-amber-950/30 text-amber-100",
  },
  warning: {
    tone: "warning",
    label: "Warning",
    textClassName: "text-red-100",
    borderClassName: "border-red-300/35",
    backgroundClassName: "bg-red-950/20",
    glowClassName: "shadow-red-500/20",
    ringClassName: "ring-red-300/35",
    badgeClassName: "border-red-300/25 bg-red-950/30 text-red-100",
  },
  celebration: {
    tone: "celebration",
    label: "Celebration",
    textClassName: "text-emerald-100",
    borderClassName: "border-emerald-300/30",
    backgroundClassName: "bg-emerald-950/20",
    glowClassName: "shadow-emerald-500/20",
    ringClassName: "ring-emerald-300/30",
    badgeClassName: "border-emerald-300/25 bg-emerald-950/30 text-emerald-100",
  },
  offline: {
    tone: "offline",
    label: "Offline",
    textClassName: "text-zinc-300",
    borderClassName: "border-zinc-400/20",
    backgroundClassName: "bg-zinc-950/30",
    glowClassName: "shadow-zinc-900/10",
    ringClassName: "ring-zinc-400/20",
    badgeClassName: "border-zinc-400/20 bg-zinc-950/30 text-zinc-300",
  },
};

export const CARNOS_STATE_VISUAL_TOKENS: Record<CarnosVisualStateId, CarnosStateVisualToken> = {
  idle: {
    state: "idle",
    tone: "neutral",
    motionMode: "standard",
    intensity: "subtle",
    orbClassName: "bg-slate-950/90 shadow-lg shadow-slate-700/20",
    coreClassName: "bg-cyan-200/40",
    ringClassName: "border-slate-300/20",
    auraClassName: "bg-cyan-400/10",
    accentClassName: "text-slate-200",
    reducedMotionClassName: "motion-reduce:animate-none motion-reduce:transition-none",
    staticFallbackClassName: "bg-slate-900 border-slate-500/20",
  },
  focused: {
    state: "focused",
    tone: "focused",
    motionMode: "standard",
    intensity: "standard",
    orbClassName: "bg-cyan-950/70 shadow-xl shadow-cyan-500/20",
    coreClassName: "bg-cyan-200/70",
    ringClassName: "border-cyan-300/30",
    auraClassName: "bg-cyan-400/15",
    accentClassName: "text-cyan-100",
    reducedMotionClassName: "motion-reduce:animate-none motion-reduce:transition-none",
    staticFallbackClassName: "bg-cyan-950 border-cyan-300/20",
  },
  listening_visual_ready: {
    state: "listening_visual_ready",
    tone: "voice",
    motionMode: "reduced",
    intensity: "subtle",
    orbClassName: "bg-sky-950/70 shadow-xl shadow-sky-500/20",
    coreClassName: "bg-sky-200/70",
    ringClassName: "border-sky-300/30",
    auraClassName: "bg-sky-400/15",
    accentClassName: "text-sky-100",
    reducedMotionClassName: "motion-reduce:animate-none motion-reduce:transition-none",
    staticFallbackClassName: "bg-sky-950 border-sky-300/20",
  },
  thinking: {
    state: "thinking",
    tone: "focused",
    motionMode: "standard",
    intensity: "standard",
    orbClassName: "bg-cyan-950/70 shadow-xl shadow-cyan-500/20",
    coreClassName: "bg-violet-200/70",
    ringClassName: "border-cyan-300/30",
    auraClassName: "bg-violet-400/15",
    accentClassName: "text-cyan-100",
    reducedMotionClassName: "motion-reduce:animate-none motion-reduce:transition-none",
    staticFallbackClassName: "bg-cyan-950 border-violet-300/20",
  },
  speaking_visual_ready: {
    state: "speaking_visual_ready",
    tone: "voice",
    motionMode: "reduced",
    intensity: "subtle",
    orbClassName: "bg-sky-950/70 shadow-xl shadow-sky-500/20",
    coreClassName: "bg-sky-100/75",
    ringClassName: "border-sky-300/30",
    auraClassName: "bg-sky-300/15",
    accentClassName: "text-sky-100",
    reducedMotionClassName: "motion-reduce:animate-none motion-reduce:transition-none",
    staticFallbackClassName: "bg-sky-950 border-sky-300/20",
  },
  guiding: {
    state: "guiding",
    tone: "focused",
    motionMode: "standard",
    intensity: "standard",
    orbClassName: "bg-cyan-950/70 shadow-xl shadow-cyan-500/20",
    coreClassName: "bg-cyan-100/70",
    ringClassName: "border-cyan-300/30",
    auraClassName: "bg-cyan-400/15",
    accentClassName: "text-cyan-100",
    reducedMotionClassName: "motion-reduce:animate-none motion-reduce:transition-none",
    staticFallbackClassName: "bg-cyan-950 border-cyan-300/20",
  },
  reviewing_memory: {
    state: "reviewing_memory",
    tone: "memory",
    motionMode: "standard",
    intensity: "standard",
    orbClassName: "bg-violet-950/70 shadow-xl shadow-violet-500/20",
    coreClassName: "bg-violet-200/70",
    ringClassName: "border-violet-300/30",
    auraClassName: "bg-violet-400/15",
    accentClassName: "text-violet-100",
    reducedMotionClassName: "motion-reduce:animate-none motion-reduce:transition-none",
    staticFallbackClassName: "bg-violet-950 border-violet-300/20",
  },
  reviewing_current_info: {
    state: "reviewing_current_info",
    tone: "current_info",
    motionMode: "standard",
    intensity: "standard",
    orbClassName: "bg-teal-950/70 shadow-xl shadow-teal-500/20",
    coreClassName: "bg-teal-200/70",
    ringClassName: "border-teal-300/30",
    auraClassName: "bg-teal-400/15",
    accentClassName: "text-teal-100",
    reducedMotionClassName: "motion-reduce:animate-none motion-reduce:transition-none",
    staticFallbackClassName: "bg-teal-950 border-teal-300/20",
  },
  privacy_locked: {
    state: "privacy_locked",
    tone: "privacy",
    motionMode: "reduced",
    intensity: "strong",
    orbClassName: "bg-indigo-950/75 shadow-xl shadow-indigo-500/20",
    coreClassName: "bg-indigo-200/70",
    ringClassName: "border-indigo-300/40",
    auraClassName: "bg-indigo-400/15",
    accentClassName: "text-indigo-100",
    reducedMotionClassName: "motion-reduce:animate-none motion-reduce:transition-none",
    staticFallbackClassName: "bg-indigo-950 border-indigo-300/25",
  },
  action_pending: {
    state: "action_pending",
    tone: "action",
    motionMode: "reduced",
    intensity: "strong",
    orbClassName: "bg-amber-950/75 shadow-xl shadow-amber-500/20",
    coreClassName: "bg-amber-200/70",
    ringClassName: "border-amber-300/40",
    auraClassName: "bg-amber-400/15",
    accentClassName: "text-amber-100",
    reducedMotionClassName: "motion-reduce:animate-none motion-reduce:transition-none",
    staticFallbackClassName: "bg-amber-950 border-amber-300/25",
  },
  warning: {
    state: "warning",
    tone: "warning",
    motionMode: "reduced",
    intensity: "strong",
    orbClassName: "bg-red-950/75 shadow-xl shadow-red-500/20",
    coreClassName: "bg-red-200/70",
    ringClassName: "border-red-300/40",
    auraClassName: "bg-red-400/15",
    accentClassName: "text-red-100",
    reducedMotionClassName: "motion-reduce:animate-none motion-reduce:transition-none",
    staticFallbackClassName: "bg-red-950 border-red-300/25",
  },
  celebrating: {
    state: "celebrating",
    tone: "celebration",
    motionMode: "reduced",
    intensity: "standard",
    orbClassName: "bg-emerald-950/70 shadow-xl shadow-emerald-500/20",
    coreClassName: "bg-emerald-200/70",
    ringClassName: "border-emerald-300/30",
    auraClassName: "bg-emerald-400/15",
    accentClassName: "text-emerald-100",
    reducedMotionClassName: "motion-reduce:animate-none motion-reduce:transition-none",
    staticFallbackClassName: "bg-emerald-950 border-emerald-300/20",
  },
  offline: {
    state: "offline",
    tone: "offline",
    motionMode: "static",
    intensity: "subtle",
    orbClassName: "bg-zinc-950/60 shadow-sm shadow-zinc-900/10",
    coreClassName: "bg-zinc-400/40",
    ringClassName: "border-zinc-400/20",
    auraClassName: "bg-zinc-400/5",
    accentClassName: "text-zinc-300",
    reducedMotionClassName: "motion-reduce:animate-none motion-reduce:transition-none",
    staticFallbackClassName: "bg-zinc-950 border-zinc-400/20",
  },
};

export const CARNOS_RESPONSIVE_TOKENS: Record<CarnosResponsiveMode, CarnosResponsiveToken> = {
  desktop: {
    mode: "desktop",
    containerClassName: "max-w-6xl rounded-3xl p-6",
    orbSizeClassName: "h-28 w-28",
    labelClassName: "text-sm",
    placementRule: "Desktop may use a dashboard card or non-blocking companion dock.",
  },
  tablet: {
    mode: "tablet",
    containerClassName: "max-w-3xl rounded-2xl p-5",
    orbSizeClassName: "h-20 w-20",
    labelClassName: "text-sm",
    placementRule: "Tablet should use a compact inline card.",
  },
  mobile: {
    mode: "mobile",
    containerClassName: "w-full rounded-2xl p-4",
    orbSizeClassName: "h-14 w-14",
    labelClassName: "text-xs",
    placementRule: "Mobile should use a collapsed pill/button or safe inline card that does not overlap primary actions.",
  },
};


export const CARNOS_MOBILE_COMPANION_SURFACE_TOKEN = {
  surface: "mobile_companion_pill",
  placementRule:
    "Mobile Carnos should use a collapsed mobile_companion_pill or safe inline card that does not overlap primary actions.",
} as const;

export const CARNOS_MOTION_BOUNDARIES = {
  noFlashing: true,
  noAggressivePulse: true,
  noSeizureRiskEffects: true,
  preferTransformOpacityOnly: true,
  standardMaxLoopSeconds: 12,
  reducedMaxLoopSeconds: 0,
  staticFallbackRequired: true,
  className:
    "motion-reduce:animate-none motion-reduce:transition-none motion-reduce:transform-none",
} as const;

export function getCarnosToneToken(tone: CarnosVisualTone): CarnosToneToken {
  return CARNOS_TONE_TOKENS[tone];
}

export function getCarnosStateVisualToken(
  state: CarnosVisualStateId,
): CarnosStateVisualToken {
  return CARNOS_STATE_VISUAL_TOKENS[state];
}

export function getCarnosResponsiveToken(
  mode: CarnosResponsiveMode,
): CarnosResponsiveToken {
  return CARNOS_RESPONSIVE_TOKENS[mode];
}

export function getCarnosStaticFallbackClassName(
  state: CarnosVisualStateId,
): string {
  return CARNOS_STATE_VISUAL_TOKENS[state].staticFallbackClassName;
}

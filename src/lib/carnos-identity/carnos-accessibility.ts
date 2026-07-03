import type { CarnosVisualStateId } from "./carnos-visual-identity";

export type CarnosAccessibilityRuleId =
  | "screen_reader_label_required"
  | "keyboard_focus_required"
  | "reduced_motion_required"
  | "static_fallback_required"
  | "no_flashing"
  | "no_aggressive_pulse"
  | "mobile_no_overlap"
  | "truthful_state_label_required";

export type CarnosAccessibilityRule = {
  readonly id: CarnosAccessibilityRuleId;
  readonly label: string;
  readonly requirement: string;
};

export type CarnosAccessibleStateLabel = {
  readonly state: CarnosVisualStateId;
  readonly ariaLabel: string;
  readonly screenReaderDescription: string;
};

export const CARNOS_ACCESSIBILITY_RULES: readonly CarnosAccessibilityRule[] = [
  {
    id: "screen_reader_label_required",
    label: "Screen-reader label required",
    requirement: "Every Carnos visual component must expose a truthful aria-label.",
  },
  {
    id: "keyboard_focus_required",
    label: "Keyboard focus required",
    requirement: "Interactive Carnos surfaces must have visible keyboard focus states.",
  },
  {
    id: "reduced_motion_required",
    label: "Reduced motion required",
    requirement: "Carnos visuals must respect prefers-reduced-motion and provide motion-reduced rendering.",
  },
  {
    id: "static_fallback_required",
    label: "Static fallback required",
    requirement: "The Carnos orb must have a non-animated static fallback.",
  },
  {
    id: "no_flashing",
    label: "No flashing",
    requirement: "Carnos visuals must not use flashing, strobing, or rapid brightness changes.",
  },
  {
    id: "no_aggressive_pulse",
    label: "No aggressive pulse",
    requirement: "Carnos pulse effects must remain calm and non-disruptive.",
  },
  {
    id: "mobile_no_overlap",
    label: "Mobile no-overlap",
    requirement: "Mobile Carnos companion placement must not block primary content or actions.",
  },
  {
    id: "truthful_state_label_required",
    label: "Truthful state label required",
    requirement: "Visual labels must not imply active voice, web, Python, document, memory, or action runtime unless enabled later.",
  },
] as const;

export const CARNOS_ACCESSIBLE_STATE_LABELS: Record<
  CarnosVisualStateId,
  CarnosAccessibleStateLabel
> = {
  idle: {
    state: "idle",
    ariaLabel: "Carnos idle visual state",
    screenReaderDescription: "Carnos is visually present. No background listening, browsing, or action is implied.",
  },
  focused: {
    state: "focused",
    ariaLabel: "Carnos focused visual state",
    screenReaderDescription: "Carnos is in focused companion mode. This is a visual state only.",
  },
  listening_visual_ready: {
    state: "listening_visual_ready",
    ariaLabel: "Carnos listening visual-ready state",
    screenReaderDescription: "Voice visuals are ready, but microphone capture is not active in this phase.",
  },
  thinking: {
    state: "thinking",
    ariaLabel: "Carnos thinking visual state",
    screenReaderDescription: "Carnos is showing a processing visual state. No hidden background work is implied.",
  },
  speaking_visual_ready: {
    state: "speaking_visual_ready",
    ariaLabel: "Carnos speaking visual-ready state",
    screenReaderDescription: "Talk-back visuals are ready, but audio output is not active in this phase.",
  },
  guiding: {
    state: "guiding",
    ariaLabel: "Carnos guiding visual state",
    screenReaderDescription: "Carnos is showing a guidance visual state. No action is executed automatically.",
  },
  reviewing_memory: {
    state: "reviewing_memory",
    ariaLabel: "Carnos memory review visual state",
    screenReaderDescription: "Carnos is showing review-first memory status. No hidden memory write is implied.",
  },
  reviewing_current_info: {
    state: "reviewing_current_info",
    ariaLabel: "Carnos current information review visual state",
    screenReaderDescription: "Carnos is showing citation-aware current information review. No live internet call is implied.",
  },
  privacy_locked: {
    state: "privacy_locked",
    ariaLabel: "Carnos privacy locked visual state",
    screenReaderDescription: "Carnos is showing privacy-protected status.",
  },
  action_pending: {
    state: "action_pending",
    ariaLabel: "Carnos action pending visual state",
    screenReaderDescription: "Carnos is showing that approval is required. No action is executed automatically.",
  },
  warning: {
    state: "warning",
    ariaLabel: "Carnos warning visual state",
    screenReaderDescription: "Carnos is showing a warning state without flashing or aggressive animation.",
  },
  celebrating: {
    state: "celebrating",
    ariaLabel: "Carnos celebration visual state",
    screenReaderDescription: "Carnos is recognizing progress with safe, reduced-motion-compatible visuals.",
  },
  offline: {
    state: "offline",
    ariaLabel: "Carnos offline visual state",
    screenReaderDescription: "Carnos is visually unavailable. No hidden background operation is implied.",
  },
};

export const CARNOS_REDUCED_MOTION_REQUIREMENTS = {
  prefersReducedMotion: "must-respect",
  disableOrbRotation: true,
  disableParticleOrbit: true,
  disableWaveformPulse: true,
  disableCelebrationFlare: true,
  keepStateColor: true,
  keepStateLabel: true,
  staticFallbackRequired: true,
} as const;

export function getCarnosAccessibleStateLabel(
  state: CarnosVisualStateId,
): CarnosAccessibleStateLabel {
  return CARNOS_ACCESSIBLE_STATE_LABELS[state];
}

export function getCarnosAriaLabel(state: CarnosVisualStateId): string {
  return CARNOS_ACCESSIBLE_STATE_LABELS[state].ariaLabel;
}

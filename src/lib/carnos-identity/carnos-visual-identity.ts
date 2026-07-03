export const CARNOS_VISUAL_STATE_IDS = [
  "idle",
  "focused",
  "listening_visual_ready",
  "thinking",
  "speaking_visual_ready",
  "guiding",
  "reviewing_memory",
  "reviewing_current_info",
  "privacy_locked",
  "action_pending",
  "warning",
  "celebrating",
  "offline",
] as const;

export type CarnosVisualStateId = (typeof CARNOS_VISUAL_STATE_IDS)[number];

export type CarnosCapabilityStatus =
  | "enabled"
  | "foundation_present"
  | "runtime_deferred"
  | "requires_confirmation"
  | "forbidden"
  | "planned";

export type CarnosCompanionSurface =
  | "carnos_page"
  | "command_dashboard"
  | "dashboard_card"
  | "companion_dock"
  | "mobile_companion_pill"
  | "future_chat_surface";

export type CarnosBoundaryBadgeId =
  | "review_first"
  | "citation_aware"
  | "privacy_protected"
  | "confirmation_required"
  | "no_silent_browsing"
  | "no_autosave"
  | "no_hidden_memory"
  | "runtime_deferred"
  | "foundation_present";

export type CarnosVisualTone =
  | "neutral"
  | "focused"
  | "voice"
  | "memory"
  | "current_info"
  | "privacy"
  | "action"
  | "warning"
  | "celebration"
  | "offline";

export type CarnosVisualState = {
  readonly id: CarnosVisualStateId;
  readonly label: string;
  readonly tone: CarnosVisualTone;
  readonly priority: number;
  readonly shortStatus: string;
  readonly description: string;
  readonly visualCue: string;
  readonly truthfulBoundary: string;
};

export type CarnosCapability = {
  readonly id: string;
  readonly label: string;
  readonly status: CarnosCapabilityStatus;
  readonly summary: string;
  readonly truthfulDisplay: string;
  readonly boundary: string;
};

export type CarnosBoundaryBadge = {
  readonly id: CarnosBoundaryBadgeId;
  readonly label: string;
  readonly description: string;
};

export type CarnosVisualIdentity = {
  readonly name: "Carnos";
  readonly role: string;
  readonly form: string;
  readonly defaultState: CarnosVisualStateId;
  readonly companionTone: string;
  readonly visualSummary: string;
  readonly surfaces: readonly CarnosCompanionSurface[];
  readonly boundaryStatement: string;
};

export const CARNOS_STATE_PRIORITIES: Record<CarnosVisualStateId, number> = {
  warning: 100,
  privacy_locked: 90,
  action_pending: 80,
  reviewing_current_info: 70,
  reviewing_memory: 60,
  listening_visual_ready: 50,
  speaking_visual_ready: 45,
  thinking: 40,
  guiding: 35,
  focused: 30,
  idle: 20,
  celebrating: 10,
  offline: 0,
};

export const CARNOS_VISUAL_STATES: readonly CarnosVisualState[] = [
  {
    id: "idle",
    label: "Idle",
    tone: "neutral",
    priority: CARNOS_STATE_PRIORITIES.idle,
    shortStatus: "Carnos is present.",
    description: "Carnos is visually present without active runtime work.",
    visualCue: "Soft blue breathing orb with minimal motion.",
    truthfulBoundary: "Presence does not imply background listening, browsing, memory writing, or tool execution.",
  },
  {
    id: "focused",
    label: "Focused",
    tone: "focused",
    priority: CARNOS_STATE_PRIORITIES.focused,
    shortStatus: "Carnos is focused.",
    description: "Carnos is in the default companion state for guidance and dashboard awareness.",
    visualCue: "Stable cyan-violet glow with subtle orbital rings.",
    truthfulBoundary: "Focused means companion UI state only; it does not imply autonomous action.",
  },
  {
    id: "listening_visual_ready",
    label: "Listening visual-ready",
    tone: "voice",
    priority: CARNOS_STATE_PRIORITIES.listening_visual_ready,
    shortStatus: "Voice visuals are ready.",
    description: "Carnos can show a listening-style visual when voice runtime is later enabled.",
    visualCue: "Cyan waveform ring prepared for future listening state.",
    truthfulBoundary: "This is not active microphone capture unless a later voice runtime explicitly enables it.",
  },
  {
    id: "thinking",
    label: "Thinking",
    tone: "focused",
    priority: CARNOS_STATE_PRIORITIES.thinking,
    shortStatus: "Carnos is processing visible context.",
    description: "Carnos is visually representing a reasoning or preparation state.",
    visualCue: "Rotating inner rings and controlled particle motion.",
    truthfulBoundary: "Thinking visuals must be driven by an explicit UI state, not hidden background processing.",
  },
  {
    id: "speaking_visual_ready",
    label: "Speaking visual-ready",
    tone: "voice",
    priority: CARNOS_STATE_PRIORITIES.speaking_visual_ready,
    shortStatus: "Talk-back visuals are ready.",
    description: "Carnos can show a speaking-style visual when text-to-speech is later enabled.",
    visualCue: "Rhythmic waveform pulse around the orb.",
    truthfulBoundary: "This is not active audio output unless a later voice runtime explicitly enables it.",
  },
  {
    id: "guiding",
    label: "Guiding",
    tone: "focused",
    priority: CARNOS_STATE_PRIORITIES.guiding,
    shortStatus: "Carnos is guiding.",
    description: "Carnos is visually presenting safe guidance or next-step support.",
    visualCue: "Calm directional glow with stable companion aura.",
    truthfulBoundary: "Guidance does not execute actions or write data without confirmation.",
  },
  {
    id: "reviewing_memory",
    label: "Reviewing memory",
    tone: "memory",
    priority: CARNOS_STATE_PRIORITIES.reviewing_memory,
    shortStatus: "Memory is review-first.",
    description: "Carnos is displaying approved-memory or memory-review status.",
    visualCue: "Archive glyphs inside the orb with a soft memory glow.",
    truthfulBoundary: "Memory visuals do not mean silent memory writes are active.",
  },
  {
    id: "reviewing_current_info",
    label: "Reviewing current info",
    tone: "current_info",
    priority: CARNOS_STATE_PRIORITIES.reviewing_current_info,
    shortStatus: "Current info is citation-aware.",
    description: "Carnos is displaying source-backed current-information review status.",
    visualCue: "Citation/source nodes orbit the Carnos core.",
    truthfulBoundary: "Current-info visuals do not mean real internet provider calls are active.",
  },
  {
    id: "privacy_locked",
    label: "Privacy locked",
    tone: "privacy",
    priority: CARNOS_STATE_PRIORITIES.privacy_locked,
    shortStatus: "Privacy protection is active.",
    description: "Carnos is showing a privacy-protected state.",
    visualCue: "Shield ring around the orb with reduced visual intensity.",
    truthfulBoundary: "Privacy state must not be bypassed by visual or future runtime features.",
  },
  {
    id: "action_pending",
    label: "Action pending",
    tone: "action",
    priority: CARNOS_STATE_PRIORITIES.action_pending,
    shortStatus: "Approval is required.",
    description: "Carnos has a proposed action or future action placeholder requiring confirmation.",
    visualCue: "Gold confirmation halo around the orb.",
    truthfulBoundary: "Action-pending visuals do not execute anything automatically.",
  },
  {
    id: "warning",
    label: "Warning",
    tone: "warning",
    priority: CARNOS_STATE_PRIORITIES.warning,
    shortStatus: "Carnos needs attention.",
    description: "Carnos is showing a safety, privacy, capability, or boundary warning.",
    visualCue: "Amber/red edge glow with controlled non-flashing emphasis.",
    truthfulBoundary: "Warning visuals must remain accessible and must not use aggressive flashing.",
  },
  {
    id: "celebrating",
    label: "Celebrating",
    tone: "celebration",
    priority: CARNOS_STATE_PRIORITIES.celebrating,
    shortStatus: "Progress recognized.",
    description: "Carnos is acknowledging completion, progress, or a safe milestone.",
    visualCue: "Brief cyan/ember flare with reduced-motion fallback.",
    truthfulBoundary: "Celebration visuals must not override warnings, privacy locks, or action approvals.",
  },
  {
    id: "offline",
    label: "Offline",
    tone: "offline",
    priority: CARNOS_STATE_PRIORITIES.offline,
    shortStatus: "Carnos is visually unavailable.",
    description: "Carnos is shown as unavailable or inactive for the current surface.",
    visualCue: "Dimmed static orb without animated activity.",
    truthfulBoundary: "Offline visuals must not imply hidden background operation.",
  },
] as const;

export const CARNOS_BOUNDARY_BADGES: readonly CarnosBoundaryBadge[] = [
  {
    id: "review_first",
    label: "Review-first",
    description: "Carnos should show candidates for review before saving or acting.",
  },
  {
    id: "citation_aware",
    label: "Citation-aware",
    description: "Current information should remain source-linked and citation-aware.",
  },
  {
    id: "privacy_protected",
    label: "Privacy-protected",
    description: "Private or sensitive states must be visibly protected.",
  },
  {
    id: "confirmation_required",
    label: "Confirmation-required",
    description: "Carnos must not execute actions without explicit confirmation.",
  },
  {
    id: "no_silent_browsing",
    label: "No silent browsing",
    description: "Carnos must not browse the internet without an explicit runtime feature and user-visible flow.",
  },
  {
    id: "no_autosave",
    label: "No autosave",
    description: "Carnos must not save internet, memory, document, or action data silently.",
  },
  {
    id: "no_hidden_memory",
    label: "No hidden memory",
    description: "Carnos must not create or modify memory invisibly.",
  },
  {
    id: "runtime_deferred",
    label: "Runtime deferred",
    description: "The visual system may show future readiness without activating the runtime.",
  },
  {
    id: "foundation_present",
    label: "Foundation present",
    description: "The foundation exists, but user-facing runtime behavior may still be deferred.",
  },
] as const;

export const CARNOS_CAPABILITY_MATRIX: readonly CarnosCapability[] = [
  {
    id: "memory_visibility",
    label: "Memory visibility",
    status: "enabled",
    summary: "Carnos can visually represent approved memory and review-first memory status.",
    truthfulDisplay: "Memory: review-first",
    boundary: "No hidden memory writes.",
  },
  {
    id: "automatic_memory_write",
    label: "Automatic memory write",
    status: "forbidden",
    summary: "Carnos must not automatically write memory.",
    truthfulDisplay: "Automatic memory writes: forbidden",
    boundary: "Memory changes require explicit approval.",
  },
  {
    id: "current_info_review",
    label: "Current-info review",
    status: "enabled",
    summary: "Carnos can visually represent citation-aware current-info review.",
    truthfulDisplay: "Current info: citation-aware review",
    boundary: "No automatic source saving.",
  },
  {
    id: "real_internet_provider",
    label: "Real internet provider",
    status: "runtime_deferred",
    summary: "Phase 16 created the current-info foundation, but a real internet provider is not activated by Phase 16.5B.",
    truthfulDisplay: "Internet provider: deferred",
    boundary: "No silent browsing or provider calls.",
  },
  {
    id: "voice_visual_state",
    label: "Voice visual state",
    status: "enabled",
    summary: "Carnos can define voice-ready visual states.",
    truthfulDisplay: "Voice visuals: ready",
    boundary: "Visual-ready does not mean microphone or speaker runtime is active.",
  },
  {
    id: "full_voice_talk_back",
    label: "Full voice talk-back",
    status: "runtime_deferred",
    summary: "Full speech-to-text and text-to-speech interaction remains deferred.",
    truthfulDisplay: "Voice talk-back: deferred",
    boundary: "No active microphone capture or audio output in Phase 16.5B.",
  },
  {
    id: "python_tools",
    label: "Python/tools",
    status: "runtime_deferred",
    summary: "Python/tool execution is a future capability and is not activated by the visual identity contract.",
    truthfulDisplay: "Python/tools: deferred",
    boundary: "No tool execution runtime.",
  },
  {
    id: "document_ingestion",
    label: "Document ingestion",
    status: "planned",
    summary: "Document intelligence remains planned for later source-linked ingestion flows.",
    truthfulDisplay: "Documents: planned",
    boundary: "No document ingestion engine in Phase 16.5B.",
  },
  {
    id: "actions",
    label: "Actions",
    status: "requires_confirmation",
    summary: "Carnos may visually represent action-pending states, but actions require confirmation.",
    truthfulDisplay: "Actions: confirmation required",
    boundary: "No autonomous execution.",
  },
  {
    id: "background_autonomous_actions",
    label: "Background autonomous actions",
    status: "forbidden",
    summary: "Background autonomous execution is forbidden for this phase.",
    truthfulDisplay: "Autonomous background actions: forbidden",
    boundary: "No hidden agents or uncontrolled background work.",
  },
] as const;

export const CARNOS_COMPANION_SURFACES: readonly CarnosCompanionSurface[] = [
  "carnos_page",
  "command_dashboard",
  "dashboard_card",
  "companion_dock",
  "mobile_companion_pill",
  "future_chat_surface",
] as const;

export const CARNOS_DEFAULT_VISUAL_IDENTITY: CarnosVisualIdentity = {
  name: "Carnos",
  role: "AI companion, strategist, guardian, and life OS guide.",
  form: "Mythic futuristic black-cyan-violet orb / mask companion.",
  defaultState: "focused",
  companionTone: "Calm, direct, protective, execution-oriented, and truthful about capability boundaries.",
  visualSummary:
    "A living orb/mask presence with state-based glow, orbital rings, source nodes, memory glyphs, privacy shield, and confirmation halo.",
  surfaces: CARNOS_COMPANION_SURFACES,
  boundaryStatement:
    "Carnos must not save, browse, remember, speak, run tools, ingest documents, or execute actions unless the corresponding runtime is explicitly enabled and confirmation rules are satisfied.",
};

export function getCarnosVisualState(id: CarnosVisualStateId): CarnosVisualState {
  const state = CARNOS_VISUAL_STATES.find((item) => item.id === id);

  if (!state) {
    return CARNOS_VISUAL_STATES[0];
  }

  return state;
}

export function getHighestPriorityCarnosState(
  states: readonly CarnosVisualStateId[],
): CarnosVisualState {
  if (states.length === 0) {
    return getCarnosVisualState(CARNOS_DEFAULT_VISUAL_IDENTITY.defaultState);
  }

  const sortedStates = [...states].sort(
    (left, right) => CARNOS_STATE_PRIORITIES[right] - CARNOS_STATE_PRIORITIES[left],
  );

  return getCarnosVisualState(sortedStates[0]);
}

export function getCarnosCapabilityStatus(
  capabilityId: string,
): CarnosCapabilityStatus | "unknown" {
  const capability = CARNOS_CAPABILITY_MATRIX.find((item) => item.id === capabilityId);

  return capability?.status ?? "unknown";
}

export function isCarnosRuntimeCapabilityEnabled(capabilityId: string): boolean {
  return getCarnosCapabilityStatus(capabilityId) === "enabled";
}

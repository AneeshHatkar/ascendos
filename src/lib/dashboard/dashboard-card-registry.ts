import {
  assertDashboardCardContract,
  type DashboardCardContract,
  type DashboardSurface,
} from "./dashboard-layout-contract";

export const PHASE_7_DASHBOARD_CARD_REGISTRY: DashboardCardContract[] = [
  {
    id: "command-today-mission",
    surface: "command",
    region: "hero",
    title: "Today Mission",
    description: "Primary operating mission for the current day.",
    priority: "critical",
    status: "empty",
    sourceTables: ["daily_logs", "tasks", "goals"],
    emptyStateTitle: "No mission locked for today.",
    emptyStateDescription: "Create a daily log or task to anchor today.",
  },
  {
    id: "command-proof-actions",
    surface: "command",
    region: "primary",
    title: "Top Proof Actions",
    description: "Highest priority proof-producing actions.",
    priority: "critical",
    status: "empty",
    sourceTables: ["tasks", "proof_items", "goals"],
    emptyStateTitle: "No proof actions found.",
    emptyStateDescription: "Add or confirm tasks tied to proof.",
  },
  {
    id: "command-pending-updates",
    surface: "command",
    region: "right_panel",
    title: "Pending Updates",
    description: "Proposed Carnos/system updates waiting for confirmation.",
    priority: "high",
    status: "empty",
    sourceTables: ["ai_actions"],
    emptyStateTitle: "No pending updates.",
    emptyStateDescription: "Confirmed updates will appear here before execution.",
    errorStateTitle: "Pending updates unavailable.",
    errorStateDescription: "The pending update card could not read ai_actions state.",
    privacyNote: "Only confirmation-relevant action metadata should appear here.",
  },
  {
    id: "timeline-recent-events",
    surface: "timeline",
    region: "primary",
    title: "Recent Timeline",
    description: "Recent dated records across events, proof, logs, and actions.",
    priority: "high",
    status: "empty",
    sourceTables: ["events", "proof_items", "daily_logs", "audit_logs", "ai_actions"],
    emptyStateTitle: "No timeline records yet.",
    emptyStateDescription: "Logs, proof, events, and updates will build the timeline.",
  },
  {
    id: "calendar-today",
    surface: "calendar",
    region: "primary",
    title: "Today Calendar",
    description: "Dated tasks and events for the current day.",
    priority: "high",
    status: "empty",
    sourceTables: ["tasks", "events", "daily_logs"],
    emptyStateTitle: "Nothing scheduled for today.",
    emptyStateDescription: "Scheduled tasks and events will appear here.",
  },
  {
    id: "goals-active",
    surface: "goals",
    region: "primary",
    title: "Active Goals",
    description: "Goals with current reality, target reality, proof requirements, and linked actions.",
    priority: "critical",
    status: "empty",
    sourceTables: ["goals", "tasks", "proof_items"],
    emptyStateTitle: "No active goals yet.",
    emptyStateDescription: "Create or confirm a goal to start the dream-to-proof loop.",
  },
  {
    id: "proof-recent",
    surface: "proof",
    region: "primary",
    title: "Recent Proof",
    description: "Recent evidence attached to goals, tasks, and daily logs.",
    priority: "critical",
    status: "empty",
    sourceTables: ["proof_items", "goals", "tasks", "daily_logs"],
    emptyStateTitle: "No proof captured yet.",
    emptyStateDescription: "Proof items will appear after confirmed logs or manual capture.",
  },
  {
    id: "carnos-operating-panel",
    surface: "carnos",
    region: "right_panel",
    title: "Carnos Operating Panel",
    description: "Safe Carnos-side dashboard context, pending updates, and next action visibility.",
    priority: "high",
    status: "empty",
    sourceTables: ["chat_sessions", "chat_messages", "ai_actions"],
    emptyStateTitle: "No Carnos operating context yet.",
    emptyStateDescription: "Chat and proposed actions will appear here as the system develops.",
    errorStateTitle: "Carnos operating context unavailable.",
    errorStateDescription: "The Carnos panel could not read its source tables.",
    privacyNote: "Carnos context must remain visibility-only until later privacy and memory phases.",
  },
];

export function getDashboardCardsForSurface(surface: DashboardSurface): DashboardCardContract[] {
  return PHASE_7_DASHBOARD_CARD_REGISTRY
    .filter((card) => card.surface === surface)
    .map(assertDashboardCardContract);
}

export function getDashboardCardById(cardId: string): DashboardCardContract | null {
  const card = PHASE_7_DASHBOARD_CARD_REGISTRY.find((item) => item.id === cardId);
  return card ? assertDashboardCardContract(card) : null;
}

export function assertDashboardCardRegistry(): DashboardCardContract[] {
  const seen = new Set<string>();

  return PHASE_7_DASHBOARD_CARD_REGISTRY.map((card) => {
    if (seen.has(card.id)) {
      throw new Error(`Duplicate dashboard card id: ${card.id}`);
    }

    seen.add(card.id);
    return assertDashboardCardContract(card);
  });
}

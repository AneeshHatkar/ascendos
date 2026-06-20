import type { ReactNode } from "react";

export type DashboardSurface =
  | "command"
  | "timeline"
  | "calendar"
  | "goals"
  | "proof"
  | "carnos";

export type DashboardCardRegion =
  | "hero"
  | "primary"
  | "secondary"
  | "right_panel"
  | "timeline_preview"
  | "footer";

export type DashboardCardPriority = "low" | "medium" | "high" | "critical";

export type DashboardCardStatus =
  | "ready"
  | "empty"
  | "loading"
  | "error"
  | "privacy_redacted";

export interface DashboardCardContract {
  id: string;
  surface: DashboardSurface;
  region: DashboardCardRegion;
  title: string;
  description?: string;
  priority: DashboardCardPriority;
  status: DashboardCardStatus;
  sourceTables: string[];
  emptyStateTitle?: string;
  emptyStateDescription?: string;
  errorStateTitle?: string;
  errorStateDescription?: string;
  privacyNote?: string;
}

export interface DashboardLayoutContract {
  surface: DashboardSurface;
  title: string;
  subtitle: string;
  cards: DashboardCardContract[];
  rightPanel?: ReactNode;
  footer?: ReactNode;
}

export const PHASE_7_DASHBOARD_SURFACES: DashboardSurface[] = [
  "command",
  "timeline",
  "calendar",
  "goals",
  "proof",
  "carnos",
];

export const PHASE_7_DASHBOARD_REGIONS: DashboardCardRegion[] = [
  "hero",
  "primary",
  "secondary",
  "right_panel",
  "timeline_preview",
  "footer",
];

export function assertDashboardCardContract(card: DashboardCardContract): DashboardCardContract {
  if (!card.id.trim()) {
    throw new Error("Dashboard card contract requires an id.");
  }

  if (!PHASE_7_DASHBOARD_SURFACES.includes(card.surface)) {
    throw new Error(`Unsupported dashboard surface: ${card.surface}`);
  }

  if (!PHASE_7_DASHBOARD_REGIONS.includes(card.region)) {
    throw new Error(`Unsupported dashboard card region: ${card.region}`);
  }

  if (!card.title.trim()) {
    throw new Error("Dashboard card contract requires a title.");
  }

  if (!Array.isArray(card.sourceTables)) {
    throw new Error("Dashboard card contract requires sourceTables to be an array.");
  }

  return card;
}

export function assertDashboardLayoutContract(layout: DashboardLayoutContract): DashboardLayoutContract {
  if (!PHASE_7_DASHBOARD_SURFACES.includes(layout.surface)) {
    throw new Error(`Unsupported dashboard layout surface: ${layout.surface}`);
  }

  if (!layout.title.trim()) {
    throw new Error("Dashboard layout contract requires a title.");
  }

  if (!layout.subtitle.trim()) {
    throw new Error("Dashboard layout contract requires a subtitle.");
  }

  layout.cards.forEach(assertDashboardCardContract);

  return layout;
}

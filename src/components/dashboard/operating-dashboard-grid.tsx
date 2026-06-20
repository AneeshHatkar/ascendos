import type { DashboardCardRegion } from "@/lib/dashboard";

interface OperatingDashboardGridProps {
  region: DashboardCardRegion;
  children: React.ReactNode;
}

const regionClassName: Record<DashboardCardRegion, string> = {
  hero: "grid gap-4",
  primary: "grid gap-4 lg:grid-cols-2",
  secondary: "grid gap-4 lg:grid-cols-3",
  right_panel: "grid gap-4",
  timeline_preview: "grid gap-4",
  footer: "grid gap-4",
};

export function OperatingDashboardGrid({ region, children }: OperatingDashboardGridProps) {
  return <div className={regionClassName[region]}>{children}</div>;
}


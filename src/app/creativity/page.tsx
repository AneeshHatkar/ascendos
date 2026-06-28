import { PlaceholderDashboardPage } from "@/components/dashboard/placeholder-dashboard-page";
import { PLACEHOLDER_ROUTE_DECISIONS } from "@/lib/placeholder-route-decisions";

export default function CreativityPage() {
  return (
    <PlaceholderDashboardPage
      decision={PLACEHOLDER_ROUTE_DECISIONS.creativity}
    />
  );
}

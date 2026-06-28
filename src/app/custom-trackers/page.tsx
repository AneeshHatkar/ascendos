import { PlaceholderDashboardPage } from "@/components/dashboard/placeholder-dashboard-page";
import { PLACEHOLDER_ROUTE_DECISIONS } from "@/lib/placeholder-route-decisions";

export default function CustomTrackersPage() {
  return (
    <PlaceholderDashboardPage
      decision={PLACEHOLDER_ROUTE_DECISIONS.custom_trackers}
    />
  );
}

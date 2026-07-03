// Phase 19M route marker: No runtime database reads or writes.
import { CustomTrackersDashboardUi } from "@/components/custom-trackers/custom-trackers-dashboard-ui";
import { buildCustomTrackersDashboardViewModel } from "@/lib/custom-trackers/custom-trackers-dashboard-view-model";

export const metadata = {
  title: "Custom Trackers | ascendOS",
  description: "Safe custom tracker dashboard shell with no runtime database reads or writes.",
};

export default function CustomTrackersPage() {
  const viewModel = buildCustomTrackersDashboardViewModel();

  return <CustomTrackersDashboardUi viewModel={viewModel} />;
}

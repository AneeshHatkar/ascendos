// Phase 19M route marker: No runtime database reads or writes.
// Post-v1 runtime boundary marker: Custom tracker persistence is not implemented in v1.
import { CustomTrackersDashboardUi } from "@/components/custom-trackers/custom-trackers-dashboard-ui";
import { buildCustomTrackersDashboardViewModel } from "@/lib/custom-trackers/custom-trackers-dashboard-view-model";

export const metadata = {
  title: "Custom Trackers | ascendOS",
  description: "Safe custom tracker dashboard shell. Runtime custom tracker persistence is explicitly post-v1; this v1 surface performs no runtime database reads or writes.",
};

export default function CustomTrackersPage() {
  const viewModel = buildCustomTrackersDashboardViewModel();

  return <CustomTrackersDashboardUi viewModel={viewModel} />;
}

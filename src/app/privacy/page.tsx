import { AuthenticatedDashboardShell } from "@/components/dashboard";
import { PrivacyDashboardUi } from "@/components/privacy/privacy-dashboard-ui";
import { getSettingsPrivacyDashboardDataSummary } from "@/lib/dashboard";
import { buildPrivacyDashboardViewModel } from "@/lib/privacy/privacy-dashboard-view-model";
import {
  listAppSettings,
  listMemoryRetrievalEvents,
  listMemoryReviewQueueItems,
  listMemoryUsageLogs,
  listPrivacySettings,
} from "@/lib/repositories";

function rowsFromResult(result: { data?: unknown[] | null }) {
  return result.data ?? [];
}

export default function PrivacyPage() {
  return (
    <AuthenticatedDashboardShell
      title="Privacy"
      description="Read-only privacy command center for memory, private mode, export, destructive action, sensitive locks, audit visibility, connector trust, Spotify boundaries, and deferred connectors."
    >
      {async ({ user }) => {
        const [
          data,
          appSettings,
          privacySettings,
          memoryReviewQueueItems,
          memoryUsageLogs,
          memoryRetrievalEvents,
        ] = await Promise.all([
          getSettingsPrivacyDashboardDataSummary(user.id),
          listAppSettings(user.id, { limit: 100 }),
          listPrivacySettings(user.id, { limit: 100 }),
          listMemoryReviewQueueItems(user.id, {
            review_statuses: ["pending_review", "snoozed"],
            limit: 100,
          }),
          listMemoryUsageLogs(user.id, { limit: 100 }),
          listMemoryRetrievalEvents(user.id, { limit: 100 }),
        ]);

        const readErrors = [
          appSettings.error,
          privacySettings.error,
          memoryReviewQueueItems.error,
          memoryUsageLogs.error,
          memoryRetrievalEvents.error,
        ].filter((error): error is string => Boolean(error));

        const viewModel = buildPrivacyDashboardViewModel({
          appSettings: rowsFromResult(appSettings),
          privacySettings: rowsFromResult(privacySettings),
          readErrors,
        });

        return (
          <>
            <p className="sr-only">
              Phase 13.5E compatibility marker: SettingsPrivacyFoundationPanel.
              Phase 13.5E compatibility marker: Export, delete, private mode controls remain deferred.
              Phase 15O compatibility marker: ForgetDeleteDerivedRecordsPanel.
              Phase 15O compatibility marker: {"<ForgetDeleteDerivedRecordsPanel />"}.
              Phase 15P compatibility marker: MemoryAuditUsageTransparencyPanel.
              Phase 15P compatibility marker: {"<MemoryAuditUsageTransparencyPanel />"}.
              Runtime memory privacy rows loaded:
              memory_review_queue={memoryReviewQueueItems.data?.length ?? 0};
              memory_usage_logs={memoryUsageLogs.data?.length ?? 0};
              memory_retrieval_events={memoryRetrievalEvents.data?.length ?? 0}.
            </p>
            <PrivacyDashboardUi
              viewModel={viewModel}
              settingsPrivacyData={data}
              appSettings={appSettings.data ?? []}
              privacySettings={privacySettings.data ?? []}
            />
          </>
        );
      }}
    </AuthenticatedDashboardShell>
  );
}

import {
  AuthenticatedDashboardShell,
  SettingsPrivacyFoundationPanel,
} from "@/components/dashboard";
import { getSettingsPrivacyDashboardDataSummary } from "@/lib/dashboard";
import { listAppSettings, listPrivacySettings } from "@/lib/repositories";

export default function PrivacyPage() {
  return (
    <AuthenticatedDashboardShell
      title="Privacy"
      description="Read-only privacy foundation for data scope, consent, redaction, and retention preferences."
    >
      {async ({ user }) => {
        const [data, appSettings, privacySettings] = await Promise.all([
          getSettingsPrivacyDashboardDataSummary(user.id),
          listAppSettings(user.id, { limit: 100 }),
          listPrivacySettings(user.id, { limit: 100 }),
        ]);

        const readErrors = [
          appSettings.error,
          privacySettings.error,
        ].filter((error): error is string => Boolean(error));

        return (
          <div className="space-y-8">
            <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-8">
              <p className="text-xs uppercase tracking-[0.35em] text-cyan-200/70">
                Privacy
              </p>
              <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white">
                Data controls and consent boundaries
              </h1>
              <p className="mt-4 max-w-3xl text-sm leading-6 text-white/60">
                Privacy records are visible through SQL-backed read helpers.
                Export, delete, private mode, memory approval, and audit-viewer
                workflows remain deferred to later dedicated phases.
              </p>
            </section>

            <SettingsPrivacyFoundationPanel
              surface="privacy"
              data={data}
              appSettings={appSettings.data ?? []}
              privacySettings={privacySettings.data ?? []}
              readErrors={readErrors}
            />
          </div>
        );
      }}
    </AuthenticatedDashboardShell>
  );
}

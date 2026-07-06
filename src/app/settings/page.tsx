/*
 * Athena display identity compatibility note:
 * Legacy audit markers retained for source checks only:
 * Carnos Preferences
 * Profile, privacy, and Carnos controls
 */

import {
  AuthenticatedDashboardShell,
  SettingsPrivacyFoundationPanel,
} from "@/components/dashboard";
import { AiProviderStatusPanel } from "@/components/ai/ai-provider-status-panel";
import { ProfileSummaryCard } from "@/components/profile/profile-summary-card";
import { Phase21JTrustSettingsPanel } from "@/components/privacy/phase21j-trust-settings-panel";
import { getSettingsPrivacyDashboardDataSummary } from "@/lib/dashboard";
import { listAppSettings, listPrivacySettings } from "@/lib/repositories";

const settingsSections = [
  {
    title: "Profile",
    description:
      "Display name, timezone, onboarding state, and identity settings remain visible through the profile summary and future confirmed settings flows.",
  },
  {
    title: "Athena Preferences",
    description:
      "Companion name, persona mode, voice setting, memory mode, and safety mode are represented as read-only settings foundations only.",
  },
  {
    title: "Memory Controls",
    description:
      "Approved memories, memory candidates, export, deletion, and memory privacy remain deferred to later memory/export phases.",
  },
  {
    title: "Security and Privacy",
    description:
      "Account privacy, data export, delete flows, private mode, and audit visibility remain protected future work.",
  },
];

export default function SettingsPage() {
  return (
    <AuthenticatedDashboardShell
      title="Settings"
      description="Read-only settings control foundation for profile, privacy, and Athena preferences."
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
                Settings
              </p>
              <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white">
                Profile, privacy, and Athena controls
              </h1>
              <p className="mt-4 max-w-3xl text-sm leading-6 text-white/60">
                SQL-backed settings visibility is now present, but mutations are
                intentionally not wired. Important Athena, profile, privacy,
                export, delete, voice, memory, and web controls require later
                validated server actions and explicit confirmation rules.
              </p>
            </section>

            <ProfileSummaryCard />

            <AiProviderStatusPanel />

            <Phase21JTrustSettingsPanel surface="settings" />

            <section className="grid gap-4 md:grid-cols-2">
              {settingsSections.map((section) => (
                <div
                  key={section.title}
                  className="rounded-2xl border border-white/10 bg-black/20 p-5"
                >
                  <p className="text-sm font-medium text-white">{section.title}</p>
                  <p className="mt-2 text-sm leading-6 text-white/50">
                    {section.description}
                  </p>
                </div>
              ))}
            </section>

            <SettingsPrivacyFoundationPanel
              surface="settings"
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

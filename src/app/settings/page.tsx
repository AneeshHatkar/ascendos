import { ProfileSummaryCard } from "@/components/profile/profile-summary-card";

const settingsSections = [
  {
    title: "Profile",
    description:
      "Display name, timezone, onboarding state, and identity settings will live here.",
  },
  {
    title: "Carnos Preferences",
    description:
      "Companion name, persona mode, voice setting, memory mode, and safety mode will live here.",
  },
  {
    title: "Memory Controls",
    description:
      "Future controls for approved memories, memory candidates, export, deletion, and privacy levels.",
  },
  {
    title: "Security and Privacy",
    description:
      "Future controls for account privacy, data export, delete flows, and audit visibility.",
  },
];

export default function SettingsPage() {
  return (
    <div className="space-y-8">
      <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-8">
        <p className="text-xs uppercase tracking-[0.35em] text-cyan-200/70">
          Settings
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white">
          Profile, privacy, and Carnos controls
        </h1>
        <p className="mt-4 max-w-3xl text-sm leading-6 text-white/60">
          This page will become the control center for account identity, Carnos
          preferences, approved memory, export/delete controls, and privacy
          boundaries. Mutations are intentionally not wired yet because
          important Carnos and profile changes must use validated server actions
          and clear confirmation rules.
        </p>
      </section>

      <ProfileSummaryCard />

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
    </div>
  );
}

import {
  AuthenticatedDashboardShell,
  HealthBodyEmotionDashboardV1,
} from "@/components/dashboard";

export default function EmotionPage() {
  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-6 py-8">
      <AuthenticatedDashboardShell
        title="Emotion"
        description="Read-only emotion surface for mood, emotional patterns, triggers, reflection, regulation proof, and mental-state records."
      >
        {async ({ user }) => <HealthBodyEmotionDashboardV1 userId={user.id} />}
      </AuthenticatedDashboardShell>
    </main>
  );
}

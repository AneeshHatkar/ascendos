import {
  AuthenticatedDashboardShell,
  HealthBodySleepEnergyDashboardV1,
} from "@/components/dashboard";

export default function SleepEnergyPage() {
  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-6 py-8">
      <AuthenticatedDashboardShell
        title="Sleep Energy"
        description="Read-only sleep and energy surface for sleep, fatigue, energy, routines, focus, stress, and recovery signals."
      >
        {async ({ user }) => <HealthBodySleepEnergyDashboardV1 userId={user.id} />}
      </AuthenticatedDashboardShell>
    </main>
  );
}

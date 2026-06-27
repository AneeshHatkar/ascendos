import {
  AuthenticatedDashboardShell,
  GrimoireDashboardV1,
} from "@/components/dashboard";

export default function GrimoirePage() {
  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-6 py-8">
      <AuthenticatedDashboardShell
        title="Grimoire"
        description="Read-only Grimoire surface for symbolic modes, practical missions, proof actions, corruption warnings, reversion, and weekly throne audit."
      >
        {async ({ user }) => <GrimoireDashboardV1 userId={user.id} />}
      </AuthenticatedDashboardShell>
    </main>
  );
}

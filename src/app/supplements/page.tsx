import {
  AuthenticatedDashboardShell,
  HealthBodySupplementsDashboardV1,
} from "@/components/dashboard";

export default function SupplementsPage() {
  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-6 py-8">
      <AuthenticatedDashboardShell
        title="Supplements"
        description="Read-only supplement surface for supplement schedules, dosage notes, safety boundaries, products, and adherence records."
      >
        {async ({ user }) => <HealthBodySupplementsDashboardV1 userId={user.id} />}
      </AuthenticatedDashboardShell>
    </main>
  );
}

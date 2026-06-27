import {
  AuthenticatedDashboardShell,
  LifeAdminDashboardV1,
} from "@/components/dashboard";

export default function LifeAdminPage() {
  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-6 py-8">
      <AuthenticatedDashboardShell
        title="Life Admin"
        description="Read-only life admin surface for documents, deadlines, subscriptions, finance reminders, housing follow-ups, and daily admin pressure."
      >
        {async ({ user }) => <LifeAdminDashboardV1 userId={user.id} />}
      </AuthenticatedDashboardShell>
    </main>
  );
}

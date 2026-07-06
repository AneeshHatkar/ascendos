import {
  AuthenticatedDashboardShell,
  LifeAdminDashboardV1,
  ManualDashboardActivationPanel,
} from "@/components/dashboard";

export default function LifeAdminPage() {
  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-6 py-8">
      <AuthenticatedDashboardShell
        title="Life Admin"
        description="Read-only life admin surface for documents, deadlines, subscriptions, finance reminders, housing follow-ups, and daily admin pressure."
      >
        {async ({ user }) => (
          <>
            <ManualDashboardActivationPanel
              surface="/life-admin"
              defaultDomain="life_admin"
              title="Manual life-admin capture"
              description="Capture admin tasks, life-admin goals, or document/admin proof as pending proposals. This does not directly create documents, deadlines, subscriptions, finance reminders, housing follow-ups, or admin records."
            />

            <LifeAdminDashboardV1 userId={user.id} />
          </>
        )}
      </AuthenticatedDashboardShell>
    </main>
  );
}

import {
  AuthenticatedDashboardShell,
  FinanceDashboardV1,
} from "@/components/dashboard";

export default function FinancePage() {
  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-6 py-8">
      <AuthenticatedDashboardShell
        title="Finance"
        description="Read-only finance surface for manual accounts, budget categories, income, expenses, rent, utilities, bills, subscriptions, and recurring payments."
      >
        {async ({ user }) => <FinanceDashboardV1 userId={user.id} />}
      </AuthenticatedDashboardShell>
    </main>
  );
}

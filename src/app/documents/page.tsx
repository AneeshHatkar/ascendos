import {
  AuthenticatedDashboardShell,
  DocumentsDashboardV1,
} from "@/components/dashboard";

export default function DocumentsPage() {
  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-6 py-8">
      <AuthenticatedDashboardShell
        title="Documents"
        description="Read-only document metadata surface for IDs, work authorization, school, career, housing, finance, insurance, renewal, review, and expiration records."
      >
        {async ({ user }) => <DocumentsDashboardV1 userId={user.id} />}
      </AuthenticatedDashboardShell>
    </main>
  );
}

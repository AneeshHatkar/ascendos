import {
  AuthenticatedDashboardShell,
  HousingDashboardV1,
} from "@/components/dashboard";

export default function HousingPage() {
  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-6 py-8">
      <AuthenticatedDashboardShell
        title="Housing"
        description="Read-only housing admin surface for rent, lease dates, utilities, maintenance, roommate notes, housing documents, and housing contacts."
      >
        {async ({ user }) => <HousingDashboardV1 userId={user.id} />}
      </AuthenticatedDashboardShell>
    </main>
  );
}

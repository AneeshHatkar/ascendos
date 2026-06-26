import {
  AuthenticatedDashboardShell,
  HealthBodyHairSkincareDashboardV1,
} from "@/components/dashboard";

export default function HairSkincarePage() {
  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-6 py-8">
      <AuthenticatedDashboardShell
        title="Hair Skincare"
        description="Read-only haircare and skincare surface for routines, product use, progress notes, care consistency, and sensitive appearance-related records."
      >
        {async ({ user }) => <HealthBodyHairSkincareDashboardV1 userId={user.id} />}
      </AuthenticatedDashboardShell>
    </main>
  );
}

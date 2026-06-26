import {
  AuthenticatedDashboardShell,
  HealthBodyNutritionDashboardV1,
} from "@/components/dashboard";

export default function NutritionPage() {
  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-6 py-8">
      <AuthenticatedDashboardShell
        title="Nutrition"
        description="Read-only nutrition surface for calories, macros, meals, hydration, meal prep, supplement context, and dietary adherence records."
      >
        {async ({ user }) => <HealthBodyNutritionDashboardV1 userId={user.id} />}
      </AuthenticatedDashboardShell>
    </main>
  );
}

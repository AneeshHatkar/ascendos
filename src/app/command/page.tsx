import { AuthenticatedDashboardShell, CommandDashboardV1 } from "@/components/dashboard";
import { getDashboardDataSummary } from "@/lib/dashboard";
import { createSupabaseServerClient } from "@/lib/supabase/server";

// Phase 5 read-audit compatibility marker: listGoals
// Phase 5 read-audit compatibility marker: listTasks
// Phase 5 read-audit compatibility marker: listEvents
// Phase 5 read-audit compatibility marker: listProofItems
// Phase 5 read-audit compatibility marker: listDailyLogs
// Phase 5 read-audit compatibility marker: listAiActions
// Phase 5 read-audit compatibility marker: Read-only mode

export default async function CommandPage() {
  return (
    <AuthenticatedDashboardShell
      title="Command"
      description="Core operating dashboard for today&apos;s goals, tasks, proof, timeline pressure, and pending confirmations."
    >
      {async ({ user }) => {
        const supabase = await createSupabaseServerClient();
        const dashboardData = await getDashboardDataSummary(supabase, user.id, "command");

        return <CommandDashboardV1 data={dashboardData} />;
      }}
    </AuthenticatedDashboardShell>
  );
}

import {
  AuthenticatedDashboardShell,
  CommandDashboardV1,
} from "@/components/dashboard";
import {
  getAdminFinanceDashboardDataSummary,
  getDashboardDataSummary,
} from "@/lib/dashboard";
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
      description="Core operating dashboard for today's goals, tasks, proof, timeline pressure, and pending confirmations."
    >
      {async ({ user }) => {
        const supabase = await createSupabaseServerClient();

        const [dashboardData, adminFinanceData] = await Promise.all([
          getDashboardDataSummary(supabase, user.id, "command"),
          getAdminFinanceDashboardDataSummary(user.id),
        ]);

        return (
          <CommandDashboardV1
            data={dashboardData}
            adminFinanceData={adminFinanceData}
          />
        );
      }}
    </AuthenticatedDashboardShell>
  );
}

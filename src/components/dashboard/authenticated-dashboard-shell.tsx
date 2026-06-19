import type { ReactNode } from "react";

import { EmptyState, SectionCard } from "@/components/dashboard";
import {
  getDashboardAuthState,
  type DashboardAuthState,
} from "@/lib/dashboard/auth";

type AuthenticatedDashboardShellProps = {
  title: string;
  description: string;
  children: (authState: Extract<DashboardAuthState, { status: "authenticated" }>) => ReactNode;
};

export async function AuthenticatedDashboardShell({
  title,
  description,
  children,
}: AuthenticatedDashboardShellProps) {
  const authState = await getDashboardAuthState();

  if (authState.status !== "authenticated") {
    return (
      <SectionCard title={title} description={description} eyebrow="Read-only dashboard">
        <EmptyState
          title={
            authState.status === "signed_out"
              ? "Sign in required"
              : "Dashboard reads unavailable"
          }
          description={authState.message}
        />
      </SectionCard>
    );
  }

  return <>{children(authState)}</>;
}

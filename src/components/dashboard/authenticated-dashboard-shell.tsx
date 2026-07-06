import type { ReactNode } from "react";

import { EmptyState, SectionCard, StatusPill } from "@/components/dashboard";
import {
  getDashboardAuthState,
  type DashboardAuthState,
} from "@/lib/dashboard/auth";

type AuthenticatedDashboardShellProps = {
  title: string;
  description: string;
  children: (authState: Extract<DashboardAuthState, { status: "authenticated" }>) => ReactNode | Promise<ReactNode>;
  eyebrow?: string;
  rightPanel?: ReactNode;
};

export async function AuthenticatedDashboardShell({
  title,
  description,
  children,
  eyebrow = "Dashboard",
  rightPanel,
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

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/[0.03] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.25)] xl:flex-row xl:items-start xl:justify-between">
        <div className="max-w-3xl">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200/70">
              {eyebrow}
            </p>
            <StatusPill label="Supabase source" tone="success" />
            <StatusPill label="Manual-first" tone="info" />
          </div>
          <h1 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            {title}
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-white/55">
            {description}
          </p>
        </div>

        <div className="w-full max-w-md rounded-2xl border border-white/10 bg-black/20 p-4 xl:w-80">
          {rightPanel ?? (
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-white/45">
                Athena context slot
              </p>
              <p className="mt-2 text-xs leading-5 text-white/50">
                Phase 21B reserves this shared shell space for page-aware
                Athena/context visibility. Runtime chat, memory, and save-card
                behavior are activated in later chunks.
              </p>
            </div>
          )}
        </div>
      </div>

      {await children(authState)}
    </section>
  );
}

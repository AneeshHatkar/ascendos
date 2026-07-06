import type { ReactNode } from "react";

type DashboardStateTone =
  | "empty"
  | "loading"
  | "error"
  | "privacy"
  | "provider"
  | "connector"
  | "offline";

type DashboardStateProps = {
  title: string;
  description: string;
  tone?: DashboardStateTone;
  icon?: ReactNode;
  footer?: ReactNode;
  className?: string;
};

const toneClasses: Record<DashboardStateTone, string> = {
  empty: "border-slate-800 bg-slate-950/50 text-slate-300",
  loading: "border-cyan-900/70 bg-cyan-950/30 text-cyan-200",
  error: "border-rose-900/70 bg-rose-950/30 text-rose-200",
  privacy: "border-violet-900/70 bg-violet-950/30 text-violet-200",
  provider: "border-amber-900/70 bg-amber-950/30 text-amber-200",
  connector: "border-blue-900/70 bg-blue-950/30 text-blue-200",
  offline: "border-orange-900/70 bg-orange-950/30 text-orange-200",
};

export function DashboardState({
  title,
  description,
  tone = "empty",
  icon,
  footer,
  className = "",
}: DashboardStateProps) {
  return (
    <div
      className={[
        "rounded-2xl border border-dashed px-5 py-8 text-center",
        toneClasses[tone],
        className,
      ].join(" ")}
    >
      {icon ? (
        <div className="mx-auto mb-3 flex size-10 items-center justify-center rounded-full border border-current/20 bg-black/20">
          {icon}
        </div>
      ) : null}
      <h3 className="text-sm font-semibold">{title}</h3>
      <p className="mx-auto mt-2 max-w-xl text-sm leading-6 opacity-80">
        {description}
      </p>
      {footer ? <div className="mt-4">{footer}</div> : null}
    </div>
  );
}

export function LoadingState({
  title = "Loading dashboard",
  description = "ascendOS is reading user-owned data and preparing this surface.",
}: Partial<Pick<DashboardStateProps, "title" | "description">>) {
  return <DashboardState title={title} description={description} tone="loading" />;
}

export function ErrorState({
  title = "Dashboard unavailable",
  description = "This surface could not be loaded. The app must show this honestly instead of falling back to fake data.",
}: Partial<Pick<DashboardStateProps, "title" | "description">>) {
  return <DashboardState title={title} description={description} tone="error" />;
}

export function PrivacyBlockedState({
  title = "Privacy boundary active",
  description = "This data is blocked by privacy settings or permissions. Athena and dashboards must not bypass this boundary.",
}: Partial<Pick<DashboardStateProps, "title" | "description">>) {
  return <DashboardState title={title} description={description} tone="privacy" />;
}

export function ProviderDisabledState({
  title = "Provider not configured",
  description = "This AI-assisted feature is disabled until a server-side provider is configured. Manual workflows remain available.",
}: Partial<Pick<DashboardStateProps, "title" | "description">>) {
  return <DashboardState title={title} description={description} tone="provider" />;
}

export function ConnectorDisconnectedState({
  title = "Connector disconnected",
  description = "This connector-backed surface is unavailable until the connector is connected or refreshed.",
}: Partial<Pick<DashboardStateProps, "title" | "description">>) {
  return <DashboardState title={title} description={description} tone="connector" />;
}

export function OfflineState({
  title = "Offline or cached state",
  description = "This surface is showing safe local continuity state. Supabase remains the source of truth.",
}: Partial<Pick<DashboardStateProps, "title" | "description">>) {
  return <DashboardState title={title} description={description} tone="offline" />;
}

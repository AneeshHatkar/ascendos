import type { ReactNode } from "react";

import { AppShell } from "@/components/layout/app-shell";

type DashboardRouteLayoutProps = {
  children: ReactNode;
};

export default function DashboardRouteLayout({
  children,
}: DashboardRouteLayoutProps) {
  return <AppShell>{children}</AppShell>;
}

import type { ReactNode } from "react";
import { AppSidebar } from "./app-sidebar";
import { AppTopbar } from "./app-topbar";

type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-[#07070a] text-white">
      <div className="flex min-h-screen">
        <AppSidebar />
        <div className="flex min-h-screen flex-1 flex-col">
          <AppTopbar />
          <main className="flex-1 px-6 py-8">{children}</main>
        </div>
      </div>
    </div>
  );
}

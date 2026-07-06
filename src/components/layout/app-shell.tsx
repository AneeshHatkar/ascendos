import type { ReactNode } from "react";

import { AppSidebar } from "./app-sidebar";
import { AppTopbar } from "./app-topbar";
import { GlobalAthenaCommandDrawer } from "@/components/athena";
import { MobileNavigationButton } from "./mobile-navigation";

type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-[#07070a] text-white">
      <div className="flex min-h-screen">
        <AppSidebar />
        <div className="flex min-h-screen min-w-0 flex-1 flex-col">
          <AppTopbar menuSlot={<MobileNavigationButton />} />
          <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">{children}</main>
          <GlobalAthenaCommandDrawer />
        </div>
      </div>
    </div>
  );
}

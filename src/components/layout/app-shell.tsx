import type { ReactNode } from "react";

import { AppSidebar } from "./app-sidebar";
import { AppTopbar } from "./app-topbar";
import { GlobalAthenaCommandDrawer } from "@/components/athena";
import { OfflineSyncCenter } from "@/components/storage/offline-sync-center";
import { MobileNavigationButton } from "./mobile-navigation";

type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-[#07070a] text-white">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-full focus:border focus:border-cyan-300/50 focus:bg-slate-950 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-cyan-100">Skip to main content</a>
      <div className="flex min-h-screen">
        <AppSidebar />
        <div className="flex min-h-screen min-w-0 flex-1 flex-col">
          <AppTopbar menuSlot={<MobileNavigationButton />} />
          <main id="main-content" tabIndex={-1} className="flex-1 px-4 py-6 outline-none sm:px-6 lg:px-8">{children}</main>
          <OfflineSyncCenter />
          <GlobalAthenaCommandDrawer />
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";

import { AppSidebar } from "./app-sidebar";

export function MobileNavigationButton() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setMobileNavOpen(true)}
        className="mt-1 rounded-2xl border border-white/10 bg-white/[0.03] px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/70 lg:hidden"
      >
        Menu
      </button>

      <AppSidebar
        mobileOpen={mobileNavOpen}
        onClose={() => setMobileNavOpen(false)}
      />
    </>
  );
}

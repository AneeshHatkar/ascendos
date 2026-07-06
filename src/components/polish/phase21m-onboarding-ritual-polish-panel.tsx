"use client";

import { useMemo, useState } from "react";

type Phase21MTab = "onboarding" | "daily" | "weekly" | "mobile";

type ChecklistItem = {
  id: string;
  label: string;
  description: string;
  surface: string;
  boundary: string;
};

const TABS: Array<{
  id: Phase21MTab;
  label: string;
  description: string;
}> = [
  {
    id: "onboarding",
    label: "Onboarding",
    description: "First-run guidance and useful empty-state next actions.",
  },
  {
    id: "daily",
    label: "Daily ritual",
    description: "Morning command, minimum viable day, and night reflection.",
  },
  {
    id: "weekly",
    label: "Weekly review",
    description: "Proof review, reality gaps, next-week commitments, and Athena prompts.",
  },
  {
    id: "mobile",
    label: "Mobile / polish",
    description: "Drawer, keyboard, focus, mic-boundary, and premium consistency checks.",
  },
];

const CHECKLIST: Record<Phase21MTab, ChecklistItem[]> = {
  onboarding: [
    {
      id: "first-goal",
      label: "Create the first goal",
      description:
        "Send the user toward Goals or Global Add Anything when no goal records exist.",
      surface: "/goals",
      boundary: "Creates pending proposals only; no direct goal write from onboarding.",
    },
    {
      id: "first-task",
      label: "Capture the first task",
      description:
        "Use Command or Athena Add Anything for a small first action instead of a blank dashboard.",
      surface: "/command",
      boundary: "Manual-first capture; confirmation remains required before execution.",
    },
    {
      id: "first-proof",
      label: "Log the first proof item",
      description:
        "Encourage one small evidence artifact so the system starts from reality.",
      surface: "/world-class",
      boundary: "Proof creation still routes through safe-card/proposal review.",
    },
    {
      id: "trust-setup",
      label: "Review trust settings",
      description:
        "Point new users to privacy, backup, provider, connector, and export boundaries.",
      surface: "/privacy",
      boundary: "Trust center previews only; secrets and destructive actions stay blocked.",
    },
  ],
  daily: [
    {
      id: "morning-command",
      label: "Morning command",
      description:
        "Pick the mission, survival tasks, proof target, time risk, and recovery constraint.",
      surface: "/command",
      boundary: "No automatic scheduling or background execution.",
    },
    {
      id: "focus-block",
      label: "Start a focus block",
      description:
        "Use calendar/time awareness as a planning prompt, not an autonomous timer runtime.",
      surface: "/calendar",
      boundary: "No timer, notification, or calendar mutation is activated here.",
    },
    {
      id: "midday-correction",
      label: "Midday correction",
      description:
        "Review drift, blocked work, energy, and one recovery move before the day collapses.",
      surface: "/sleep-energy",
      boundary: "Health/body surfaces remain read-only unless a safe proposal is created.",
    },
    {
      id: "night-reflection",
      label: "Night reflection",
      description:
        "Summarize proof, failures, lessons, and the next minimum viable day.",
      surface: "/timeline",
      boundary: "No hidden memory write; Athena memory remains explicit review only.",
    },
  ],
  weekly: [
    {
      id: "proof-ledger",
      label: "Proof ledger review",
      description:
        "Review proof items, daily logs, and reality score signals before planning.",
      surface: "/world-class",
      boundary: "Review-only panel; no scoring mutation or AI judgment write.",
    },
    {
      id: "goal-delta",
      label: "Goal delta check",
      description:
        "Compare active goals against completed proof and abandoned commitments.",
      surface: "/goals",
      boundary: "Goal edits require explicit proposal and confirmation.",
    },
    {
      id: "career-learning-research",
      label: "Career / learning / research review",
      description:
        "Look at shipped work, applications, study sessions, and research artifacts.",
      surface: "/career",
      boundary: "No automated applications, emails, submissions, or outreach.",
    },
    {
      id: "next-week-plan",
      label: "Next-week plan",
      description:
        "Choose 3 commitments: one career, one body/health, one proof-of-growth.",
      surface: "/command",
      boundary: "Plan is guidance until the user creates confirmed pending actions.",
    },
  ],
  mobile: [
    {
      id: "drawer-reachability",
      label: "Drawer reachability",
      description:
        "Confirm sidebar, Athena drawer, offline drawer, backup panel, and pending updates are reachable on mobile.",
      surface: "global",
      boundary: "Browser proof is finalized in Phase 21N.",
    },
    {
      id: "keyboard-focus",
      label: "Keyboard focus",
      description:
        "Interactive buttons, links, textareas, and close controls expose labels and visible focus states.",
      surface: "global",
      boundary: "No accessibility claim replaces 21N manual smoke evidence.",
    },
    {
      id: "mic-boundary",
      label: "Microphone boundary",
      description:
        "Voice surfaces disclose that browser microphone capture is not active unless a future runtime enables it.",
      surface: "/carnos",
      boundary: "No browser microphone-capture API, recording constructor, or hidden recording.",
    },
    {
      id: "premium-consistency",
      label: "Premium dark consistency",
      description:
        "Cards, drawers, empty states, status pills, and CTAs use the same dark, glass, cyan/orange visual language.",
      surface: "global",
      boundary: "Polish must not hide disabled states or fake provider readiness.",
    },
  ],
};

const ROUTE_LABELS: Record<string, string> = {
  "/command": "Open Command",
  "/goals": "Open Goals",
  "/world-class": "Open World-Class",
  "/privacy": "Open Privacy",
  "/calendar": "Open Calendar",
  "/sleep-energy": "Open Sleep / Energy",
  "/timeline": "Open Timeline",
  "/career": "Open Career",
  "/carnos": "Open Athena",
};

function itemToneClass(checked: boolean) {
  return checked
    ? "border-emerald-300/25 bg-emerald-300/10"
    : "border-white/10 bg-white/[0.035]";
}

function tabClass(active: boolean) {
  return active
    ? "border-cyan-300/50 bg-cyan-300/10 text-cyan-100"
    : "border-white/10 bg-white/[0.035] text-white/65 hover:bg-white/[0.07]";
}

export function Phase21MOnboardingRitualPolishPanel({
  surface = "command",
}: {
  surface?: "command" | "home";
}) {
  const [activeTab, setActiveTab] = useState<Phase21MTab>("onboarding");
  const [checkedIds, setCheckedIds] = useState<Set<string>>(new Set());

  const activeItems = CHECKLIST[activeTab];
  const completedCount = useMemo(
    () =>
      Object.values(CHECKLIST)
        .flat()
        .filter((item) => checkedIds.has(item.id)).length,
    [checkedIds],
  );
  const totalCount = Object.values(CHECKLIST).flat().length;

  function toggleItem(id: string) {
    setCheckedIds((current) => {
      const next = new Set(current);

      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }

      return next;
    });
  }

  return (
    <section
      className="rounded-3xl border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.12),transparent_32%),rgba(255,255,255,0.035)] p-5 shadow-sm shadow-black/20 sm:p-6"
      aria-labelledby={`phase21m-${surface}-title`}
    >
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-orange-200/75">
            Phase 21M final polish layer
          </p>
          <h2
            id={`phase21m-${surface}-title`}
            className="mt-3 text-2xl font-semibold tracking-tight text-white"
          >
            Onboarding, daily ritual, weekly review, mobile, and accessibility polish
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-400">
            This panel gives the user useful first actions and ritual structure without
            pretending that onboarding automation, weekly-review writes, microphone
            capture, or browser smoke proof are already complete. All write paths still
            require explicit user review and confirmation.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/25 p-4 text-sm text-slate-300">
          <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-white/40">
            Local checklist
          </p>
          <p className="mt-2 text-2xl font-semibold text-white">
            {completedCount}/{totalCount}
          </p>
          <p className="mt-1 text-xs leading-5 text-slate-500">
            Browser evidence remains Phase 21N. This progress is local UI state only.
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-2 sm:grid-cols-2 xl:grid-cols-4" role="tablist" aria-label="Phase 21M polish areas">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={activeTab === tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`rounded-2xl border px-4 py-3 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/80 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 ${tabClass(activeTab === tab.id)}`}
          >
            <span className="block text-sm font-semibold">{tab.label}</span>
            <span className="mt-1 block text-xs leading-5 text-white/45">
              {tab.description}
            </span>
          </button>
        ))}
      </div>

      <div className="mt-5 grid gap-4">
        {activeItems.map((item) => {
          const checked = checkedIds.has(item.id);
          const routeLabel = ROUTE_LABELS[item.surface];

          return (
            <article
              key={item.id}
              className={`rounded-2xl border p-4 transition ${itemToneClass(checked)}`}
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <label className="flex min-w-0 flex-1 cursor-pointer items-start gap-3">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleItem(item.id)}
                    className="mt-1 h-4 w-4 rounded border-white/20 bg-black accent-cyan-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/80 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                  />
                  <span>
                    <span className="block text-sm font-semibold text-white">
                      {item.label}
                    </span>
                    <span className="mt-1 block text-sm leading-6 text-slate-400">
                      {item.description}
                    </span>
                    <span className="mt-3 block rounded-xl border border-white/10 bg-black/20 p-3 text-xs leading-5 text-slate-500">
                      Boundary: {item.boundary}
                    </span>
                  </span>
                </label>

                <div className="flex shrink-0 flex-wrap gap-2">
                  <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-semibold text-white/60">
                    {item.surface}
                  </span>
                  {routeLabel ? (
                    <a
                      href={item.surface}
                      className="rounded-full border border-cyan-300/35 bg-cyan-300/10 px-3 py-1 text-xs font-semibold text-cyan-100 transition hover:bg-cyan-300/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/80 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                    >
                      {routeLabel}
                    </a>
                  ) : null}
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200/70">
            Mobile
          </p>
          <p className="mt-2 text-sm leading-6 text-slate-400">
            Drawers must remain reachable and non-overlapping on small screens.
          </p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200/70">
            Keyboard
          </p>
          <p className="mt-2 text-sm leading-6 text-slate-400">
            Buttons, links, checkboxes, and close controls include labels and focus rings.
          </p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200/70">
            Microphone
          </p>
          <p className="mt-2 text-sm leading-6 text-slate-400">
            Mic checks are transparency-only. This panel does not request microphone permission.
          </p>
        </div>
      </div>
    </section>
  );
}

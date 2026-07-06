"use client";

import { useMemo, useState } from "react";
import { usePathname } from "next/navigation";

import { DASHBOARD_REGISTRY } from "@/lib/dashboard-registry";
import { ROUTE_GROUPS, type CanonicalRoute } from "@/lib/routes";
import type {
  ProposedActionContract,
  ProposedActionDomain,
  ProposedActionPriority,
  ProposedProofType,
} from "@/lib/actions/proposed-action-contracts";

type DrawerState =
  | { status: "idle"; message: string }
  | { status: "drafted"; message: string }
  | { status: "saving"; message: string }
  | { status: "saved"; message: string }
  | { status: "error"; message: string };

type AddDestination = "task" | "goal" | "proof" | "daily_log";

type PaletteEntry = {
  readonly id: string;
  readonly label: string;
  readonly description: string;
  readonly href: string;
  readonly group: string;
  readonly keywords: readonly string[];
  readonly privacy: "route_only" | "action_only";
};

const DOMAIN_OPTIONS: ProposedActionDomain[] = [
  "general",
  "career",
  "learning",
  "research",
  "projects",
  "health",
  "body",
  "life_admin",
  "finance",
  "relationships",
  "creativity",
];

const PRIORITY_OPTIONS: ProposedActionPriority[] = ["low", "medium", "high", "urgent"];

const QUICK_ACTIONS: PaletteEntry[] = [
  {
    id: "open-athena",
    label: "Open Athena chat",
    description: "Go to the persistent Athena chat surface.",
    href: "/carnos",
    group: "Athena",
    keywords: ["athena", "chat", "assistant", "carnos"],
    privacy: "route_only",
  },
  {
    id: "pending-updates",
    label: "Review pending updates",
    description: "Open Command to review confirmation-gated updates.",
    href: "/command",
    group: "Actions",
    keywords: ["pending", "confirm", "approve", "updates", "actions"],
    privacy: "route_only",
  },
  {
    id: "privacy",
    label: "Privacy and memory controls",
    description: "Open privacy controls for memory, export, deletion, and connectors.",
    href: "/privacy",
    group: "Settings",
    keywords: ["privacy", "memory", "export", "delete", "forget"],
    privacy: "route_only",
  },
  {
    id: "settings",
    label: "Settings",
    description: "Open app settings and provider status surfaces.",
    href: "/settings",
    group: "Settings",
    keywords: ["settings", "provider", "openai", "voice", "connectors"],
    privacy: "route_only",
  },
  {
    id: "connectors",
    label: "Spotify connector status",
    description: "Open settings where connector states are represented.",
    href: "/settings",
    group: "Connectors",
    keywords: ["spotify", "connector", "oauth", "integration"],
    privacy: "route_only",
  },
];

function registryItem(route: CanonicalRoute) {
  return DASHBOARD_REGISTRY.find((item) => item.route === route);
}

function routeEntries(): PaletteEntry[] {
  return ROUTE_GROUPS.flatMap((group) =>
    group.routes.flatMap((route) => {
      const item = registryItem(route);

      if (!item) {
        return [];
      }

      return [
        {
          id: `route-${item.route}`,
          label: item.title,
          description: `${group.label} route · ${item.route}`,
          href: item.route,
          group: group.label,
          keywords: [item.title, item.route, item.domain, group.label, group.description],
          privacy: "route_only" as const,
        },
      ];
    }),
  );
}

function normalizeSearch(value: string) {
  return value.trim().toLowerCase();
}

function firstSentence(text: string) {
  const compact = text.replace(/\s+/g, " ").trim();
  const sentence = compact.split(/[.!?\n]/).find((part) => part.trim().length > 0)?.trim();

  if (!sentence) {
    return compact.slice(0, 96) || "Untitled Athena capture";
  }

  return sentence.length > 96 ? `${sentence.slice(0, 95)}…` : sentence;
}

function todayIsoDate() {
  return new Date().toISOString().slice(0, 10);
}

function inferProofType(text: string): ProposedProofType {
  const lowered = text.toLowerCase();

  if (lowered.includes("http://") || lowered.includes("https://")) return "link";
  if (lowered.includes("file") || lowered.includes("pdf") || lowered.includes("docx")) return "file";
  if (lowered.includes("metric") || lowered.includes("score") || lowered.includes("%")) return "metric";
  if (lowered.includes("code") || lowered.includes("github") || lowered.includes("repo")) return "code";

  return "note";
}

function buildProposedAction(input: {
  destination: AddDestination;
  text: string;
  domain: ProposedActionDomain;
  priority: ProposedActionPriority;
  pathname: string;
}): ProposedActionContract {
  const title = firstSentence(input.text);
  const source = "carnos" as const;
  const reason = [
    "Global Add Anything capture from Athena drawer.",
    `Page-aware source route: ${input.pathname}.`,
    "This creates only a pending safe card and requires confirmation before any dashboard write.",
  ].join(" ");

  if (input.destination === "goal") {
    return {
      action_type: "create_goal",
      source,
      confidence: 0.72,
      reason,
      payload: {
        title,
        description: input.text,
        domain: input.domain,
        priority: input.priority,
        status: "active",
      },
      evidence_refs: [input.pathname],
    };
  }

  if (input.destination === "proof") {
    return {
      action_type: "create_proof_item",
      source,
      confidence: 0.72,
      reason,
      payload: {
        title,
        proof_type: inferProofType(input.text),
        description: input.text,
        source_text: input.text,
        occurred_at: new Date().toISOString(),
      },
      evidence_refs: [input.pathname],
    };
  }

  if (input.destination === "daily_log") {
    return {
      action_type: "create_daily_log",
      source,
      confidence: 0.7,
      reason,
      payload: {
        log_date: todayIsoDate(),
        summary: title,
        notes: input.text,
      },
      evidence_refs: [input.pathname],
    };
  }

  return {
    action_type: "create_task",
    source,
    confidence: 0.72,
    reason,
    payload: {
      title,
      description: input.text,
      domain: input.domain,
      priority: input.priority,
      status: "todo",
    },
    evidence_refs: [input.pathname],
  };
}

function stateClass(status: DrawerState["status"]) {
  if (status === "error") return "border-red-400/20 bg-red-400/10 text-red-100";
  if (status === "saved") return "border-emerald-400/20 bg-emerald-400/10 text-emerald-100";
  if (status === "drafted") return "border-cyan-400/20 bg-cyan-400/10 text-cyan-100";
  return "border-white/10 bg-white/[0.04] text-slate-300";
}

function prettyJson(value: unknown) {
  return JSON.stringify(value, null, 2);
}

function parseJsonAction(value: string) {
  try {
    return JSON.parse(value) as ProposedActionContract;
  } catch {
    return null;
  }
}

export function GlobalAthenaCommandDrawer() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [captureText, setCaptureText] = useState("");
  const [destination, setDestination] = useState<AddDestination>("task");
  const [domain, setDomain] = useState<ProposedActionDomain>("general");
  const [priority, setPriority] = useState<ProposedActionPriority>("medium");
  const [draftJson, setDraftJson] = useState("");
  const [state, setState] = useState<DrawerState>({
    status: "idle",
    message:
      "Global Athena is ready. Route search is privacy-filtered and Add Anything creates confirmation-gated safe cards only.",
  });

  const entries = useMemo(() => [...QUICK_ACTIONS, ...routeEntries()], []);

  const filteredEntries = useMemo(() => {
    const query = normalizeSearch(search);

    if (!query) {
      return entries.slice(0, 18);
    }

    return entries
      .filter((entry) =>
        [entry.label, entry.description, entry.group, entry.href, ...entry.keywords]
          .join(" ")
          .toLowerCase()
          .includes(query),
      )
      .slice(0, 24);
  }, [entries, search]);

  const currentRouteTitle = useMemo(() => {
    const match = DASHBOARD_REGISTRY.find((item) => item.route === pathname);
    return match?.title ?? pathname;
  }, [pathname]);

  function draftSafeCard() {
    const text = captureText.trim();

    if (!text) {
      setState({
        status: "error",
        message: "Write something in Add Anything before drafting a safe card.",
      });
      return;
    }

    const proposedAction = buildProposedAction({
      destination,
      text,
      domain,
      priority,
      pathname,
    });

    setDraftJson(prettyJson(proposedAction));
    setState({
      status: "drafted",
      message:
        "Safe card drafted. Review or edit the JSON, then create it as a pending update. No dashboard write has happened.",
    });
  }

  async function createPendingSafeCard() {
    const parsed = parseJsonAction(draftJson);

    if (!parsed) {
      setState({
        status: "error",
        message: "Safe-card JSON is invalid. Fix it before creating a pending update.",
      });
      return;
    }

    setState({
      status: "saving",
      message: "Creating pending safe card through the server confirmation boundary…",
    });

    try {
      const response = await fetch("/api/athena/save-cards", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          proposed_action: parsed,
          source_text: captureText,
        }),
      });

      const payload = (await response.json()) as {
        status?: string;
        message?: string;
        requires_confirmation?: boolean;
        writes_performed?: boolean;
      };

      if (!response.ok || payload.status !== "success") {
        throw new Error(payload.message ?? "Could not create pending safe card.");
      }

      setState({
        status: "saved",
        message:
          "Pending update created. It still requires review/approval before any record is written.",
      });
    } catch (error) {
      setState({
        status: "error",
        message:
          error instanceof Error
            ? error.message
            : "Could not create pending safe card.",
      });
    }
  }

  return (
    <>
      <div className="fixed bottom-4 right-4 z-40 flex flex-col items-end gap-2">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="rounded-full border border-cyan-300/40 bg-cyan-300/15 px-5 py-3 text-sm font-semibold text-cyan-50 shadow-2xl shadow-cyan-950/40 backdrop-blur transition hover:bg-cyan-300/25"
        >
          Athena
        </button>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="rounded-full border border-white/10 bg-black/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/70 backdrop-blur transition hover:bg-white/[0.08]"
        >
          Add / Search
        </button>
      </div>

      {open ? (
        <div className="fixed inset-0 z-[60]" role="dialog" aria-modal="true">
          <button
            type="button"
            aria-label="Close global Athena drawer"
            className="absolute inset-0 bg-black/75"
            onClick={() => setOpen(false)}
          />

          <section className="absolute inset-y-0 right-0 flex w-[min(46rem,96vw)] flex-col border-l border-white/10 bg-[#07070a] text-white shadow-2xl">
            <div className="border-b border-white/10 p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.28em] text-cyan-200/75">
                    Phase 21I global Athena
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold">Add Anything + Search Palette</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    Page-aware route: <span className="text-cyan-100">{currentRouteTitle}</span>{" "}
                    <span className="text-slate-500">({pathname})</span>
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded-full border border-white/10 px-4 py-2 text-sm text-white/70 hover:bg-white/[0.06]"
                >
                  Close
                </button>
              </div>

              <div className={`mt-4 rounded-2xl border p-3 text-sm leading-6 ${stateClass(state.status)}`}>
                {state.message}
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-5">
              <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
                <section className="rounded-3xl border border-white/10 bg-white/[0.035] p-4">
                  <p className="text-sm font-semibold text-white">Global Add Anything</p>
                  <p className="mt-2 text-xs leading-5 text-slate-400">
                    Capture from any page. This drafts a safe card only; it never bypasses confirmation.
                  </p>

                  <textarea
                    value={captureText}
                    onChange={(event) => setCaptureText(event.target.value)}
                    className="mt-4 min-h-32 w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-sm leading-6 text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-300/60"
                    placeholder="Add anything: task, goal, proof, daily log, idea, reminder, research note..."
                    maxLength={4000}
                  />

                  <div className="mt-4 grid gap-3 sm:grid-cols-3">
                    <label className="text-xs text-slate-400">
                      Destination override
                      <select
                        value={destination}
                        onChange={(event) => setDestination(event.target.value as AddDestination)}
                        className="mt-1 w-full rounded-xl border border-white/10 bg-slate-950 px-3 py-2 text-sm text-white"
                      >
                        <option value="task">Task</option>
                        <option value="goal">Goal</option>
                        <option value="proof">Proof</option>
                        <option value="daily_log">Daily log</option>
                      </select>
                    </label>

                    <label className="text-xs text-slate-400">
                      Domain
                      <select
                        value={domain}
                        onChange={(event) => setDomain(event.target.value as ProposedActionDomain)}
                        className="mt-1 w-full rounded-xl border border-white/10 bg-slate-950 px-3 py-2 text-sm text-white"
                      >
                        {DOMAIN_OPTIONS.map((item) => (
                          <option key={item} value={item}>
                            {item.replaceAll("_", " ")}
                          </option>
                        ))}
                      </select>
                    </label>

                    <label className="text-xs text-slate-400">
                      Priority
                      <select
                        value={priority}
                        onChange={(event) => setPriority(event.target.value as ProposedActionPriority)}
                        className="mt-1 w-full rounded-xl border border-white/10 bg-slate-950 px-3 py-2 text-sm text-white"
                      >
                        {PRIORITY_OPTIONS.map((item) => (
                          <option key={item} value={item}>
                            {item}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={draftSafeCard}
                      className="rounded-full border border-cyan-300/40 bg-cyan-300/10 px-4 py-2 text-sm font-semibold text-cyan-100 hover:bg-cyan-300/20"
                    >
                      Draft safe card
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setCaptureText("");
                        setDraftJson("");
                        setState({
                          status: "idle",
                          message: "Capture cleared. No record was written.",
                        });
                      }}
                      className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-medium text-white/70 hover:bg-white/[0.08]"
                    >
                      Cancel
                    </button>
                  </div>

                  {draftJson ? (
                    <div className="mt-4">
                      <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                        Review/edit safe-card JSON
                      </label>
                      <textarea
                        value={draftJson}
                        onChange={(event) => setDraftJson(event.target.value)}
                        className="mt-2 min-h-64 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 font-mono text-xs leading-5 text-slate-200 outline-none focus:border-cyan-300/60"
                        spellCheck={false}
                      />
                      <button
                        type="button"
                        onClick={() => void createPendingSafeCard()}
                        disabled={state.status === "saving"}
                        className="mt-3 rounded-full border border-emerald-300/40 bg-emerald-300/10 px-4 py-2 text-sm font-semibold text-emerald-100 hover:bg-emerald-300/20 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        Create pending update
                      </button>
                    </div>
                  ) : null}
                </section>

                <section className="rounded-3xl border border-white/10 bg-white/[0.035] p-4">
                  <p className="text-sm font-semibold text-white">Command/search palette</p>
                  <p className="mt-2 text-xs leading-5 text-slate-400">
                    Privacy-filtered route/action search. It does not search private record contents.
                  </p>

                  <input
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    className="mt-4 w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-300/60"
                    placeholder="Search pages, settings, connectors, actions..."
                  />

                  <div className="mt-4 grid gap-2">
                    {filteredEntries.map((entry) => (
                      <a
                        key={entry.id}
                        href={entry.href}
                        className="rounded-2xl border border-white/10 bg-black/20 p-3 transition hover:bg-white/[0.06]"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="text-sm font-semibold text-white">{entry.label}</p>
                            <p className="mt-1 text-xs leading-5 text-slate-400">
                              {entry.description}
                            </p>
                          </div>
                          <span className="rounded-full border border-white/10 px-2 py-1 text-[10px] uppercase tracking-[0.16em] text-slate-400">
                            {entry.group}
                          </span>
                        </div>
                        <p className="mt-2 text-xs text-cyan-200/75">{entry.href}</p>
                      </a>
                    ))}

                    {filteredEntries.length === 0 ? (
                      <div className="rounded-2xl border border-dashed border-white/10 p-5 text-sm text-slate-500">
                        No route/action match. Record-content search is intentionally not enabled
                        from the global palette in 21I.
                      </div>
                    ) : null}
                  </div>

                  <div className="mt-4 rounded-2xl border border-amber-300/15 bg-amber-950/15 p-3 text-xs leading-5 text-amber-100/80">
                    Privacy filter: this palette indexes route labels, safe quick actions, settings,
                    connectors, and dashboard names only. It does not expose private task, memory,
                    document, finance, health, or chat content.
                  </div>
                </section>
              </div>
            </div>
          </section>
        </div>
      ) : null}
    </>
  );
}

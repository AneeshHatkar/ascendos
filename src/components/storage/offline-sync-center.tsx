"use client";

import { useEffect, useMemo, useState } from "react";

import {
  clearSyncedOfflineQueueItems,
  deleteOfflineDraft,
  deleteOfflineQueueItem,
  isOfflineStorageAvailable,
  listOfflineDraftCache,
  listOfflineSafeCardQueue,
  saveOfflineDraftCache,
  summarizeOfflineQueue,
  syncOfflineSafeCardQueue,
  type OfflineDraftCacheItem,
  type OfflineSafeCardQueueItem,
} from "@/lib/storage/offline-sync";

type CenterState =
  | { status: "idle"; message: string }
  | { status: "working"; message: string }
  | { status: "success"; message: string }
  | { status: "error"; message: string };

function stateClass(status: CenterState["status"]) {
  if (status === "error") return "border-red-400/20 bg-red-400/10 text-red-100";
  if (status === "success") return "border-emerald-400/20 bg-emerald-400/10 text-emerald-100";
  if (status === "working") return "border-cyan-400/20 bg-cyan-400/10 text-cyan-100";

  return "border-white/10 bg-white/[0.04] text-slate-300";
}

function statusClass(status: OfflineSafeCardQueueItem["status"] | OfflineDraftCacheItem["status"]) {
  if (status === "failed" || status === "stale") return "border-amber-300/20 bg-amber-300/10 text-amber-100";
  if (status === "synced" || status === "cached") return "border-emerald-300/20 bg-emerald-300/10 text-emerald-100";
  if (status === "syncing") return "border-cyan-300/20 bg-cyan-300/10 text-cyan-100";

  return "border-white/10 bg-white/[0.04] text-slate-300";
}

function short(value: string, length = 130) {
  const trimmed = value.trim();

  return trimmed.length > length ? `${trimmed.slice(0, length - 1)}…` : trimmed;
}

function formatDate(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat(undefined, {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

export function OfflineSyncCenter() {
  const [open, setOpen] = useState(false);
  const [online, setOnline] = useState(true);
  const [available, setAvailable] = useState(false);
  const [queue, setQueue] = useState<OfflineSafeCardQueueItem[]>([]);
  const [drafts, setDrafts] = useState<OfflineDraftCacheItem[]>([]);
  const [draftBody, setDraftBody] = useState("");
  const [state, setState] = useState<CenterState>({
    status: "idle",
    message:
      "Offline continuity is ready for safe-card queue and text draft cache. Supabase/Postgres remains source of truth.",
  });

  const summary = useMemo(() => summarizeOfflineQueue(queue), [queue]);

  async function refresh() {
    setAvailable(isOfflineStorageAvailable());

    if (typeof navigator !== "undefined") {
      setOnline(navigator.onLine);
    }

    if (!isOfflineStorageAvailable()) {
      setQueue([]);
      setDrafts([]);
      return;
    }

    try {
      const [nextQueue, nextDrafts] = await Promise.all([
        listOfflineSafeCardQueue(),
        listOfflineDraftCache(),
      ]);
      setQueue(nextQueue);
      setDrafts(nextDrafts);
    } catch (error) {
      setState({
        status: "error",
        message:
          error instanceof Error ? error.message : "Could not read offline storage.",
      });
    }
  }

  async function runSync() {
    setState({
      status: "working",
      message: "Syncing queued safe cards through the server confirmation boundary…",
    });

    try {
      const result = await syncOfflineSafeCardQueue();
      await refresh();
      setState({
        status: result.failed > 0 ? "error" : "success",
        message: result.message,
      });
    } catch (error) {
      setState({
        status: "error",
        message: error instanceof Error ? error.message : "Offline sync failed.",
      });
    }
  }

  async function saveDraft() {
    const body = draftBody.trim();

    if (!body) {
      setState({
        status: "error",
        message: "Write a draft before saving it to the offline draft cache.",
      });
      return;
    }

    try {
      await saveOfflineDraftCache({
        title: body.split(/[.!?\n]/)[0] ?? "Offline draft",
        body,
        routeContext: typeof location === "undefined" ? "unknown" : location.pathname,
      });
      setDraftBody("");
      await refresh();
      setState({
        status: "success",
        message:
          "Offline draft cached in IndexedDB. It is not the source of truth and has not been synced.",
      });
    } catch (error) {
      setState({
        status: "error",
        message:
          error instanceof Error ? error.message : "Could not save offline draft.",
      });
    }
  }

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void refresh();
    }, 0);

    const handleChange = () => {
      void refresh();
    };

    window.addEventListener("online", handleChange);
    window.addEventListener("offline", handleChange);
    window.addEventListener("ascendos-offline-queue-changed", handleChange);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("online", handleChange);
      window.removeEventListener("offline", handleChange);
      window.removeEventListener("ascendos-offline-queue-changed", handleChange);
    };
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-4 left-4 z-40 rounded-full border border-white/10 bg-black/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/70 shadow-2xl backdrop-blur transition hover:bg-white/[0.08]"
      >
        Offline {summary.queued + summary.failed > 0 ? `· ${summary.queued + summary.failed}` : ""}
      </button>

      {open ? (
        <div className="fixed inset-0 z-[60]" role="dialog" aria-modal="true">
          <button
            type="button"
            aria-label="Close offline sync center"
            className="absolute inset-0 bg-black/75"
            onClick={() => setOpen(false)}
          />

          <section className="absolute inset-y-0 left-0 flex w-[min(44rem,96vw)] flex-col border-r border-white/10 bg-[#07070a] text-white shadow-2xl">
            <div className="border-b border-white/10 p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-orange-200/70">
                    Phase 21K
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold">Offline cache and sync queue</h2>
                  <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400">
                    IndexedDB stores only safe-card queue items and local text drafts.
                    Supabase/Postgres remains the source of truth.
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

              <div className="mt-4 grid gap-3 sm:grid-cols-4">
                {[
                  ["Browser", available ? "IndexedDB ready" : "Unavailable"],
                  ["Network", online ? "online" : "offline"],
                  ["Queued", String(summary.queued)],
                  ["Failed", String(summary.failed)],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-white/35">{label}</p>
                    <p className="mt-1 text-sm font-semibold text-white">{value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-5">
              <div className="grid gap-5">
                <section className="rounded-3xl border border-white/10 bg-white/[0.035] p-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-white">Sync queue</p>
                      <p className="mt-1 text-xs leading-5 text-slate-400">
                        Only Athena safe-card proposals are queued. Sync creates pending updates through the same server route.
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => void runSync()}
                        className="rounded-full border border-cyan-300/40 bg-cyan-300/10 px-4 py-2 text-sm font-semibold text-cyan-100 hover:bg-cyan-300/20"
                      >
                        Sync now
                      </button>
                      <button
                        type="button"
                        onClick={() => void clearSyncedOfflineQueueItems().then(refresh)}
                        className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white/70 hover:bg-white/[0.08]"
                      >
                        Clear synced
                      </button>
                    </div>
                  </div>

                  <div className="mt-4 grid gap-3">
                    {queue.length === 0 ? (
                      <p className="rounded-2xl border border-dashed border-white/10 p-4 text-sm text-slate-500">
                        No queued safe-card items.
                      </p>
                    ) : (
                      queue.map((item) => (
                        <div
                          key={item.id}
                          className="rounded-2xl border border-white/10 bg-black/20 p-4"
                        >
                          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                            <div>
                              <p className="text-sm font-semibold text-white">
                                {short(item.sourceText, 90)}
                              </p>
                              <p className="mt-1 text-xs text-slate-500">
                                {item.routeContext} · {formatDate(item.createdAt)} · attempts {item.attempts}
                              </p>
                            </div>
                            <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${statusClass(item.status)}`}>
                              {item.status}
                            </span>
                          </div>

                          {item.lastError ? (
                            <p className="mt-3 rounded-xl border border-amber-300/15 bg-amber-950/15 p-3 text-xs text-amber-100">
                              {item.lastError}
                            </p>
                          ) : null}

                          <button
                            type="button"
                            onClick={() => void deleteOfflineQueueItem(item.id).then(refresh)}
                            className="mt-3 rounded-full border border-white/10 px-3 py-1 text-xs text-white/60 hover:bg-white/[0.06]"
                          >
                            Remove local queue item
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                </section>

                <section className="rounded-3xl border border-white/10 bg-white/[0.035] p-4">
                  <p className="text-sm font-semibold text-white">Offline draft cache</p>
                  <p className="mt-1 text-xs leading-5 text-slate-400">
                    Drafts are local convenience cache only. They are not synced records and may become stale.
                  </p>

                  <textarea
                    value={draftBody}
                    onChange={(event) => setDraftBody(event.target.value)}
                    className="mt-4 min-h-28 w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-sm leading-6 text-white outline-none placeholder:text-slate-600 focus:border-cyan-300/60"
                    placeholder="Cache a local draft note. Do not store keys, tokens, passwords, or secrets."
                    maxLength={4000}
                  />

                  <button
                    type="button"
                    onClick={() => void saveDraft()}
                    className="mt-3 rounded-full border border-orange-300/40 bg-orange-300/10 px-4 py-2 text-sm font-semibold text-orange-100 hover:bg-orange-300/20"
                  >
                    Save local draft cache
                  </button>

                  <div className="mt-4 grid gap-3">
                    {drafts.length === 0 ? (
                      <p className="rounded-2xl border border-dashed border-white/10 p-4 text-sm text-slate-500">
                        No offline draft cache items.
                      </p>
                    ) : (
                      drafts.slice(0, 8).map((draft) => (
                        <div
                          key={draft.id}
                          className="rounded-2xl border border-white/10 bg-black/20 p-4"
                        >
                          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                            <div>
                              <p className="text-sm font-semibold text-white">{draft.title}</p>
                              <p className="mt-1 text-xs text-slate-500">
                                {draft.routeContext} · {formatDate(draft.updatedAt)} · stale after {formatDate(draft.staleAfter)}
                              </p>
                            </div>
                            <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${statusClass(draft.status)}`}>
                              {draft.status}
                            </span>
                          </div>
                          <p className="mt-3 rounded-xl border border-white/10 bg-white/[0.03] p-3 text-xs leading-5 text-slate-400">
                            {short(draft.body, 240)}
                          </p>
                          <button
                            type="button"
                            onClick={() => void deleteOfflineDraft(draft.id).then(refresh)}
                            className="mt-3 rounded-full border border-white/10 px-3 py-1 text-xs text-white/60 hover:bg-white/[0.06]"
                          >
                            Remove local draft
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                </section>

                <section className="rounded-3xl border border-amber-300/15 bg-amber-950/15 p-4 text-xs leading-5 text-amber-100/80">
                  Storage boundary: no provider keys, OAuth tokens, passwords, browser secrets,
                  permanent source-of-truth records, hidden memory writes, or private record exports
                  are allowed in IndexedDB. Do not use localStorage for core data.
                </section>
              </div>
            </div>
          </section>
        </div>
      ) : null}
    </>
  );
}

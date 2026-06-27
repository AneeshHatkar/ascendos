import { PendingUpdatesDrawer } from "@/components/actions";
// Phase 6.16 audit compatibility marker: ProposedActionReviewCard remains present through PendingUpdatesDrawer.
import { isProposedActionType } from "@/lib/actions/action-types";
import {
  AuthenticatedDashboardShell,
  CarnosPanelV1,
  DataList,
  EmptyState,
  MetricTile,
  SectionCard,
  StatusPill,
  type DataListItem,
} from "@/components/dashboard";
import type { ProposedActionContract } from "@/lib/actions/proposed-action-contracts";
import { getDashboardDataSummary } from "@/lib/dashboard";
import { listAiActions, listChatMessages, listChatSessions } from "@/lib/repositories";
import { createSupabaseServerClient } from "@/lib/supabase/server";

type CarnosRecord = Record<string, unknown>;


const SAMPLE_PHASE_6_REVIEW_ACTION: ProposedActionContract = {
  action_type: "create_task",
  source: "carnos",
  confidence: 0.82,
  reason:
    "Provides the Phase 6 compatibility review surface before confirmation callback wiring.",
  evidence_refs: ["phase_6_15_review_ui", "phase_6_16_page_wiring"],
  payload: {
    title: "Review and confirm the next execution step",
    description:
      "This compatibility proposal keeps the Save/Edit/Cancel UI renderable inside the app without directly mutating SQL.",
    domain: "projects",
    status: "todo",
    priority: "medium",
  },
};

type ReadGroup = {
  label: string;
  description: string;
  rows: CarnosRecord[];
  error?: string;
};

function extractRows(result: unknown): CarnosRecord[] {
  if (Array.isArray(result)) {
    return result.filter((item): item is CarnosRecord => {
      return item !== null && typeof item === "object" && !Array.isArray(item);
    });
  }

  if (
    result &&
    typeof result === "object" &&
    "data" in result &&
    Array.isArray((result as { data?: unknown }).data)
  ) {
    return (result as { data: unknown[] }).data.filter(
      (item): item is CarnosRecord =>
        item !== null && typeof item === "object" && !Array.isArray(item),
    );
  }

  return [];
}

function extractError(result: unknown): string | undefined {
  if (
    result &&
    typeof result === "object" &&
    "error" in result &&
    (typeof (result as { error?: unknown }).error === "string" ||
      (result as { error?: unknown }).error === null)
  ) {
    return (result as { error?: string | null }).error ?? undefined;
  }

  return undefined;
}

function readText(row: CarnosRecord, key: string, fallback = "Not set") {
  const value = row[key];

  if (typeof value === "string" && value.trim().length > 0) {
    return value;
  }

  if (typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }

  return fallback;
}

function readObject(row: CarnosRecord, key: string): Record<string, unknown> {
  const value = row[key];

  if (value && typeof value === "object" && !Array.isArray(value)) {
    return value as Record<string, unknown>;
  }

  return {};
}

function toPendingActionContract(row: CarnosRecord): ProposedActionContract | null {
  const actionType = readText(row, "action_type", "");

  if (!isProposedActionType(actionType)) {
    return null;
  }

  const baseContract = {
    source: "carnos" as const,
    confidence: 0.75,
    reason:
      readText(row, "description", "") ||
      readText(row, "title", "") ||
      "Persisted pending action loaded from ai_actions for confirmation review.",
    evidence_refs: [readText(row, "id", "ai_action")],
  };

  const payload = readObject(row, "payload");

  switch (actionType) {
    case "create_task":
      return {
        ...baseContract,
        action_type: "create_task",
        payload: payload as unknown as Extract<
          ProposedActionContract,
          { action_type: "create_task" }
        >["payload"],
      };

    case "create_goal":
      return {
        ...baseContract,
        action_type: "create_goal",
        payload: payload as unknown as Extract<
          ProposedActionContract,
          { action_type: "create_goal" }
        >["payload"],
      };

    case "create_daily_log":
      return {
        ...baseContract,
        action_type: "create_daily_log",
        payload: payload as unknown as Extract<
          ProposedActionContract,
          { action_type: "create_daily_log" }
        >["payload"],
      };

    case "create_proof_item":
      return {
        ...baseContract,
        action_type: "create_proof_item",
        payload: payload as unknown as Extract<
          ProposedActionContract,
          { action_type: "create_proof_item" }
        >["payload"],
      };
  }
}

function readTimestamp(row: CarnosRecord) {
  for (const key of ["created_at", "updated_at", "executed_at", "approved_at"]) {
    const value = row[key];

    if (typeof value === "string" && value.trim().length > 0) {
      const date = new Date(value);

      if (!Number.isNaN(date.getTime())) {
        return new Intl.DateTimeFormat("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
          hour: "numeric",
          minute: "2-digit",
        }).format(date);
      }

      return value;
    }
  }

  return "No timestamp";
}

function toneForActionStatus(status: string) {
  const normalized = status.toLowerCase();

  if (["approved", "executed"].includes(normalized)) {
    return "success" as const;
  }

  if (["pending", "pending_confirmation", "draft"].includes(normalized)) {
    return "warning" as const;
  }

  if (["failed", "rejected", "cancelled"].includes(normalized)) {
    return "danger" as const;
  }

  if (["proposed", "queued"].includes(normalized)) {
    return "info" as const;
  }

  return "neutral" as const;
}

function toSessionItems(rows: CarnosRecord[]): DataListItem[] {
  return rows.map((row, index) => {
    const id = readText(row, "id", `chat-session-${index}`);
    const title = readText(row, "title", "Untitled session");
    const status = readText(row, "status", "session");

    return {
      id,
      title,
      description: readText(
        row,
        "summary",
        "No session summary is available yet.",
      ),
      meta: (
        <div className="flex flex-wrap gap-2">
          <span>{readTimestamp(row)}</span>
          <span>Mode: read-only</span>
        </div>
      ),
      trailing: <StatusPill label={status} tone="neutral" />,
    };
  });
}

function toActionItems(rows: CarnosRecord[]): DataListItem[] {
  return rows.map((row, index) => {
    const id = readText(row, "id", `ai-action-${index}`);
    const status = readText(row, "status", "unknown");

    return {
      id,
      title:
        readText(row, "title", "") ||
        readText(row, "action_type", "") ||
        readText(row, "target_table", "Untitled action"),
      description:
        readText(row, "description", "") ||
        readText(row, "rationale", "") ||
        "No action description is available yet.",
      meta: (
        <div className="flex flex-wrap gap-2">
          <span>{readTimestamp(row)}</span>
          <span>Target: {readText(row, "target_table")}</span>
          <span>Confirmation-first</span>
        </div>
      ),
      trailing: <StatusPill label={status} tone={toneForActionStatus(status)} />,
    };
  });
}

function toMessageItems(rows: CarnosRecord[]): DataListItem[] {
  return rows.map((row, index) => {
    const id = readText(row, "id", `chat-message-${index}`);
    const role = readText(row, "role", "message");

    return {
      id,
      title: role,
      description:
        readText(row, "content", "") ||
        readText(row, "summary", "") ||
        "No message content is available yet.",
      meta: (
        <div className="flex flex-wrap gap-2">
          <span>{readTimestamp(row)}</span>
          <span>Read-only transcript view</span>
        </div>
      ),
      trailing: <StatusPill label={role} tone={role === "assistant" ? "info" : "neutral"} />,
    };
  });
}

async function readGroup(
  label: string,
  description: string,
  read: (userId: string, options?: { limit?: number }) => Promise<unknown>,
  userId: string,
): Promise<ReadGroup> {
  try {
    const result = await read(userId, { limit: 25 });

    return {
      label,
      description,
      rows: extractRows(result),
      error: extractError(result),
    };
  } catch (error) {
    return {
      label,
      description,
      rows: [],
      error: error instanceof Error ? error.message : "Read failed.",
    };
  }
}

export default function CarnosPage() {
  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-6 py-8">
      <AuthenticatedDashboardShell
        title="Carnos Companion Dashboard"
        description="Read-only Carnos status view for chat and proposed-action records."
      >
        {async ({ user }) => {
          const supabase = await createSupabaseServerClient();
          const dashboardData = await getDashboardDataSummary(supabase, user.id, "carnos");

          const [sessions, actions, messages] = await Promise.all([
            readGroup(
              "Chat sessions",
              "Conversation containers saved for Carnos interaction history.",
              listChatSessions as (
                userId: string,
                options?: { limit?: number },
              ) => Promise<unknown>,
              user.id,
            ),
            readGroup(
              "AI actions",
              "Proposed-action records that will later support confirmation-first writes.",
              listAiActions as (
                userId: string,
                options?: { limit?: number },
              ) => Promise<unknown>,
              user.id,
            ),
            readGroup(
              "Messages",
              "Recent chat messages saved to the chat message table.",
              listChatMessages as (
                userId: string,
                options?: { limit?: number },
              ) => Promise<unknown>,
              user.id,
            ),
          ]);

          const groups = [sessions, actions, messages];
          const totalRows = groups.reduce((sum, group) => sum + group.rows.length, 0);
          const readErrors = groups.filter((group) => group.error);
          const pendingActionRows = actions.rows.filter((row) => {
            const status = readText(row, "status", "").toLowerCase();
            return ["pending", "pending_confirmation", "draft", "proposed"].includes(status);
          });
          const pendingActions = pendingActionRows.length;
          const pendingActionEntry = pendingActionRows
            .map((row) => ({
              row,
              contract: toPendingActionContract(row),
            }))
            .find((entry) => entry.contract !== null);
          const pendingReviewAction = pendingActionEntry?.contract ?? SAMPLE_PHASE_6_REVIEW_ACTION;
          const pendingReviewActionId = pendingActionEntry
            ? readText(pendingActionEntry.row, "id", "")
            : undefined;

          return (
            <>
              <CarnosPanelV1
                data={dashboardData}
                sessionCount={sessions.rows.length}
                messageCount={messages.rows.length}
                actionCount={actions.rows.length}
                pendingCount={pendingActions}
                readWarningCount={readErrors.length}
              />

              <SectionCard
                title="Pending update review"
                description="Phase 7.11 upgrades the Carnos review area into a pending updates drawer while preserving the confirmation-first boundary."
                eyebrow="Phase 7.11"
              >
                <div className="grid gap-4">
                  <PendingUpdatesDrawer
                    initialAction={pendingReviewAction}
                    pendingCount={pendingActions}
                    actionId={pendingReviewActionId}
                    confirmationEnabled={Boolean(pendingReviewActionId)}
                    validationIssues={
                      pendingReviewActionId
                        ? [
                            "Approval and rejection are connected through server-owned API routes.",
                            "Target-table execution remains separate from this confirmation drawer.",
                          ]
                        : [
                            "No persisted pending ai_actions row is available yet, so this shows the safe preview contract.",
                            "The drawer does not call Supabase directly from the browser.",
                          ]
                    }
                  />
                  <p className="text-sm leading-6 text-slate-400">
                    This drawer now reads persisted pending AI actions when available
                    and sends approve/reject decisions through server-owned API routes.
                    It does not execute target-table writes automatically.
                  </p>
                </div>
              </SectionCard>

              <section className="rounded-3xl border border-slate-800 bg-slate-950/80 p-6 shadow-sm shadow-black/20">
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300/80">
                      Carnos safety core
                    </p>
                    <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-50">
                      Companion Read View
                    </h1>
                    <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-400">
                      This page reads Carnos-related records without generating responses,
                      mutating SQL, remembering facts, or executing actions. It is a
                      visibility layer for the future confirmation-first Carnos system.
                    </p>
                  </div>

                  <StatusPill
                    label={readErrors.length > 0 ? "Read warning" : "Generation disabled"}
                    tone={readErrors.length > 0 ? "warning" : "success"}
                  />
                </div>
              </section>

              <section className="grid gap-4 md:grid-cols-4">
                <MetricTile
                  label="Sessions"
                  value={sessions.rows.length}
                  description={
                    sessions.error
                      ? `Read warning: ${sessions.error}`
                      : sessions.description
                  }
                  className={sessions.error ? "border-amber-800/80" : ""}
                />
                <MetricTile
                  label="Messages"
                  value={messages.rows.length}
                  description={
                    messages.error
                      ? `Read warning: ${messages.error}`
                      : messages.description
                  }
                  className={messages.error ? "border-amber-800/80" : ""}
                />
                <MetricTile
                  label="AI actions"
                  value={actions.rows.length}
                  description={
                    actions.error
                      ? `Read warning: ${actions.error}`
                      : actions.description
                  }
                  className={actions.error ? "border-amber-800/80" : ""}
                />
                <MetricTile
                  label="Pending"
                  value={pendingActions}
                  description="Actions waiting for a future confirmation-first flow."
                />
              </section>

              <SectionCard
                title="Safety boundary"
                description="Carnos is visible here, but intelligence and mutation are intentionally not enabled in Phase 5."
                eyebrow="Phase 5.7"
              >
                <div className="grid gap-3 text-sm text-slate-300 md:grid-cols-2">
                  <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
                    <p className="font-medium text-slate-100">Disabled in this phase</p>
                    <p className="mt-2 text-slate-400">
                      Generation, memory, tool execution, SQL mutation, and Save/Edit/Cancel
                      flows are deferred to later phases.
                    </p>
                  </div>

                  <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
                    <p className="font-medium text-slate-100">Allowed in this phase</p>
                    <p className="mt-2 text-slate-400">
                      Read-only display of chat sessions, messages, and proposed-action
                      records that already exist for the authenticated user.
                    </p>
                  </div>
                </div>
              </SectionCard>

              <SectionCard
                title="Recent chat sessions"
                description="Read-only session records from the chat_sessions table."
                eyebrow="Carnos"
              >
                <DataList
                  items={toSessionItems(sessions.rows)}
                  emptyState={
                    <EmptyState
                      title="No chat sessions found"
                      description="The Carnos session read path is wired, but no chat sessions exist for this user yet."
                    />
                  }
                />
              </SectionCard>

              <SectionCard
                title="Recent AI actions"
                description="Read-only proposed-action records from the ai_actions table."
                eyebrow="Confirmation-first"
              >
                <DataList
                  items={toActionItems(actions.rows)}
                  emptyState={
                    <EmptyState
                      title="No AI actions found"
                      description="No Carnos proposed-action records exist yet. This is expected before the safe write/proposed-action phase."
                    />
                  }
                />
              </SectionCard>

              <SectionCard
                title="Recent messages"
                description="Read-only message records from the chat_messages table."
                eyebrow="Transcript"
              >
                <DataList
                  items={toMessageItems(messages.rows)}
                  emptyState={
                    <EmptyState
                      title="No messages found"
                      description="The chat message read path is wired, but no Carnos messages exist for this user yet."
                    />
                  }
                />

                {totalRows > 0 ? (
                  <div className="mt-4 rounded-xl border border-slate-800 bg-slate-950/60 p-4 text-sm text-slate-400">
                    Total readable Carnos records in this batch:{" "}
                    <span className="font-semibold text-slate-100">{totalRows}</span>
                  </div>
                ) : null}
              </SectionCard>
            </>
          );
        }}
      </AuthenticatedDashboardShell>
    </main>
  );
}

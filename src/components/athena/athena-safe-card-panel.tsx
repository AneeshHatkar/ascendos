"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { ProposedActionReviewCard } from "@/components/actions";
import {
  draftAthenaSafeCardFromText,
  type AthenaSafeCardKind,
} from "@/lib/ai";
import type { ProposedActionContract } from "@/lib/actions/proposed-action-contracts";

type AthenaSafeCardPanelProps = {
  readonly sourceText: string;
  readonly sourceChatSessionId: string | null;
  readonly sourceChatMessageId: string | null;
};

type SaveCardState =
  | { status: "idle"; message: string }
  | {
      status: "drafted";
      message: string;
      action: ProposedActionContract;
      validationIssues: readonly string[];
    }
  | {
      status: "saving";
      message: string;
      action: ProposedActionContract;
      validationIssues: readonly string[];
    }
  | { status: "saved"; message: string; aiActionId: string | null }
  | { status: "error"; message: string; validationIssues: readonly string[] };

const safeCardKinds: Array<{
  readonly kind: AthenaSafeCardKind;
  readonly label: string;
  readonly description: string;
}> = [
  {
    kind: "create_task",
    label: "Task",
    description: "Turn the latest visible message into a pending task.",
  },
  {
    kind: "create_goal",
    label: "Goal",
    description: "Turn the latest visible message into a pending goal.",
  },
  {
    kind: "create_proof_item",
    label: "Proof",
    description: "Turn the latest visible message into pending proof/evidence.",
  },
  {
    kind: "create_daily_log",
    label: "Daily log",
    description: "Turn the latest visible message into a pending daily log.",
  },
];

export function AthenaSafeCardPanel({
  sourceText,
  sourceChatSessionId,
  sourceChatMessageId,
}: AthenaSafeCardPanelProps) {
  const router = useRouter();
  const [state, setState] = useState<SaveCardState>({
    status: "idle",
    message:
      "Draft a save card from the latest visible Athena message. Confirming creates only an ai_actions pending update.",
  });

  function draft(kind: AthenaSafeCardKind) {
    const result = draftAthenaSafeCardFromText(kind, sourceText);

    if (result.status === "error") {
      setState({
        status: "error",
        message: result.message,
        validationIssues: result.validationIssues,
      });
      return;
    }

    setState({
      status: "drafted",
      message:
        "Safe card drafted. Review and edit the payload before confirming. Confirm creates a pending update only.",
      action: result.action,
      validationIssues: result.validationIssues,
    });
  }

  async function confirm(action: ProposedActionContract) {
    setState({
      status: "saving",
      message: "Creating Athena safe card as a pending confirmation update…",
      action,
      validationIssues: [],
    });

    try {
      const response = await fetch("/api/athena/save-cards", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          proposed_action: action,
          source_chat_session_id: sourceChatSessionId ?? undefined,
          source_chat_message_id: sourceChatMessageId ?? undefined,
          source_text: sourceText,
        }),
      });

      const payload = (await response.json().catch(() => null)) as {
        status?: string;
        message?: string;
        issues?: string[];
        data?: {
          ai_action_id?: string;
        };
      } | null;

      if (!response.ok || payload?.status === "error") {
        throw new Error(
          payload?.issues?.length
            ? payload.issues.join("; ")
            : payload?.message ?? "Athena safe card creation failed.",
        );
      }

      setState({
        status: "saved",
        message:
          payload?.message ??
          "Athena safe card created as a pending update. Review it before execution.",
        aiActionId: payload?.data?.ai_action_id ?? null,
      });
      router.refresh();
    } catch (error) {
      setState({
        status: "error",
        message:
          error instanceof Error
            ? error.message
            : "Athena safe card creation failed.",
        validationIssues: [],
      });
    }
  }

  const hasSourceText = sourceText.trim().length > 0;
  const isBusy = state.status === "saving";

  return (
    <section className="rounded-3xl border border-violet-300/20 bg-violet-400/[0.06] p-5">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-violet-200/80">
            Athena safe cards
          </p>
          <h3 className="mt-2 text-xl font-semibold text-white">
            Convert conversation into reviewable updates
          </h3>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-violet-100/75">
            Draft a save card from the latest visible chat message. You can edit,
            confirm, or cancel. Confirming creates only a pending
            <code className="mx-1 rounded bg-black/30 px-1">ai_actions</code>
            record; final writes still require the existing pending-update approval flow.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-xs leading-5 text-violet-100/70">
          No hidden memory · no direct write · no automatic tools
        </div>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {safeCardKinds.map((item) => (
          <button
            key={item.kind}
            type="button"
            disabled={!hasSourceText || isBusy}
            onClick={() => draft(item.kind)}
            className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-left transition hover:bg-white/[0.08] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <span className="text-sm font-semibold text-white">
              Draft {item.label}
            </span>
            <span className="mt-2 block text-xs leading-5 text-violet-100/65">
              {item.description}
            </span>
          </button>
        ))}
      </div>

      {!hasSourceText ? (
        <div className="mt-4 rounded-2xl border border-amber-300/20 bg-amber-950/20 p-4 text-sm text-amber-100/80">
          Send or select a visible Athena message before drafting a safe card.
        </div>
      ) : null}

      <div className="mt-4">
        {state.status === "drafted" || state.status === "saving" ? (
          <ProposedActionReviewCard
            initialAction={state.action}
            validationIssues={[...state.validationIssues]}
            reviewTitle="Athena save card review"
            saveLabel="Confirm as pending update"
            cancelLabel="Cancel safe card"
            editLabel="Edit save card payload"
            disabled={isBusy}
            onSave={confirm}
            onCancel={async () =>
              setState({
                status: "idle",
                message: "Safe card cancelled. No pending update was created.",
              })
            }
          />
        ) : null}

        {state.status === "saved" ? (
          <div className="rounded-2xl border border-emerald-300/20 bg-emerald-950/20 p-4 text-sm leading-6 text-emerald-100">
            {state.message}
            {state.aiActionId ? (
              <span className="mt-2 block text-xs text-emerald-200/70">
                Pending action id: {state.aiActionId}
              </span>
            ) : null}
          </div>
        ) : null}

        {state.status === "error" ? (
          <div className="rounded-2xl border border-rose-300/20 bg-rose-950/20 p-4 text-sm leading-6 text-rose-100">
            {state.message}
            {state.validationIssues.length > 0 ? (
              <ul className="mt-2 list-disc pl-5 text-xs">
                {state.validationIssues.map((issue) => (
                  <li key={issue}>{issue}</li>
                ))}
              </ul>
            ) : null}
          </div>
        ) : null}

        {state.status === "idle" ? (
          <div className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm leading-6 text-violet-100/65">
            {state.message}
          </div>
        ) : null}
      </div>
    </section>
  );
}

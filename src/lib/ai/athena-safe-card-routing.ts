import { validateProposedAction } from "@/lib/actions/validate-proposed-action";
import type {
  ProposedActionContract,
  ProposedActionDomain,
  ProposedProofType,
} from "@/lib/actions/proposed-action-contracts";

export type AthenaSafeCardKind =
  | "create_task"
  | "create_goal"
  | "create_daily_log"
  | "create_proof_item";

export type AthenaSafeCardDraftResult =
  | {
      readonly status: "success";
      readonly action: ProposedActionContract;
      readonly validationIssues: readonly string[];
      readonly sourceText: string;
    }
  | {
      readonly status: "error";
      readonly message: string;
      readonly validationIssues: readonly string[];
      readonly sourceText: string;
    };

const DEFAULT_DOMAIN: ProposedActionDomain = "general";

function normalizeText(value: string) {
  return value.replace(/\s+/g, " ").trim();
}

function titleFromText(text: string, fallback: string) {
  const normalized = normalizeText(text);

  if (!normalized) {
    return fallback;
  }

  const sentence = normalized.split(/[.!?\n]/)[0]?.trim() || normalized;

  if (sentence.length <= 96) {
    return sentence;
  }

  return `${sentence.slice(0, 96)}…`;
}

function todayIsoDate() {
  return new Date().toISOString().slice(0, 10);
}

function inferDomain(text: string): ProposedActionDomain {
  const lower = text.toLowerCase();

  if (lower.includes("job") || lower.includes("resume") || lower.includes("interview") || lower.includes("career")) {
    return "career";
  }

  if (lower.includes("study") || lower.includes("learn") || lower.includes("course")) {
    return "learning";
  }

  if (lower.includes("gym") || lower.includes("workout") || lower.includes("skin") || lower.includes("hair") || lower.includes("sleep")) {
    return "body";
  }

  if (lower.includes("research") || lower.includes("paper") || lower.includes("publication")) {
    return "research";
  }

  if (lower.includes("project") || lower.includes("repo") || lower.includes("ship") || lower.includes("build")) {
    return "projects";
  }

  if (lower.includes("money") || lower.includes("budget") || lower.includes("finance")) {
    return "finance";
  }

  return DEFAULT_DOMAIN;
}

function proofTypeFromText(text: string): ProposedProofType {
  const lower = text.toLowerCase();

  if (lower.includes("http://") || lower.includes("https://")) {
    return "link";
  }

  if (lower.includes("metric") || lower.includes("score") || lower.includes("%")) {
    return "metric";
  }

  if (lower.includes("file") || lower.includes("pdf") || lower.includes("docx")) {
    return "file";
  }

  return "note";
}

function createDraftAction(kind: AthenaSafeCardKind, text: string): ProposedActionContract {
  const sourceText = normalizeText(text);
  const domain = inferDomain(sourceText);

  if (kind === "create_task") {
    return {
      action_type: "create_task",
      source: "carnos",
      confidence: 0.72,
      reason:
        "Athena drafted this task save card from visible conversation text. It requires user confirmation before any write.",
      evidence_refs: ["athena_visible_chat_message"],
      payload: {
        title: titleFromText(sourceText, "Athena task proposal"),
        description: sourceText || undefined,
        status: "todo",
        priority: "medium",
        domain,
      },
    };
  }

  if (kind === "create_goal") {
    return {
      action_type: "create_goal",
      source: "carnos",
      confidence: 0.68,
      reason:
        "Athena drafted this goal save card from visible conversation text. It requires user confirmation before any write.",
      evidence_refs: ["athena_visible_chat_message"],
      payload: {
        title: titleFromText(sourceText, "Athena goal proposal"),
        description: sourceText || undefined,
        domain,
        status: "active",
        priority: "medium",
      },
    };
  }

  if (kind === "create_daily_log") {
    return {
      action_type: "create_daily_log",
      source: "carnos",
      confidence: 0.62,
      reason:
        "Athena drafted this daily log save card from visible conversation text. It requires user confirmation before any write.",
      evidence_refs: ["athena_visible_chat_message"],
      payload: {
        log_date: todayIsoDate(),
        summary: titleFromText(sourceText, "Athena daily log proposal"),
        notes: sourceText || undefined,
      },
    };
  }

  return {
    action_type: "create_proof_item",
    source: "carnos",
    confidence: 0.66,
    reason:
      "Athena drafted this proof save card from visible conversation text. It requires user confirmation before any write.",
    evidence_refs: ["athena_visible_chat_message"],
    payload: {
      title: titleFromText(sourceText, "Athena proof proposal"),
      proof_type: proofTypeFromText(sourceText),
      description: sourceText || undefined,
      source_text: sourceText || undefined,
      occurred_at: todayIsoDate(),
    },
  };
}

export function draftAthenaSafeCardFromText(
  kind: AthenaSafeCardKind,
  text: string,
): AthenaSafeCardDraftResult {
  const sourceText = normalizeText(text);

  if (!sourceText) {
    return {
      status: "error",
      message: "Athena needs visible conversation text before drafting a save card.",
      validationIssues: ["No visible source text was available."],
      sourceText,
    };
  }

  const action = createDraftAction(kind, sourceText);
  const validation = validateProposedAction(action);

  if (validation.status === "error") {
    return {
      status: "error",
      message: validation.message,
      validationIssues: validation.issues ?? [],
      sourceText,
    };
  }

  return {
    status: "success",
    action,
    validationIssues: [],
    sourceText,
  };
}

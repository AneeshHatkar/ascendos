import { NextResponse } from "next/server";

import { createProposedAction } from "@/lib/actions/create-proposed-action";
import type {
  ProposedActionDomain,
  ProposedProofType,
} from "@/lib/actions/proposed-action-contracts";
import { requireCurrentUser } from "@/lib/auth/session";
import { createSupabaseServerClient } from "@/lib/supabase/server";

type ProposalKind = "create_goal" | "create_proof_item";
type BodyRecord = Record<string, unknown>;

const ALLOWED_DOMAINS = new Set<ProposedActionDomain>([
  "career",
  "learning",
  "health",
  "body",
  "research",
  "projects",
  "life_admin",
  "finance",
  "relationships",
  "creativity",
  "general",
]);

const ALLOWED_PROOF_TYPES = new Set<ProposedProofType>([
  "text",
  "link",
  "file",
  "image",
  "code",
  "metric",
  "note",
]);

function isRecord(value: unknown): value is BodyRecord {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function readText(body: BodyRecord, key: string): string | undefined {
  const value = body[key];

  if (typeof value === "string" && value.trim().length > 0) {
    return value.trim();
  }

  return undefined;
}

function readKind(body: BodyRecord): ProposalKind | null {
  const kind = readText(body, "kind");

  if (kind === "create_goal" || kind === "create_proof_item") {
    return kind;
  }

  return null;
}

function readDomain(body: BodyRecord): ProposedActionDomain {
  const domain = readText(body, "domain");

  if (domain && ALLOWED_DOMAINS.has(domain as ProposedActionDomain)) {
    return domain as ProposedActionDomain;
  }

  return "general";
}

function readProofType(body: BodyRecord): ProposedProofType {
  const proofType = readText(body, "proof_type");

  if (proofType && ALLOWED_PROOF_TYPES.has(proofType as ProposedProofType)) {
    return proofType as ProposedProofType;
  }

  return "note";
}

function nullableText(body: BodyRecord, key: string): string | undefined {
  return readText(body, key);
}

export async function POST(request: Request) {
  try {
    const user = await requireCurrentUser();
    const supabase = await createSupabaseServerClient();

    const rawBody = await request.json().catch(() => null);

    if (!isRecord(rawBody)) {
      return NextResponse.json(
        {
          status: "error",
          message: "Request body must be a JSON object.",
        },
        { status: 400 },
      );
    }

    const kind = readKind(rawBody);

    if (!kind) {
      return NextResponse.json(
        {
          status: "error",
          message: "Proposal kind must be create_goal or create_proof_item.",
        },
        { status: 400 },
      );
    }

    const title = readText(rawBody, "title");

    if (!title) {
      return NextResponse.json(
        {
          status: "error",
          message: "Title is required.",
        },
        { status: 400 },
      );
    }

    const proposedAction =
      kind === "create_goal"
        ? {
            action_type: "create_goal" as const,
            source: "manual" as const,
            confidence: 1,
            reason:
              nullableText(rawBody, "reason") ??
              "Manual goal proposal submitted from the Goals dashboard.",
            evidence_refs: ["goals_dashboard_proposal_form"],
            payload: {
              title,
              description: nullableText(rawBody, "description"),
              domain: readDomain(rawBody),
              status: "active" as const,
              priority: "medium" as const,
              target_date: nullableText(rawBody, "target_date"),
            },
          }
        : {
            action_type: "create_proof_item" as const,
            source: "manual" as const,
            confidence: 1,
            reason:
              nullableText(rawBody, "reason") ??
              "Manual proof proposal submitted from the Goals dashboard.",
            evidence_refs: ["goals_dashboard_proof_proposal_form"],
            payload: {
              title,
              description: nullableText(rawBody, "description"),
              proof_type: readProofType(rawBody),
              source_url: nullableText(rawBody, "source_url"),
              source_text: nullableText(rawBody, "source_text"),
              goal_id: nullableText(rawBody, "goal_id"),
              occurred_at: nullableText(rawBody, "occurred_at"),
            },
          };

    const result = await createProposedAction({
      supabase,
      user_id: user.id,
      proposed_action: proposedAction,
      source_context: {
        phase: "12.9E",
        surface: "goals",
        confirmation_first: true,
      },
    });

    if (result.status === "error") {
      return NextResponse.json(result, { status: 400 });
    }

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        message: error instanceof Error ? error.message : "Failed to create proposal.",
      },
      { status: 500 },
    );
  }
}

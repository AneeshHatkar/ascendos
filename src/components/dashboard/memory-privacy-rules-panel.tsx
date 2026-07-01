import {
  EmptyState,
  MetricTile,
  SectionCard,
  StatusPill,
} from "@/components/dashboard";
import {
  DEFAULT_MEMORY_PRIVACY_SETTINGS_PREVIEW,
  PHASE_15F_PRIVACY_RULE_BOUNDARY,
  evaluateMemoryPrivacyRules,
  type MemoryPrivacyCandidatePreview,
  type MemoryPrivacyEvaluationInput,
  type MemoryPrivacyEvaluationResult,
  type MemoryPrivacyRulePreview,
  type MemoryPrivacySettingsPreview,
} from "@/lib/carnos-continuity";

/**
 * Phase 15F — Privacy, Private Mode, Do-Not-Remember Rules.
 *
 * Read-only preview panel for memory privacy controls. It displays how private
 * mode, do-not-remember rules, blocked categories, restricted categories, and
 * redaction would affect memory candidates. It does not approve memory, persist
 * rules, retrieve approved memories, create embeddings, call providers, call
 * Supabase, create a standalone /memory route, inject hidden Carnos context, or
 * convert voice transcripts to memory.
 */

/**
 * Phase 15F exact audit markers:
 * candidate privacy evaluation
 * no approval
 * no persistence
 * no retrieval
 * no embeddings
 * no provider calls
 * no Supabase
 * automatic transcript-to-memory
 */

type Phase15FDoNotRememberRulePreview = NonNullable<
  MemoryPrivacyEvaluationInput["doNotRememberRules"]
>[number];

interface MemoryPrivacyRulesPanelProps {
  candidates?: MemoryPrivacyCandidatePreview[];
  settings?: MemoryPrivacySettingsPreview;
  doNotRememberRules?: Phase15FDoNotRememberRulePreview[];
  privacyRules?: MemoryPrivacyRulePreview[];
  surface?: "privacy" | "carnos" | "memory_inbox_preview";
}

function toneForDecision(
  decision: string,
): "neutral" | "success" | "warning" | "danger" | "info" {
  if (decision === "blocked") return "danger";
  if (decision === "restricted_review" || decision === "ask_every_time") return "warning";
  if (decision === "allowed") return "success";
  return "neutral";
}

function toneForMode(
  mode: string,
): "neutral" | "success" | "warning" | "danger" | "info" {
  if (mode === "private_mode" || mode === "memory_disabled") return "danger";
  if (mode === "ask_every_time") return "warning";
  if (mode === "memory_enabled") return "success";
  return "neutral";
}

function toneForVisibility(
  visibility: string,
): "neutral" | "success" | "warning" | "danger" | "info" {
  if (visibility === "hidden_preview") return "danger";
  if (visibility === "redacted_preview") return "warning";
  if (visibility === "visible_preview") return "info";
  return "neutral";
}

function shortText(value: string, limit = 180): string {
  const trimmed = value.trim();

  if (trimmed.length <= limit) {
    return trimmed;
  }

  return `${trimmed.slice(0, limit - 1)}…`;
}

const SAMPLE_CANDIDATES: MemoryPrivacyCandidatePreview[] = [
  {
    id: "phase-15f-preview-candidate",
    title: "Preview-only private-mode candidate",
    content:
      "Remember that Phase 15F is adding privacy, private mode, and do-not-remember rule previews only.",
    memory_type: "privacy_rule",
    domain_scope: "privacy",
    sensitivity: "restricted",
    status: "candidate",
    private_mode_blocked: false,
    do_not_remember_blocked: false,
  },
  {
    id: "phase-15f-voice-candidate",
    title: "Voice transcript blocked preview",
    content:
      "A voice transcript draft should remain manual review only and should not become memory automatically.",
    memory_type: "voice_transcript_candidate",
    domain_scope: "voice",
    sensitivity: "medium",
    status: "candidate",
    private_mode_blocked: false,
    do_not_remember_blocked: false,
  },
];

const SAMPLE_DO_NOT_REMEMBER_RULES: Phase15FDoNotRememberRulePreview[] = [
  {
    id: "phase-15f-do-not-remember-preview",
    title: "Do not remember voice transcripts",
    pattern: "voice transcript",
    memory_type: "voice_transcript_candidate",
    domain_scope: "voice",
    active: true,
    reason: "Preview-only rule: voice transcripts are not automatically remembered.",
  },
];

const SAMPLE_PRIVACY_RULES: MemoryPrivacyRulePreview[] = [
  {
    id: "phase-15f-sensitive-redaction-preview",
    label: "Sensitive category redaction preview",
    category: "sensitive",
    enabled: true,
    decision: "restricted_review",
    reason: "Preview-only rule: sensitive candidates require review.",
    redaction_preview: "[redacted preview]",
  },
  {
    id: "phase-15f-health-review-preview",
    label: "Health/body explicit review preview",
    category: "health_body",
    enabled: true,
    decision: "restricted_review",
    reason: "Preview-only rule: health/body candidates require explicit review.",
    redaction_preview: "[health/body preview redacted]",
  },
];

function CandidatePrivacyPreview({
  candidate,
  result,
}: {
  candidate: MemoryPrivacyCandidatePreview;
  result: MemoryPrivacyEvaluationResult;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div className="min-w-0">
          <p className="text-sm font-semibold text-white">
            {candidate.title || "Untitled candidate"}
          </p>
          <p className="mt-1 text-xs leading-5 text-slate-500">
            Type: {candidate.memory_type ?? "unknown"} · Domain:{" "}
            {candidate.domain_scope ?? "unknown"} · Sensitivity:{" "}
            {candidate.sensitivity ?? "unknown"}
          </p>
        </div>

        <div className="flex flex-wrap gap-2 md:justify-end">
          <StatusPill
            label={result.safe_status}
            tone={toneForDecision(result.safe_status)}
          />
          <StatusPill
            label={result.visibility}
            tone={toneForVisibility(result.visibility)}
          />
        </div>
      </div>

      <p className="mt-4 rounded-xl border border-white/10 bg-white/[0.03] p-3 text-xs leading-5 text-slate-400">
        {result.visibility === "redacted_preview" ||
        result.visibility === "hidden_preview"
          ? result.redacted_content_preview
          : shortText(candidate.content)}
      </p>

      <div className="mt-4 grid gap-3 md:grid-cols-4">
        <MetricTile
          label="Blocked"
          value={result.blocked ? "yes" : "no"}
          description="Candidate preview only."
        />
        <MetricTile
          label="Review"
          value={result.requires_review ? "required" : "not required"}
          description="No approval is wired."
        />
        <MetricTile
          label="Private mode"
          value={result.private_mode_blocks_memory ? "blocked" : "clear"}
          description="No memory save."
        />
        <MetricTile
          label="DNR rule"
          value={result.do_not_remember_blocks_memory ? "blocked" : "clear"}
          description="No rule mutation."
        />
      </div>

      <div className="mt-4">
        {result.block_reasons.length === 0 ? (
          <EmptyState
            title="No privacy blocks for this preview."
            description="The candidate would still require explicit review before any future approval flow."
          />
        ) : (
          <div className="grid gap-2">
            {result.block_reasons.map((reason, index) => (
              <p
                key={`${reason.code}-${reason.rule_id ?? index}`}
                className="rounded-xl border border-white/10 bg-white/[0.03] p-3 text-xs leading-5 text-slate-400"
              >
                <span className="font-semibold text-slate-200">
                  {reason.code}
                </span>
                {" · "}
                {reason.message}
              </p>
            ))}
          </div>
        )}
      </div>

      <p className="mt-4 text-xs leading-5 text-slate-500">
        Audit event preview: {result.audit_event_preview.event_type} · candidate{" "}
        {result.audit_event_preview.candidate_id}. This is a preview, not a
        persisted memory audit event.
      </p>
    </div>
  );
}

export function MemoryPrivacyRulesPanel({
  candidates = SAMPLE_CANDIDATES,
  settings = DEFAULT_MEMORY_PRIVACY_SETTINGS_PREVIEW,
  doNotRememberRules = SAMPLE_DO_NOT_REMEMBER_RULES,
  privacyRules = SAMPLE_PRIVACY_RULES,
  surface = "privacy",
}: MemoryPrivacyRulesPanelProps) {
  const candidateList = candidates ?? [];

  const evaluations = candidateList.map((candidate) =>
    evaluateMemoryPrivacyRules({
      candidate,
      settings,
      doNotRememberRules,
      privacyRules,
    }),
  );

  const blockedCount = evaluations.filter((result) => result.blocked).length;
  const reviewCount = evaluations.filter((result) => result.requires_review).length;
  const redactedCount = evaluations.filter(
    (result) =>
      result.visibility === "redacted_preview" ||
      result.visibility === "hidden_preview",
  ).length;

  return (
    <div className="grid gap-6">
      <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-sm shadow-black/20">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-200/80">
          Phase 15F Privacy / Private Mode / Do-Not-Remember Rules
        </p>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white">
          Memory Privacy Control Preview
        </h2>
        <p className="mt-3 max-w-4xl text-sm leading-6 text-slate-400">
          This panel previews how memory privacy settings would block, redact,
          or require review for candidate memories. It is read-only and does not
          approve memory, save privacy rules, persist do-not-remember rules,
          retrieve approved memories, create embeddings, call providers, call
          Supabase, create a standalone /memory route, inject hidden Carnos
          prompts, or convert voice transcripts to memory.
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-3 xl:grid-cols-6">
          <MetricTile
            label="Mode"
            value={settings.mode}
            description="Preview privacy mode."
          />
          <MetricTile
            label="Candidates"
            value={candidateList.length}
            description="Preview rows only."
          />
          <MetricTile
            label="Blocked"
            value={blockedCount}
            description="Private/rule/category blocks."
          />
          <MetricTile
            label="Review"
            value={reviewCount}
            description="Explicit review required."
          />
          <MetricTile
            label="Redacted"
            value={redactedCount}
            description="Preview redactions."
          />
          <MetricTile
            label="DNR rules"
            value={doNotRememberRules.length}
            description="Preview-only rules."
          />
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <StatusPill label={settings.mode} tone={toneForMode(settings.mode)} />
          <StatusPill
            label={settings.auto_candidate_mode}
            tone={toneForMode(settings.auto_candidate_mode)}
          />
          <StatusPill
            label={
              settings.private_mode_active ? "private mode active" : "private mode off"
            }
            tone={settings.private_mode_active ? "danger" : "success"}
          />
          <StatusPill
            label={
              settings.ask_before_remembering
                ? "ask every time"
                : "auto review preview"
            }
            tone="warning"
          />
        </div>
      </section>

      <SectionCard
        title="Privacy settings preview"
        eyebrow={`surface: ${surface}`}
        description="These controls are contract-only in Phase 15F. Real toggles, writes, and persisted settings mutation remain deferred."
      >
        <div className="grid gap-3 text-sm leading-6 text-slate-400">
          <p>• Memory mode: {settings.mode}</p>
          <p>• Auto-candidate mode: {settings.auto_candidate_mode}</p>
          <p>
            • Blocked categories:{" "}
            {settings.blocked_categories.join(", ") || "none"}
          </p>
          <p>
            • Restricted categories:{" "}
            {settings.restricted_categories.join(", ") || "none"}
          </p>
          <p>• Retention policy: {settings.retention_policy}</p>
          <p>• Redaction enabled: {settings.redaction_enabled ? "yes" : "no"}</p>
        </div>
      </SectionCard>

      <SectionCard
        title="Do-not-remember rule preview"
        eyebrow="memory_do_not_remember_rules"
        description="Rules shown here are previews only. Phase 15F does not create, update, delete, or persist rules."
      >
        <div className="grid gap-3">
          {doNotRememberRules.map((rule) => (
            <div
              key={rule.id}
              className="rounded-2xl border border-white/10 bg-black/20 p-4"
            >
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div>
                  <p className="text-sm font-semibold text-white">
                    {rule.title}
                  </p>
                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Pattern: {rule.pattern} · Type: {rule.memory_type ?? "any"} ·
                    Domain: {rule.domain_scope ?? "any"}
                  </p>
                  <p className="mt-3 text-xs leading-5 text-slate-400">
                    {rule.reason}
                  </p>
                </div>
                <StatusPill
                  label={rule.active ? "active preview" : "inactive"}
                  tone={rule.active ? "warning" : "neutral"}
                />
              </div>
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard
        title="Blocked categories"
        eyebrow="private mode"
        description="Blocked categories prevent memory candidate use in this preview."
      >
        <div className="grid gap-2 text-sm leading-6 text-slate-400">
          {(settings.blocked_categories.length > 0
            ? settings.blocked_categories
            : ["none"]
          ).map((category) => (
            <p key={category}>• {category}</p>
          ))}
        </div>
      </SectionCard>

      <SectionCard
        title="Restricted categories"
        eyebrow="redaction"
        description="Restricted categories require explicit review and can trigger redaction preview behavior."
      >
        <div className="grid gap-2 text-sm leading-6 text-slate-400">
          {(settings.restricted_categories.length > 0
            ? settings.restricted_categories
            : ["none"]
          ).map((category) => (
            <p key={category}>• {category}</p>
          ))}
        </div>
      </SectionCard>

      <SectionCard
        title="Candidate privacy evaluation"
        eyebrow="candidate privacy preview"
        description="Each candidate is evaluated against private mode, do-not-remember rules, blocked categories, restricted categories, sensitivity, and redaction."
      >
        <div className="grid gap-4">
          {candidateList.map((candidate, index) => (
            <CandidatePrivacyPreview
              key={candidate.id}
              candidate={candidate}
              result={evaluations[index]}
            />
          ))}
        </div>
      </SectionCard>

      <SectionCard
        title="Protected boundaries"
        eyebrow="Phase 15F boundary"
        description="This chunk introduces privacy rule contracts and preview UI only."
      >
        <div className="grid gap-2 text-sm leading-6 text-slate-400">
          {PHASE_15F_PRIVACY_RULE_BOUNDARY.boundary_rules.map((item) => (
            <p key={item}>• {item}</p>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}

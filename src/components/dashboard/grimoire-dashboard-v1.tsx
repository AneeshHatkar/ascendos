import { ProposedActionReviewCard } from "@/components/actions";
import {
  DataList,
  EmptyState,
  MetricTile,
  SectionCard,
  StatusPill,
} from "@/components/dashboard";
import { getGrimoireDashboardDataSummary } from "@/lib/dashboard";
import type { ProposedActionContract } from "@/lib/actions/proposed-action-contracts";
import { GrimoireCrossDashboardLinks } from "./cross-dashboard-links";
import type {
  GrimoireCorruptionCheckRow,
  GrimoireDailyLogRow,
  GrimoireModeRow,
  GrimoireReversionRow,
  GrimoireSkillRow,
} from "@/types/database";

interface GrimoireDashboardV1Props {
  userId: string;
}

type StatusTone = "neutral" | "success" | "warning" | "danger" | "info";

function formatGeneratedAt(value: string): string {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Unknown";
  }

  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function formatDate(value: string | null): string {
  if (!value) {
    return "Not set";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function toneForText(value: string | null | undefined): StatusTone {
  const normalized = String(value ?? "").toLowerCase();

  if (
    ["active", "proved", "completed", "low", "private"].includes(normalized)
  ) {
    return "success";
  }

  if (
    [
      "medium",
      "planned",
      "pending",
      "draft",
      "review",
      "reversion_required",
    ].includes(normalized)
  ) {
    return "warning";
  }

  if (
    ["high", "open", "blocked", "danger", "overdrive", "unresolved"].includes(
      normalized,
    )
  ) {
    return "danger";
  }

  if (["info", "normal", "research_only"].includes(normalized)) {
    return "info";
  }

  return "neutral";
}

function modeDescription(mode: GrimoireModeRow): string {
  return (
    mode.description ??
    mode.allowed_use ??
    "No mode description recorded yet."
  );
}

function dailyLogDescription(log: GrimoireDailyLogRow): string {
  return (
    log.mission_statement ??
    log.notes ??
    "No mission statement or note recorded yet."
  );
}

function skillDescription(skill: GrimoireSkillRow): string {
  return (
    skill.description ??
    skill.proof_required ??
    "No skill description or proof requirement recorded yet."
  );
}

function corruptionDescription(row: GrimoireCorruptionCheckRow): string {
  return (
    row.evidence ??
    row.correction ??
    "No corruption evidence or correction recorded yet."
  );
}

function reversionDescription(row: GrimoireReversionRow): string {
  return row.notes ?? row.reversion_action;
}

function GrimoireReadOnlyBoundaryNotice() {
  return (
    <div className="rounded-3xl border border-cyan-400/20 bg-cyan-400/10 p-5 text-sm text-cyan-100">
      <p className="font-semibold">Read-only Grimoire boundary</p>
      <p className="mt-2 leading-6 text-cyan-100/80">
        This dashboard reads confirmed Grimoire records only. It does not
        activate modes, save missions, log reversions, execute proposals, call
        Carnos, or persist symbolic content.
      </p>
    </div>
  );
}

function GrimoireWarningPanel({ warnings }: { warnings: string[] }) {
  if (warnings.length === 0) {
    return null;
  }

  return (
    <div className="rounded-3xl border border-amber-400/20 bg-amber-400/10 p-5 text-sm text-amber-100">
      <p className="font-semibold">Some Grimoire reads returned warnings.</p>
      <ul className="mt-3 list-disc space-y-2 pl-5">
        {warnings.map((warning) => (
          <li key={warning}>{warning}</li>
        ))}
      </ul>
    </div>
  );
}

function GrimoireStateBoundaryPanel({ warnings }: { warnings: string[] }) {
  return (
    <SectionCard
      title="Grimoire state and privacy boundary"
      eyebrow="13F empty · loading · error · privacy"
      description="Consistent read-state language for symbolic mode, mission, proof, corruption, and reversion surfaces."
    >
      <div className="grid gap-4 text-sm leading-6 text-slate-400 md:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
          <p className="font-semibold text-slate-100">Empty state</p>
          <p className="mt-2">
            Empty panels mean no matching records exist yet. Symbolic identity
            does not count as progress until mapped to action, proof, corruption
            checks, and reversion.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
          <p className="font-semibold text-slate-100">Loading state</p>
          <p className="mt-2">
            This route is server-rendered after authenticated reads complete.
            No background mode activation, reflection loop, timer, proposal, or
            automation starts from this surface.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
          <p className="font-semibold text-slate-100">Error state</p>
          <p className="mt-2">
            Read errors appear as warnings only. Errors must not trigger
            automatic writes, retries, Carnos execution, symbolic expansion, or
            proposed actions.
          </p>
          {warnings.length > 0 ? (
            <ul className="mt-3 list-disc space-y-1 pl-5 text-xs text-rose-200">
              {warnings.slice(0, 5).map((warning) => (
                <li key={warning}>{warning}</li>
              ))}
            </ul>
          ) : null}
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
          <p className="font-semibold text-slate-100">Privacy boundary</p>
          <p className="mt-2">
            Grimoire records are private to the authenticated user. This UI does
            not expose, export, send, mutate, or convert private symbolic records
            into actions.
          </p>
        </div>
      </div>
    </SectionCard>
  );
}

function GrimoireRulePanel({
  title,
  eyebrow,
  description,
  items,
}: {
  title: string;
  eyebrow: string;
  description: string;
  items: string[];
}) {
  return (
    <SectionCard title={title} eyebrow={eyebrow} description={description}>
      <ul className="grid gap-3 text-sm leading-6 text-slate-300 md:grid-cols-2">
        {items.map((item) => (
          <li
            key={item}
            className="rounded-2xl border border-white/10 bg-black/20 p-4"
          >
            {item}
          </li>
        ))}
      </ul>
    </SectionCard>
  );
}


function GrimoireCarnosGuideBoundaryPanel() {
  const guideRules = [
    "Name the symbolic state before acting.",
    "Separate facts from story.",
    "Choose one mode support, not all modes at once.",
    "Translate symbolic language into task, proof, correction, or reversion.",
    "Ask for confirmation before saving anything.",
  ];

  const forbiddenPatterns = [
    "No symbolic inflation.",
    "No permanent overdrive.",
    "No replacing proof with identity claims.",
    "No health, money, housing, or safety decisions based on mythic language.",
    "No automatic mode activation.",
  ];

  return (
    <SectionCard
      title="Carnos Grimoire guide boundary"
      eyebrow="13K guide hardening"
      description="Read-only guide contract for how Carnos should translate symbolic modes into practical action later."
    >
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-cyan-300/20 bg-cyan-300/[0.04] p-4">
          <p className="text-sm font-semibold text-cyan-100">
            Allowed guide structure
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-slate-300">
            {guideRules.map((rule) => (
              <li key={rule}>{rule}</li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-rose-300/20 bg-rose-300/[0.04] p-4">
          <p className="text-sm font-semibold text-rose-100">
            Forbidden guide behavior
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-slate-300">
            {forbiddenPatterns.map((rule) => (
              <li key={rule}>{rule}</li>
            ))}
          </ul>
        </div>
      </div>
    </SectionCard>
  );
}

function GrimoireThroneOverrideBoundaryPanel() {
  const overrideRules = [
    "Truth overrides mode intensity.",
    "Safety overrides symbolic mission pressure.",
    "Reality evidence overrides narrative identity.",
    "Long-term direction overrides short-term overdrive.",
    "The throne layer may pause modes but must not create fantasy authority.",
  ];

  return (
    <SectionCard
      title="Throne override boundary"
      eyebrow="13K throne hardening"
      description="Final read-only boundary for truth, safety, reality, long-term direction, and identity stability."
    >
      <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
        <ul className="grid gap-3 text-sm leading-6 text-slate-300 md:grid-cols-2">
          {overrideRules.map((rule) => (
            <li
              key={rule}
              className="rounded-2xl border border-white/10 bg-slate-950/70 p-4"
            >
              {rule}
            </li>
          ))}
        </ul>
      </div>
    </SectionCard>
  );
}

function GrimoireFinalAuditBoundaryPanel({
  summary,
  warnings,
}: {
  summary: {
    mode_count: number;
    active_mode_count: number;
    active_mission_log_count: number;
    proof_mapped_log_count: number;
    open_corruption_check_count: number;
    high_severity_corruption_count: number;
    pending_reversion_count: number;
    pending_reversion_log_count: number;
    throne_attention_count: number;
    read_only_boundary: true;
  };
  warnings: string[];
}) {
  const auditRows = [
    {
      label: "Read-only boundary",
      value: summary.read_only_boundary ? "locked" : "missing",
      tone: summary.read_only_boundary ? "success" : "danger",
    },
    {
      label: "Active modes",
      value: String(summary.active_mode_count),
      tone: summary.active_mode_count > 1 ? "warning" : "success",
    },
    {
      label: "Mission mapping",
      value: String(summary.active_mission_log_count),
      tone: summary.active_mission_log_count > 0 ? "success" : "neutral",
    },
    {
      label: "Proof mapping",
      value: String(summary.proof_mapped_log_count),
      tone: summary.proof_mapped_log_count > 0 ? "success" : "warning",
    },
    {
      label: "Open corruption",
      value: String(summary.open_corruption_check_count),
      tone: summary.open_corruption_check_count > 0 ? "warning" : "success",
    },
    {
      label: "High severity",
      value: String(summary.high_severity_corruption_count),
      tone: summary.high_severity_corruption_count > 0 ? "danger" : "success",
    },
    {
      label: "Pending reversion",
      value: String(summary.pending_reversion_count + summary.pending_reversion_log_count),
      tone:
        summary.pending_reversion_count + summary.pending_reversion_log_count > 0
          ? "warning"
          : "success",
    },
    {
      label: "Read warnings",
      value: String(warnings.length),
      tone: warnings.length > 0 ? "warning" : "success",
    },
  ] as const;

  return (
    <SectionCard
      title="Final Grimoire safety audit"
      eyebrow="13K audit hardening"
      description="Read-only safety summary before Phase 13 closeout. This panel only reports state; it does not repair, save, activate, or execute."
    >
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {auditRows.map((row) => (
          <div
            key={row.label}
            className="rounded-2xl border border-white/10 bg-black/20 p-4"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
              {row.label}
            </p>
            <div className="mt-3 flex items-center justify-between gap-3">
              <p className="text-lg font-semibold text-white">{row.value}</p>
              <StatusPill label={row.tone} tone={row.tone} />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 rounded-2xl border border-white/10 bg-slate-950/70 p-4 text-sm leading-6 text-slate-300">
        <p className="font-semibold text-slate-100">Closeout boundary</p>
        <p className="mt-2">
          Phase 13 remains a read-only Grimoire-to-Action surface. All preview
          cards are disabled. Carnos generation, proposed-action persistence,
          action execution, timer behavior, and direct database writes remain
          outside this phase.
        </p>
      </div>
    </SectionCard>
  );
}


function ModeSelectorCard({ modes }: { modes: GrimoireModeRow[] }) {
  return (
    <SectionCard
      title="Mode selector"
      eyebrow="13F required card"
      description="Read-only view of available modes. Activation remains deferred to later confirmation flows."
    >
      <DataList
        items={modes.slice(0, 6).map((mode) => ({
          id: mode.id,
          title: mode.name,
          description: modeDescription(mode),
          meta: (
            <div className="flex flex-wrap gap-2">
              <StatusPill label={mode.mission_type} tone="info" />
              <StatusPill
                label={mode.intensity_level}
                tone={toneForText(mode.intensity_level)}
              />
              {mode.is_active ? (
                <StatusPill label="active" tone="success" />
              ) : (
                <StatusPill label="inactive" />
              )}
              {mode.reversion_required ? (
                <StatusPill label="reversion required" tone="warning" />
              ) : null}
            </div>
          ),
        }))}
        emptyState={
          <EmptyState
            title="No Grimoire modes yet"
            description="Create modes only after defining their mission type, allowed use, proof requirement, corruption risk, and reversion rule."
          />
        }
      />
    </SectionCard>
  );
}

function MissionMappingCard({ logs }: { logs: GrimoireDailyLogRow[] }) {
  return (
    <SectionCard
      title="Mission mapping"
      eyebrow="13F required card"
      description="Read-only view of mode-to-mission logs and proof/action mapping."
    >
      <DataList
        items={logs.slice(0, 6).map((log) => ({
          id: log.id,
          title: log.active_mode ?? log.mission_type ?? "Untitled mission log",
          description: dailyLogDescription(log),
          meta: (
            <div className="flex flex-wrap gap-2">
              <StatusPill label={formatDate(log.log_date)} />
              {log.mission_type ? (
                <StatusPill label={log.mission_type} tone="info" />
              ) : null}
              {log.related_proof_item_id ? (
                <StatusPill label="proof linked" tone="success" />
              ) : null}
              {log.reversion_required ? (
                <StatusPill label="reversion required" tone="warning" />
              ) : null}
            </div>
          ),
        }))}
        emptyState={
          <EmptyState
            title="No mission mapping yet"
            description="A mode should not be treated as active until it is mapped to one practical mission and one proof-producing action."
          />
        }
      />
    </SectionCard>
  );
}

function todayIsoDate(): string {
  return new Date().toISOString().slice(0, 10);
}

function firstUsefulText(...values: Array<string | null | undefined>): string {
  return values.find((value) => typeof value === "string" && value.trim().length > 0)?.trim() ?? "";
}

function buildGrimoireTranslatorPreviews({
  logs,
  skills,
}: {
  logs: GrimoireDailyLogRow[];
  skills: GrimoireSkillRow[];
}): ProposedActionContract[] {
  const primaryLog = logs[0] ?? null;
  const primarySkill = skills[0] ?? null;

  const modeName = firstUsefulText(
    primaryLog?.active_mode,
    primaryLog?.mission_type,
    primarySkill?.realm,
    "Grimoire mode",
  );

  const missionText = firstUsefulText(
    primaryLog?.mission_statement,
    primaryLog?.notes,
    primarySkill?.description,
    "Translate symbolic mode into one grounded proof action.",
  );

  const skillName = firstUsefulText(primarySkill?.name, "Grimoire proof skill");

  return [
    {
      action_type: "create_task",
      source: "carnos",
      confidence: 0.72,
      reason:
        "Symbol-to-action translator preview: convert the selected Grimoire mode into one practical mission task. This card is disabled and does not persist anything.",
      payload: {
        title: `Ground ${modeName} into one proof action`,
        description: `${missionText} Choose one visible action that can be completed and later reviewed as proof.`,
        domain: "creativity",
        priority: primaryLog?.reversion_required ? "high" : "medium",
        status: "todo",
      },
      evidence_refs: [
        "grimoire_modes",
        "grimoire_daily_logs",
        "grimoire_skills",
      ],
    },
    {
      action_type: "create_daily_log",
      source: "carnos",
      confidence: 0.68,
      reason:
        "Symbol-to-action translator preview: record the practical mission, proof expectation, corruption risk, and reversion requirement before treating a mode as active.",
      payload: {
        log_date: firstUsefulText(primaryLog?.log_date, todayIsoDate()),
        summary: `Grimoire mission mapping for ${modeName}`,
        notes:
          "Facts first, story second: name the active mode, define the practical mission, record the proof action, check corruption risk, and mark whether reversion is required.",
      },
      evidence_refs: [
        "grimoire_daily_logs",
        "grimoire_corruption_checks",
        "grimoire_reversions",
      ],
    },
    {
      action_type: "create_proof_item",
      source: "carnos",
      confidence: 0.7,
      reason:
        "Symbol-to-action translator preview: capture proof only after the symbolic mission produces concrete evidence. This is visibility-only until confirmation wiring exists.",
      payload: {
        title: `Proof for ${skillName}`,
        proof_type: "note",
        description:
          "Capture the observable evidence created by the Grimoire mission. Do not replace proof with identity claims, fantasy language, or permanent overdrive.",
        occurred_at: firstUsefulText(primaryLog?.log_date, todayIsoDate()),
      },
      evidence_refs: [
        "grimoire_skills",
        "grimoire_daily_logs",
        "proof_items",
      ],
    },
  ];
}

function SymbolToActionTranslatorCard({
  logs,
  skills,
}: {
  logs: GrimoireDailyLogRow[];
  skills: GrimoireSkillRow[];
}) {
  const translatedActionPreviews = buildGrimoireTranslatorPreviews({
    logs,
    skills,
  });

  return (
    <SectionCard
      title="Symbol-to-action translator"
      eyebrow="13H translator preview"
      description="Deterministic read-only translation preview: mode and mission context become disabled proposed-action cards for task, daily log, and proof capture. Nothing is saved or executed here."
    >
      <div className="grid gap-4 lg:grid-cols-2">
        <DataList
          items={logs.slice(0, 4).map((log) => ({
            id: log.id,
            title: log.active_mode ?? log.mission_type ?? "Mapped action",
            description: dailyLogDescription(log),
            meta: <StatusPill label="action/proof mapping" tone="success" />,
          }))}
          emptyState={
            <EmptyState
              title="No proof-mapped logs"
              description="Symbolic content must become a real task, proof item, daily log, or mission action before it appears here."
            />
          }
        />

        <DataList
          items={skills.slice(0, 4).map((skill) => ({
            id: skill.id,
            title: skill.name,
            description: skillDescription(skill),
            meta: (
              <div className="flex flex-wrap gap-2">
                <StatusPill label={skill.realm} tone="info" />
                <StatusPill label={skill.status} tone={toneForText(skill.status)} />
              </div>
            ),
          }))}
          emptyState={
            <EmptyState
              title="No Grimoire skills yet"
              description="Skills should be grounded in tier, realm, description, status, and proof requirement."
            />
          }
        />
      </div>

      <div className="mt-5 rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-4 text-sm leading-6 text-cyan-100">
        <p className="font-semibold">Translator boundary</p>
        <p className="mt-2 text-cyan-100/80">
          These cards show how Carnos may translate symbolic mode language into a practical task,
          daily log, or proof item. They are disabled previews only. This card does not call AI,
          create proposed actions, execute actions, or write Grimoire records.
        </p>
      </div>

      <div className="mt-5 grid gap-4 xl:grid-cols-3">
        {translatedActionPreviews.map((action) => (
          <ProposedActionReviewCard
            key={action.action_type}
            initialAction={action}
            disabled
            saveLabel="Save / Confirm unavailable in Phase 13H translator preview"
            cancelLabel="Cancel unavailable in Phase 13H translator preview"
            editLabel="Edit payload unavailable in Phase 13H translator preview"
            reviewTitle="Grimoire translator preview"
            validationIssues={[
              "Preview only: this dashboard does not persist proposed actions.",
              "Symbolic language must remain separate from writes until explicit user confirmation exists.",
              "No AI generation, Supabase write, background job, or action execution is wired here.",
            ]}
          />
        ))}
      </div>
    </SectionCard>
  );
}

function buildCorruptionCorrectionPreviews({
  openChecks,
  highSeverityChecks,
}: {
  openChecks: GrimoireCorruptionCheckRow[];
  highSeverityChecks: GrimoireCorruptionCheckRow[];
}): ProposedActionContract[] {
  const primaryRisk = highSeverityChecks[0] ?? openChecks[0] ?? null;
  const riskType = primaryRisk?.risk_type ?? "grimoire_corruption_risk";
  const correctionText =
    primaryRisk?.correction ??
    "Name the corruption risk, separate facts from identity story, choose one corrective action, and require proof before continuing the mode.";

  return [
    {
      action_type: "create_task",
      source: "carnos",
      confidence: highSeverityChecks.length > 0 ? 0.76 : 0.67,
      reason:
        "Corruption detector preview: convert an open Grimoire risk into one corrective task. This card is disabled and does not persist anything.",
      payload: {
        title: `Correct Grimoire risk: ${riskType}`,
        description: correctionText,
        domain: "creativity",
        priority: highSeverityChecks.length > 0 ? "high" : "medium",
        status: "todo",
      },
      evidence_refs: [
        "grimoire_corruption_checks",
        "grimoire_daily_logs",
        "grimoire_reversions",
      ],
    },
    {
      action_type: "create_daily_log",
      source: "carnos",
      confidence: 0.66,
      reason:
        "Corruption detector preview: record the risk, evidence, correction, and mode grounding before continuing symbolic execution.",
      payload: {
        log_date: firstUsefulText(primaryRisk?.log_date, todayIsoDate()),
        summary: `Grimoire corruption check: ${riskType}`,
        notes:
          "Separate facts from story. Record the corruption risk, evidence, correction, reversion need, and proof requirement before continuing the mode.",
      },
      evidence_refs: [
        "grimoire_corruption_checks",
        "grimoire_daily_logs",
      ],
    },
  ];
}

function CorruptionDetectorCard({
  checks,
  openChecks,
  highSeverityChecks,
}: {
  checks: GrimoireCorruptionCheckRow[];
  openChecks: GrimoireCorruptionCheckRow[];
  highSeverityChecks: GrimoireCorruptionCheckRow[];
}) {
  const correctionPreviews = buildCorruptionCorrectionPreviews({
    openChecks,
    highSeverityChecks,
  });

  return (
    <SectionCard
      title="Corruption detector"
      eyebrow="13I expanded detector"
      description="Read-only corruption risk visibility for fantasy loops, avoidance, overdrive, identity inflation, and proof replacement. Corrections are shown as disabled previews only."
    >
      <div className="grid gap-4 md:grid-cols-3">
        <MetricTile
          label="Total checks"
          value={checks.length}
          description="All visible Grimoire corruption checks in the current read window."
        />
        <MetricTile
          label="Open risks"
          value={openChecks.length}
          description="Checks still marked open and needing user review."
        />
        <MetricTile
          label="High severity"
          value={highSeverityChecks.length}
          description="High-severity risks that should trigger grounding and reversion review."
        />
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        <DataList
          items={openChecks.slice(0, 5).map((check) => ({
            id: check.id,
            title: check.risk_type,
            description: corruptionDescription(check),
            meta: (
              <div className="flex flex-wrap gap-2">
                <StatusPill label={formatDate(check.log_date)} />
                <StatusPill
                  label={check.severity}
                  tone={toneForText(check.severity)}
                />
                <StatusPill label={check.status} tone={toneForText(check.status)} />
              </div>
            ),
          }))}
          emptyState={
            <EmptyState
              title="No open corruption risks"
              description="Open risks will appear here when a mode shows fantasy-loop, avoidance, overdrive, identity-inflation, or proof-replacement pressure."
            />
          }
        />

        <DataList
          items={highSeverityChecks.slice(0, 5).map((check) => ({
            id: check.id,
            title: check.risk_type,
            description: corruptionDescription(check),
            meta: (
              <div className="flex flex-wrap gap-2">
                <StatusPill label={formatDate(check.log_date)} />
                <StatusPill label="high severity" tone="danger" />
                <StatusPill label={check.status} tone={toneForText(check.status)} />
              </div>
            ),
          }))}
          emptyState={
            <EmptyState
              title="No high-severity corruption checks"
              description="High-severity checks should appear only when symbolic mode use threatens reality, safety, proof, or reversion boundaries."
            />
          }
        />
      </div>

      <div className="mt-5 rounded-2xl border border-amber-400/20 bg-amber-400/10 p-4 text-sm leading-6 text-amber-100">
        <p className="font-semibold">Corruption correction boundary</p>
        <p className="mt-2 text-amber-100/80">
          These correction cards are disabled previews. The detector does not save tasks,
          create logs, activate modes, mark risks resolved, run background checks, or write
          Grimoire records. User confirmation and server-owned persistence remain deferred.
        </p>
      </div>

      <div className="mt-5 grid gap-4 xl:grid-cols-2">
        {correctionPreviews.map((action) => (
          <ProposedActionReviewCard
            key={action.action_type}
            initialAction={action}
            disabled
            saveLabel="Save / Confirm unavailable in Phase 13I corruption preview"
            cancelLabel="Cancel unavailable in Phase 13I corruption preview"
            editLabel="Edit payload unavailable in Phase 13I corruption preview"
            reviewTitle="Grimoire corruption correction preview"
            validationIssues={[
              "Preview only: this dashboard does not persist correction proposals.",
              "Corruption correction must remain separate from writes until explicit user confirmation exists.",
              "No generation call, database write, background job, mode activation, or action execution is wired here.",
            ]}
          />
        ))}
      </div>

      <div className="mt-5">
        <DataList
          items={checks.slice(0, 6).map((check) => ({
            id: check.id,
            title: check.risk_type,
            description: corruptionDescription(check),
            meta: (
              <div className="flex flex-wrap gap-2">
                <StatusPill label={formatDate(check.log_date)} />
                <StatusPill
                  label={check.severity}
                  tone={toneForText(check.severity)}
                />
                <StatusPill label={check.status} tone={toneForText(check.status)} />
              </div>
            ),
          }))}
          emptyState={
            <EmptyState
              title="No corruption checks yet"
              description="Add corruption checks when a mode risks fantasy loops, avoidance, overdrive, identity inflation, or proof replacement."
            />
          }
        />
      </div>
    </SectionCard>
  );
}


function buildReversionRecoveryPreviews({
  pendingReversions,
  pendingLogs,
}: {
  pendingReversions: GrimoireReversionRow[];
  pendingLogs: GrimoireDailyLogRow[];
}): ProposedActionContract[] {
  const primaryReversion = pendingReversions[0];
  const primaryLog = pendingLogs[0];

  const modeName = firstUsefulText(
    primaryReversion?.mode,
    primaryLog?.active_mode,
    primaryLog?.mission_type,
    "High-intensity mode",
  );

  const reversionAction = firstUsefulText(
    primaryReversion?.reversion_action,
    primaryReversion?.notes,
    "Complete a grounding reversion ritual before continuing symbolic work.",
  );

  return [
    {
      action_type: "create_task",
      source: "system",
      reason:
        "Preview only: a pending Grimoire reversion should become a concrete recovery task before the mode continues.",
      confidence: 0.74,
      evidence_refs: [
        "grimoire_reversions.pending",
        "grimoire_daily_logs.reversion_required",
      ],
      payload: {
        title: `Complete reversion for ${modeName}`,
        description: reversionAction,
        status: "todo",
        priority: "high",
        domain: "creativity",
      },
    },
    {
      action_type: "create_daily_log",
      source: "system",
      reason:
        "Preview only: reversion completion should be reflected as a daily log note after explicit confirmation in a later safe-write flow.",
      confidence: 0.7,
      evidence_refs: [
        "grimoire_reversions.completed=false",
        "grimoire_daily_logs.reversion_done=false",
      ],
      payload: {
        log_date: firstUsefulText(
          primaryReversion?.log_date,
          primaryLog?.log_date,
          todayIsoDate(),
        ),
        summary: `Reversion check for ${modeName}`,
        notes: `Pending recovery action: ${reversionAction}`,
      },
    },
  ];
}

function buildWeeklyThroneAuditPreviews({
  questions,
  summary,
}: {
  questions: string[];
  summary: {
    throne_attention_count: number;
    pending_reversion_count: number;
    open_corruption_check_count: number;
    high_severity_corruption_count: number;
  };
}): ProposedActionContract[] {
  const auditPrompt = questions.join(" ");

  return [
    {
      action_type: "create_task",
      source: "system",
      reason:
        "Preview only: the weekly throne audit should become one scheduled review task, not an automatic write.",
      confidence: 0.72,
      evidence_refs: [
        "weekly_throne_audit_questions",
        "grimoire_throne_attention_count",
      ],
      payload: {
        title: "Run weekly Grimoire throne audit",
        description: `Review ${summary.throne_attention_count} attention signal(s): ${summary.pending_reversion_count} pending reversion(s), ${summary.open_corruption_check_count} open corruption check(s), and ${summary.high_severity_corruption_count} high-severity warning(s). Questions: ${auditPrompt}`,
        status: "todo",
        priority:
          summary.throne_attention_count > 0 || summary.high_severity_corruption_count > 0
            ? "high"
            : "medium",
        domain: "creativity",
      },
    },
    {
      action_type: "create_proof_item",
      source: "system",
      reason:
        "Preview only: a completed throne audit should leave proof of what was corrected, removed, or grounded.",
      confidence: 0.68,
      evidence_refs: ["weekly_throne_audit_questions"],
      payload: {
        title: "Weekly Grimoire audit proof",
        proof_type: "note",
        description:
          "Record which mode produced proof, which mode became fantasy, what was avoided, what must be removed, what mode is needed next, and the simplest proof action.",
        occurred_at: todayIsoDate(),
      },
    },
  ];
}


function ReversionCard({
  reversions,
  pendingReversions,
  pendingLogs,
}: {
  reversions: GrimoireReversionRow[];
  pendingReversions: GrimoireReversionRow[];
  pendingLogs: GrimoireDailyLogRow[];
}) {
  const recoveryPreviews = buildReversionRecoveryPreviews({
    pendingReversions,
    pendingLogs,
  });

  return (
    <SectionCard
      title="Reversion"
      eyebrow="13J expanded reversion"
      description="Read-only recovery surface for pending reversion records. Completion remains unavailable until a later explicit confirmation flow."
    >
      <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <DataList
          items={reversions.slice(0, 6).map((reversion) => ({
            id: reversion.id,
            title: reversion.mode ?? "Reversion action",
            description: reversionDescription(reversion),
            meta: (
              <div className="flex flex-wrap gap-2">
                <StatusPill label={formatDate(reversion.log_date)} />
                <StatusPill
                  label={reversion.completed ? "completed" : "pending"}
                  tone={reversion.completed ? "success" : "warning"}
                />
              </div>
            ),
          }))}
          emptyState={
            <EmptyState
              title="No reversion actions yet"
              description="High-intensity modes must include a recovery or grounding action before they become sustainable."
            />
          }
        />

        <div className="space-y-4 rounded-3xl border border-amber-300/20 bg-amber-300/[0.04] p-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-200">
              recovery preview
            </p>
            <h3 className="mt-2 text-base font-semibold text-white">
              Pending reversion queue
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-300">
              Pending reversions are translated into preview-only recovery tasks
              and daily-log notes. Nothing is saved, completed, or executed here.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm leading-6 text-slate-300">
            <p className="font-semibold text-amber-100">Reversion boundary</p>
            <p className="mt-2">
              This panel does not mark reversions complete. It only shows what a
              safe future confirmation flow could propose.
            </p>
          </div>

          {recoveryPreviews.map((action) => (
            <ProposedActionReviewCard
              key={action.action_type}
              initialAction={action}
              saveLabel="Save / Confirm unavailable in Phase 13J reversion preview"
              cancelLabel="Cancel unavailable in Phase 13J reversion preview"
              editLabel="Edit payload unavailable in Phase 13J reversion preview"
              reviewTitle="Grimoire reversion recovery preview"
              disabled
            />
          ))}
        </div>
      </div>
    </SectionCard>
  );
}


function WeeklyThroneAuditCard({
  questions,
  summary,
}: {
  questions: string[];
  summary: {
    throne_attention_count: number;
    pending_reversion_count: number;
    open_corruption_check_count: number;
    high_severity_corruption_count: number;
  };
}) {
  const throneAuditPreviews = buildWeeklyThroneAuditPreviews({
    questions,
    summary,
  });

  return (
    <SectionCard
      title="Weekly throne audit"
      eyebrow="13J expanded throne audit"
      description="Read-only audit prompts for truth, safety, direction, and identity stability, with disabled preview actions for later confirmation."
    >
      <div className="grid gap-5 lg:grid-cols-[1fr_0.95fr]">
        <ol className="grid list-decimal gap-3 pl-5 text-sm leading-6 text-slate-300">
          {questions.map((question) => (
            <li
              key={question}
              className="rounded-2xl border border-white/10 bg-black/20 p-4"
            >
              {question}
            </li>
          ))}
        </ol>

        <div className="space-y-4 rounded-3xl border border-cyan-300/20 bg-cyan-300/[0.04] p-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-200">
              throne preview
            </p>
            <h3 className="mt-2 text-base font-semibold text-white">
              Audit-to-proof conversion
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-300">
              The throne audit becomes a review task and proof note only through
              later explicit confirmation. This Phase 13J panel is display-only.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm leading-6 text-slate-300">
            <p className="font-semibold text-cyan-100">Throne boundary</p>
            <p className="mt-2">
              The throne layer separates facts from story, prevents permanent
              overdrive, and keeps identity claims below evidence.
            </p>
          </div>

          {throneAuditPreviews.map((action) => (
            <ProposedActionReviewCard
              key={action.action_type}
              initialAction={action}
              saveLabel="Save / Confirm unavailable in Phase 13J throne preview"
              cancelLabel="Cancel unavailable in Phase 13J throne preview"
              editLabel="Edit payload unavailable in Phase 13J throne preview"
              reviewTitle="Grimoire throne audit preview"
              disabled
            />
          ))}
        </div>
      </div>
    </SectionCard>
  );
}


export async function GrimoireDashboardV1({ userId }: GrimoireDashboardV1Props) {
  const data = await getGrimoireDashboardDataSummary(userId);
  const { summary } = data;
  const hasAnyGrimoireData =
    summary.mode_count +
      summary.daily_log_count +
      summary.skill_count +
      summary.corruption_check_count +
      summary.reversion_count >
    0;

  return (
    <section className="space-y-8">
      <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-6 shadow-lg">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.28em] text-cyan-300">
              grimoire operating layer
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white">
              Grimoire
            </h1>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300">
              Symbolic modes translated into practical missions, proof actions,
              corruption warnings, reversion, and weekly throne audit. This
              surface reads confirmed records only and keeps fantasy separate
              from execution.
            </p>
          </div>

          <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 px-4 py-3 text-sm text-cyan-100">
            <p className="font-medium">Generated</p>
            <p className="mt-1 text-cyan-100/80">
              {formatGeneratedAt(data.generated_at)}
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <MetricTile
            label="Modes"
            value={summary.mode_count}
            description={`${summary.active_mode_count} active · ${summary.high_intensity_mode_count} high intensity`}
          />
          <MetricTile
            label="Missions"
            value={summary.daily_log_count}
            description={`${summary.active_mission_log_count} mapped · ${summary.proof_mapped_log_count} proof-linked`}
          />
          <MetricTile
            label="Corruption"
            value={summary.open_corruption_check_count}
            description={`${summary.high_severity_corruption_count} high severity checks visible`}
          />
          <MetricTile
            label="Throne attention"
            value={summary.throne_attention_count}
            description={`${summary.pending_reversion_count} pending reversions · ${summary.pending_reversion_log_count} pending logs`}
          />
        </div>
      </div>

      <GrimoireReadOnlyBoundaryNotice />
      <GrimoireWarningPanel warnings={data.warnings} />
      <GrimoireStateBoundaryPanel warnings={data.warnings} />
      <GrimoireCarnosGuideBoundaryPanel />
      <GrimoireThroneOverrideBoundaryPanel />
      <GrimoireCrossDashboardLinks activeRoute="/grimoire" />

      {!hasAnyGrimoireData ? (
        <EmptyState
          title="No Grimoire records yet"
          description="Begin by defining one mode, one mission type, one proof-producing action, one corruption risk, and one reversion action. Do not activate symbolic modes without grounding."
        />
      ) : null}

      <div className="grid gap-4 md:grid-cols-3">
        <MetricTile
          label="Mission types"
          value={summary.mission_type_count}
          description="Distinct mission categories represented by existing modes."
        />
        <MetricTile
          label="Skills"
          value={summary.skill_count}
          description={`${summary.active_skill_count} active · ${summary.proved_skill_count} proved`}
        />
        <MetricTile
          label="Reversions"
          value={summary.reversion_count}
          description={`${summary.completed_reversion_count} completed · ${summary.pending_reversion_count} pending`}
        />
      </div>

      <ModeSelectorCard modes={data.detail_rows.modes} />
      <MissionMappingCard logs={data.detail_rows.active_mission_logs} />
      <SymbolToActionTranslatorCard
        logs={data.detail_rows.proof_mapped_logs}
        skills={data.detail_rows.skills}
      />
      <CorruptionDetectorCard
        checks={data.detail_rows.corruption_checks}
        openChecks={data.detail_rows.open_corruption_checks}
        highSeverityChecks={data.detail_rows.high_severity_corruption_checks}
      />
      <ReversionCard
        reversions={data.detail_rows.reversions}
        pendingReversions={data.detail_rows.pending_reversions}
        pendingLogs={data.detail_rows.pending_reversion_logs}
      />
      <WeeklyThroneAuditCard
        questions={data.weekly_throne_audit_questions}
        summary={{
          throne_attention_count: summary.throne_attention_count,
          pending_reversion_count: summary.pending_reversion_count,
          open_corruption_check_count: summary.open_corruption_check_count,
          high_severity_corruption_count: summary.high_severity_corruption_count,
        }}
      />

      <GrimoireRulePanel
        title="Grounding rules"
        eyebrow="source rule"
        description="These rules keep symbolic content attached to reality and proof."
        items={data.grounding_rules}
      />

      <GrimoireRulePanel
        title="Anti-corruption rules"
        eyebrow="source rule"
        description="These rules prevent fantasy loops, overdrive, avoidance, and identity inflation."
        items={data.anti_corruption_rules}
      />

      <GrimoireFinalAuditBoundaryPanel
        summary={summary}
        warnings={data.warnings}
      />

      <SectionCard
        title="Source tables"
        eyebrow="read provenance"
        description="This dashboard is assembled only from user-owned SQL tables through read helpers."
      >
        <div className="flex flex-wrap gap-2">
          {data.source_tables.map((table) => (
            <StatusPill key={table} label={table} tone="info" />
          ))}
        </div>
      </SectionCard>
    </section>
  );
}

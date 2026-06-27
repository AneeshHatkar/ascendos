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

function ReversionCard({ reversions }: { reversions: GrimoireReversionRow[] }) {
  return (
    <SectionCard
      title="Reversion"
      eyebrow="13F required card"
      description="Read-only view of reversion actions. Logging completion is deferred to later safe write flows."
    >
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
    </SectionCard>
  );
}

function WeeklyThroneAuditCard({ questions }: { questions: string[] }) {
  return (
    <SectionCard
      title="Weekly throne audit"
      eyebrow="13F required card"
      description="Read-only audit prompts for truth, safety, direction, and identity stability."
    >
      <ol className="grid list-decimal gap-3 pl-5 text-sm leading-6 text-slate-300 md:grid-cols-2">
        {questions.map((question) => (
          <li
            key={question}
            className="rounded-2xl border border-white/10 bg-black/20 p-4"
          >
            {question}
          </li>
        ))}
      </ol>
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
      <ReversionCard reversions={data.detail_rows.reversions} />
      <WeeklyThroneAuditCard
        questions={data.weekly_throne_audit_questions}
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

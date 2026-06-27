import {
  listGrimoireCorruptionChecks,
  listGrimoireDailyLogs,
  listGrimoireModes,
  listGrimoireReversions,
  listGrimoireSkills,
} from "@/lib/repositories";

import type {
  GrimoireCorruptionCheckRow,
  GrimoireDailyLogRow,
  GrimoireModeRow,
  GrimoireReversionRow,
  GrimoireSkillRow,
} from "@/types/database";

export interface GrimoireDashboardSummary {
  mode_count: number;
  active_mode_count: number;
  high_intensity_mode_count: number;
  mission_type_count: number;
  daily_log_count: number;
  recent_daily_log_count: number;
  active_mission_log_count: number;
  pending_reversion_log_count: number;
  proof_mapped_log_count: number;
  skill_count: number;
  active_skill_count: number;
  proved_skill_count: number;
  corruption_check_count: number;
  open_corruption_check_count: number;
  high_severity_corruption_count: number;
  reversion_count: number;
  pending_reversion_count: number;
  completed_reversion_count: number;
  throne_attention_count: number;
  read_only_boundary: true;
}

export interface GrimoireDashboardDetailRows {
  modes: GrimoireModeRow[];
  active_modes: GrimoireModeRow[];
  high_intensity_modes: GrimoireModeRow[];
  daily_logs: GrimoireDailyLogRow[];
  recent_daily_logs: GrimoireDailyLogRow[];
  active_mission_logs: GrimoireDailyLogRow[];
  pending_reversion_logs: GrimoireDailyLogRow[];
  proof_mapped_logs: GrimoireDailyLogRow[];
  skills: GrimoireSkillRow[];
  active_skills: GrimoireSkillRow[];
  proved_skills: GrimoireSkillRow[];
  corruption_checks: GrimoireCorruptionCheckRow[];
  open_corruption_checks: GrimoireCorruptionCheckRow[];
  high_severity_corruption_checks: GrimoireCorruptionCheckRow[];
  reversions: GrimoireReversionRow[];
  pending_reversions: GrimoireReversionRow[];
  completed_reversions: GrimoireReversionRow[];
}

export interface GrimoireDashboardDataResult {
  summary: GrimoireDashboardSummary;
  generated_at: string;
  source_tables: string[];
  warnings: string[];
  detail_rows: GrimoireDashboardDetailRows;
  grounding_rules: string[];
  weekly_throne_audit_questions: string[];
  anti_corruption_rules: string[];
}

const DEFAULT_SUMMARY_LIMIT = 100;
const RECENT_WINDOW_DAYS = 7;

function asRows<T>(result: { data: T[] | null; error: string | null }): T[] {
  return result.data ?? [];
}

function collectWarning(label: string, error: string | null): string | null {
  if (!error) {
    return null;
  }

  return `${label}: ${error}`;
}

function isWithinRecentWindow(value: string | null | undefined): boolean {
  if (!value) {
    return false;
  }

  const candidate = new Date(value);
  if (Number.isNaN(candidate.getTime())) {
    return false;
  }

  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - RECENT_WINDOW_DAYS);

  return candidate.getTime() >= cutoff.getTime();
}

function hasMappedProof(log: GrimoireDailyLogRow): boolean {
  if (log.related_proof_item_id) {
    return true;
  }

  if (!Array.isArray(log.top_actions_json)) {
    return false;
  }

  return log.top_actions_json.length > 0;
}

function uniqueMissionTypeCount(rows: GrimoireModeRow[]): number {
  return new Set(rows.map((row) => row.mission_type).filter(Boolean)).size;
}

export async function getGrimoireDashboardDataSummary(
  userId: string,
): Promise<GrimoireDashboardDataResult> {
  const [
    modes,
    activeModes,
    highIntensityModes,
    dailyLogs,
    recentDailyLogs,
    pendingReversionLogs,
    skills,
    activeSkills,
    provedSkills,
    corruptionChecks,
    openCorruptionChecks,
    highSeverityCorruptionChecks,
    reversions,
    pendingReversions,
    completedReversions,
  ] = await Promise.all([
    listGrimoireModes(userId, { limit: DEFAULT_SUMMARY_LIMIT }),
    listGrimoireModes(userId, {
      active: true,
      limit: DEFAULT_SUMMARY_LIMIT,
    }),
    listGrimoireModes(userId, {
      intensityLevel: "high",
      limit: DEFAULT_SUMMARY_LIMIT,
    }),
    listGrimoireDailyLogs(userId, { limit: DEFAULT_SUMMARY_LIMIT }),
    listGrimoireDailyLogs(userId, {
      fromDate: recentCutoffDate(),
      limit: DEFAULT_SUMMARY_LIMIT,
    }),
    listGrimoireDailyLogs(userId, {
      reversionRequired: true,
      reversionDone: false,
      limit: DEFAULT_SUMMARY_LIMIT,
    }),
    listGrimoireSkills(userId, { limit: DEFAULT_SUMMARY_LIMIT }),
    listGrimoireSkills(userId, {
      status: "active",
      limit: DEFAULT_SUMMARY_LIMIT,
    }),
    listGrimoireSkills(userId, {
      status: "proved",
      limit: DEFAULT_SUMMARY_LIMIT,
    }),
    listGrimoireCorruptionChecks(userId, { limit: DEFAULT_SUMMARY_LIMIT }),
    listGrimoireCorruptionChecks(userId, {
      status: "open",
      limit: DEFAULT_SUMMARY_LIMIT,
    }),
    listGrimoireCorruptionChecks(userId, {
      severity: "high",
      limit: DEFAULT_SUMMARY_LIMIT,
    }),
    listGrimoireReversions(userId, { limit: DEFAULT_SUMMARY_LIMIT }),
    listGrimoireReversions(userId, {
      completed: false,
      limit: DEFAULT_SUMMARY_LIMIT,
    }),
    listGrimoireReversions(userId, {
      completed: true,
      limit: DEFAULT_SUMMARY_LIMIT,
    }),
  ]);

  const modeRows = asRows(modes);
  const activeModeRows = asRows(activeModes);
  const highIntensityModeRows = asRows(highIntensityModes);
  const dailyLogRows = asRows(dailyLogs);
  const recentDailyLogRows = asRows(recentDailyLogs).filter((item) =>
    isWithinRecentWindow(item.log_date),
  );
  const pendingReversionLogRows = asRows(pendingReversionLogs);
  const activeMissionLogRows = dailyLogRows.filter(
    (item) =>
      Boolean(item.active_mode) ||
      Boolean(item.mission_statement) ||
      hasMappedProof(item),
  );
  const proofMappedLogRows = dailyLogRows.filter(hasMappedProof);
  const skillRows = asRows(skills);
  const activeSkillRows = asRows(activeSkills);
  const provedSkillRows = asRows(provedSkills);
  const corruptionRows = asRows(corruptionChecks);
  const openCorruptionRows = asRows(openCorruptionChecks);
  const highSeverityCorruptionRows = asRows(highSeverityCorruptionChecks);
  const reversionRows = asRows(reversions);
  const pendingReversionRows = asRows(pendingReversions);
  const completedReversionRows = asRows(completedReversions);

  const warnings = [
    collectWarning("grimoire_modes", modes.error),
    collectWarning("active_grimoire_modes", activeModes.error),
    collectWarning("high_intensity_grimoire_modes", highIntensityModes.error),
    collectWarning("grimoire_daily_logs", dailyLogs.error),
    collectWarning("recent_grimoire_daily_logs", recentDailyLogs.error),
    collectWarning("pending_reversion_logs", pendingReversionLogs.error),
    collectWarning("grimoire_skills", skills.error),
    collectWarning("active_grimoire_skills", activeSkills.error),
    collectWarning("proved_grimoire_skills", provedSkills.error),
    collectWarning("grimoire_corruption_checks", corruptionChecks.error),
    collectWarning("open_corruption_checks", openCorruptionChecks.error),
    collectWarning(
      "high_severity_corruption_checks",
      highSeverityCorruptionChecks.error,
    ),
    collectWarning("grimoire_reversions", reversions.error),
    collectWarning("pending_grimoire_reversions", pendingReversions.error),
    collectWarning("completed_grimoire_reversions", completedReversions.error),
  ].filter((warning): warning is string => warning !== null);

  const throneAttentionCount =
    openCorruptionRows.length +
    highSeverityCorruptionRows.length +
    pendingReversionRows.length +
    pendingReversionLogRows.length;

  return {
    generated_at: new Date().toISOString(),
    source_tables: [
      "grimoire_modes",
      "grimoire_daily_logs",
      "grimoire_skills",
      "grimoire_corruption_checks",
      "grimoire_reversions",
    ],
    warnings,
    grounding_rules: [
      "Symbolic content must become practical action.",
      "Every activated mode needs proof, corruption checks, and reversion.",
      "No fantasy loop replaces real tasks, health, money, housing, or safety.",
    ],
    anti_corruption_rules: [
      "Do not live in all modes at once.",
      "Do not use modes to avoid real tasks.",
      "Do not replace proof with identity claims.",
      "Do not skip reversion after high-intensity modes.",
      "Do not let symbolic language override health, money, housing, or safety.",
    ],
    weekly_throne_audit_questions: [
      "Which mode actually produced proof?",
      "Which mode became fantasy?",
      "What did I avoid?",
      "What must be purified or removed?",
      "What mode is needed next week?",
      "What is the simplest proof action?",
    ],
    detail_rows: {
      modes: modeRows,
      active_modes: activeModeRows,
      high_intensity_modes: highIntensityModeRows,
      daily_logs: dailyLogRows,
      recent_daily_logs: recentDailyLogRows,
      active_mission_logs: activeMissionLogRows,
      pending_reversion_logs: pendingReversionLogRows,
      proof_mapped_logs: proofMappedLogRows,
      skills: skillRows,
      active_skills: activeSkillRows,
      proved_skills: provedSkillRows,
      corruption_checks: corruptionRows,
      open_corruption_checks: openCorruptionRows,
      high_severity_corruption_checks: highSeverityCorruptionRows,
      reversions: reversionRows,
      pending_reversions: pendingReversionRows,
      completed_reversions: completedReversionRows,
    },
    summary: {
      mode_count: modeRows.length,
      active_mode_count: activeModeRows.length,
      high_intensity_mode_count: highIntensityModeRows.length,
      mission_type_count: uniqueMissionTypeCount(modeRows),
      daily_log_count: dailyLogRows.length,
      recent_daily_log_count: recentDailyLogRows.length,
      active_mission_log_count: activeMissionLogRows.length,
      pending_reversion_log_count: pendingReversionLogRows.length,
      proof_mapped_log_count: proofMappedLogRows.length,
      skill_count: skillRows.length,
      active_skill_count: activeSkillRows.length,
      proved_skill_count: provedSkillRows.length,
      corruption_check_count: corruptionRows.length,
      open_corruption_check_count: openCorruptionRows.length,
      high_severity_corruption_count: highSeverityCorruptionRows.length,
      reversion_count: reversionRows.length,
      pending_reversion_count: pendingReversionRows.length,
      completed_reversion_count: completedReversionRows.length,
      throne_attention_count: throneAttentionCount,
      read_only_boundary: true,
    },
  };
}

function recentCutoffDate(): string {
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - RECENT_WINDOW_DAYS);
  return cutoff.toISOString().slice(0, 10);
}

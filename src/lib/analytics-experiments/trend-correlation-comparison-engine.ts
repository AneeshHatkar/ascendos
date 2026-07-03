import type {
  InsightDisclosureRequirement,
  InsightQualityLevel,
} from "./insight-quality-provenance";

export type AnalyticsEngineMode =
  | "trend"
  | "comparison"
  | "correlation";

export type AnalyticsEngineSourceMode =
  | "online_source_of_truth"
  | "eligible_offline_cache"
  | "mixed_online_offline"
  | "unsynced_local"
  | "deterministic_preview";

export type TrendDirection =
  | "increasing"
  | "decreasing"
  | "stable"
  | "volatile"
  | "insufficient_data"
  | "invalid";

export type ComparisonDirection =
  | "up"
  | "down"
  | "unchanged"
  | "insufficient_data"
  | "invalid";

export type CorrelationDirection =
  | "positive"
  | "negative"
  | "none"
  | "insufficient_data"
  | "invalid";

export type CorrelationStrength =
  | "strong"
  | "moderate"
  | "weak"
  | "none"
  | "insufficient_data"
  | "invalid";

export type AnalyticsEngineConfidence =
  | "high"
  | "medium"
  | "low"
  | "insufficient_data"
  | "invalid";

export interface AnalyticsMetricPoint {
  readonly timestamp: string;
  readonly value: number;
  readonly sourceMode: AnalyticsEngineSourceMode;
  readonly userScoped: true;
  readonly hasConfounder: boolean;
}

export interface TrendAnalysisInput {
  readonly metricId: string;
  readonly userScoped: true;
  readonly points: readonly AnalyticsMetricPoint[];
  readonly minimumDataPoints: number;
  readonly volatilityThreshold: number;
  readonly slopeSensitivity: number;
  readonly allowCausalClaim: false;
}

export interface TrendAnalysisResult {
  readonly valid: boolean;
  readonly metricId: string;
  readonly direction: TrendDirection;
  readonly qualityLevel: InsightQualityLevel;
  readonly confidence: AnalyticsEngineConfidence;
  readonly slope: number;
  readonly averageValue: number;
  readonly volatilityScore: number;
  readonly dataPointCount: number;
  readonly disclosureRequirements: readonly InsightDisclosureRequirement[];
  readonly errors: readonly string[];
  readonly warnings: readonly string[];
  readonly carnosExplanationLimit: string;
}

export interface ComparisonAnalysisInput {
  readonly metricId: string;
  readonly userScoped: true;
  readonly baselinePoints: readonly AnalyticsMetricPoint[];
  readonly comparisonPoints: readonly AnalyticsMetricPoint[];
  readonly minimumDataPointsPerWindow: number;
  readonly meaningfulChangeRatio: number;
  readonly allowCausalClaim: false;
}

export interface ComparisonAnalysisResult {
  readonly valid: boolean;
  readonly metricId: string;
  readonly direction: ComparisonDirection;
  readonly qualityLevel: InsightQualityLevel;
  readonly confidence: AnalyticsEngineConfidence;
  readonly baselineAverage: number;
  readonly comparisonAverage: number;
  readonly absoluteChange: number;
  readonly percentChange: number;
  readonly baselineDataPointCount: number;
  readonly comparisonDataPointCount: number;
  readonly disclosureRequirements: readonly InsightDisclosureRequirement[];
  readonly errors: readonly string[];
  readonly warnings: readonly string[];
  readonly carnosExplanationLimit: string;
}

export interface CorrelationAnalysisInput {
  readonly primaryMetricId: string;
  readonly secondaryMetricId: string;
  readonly userScoped: true;
  readonly pairedPoints: readonly {
    readonly timestamp: string;
    readonly primaryValue: number;
    readonly secondaryValue: number;
    readonly sourceMode: AnalyticsEngineSourceMode;
    readonly userScoped: true;
    readonly hasConfounder: boolean;
  }[];
  readonly minimumMatchedDataPoints: number;
  readonly allowCausalClaim: false;
}

export interface CorrelationAnalysisResult {
  readonly valid: boolean;
  readonly primaryMetricId: string;
  readonly secondaryMetricId: string;
  readonly direction: CorrelationDirection;
  readonly strength: CorrelationStrength;
  readonly qualityLevel: InsightQualityLevel;
  readonly confidence: AnalyticsEngineConfidence;
  readonly coefficient: number;
  readonly matchedDataPointCount: number;
  readonly disclosureRequirements: readonly InsightDisclosureRequirement[];
  readonly errors: readonly string[];
  readonly warnings: readonly string[];
  readonly carnosExplanationLimit: string;
}

export interface AnalyticsEngineSummary {
  readonly phase: "18I";
  readonly engineModes: readonly AnalyticsEngineMode[];
  readonly codedCapabilities: readonly string[];
  readonly runtimeDataReadsEnabled: false;
  readonly schemaWritesEnabled: false;
  readonly supabaseCallsEnabled: false;
  readonly fakeAnalyticsDataEnabled: false;
  readonly causalClaimsAllowed: false;
  readonly localCarnosRuntimeRequired: false;
}

export const PHASE_18I_ANALYTICS_ENGINE_BOUNDARY = {
  runtimeDataReadsEnabled: false,
  schemaWritesEnabled: false,
  supabaseCallsEnabled: false,
  fakeAnalyticsDataEnabled: false,
  localStorageCoreDataEnabled: false,
  memoryWriteEnabled: false,
  actionExecutionEnabled: false,
  causalClaimsAllowed: false,
  localCarnosRuntimeRequired: false,
  deterministicEngineImplemented: true,
} as const;

function roundMetric(value: number): number {
  if (!Number.isFinite(value)) return 0;
  return Number(value.toFixed(4));
}

function average(values: readonly number[]): number {
  if (values.length === 0) return 0;
  let total = 0;
  for (const value of values) total += value;
  return roundMetric(total / values.length);
}

function variance(values: readonly number[]): number {
  if (values.length <= 1) return 0;
  const avg = average(values);
  let total = 0;
  for (const value of values) {
    const delta = value - avg;
    total += delta * delta;
  }
  return roundMetric(total / values.length);
}

function standardDeviation(values: readonly number[]): number {
  return roundMetric(Math.sqrt(variance(values)));
}

function coefficientOfVariation(values: readonly number[]): number {
  const avg = Math.abs(average(values));
  if (avg === 0) return 0;
  return roundMetric(standardDeviation(values) / avg);
}

function linearSlope(values: readonly number[]): number {
  if (values.length <= 1) return 0;

  const n = values.length;
  let sumX = 0;
  let sumY = 0;
  let sumXY = 0;
  let sumXX = 0;

  for (let index = 0; index < values.length; index += 1) {
    const x = index + 1;
    const y = values[index] ?? 0;
    sumX += x;
    sumY += y;
    sumXY += x * y;
    sumXX += x * x;
  }

  const denominator = n * sumXX - sumX * sumX;
  if (denominator === 0) return 0;
  return roundMetric((n * sumXY - sumX * sumY) / denominator);
}

function hasAnyConfounder(points: readonly AnalyticsMetricPoint[]): boolean {
  return points.some((point) => point.hasConfounder);
}

function hasAnyUnsynced(points: readonly { readonly sourceMode: AnalyticsEngineSourceMode }[]): boolean {
  return points.some((point) => point.sourceMode === "unsynced_local");
}

function hasAnyCached(points: readonly { readonly sourceMode: AnalyticsEngineSourceMode }[]): boolean {
  return points.some((point) => point.sourceMode === "eligible_offline_cache");
}

function hasAnyMixed(points: readonly { readonly sourceMode: AnalyticsEngineSourceMode }[]): boolean {
  return points.some((point) => point.sourceMode === "mixed_online_offline");
}

function hasAnyDeterministic(points: readonly { readonly sourceMode: AnalyticsEngineSourceMode }[]): boolean {
  return points.some((point) => point.sourceMode === "deterministic_preview");
}

function buildDisclosureRequirements(input: {
  readonly insufficientData: boolean;
  readonly hasConfounder: boolean;
  readonly hasUnsynced: boolean;
  readonly hasCached: boolean;
  readonly hasMixed: boolean;
  readonly hasDeterministic: boolean;
}): readonly InsightDisclosureRequirement[] {
  const requirements = new Set<InsightDisclosureRequirement>();

  if (input.insufficientData) requirements.add("disclose_insufficient_data");
  if (input.hasConfounder) {
    requirements.add("disclose_confounders");
    requirements.add("avoid_causal_claims");
  }
  if (input.hasUnsynced) requirements.add("disclose_unsynced_context");
  if (input.hasCached) requirements.add("disclose_cached_context");
  if (input.hasMixed) requirements.add("disclose_partial_context");
  if (input.hasDeterministic) requirements.add("disclose_deterministic_preview");

  requirements.add("avoid_causal_claims");

  return [...requirements];
}

function qualityFromSignals(input: {
  readonly valid: boolean;
  readonly insufficientData: boolean;
  readonly disclosureRequirements: readonly InsightDisclosureRequirement[];
  readonly dataPointCount: number;
}): InsightQualityLevel {
  if (!input.valid) return "invalid";
  if (input.insufficientData) return "insufficient_data";
  if (input.disclosureRequirements.some((item) => item !== "avoid_causal_claims")) return "medium_confidence";
  if (input.dataPointCount >= 14) return "high_confidence";
  if (input.dataPointCount >= 7) return "medium_confidence";
  return "low_confidence";
}

function confidenceFromQuality(qualityLevel: InsightQualityLevel): AnalyticsEngineConfidence {
  if (qualityLevel === "high_confidence") return "high";
  if (qualityLevel === "medium_confidence") return "medium";
  if (qualityLevel === "low_confidence") return "low";
  if (qualityLevel === "insufficient_data") return "insufficient_data";
  return "invalid";
}

function explanationLimit(input: {
  readonly valid: boolean;
  readonly insufficientData: boolean;
  readonly mode: AnalyticsEngineMode;
  readonly disclosureRequirements: readonly InsightDisclosureRequirement[];
}): string {
  if (!input.valid) return "Carnos must not present this " + input.mode + " result as valid.";
  if (input.insufficientData) return "Carnos must say there is not enough data for this " + input.mode + " result.";
  if (input.mode === "correlation") return "Carnos may describe correlation but must not claim causation.";
  if (input.disclosureRequirements.some((item) => item !== "avoid_causal_claims")) {
    return "Carnos must disclose cached, unsynced, partial, deterministic, or confounder limits before explaining this " + input.mode + " result.";
  }
  return "Carnos may explain this " + input.mode + " result as deterministic analytics, without claiming certainty or causality.";
}

export function analyzeTrend(input: TrendAnalysisInput): TrendAnalysisResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!input.metricId.trim()) errors.push("Trend metric id is required.");
  if (!input.userScoped) errors.push("Trend analysis must be user scoped.");
  if (input.allowCausalClaim) errors.push("Trend analysis must not allow causal claims.");
  if (input.minimumDataPoints < 2) errors.push("Trend minimum data points must be at least 2.");
  if (input.points.length < input.minimumDataPoints) warnings.push("Trend analysis has insufficient data.");

  const invalidPoint = input.points.find((point) => !Number.isFinite(point.value) || !point.userScoped);
  if (invalidPoint) errors.push("Trend analysis contains invalid or non-user-scoped point.");

  const sortedPoints = [...input.points].sort((a, b) => a.timestamp.localeCompare(b.timestamp));
  const values = sortedPoints.map((point) => point.value);
  const slope = linearSlope(values);
  const avg = average(values);
  const volatilityScore = coefficientOfVariation(values);
  const insufficientData = input.points.length < input.minimumDataPoints;

  let direction: TrendDirection = "stable";
  if (errors.length > 0) direction = "invalid";
  else if (insufficientData) direction = "insufficient_data";
  else if (volatilityScore >= input.volatilityThreshold) direction = "volatile";
  else if (slope > input.slopeSensitivity) direction = "increasing";
  else if (slope < -input.slopeSensitivity) direction = "decreasing";

  const disclosureRequirements = buildDisclosureRequirements({
    insufficientData,
    hasConfounder: hasAnyConfounder(input.points),
    hasUnsynced: hasAnyUnsynced(input.points),
    hasCached: hasAnyCached(input.points),
    hasMixed: hasAnyMixed(input.points),
    hasDeterministic: hasAnyDeterministic(input.points),
  });

  const valid = errors.length === 0;
  const qualityLevel = qualityFromSignals({
    valid,
    insufficientData,
    disclosureRequirements,
    dataPointCount: input.points.length,
  });

  return {
    valid,
    metricId: input.metricId,
    direction,
    qualityLevel,
    confidence: confidenceFromQuality(qualityLevel),
    slope,
    averageValue: avg,
    volatilityScore,
    dataPointCount: input.points.length,
    disclosureRequirements,
    errors,
    warnings,
    carnosExplanationLimit: explanationLimit({
      valid,
      insufficientData,
      mode: "trend",
      disclosureRequirements,
    }),
  };
}

export function compareMetricWindows(input: ComparisonAnalysisInput): ComparisonAnalysisResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!input.metricId.trim()) errors.push("Comparison metric id is required.");
  if (!input.userScoped) errors.push("Comparison analysis must be user scoped.");
  if (input.allowCausalClaim) errors.push("Comparison analysis must not allow causal claims.");
  if (input.minimumDataPointsPerWindow < 2) errors.push("Comparison minimum data points per window must be at least 2.");
  if (input.baselinePoints.length < input.minimumDataPointsPerWindow) warnings.push("Comparison baseline window has insufficient data.");
  if (input.comparisonPoints.length < input.minimumDataPointsPerWindow) warnings.push("Comparison active window has insufficient data.");

  const allPoints = [...input.baselinePoints, ...input.comparisonPoints];
  const invalidPoint = allPoints.find((point) => !Number.isFinite(point.value) || !point.userScoped);
  if (invalidPoint) errors.push("Comparison analysis contains invalid or non-user-scoped point.");

  const baselineAverage = average(input.baselinePoints.map((point) => point.value));
  const comparisonAverage = average(input.comparisonPoints.map((point) => point.value));
  const absoluteChange = roundMetric(comparisonAverage - baselineAverage);
  const percentChange = baselineAverage === 0 ? 0 : roundMetric(absoluteChange / Math.abs(baselineAverage));
  const insufficientData =
    input.baselinePoints.length < input.minimumDataPointsPerWindow ||
    input.comparisonPoints.length < input.minimumDataPointsPerWindow;

  let direction: ComparisonDirection = "unchanged";
  if (errors.length > 0) direction = "invalid";
  else if (insufficientData) direction = "insufficient_data";
  else if (percentChange >= input.meaningfulChangeRatio) direction = "up";
  else if (percentChange <= -input.meaningfulChangeRatio) direction = "down";

  const disclosureRequirements = buildDisclosureRequirements({
    insufficientData,
    hasConfounder: hasAnyConfounder(allPoints),
    hasUnsynced: hasAnyUnsynced(allPoints),
    hasCached: hasAnyCached(allPoints),
    hasMixed: hasAnyMixed(allPoints),
    hasDeterministic: hasAnyDeterministic(allPoints),
  });

  const valid = errors.length === 0;
  const qualityLevel = qualityFromSignals({
    valid,
    insufficientData,
    disclosureRequirements,
    dataPointCount: allPoints.length,
  });

  return {
    valid,
    metricId: input.metricId,
    direction,
    qualityLevel,
    confidence: confidenceFromQuality(qualityLevel),
    baselineAverage,
    comparisonAverage,
    absoluteChange,
    percentChange,
    baselineDataPointCount: input.baselinePoints.length,
    comparisonDataPointCount: input.comparisonPoints.length,
    disclosureRequirements,
    errors,
    warnings,
    carnosExplanationLimit: explanationLimit({
      valid,
      insufficientData,
      mode: "comparison",
      disclosureRequirements,
    }),
  };
}

function pearsonCoefficient(
  pairs: readonly {
    readonly primaryValue: number;
    readonly secondaryValue: number;
  }[],
): number {
  if (pairs.length < 2) return 0;

  const xs = pairs.map((pair) => pair.primaryValue);
  const ys = pairs.map((pair) => pair.secondaryValue);
  const avgX = average(xs);
  const avgY = average(ys);

  let numerator = 0;
  let xSquares = 0;
  let ySquares = 0;

  for (const pair of pairs) {
    const xDelta = pair.primaryValue - avgX;
    const yDelta = pair.secondaryValue - avgY;
    numerator += xDelta * yDelta;
    xSquares += xDelta * xDelta;
    ySquares += yDelta * yDelta;
  }

  const denominator = Math.sqrt(xSquares * ySquares);
  if (denominator === 0) return 0;
  return roundMetric(numerator / denominator);
}

function classifyCorrelationStrength(coefficient: number): CorrelationStrength {
  const absolute = Math.abs(coefficient);
  if (absolute >= 0.7) return "strong";
  if (absolute >= 0.4) return "moderate";
  if (absolute >= 0.2) return "weak";
  return "none";
}

export function analyzeCorrelation(input: CorrelationAnalysisInput): CorrelationAnalysisResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!input.primaryMetricId.trim()) errors.push("Correlation primary metric id is required.");
  if (!input.secondaryMetricId.trim()) errors.push("Correlation secondary metric id is required.");
  if (input.primaryMetricId === input.secondaryMetricId) errors.push("Correlation metrics must be different.");
  if (!input.userScoped) errors.push("Correlation analysis must be user scoped.");
  if (input.allowCausalClaim) errors.push("Correlation analysis must not allow causal claims.");
  if (input.minimumMatchedDataPoints < 7) errors.push("Correlation minimum matched data points must be at least 7.");
  if (input.pairedPoints.length < input.minimumMatchedDataPoints) warnings.push("Correlation analysis has insufficient matched data.");

  const invalidPoint = input.pairedPoints.find((point) => !Number.isFinite(point.primaryValue) || !Number.isFinite(point.secondaryValue) || !point.userScoped);
  if (invalidPoint) errors.push("Correlation analysis contains invalid or non-user-scoped pair.");

  const coefficient = pearsonCoefficient(input.pairedPoints);
  const insufficientData = input.pairedPoints.length < input.minimumMatchedDataPoints;

  let direction: CorrelationDirection = "none";
  if (errors.length > 0) direction = "invalid";
  else if (insufficientData) direction = "insufficient_data";
  else if (coefficient > 0.2) direction = "positive";
  else if (coefficient < -0.2) direction = "negative";

  const strength =
    errors.length > 0
      ? "invalid"
      : insufficientData
        ? "insufficient_data"
        : classifyCorrelationStrength(coefficient);

  const disclosureRequirements = buildDisclosureRequirements({
    insufficientData,
    hasConfounder: input.pairedPoints.some((point) => point.hasConfounder),
    hasUnsynced: hasAnyUnsynced(input.pairedPoints),
    hasCached: hasAnyCached(input.pairedPoints),
    hasMixed: hasAnyMixed(input.pairedPoints),
    hasDeterministic: hasAnyDeterministic(input.pairedPoints),
  });

  const valid = errors.length === 0;
  const qualityLevel = qualityFromSignals({
    valid,
    insufficientData,
    disclosureRequirements,
    dataPointCount: input.pairedPoints.length,
  });

  return {
    valid,
    primaryMetricId: input.primaryMetricId,
    secondaryMetricId: input.secondaryMetricId,
    direction,
    strength,
    qualityLevel,
    confidence: confidenceFromQuality(qualityLevel),
    coefficient,
    matchedDataPointCount: input.pairedPoints.length,
    disclosureRequirements,
    errors,
    warnings,
    carnosExplanationLimit: explanationLimit({
      valid,
      insufficientData,
      mode: "correlation",
      disclosureRequirements,
    }),
  };
}

export function summarizeTrendCorrelationComparisonEngine(): AnalyticsEngineSummary {
  return {
    phase: "18I",
    engineModes: ["trend", "comparison", "correlation"],
    codedCapabilities: [
      "trend direction classification",
      "trend slope scoring",
      "volatility detection",
      "comparison window evaluation",
      "percent change calculation",
      "correlation coefficient calculation",
      "correlation strength classification",
      "minimum data gates",
      "confidence classification",
      "disclosure requirement generation",
      "correlation-not-causation guardrails",
      "Carnos explanation limits",
    ],
    runtimeDataReadsEnabled: PHASE_18I_ANALYTICS_ENGINE_BOUNDARY.runtimeDataReadsEnabled,
    schemaWritesEnabled: PHASE_18I_ANALYTICS_ENGINE_BOUNDARY.schemaWritesEnabled,
    supabaseCallsEnabled: PHASE_18I_ANALYTICS_ENGINE_BOUNDARY.supabaseCallsEnabled,
    fakeAnalyticsDataEnabled: PHASE_18I_ANALYTICS_ENGINE_BOUNDARY.fakeAnalyticsDataEnabled,
    causalClaimsAllowed: PHASE_18I_ANALYTICS_ENGINE_BOUNDARY.causalClaimsAllowed,
    localCarnosRuntimeRequired: PHASE_18I_ANALYTICS_ENGINE_BOUNDARY.localCarnosRuntimeRequired,
  };
}

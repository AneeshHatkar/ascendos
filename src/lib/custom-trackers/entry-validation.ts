import {
  type CustomTrackerEntryCoreRecord,
  type CustomTrackerFieldCoreRecord,
  type CustomTrackerId,
  type CustomTrackerUserId,
} from "./core-tracker-domain-contracts";
import {
  DEFAULT_UNKNOWN_FIELD_POLICY,
  decideUnknownCustomTrackerField,
  validateCustomTrackerFieldValue,
  type CustomTrackerFieldDefinitionInput,
  type CustomTrackerUnknownFieldPolicy,
} from "./field-type-registry";

export type CustomTrackerEntryValidationMode =
  | "strict_reject"
  | "quarantine_invalid";

export type CustomTrackerDuplicatePolicy =
  | "warn_same_day"
  | "block_same_day";

export type CustomTrackerEntryValidationStatus =
  | "valid"
  | "invalid"
  | "quarantined";

export type CustomTrackerEntryFieldIssueKind =
  | "missing_required"
  | "unknown_field"
  | "invalid_value"
  | "unsafe_values_json"
  | "invalid_entry_date"
  | "invalid_notes"
  | "ownership_mismatch"
  | "duplicate_entry";

export type CustomTrackerEntryFieldIssue = {
  kind: CustomTrackerEntryFieldIssueKind;
  fieldKey: string;
  message: string;
  quarantined: boolean;
};

export type CustomTrackerEntryValidationInput = {
  trackerId: CustomTrackerId;
  userId: CustomTrackerUserId;
  entry: CustomTrackerEntryCoreRecord;
  fields: ReadonlyArray<CustomTrackerFieldCoreRecord>;
  existingEntries: ReadonlyArray<CustomTrackerEntryCoreRecord>;
  unknownFieldPolicy?: CustomTrackerUnknownFieldPolicy;
  validationMode?: CustomTrackerEntryValidationMode;
  duplicatePolicy?: CustomTrackerDuplicatePolicy;
};

export type CustomTrackerEntryDuplicateResult = {
  hasSameDayDuplicate: boolean;
  duplicateEntryIds: ReadonlyArray<string>;
  warning: string | null;
  blocking: boolean;
};

export type CustomTrackerEntryValidationResult = {
  status: CustomTrackerEntryValidationStatus;
  valid: boolean;
  errors: ReadonlyArray<string>;
  warnings: ReadonlyArray<string>;
  fieldIssues: ReadonlyArray<CustomTrackerEntryFieldIssue>;
  quarantinedFieldKeys: ReadonlyArray<string>;
  normalizedValuesJson: Record<string, unknown>;
  duplicateResult: CustomTrackerEntryDuplicateResult;
};

export type CustomTrackerEntryValidationSummary = {
  validEntryCount: number;
  invalidEntryCount: number;
  quarantinedEntryCount: number;
  duplicateWarningCount: number;
  unknownFieldIssueCount: number;
  invalidValueIssueCount: number;
  missingRequiredIssueCount: number;
};

export const PHASE_19D_ENTRY_VALIDATION_BOUNDARY = {
  phase: "19D",
  valuesJsonRequiresPlainObject: true,
  unknownFieldsRejectedByDefault: true,
  duplicateEntriesWarnByDefault: true,
  invalidValuesDoNotWriteSilently: true,
  fakeTrackerEntriesAllowed: false,
  runtimeWritesEnabled: false,
  schemaMigrationEnabled: false,
} as const;

export const DEFAULT_ENTRY_VALIDATION_MODE: CustomTrackerEntryValidationMode = "strict_reject";
export const DEFAULT_DUPLICATE_POLICY: CustomTrackerDuplicatePolicy = "warn_same_day";
export const MAX_CUSTOM_TRACKER_ENTRY_NOTE_LENGTH = 5000;
export const MAX_CUSTOM_TRACKER_VALUES_JSON_KEYS = 200;

export function isPlainCustomTrackerValuesJson(value: unknown): value is Record<string, unknown> {
  if (typeof value !== "object" || value === null || Array.isArray(value)) return false;
  return Object.getPrototypeOf(value) === Object.prototype || Object.getPrototypeOf(value) === null;
}

export function validateCustomTrackerValuesJsonShape(valuesJson: unknown): ReadonlyArray<string> {
  const errors: string[] = [];

  if (!isPlainCustomTrackerValuesJson(valuesJson)) {
    return ["values_json must be a plain object"];
  }

  const keys = Object.keys(valuesJson);

  if (keys.length > MAX_CUSTOM_TRACKER_VALUES_JSON_KEYS) {
    errors.push("values_json has too many fields");
  }

  for (const key of keys) {
    if (key.trim().length === 0) errors.push("values_json field key cannot be empty");
    if (key.length > 120) errors.push("values_json field key is too long");
    if (key !== key.trim()) errors.push("values_json field key cannot contain leading or trailing whitespace");
  }

  return errors;
}

export function validateCustomTrackerEntryDate(entryDateIso: string): ReadonlyArray<string> {
  const errors: string[] = [];

  if (entryDateIso.trim().length === 0) {
    return ["entry date is required"];
  }

  if (!/^\\d{4}-\\d{2}-\\d{2}$/.test(entryDateIso)) {
    errors.push("entry date must use YYYY-MM-DD format");
  }

  if (Number.isNaN(Date.parse(entryDateIso))) {
    errors.push("entry date must be parseable");
  }

  return errors;
}

export function validateCustomTrackerEntryNotes(notes: string): ReadonlyArray<string> {
  const errors: string[] = [];

  if (notes.length > MAX_CUSTOM_TRACKER_ENTRY_NOTE_LENGTH) {
    errors.push("entry notes are too long");
  }

  return errors;
}

export function buildCustomTrackerFieldDefinitionFromCore(field: CustomTrackerFieldCoreRecord): CustomTrackerFieldDefinitionInput {
  return {
    stableKey: field.stableKey,
    displayName: field.displayName,
    fieldKind: field.fieldKind,
    required: field.required,
    orderIndex: field.orderIndex,
    privacyLevel: field.privacyLevel,
  };
}

export function detectCustomTrackerEntryDuplicate(
  entry: CustomTrackerEntryCoreRecord,
  existingEntries: ReadonlyArray<CustomTrackerEntryCoreRecord>,
  duplicatePolicy: CustomTrackerDuplicatePolicy = DEFAULT_DUPLICATE_POLICY,
): CustomTrackerEntryDuplicateResult {
  const duplicateEntryIds = existingEntries
    .filter((candidate) =>
      candidate.id !== entry.id &&
      candidate.trackerId === entry.trackerId &&
      candidate.userId === entry.userId &&
      candidate.entryDateIso === entry.entryDateIso &&
      candidate.status !== "archived"
    )
    .map((candidate) => candidate.id);

  const hasSameDayDuplicate = duplicateEntryIds.length > 0;

  return {
    hasSameDayDuplicate,
    duplicateEntryIds,
    warning: hasSameDayDuplicate ? "same-day duplicate entry found" : null,
    blocking: hasSameDayDuplicate && duplicatePolicy === "block_same_day",
  };
}

export function validateCustomTrackerEntry(input: CustomTrackerEntryValidationInput): CustomTrackerEntryValidationResult {
  const unknownFieldPolicy = input.unknownFieldPolicy ?? DEFAULT_UNKNOWN_FIELD_POLICY;
  const validationMode = input.validationMode ?? DEFAULT_ENTRY_VALIDATION_MODE;
  const duplicatePolicy = input.duplicatePolicy ?? DEFAULT_DUPLICATE_POLICY;
  const errors: string[] = [];
  const warnings: string[] = [];
  const fieldIssues: CustomTrackerEntryFieldIssue[] = [];
  const normalizedValuesJson: Record<string, unknown> = {};
  const quarantinedFieldKeys = new Set<string>();

  if (input.entry.trackerId !== input.trackerId) {
    errors.push("entry tracker ownership mismatch");
    fieldIssues.push({
      kind: "ownership_mismatch",
      fieldKey: "trackerId",
      message: "entry tracker ownership mismatch",
      quarantined: false,
    });
  }

  if (input.entry.userId !== input.userId) {
    errors.push("entry user ownership mismatch");
    fieldIssues.push({
      kind: "ownership_mismatch",
      fieldKey: "userId",
      message: "entry user ownership mismatch",
      quarantined: false,
    });
  }

  const dateErrors = validateCustomTrackerEntryDate(input.entry.entryDateIso);
  for (const message of dateErrors) {
    errors.push(message);
    fieldIssues.push({
      kind: "invalid_entry_date",
      fieldKey: "entryDateIso",
      message,
      quarantined: false,
    });
  }

  const noteErrors = validateCustomTrackerEntryNotes(input.entry.notes);
  for (const message of noteErrors) {
    errors.push(message);
    fieldIssues.push({
      kind: "invalid_notes",
      fieldKey: "notes",
      message,
      quarantined: false,
    });
  }

  const valuesShapeErrors = validateCustomTrackerValuesJsonShape(input.entry.valuesJson);
  for (const message of valuesShapeErrors) {
    errors.push(message);
    fieldIssues.push({
      kind: "unsafe_values_json",
      fieldKey: "values_json",
      message,
      quarantined: false,
    });
  }

  const safeValuesJson = isPlainCustomTrackerValuesJson(input.entry.valuesJson) ? input.entry.valuesJson : {};
  const fieldMap = new Map(input.fields.map((field) => [field.stableKey, field]));
  const knownFieldKeys = new Set(input.fields.map((field) => field.stableKey));

  for (const field of input.fields) {
    if (field.status === "deprecated") continue;

    const hasValue = Object.prototype.hasOwnProperty.call(safeValuesJson, field.stableKey);
    const value = safeValuesJson[field.stableKey];

    if (!hasValue && field.required) {
      errors.push("required field value is missing: " + field.stableKey);
      fieldIssues.push({
        kind: "missing_required",
        fieldKey: field.stableKey,
        message: "required field value is missing",
        quarantined: validationMode === "quarantine_invalid",
      });
      if (validationMode === "quarantine_invalid") quarantinedFieldKeys.add(field.stableKey);
      continue;
    }

    if (!hasValue) continue;

    const fieldDefinition = buildCustomTrackerFieldDefinitionFromCore(field);
    const valueResult = validateCustomTrackerFieldValue({ field: fieldDefinition, value });

    if (!valueResult.valid) {
      for (const message of valueResult.errors) {
        errors.push(field.stableKey + ": " + message);
        fieldIssues.push({
          kind: "invalid_value",
          fieldKey: field.stableKey,
          message,
          quarantined: validationMode === "quarantine_invalid",
        });
      }
      if (validationMode === "quarantine_invalid") quarantinedFieldKeys.add(field.stableKey);
    } else {
      normalizedValuesJson[field.stableKey] = valueResult.normalizedValue;
    }

    for (const warning of valueResult.warnings) {
      warnings.push(field.stableKey + ": " + warning);
    }
  }

  for (const key of Object.keys(safeValuesJson)) {
    if (knownFieldKeys.has(key)) continue;

    const decision = decideUnknownCustomTrackerField(unknownFieldPolicy);
    const issue: CustomTrackerEntryFieldIssue = {
      kind: "unknown_field",
      fieldKey: key,
      message: decision.reason,
      quarantined: decision.quarantined,
    };

    fieldIssues.push(issue);

    if (decision.quarantined) {
      warnings.push(key + ": " + decision.reason);
      quarantinedFieldKeys.add(key);
    } else {
      errors.push(key + ": " + decision.reason);
    }
  }

  const duplicateResult = detectCustomTrackerEntryDuplicate(input.entry, input.existingEntries, duplicatePolicy);

  if (duplicateResult.warning !== null) {
    warnings.push(duplicateResult.warning);
    fieldIssues.push({
      kind: "duplicate_entry",
      fieldKey: "entryDateIso",
      message: duplicateResult.warning,
      quarantined: false,
    });
  }

  if (duplicateResult.blocking) {
    errors.push("same-day duplicate entry is blocked");
  }

  const hasQuarantinedFields = quarantinedFieldKeys.size > 0;
  const valid = errors.length === 0 && !duplicateResult.blocking;

  return {
    status: valid ? "valid" : hasQuarantinedFields ? "quarantined" : "invalid",
    valid,
    errors,
    warnings,
    fieldIssues,
    quarantinedFieldKeys: [...quarantinedFieldKeys],
    normalizedValuesJson,
    duplicateResult,
  };
}

export function summarizeCustomTrackerEntryValidationResults(
  results: ReadonlyArray<CustomTrackerEntryValidationResult>,
): CustomTrackerEntryValidationSummary {
  return {
    validEntryCount: results.filter((result) => result.status === "valid").length,
    invalidEntryCount: results.filter((result) => result.status === "invalid").length,
    quarantinedEntryCount: results.filter((result) => result.status === "quarantined").length,
    duplicateWarningCount: results.filter((result) => result.duplicateResult.hasSameDayDuplicate).length,
    unknownFieldIssueCount: results.flatMap((result) => result.fieldIssues).filter((issue) => issue.kind === "unknown_field").length,
    invalidValueIssueCount: results.flatMap((result) => result.fieldIssues).filter((issue) => issue.kind === "invalid_value").length,
    missingRequiredIssueCount: results.flatMap((result) => result.fieldIssues).filter((issue) => issue.kind === "missing_required").length,
  };
}

export function assertNoFakeCustomTrackerEntryRuntimeData(entries: ReadonlyArray<CustomTrackerEntryCoreRecord>): boolean {
  return entries.every((entry) => {
    const notes = entry.notes.toLowerCase();
    return !notes.includes("demo") && !notes.includes("fake") && !notes.includes("sample user");
  });
}

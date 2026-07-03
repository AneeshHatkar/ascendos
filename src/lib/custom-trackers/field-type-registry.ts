import {
  CUSTOM_TRACKER_PRIVACY_LEVELS,
  type CustomTrackerCoreFieldKind,
  type CustomTrackerPrivacyLevel,
} from "./core-tracker-domain-contracts";

export type CustomTrackerUnknownFieldPolicy =
  | "reject"
  | "quarantine";

export type CustomTrackerFieldValueValidationStatus =
  | "valid"
  | "invalid"
  | "quarantined";

export type CustomTrackerFieldUnitKind =
  | "none"
  | "count"
  | "minutes"
  | "hours"
  | "days"
  | "calories"
  | "grams"
  | "kilograms"
  | "percentage"
  | "currency"
  | "custom";

export type CustomTrackerFieldNormalizationKind =
  | "none"
  | "lowercase_text"
  | "trimmed_text"
  | "number_min_max"
  | "rating_scale"
  | "date_iso"
  | "duration_minutes"
  | "option_key";

export type CustomTrackerFieldOption = {
  key: string;
  label: string;
  archived: boolean;
};

export type CustomTrackerFieldOptionsJson = {
  options: ReadonlyArray<CustomTrackerFieldOption>;
  allowCustomOption: boolean;
};

export type CustomTrackerFieldValidationRule = {
  fieldKind: CustomTrackerCoreFieldKind;
  requiresOptions: boolean;
  supportsOptions: boolean;
  supportsUnit: boolean;
  supportsNormalization: boolean;
  defaultUnitKind: CustomTrackerFieldUnitKind;
  defaultNormalizationKind: CustomTrackerFieldNormalizationKind;
};

export type CustomTrackerFieldDefinitionInput = {
  stableKey: string;
  displayName: string;
  fieldKind: CustomTrackerCoreFieldKind;
  required: boolean;
  orderIndex: number;
  privacyLevel: CustomTrackerPrivacyLevel;
  optionsJson?: CustomTrackerFieldOptionsJson;
  unitKind?: CustomTrackerFieldUnitKind;
  normalizationKind?: CustomTrackerFieldNormalizationKind;
};

export type CustomTrackerFieldValueValidationInput = {
  field: CustomTrackerFieldDefinitionInput;
  value: unknown;
};

export type CustomTrackerFieldValidationResult = {
  status: CustomTrackerFieldValueValidationStatus;
  valid: boolean;
  errors: ReadonlyArray<string>;
  warnings: ReadonlyArray<string>;
  normalizedValue: unknown;
};

export type CustomTrackerUnknownFieldDecision = {
  policy: CustomTrackerUnknownFieldPolicy;
  accepted: boolean;
  quarantined: boolean;
  reason: string;
};

export type CustomTrackerFieldRegistrySummary = {
  fieldKindCount: number;
  optionBackedFieldKindCount: number;
  unitBackedFieldKindCount: number;
  normalizationBackedFieldKindCount: number;
};

export const CUSTOM_TRACKER_FIELD_KINDS: ReadonlyArray<CustomTrackerCoreFieldKind> = [
  "text",
  "number",
  "boolean",
  "date",
  "rating",
  "select",
  "multi_select",
  "duration",
  "json",
];

export const CUSTOM_TRACKER_FIELD_UNIT_KINDS: ReadonlyArray<CustomTrackerFieldUnitKind> = [
  "none",
  "count",
  "minutes",
  "hours",
  "days",
  "calories",
  "grams",
  "kilograms",
  "percentage",
  "currency",
  "custom",
];

export const CUSTOM_TRACKER_FIELD_NORMALIZATION_KINDS: ReadonlyArray<CustomTrackerFieldNormalizationKind> = [
  "none",
  "lowercase_text",
  "trimmed_text",
  "number_min_max",
  "rating_scale",
  "date_iso",
  "duration_minutes",
  "option_key",
];

export const CUSTOM_TRACKER_FIELD_VALIDATION_RULES: ReadonlyArray<CustomTrackerFieldValidationRule> = [
  {
    fieldKind: "text",
    requiresOptions: false,
    supportsOptions: false,
    supportsUnit: false,
    supportsNormalization: true,
    defaultUnitKind: "none",
    defaultNormalizationKind: "trimmed_text",
  },
  {
    fieldKind: "number",
    requiresOptions: false,
    supportsOptions: false,
    supportsUnit: true,
    supportsNormalization: true,
    defaultUnitKind: "count",
    defaultNormalizationKind: "number_min_max",
  },
  {
    fieldKind: "boolean",
    requiresOptions: false,
    supportsOptions: false,
    supportsUnit: false,
    supportsNormalization: false,
    defaultUnitKind: "none",
    defaultNormalizationKind: "none",
  },
  {
    fieldKind: "date",
    requiresOptions: false,
    supportsOptions: false,
    supportsUnit: false,
    supportsNormalization: true,
    defaultUnitKind: "none",
    defaultNormalizationKind: "date_iso",
  },
  {
    fieldKind: "rating",
    requiresOptions: false,
    supportsOptions: false,
    supportsUnit: false,
    supportsNormalization: true,
    defaultUnitKind: "none",
    defaultNormalizationKind: "rating_scale",
  },
  {
    fieldKind: "select",
    requiresOptions: true,
    supportsOptions: true,
    supportsUnit: false,
    supportsNormalization: true,
    defaultUnitKind: "none",
    defaultNormalizationKind: "option_key",
  },
  {
    fieldKind: "multi_select",
    requiresOptions: true,
    supportsOptions: true,
    supportsUnit: false,
    supportsNormalization: true,
    defaultUnitKind: "none",
    defaultNormalizationKind: "option_key",
  },
  {
    fieldKind: "duration",
    requiresOptions: false,
    supportsOptions: false,
    supportsUnit: true,
    supportsNormalization: true,
    defaultUnitKind: "minutes",
    defaultNormalizationKind: "duration_minutes",
  },
  {
    fieldKind: "json",
    requiresOptions: false,
    supportsOptions: false,
    supportsUnit: false,
    supportsNormalization: false,
    defaultUnitKind: "none",
    defaultNormalizationKind: "none",
  },
];

export const DEFAULT_UNKNOWN_FIELD_POLICY: CustomTrackerUnknownFieldPolicy = "reject";

export function isAllowedCustomTrackerFieldKind(fieldKind: string): fieldKind is CustomTrackerCoreFieldKind {
  return CUSTOM_TRACKER_FIELD_KINDS.includes(fieldKind as CustomTrackerCoreFieldKind);
}

export function getCustomTrackerFieldRule(fieldKind: CustomTrackerCoreFieldKind): CustomTrackerFieldValidationRule | null {
  return CUSTOM_TRACKER_FIELD_VALIDATION_RULES.find((rule) => rule.fieldKind === fieldKind) ?? null;
}

export function normalizeCustomTrackerFieldOptionKey(input: string): string {
  return input
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .slice(0, 80);
}

export function validateCustomTrackerFieldOptionsJson(
  fieldKind: CustomTrackerCoreFieldKind,
  optionsJson: CustomTrackerFieldOptionsJson | undefined,
): ReadonlyArray<string> {
  const errors: string[] = [];
  const rule = getCustomTrackerFieldRule(fieldKind);

  if (rule === null) {
    return ["field kind is not registered"];
  }

  if (rule.requiresOptions && optionsJson === undefined) {
    errors.push("field options are required for this field kind");
  }

  if (!rule.supportsOptions && optionsJson !== undefined) {
    errors.push("field options are not supported for this field kind");
  }

  if (optionsJson === undefined) {
    return errors;
  }

  if (!Array.isArray(optionsJson.options)) {
    errors.push("field options must be an array");
    return errors;
  }

  if (optionsJson.options.length === 0 && rule.requiresOptions) {
    errors.push("at least one option is required");
  }

  const optionKeys = new Set<string>();

  for (const option of optionsJson.options) {
    const normalizedKey = normalizeCustomTrackerFieldOptionKey(option.key);

    if (normalizedKey.length === 0) {
      errors.push("option key is required");
    }

    if (option.key !== normalizedKey) {
      errors.push("option key must be normalized");
    }

    if (option.label.trim().length === 0) {
      errors.push("option label is required");
    }

    if (optionKeys.has(normalizedKey)) {
      errors.push("option keys must be unique");
    }

    optionKeys.add(normalizedKey);
  }

  return errors;
}

export function validateCustomTrackerFieldDefinition(input: CustomTrackerFieldDefinitionInput): CustomTrackerFieldValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (input.stableKey.trim().length === 0) errors.push("field stable key is required");
  if (input.displayName.trim().length === 0) errors.push("field display name is required");
  if (!isAllowedCustomTrackerFieldKind(input.fieldKind)) errors.push("field kind is not allowed");
  if (input.orderIndex < 0) errors.push("field order index cannot be negative");
  if (!Number.isInteger(input.orderIndex)) errors.push("field order index must be an integer");
  if (!CUSTOM_TRACKER_PRIVACY_LEVELS.includes(input.privacyLevel)) errors.push("field privacy level is not allowed");

  const rule = getCustomTrackerFieldRule(input.fieldKind);

  if (rule === null) {
    errors.push("field validation rule is missing");
  } else {
    errors.push(...validateCustomTrackerFieldOptionsJson(input.fieldKind, input.optionsJson));

    if (input.unitKind !== undefined && !CUSTOM_TRACKER_FIELD_UNIT_KINDS.includes(input.unitKind)) {
      errors.push("field unit kind is not allowed");
    }

    if (input.normalizationKind !== undefined && !CUSTOM_TRACKER_FIELD_NORMALIZATION_KINDS.includes(input.normalizationKind)) {
      errors.push("field normalization kind is not allowed");
    }

    if (!rule.supportsUnit && input.unitKind !== undefined && input.unitKind !== "none") {
      warnings.push("field unit will be ignored for this field kind");
    }

    if (!rule.supportsNormalization && input.normalizationKind !== undefined && input.normalizationKind !== "none") {
      warnings.push("field normalization will be ignored for this field kind");
    }
  }

  return {
    status: errors.length === 0 ? "valid" : "invalid",
    valid: errors.length === 0,
    errors,
    warnings,
    normalizedValue: null,
  };
}

export function validateCustomTrackerFieldValue(input: CustomTrackerFieldValueValidationInput): CustomTrackerFieldValidationResult {
  const definitionResult = validateCustomTrackerFieldDefinition(input.field);

  if (!definitionResult.valid) {
    return definitionResult;
  }

  const errors: string[] = [];
  const warnings: string[] = [];
  const value = input.value;

  if (value === null || value === undefined || value === "") {
    if (input.field.required) errors.push("required field value is missing");
    return {
      status: errors.length === 0 ? "valid" : "invalid",
      valid: errors.length === 0,
      errors,
      warnings,
      normalizedValue: value,
    };
  }

  if (input.field.fieldKind === "text" && typeof value !== "string") {
    errors.push("text field value must be a string");
  }

  if (input.field.fieldKind === "number" && (typeof value !== "number" || !Number.isFinite(value))) {
    errors.push("number field value must be a finite number");
  }

  if (input.field.fieldKind === "boolean" && typeof value !== "boolean") {
    errors.push("boolean field value must be true or false");
  }

  if (input.field.fieldKind === "date") {
    if (typeof value !== "string" || Number.isNaN(Date.parse(value))) {
      errors.push("date field value must be an ISO-compatible date string");
    }
  }

  if (input.field.fieldKind === "rating") {
    if (typeof value !== "number" || !Number.isInteger(value) || value < 1 || value > 10) {
      errors.push("rating field value must be an integer between 1 and 10");
    }
  }

  if (input.field.fieldKind === "duration") {
    if (typeof value !== "number" || !Number.isFinite(value) || value < 0) {
      errors.push("duration field value must be a non-negative finite number");
    }
  }

  if (input.field.fieldKind === "json") {
    if (typeof value !== "object" || value === null || Array.isArray(value)) {
      errors.push("json field value must be an object");
    }
  }

  if (input.field.fieldKind === "select") {
    if (typeof value !== "string") {
      errors.push("select field value must be an option key");
    } else if (!isAllowedCustomTrackerOptionValue(input.field, value)) {
      errors.push("select field value must match an active option key");
    }
  }

  if (input.field.fieldKind === "multi_select") {
    if (!Array.isArray(value) || value.some((item) => typeof item !== "string")) {
      errors.push("multi-select field value must be an array of option keys");
    } else {
      const invalidOption = value.find((item) => !isAllowedCustomTrackerOptionValue(input.field, item));
      if (invalidOption !== undefined) errors.push("multi-select field values must match active option keys");
    }
  }

  return {
    status: errors.length === 0 ? "valid" : "invalid",
    valid: errors.length === 0,
    errors,
    warnings,
    normalizedValue: normalizeCustomTrackerFieldValue(input.field, value),
  };
}

export function isAllowedCustomTrackerOptionValue(field: CustomTrackerFieldDefinitionInput, optionKey: string): boolean {
  const normalizedKey = normalizeCustomTrackerFieldOptionKey(optionKey);
  return field.optionsJson?.options.some((option) => !option.archived && option.key === normalizedKey) ?? false;
}

export function normalizeCustomTrackerFieldValue(field: CustomTrackerFieldDefinitionInput, value: unknown): unknown {
  if (value === null || value === undefined) return value;

  if (field.fieldKind === "text" && typeof value === "string") {
    return field.normalizationKind === "lowercase_text" ? value.trim().toLowerCase() : value.trim();
  }

  if (field.fieldKind === "select" && typeof value === "string") {
    return normalizeCustomTrackerFieldOptionKey(value);
  }

  if (field.fieldKind === "multi_select" && Array.isArray(value)) {
    return value.map((item) => typeof item === "string" ? normalizeCustomTrackerFieldOptionKey(item) : item);
  }

  if (field.fieldKind === "date" && typeof value === "string" && !Number.isNaN(Date.parse(value))) {
    return new Date(value).toISOString().slice(0, 10);
  }

  return value;
}

export function decideUnknownCustomTrackerField(policy: CustomTrackerUnknownFieldPolicy = DEFAULT_UNKNOWN_FIELD_POLICY): CustomTrackerUnknownFieldDecision {
  if (policy === "quarantine") {
    return {
      policy,
      accepted: false,
      quarantined: true,
      reason: "unknown field is quarantined for review",
    };
  }

  return {
    policy,
    accepted: false,
    quarantined: false,
    reason: "unknown field is rejected",
  };
}

export function summarizeCustomTrackerFieldRegistry(): CustomTrackerFieldRegistrySummary {
  return {
    fieldKindCount: CUSTOM_TRACKER_FIELD_VALIDATION_RULES.length,
    optionBackedFieldKindCount: CUSTOM_TRACKER_FIELD_VALIDATION_RULES.filter((rule) => rule.supportsOptions).length,
    unitBackedFieldKindCount: CUSTOM_TRACKER_FIELD_VALIDATION_RULES.filter((rule) => rule.supportsUnit).length,
    normalizationBackedFieldKindCount: CUSTOM_TRACKER_FIELD_VALIDATION_RULES.filter((rule) => rule.supportsNormalization).length,
  };
}

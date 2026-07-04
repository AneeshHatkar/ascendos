import { existsSync, readFileSync } from "node:fs";

const contractPath = "docs/contracts/PHASE_20Q_CROSS_PHASE_PRIVACY_ENFORCEMENT_MAP.md";
const fixturePath = "docs/fixtures/phase20-privacy-export/phase20q_cross_phase_privacy_enforcement_fixture.json";
const reportPath = "docs/phase-reports/PHASE_20Q_CROSS_PHASE_PRIVACY_ENFORCEMENT_MAP_REPORT.md";

function read(path) {
  if (!existsSync(path)) throw new Error(path + " missing");
  return readFileSync(path, "utf8");
}

const contract = read(contractPath);
const fixture = JSON.parse(read(fixturePath));
read(reportPath);

const required = [
  "Cross-Phase Privacy Enforcement Map",
  "Needs live database schema: false",
  "Enforcement Principles",
  "Phase 20 privacy rules are not isolated to the /privacy route.",
  "Private Mode must block memory, analytics, connector, Spotify, and broad dashboard exposure where defined.",
  "Emergency Lockdown must override normal cross-phase behavior.",
  "Forgotten memory cannot re-enter Carnos context through Phase 17 memory RAG, audit payloads, analytics snapshots, documents, or timeline.",
  "Connector and Spotify data must preserve token boundaries across all phases.",
  "Phase Links",
  "13.5 — settings_privacy_foundation",
  "15 — memory_private_mode_do_not_remember",
  "16 — current_info_source_review",
  "17 — memory_rag_privacy",
  "18 — analytics_experiments",
  "19 — custom_trackers",
  "dashboards — dashboard_surfaces",
  "carnos — carnos_context_and_actions",
  "documents_evidence — documents_sources_evidence",
  "export_forget_destructive — data_control_actions",
  "connectors_future — external_api_connectors",
  "spotify — spotify_connector",
  "Memory candidates must obey Phase 20 memory inbox rules.",
  "Memory RAG context packs must apply Phase 20 Carnos access matrix.",
  "Analytics inputs must obey domain privacy permissions.",
  "Custom tracker Carnos permissions must obey Phase 20 Carnos access matrix.",
  "Carnos cannot access connector tokens.",
  "Carnos cannot access Spotify tokens.",
  "Spotify recently played data is sensitive by default.",
  "Cross-Surface Enforcement Matrix",
  "memory_inbox",
  "saved_memories",
  "dashboards",
  "timeline",
  "analytics",
  "carnos_context",
  "export_preview",
  "forget_destructive_manifest",
  "audit_viewer",
  "connectors",
  "spotify",
  "Enforcement Order",
  "ownership_boundary",
  "emergency_lockdown",
  "private_mode",
  "sensitive_lock",
  "domain_privacy_permission",
  "do_not_remember_or_forgotten_state",
  "hidden_or_archived_state",
  "carnos_access_matrix",
  "redaction_level",
  "data_scope_selector",
  "review_queue",
  "two_step_confirmation",
  "cooldown_boundary",
  "manifest_requirement",
  "retention_policy",
  "audit_append_only_boundary",
  "connector_or_spotify_token_boundary",
  "Blocked Reasons",
  "cross_phase_rule_missing",
  "forgotten_memory_blocks_context",
  "hidden_data_blocks_dashboard",
  "archived_data_blocks_active_use",
  "carnos_access_matrix_blocks_use",
  "connector_token_boundary",
  "spotify_token_boundary",
  "spotify_recently_played_sensitive",
  "Audit Events Required",
  "cross_phase_privacy_rule_checked",
  "cross_phase_privacy_rule_blocked",
  "cross_phase_dashboard_access_blocked",
  "cross_phase_carnos_context_blocked",
  "cross_phase_connector_boundary_enforced",
  "cross_phase_spotify_boundary_enforced",
  "Badge Requirements",
  "Cross Phase Checked",
  "Cross Phase Blocked",
  "Carnos Context Blocked",
  "Connector Boundary",
  "Spotify Boundary",
  "Token Hidden",
  "Recently Played Sensitive",
  "Must Not Do",
  "do not create migrations in 20Q",
  "do not invent cross-phase persistence schema in 20Q",
  "do not implement runtime privacy guards in 20Q",
  "do not implement dashboard adapters in 20Q",
  "do not implement Carnos context filtering in 20Q",
  "do not implement connector authorization in 20Q",
  "do not implement Spotify authorization in 20Q",
  "do not let any phase reintroduce forgotten memory",
  "do not let any phase expose connector tokens",
  "do not let any phase expose Spotify tokens",
  "Acceptance",
];

const missing = required.filter(marker => !contract.includes(marker));
if (fixture.schema_requirement.needs_live_database_schema !== false) missing.push("schema requirement should be false");
if (fixture.enforcement_principles.length < 10) missing.push("enforcement principles incomplete");
if (fixture.phase_links.length < 12) missing.push("phase links incomplete");
if (fixture.cross_surface_enforcement_matrix.length < 10) missing.push("cross-surface matrix incomplete");
if (fixture.enforcement_order.length < 16) missing.push("enforcement order incomplete");
if (fixture.blocked_reasons.length < 20) missing.push("blocked reasons incomplete");
if (fixture.audit_events_required.length < 14) missing.push("audit events incomplete");
if (fixture.badge_requirements.length < 16) missing.push("badge requirements incomplete");

if (missing.length > 0) {
  console.error("Phase 20Q audit failed. Missing or incomplete items:");
  for (const item of missing) console.error("- " + item);
  process.exit(1);
}

console.log("✓ Phase 20Q cross-phase privacy enforcement audit passed.");
console.log("✓ Phase links, cross-surface matrix, enforcement order, connectors, Spotify, Carnos, audit, and badges are locked.");

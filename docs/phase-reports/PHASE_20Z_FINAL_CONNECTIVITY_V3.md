# Phase 0–20 Final Connectivity Verification v3

Status: **PASS_WITH_REVIEW_NOTES**

Generated: 2026-07-06T12:04:54.616Z

This is the decision-grade pre-Phase-21 connectivity report. It verifies the whole project across source-of-truth files, routes, APIs, SQL migrations, RLS, repositories, helper/view-model layers, components, import graph, npm checks, post-v1 boundaries, and feature-domain connectivity.

It separates real blockers from review notes. Review notes are not proof of broken app code.

## 1. Hard Blockers

- None

## 2. Review Notes

- Script-only broken import strings: 148. Not app runtime breakage because sourceBrokenImports is 0.
- Feature chains requiring human review but not blocked: Health / body / nutrition / sleep / emotion / hair skincare; Life admin / finance / housing / documents; Grimoire
- Created tables without direct repository evidence: 8. Review whether these are auth/system/memory-write-only/internal tables.
- Source risk/boundary markers found: 784. Many are expected read-only/post-v1/audit truth labels.
- Workspace is dirty by design. Do not commit until all chosen fixes/reports are reviewed.

## 3. Git State

```text
HEAD: abc3343 Use Athena as assistant display identity

M docs/audits/PHASE_1_13_5_FULL_SOURCE_SCOPE_AUDIT.md
?? "I am continuing the ascendOS.docx"
?? docs/fixtures/full-project-connectivity/phase_0_20_actual_connectivity_v2.json
?? docs/fixtures/full-project-connectivity/phase_0_20_exact_chain_connectivity_v4.json
?? docs/fixtures/full-project-connectivity/phase_0_20_final_connectivity_v3.json
?? docs/fixtures/full-project-connectivity/phase_0_20_full_project_feature_connectivity.json
?? docs/fixtures/full-project-connectivity/phase_0_20_total_project_connectivity.json
?? docs/phase-reports/DELEGATED_PAGE_DATA_FLOW_AUDIT.md
?? docs/phase-reports/DOMAIN_OPERATIONAL_MATRIX_AUDIT.md
?? docs/phase-reports/FULL_SYSTEM_INTERCONNECTION_TRUTH_AUDIT.md
?? docs/phase-reports/PHASE_20Z_ACTUAL_PROJECT_CONNECTIVITY_V2.md
?? docs/phase-reports/PHASE_20Z_EXACT_CHAIN_CONNECTIVITY_V4.md
?? docs/phase-reports/PHASE_20Z_FINAL_CONNECTIVITY_V3.md
?? docs/phase-reports/PHASE_20Z_FULL_PROJECT_FEATURE_CONNECTIVITY_VERIFICATION.md
?? docs/phase-reports/PHASE_20Z_I_PRE_PHASE_21_READINESS_AUDIT.md
?? docs/phase-reports/PHASE_20Z_J_FULL_PROJECT_PHASE_0_20_TRUTH_AUDIT.md
?? docs/phase-reports/PHASE_20Z_TOTAL_PROJECT_PHASE_0_20_CONNECTIVITY_VERIFICATION.md
?? scripts/audit-delegated-page-data-flow.mjs
?? scripts/audit-domain-operational-matrix.mjs
?? scripts/audit-full-system-interconnection-truth.mjs
?? scripts/verify-full-project-phase-connectivity.mjs
?? scripts/verify-phase-0-20-actual-connectivity-v2.mjs
?? scripts/verify-phase-0-20-exact-chain-v4.mjs
?? scripts/verify-phase-0-20-final-connectivity-v3.mjs
?? scripts/verify-phase-0-20-total-project-connectivity.mjs
?? supabase/.temp/
```

## 4. Counts

```json
{
  "totalFiles": 2481,
  "textFiles": 1142,
  "codeFiles": 501,
  "totalLines": 538234,
  "routes": 37,
  "apiRoutes": 15,
  "migrations": 29,
  "createdTables": 120,
  "rlsTables": 120,
  "repoFiles": 16,
  "repoEvidenceTables": 113,
  "helperFiles": 54,
  "componentFiles": 110,
  "importEdges": 918,
  "brokenImports": 148,
  "sourceBrokenImports": 0,
  "scriptBrokenImports": 148,
  "sourceRiskMarkers": 784
}
```

## 5. Feature Connectivity Matrix

| Feature | Phase | Status | Routes | Tables | Repository evidence | Helpers/ViewModels | Components | Direct route runtime | Delegated runtime | Runtime connected | Boundary | Blockers | Review notes |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Command dashboard | 0–7 | PASS | /command <= [/command] | calendar_blocks<br>goal_milestones<br>goals<br>proof_items<br>tasks | financial_accounts ← src/lib/repositories/admin-finance-read.ts (supabase-from-or-rpc)<br>budget_categories ← src/lib/repositories/admin-finance-read.ts (supabase-from-or-rpc)<br>financial_logs ← src/lib/repositories/admin-finance-read.ts (supabase-from-or-rpc)<br>subscriptions ← src/lib/repositories/admin-finance-read.ts (supabase-from-or-rpc)<br>documents ← src/lib/repositories/admin-finance-read.ts (supabase-from-or-rpc)<br>housing_options ← src/lib/repositories/admin-finance-read.ts (supabase-from-or-rpc)<br>housing_contacts ← src/lib/repositories/admin-finance-read.ts (supabase-from-or-rpc)<br>reminders ← src/lib/repositories/admin-finance-read.ts (supabase-from-or-rpc)<br>carnos_entity_state ← src/lib/repositories/approved-memory-write.ts (repository-text-reference)<br>events ← src/lib/repositories/approved-memory-write.ts (repository-text-reference)<br>memory_candidates ← src/lib/repositories/approved-memory-write.ts (repository-text-reference)<br>memory_events ← src/lib/repositories/approved-memory-write.ts (repository-text-reference)<br>memory_items ← src/lib/repositories/approved-memory-write.ts (repository-text-reference)<br>calendar_blocks ← src/lib/repositories/calendar-routine-read.ts (supabase-from-or-rpc)<br>routines ← src/lib/repositories/calendar-routine-read.ts (supabase-from-or-rpc)<br>routine_steps ← src/lib/repositories/calendar-routine-read.ts (supabase-from-or-rpc)<br>reminders ← src/lib/repositories/calendar-routine-read.ts (supabase-from-or-rpc)<br>behavioral_stories ← src/lib/repositories/career-prep-read.ts (supabase-from-or-rpc)<br>... 86 more | src/lib/analytics-experiments/analytics-dashboard-view-model.ts<br>src/lib/analytics-experiments/analytics-repository-boundary.ts<br>src/lib/analytics-experiments/anti-demo-data-privacy-audit.ts<br>src/lib/analytics-experiments/carnos-analytics-explanation-boundary.ts<br>src/lib/analytics-experiments/experiment-evaluation-engine.ts<br>src/lib/analytics-experiments/index.ts<br>src/lib/analytics-experiments/metric-registry.ts<br>src/lib/analytics-experiments/phase18-completion-proof.ts<br>src/lib/analytics-experiments/self-experiment-contracts.ts<br>src/lib/custom-trackers/core-tracker-domain-contracts.ts<br>... 26 more | src/components/analytics-experiments/analytics-dashboard-ui.tsx<br>src/components/calendar/calendar-timeline-proposal-composer.tsx<br>src/components/custom-trackers/custom-trackers-dashboard-ui.tsx<br>src/components/dashboard/admin-finance-dashboard-v1.tsx<br>src/components/dashboard/approved-memory-read-layer-panel.tsx<br>src/components/dashboard/authenticated-dashboard-shell.tsx<br>src/components/dashboard/calendar-dashboard-v1.tsx<br>src/components/dashboard/career-current-info-source-panel.tsx<br>src/components/dashboard/career-dashboard-v1.tsx<br>src/components/dashboard/career-evidence-linkage-panel.tsx<br>... 73 more | yes | yes | yes | yes |  |  |
| Goals / proof / tasks | 2–8 | PASS | /goals <= [/goals] | goal_milestones<br>goals<br>project_milestones<br>proof_items<br>tasks | financial_accounts ← src/lib/repositories/admin-finance-read.ts (supabase-from-or-rpc)<br>budget_categories ← src/lib/repositories/admin-finance-read.ts (supabase-from-or-rpc)<br>financial_logs ← src/lib/repositories/admin-finance-read.ts (supabase-from-or-rpc)<br>subscriptions ← src/lib/repositories/admin-finance-read.ts (supabase-from-or-rpc)<br>documents ← src/lib/repositories/admin-finance-read.ts (supabase-from-or-rpc)<br>housing_options ← src/lib/repositories/admin-finance-read.ts (supabase-from-or-rpc)<br>housing_contacts ← src/lib/repositories/admin-finance-read.ts (supabase-from-or-rpc)<br>reminders ← src/lib/repositories/admin-finance-read.ts (supabase-from-or-rpc)<br>carnos_entity_state ← src/lib/repositories/approved-memory-write.ts (repository-text-reference)<br>events ← src/lib/repositories/approved-memory-write.ts (repository-text-reference)<br>memory_candidates ← src/lib/repositories/approved-memory-write.ts (repository-text-reference)<br>memory_events ← src/lib/repositories/approved-memory-write.ts (repository-text-reference)<br>memory_items ← src/lib/repositories/approved-memory-write.ts (repository-text-reference)<br>calendar_blocks ← src/lib/repositories/calendar-routine-read.ts (supabase-from-or-rpc)<br>routines ← src/lib/repositories/calendar-routine-read.ts (supabase-from-or-rpc)<br>routine_steps ← src/lib/repositories/calendar-routine-read.ts (supabase-from-or-rpc)<br>reminders ← src/lib/repositories/calendar-routine-read.ts (supabase-from-or-rpc)<br>behavioral_stories ← src/lib/repositories/career-prep-read.ts (supabase-from-or-rpc)<br>... 80 more | src/lib/analytics-experiments/anti-demo-data-privacy-audit.ts<br>src/lib/analytics-experiments/carnos-analytics-explanation-boundary.ts<br>src/lib/analytics-experiments/experiment-evaluation-engine.ts<br>src/lib/analytics-experiments/index.ts<br>src/lib/analytics-experiments/metric-registry.ts<br>src/lib/analytics-experiments/phase18-completion-proof.ts<br>src/lib/analytics-experiments/self-experiment-contracts.ts<br>src/lib/custom-trackers/core-tracker-domain-contracts.ts<br>src/lib/custom-trackers/index.ts<br>src/lib/custom-trackers/phase19-completion-proof.ts<br>... 6 more | src/components/calendar/calendar-timeline-proposal-composer.tsx<br>src/components/dashboard/admin-finance-dashboard-v1.tsx<br>src/components/dashboard/calendar-dashboard-v1.tsx<br>src/components/dashboard/career-current-info-source-panel.tsx<br>src/components/dashboard/career-dashboard-v1.tsx<br>src/components/dashboard/career-evidence-linkage-panel.tsx<br>src/components/dashboard/career-prep-foundation-panel.tsx<br>src/components/dashboard/career-proposed-action-visibility-panel.tsx<br>src/components/dashboard/carnos-entity-state-panel.tsx<br>src/components/dashboard/command-dashboard-v1.tsx<br>... 32 more | yes | yes | yes | yes |  |  |
| Calendar / timeline / routines | 7 / 13 | PASS | /calendar <= [/calendar]<br>/timeline <= [/timeline] | calendar_blocks<br>reminders<br>routine_steps<br>routines | financial_accounts ← src/lib/repositories/admin-finance-read.ts (supabase-from-or-rpc)<br>budget_categories ← src/lib/repositories/admin-finance-read.ts (supabase-from-or-rpc)<br>financial_logs ← src/lib/repositories/admin-finance-read.ts (supabase-from-or-rpc)<br>subscriptions ← src/lib/repositories/admin-finance-read.ts (supabase-from-or-rpc)<br>documents ← src/lib/repositories/admin-finance-read.ts (supabase-from-or-rpc)<br>housing_options ← src/lib/repositories/admin-finance-read.ts (supabase-from-or-rpc)<br>housing_contacts ← src/lib/repositories/admin-finance-read.ts (supabase-from-or-rpc)<br>reminders ← src/lib/repositories/admin-finance-read.ts (supabase-from-or-rpc)<br>carnos_entity_state ← src/lib/repositories/approved-memory-write.ts (repository-text-reference)<br>events ← src/lib/repositories/approved-memory-write.ts (repository-text-reference)<br>memory_candidates ← src/lib/repositories/approved-memory-write.ts (repository-text-reference)<br>memory_events ← src/lib/repositories/approved-memory-write.ts (repository-text-reference)<br>memory_items ← src/lib/repositories/approved-memory-write.ts (repository-text-reference)<br>calendar_blocks ← src/lib/repositories/calendar-routine-read.ts (supabase-from-or-rpc)<br>routines ← src/lib/repositories/calendar-routine-read.ts (supabase-from-or-rpc)<br>routine_steps ← src/lib/repositories/calendar-routine-read.ts (supabase-from-or-rpc)<br>reminders ← src/lib/repositories/calendar-routine-read.ts (supabase-from-or-rpc)<br>web_search_queries ← src/lib/repositories/current-info-read.ts (supabase-from-or-rpc)<br>... 24 more | src/lib/analytics-experiments/anti-demo-data-privacy-audit.ts<br>src/lib/analytics-experiments/carnos-analytics-explanation-boundary.ts<br>src/lib/analytics-experiments/insight-quality-provenance.ts<br>src/lib/analytics-experiments/local-carnos-runtime-boundary.ts<br>src/lib/custom-trackers/core-tracker-domain-contracts.ts<br>src/lib/custom-trackers/dashboard-placement-rules.ts<br>src/lib/custom-trackers/entry-validation.ts<br>src/lib/custom-trackers/evidence-attachment-boundaries.ts<br>src/lib/custom-trackers/index.ts<br>src/lib/custom-trackers/phase19-completion-proof.ts<br>... 15 more | src/components/calendar/calendar-timeline-proposal-composer.tsx<br>src/components/dashboard/admin-finance-dashboard-v1.tsx<br>src/components/dashboard/approved-memory-read-layer-panel.tsx<br>src/components/dashboard/calendar-dashboard-v1.tsx<br>src/components/dashboard/career-current-info-source-panel.tsx<br>src/components/dashboard/career-dashboard-v1.tsx<br>src/components/dashboard/career-evidence-linkage-panel.tsx<br>src/components/dashboard/carnos-current-info-integration-panel.tsx<br>src/components/dashboard/carnos-memory-visibility-panel.tsx<br>src/components/dashboard/command-dashboard-v1.tsx<br>... 39 more | yes | yes | yes | yes |  |  |
| Career / jobs / networking / resume / interviews | 8–9 | PASS | /career <= [/career]<br>/networking <= [/networking]<br>/resume <= [/resume]<br>/interviews <= [/interviews] | housing_contacts<br>interviews<br>job_application_events<br>job_applications<br>job_referrals<br>mock_interviews<br>networking_contacts<br>networking_interactions<br>phd_application_assets<br>resume_bullets<br>resume_usage<br>resume_versions | financial_accounts ← src/lib/repositories/admin-finance-read.ts (supabase-from-or-rpc)<br>budget_categories ← src/lib/repositories/admin-finance-read.ts (supabase-from-or-rpc)<br>financial_logs ← src/lib/repositories/admin-finance-read.ts (supabase-from-or-rpc)<br>subscriptions ← src/lib/repositories/admin-finance-read.ts (supabase-from-or-rpc)<br>documents ← src/lib/repositories/admin-finance-read.ts (supabase-from-or-rpc)<br>housing_options ← src/lib/repositories/admin-finance-read.ts (supabase-from-or-rpc)<br>housing_contacts ← src/lib/repositories/admin-finance-read.ts (supabase-from-or-rpc)<br>reminders ← src/lib/repositories/admin-finance-read.ts (supabase-from-or-rpc)<br>carnos_entity_state ← src/lib/repositories/approved-memory-write.ts (repository-text-reference)<br>events ← src/lib/repositories/approved-memory-write.ts (repository-text-reference)<br>memory_candidates ← src/lib/repositories/approved-memory-write.ts (repository-text-reference)<br>memory_events ← src/lib/repositories/approved-memory-write.ts (repository-text-reference)<br>memory_items ← src/lib/repositories/approved-memory-write.ts (repository-text-reference)<br>behavioral_stories ← src/lib/repositories/career-prep-read.ts (supabase-from-or-rpc)<br>question_bank ← src/lib/repositories/career-prep-read.ts (supabase-from-or-rpc)<br>mock_interviews ← src/lib/repositories/career-prep-read.ts (supabase-from-or-rpc)<br>resume_usage ← src/lib/repositories/career-prep-read.ts (supabase-from-or-rpc)<br>interviews ← src/lib/repositories/career-prep-read.ts (repository-text-reference)<br>... 53 more | src/lib/analytics-experiments/anti-demo-data-privacy-audit.ts<br>src/lib/analytics-experiments/local-carnos-runtime-boundary.ts<br>src/lib/analytics-experiments/metric-registry.ts<br>src/lib/analytics-experiments/phase18-completion-proof.ts<br>src/lib/analytics-experiments/self-experiment-contracts.ts<br>src/lib/custom-trackers/core-tracker-domain-contracts.ts<br>src/lib/custom-trackers/custom-trackers-dashboard-view-model.ts<br>src/lib/custom-trackers/dashboard-placement-rules.ts<br>src/lib/custom-trackers/evidence-attachment-boundaries.ts<br>src/lib/custom-trackers/phase19-completion-proof.ts<br>... 8 more | src/components/actions/pending-updates-drawer.tsx<br>src/components/calendar/calendar-timeline-proposal-composer.tsx<br>src/components/carnos/carnos-message-composer.tsx<br>src/components/carnos/carnos-persona-boundary-panel.tsx<br>src/components/dashboard/admin-finance-dashboard-v1.tsx<br>src/components/dashboard/approved-memory-read-layer-panel.tsx<br>src/components/dashboard/calendar-dashboard-v1.tsx<br>src/components/dashboard/career-current-info-source-panel.tsx<br>src/components/dashboard/career-dashboard-v1.tsx<br>src/components/dashboard/career-evidence-linkage-panel.tsx<br>... 20 more | yes | yes | yes | yes |  |  |
| Learning / projects / knowledge | 10 / 15 / 16 | PASS | /learning <= [/learning]<br>/projects <= [/projects]<br>/knowledge <= [/knowledge] | chat_sessions<br>knowledge_items<br>knowledge_links<br>knowledge_tags<br>learning_sessions<br>memory_links<br>project_bugs<br>project_links<br>project_memory_state<br>project_milestones<br>project_releases<br>project_tests<br>projects<br>voice_sessions<br>web_source_links | carnos_entity_state ← src/lib/repositories/approved-memory-write.ts (repository-text-reference)<br>events ← src/lib/repositories/approved-memory-write.ts (repository-text-reference)<br>memory_candidates ← src/lib/repositories/approved-memory-write.ts (repository-text-reference)<br>memory_events ← src/lib/repositories/approved-memory-write.ts (repository-text-reference)<br>memory_items ← src/lib/repositories/approved-memory-write.ts (repository-text-reference)<br>behavioral_stories ← src/lib/repositories/career-prep-read.ts (supabase-from-or-rpc)<br>question_bank ← src/lib/repositories/career-prep-read.ts (supabase-from-or-rpc)<br>mock_interviews ← src/lib/repositories/career-prep-read.ts (supabase-from-or-rpc)<br>resume_usage ← src/lib/repositories/career-prep-read.ts (supabase-from-or-rpc)<br>interviews ← src/lib/repositories/career-prep-read.ts (repository-text-reference)<br>persona_prompt_versions ← src/lib/repositories/carnos-persona-read.ts (supabase-from-or-rpc)<br>chat_messages ← src/lib/repositories/carnos-persona-read.ts (repository-text-reference)<br>chat_sessions ← src/lib/repositories/carnos-persona-read.ts (repository-text-reference)<br>audit_logs ← src/lib/repositories/core-read.ts (supabase-from-or-rpc)<br>ai_actions ← src/lib/repositories/core-read.ts (supabase-from-or-rpc)<br>chat_sessions ← src/lib/repositories/core-read.ts (supabase-from-or-rpc)<br>chat_messages ← src/lib/repositories/core-read.ts (supabase-from-or-rpc)<br>goals ← src/lib/repositories/core-read.ts (supabase-from-or-rpc)<br>... 72 more | src/lib/analytics-experiments/analytics-snapshot-contracts.ts<br>src/lib/analytics-experiments/metric-registry.ts<br>src/lib/analytics-experiments/self-experiment-contracts.ts<br>src/lib/custom-trackers/core-tracker-domain-contracts.ts<br>src/lib/custom-trackers/custom-trackers-dashboard-view-model.ts<br>src/lib/custom-trackers/dashboard-placement-rules.ts<br>src/lib/custom-trackers/evidence-attachment-boundaries.ts<br>src/lib/custom-trackers/field-type-registry.ts<br>src/lib/custom-trackers/phase19-completion-proof.ts<br>src/lib/custom-trackers/repository-rls-audit-ownership.ts<br>... 10 more | src/components/auth/protected-page.tsx<br>src/components/calendar/calendar-timeline-proposal-composer.tsx<br>src/components/carnos/carnos-message-composer.tsx<br>src/components/dashboard/admin-finance-dashboard-v1.tsx<br>src/components/dashboard/approved-memory-read-layer-panel.tsx<br>src/components/dashboard/calendar-dashboard-v1.tsx<br>src/components/dashboard/career-current-info-source-panel.tsx<br>src/components/dashboard/career-dashboard-v1.tsx<br>src/components/dashboard/career-evidence-linkage-panel.tsx<br>src/components/dashboard/carnos-memory-visibility-panel.tsx<br>... 45 more | yes | yes | yes | yes |  |  |
| Research / Stanford / PhD | 11–12 / 16 | PASS | /research-lab <= [/research OR /research-lab]<br>/research-stanford, /world-class <= [/stanford OR /research-stanford OR /world-class] | memory_review_queue<br>phd_application_assets<br>phd_readiness_assessments<br>research_citations<br>research_claims<br>research_experiments<br>research_feedback<br>research_ideas<br>research_literature_items<br>research_paper_versions<br>research_papers<br>research_questions<br>research_results<br>research_submissions<br>research_venues<br>web_source_audit_events<br>web_source_candidates<br>web_source_links<br>... 1 more | financial_accounts ← src/lib/repositories/admin-finance-read.ts (supabase-from-or-rpc)<br>budget_categories ← src/lib/repositories/admin-finance-read.ts (supabase-from-or-rpc)<br>financial_logs ← src/lib/repositories/admin-finance-read.ts (supabase-from-or-rpc)<br>subscriptions ← src/lib/repositories/admin-finance-read.ts (supabase-from-or-rpc)<br>documents ← src/lib/repositories/admin-finance-read.ts (supabase-from-or-rpc)<br>housing_options ← src/lib/repositories/admin-finance-read.ts (supabase-from-or-rpc)<br>housing_contacts ← src/lib/repositories/admin-finance-read.ts (supabase-from-or-rpc)<br>reminders ← src/lib/repositories/admin-finance-read.ts (supabase-from-or-rpc)<br>carnos_entity_state ← src/lib/repositories/approved-memory-write.ts (repository-text-reference)<br>events ← src/lib/repositories/approved-memory-write.ts (repository-text-reference)<br>memory_candidates ← src/lib/repositories/approved-memory-write.ts (repository-text-reference)<br>memory_events ← src/lib/repositories/approved-memory-write.ts (repository-text-reference)<br>memory_items ← src/lib/repositories/approved-memory-write.ts (repository-text-reference)<br>calendar_blocks ← src/lib/repositories/calendar-routine-read.ts (supabase-from-or-rpc)<br>routines ← src/lib/repositories/calendar-routine-read.ts (supabase-from-or-rpc)<br>routine_steps ← src/lib/repositories/calendar-routine-read.ts (supabase-from-or-rpc)<br>reminders ← src/lib/repositories/calendar-routine-read.ts (supabase-from-or-rpc)<br>behavioral_stories ← src/lib/repositories/career-prep-read.ts (supabase-from-or-rpc)<br>... 53 more | src/lib/analytics-experiments/analytics-dashboard-view-model.ts<br>src/lib/analytics-experiments/analytics-repository-boundary.ts<br>src/lib/analytics-experiments/analytics-snapshot-contracts.ts<br>src/lib/analytics-experiments/anti-demo-data-privacy-audit.ts<br>src/lib/analytics-experiments/carnos-analytics-explanation-boundary.ts<br>src/lib/analytics-experiments/experiment-evaluation-engine.ts<br>src/lib/analytics-experiments/experiment-repository-boundary.ts<br>src/lib/analytics-experiments/insight-quality-provenance.ts<br>src/lib/analytics-experiments/local-carnos-runtime-boundary.ts<br>src/lib/analytics-experiments/metric-registry.ts<br>... 36 more | src/components/actions/index.ts<br>src/components/actions/pending-updates-drawer.tsx<br>src/components/actions/proposed-action-review-card.tsx<br>src/components/analytics-experiments/analytics-dashboard-ui.tsx<br>src/components/analytics-experiments/self-experiment-lab-ui.tsx<br>src/components/calendar/calendar-timeline-proposal-composer.tsx<br>src/components/carnos/carnos-capability-matrix-panel.tsx<br>src/components/carnos/carnos-message-composer.tsx<br>src/components/carnos/carnos-orb.tsx<br>src/components/carnos/carnos-persona-boundary-panel.tsx<br>... 78 more | yes | yes | yes | yes |  |  |
| Health / body / nutrition / sleep / emotion / hair skincare | 13–14 | PASS_REVIEW | /body <= [/body]<br>/nutrition <= [/nutrition]<br>/sleep-energy <= [/sleep-energy]<br>/emotion <= [/emotion]<br>/hair-skincare <= [/hair-skincare]<br>/supplements <= [/supplements] | body_logs<br>emotion_logs<br>energy_logs<br>haircare_logs<br>meal_items<br>mental_health_logs<br>nutrition_logs<br>skincare_logs<br>sleep_logs<br>supplement_logs<br>supplements<br>workout_sets<br>workouts | carnos_entity_state ← src/lib/repositories/approved-memory-write.ts (repository-text-reference)<br>events ← src/lib/repositories/approved-memory-write.ts (repository-text-reference)<br>memory_candidates ← src/lib/repositories/approved-memory-write.ts (repository-text-reference)<br>memory_events ← src/lib/repositories/approved-memory-write.ts (repository-text-reference)<br>memory_items ← src/lib/repositories/approved-memory-write.ts (repository-text-reference)<br>body_logs ← src/lib/repositories/health-body-read.ts (supabase-from-or-rpc)<br>workouts ← src/lib/repositories/health-body-read.ts (supabase-from-or-rpc)<br>exercises ← src/lib/repositories/health-body-read.ts (supabase-from-or-rpc)<br>workout_sets ← src/lib/repositories/health-body-read.ts (supabase-from-or-rpc)<br>nutrition_logs ← src/lib/repositories/health-body-read.ts (supabase-from-or-rpc)<br>meal_items ← src/lib/repositories/health-body-read.ts (supabase-from-or-rpc)<br>supplements ← src/lib/repositories/health-body-read.ts (supabase-from-or-rpc)<br>supplement_logs ← src/lib/repositories/health-body-read.ts (supabase-from-or-rpc)<br>sleep_logs ← src/lib/repositories/health-body-read.ts (supabase-from-or-rpc)<br>energy_logs ← src/lib/repositories/health-body-read.ts (supabase-from-or-rpc)<br>mental_health_logs ← src/lib/repositories/health-body-read.ts (supabase-from-or-rpc)<br>emotion_logs ← src/lib/repositories/health-body-read.ts (supabase-from-or-rpc)<br>journal_entries ← src/lib/repositories/health-body-read.ts (supabase-from-or-rpc)<br>... 6 more | src/lib/analytics-experiments/local-carnos-runtime-boundary.ts<br>src/lib/analytics-experiments/metric-registry.ts<br>src/lib/analytics-experiments/self-experiment-contracts.ts<br>src/lib/custom-trackers/core-tracker-domain-contracts.ts<br>src/lib/custom-trackers/custom-trackers-dashboard-view-model.ts<br>src/lib/custom-trackers/dashboard-placement-rules.ts<br>src/lib/custom-trackers/template-frequency-semantics.ts<br>src/lib/dashboard/grimoire-dashboard-data-helpers.ts<br>src/lib/dashboard/health-body-dashboard-data-helpers.ts<br>src/lib/dashboard/index.ts<br>... 1 more | src/components/calendar/calendar-timeline-proposal-composer.tsx<br>src/components/carnos/carnos-message-composer.tsx<br>src/components/carnos/carnos-orb.tsx<br>src/components/dashboard/admin-finance-dashboard-v1.tsx<br>src/components/dashboard/carnos-entity-state-panel.tsx<br>src/components/dashboard/cross-domain-memory-integration-panel.tsx<br>src/components/dashboard/grimoire-dashboard-v1.tsx<br>src/components/dashboard/health-body-action-boundary-panels.tsx<br>src/components/dashboard/health-body-dashboard-states.tsx<br>src/components/dashboard/health-body-dashboard-v1.tsx<br>... 11 more | no | yes | yes | yes |  | Route delegates runtime evidence to helper/repository/component chain. |
| Life admin / finance / housing / documents | 13 / 15 | PASS_REVIEW | /life-admin <= [/life-admin]<br>/finance <= [/finance]<br>/housing <= [/housing]<br>/documents <= [/documents] | budget_categories<br>documents<br>financial_accounts<br>financial_logs<br>housing_contacts<br>housing_options | financial_accounts ← src/lib/repositories/admin-finance-read.ts (supabase-from-or-rpc)<br>budget_categories ← src/lib/repositories/admin-finance-read.ts (supabase-from-or-rpc)<br>financial_logs ← src/lib/repositories/admin-finance-read.ts (supabase-from-or-rpc)<br>subscriptions ← src/lib/repositories/admin-finance-read.ts (supabase-from-or-rpc)<br>documents ← src/lib/repositories/admin-finance-read.ts (supabase-from-or-rpc)<br>housing_options ← src/lib/repositories/admin-finance-read.ts (supabase-from-or-rpc)<br>housing_contacts ← src/lib/repositories/admin-finance-read.ts (supabase-from-or-rpc)<br>reminders ← src/lib/repositories/admin-finance-read.ts (supabase-from-or-rpc)<br>carnos_entity_state ← src/lib/repositories/memory-inbox-write.ts (repository-text-reference)<br>memory_candidates ← src/lib/repositories/memory-inbox-write.ts (repository-text-reference)<br>memory_items ← src/lib/repositories/memory-inbox-write.ts (repository-text-reference) | src/lib/analytics-experiments/local-carnos-runtime-boundary.ts<br>src/lib/analytics-experiments/metric-registry.ts<br>src/lib/analytics-experiments/self-experiment-contracts.ts<br>src/lib/custom-trackers/carnos-proposals-review-queue.ts<br>src/lib/custom-trackers/core-tracker-domain-contracts.ts<br>src/lib/custom-trackers/dashboard-placement-rules.ts<br>src/lib/custom-trackers/evidence-attachment-boundaries.ts<br>src/lib/custom-trackers/phase19-completion-proof.ts<br>src/lib/custom-trackers/template-frequency-semantics.ts<br>src/lib/dashboard/admin-finance-dashboard-data-helpers.ts<br>... 3 more | src/components/calendar/calendar-timeline-proposal-composer.tsx<br>src/components/carnos/carnos-capability-matrix-panel.tsx<br>src/components/carnos/carnos-companion-widget.tsx<br>src/components/dashboard/admin-finance-dashboard-v1.tsx<br>src/components/dashboard/calendar-dashboard-v1.tsx<br>src/components/dashboard/carnos-lightweight-companion-panel.tsx<br>src/components/dashboard/carnos-visual-identity-panel.tsx<br>src/components/dashboard/command-dashboard-v1.tsx<br>src/components/dashboard/cross-domain-memory-integration-panel.tsx<br>src/components/dashboard/current-context-pack-builder-panel.tsx<br>... 8 more | no | yes | yes | yes |  | Route delegates runtime evidence to helper/repository/component chain. |
| Grimoire | 15 | PASS_REVIEW | /grimoire <= [/grimoire] | grimoire_corruption_checks<br>grimoire_daily_logs<br>grimoire_modes<br>grimoire_reversions<br>grimoire_skills<br>skill_paths<br>skill_prerequisites<br>skill_progress<br>skills | carnos_entity_state ← src/lib/repositories/approved-memory-write.ts (repository-text-reference)<br>events ← src/lib/repositories/approved-memory-write.ts (repository-text-reference)<br>memory_candidates ← src/lib/repositories/approved-memory-write.ts (repository-text-reference)<br>memory_events ← src/lib/repositories/approved-memory-write.ts (repository-text-reference)<br>memory_items ← src/lib/repositories/approved-memory-write.ts (repository-text-reference)<br>behavioral_stories ← src/lib/repositories/career-prep-read.ts (supabase-from-or-rpc)<br>question_bank ← src/lib/repositories/career-prep-read.ts (supabase-from-or-rpc)<br>mock_interviews ← src/lib/repositories/career-prep-read.ts (supabase-from-or-rpc)<br>resume_usage ← src/lib/repositories/career-prep-read.ts (supabase-from-or-rpc)<br>interviews ← src/lib/repositories/career-prep-read.ts (repository-text-reference)<br>audit_logs ← src/lib/repositories/core-read.ts (supabase-from-or-rpc)<br>ai_actions ← src/lib/repositories/core-read.ts (supabase-from-or-rpc)<br>chat_sessions ← src/lib/repositories/core-read.ts (supabase-from-or-rpc)<br>chat_messages ← src/lib/repositories/core-read.ts (supabase-from-or-rpc)<br>goals ← src/lib/repositories/core-read.ts (supabase-from-or-rpc)<br>goal_milestones ← src/lib/repositories/core-read.ts (supabase-from-or-rpc)<br>daily_logs ← src/lib/repositories/core-read.ts (supabase-from-or-rpc)<br>proof_items ← src/lib/repositories/core-read.ts (supabase-from-or-rpc)<br>... 71 more | src/lib/analytics-experiments/analytics-dashboard-view-model.ts<br>src/lib/analytics-experiments/analytics-repository-boundary.ts<br>src/lib/analytics-experiments/analytics-snapshot-contracts.ts<br>src/lib/analytics-experiments/anti-demo-data-privacy-audit.ts<br>src/lib/analytics-experiments/carnos-analytics-explanation-boundary.ts<br>src/lib/analytics-experiments/experiment-evaluation-engine.ts<br>src/lib/analytics-experiments/experiment-repository-boundary.ts<br>src/lib/analytics-experiments/index.ts<br>src/lib/analytics-experiments/insight-quality-provenance.ts<br>src/lib/analytics-experiments/local-carnos-runtime-boundary.ts<br>... 28 more | src/components/analytics-experiments/analytics-dashboard-ui.tsx<br>src/components/analytics-experiments/self-experiment-lab-ui.tsx<br>src/components/auth/protected-page.tsx<br>src/components/carnos/carnos-companion-dock.tsx<br>src/components/carnos/carnos-companion-widget.tsx<br>src/components/carnos/carnos-message-composer.tsx<br>src/components/carnos/carnos-orb.tsx<br>src/components/carnos/carnos-persona-boundary-panel.tsx<br>src/components/carnos/index.ts<br>src/components/custom-trackers/custom-trackers-dashboard-ui.tsx<br>... 42 more | no | yes | yes | yes |  | Route delegates runtime evidence to helper/repository/component chain. |
| Carnos / chat / voice / memory | 5–6 / 16–17 | PASS | /carnos <= [/carnos]<br>/knowledge <= [/knowledge]<br>/settings <= [/settings] | ai_actions<br>app_settings<br>carnos_context_snapshots<br>carnos_entity_state<br>carnos_profiles<br>chat_messages<br>chat_sessions<br>learning_sessions<br>memory_candidates<br>memory_conflict_groups<br>memory_conflict_members<br>memory_do_not_remember_rules<br>memory_embedding_records<br>memory_events<br>memory_items<br>memory_links<br>memory_preferences<br>memory_retrieval_events<br>... 9 more | financial_accounts ← src/lib/repositories/admin-finance-read.ts (supabase-from-or-rpc)<br>budget_categories ← src/lib/repositories/admin-finance-read.ts (supabase-from-or-rpc)<br>financial_logs ← src/lib/repositories/admin-finance-read.ts (supabase-from-or-rpc)<br>subscriptions ← src/lib/repositories/admin-finance-read.ts (supabase-from-or-rpc)<br>documents ← src/lib/repositories/admin-finance-read.ts (supabase-from-or-rpc)<br>housing_options ← src/lib/repositories/admin-finance-read.ts (supabase-from-or-rpc)<br>housing_contacts ← src/lib/repositories/admin-finance-read.ts (supabase-from-or-rpc)<br>reminders ← src/lib/repositories/admin-finance-read.ts (supabase-from-or-rpc)<br>carnos_entity_state ← src/lib/repositories/approved-memory-write.ts (repository-text-reference)<br>events ← src/lib/repositories/approved-memory-write.ts (repository-text-reference)<br>memory_candidates ← src/lib/repositories/approved-memory-write.ts (repository-text-reference)<br>memory_events ← src/lib/repositories/approved-memory-write.ts (repository-text-reference)<br>memory_items ← src/lib/repositories/approved-memory-write.ts (repository-text-reference)<br>calendar_blocks ← src/lib/repositories/calendar-routine-read.ts (supabase-from-or-rpc)<br>routines ← src/lib/repositories/calendar-routine-read.ts (supabase-from-or-rpc)<br>routine_steps ← src/lib/repositories/calendar-routine-read.ts (supabase-from-or-rpc)<br>reminders ← src/lib/repositories/calendar-routine-read.ts (supabase-from-or-rpc)<br>behavioral_stories ← src/lib/repositories/career-prep-read.ts (supabase-from-or-rpc)<br>... 112 more | src/lib/analytics-experiments/analytics-dashboard-view-model.ts<br>src/lib/analytics-experiments/analytics-repository-boundary.ts<br>src/lib/analytics-experiments/analytics-snapshot-contracts.ts<br>src/lib/analytics-experiments/anti-demo-data-privacy-audit.ts<br>src/lib/analytics-experiments/carnos-analytics-explanation-boundary.ts<br>src/lib/analytics-experiments/experiment-evaluation-engine.ts<br>src/lib/analytics-experiments/experiment-repository-boundary.ts<br>src/lib/analytics-experiments/index.ts<br>src/lib/analytics-experiments/insight-quality-provenance.ts<br>src/lib/analytics-experiments/local-carnos-runtime-boundary.ts<br>... 35 more | src/components/actions/index.ts<br>src/components/actions/pending-updates-drawer.tsx<br>src/components/actions/proposed-action-review-card.tsx<br>src/components/analytics-experiments/analytics-dashboard-ui.tsx<br>src/components/analytics-experiments/self-experiment-lab-ui.tsx<br>src/components/auth/protected-page.tsx<br>src/components/calendar/calendar-timeline-proposal-composer.tsx<br>src/components/carnos/carnos-boundary-badges.tsx<br>src/components/carnos/carnos-capability-matrix-panel.tsx<br>src/components/carnos/carnos-companion-dock.tsx<br>... 81 more | yes | yes | yes | yes |  |  |
| Current info / web source / knowledge bridge | 16 | PASS | /knowledge <= [/knowledge]<br>/privacy <= [/privacy]<br>/research-lab <= [/research OR /research-lab] | knowledge_items<br>knowledge_links<br>knowledge_tags<br>memory_review_queue<br>web_search_queries<br>web_source_audit_events<br>web_source_candidates<br>web_source_links<br>web_sources | financial_accounts ← src/lib/repositories/admin-finance-read.ts (supabase-from-or-rpc)<br>budget_categories ← src/lib/repositories/admin-finance-read.ts (supabase-from-or-rpc)<br>financial_logs ← src/lib/repositories/admin-finance-read.ts (supabase-from-or-rpc)<br>subscriptions ← src/lib/repositories/admin-finance-read.ts (supabase-from-or-rpc)<br>documents ← src/lib/repositories/admin-finance-read.ts (supabase-from-or-rpc)<br>housing_options ← src/lib/repositories/admin-finance-read.ts (supabase-from-or-rpc)<br>housing_contacts ← src/lib/repositories/admin-finance-read.ts (supabase-from-or-rpc)<br>reminders ← src/lib/repositories/admin-finance-read.ts (supabase-from-or-rpc)<br>carnos_entity_state ← src/lib/repositories/approved-memory-write.ts (repository-text-reference)<br>events ← src/lib/repositories/approved-memory-write.ts (repository-text-reference)<br>memory_candidates ← src/lib/repositories/approved-memory-write.ts (repository-text-reference)<br>memory_events ← src/lib/repositories/approved-memory-write.ts (repository-text-reference)<br>memory_items ← src/lib/repositories/approved-memory-write.ts (repository-text-reference)<br>calendar_blocks ← src/lib/repositories/calendar-routine-read.ts (supabase-from-or-rpc)<br>routines ← src/lib/repositories/calendar-routine-read.ts (supabase-from-or-rpc)<br>routine_steps ← src/lib/repositories/calendar-routine-read.ts (supabase-from-or-rpc)<br>reminders ← src/lib/repositories/calendar-routine-read.ts (supabase-from-or-rpc)<br>behavioral_stories ← src/lib/repositories/career-prep-read.ts (supabase-from-or-rpc)<br>... 34 more | src/lib/analytics-experiments/analytics-dashboard-view-model.ts<br>src/lib/analytics-experiments/analytics-repository-boundary.ts<br>src/lib/analytics-experiments/analytics-snapshot-contracts.ts<br>src/lib/analytics-experiments/anti-demo-data-privacy-audit.ts<br>src/lib/analytics-experiments/carnos-analytics-explanation-boundary.ts<br>src/lib/analytics-experiments/experiment-evaluation-engine.ts<br>src/lib/analytics-experiments/experiment-repository-boundary.ts<br>src/lib/analytics-experiments/insight-quality-provenance.ts<br>src/lib/analytics-experiments/local-carnos-runtime-boundary.ts<br>src/lib/analytics-experiments/metric-registry.ts<br>... 35 more | src/components/actions/index.ts<br>src/components/actions/pending-updates-drawer.tsx<br>src/components/actions/proposed-action-review-card.tsx<br>src/components/analytics-experiments/analytics-dashboard-ui.tsx<br>src/components/analytics-experiments/self-experiment-lab-ui.tsx<br>src/components/auth/protected-page.tsx<br>src/components/calendar/calendar-timeline-proposal-composer.tsx<br>src/components/carnos/carnos-capability-matrix-panel.tsx<br>src/components/carnos/carnos-orb.tsx<br>src/components/carnos/carnos-persona-boundary-panel.tsx<br>... 72 more | yes | yes | yes | yes |  |  |
| Analytics / experiments | 18 | PASS | /analytics <= [/analytics]<br>/experiments <= [/experiments] | carnos_context_snapshots<br>events<br>job_application_events<br>memory_events<br>memory_retrieval_events<br>research_experiments<br>spotify_events<br>web_source_audit_events | financial_accounts ← src/lib/repositories/admin-finance-read.ts (supabase-from-or-rpc)<br>budget_categories ← src/lib/repositories/admin-finance-read.ts (supabase-from-or-rpc)<br>financial_logs ← src/lib/repositories/admin-finance-read.ts (supabase-from-or-rpc)<br>subscriptions ← src/lib/repositories/admin-finance-read.ts (supabase-from-or-rpc)<br>documents ← src/lib/repositories/admin-finance-read.ts (supabase-from-or-rpc)<br>housing_options ← src/lib/repositories/admin-finance-read.ts (supabase-from-or-rpc)<br>housing_contacts ← src/lib/repositories/admin-finance-read.ts (supabase-from-or-rpc)<br>reminders ← src/lib/repositories/admin-finance-read.ts (supabase-from-or-rpc)<br>carnos_entity_state ← src/lib/repositories/approved-memory-write.ts (repository-text-reference)<br>events ← src/lib/repositories/approved-memory-write.ts (repository-text-reference)<br>memory_candidates ← src/lib/repositories/approved-memory-write.ts (repository-text-reference)<br>memory_events ← src/lib/repositories/approved-memory-write.ts (repository-text-reference)<br>memory_items ← src/lib/repositories/approved-memory-write.ts (repository-text-reference)<br>calendar_blocks ← src/lib/repositories/calendar-routine-read.ts (supabase-from-or-rpc)<br>routines ← src/lib/repositories/calendar-routine-read.ts (supabase-from-or-rpc)<br>routine_steps ← src/lib/repositories/calendar-routine-read.ts (supabase-from-or-rpc)<br>reminders ← src/lib/repositories/calendar-routine-read.ts (supabase-from-or-rpc)<br>audit_logs ← src/lib/repositories/core-read.ts (supabase-from-or-rpc)<br>... 90 more | src/lib/analytics-experiments/analytics-dashboard-view-model.ts<br>src/lib/analytics-experiments/analytics-repository-boundary.ts<br>src/lib/analytics-experiments/analytics-snapshot-contracts.ts<br>src/lib/analytics-experiments/anti-demo-data-privacy-audit.ts<br>src/lib/analytics-experiments/carnos-analytics-explanation-boundary.ts<br>src/lib/analytics-experiments/experiment-evaluation-engine.ts<br>src/lib/analytics-experiments/experiment-repository-boundary.ts<br>src/lib/analytics-experiments/index.ts<br>src/lib/analytics-experiments/insight-quality-provenance.ts<br>src/lib/analytics-experiments/local-carnos-runtime-boundary.ts<br>... 19 more | src/components/actions/proposed-action-review-card.tsx<br>src/components/analytics-experiments/analytics-dashboard-ui.tsx<br>src/components/analytics-experiments/self-experiment-lab-ui.tsx<br>src/components/calendar/calendar-timeline-proposal-composer.tsx<br>src/components/carnos/carnos-companion-dock.tsx<br>src/components/carnos/carnos-message-composer.tsx<br>src/components/dashboard/admin-finance-dashboard-v1.tsx<br>src/components/dashboard/approved-memory-read-layer-panel.tsx<br>src/components/dashboard/calendar-dashboard-v1.tsx<br>src/components/dashboard/career-dashboard-v1.tsx<br>... 51 more | yes | yes | yes | yes |  |  |
| Custom trackers | 19 | PASS | /custom-trackers <= [/custom-trackers] |  | carnos_entity_state ← src/lib/repositories/approved-memory-write.ts (repository-text-reference)<br>events ← src/lib/repositories/approved-memory-write.ts (repository-text-reference)<br>memory_candidates ← src/lib/repositories/approved-memory-write.ts (repository-text-reference)<br>memory_events ← src/lib/repositories/approved-memory-write.ts (repository-text-reference)<br>memory_items ← src/lib/repositories/approved-memory-write.ts (repository-text-reference)<br>web_search_queries ← src/lib/repositories/current-info-read.ts (supabase-from-or-rpc)<br>web_sources ← src/lib/repositories/current-info-read.ts (supabase-from-or-rpc)<br>web_source_candidates ← src/lib/repositories/current-info-read.ts (supabase-from-or-rpc)<br>web_source_links ← src/lib/repositories/current-info-read.ts (supabase-from-or-rpc)<br>web_source_audit_events ← src/lib/repositories/current-info-read.ts (supabase-from-or-rpc)<br>events ← src/lib/repositories/current-info-read.ts (repository-text-reference)<br>body_logs ← src/lib/repositories/health-body-read.ts (supabase-from-or-rpc)<br>workouts ← src/lib/repositories/health-body-read.ts (supabase-from-or-rpc)<br>exercises ← src/lib/repositories/health-body-read.ts (supabase-from-or-rpc)<br>workout_sets ← src/lib/repositories/health-body-read.ts (supabase-from-or-rpc)<br>nutrition_logs ← src/lib/repositories/health-body-read.ts (supabase-from-or-rpc)<br>meal_items ← src/lib/repositories/health-body-read.ts (supabase-from-or-rpc)<br>supplements ← src/lib/repositories/health-body-read.ts (supabase-from-or-rpc)<br>... 9 more | src/lib/analytics-experiments/self-experiment-contracts.ts<br>src/lib/custom-trackers/carnos-proposals-review-queue.ts<br>src/lib/custom-trackers/core-tracker-domain-contracts.ts<br>src/lib/custom-trackers/custom-trackers-dashboard-view-model.ts<br>src/lib/custom-trackers/dashboard-placement-rules.ts<br>src/lib/custom-trackers/entry-validation.ts<br>src/lib/custom-trackers/evidence-attachment-boundaries.ts<br>src/lib/custom-trackers/field-type-registry.ts<br>src/lib/custom-trackers/index.ts<br>src/lib/custom-trackers/phase19-completion-proof.ts<br>... 9 more | src/components/custom-trackers/custom-trackers-dashboard-ui.tsx<br>src/components/dashboard/career-current-info-source-panel.tsx<br>src/components/dashboard/carnos-current-info-integration-panel.tsx<br>src/components/dashboard/current-info-review-to-save-panel.tsx<br>src/components/dashboard/current-info-ui-components.tsx<br>src/components/dashboard/health-body-detail-panels.tsx<br>src/components/dashboard/health-body-emotion-dashboard-v1.tsx<br>src/components/dashboard/health-body-linkage-panels.tsx<br>src/components/dashboard/project-system-state-memory-panel.tsx<br>src/components/dashboard/research-current-info-source-panel.tsx<br>... 2 more | yes | yes | yes | yes |  |  |
| Privacy / export / connectors / Spotify | 20 | PASS | /privacy <= [/privacy]<br>/settings <= [/settings] | financial_accounts<br>privacy_settings<br>spotify_connections<br>spotify_events | financial_accounts ← src/lib/repositories/admin-finance-read.ts (supabase-from-or-rpc)<br>budget_categories ← src/lib/repositories/admin-finance-read.ts (supabase-from-or-rpc)<br>financial_logs ← src/lib/repositories/admin-finance-read.ts (supabase-from-or-rpc)<br>subscriptions ← src/lib/repositories/admin-finance-read.ts (supabase-from-or-rpc)<br>documents ← src/lib/repositories/admin-finance-read.ts (supabase-from-or-rpc)<br>housing_options ← src/lib/repositories/admin-finance-read.ts (supabase-from-or-rpc)<br>housing_contacts ← src/lib/repositories/admin-finance-read.ts (supabase-from-or-rpc)<br>reminders ← src/lib/repositories/admin-finance-read.ts (supabase-from-or-rpc)<br>carnos_entity_state ← src/lib/repositories/approved-memory-write.ts (repository-text-reference)<br>events ← src/lib/repositories/approved-memory-write.ts (repository-text-reference)<br>memory_candidates ← src/lib/repositories/approved-memory-write.ts (repository-text-reference)<br>memory_events ← src/lib/repositories/approved-memory-write.ts (repository-text-reference)<br>memory_items ← src/lib/repositories/approved-memory-write.ts (repository-text-reference)<br>calendar_blocks ← src/lib/repositories/calendar-routine-read.ts (supabase-from-or-rpc)<br>routines ← src/lib/repositories/calendar-routine-read.ts (supabase-from-or-rpc)<br>routine_steps ← src/lib/repositories/calendar-routine-read.ts (supabase-from-or-rpc)<br>reminders ← src/lib/repositories/calendar-routine-read.ts (supabase-from-or-rpc)<br>behavioral_stories ← src/lib/repositories/career-prep-read.ts (supabase-from-or-rpc)<br>... 112 more | src/lib/analytics-experiments/analytics-dashboard-view-model.ts<br>src/lib/analytics-experiments/analytics-repository-boundary.ts<br>src/lib/analytics-experiments/analytics-snapshot-contracts.ts<br>src/lib/analytics-experiments/anti-demo-data-privacy-audit.ts<br>src/lib/analytics-experiments/carnos-analytics-explanation-boundary.ts<br>src/lib/analytics-experiments/experiment-evaluation-engine.ts<br>src/lib/analytics-experiments/experiment-repository-boundary.ts<br>src/lib/analytics-experiments/index.ts<br>src/lib/analytics-experiments/insight-quality-provenance.ts<br>src/lib/analytics-experiments/local-carnos-runtime-boundary.ts<br>... 44 more | src/components/actions/index.ts<br>src/components/actions/pending-updates-drawer.tsx<br>src/components/actions/proposed-action-review-card.tsx<br>src/components/analytics-experiments/analytics-dashboard-ui.tsx<br>src/components/analytics-experiments/self-experiment-lab-ui.tsx<br>src/components/auth/index.ts<br>src/components/auth/protected-page.tsx<br>src/components/calendar/calendar-timeline-proposal-composer.tsx<br>src/components/carnos/carnos-boundary-badges.tsx<br>src/components/carnos/carnos-capability-matrix-panel.tsx<br>... 100 more | yes | yes | yes | yes |  |  |

## 6. Routes

| Route | File | Direct runtime | Auth | Boundary | Provider | Write |
| --- | --- | --- | --- | --- | --- | --- |
| /analytics | src/app/analytics/page.tsx | yes | no | yes | no | no |
| /auth/login | src/app/auth/login/page.tsx | no | no | no | no | no |
| /auth/signup | src/app/auth/signup/page.tsx | no | no | no | no | no |
| /body | src/app/body/page.tsx | no | no | yes | no | no |
| /calendar | src/app/calendar/page.tsx | yes | no | yes | no | no |
| /career | src/app/career/page.tsx | yes | no | yes | no | no |
| /carnos | src/app/carnos/page.tsx | yes | no | yes | yes | no |
| /command | src/app/command/page.tsx | yes | no | yes | no | no |
| /creativity | src/app/creativity/page.tsx | no | no | no | no | no |
| /custom-trackers | src/app/custom-trackers/page.tsx | yes | no | yes | no | no |
| /decisions | src/app/decisions/page.tsx | no | no | no | no | no |
| /documents | src/app/documents/page.tsx | no | no | yes | no | no |
| /emotion | src/app/emotion/page.tsx | no | no | yes | no | no |
| /experiments | src/app/experiments/page.tsx | no | no | no | no | no |
| /finance | src/app/finance/page.tsx | no | no | yes | no | no |
| /future-simulator | src/app/future-simulator/page.tsx | no | no | no | no | no |
| /goals | src/app/goals/page.tsx | yes | no | yes | no | no |
| /grimoire | src/app/grimoire/page.tsx | no | no | yes | no | no |
| /hair-skincare | src/app/hair-skincare/page.tsx | no | no | yes | no | no |
| /housing | src/app/housing/page.tsx | no | no | yes | no | no |
| /interviews | src/app/interviews/page.tsx | yes | no | yes | no | no |
| /knowledge | src/app/knowledge/page.tsx | yes | no | yes | no | no |
| /learning | src/app/learning/page.tsx | yes | no | yes | no | no |
| /life-admin | src/app/life-admin/page.tsx | no | no | yes | no | no |
| /networking | src/app/networking/page.tsx | yes | no | yes | no | no |
| /nutrition | src/app/nutrition/page.tsx | no | no | yes | no | no |
| / | src/app/page.tsx | no | no | no | no | no |
| /privacy | src/app/privacy/page.tsx | yes | no | yes | yes | no |
| /projects | src/app/projects/page.tsx | yes | no | yes | no | no |
| /research-lab | src/app/research-lab/page.tsx | yes | no | yes | no | no |
| /research-stanford | src/app/research-stanford/page.tsx | yes | no | yes | no | no |
| /resume | src/app/resume/page.tsx | yes | no | yes | no | no |
| /settings | src/app/settings/page.tsx | yes | no | yes | no | no |
| /sleep-energy | src/app/sleep-energy/page.tsx | no | no | yes | no | no |
| /supplements | src/app/supplements/page.tsx | no | no | yes | no | no |
| /timeline | src/app/timeline/page.tsx | yes | no | yes | no | no |
| /world-class | src/app/world-class/page.tsx | yes | no | yes | no | no |

## 7. API Routes

| Route | File | Runtime | Auth | Boundary | Provider | Write |
| --- | --- | --- | --- | --- | --- | --- |
| /api/actions/:param/approve | src/app/api/actions/[actionId]/approve/route.ts | yes | no | no | no | no |
| /api/actions/:param/reject | src/app/api/actions/[actionId]/reject/route.ts | yes | no | no | no | no |
| /api/ai/extract | src/app/api/ai/extract/route.ts | no | no | no | no | no |
| /api/calendar/proposals | src/app/api/calendar/proposals/route.ts | yes | no | no | no | no |
| /api/carnos/messages | src/app/api/carnos/messages/route.ts | yes | yes | yes | no | yes |
| /api/connectors/spotify/auth | src/app/api/connectors/spotify/auth/route.ts | yes | yes | yes | yes | no |
| /api/connectors/spotify/callback | src/app/api/connectors/spotify/callback/route.ts | yes | yes | yes | yes | yes |
| /api/connectors/spotify/refresh | src/app/api/connectors/spotify/refresh/route.ts | yes | no | no | yes | no |
| /api/connectors/spotify/revoke | src/app/api/connectors/spotify/revoke/route.ts | yes | no | no | yes | no |
| /api/connectors/spotify/status | src/app/api/connectors/spotify/status/route.ts | yes | no | no | yes | no |
| /api/goals/proposals | src/app/api/goals/proposals/route.ts | yes | no | no | no | no |
| /api/voice/speak | src/app/api/voice/speak/route.ts | no | no | yes | yes | no |
| /api/voice/transcribe | src/app/api/voice/transcribe/route.ts | no | no | yes | yes | no |
| /auth/callback | src/app/auth/callback/route.ts | yes | no | no | no | no |
| /auth/signout | src/app/auth/signout/route.ts | no | no | no | no | no |

## 8. Source-of-Truth Route Coverage

| Route | Exists | File |
| --- | --- | --- |
| /analytics | yes | src/app/analytics/page.tsx |
| /body | yes | src/app/body/page.tsx |
| /calendar | yes | src/app/calendar/page.tsx |
| /career | yes | src/app/career/page.tsx |
| /carnos | yes | src/app/carnos/page.tsx |
| /command | yes | src/app/command/page.tsx |
| /creativity | yes | src/app/creativity/page.tsx |
| /custom-trackers | yes | src/app/custom-trackers/page.tsx |
| /decisions | yes | src/app/decisions/page.tsx |
| /documents | yes | src/app/documents/page.tsx |
| /emotion | yes | src/app/emotion/page.tsx |
| /experiments | yes | src/app/experiments/page.tsx |
| /finance | yes | src/app/finance/page.tsx |
| /future-simulator | yes | src/app/future-simulator/page.tsx |
| /goals | yes | src/app/goals/page.tsx |
| /grimoire | yes | src/app/grimoire/page.tsx |
| /hair-skincare | yes | src/app/hair-skincare/page.tsx |
| /housing | yes | src/app/housing/page.tsx |
| /interviews | yes | src/app/interviews/page.tsx |
| /knowledge | yes | src/app/knowledge/page.tsx |
| /learning | yes | src/app/learning/page.tsx |
| /life-admin | yes | src/app/life-admin/page.tsx |
| /networking | yes | src/app/networking/page.tsx |
| /nutrition | yes | src/app/nutrition/page.tsx |
| /privacy | yes | src/app/privacy/page.tsx |
| /projects | yes | src/app/projects/page.tsx |
| /research-lab | yes | src/app/research-lab/page.tsx |
| /research-stanford | yes | src/app/research-stanford/page.tsx |
| /resume | yes | src/app/resume/page.tsx |
| /sleep-energy | yes | src/app/sleep-energy/page.tsx |
| /supplements | yes | src/app/supplements/page.tsx |
| /timeline | yes | src/app/timeline/page.tsx |
| /world-class | yes | src/app/world-class/page.tsx |

## 9. Migration / RLS

- Created tables: 120
- RLS tables: 120

### Tables missing RLS

- None

## 10. Created Tables Without Direct Repository Evidence

- carnos_profiles
- memory_conflict_groups
- memory_conflict_members
- memory_do_not_remember_rules
- memory_embedding_records
- memory_links
- memory_preferences
- profiles

## 11. Broken Source Imports

- None

## 12. Script-only Broken Import Strings

| From | Import | Resolved guess |
| --- | --- | --- |
| scripts/audit-integration-sanity.mjs | ./operating-dashboard-card | scripts/operating-dashboard-card |
| scripts/audit-integration-sanity.mjs | ./operating-dashboard-grid | scripts/operating-dashboard-grid |
| scripts/audit-integration-sanity.mjs | ./command-dashboard-v1 | scripts/command-dashboard-v1 |
| scripts/audit-integration-sanity.mjs | ./timeline-dashboard-v1 | scripts/timeline-dashboard-v1 |
| scripts/audit-integration-sanity.mjs | ./calendar-dashboard-v1 | scripts/calendar-dashboard-v1 |
| scripts/audit-integration-sanity.mjs | ./goals-dashboard-v1 | scripts/goals-dashboard-v1 |
| scripts/audit-integration-sanity.mjs | ./proof-dashboard-v1 | scripts/proof-dashboard-v1 |
| scripts/audit-integration-sanity.mjs | ./carnos-panel-v1 | scripts/carnos-panel-v1 |
| scripts/audit-integration-sanity.mjs | ./cross-dashboard-links | scripts/cross-dashboard-links |
| scripts/audit-integration-sanity.mjs | ./career-dashboard-v1 | scripts/career-dashboard-v1 |
| scripts/audit-integration-sanity.mjs | ./networking-dashboard-v1 | scripts/networking-dashboard-v1 |
| scripts/audit-integration-sanity.mjs | ./resume-dashboard-v1 | scripts/resume-dashboard-v1 |
| scripts/audit-integration-sanity.mjs | ./interviews-dashboard-v1 | scripts/interviews-dashboard-v1 |
| scripts/audit-integration-sanity.mjs | ./career-evidence-linkage-panel | scripts/career-evidence-linkage-panel |
| scripts/audit-integration-sanity.mjs | ./career-proposed-action-visibility-panel | scripts/career-proposed-action-visibility-panel |
| scripts/audit-integration-sanity.mjs | ./career-state-boundary-panel | scripts/career-state-boundary-panel |
| scripts/audit-phase-10.mjs | ./research-summary-panel | scripts/research-summary-panel |
| scripts/audit-phase-10.mjs | ./research-linkage-boundary-panels | scripts/research-linkage-boundary-panels |
| scripts/audit-phase-10.mjs | ./research-detail-panels | scripts/research-detail-panels |
| scripts/audit-phase-10.mjs | ./research-proposed-action-visibility-panel | scripts/research-proposed-action-visibility-panel |
| scripts/audit-phase-11.mjs | ./health-body-read | scripts/health-body-read |
| scripts/audit-phase-11.mjs | ./health-body-dashboard-v1 | scripts/health-body-dashboard-v1 |
| scripts/audit-phase-11.mjs | ./health-body-dashboard-states | scripts/health-body-dashboard-states |
| scripts/audit-phase-11.mjs | ./health-body-nutrition-dashboard-v1 | scripts/health-body-nutrition-dashboard-v1 |
| scripts/audit-phase-11.mjs | ./health-body-supplements-dashboard-v1 | scripts/health-body-supplements-dashboard-v1 |
| scripts/audit-phase-11.mjs | ./health-body-sleep-energy-dashboard-v1 | scripts/health-body-sleep-energy-dashboard-v1 |
| scripts/audit-phase-11.mjs | ./health-body-emotion-dashboard-v1 | scripts/health-body-emotion-dashboard-v1 |
| scripts/audit-phase-11.mjs | ./health-body-hair-skincare-dashboard-v1 | scripts/health-body-hair-skincare-dashboard-v1 |
| scripts/audit-phase-11.mjs | ./health-body-detail-panels | scripts/health-body-detail-panels |
| scripts/audit-phase-11.mjs | ./health-body-linkage-panels | scripts/health-body-linkage-panels |
| scripts/audit-phase-11.mjs | ./health-body-action-boundary-panels | scripts/health-body-action-boundary-panels |
| scripts/audit-phase-12.mjs | ./admin-finance-read | scripts/admin-finance-read |
| scripts/audit-phase-12.mjs | ./admin-finance-dashboard-data-helpers | scripts/admin-finance-dashboard-data-helpers |
| scripts/audit-phase-13-5c.mjs | ./calendar-routine-read | scripts/calendar-routine-read |
| scripts/audit-phase-13-5c.mjs | ./calendar-routine-dashboard-data-helpers | scripts/calendar-routine-dashboard-data-helpers |
| scripts/audit-phase-13-5d.mjs | ./career-prep-read | scripts/career-prep-read |
| scripts/audit-phase-13-5d.mjs | ./career-prep-dashboard-data-helpers | scripts/career-prep-dashboard-data-helpers |
| scripts/audit-phase-13-5d.mjs | ./career-prep-foundation-panel | scripts/career-prep-foundation-panel |
| scripts/audit-phase-13.mjs | ./grimoire-dashboard-v1 | scripts/grimoire-dashboard-v1 |
| scripts/audit-phase-14c.mjs | ./voice-session-helpers | scripts/voice-session-helpers |
| scripts/audit-phase-14c.mjs | ./voice-session-state | scripts/voice-session-state |
| scripts/audit-phase-14f.mjs | ./voice-manual-simulator-preview | scripts/voice-manual-simulator-preview |
| scripts/audit-phase-14f.mjs | ./transcript-draft | scripts/transcript-draft |
| scripts/audit-phase-14g.mjs | ./carnos-voice-panel-integration | scripts/carnos-voice-panel-integration |
| scripts/audit-phase-14h.mjs | ./voice-action-bridge-preview | scripts/voice-action-bridge-preview |
| scripts/audit-phase-14h.mjs | ./voice-action-bridge | scripts/voice-action-bridge |
| scripts/audit-phase-15d.mjs | ./memory-candidate-engine | scripts/memory-candidate-engine |
| scripts/audit-phase-15e.mjs | ./memory-inbox-preview-panel | scripts/memory-inbox-preview-panel |
| scripts/audit-phase-15f.mjs | ./memory-privacy-rules | scripts/memory-privacy-rules |
| scripts/audit-phase-15f.mjs | ./memory-privacy-rules-panel | scripts/memory-privacy-rules-panel |
| scripts/audit-phase-15g.mjs | ./approved-memory-read-layer | scripts/approved-memory-read-layer |
| scripts/audit-phase-15g.mjs | ./approved-memory-read-layer-panel | scripts/approved-memory-read-layer-panel |
| scripts/audit-phase-15h.mjs | ./carnos-entity-state | scripts/carnos-entity-state |
| scripts/audit-phase-15h.mjs | ./carnos-entity-state-panel | scripts/carnos-entity-state-panel |
| scripts/audit-phase-15i.mjs | ./project-system-state-memory | scripts/project-system-state-memory |
| scripts/audit-phase-15i.mjs | ./project-system-state-memory-panel | scripts/project-system-state-memory-panel |
| scripts/audit-phase-15j.mjs | ./current-context-pack-builder | scripts/current-context-pack-builder |
| scripts/audit-phase-15j.mjs | ./current-context-pack-builder-panel | scripts/current-context-pack-builder-panel |
| scripts/audit-phase-15k.mjs | ./carnos-memory-visibility | scripts/carnos-memory-visibility |
| scripts/audit-phase-15k.mjs | ./carnos-memory-visibility-panel | scripts/carnos-memory-visibility-panel |
| scripts/audit-phase-15l.mjs | ./knowledge-vault-foundation | scripts/knowledge-vault-foundation |
| scripts/audit-phase-15l.mjs | ./knowledge-vault-foundation-panel | scripts/knowledge-vault-foundation-panel |
| scripts/audit-phase-15m.mjs | ./retrieval-contract | scripts/retrieval-contract |
| scripts/audit-phase-15m.mjs | ./retrieval-contract-panel | scripts/retrieval-contract-panel |
| scripts/audit-phase-15n.mjs | ./embedding-boundary | scripts/embedding-boundary |
| scripts/audit-phase-15n.mjs | ./embedding-boundary-panel | scripts/embedding-boundary-panel |
| scripts/audit-phase-15o.mjs | ./forget-delete-derived-records | scripts/forget-delete-derived-records |
| scripts/audit-phase-15o.mjs | ./forget-delete-derived-records-panel | scripts/forget-delete-derived-records-panel |
| scripts/audit-phase-15p.mjs | ./memory-audit-usage-transparency | scripts/memory-audit-usage-transparency |
| scripts/audit-phase-15p.mjs | ./memory-audit-usage-transparency-panel | scripts/memory-audit-usage-transparency-panel |
| scripts/audit-phase-15q.mjs | ./cross-domain-integration-preview | scripts/cross-domain-integration-preview |
| scripts/audit-phase-15q.mjs | ./cross-domain-memory-integration-panel | scripts/cross-domain-memory-integration-panel |
| scripts/audit-phase-15r.mjs | ./memory-enums | scripts/memory-enums |
| scripts/audit-phase-15r.mjs | ./memory-contracts | scripts/memory-contracts |
| scripts/audit-phase-15r.mjs | ./memory-validators | scripts/memory-validators |
| scripts/audit-phase-15r.mjs | ./memory-conflict-rules | scripts/memory-conflict-rules |
| scripts/audit-phase-15r.mjs | ./memory-candidate-engine | scripts/memory-candidate-engine |
| scripts/audit-phase-15r.mjs | ./memory-privacy-rules | scripts/memory-privacy-rules |
| scripts/audit-phase-15r.mjs | ./approved-memory-read-layer | scripts/approved-memory-read-layer |
| scripts/audit-phase-15r.mjs | ./carnos-entity-state | scripts/carnos-entity-state |
| scripts/audit-phase-15r.mjs | ./project-system-state-memory | scripts/project-system-state-memory |
| scripts/audit-phase-15r.mjs | ./current-context-pack-builder | scripts/current-context-pack-builder |
| scripts/audit-phase-15r.mjs | ./carnos-memory-visibility | scripts/carnos-memory-visibility |
| scripts/audit-phase-15r.mjs | ./knowledge-vault-foundation | scripts/knowledge-vault-foundation |
| scripts/audit-phase-15r.mjs | ./retrieval-contract | scripts/retrieval-contract |
| scripts/audit-phase-15r.mjs | ./embedding-boundary | scripts/embedding-boundary |
| scripts/audit-phase-15r.mjs | ./forget-delete-derived-records | scripts/forget-delete-derived-records |
| scripts/audit-phase-15r.mjs | ./memory-audit-usage-transparency | scripts/memory-audit-usage-transparency |
| scripts/audit-phase-15r.mjs | ./cross-domain-integration-preview | scripts/cross-domain-integration-preview |
| scripts/audit-phase-15r.mjs | ./memory-inbox-preview-panel | scripts/memory-inbox-preview-panel |
| scripts/audit-phase-15r.mjs | ./memory-privacy-rules-panel | scripts/memory-privacy-rules-panel |
| scripts/audit-phase-15r.mjs | ./approved-memory-read-layer-panel | scripts/approved-memory-read-layer-panel |
| scripts/audit-phase-15r.mjs | ./carnos-entity-state-panel | scripts/carnos-entity-state-panel |
| scripts/audit-phase-15r.mjs | ./project-system-state-memory-panel | scripts/project-system-state-memory-panel |
| scripts/audit-phase-15r.mjs | ./current-context-pack-builder-panel | scripts/current-context-pack-builder-panel |
| scripts/audit-phase-15r.mjs | ./carnos-memory-visibility-panel | scripts/carnos-memory-visibility-panel |
| scripts/audit-phase-15r.mjs | ./knowledge-vault-foundation-panel | scripts/knowledge-vault-foundation-panel |
| scripts/audit-phase-15r.mjs | ./retrieval-contract-panel | scripts/retrieval-contract-panel |
| scripts/audit-phase-15r.mjs | ./embedding-boundary-panel | scripts/embedding-boundary-panel |
| scripts/audit-phase-15r.mjs | ./forget-delete-derived-records-panel | scripts/forget-delete-derived-records-panel |
| scripts/audit-phase-15r.mjs | ./memory-audit-usage-transparency-panel | scripts/memory-audit-usage-transparency-panel |
| scripts/audit-phase-15r.mjs | ./cross-domain-memory-integration-panel | scripts/cross-domain-memory-integration-panel |
| scripts/audit-phase-16-5i.mjs | ./carnos-lightweight-companion-panel | scripts/carnos-lightweight-companion-panel |
| scripts/audit-phase-16c.mjs | ./current-info-enums | scripts/current-info-enums |
| scripts/audit-phase-16c.mjs | ./current-info-contracts | scripts/current-info-contracts |
| scripts/audit-phase-16c.mjs | ./current-info-validators | scripts/current-info-validators |
| scripts/audit-phase-16d.mjs | ./current-info-provider-types | scripts/current-info-provider-types |
| scripts/audit-phase-16d.mjs | ./provider-boundary | scripts/provider-boundary |
| scripts/audit-phase-16d.mjs | ./noop-current-info-provider | scripts/noop-current-info-provider |
| scripts/audit-phase-16e.mjs | ./current-info-query-classifier | scripts/current-info-query-classifier |
| scripts/audit-phase-16e.mjs | ./current-info-safety-gate | scripts/current-info-safety-gate |
| scripts/audit-phase-16f.mjs | ./current-info-citation-engine | scripts/current-info-citation-engine |
| scripts/audit-phase-16f.mjs | ./current-info-reliability-engine | scripts/current-info-reliability-engine |
| scripts/audit-phase-16f.mjs | ./current-info-freshness-engine | scripts/current-info-freshness-engine |
| scripts/audit-phase-16g-b.mjs | ./current-info-extraction-candidate | scripts/current-info-extraction-candidate |
| scripts/audit-phase-16g.mjs | ./current-info-source-candidate | scripts/current-info-source-candidate |
| scripts/audit-phase-16g.mjs | ./current-info-destination-router | scripts/current-info-destination-router |
| scripts/audit-phase-16h-b.mjs | ./current-info-source-candidate | scripts/current-info-source-candidate |
| scripts/audit-phase-16h-b.mjs | ./current-info-destination-router | scripts/current-info-destination-router |
| scripts/audit-phase-16h-b.mjs | ./current-info-duplicate-detector | scripts/current-info-duplicate-detector |
| scripts/audit-phase-16h.mjs | ./current-info-review-queue-item | scripts/current-info-review-queue-item |
| scripts/audit-phase-16h.mjs | ./current-info-review-decision | scripts/current-info-review-decision |
| scripts/audit-phase-16i.mjs | ./current-info-read | scripts/current-info-read |
| scripts/audit-phase-16i.mjs | ./current-info-dashboard-data-helpers | scripts/current-info-dashboard-data-helpers |
| scripts/audit-phase-16j.mjs | ./current-info-ui-components | scripts/current-info-ui-components |
| scripts/audit-phase-16k.mjs | ./carnos-current-info-integration-panel | scripts/carnos-current-info-integration-panel |
| scripts/audit-phase-16n.mjs | ./knowledge-vault-source-bridge | scripts/knowledge-vault-source-bridge |
| scripts/audit-phase-16n.mjs | ./knowledge-vault-source-bridge-panel | scripts/knowledge-vault-source-bridge-panel |
| scripts/audit-phase-16o.mjs | ./current-info-review-to-save-flow | scripts/current-info-review-to-save-flow |
| scripts/audit-phase-16o.mjs | ./current-info-review-to-save-panel | scripts/current-info-review-to-save-panel |
| scripts/audit-phase-16p.mjs | ./current-info-privacy-retention-rules | scripts/current-info-privacy-retention-rules |
| scripts/audit-phase-16p.mjs | ./current-info-privacy-retention-panel | scripts/current-info-privacy-retention-panel |
| scripts/audit-phase-16q.mjs | ./current-info-web-source-audit-trail | scripts/current-info-web-source-audit-trail |
| scripts/audit-phase-16q.mjs | ./current-info-web-source-audit-trail-panel | scripts/current-info-web-source-audit-trail-panel |
| scripts/audit-phase-17d.mjs | ./memory-rag-schema-contracts | scripts/memory-rag-schema-contracts |
| scripts/audit-phase-17d.mjs | ./memory-rag-schema-validators | scripts/memory-rag-schema-validators |
| scripts/audit-phase-17e.mjs | ./memory-inbox-write | scripts/memory-inbox-write |
| scripts/audit-phase-17f.mjs | ./approved-memory-write | scripts/approved-memory-write |
| scripts/audit-phase-17g.mjs | ./memory-provenance-confidence-conflict-engine | scripts/memory-provenance-confidence-conflict-engine |
| scripts/audit-phase-17h.mjs | ./memory-embedding-provider-boundary | scripts/memory-embedding-provider-boundary |
| scripts/audit-phase-17i.mjs | ./memory-retrieval-ranking-budget-dedupe | scripts/memory-retrieval-ranking-budget-dedupe |
| scripts/audit-phase-8.mjs | ./career-dashboard-v1 | scripts/career-dashboard-v1 |
| scripts/audit-phase-8.mjs | ./networking-dashboard-v1 | scripts/networking-dashboard-v1 |
| scripts/audit-phase-8.mjs | ./resume-dashboard-v1 | scripts/resume-dashboard-v1 |
| scripts/audit-phase-8.mjs | ./interviews-dashboard-v1 | scripts/interviews-dashboard-v1 |
| scripts/audit-phase-8.mjs | ./career-evidence-linkage-panel | scripts/career-evidence-linkage-panel |
| scripts/audit-phase-8.mjs | ./career-proposed-action-visibility-panel | scripts/career-proposed-action-visibility-panel |
| scripts/audit-phase-8.mjs | ./career-state-boundary-panel | scripts/career-state-boundary-panel |

## 13. Source Risk / Boundary Markers

| File | Line | Text |
| --- | --- | --- |
| src/app/analytics/page.tsx | 157 | description="Read-only proof and daily log summary surface." |
| src/app/analytics/page.tsx | 211 | label={readErrors.length > 0 ? "Read warning" : "Read-only mode"} |
| src/app/analytics/page.tsx | 244 | description="Read-only daily log records. Full analytics and charts are deferred." |
| src/app/analytics/page.tsx | 252 | description="The daily log analytics read path is wired, but no daily log records exist for this user yet. Logging and analysis flows remain deferred." |
| src/app/api/calendar/proposals/route.ts | 79 | status: "todo", |
| src/app/api/connectors/spotify/auth/route.ts | 14 | { error: "Spotify connector is disabled." }, |
| src/app/api/connectors/spotify/callback/route.ts | 32 | spotify: "disabled", |
| src/app/api/voice/speak/route.ts | 51 | "Only the noop TTS provider boundary is enabled in Phase 14D. Real providers are deferred.", |
| src/app/api/voice/transcribe/route.ts | 52 | "Only the noop STT provider boundary is enabled in Phase 14D. Real providers are deferred.", |
| src/app/body/page.tsx | 24 | description="Read-only health/body surface for body, training, nutrition, supplements, sleep, energy, emotion, haircare, skincare, and product records." |
| src/app/calendar/page.tsx | 336 | description="Combined read-only list from task and event repository helpers." |
| src/app/career/page.tsx | 34 | description="Read-only career surface for job search, referrals, interviews, and career execution records." |
| src/app/carnos/page.tsx | 27 | "Read-only Athena companion page for ascendOS with truthful memory/context visibility and capability boundaries.", |
| src/app/carnos/page.tsx | 33 | copy: "Athena has a persistent visual identity, state language, companion surface, and read-only memory/context visibility.", |
| src/app/carnos/page.tsx | 37 | copy: "The page clearly distinguishes enabled foundations from deferred or forbidden runtime powers.", |
| src/app/carnos/page.tsx | 47 | <AuthenticatedDashboardShell title="Athena" description="Read-only Athena companion identity with runtime memory/context visibility for ascendOS."> |
| src/app/carnos/page.tsx | 115 | privacy-aware, and truthful about active read-only memory/context visibility versus |
| src/app/carnos/page.tsx | 116 | deferred generation, voice, provider, and action powers. |
| src/app/carnos/page.tsx | 123 | subtitle="The /carnos page presents Athena as a read-only companion identity with runtime memory/context visibility, capability truthfulness, and safety boundaries." |
| src/app/carnos/page.tsx | 144 | <p className="sr-only">Generation disabled. Read-only memory/context visibility is active.</p> |
| src/app/carnos/page.tsx | 157 | <p>Phase 16 current-info bridge markers: currentInfoData webSources webSourceCandidates read-only bridge Carnos guidance  CarnosCurrentInfoIntegrationPanel getCurrentInfoDashboardDataSummary listWebSources listWebSourceCandidates listWebSearchQueries listWebSourceLinks listWebSourceAuditEvents Curre |
| src/app/carnos/page.tsx | 159 | <p>This page now performs read-only runtime memory/context visibility while generation, voice, provider calls, hidden prompt injection, and autonomous actions remain deferred.</p> |
| src/app/carnos/page.tsx | 165 | SAMPLE_PHASE_6_REVIEW_ACTION remain disabled here because this Phase 16.5H page is |
| src/app/carnos/page.tsx | 166 | visual-only and does not execute actions. |
| src/app/carnos/page.tsx | 171 | route wiring remains acknowledged while Phase 16.5H renders the newer visual-only |
| src/app/carnos/page.tsx | 178 | Carnos page visual-only and read-only. |
| src/app/carnos/page.tsx | 182 | This page performs read-only runtime memory/context visibility while generation, voice, provider calls, hidden prompt injection, and autonomous actions remain deferred. |
| src/app/carnos/page.tsx | 189 | This page is read-only. It can show authenticated Athena, memory, project-memory, retrieval, and usage visibility. It does not start microphone capture, produce talk-back |
| src/app/command/page.tsx | 17 | // Phase 5 read-audit compatibility marker: Read-only mode |
| src/app/creativity/page.tsx | 1 | import { PlaceholderDashboardPage } from "@/components/dashboard/placeholder-dashboard-page"; |
| src/app/creativity/page.tsx | 2 | import { PLACEHOLDER_ROUTE_DECISIONS } from "@/lib/placeholder-route-decisions"; |
| src/app/custom-trackers/page.tsx | 1 | // Phase 19M route marker: No runtime database reads or writes. |
| src/app/custom-trackers/page.tsx | 2 | // Post-v1 runtime boundary marker: Custom tracker persistence is not implemented in v1. |
| src/app/custom-trackers/page.tsx | 8 | description: "Safe custom tracker dashboard shell. Runtime custom tracker persistence is explicitly post-v1; this v1 surface performs no runtime database reads or writes.", |
| src/app/decisions/page.tsx | 1 | import { PlaceholderDashboardPage } from "@/components/dashboard/placeholder-dashboard-page"; |
| src/app/decisions/page.tsx | 2 | import { PLACEHOLDER_ROUTE_DECISIONS } from "@/lib/placeholder-route-decisions"; |
| src/app/documents/page.tsx | 11 | description="Read-only document metadata surface for IDs, work authorization, school, career, housing, finance, insurance, renewal, review, and expiration records." |
| src/app/emotion/page.tsx | 11 | description="Read-only emotion surface for mood, emotional patterns, triggers, reflection, regulation proof, and mental-state records." |
| src/app/experiments/page.tsx | 1 | import { PlaceholderDashboardPage } from "@/components/dashboard/placeholder-dashboard-page"; |
| src/app/experiments/page.tsx | 2 | import { PLACEHOLDER_ROUTE_DECISIONS } from "@/lib/placeholder-route-decisions"; |
| src/app/finance/page.tsx | 11 | description="Read-only finance surface for manual accounts, budget categories, income, expenses, rent, utilities, bills, subscriptions, and recurring payments." |
| src/app/future-simulator/page.tsx | 1 | import { PlaceholderDashboardPage } from "@/components/dashboard/placeholder-dashboard-page"; |
| src/app/future-simulator/page.tsx | 2 | import { PLACEHOLDER_ROUTE_DECISIONS } from "@/lib/placeholder-route-decisions"; |
| src/app/goals/page.tsx | 216 | description="Read-only list from the goals repository helper." |
| src/app/grimoire/page.tsx | 11 | description="Read-only Grimoire surface for symbolic modes, practical missions, proof actions, corruption warnings, reversion, and weekly throne audit." |
| src/app/hair-skincare/page.tsx | 11 | description="Read-only haircare and skincare surface for routines, product use, progress notes, care consistency, and sensitive appearance-related records." |
| src/app/housing/page.tsx | 11 | description="Read-only housing admin surface for rent, lease dates, utilities, maintenance, roommate notes, housing documents, and housing contacts." |
| src/app/interviews/page.tsx | 8 | description="Read-only interview surface for interview practice, question banks, performance notes, and follow-up loops." |
| src/app/knowledge/page.tsx | 28 | description="Read-only knowledge alignment surface with runtime knowledge-vault reads. Memory approval, embeddings, vector retrieval, hidden prompt injection, and autonomous memory writes remain deferred." |
| src/app/learning/page.tsx | 34 | description="Read-only learning surface for skill paths, practice sessions, quizzes, attempts, and proof-gated mastery." |
| src/app/life-admin/page.tsx | 11 | description="Read-only life admin surface for documents, deadlines, subscriptions, finance reminders, housing follow-ups, and daily admin pressure." |
| src/app/networking/page.tsx | 12 | description="Read-only networking surface for contacts, referrals, relationship history, follow-ups, and warm-intro strategy." |
| src/app/nutrition/page.tsx | 11 | description="Read-only nutrition surface for calories, macros, meals, hydration, meal prep, supplement context, and dietary adherence records." |
| src/app/privacy/page.tsx | 21 | description="Read-only privacy command center for memory, private mode, export, destructive action, sensitive locks, audit visibility, connector trust, Spotify boundaries, and deferred connectors." |
| src/app/privacy/page.tsx | 61 | Phase 13.5E compatibility marker: Export, delete, private mode controls remain deferred. |
| src/app/projects/page.tsx | 24 | description="Read-only project surface for projects, milestones, releases, bugs, tests, links, demos, and proof." |
| src/app/research-lab/page.tsx | 37 | description="Read-only research surface for ideas, literature, citations, claims, experiments, results, papers, venues, submissions, and feedback." |
| src/app/research-lab/page.tsx | 94 | subtitle="A read-only operating surface for turning research ideas into cited claims, reproducible experiments, results, and paper-ready proof." |
| src/app/research-stanford/page.tsx | 29 | description="Read-only Stanford and PhD readiness surface for universities, labs, professors, assets, SOPs, recommendations, and application proof." |
| src/app/research-stanford/page.tsx | 71 | subtitle="A read-only operating surface for mapping PhD targets, professor fit, Stanford readiness, SOP progress, recommendation targets, and application assets." |
| src/app/research-stanford/page.tsx | 159 | description="This route is visibility-only until later safe-write and outreach workflows are explicitly implemented." |
| src/app/resume/page.tsx | 15 | description="Read-only resume surface for versions, role targeting, keyword alignment, and application proof." |
| src/app/settings/page.tsx | 25 | "Companion name, persona mode, voice setting, memory mode, and safety mode are represented as read-only settings foundations only.", |
| src/app/settings/page.tsx | 30 | "Approved memories, memory candidates, export, deletion, and memory privacy remain deferred to later memory/export phases.", |
| src/app/settings/page.tsx | 43 | description="Read-only settings control foundation for profile, privacy, and Athena preferences." |
| src/app/settings/page.tsx | 69 | export, delete, voice, memory, and web controls require later |
| src/app/sleep-energy/page.tsx | 11 | description="Read-only sleep and energy surface for sleep, fatigue, energy, routines, focus, stress, and recovery signals." |
| src/app/supplements/page.tsx | 11 | description="Read-only supplement surface for supplement schedules, dosage notes, safety boundaries, products, and adherence records." |
| src/app/timeline/page.tsx | 279 | description="Combined read-only view from the first batch of timeline-relevant repositories." |
| src/app/world-class/page.tsx | 191 | description="Read-only proof and daily log surface for reality-based progress." |
| src/app/world-class/page.tsx | 206 | "Daily operating records that can later support reflection and review.", |
| src/app/world-class/page.tsx | 251 | label={readErrors.length > 0 ? "Read warning" : "Read-only mode"} |
| src/app/world-class/page.tsx | 286 | description="Read-only evidence records from the proof_items repository helper." |
| src/app/world-class/page.tsx | 294 | description="The proof read path is wired, but no proof records exist for this user yet. Proof creation remains disabled until a later safe write phase." |
| src/components/actions/pending-updates-drawer.tsx | 13 | disabled?: boolean; |
| src/components/actions/pending-updates-drawer.tsx | 22 | disabled = false, |
| src/components/actions/pending-updates-drawer.tsx | 32 | const canSubmit = Boolean(actionId) && confirmationEnabled && !disabled; |
| src/components/actions/pending-updates-drawer.tsx | 94 | className="w-full rounded-xl border border-cyan-400/30 bg-cyan-400/10 px-4 py-3 text-left text-sm font-semibold text-cyan-100 transition hover:bg-cyan-400/15 disabled:cursor-not-allowed disabled:opacity-50" |
| src/components/actions/pending-updates-drawer.tsx | 95 | disabled={disabled} |
| src/components/actions/pending-updates-drawer.tsx | 126 | disabled={disabled \|\| isSubmitting} |
| src/components/actions/proposed-action-review-card.tsx | 13 | disabled?: boolean; |
| src/components/actions/proposed-action-review-card.tsx | 62 | disabled = false, |
| src/components/actions/proposed-action-review-card.tsx | 117 | const isBusy = disabled \|\| isSubmitting; |
| src/components/actions/proposed-action-review-card.tsx | 171 | className="rounded-lg border border-white/10 px-3 py-1 text-xs font-medium text-slate-200 transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50" |
| src/components/actions/proposed-action-review-card.tsx | 172 | disabled={isBusy} |
| src/components/actions/proposed-action-review-card.tsx | 184 | className="min-h-72 w-full rounded-xl border border-white/10 bg-black/30 p-4 font-mono text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-cyan-400/60 disabled:cursor-not-allowed disabled:opacity-50" |
| src/components/actions/proposed-action-review-card.tsx | 186 | disabled={isBusy} |
| src/components/actions/proposed-action-review-card.tsx | 207 | className="rounded-xl border border-white/10 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50" |
| src/components/actions/proposed-action-review-card.tsx | 208 | disabled={isBusy} |
| src/components/actions/proposed-action-review-card.tsx | 215 | className="rounded-xl bg-cyan-400 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-50" |
| src/components/actions/proposed-action-review-card.tsx | 216 | disabled={isBusy} |
| src/components/analytics-experiments/self-experiment-lab-ui.tsx | 105 | "Actions remain disabled until a later approved execution path.", |
| src/components/auth/protected-page.tsx | 15 | fallbackDescription = "Supabase is not configured yet, so this protected area is visible only as a local development placeholder.", |
| src/components/auth/protected-page.tsx | 21 | Protected route placeholder |
| src/components/calendar/calendar-timeline-proposal-composer.tsx | 143 | placeholder="Example: Apply to 5 AI/ML roles before Friday" |
| src/components/calendar/calendar-timeline-proposal-composer.tsx | 153 | placeholder="Add context, constraints, or why this belongs on the calendar/timeline." |
| src/components/calendar/calendar-timeline-proposal-composer.tsx | 213 | disabled={isSubmitting} |
| src/components/calendar/calendar-timeline-proposal-composer.tsx | 214 | className="rounded-2xl border border-cyan-300/40 bg-cyan-300/15 px-5 py-3 text-sm font-semibold text-cyan-50 transition hover:bg-cyan-300/25 disabled:cursor-not-allowed disabled:opacity-60" |
| src/components/carnos/carnos-capability-matrix-panel.tsx | 18 | runtime_deferred: "Runtime deferred", |
| src/components/carnos/carnos-capability-matrix-panel.tsx | 27 | runtime_deferred: "Designed for a later runtime phase. The UI must not imply it is active now.", |
| src/components/carnos/carnos-capability-matrix-panel.tsx | 57 | subtitle = "A truthful map of what Carnos can do now, what is only foundational, what is deferred, and what is forbidden.", |
| src/components/carnos/carnos-capability-matrix-panel.tsx | 87 | data-carnos-no-fake-runtime-controls="true" |
| src/components/carnos/carnos-capability-matrix-panel.tsx | 89 | No fake active runtime controls |
| src/components/carnos/carnos-message-composer.tsx | 59 | "Saved to Carnos chat history. Refresh the page to see it in the read-only transcript list.", |
| src/components/carnos/carnos-message-composer.tsx | 69 | const disabled = state.status === "saving"; |
| src/components/carnos/carnos-message-composer.tsx | 89 | className="min-h-32 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm leading-6 text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-300/60" |
| src/components/carnos/carnos-message-composer.tsx | 90 | placeholder="Write a Carnos note, reflection, instruction, or context message to persist..." |
| src/components/carnos/carnos-message-composer.tsx | 109 | disabled={disabled} |
| src/components/carnos/carnos-message-composer.tsx | 110 | className="rounded-full border border-cyan-300/40 bg-cyan-300/10 px-5 py-2 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-300/20 disabled:cursor-not-allowed disabled:opacity-50" |
| src/components/carnos/carnos-message-composer.tsx | 112 | {disabled ? "Saving…" : "Save message"} |
| src/components/custom-trackers/custom-trackers-dashboard-ui.tsx | 23 | "No fake tracker entries", |
| src/components/custom-trackers/custom-trackers-dashboard-ui.tsx | 24 | "No fake dashboard cards", |
| src/components/custom-trackers/custom-trackers-dashboard-ui.tsx | 25 | "No fake AI mappings", |
| src/components/custom-trackers/custom-trackers-dashboard-ui.tsx | 26 | "No runtime database reads", |
| src/components/custom-trackers/custom-trackers-dashboard-ui.tsx | 27 | "No runtime database writes", |
| src/components/custom-trackers/custom-trackers-dashboard-ui.tsx | 31 | "disabled", |
| src/components/custom-trackers/custom-trackers-dashboard-ui.tsx | 93 | disabled |
| src/components/custom-trackers/custom-trackers-dashboard-ui.tsx | 119 | ["No hardcoded demo data", viewModel.boundaryDisclosures.noHardcodedDemoData], |
| src/components/custom-trackers/custom-trackers-dashboard-ui.tsx | 120 | ["No fake tracker entries", viewModel.boundaryDisclosures.noFakeTrackerEntries], |
| src/components/custom-trackers/custom-trackers-dashboard-ui.tsx | 121 | ["No fake dashboard cards", viewModel.boundaryDisclosures.noFakeDashboardCards], |
| src/components/custom-trackers/custom-trackers-dashboard-ui.tsx | 122 | ["No fake AI mappings", viewModel.boundaryDisclosures.noFakeAiMappings], |
| src/components/custom-trackers/custom-trackers-dashboard-ui.tsx | 123 | ["No runtime database reads", viewModel.boundaryDisclosures.noRuntimeDatabaseReads], |
| src/components/custom-trackers/custom-trackers-dashboard-ui.tsx | 124 | ["No runtime database writes", viewModel.boundaryDisclosures.noRuntimeDatabaseWrites], |
| src/components/custom-trackers/custom-trackers-dashboard-ui.tsx | 136 | <p className="mt-2 text-xs text-slate-400">{enabled ? "enabled" : "disabled"}</p> |
| src/components/custom-trackers/custom-trackers-dashboard-ui.tsx | 177 | Actions are displayed as disabled boundaries until future approved repository persistence exists. |
| src/components/custom-trackers/custom-trackers-dashboard-ui.tsx | 184 | disabled |
| src/components/dashboard/admin-finance-dashboard-v1.tsx | 93 | title = "Read-only admin boundary", |
| src/components/dashboard/admin-finance-dashboard-v1.tsx | 213 | status: "todo", |
| src/components/dashboard/admin-finance-dashboard-v1.tsx | 275 | This panel is visibility only. It uses disabled proposal cards to show |
| src/components/dashboard/admin-finance-dashboard-v1.tsx | 288 | disabled |
| src/components/dashboard/admin-finance-dashboard-v1.tsx | 582 | Read-only operating surface for document deadlines, subscriptions, |
| src/components/dashboard/admin-finance-dashboard-v1.tsx | 687 | Read-only overview for manual accounts, budget categories, income, |
| src/components/dashboard/admin-finance-dashboard-v1.tsx | 727 | title="Read-only finance boundary" |
| src/components/dashboard/admin-finance-dashboard-v1.tsx | 770 | Read-only metadata surface for IDs, work authorization, school, |
| src/components/dashboard/admin-finance-dashboard-v1.tsx | 773 | deferred. |
| src/components/dashboard/admin-finance-dashboard-v1.tsx | 806 | title="Read-only document boundary" |
| src/components/dashboard/admin-finance-dashboard-v1.tsx | 840 | Read-only housing admin surface for rent, lease dates, utilities, |
| src/components/dashboard/admin-finance-dashboard-v1.tsx | 875 | title="Read-only housing boundary" |
| src/components/dashboard/approved-memory-read-layer-panel.tsx | 19 | * Read-only preview panel for approved-memory ranking and staleness warnings. |
| src/components/dashboard/authenticated-dashboard-shell.tsx | 24 | <SectionCard title={title} description={description} eyebrow="Read-only dashboard"> |
| src/components/dashboard/calendar-dashboard-v1.tsx | 99 | Read-only operating view for dated tasks, events, finance |
| src/components/dashboard/calendar-dashboard-v1.tsx | 106 | Read-only mode |
| src/components/dashboard/calendar-dashboard-v1.tsx | 151 | eyebrow="Phase 12 read-only deadline layer" |
| src/components/dashboard/calendar-dashboard-v1.tsx | 301 | eyebrow="Phase 13.5C read-only repair" |
| src/components/dashboard/calendar-dashboard-v1.tsx | 335 | Timeline decision: timeline_events remains deferred. The existing |
| src/components/dashboard/calendar-dashboard-v1.tsx | 336 | public.events table stays the v1 timeline/event spine until a later |
| src/components/dashboard/career-current-info-source-panel.tsx | 91 | Read-only career integration for job postings, company pages, official sources, |
| src/components/dashboard/career-current-info-source-panel.tsx | 96 | read-only career sources |
| src/components/dashboard/career-current-info-source-panel.tsx | 128 | and task creation remain confirmation-first in later phases. |
| src/components/dashboard/career-current-info-source-panel.tsx | 203 | "Phase 16L gives Career read-only current-info source visibility and cannot browse, fetch, write, apply, approve, reject, execute, or convert web-source candidates."; |
| src/components/dashboard/career-dashboard-v1.tsx | 94 | description="Applications will appear here after Career System records exist. This dashboard is read-only." |
| src/components/dashboard/career-dashboard-v1.tsx | 153 | Read-only event timeline from job_application_events. This shows movement but does not execute follow-ups. |
| src/components/dashboard/career-dashboard-v1.tsx | 326 | Read-only command surface for job applications, referrals, resume versions, interviews, |
| src/components/dashboard/career-dashboard-v1.tsx | 327 | and follow-up pressure. Carnos may surface visibility later, but this screen does not apply, |
| src/components/dashboard/career-dashboard-v1.tsx | 385 | description="Phase 8 remains read-only at the dashboard layer." |
| src/components/dashboard/career-evidence-linkage-panel.tsx | 52 | if (["todo", "in_progress", "draft", "paused"].includes(status)) { |
| src/components/dashboard/career-evidence-linkage-panel.tsx | 262 | description="Read-only linkage between career records and the operating proof system." |
| src/components/dashboard/career-prep-foundation-panel.tsx | 34 | description="Read-only foundation for behavioral stories, question bank, mock interview records, and resume usage tracking. This closes the missing career-prep layer without generating answers or taking career actions." |
| src/components/dashboard/career-prep-foundation-panel.tsx | 48 | label="Mock interviews" |
| src/components/dashboard/career-prep-foundation-panel.tsx | 50 | description="Mock interview records and review metadata." |
| src/components/dashboard/career-prep-foundation-panel.tsx | 73 | description="Mock interviews marked completed." |
| src/components/dashboard/career-proposed-action-visibility-panel.tsx | 16 | status: "todo", |
| src/components/dashboard/career-proposed-action-visibility-panel.tsx | 55 | description="Read-only preview of how career suggestions will appear before user confirmation. Phase 8 does not save, cancel, execute, or persist these proposals." |
| src/components/dashboard/career-proposed-action-visibility-panel.tsx | 60 | but all controls are disabled here and no callbacks are wired. |
| src/components/dashboard/career-proposed-action-visibility-panel.tsx | 68 | disabled |
| src/components/dashboard/career-state-boundary-panel.tsx | 36 | must stay read-only and must not start background jobs. |
| src/components/dashboard/carnos-current-info-integration-panel.tsx | 71 | Read-only bridge showing what current-info context Carnos may reference later. |
| src/components/dashboard/carnos-current-info-integration-panel.tsx | 76 | read-only bridge |
| src/components/dashboard/carnos-current-info-integration-panel.tsx | 107 | {topSourceSignal(sources)} Pending candidates stay review-only until a later approved save flow. |
| src/components/dashboard/carnos-current-info-integration-panel.tsx | 175 | "Phase 16K gives Carnos read-only current-info awareness and cannot browse, fetch, write, approve, reject, execute, or convert current-info candidates to memory."; |
| src/components/dashboard/carnos-entity-state-panel.tsx | 15 | * no SQL reads or writes, no provider calls, no embeddings, no standalone /memory route. |
| src/components/dashboard/carnos-entity-state-panel.tsx | 22 | function toneForPolicy(status: "locked" \| "needs_review" \| "deferred") { |
| src/components/dashboard/carnos-entity-state-panel.tsx | 186 | Boundary object: {PHASE_15H_CARNOS_ENTITY_STATE_BOUNDARY.name}. Preview only; no approval, no persistence, no Supabase calls, no SQL reads or writes, no retrieval, no embeddings, no provider calls, no hidden Carnos prompt injection, no context pack builder. |
| src/components/dashboard/carnos-lightweight-companion-panel.tsx | 11 | * - visual-only |
| src/components/dashboard/carnos-lightweight-companion-panel.tsx | 31 | data-carnos-runtime-boundary="visual-only" |
| src/components/dashboard/carnos-lightweight-companion-panel.tsx | 66 | visual-only. |
| src/components/dashboard/carnos-memory-visibility-panel.tsx | 28 | * no provider calls |
| src/components/dashboard/carnos-memory-visibility-panel.tsx | 363 | reads or writes, no retrieval, no embeddings, no provider calls, no |
| src/components/dashboard/carnos-visual-identity-panel.tsx | 91 | Visual-only |
| src/components/dashboard/carnos-visual-identity-panel.tsx | 123 | subtitle="Dashboard-safe capability truthfulness: what is enabled, what is foundational, what is deferred, what needs confirmation, what is planned, and what is forbidden." |
| src/components/dashboard/command-dashboard-v1.tsx | 109 | visual-only dashboard companion. |
| src/components/dashboard/command-dashboard-v1.tsx | 128 | view is read-only and preserves the proposed-action confirmation |
| src/components/dashboard/command-dashboard-v1.tsx | 162 | eyebrow="Phase 12 read-only command layer" |
| src/components/dashboard/command-dashboard-v1.tsx | 271 | <StatusPill label="read-only" tone="info" /> |
| src/components/dashboard/command-dashboard-v1.tsx | 323 | detail remains read-only until safe write flows are explicitly |
| src/components/dashboard/cross-domain-memory-integration-panel.tsx | 32 | action={<StatusPill label="Preview only · no runtime memory" tone="warning" />} |
| src/components/dashboard/cross-domain-memory-integration-panel.tsx | 45 | no provider calls, no hidden Carnos prompt injection, no action execution, and no standalone /memory route. |
| src/components/dashboard/cross-domain-memory-integration-panel.tsx | 53 | description="Each surface shows where memory may become visible later, which event labels must be transparent, and which hidden behaviors remain blocked." |
| src/components/dashboard/current-context-pack-builder-panel.tsx | 290 | reads or writes, no embeddings, no provider calls, no hidden Carnos |
| src/components/dashboard/current-info-review-to-save-panel.tsx | 71 | Approve/reject/save execution remains deferred. Existing proposed-action contracts only support |
| src/components/dashboard/current-info-ui-components.tsx | 359 | Read-only UI for current-info queries, sources, review candidates, evidence quality, |
| src/components/dashboard/current-info-ui-components.tsx | 364 | <CurrentInfoStatusBadge label="read-only UI" tone="success" /> |
| src/components/dashboard/current-info-ui-components.tsx | 395 | "Phase 16J current-info UI components are read-only presentation components and cannot browse, fetch, write, approve, reject, execute, or convert candidates to memory."; |
| src/components/dashboard/current-info-web-source-audit-trail-panel.tsx | 37 | Read-only trace of current-info search, source, candidate, save, link, stale, |
| src/components/dashboard/current-info-web-source-audit-trail-panel.tsx | 42 | read-only ledger |
| src/components/dashboard/domain-read-page.tsx | 269 | {config.description} This page uses filtered read-only records from |
| src/components/dashboard/domain-read-page.tsx | 276 | label={readErrors.length > 0 ? "Read warning" : "Read-only mode"} |
| src/components/dashboard/domain-read-page.tsx | 300 | description="Filtered read-only records from existing Phase 4 repository helpers." |
| src/components/dashboard/embedding-boundary-panel.tsx | 14 | * disabled by design. |
| src/components/dashboard/embedding-boundary-panel.tsx | 16 | * no provider calls. |
| src/components/dashboard/embedding-boundary-panel.tsx | 42 | description="Disabled-by-design boundary for future memory and knowledge embeddings. This panel uses a local noop provider only and does not generate embeddings, call providers, write SQL, use vector search, or inject hidden Carnos context." |
| src/components/dashboard/embedding-boundary-panel.tsx | 47 | <StatusPill label="disabled by design" tone="warning" /> |
| src/components/dashboard/embedding-boundary-panel.tsx | 49 | <StatusPill label="no provider calls" tone="danger" /> |
| src/components/dashboard/embedding-boundary-panel.tsx | 81 | description="Noop provider confirms that future embedding infrastructure is blocked until an explicit later implementation phase." |
| src/components/dashboard/embedding-boundary-panel.tsx | 117 | description="Phase 15N shows what would be checked later, but does not embed memory, knowledge, retrieval refs, context packs, or Carnos responses." |
| src/components/dashboard/embedding-boundary-panel.tsx | 157 | description={`Boundary object: ${PHASE_15N_EMBEDDING_BOUNDARY.name}. This phase adds only a visible noop provider contract. No embeddings generated, no provider calls, no SQL reads or writes, no Supabase calls, no vector search, no pgvector, no hidden Carnos prompt injection, and no standalone /memo |
| src/components/dashboard/forget-delete-derived-records-panel.tsx | 21 | * no provider calls. |
| src/components/dashboard/forget-delete-derived-records-panel.tsx | 68 | label="Blocked/deferred" |
| src/components/dashboard/forget-delete-derived-records-panel.tsx | 70 | description="Runtime delete disabled." |
| src/components/dashboard/forget-delete-derived-records-panel.tsx | 124 | description="All runtime execution stays blocked/deferred because destructive delete, SQL runtime, Supabase runtime, and audit persistence are not enabled here." |
| src/components/dashboard/forget-delete-derived-records-panel.tsx | 127 | label={`${summary.blocked_request_count} blocked/deferred`} |
| src/components/dashboard/forget-delete-derived-records-panel.tsx | 145 | title="Audit events that would be created later" |
| src/components/dashboard/forget-delete-derived-records-panel.tsx | 169 | description={`Boundary object: ${PHASE_15O_FORGET_DELETE_DERIVED_RECORDS_BOUNDARY.name}. No destructive delete, no SQL reads or writes, no Supabase calls, no embeddings, no vector search, no provider calls, no hidden Carnos prompt injection, and no standalone /memory route.`} |
| src/components/dashboard/goals-dashboard-v1.tsx | 31 | Read-only operating view for active goals, linked execution pressure, recent proof, and pending confirmations. This surface keeps goal reality visible before any confirmed mutation flow. |
| src/components/dashboard/goals-dashboard-v1.tsx | 35 | Read-only mode |
| src/components/dashboard/grimoire-dashboard-v1.tsx | 135 | <p className="font-semibold">Read-only Grimoire boundary</p> |
| src/components/dashboard/grimoire-dashboard-v1.tsx | 266 | description="Read-only guide contract for how Athena should translate symbolic modes into practical action later." |
| src/components/dashboard/grimoire-dashboard-v1.tsx | 308 | description="Final read-only boundary for truth, safety, reality, long-term direction, and identity stability." |
| src/components/dashboard/grimoire-dashboard-v1.tsx | 346 | label: "Read-only boundary", |
| src/components/dashboard/grimoire-dashboard-v1.tsx | 394 | description="Read-only safety summary before Phase 13 closeout. This panel only reports state; it does not repair, save, activate, or execute." |
| src/components/dashboard/grimoire-dashboard-v1.tsx | 416 | Phase 13 remains a read-only Grimoire-to-Action surface. All preview |
| src/components/dashboard/grimoire-dashboard-v1.tsx | 417 | cards are disabled. Athena generation, proposed-action persistence, |
| src/components/dashboard/grimoire-dashboard-v1.tsx | 432 | description="Read-only view of available modes. Activation remains deferred to later confirmation flows." |
| src/components/dashboard/grimoire-dashboard-v1.tsx | 473 | description="Read-only view of mode-to-mission logs and proof/action mapping." |
| src/components/dashboard/grimoire-dashboard-v1.tsx | 546 | "Symbol-to-action translator preview: convert the selected Grimoire mode into one practical mission task. This card is disabled and does not persist anything.", |
| src/components/dashboard/grimoire-dashboard-v1.tsx | 549 | description: `${missionText} Choose one visible action that can be completed and later reviewed as proof.`, |
| src/components/dashboard/grimoire-dashboard-v1.tsx | 552 | status: "todo", |
| src/components/dashboard/grimoire-dashboard-v1.tsx | 616 | description="Deterministic read-only translation preview: mode and mission context become disabled proposed-action cards for task, daily log, and proof capture. Nothing is saved or executed here." |
| src/components/dashboard/grimoire-dashboard-v1.tsx | 659 | daily log, or proof item. They are disabled previews only. This card does not call AI, |
| src/components/dashboard/grimoire-dashboard-v1.tsx | 669 | disabled |
| src/components/dashboard/grimoire-dashboard-v1.tsx | 705 | "Corruption detector preview: convert an open Grimoire risk into one corrective task. This card is disabled and does not persist anything.", |
| src/components/dashboard/grimoire-dashboard-v1.tsx | 711 | status: "todo", |
| src/components/dashboard/grimoire-dashboard-v1.tsx | 757 | description="Read-only corruption risk visibility for fantasy loops, avoidance, overdrive, identity inflation, and proof replacement. Corrections are shown as disabled previews only." |
| src/components/dashboard/grimoire-dashboard-v1.tsx | 827 | These correction cards are disabled previews. The detector does not save tasks, |
| src/components/dashboard/grimoire-dashboard-v1.tsx | 829 | Grimoire records. User confirmation and server-owned persistence remain deferred. |
| src/components/dashboard/grimoire-dashboard-v1.tsx | 838 | disabled |
| src/components/dashboard/grimoire-dashboard-v1.tsx | 919 | status: "todo", |
| src/components/dashboard/grimoire-dashboard-v1.tsx | 928 | "Preview only: reversion completion should be reflected as a daily log note after explicit confirmation in a later safe-write flow.", |
| src/components/dashboard/grimoire-dashboard-v1.tsx | 975 | status: "todo", |
| src/components/dashboard/grimoire-dashboard-v1.tsx | 1020 | description="Read-only recovery surface for pending reversion records. Completion remains unavailable until a later explicit confirmation flow." |
| src/components/dashboard/grimoire-dashboard-v1.tsx | 1076 | disabled |
| src/components/dashboard/grimoire-dashboard-v1.tsx | 1107 | description="Read-only audit prompts for truth, safety, direction, and identity stability, with disabled preview actions for later confirmation." |
| src/components/dashboard/grimoire-dashboard-v1.tsx | 1131 | later explicit confirmation. This Phase 13J panel is display-only. |
| src/components/dashboard/grimoire-dashboard-v1.tsx | 1151 | disabled |
| src/components/dashboard/health-body-action-boundary-panels.tsx | 92 | status: "todo", |
| src/components/dashboard/health-body-action-boundary-panels.tsx | 139 | This panel is visibility only. It uses disabled proposal cards to show the review shape. |
| src/components/dashboard/health-body-action-boundary-panels.tsx | 149 | disabled |
| src/components/dashboard/health-body-action-boundary-panels.tsx | 195 | skeletons must stay read-only and must not start background work. |
| src/components/dashboard/health-body-dashboard-states.tsx | 26 | title = "Read-only health boundary", |
| src/components/dashboard/health-body-dashboard-v1.tsx | 130 | Read-only overview for body, training, nutrition, supplements, sleep, energy, |
| src/components/dashboard/health-body-dashboard-v1.tsx | 137 | <p className="font-medium">Read-only boundary</p> |
| src/components/dashboard/health-body-dashboard-v1.tsx | 139 | Writes stay disabled until safe confirmation flows are added. |
| src/components/dashboard/health-body-dashboard-v1.tsx | 192 | description="Once records exist in the confirmed health/body tables, this read-only dashboard will summarize recent body, training, nutrition, sleep, energy, emotion, haircare, skincare, and product activity." |
| src/components/dashboard/health-body-detail-panels.tsx | 213 | description="Read-only focused detail for the latest body, workout, exercise, and workout-set records." |
| src/components/dashboard/health-body-detail-panels.tsx | 304 | description="Read-only focused detail for the latest nutrition log and meal item." |
| src/components/dashboard/health-body-detail-panels.tsx | 366 | description="Read-only focused detail for supplement records, supplement logs, and product context." |
| src/components/dashboard/health-body-detail-panels.tsx | 443 | description="Read-only focused detail for sleep, energy, fatigue, focus, stress, and mental-state records." |
| src/components/dashboard/health-body-detail-panels.tsx | 520 | description="Read-only focused detail for emotion, mental-state, and reflection records." |
| src/components/dashboard/health-body-detail-panels.tsx | 595 | description="Read-only focused detail for haircare, skincare, and product routine records." |
| src/components/dashboard/health-body-detail-panels.tsx | 647 | { title: "Visual evidence boundary", text: "Progress photos and visual evidence remain deferred until an explicit safe storage and privacy flow exists." }, |
| src/components/dashboard/health-body-emotion-dashboard-v1.tsx | 82 | Read-only emotion surface for mood, emotional patterns, triggers, reflection, |
| src/components/dashboard/health-body-emotion-dashboard-v1.tsx | 89 | <p className="font-medium">Read-only emotion view</p> |
| src/components/dashboard/health-body-emotion-dashboard-v1.tsx | 91 | Mood, reflection, regulation, and mental-state writes stay disabled until safe |
| src/components/dashboard/health-body-emotion-dashboard-v1.tsx | 99 | title="Read-only emotion boundary" |
| src/components/dashboard/health-body-emotion-dashboard-v1.tsx | 130 | description="Once emotion logs, mental health logs, or journal entries exist in the confirmed health/body tables, this read-only dashboard will summarize mood, triggers, reflection, regulation, and mental-state signals." |
| src/components/dashboard/health-body-emotion-dashboard-v1.tsx | 144 | emotional labeling as fact, body-shaming, and autonomous changes. Carnos may later propose |
| src/components/dashboard/health-body-hair-skincare-dashboard-v1.tsx | 86 | Read-only haircare and skincare surface for routines, product use, progress notes, |
| src/components/dashboard/health-body-hair-skincare-dashboard-v1.tsx | 93 | <p className="font-medium">Read-only hair skincare view</p> |
| src/components/dashboard/health-body-hair-skincare-dashboard-v1.tsx | 95 | Haircare, skincare, product, progress note, and visual evidence writes stay disabled |
| src/components/dashboard/health-body-hair-skincare-dashboard-v1.tsx | 103 | title="Read-only hair skincare boundary" |
| src/components/dashboard/health-body-hair-skincare-dashboard-v1.tsx | 134 | description="Once haircare logs, skincare logs, or product records exist in the confirmed health/body tables, this read-only dashboard will summarize routines, products, progress notes, and care consistency." |
| src/components/dashboard/health-body-hair-skincare-dashboard-v1.tsx | 149 | deferred until an explicit safe storage and privacy flow exists. |
| src/components/dashboard/health-body-linkage-panels.tsx | 132 | description="Read-only visibility for how health/body records connect to proof, goals, tasks, daily logs, and calendar events." |
| src/components/dashboard/health-body-nutrition-dashboard-v1.tsx | 81 | Read-only nutrition surface for calories, macros, meals, hydration, meal prep, |
| src/components/dashboard/health-body-nutrition-dashboard-v1.tsx | 88 | <p className="font-medium">Read-only nutrition view</p> |
| src/components/dashboard/health-body-nutrition-dashboard-v1.tsx | 90 | Food, meal, supplement, and adherence writes stay disabled until safe confirmation |
| src/components/dashboard/health-body-nutrition-dashboard-v1.tsx | 98 | title="Read-only nutrition boundary" |
| src/components/dashboard/health-body-nutrition-dashboard-v1.tsx | 128 | description="Once nutrition logs and meal items exist in the confirmed health/body tables, this read-only dashboard will summarize calories, macros, meals, hydration, meal prep, adherence, and supplement context." |
| src/components/dashboard/health-body-nutrition-dashboard-v1.tsx | 142 | body-shaming, and autonomous changes. Carnos may later propose nutrition records only |
| src/components/dashboard/health-body-sleep-energy-dashboard-v1.tsx | 81 | Read-only sleep and energy surface for sleep duration, fatigue, focus, stress, |
| src/components/dashboard/health-body-sleep-energy-dashboard-v1.tsx | 88 | <p className="font-medium">Read-only sleep energy view</p> |
| src/components/dashboard/health-body-sleep-energy-dashboard-v1.tsx | 90 | Sleep, fatigue, focus, stress, and recovery writes stay disabled until safe |
| src/components/dashboard/health-body-sleep-energy-dashboard-v1.tsx | 98 | title="Read-only sleep energy boundary" |
| src/components/dashboard/health-body-sleep-energy-dashboard-v1.tsx | 129 | description="Once sleep logs and energy logs exist in the confirmed health/body tables, this read-only dashboard will summarize sleep duration, fatigue, focus, stress, routines, and recovery signals." |
| src/components/dashboard/health-body-sleep-energy-dashboard-v1.tsx | 143 | medication claims, body-shaming, and autonomous changes. Athena may later propose sleep |
| src/components/dashboard/health-body-supplements-dashboard-v1.tsx | 82 | Read-only supplement surface for supplement records, active routines, dosage notes, |
| src/components/dashboard/health-body-supplements-dashboard-v1.tsx | 89 | <p className="font-medium">Read-only supplement view</p> |
| src/components/dashboard/health-body-supplements-dashboard-v1.tsx | 91 | Supplement, dosage, schedule, and adherence writes stay disabled until safe |
| src/components/dashboard/health-body-supplements-dashboard-v1.tsx | 99 | title="Read-only supplement boundary" |
| src/components/dashboard/health-body-supplements-dashboard-v1.tsx | 130 | description="Once supplements and supplement logs exist in the confirmed health/body tables, this read-only dashboard will summarize supplement routines, active products, dosage context, and adherence signals." |
| src/components/dashboard/health-body-supplements-dashboard-v1.tsx | 144 | efficacy claims, and autonomous changes. Carnos may later propose supplement records only |
| src/components/dashboard/interviews-dashboard-v1.tsx | 161 | Read-only interview command surface for company rounds, scheduling, prep notes, performance notes, |
| src/components/dashboard/interviews-dashboard-v1.tsx | 167 | <MetricTile label="Upcoming" value={upcomingInterviews} description="Scheduled today or later." /> |
| src/components/dashboard/interviews-dashboard-v1.tsx | 193 | description="Read-only readiness indicators from stored interview records." |
| src/components/dashboard/interviews-dashboard-v1.tsx | 209 | description="Phase 8 interviews remain read-only at the dashboard layer." |
| src/components/dashboard/knowledge-vault-alignment-v1.tsx | 232 | Read-only alignment layer showing how learning and project records become future knowledge |
| src/components/dashboard/knowledge-vault-alignment-v1.tsx | 256 | description="External evidence links available for later retrieval." |
| src/components/dashboard/knowledge-vault-alignment-v1.tsx | 274 | description="Phase 9 learning and project records are visible here as read-only source candidates for later memory/RAG phases." |
| src/components/dashboard/knowledge-vault-alignment-v1.tsx | 302 | description="Skill paths and skill records that can later feed memory, concepts, and retrieval once Phase 15 exists." |
| src/components/dashboard/knowledge-vault-alignment-v1.tsx | 310 | description="Projects and project links that can later feed build logs, portfolio evidence, and retrieval once Phase 15 exists." |
| src/components/dashboard/knowledge-vault-alignment-v1.tsx | 320 | title="Deferred memory/RAG boundary" |
| src/components/dashboard/knowledge-vault-alignment-v1.tsx | 322 | description="This route now combines Phase 9 learning/project records with read-only knowledge-vault visibility. Memory approval, embeddings, vector retrieval, web indexing, and deletion/export controls stay deferred." |
| src/components/dashboard/knowledge-vault-alignment-v1.tsx | 328 | Read-only visibility into Phase 9 learning and project source records. |
| src/components/dashboard/knowledge-vault-alignment-v1.tsx | 332 | <p className="text-sm font-semibold text-slate-100">Deferred</p> |
| src/components/dashboard/knowledge-vault-foundation-panel.tsx | 26 | * retrieval deferred. |
| src/components/dashboard/knowledge-vault-foundation-panel.tsx | 27 | * upload parsing deferred. |
| src/components/dashboard/knowledge-vault-foundation-panel.tsx | 34 | * no provider calls. |
| src/components/dashboard/knowledge-vault-foundation-panel.tsx | 66 | description="Read-only foundation for non-personal knowledge records, source metadata, tags, and links. Runtime knowledge-vault reads are active, while memory approval, writes, embeddings, provider calls, hidden Carnos context injection, and standalone /memory routing remain deferred." |
| src/components/dashboard/knowledge-vault-foundation-panel.tsx | 109 | <StatusPill label="no provider calls" tone="danger" /> |
| src/components/dashboard/knowledge-vault-foundation-panel.tsx | 116 | description="These records represent source/reference knowledge metadata with runtime read visibility. Conversion into personal memory remains deferred and requires explicit future review." |
| src/components/dashboard/knowledge-vault-foundation-panel.tsx | 229 | Deferred capabilities |
| src/components/dashboard/knowledge-vault-source-bridge-panel.tsx | 39 | Read-only bridge from current-info sources into Knowledge Vault review previews. |
| src/components/dashboard/knowledge-vault-source-bridge-panel.tsx | 44 | read-only bridge |
| src/components/dashboard/knowledge-vault-source-bridge-panel.tsx | 73 | Review bridge records as evidence previews only. Saving into the Knowledge Vault remains a later |
| src/components/dashboard/learning-academy-dashboard-v1.tsx | 82 | description="Skill paths will appear here after Phase 9 learning records exist. This dashboard is read-only." |
| src/components/dashboard/learning-academy-dashboard-v1.tsx | 203 | <SectionCard title="Quiz bank" eyebrow="checks" description="Read-only quiz inventory for skill validation."> |
| src/components/dashboard/learning-academy-dashboard-v1.tsx | 322 | Read-only skill-building command surface for skill paths, mastery progress, study sessions, |
| src/components/dashboard/learning-academy-dashboard-v1.tsx | 363 | description="Aggregated read-only metrics from Phase 9 learning tables." |
| src/components/dashboard/learning-project-detail-panels.tsx | 141 | description="Read-only focused view for the first available skill path, skill, and progress record." |
| src/components/dashboard/learning-project-detail-panels.tsx | 235 | description="Read-only focused view for session execution, quiz configuration, and recent attempt outcome." |
| src/components/dashboard/learning-project-detail-panels.tsx | 338 | description="Read-only focused view for project execution, milestone pressure, quality signals, tests, and release state." |
| src/components/dashboard/learning-project-linkage-panels.tsx | 77 | status: "todo", |
| src/components/dashboard/learning-project-linkage-panels.tsx | 192 | description="Read-only linkage surface showing how learning and project records can support proof, README, resume, and career evidence." |
| src/components/dashboard/learning-project-linkage-panels.tsx | 243 | description="Read-only operating linkage for Phase 9 records." |
| src/components/dashboard/learning-project-linkage-panels.tsx | 283 | Timeline references remain read-only and should only be created through safe server-owned flows. |
| src/components/dashboard/learning-project-linkage-panels.tsx | 303 | This panel is visibility only. Python/ML may advise later, but the app must validate, |
| src/components/dashboard/learning-project-linkage-panels.tsx | 312 | disabled |
| src/components/dashboard/learning-project-linkage-panels.tsx | 360 | skeletons must stay read-only and must not start background jobs. |
| src/components/dashboard/memory-audit-usage-transparency-panel.tsx | 28 | * no provider calls. |
| src/components/dashboard/memory-audit-usage-transparency-panel.tsx | 99 | event.would_write_memory_events ? "would write memory_events later" : "no event write", |
| src/components/dashboard/memory-audit-usage-transparency-panel.tsx | 142 | description="Later only." |
| src/components/dashboard/memory-audit-usage-transparency-panel.tsx | 147 | description="Later only." |
| src/components/dashboard/memory-audit-usage-transparency-panel.tsx | 189 | description={`Boundary object: ${PHASE_15P_MEMORY_AUDIT_USAGE_TRANSPARENCY_BOUNDARY.name}. No SQL reads or writes, no Supabase calls, no persistence, no embeddings, no vector search, no provider calls, no hidden Carnos prompt injection, and no standalone /memory route.`} |
| src/components/dashboard/memory-inbox-preview-panel.tsx | 199 | "Approve disabled", |
| src/components/dashboard/memory-inbox-preview-panel.tsx | 200 | "Edit disabled", |
| src/components/dashboard/memory-inbox-preview-panel.tsx | 201 | "Reject disabled", |
| src/components/dashboard/memory-inbox-preview-panel.tsx | 202 | "Archive disabled", |
| src/components/dashboard/memory-inbox-preview-panel.tsx | 203 | "Forget disabled", |
| src/components/dashboard/memory-inbox-preview-panel.tsx | 204 | "Mark sensitive disabled", |
| src/components/dashboard/memory-inbox-preview-panel.tsx | 205 | "Merge disabled", |
| src/components/dashboard/memory-inbox-preview-panel.tsx | 206 | "Resolve conflict disabled", |
| src/components/dashboard/memory-inbox-preview-panel.tsx | 215 | disabled |
| src/components/dashboard/memory-inbox-preview-panel.tsx | 307 | description="Hints only. Merge stays disabled until a later confirmed write phase." |
| src/components/dashboard/memory-inbox-preview-panel.tsx | 325 | description="Conflict visibility only. Resolution remains disabled in Phase 15E." |
| src/components/dashboard/memory-inbox-preview-panel.tsx | 406 | description="Candidates appear here for human review. All review buttons are intentionally disabled in this phase." |
| src/components/dashboard/memory-inbox-preview-panel.tsx | 411 | description="When the Phase 15D candidate engine is connected to a later review surface, candidate previews will appear here before any approval or persistence is allowed." |
| src/components/dashboard/memory-inbox-preview-panel.tsx | 428 | eyebrow="Phase 15E disabled scope" |
| src/components/dashboard/memory-inbox-preview-panel.tsx | 436 | <p>• No provider calls.</p> |
| src/components/dashboard/memory-inbox-preview-panel.tsx | 452 | "approve disabled", |
| src/components/dashboard/memory-inbox-preview-panel.tsx | 453 | "edit disabled", |
| src/components/dashboard/memory-inbox-preview-panel.tsx | 454 | "reject disabled", |
| src/components/dashboard/memory-inbox-preview-panel.tsx | 455 | "archive disabled", |
| src/components/dashboard/memory-inbox-preview-panel.tsx | 456 | "forget disabled", |
| src/components/dashboard/memory-inbox-preview-panel.tsx | 457 | "mark sensitive disabled", |
| src/components/dashboard/memory-inbox-preview-panel.tsx | 458 | "merge disabled", |
| src/components/dashboard/memory-inbox-preview-panel.tsx | 459 | "resolve conflict disabled", |
| src/components/dashboard/memory-inbox-preview-panel.tsx | 468 | "no provider calls", |
| src/components/dashboard/memory-privacy-rules-panel.tsx | 21 | * Read-only preview panel for memory privacy controls. It displays how private |
| src/components/dashboard/memory-privacy-rules-panel.tsx | 36 | * no provider calls |
| src/components/dashboard/memory-privacy-rules-panel.tsx | 283 | or require review for candidate memories. It is read-only and does not |
| src/components/dashboard/memory-privacy-rules-panel.tsx | 349 | description="These controls are contract-only in Phase 15F. Real toggles, writes, and persisted settings mutation remain deferred." |
| src/components/dashboard/networking-dashboard-v1.tsx | 215 | Read-only relationship command surface for contacts, interactions, referrals, and follow-up pressure. |
| src/components/dashboard/networking-dashboard-v1.tsx | 267 | description="Phase 8 networking remains read-only at the dashboard layer." |
| src/components/dashboard/operating-dashboard-card.tsx | 46 | "This card could not load its read-only dashboard data. Refresh or inspect the source table wiring." |
| src/components/dashboard/placeholder-dashboard-page.tsx | 2 | import type { PlaceholderRouteDecision } from "@/lib/placeholder-route-decisions"; |
| src/components/dashboard/placeholder-dashboard-page.tsx | 15 | Phase 13.5F intentional placeholder route |
| src/components/dashboard/placeholder-dashboard-page.tsx | 29 | This canonical route is intentionally deferred. It is kept in navigation and route |
| src/components/dashboard/placeholder-dashboard-page.tsx | 34 | Later phase: {decision.laterPhase} |
| src/components/dashboard/placeholder-dashboard-page.tsx | 40 | <p className="text-sm font-semibold text-white">Why deferred</p> |
| src/components/dashboard/placeholder-dashboard-page.tsx | 47 | This page is read-only and does not mutate records, create proposed actions, call AI, |
| src/components/dashboard/project-builder-dashboard-v1.tsx | 108 | description="Projects will appear here after Phase 9 project records exist. This dashboard is read-only." |
| src/components/dashboard/project-builder-dashboard-v1.tsx | 235 | <SectionCard title="Test runs" eyebrow="evidence" description="Read-only quality checks and pass/fail evidence."> |
| src/components/dashboard/project-builder-dashboard-v1.tsx | 375 | Read-only project shipping surface for portfolio projects, milestones, releases, bugs, |
| src/components/dashboard/project-builder-dashboard-v1.tsx | 416 | description="Aggregated read-only metrics from Phase 9 project tables." |
| src/components/dashboard/project-system-state-memory-panel.tsx | 11 | * project continuity, system continuity, active boundaries, deferred scope, |
| src/components/dashboard/project-system-state-memory-panel.tsx | 15 | * no embeddings, no provider calls, no Supabase calls, no SQL reads or writes, |
| src/components/dashboard/project-system-state-memory-panel.tsx | 82 | boundaries, deferred scope, verification gates, and outdated |
| src/components/dashboard/project-system-state-memory-panel.tsx | 165 | <ListBlock title="Deferred scope" items={project.deferred_scope} /> |
| src/components/dashboard/project-system-state-memory-panel.tsx | 184 | reads or writes, no retrieval, no embeddings, no provider calls, no |
| src/components/dashboard/proof-dashboard-v1.tsx | 30 | Read-only proof surface for evidence, goal support, execution receipts, and recent proof signals. This remains a component-only surface because `/proof` is not part of the current canonical route list. |
| src/components/dashboard/proof-dashboard-v1.tsx | 34 | Read-only component |
| src/components/dashboard/research-current-info-source-panel.tsx | 112 | Read-only visibility for papers, labs, professors, Stanford targets, citations, |
| src/components/dashboard/research-current-info-source-panel.tsx | 118 | read-only research sources |
| src/components/dashboard/research-current-info-source-panel.tsx | 149 | {researchSignalLabel(researchSources)} Treat all sources as evidence previews until a later |
| src/components/dashboard/research-current-info-source-panel.tsx | 225 | "Phase 16M gives Research and Stanford surfaces read-only current-info source visibility and cannot browse, fetch, write, cite, approve, reject, execute, or convert web-source candidates."; |
| src/components/dashboard/research-detail-panels.tsx | 167 | description="Focused read-only detail for the first available research idea and question." |
| src/components/dashboard/research-detail-panels.tsx | 205 | description="Focused read-only detail for the first available literature, benchmark, dataset, paper, or source record." |
| src/components/dashboard/research-detail-panels.tsx | 241 | description="Focused read-only detail for claim support status, citation purpose, and evidence linkage." |
| src/components/dashboard/research-detail-panels.tsx | 289 | description="Focused read-only detail for reproducibility, experiment state, result records, and project/paper links." |
| src/components/dashboard/research-detail-panels.tsx | 347 | description="Focused read-only detail for paper readiness, versioning, target venues, submissions, and review feedback." |
| src/components/dashboard/research-detail-panels.tsx | 429 | description="Focused read-only detail for PhD target fit, lab alignment, professor mapping, and outreach state." |
| src/components/dashboard/research-detail-panels.tsx | 493 | description="Focused read-only detail for PhD readiness checks, application assets, SOP versions, and recommendation targets." |
| src/components/dashboard/research-linkage-boundary-panels.tsx | 93 | description="Read-only view of how research records connect to ideas, literature, claims, experiments, results, papers, projects, goals, proof, and resume evidence." |
| src/components/dashboard/research-linkage-boundary-panels.tsx | 182 | description="Read-only view of how PhD targets connect to universities, labs, professors, research ideas, projects, assets, SOPs, recommendation targets, and proof evidence." |
| src/components/dashboard/research-proposed-action-visibility-panel.tsx | 18 | status: "todo", |
| src/components/dashboard/research-proposed-action-visibility-panel.tsx | 61 | description="Read-only preview of how research and Stanford suggestions may appear before user confirmation. Phase 10 does not save, cancel, execute, or persist these proposals." |
| src/components/dashboard/research-proposed-action-visibility-panel.tsx | 66 | the confirmation shape, but all controls are disabled here and no callbacks are wired. |
| src/components/dashboard/research-proposed-action-visibility-panel.tsx | 76 | disabled |
| src/components/dashboard/resume-dashboard-v1.tsx | 157 | Read-only resume control surface for versions, target roles, target companies, keywords, bullets, |
| src/components/dashboard/resume-dashboard-v1.tsx | 209 | description="Phase 8 resume remains read-only at the dashboard layer." |

## 14. npm Verification

Not run. Use `--run-check`.

## 15. Machine Evidence

Full JSON evidence: `docs/fixtures/full-project-connectivity/phase_0_20_final_connectivity_v3.json`

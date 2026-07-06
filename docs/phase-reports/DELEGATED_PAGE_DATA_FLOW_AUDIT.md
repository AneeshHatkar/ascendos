# Delegated Page Data Flow Audit

Generated audit. Do not treat as completion claim.

## Summary

- Pages checked: 37
- Pages with runtime/delegated data signal: 30
- Pages with page/component state signal: 32
- Pages requiring review: 16

## Pages Requiring Review

- src/app/analytics/page.tsx
- src/app/auth/login/page.tsx
- src/app/auth/signup/page.tsx
- src/app/carnos/page.tsx
- src/app/creativity/page.tsx
- src/app/custom-trackers/page.tsx
- src/app/decisions/page.tsx
- src/app/experiments/page.tsx
- src/app/future-simulator/page.tsx
- src/app/knowledge/page.tsx
- src/app/page.tsx
- src/app/privacy/page.tsx
- src/app/projects/page.tsx
- src/app/research-lab/page.tsx
- src/app/research-stanford/page.tsx
- src/app/settings/page.tsx

## Page Details

### src/app/analytics/page.tsx
- Runtime/delegated data signal: yes
- Empty/error/loading state signal: yes
- Component names: StatusPill, AuthenticatedDashboardShell, MetricTile, SectionCard, DataList, EmptyState, AnalyticsDashboardUi, SelfExperimentLabUi
- Component files: src/components/dashboard/status-pill.tsx, src/components/dashboard/authenticated-dashboard-shell.tsx, src/components/dashboard/health-body-dashboard-v1.tsx, src/components/dashboard/section-card.tsx, src/components/dashboard/data-list.tsx, src/components/dashboard/empty-state.tsx, src/components/analytics-experiments/analytics-dashboard-ui.tsx, src/components/analytics-experiments/self-experiment-lab-ui.tsx
- Runtime component files: src/components/dashboard/authenticated-dashboard-shell.tsx, src/components/dashboard/health-body-dashboard-v1.tsx
- State component files: src/components/dashboard/status-pill.tsx, src/components/dashboard/authenticated-dashboard-shell.tsx, src/components/dashboard/health-body-dashboard-v1.tsx, src/components/dashboard/data-list.tsx, src/components/dashboard/empty-state.tsx, src/components/analytics-experiments/analytics-dashboard-ui.tsx, src/components/analytics-experiments/self-experiment-lab-ui.tsx

### src/app/auth/login/page.tsx
- Runtime/delegated data signal: no
- Empty/error/loading state signal: yes
- Component names: Link
- Component files: src/components/dashboard/career-evidence-linkage-panel.tsx
- Runtime component files: none
- State component files: src/components/dashboard/career-evidence-linkage-panel.tsx

### src/app/auth/signup/page.tsx
- Runtime/delegated data signal: no
- Empty/error/loading state signal: yes
- Component names: Link
- Component files: src/components/dashboard/career-evidence-linkage-panel.tsx
- Runtime component files: none
- State component files: src/components/dashboard/career-evidence-linkage-panel.tsx

### src/app/body/page.tsx
- Runtime/delegated data signal: yes
- Empty/error/loading state signal: yes
- Component names: AuthenticatedDashboardShell, HealthBodyDashboardV1
- Component files: src/components/dashboard/authenticated-dashboard-shell.tsx, src/components/dashboard/health-body-dashboard-v1.tsx
- Runtime component files: src/components/dashboard/authenticated-dashboard-shell.tsx, src/components/dashboard/health-body-dashboard-v1.tsx
- State component files: src/components/dashboard/authenticated-dashboard-shell.tsx, src/components/dashboard/health-body-dashboard-v1.tsx

### src/app/calendar/page.tsx
- Runtime/delegated data signal: yes
- Empty/error/loading state signal: yes
- Component names: StatusPill, CalendarGroup, AuthenticatedDashboardShell, CalendarDashboardV1, CalendarTimelineProposalComposer, MetricTile, SectionCard, DataList, EmptyState
- Component files: src/components/dashboard/status-pill.tsx, src/components/dashboard/authenticated-dashboard-shell.tsx, src/components/dashboard/calendar-dashboard-v1.tsx, src/components/calendar/calendar-timeline-proposal-composer.tsx, src/components/dashboard/health-body-dashboard-v1.tsx, src/components/dashboard/section-card.tsx, src/components/dashboard/data-list.tsx, src/components/dashboard/empty-state.tsx
- Runtime component files: src/components/dashboard/authenticated-dashboard-shell.tsx, src/components/dashboard/calendar-dashboard-v1.tsx, src/components/dashboard/health-body-dashboard-v1.tsx
- State component files: src/components/dashboard/status-pill.tsx, src/components/dashboard/authenticated-dashboard-shell.tsx, src/components/dashboard/calendar-dashboard-v1.tsx, src/components/calendar/calendar-timeline-proposal-composer.tsx, src/components/dashboard/health-body-dashboard-v1.tsx, src/components/dashboard/data-list.tsx, src/components/dashboard/empty-state.tsx

### src/app/career/page.tsx
- Runtime/delegated data signal: yes
- Empty/error/loading state signal: yes
- Component names: AuthenticatedDashboardShell, CareerCurrentInfoSourcePanel, CareerDashboardV1
- Component files: src/components/dashboard/authenticated-dashboard-shell.tsx, src/components/dashboard/career-current-info-source-panel.tsx, src/components/dashboard/career-dashboard-v1.tsx
- Runtime component files: src/components/dashboard/authenticated-dashboard-shell.tsx, src/components/dashboard/career-current-info-source-panel.tsx, src/components/dashboard/career-dashboard-v1.tsx
- State component files: src/components/dashboard/authenticated-dashboard-shell.tsx, src/components/dashboard/career-current-info-source-panel.tsx, src/components/dashboard/career-dashboard-v1.tsx

### src/app/carnos/page.tsx
- Runtime/delegated data signal: yes
- Empty/error/loading state signal: yes
- Component names: AuthenticatedDashboardShell, CarnosVisualIdentityPanel, CarnosVoicePanelIntegration, CarnosMemoryVisibilityPanel, CrossDomainMemoryIntegrationPanel
- Component files: src/components/dashboard/authenticated-dashboard-shell.tsx, src/components/dashboard/carnos-visual-identity-panel.tsx, src/components/voice/carnos-voice-panel-integration.tsx, src/components/dashboard/carnos-memory-visibility-panel.tsx, src/components/dashboard/cross-domain-memory-integration-panel.tsx
- Runtime component files: src/components/dashboard/authenticated-dashboard-shell.tsx, src/components/dashboard/carnos-memory-visibility-panel.tsx
- State component files: src/components/dashboard/authenticated-dashboard-shell.tsx, src/components/dashboard/carnos-memory-visibility-panel.tsx, src/components/dashboard/cross-domain-memory-integration-panel.tsx

### src/app/command/page.tsx
- Runtime/delegated data signal: yes
- Empty/error/loading state signal: yes
- Component names: AuthenticatedDashboardShell, CommandDashboardV1
- Component files: src/components/dashboard/authenticated-dashboard-shell.tsx, src/components/dashboard/command-dashboard-v1.tsx
- Runtime component files: src/components/dashboard/authenticated-dashboard-shell.tsx, src/components/dashboard/command-dashboard-v1.tsx
- State component files: src/components/dashboard/authenticated-dashboard-shell.tsx, src/components/dashboard/command-dashboard-v1.tsx

### src/app/creativity/page.tsx
- Runtime/delegated data signal: no
- Empty/error/loading state signal: no
- Component names: PlaceholderDashboardPage
- Component files: src/components/dashboard/placeholder-dashboard-page.tsx
- Runtime component files: none
- State component files: none

### src/app/custom-trackers/page.tsx
- Runtime/delegated data signal: no
- Empty/error/loading state signal: yes
- Component names: CustomTrackersDashboardUi
- Component files: src/components/custom-trackers/custom-trackers-dashboard-ui.tsx
- Runtime component files: none
- State component files: src/components/custom-trackers/custom-trackers-dashboard-ui.tsx

### src/app/decisions/page.tsx
- Runtime/delegated data signal: no
- Empty/error/loading state signal: no
- Component names: PlaceholderDashboardPage
- Component files: src/components/dashboard/placeholder-dashboard-page.tsx
- Runtime component files: none
- State component files: none

### src/app/documents/page.tsx
- Runtime/delegated data signal: yes
- Empty/error/loading state signal: yes
- Component names: AuthenticatedDashboardShell, DocumentsDashboardV1
- Component files: src/components/dashboard/authenticated-dashboard-shell.tsx, src/components/dashboard/admin-finance-dashboard-v1.tsx
- Runtime component files: src/components/dashboard/authenticated-dashboard-shell.tsx, src/components/dashboard/admin-finance-dashboard-v1.tsx
- State component files: src/components/dashboard/authenticated-dashboard-shell.tsx, src/components/dashboard/admin-finance-dashboard-v1.tsx

### src/app/emotion/page.tsx
- Runtime/delegated data signal: yes
- Empty/error/loading state signal: yes
- Component names: AuthenticatedDashboardShell, HealthBodyEmotionDashboardV1
- Component files: src/components/dashboard/authenticated-dashboard-shell.tsx, src/components/dashboard/health-body-emotion-dashboard-v1.tsx
- Runtime component files: src/components/dashboard/authenticated-dashboard-shell.tsx, src/components/dashboard/health-body-emotion-dashboard-v1.tsx
- State component files: src/components/dashboard/authenticated-dashboard-shell.tsx, src/components/dashboard/health-body-emotion-dashboard-v1.tsx

### src/app/experiments/page.tsx
- Runtime/delegated data signal: no
- Empty/error/loading state signal: no
- Component names: PlaceholderDashboardPage
- Component files: src/components/dashboard/placeholder-dashboard-page.tsx
- Runtime component files: none
- State component files: none

### src/app/finance/page.tsx
- Runtime/delegated data signal: yes
- Empty/error/loading state signal: yes
- Component names: AuthenticatedDashboardShell, FinanceDashboardV1
- Component files: src/components/dashboard/authenticated-dashboard-shell.tsx, src/components/dashboard/admin-finance-dashboard-v1.tsx
- Runtime component files: src/components/dashboard/authenticated-dashboard-shell.tsx, src/components/dashboard/admin-finance-dashboard-v1.tsx
- State component files: src/components/dashboard/authenticated-dashboard-shell.tsx, src/components/dashboard/admin-finance-dashboard-v1.tsx

### src/app/future-simulator/page.tsx
- Runtime/delegated data signal: no
- Empty/error/loading state signal: no
- Component names: PlaceholderDashboardPage
- Component files: src/components/dashboard/placeholder-dashboard-page.tsx
- Runtime component files: none
- State component files: none

### src/app/goals/page.tsx
- Runtime/delegated data signal: yes
- Empty/error/loading state signal: yes
- Component names: StatusPill, AuthenticatedDashboardShell, GoalsDashboardV1, MetricTile, GoalProofProposalComposer, SectionCard, DataList, EmptyState
- Component files: src/components/dashboard/status-pill.tsx, src/components/dashboard/authenticated-dashboard-shell.tsx, src/components/dashboard/goals-dashboard-v1.tsx, src/components/dashboard/health-body-dashboard-v1.tsx, src/components/goals/goal-proof-proposal-composer.tsx, src/components/dashboard/section-card.tsx, src/components/dashboard/data-list.tsx, src/components/dashboard/empty-state.tsx
- Runtime component files: src/components/dashboard/authenticated-dashboard-shell.tsx, src/components/dashboard/goals-dashboard-v1.tsx, src/components/dashboard/health-body-dashboard-v1.tsx
- State component files: src/components/dashboard/status-pill.tsx, src/components/dashboard/authenticated-dashboard-shell.tsx, src/components/dashboard/health-body-dashboard-v1.tsx, src/components/goals/goal-proof-proposal-composer.tsx, src/components/dashboard/data-list.tsx, src/components/dashboard/empty-state.tsx

### src/app/grimoire/page.tsx
- Runtime/delegated data signal: yes
- Empty/error/loading state signal: yes
- Component names: AuthenticatedDashboardShell, GrimoireDashboardV1
- Component files: src/components/dashboard/authenticated-dashboard-shell.tsx, src/components/dashboard/grimoire-dashboard-v1.tsx
- Runtime component files: src/components/dashboard/authenticated-dashboard-shell.tsx, src/components/dashboard/grimoire-dashboard-v1.tsx
- State component files: src/components/dashboard/authenticated-dashboard-shell.tsx, src/components/dashboard/grimoire-dashboard-v1.tsx

### src/app/hair-skincare/page.tsx
- Runtime/delegated data signal: yes
- Empty/error/loading state signal: yes
- Component names: AuthenticatedDashboardShell, HealthBodyHairSkincareDashboardV1
- Component files: src/components/dashboard/authenticated-dashboard-shell.tsx, src/components/dashboard/health-body-hair-skincare-dashboard-v1.tsx
- Runtime component files: src/components/dashboard/authenticated-dashboard-shell.tsx, src/components/dashboard/health-body-hair-skincare-dashboard-v1.tsx
- State component files: src/components/dashboard/authenticated-dashboard-shell.tsx, src/components/dashboard/health-body-hair-skincare-dashboard-v1.tsx

### src/app/housing/page.tsx
- Runtime/delegated data signal: yes
- Empty/error/loading state signal: yes
- Component names: AuthenticatedDashboardShell, HousingDashboardV1
- Component files: src/components/dashboard/authenticated-dashboard-shell.tsx, src/components/dashboard/admin-finance-dashboard-v1.tsx
- Runtime component files: src/components/dashboard/authenticated-dashboard-shell.tsx, src/components/dashboard/admin-finance-dashboard-v1.tsx
- State component files: src/components/dashboard/authenticated-dashboard-shell.tsx, src/components/dashboard/admin-finance-dashboard-v1.tsx

### src/app/interviews/page.tsx
- Runtime/delegated data signal: yes
- Empty/error/loading state signal: yes
- Component names: AuthenticatedDashboardShell, InterviewsDashboardV1
- Component files: src/components/dashboard/authenticated-dashboard-shell.tsx, src/components/dashboard/interviews-dashboard-v1.tsx
- Runtime component files: src/components/dashboard/authenticated-dashboard-shell.tsx, src/components/dashboard/interviews-dashboard-v1.tsx
- State component files: src/components/dashboard/authenticated-dashboard-shell.tsx, src/components/dashboard/interviews-dashboard-v1.tsx

### src/app/knowledge/page.tsx
- Runtime/delegated data signal: yes
- Empty/error/loading state signal: yes
- Component names: AuthenticatedDashboardShell, KnowledgeVaultFoundationPanel, RetrievalContractPanel, EmbeddingBoundaryPanel, KnowledgeVaultAlignmentV1
- Component files: src/components/dashboard/authenticated-dashboard-shell.tsx, src/components/dashboard/knowledge-vault-foundation-panel.tsx, src/components/dashboard/retrieval-contract-panel.tsx, src/components/dashboard/embedding-boundary-panel.tsx, src/components/dashboard/knowledge-vault-alignment-v1.tsx
- Runtime component files: src/components/dashboard/authenticated-dashboard-shell.tsx, src/components/dashboard/knowledge-vault-foundation-panel.tsx, src/components/dashboard/retrieval-contract-panel.tsx, src/components/dashboard/embedding-boundary-panel.tsx, src/components/dashboard/knowledge-vault-alignment-v1.tsx
- State component files: src/components/dashboard/authenticated-dashboard-shell.tsx, src/components/dashboard/knowledge-vault-foundation-panel.tsx, src/components/dashboard/retrieval-contract-panel.tsx, src/components/dashboard/embedding-boundary-panel.tsx, src/components/dashboard/knowledge-vault-alignment-v1.tsx

### src/app/learning/page.tsx
- Runtime/delegated data signal: yes
- Empty/error/loading state signal: yes
- Component names: AuthenticatedDashboardShell, LearningAcademyDashboardV1
- Component files: src/components/dashboard/authenticated-dashboard-shell.tsx, src/components/dashboard/learning-academy-dashboard-v1.tsx
- Runtime component files: src/components/dashboard/authenticated-dashboard-shell.tsx, src/components/dashboard/learning-academy-dashboard-v1.tsx
- State component files: src/components/dashboard/authenticated-dashboard-shell.tsx, src/components/dashboard/learning-academy-dashboard-v1.tsx

### src/app/life-admin/page.tsx
- Runtime/delegated data signal: yes
- Empty/error/loading state signal: yes
- Component names: AuthenticatedDashboardShell, LifeAdminDashboardV1
- Component files: src/components/dashboard/authenticated-dashboard-shell.tsx, src/components/dashboard/admin-finance-dashboard-v1.tsx
- Runtime component files: src/components/dashboard/authenticated-dashboard-shell.tsx, src/components/dashboard/admin-finance-dashboard-v1.tsx
- State component files: src/components/dashboard/authenticated-dashboard-shell.tsx, src/components/dashboard/admin-finance-dashboard-v1.tsx

### src/app/networking/page.tsx
- Runtime/delegated data signal: yes
- Empty/error/loading state signal: yes
- Component names: AuthenticatedDashboardShell, NetworkingDashboardV1
- Component files: src/components/dashboard/authenticated-dashboard-shell.tsx, src/components/dashboard/networking-dashboard-v1.tsx
- Runtime component files: src/components/dashboard/authenticated-dashboard-shell.tsx
- State component files: src/components/dashboard/authenticated-dashboard-shell.tsx, src/components/dashboard/networking-dashboard-v1.tsx

### src/app/nutrition/page.tsx
- Runtime/delegated data signal: yes
- Empty/error/loading state signal: yes
- Component names: AuthenticatedDashboardShell, HealthBodyNutritionDashboardV1
- Component files: src/components/dashboard/authenticated-dashboard-shell.tsx, src/components/dashboard/health-body-nutrition-dashboard-v1.tsx
- Runtime component files: src/components/dashboard/authenticated-dashboard-shell.tsx, src/components/dashboard/health-body-nutrition-dashboard-v1.tsx
- State component files: src/components/dashboard/authenticated-dashboard-shell.tsx, src/components/dashboard/health-body-nutrition-dashboard-v1.tsx

### src/app/page.tsx
- Runtime/delegated data signal: yes
- Empty/error/loading state signal: no
- Component names: AppShell, DashboardCard
- Component files: src/components/layout/app-shell.tsx, src/components/dashboard/dashboard-card.tsx
- Runtime component files: none
- State component files: none

### src/app/privacy/page.tsx
- Runtime/delegated data signal: yes
- Empty/error/loading state signal: yes
- Component names: AuthenticatedDashboardShell, ForgetDeleteDerivedRecordsPanel, MemoryAuditUsageTransparencyPanel, PrivacyDashboardUi
- Component files: src/components/dashboard/authenticated-dashboard-shell.tsx, src/components/dashboard/forget-delete-derived-records-panel.tsx, src/components/dashboard/memory-audit-usage-transparency-panel.tsx, src/components/privacy/privacy-dashboard-ui.tsx
- Runtime component files: src/components/dashboard/authenticated-dashboard-shell.tsx, src/components/privacy/privacy-dashboard-ui.tsx
- State component files: src/components/dashboard/authenticated-dashboard-shell.tsx, src/components/dashboard/forget-delete-derived-records-panel.tsx, src/components/dashboard/memory-audit-usage-transparency-panel.tsx, src/components/privacy/privacy-dashboard-ui.tsx

### src/app/projects/page.tsx
- Runtime/delegated data signal: yes
- Empty/error/loading state signal: yes
- Component names: AuthenticatedDashboardShell, ProjectBuilderDashboardV1
- Component files: src/components/dashboard/authenticated-dashboard-shell.tsx, src/components/dashboard/project-builder-dashboard-v1.tsx
- Runtime component files: src/components/dashboard/authenticated-dashboard-shell.tsx, src/components/dashboard/project-builder-dashboard-v1.tsx
- State component files: src/components/dashboard/authenticated-dashboard-shell.tsx, src/components/dashboard/project-builder-dashboard-v1.tsx

### src/app/research-lab/page.tsx
- Runtime/delegated data signal: yes
- Empty/error/loading state signal: yes
- Component names: AuthenticatedDashboardShell, ResearchCurrentInfoSourceServerPanel, ResearchCrossDashboardLinks, ResearchSummaryPanel, SectionCard, ResearchIdeaDetailPanel, ResearchLiteratureDetailPanel, ResearchClaimCitationDetailPanel, ResearchExperimentResultDetailPanel, ResearchPaperVenueDetailPanel, ResearchProofLinkagePanel, ResearchProposedActionVisibilityPanel, ResearchStateBoundaryPanel
- Component files: src/components/dashboard/authenticated-dashboard-shell.tsx, src/components/dashboard/research-current-info-source-panel.tsx, src/components/dashboard/cross-dashboard-links.tsx, src/components/dashboard/research-summary-panel.tsx, src/components/dashboard/section-card.tsx, src/components/dashboard/research-detail-panels.tsx, src/components/dashboard/research-detail-panels.tsx, src/components/dashboard/research-detail-panels.tsx, src/components/dashboard/research-detail-panels.tsx, src/components/dashboard/research-detail-panels.tsx, src/components/dashboard/research-linkage-boundary-panels.tsx, src/components/dashboard/research-proposed-action-visibility-panel.tsx, src/components/dashboard/research-linkage-boundary-panels.tsx
- Runtime component files: src/components/dashboard/authenticated-dashboard-shell.tsx, src/components/dashboard/research-current-info-source-panel.tsx, src/components/dashboard/research-linkage-boundary-panels.tsx, src/components/dashboard/research-linkage-boundary-panels.tsx
- State component files: src/components/dashboard/authenticated-dashboard-shell.tsx, src/components/dashboard/research-current-info-source-panel.tsx, src/components/dashboard/research-detail-panels.tsx, src/components/dashboard/research-detail-panels.tsx, src/components/dashboard/research-detail-panels.tsx, src/components/dashboard/research-detail-panels.tsx, src/components/dashboard/research-detail-panels.tsx, src/components/dashboard/research-linkage-boundary-panels.tsx, src/components/dashboard/research-linkage-boundary-panels.tsx

### src/app/research-stanford/page.tsx
- Runtime/delegated data signal: yes
- Empty/error/loading state signal: yes
- Component names: AuthenticatedDashboardShell, ResearchCurrentInfoSourceServerPanel, ResearchCrossDashboardLinks, ResearchSummaryPanel, SectionCard, StanfordProfessorLabDetailPanel, StanfordApplicationDetailPanel, StanfordProofLinkagePanel, ResearchProposedActionVisibilityPanel, ResearchStateBoundaryPanel
- Component files: src/components/dashboard/authenticated-dashboard-shell.tsx, src/components/dashboard/research-current-info-source-panel.tsx, src/components/dashboard/cross-dashboard-links.tsx, src/components/dashboard/research-summary-panel.tsx, src/components/dashboard/section-card.tsx, src/components/dashboard/research-detail-panels.tsx, src/components/dashboard/research-detail-panels.tsx, src/components/dashboard/research-linkage-boundary-panels.tsx, src/components/dashboard/research-proposed-action-visibility-panel.tsx, src/components/dashboard/research-linkage-boundary-panels.tsx
- Runtime component files: src/components/dashboard/authenticated-dashboard-shell.tsx, src/components/dashboard/research-current-info-source-panel.tsx, src/components/dashboard/research-linkage-boundary-panels.tsx, src/components/dashboard/research-linkage-boundary-panels.tsx
- State component files: src/components/dashboard/authenticated-dashboard-shell.tsx, src/components/dashboard/research-current-info-source-panel.tsx, src/components/dashboard/research-detail-panels.tsx, src/components/dashboard/research-detail-panels.tsx, src/components/dashboard/research-linkage-boundary-panels.tsx, src/components/dashboard/research-linkage-boundary-panels.tsx

### src/app/resume/page.tsx
- Runtime/delegated data signal: yes
- Empty/error/loading state signal: yes
- Component names: AuthenticatedDashboardShell, ResumeDashboardV1
- Component files: src/components/dashboard/authenticated-dashboard-shell.tsx, src/components/dashboard/resume-dashboard-v1.tsx
- Runtime component files: src/components/dashboard/authenticated-dashboard-shell.tsx
- State component files: src/components/dashboard/authenticated-dashboard-shell.tsx, src/components/dashboard/resume-dashboard-v1.tsx

### src/app/settings/page.tsx
- Runtime/delegated data signal: yes
- Empty/error/loading state signal: yes
- Component names: AuthenticatedDashboardShell, ProfileSummaryCard, SettingsPrivacyFoundationPanel
- Component files: src/components/dashboard/authenticated-dashboard-shell.tsx, src/components/profile/profile-summary-card.tsx, src/components/dashboard/settings-privacy-foundation-panel.tsx
- Runtime component files: src/components/dashboard/authenticated-dashboard-shell.tsx, src/components/dashboard/settings-privacy-foundation-panel.tsx
- State component files: src/components/dashboard/authenticated-dashboard-shell.tsx, src/components/profile/profile-summary-card.tsx, src/components/dashboard/settings-privacy-foundation-panel.tsx

### src/app/sleep-energy/page.tsx
- Runtime/delegated data signal: yes
- Empty/error/loading state signal: yes
- Component names: AuthenticatedDashboardShell, HealthBodySleepEnergyDashboardV1
- Component files: src/components/dashboard/authenticated-dashboard-shell.tsx, src/components/dashboard/health-body-sleep-energy-dashboard-v1.tsx
- Runtime component files: src/components/dashboard/authenticated-dashboard-shell.tsx, src/components/dashboard/health-body-sleep-energy-dashboard-v1.tsx
- State component files: src/components/dashboard/authenticated-dashboard-shell.tsx, src/components/dashboard/health-body-sleep-energy-dashboard-v1.tsx

### src/app/supplements/page.tsx
- Runtime/delegated data signal: yes
- Empty/error/loading state signal: yes
- Component names: AuthenticatedDashboardShell, HealthBodySupplementsDashboardV1
- Component files: src/components/dashboard/authenticated-dashboard-shell.tsx, src/components/dashboard/health-body-supplements-dashboard-v1.tsx
- Runtime component files: src/components/dashboard/authenticated-dashboard-shell.tsx, src/components/dashboard/health-body-supplements-dashboard-v1.tsx
- State component files: src/components/dashboard/authenticated-dashboard-shell.tsx, src/components/dashboard/health-body-supplements-dashboard-v1.tsx

### src/app/timeline/page.tsx
- Runtime/delegated data signal: yes
- Empty/error/loading state signal: yes
- Component names: StatusPill, TimelineGroup, AuthenticatedDashboardShell, TimelineDashboardV1, CalendarTimelineProposalComposer, MetricTile, SectionCard, DataList, EmptyState
- Component files: src/components/dashboard/status-pill.tsx, src/components/dashboard/authenticated-dashboard-shell.tsx, src/components/dashboard/timeline-dashboard-v1.tsx, src/components/calendar/calendar-timeline-proposal-composer.tsx, src/components/dashboard/health-body-dashboard-v1.tsx, src/components/dashboard/section-card.tsx, src/components/dashboard/data-list.tsx, src/components/dashboard/empty-state.tsx
- Runtime component files: src/components/dashboard/authenticated-dashboard-shell.tsx, src/components/dashboard/timeline-dashboard-v1.tsx, src/components/dashboard/health-body-dashboard-v1.tsx
- State component files: src/components/dashboard/status-pill.tsx, src/components/dashboard/authenticated-dashboard-shell.tsx, src/components/dashboard/timeline-dashboard-v1.tsx, src/components/calendar/calendar-timeline-proposal-composer.tsx, src/components/dashboard/health-body-dashboard-v1.tsx, src/components/dashboard/data-list.tsx, src/components/dashboard/empty-state.tsx

### src/app/world-class/page.tsx
- Runtime/delegated data signal: yes
- Empty/error/loading state signal: yes
- Component names: StatusPill, ReadGroup, AuthenticatedDashboardShell, MetricTile, SectionCard, DataList, EmptyState
- Component files: src/components/dashboard/status-pill.tsx, src/components/dashboard/authenticated-dashboard-shell.tsx, src/components/dashboard/health-body-dashboard-v1.tsx, src/components/dashboard/section-card.tsx, src/components/dashboard/data-list.tsx, src/components/dashboard/empty-state.tsx
- Runtime component files: src/components/dashboard/authenticated-dashboard-shell.tsx, src/components/dashboard/health-body-dashboard-v1.tsx
- State component files: src/components/dashboard/status-pill.tsx, src/components/dashboard/authenticated-dashboard-shell.tsx, src/components/dashboard/health-body-dashboard-v1.tsx, src/components/dashboard/data-list.tsx, src/components/dashboard/empty-state.tsx

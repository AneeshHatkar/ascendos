# Phase 19 Custom Trackers Expanded Scope Lock

Status: LOCKED FOR IMPLEMENTATION

Phase 19 turns ascendOS into a safe user-extensible tracking system. It adds custom tracker creation, templates, typed fields, validated entries, dashboard card placement, quick-log, Carnos-assisted proposals, document/web/source attachments, timeline and analytics compatibility, privacy controls, audit trails, RLS boundaries, duplicate detection, schema versioning, and review-before-write safety without fake data, silent AI writes, unsafe dashboard exposure, or schema chaos.

## Source-of-truth baseline

- Official Phase 19 goal: Custom tracker schema builder, entries, dashboard card placement.
- Official route: /custom-trackers.
- Official data families: custom_trackers, custom_tracker_fields, custom_tracker_entries, dashboard_cards.
- Expanded implementation path: 14 coding chunks, 19A through 19N.

## Final Phase 19 feature list

This scope lock explicitly records 138 features for Phase 19.

1. Custom Tracker Dashboard at /custom-trackers
2. Manual tracker creation
3. Tracker template library
4. Template-based tracker creation
5. Custom tracker schema builder
6. Custom tracker name, description, domain, frequency, privacy, active/inactive state
7. Custom tracker field builder
8. Allowed field type registry
9. Field type validation
10. Required/optional field rules
11. Field ordering
12. Field options JSON for select and multi-select fields
13. Field validation rules
14. Field units and normalization boundary
15. Field privacy levels
16. Field deprecation instead of unsafe hard deletion
17. Tracker schema versioning
18. Entry schema version tracking
19. Tracker archive/delete boundary
20. Custom tracker entry logging
21. Entry date handling
22. Entry notes
23. values_json validation
24. Unknown-field rejection or quarantine
25. Required field validation for entries
26. Select option validation
27. Number, rating, date, and duration validation
28. Duplicate entry detection
29. Same-day duplicate warning
30. Quick-log contract
31. Quick-log button on /custom-trackers
32. Quick-log readiness for dashboard cards
33. Repeat-last-entry support boundary
34. Favorite tracker and pinned tracker boundary
35. Tracker frequency rules
36. Daily, weekly, monthly, and custom frequency boundary
37. Target count per period
38. Streak enabled/disabled boundary
39. Missed-entry policy
40. Dashboard target selection
41. Dashboard card placement contract
42. Dashboard placement privacy rules
43. Dashboard card priority, size, and visibility boundary
44. Custom tracker card support on domain dashboards
45. Custom tracker card support on Command dashboard where allowed
46. Custom tracker card mini-summary
47. Custom tracker card quick-log boundary
48. Sensitive tracker dashboard exposure protection
49. Cross-domain linkage
50. Domain mapping for career, learning, research, health, body, finance, grimoire, creativity, life admin, and custom
51. Timeline compatibility metadata
52. Timeline visibility setting
53. Timeline label template boundary
54. Timeline spam prevention boundary
55. Analytics compatibility metadata
56. Aggregation type metadata
57. Trendable and chartable field metadata
58. Analytics preview boundary
59. Insufficient-data analytics state
60. No fake analytics
61. Tracker quality/readiness score
62. Tracker setup completeness checks
63. Analytics-ready status
64. Privacy-ready status
65. Dashboard-placement-ready status
66. Carnos access permissions
67. Carnos read permission per tracker
68. Carnos summary permission per tracker
69. Carnos suggestion permission per tracker
70. Carnos memory-candidate permission per tracker
71. Carnos analytics permission per tracker
72. Carnos-assisted tracker creation proposal
73. Carnos-assisted tracker improvement proposal
74. Carnos AI field-mapping proposal
75. Carnos message-to-entry proposal
76. Review-before-write queue for AI tracker proposals
77. Review-before-write queue for AI entry proposals
78. AI proposal states: draft, needs review, approved, rejected, expired
79. No silent Carnos tracker creation
80. No silent Carnos tracker entry logging
81. No silent Carnos tracker edits
82. No silent memory writes
83. Document/source attachment boundary
84. Saved document reference boundary
85. Knowledge Vault compatibility boundary
86. Memory/RAG compatibility boundary
87. Current-info/web-source compatibility boundary
88. Web source reference attachment boundary
89. Evidence/source links on tracker entries
90. Tracker entries can link to documents, notes, web sources, timeline records, or memory candidates
91. Carnos can use web/current-info results only with source/freshness disclosure
92. Carnos can map web/doc info into tracker proposals only after review
93. Audit trail contract
94. Audit events for tracker creation
95. Audit events for field creation/change/deprecation
96. Audit events for entry creation/edit/archive
97. Audit events for dashboard placement changes
98. Audit events for AI mapping proposal approval/rejection
99. RLS/user ownership boundary
100. Tracker ownership validation
101. Field ownership validation through tracker ownership
102. Entry ownership validation through tracker ownership
103. Dashboard card ownership validation
104. Tracker ID and field ID cross-user protection
105. System tracker vs user tracker boundary
106. Custom trackers cannot override core modules
107. Custom tracker IDs cannot collide with system domains
108. Naming collision handling
109. Stable tracker key/slug
110. Display name can change while internal key stays stable
111. Empty state for no trackers
112. Empty state with template suggestions
113. Loading state
114. Error state
115. Privacy-restricted state
116. Review-required state
117. No hardcoded demo data as final state
118. No fake tracker entries
119. No fake dashboard cards
120. No fake AI mappings
121. No fake source attachments
122. No fake analytics/streaks
123. No unsafe direct action execution
124. No uncontrolled JSON chaos
125. No bypassing RLS/user ownership
126. No unreviewed Carnos memory writes
127. No unreviewed tracker writes
128. No timeline spam
129. No sensitive tracker leakage onto broad dashboards
130. Acceptance checklist/audit for Phase 19
131. Schema validation proof
132. Entry validation proof
133. Permission/RLS boundary proof
134. Dashboard placement boundary proof
135. Carnos review-before-write proof
136. No-fake-data proof
137. No-silent-AI-write proof
138. Full npm check/build integration

## User-facing creation and logging paths

1. Manual creation from /custom-trackers.
2. Template-based creation from /custom-trackers.
3. Carnos-assisted tracker design proposal with review and approval.
4. Quick-log from /custom-trackers or dashboard cards.
5. Carnos message/doc/web-result-to-entry proposal with review and approval.

## Core operating rule

Dashboard controls. Carnos suggests. Documents store. Web/current-info finds current information. Memory retrieves approved context. User approves writes. System saves only after validation.

## Feature-to-build-chunk map

### 19A - Expanded scope lock plus no-loophole contract

Will code/build:

- Locks the full official and expanded Phase 19 feature list.
- Locks the 14 build chunks 19A through 19N.
- Locks the feature-to-chunk coverage map.
- Locks the dashboard-control/Carnos-proposal/user-approval rule.
- Locks non-negotiable boundaries for no fake data, no silent writes, no unsafe action execution, no sensitive leakage, no uncontrolled JSON, no RLS bypass, and no timeline spam.
- Adds Phase 19A docs, checklist, report, and audit.

### 19B - Core tracker domain contracts

Will code/build:

- Custom tracker domain model.
- Custom tracker field model.
- Custom tracker entry model.
- Tracker name, description, domain, frequency, privacy, active/inactive state.
- Tracker status model.
- Tracker archive/delete boundary.
- Stable tracker key/slug.
- Naming collision handling.
- Display name change while internal key stays stable.
- System tracker vs user tracker boundary.
- Custom trackers cannot override core modules.
- Custom tracker IDs cannot collide with system domains.

### 19C - Field type registry plus field validation rules

Will code/build:

- Allowed field type registry.
- Field type validation.
- Required/optional field rules.
- Field ordering.
- Field options JSON for select and multi-select fields.
- Field validation rules.
- Select option validation.
- Number validation.
- Rating validation.
- Date validation.
- Duration validation.
- Field units and normalization boundary.
- Field privacy levels.
- Unknown-field rejection or quarantine rules.

### 19D - Entry validation plus values_json safety

Will code/build:

- Custom tracker entry logging contract.
- Entry date handling.
- Entry notes.
- values_json validation.
- Required field validation for entries.
- Type-safe entry validation.
- Unknown field rejection/quarantine behavior.
- Invalid entry rejection/quarantine behavior.
- Duplicate entry detection.
- Same-day duplicate warning.
- No uncontrolled JSON chaos boundary.
- No fake tracker entries boundary.

### 19E - Schema versioning plus deprecation/archive boundaries

Will code/build:

- Tracker schema versioning.
- Entry schema version tracking.
- Field deprecation instead of unsafe hard deletion.
- Historical entry compatibility.
- Tracker archive boundary.
- Tracker delete boundary.
- Hard-delete avoidance for tracker history.
- Field change safety rules.
- Old entry preservation rules.

### 19F - Templates plus frequency, streaks, and quality score

Will code/build:

- Tracker template library.
- Template-based tracker creation.
- Template categories.
- Tracker frequency rules.
- Daily frequency boundary.
- Weekly frequency boundary.
- Monthly frequency boundary.
- Custom frequency boundary.
- Target count per period.
- Streak enabled/disabled boundary.
- Missed-entry policy.
- Tracker quality/readiness score.
- Tracker setup completeness checks.
- Analytics-ready status.
- Privacy-ready status.
- Dashboard-placement-ready status.
- Favorite tracker and pinned tracker boundary.
- Repeat-last-entry support boundary.

### 19G - Privacy levels plus Carnos access permissions

Will code/build:

- Tracker privacy levels.
- Field privacy levels.
- Privacy-restricted state contract.
- Carnos access permissions.
- Carnos read permission per tracker.
- Carnos summary permission per tracker.
- Carnos suggestion permission per tracker.
- Carnos memory-candidate permission per tracker.
- Carnos analytics permission per tracker.
- Sensitive tracker behavior.
- Conservative Carnos defaults.
- No silent memory writes boundary.
- No unreviewed Carnos memory writes boundary.

### 19H - Carnos proposals plus review-before-write queue

Will code/build:

- Carnos-assisted tracker creation proposal.
- Carnos-assisted tracker improvement proposal.
- Carnos AI field-mapping proposal.
- Carnos message-to-entry proposal.
- Review-before-write queue for AI tracker proposals.
- Review-before-write queue for AI entry proposals.
- AI proposal states: draft, needs review, approved, rejected, expired.
- Carnos can map web/doc info into tracker proposals only after review.
- No silent Carnos tracker creation.
- No silent Carnos tracker entry logging.
- No silent Carnos tracker edits.
- No unreviewed tracker writes.
- No fake AI mappings.
- Carnos review-before-write proof boundary.

### 19I - Dashboard placement plus cross-domain card rules

Will code/build:

- Dashboard target selection.
- Dashboard card placement contract.
- Dashboard placement privacy rules.
- Dashboard card priority, size, and visibility boundary.
- Custom tracker card support on domain dashboards.
- Custom tracker card support on Command dashboard where allowed.
- Custom tracker card mini-summary.
- Custom tracker card quick-log boundary.
- Quick-log readiness for dashboard cards.
- Sensitive tracker dashboard exposure protection.
- Cross-domain linkage.
- Domain mapping for career, learning, research, health, body, finance, grimoire, creativity, life admin, and custom.
- No fake dashboard cards.
- No sensitive tracker leakage onto broad dashboards.
- Dashboard placement boundary proof.

### 19J - Timeline plus analytics compatibility boundaries

Will code/build:

- Timeline compatibility metadata.
- Timeline visibility setting.
- Timeline label template boundary.
- Timeline spam prevention boundary.
- Analytics compatibility metadata.
- Aggregation type metadata.
- Trendable and chartable field metadata.
- Analytics preview boundary.
- Insufficient-data analytics state.
- No fake analytics.
- No fake analytics/streaks.
- No timeline spam.
- Analytics-ready status integration.
- Timeline compatibility proof boundary.

### 19K - Document, web, source, and evidence attachment boundaries

Will code/build:

- Document/source attachment boundary.
- Saved document reference boundary.
- Knowledge Vault compatibility boundary.
- Memory/RAG compatibility boundary.
- Current-info/web-source compatibility boundary.
- Web source reference attachment boundary.
- Evidence/source links on tracker entries.
- Tracker entries can link to documents, notes, web sources, timeline records, or memory candidates.
- Carnos can use web/current-info results only with source/freshness disclosure.
- Carnos can map web/doc info into tracker proposals only after review.
- No fake source attachments.
- Source/freshness disclosure boundary.

### 19L - Repository, RLS, audit, and ownership boundaries

Will code/build:

- RLS/user ownership boundary.
- Tracker ownership validation.
- Field ownership validation through tracker ownership.
- Entry ownership validation through tracker ownership.
- Dashboard card ownership validation.
- Tracker ID and field ID cross-user protection.
- Audit trail contract.
- Audit events for tracker creation.
- Audit events for field creation/change/deprecation.
- Audit events for entry creation/edit/archive.
- Audit events for dashboard placement changes.
- Audit events for AI mapping proposal approval/rejection.
- No bypassing RLS/user ownership.
- Permission/RLS boundary proof.

### 19M - Custom Tracker dashboard view model plus UI

Will code/build:

- Custom Tracker Dashboard at /custom-trackers.
- Manual tracker creation UI boundary.
- Custom tracker schema builder UI boundary.
- Custom tracker field builder UI boundary.
- Entry logger UI boundary.
- Quick-log contract.
- Quick-log button on /custom-trackers.
- Template picker UI boundary.
- Dashboard placement panel.
- AI mapping/review panel.
- Analytics preview panel.
- Timeline/evidence panel.
- Privacy/access panel.
- Quality/readiness score panel.
- Tracker list state.
- Selected tracker state.
- Empty state for no trackers.
- Empty state with template suggestions.
- Loading state.
- Error state.
- Privacy-restricted state.
- Review-required state.

### 19N - Final fixtures, audits, reports, package check integration, and completion proof

Will code/build:

- Acceptance checklist/audit for Phase 19.
- Schema validation proof.
- Entry validation proof.
- Permission/RLS boundary proof.
- Dashboard placement boundary proof.
- Carnos review-before-write proof.
- No-fake-data proof.
- No-silent-AI-write proof.
- Phase 19 fixture.
- Phase 19 contract doc.
- Phase 19 QA checklist.
- Phase 19 completion report.
- Final audit: audit:phase19.
- Package check integration.
- Full npm check/build integration.
- Final Phase 19 completion proof.


## Non-negotiable boundaries

- No silent Carnos tracker creation.
- No silent Carnos tracker entry logging.
- No silent Carnos tracker edits.
- No silent memory writes.
- No fake tracker entries.
- No fake dashboard cards.
- No fake AI mappings.
- No fake source attachments.
- No fake analytics or fake streaks.
- No unsafe direct action execution.
- No uncontrolled JSON chaos.
- No RLS/user ownership bypass.
- No timeline spam.
- No sensitive tracker leakage onto broad dashboards.
- No custom tracker override of core system modules.

## Completion definition

Phase 19 is complete only when every feature above is represented by typed contracts, validation rules, UI/view-model coverage where relevant, Carnos/review boundaries where relevant, RLS/ownership/audit boundaries where relevant, source/evidence compatibility where relevant, timeline/analytics compatibility where relevant, final Phase 19 audits, and npm run check.
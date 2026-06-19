# Python/ML Intelligence Worker Architecture

Status: Phase 5.15 source-of-truth patch
Runtime status: not active yet
Future path: apps/worker-python

## Basic Rule

Python/ML advises. The app validates. The user confirms. The server writes. SQL records. Audit logs.

Python/ML must never directly mutate SQL.

Any write-affecting output must pass through:

proposal -> validation -> Save/Edit/Cancel -> server write -> audit log -> timeline event -> dashboard refresh

## Allowed Python/ML Outputs

- scores
- rankings
- recommendations
- summaries
- classifications
- risk predictions
- trend detection
- pattern detection
- semantic retrieval results
- life trajectory simulations
- Carnos response-support signals
- proposed action drafts

## Forbidden Python/ML Behavior

- Python/ML must never directly mutate SQL.
- Python/ML must never bypass Save/Edit/Cancel confirmation.
- Python/ML must never silently create memory.
- Python/ML must never execute actions directly.
- Python/ML must never delete or update user data directly.
- Python/ML must never collect hidden personal data.
- Python/ML must never make npm build depend on Python.
- Python/ML must never provide medical diagnosis, prescription, legal advice, tax advice, or investment advice.
- Python/ML must never claim fake accuracy or fake production metrics.

## Core Python/ML Features

### 1. Daily Priority Engine
Where: /command, /calendar, /goals, /carnos, /world-class
Phase placement: planned in Phase 5.15, prepared by Phase 6-9, scaffolded in Phase 11, activated in Phase 13.
Purpose: ranks what the user should do today using impact, urgency, energy, proof history, deadlines, and long-term goals.

### 2. Goal Risk Predictor
Where: /goals, /command, /world-class, /analytics, /carnos
Phase placement: planned in Phase 5.15, supported by Phase 8 creation flows, scaffolded in Phase 11, activated in Phase 13.
Purpose: predicts which goals are slipping before they fail and recommends recovery actions.

### 3. Proof-of-Work Scorer
Where: /world-class, /analytics, /timeline, /command, /carnos
Phase placement: planned in Phase 5.15, supported by Phase 8 proof/daily logs, scaffolded in Phase 11, activated in Phase 13.
Purpose: scores real progress versus fake busyness using proof items, daily logs, tasks, goals, commits, and career actions.

### 4. Career Readiness Engine
Where: /career, /resume, /networking, /interviews, /projects, /command, /carnos
Phase placement: planned in Phase 5.15, supported by Phase 8-10 career data, scaffolded in Phase 11, activated in Phase 13.
Purpose: scores readiness for ML Engineer, Data Engineer, SWE, research, job search, referrals, interviews, and portfolio strength.

### 5. Learning Optimizer
Where: /learning, /interviews, /projects, /career, /carnos
Phase placement: planned in Phase 5.15, supported by Phase 8-10 learning/interview records, scaffolded in Phase 11, activated in Phase 13.
Purpose: recommends what to study next based on weakness, role targets, project needs, spaced repetition, and energy.

### 6. Semantic Memory Retrieval
Where: /carnos, /knowledge, /timeline, /decisions, /research-lab
Phase placement: planned in Phase 5.15, requires Phase 10 memory foundation, scaffolded in Phase 11, activated across Phase 11-13.
Purpose: retrieves relevant logs, decisions, reflections, tasks, documents, and memories by meaning instead of exact keyword search.

### 7. Carnos Context Pack Builder
Where: /carnos, /command, /future-simulator, /world-class
Phase placement: planned in Phase 5.15, prepared in Phase 7, supported by Phase 10 memory, scaffolded in Phase 11, activated in Phase 13.
Purpose: builds structured background context Carnos needs before replying.

### 8. Persona Router
Where: /carnos, /emotion, /command, /world-class
Phase placement: planned in Phase 5.15, simple rule version in Phase 7, ML version in Phase 11-13.
Purpose: selects Carnos mode such as strict mentor, strategist, coach, analyst, planner, supportive friend, career mentor, or execution commander.

### 9. Life Trajectory Simulator
Where: /future-simulator, /world-class, /analytics, /carnos, /command
Phase placement: planned in Phase 5.15, supported by Phase 8-10 logs/history, scaffolded in Phase 11, activated in Phase 13.
Purpose: projects 7, 30, 90, and 180-day outcomes if current behavior continues.

### 10. Burnout / Drift Detector
Where: /emotion, /sleep-energy, /body, /command, /analytics, /carnos
Phase placement: planned in Phase 5.15, supported by Phase 8-10 sleep/energy/task/proof data, scaffolded in Phase 11, activated in Phase 13.
Purpose: detects overload, avoidance, low proof, skipped routines, poor sleep, and goal drift early.

### 11. Health/Energy Pattern Detector
Where: /body, /nutrition, /supplements, /sleep-energy, /emotion, /analytics, /carnos
Phase placement: planned in Phase 5.15, supported by Phase 8-10 body/nutrition/sleep/supplement logs, scaffolded in Phase 11, activated in Phase 13.
Purpose: finds patterns between sleep, gym, food, supplements, mood, energy, and productivity without giving medical advice.

### 12. Project Momentum Analyzer
Where: /projects, /research-lab, /world-class, /command, /carnos
Phase placement: planned in Phase 5.15, supported by Phase 8-10 project/proof records, scaffolded in Phase 11, activated in Phase 13.
Purpose: scores project progress, tests, documentation, GitHub readiness, resume value, and scope creep risk.

### 13. Resume/JD Fit Optimizer
Where: /resume, /career, /networking, /interviews, /carnos
Phase placement: planned in Phase 5.15, supported by Phase 8-10 career/resume/application data, scaffolded in Phase 11, activated in Phase 13.
Purpose: compares resume versions to job descriptions, detects gaps, scores fit, and recommends safer edits.

### 14. Networking and Referral Prioritizer
Where: /networking, /career, /calendar, /command, /carnos
Phase placement: planned in Phase 5.15, supported by Phase 8-10 contacts/outreach/application status, scaffolded in Phase 11, activated in Phase 13.
Purpose: ranks who to contact next based on company relevance, relationship strength, follow-up timing, role fit, and application status.

### 15. Interview Weakness Detector
Where: /interviews, /learning, /career, /carnos
Phase placement: planned in Phase 5.15, supported by Phase 8-10 interview practice records, scaffolded in Phase 11, activated in Phase 13.
Purpose: detects weak interview topics, recommends practice sets, and scores role-specific interview readiness.

### 16. Research/PhD Readiness Engine
Where: /research-lab, /research-stanford, /projects, /learning, /carnos
Phase placement: planned in Phase 5.15, supported by Phase 8-10 research logs/papers/projects/outreach, scaffolded in Phase 11, activated in Phase 13.
Purpose: scores research depth, paper ideas, literature gaps, experiment quality, publication trajectory, and advisor-fit readiness.

### 17. Decision Quality Analyzer
Where: /decisions, /timeline, /future-simulator, /carnos
Phase placement: planned in Phase 5.15, supported by Phase 8-10 decision records/outcomes, scaffolded in Phase 11, activated in Phase 13.
Purpose: analyzes decisions for evidence quality, bias, regret, delayed action, similar past decisions, and outcome quality.

### 18. Custom Tracker Intelligence
Where: /custom-trackers, /analytics, /carnos
Phase placement: planned in Phase 5.15, supported by Phase 8-10 custom tracker schema/records, scaffolded in Phase 11, activated in Phase 13.
Purpose: adds trends, streak risk, anomaly detection, correlations, and recommendations to any custom tracker.

## Safety and Trust Features

- ML Explainability Contract
- ML Output Audit Log
- Feedback Loop
- Cold-Start Mode
- Privacy Controls
- Health Boundary
- Finance Boundary
- Versioned ML Output Schemas
- Human Override
- Evaluation Tests
- No Fake Metrics Rule
- Direct SQL Write Blocker
- Data Freshness Check
- Score Definitions

## Score Definitions

- proof_score: Measures real progress quality using completed tasks, proof items, goal movement, concrete outputs, and evidence references.
- goal_risk_score: Measures the risk that a goal will slip based on deadlines, missed milestones, low proof, task carryover, and stale progress.
- career_readiness_score: Measures readiness for target roles using resume strength, project quality, interview prep, applications, referrals, and skill gaps.
- learning_readiness_score: Measures study readiness using weak topics, recent study history, spaced repetition timing, energy, and role relevance.
- burnout_risk_score: Measures overload risk using sleep, energy, missed routines, negative drift, proof decline, and task carryover.
- project_momentum_score: Measures project health using commits, tests, docs, phase completion, issue closure, and portfolio value.
- research_readiness_score: Measures research trajectory using literature review, experiment quality, writing output, paper ideas, and advisor-fit work.

## Phase Placement

- Phase 5.15: Python/ML Intelligence Architecture Patch. Source-of-truth only. No active Python runtime.
- Phase 6: Safe Write / Proposed Action Flow. Builds the write safety gate future ML must use.
- Phase 7: Carnos Chat + Action Proposal Layer. Adds Carnos proposal contracts compatible with future ML.
- Phase 8: Real Creation Flows. Creates real user data.
- Phase 9: Calendar / Timeline / Time Integration. Adds time data needed for priority, overload, and trajectory intelligence.
- Phase 10: Memory System Foundation. Adds safe memory and retrieval foundation.
- Phase 11: Python/ML Worker Foundation. Adds apps/worker-python scaffold, contracts, tests, no-write guard, and first simple scorers.
- Phase 13: Advanced Analytics / World-Class Progress Engine. Activates serious scoring, ranking, simulation, prediction, retrieval, and recommendations.
- Phase 14: Privacy / Export / Delete / Settings / Hardening. Adds ML privacy controls and output deletion/export.
- Phase 15: Productionization. Deploys and hardens worker, queues, monitoring, fallbacks, cost controls, and evaluations.

## Versioned Output Contracts

- score_result_v1
- recommendation_result_v1
- context_pack_v1
- proposed_action_draft_v1
- evidence_ref_v1
- model_output_audit_v1
- user_feedback_v1

## Loopholes Closed

- Python cannot directly write SQL.
- Python cannot silently create memory.
- Carnos cannot bypass Save/Edit/Cancel.
- Health output stays pattern analysis only, not medical advice.
- Finance output stays budgeting and pattern analysis only, not investment, legal, or tax advice.
- ML outputs need evidence, confidence, reason codes, freshness, and user override.
- No fake ML accuracy or fake production metrics are allowed.
- The current Next.js build must not depend on Python.

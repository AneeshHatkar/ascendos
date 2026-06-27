export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

type CareerSourceFields = {
  metadata: Json;
  source_ai_action_id: string | null;
  source_chat_message_id: string | null;
  created_at: string;
};

type CareerUpdatedSourceFields = CareerSourceFields & {
  updated_at: string;
};

type Phase9SourceFields = {
  source_ai_action_id: string | null;
  source_chat_message_id: string | null;
};

type Phase9UpdatedSourceFields = Phase9SourceFields & {
  updated_at: string;
};

type Phase9SkillPathRow = Phase9UpdatedSourceFields & {
  id: string;
  user_id: string;
  title: string;
  slug: string | null;
  description: string | null;
  domain: string | null;
  status: "planned" | "active" | "paused" | "completed" | "archived";
  priority: "low" | "medium" | "high" | "critical";
  target_level: string | null;
  current_level: string | null;
  started_at: string | null;
  target_date: string | null;
  completed_at: string | null;
  goal_id: string | null;
  career_target: string | null;
  research_target: string | null;
  metadata: Json;
  created_at: string;
};

type Phase9SkillRow = Phase9UpdatedSourceFields & {
  id: string;
  user_id: string;
  skill_path_id: string | null;
  title: string;
  slug: string | null;
  description: string | null;
  category: string | null;
  status:
    | "not_started"
    | "learning"
    | "practicing"
    | "proving"
    | "mastered"
    | "stale"
    | "archived";
  priority: "low" | "medium" | "high" | "critical";
  difficulty: "low" | "medium" | "high" | "expert";
  target_level: string | null;
  current_level: string | null;
  mastery_score: number | null;
  confidence_score: number | null;
  proof_required: boolean;
  interview_relevance: string | null;
  project_relevance: string | null;
  research_relevance: string | null;
  goal_id: string | null;
  proof_item_id: string | null;
  metadata: Json;
  created_at: string;
};

type Phase9SkillPrerequisiteRow = {
  id: string;
  user_id: string;
  skill_id: string;
  prerequisite_skill_id: string;
  relationship_type: "requires" | "recommended" | "blocks" | "supports";
  notes: string | null;
  metadata: Json;
  created_at: string;
};

type Phase9LearningSessionRow = Phase9UpdatedSourceFields & {
  id: string;
  user_id: string;
  skill_path_id: string | null;
  skill_id: string | null;
  title: string;
  session_type:
    | "study"
    | "practice"
    | "build"
    | "review"
    | "quiz"
    | "interview_prep"
    | "research";
  status: "planned" | "active" | "completed" | "cancelled" | "archived";
  started_at: string | null;
  ended_at: string | null;
  duration_minutes: number | null;
  focus_score: number | null;
  difficulty: "low" | "medium" | "high" | "expert" | null;
  notes: string | null;
  summary: string | null;
  next_step: string | null;
  goal_id: string | null;
  task_id: string | null;
  proof_item_id: string | null;
  daily_log_id: string | null;
  metadata: Json;
  created_at: string;
};

type Phase9QuizRow = {
  id: string;
  user_id: string;
  skill_path_id: string | null;
  skill_id: string | null;
  title: string;
  description: string | null;
  quiz_type:
    | "concept_check"
    | "coding"
    | "interview"
    | "project_review"
    | "research_review"
    | "mixed";
  status: "draft" | "active" | "paused" | "archived";
  difficulty: "low" | "medium" | "high" | "expert";
  question_count: number | null;
  passing_score: number | null;
  metadata: Json;
  created_at: string;
  updated_at: string;
};

type Phase9ProjectRow = Phase9UpdatedSourceFields & {
  id: string;
  user_id: string;
  title: string;
  slug: string | null;
  description: string | null;
  project_type:
    | "portfolio"
    | "learning"
    | "research"
    | "career"
    | "personal_system"
    | "coursework"
    | "experiment";
  status:
    | "planned"
    | "active"
    | "blocked"
    | "shipping"
    | "shipped"
    | "paused"
    | "archived";
  priority: "low" | "medium" | "high" | "critical";
  stage: string | null;
  problem_statement: string | null;
  target_user: string | null;
  tech_stack: string[];
  github_url: string | null;
  demo_url: string | null;
  readme_url: string | null;
  portfolio_url: string | null;
  resume_bullet_id: string | null;
  goal_id: string | null;
  task_id: string | null;
  proof_item_id: string | null;
  started_at: string | null;
  target_date: string | null;
  completed_at: string | null;
  metadata: Json;
  created_at: string;
};

type Phase9QuizAttemptRow = Phase9SourceFields & {
  id: string;
  user_id: string;
  quiz_id: string;
  learning_session_id: string | null;
  skill_id: string | null;
  status: "completed" | "abandoned" | "needs_review" | "archived";
  score: number | null;
  max_score: number | null;
  passed: boolean | null;
  attempted_at: string;
  duration_minutes: number | null;
  mistake_summary: string | null;
  strength_summary: string | null;
  next_review_at: string | null;
  proof_item_id: string | null;
  metadata: Json;
  created_at: string;
};

type Phase9ProjectMilestoneRow = {
  id: string;
  user_id: string;
  project_id: string;
  title: string;
  description: string | null;
  status:
    | "planned"
    | "active"
    | "blocked"
    | "completed"
    | "cancelled"
    | "archived";
  priority: "low" | "medium" | "high" | "critical";
  due_date: string | null;
  completed_at: string | null;
  task_id: string | null;
  proof_item_id: string | null;
  metadata: Json;
  created_at: string;
  updated_at: string;
};

type Phase9ProjectBugRow = {
  id: string;
  user_id: string;
  project_id: string;
  title: string;
  description: string | null;
  status:
    | "open"
    | "investigating"
    | "fixed"
    | "wont_fix"
    | "closed"
    | "archived";
  severity: "low" | "medium" | "high" | "critical";
  source: string | null;
  reproduction_steps: string | null;
  root_cause: string | null;
  fix_summary: string | null;
  opened_at: string;
  resolved_at: string | null;
  task_id: string | null;
  proof_item_id: string | null;
  metadata: Json;
  created_at: string;
  updated_at: string;
};

type Phase9ProjectTestRow = {
  id: string;
  user_id: string;
  project_id: string;
  title: string;
  test_type:
    | "manual"
    | "unit"
    | "integration"
    | "e2e"
    | "lint"
    | "typecheck"
    | "build"
    | "audit"
    | "smoke";
  status: "pending" | "passed" | "failed" | "skipped" | "archived";
  command: string | null;
  expected_result: string | null;
  actual_result: string | null;
  passed: boolean | null;
  run_at: string | null;
  proof_item_id: string | null;
  metadata: Json;
  created_at: string;
  updated_at: string;
};

type Phase9ProjectReleaseRow = {
  id: string;
  user_id: string;
  project_id: string;
  version: string | null;
  title: string;
  description: string | null;
  status: "planned" | "draft" | "released" | "archived";
  released_at: string | null;
  github_tag_url: string | null;
  demo_url: string | null;
  release_notes_url: string | null;
  proof_item_id: string | null;
  resume_bullet_id: string | null;
  metadata: Json;
  created_at: string;
  updated_at: string;
};

type Phase9ProjectLinkRow = {
  id: string;
  user_id: string;
  project_id: string;
  label: string;
  url: string;
  link_type:
    | "github"
    | "demo"
    | "readme"
    | "portfolio"
    | "paper"
    | "video"
    | "documentation"
    | "reference"
    | "proof";
  description: string | null;
  proof_item_id: string | null;
  metadata: Json;
  created_at: string;
  updated_at: string;
};

type Phase9SkillProgressRow = Phase9SourceFields & {
  id: string;
  user_id: string;
  skill_id: string;
  status:
    | "not_started"
    | "learning"
    | "practicing"
    | "proving"
    | "mastered"
    | "stale"
    | "archived";
  previous_status:
    | "not_started"
    | "learning"
    | "practicing"
    | "proving"
    | "mastered"
    | "stale"
    | "archived"
    | null;
  mastery_score: number | null;
  confidence_score: number | null;
  delta_summary: string | null;
  evidence_summary: string | null;
  learning_session_id: string | null;
  quiz_attempt_id: string | null;
  project_id: string | null;
  proof_item_id: string | null;
  task_id: string | null;
  goal_id: string | null;
  recorded_at: string;
  metadata: Json;
  created_at: string;
};

type CareerResumeVersionRow = CareerUpdatedSourceFields & {
  id: string;
  user_id: string;
  name: string;
  target_role: string | null;
  target_company: string | null;
  target_domain: string | null;
  file_url: string | null;
  status: string;
  keywords: string[];
  notes: string | null;
};

type CareerNetworkingContactRow = CareerUpdatedSourceFields & {
  id: string;
  user_id: string;
  full_name: string;
  company: string | null;
  role_title: string | null;
  email: string | null;
  linkedin_url: string | null;
  relationship_type: string;
  relationship_strength: string;
  status: string;
  last_contacted_at: string | null;
  next_follow_up_at: string | null;
  notes: string | null;
};

type CareerJobApplicationRow = CareerUpdatedSourceFields & {
  id: string;
  user_id: string;
  company: string;
  role_title: string;
  job_url: string | null;
  location: string | null;
  work_mode: string;
  employment_type: string;
  sponsorship_status: string;
  source: string | null;
  status: string;
  priority: string;
  applied_at: string | null;
  follow_up_at: string | null;
  deadline_at: string | null;
  resume_version_id: string | null;
  networking_contact_id: string | null;
  goal_id: string | null;
  task_id: string | null;
  notes: string | null;
};

type CareerJobApplicationEventRow = CareerSourceFields & {
  id: string;
  user_id: string;
  job_application_id: string;
  event_type: string;
  title: string;
  description: string | null;
  occurred_at: string;
};

type CareerNetworkingInteractionRow = CareerSourceFields & {
  id: string;
  user_id: string;
  networking_contact_id: string;
  job_application_id: string | null;
  interaction_type: string;
  title: string;
  description: string | null;
  occurred_at: string;
  follow_up_at: string | null;
};

type CareerJobReferralRow = CareerUpdatedSourceFields & {
  id: string;
  user_id: string;
  networking_contact_id: string | null;
  job_application_id: string | null;
  status: string;
  requested_at: string | null;
  confirmed_at: string | null;
  follow_up_at: string | null;
  notes: string | null;
};

type CareerResumeBulletRow = CareerUpdatedSourceFields & {
  id: string;
  user_id: string;
  resume_version_id: string;
  bullet_text: string;
  section: string;
  skill_tags: string[];
  metric_claim: string | null;
  proof_item_id: string | null;
  goal_id: string | null;
  task_id: string | null;
};

type CareerInterviewRow = CareerUpdatedSourceFields & {
  id: string;
  user_id: string;
  job_application_id: string | null;
  company: string | null;
  role_title: string | null;
  round_type: string;
  status: string;
  scheduled_at: string | null;
  completed_at: string | null;
  interviewer_names: string[];
  prep_notes: string | null;
  performance_notes: string | null;
  follow_up_at: string | null;
  outcome: string;
};

type Phase10ResearchIdeaRow = {
  id: string;
  user_id: string;
  title: string;
  summary: string | null;
  research_area: string | null;
  status:
    | "captured"
    | "exploring"
    | "active"
    | "blocked"
    | "converted_to_paper"
    | "paused"
    | "archived";
  priority: "low" | "medium" | "high" | "urgent";
  novelty_score: number | null;
  feasibility_score: number | null;
  impact_score: number | null;
  proof_strength_score: number | null;
  project_id: string | null;
  skill_id: string | null;
  goal_id: string | null;
  task_id: string | null;
  proof_item_id: string | null;
  source: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
};

type Phase10ResearchQuestionRow = {
  id: string;
  user_id: string;
  research_idea_id: string | null;
  question: string;
  hypothesis: string | null;
  variable_focus: string | null;
  expected_outcome: string | null;
  status:
    | "open"
    | "investigating"
    | "supported"
    | "rejected"
    | "revised"
    | "archived";
  notes: string | null;
  created_at: string;
  updated_at: string;
};

type Phase10ResearchLiteratureItemRow = {
  id: string;
  user_id: string;
  title: string;
  authors: string[];
  publication_year: number | null;
  venue: string | null;
  source_url: string | null;
  doi: string | null;
  arxiv_id: string | null;
  item_type:
    | "paper"
    | "article"
    | "book"
    | "thesis"
    | "technical_report"
    | "documentation"
    | "dataset"
    | "benchmark"
    | "other";
  reading_status:
    | "saved"
    | "skimmed"
    | "reading"
    | "read"
    | "summarized"
    | "cited"
    | "archived";
  relevance_score: number | null;
  credibility_score: number | null;
  summary: string | null;
  key_methods: string | null;
  key_results: string | null;
  limitations: string | null;
  notes: string | null;
  related_research_idea_id: string | null;
  related_project_id: string | null;
  proof_item_id: string | null;
  created_at: string;
  updated_at: string;
};

type Phase10ResearchPaperRow = {
  id: string;
  user_id: string;
  title: string;
  abstract: string | null;
  research_area: string | null;
  status:
    | "idea"
    | "outline"
    | "drafting"
    | "internal_review"
    | "professor_review"
    | "revision"
    | "submission_ready"
    | "submitted"
    | "accepted"
    | "rejected"
    | "archived";
  primary_research_idea_id: string | null;
  project_id: string | null;
  proof_item_id: string | null;
  resume_bullet_id: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
  target_venue_id: string | null;
};

type Phase10ResearchPaperVersionRow = {
  id: string;
  user_id: string;
  research_paper_id: string;
  version_label: string;
  file_url: string | null;
  doc_url: string | null;
  abstract_snapshot: string | null;
  status:
    | "draft"
    | "reviewed"
    | "revised"
    | "submission_candidate"
    | "archived";
  page_count: number | null;
  readiness_score: number | null;
  main_gap: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
};

type Phase10ResearchClaimRow = {
  id: string;
  user_id: string;
  research_idea_id: string | null;
  research_paper_id: string | null;
  paper_version_id: string | null;
  claim_text: string;
  claim_type:
    | "novelty"
    | "method"
    | "result"
    | "comparison"
    | "limitation"
    | "contribution"
    | "application"
    | "future_work";
  support_status:
    | "unsupported"
    | "partially_supported"
    | "supported"
    | "contradicted"
    | "needs_review";
  evidence_strength: number | null;
  literature_item_id: string | null;
  proof_item_id: string | null;
  project_id: string | null;
  resume_bullet_id: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
};

type Phase10ResearchExperimentRow = {
  id: string;
  user_id: string;
  research_idea_id: string | null;
  research_question_id: string | null;
  project_id: string | null;
  title: string;
  objective: string | null;
  method: string | null;
  dataset: string | null;
  baseline: string | null;
  variables: Json;
  metrics: Json;
  reproducibility_status:
    | "not_started"
    | "partial"
    | "reproducible"
    | "not_reproducible"
    | "needs_cleanup";
  status:
    | "planned"
    | "running"
    | "blocked"
    | "completed"
    | "failed"
    | "archived";
  started_at: string | null;
  completed_at: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
};

type Phase10ResearchResultRow = {
  id: string;
  user_id: string;
  research_experiment_id: string | null;
  research_idea_id: string | null;
  project_id: string | null;
  title: string;
  result_summary: string | null;
  metric_name: string | null;
  metric_value: number | null;
  metric_unit: string | null;
  comparison_baseline: string | null;
  interpretation: string | null;
  limitation: string | null;
  figure_reference: string | null;
  table_reference: string | null;
  proof_item_id: string | null;
  paper_version_id: string | null;
  created_at: string;
  updated_at: string;
};

type Phase10ResearchCitationRow = {
  id: string;
  user_id: string;
  literature_item_id: string;
  research_idea_id: string | null;
  research_claim_id: string | null;
  research_paper_id: string | null;
  paper_version_id: string | null;
  citation_purpose:
    | "background"
    | "related_work"
    | "method_support"
    | "result_comparison"
    | "limitation"
    | "future_work"
    | "contradiction"
    | "definition"
    | "benchmark"
    | "other";
  citation_note: string | null;
  quote_or_excerpt: string | null;
  page_or_section: string | null;
  created_at: string;
  updated_at: string;
};

type Phase10ResearchVenueRow = {
  id: string;
  user_id: string;
  name: string;
  venue_type:
    | "conference"
    | "journal"
    | "workshop"
    | "symposium"
    | "preprint"
    | "internal_review"
    | "other";
  field: string | null;
  ranking_note: string | null;
  deadline: string | null;
  submission_url: string | null;
  page_limit: number | null;
  format_requirements: string | null;
  fit_score: number | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
};

type Phase10ResearchSubmissionRow = {
  id: string;
  user_id: string;
  research_paper_id: string;
  research_venue_id: string | null;
  submitted_at: string | null;
  status:
    | "planned"
    | "preparing"
    | "submitted"
    | "under_review"
    | "accepted"
    | "rejected"
    | "withdrawn"
    | "archived";
  decision: string | null;
  decision_at: string | null;
  reviewer_summary: string | null;
  next_action: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
};

type Phase10ResearchFeedbackRow = {
  id: string;
  user_id: string;
  research_paper_id: string | null;
  paper_version_id: string | null;
  research_idea_id: string | null;
  feedback_source_type:
    | "professor"
    | "advisor"
    | "collaborator"
    | "reviewer"
    | "self_review"
    | "peer"
    | "other";
  feedback_source_name: string | null;
  feedback_date: string | null;
  summary: string;
  required_changes: string | null;
  severity: "low" | "medium" | "high" | "critical";
  status:
    | "received"
    | "triaged"
    | "in_progress"
    | "addressed"
    | "rejected"
    | "archived";
  task_id: string | null;
  proof_item_id: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
};

type Phase10TargetUniversityRow = {
  id: string;
  user_id: string;
  name: string;
  program_name: string | null;
  department: string | null;
  country: string | null;
  location: string | null;
  target_level: "dream" | "reach" | "target" | "safety" | "exploratory";
  fit_score: number | null;
  competitiveness: string | null;
  application_deadline: string | null;
  requirements_url: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
};

type Phase10TargetLabRow = {
  id: string;
  user_id: string;
  target_university_id: string | null;
  name: string;
  research_area: string | null;
  lab_url: string | null;
  fit_score: number | null;
  fit_reason: string | null;
  related_research_idea_id: string | null;
  related_research_paper_id: string | null;
  related_project_id: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
};

type Phase10TargetProfessorRow = {
  id: string;
  user_id: string;
  target_university_id: string | null;
  target_lab_id: string | null;
  name: string;
  title: string | null;
  email: string | null;
  profile_url: string | null;
  research_area: string | null;
  fit_score: number | null;
  fit_reason: string | null;
  outreach_status:
    | "not_started"
    | "researching"
    | "draft_needed"
    | "ready_to_contact"
    | "contacted"
    | "replied"
    | "follow_up_needed"
    | "not_fit"
    | "archived";
  last_contacted_at: string | null;
  related_literature_item_id: string | null;
  related_research_idea_id: string | null;
  related_research_paper_id: string | null;
  related_project_id: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
};

type Phase10PhdReadinessAssessmentRow = {
  id: string;
  user_id: string;
  assessment_date: string;
  overall_score: number | null;
  research_score: number | null;
  publication_score: number | null;
  project_score: number | null;
  proof_score: number | null;
  recommendation_score: number | null;
  sop_score: number | null;
  professor_fit_score: number | null;
  academic_context_score: number | null;
  main_gap: string | null;
  next_action: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
};

type Phase10PhdApplicationAssetRow = {
  id: string;
  user_id: string;
  target_university_id: string | null;
  asset_type:
    | "sop"
    | "cv"
    | "resume"
    | "transcript"
    | "recommendation"
    | "writing_sample"
    | "research_statement"
    | "portfolio"
    | "paper"
    | "test_score"
    | "other";
  title: string;
  status:
    | "missing"
    | "planned"
    | "drafting"
    | "needs_review"
    | "ready"
    | "submitted"
    | "archived";
  file_url: string | null;
  doc_url: string | null;
  quality_score: number | null;
  due_date: string | null;
  task_id: string | null;
  proof_item_id: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
};

type Phase10SopVersionRow = {
  id: string;
  user_id: string;
  target_university_id: string | null;
  version_label: string;
  doc_url: string | null;
  thesis: string | null;
  research_fit_summary: string | null;
  professor_fit_summary: string | null;
  weakness_notes: string | null;
  readiness_score: number | null;
  status:
    | "outline"
    | "draft"
    | "reviewed"
    | "revised"
    | "ready"
    | "submitted"
    | "archived";
  created_at: string;
  updated_at: string;
};

type Phase10RecommendationTargetRow = {
  id: string;
  user_id: string;
  recommender_name: string;
  recommender_role: string | null;
  institution_or_company: string | null;
  relationship_context: string | null;
  strength_score: number | null;
  request_status:
    | "potential"
    | "preparing"
    | "requested"
    | "agreed"
    | "submitted"
    | "unavailable"
    | "archived";
  requested_at: string | null;
  due_date: string | null;
  target_university_id: string | null;
  related_research_paper_id: string | null;
  related_project_id: string | null;
  proof_item_id: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
};

type Phase12FinancialAccountRow = {
  id: string;
  user_id: string;
  name: string;
  account_type:
    | "checking"
    | "savings"
    | "credit_card"
    | "cash"
    | "loan"
    | "investment_manual"
    | "other";
  institution_name: string | null;
  currency: string;
  current_balance: number | null;
  is_active: boolean;
  privacy_level: "private" | "sensitive" | "locked";
  notes: string | null;
  created_at: string;
  updated_at: string;
};

type Phase12FinancialAccountInsert = {
  id?: string;
  user_id: string;
  name: string;
  account_type?:
    | "checking"
    | "savings"
    | "credit_card"
    | "cash"
    | "loan"
    | "investment_manual"
    | "other";
  institution_name?: string | null;
  currency?: string;
  current_balance?: number | null;
  is_active?: boolean;
  privacy_level?: "private" | "sensitive" | "locked";
  notes?: string | null;
  created_at?: string;
  updated_at?: string;
};

type Phase12FinancialAccountUpdate = {
  id?: string;
  user_id?: string;
  name?: string;
  account_type?:
    | "checking"
    | "savings"
    | "credit_card"
    | "cash"
    | "loan"
    | "investment_manual"
    | "other";
  institution_name?: string | null;
  currency?: string;
  current_balance?: number | null;
  is_active?: boolean;
  privacy_level?: "private" | "sensitive" | "locked";
  notes?: string | null;
  created_at?: string;
  updated_at?: string;
};

type Phase12BudgetCategoryRow = {
  id: string;
  user_id: string;
  name: string;
  category_type:
    | "income"
    | "expense"
    | "savings"
    | "debt"
    | "rent"
    | "utility"
    | "subscription"
    | "other";
  monthly_target: number | null;
  currency: string;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

type Phase12BudgetCategoryInsert = {
  id?: string;
  user_id: string;
  name: string;
  category_type?:
    | "income"
    | "expense"
    | "savings"
    | "debt"
    | "rent"
    | "utility"
    | "subscription"
    | "other";
  monthly_target?: number | null;
  currency?: string;
  is_active?: boolean;
  sort_order?: number;
  created_at?: string;
  updated_at?: string;
};

type Phase12BudgetCategoryUpdate = {
  id?: string;
  user_id?: string;
  name?: string;
  category_type?:
    | "income"
    | "expense"
    | "savings"
    | "debt"
    | "rent"
    | "utility"
    | "subscription"
    | "other";
  monthly_target?: number | null;
  currency?: string;
  is_active?: boolean;
  sort_order?: number;
  created_at?: string;
  updated_at?: string;
};

type Phase12FinancialLogRow = {
  id: string;
  user_id: string;
  account_id: string | null;
  budget_category_id: string | null;
  log_type:
    | "income"
    | "expense"
    | "rent"
    | "utility"
    | "bill"
    | "subscription"
    | "savings"
    | "debt_payment"
    | "refund"
    | "transfer"
    | "adjustment"
    | "other";
  title: string;
  amount: number;
  currency: string;
  occurred_on: string;
  payment_status:
    | "planned"
    | "pending"
    | "recorded"
    | "paid"
    | "overdue"
    | "cancelled"
    | "skipped";
  merchant_or_source: string | null;
  notes: string | null;
  related_task_id: string | null;
  related_event_id: string | null;
  source_ai_action_id: string | null;
  source_chat_message_id: string | null;
  created_at: string;
  updated_at: string;
};

type Phase12FinancialLogInsert = {
  id?: string;
  user_id: string;
  account_id?: string | null;
  budget_category_id?: string | null;
  log_type:
    | "income"
    | "expense"
    | "rent"
    | "utility"
    | "bill"
    | "subscription"
    | "savings"
    | "debt_payment"
    | "refund"
    | "transfer"
    | "adjustment"
    | "other";
  title: string;
  amount: number;
  currency?: string;
  occurred_on?: string;
  payment_status?:
    | "planned"
    | "pending"
    | "recorded"
    | "paid"
    | "overdue"
    | "cancelled"
    | "skipped";
  merchant_or_source?: string | null;
  notes?: string | null;
  related_task_id?: string | null;
  related_event_id?: string | null;
  source_ai_action_id?: string | null;
  source_chat_message_id?: string | null;
  created_at?: string;
  updated_at?: string;
};

type Phase12FinancialLogUpdate = {
  id?: string;
  user_id?: string;
  account_id?: string | null;
  budget_category_id?: string | null;
  log_type?:
    | "income"
    | "expense"
    | "rent"
    | "utility"
    | "bill"
    | "subscription"
    | "savings"
    | "debt_payment"
    | "refund"
    | "transfer"
    | "adjustment"
    | "other";
  title?: string;
  amount?: number;
  currency?: string;
  occurred_on?: string;
  payment_status?:
    | "planned"
    | "pending"
    | "recorded"
    | "paid"
    | "overdue"
    | "cancelled"
    | "skipped";
  merchant_or_source?: string | null;
  notes?: string | null;
  related_task_id?: string | null;
  related_event_id?: string | null;
  source_ai_action_id?: string | null;
  source_chat_message_id?: string | null;
  created_at?: string;
  updated_at?: string;
};

type Phase12SubscriptionRow = {
  id: string;
  user_id: string;
  budget_category_id: string | null;
  name: string;
  provider: string | null;
  amount: number;
  currency: string;
  billing_cycle:
    | "weekly"
    | "biweekly"
    | "monthly"
    | "quarterly"
    | "semiannual"
    | "annual"
    | "one_time"
    | "other";
  next_due_date: string | null;
  payment_status:
    | "active"
    | "trial"
    | "pending"
    | "paid"
    | "overdue"
    | "cancelled"
    | "paused"
    | "unknown";
  auto_renew: boolean;
  cancel_by_date: string | null;
  notes: string | null;
  related_task_id: string | null;
  related_event_id: string | null;
  source_ai_action_id: string | null;
  source_chat_message_id: string | null;
  created_at: string;
  updated_at: string;
};

type Phase12SubscriptionInsert = {
  id?: string;
  user_id: string;
  budget_category_id?: string | null;
  name: string;
  provider?: string | null;
  amount: number;
  currency?: string;
  billing_cycle?:
    | "weekly"
    | "biweekly"
    | "monthly"
    | "quarterly"
    | "semiannual"
    | "annual"
    | "one_time"
    | "other";
  next_due_date?: string | null;
  payment_status?:
    | "active"
    | "trial"
    | "pending"
    | "paid"
    | "overdue"
    | "cancelled"
    | "paused"
    | "unknown";
  auto_renew?: boolean;
  cancel_by_date?: string | null;
  notes?: string | null;
  related_task_id?: string | null;
  related_event_id?: string | null;
  source_ai_action_id?: string | null;
  source_chat_message_id?: string | null;
  created_at?: string;
  updated_at?: string;
};

type Phase12SubscriptionUpdate = {
  id?: string;
  user_id?: string;
  budget_category_id?: string | null;
  name?: string;
  provider?: string | null;
  amount?: number;
  currency?: string;
  billing_cycle?:
    | "weekly"
    | "biweekly"
    | "monthly"
    | "quarterly"
    | "semiannual"
    | "annual"
    | "one_time"
    | "other";
  next_due_date?: string | null;
  payment_status?:
    | "active"
    | "trial"
    | "pending"
    | "paid"
    | "overdue"
    | "cancelled"
    | "paused"
    | "unknown";
  auto_renew?: boolean;
  cancel_by_date?: string | null;
  notes?: string | null;
  related_task_id?: string | null;
  related_event_id?: string | null;
  source_ai_action_id?: string | null;
  source_chat_message_id?: string | null;
  created_at?: string;
  updated_at?: string;
};

type Phase12DocumentRow = {
  id: string;
  user_id: string;
  title: string;
  document_type:
    | "id"
    | "passport"
    | "visa"
    | "work_authorization"
    | "school"
    | "career"
    | "housing"
    | "finance"
    | "tax_metadata_only"
    | "medical_metadata_only"
    | "insurance"
    | "other";
  status:
    | "active"
    | "expired"
    | "renewal_needed"
    | "missing"
    | "archived"
    | "unknown";
  issuing_body: string | null;
  stored_location: string | null;
  issued_on: string | null;
  expires_on: string | null;
  renewal_due_on: string | null;
  review_on: string | null;
  sensitivity: "private" | "sensitive" | "locked";
  notes: string | null;
  related_task_id: string | null;
  related_event_id: string | null;
  source_ai_action_id: string | null;
  source_chat_message_id: string | null;
  created_at: string;
  updated_at: string;
};

type Phase12DocumentInsert = {
  id?: string;
  user_id: string;
  title: string;
  document_type?:
    | "id"
    | "passport"
    | "visa"
    | "work_authorization"
    | "school"
    | "career"
    | "housing"
    | "finance"
    | "tax_metadata_only"
    | "medical_metadata_only"
    | "insurance"
    | "other";
  status?:
    | "active"
    | "expired"
    | "renewal_needed"
    | "missing"
    | "archived"
    | "unknown";
  issuing_body?: string | null;
  stored_location?: string | null;
  issued_on?: string | null;
  expires_on?: string | null;
  renewal_due_on?: string | null;
  review_on?: string | null;
  sensitivity?: "private" | "sensitive" | "locked";
  notes?: string | null;
  related_task_id?: string | null;
  related_event_id?: string | null;
  source_ai_action_id?: string | null;
  source_chat_message_id?: string | null;
  created_at?: string;
  updated_at?: string;
};

type Phase12DocumentUpdate = {
  id?: string;
  user_id?: string;
  title?: string;
  document_type?:
    | "id"
    | "passport"
    | "visa"
    | "work_authorization"
    | "school"
    | "career"
    | "housing"
    | "finance"
    | "tax_metadata_only"
    | "medical_metadata_only"
    | "insurance"
    | "other";
  status?:
    | "active"
    | "expired"
    | "renewal_needed"
    | "missing"
    | "archived"
    | "unknown";
  issuing_body?: string | null;
  stored_location?: string | null;
  issued_on?: string | null;
  expires_on?: string | null;
  renewal_due_on?: string | null;
  review_on?: string | null;
  sensitivity?: "private" | "sensitive" | "locked";
  notes?: string | null;
  related_task_id?: string | null;
  related_event_id?: string | null;
  source_ai_action_id?: string | null;
  source_chat_message_id?: string | null;
  created_at?: string;
  updated_at?: string;
};

type Phase12HousingOptionRow = {
  id: string;
  user_id: string;
  label: string;
  housing_status:
    | "current"
    | "past"
    | "future"
    | "backup"
    | "research_only"
    | "archived";
  address_label: string | null;
  rent_amount: number | null;
  currency: string;
  rent_due_day: number | null;
  lease_start_date: string | null;
  lease_end_date: string | null;
  deposit_amount: number | null;
  utilities_notes: string | null;
  maintenance_notes: string | null;
  roommate_notes: string | null;
  pros_cons_json: Json;
  notes: string | null;
  related_document_id: string | null;
  related_task_id: string | null;
  related_event_id: string | null;
  created_at: string;
  updated_at: string;
};

type Phase12HousingOptionInsert = {
  id?: string;
  user_id: string;
  label: string;
  housing_status?:
    | "current"
    | "past"
    | "future"
    | "backup"
    | "research_only"
    | "archived";
  address_label?: string | null;
  rent_amount?: number | null;
  currency?: string;
  rent_due_day?: number | null;
  lease_start_date?: string | null;
  lease_end_date?: string | null;
  deposit_amount?: number | null;
  utilities_notes?: string | null;
  maintenance_notes?: string | null;
  roommate_notes?: string | null;
  pros_cons_json?: Json;
  notes?: string | null;
  related_document_id?: string | null;
  related_task_id?: string | null;
  related_event_id?: string | null;
  created_at?: string;
  updated_at?: string;
};

type Phase12HousingOptionUpdate = {
  id?: string;
  user_id?: string;
  label?: string;
  housing_status?:
    | "current"
    | "past"
    | "future"
    | "backup"
    | "research_only"
    | "archived";
  address_label?: string | null;
  rent_amount?: number | null;
  currency?: string;
  rent_due_day?: number | null;
  lease_start_date?: string | null;
  lease_end_date?: string | null;
  deposit_amount?: number | null;
  utilities_notes?: string | null;
  maintenance_notes?: string | null;
  roommate_notes?: string | null;
  pros_cons_json?: Json;
  notes?: string | null;
  related_document_id?: string | null;
  related_task_id?: string | null;
  related_event_id?: string | null;
  created_at?: string;
  updated_at?: string;
};

type Phase12HousingContactRow = {
  id: string;
  user_id: string;
  housing_option_id: string | null;
  name: string;
  role:
    | "landlord"
    | "property_manager"
    | "roommate"
    | "utility_provider"
    | "maintenance"
    | "broker"
    | "other";
  contact_notes: string | null;
  preferred_contact_method: string | null;
  last_contacted_on: string | null;
  next_follow_up_on: string | null;
  related_task_id: string | null;
  created_at: string;
  updated_at: string;
};

type Phase12HousingContactInsert = {
  id?: string;
  user_id: string;
  housing_option_id?: string | null;
  name: string;
  role?:
    | "landlord"
    | "property_manager"
    | "roommate"
    | "utility_provider"
    | "maintenance"
    | "broker"
    | "other";
  contact_notes?: string | null;
  preferred_contact_method?: string | null;
  last_contacted_on?: string | null;
  next_follow_up_on?: string | null;
  related_task_id?: string | null;
  created_at?: string;
  updated_at?: string;
};

type Phase12HousingContactUpdate = {
  id?: string;
  user_id?: string;
  housing_option_id?: string | null;
  name?: string;
  role?:
    | "landlord"
    | "property_manager"
    | "roommate"
    | "utility_provider"
    | "maintenance"
    | "broker"
    | "other";
  contact_notes?: string | null;
  preferred_contact_method?: string | null;
  last_contacted_on?: string | null;
  next_follow_up_on?: string | null;
  related_task_id?: string | null;
  created_at?: string;
  updated_at?: string;
};

export type Database = {
  public: {
    Tables: {
      financial_accounts: {
        Row: Phase12FinancialAccountRow;
        Insert: Phase12FinancialAccountInsert;
        Update: Phase12FinancialAccountUpdate;
        Relationships: [];
      };
      budget_categories: {
        Row: Phase12BudgetCategoryRow;
        Insert: Phase12BudgetCategoryInsert;
        Update: Phase12BudgetCategoryUpdate;
        Relationships: [];
      };
      financial_logs: {
        Row: Phase12FinancialLogRow;
        Insert: Phase12FinancialLogInsert;
        Update: Phase12FinancialLogUpdate;
        Relationships: [];
      };
      subscriptions: {
        Row: Phase12SubscriptionRow;
        Insert: Phase12SubscriptionInsert;
        Update: Phase12SubscriptionUpdate;
        Relationships: [];
      };
      documents: {
        Row: Phase12DocumentRow;
        Insert: Phase12DocumentInsert;
        Update: Phase12DocumentUpdate;
        Relationships: [];
      };
      housing_options: {
        Row: Phase12HousingOptionRow;
        Insert: Phase12HousingOptionInsert;
        Update: Phase12HousingOptionUpdate;
        Relationships: [];
      };
      housing_contacts: {
        Row: Phase12HousingContactRow;
        Insert: Phase12HousingContactInsert;
        Update: Phase12HousingContactUpdate;
        Relationships: [];
      };
      profiles: {
        Row: {
          id: string;
          email: string | null;
          full_name: string | null;
          avatar_url: string | null;
          timezone: string | null;
          onboarding_status: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email?: string | null;
          full_name?: string | null;
          avatar_url?: string | null;
          timezone?: string | null;
          onboarding_status?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string | null;
          full_name?: string | null;
          avatar_url?: string | null;
          timezone?: string | null;
          onboarding_status?: string;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      carnos_profiles: {
        Row: {
          id: string;
          user_id: string;
          display_name: string | null;
          tone: string | null;
          memory_mode: "confirmation_required" | string;
          confirmation_mode: string | null;
          privacy_level: string | null;
          metadata: Json;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          display_name?: string | null;
          tone?: string | null;
          memory_mode?: "confirmation_required" | string;
          confirmation_mode?: string | null;
          privacy_level?: string | null;
          metadata?: Json;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          display_name?: string | null;
          tone?: string | null;
          memory_mode?: "confirmation_required" | string;
          confirmation_mode?: string | null;
          privacy_level?: string | null;
          metadata?: Json;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "carnos_profiles_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      audit_logs: {
        Row: {
          id: string;
          user_id: string;
          actor_type: "user" | "carnos" | "system";
          action_type: string;
          entity_table: string;
          entity_id: string | null;
          before_state: Json | null;
          after_state: Json | null;
          metadata: Json;
          occurred_at: string;
          logged_at: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          actor_type?: "user" | "carnos" | "system";
          action_type: string;
          entity_table: string;
          entity_id?: string | null;
          before_state?: Json | null;
          after_state?: Json | null;
          metadata?: Json;
          occurred_at?: string;
          logged_at?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          actor_type?: "user" | "carnos" | "system";
          action_type?: string;
          entity_table?: string;
          entity_id?: string | null;
          before_state?: Json | null;
          after_state?: Json | null;
          metadata?: Json;
          occurred_at?: string;
          logged_at?: string;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "audit_logs_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      ai_actions: {
        Row: {
          id: string;
          user_id: string;
          status:
            | "draft"
            | "pending_confirmation"
            | "approved"
            | "rejected"
            | "executed"
            | "failed"
            | "cancelled";
          action_type: string;
          target_table: string | null;
          target_id: string | null;
          title: string | null;
          description: string | null;
          payload: Json;
          validation_result: Json;
          source_chat_message_id: string | null;
          source_chat_session_id: string | null;
          source_context: Json;
          approved_at: string | null;
          rejected_at: string | null;
          executed_at: string | null;
          failed_at: string | null;
          failure_reason: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          status?:
            | "draft"
            | "pending_confirmation"
            | "approved"
            | "rejected"
            | "executed"
            | "failed"
            | "cancelled";
          action_type: string;
          target_table?: string | null;
          target_id?: string | null;
          title?: string | null;
          description?: string | null;
          payload?: Json;
          validation_result?: Json;
          source_chat_message_id?: string | null;
          source_chat_session_id?: string | null;
          source_context?: Json;
          approved_at?: string | null;
          rejected_at?: string | null;
          executed_at?: string | null;
          failed_at?: string | null;
          failure_reason?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          status?:
            | "draft"
            | "pending_confirmation"
            | "approved"
            | "rejected"
            | "executed"
            | "failed"
            | "cancelled";
          action_type?: string;
          target_table?: string | null;
          target_id?: string | null;
          title?: string | null;
          description?: string | null;
          payload?: Json;
          validation_result?: Json;
          source_chat_message_id?: string | null;
          source_chat_session_id?: string | null;
          source_context?: Json;
          approved_at?: string | null;
          rejected_at?: string | null;
          executed_at?: string | null;
          failed_at?: string | null;
          failure_reason?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "ai_actions_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ai_actions_source_chat_session_id_fkey";
            columns: ["source_chat_session_id"];
            referencedRelation: "chat_sessions";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ai_actions_source_chat_message_id_fkey";
            columns: ["source_chat_message_id"];
            referencedRelation: "chat_messages";
            referencedColumns: ["id"];
          },
        ];
      };
      chat_sessions: {
        Row: {
          id: string;
          user_id: string;
          title: string | null;
          status: "active" | "archived" | "deleted";
          summary: string | null;
          metadata: Json;
          started_at: string;
          ended_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          title?: string | null;
          status?: "active" | "archived" | "deleted";
          summary?: string | null;
          metadata?: Json;
          started_at?: string;
          ended_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          title?: string | null;
          status?: "active" | "archived" | "deleted";
          summary?: string | null;
          metadata?: Json;
          started_at?: string;
          ended_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "chat_sessions_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      chat_messages: {
        Row: {
          id: string;
          user_id: string;
          session_id: string;
          role: "user" | "assistant" | "system" | "tool";
          content: string;
          content_format: "text" | "markdown" | "json";
          metadata: Json;
          token_count: number | null;
          source_ai_action_id: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          session_id: string;
          role: "user" | "assistant" | "system" | "tool";
          content: string;
          content_format?: "text" | "markdown" | "json";
          metadata?: Json;
          token_count?: number | null;
          source_ai_action_id?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          session_id?: string;
          role?: "user" | "assistant" | "system" | "tool";
          content?: string;
          content_format?: "text" | "markdown" | "json";
          metadata?: Json;
          token_count?: number | null;
          source_ai_action_id?: string | null;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "chat_messages_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "chat_messages_session_id_fkey";
            columns: ["session_id"];
            referencedRelation: "chat_sessions";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "chat_messages_source_ai_action_id_fkey";
            columns: ["source_ai_action_id"];
            referencedRelation: "ai_actions";
            referencedColumns: ["id"];
          },
        ];
      };
      goals: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          description: string | null;
          domain: string;
          status:
            | "draft"
            | "active"
            | "paused"
            | "completed"
            | "archived"
            | "cancelled";
          priority: "low" | "medium" | "high" | "critical";
          horizon:
            | "daily"
            | "weekly"
            | "monthly"
            | "quarterly"
            | "yearly"
            | "medium_term"
            | "long_term";
          target_date: string | null;
          completed_at: string | null;
          proof_requirement: string | null;
          reality_snapshot: Json;
          target_snapshot: Json;
          metadata: Json;
          source_ai_action_id: string | null;
          source_chat_message_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          title: string;
          description?: string | null;
          domain?: string;
          status?:
            | "draft"
            | "active"
            | "paused"
            | "completed"
            | "archived"
            | "cancelled";
          priority?: "low" | "medium" | "high" | "critical";
          horizon?:
            | "daily"
            | "weekly"
            | "monthly"
            | "quarterly"
            | "yearly"
            | "medium_term"
            | "long_term";
          target_date?: string | null;
          completed_at?: string | null;
          proof_requirement?: string | null;
          reality_snapshot?: Json;
          target_snapshot?: Json;
          metadata?: Json;
          source_ai_action_id?: string | null;
          source_chat_message_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          title?: string;
          description?: string | null;
          domain?: string;
          status?:
            | "draft"
            | "active"
            | "paused"
            | "completed"
            | "archived"
            | "cancelled";
          priority?: "low" | "medium" | "high" | "critical";
          horizon?:
            | "daily"
            | "weekly"
            | "monthly"
            | "quarterly"
            | "yearly"
            | "medium_term"
            | "long_term";
          target_date?: string | null;
          completed_at?: string | null;
          proof_requirement?: string | null;
          reality_snapshot?: Json;
          target_snapshot?: Json;
          metadata?: Json;
          source_ai_action_id?: string | null;
          source_chat_message_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "goals_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "goals_source_ai_action_id_fkey";
            columns: ["source_ai_action_id"];
            referencedRelation: "ai_actions";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "goals_source_chat_message_id_fkey";
            columns: ["source_chat_message_id"];
            referencedRelation: "chat_messages";
            referencedColumns: ["id"];
          },
        ];
      };
      goal_milestones: {
        Row: {
          id: string;
          user_id: string;
          goal_id: string;
          title: string;
          description: string | null;
          status: "pending" | "active" | "completed" | "skipped" | "cancelled";
          sort_order: number;
          due_date: string | null;
          completed_at: string | null;
          metadata: Json;
          source_ai_action_id: string | null;
          source_chat_message_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          goal_id: string;
          title: string;
          description?: string | null;
          status?: "pending" | "active" | "completed" | "skipped" | "cancelled";
          sort_order?: number;
          due_date?: string | null;
          completed_at?: string | null;
          metadata?: Json;
          source_ai_action_id?: string | null;
          source_chat_message_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          goal_id?: string;
          title?: string;
          description?: string | null;
          status?: "pending" | "active" | "completed" | "skipped" | "cancelled";
          sort_order?: number;
          due_date?: string | null;
          completed_at?: string | null;
          metadata?: Json;
          source_ai_action_id?: string | null;
          source_chat_message_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "goal_milestones_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "goal_milestones_goal_id_fkey";
            columns: ["goal_id"];
            referencedRelation: "goals";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "goal_milestones_source_ai_action_id_fkey";
            columns: ["source_ai_action_id"];
            referencedRelation: "ai_actions";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "goal_milestones_source_chat_message_id_fkey";
            columns: ["source_chat_message_id"];
            referencedRelation: "chat_messages";
            referencedColumns: ["id"];
          },
        ];
      };
      daily_logs: {
        Row: {
          id: string;
          user_id: string;
          log_date: string;
          mission: string | null;
          top_actions: Json;
          wins: Json;
          blockers: Json;
          mood_score: number | null;
          energy_score: number | null;
          sleep_hours: number | null;
          stress_score: number | null;
          proof_score: number | null;
          reality_score: number | null;
          notes: string | null;
          metadata: Json;
          source_ai_action_id: string | null;
          source_chat_message_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          log_date: string;
          mission?: string | null;
          top_actions?: Json;
          wins?: Json;
          blockers?: Json;
          mood_score?: number | null;
          energy_score?: number | null;
          sleep_hours?: number | null;
          stress_score?: number | null;
          proof_score?: number | null;
          reality_score?: number | null;
          notes?: string | null;
          metadata?: Json;
          source_ai_action_id?: string | null;
          source_chat_message_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          log_date?: string;
          mission?: string | null;
          top_actions?: Json;
          wins?: Json;
          blockers?: Json;
          mood_score?: number | null;
          energy_score?: number | null;
          sleep_hours?: number | null;
          stress_score?: number | null;
          proof_score?: number | null;
          reality_score?: number | null;
          notes?: string | null;
          metadata?: Json;
          source_ai_action_id?: string | null;
          source_chat_message_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "daily_logs_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "daily_logs_source_ai_action_id_fkey";
            columns: ["source_ai_action_id"];
            referencedRelation: "ai_actions";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "daily_logs_source_chat_message_id_fkey";
            columns: ["source_chat_message_id"];
            referencedRelation: "chat_messages";
            referencedColumns: ["id"];
          },
        ];
      };
      proof_items: {
        Row: {
          id: string;
          user_id: string;
          daily_log_id: string | null;
          goal_id: string | null;
          task_id: string | null;
          title: string;
          description: string | null;
          domain: string;
          proof_type:
            | "note"
            | "link"
            | "file"
            | "metric"
            | "completion"
            | "artifact"
            | "reflection"
            | "external_validation";
          status: "captured" | "verified" | "rejected" | "archived";
          quantity: number | null;
          unit: string | null;
          url: string | null;
          evidence: Json;
          occurred_at: string;
          logged_at: string;
          metadata: Json;
          source_ai_action_id: string | null;
          source_chat_message_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          daily_log_id?: string | null;
          goal_id?: string | null;
          task_id?: string | null;
          title: string;
          description?: string | null;
          domain?: string;
          proof_type?:
            | "note"
            | "link"
            | "file"
            | "metric"
            | "completion"
            | "artifact"
            | "reflection"
            | "external_validation";
          status?: "captured" | "verified" | "rejected" | "archived";
          quantity?: number | null;
          unit?: string | null;
          url?: string | null;
          evidence?: Json;
          occurred_at?: string;
          logged_at?: string;
          metadata?: Json;
          source_ai_action_id?: string | null;
          source_chat_message_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          daily_log_id?: string | null;
          goal_id?: string | null;
          task_id?: string | null;
          title?: string;
          description?: string | null;
          domain?: string;
          proof_type?:
            | "note"
            | "link"
            | "file"
            | "metric"
            | "completion"
            | "artifact"
            | "reflection"
            | "external_validation";
          status?: "captured" | "verified" | "rejected" | "archived";
          quantity?: number | null;
          unit?: string | null;
          url?: string | null;
          evidence?: Json;
          occurred_at?: string;
          logged_at?: string;
          metadata?: Json;
          source_ai_action_id?: string | null;
          source_chat_message_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "proof_items_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "proof_items_daily_log_id_fkey";
            columns: ["daily_log_id"];
            referencedRelation: "daily_logs";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "proof_items_goal_id_fkey";
            columns: ["goal_id"];
            referencedRelation: "goals";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "proof_items_task_id_fkey";
            columns: ["task_id"];
            referencedRelation: "tasks";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "proof_items_source_ai_action_id_fkey";
            columns: ["source_ai_action_id"];
            referencedRelation: "ai_actions";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "proof_items_source_chat_message_id_fkey";
            columns: ["source_chat_message_id"];
            referencedRelation: "chat_messages";
            referencedColumns: ["id"];
          },
        ];
      };
      tasks: {
        Row: {
          id: string;
          user_id: string;
          goal_id: string | null;
          title: string;
          description: string | null;
          domain: string;
          status:
            | "todo"
            | "in_progress"
            | "blocked"
            | "done"
            | "skipped"
            | "cancelled"
            | "archived";
          priority: "low" | "medium" | "high" | "critical";
          due_date: string | null;
          scheduled_at: string | null;
          started_at: string | null;
          completed_at: string | null;
          estimate_minutes: number | null;
          actual_minutes: number | null;
          recurrence_rule: string | null;
          metadata: Json;
          source_ai_action_id: string | null;
          source_chat_message_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          goal_id?: string | null;
          title: string;
          description?: string | null;
          domain?: string;
          status?:
            | "todo"
            | "in_progress"
            | "blocked"
            | "done"
            | "skipped"
            | "cancelled"
            | "archived";
          priority?: "low" | "medium" | "high" | "critical";
          due_date?: string | null;
          scheduled_at?: string | null;
          started_at?: string | null;
          completed_at?: string | null;
          estimate_minutes?: number | null;
          actual_minutes?: number | null;
          recurrence_rule?: string | null;
          metadata?: Json;
          source_ai_action_id?: string | null;
          source_chat_message_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          goal_id?: string | null;
          title?: string;
          description?: string | null;
          domain?: string;
          status?:
            | "todo"
            | "in_progress"
            | "blocked"
            | "done"
            | "skipped"
            | "cancelled"
            | "archived";
          priority?: "low" | "medium" | "high" | "critical";
          due_date?: string | null;
          scheduled_at?: string | null;
          started_at?: string | null;
          completed_at?: string | null;
          estimate_minutes?: number | null;
          actual_minutes?: number | null;
          recurrence_rule?: string | null;
          metadata?: Json;
          source_ai_action_id?: string | null;
          source_chat_message_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "tasks_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "tasks_goal_id_fkey";
            columns: ["goal_id"];
            referencedRelation: "goals";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "tasks_source_ai_action_id_fkey";
            columns: ["source_ai_action_id"];
            referencedRelation: "ai_actions";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "tasks_source_chat_message_id_fkey";
            columns: ["source_chat_message_id"];
            referencedRelation: "chat_messages";
            referencedColumns: ["id"];
          },
        ];
      };
      events: {
        Row: {
          id: string;
          user_id: string;
          task_id: string | null;
          goal_id: string | null;
          title: string;
          description: string | null;
          domain: string;
          event_type:
            | "general"
            | "calendar"
            | "deadline"
            | "milestone"
            | "proof"
            | "reflection"
            | "system"
            | "carnos"
            | "health"
            | "career"
            | "learning"
            | "research";
          status:
            | "scheduled"
            | "completed"
            | "cancelled"
            | "missed"
            | "archived";
          start_at: string | null;
          end_at: string | null;
          occurred_at: string;
          logged_at: string;
          location: string | null;
          metadata: Json;
          source_ai_action_id: string | null;
          source_chat_message_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          task_id?: string | null;
          goal_id?: string | null;
          title: string;
          description?: string | null;
          domain?: string;
          event_type?:
            | "general"
            | "calendar"
            | "deadline"
            | "milestone"
            | "proof"
            | "reflection"
            | "system"
            | "carnos"
            | "health"
            | "career"
            | "learning"
            | "research";
          status?:
            | "scheduled"
            | "completed"
            | "cancelled"
            | "missed"
            | "archived";
          start_at?: string | null;
          end_at?: string | null;
          occurred_at?: string;
          logged_at?: string;
          location?: string | null;
          metadata?: Json;
          source_ai_action_id?: string | null;
          source_chat_message_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          task_id?: string | null;
          goal_id?: string | null;
          title?: string;
          description?: string | null;
          domain?: string;
          event_type?:
            | "general"
            | "calendar"
            | "deadline"
            | "milestone"
            | "proof"
            | "reflection"
            | "system"
            | "carnos"
            | "health"
            | "career"
            | "learning"
            | "research";
          status?:
            | "scheduled"
            | "completed"
            | "cancelled"
            | "missed"
            | "archived";
          start_at?: string | null;
          end_at?: string | null;
          occurred_at?: string;
          logged_at?: string;
          location?: string | null;
          metadata?: Json;
          source_ai_action_id?: string | null;
          source_chat_message_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "events_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "events_task_id_fkey";
            columns: ["task_id"];
            referencedRelation: "tasks";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "events_goal_id_fkey";
            columns: ["goal_id"];
            referencedRelation: "goals";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "events_source_ai_action_id_fkey";
            columns: ["source_ai_action_id"];
            referencedRelation: "ai_actions";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "events_source_chat_message_id_fkey";
            columns: ["source_chat_message_id"];
            referencedRelation: "chat_messages";
            referencedColumns: ["id"];
          },
        ];
      };
      skill_paths: {
        Row: Phase9SkillPathRow;
        Insert: Partial<Phase9SkillPathRow> & {
          user_id: string;
          title: string;
        };
        Update: Partial<Phase9SkillPathRow>;
        Relationships: [];
      };
      skills: {
        Row: Phase9SkillRow;
        Insert: Partial<Phase9SkillRow> & { user_id: string; title: string };
        Update: Partial<Phase9SkillRow>;
        Relationships: [];
      };
      skill_prerequisites: {
        Row: Phase9SkillPrerequisiteRow;
        Insert: Partial<Phase9SkillPrerequisiteRow> & {
          user_id: string;
          skill_id: string;
          prerequisite_skill_id: string;
        };
        Update: Partial<Phase9SkillPrerequisiteRow>;
        Relationships: [];
      };
      learning_sessions: {
        Row: Phase9LearningSessionRow;
        Insert: Partial<Phase9LearningSessionRow> & {
          user_id: string;
          title: string;
        };
        Update: Partial<Phase9LearningSessionRow>;
        Relationships: [];
      };
      quizzes: {
        Row: Phase9QuizRow;
        Insert: Partial<Phase9QuizRow> & { user_id: string; title: string };
        Update: Partial<Phase9QuizRow>;
        Relationships: [];
      };
      projects: {
        Row: Phase9ProjectRow;
        Insert: Partial<Phase9ProjectRow> & { user_id: string; title: string };
        Update: Partial<Phase9ProjectRow>;
        Relationships: [];
      };
      quiz_attempts: {
        Row: Phase9QuizAttemptRow;
        Insert: Partial<Phase9QuizAttemptRow> & {
          user_id: string;
          quiz_id: string;
        };
        Update: Partial<Phase9QuizAttemptRow>;
        Relationships: [];
      };
      project_milestones: {
        Row: Phase9ProjectMilestoneRow;
        Insert: Partial<Phase9ProjectMilestoneRow> & {
          user_id: string;
          project_id: string;
          title: string;
        };
        Update: Partial<Phase9ProjectMilestoneRow>;
        Relationships: [];
      };
      project_bugs: {
        Row: Phase9ProjectBugRow;
        Insert: Partial<Phase9ProjectBugRow> & {
          user_id: string;
          project_id: string;
          title: string;
        };
        Update: Partial<Phase9ProjectBugRow>;
        Relationships: [];
      };
      project_tests: {
        Row: Phase9ProjectTestRow;
        Insert: Partial<Phase9ProjectTestRow> & {
          user_id: string;
          project_id: string;
          title: string;
        };
        Update: Partial<Phase9ProjectTestRow>;
        Relationships: [];
      };
      project_releases: {
        Row: Phase9ProjectReleaseRow;
        Insert: Partial<Phase9ProjectReleaseRow> & {
          user_id: string;
          project_id: string;
          title: string;
        };
        Update: Partial<Phase9ProjectReleaseRow>;
        Relationships: [];
      };
      project_links: {
        Row: Phase9ProjectLinkRow;
        Insert: Partial<Phase9ProjectLinkRow> & {
          user_id: string;
          project_id: string;
          label: string;
          url: string;
        };
        Update: Partial<Phase9ProjectLinkRow>;
        Relationships: [];
      };
      skill_progress: {
        Row: Phase9SkillProgressRow;
        Insert: Partial<Phase9SkillProgressRow> & {
          user_id: string;
          skill_id: string;
          status: Phase9SkillProgressRow["status"];
        };
        Update: Partial<Phase9SkillProgressRow>;
        Relationships: [];
      };

      resume_bullets: {
        Row: CareerResumeBulletRow;
        Insert: Partial<CareerResumeBulletRow> & {
          user_id: string;
          resume_version_id: string;
          bullet_text: string;
        };
        Update: Partial<CareerResumeBulletRow>;
        Relationships: [];
      };
      interviews: {
        Row: CareerInterviewRow;
        Insert: Partial<CareerInterviewRow> & { user_id: string };
        Update: Partial<CareerInterviewRow>;
        Relationships: [];
      };
      resume_versions: {
        Row: CareerResumeVersionRow;
        Insert: Partial<CareerResumeVersionRow> & {
          user_id: string;
          name: string;
        };
        Update: Partial<CareerResumeVersionRow>;
        Relationships: [];
      };

      job_applications: {
        Row: CareerJobApplicationRow;
        Insert: Partial<CareerJobApplicationRow> & {
          user_id: string;
          company: string;
          role_title: string;
        };
        Update: Partial<CareerJobApplicationRow>;
        Relationships: [];
      };
      job_application_events: {
        Row: CareerJobApplicationEventRow;
        Insert: Partial<CareerJobApplicationEventRow> & {
          user_id: string;
          job_application_id: string;
          event_type: string;
          title: string;
        };
        Update: Partial<CareerJobApplicationEventRow>;
        Relationships: [];
      };

      networking_interactions: {
        Row: CareerNetworkingInteractionRow;
        Insert: Partial<CareerNetworkingInteractionRow> & {
          user_id: string;
          networking_contact_id: string;
          title: string;
        };
        Update: Partial<CareerNetworkingInteractionRow>;
        Relationships: [];
      };
      job_referrals: {
        Row: CareerJobReferralRow;
        Insert: Partial<CareerJobReferralRow> & { user_id: string };
        Update: Partial<CareerJobReferralRow>;
        Relationships: [];
      };
      networking_contacts: {
        Row: CareerNetworkingContactRow;
        Insert: Partial<CareerNetworkingContactRow> & {
          user_id: string;
          full_name: string;
        };
        Update: Partial<CareerNetworkingContactRow>;
        Relationships: [];
      };

      research_ideas: {
        Row: Phase10ResearchIdeaRow;
        Insert: Partial<Phase10ResearchIdeaRow> & {
          user_id: string;
          title: string;
        };
        Update: Partial<Phase10ResearchIdeaRow>;
        Relationships: [];
      };
      research_questions: {
        Row: Phase10ResearchQuestionRow;
        Insert: Partial<Phase10ResearchQuestionRow> & {
          user_id: string;
          question: string;
        };
        Update: Partial<Phase10ResearchQuestionRow>;
        Relationships: [];
      };
      research_literature_items: {
        Row: Phase10ResearchLiteratureItemRow;
        Insert: Partial<Phase10ResearchLiteratureItemRow> & {
          user_id: string;
          title: string;
        };
        Update: Partial<Phase10ResearchLiteratureItemRow>;
        Relationships: [];
      };
      research_papers: {
        Row: Phase10ResearchPaperRow;
        Insert: Partial<Phase10ResearchPaperRow> & {
          user_id: string;
          title: string;
        };
        Update: Partial<Phase10ResearchPaperRow>;
        Relationships: [];
      };
      research_paper_versions: {
        Row: Phase10ResearchPaperVersionRow;
        Insert: Partial<Phase10ResearchPaperVersionRow> & {
          user_id: string;
          research_paper_id: string;
          version_label: string;
        };
        Update: Partial<Phase10ResearchPaperVersionRow>;
        Relationships: [];
      };
      research_claims: {
        Row: Phase10ResearchClaimRow;
        Insert: Partial<Phase10ResearchClaimRow> & {
          user_id: string;
          claim_text: string;
        };
        Update: Partial<Phase10ResearchClaimRow>;
        Relationships: [];
      };
      research_experiments: {
        Row: Phase10ResearchExperimentRow;
        Insert: Partial<Phase10ResearchExperimentRow> & {
          user_id: string;
          title: string;
        };
        Update: Partial<Phase10ResearchExperimentRow>;
        Relationships: [];
      };
      research_results: {
        Row: Phase10ResearchResultRow;
        Insert: Partial<Phase10ResearchResultRow> & {
          user_id: string;
          title: string;
        };
        Update: Partial<Phase10ResearchResultRow>;
        Relationships: [];
      };
      research_citations: {
        Row: Phase10ResearchCitationRow;
        Insert: Partial<Phase10ResearchCitationRow> & {
          user_id: string;
          literature_item_id: string;
        };
        Update: Partial<Phase10ResearchCitationRow>;
        Relationships: [];
      };
      research_venues: {
        Row: Phase10ResearchVenueRow;
        Insert: Partial<Phase10ResearchVenueRow> & {
          user_id: string;
          name: string;
        };
        Update: Partial<Phase10ResearchVenueRow>;
        Relationships: [];
      };
      research_submissions: {
        Row: Phase10ResearchSubmissionRow;
        Insert: Partial<Phase10ResearchSubmissionRow> & {
          user_id: string;
          research_paper_id: string;
        };
        Update: Partial<Phase10ResearchSubmissionRow>;
        Relationships: [];
      };
      research_feedback: {
        Row: Phase10ResearchFeedbackRow;
        Insert: Partial<Phase10ResearchFeedbackRow> & {
          user_id: string;
          summary: string;
        };
        Update: Partial<Phase10ResearchFeedbackRow>;
        Relationships: [];
      };
      target_universities: {
        Row: Phase10TargetUniversityRow;
        Insert: Partial<Phase10TargetUniversityRow> & {
          user_id: string;
          name: string;
        };
        Update: Partial<Phase10TargetUniversityRow>;
        Relationships: [];
      };
      target_labs: {
        Row: Phase10TargetLabRow;
        Insert: Partial<Phase10TargetLabRow> & {
          user_id: string;
          name: string;
        };
        Update: Partial<Phase10TargetLabRow>;
        Relationships: [];
      };
      target_professors: {
        Row: Phase10TargetProfessorRow;
        Insert: Partial<Phase10TargetProfessorRow> & {
          user_id: string;
          name: string;
        };
        Update: Partial<Phase10TargetProfessorRow>;
        Relationships: [];
      };
      phd_readiness_assessments: {
        Row: Phase10PhdReadinessAssessmentRow;
        Insert: Partial<Phase10PhdReadinessAssessmentRow> & { user_id: string };
        Update: Partial<Phase10PhdReadinessAssessmentRow>;
        Relationships: [];
      };
      phd_application_assets: {
        Row: Phase10PhdApplicationAssetRow;
        Insert: Partial<Phase10PhdApplicationAssetRow> & {
          user_id: string;
          asset_type: Phase10PhdApplicationAssetRow["asset_type"];
          title: string;
        };
        Update: Partial<Phase10PhdApplicationAssetRow>;
        Relationships: [];
      };
      sop_versions: {
        Row: Phase10SopVersionRow;
        Insert: Partial<Phase10SopVersionRow> & {
          user_id: string;
          version_label: string;
        };
        Update: Partial<Phase10SopVersionRow>;
        Relationships: [];
      };
      recommendation_targets: {
        Row: Phase10RecommendationTargetRow;
        Insert: Partial<Phase10RecommendationTargetRow> & {
          user_id: string;
          recommender_name: string;
        };
        Update: Partial<Phase10RecommendationTargetRow>;
        Relationships: [];
      };
      body_logs: {
        Row: {
          id: string;
          user_id: string;
          log_date: string;
          bodyweight: number | null;
          bodyweight_unit: string | null;
          waist: number | null;
          waist_unit: string | null;
          recovery_score: number | null;
          soreness_score: number | null;
          pain_score: number | null;
          pain_area: string | null;
          notes: string | null;
          photo_attachment_id: string | null;
          goal_id: string | null;
          task_id: string | null;
          proof_item_id: string | null;
          daily_log_id: string | null;
          source_ai_action_id: string | null;
          source_chat_message_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          log_date: string;
          bodyweight?: number | null;
          bodyweight_unit?: string | null;
          waist?: number | null;
          waist_unit?: string | null;
          recovery_score?: number | null;
          soreness_score?: number | null;
          pain_score?: number | null;
          pain_area?: string | null;
          notes?: string | null;
          photo_attachment_id?: string | null;
          goal_id?: string | null;
          task_id?: string | null;
          proof_item_id?: string | null;
          daily_log_id?: string | null;
          source_ai_action_id?: string | null;
          source_chat_message_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          log_date?: string;
          bodyweight?: number | null;
          bodyweight_unit?: string | null;
          waist?: number | null;
          waist_unit?: string | null;
          recovery_score?: number | null;
          soreness_score?: number | null;
          pain_score?: number | null;
          pain_area?: string | null;
          notes?: string | null;
          photo_attachment_id?: string | null;
          goal_id?: string | null;
          task_id?: string | null;
          proof_item_id?: string | null;
          daily_log_id?: string | null;
          source_ai_action_id?: string | null;
          source_chat_message_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      workouts: {
        Row: {
          id: string;
          user_id: string;
          workout_date: string;
          title: string;
          duration_minutes: number | null;
          focus: string | null;
          intensity_score: number | null;
          recovery_notes: string | null;
          notes: string | null;
          goal_id: string | null;
          task_id: string | null;
          proof_item_id: string | null;
          event_id: string | null;
          source_ai_action_id: string | null;
          source_chat_message_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          workout_date: string;
          title: string;
          duration_minutes?: number | null;
          focus?: string | null;
          intensity_score?: number | null;
          recovery_notes?: string | null;
          notes?: string | null;
          goal_id?: string | null;
          task_id?: string | null;
          proof_item_id?: string | null;
          event_id?: string | null;
          source_ai_action_id?: string | null;
          source_chat_message_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          workout_date?: string;
          title?: string;
          duration_minutes?: number | null;
          focus?: string | null;
          intensity_score?: number | null;
          recovery_notes?: string | null;
          notes?: string | null;
          goal_id?: string | null;
          task_id?: string | null;
          proof_item_id?: string | null;
          event_id?: string | null;
          source_ai_action_id?: string | null;
          source_chat_message_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      exercises: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          muscle_group: string | null;
          equipment: string | null;
          notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          name: string;
          muscle_group?: string | null;
          equipment?: string | null;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          name?: string;
          muscle_group?: string | null;
          equipment?: string | null;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      workout_sets: {
        Row: {
          id: string;
          user_id: string;
          workout_id: string;
          exercise_id: string | null;
          set_number: number | null;
          reps: number | null;
          weight: number | null;
          weight_unit: string | null;
          rir: number | null;
          notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          workout_id: string;
          exercise_id?: string | null;
          set_number?: number | null;
          reps?: number | null;
          weight?: number | null;
          weight_unit?: string | null;
          rir?: number | null;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          workout_id?: string;
          exercise_id?: string | null;
          set_number?: number | null;
          reps?: number | null;
          weight?: number | null;
          weight_unit?: string | null;
          rir?: number | null;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      nutrition_logs: {
        Row: {
          id: string;
          user_id: string;
          log_date: string;
          calories: number | null;
          protein_g: number | null;
          carbs_g: number | null;
          fat_g: number | null;
          water_ml: number | null;
          mode: string | null;
          notes: string | null;
          goal_id: string | null;
          task_id: string | null;
          proof_item_id: string | null;
          daily_log_id: string | null;
          source_ai_action_id: string | null;
          source_chat_message_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          log_date: string;
          calories?: number | null;
          protein_g?: number | null;
          carbs_g?: number | null;
          fat_g?: number | null;
          water_ml?: number | null;
          mode?: string | null;
          notes?: string | null;
          goal_id?: string | null;
          task_id?: string | null;
          proof_item_id?: string | null;
          daily_log_id?: string | null;
          source_ai_action_id?: string | null;
          source_chat_message_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          log_date?: string;
          calories?: number | null;
          protein_g?: number | null;
          carbs_g?: number | null;
          fat_g?: number | null;
          water_ml?: number | null;
          mode?: string | null;
          notes?: string | null;
          goal_id?: string | null;
          task_id?: string | null;
          proof_item_id?: string | null;
          daily_log_id?: string | null;
          source_ai_action_id?: string | null;
          source_chat_message_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      meal_items: {
        Row: {
          id: string;
          user_id: string;
          nutrition_log_id: string;
          meal_name: string | null;
          food_name: string;
          calories: number | null;
          protein_g: number | null;
          carbs_g: number | null;
          fat_g: number | null;
          quantity: number | null;
          unit: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          nutrition_log_id: string;
          meal_name?: string | null;
          food_name: string;
          calories?: number | null;
          protein_g?: number | null;
          carbs_g?: number | null;
          fat_g?: number | null;
          quantity?: number | null;
          unit?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          nutrition_log_id?: string;
          meal_name?: string | null;
          food_name?: string;
          calories?: number | null;
          protein_g?: number | null;
          carbs_g?: number | null;
          fat_g?: number | null;
          quantity?: number | null;
          unit?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      supplements: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          dosage: string | null;
          frequency: string | null;
          notes: string | null;
          active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          name: string;
          dosage?: string | null;
          frequency?: string | null;
          notes?: string | null;
          active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          name?: string;
          dosage?: string | null;
          frequency?: string | null;
          notes?: string | null;
          active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      supplement_logs: {
        Row: {
          id: string;
          user_id: string;
          supplement_id: string;
          taken_at: string | null;
          status: "taken" | "missed" | "skipped";
          notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          supplement_id: string;
          taken_at?: string | null;
          status: "taken" | "missed" | "skipped";
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          supplement_id?: string;
          taken_at?: string | null;
          status?: "taken" | "missed" | "skipped";
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      sleep_logs: {
        Row: {
          id: string;
          user_id: string;
          sleep_date: string;
          bedtime: string | null;
          wake_time: string | null;
          sleep_hours: number | null;
          quality_score: number | null;
          notes: string | null;
          daily_log_id: string | null;
          source_ai_action_id: string | null;
          source_chat_message_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          sleep_date: string;
          bedtime?: string | null;
          wake_time?: string | null;
          sleep_hours?: number | null;
          quality_score?: number | null;
          notes?: string | null;
          daily_log_id?: string | null;
          source_ai_action_id?: string | null;
          source_chat_message_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          sleep_date?: string;
          bedtime?: string | null;
          wake_time?: string | null;
          sleep_hours?: number | null;
          quality_score?: number | null;
          notes?: string | null;
          daily_log_id?: string | null;
          source_ai_action_id?: string | null;
          source_chat_message_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      energy_logs: {
        Row: {
          id: string;
          user_id: string;
          log_date: string;
          energy_score: number | null;
          focus_score: number | null;
          fatigue_score: number | null;
          brain_fog_score: number | null;
          notes: string | null;
          daily_log_id: string | null;
          source_ai_action_id: string | null;
          source_chat_message_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          log_date: string;
          energy_score?: number | null;
          focus_score?: number | null;
          fatigue_score?: number | null;
          brain_fog_score?: number | null;
          notes?: string | null;
          daily_log_id?: string | null;
          source_ai_action_id?: string | null;
          source_chat_message_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          log_date?: string;
          energy_score?: number | null;
          focus_score?: number | null;
          fatigue_score?: number | null;
          brain_fog_score?: number | null;
          notes?: string | null;
          daily_log_id?: string | null;
          source_ai_action_id?: string | null;
          source_chat_message_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      mental_health_logs: {
        Row: {
          id: string;
          user_id: string;
          log_date: string;
          mood_score: number | null;
          anxiety_score: number | null;
          stress_score: number | null;
          shame_score: number | null;
          anger_score: number | null;
          loneliness_score: number | null;
          notes: string | null;
          sensitivity: "private" | "sensitive";
          source_ai_action_id: string | null;
          source_chat_message_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          log_date: string;
          mood_score?: number | null;
          anxiety_score?: number | null;
          stress_score?: number | null;
          shame_score?: number | null;
          anger_score?: number | null;
          loneliness_score?: number | null;
          notes?: string | null;
          sensitivity?: "private" | "sensitive";
          source_ai_action_id?: string | null;
          source_chat_message_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          log_date?: string;
          mood_score?: number | null;
          anxiety_score?: number | null;
          stress_score?: number | null;
          shame_score?: number | null;
          anger_score?: number | null;
          loneliness_score?: number | null;
          notes?: string | null;
          sensitivity?: "private" | "sensitive";
          source_ai_action_id?: string | null;
          source_chat_message_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      emotion_logs: {
        Row: {
          id: string;
          user_id: string;
          emotion: string;
          intensity: number | null;
          trigger: string | null;
          occurred_at: string;
          notes: string | null;
          sensitivity: "private" | "sensitive";
          source_ai_action_id: string | null;
          source_chat_message_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          emotion: string;
          intensity?: number | null;
          trigger?: string | null;
          occurred_at?: string;
          notes?: string | null;
          sensitivity?: "private" | "sensitive";
          source_ai_action_id?: string | null;
          source_chat_message_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          emotion?: string;
          intensity?: number | null;
          trigger?: string | null;
          occurred_at?: string;
          notes?: string | null;
          sensitivity?: "private" | "sensitive";
          source_ai_action_id?: string | null;
          source_chat_message_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      journal_entries: {
        Row: {
          id: string;
          user_id: string;
          entry_date: string;
          title: string | null;
          content: string | null;
          mood_json: Json | null;
          sensitivity: "private" | "sensitive";
          private: boolean;
          source_ai_action_id: string | null;
          source_chat_message_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          entry_date: string;
          title?: string | null;
          content?: string | null;
          mood_json?: Json | null;
          sensitivity?: "private" | "sensitive";
          private?: boolean;
          source_ai_action_id?: string | null;
          source_chat_message_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          entry_date?: string;
          title?: string | null;
          content?: string | null;
          mood_json?: Json | null;
          sensitivity?: "private" | "sensitive";
          private?: boolean;
          source_ai_action_id?: string | null;
          source_chat_message_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      skincare_logs: {
        Row: {
          id: string;
          user_id: string;
          log_date: string;
          routine_type: string | null;
          products_json: Json | null;
          completed: boolean | null;
          irritation_notes: string | null;
          source_ai_action_id: string | null;
          source_chat_message_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          log_date: string;
          routine_type?: string | null;
          products_json?: Json | null;
          completed?: boolean | null;
          irritation_notes?: string | null;
          source_ai_action_id?: string | null;
          source_chat_message_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          log_date?: string;
          routine_type?: string | null;
          products_json?: Json | null;
          completed?: boolean | null;
          irritation_notes?: string | null;
          source_ai_action_id?: string | null;
          source_chat_message_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      haircare_logs: {
        Row: {
          id: string;
          user_id: string;
          log_date: string;
          routine_json: Json | null;
          completed: boolean | null;
          shedding_notes: string | null;
          photo_attachment_id: string | null;
          source_ai_action_id: string | null;
          source_chat_message_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          log_date: string;
          routine_json?: Json | null;
          completed?: boolean | null;
          shedding_notes?: string | null;
          photo_attachment_id?: string | null;
          source_ai_action_id?: string | null;
          source_chat_message_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          log_date?: string;
          routine_json?: Json | null;
          completed?: boolean | null;
          shedding_notes?: string | null;
          photo_attachment_id?: string | null;
          source_ai_action_id?: string | null;
          source_chat_message_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      products: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          category: string | null;
          brand: string | null;
          usage_notes: string | null;
          active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          name: string;
          category?: string | null;
          brand?: string | null;
          usage_notes?: string | null;
          active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          name?: string;
          category?: string | null;
          brand?: string | null;
          usage_notes?: string | null;
          active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};

export type Tables = Database["public"]["Tables"];

export type ProfileRow = Tables["profiles"]["Row"];
export type ProfileInsert = Tables["profiles"]["Insert"];
export type ProfileUpdate = Tables["profiles"]["Update"];

export type CarnosProfileRow = Tables["carnos_profiles"]["Row"];
export type CarnosProfileInsert = Tables["carnos_profiles"]["Insert"];
export type CarnosProfileUpdate = Tables["carnos_profiles"]["Update"];

export type AuditLogRow = Tables["audit_logs"]["Row"];
export type AuditLogInsert = Tables["audit_logs"]["Insert"];
export type AuditLogUpdate = Tables["audit_logs"]["Update"];

export type AiActionRow = Tables["ai_actions"]["Row"];
export type AiActionInsert = Tables["ai_actions"]["Insert"];
export type AiActionUpdate = Tables["ai_actions"]["Update"];

export type ChatSessionRow = Tables["chat_sessions"]["Row"];
export type ChatSessionInsert = Tables["chat_sessions"]["Insert"];
export type ChatSessionUpdate = Tables["chat_sessions"]["Update"];

export type ChatMessageRow = Tables["chat_messages"]["Row"];
export type ChatMessageInsert = Tables["chat_messages"]["Insert"];
export type ChatMessageUpdate = Tables["chat_messages"]["Update"];

export type GoalRow = Tables["goals"]["Row"];
export type GoalInsert = Tables["goals"]["Insert"];
export type GoalUpdate = Tables["goals"]["Update"];

export type GoalMilestoneRow = Tables["goal_milestones"]["Row"];
export type GoalMilestoneInsert = Tables["goal_milestones"]["Insert"];
export type GoalMilestoneUpdate = Tables["goal_milestones"]["Update"];

export type DailyLogRow = Tables["daily_logs"]["Row"];
export type DailyLogInsert = Tables["daily_logs"]["Insert"];
export type DailyLogUpdate = Tables["daily_logs"]["Update"];

export type ProofItemRow = Tables["proof_items"]["Row"];
export type ProofItemInsert = Tables["proof_items"]["Insert"];
export type ProofItemUpdate = Tables["proof_items"]["Update"];

export type TaskRow = Tables["tasks"]["Row"];
export type TaskInsert = Tables["tasks"]["Insert"];
export type TaskUpdate = Tables["tasks"]["Update"];

export type EventRow = Tables["events"]["Row"];
export type EventInsert = Tables["events"]["Insert"];
export type EventUpdate = Tables["events"]["Update"];

export type ResumeVersionRow = Tables["resume_versions"]["Row"];
export type ResumeVersionInsert = Tables["resume_versions"]["Insert"];
export type ResumeVersionUpdate = Tables["resume_versions"]["Update"];

export type NetworkingContactRow = Tables["networking_contacts"]["Row"];
export type NetworkingContactInsert = Tables["networking_contacts"]["Insert"];
export type NetworkingContactUpdate = Tables["networking_contacts"]["Update"];

export type JobApplicationRow = Tables["job_applications"]["Row"];
export type JobApplicationInsert = Tables["job_applications"]["Insert"];
export type JobApplicationUpdate = Tables["job_applications"]["Update"];

export type JobApplicationEventRow = Tables["job_application_events"]["Row"];
export type JobApplicationEventInsert =
  Tables["job_application_events"]["Insert"];
export type JobApplicationEventUpdate =
  Tables["job_application_events"]["Update"];

export type NetworkingInteractionRow = Tables["networking_interactions"]["Row"];
export type NetworkingInteractionInsert =
  Tables["networking_interactions"]["Insert"];
export type NetworkingInteractionUpdate =
  Tables["networking_interactions"]["Update"];

export type JobReferralRow = Tables["job_referrals"]["Row"];
export type JobReferralInsert = Tables["job_referrals"]["Insert"];
export type JobReferralUpdate = Tables["job_referrals"]["Update"];

export type ResumeBulletRow = Tables["resume_bullets"]["Row"];
export type ResumeBulletInsert = Tables["resume_bullets"]["Insert"];
export type ResumeBulletUpdate = Tables["resume_bullets"]["Update"];

export type InterviewRow = Tables["interviews"]["Row"];
export type InterviewInsert = Tables["interviews"]["Insert"];
export type InterviewUpdate = Tables["interviews"]["Update"];

export type SkillPathRow = Tables["skill_paths"]["Row"];
export type SkillPathInsert = Tables["skill_paths"]["Insert"];
export type SkillPathUpdate = Tables["skill_paths"]["Update"];

export type SkillRow = Tables["skills"]["Row"];
export type SkillInsert = Tables["skills"]["Insert"];
export type SkillUpdate = Tables["skills"]["Update"];

export type SkillPrerequisiteRow = Tables["skill_prerequisites"]["Row"];
export type SkillPrerequisiteInsert = Tables["skill_prerequisites"]["Insert"];
export type SkillPrerequisiteUpdate = Tables["skill_prerequisites"]["Update"];

export type LearningSessionRow = Tables["learning_sessions"]["Row"];
export type LearningSessionInsert = Tables["learning_sessions"]["Insert"];
export type LearningSessionUpdate = Tables["learning_sessions"]["Update"];

export type QuizRow = Tables["quizzes"]["Row"];
export type QuizInsert = Tables["quizzes"]["Insert"];
export type QuizUpdate = Tables["quizzes"]["Update"];

export type ProjectRow = Tables["projects"]["Row"];
export type ProjectInsert = Tables["projects"]["Insert"];
export type ProjectUpdate = Tables["projects"]["Update"];

export type QuizAttemptRow = Tables["quiz_attempts"]["Row"];
export type QuizAttemptInsert = Tables["quiz_attempts"]["Insert"];
export type QuizAttemptUpdate = Tables["quiz_attempts"]["Update"];

export type ProjectMilestoneRow = Tables["project_milestones"]["Row"];
export type ProjectMilestoneInsert = Tables["project_milestones"]["Insert"];
export type ProjectMilestoneUpdate = Tables["project_milestones"]["Update"];

export type ProjectBugRow = Tables["project_bugs"]["Row"];
export type ProjectBugInsert = Tables["project_bugs"]["Insert"];
export type ProjectBugUpdate = Tables["project_bugs"]["Update"];

export type ProjectTestRow = Tables["project_tests"]["Row"];
export type ProjectTestInsert = Tables["project_tests"]["Insert"];
export type ProjectTestUpdate = Tables["project_tests"]["Update"];

export type ProjectReleaseRow = Tables["project_releases"]["Row"];
export type ProjectReleaseInsert = Tables["project_releases"]["Insert"];
export type ProjectReleaseUpdate = Tables["project_releases"]["Update"];

export type ProjectLinkRow = Tables["project_links"]["Row"];
export type ProjectLinkInsert = Tables["project_links"]["Insert"];
export type ProjectLinkUpdate = Tables["project_links"]["Update"];

export type SkillProgressRow = Tables["skill_progress"]["Row"];
export type SkillProgressInsert = Tables["skill_progress"]["Insert"];
export type SkillProgressUpdate = Tables["skill_progress"]["Update"];

export type ResearchIdeaRow = Tables["research_ideas"]["Row"];
export type ResearchIdeaInsert = Tables["research_ideas"]["Insert"];
export type ResearchIdeaUpdate = Tables["research_ideas"]["Update"];

export type ResearchQuestionRow = Tables["research_questions"]["Row"];
export type ResearchQuestionInsert = Tables["research_questions"]["Insert"];
export type ResearchQuestionUpdate = Tables["research_questions"]["Update"];

export type ResearchLiteratureItemRow =
  Tables["research_literature_items"]["Row"];
export type ResearchLiteratureItemInsert =
  Tables["research_literature_items"]["Insert"];
export type ResearchLiteratureItemUpdate =
  Tables["research_literature_items"]["Update"];

export type ResearchPaperRow = Tables["research_papers"]["Row"];
export type ResearchPaperInsert = Tables["research_papers"]["Insert"];
export type ResearchPaperUpdate = Tables["research_papers"]["Update"];

export type ResearchPaperVersionRow = Tables["research_paper_versions"]["Row"];
export type ResearchPaperVersionInsert =
  Tables["research_paper_versions"]["Insert"];
export type ResearchPaperVersionUpdate =
  Tables["research_paper_versions"]["Update"];

export type ResearchClaimRow = Tables["research_claims"]["Row"];
export type ResearchClaimInsert = Tables["research_claims"]["Insert"];
export type ResearchClaimUpdate = Tables["research_claims"]["Update"];

export type ResearchExperimentRow = Tables["research_experiments"]["Row"];
export type ResearchExperimentInsert = Tables["research_experiments"]["Insert"];
export type ResearchExperimentUpdate = Tables["research_experiments"]["Update"];

export type ResearchResultRow = Tables["research_results"]["Row"];
export type ResearchResultInsert = Tables["research_results"]["Insert"];
export type ResearchResultUpdate = Tables["research_results"]["Update"];

export type ResearchCitationRow = Tables["research_citations"]["Row"];
export type ResearchCitationInsert = Tables["research_citations"]["Insert"];
export type ResearchCitationUpdate = Tables["research_citations"]["Update"];

export type ResearchVenueRow = Tables["research_venues"]["Row"];
export type ResearchVenueInsert = Tables["research_venues"]["Insert"];
export type ResearchVenueUpdate = Tables["research_venues"]["Update"];

export type ResearchSubmissionRow = Tables["research_submissions"]["Row"];
export type ResearchSubmissionInsert = Tables["research_submissions"]["Insert"];
export type ResearchSubmissionUpdate = Tables["research_submissions"]["Update"];

export type ResearchFeedbackRow = Tables["research_feedback"]["Row"];
export type ResearchFeedbackInsert = Tables["research_feedback"]["Insert"];
export type ResearchFeedbackUpdate = Tables["research_feedback"]["Update"];

export type TargetUniversityRow = Tables["target_universities"]["Row"];
export type TargetUniversityInsert = Tables["target_universities"]["Insert"];
export type TargetUniversityUpdate = Tables["target_universities"]["Update"];

export type TargetLabRow = Tables["target_labs"]["Row"];
export type TargetLabInsert = Tables["target_labs"]["Insert"];
export type TargetLabUpdate = Tables["target_labs"]["Update"];

export type TargetProfessorRow = Tables["target_professors"]["Row"];
export type TargetProfessorInsert = Tables["target_professors"]["Insert"];
export type TargetProfessorUpdate = Tables["target_professors"]["Update"];

export type PhdReadinessAssessmentRow =
  Tables["phd_readiness_assessments"]["Row"];
export type PhdReadinessAssessmentInsert =
  Tables["phd_readiness_assessments"]["Insert"];
export type PhdReadinessAssessmentUpdate =
  Tables["phd_readiness_assessments"]["Update"];

export type PhdApplicationAssetRow = Tables["phd_application_assets"]["Row"];
export type PhdApplicationAssetInsert =
  Tables["phd_application_assets"]["Insert"];
export type PhdApplicationAssetUpdate =
  Tables["phd_application_assets"]["Update"];

export type SopVersionRow = Tables["sop_versions"]["Row"];
export type SopVersionInsert = Tables["sop_versions"]["Insert"];
export type SopVersionUpdate = Tables["sop_versions"]["Update"];

export type RecommendationTargetRow = Tables["recommendation_targets"]["Row"];
export type RecommendationTargetInsert =
  Tables["recommendation_targets"]["Insert"];
export type RecommendationTargetUpdate =
  Tables["recommendation_targets"]["Update"];

export type BodyLogRow = Tables["body_logs"]["Row"];
export type BodyLogInsert = Tables["body_logs"]["Insert"];
export type BodyLogUpdate = Tables["body_logs"]["Update"];

export type WorkoutRow = Tables["workouts"]["Row"];
export type WorkoutInsert = Tables["workouts"]["Insert"];
export type WorkoutUpdate = Tables["workouts"]["Update"];

export type ExerciseRow = Tables["exercises"]["Row"];
export type ExerciseInsert = Tables["exercises"]["Insert"];
export type ExerciseUpdate = Tables["exercises"]["Update"];

export type WorkoutSetRow = Tables["workout_sets"]["Row"];
export type WorkoutSetInsert = Tables["workout_sets"]["Insert"];
export type WorkoutSetUpdate = Tables["workout_sets"]["Update"];

export type NutritionLogRow = Tables["nutrition_logs"]["Row"];
export type NutritionLogInsert = Tables["nutrition_logs"]["Insert"];
export type NutritionLogUpdate = Tables["nutrition_logs"]["Update"];

export type MealItemRow = Tables["meal_items"]["Row"];
export type MealItemInsert = Tables["meal_items"]["Insert"];
export type MealItemUpdate = Tables["meal_items"]["Update"];

export type SupplementRow = Tables["supplements"]["Row"];
export type SupplementInsert = Tables["supplements"]["Insert"];
export type SupplementUpdate = Tables["supplements"]["Update"];

export type SupplementLogRow = Tables["supplement_logs"]["Row"];
export type SupplementLogInsert = Tables["supplement_logs"]["Insert"];
export type SupplementLogUpdate = Tables["supplement_logs"]["Update"];

export type SleepLogRow = Tables["sleep_logs"]["Row"];
export type SleepLogInsert = Tables["sleep_logs"]["Insert"];
export type SleepLogUpdate = Tables["sleep_logs"]["Update"];

export type EnergyLogRow = Tables["energy_logs"]["Row"];
export type EnergyLogInsert = Tables["energy_logs"]["Insert"];
export type EnergyLogUpdate = Tables["energy_logs"]["Update"];

export type MentalHealthLogRow = Tables["mental_health_logs"]["Row"];
export type MentalHealthLogInsert = Tables["mental_health_logs"]["Insert"];
export type MentalHealthLogUpdate = Tables["mental_health_logs"]["Update"];

export type EmotionLogRow = Tables["emotion_logs"]["Row"];
export type EmotionLogInsert = Tables["emotion_logs"]["Insert"];
export type EmotionLogUpdate = Tables["emotion_logs"]["Update"];

export type JournalEntryRow = Tables["journal_entries"]["Row"];
export type JournalEntryInsert = Tables["journal_entries"]["Insert"];
export type JournalEntryUpdate = Tables["journal_entries"]["Update"];

export type SkincareLogRow = Tables["skincare_logs"]["Row"];
export type SkincareLogInsert = Tables["skincare_logs"]["Insert"];
export type SkincareLogUpdate = Tables["skincare_logs"]["Update"];

export type HaircareLogRow = Tables["haircare_logs"]["Row"];
export type HaircareLogInsert = Tables["haircare_logs"]["Insert"];
export type HaircareLogUpdate = Tables["haircare_logs"]["Update"];

export type ProductRow = Tables["products"]["Row"];
export type ProductInsert = Tables["products"]["Insert"];
export type ProductUpdate = Tables["products"]["Update"];

export type FinancialAccountRow = Tables["financial_accounts"]["Row"];
export type FinancialAccountInsert = Tables["financial_accounts"]["Insert"];
export type FinancialAccountUpdate = Tables["financial_accounts"]["Update"];

export type BudgetCategoryRow = Tables["budget_categories"]["Row"];
export type BudgetCategoryInsert = Tables["budget_categories"]["Insert"];
export type BudgetCategoryUpdate = Tables["budget_categories"]["Update"];

export type FinancialLogRow = Tables["financial_logs"]["Row"];
export type FinancialLogInsert = Tables["financial_logs"]["Insert"];
export type FinancialLogUpdate = Tables["financial_logs"]["Update"];

export type SubscriptionRow = Tables["subscriptions"]["Row"];
export type SubscriptionInsert = Tables["subscriptions"]["Insert"];
export type SubscriptionUpdate = Tables["subscriptions"]["Update"];

export type LifeAdminDocumentRow = Tables["documents"]["Row"];
export type LifeAdminDocumentInsert = Tables["documents"]["Insert"];
export type LifeAdminDocumentUpdate = Tables["documents"]["Update"];

export type HousingOptionRow = Tables["housing_options"]["Row"];
export type HousingOptionInsert = Tables["housing_options"]["Insert"];
export type HousingOptionUpdate = Tables["housing_options"]["Update"];

export type HousingContactRow = Tables["housing_contacts"]["Row"];
export type HousingContactInsert = Tables["housing_contacts"]["Insert"];
export type HousingContactUpdate = Tables["housing_contacts"]["Update"];

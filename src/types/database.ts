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
  status: "not_started" | "learning" | "practicing" | "proving" | "mastered" | "stale" | "archived";
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
  session_type: "study" | "practice" | "build" | "review" | "quiz" | "interview_prep" | "research";
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
  quiz_type: "concept_check" | "coding" | "interview" | "project_review" | "research_review" | "mixed";
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
  project_type: "portfolio" | "learning" | "research" | "career" | "personal_system" | "coursework" | "experiment";
  status: "planned" | "active" | "blocked" | "shipping" | "shipped" | "paused" | "archived";
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
  status: "planned" | "active" | "blocked" | "completed" | "cancelled" | "archived";
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
  status: "open" | "investigating" | "fixed" | "wont_fix" | "closed" | "archived";
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
  test_type: "manual" | "unit" | "integration" | "e2e" | "lint" | "typecheck" | "build" | "audit" | "smoke";
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
  link_type: "github" | "demo" | "readme" | "portfolio" | "paper" | "video" | "documentation" | "reference" | "proof";
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
  status: "not_started" | "learning" | "practicing" | "proving" | "mastered" | "stale" | "archived";
  previous_status: "not_started" | "learning" | "practicing" | "proving" | "mastered" | "stale" | "archived" | null;
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

export type Database = {
  public: {
    Tables: {
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
          status: "draft" | "active" | "paused" | "completed" | "archived" | "cancelled";
          priority: "low" | "medium" | "high" | "critical";
          horizon: "daily" | "weekly" | "monthly" | "quarterly" | "yearly" | "medium_term" | "long_term";
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
          status?: "draft" | "active" | "paused" | "completed" | "archived" | "cancelled";
          priority?: "low" | "medium" | "high" | "critical";
          horizon?: "daily" | "weekly" | "monthly" | "quarterly" | "yearly" | "medium_term" | "long_term";
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
          status?: "draft" | "active" | "paused" | "completed" | "archived" | "cancelled";
          priority?: "low" | "medium" | "high" | "critical";
          horizon?: "daily" | "weekly" | "monthly" | "quarterly" | "yearly" | "medium_term" | "long_term";
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
          status: "todo" | "in_progress" | "blocked" | "done" | "skipped" | "cancelled" | "archived";
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
          status?: "todo" | "in_progress" | "blocked" | "done" | "skipped" | "cancelled" | "archived";
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
          status?: "todo" | "in_progress" | "blocked" | "done" | "skipped" | "cancelled" | "archived";
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
          status: "scheduled" | "completed" | "cancelled" | "missed" | "archived";
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
          status?: "scheduled" | "completed" | "cancelled" | "missed" | "archived";
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
          status?: "scheduled" | "completed" | "cancelled" | "missed" | "archived";
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
        Insert: Partial<Phase9SkillPathRow> & { user_id: string; title: string };
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
        Insert: Partial<Phase9LearningSessionRow> & { user_id: string; title: string };
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
        Insert: Partial<Phase9QuizAttemptRow> & { user_id: string; quiz_id: string };
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
        Insert: Partial<CareerResumeVersionRow> & { user_id: string; name: string };
        Update: Partial<CareerResumeVersionRow>;
        Relationships: [];
      };

      job_applications: {
        Row: CareerJobApplicationRow;
        Insert: Partial<CareerJobApplicationRow> & { user_id: string; company: string; role_title: string };
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
        Insert: Partial<CareerNetworkingContactRow> & { user_id: string; full_name: string };
        Update: Partial<CareerNetworkingContactRow>;
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
export type JobApplicationEventInsert = Tables["job_application_events"]["Insert"];
export type JobApplicationEventUpdate = Tables["job_application_events"]["Update"];

export type NetworkingInteractionRow = Tables["networking_interactions"]["Row"];
export type NetworkingInteractionInsert = Tables["networking_interactions"]["Insert"];
export type NetworkingInteractionUpdate = Tables["networking_interactions"]["Update"];

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

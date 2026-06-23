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

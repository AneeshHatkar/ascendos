export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

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

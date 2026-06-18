export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type ProfileOnboardingStatus = "not_started" | "in_progress" | "complete";

export type CarnosMemoryMode =
  | "off"
  | "confirmation_required"
  | "approved_memory_only";

export type CarnosSafetyMode = "standard" | "strict" | "private";

export type ProfileRow = {
  id: string;
  email: string | null;
  display_name: string | null;
  timezone: string;
  onboarding_status: ProfileOnboardingStatus;
  created_at: string;
  updated_at: string;
};

export type ProfileInsert = {
  id: string;
  email?: string | null;
  display_name?: string | null;
  timezone?: string;
  onboarding_status?: ProfileOnboardingStatus;
  created_at?: string;
  updated_at?: string;
};

export type ProfileUpdate = {
  email?: string | null;
  display_name?: string | null;
  timezone?: string;
  onboarding_status?: ProfileOnboardingStatus;
  updated_at?: string;
};

export type CarnosProfileRow = {
  id: string;
  user_id: string;
  companion_name: string;
  memory_mode: CarnosMemoryMode;
  persona_mode: string;
  voice_enabled: boolean;
  safety_mode: CarnosSafetyMode;
  preferences: Json;
  created_at: string;
  updated_at: string;
};

export type CarnosProfileInsert = {
  id?: string;
  user_id: string;
  companion_name?: string;
  memory_mode?: CarnosMemoryMode;
  persona_mode?: string;
  voice_enabled?: boolean;
  safety_mode?: CarnosSafetyMode;
  preferences?: Json;
  created_at?: string;
  updated_at?: string;
};

export type CarnosProfileUpdate = {
  companion_name?: string;
  memory_mode?: CarnosMemoryMode;
  persona_mode?: string;
  voice_enabled?: boolean;
  safety_mode?: CarnosSafetyMode;
  preferences?: Json;
  updated_at?: string;
};

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: ProfileRow;
        Insert: ProfileInsert;
        Update: ProfileUpdate;
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey";
            columns: ["id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      carnos_profiles: {
        Row: CarnosProfileRow;
        Insert: CarnosProfileInsert;
        Update: CarnosProfileUpdate;
        Relationships: [
          {
            foreignKeyName: "carnos_profiles_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "profiles";
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

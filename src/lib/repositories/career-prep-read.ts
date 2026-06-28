import { createSupabaseServerClient } from "@/lib/supabase/server";

type QueryResponse = {
  data: unknown[] | null;
  error: unknown;
};

type CareerPrepQuery = PromiseLike<QueryResponse> & {
  select: (columns: string) => CareerPrepQuery;
  eq: (column: string, value: string) => CareerPrepQuery;
  order: (column: string, options: { ascending: boolean }) => CareerPrepQuery;
  limit: (count: number) => CareerPrepQuery;
};

type CareerPrepSupabaseClient = {
  from: (table: string) => CareerPrepQuery;
};

type ReadOptions = {
  limit?: number;
  status?: string;
  category?: string;
};

export type BehavioralStoryRow = {
  id: string;
  user_id: string;
  title: string;
  story_type: string;
  target_role: string | null;
  target_company: string | null;
  situation: string | null;
  task_context: string | null;
  action_taken: string | null;
  result_outcome: string | null;
  reflection: string | null;
  skill_tags: string[];
  proof_item_id: string | null;
  goal_id: string | null;
  task_id: string | null;
  resume_bullet_id: string | null;
  status: string;
  confidence_score: number | null;
  metadata: Record<string, unknown>;
  source_ai_action_id: string | null;
  source_chat_message_id: string | null;
  created_at: string;
  updated_at: string;
};

export type QuestionBankRow = {
  id: string;
  user_id: string;
  question: string;
  answer_notes: string | null;
  category: string;
  difficulty: string;
  target_role: string | null;
  target_company: string | null;
  source: string | null;
  tags: string[];
  behavioral_story_id: string | null;
  resume_bullet_id: string | null;
  proof_item_id: string | null;
  status: string;
  metadata: Record<string, unknown>;
  source_ai_action_id: string | null;
  source_chat_message_id: string | null;
  created_at: string;
  updated_at: string;
};

export type MockInterviewRow = {
  id: string;
  user_id: string;
  interview_id: string | null;
  job_application_id: string | null;
  title: string;
  interview_type: string;
  status: string;
  scheduled_at: string | null;
  completed_at: string | null;
  duration_minutes: number | null;
  question_count: number | null;
  score: number | null;
  strengths: string | null;
  weaknesses: string | null;
  next_steps: string | null;
  notes: string | null;
  metadata: Record<string, unknown>;
  source_ai_action_id: string | null;
  source_chat_message_id: string | null;
  created_at: string;
  updated_at: string;
};

export type ResumeUsageRow = {
  id: string;
  user_id: string;
  resume_version_id: string;
  job_application_id: string | null;
  interview_id: string | null;
  usage_type: string;
  used_at: string;
  target_role: string | null;
  target_company: string | null;
  outcome: string | null;
  notes: string | null;
  metadata: Record<string, unknown>;
  source_ai_action_id: string | null;
  source_chat_message_id: string | null;
  created_at: string;
};

function limitFor(options?: ReadOptions) {
  return Math.min(Math.max(options?.limit ?? 25, 1), 100);
}

function normalizeError(error: unknown) {
  if (!error) {
    return null;
  }

  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === "object" && "message" in error) {
    const message = (error as { message?: unknown }).message;

    if (typeof message === "string") {
      return message;
    }
  }

  return "Unknown read error.";
}

async function getClient() {
  return (await createSupabaseServerClient()) as unknown as CareerPrepSupabaseClient;
}

export async function listBehavioralStories(
  userId: string,
  options?: ReadOptions,
): Promise<{ data: BehavioralStoryRow[]; error: string | null }> {
  const supabase = await getClient();

  let query = supabase
    .from("behavioral_stories")
    .select("*")
    .eq("user_id", userId)
    .order("updated_at", { ascending: false })
    .limit(limitFor(options));

  if (options?.status) {
    query = query.eq("status", options.status);
  }

  const { data, error } = await query;

  return {
    data: (data ?? []) as unknown as BehavioralStoryRow[],
    error: normalizeError(error),
  };
}

export async function listQuestionBank(
  userId: string,
  options?: ReadOptions,
): Promise<{ data: QuestionBankRow[]; error: string | null }> {
  const supabase = await getClient();

  let query = supabase
    .from("question_bank")
    .select("*")
    .eq("user_id", userId)
    .order("updated_at", { ascending: false })
    .limit(limitFor(options));

  if (options?.status) {
    query = query.eq("status", options.status);
  }

  if (options?.category) {
    query = query.eq("category", options.category);
  }

  const { data, error } = await query;

  return {
    data: (data ?? []) as unknown as QuestionBankRow[],
    error: normalizeError(error),
  };
}

export async function listMockInterviews(
  userId: string,
  options?: ReadOptions,
): Promise<{ data: MockInterviewRow[]; error: string | null }> {
  const supabase = await getClient();

  let query = supabase
    .from("mock_interviews")
    .select("*")
    .eq("user_id", userId)
    .order("updated_at", { ascending: false })
    .limit(limitFor(options));

  if (options?.status) {
    query = query.eq("status", options.status);
  }

  const { data, error } = await query;

  return {
    data: (data ?? []) as unknown as MockInterviewRow[],
    error: normalizeError(error),
  };
}

export async function listResumeUsage(
  userId: string,
  options?: ReadOptions,
): Promise<{ data: ResumeUsageRow[]; error: string | null }> {
  const supabase = await getClient();

  let query = supabase
    .from("resume_usage")
    .select("*")
    .eq("user_id", userId)
    .order("used_at", { ascending: false })
    .limit(limitFor(options));

  if (options?.status) {
    query = query.eq("status", options.status);
  }

  const { data, error } = await query;

  return {
    data: (data ?? []) as unknown as ResumeUsageRow[],
    error: normalizeError(error),
  };
}

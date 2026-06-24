import { createSupabaseServerClient } from "@/lib/supabase/server";
import type {
  AiActionRow,
  AuditLogRow,
  ChatMessageRow,
  ChatSessionRow,
  DailyLogRow,
  EventRow,
  GoalMilestoneRow,
  GoalRow,
  JobApplicationEventRow,
  JobApplicationRow,
  JobReferralRow,
  NetworkingContactRow,
  NetworkingInteractionRow,
  ProofItemRow,
  ResumeBulletRow,
  ResumeVersionRow,
  InterviewRow,
  LearningSessionRow,
  ProjectBugRow,
  ProjectLinkRow,
  ProjectMilestoneRow,
  ProjectReleaseRow,
  ProjectRow,
  ProjectTestRow,
  QuizAttemptRow,
  QuizRow,
  SkillPathRow,
  SkillPrerequisiteRow,
  SkillProgressRow,
  SkillRow,
  TaskRow,
} from "@/types/database";

export type RepositoryResult<T> =
  | {
      data: T;
      error: null;
    }
  | {
      data: null;
      error: string;
    };

export type RepositoryListResult<T> = RepositoryResult<T[]>;

const DEFAULT_LIMIT = 25;
const MAX_LIMIT = 100;

function clampLimit(limit: number | undefined): number {
  if (limit === undefined || Number.isNaN(limit)) {
    return DEFAULT_LIMIT;
  }

  return Math.min(Math.max(Math.trunc(limit), 1), MAX_LIMIT);
}

function toErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }

  return "Unknown repository error";
}

export async function listAuditLogs(
  userId: string,
  options: {
    limit?: number;
  } = {},
): Promise<RepositoryListResult<AuditLogRow>> {
  try {
    const supabase = await createSupabaseServerClient();
    const limit = clampLimit(options.limit);

    const { data, error } = await supabase
      .from("audit_logs")
      .select("*")
      .eq("user_id", userId)
      .order("occurred_at", { ascending: false })
      .limit(limit);

    if (error) {
      return { data: null, error: error.message };
    }

    return { data: data ?? [], error: null };
  } catch (error) {
    return { data: null, error: toErrorMessage(error) };
  }
}

export async function listAiActions(
  userId: string,
  options: {
    status?: AiActionRow["status"];
    limit?: number;
  } = {},
): Promise<RepositoryListResult<AiActionRow>> {
  try {
    const supabase = await createSupabaseServerClient();
    const limit = clampLimit(options.limit);

    let query = supabase
      .from("ai_actions")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(limit);

    if (options.status) {
      query = query.eq("status", options.status);
    }

    const { data, error } = await query;

    if (error) {
      return { data: null, error: error.message };
    }

    return { data: data ?? [], error: null };
  } catch (error) {
    return { data: null, error: toErrorMessage(error) };
  }
}

export async function listChatSessions(
  userId: string,
  options: {
    status?: ChatSessionRow["status"];
    limit?: number;
  } = {},
): Promise<RepositoryListResult<ChatSessionRow>> {
  try {
    const supabase = await createSupabaseServerClient();
    const limit = clampLimit(options.limit);

    let query = supabase
      .from("chat_sessions")
      .select("*")
      .eq("user_id", userId)
      .order("updated_at", { ascending: false })
      .limit(limit);

    if (options.status) {
      query = query.eq("status", options.status);
    }

    const { data, error } = await query;

    if (error) {
      return { data: null, error: error.message };
    }

    return { data: data ?? [], error: null };
  } catch (error) {
    return { data: null, error: toErrorMessage(error) };
  }
}

export async function listChatMessages(
  userId: string,
  sessionId: string,
  options: {
    limit?: number;
  } = {},
): Promise<RepositoryListResult<ChatMessageRow>> {
  try {
    const supabase = await createSupabaseServerClient();
    const limit = clampLimit(options.limit);

    const { data, error } = await supabase
      .from("chat_messages")
      .select("*")
      .eq("user_id", userId)
      .eq("session_id", sessionId)
      .order("created_at", { ascending: true })
      .limit(limit);

    if (error) {
      return { data: null, error: error.message };
    }

    return { data: data ?? [], error: null };
  } catch (error) {
    return { data: null, error: toErrorMessage(error) };
  }
}

export async function listGoals(
  userId: string,
  options: {
    status?: GoalRow["status"];
    domain?: string;
    limit?: number;
  } = {},
): Promise<RepositoryListResult<GoalRow>> {
  try {
    const supabase = await createSupabaseServerClient();
    const limit = clampLimit(options.limit);

    let query = supabase
      .from("goals")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(limit);

    if (options.status) {
      query = query.eq("status", options.status);
    }

    if (options.domain) {
      query = query.eq("domain", options.domain);
    }

    const { data, error } = await query;

    if (error) {
      return { data: null, error: error.message };
    }

    return { data: data ?? [], error: null };
  } catch (error) {
    return { data: null, error: toErrorMessage(error) };
  }
}

export async function listGoalMilestones(
  userId: string,
  goalId: string,
): Promise<RepositoryListResult<GoalMilestoneRow>> {
  try {
    const supabase = await createSupabaseServerClient();

    const { data, error } = await supabase
      .from("goal_milestones")
      .select("*")
      .eq("user_id", userId)
      .eq("goal_id", goalId)
      .order("sort_order", { ascending: true });

    if (error) {
      return { data: null, error: error.message };
    }

    return { data: data ?? [], error: null };
  } catch (error) {
    return { data: null, error: toErrorMessage(error) };
  }
}

export async function listDailyLogs(
  userId: string,
  options: {
    limit?: number;
  } = {},
): Promise<RepositoryListResult<DailyLogRow>> {
  try {
    const supabase = await createSupabaseServerClient();
    const limit = clampLimit(options.limit);

    const { data, error } = await supabase
      .from("daily_logs")
      .select("*")
      .eq("user_id", userId)
      .order("log_date", { ascending: false })
      .limit(limit);

    if (error) {
      return { data: null, error: error.message };
    }

    return { data: data ?? [], error: null };
  } catch (error) {
    return { data: null, error: toErrorMessage(error) };
  }
}

export async function listProofItems(
  userId: string,
  options: {
    domain?: string;
    status?: ProofItemRow["status"];
    limit?: number;
  } = {},
): Promise<RepositoryListResult<ProofItemRow>> {
  try {
    const supabase = await createSupabaseServerClient();
    const limit = clampLimit(options.limit);

    let query = supabase
      .from("proof_items")
      .select("*")
      .eq("user_id", userId)
      .order("occurred_at", { ascending: false })
      .limit(limit);

    if (options.domain) {
      query = query.eq("domain", options.domain);
    }

    if (options.status) {
      query = query.eq("status", options.status);
    }

    const { data, error } = await query;

    if (error) {
      return { data: null, error: error.message };
    }

    return { data: data ?? [], error: null };
  } catch (error) {
    return { data: null, error: toErrorMessage(error) };
  }
}

export async function listTasks(
  userId: string,
  options: {
    status?: TaskRow["status"];
    domain?: string;
    limit?: number;
  } = {},
): Promise<RepositoryListResult<TaskRow>> {
  try {
    const supabase = await createSupabaseServerClient();
    const limit = clampLimit(options.limit);

    let query = supabase
      .from("tasks")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(limit);

    if (options.status) {
      query = query.eq("status", options.status);
    }

    if (options.domain) {
      query = query.eq("domain", options.domain);
    }

    const { data, error } = await query;

    if (error) {
      return { data: null, error: error.message };
    }

    return { data: data ?? [], error: null };
  } catch (error) {
    return { data: null, error: toErrorMessage(error) };
  }
}

export async function listEvents(
  userId: string,
  options: {
    status?: EventRow["status"];
    domain?: string;
    limit?: number;
  } = {},
): Promise<RepositoryListResult<EventRow>> {
  try {
    const supabase = await createSupabaseServerClient();
    const limit = clampLimit(options.limit);

    let query = supabase
      .from("events")
      .select("*")
      .eq("user_id", userId)
      .order("occurred_at", { ascending: false })
      .limit(limit);

    if (options.status) {
      query = query.eq("status", options.status);
    }

    if (options.domain) {
      query = query.eq("domain", options.domain);
    }

    const { data, error } = await query;

    if (error) {
      return { data: null, error: error.message };
    }

    return { data: data ?? [], error: null };
  } catch (error) {
    return { data: null, error: toErrorMessage(error) };
  }
}

export async function listJobApplications(
  userId: string,
  options: {
    status?: JobApplicationRow["status"];
    priority?: JobApplicationRow["priority"];
    company?: string;
    limit?: number;
  } = {},
): Promise<RepositoryListResult<JobApplicationRow>> {
  try {
    const supabase = await createSupabaseServerClient();
    const limit = clampLimit(options.limit);

    let query = supabase
      .from("job_applications")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(limit);

    if (options.status) {
      query = query.eq("status", options.status);
    }

    if (options.priority) {
      query = query.eq("priority", options.priority);
    }

    if (options.company) {
      query = query.eq("company", options.company);
    }

    const { data, error } = await query;

    if (error) {
      return { data: null, error: error.message };
    }

    return { data: data ?? [], error: null };
  } catch (error) {
    return { data: null, error: toErrorMessage(error) };
  }
}

export async function listJobApplicationEvents(
  userId: string,
  options: {
    jobApplicationId?: string;
    eventType?: JobApplicationEventRow["event_type"];
    limit?: number;
  } = {},
): Promise<RepositoryListResult<JobApplicationEventRow>> {
  try {
    const supabase = await createSupabaseServerClient();
    const limit = clampLimit(options.limit);

    let query = supabase
      .from("job_application_events")
      .select("*")
      .eq("user_id", userId)
      .order("occurred_at", { ascending: false })
      .limit(limit);

    if (options.jobApplicationId) {
      query = query.eq("job_application_id", options.jobApplicationId);
    }

    if (options.eventType) {
      query = query.eq("event_type", options.eventType);
    }

    const { data, error } = await query;

    if (error) {
      return { data: null, error: error.message };
    }

    return { data: data ?? [], error: null };
  } catch (error) {
    return { data: null, error: toErrorMessage(error) };
  }
}

export async function listNetworkingContacts(
  userId: string,
  options: {
    status?: NetworkingContactRow["status"];
    company?: string;
    limit?: number;
  } = {},
): Promise<RepositoryListResult<NetworkingContactRow>> {
  try {
    const supabase = await createSupabaseServerClient();
    const limit = clampLimit(options.limit);

    let query = supabase
      .from("networking_contacts")
      .select("*")
      .eq("user_id", userId)
      .order("updated_at", { ascending: false })
      .limit(limit);

    if (options.status) {
      query = query.eq("status", options.status);
    }

    if (options.company) {
      query = query.eq("company", options.company);
    }

    const { data, error } = await query;

    if (error) {
      return { data: null, error: error.message };
    }

    return { data: data ?? [], error: null };
  } catch (error) {
    return { data: null, error: toErrorMessage(error) };
  }
}

export async function listNetworkingInteractions(
  userId: string,
  options: {
    networkingContactId?: string;
    jobApplicationId?: string;
    limit?: number;
  } = {},
): Promise<RepositoryListResult<NetworkingInteractionRow>> {
  try {
    const supabase = await createSupabaseServerClient();
    const limit = clampLimit(options.limit);

    let query = supabase
      .from("networking_interactions")
      .select("*")
      .eq("user_id", userId)
      .order("occurred_at", { ascending: false })
      .limit(limit);

    if (options.networkingContactId) {
      query = query.eq("networking_contact_id", options.networkingContactId);
    }

    if (options.jobApplicationId) {
      query = query.eq("job_application_id", options.jobApplicationId);
    }

    const { data, error } = await query;

    if (error) {
      return { data: null, error: error.message };
    }

    return { data: data ?? [], error: null };
  } catch (error) {
    return { data: null, error: toErrorMessage(error) };
  }
}

export async function listJobReferrals(
  userId: string,
  options: {
    status?: JobReferralRow["status"];
    networkingContactId?: string;
    jobApplicationId?: string;
    limit?: number;
  } = {},
): Promise<RepositoryListResult<JobReferralRow>> {
  try {
    const supabase = await createSupabaseServerClient();
    const limit = clampLimit(options.limit);

    let query = supabase
      .from("job_referrals")
      .select("*")
      .eq("user_id", userId)
      .order("updated_at", { ascending: false })
      .limit(limit);

    if (options.status) {
      query = query.eq("status", options.status);
    }

    if (options.networkingContactId) {
      query = query.eq("networking_contact_id", options.networkingContactId);
    }

    if (options.jobApplicationId) {
      query = query.eq("job_application_id", options.jobApplicationId);
    }

    const { data, error } = await query;

    if (error) {
      return { data: null, error: error.message };
    }

    return { data: data ?? [], error: null };
  } catch (error) {
    return { data: null, error: toErrorMessage(error) };
  }
}

export async function listResumeVersions(
  userId: string,
  options: {
    status?: ResumeVersionRow["status"];
    targetRole?: string;
    targetCompany?: string;
    limit?: number;
  } = {},
): Promise<RepositoryListResult<ResumeVersionRow>> {
  try {
    const supabase = await createSupabaseServerClient();
    const limit = clampLimit(options.limit);

    let query = supabase
      .from("resume_versions")
      .select("*")
      .eq("user_id", userId)
      .order("updated_at", { ascending: false })
      .limit(limit);

    if (options.status) {
      query = query.eq("status", options.status);
    }

    if (options.targetRole) {
      query = query.eq("target_role", options.targetRole);
    }

    if (options.targetCompany) {
      query = query.eq("target_company", options.targetCompany);
    }

    const { data, error } = await query;

    if (error) {
      return { data: null, error: error.message };
    }

    return { data: data ?? [], error: null };
  } catch (error) {
    return { data: null, error: toErrorMessage(error) };
  }
}

export async function listResumeBullets(
  userId: string,
  options: {
    resumeVersionId?: string;
    section?: ResumeBulletRow["section"];
    limit?: number;
  } = {},
): Promise<RepositoryListResult<ResumeBulletRow>> {
  try {
    const supabase = await createSupabaseServerClient();
    const limit = clampLimit(options.limit);

    let query = supabase
      .from("resume_bullets")
      .select("*")
      .eq("user_id", userId)
      .order("updated_at", { ascending: false })
      .limit(limit);

    if (options.resumeVersionId) {
      query = query.eq("resume_version_id", options.resumeVersionId);
    }

    if (options.section) {
      query = query.eq("section", options.section);
    }

    const { data, error } = await query;

    if (error) {
      return { data: null, error: error.message };
    }

    return { data: data ?? [], error: null };
  } catch (error) {
    return { data: null, error: toErrorMessage(error) };
  }
}

export async function listInterviews(
  userId: string,
  options: {
    status?: InterviewRow["status"];
    jobApplicationId?: string;
    outcome?: InterviewRow["outcome"];
    limit?: number;
  } = {},
): Promise<RepositoryListResult<InterviewRow>> {
  try {
    const supabase = await createSupabaseServerClient();
    const limit = clampLimit(options.limit);

    let query = supabase
      .from("interviews")
      .select("*")
      .eq("user_id", userId)
      .order("scheduled_at", { ascending: false, nullsFirst: false })
      .limit(limit);

    if (options.status) {
      query = query.eq("status", options.status);
    }

    if (options.jobApplicationId) {
      query = query.eq("job_application_id", options.jobApplicationId);
    }

    if (options.outcome) {
      query = query.eq("outcome", options.outcome);
    }

    const { data, error } = await query;

    if (error) {
      return { data: null, error: error.message };
    }

    return { data: data ?? [], error: null };
  } catch (error) {
    return { data: null, error: toErrorMessage(error) };
  }
}


export async function listSkillPaths(
  userId: string,
  options: {
    status?: SkillPathRow["status"];
    priority?: SkillPathRow["priority"];
    domain?: string;
    limit?: number;
  } = {},
): Promise<RepositoryListResult<SkillPathRow>> {
  try {
    const supabase = await createSupabaseServerClient();
    const limit = clampLimit(options.limit);

    let query = supabase
      .from("skill_paths")
      .select("*")
      .eq("user_id", userId)
      .order("updated_at", { ascending: false })
      .limit(limit);

    if (options.status) {
      query = query.eq("status", options.status);
    }

    if (options.priority) {
      query = query.eq("priority", options.priority);
    }

    if (options.domain) {
      query = query.eq("domain", options.domain);
    }

    const { data, error } = await query;

    if (error) {
      return { data: null, error: error.message };
    }

    return { data: data ?? [], error: null };
  } catch (error) {
    return { data: null, error: toErrorMessage(error) };
  }
}

export async function listSkills(
  userId: string,
  options: {
    skillPathId?: string;
    status?: SkillRow["status"];
    category?: string;
    priority?: SkillRow["priority"];
    limit?: number;
  } = {},
): Promise<RepositoryListResult<SkillRow>> {
  try {
    const supabase = await createSupabaseServerClient();
    const limit = clampLimit(options.limit);

    let query = supabase
      .from("skills")
      .select("*")
      .eq("user_id", userId)
      .order("updated_at", { ascending: false })
      .limit(limit);

    if (options.skillPathId) {
      query = query.eq("skill_path_id", options.skillPathId);
    }

    if (options.status) {
      query = query.eq("status", options.status);
    }

    if (options.category) {
      query = query.eq("category", options.category);
    }

    if (options.priority) {
      query = query.eq("priority", options.priority);
    }

    const { data, error } = await query;

    if (error) {
      return { data: null, error: error.message };
    }

    return { data: data ?? [], error: null };
  } catch (error) {
    return { data: null, error: toErrorMessage(error) };
  }
}

export async function listSkillPrerequisites(
  userId: string,
  options: {
    skillId?: string;
    prerequisiteSkillId?: string;
    relationshipType?: SkillPrerequisiteRow["relationship_type"];
    limit?: number;
  } = {},
): Promise<RepositoryListResult<SkillPrerequisiteRow>> {
  try {
    const supabase = await createSupabaseServerClient();
    const limit = clampLimit(options.limit);

    let query = supabase
      .from("skill_prerequisites")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(limit);

    if (options.skillId) {
      query = query.eq("skill_id", options.skillId);
    }

    if (options.prerequisiteSkillId) {
      query = query.eq("prerequisite_skill_id", options.prerequisiteSkillId);
    }

    if (options.relationshipType) {
      query = query.eq("relationship_type", options.relationshipType);
    }

    const { data, error } = await query;

    if (error) {
      return { data: null, error: error.message };
    }

    return { data: data ?? [], error: null };
  } catch (error) {
    return { data: null, error: toErrorMessage(error) };
  }
}

export async function listLearningSessions(
  userId: string,
  options: {
    skillPathId?: string;
    skillId?: string;
    status?: LearningSessionRow["status"];
    sessionType?: LearningSessionRow["session_type"];
    limit?: number;
  } = {},
): Promise<RepositoryListResult<LearningSessionRow>> {
  try {
    const supabase = await createSupabaseServerClient();
    const limit = clampLimit(options.limit);

    let query = supabase
      .from("learning_sessions")
      .select("*")
      .eq("user_id", userId)
      .order("started_at", { ascending: false, nullsFirst: false })
      .limit(limit);

    if (options.skillPathId) {
      query = query.eq("skill_path_id", options.skillPathId);
    }

    if (options.skillId) {
      query = query.eq("skill_id", options.skillId);
    }

    if (options.status) {
      query = query.eq("status", options.status);
    }

    if (options.sessionType) {
      query = query.eq("session_type", options.sessionType);
    }

    const { data, error } = await query;

    if (error) {
      return { data: null, error: error.message };
    }

    return { data: data ?? [], error: null };
  } catch (error) {
    return { data: null, error: toErrorMessage(error) };
  }
}

export async function listQuizzes(
  userId: string,
  options: {
    skillPathId?: string;
    skillId?: string;
    status?: QuizRow["status"];
    quizType?: QuizRow["quiz_type"];
    difficulty?: QuizRow["difficulty"];
    limit?: number;
  } = {},
): Promise<RepositoryListResult<QuizRow>> {
  try {
    const supabase = await createSupabaseServerClient();
    const limit = clampLimit(options.limit);

    let query = supabase
      .from("quizzes")
      .select("*")
      .eq("user_id", userId)
      .order("updated_at", { ascending: false })
      .limit(limit);

    if (options.skillPathId) {
      query = query.eq("skill_path_id", options.skillPathId);
    }

    if (options.skillId) {
      query = query.eq("skill_id", options.skillId);
    }

    if (options.status) {
      query = query.eq("status", options.status);
    }

    if (options.quizType) {
      query = query.eq("quiz_type", options.quizType);
    }

    if (options.difficulty) {
      query = query.eq("difficulty", options.difficulty);
    }

    const { data, error } = await query;

    if (error) {
      return { data: null, error: error.message };
    }

    return { data: data ?? [], error: null };
  } catch (error) {
    return { data: null, error: toErrorMessage(error) };
  }
}

export async function listQuizAttempts(
  userId: string,
  options: {
    quizId?: string;
    skillId?: string;
    learningSessionId?: string;
    status?: QuizAttemptRow["status"];
    limit?: number;
  } = {},
): Promise<RepositoryListResult<QuizAttemptRow>> {
  try {
    const supabase = await createSupabaseServerClient();
    const limit = clampLimit(options.limit);

    let query = supabase
      .from("quiz_attempts")
      .select("*")
      .eq("user_id", userId)
      .order("attempted_at", { ascending: false })
      .limit(limit);

    if (options.quizId) {
      query = query.eq("quiz_id", options.quizId);
    }

    if (options.skillId) {
      query = query.eq("skill_id", options.skillId);
    }

    if (options.learningSessionId) {
      query = query.eq("learning_session_id", options.learningSessionId);
    }

    if (options.status) {
      query = query.eq("status", options.status);
    }

    const { data, error } = await query;

    if (error) {
      return { data: null, error: error.message };
    }

    return { data: data ?? [], error: null };
  } catch (error) {
    return { data: null, error: toErrorMessage(error) };
  }
}

export async function listProjects(
  userId: string,
  options: {
    status?: ProjectRow["status"];
    priority?: ProjectRow["priority"];
    projectType?: ProjectRow["project_type"];
    goalId?: string;
    limit?: number;
  } = {},
): Promise<RepositoryListResult<ProjectRow>> {
  try {
    const supabase = await createSupabaseServerClient();
    const limit = clampLimit(options.limit);

    let query = supabase
      .from("projects")
      .select("*")
      .eq("user_id", userId)
      .order("updated_at", { ascending: false })
      .limit(limit);

    if (options.status) {
      query = query.eq("status", options.status);
    }

    if (options.priority) {
      query = query.eq("priority", options.priority);
    }

    if (options.projectType) {
      query = query.eq("project_type", options.projectType);
    }

    if (options.goalId) {
      query = query.eq("goal_id", options.goalId);
    }

    const { data, error } = await query;

    if (error) {
      return { data: null, error: error.message };
    }

    return { data: data ?? [], error: null };
  } catch (error) {
    return { data: null, error: toErrorMessage(error) };
  }
}

export async function listProjectMilestones(
  userId: string,
  options: {
    projectId?: string;
    status?: ProjectMilestoneRow["status"];
    priority?: ProjectMilestoneRow["priority"];
    limit?: number;
  } = {},
): Promise<RepositoryListResult<ProjectMilestoneRow>> {
  try {
    const supabase = await createSupabaseServerClient();
    const limit = clampLimit(options.limit);

    let query = supabase
      .from("project_milestones")
      .select("*")
      .eq("user_id", userId)
      .order("due_date", { ascending: true, nullsFirst: false })
      .limit(limit);

    if (options.projectId) {
      query = query.eq("project_id", options.projectId);
    }

    if (options.status) {
      query = query.eq("status", options.status);
    }

    if (options.priority) {
      query = query.eq("priority", options.priority);
    }

    const { data, error } = await query;

    if (error) {
      return { data: null, error: error.message };
    }

    return { data: data ?? [], error: null };
  } catch (error) {
    return { data: null, error: toErrorMessage(error) };
  }
}

export async function listProjectBugs(
  userId: string,
  options: {
    projectId?: string;
    status?: ProjectBugRow["status"];
    severity?: ProjectBugRow["severity"];
    limit?: number;
  } = {},
): Promise<RepositoryListResult<ProjectBugRow>> {
  try {
    const supabase = await createSupabaseServerClient();
    const limit = clampLimit(options.limit);

    let query = supabase
      .from("project_bugs")
      .select("*")
      .eq("user_id", userId)
      .order("opened_at", { ascending: false })
      .limit(limit);

    if (options.projectId) {
      query = query.eq("project_id", options.projectId);
    }

    if (options.status) {
      query = query.eq("status", options.status);
    }

    if (options.severity) {
      query = query.eq("severity", options.severity);
    }

    const { data, error } = await query;

    if (error) {
      return { data: null, error: error.message };
    }

    return { data: data ?? [], error: null };
  } catch (error) {
    return { data: null, error: toErrorMessage(error) };
  }
}

export async function listProjectTests(
  userId: string,
  options: {
    projectId?: string;
    status?: ProjectTestRow["status"];
    testType?: ProjectTestRow["test_type"];
    limit?: number;
  } = {},
): Promise<RepositoryListResult<ProjectTestRow>> {
  try {
    const supabase = await createSupabaseServerClient();
    const limit = clampLimit(options.limit);

    let query = supabase
      .from("project_tests")
      .select("*")
      .eq("user_id", userId)
      .order("run_at", { ascending: false, nullsFirst: false })
      .limit(limit);

    if (options.projectId) {
      query = query.eq("project_id", options.projectId);
    }

    if (options.status) {
      query = query.eq("status", options.status);
    }

    if (options.testType) {
      query = query.eq("test_type", options.testType);
    }

    const { data, error } = await query;

    if (error) {
      return { data: null, error: error.message };
    }

    return { data: data ?? [], error: null };
  } catch (error) {
    return { data: null, error: toErrorMessage(error) };
  }
}

export async function listProjectReleases(
  userId: string,
  options: {
    projectId?: string;
    status?: ProjectReleaseRow["status"];
    limit?: number;
  } = {},
): Promise<RepositoryListResult<ProjectReleaseRow>> {
  try {
    const supabase = await createSupabaseServerClient();
    const limit = clampLimit(options.limit);

    let query = supabase
      .from("project_releases")
      .select("*")
      .eq("user_id", userId)
      .order("released_at", { ascending: false, nullsFirst: false })
      .limit(limit);

    if (options.projectId) {
      query = query.eq("project_id", options.projectId);
    }

    if (options.status) {
      query = query.eq("status", options.status);
    }

    const { data, error } = await query;

    if (error) {
      return { data: null, error: error.message };
    }

    return { data: data ?? [], error: null };
  } catch (error) {
    return { data: null, error: toErrorMessage(error) };
  }
}

export async function listProjectLinks(
  userId: string,
  options: {
    projectId?: string;
    linkType?: ProjectLinkRow["link_type"];
    limit?: number;
  } = {},
): Promise<RepositoryListResult<ProjectLinkRow>> {
  try {
    const supabase = await createSupabaseServerClient();
    const limit = clampLimit(options.limit);

    let query = supabase
      .from("project_links")
      .select("*")
      .eq("user_id", userId)
      .order("updated_at", { ascending: false })
      .limit(limit);

    if (options.projectId) {
      query = query.eq("project_id", options.projectId);
    }

    if (options.linkType) {
      query = query.eq("link_type", options.linkType);
    }

    const { data, error } = await query;

    if (error) {
      return { data: null, error: error.message };
    }

    return { data: data ?? [], error: null };
  } catch (error) {
    return { data: null, error: toErrorMessage(error) };
  }
}

export async function listSkillProgress(
  userId: string,
  options: {
    skillId?: string;
    projectId?: string;
    learningSessionId?: string;
    quizAttemptId?: string;
    status?: SkillProgressRow["status"];
    limit?: number;
  } = {},
): Promise<RepositoryListResult<SkillProgressRow>> {
  try {
    const supabase = await createSupabaseServerClient();
    const limit = clampLimit(options.limit);

    let query = supabase
      .from("skill_progress")
      .select("*")
      .eq("user_id", userId)
      .order("recorded_at", { ascending: false })
      .limit(limit);

    if (options.skillId) {
      query = query.eq("skill_id", options.skillId);
    }

    if (options.projectId) {
      query = query.eq("project_id", options.projectId);
    }

    if (options.learningSessionId) {
      query = query.eq("learning_session_id", options.learningSessionId);
    }

    if (options.quizAttemptId) {
      query = query.eq("quiz_attempt_id", options.quizAttemptId);
    }

    if (options.status) {
      query = query.eq("status", options.status);
    }

    const { data, error } = await query;

    if (error) {
      return { data: null, error: error.message };
    }

    return { data: data ?? [], error: null };
  } catch (error) {
    return { data: null, error: toErrorMessage(error) };
  }
}

import { createSupabaseServerClient } from "@/lib/supabase/server";
import type {
  ResearchIdeaRow,
  ResearchQuestionRow,
  ResearchLiteratureItemRow,
  ResearchCitationRow,
  ResearchClaimRow,
  ResearchExperimentRow,
  ResearchResultRow,
  ResearchPaperRow,
  ResearchPaperVersionRow,
  ResearchVenueRow,
  ResearchSubmissionRow,
  ResearchFeedbackRow,
  TargetUniversityRow,
  TargetLabRow,
  TargetProfessorRow,
  PhdReadinessAssessmentRow,
  PhdApplicationAssetRow,
  SopVersionRow,
  RecommendationTargetRow,
} from "@/types/database";

import type { RepositoryListResult } from "./core-read";

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

  return "Unknown research repository error";
}

export async function listResearchIdeas(
  userId: string,
  options: {
    status?: string;
    projectId?: string;
    goalId?: string;
    limit?: number;
  } = {},
): Promise<RepositoryListResult<ResearchIdeaRow>> {
  try {
    const supabase = await createSupabaseServerClient();
    const limit = clampLimit(options.limit);

    let query = supabase
      .from("research_ideas")
      .select("*")
      .eq("user_id", userId)
      .order("updated_at", { ascending: false })
      .limit(limit);

    if (options.status) {
      query = query.eq("status", options.status as never);
    }
    if (options.projectId) {
      query = query.eq("project_id", options.projectId as never);
    }
    if (options.goalId) {
      query = query.eq("goal_id", options.goalId as never);
    }

    const { data, error } = await query;

    if (error) {
      return { data: null, error: error.message };
    }

    return { data: (data ?? []) as ResearchIdeaRow[], error: null };
  } catch (error) {
    return { data: null, error: toErrorMessage(error) };
  }
}

export async function listResearchQuestions(
  userId: string,
  options: {
    researchIdeaId?: string;
    status?: string;
    limit?: number;
  } = {},
): Promise<RepositoryListResult<ResearchQuestionRow>> {
  try {
    const supabase = await createSupabaseServerClient();
    const limit = clampLimit(options.limit);

    let query = supabase
      .from("research_questions")
      .select("*")
      .eq("user_id", userId)
      .order("updated_at", { ascending: false })
      .limit(limit);

    if (options.researchIdeaId) {
      query = query.eq("research_idea_id", options.researchIdeaId as never);
    }
    if (options.status) {
      query = query.eq("status", options.status as never);
    }

    const { data, error } = await query;

    if (error) {
      return { data: null, error: error.message };
    }

    return { data: (data ?? []) as ResearchQuestionRow[], error: null };
  } catch (error) {
    return { data: null, error: toErrorMessage(error) };
  }
}

export async function listResearchLiteratureItems(
  userId: string,
  options: {
    relatedResearchIdeaId?: string;
    relatedProjectId?: string;
    readingStatus?: string;
    itemType?: string;
    limit?: number;
  } = {},
): Promise<RepositoryListResult<ResearchLiteratureItemRow>> {
  try {
    const supabase = await createSupabaseServerClient();
    const limit = clampLimit(options.limit);

    let query = supabase
      .from("research_literature_items")
      .select("*")
      .eq("user_id", userId)
      .order("updated_at", { ascending: false })
      .limit(limit);

    if (options.relatedResearchIdeaId) {
      query = query.eq("related_research_idea_id", options.relatedResearchIdeaId as never);
    }
    if (options.relatedProjectId) {
      query = query.eq("related_project_id", options.relatedProjectId as never);
    }
    if (options.readingStatus) {
      query = query.eq("reading_status", options.readingStatus as never);
    }
    if (options.itemType) {
      query = query.eq("item_type", options.itemType as never);
    }

    const { data, error } = await query;

    if (error) {
      return { data: null, error: error.message };
    }

    return { data: (data ?? []) as ResearchLiteratureItemRow[], error: null };
  } catch (error) {
    return { data: null, error: toErrorMessage(error) };
  }
}

export async function listResearchCitations(
  userId: string,
  options: {
    literatureItemId?: string;
    researchIdeaId?: string;
    researchClaimId?: string;
    researchPaperId?: string;
    paperVersionId?: string;
    limit?: number;
  } = {},
): Promise<RepositoryListResult<ResearchCitationRow>> {
  try {
    const supabase = await createSupabaseServerClient();
    const limit = clampLimit(options.limit);

    let query = supabase
      .from("research_citations")
      .select("*")
      .eq("user_id", userId)
      .order("updated_at", { ascending: false })
      .limit(limit);

    if (options.literatureItemId) {
      query = query.eq("literature_item_id", options.literatureItemId as never);
    }
    if (options.researchIdeaId) {
      query = query.eq("research_idea_id", options.researchIdeaId as never);
    }
    if (options.researchClaimId) {
      query = query.eq("research_claim_id", options.researchClaimId as never);
    }
    if (options.researchPaperId) {
      query = query.eq("research_paper_id", options.researchPaperId as never);
    }
    if (options.paperVersionId) {
      query = query.eq("paper_version_id", options.paperVersionId as never);
    }

    const { data, error } = await query;

    if (error) {
      return { data: null, error: error.message };
    }

    return { data: (data ?? []) as ResearchCitationRow[], error: null };
  } catch (error) {
    return { data: null, error: toErrorMessage(error) };
  }
}

export async function listResearchClaims(
  userId: string,
  options: {
    researchIdeaId?: string;
    researchPaperId?: string;
    paperVersionId?: string;
    supportStatus?: string;
    limit?: number;
  } = {},
): Promise<RepositoryListResult<ResearchClaimRow>> {
  try {
    const supabase = await createSupabaseServerClient();
    const limit = clampLimit(options.limit);

    let query = supabase
      .from("research_claims")
      .select("*")
      .eq("user_id", userId)
      .order("updated_at", { ascending: false })
      .limit(limit);

    if (options.researchIdeaId) {
      query = query.eq("research_idea_id", options.researchIdeaId as never);
    }
    if (options.researchPaperId) {
      query = query.eq("research_paper_id", options.researchPaperId as never);
    }
    if (options.paperVersionId) {
      query = query.eq("paper_version_id", options.paperVersionId as never);
    }
    if (options.supportStatus) {
      query = query.eq("support_status", options.supportStatus as never);
    }

    const { data, error } = await query;

    if (error) {
      return { data: null, error: error.message };
    }

    return { data: (data ?? []) as ResearchClaimRow[], error: null };
  } catch (error) {
    return { data: null, error: toErrorMessage(error) };
  }
}

export async function listResearchExperiments(
  userId: string,
  options: {
    researchIdeaId?: string;
    researchQuestionId?: string;
    projectId?: string;
    status?: string;
    limit?: number;
  } = {},
): Promise<RepositoryListResult<ResearchExperimentRow>> {
  try {
    const supabase = await createSupabaseServerClient();
    const limit = clampLimit(options.limit);

    let query = supabase
      .from("research_experiments")
      .select("*")
      .eq("user_id", userId)
      .order("updated_at", { ascending: false })
      .limit(limit);

    if (options.researchIdeaId) {
      query = query.eq("research_idea_id", options.researchIdeaId as never);
    }
    if (options.researchQuestionId) {
      query = query.eq("research_question_id", options.researchQuestionId as never);
    }
    if (options.projectId) {
      query = query.eq("project_id", options.projectId as never);
    }
    if (options.status) {
      query = query.eq("status", options.status as never);
    }

    const { data, error } = await query;

    if (error) {
      return { data: null, error: error.message };
    }

    return { data: (data ?? []) as ResearchExperimentRow[], error: null };
  } catch (error) {
    return { data: null, error: toErrorMessage(error) };
  }
}

export async function listResearchResults(
  userId: string,
  options: {
    researchExperimentId?: string;
    researchIdeaId?: string;
    projectId?: string;
    paperVersionId?: string;
    limit?: number;
  } = {},
): Promise<RepositoryListResult<ResearchResultRow>> {
  try {
    const supabase = await createSupabaseServerClient();
    const limit = clampLimit(options.limit);

    let query = supabase
      .from("research_results")
      .select("*")
      .eq("user_id", userId)
      .order("updated_at", { ascending: false })
      .limit(limit);

    if (options.researchExperimentId) {
      query = query.eq("research_experiment_id", options.researchExperimentId as never);
    }
    if (options.researchIdeaId) {
      query = query.eq("research_idea_id", options.researchIdeaId as never);
    }
    if (options.projectId) {
      query = query.eq("project_id", options.projectId as never);
    }
    if (options.paperVersionId) {
      query = query.eq("paper_version_id", options.paperVersionId as never);
    }

    const { data, error } = await query;

    if (error) {
      return { data: null, error: error.message };
    }

    return { data: (data ?? []) as ResearchResultRow[], error: null };
  } catch (error) {
    return { data: null, error: toErrorMessage(error) };
  }
}

export async function listResearchPapers(
  userId: string,
  options: {
    status?: string;
    primaryResearchIdeaId?: string;
    projectId?: string;
    targetVenueId?: string;
    limit?: number;
  } = {},
): Promise<RepositoryListResult<ResearchPaperRow>> {
  try {
    const supabase = await createSupabaseServerClient();
    const limit = clampLimit(options.limit);

    let query = supabase
      .from("research_papers")
      .select("*")
      .eq("user_id", userId)
      .order("updated_at", { ascending: false })
      .limit(limit);

    if (options.status) {
      query = query.eq("status", options.status as never);
    }
    if (options.primaryResearchIdeaId) {
      query = query.eq("primary_research_idea_id", options.primaryResearchIdeaId as never);
    }
    if (options.projectId) {
      query = query.eq("project_id", options.projectId as never);
    }
    if (options.targetVenueId) {
      query = query.eq("target_venue_id", options.targetVenueId as never);
    }

    const { data, error } = await query;

    if (error) {
      return { data: null, error: error.message };
    }

    return { data: (data ?? []) as ResearchPaperRow[], error: null };
  } catch (error) {
    return { data: null, error: toErrorMessage(error) };
  }
}

export async function listResearchPaperVersions(
  userId: string,
  options: {
    researchPaperId?: string;
    status?: string;
    limit?: number;
  } = {},
): Promise<RepositoryListResult<ResearchPaperVersionRow>> {
  try {
    const supabase = await createSupabaseServerClient();
    const limit = clampLimit(options.limit);

    let query = supabase
      .from("research_paper_versions")
      .select("*")
      .eq("user_id", userId)
      .order("updated_at", { ascending: false })
      .limit(limit);

    if (options.researchPaperId) {
      query = query.eq("research_paper_id", options.researchPaperId as never);
    }
    if (options.status) {
      query = query.eq("status", options.status as never);
    }

    const { data, error } = await query;

    if (error) {
      return { data: null, error: error.message };
    }

    return { data: (data ?? []) as ResearchPaperVersionRow[], error: null };
  } catch (error) {
    return { data: null, error: toErrorMessage(error) };
  }
}

export async function listResearchVenues(
  userId: string,
  options: {
    venueType?: string;
    limit?: number;
  } = {},
): Promise<RepositoryListResult<ResearchVenueRow>> {
  try {
    const supabase = await createSupabaseServerClient();
    const limit = clampLimit(options.limit);

    let query = supabase
      .from("research_venues")
      .select("*")
      .eq("user_id", userId)
      .order("deadline", { ascending: true, nullsFirst: false })
      .limit(limit);

    if (options.venueType) {
      query = query.eq("venue_type", options.venueType as never);
    }

    const { data, error } = await query;

    if (error) {
      return { data: null, error: error.message };
    }

    return { data: (data ?? []) as ResearchVenueRow[], error: null };
  } catch (error) {
    return { data: null, error: toErrorMessage(error) };
  }
}

export async function listResearchSubmissions(
  userId: string,
  options: {
    researchPaperId?: string;
    status?: string;
    limit?: number;
  } = {},
): Promise<RepositoryListResult<ResearchSubmissionRow>> {
  try {
    const supabase = await createSupabaseServerClient();
    const limit = clampLimit(options.limit);

    let query = supabase
      .from("research_submissions")
      .select("*")
      .eq("user_id", userId)
      .order("updated_at", { ascending: false })
      .limit(limit);

    if (options.researchPaperId) {
      query = query.eq("research_paper_id", options.researchPaperId as never);
    }
    if (options.status) {
      query = query.eq("status", options.status as never);
    }

    const { data, error } = await query;

    if (error) {
      return { data: null, error: error.message };
    }

    return { data: (data ?? []) as ResearchSubmissionRow[], error: null };
  } catch (error) {
    return { data: null, error: toErrorMessage(error) };
  }
}

export async function listResearchFeedback(
  userId: string,
  options: {
    researchPaperId?: string;
    paperVersionId?: string;
    status?: string;
    limit?: number;
  } = {},
): Promise<RepositoryListResult<ResearchFeedbackRow>> {
  try {
    const supabase = await createSupabaseServerClient();
    const limit = clampLimit(options.limit);

    let query = supabase
      .from("research_feedback")
      .select("*")
      .eq("user_id", userId)
      .order("updated_at", { ascending: false })
      .limit(limit);

    if (options.researchPaperId) {
      query = query.eq("research_paper_id", options.researchPaperId as never);
    }
    if (options.paperVersionId) {
      query = query.eq("paper_version_id", options.paperVersionId as never);
    }
    if (options.status) {
      query = query.eq("status", options.status as never);
    }

    const { data, error } = await query;

    if (error) {
      return { data: null, error: error.message };
    }

    return { data: (data ?? []) as ResearchFeedbackRow[], error: null };
  } catch (error) {
    return { data: null, error: toErrorMessage(error) };
  }
}

export async function listTargetUniversities(
  userId: string,
  options: {
    targetLevel?: string;
    limit?: number;
  } = {},
): Promise<RepositoryListResult<TargetUniversityRow>> {
  try {
    const supabase = await createSupabaseServerClient();
    const limit = clampLimit(options.limit);

    let query = supabase
      .from("target_universities")
      .select("*")
      .eq("user_id", userId)
      .order("fit_score", { ascending: false, nullsFirst: false })
      .limit(limit);

    if (options.targetLevel) {
      query = query.eq("target_level", options.targetLevel as never);
    }

    const { data, error } = await query;

    if (error) {
      return { data: null, error: error.message };
    }

    return { data: (data ?? []) as TargetUniversityRow[], error: null };
  } catch (error) {
    return { data: null, error: toErrorMessage(error) };
  }
}

export async function listTargetLabs(
  userId: string,
  options: {
    targetUniversityId?: string;
    relatedResearchIdeaId?: string;
    relatedProjectId?: string;
    limit?: number;
  } = {},
): Promise<RepositoryListResult<TargetLabRow>> {
  try {
    const supabase = await createSupabaseServerClient();
    const limit = clampLimit(options.limit);

    let query = supabase
      .from("target_labs")
      .select("*")
      .eq("user_id", userId)
      .order("fit_score", { ascending: false, nullsFirst: false })
      .limit(limit);

    if (options.targetUniversityId) {
      query = query.eq("target_university_id", options.targetUniversityId as never);
    }
    if (options.relatedResearchIdeaId) {
      query = query.eq("related_research_idea_id", options.relatedResearchIdeaId as never);
    }
    if (options.relatedProjectId) {
      query = query.eq("related_project_id", options.relatedProjectId as never);
    }

    const { data, error } = await query;

    if (error) {
      return { data: null, error: error.message };
    }

    return { data: (data ?? []) as TargetLabRow[], error: null };
  } catch (error) {
    return { data: null, error: toErrorMessage(error) };
  }
}

export async function listTargetProfessors(
  userId: string,
  options: {
    targetUniversityId?: string;
    targetLabId?: string;
    outreachStatus?: string;
    limit?: number;
  } = {},
): Promise<RepositoryListResult<TargetProfessorRow>> {
  try {
    const supabase = await createSupabaseServerClient();
    const limit = clampLimit(options.limit);

    let query = supabase
      .from("target_professors")
      .select("*")
      .eq("user_id", userId)
      .order("fit_score", { ascending: false, nullsFirst: false })
      .limit(limit);

    if (options.targetUniversityId) {
      query = query.eq("target_university_id", options.targetUniversityId as never);
    }
    if (options.targetLabId) {
      query = query.eq("target_lab_id", options.targetLabId as never);
    }
    if (options.outreachStatus) {
      query = query.eq("outreach_status", options.outreachStatus as never);
    }

    const { data, error } = await query;

    if (error) {
      return { data: null, error: error.message };
    }

    return { data: (data ?? []) as TargetProfessorRow[], error: null };
  } catch (error) {
    return { data: null, error: toErrorMessage(error) };
  }
}

export async function listPhdReadinessAssessments(
  userId: string,
  options: {
    limit?: number;
  } = {},
): Promise<RepositoryListResult<PhdReadinessAssessmentRow>> {
  try {
    const supabase = await createSupabaseServerClient();
    const limit = clampLimit(options.limit);

    const query = supabase
      .from("phd_readiness_assessments")
      .select("*")
      .eq("user_id", userId)
      .order("assessment_date", { ascending: true })
      .limit(limit);


    const { data, error } = await query;

    if (error) {
      return { data: null, error: error.message };
    }

    return { data: (data ?? []) as PhdReadinessAssessmentRow[], error: null };
  } catch (error) {
    return { data: null, error: toErrorMessage(error) };
  }
}

export async function listPhdApplicationAssets(
  userId: string,
  options: {
    targetUniversityId?: string;
    assetType?: string;
    status?: string;
    limit?: number;
  } = {},
): Promise<RepositoryListResult<PhdApplicationAssetRow>> {
  try {
    const supabase = await createSupabaseServerClient();
    const limit = clampLimit(options.limit);

    let query = supabase
      .from("phd_application_assets")
      .select("*")
      .eq("user_id", userId)
      .order("due_date", { ascending: true, nullsFirst: false })
      .limit(limit);

    if (options.targetUniversityId) {
      query = query.eq("target_university_id", options.targetUniversityId as never);
    }
    if (options.assetType) {
      query = query.eq("asset_type", options.assetType as never);
    }
    if (options.status) {
      query = query.eq("status", options.status as never);
    }

    const { data, error } = await query;

    if (error) {
      return { data: null, error: error.message };
    }

    return { data: (data ?? []) as PhdApplicationAssetRow[], error: null };
  } catch (error) {
    return { data: null, error: toErrorMessage(error) };
  }
}

export async function listSopVersions(
  userId: string,
  options: {
    targetUniversityId?: string;
    status?: string;
    limit?: number;
  } = {},
): Promise<RepositoryListResult<SopVersionRow>> {
  try {
    const supabase = await createSupabaseServerClient();
    const limit = clampLimit(options.limit);

    let query = supabase
      .from("sop_versions")
      .select("*")
      .eq("user_id", userId)
      .order("updated_at", { ascending: false })
      .limit(limit);

    if (options.targetUniversityId) {
      query = query.eq("target_university_id", options.targetUniversityId as never);
    }
    if (options.status) {
      query = query.eq("status", options.status as never);
    }

    const { data, error } = await query;

    if (error) {
      return { data: null, error: error.message };
    }

    return { data: (data ?? []) as SopVersionRow[], error: null };
  } catch (error) {
    return { data: null, error: toErrorMessage(error) };
  }
}

export async function listRecommendationTargets(
  userId: string,
  options: {
    targetUniversityId?: string;
    requestStatus?: string;
    limit?: number;
  } = {},
): Promise<RepositoryListResult<RecommendationTargetRow>> {
  try {
    const supabase = await createSupabaseServerClient();
    const limit = clampLimit(options.limit);

    let query = supabase
      .from("recommendation_targets")
      .select("*")
      .eq("user_id", userId)
      .order("due_date", { ascending: true, nullsFirst: false })
      .limit(limit);

    if (options.targetUniversityId) {
      query = query.eq("target_university_id", options.targetUniversityId as never);
    }
    if (options.requestStatus) {
      query = query.eq("request_status", options.requestStatus as never);
    }

    const { data, error } = await query;

    if (error) {
      return { data: null, error: error.message };
    }

    return { data: (data ?? []) as RecommendationTargetRow[], error: null };
  } catch (error) {
    return { data: null, error: toErrorMessage(error) };
  }
}

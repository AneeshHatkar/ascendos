import {
  listPhdApplicationAssets,
  listPhdReadinessAssessments,
  listRecommendationTargets,
  listResearchCitations,
  listResearchClaims,
  listResearchExperiments,
  listResearchFeedback,
  listResearchIdeas,
  listResearchLiteratureItems,
  listResearchPapers,
  listResearchResults,
  listResearchSubmissions,
  listResearchVenues,
  listSopVersions,
  listTargetLabs,
  listTargetProfessors,
  listTargetUniversities,
} from "@/lib/repositories";

export interface ResearchLabDashboardSummary {
  research_idea_count: number;
  active_research_idea_count: number;
  literature_item_count: number;
  cited_literature_count: number;
  citation_count: number;
  claim_count: number;
  supported_claim_count: number;
  experiment_count: number;
  completed_experiment_count: number;
  result_count: number;
  paper_count: number;
  submission_ready_paper_count: number;
  venue_count: number;
  submission_count: number;
  feedback_count: number;
}

export interface StanfordDashboardSummary {
  target_university_count: number;
  dream_target_count: number;
  target_lab_count: number;
  target_professor_count: number;
  ready_to_contact_professor_count: number;
  readiness_assessment_count: number;
  application_asset_count: number;
  ready_application_asset_count: number;
  sop_version_count: number;
  ready_sop_version_count: number;
  recommendation_target_count: number;
  agreed_recommendation_count: number;
}

export interface ResearchStanfordDashboardDataResult {
  research: ResearchLabDashboardSummary;
  stanford: StanfordDashboardSummary;
  generated_at: string;
}

export async function getResearchStanfordDashboardDataSummary(
  userId: string,
): Promise<ResearchStanfordDashboardDataResult> {
  const [
    ideas,
    literatureItems,
    citations,
    claims,
    experiments,
    results,
    papers,
    venues,
    submissions,
    feedback,
    universities,
    labs,
    professors,
    readinessAssessments,
    applicationAssets,
    sopVersions,
    recommendationTargets,
  ] = await Promise.all([
    listResearchIdeas(userId, { limit: 100 }),
    listResearchLiteratureItems(userId, { limit: 100 }),
    listResearchCitations(userId, { limit: 100 }),
    listResearchClaims(userId, { limit: 100 }),
    listResearchExperiments(userId, { limit: 100 }),
    listResearchResults(userId, { limit: 100 }),
    listResearchPapers(userId, { limit: 100 }),
    listResearchVenues(userId, { limit: 100 }),
    listResearchSubmissions(userId, { limit: 100 }),
    listResearchFeedback(userId, { limit: 100 }),
    listTargetUniversities(userId, { limit: 100 }),
    listTargetLabs(userId, { limit: 100 }),
    listTargetProfessors(userId, { limit: 100 }),
    listPhdReadinessAssessments(userId, { limit: 100 }),
    listPhdApplicationAssets(userId, { limit: 100 }),
    listSopVersions(userId, { limit: 100 }),
    listRecommendationTargets(userId, { limit: 100 }),
  ]);

  const ideaRows = ideas.data ?? [];
  const literatureRows = literatureItems.data ?? [];
  const citationRows = citations.data ?? [];
  const claimRows = claims.data ?? [];
  const experimentRows = experiments.data ?? [];
  const resultRows = results.data ?? [];
  const paperRows = papers.data ?? [];
  const venueRows = venues.data ?? [];
  const submissionRows = submissions.data ?? [];
  const feedbackRows = feedback.data ?? [];
  const universityRows = universities.data ?? [];
  const labRows = labs.data ?? [];
  const professorRows = professors.data ?? [];
  const readinessRows = readinessAssessments.data ?? [];
  const applicationAssetRows = applicationAssets.data ?? [];
  const sopVersionRows = sopVersions.data ?? [];
  const recommendationRows = recommendationTargets.data ?? [];

  return {
    generated_at: new Date().toISOString(),
    research: {
      research_idea_count: ideaRows.length,
      active_research_idea_count: ideaRows.filter((item) =>
        ["exploring", "active"].includes(item.status),
      ).length,
      literature_item_count: literatureRows.length,
      cited_literature_count: literatureRows.filter((item) => item.reading_status === "cited").length,
      citation_count: citationRows.length,
      claim_count: claimRows.length,
      supported_claim_count: claimRows.filter((item) => item.support_status === "supported").length,
      experiment_count: experimentRows.length,
      completed_experiment_count: experimentRows.filter((item) => item.status === "completed").length,
      result_count: resultRows.length,
      paper_count: paperRows.length,
      submission_ready_paper_count: paperRows.filter((item) =>
        ["submission_ready", "submitted", "accepted"].includes(item.status),
      ).length,
      venue_count: venueRows.length,
      submission_count: submissionRows.length,
      feedback_count: feedbackRows.length,
    },
    stanford: {
      target_university_count: universityRows.length,
      dream_target_count: universityRows.filter((item) => item.target_level === "dream").length,
      target_lab_count: labRows.length,
      target_professor_count: professorRows.length,
      ready_to_contact_professor_count: professorRows.filter((item) =>
        ["ready_to_contact", "contacted", "replied", "follow_up_needed"].includes(item.outreach_status),
      ).length,
      readiness_assessment_count: readinessRows.length,
      application_asset_count: applicationAssetRows.length,
      ready_application_asset_count: applicationAssetRows.filter((item) =>
        ["ready", "submitted"].includes(item.status),
      ).length,
      sop_version_count: sopVersionRows.length,
      ready_sop_version_count: sopVersionRows.filter((item) =>
        ["ready", "submitted"].includes(item.status),
      ).length,
      recommendation_target_count: recommendationRows.length,
      agreed_recommendation_count: recommendationRows.filter((item) =>
        ["agreed", "submitted"].includes(item.request_status),
      ).length,
    },
  };
}

import {
  listBehavioralStories,
  listMockInterviews,
  listQuestionBank,
  listResumeUsage,
} from "@/lib/repositories/career-prep-read";

export type CareerPrepDashboardSummary = {
  behavioral_story_count: number;
  ready_behavioral_story_count: number;
  question_count: number;
  needs_practice_question_count: number;
  mock_interview_count: number;
  completed_mock_interview_count: number;
  resume_usage_count: number;
  read_warning_count: number;
};

export type CareerPrepDashboardDataResult = {
  summary: CareerPrepDashboardSummary;
  warnings: string[];
  source_tables: string[];
  read_only_boundary: true;
  deferred_behavior: string[];
};

function warningFor(label: string, error: string | null) {
  return error ? `${label}: ${error}` : null;
}

export async function getCareerPrepDashboardDataSummary(
  userId: string,
): Promise<CareerPrepDashboardDataResult> {
  const [stories, questions, mocks, resumeUsage] = await Promise.all([
    listBehavioralStories(userId, { limit: 100 }),
    listQuestionBank(userId, { limit: 100 }),
    listMockInterviews(userId, { limit: 100 }),
    listResumeUsage(userId, { limit: 100 }),
  ]);

  const storyRows = stories.data;
  const questionRows = questions.data;
  const mockRows = mocks.data;
  const usageRows = resumeUsage.data;

  const warnings = [
    warningFor("behavioral_stories", stories.error),
    warningFor("question_bank", questions.error),
    warningFor("mock_interviews", mocks.error),
    warningFor("resume_usage", resumeUsage.error),
  ].filter((warning): warning is string => Boolean(warning));

  return {
    summary: {
      behavioral_story_count: storyRows.length,
      ready_behavioral_story_count: storyRows.filter((item) => item.status === "ready").length,
      question_count: questionRows.length,
      needs_practice_question_count: questionRows.filter(
        (item) => item.status === "needs_practice",
      ).length,
      mock_interview_count: mockRows.length,
      completed_mock_interview_count: mockRows.filter((item) => item.status === "completed").length,
      resume_usage_count: usageRows.length,
      read_warning_count: warnings.length,
    },
    warnings,
    source_tables: ["behavioral_stories", "question_bank", "mock_interviews", "resume_usage"],
    read_only_boundary: true,
    deferred_behavior: [
      "No AI answer generation",
      "No autonomous interview feedback",
      "No resume rewriting",
      "No job applications",
      "No outreach emails",
      "No scraping",
    ],
  };
}

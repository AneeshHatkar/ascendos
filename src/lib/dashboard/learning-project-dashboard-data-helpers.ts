import {
  listLearningSessions,
  listProjectBugs,
  listProjectLinks,
  listProjectMilestones,
  listProjectReleases,
  listProjects,
  listProjectTests,
  listQuizAttempts,
  listQuizzes,
  listSkillPaths,
  listSkillProgress,
  listSkills,
} from "@/lib/repositories";

export interface LearningDashboardSummary {
  skill_path_count: number;
  active_skill_path_count: number;
  skill_count: number;
  mastered_skill_count: number;
  learning_session_count: number;
  completed_learning_session_count: number;
  quiz_count: number;
  quiz_attempt_count: number;
  passed_quiz_attempt_count: number;
  skill_progress_count: number;
}

export interface ProjectDashboardSummary {
  project_count: number;
  active_project_count: number;
  shipped_project_count: number;
  milestone_count: number;
  completed_milestone_count: number;
  open_bug_count: number;
  critical_bug_count: number;
  test_count: number;
  passing_test_count: number;
  release_count: number;
  project_link_count: number;
}

export interface LearningProjectDashboardDataResult {
  learning: LearningDashboardSummary;
  projects: ProjectDashboardSummary;
  generated_at: string;
}

export async function getLearningProjectDashboardDataSummary(
  userId: string,
): Promise<LearningProjectDashboardDataResult> {
  const [
    skillPaths,
    skills,
    learningSessions,
    quizzes,
    quizAttempts,
    skillProgress,
    projects,
    projectMilestones,
    projectBugs,
    projectTests,
    projectReleases,
    projectLinks,
  ] = await Promise.all([
    listSkillPaths(userId, { limit: 100 }),
    listSkills(userId, { limit: 100 }),
    listLearningSessions(userId, { limit: 100 }),
    listQuizzes(userId, { limit: 100 }),
    listQuizAttempts(userId, { limit: 100 }),
    listSkillProgress(userId, { limit: 100 }),
    listProjects(userId, { limit: 100 }),
    listProjectMilestones(userId, { limit: 100 }),
    listProjectBugs(userId, { limit: 100 }),
    listProjectTests(userId, { limit: 100 }),
    listProjectReleases(userId, { limit: 100 }),
    listProjectLinks(userId, { limit: 100 }),
  ]);

  const skillPathRows = skillPaths.data ?? [];
  const skillRows = skills.data ?? [];
  const learningSessionRows = learningSessions.data ?? [];
  const quizRows = quizzes.data ?? [];
  const quizAttemptRows = quizAttempts.data ?? [];
  const skillProgressRows = skillProgress.data ?? [];
  const projectRows = projects.data ?? [];
  const milestoneRows = projectMilestones.data ?? [];
  const bugRows = projectBugs.data ?? [];
  const testRows = projectTests.data ?? [];
  const releaseRows = projectReleases.data ?? [];
  const linkRows = projectLinks.data ?? [];

  return {
    generated_at: new Date().toISOString(),
    learning: {
      skill_path_count: skillPathRows.length,
      active_skill_path_count: skillPathRows.filter((item) => item.status === "active").length,
      skill_count: skillRows.length,
      mastered_skill_count: skillRows.filter((item) => item.status === "mastered").length,
      learning_session_count: learningSessionRows.length,
      completed_learning_session_count: learningSessionRows.filter(
        (item) => item.status === "completed",
      ).length,
      quiz_count: quizRows.length,
      quiz_attempt_count: quizAttemptRows.length,
      passed_quiz_attempt_count: quizAttemptRows.filter((item) => item.passed === true).length,
      skill_progress_count: skillProgressRows.length,
    },
    projects: {
      project_count: projectRows.length,
      active_project_count: projectRows.filter((item) => item.status === "active").length,
      shipped_project_count: projectRows.filter((item) => item.status === "shipped").length,
      milestone_count: milestoneRows.length,
      completed_milestone_count: milestoneRows.filter((item) => item.status === "completed").length,
      open_bug_count: bugRows.filter((item) =>
        ["open", "investigating"].includes(item.status),
      ).length,
      critical_bug_count: bugRows.filter((item) => item.severity === "critical").length,
      test_count: testRows.length,
      passing_test_count: testRows.filter((item) => item.passed === true).length,
      release_count: releaseRows.length,
      project_link_count: linkRows.length,
    },
  };
}

import {
  listInterviews,
  listJobApplications,
  listJobReferrals,
  listNetworkingContacts,
  listResumeVersions,
} from "@/lib/repositories";

export interface CareerDashboardSummary {
  application_count: number;
  active_application_count: number;
  interview_count: number;
  upcoming_interview_count: number;
  referral_count: number;
  pending_referral_count: number;
  networking_contact_count: number;
  resume_version_count: number;
  follow_ups_due_count: number;
}

export interface CareerDashboardDataResult {
  summary: CareerDashboardSummary;
  generated_at: string;
}

function isDueTodayOrEarlier(value: string | null): boolean {
  if (!value) {
    return false;
  }

  const candidate = new Date(value);
  if (Number.isNaN(candidate.getTime())) {
    return false;
  }

  const now = new Date();
  candidate.setHours(0, 0, 0, 0);
  now.setHours(0, 0, 0, 0);

  return candidate.getTime() <= now.getTime();
}

function isFutureOrToday(value: string | null): boolean {
  if (!value) {
    return false;
  }

  const candidate = new Date(value);
  if (Number.isNaN(candidate.getTime())) {
    return false;
  }

  const now = new Date();
  candidate.setHours(0, 0, 0, 0);
  now.setHours(0, 0, 0, 0);

  return candidate.getTime() >= now.getTime();
}

export async function getCareerDashboardDataSummary(
  userId: string,
): Promise<CareerDashboardDataResult> {
  const [applications, interviews, referrals, contacts, resumes] = await Promise.all([
    listJobApplications(userId, { limit: 100 }),
    listInterviews(userId, { limit: 100 }),
    listJobReferrals(userId, { limit: 100 }),
    listNetworkingContacts(userId, { limit: 100 }),
    listResumeVersions(userId, { limit: 100 }),
  ]);

  const applicationRows = applications.data ?? [];
  const interviewRows = interviews.data ?? [];
  const referralRows = referrals.data ?? [];
  const contactRows = contacts.data ?? [];
  const resumeRows = resumes.data ?? [];

  const activeApplicationStatuses = new Set([
    "saved",
    "applied",
    "follow_up",
    "recruiter_response",
    "oa",
    "interview",
  ]);

  const pendingReferralStatuses = new Set(["needed", "requested", "pending"]);

  return {
    generated_at: new Date().toISOString(),
    summary: {
      application_count: applicationRows.length,
      active_application_count: applicationRows.filter((item) =>
        activeApplicationStatuses.has(item.status),
      ).length,
      interview_count: interviewRows.length,
      upcoming_interview_count: interviewRows.filter((item) =>
        isFutureOrToday(item.scheduled_at),
      ).length,
      referral_count: referralRows.length,
      pending_referral_count: referralRows.filter((item) =>
        pendingReferralStatuses.has(item.status),
      ).length,
      networking_contact_count: contactRows.length,
      resume_version_count: resumeRows.length,
      follow_ups_due_count:
        applicationRows.filter((item) => isDueTodayOrEarlier(item.follow_up_at)).length +
        referralRows.filter((item) => isDueTodayOrEarlier(item.follow_up_at)).length +
        contactRows.filter((item) => isDueTodayOrEarlier(item.next_follow_up_at)).length,
    },
  };
}

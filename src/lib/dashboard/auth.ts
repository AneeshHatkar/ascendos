import type { User } from "@supabase/supabase-js";

import { createSupabaseServerClient } from "@/lib/supabase/server";

export type DashboardAuthState =
  | {
      status: "authenticated";
      user: User;
      message?: never;
    }
  | {
      status: "signed_out";
      user: null;
      message: string;
    }
  | {
      status: "unavailable";
      user: null;
      message: string;
    };

export async function getDashboardAuthState(): Promise<DashboardAuthState> {
  try {
    const supabase = await createSupabaseServerClient();
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error || !user) {
      return {
        status: "signed_out",
        user: null,
        message: "Sign in to view your personal ascendOS dashboard data.",
      };
    }

    return {
      status: "authenticated",
      user,
    };
  } catch {
    return {
      status: "unavailable",
      user: null,
      message:
        "Dashboard reads are unavailable until Supabase environment variables are configured.",
    };
  }
}

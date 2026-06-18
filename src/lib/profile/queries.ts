import { getCurrentUser, type AuthUser } from "@/lib/auth/session";
import { hasSupabaseBrowserEnv } from "@/lib/supabase/env";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { CarnosProfileRow, ProfileRow } from "@/types/database";

export type ProfileBundle = {
  user: AuthUser;
  profile: ProfileRow | null;
  carnosProfile: CarnosProfileRow | null;
};

export async function getProfileBundle(): Promise<ProfileBundle | null> {
  if (!hasSupabaseBrowserEnv()) {
    return null;
  }

  const user = await getCurrentUser();

  if (!user) {
    return null;
  }

  const supabase = await createSupabaseServerClient();

  const [{ data: profile, error: profileError }, { data: carnosProfile, error: carnosProfileError }] =
    await Promise.all([
      supabase.from("profiles").select("*").eq("id", user.id).maybeSingle(),
      supabase.from("carnos_profiles").select("*").eq("user_id", user.id).maybeSingle(),
    ]);

  if (profileError) {
    throw new Error(`Failed to load profile: ${profileError.message}`);
  }

  if (carnosProfileError) {
    throw new Error(`Failed to load Carnos profile: ${carnosProfileError.message}`);
  }

  return {
    user,
    profile,
    carnosProfile,
  };
}

export async function getProfile(): Promise<ProfileRow | null> {
  const bundle = await getProfileBundle();
  return bundle?.profile ?? null;
}

export async function getCarnosProfile(): Promise<CarnosProfileRow | null> {
  const bundle = await getProfileBundle();
  return bundle?.carnosProfile ?? null;
}

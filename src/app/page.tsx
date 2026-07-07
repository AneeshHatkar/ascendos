import { redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/auth/session";
import { hasSupabaseBrowserEnv } from "@/lib/supabase/env";

export default async function Home() {
  if (!hasSupabaseBrowserEnv()) {
    redirect("/auth/login");
  }

  const user = await getCurrentUser();

  if (!user) {
    redirect("/auth/login");
  }

  redirect("/command");
}

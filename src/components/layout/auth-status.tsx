import Link from "next/link";
import { getCurrentUser } from "@/lib/auth/session";
import { hasSupabaseBrowserEnv } from "@/lib/supabase/env";

export async function AuthStatus() {
  if (!hasSupabaseBrowserEnv()) {
    return (
      <div className="rounded-full border border-amber-300/20 bg-amber-300/10 px-4 py-2 text-sm text-amber-100">
        Local setup mode
      </div>
    );
  }

  const user = await getCurrentUser();

  if (!user) {
    return (
      <div className="flex items-center gap-2">
        <Link
          href="/auth/login"
          className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white/70"
        >
          Login
        </Link>
        <Link
          href="/auth/signup"
          className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-sm text-cyan-100"
        >
          Sign up
        </Link>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <span className="hidden text-sm text-white/55 sm:inline">
        {user.email ?? "Signed in"}
      </span>
      <Link
        href="/auth/signout"
        className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white/70"
      >
        Sign out
      </Link>
    </div>
  );
}

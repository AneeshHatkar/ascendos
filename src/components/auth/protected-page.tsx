import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth/session";
import { hasSupabaseBrowserEnv } from "@/lib/supabase/env";

type ProtectedPageProps = {
  children: React.ReactNode;
  fallbackTitle?: string;
  fallbackDescription?: string;
};

export async function ProtectedPage({
  children,
  fallbackTitle = "Local setup mode",
  fallbackDescription = "Supabase is not configured yet, so this protected area is visible only as a local development placeholder.",
}: ProtectedPageProps) {
  if (!hasSupabaseBrowserEnv()) {
    return (
      <section className="rounded-3xl border border-amber-300/20 bg-amber-300/10 p-8">
        <p className="text-xs uppercase tracking-[0.35em] text-amber-100/70">
          Protected route placeholder
        </p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-white">
          {fallbackTitle}
        </h1>
        <p className="mt-4 max-w-3xl text-sm leading-6 text-white/65">
          {fallbackDescription}
        </p>
        <div className="mt-6 flex flex-wrap gap-3 text-sm">
          <Link
            href="/auth/login"
            className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-white/70"
          >
            Login
          </Link>
          <Link
            href="/auth/signup"
            className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-cyan-100"
          >
            Sign up
          </Link>
        </div>
      </section>
    );
  }

  const user = await getCurrentUser();

  if (!user) {
    redirect("/auth/login");
  }

  return <>{children}</>;
}

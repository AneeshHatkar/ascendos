import Link from "next/link";
import { getProfileBundle } from "@/lib/profile";

export async function ProfileSummaryCard() {
  const bundle = await getProfileBundle();

  if (!bundle) {
    return (
      <section className="rounded-3xl border border-amber-300/20 bg-amber-300/10 p-6">
        <p className="text-xs uppercase tracking-[0.3em] text-amber-100/70">
          Account foundation
        </p>
        <h2 className="mt-3 text-2xl font-semibold text-white">
          Local setup mode
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-white/65">
          Supabase environment variables are not configured yet, so ascendOS is
          running safely without loading personal account data. This keeps local
          builds stable while the foundation is still being wired.
        </p>
        <div className="mt-5 flex flex-wrap gap-3 text-sm">
          <Link
            href="/auth/login"
            className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-white/70"
          >
            Login page
          </Link>
          <Link
            href="/auth/signup"
            className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-cyan-100"
          >
            Signup page
          </Link>
        </div>
      </section>
    );
  }

  const { user, profile, carnosProfile } = bundle;

  return (
    <section className="rounded-3xl border border-cyan-300/20 bg-cyan-300/10 p-6">
      <p className="text-xs uppercase tracking-[0.3em] text-cyan-100/70">
        Account foundation
      </p>
      <h2 className="mt-3 text-2xl font-semibold text-white">
        Profile and Carnos state
      </h2>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-white/40">
            User
          </p>
          <p className="mt-2 text-sm text-white/75">
            {user.email ?? "Signed in"}
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-white/40">
            Profile
          </p>
          <p className="mt-2 text-sm text-white/75">
            {profile?.onboarding_status ?? "Not loaded"}
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-white/40">
            Carnos memory
          </p>
          <p className="mt-2 text-sm text-white/75">
            {carnosProfile?.memory_mode ?? "Not loaded"}
          </p>
        </div>
      </div>

      <p className="mt-5 text-sm leading-6 text-white/60">
        Carnos memory defaults to confirmation-required mode. This preserves the
        project rule that important memories and data changes must be proposed,
        reviewed, and confirmed before being written.
      </p>
    </section>
  );
}

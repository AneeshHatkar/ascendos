import Link from "next/link";
import { signInWithPassword } from "@/lib/auth/actions";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#07070a] px-6 text-white">
      <section className="w-full max-w-md rounded-[2rem] border border-white/10 bg-white/[0.04] p-8">
        <p className="text-sm uppercase tracking-[0.35em] text-cyan-200/70">
          ascendOS
        </p>
        <h1 className="mt-4 text-3xl font-semibold">Login</h1>
        <p className="mt-3 text-sm leading-6 text-white/50">
          Access your proof-first personal operating system.
        </p>

        <form action={signInWithPassword} className="mt-8 space-y-4">
          <label className="block">
            <span className="text-sm text-white/60">Email</span>
            <input
              name="email"
              type="email"
              required
              className="mt-2 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none focus:border-cyan-300/50"
            />
          </label>

          <label className="block">
            <span className="text-sm text-white/60">Password</span>
            <input
              name="password"
              type="password"
              required
              className="mt-2 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none focus:border-cyan-300/50"
            />
          </label>

          <button
            type="submit"
            className="w-full rounded-2xl bg-cyan-300 px-4 py-3 font-medium text-black"
          >
            Sign in
          </button>
        </form>

        <p className="mt-6 text-sm text-white/50">
          No account yet?{" "}
          <Link href="/auth/signup" className="text-cyan-200">
            Create one
          </Link>
        </p>
      </section>
    </main>
  );
}

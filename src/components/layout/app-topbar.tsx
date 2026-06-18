export function AppTopbar() {
  return (
    <header className="flex items-center justify-between border-b border-white/10 bg-black/20 px-6 py-4 text-white">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-white/40">
          Proof-first operating system
        </p>
        <h1 className="mt-1 text-lg font-semibold">ascendOS + Carnos</h1>
      </div>

      <div className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-100">
        Confirmation-first AI
      </div>
    </header>
  );
}

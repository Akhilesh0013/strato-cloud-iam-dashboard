export function MfaBadge({ enabled }) {
  return enabled ? (
    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-xs font-semibold text-emerald-400 ring-1 ring-emerald-500/25">
      <svg className="h-3 w-3" viewBox="0 0 16 16" fill="currentColor"><path d="M8 1a3.5 3.5 0 0 0-3.5 3.5V7H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1h-1.5V4.5A3.5 3.5 0 0 0 8 1Zm2 6H6V4.5a2 2 0 1 1 4 0V7Z"/></svg>
      Enabled
    </span>
  ) : (
    <span className="inline-flex items-center gap-1 rounded-full bg-red-500/15 px-2.5 py-0.5 text-xs font-semibold text-red-400 ring-1 ring-red-500/25">
      <svg className="h-3 w-3" viewBox="0 0 16 16" fill="currentColor"><path d="M11.5 1a3.5 3.5 0 0 0-3.5 3.5V7H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1h-1.5V4.5a2 2 0 1 1 4 0 .75.75 0 0 0 1.5 0A3.5 3.5 0 0 0 11.5 1Z"/></svg>
      Disabled
    </span>
  );
}

export function RiskTag({ label }) {
  return (
    <span className="inline-block rounded bg-amber-500/15 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-amber-400 ring-1 ring-amber-500/25">
      {label}
    </span>
  );
}

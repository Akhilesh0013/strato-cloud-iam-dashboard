const MFA_OPTIONS = [
  { value: 'all', label: 'All Users' },
  { value: 'enabled', label: 'MFA Enabled' },
  { value: 'disabled', label: 'MFA Disabled' },
];

export default function Filters({ mfaFilter, onMfaChange, search, onSearchChange }) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="relative sm:max-w-xs w-full">
        <svg className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
        </svg>
        <input
          type="text"
          placeholder="Search by name\u2026"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full rounded-lg border border-white/10 bg-white/5 py-2 pl-9 pr-3.5 text-sm text-slate-200 shadow-sm placeholder:text-slate-500 focus:border-sky-500/50 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
        />
      </div>

      <div className="flex gap-2">
        {MFA_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onMfaChange(opt.value)}
            className={`rounded-lg px-3.5 py-2 text-sm font-medium transition-all ${
              mfaFilter === opt.value
                ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/25'
                : 'bg-white/5 text-slate-400 ring-1 ring-white/10 hover:bg-white/10 hover:text-slate-200'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}

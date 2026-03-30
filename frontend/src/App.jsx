import { useState, useMemo } from 'react';
import { useUsers } from './hooks/useUsers';
import UsersTable from './components/UsersTable';
import Filters from './components/Filters';

export default function App() {
  const { users, loading, error } = useUsers();
  const [mfaFilter, setMfaFilter] = useState('all');
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    return users.filter((u) => {
      if (mfaFilter === 'enabled' && !u.mfaEnabled) return false;
      if (mfaFilter === 'disabled' && u.mfaEnabled) return false;
      if (search && !u.name.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [users, mfaFilter, search]);

  const stats = useMemo(() => ({
    total: users.length,
    stale: users.filter((u) => u.stalePassword).length,
    inactive: users.filter((u) => u.inactiveUser).length,
    mfaOff: users.filter((u) => !u.mfaEnabled).length,
  }), [users]);

  return (
    <div className="min-h-screen bg-[#0b1120] text-slate-200">
      <header className="border-b border-white/5 bg-[#0f172a]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-sky-400 to-blue-600 shadow-lg shadow-sky-500/20">
              <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 0 0 4.5 4.5H18a3.75 3.75 0 0 0 .75-7.425A4.502 4.502 0 0 0 14.25 9 5.25 5.25 0 0 0 4.8 13.03 4.5 4.5 0 0 0 2.25 15Z" />
              </svg>
            </div>
            <div>
              <h1 className="text-lg font-bold text-white tracking-tight">Strato Cloud</h1>
              <p className="text-xs text-slate-400">IAM User Dashboard</p>
            </div>
          </div>
          <div className="hidden gap-1 sm:flex">
            <StatCard label="Total Users" value={stats.total} color="sky" />
            <StatCard label="Stale Password" value={stats.stale} color="amber" />
            <StatCard label="Inactive 90d+" value={stats.inactive} color="orange" />
            <StatCard label="MFA Off" value={stats.mfaOff} color="red" />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8 space-y-6">
        <Filters
          mfaFilter={mfaFilter}
          onMfaChange={setMfaFilter}
          search={search}
          onSearchChange={setSearch}
        />

        {loading && (
          <div className="flex items-center justify-center py-24">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-sky-500 border-t-transparent" />
          </div>
        )}

        {error && (
          <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-5 py-4 text-sm text-red-300">
            <strong className="text-red-400">Error:</strong> {error}
          </div>
        )}

        {!loading && !error && <UsersTable users={filtered} />}

        <Legend />
      </main>
    </div>
  );
}

const COLOR_MAP = {
  sky: 'text-sky-400 bg-sky-400/10 ring-sky-400/20',
  amber: 'text-amber-400 bg-amber-400/10 ring-amber-400/20',
  orange: 'text-orange-400 bg-orange-400/10 ring-orange-400/20',
  red: 'text-red-400 bg-red-400/10 ring-red-400/20',
};

function StatCard({ label, value, color }) {
  const cls = COLOR_MAP[color];
  return (
    <div className={`rounded-lg px-4 py-2 text-center ring-1 ${cls}`}>
      <p className="text-lg font-bold">{value}</p>
      <p className="text-[10px] uppercase tracking-wider opacity-70">{label}</p>
    </div>
  );
}

function Legend() {
  return (
    <div className="flex flex-wrap gap-5 text-xs text-slate-500">
      <span className="flex items-center gap-1.5">
        <span className="inline-block h-3 w-3 rounded bg-amber-500/20 ring-1 ring-amber-500/40" /> Stale password (&gt; 1 year)
      </span>
      <span className="flex items-center gap-1.5">
        <span className="inline-block h-3 w-3 rounded bg-orange-500/20 ring-1 ring-orange-500/40" /> Inactive (&gt; 90 days)
      </span>
      <span className="flex items-center gap-1.5">
        <span className="inline-block h-3 w-3 rounded bg-red-500/20 ring-1 ring-red-500/40" /> Both risks
      </span>
    </div>
  );
}

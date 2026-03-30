import { MfaBadge, RiskTag } from './StatusBadge';

const COLUMNS = [
  { key: 'name', label: 'Human User' },
  { key: 'createDate', label: 'Create Date' },
  { key: 'passwordChangedDate', label: 'Password Changed' },
  { key: 'daysSincePasswordChange', label: 'Days Since Pwd Change' },
  { key: 'lastAccessDate', label: 'Last Access Date' },
  { key: 'daysSinceLastAccess', label: 'Days Since Last Access' },
  { key: 'mfaEnabled', label: 'MFA' },
];

function formatDate(iso) {
  if (!iso) return '\u2014';
  const d = new Date(iso + 'T00:00:00');
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function formatDays(val) {
  if (val === -1) return '\u2014';
  return val.toLocaleString();
}

function rowRiskClasses(user) {
  if (user.stalePassword && user.inactiveUser) return 'bg-red-500/8 border-l-2 border-l-red-500';
  if (user.stalePassword) return 'bg-amber-500/8 border-l-2 border-l-amber-500';
  if (user.inactiveUser) return 'bg-orange-500/8 border-l-2 border-l-orange-500';
  return 'border-l-2 border-l-transparent';
}

export default function UsersTable({ users }) {
  if (users.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-slate-700 bg-slate-800/40 py-16 text-center text-sm text-slate-500">
        No users match your filters.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-white/5 bg-[#0f172a] shadow-xl shadow-black/20">
      <table className="min-w-full text-left text-sm">
        <thead>
          <tr className="border-b border-white/5 bg-[#131c31]">
            {COLUMNS.map((col) => (
              <th key={col.key} className="whitespace-nowrap px-4 py-3.5 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                {col.label}
              </th>
            ))}
            <th className="px-4 py-3.5 text-[11px] font-semibold uppercase tracking-wider text-slate-400">Flags</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {users.map((user, idx) => (
            <tr key={idx} className={`transition-colors hover:bg-white/[0.03] ${rowRiskClasses(user)}`}>
              <td className="whitespace-nowrap px-4 py-3 font-medium text-white">{user.name}</td>
              <td className="whitespace-nowrap px-4 py-3 text-slate-400">{formatDate(user.createDate)}</td>
              <td className="whitespace-nowrap px-4 py-3 text-slate-400">{formatDate(user.passwordChangedDate)}</td>
              <td className="whitespace-nowrap px-4 py-3 text-slate-400">
                <span className={user.stalePassword ? 'font-semibold text-amber-400' : ''}>
                  {formatDays(user.daysSincePasswordChange)}
                </span>
              </td>
              <td className="whitespace-nowrap px-4 py-3 text-slate-400">{formatDate(user.lastAccessDate)}</td>
              <td className="whitespace-nowrap px-4 py-3 text-slate-400">
                <span className={user.inactiveUser ? 'font-semibold text-orange-400' : ''}>
                  {formatDays(user.daysSinceLastAccess)}
                </span>
              </td>
              <td className="whitespace-nowrap px-4 py-3"><MfaBadge enabled={user.mfaEnabled} /></td>
              <td className="whitespace-nowrap px-4 py-3 space-x-1">
                {user.stalePassword && <RiskTag label="Stale Password" />}
                {user.inactiveUser && <RiskTag label="Inactive 90d+" />}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

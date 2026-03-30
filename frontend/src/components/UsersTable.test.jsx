import { describe, it, expect } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import UsersTable from './UsersTable';

const MOCK_USERS = [
  {
    name: 'Alice Admin',
    createDate: '2020-01-15',
    passwordChangedDate: '2024-12-01',
    daysSincePasswordChange: 100,
    lastAccessDate: '2025-03-20',
    daysSinceLastAccess: 10,
    mfaEnabled: true,
    stalePassword: false,
    inactiveUser: false,
  },
  {
    name: 'Bob Stale',
    createDate: '2018-06-01',
    passwordChangedDate: '2021-01-01',
    daysSincePasswordChange: 1500,
    lastAccessDate: '2024-11-01',
    daysSinceLastAccess: 150,
    mfaEnabled: false,
    stalePassword: true,
    inactiveUser: true,
  },
  {
    name: 'Carol NoAccess',
    createDate: '2025-04-08',
    passwordChangedDate: '2025-05-08',
    daysSincePasswordChange: 30,
    lastAccessDate: '',
    daysSinceLastAccess: -1,
    mfaEnabled: false,
    stalePassword: false,
    inactiveUser: false,
  },
];

describe('UsersTable', () => {
  it('renders all user rows', () => {
    render(<UsersTable users={MOCK_USERS} />);
    expect(screen.getByText('Alice Admin')).toBeInTheDocument();
    expect(screen.getByText('Bob Stale')).toBeInTheDocument();
    expect(screen.getByText('Carol NoAccess')).toBeInTheDocument();
  });

  it('renders column headers', () => {
    render(<UsersTable users={MOCK_USERS} />);
    const thead = screen.getAllByRole('columnheader');
    const headerTexts = thead.map((th) => th.textContent);
    expect(headerTexts).toContain('Human User');
    expect(headerTexts).toContain('Password Changed');
    expect(headerTexts).toContain('MFA');
    expect(headerTexts).toContain('Flags');
  });

  it('shows correct MFA badge counts', () => {
    render(<UsersTable users={MOCK_USERS} />);
    expect(screen.getAllByText('Enabled')).toHaveLength(1);
    expect(screen.getAllByText('Disabled')).toHaveLength(2);
  });

  it('shows risk tags for flagged users', () => {
    render(<UsersTable users={MOCK_USERS} />);
    expect(screen.getAllByText('Stale Password')).toHaveLength(1);
    expect(screen.getAllByText('Inactive 90d+')).toHaveLength(1);
  });

  it('does not show risk tags for healthy users', () => {
    render(<UsersTable users={[MOCK_USERS[0]]} />);
    expect(screen.queryByText('Stale Password')).not.toBeInTheDocument();
    expect(screen.queryByText('Inactive 90d+')).not.toBeInTheDocument();
  });

  it('renders dash for missing dates', () => {
    render(<UsersTable users={[MOCK_USERS[2]]} />);
    const dashes = screen.getAllByText('—');
    expect(dashes.length).toBeGreaterThanOrEqual(1);
  });

  it('shows empty state when no users match', () => {
    render(<UsersTable users={[]} />);
    expect(screen.getByText('No users match your filters.')).toBeInTheDocument();
    expect(screen.queryByRole('table')).not.toBeInTheDocument();
  });

  it('highlights row with both risks using red background', () => {
    render(<UsersTable users={[MOCK_USERS[1]]} />);
    const row = screen.getByText('Bob Stale').closest('tr');
    expect(row.className).toContain('border-l-red-500');
  });
});

import { useState, useEffect } from 'react';

const API_URL = '/api/users';

export function useUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchUsers() {
      try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error(`Server returned ${res.status}`);
        const data = await res.json();
        if (!cancelled) setUsers(data);
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchUsers();
    return () => { cancelled = true; };
  }, []);

  return { users, loading, error };
}

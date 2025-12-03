const API_URL = 'http://localhost:5000/api';

// Helper to get headers with token
const getHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    'Authorization': token ? `Bearer ${token}` : '',
  };
};

export async function login(credentials: any) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });
  if (!res.ok) throw new Error('Login failed');
  return res.json();
}

export async function register(credentials: any) {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });
  if (!res.ok) throw new Error('Registration failed');
  return res.json();
}

export async function fetchJobs(status?: string) {
  const query = status && status !== 'All' ? `?status=${status}` : '';
  const res = await fetch(`${API_URL}/jobs${query}`, { 
    headers: getHeaders(), 
    cache: 'no-store' 
  });
  if (res.status === 401) { window.location.href = '/login'; return []; }
  return res.json();
}

export async function createJob(data: any) {
  const res = await fetch(`${API_URL}/jobs`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function updateStatus(id: string, status: string) {
  const res = await fetch(`${API_URL}/jobs/${id}/status`, {
    method: 'PATCH',
    headers: getHeaders(),
    body: JSON.stringify({ status }),
  });
  return res.json();
}

const API = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000';

export async function apiGet(path, token) {
  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  const res = await fetch(`${API}${path}`, { headers });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export async function apiPost(path, body, token) {
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers.Authorization = `Bearer ${token}`;
  const res = await fetch(`${API}${path}`, { method: 'POST', body: JSON.stringify(body), headers });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}
import { useAuth } from '../contexts/AuthContext';

const BASE = '/api';

async function request(path: string, options: RequestInit = {}) {
  const token = localStorage.getItem('token');
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> | undefined),
  };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(`${BASE}${path}`, {
    ...options,
    headers,
  });

  if (res.status === 401) {
    // try refresh
    const refreshToken = localStorage.getItem('refreshToken');
    if (refreshToken) {
      const r = await fetch(`${BASE}/auth/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken })
      });
      if (r.ok) {
        const json = await r.json();
        if (json?.token) {
          localStorage.setItem('token', json.token);
          if (json.refreshToken) localStorage.setItem('refreshToken', json.refreshToken);
          // retry original
          return request(path, options);
        }
      }
    }
  }

  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    const message = json?.error?.message || json?.message || 'Request failed';
    throw new Error(message);
  }
  return json;
}

export function apiGet(path: string) {
  return request(path, { method: 'GET' });
}

export function apiPost(path: string, body?: unknown) {
  return request(path, { method: 'POST', body: JSON.stringify(body ?? {}) });
}

export function apiPut(path: string, body?: unknown) {
  return request(path, { method: 'PUT', body: JSON.stringify(body ?? {}) });
}

export function apiDelete(path: string) {
  return request(path, { method: 'DELETE' });
}

export function useApi() {
  // simple hook for future extensibility
  const { getAccessToken } = useAuth();
  return { apiGet, apiPost, apiPut, apiDelete, getAccessToken };
}



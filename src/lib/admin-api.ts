import { API_V1 } from './config';
const API_BASE = '/api/v1';

function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('admin_token');
}

export function setToken(token: string) {
  localStorage.setItem('admin_token', token);
}

export function clearToken() {
  localStorage.removeItem('admin_token');
}

export function isLoggedIn(): boolean {
  return !!getToken();
}

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

interface PaginatedData<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export async function adminFetch<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const token = getToken();
  const url = `${API_BASE}${endpoint}`;
  const res = await fetch(url, {
    ...options,
    headers: {
      ...(options?.body ? { 'Content-Type': 'application/json' } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options?.headers,
    },
  });

  if (res.status === 401) {
    clearToken();
    if (typeof window !== 'undefined') window.location.href = '/admin/login';
    throw new Error('Unauthorized');
  }

  if (!res.ok) {
    const json = await res.json().catch(() => ({}));
    throw new Error(json.message || `Error ${res.status}`);
  }

  if (res.status === 204) return undefined as T;

  const json: ApiResponse<T> = await res.json();
  if (!json.success) throw new Error(json.message || 'Request failed');
  return json.data;
}

// Auth
export async function login(email: string, password: string) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const json = await res.json();
  if (res.status === 429) {
    const err = new Error(json.message || 'Too many login attempts') as any;
    err.retryAfter = json.retryAfter || 900;
    throw err;
  }
  if (!json.success) throw new Error(json.message || 'Login failed');
  setToken(json.data.accessToken);
  localStorage.setItem('admin_user', JSON.stringify(json.data.user));
  return json.data;
}

export function getStoredUser() {
  if (typeof window === 'undefined') return null;
  const u = localStorage.getItem('admin_user');
  return u ? JSON.parse(u) : null;
}

export function logout() {
  clearToken();
  localStorage.removeItem('admin_user');
  if (typeof window !== 'undefined') window.location.href = '/admin/login';
}

// Generic CRUD helpers
export async function adminList<T>(endpoint: string): Promise<T[]> {
  const data = await adminFetch<{ data: T[] } | PaginatedData<T>>(endpoint);
  if (Array.isArray(data)) return data;
  return (data as PaginatedData<T>).data;
}

export async function adminGet<T>(endpoint: string): Promise<T> {
  const data = await adminFetch<{ data: T }>(endpoint);
  return data.data;
}

export async function adminCreate<T>(endpoint: string, body: any): Promise<T> {
  const data = await adminFetch<{ data: T }>(endpoint, {
    method: 'POST',
    body: JSON.stringify(body),
  });
  return data.data;
}

export async function adminUpdate<T>(endpoint: string, body: any): Promise<T> {
  const data = await adminFetch<{ data: T }>(endpoint, {
    method: 'PUT',
    body: JSON.stringify(body),
  });
  return data.data;
}

export async function adminDelete(endpoint: string): Promise<void> {
  await adminFetch(endpoint, { method: 'DELETE' });
}

export async function adminUpload(file: File): Promise<string> {
  const token = getToken();
  const formData = new FormData();
  formData.append('file', file);
  const uploadBase = typeof window !== 'undefined' ? API_V1 : '/api/v1';
  const res = await fetch(`${uploadBase}/admin/upload`, {
    method: 'POST',
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: formData,
  });
  if (!res.ok) {
    const json = await res.json().catch(() => ({}));
    throw new Error(json.message || `Upload failed (${res.status})`);
  }
  const json = await res.json();
  if (!json.success) throw new Error(json.message || 'Upload failed');
  return json.data.fileUrl;
}

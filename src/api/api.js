const API_URL = 'http://5.20.166.68:8000/api';

const proxyFetch = async (method, path, body) => {
  const token = localStorage.getItem('token') || '';
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    throw new Error(`Request failed (${res.status})`);
  }

  return res.json();
};

export const apiGet = (path) => proxyFetch('GET', path);
export const apiPost = (path, body) => proxyFetch('POST', path, body);
export const apiPut = (path, body) => proxyFetch('PUT', path, body);
export const apiDelete = (path, body) => proxyFetch('DELETE', path, body);

// helper for explicit login call (wrapper for clarity)
export const apiLogin = (body) => proxyFetch('POST', '/login', body);

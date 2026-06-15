const API_URL = 'http://5.20.166.68:8000/api';

const proxyFetch = async (method, path, body) => {
  const token = localStorage.getItem('token');

  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  const contentType = res.headers.get('content-type') || '';
  const raw = await res.text();

  if (!res.ok) {
    throw new Error(`Request failed (${res.status}): ${raw}`);
  }

  if (contentType.includes('application/json')) {
    return JSON.parse(raw);
  }

  throw new Error(
    `Unexpected response content type '${contentType}' from ${method} ${path}`
  );
};

// helpers
export const apiGet = (path) => proxyFetch('GET', path);
export const apiPost = (path, body) => proxyFetch('POST', path, body);
export const apiPut = (path, body) => proxyFetch('PUT', path, body);
export const apiDelete = (path, body) => proxyFetch('DELETE', path, body);

// login helper
export const apiLogin = (body) => proxyFetch('POST', '/login', body);
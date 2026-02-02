const proxyFetch = async (method, path, body) => {
  const res = await fetch(`/api/proxy?path=${encodeURIComponent(path)}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const raw = await res.text();

  if (!res.ok) {
    throw new Error(`Request failed (${res.status})`);
  }

  return raw ? JSON.parse(raw) : null;
};

export const apiGet = (path) => proxyFetch('GET', path);
export const apiPost = (path, body) => proxyFetch('POST', path, body);
export const apiPut = (path, body) => proxyFetch('PUT', path, body);
export const apiDelete = (path, body) => proxyFetch('DELETE', path, body);

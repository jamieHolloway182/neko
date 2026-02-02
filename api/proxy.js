const API_BASE = 'https://test.sharedbudget.lt/public/index.php/api';

export default async function handler(req, res) {
  const { method, body, query } = req;
  const path = query.path;

  if (!path) {
    res.status(400).json({ error: 'Missing path' });
    return;
  }

  const apiRes = await fetch(`${API_BASE}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      Authorization: `Bearer ${process.env.SECRET_API_KEY}`,
    },
    body: method === 'GET' || method === 'HEAD'
      ? undefined
      : JSON.stringify(body),
  });

  const raw = await apiRes.text();

  res.status(apiRes.status);

  try {
    res.json(JSON.parse(raw));
  } catch {
    res.send(raw);
  }
}

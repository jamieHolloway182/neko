import https from 'https';

const API_BASE = 'https://test.sharedbudget.lt/public/index.php/api';

export default async function handler(req, res) {
  const { method, body, query } = req;
  const path = query.path;

  if (!path) {
    res.status(400).json({ error: 'Missing path' });
    return;
  }

  const agent = new https.Agent({
    rejectUnauthorized: false // ⚠️ bypass SSL verification
  });

  try {
    const apiRes = await fetch(`${API_BASE}${path}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        Authorization: `Bearer ${process.env.SECRET_API_KEY}`, // put your secret key in Vercel env vars
      },
      body: method === 'GET' || method === 'HEAD' ? undefined : JSON.stringify(body),
      agent,
    });

    const raw = await apiRes.text();

    res.status(apiRes.status).send(raw);
  } catch (err) {
    console.error('💥 Proxy error:', err);
    res.status(500).json({ error: err.message });
  }
}

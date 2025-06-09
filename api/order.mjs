export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const upstream = await fetch('https://orderfoodonline.deno.dev/api/order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body),
    });

    const payload = await upstream.json();
    res.status(upstream.status).json(payload);
  } catch (err) {
    console.error('Proxy error (order):', err);
    res.status(500).json({ error: 'Server error in proxy' });
  }
}

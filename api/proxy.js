// api/proxy.js   (Node-style Vercel Serverless Function)
export default async function handler(req, res) {
  // Strip the `/api` prefix so you forward `/api/menu`
  const backendPath = req.url.replace('/api', '');
  const targetURL = `https://orderfoodonline.deno.dev${backendPath}`;

  const backendRes = await fetch(targetURL, {
    method: req.method,
    headers: {
      ...req.headers,
      host: 'orderfoodonline.deno.dev', // ensure Host header is correct
    },
    body: req.method === 'GET' ? undefined : req.body,
  });

  // Stream or buffer the response back to the browser
  res.status(backendRes.status);
  backendRes.headers.forEach((value, key) => res.setHeader(key, value));
  const data = await backendRes.arrayBuffer();
  res.send(Buffer.from(data));
}

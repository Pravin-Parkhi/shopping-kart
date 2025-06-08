export default async function handler(req, res) {
  try {
    const response = await fetch('https://orderfoodonline.deno.dev/api/product');
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ error: 'Server error in proxy' });
  }
}

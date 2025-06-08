export default async function handler() {
  const url = 'https://orderfoodonline.deno.dev/api/product';

  try {
    const response = await fetch(url);
    const data = await response.json();

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: 'Failed to fetch products' }), {
      status: 500,
    });
  }
}

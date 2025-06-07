import type { Product } from '../types/product';

export async function getProducts(): Promise<Product[]> {
  try {
    const response = await fetch('/api/product', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Failed to fetch products:', errorText);
      throw new Error(`Request failed: ${response.status}`);
    }

    const data: Product[] = await response.json();
    return data;
  } catch (error) {
    console.error('Network or server error while fetching products:', error);
    throw error;
  }
}

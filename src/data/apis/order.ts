import type { Product } from '../types/product';

interface OrderItem {
  productId: string;
  quantity: number;
}

export interface OrderRequest {
  couponCode: string;
  items: OrderItem[];
}

interface OrderResponse {
  id: string;
  couponCode: string;
  items: OrderItem[];
  products: Product[];
}

export async function createOrder(orderItems: OrderRequest): Promise<OrderResponse> {
  try {
    const response = await fetch('/api/order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderItems),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Failed to create order:', errorText);
      throw new Error(`Request failed: ${response.status}`);
    }

    const data: OrderResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Network or server error while creating order:', error);
    throw error;
  }
}

import type { Product } from './product';

export interface CartItem extends Product {
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  coupon: string | null;
}

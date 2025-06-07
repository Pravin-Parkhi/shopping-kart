import type { CartItem } from '../../data/types/cart';
import type { Product } from '../../data/types/product';

export type CartAction =
  | { type: 'ADD_ITEM'; payload: Product }
  | { type: 'REMOVE_ITEM'; payload: Product }
  | { type: 'DELETE_ITEM'; payload: Product }
  | { type: 'CLEAR_CART' };

export const cartReducer = (state: CartItem[], action: CartAction): CartItem[] => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.find((item) => item.id === action.payload.id);
      if (existing) {
        return state.map((item) =>
          item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...state, { ...action.payload, quantity: 1 }];
    }

    case 'REMOVE_ITEM': {
      return state
        .map((item) =>
          item.id === action.payload.id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0);
    }

    case 'DELETE_ITEM': {
      return state.filter((item) => item.id !== action.payload.id);
    }

    case 'CLEAR_CART': {
      return [];
    }

    default:
      return state;
  }
};

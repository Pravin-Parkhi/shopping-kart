import type { CartState } from '../../data/types/cart';
import type { Product } from '../../data/types/product';

export type CartAction =
  | { type: 'ADD_ITEM'; payload: Product }
  | { type: 'REMOVE_ITEM'; payload: Product }
  | { type: 'DELETE_ITEM'; payload: Product }
  | { type: 'CLEAR_CART' }
  | { type: 'APPLY_COUPON'; payload: string }
  | { type: 'REMOVE_COUPON' };

export const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.items.find((item) => item.id === action.payload.id);
      const items = existing
        ? state.items.map((item) =>
            item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item
          )
        : [...state.items, { ...action.payload, quantity: 1 }];
      return { ...state, items };
    }

    case 'REMOVE_ITEM': {
      const items = state.items
        .map((item) =>
          item.id === action.payload.id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0);
      return { ...state, items };
    }

    case 'DELETE_ITEM': {
      return { ...state, items: state.items.filter((item) => item.id !== action.payload.id) };
    }

    case 'CLEAR_CART': {
      return { items: [], coupon: null };
    }

    case 'APPLY_COUPON':
      return { ...state, coupon: action.payload };

    case 'REMOVE_COUPON':
      return { ...state, coupon: null };

    default:
      return state;
  }
};

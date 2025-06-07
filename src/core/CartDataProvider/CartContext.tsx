import { createContext, useContext } from 'react';
import type { CartItem } from '../../data/types/cart';
import type { Product } from '../../data/types/product';

export interface CartContextProps {
  cartItems: CartItem[];
  totalCartValue: number;
  addToCart: (product: Product) => void;
  removeFromCart: (product: Product) => void;
  deleteFromCart: (product: Product) => void;
  clearCart: () => void;
}

export const CartContext = createContext<CartContextProps | undefined>(undefined);

export const useCart = (): CartContextProps => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

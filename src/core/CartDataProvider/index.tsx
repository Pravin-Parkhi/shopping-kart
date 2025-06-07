import React, { useMemo, useReducer } from 'react';
import { CartContext } from './CartContext';
import type { CartItem } from '../../data/types/cart';
import type { Product } from '../../data/types/product';
import { cartReducer } from './cartReducer';

export const CartDataProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, dispatch] = useReducer(cartReducer, [] as CartItem[]);

  const totalCartValue = useMemo(
    () => cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0),
    [cartItems]
  );

  const addToCart = (product: Product) => dispatch({ type: 'ADD_ITEM', payload: product });

  const removeFromCart = (product: Product) => dispatch({ type: 'REMOVE_ITEM', payload: product });

  const deleteFromCart = (product: Product) => dispatch({ type: 'DELETE_ITEM', payload: product });

  const clearCart = () => dispatch({ type: 'CLEAR_CART' });

  return (
    <CartContext.Provider
      value={{ cartItems, totalCartValue, addToCart, removeFromCart, deleteFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

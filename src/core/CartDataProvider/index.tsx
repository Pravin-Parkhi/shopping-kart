import React, { useMemo, useReducer } from 'react';
import { CartContext } from './CartContext';
import type { CartState } from '../../data/types/cart';
import type { Product } from '../../data/types/product';
import { cartReducer } from './cartReducer';

export const CartDataProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    coupon: null,
  } as CartState);

  const totalCartValue = useMemo(
    () => state.items.reduce((acc, item) => acc + item.price * item.quantity, 0),
    [state.items]
  );

  const discountedTotal = useMemo(() => {
    const coupon = state.coupon;

    if (!coupon) return totalCartValue;

    // HAPPYHOURS
    if (coupon === 'HAPPYHOURS') {
      return +(totalCartValue * 0.82).toFixed(2);
    }

    return totalCartValue;
  }, [state.coupon, totalCartValue]);

  const addToCart = (product: Product) => dispatch({ type: 'ADD_ITEM', payload: product });

  const removeFromCart = (product: Product) => dispatch({ type: 'REMOVE_ITEM', payload: product });

  const deleteFromCart = (product: Product) => dispatch({ type: 'DELETE_ITEM', payload: product });

  const clearCart = () => dispatch({ type: 'CLEAR_CART' });

  const applyCoupon = (code: string) => dispatch({ type: 'APPLY_COUPON', payload: code });

  const removeCoupon = () => dispatch({ type: 'REMOVE_COUPON' });

  return (
    <CartContext.Provider
      value={{
        cartItems: state.items,
        totalCartValue,
        discountedTotal,
        appliedCoupon: state.coupon,
        addToCart,
        removeFromCart,
        deleteFromCart,
        clearCart,
        applyCoupon,
        removeCoupon,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

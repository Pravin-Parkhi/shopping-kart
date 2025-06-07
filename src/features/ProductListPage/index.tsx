import React, { useCallback, useState } from 'react';
import { Box, Container } from '@mui/material';
import BaseLayout from '../../shared/BaseLayout';
import ProductList from './ProductList';
import ProductCart from '../../shared/ProductCart';
import OrderConfirmationDialog from './OrderConfirmationDialog';
import { useCart } from '../../core/CartDataProvider/CartContext';
import { createOrder, type OrderRequest } from '../../data/apis/order';

const ProductListPage: React.FC = () => {
  const [showOrderConfirmationDialog, setShowOrderConfirmationDialog] = useState<boolean>(false);

  const { cartItems, clearCart } = useCart();

  const handleShowOrderConfirmationDialog = useCallback(() => {
    setShowOrderConfirmationDialog(true);
  }, []);

  const handleCloseOrderConfirmationDialog = useCallback(() => {
    setShowOrderConfirmationDialog(false);
  }, []);

  const handleNewOrderClick = useCallback(() => {
    // Clear cart
    clearCart();

    // Hide dialog
    handleCloseOrderConfirmationDialog();
  }, [clearCart, handleCloseOrderConfirmationDialog]);

  const placeOrder = useCallback(async () => {
    const orderPayload: OrderRequest = {
      items: cartItems.map((item) => ({ productId: item.id, quantity: item.quantity })),
      couponCode: '',
    };

    try {
      const order = await createOrder(orderPayload);
      handleShowOrderConfirmationDialog();
      console.log('Order created successfully:', order);
    } catch (err) {
      console.error(err);
      alert('Failed to create order. Please try again.');
    }
  }, [cartItems, handleShowOrderConfirmationDialog]);

  const handleOrderConfirm = useCallback(() => {
    placeOrder();
  }, [placeOrder]);

  return (
    <BaseLayout>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box display="flex" gap={{ md: 2 }}>
          <ProductList />
          <ProductCart orderConfirmCallback={handleOrderConfirm} />
        </Box>
        <OrderConfirmationDialog
          open={showOrderConfirmationDialog}
          closeDialog={handleShowOrderConfirmationDialog}
          startNewOrderCallback={handleNewOrderClick}
        />
      </Container>
    </BaseLayout>
  );
};

export default ProductListPage;

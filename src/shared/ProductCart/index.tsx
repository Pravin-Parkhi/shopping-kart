import React, { useCallback, useMemo } from 'react';
import { Box, CardMedia, Typography, useMediaQuery, useTheme } from '@mui/material';
import CartEmptyState from './CartEmptyState';
import { useCart } from '../../core/CartDataProvider/CartContext';
import CartItem from './CartItem';
import type { CartItem as CartItemType } from '../../data/types/cart';
import CustomButton from '../../components/Button';
import SwipeableEdgeDrawer from '../../components/Drawer';

interface ProductCartProps {
  orderConfirmCallback: () => void;
}

const ProductCart: React.FC<ProductCartProps> = ({ orderConfirmCallback }) => {
  const theme = useTheme();

  // Show drawer on screen < md (i.e., mobile + tablet)
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

  const { cartItems, totalCartValue, deleteFromCart } = useCart();

  const hasItemsInCart = useMemo(() => cartItems.length, [cartItems.length]);

  const cartLength = useMemo(() => cartItems.length, [cartItems.length]);

  const handleDeleteCartItem = useCallback(
    (cartItem: CartItemType) => {
      deleteFromCart(cartItem);
    },
    [deleteFromCart]
  );

  const onConfirmOrderClick = useCallback(() => {
    orderConfirmCallback();
  }, [orderConfirmCallback]);

  const CartHeader = () => (
    <Typography variant="h6" color="primary">
      Your Cart ({cartLength})
    </Typography>
  );

  const CartContent = () => {
    if (hasItemsInCart) {
      return (
        <Box>
          {cartItems.map((cartItem) => (
            <CartItem
              key={cartItem.id}
              cartItem={cartItem}
              deleteCartItemCallback={handleDeleteCartItem}
            />
          ))}
          <Box py={3} display="flex" justifyContent="space-between">
            <Typography variant="h6" color="textSecondary">
              Order Total
            </Typography>
            <Typography variant="h5" color="textPrimary" fontWeight={600}>
              {`$${totalCartValue}`}
            </Typography>
          </Box>
          <Box
            borderRadius={2}
            p={2}
            display="flex"
            alignItems="center"
            textAlign="center"
            justifyContent="center"
            sx={{ backgroundColor: '#FBF7F4' }}
          >
            <CardMedia
              component="img"
              height={20}
              image="/icon-carbon-neutral.svg"
              sx={{
                width: 'auto',
                borderRadius: 2,
              }}
            />
            <Typography variant="body1" color="textSecondary" pl={2}>
              This is a{' '}
              <Box component="span" fontWeight={600}>
                carbon-neutral
              </Box>{' '}
              delivery
            </Typography>
          </Box>
          <Box pt={3}>
            <CustomButton fullWidth onClick={onConfirmOrderClick}>
              <Typography variant="subtitle1" textTransform="none">
                Confirm Order
              </Typography>
            </CustomButton>
          </Box>
        </Box>
      );
    }
    return <CartEmptyState />;
  };

  if (isSmallScreen) {
    return <SwipeableEdgeDrawer header={<CartHeader />} content={<CartContent />} />;
  }

  return (
    <Box
      width="100%"
      minWidth={360}
      alignSelf="flex-start"
      borderRadius={2}
      px={2}
      py={3}
      sx={{ backgroundColor: '#FFFFFF' }}
    >
      <CartHeader />
      <CartContent />
    </Box>
  );
};

export default ProductCart;

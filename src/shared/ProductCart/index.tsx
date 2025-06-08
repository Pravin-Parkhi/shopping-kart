import React, { useCallback, useMemo } from 'react';
import { Box, CardMedia, Typography, useMediaQuery, useTheme } from '@mui/material';
import CartEmptyState from './CartEmptyState';
import { useCart } from '../../core/CartDataProvider/CartContext';
import CartItem from './CartItem';
import type { CartItem as CartItemType } from '../../data/types/cart';
import CustomButton from '../../components/Button';
import SwipeableEdgeDrawer from '../../components/Drawer';
import CouponWidget from '../CouponWidget';

interface ProductCartProps {
  orderConfirmCallback: () => void;
}

const ProductCart: React.FC<ProductCartProps> = ({ orderConfirmCallback }) => {
  const theme = useTheme();

  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

  const { cartItems, totalCartValue, appliedCoupon, discountedTotal, deleteFromCart } = useCart();

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
        </Box>
      );
    }
    return <CartEmptyState />;
  };

  const CartFooter = () => {
    if (hasItemsInCart) {
      return (
        <Box>
          <Box py={3} display="flex" justifyContent="space-between">
            <Typography variant="h6" color="textSecondary">
              Order Total
            </Typography>
            <Box display="flex" alignItems="center">
              {appliedCoupon && (
                <Typography
                  variant="subtitle1"
                  color="textSecondary"
                  fontWeight={600}
                  sx={{ textDecoration: 'line-through', pr: 1 }}
                >
                  {`$${totalCartValue}`}
                </Typography>
              )}
              <Typography variant="h5" color="textPrimary" fontWeight={600}>
                {`$${discountedTotal}`}
              </Typography>
            </Box>
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
          <Box>
            <CouponWidget />
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

    return null;
  };

  if (isSmallScreen) {
    return (
      <SwipeableEdgeDrawer
        header={<CartHeader />}
        content={<CartContent />}
        footer={<CartFooter />}
      />
    );
  }

  return (
    <Box
      minHeight={400}
      maxHeight={600}
      minWidth={360}
      alignSelf="flex-start"
      display="flex"
      flexDirection="column"
      px={2}
      py={3}
      ml={2}
      sx={{ backgroundColor: '#FFFFFF' }}
    >
      <CartHeader />
      <Box
        sx={{
          flex: 1,
          overflowY: 'auto',
        }}
      >
        <CartContent />
      </Box>

      <CartFooter />
    </Box>
  );
};

export default ProductCart;

import React, { useCallback, useMemo } from 'react';
import { Box, CardMedia, Divider, IconButton, Typography } from '@mui/material';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import type { CartItem as CartItemType } from '../../data/types/cart';

interface CartItemProps {
  cartItem: CartItemType;
  showMedia?: boolean;
  readonly?: boolean;
  deleteCartItemCallback?: (cartItem: CartItemType) => void;
}

const CartItem: React.FC<CartItemProps> = ({
  cartItem,
  showMedia = false,
  readonly = false,
  deleteCartItemCallback,
}) => {
  const { name, price, quantity, image } = cartItem;

  const itemTotalPrice = useMemo(() => price * quantity, [price, quantity]);

  const onDeleteClick = useCallback(() => {
    deleteCartItemCallback?.(cartItem);
  }, [cartItem, deleteCartItemCallback]);

  return (
    <>
      <Box width="100%" display="flex" alignItems="center" justifyContent="space-between" py={2}>
        <Box display="flex" alignItems="center">
          {showMedia && (
            <CardMedia
              component="img"
              height={50}
              sx={{
                objectFit: 'cover',
                width: 'auto',
                borderRadius: 2,
                mr: 2,
              }}
              image={image.thumbnail}
              title="green iguana"
            />
          )}
          <Box>
            <Typography variant="subtitle2" color="textPrimary">
              {name}
            </Typography>
            <Box display="flex" alignItems="center">
              <Typography variant="subtitle1" color="primary" fontWeight={500}>
                {`${quantity}x`}
              </Typography>
              <Typography color="textSecondary" pl={2} sx={{ fontSize: 12 }}>
                {`@ $${price}`}
              </Typography>
              {!readonly && (
                <Typography variant="subtitle2" color="textSecondary" pl={2}>
                  {`= $${itemTotalPrice}`}
                </Typography>
              )}
            </Box>
          </Box>
        </Box>
        {readonly ? (
          <Box color="#635957">
            <Typography variant="subtitle2" color="inherit" fontWeight={600} pl={2}>
              {`= $${itemTotalPrice}`}
            </Typography>
          </Box>
        ) : (
          <Box width="40px" p={1}>
            <IconButton size="small" sx={{ color: 'brown' }} onClick={onDeleteClick}>
              <CancelOutlinedIcon />
            </IconButton>
          </Box>
        )}
      </Box>
      <Divider />
    </>
  );
};

export default CartItem;

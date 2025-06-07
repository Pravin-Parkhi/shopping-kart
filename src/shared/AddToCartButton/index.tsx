import React, { useCallback } from 'react';
import { Button, Box, IconButton, Typography } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

interface AddToCartButtonProps {
  isProductPresetInCart: boolean;
  cartItemQuantity: number;
  addToCartCallback: () => void;
  removeFromCartCallback: () => void;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({
  isProductPresetInCart,
  cartItemQuantity,
  addToCartCallback,
  removeFromCartCallback,
}) => {
  const handleAddClick = useCallback(() => {
    addToCartCallback();
  }, [addToCartCallback]);

  const handleRemoveClick = useCallback(() => {
    removeFromCartCallback();
  }, [removeFromCartCallback]);

  if (isProductPresetInCart) {
    return (
      <Box
        width={180}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: '#c23b0e',
          borderRadius: 10,
          px: 2,
          py: 0.5,
          color: '#fff',
        }}
      >
        <IconButton size="small" onClick={handleRemoveClick} sx={{ color: '#fff' }}>
          <RemoveCircleOutlineIcon />
        </IconButton>
        <Typography variant="subtitle1" fontWeight={500} color="#EAB096">
          {cartItemQuantity}
        </Typography>
        <IconButton size="small" onClick={handleAddClick} sx={{ color: '#fff' }}>
          <ControlPointIcon />
        </IconButton>
      </Box>
    );
  }

  return (
    <Button
      variant="outlined"
      onClick={handleAddClick}
      startIcon={<ShoppingCartIcon color="error" />}
      sx={{
        width: 180,
        borderRadius: 10,
        textTransform: 'none',
        backgroundColor: '#FFFFFF',
        px: 4,
        py: 1.5,
        borderColor: '#B8A1A2',
        color: 'text.primary',
        '&:hover': {
          borderColor: 'primary',
        },
      }}
    >
      <Typography variant="subtitle2" color="textSecondary">
        Add to Cart
      </Typography>
    </Button>
  );
};

export default AddToCartButton;

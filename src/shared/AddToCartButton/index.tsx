import React, { useCallback, useEffect } from 'react';
import { Button, Box, IconButton, Typography } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { motion, useAnimation } from 'framer-motion';

const MotionBox = motion(Box);
const MotionIconButton = motion(IconButton);

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
  const controls = useAnimation();

  const handleAddClick = useCallback(() => {
    addToCartCallback();
  }, [addToCartCallback]);

  const handleRemoveClick = useCallback(() => {
    removeFromCartCallback();
  }, [removeFromCartCallback]);

  useEffect(() => {
    if (isProductPresetInCart) {
      controls.start({
        scale: [1, 1.3, 1],
        transition: { duration: 0.3 },
      });
    }
  }, [cartItemQuantity, controls, isProductPresetInCart]);

  if (isProductPresetInCart) {
    return (
      <MotionBox
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
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        <MotionIconButton
          size="small"
          onClick={handleRemoveClick}
          sx={{ color: 'white' }}
          whileTap={{ scale: 0.85 }}
        >
          <RemoveCircleOutlineIcon />
        </MotionIconButton>

        <motion.div animate={controls}>
          <Typography variant="subtitle1" fontWeight={500} color="#EAB096">
            {cartItemQuantity}
          </Typography>
        </motion.div>

        <MotionIconButton
          size="small"
          onClick={handleAddClick}
          sx={{ color: 'white' }}
          whileTap={{ scale: 0.85 }}
        >
          <ControlPointIcon />
        </MotionIconButton>
      </MotionBox>
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

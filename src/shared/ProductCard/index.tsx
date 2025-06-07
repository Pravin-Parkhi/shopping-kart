import React, { useCallback, useMemo } from 'react';
import type { Product } from '../../data/types/product';
import { Box, CardMedia, Typography, useTheme } from '@mui/material';
import AddToCartButton from '../AddToCartButton';
import { useCart } from '../../core/CartDataProvider/CartContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const theme = useTheme();

  const { name, image, price, category } = product;
  const { cartItems, addToCart, removeFromCart } = useCart();

  const isProductPresetInCart = useMemo(
    () => !!cartItems.find((item) => item.id === product.id),
    [cartItems, product.id]
  );

  const cartItemQuantity = useMemo(
    () => cartItems?.find((item) => item.id === product.id)?.quantity || 0,
    [cartItems, product.id]
  );

  const handleAddToCart = useCallback(() => {
    addToCart(product);
  }, [addToCart, product]);

  const handleRemoveFromCart = useCallback(() => {
    removeFromCart(product);
  }, [removeFromCart, product]);

  return (
    <Box width="100%" p={1} sx={{ borderRadius: 3, overflow: 'hidden' }}>
      <Box position="relative">
        <CardMedia
          component="img"
          height={240}
          image={image.mobile}
          alt={name}
          sx={{
            objectFit: 'cover',
            width: '100%',
            borderRadius: 2,
            border: isProductPresetInCart ? `2px solid ${theme.palette.primary.main}` : '',
          }}
        />
        <Box
          position="absolute"
          bottom={-24}
          left="50%"
          sx={{
            transform: 'translateX(-50%)',
          }}
        >
          <AddToCartButton
            isProductPresetInCart={isProductPresetInCart}
            cartItemQuantity={cartItemQuantity}
            addToCartCallback={handleAddToCart}
            removeFromCartCallback={handleRemoveFromCart}
          />
        </Box>
      </Box>
      <Box pt={2}>
        <Typography variant="subtitle1" color="textSecondary">
          {category}
        </Typography>
        <Typography variant="h5" color="primarySecondary" py={0.5}>
          {name}
        </Typography>
        <Typography variant="subtitle2" color="primary">
          ${price.toFixed(2)}
        </Typography>
      </Box>
    </Box>
  );
};

export default ProductCard;

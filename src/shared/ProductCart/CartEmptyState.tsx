import React from 'react';
import { Box, CardMedia, Typography } from '@mui/material';

const CartEmptyState: React.FC = () => {
  return (
    <Box
      width="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      mt={2}
    >
      <CardMedia
        component="img"
        height={140}
        image="/illustration-empty-cart.svg"
        sx={{
          objectFit: 'cover',
          width: 140,
          borderRadius: 2,
        }}
      />
      <Box pt={2}>
        <Typography variant="body2" textAlign="center" color="textSecondary">
          Your added items will appear here.
        </Typography>
      </Box>
    </Box>
  );
};

export default CartEmptyState;

import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import type { Product } from '../../data/types/product';
import ProductCard from '../../shared/ProductCard';
import CenteredLoader from '../../components/CenteredLoader';
import { getProducts } from '../../data/apis/product';

const ProductList: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [productList, setProductList] = useState<Product[]>([]);

  const fetchProducts = async () => {
    try {
      const products = await getProducts();
      setProductList(products);
      console.log('Products created successfully:', products);
    } catch (err) {
      console.error(err);
      alert('Failed to fetch products. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <Box width="100%">
      <Box pb={2}>
        <Typography variant="h4" fontWeight={600}>
          Desserts
        </Typography>
      </Box>
      <Grid container spacing={{ xs: 1, md: 1 }}>
        {isLoading ? (
          <CenteredLoader width="100%" height="100vh" ensureMinWindowHeight />
        ) : (
          productList.map((product) => (
            <Grid key={product.id} size={{ xs: 12, sm: 6, lg: 4 }}>
              <ProductCard key={product.id} product={product} />
            </Grid>
          ))
        )}
      </Grid>
    </Box>
  );
};

export default ProductList;

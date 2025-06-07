import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import type { Product } from '../../data/types/product';
import ProductCard from '../../shared/ProductCard';
import { getProducts } from '../../data/apis/product';

const ProductList: React.FC = () => {
  const [productList, setProductList] = useState<Product[]>([]);

  const fetchProducts = async () => {
    try {
      const products = await getProducts();
      setProductList(products);
      console.log('Products created successfully:', products);
    } catch (err) {
      console.error(err);
      alert('Failed to fetch products. Please try again.');
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <Box>
      <Typography variant="h4">Desserts</Typography>
      <Grid container spacing={{ xs: 1, md: 1 }}>
        {productList.map((product) => (
          <Grid key={product.id} size={{ xs: 12, sm: 6, md: 4 }}>
            <ProductCard key={product.id} product={product} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ProductList;

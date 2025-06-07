import React from 'react';
import Header from '../../components/Header';
import { Box } from '@mui/material';

interface BaseLayoutProps {
  children: React.ReactNode;
}

const BaseLayout: React.FC<BaseLayoutProps> = (props) => {
  const { children } = props;

  return (
    <Box sx={{ backgroundColor: '#FBF7F4' }}>
      <Header />
      {children}
    </Box>
  );
};

export default BaseLayout;

export type { BaseLayoutProps };

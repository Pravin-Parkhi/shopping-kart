import React from 'react';
import Header from '../../components/Header';
import { Box, useMediaQuery, useTheme } from '@mui/material';

interface BaseLayoutProps {
  children: React.ReactNode;
}

const BaseLayout: React.FC<BaseLayoutProps> = (props) => {
  const { children } = props;

  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ backgroundColor: '#FBF7F4' }}>
      <Header />
      <Box mt={8} mb={isMobile ? 7 : 0}>
        {children}
      </Box>
    </Box>
  );
};

export default BaseLayout;

export type { BaseLayoutProps };

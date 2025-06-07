import { AppBar, Box, Toolbar } from '@mui/material';
import type React from 'react';

const Header: React.FC = () => {
  return (
    <Box width="100%">
      <AppBar position="static">
        <Toolbar variant="dense" />
      </AppBar>
    </Box>
  );
};

export default Header;

import { Box, type BoxProps } from '@mui/material';
import React from 'react';

const CenterContentBox: React.FC<BoxProps> = (props) => (
  <Box display="flex" alignItems="center" justifyContent="center" {...props} />
);

export default CenterContentBox;

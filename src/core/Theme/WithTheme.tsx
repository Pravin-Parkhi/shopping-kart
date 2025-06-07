import React from 'react';
import buildTheme from './buildTheme';
import { ThemeProvider } from '@mui/material';

const theme = buildTheme();

interface WithThemeProps {
  children: React.ReactNode;
}

const WithTheme: React.FC<WithThemeProps> = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default WithTheme;

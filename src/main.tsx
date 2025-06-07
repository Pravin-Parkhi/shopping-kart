import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { CssBaseline } from '@mui/material';
import WithTheme from './core/Theme/WithTheme.tsx';
import { CartDataProvider } from './core/CartDataProvider';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <WithTheme>
      <CssBaseline />
      <CartDataProvider>
        <App />
      </CartDataProvider>
    </WithTheme>
  </StrictMode>
);

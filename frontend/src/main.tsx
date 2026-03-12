import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { ThemeProvider } from '@/app/providers/theme-provider';
import { QueryProvider } from '@/app/providers/query-provider';
import { AppRouterProvider } from '@/app/providers/router-provider';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <QueryProvider>
        <AppRouterProvider />
      </QueryProvider>
    </ThemeProvider>
  </StrictMode>,
);

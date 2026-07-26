// src/App.tsx
//
// Changed: the inline blue theme is replaced by the shared Fabrik
// theme in src/theme.ts so every page inherits the design system.

import { RouterProvider } from '@tanstack/react-router';
import { QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';

import theme from './theme';
import { AuthProvider } from './context/AuthProvider.tsx';
import { queryClient, router } from './router.ts';

// Register things for typesafety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

function App() {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box
          sx={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
          </QueryClientProvider>
        </Box>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;

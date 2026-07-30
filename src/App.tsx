import { RouterProvider } from '@tanstack/react-router';
import { QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider, CssBaseline, Box, CircularProgress } from '@mui/material';

import theme from './theme';
import { AuthProvider } from './context/AuthProvider.tsx';
import { queryClient, router } from './router.ts';
import { useAuth } from './hooks/useAuth.ts';

// Register things for typesafety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

function AppRouter() {
  const auth = useAuth();
  if (auth?.loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress aria-label="Loading…" />
      </Box>
    );
  }
  return (
    <RouterProvider router={router} context={{ isLoggedIn: auth?.isLoggedIn ?? false }} />
  );
}

function App() {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        
        <Box
          sx={{
            minHeight: '200vh',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <QueryClientProvider client={queryClient}>
            <AppRouter />
          </QueryClientProvider>
        </Box>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
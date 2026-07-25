// src/App.tsx
//
// Changed: the inline blue theme is replaced by the shared Fabrik
// theme in src/theme.ts so every page inherits the design system.

import { RouterProvider, createRouter } from '@tanstack/react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { routeTree } from './routeTree.gen';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';

import theme from './theme';

const queryClient = new QueryClient();

const router = createRouter({
  routeTree,
  defaultPreload: false,
  scrollRestoration: true,
  context: { queryClient },

});

// Register things for typesafety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

function App() {
  return (
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
  );
}

export default App;

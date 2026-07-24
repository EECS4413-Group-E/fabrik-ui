import { RouterProvider, createRouter } from '@tanstack/react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { routeTree } from './routeTree.gen';
import { ThemeProvider, createTheme, CssBaseline, Box } from '@mui/material';

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

const theme = createTheme({
  palette: {
    primary: {
      main: '#3b93ff',
    },
  },
});

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

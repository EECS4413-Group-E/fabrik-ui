// src/App.tsx
//
// Changed: the inline blue theme is replaced by the shared Fabrik
// theme in src/theme.ts so every page inherits the design system.

import { RouterProvider } from '@tanstack/react-router';
import { QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider, CssBaseline, Box, CircularProgress, IconButton, Collapse } from '@mui/material';

import theme, { fabrikColors } from './theme';
import { AuthProvider } from './context/AuthProvider.tsx';
import { queryClient, router } from './router.ts';
import { useAuth } from './hooks/useAuth.ts';

import ChatIcon from '@mui/icons-material/Chat';
import { useState } from 'react';

import FabrikAiChat from './routes/-components/FabrikAiChat.tsx';

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
      <Box sx={{ display: 'flex' }}>
        <CircularProgress aria-label="Loading…" />
      </Box>
    );
  }
  return <RouterProvider router={router} context={{ isLoggedIn: auth?.isLoggedIn ?? false }} />;
}

function App() {
  const [chatBoxOpen, setChatBoxOpen] = useState(false);
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
        <Box sx={{ position: 'fixed', bottom: 30, right: 30, zIndex: 1000 }}>
          <Collapse in={chatBoxOpen} timeout="auto" unmountOnExit>
          <FabrikAiChat/>
          </Collapse>
          <IconButton sx={{ height: 65, width: 65, color: 'white', backgroundColor: fabrikColors.mutedCharcoal, '&:hover': { backgroundColor: fabrikColors.charcoal } }} aria-label="Chat with us">
            <ChatIcon />
          </IconButton>
        </Box>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;

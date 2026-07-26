// src/theme.ts
//
// Shared Fabrik design system, based on Kirill's Figma Make design:
// parchment ground, charcoal type, terracotta accent, Italiana display
// + Jost body, square corners everywhere.
//
// Every page should inherit from this theme instead of styling colors
// and fonts locally.

import { createTheme } from '@mui/material';

export const fabrikColors = {
  parchment: '#f7f4ef',
  linen: '#efeae2',
  charcoal: '#2b2926',
  mutedCharcoal: '#6f6a63',
  terracotta: '#c4845a',
  terracottaDark: '#a96e48',
  border: '#dcd6cc',
} as const;

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: fabrikColors.terracotta,
      dark: fabrikColors.terracottaDark,
      contrastText: '#ffffff',
    },
    background: {
      default: fabrikColors.parchment,
      paper: fabrikColors.linen,
    },
    text: {
      primary: fabrikColors.charcoal,
      secondary: fabrikColors.mutedCharcoal,
    },
    divider: fabrikColors.border,
  },

  shape: {
    borderRadius: 0,
  },

  typography: {
    fontFamily: "'Jost', sans-serif",

    h1: {
      fontFamily: "'Italiana', serif",
      fontSize: '2.75rem',
      letterSpacing: '0.04em',
    },
    h2: {
      fontFamily: "'Italiana', serif",
      fontSize: '2.125rem',
      letterSpacing: '0.04em',
    },
    h3: {
      fontFamily: "'Italiana', serif",
      fontSize: '1.625rem',
      letterSpacing: '0.03em',
    },
    h6: {
      fontFamily: "'Italiana', serif",
      letterSpacing: '0.12em',
    },
    button: {
      textTransform: 'uppercase',
      letterSpacing: '0.08em',
      fontWeight: 500,
    },
  },

  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: fabrikColors.parchment,
          color: fabrikColors.charcoal,
          boxShadow: 'none',
          borderBottom: `1px solid ${fabrikColors.border}`,
        },
      },
    },

    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
    },

    MuiTextField: {
      defaultProps: {
        size: 'small',
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: fabrikColors.linen,
          border: `1px solid ${fabrikColors.border}`,
          boxShadow: 'none',
        },
      },
    },

    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          letterSpacing: '0.06em',
        },
      },
    },
  },
});

export default theme;

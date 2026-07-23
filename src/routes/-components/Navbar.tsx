import {
  type FormEvent,
  useState,
} from 'react';

import {
  Link,
  useNavigate,
} from '@tanstack/react-router';

import {
  AppBar,
  Box,
  Button,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material';

const navigationLinkStyle = {
  color: '#ffffff',
  textDecoration: 'none',
  fontWeight: 500,
  whiteSpace: 'nowrap' as const,
};

const Navbar = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    const trimmedSearch = searchTerm.trim();

    navigate({
      to: '/products',
      search: trimmedSearch
        ? { search: trimmedSearch }
        : {},
    });
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: '#4b78c8',
      }}
    >
      <Toolbar
        sx={{
          display: 'flex',
          gap: 3,
          py: 1,
          flexWrap: 'wrap',
        }}
      >
        <Link
          to="/"
          style={{
            color: '#ffffff',
            textDecoration: 'none',
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              letterSpacing: 1,
            }}
          >
            FABRIK
          </Typography>
        </Link>

        <Box
          component="form"
          onSubmit={handleSearch}
          sx={{
            display: 'flex',
            flex: '1 1 320px',
            maxWidth: 600,
            gap: 1,
          }}
        >
          <TextField
            value={searchTerm}
            onChange={(event) =>
              setSearchTerm(event.target.value)
            }
            placeholder="Search products"
            size="small"
            fullWidth
            slotProps={{
              htmlInput: {
                'aria-label': 'Search products',
              },
            }}
            sx={{
              backgroundColor: '#ffffff',
              borderRadius: 1,
            }}
          />

          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: '#ffffff',
              color: '#3564b4',
              '&:hover': {
                backgroundColor: '#f1f4fa',
              },
            }}
          >
            Search
          </Button>
        </Box>

        <Box
          component="nav"
          aria-label="Main navigation"
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            flexWrap: 'wrap',
          }}
        >
          <Link
            to="/products"
            style={navigationLinkStyle}
          >
            Products
          </Link>

          <Link
            to="/wishlist"
            style={navigationLinkStyle}
          >
            Wishlist
          </Link>

          <Link
            to="/orders"
            style={navigationLinkStyle}
          >
            Orders
          </Link>

          <Link
            to="/cart"
            style={navigationLinkStyle}
          >
            Cart
          </Link>

          <Link
            to="/user"
            style={navigationLinkStyle}
          >
            Account
          </Link>

          <Link
            to="/login"
            style={navigationLinkStyle}
          >
            Login
          </Link>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
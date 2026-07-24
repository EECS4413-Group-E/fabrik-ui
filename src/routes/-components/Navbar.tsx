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
  IconButton,
  InputBase,
  Toolbar,
  Typography,
} from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PersonOutlineIcon from '@mui/icons-material/PersonOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';

import { fabrikColors } from '../../theme';

const DEPARTMENT_LINKS = [
  { label: 'Men', department: 'MENS' },
  { label: 'Women', department: 'WOMENS' },
  { label: 'Other', department: 'OTHER' },
] as const;

const textLinkStyle = {
  color: fabrikColors.charcoal,
  textDecoration: 'none',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.1em',
  fontSize: '0.8rem',
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
    <AppBar position="sticky">
      <Toolbar
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 3,
          py: 1.5,
          flexWrap: 'wrap',
        }}
      >
        <Link
          to="/"
          style={{
            color: fabrikColors.charcoal,
            textDecoration: 'none',
          }}
        >
          <Typography variant="h6" component="span">
            FABRIK
          </Typography>
        </Link>

        <Box
          component="nav"
          aria-label="Shop departments"
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2.5,
          }}
        >
          {DEPARTMENT_LINKS.map(
            ({ label, department }) => (
              <Link
                key={department}
                to="/products"
                style={textLinkStyle}
              >
                {label}
              </Link>
            ),
          )}
        </Box>

        <Box
          component="form"
          onSubmit={handleSearch}
          sx={{
            display: 'flex',
            alignItems: 'center',
            flex: '1 1 280px',
            maxWidth: 480,
            px: 1.5,
            py: 0.5,
            gap: 1,
            backgroundColor: '#ffffff',
            border: `1px solid ${fabrikColors.border}`,
          }}
        >
          <SearchIcon
            fontSize="small"
            sx={{ color: fabrikColors.mutedCharcoal }}
          />

          <InputBase
            value={searchTerm}
            onChange={(event) =>
              setSearchTerm(event.target.value)
            }
            placeholder="Search products"
            fullWidth
            inputProps={{
              'aria-label': 'Search products',
            }}
            sx={{ fontSize: '0.9rem' }}
          />
        </Box>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            marginLeft: 'auto',
          }}
        >
          <Link to="/orders" style={textLinkStyle}>
            Orders
          </Link>

          <IconButton
            component={Link}
            to="/wishlist"
            aria-label="Wishlist"
            sx={{ color: fabrikColors.charcoal }}
          >
            <FavoriteBorderIcon fontSize="small" />
          </IconButton>

          <IconButton
            component={Link}
            to="/user"
            aria-label="Account"
            sx={{ color: fabrikColors.charcoal }}
          >
            <PersonOutlineIcon fontSize="small" />
          </IconButton>

          <IconButton
            component={Link}
            to="/cart"
            aria-label="Shopping cart"
            sx={{ color: fabrikColors.charcoal }}
          >
            <ShoppingBagOutlinedIcon fontSize="small" />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

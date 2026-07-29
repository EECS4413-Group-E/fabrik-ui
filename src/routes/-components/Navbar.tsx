import { type SubmitEvent, type MouseEvent, useState } from 'react';
import { Link, useNavigate } from '@tanstack/react-router';

import {
  AppBar,
  Badge,
  Box,
  Button,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  Toolbar,
} from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';
import PersonOutlineIcon from '@mui/icons-material/PersonOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';

import { fabrikColors } from '../../theme';
import { useCart } from '../../hooks/useCart.ts';
import { useAuth } from '../../hooks/useAuth.ts';
import { useLogoutMutation } from '../../mutations.ts';
import type { ClothingCategory, DepartmentCategory } from '../../models/Filter.ts';

const CATEGORIES = [
  'SHOP ALL',
  'JEAN',
  'PANT',
  'SHORT',
  'SHIRT',
  'SWEATER',
  'BAG',
  'SHOES',
  'HAT',
] as const;

const Navbar = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const { data } = useCart();
  const [searchTerm, setSearchTerm] = useState('');
  const [userMenuAnchor, setUserMenuAnchor] = useState<HTMLElement | null>(null);
  const [mensMenuAnchor, setMensMenuAnchor] = useState<HTMLElement | null>(null);
  const [womensMenuAnchor, setWomensMenuAnchor] = useState<HTMLElement | null>(null);

  const { mutate } = useLogoutMutation();

  const handleSearch = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedSearch = searchTerm.trim();

    navigate({
      to: '/search',
      search: {
        keyword: trimmedSearch,
        pageNumber: 0,
        pageSize: 10,
      },
    });
  };

  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setUserMenuAnchor(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setUserMenuAnchor(null);
  };

  const handleOpenMensMenu = (event: MouseEvent<HTMLElement>) => {
    setMensMenuAnchor(event.currentTarget);
  };

  const handleCloseMensMenu = () => {
    setMensMenuAnchor(null);
  };

  const handleOpenWomensMenu = (event: MouseEvent<HTMLElement>) => {
    setWomensMenuAnchor(event.currentTarget);
  };

  const handleCloseWomensMenu = () => {
    setWomensMenuAnchor(null);
  };

  const handleCategoryClick = (
    department: 'MENS' | 'WOMENS' | 'OTHER' | '',
    category: ClothingCategory | 'SHOP ALL',
  ) => {
    //TODO: add logic for filtering products by category and gender

    navigate({
      to: '/products',
      search: {
        department: department === '' ? undefined : department,
        category: category === 'SHOP ALL' ? undefined : category,
      },
    });
    handleCloseMensMenu();
    handleCloseWomensMenu();
  };

  return (
    <AppBar sx={{ height: '10vh' }} position="sticky">
      <Toolbar
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 3,
          py: 1.5,
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            left: 32,
            display: 'flex',
            alignItems: 'center',
            gap: 2.5,
          }}
          component="nav"
          aria-label="Shop departments"
        >
          <Button
            id="mens-menu-button"
            onClick={handleOpenMensMenu}
            onMouseOver={handleOpenMensMenu}
            variant="text"
            sx={{
              color: fabrikColors.charcoal,
              textDecoration: 'none',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              fontSize: '0.8rem',
              fontWeight: 400,
              padding: 0,
              '&:hover': {
                backgroundColor: 'transparent',
              },
            }}
          >
            Men
          </Button>
          <Menu
            id="mens-menu"
            anchorEl={mensMenuAnchor}
            open={Boolean(mensMenuAnchor)}
            onClose={handleCloseMensMenu}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            slotProps={{
              paper: {
                sx: {
                  marginTop: '8px',
                },
              },
              list: {
                onMouseLeave: handleCloseMensMenu,
              },
            }}
          >
            {CATEGORIES.map((category) => (
              <MenuItem key={category} onClick={() => handleCategoryClick('MENS', category)}>
                {category}
              </MenuItem>
            ))}
          </Menu>

          <Button
            id="womens-menu-button"
            onClick={handleOpenWomensMenu}
            variant="text"
            onMouseOver={handleOpenWomensMenu}
            sx={{
              color: fabrikColors.charcoal,
              textDecoration: 'none',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              fontSize: '0.8rem',
              fontWeight: 400,
              padding: 0,
              '&:hover': {
                backgroundColor: 'transparent',
              },
            }}
          >
            Women
          </Button>
          <Menu
            id="womens-menu"
            anchorEl={womensMenuAnchor}
            open={Boolean(womensMenuAnchor)}
            onClose={handleCloseWomensMenu}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            slotProps={{
              paper: {
                sx: {
                  marginTop: '8px',
                },
              },
              list: {
                onMouseLeave: handleCloseWomensMenu,
              },
            }}
          >
            {CATEGORIES.map((category) => (
              <MenuItem key={category} onClick={() => handleCategoryClick('WOMENS', category)}>
                {category}
              </MenuItem>
            ))}
          </Menu>
          <Button
            id="others-button"
            onClick={() => handleCategoryClick('OTHER', 'SHOP ALL')}
            variant="text"
            sx={{
              color: fabrikColors.charcoal,
              textDecoration: 'none',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              fontSize: '0.8rem',
              fontWeight: 400,
              padding: 0,
              '&:hover': {
                backgroundColor: 'transparent',
              },
            }}
          >
            Other
          </Button>
          <Button
            id="deals-button"
            component={Link}
            to="/products?deals=true"
            variant="text"
            sx={{
              color: fabrikColors.charcoal,
              textDecoration: 'none',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              fontSize: '0.8rem',
              fontWeight: 400,
              padding: 0,
              '&:hover': {
                backgroundColor: 'transparent',
              },
            }}
          >
            HOT DEALS
          </Button>
        </Box>

        <Button
          component={Link}
          to="/"
          variant="text"
          sx={{
            color: fabrikColors.charcoal,
            textDecoration: 'none',
            fontFamily: "'Italiana', serif",
            fontSize: '2rem',
            padding: 0,
            '&:hover': {
              backgroundColor: 'transparent',
            },
          }}
        >
          FABRIK
        </Button>

        <Box
          sx={{
            position: 'absolute',
            right: 32,
            display: 'flex',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Box
            component="form"
            onSubmit={handleSearch}
            sx={{
              display: 'flex',
              alignItems: 'center',
              flex: '1 1 280px',
              width: 200,
              px: 1.5,
              py: 0.5,
              gap: 1,
              backgroundColor: '#ffffff',
              border: `1px solid ${fabrikColors.border}`,
            }}
          >
            <SearchIcon fontSize="small" sx={{ color: fabrikColors.mutedCharcoal }} />

            <InputBase
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search products"
              fullWidth
            />
          </Box>

          <Badge badgeContent={data?.length ?? 0} color="primary" overlap={'circular'}>
            <IconButton
              component={Link}
              to="/cart"
              aria-label="Shopping cart"
              sx={{ color: fabrikColors.charcoal }}
            >
              <ShoppingBagOutlinedIcon fontSize="small" />
            </IconButton>
          </Badge>

          <IconButton
            id="account-menu-button"
            onClick={
              isLoggedIn
                ? handleOpenUserMenu
                : () => {
                    navigate({ to: '/login' });
                  }
            }
            onMouseOver={isLoggedIn ? handleOpenUserMenu : undefined}
            aria-label="Account"
            sx={{ color: fabrikColors.charcoal }}
          >
            <PersonOutlineIcon fontSize="small" />
          </IconButton>

          <Menu
            id="account-menu"
            anchorEl={userMenuAnchor}
            open={Boolean(userMenuAnchor)}
            onClose={handleCloseUserMenu}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            slotProps={{
              paper: {
                sx: {
                  marginTop: '8px',
                },
              },
              list: {
                onMouseLeave: handleCloseUserMenu,
              },
            }}
          >
            <MenuItem component={Link} to="/user" preload={false} onClick={handleCloseUserMenu}>
              View User
            </MenuItem>
            <MenuItem component={Link} to="/orders" preload={false} onClick={handleCloseUserMenu}>
              Orders
            </MenuItem>
            <MenuItem component={Link} to="/wishlist" preload={false} onClick={handleCloseUserMenu}>
              Wishlist
            </MenuItem>
            <MenuItem
              component={Link}
              preload={false}
              onClick={() => {
                handleCloseUserMenu();
                mutate();
              }}
            >
              Sign Out
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

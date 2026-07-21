import { Link } from '@tanstack/react-router';
import { Box, Typography } from '@mui/material';

const HomePage = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, p: 2, alignItems: 'center' }}>
      <Typography variant={'h1'}>Home Page</Typography>
      <Link to="/user">View User</Link>
      <Link to="/login">Login</Link>
      <Link to="/products">Products</Link>
      <Link to="/wishlist">Wishlist</Link>
      <Link to="/cart">Shopping Cart</Link>
    </Box>
  );
};

export default HomePage;

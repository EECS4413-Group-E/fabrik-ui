import { Link } from '@tanstack/react-router';

const Navbar = () => {
  return (
    <nav style={{ display: 'flex', gap: '1rem', padding: '1rem', background: '#eee' }}>
      <Link to="/">Home</Link>
      <Link to="/login">Login</Link>
      <Link to="/user">User</Link>
      <Link to="/wishlist">Wishlist</Link>
      <Link to="/orders">Orders</Link>
      <Link to="/cart">Cart</Link>
    </nav>
  );
};

export default Navbar;

import { Link } from "@tanstack/react-router";

const HomePage = () => {
  return (
    <div>
      <h1>Home Page</h1>

      <Link to="/user">View User</Link>
      <div />

      <Link to="/login">Login</Link>
      <div />

      <Link to="/products">Products</Link>
      <div />

      <Link to="/wishlist">Wishlist</Link>
      <div />

      <Link to="/cart">Shopping Cart</Link>
    </div>
  );
};

export default HomePage;

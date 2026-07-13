import Navbar from './Navbar.tsx';
import { Outlet } from '@tanstack/react-router';

const RootComponent = () => (
  <>
    <Navbar />
    <Outlet />
  </>
);

export default RootComponent;

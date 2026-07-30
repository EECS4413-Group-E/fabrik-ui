import Navbar from './Navbar.tsx';
import { Outlet } from '@tanstack/react-router';
import ToggleChat from './ToggleChat.tsx';

const RootComponent = () => (
  <>
    <Navbar />
    <Outlet />
    <ToggleChat />
  </>
);

export default RootComponent;

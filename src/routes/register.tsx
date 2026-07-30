import { createFileRoute } from '@tanstack/react-router';
import RegisterPage from './-components/RegisterPage';

export const Route = createFileRoute('/register')({
  staticData: {
    hideChat: true,
  },
  component: RegisterPage,
});

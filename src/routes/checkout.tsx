import { createFileRoute } from '@tanstack/react-router';
import CheckoutPage from './-components/CheckoutPage';

export const Route = createFileRoute('/checkout')({
  staticData: {
    hideChat: true,
  },
  component: CheckoutPage,
});

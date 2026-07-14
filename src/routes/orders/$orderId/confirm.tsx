import { createFileRoute } from '@tanstack/react-router';
import OrderConfirmation from '../-components/OrderConfirmation.tsx';
import { orderDetailsQueryOptions } from '../../../queries.ts';

export const Route = createFileRoute('/orders/$orderId/confirm')({
  component: OrderConfirmation,
  loader: ({ context: { queryClient }, params: { orderId } }) => {
    queryClient.ensureQueryData(orderDetailsQueryOptions(orderId));
  },
});

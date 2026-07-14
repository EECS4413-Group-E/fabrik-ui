import { createFileRoute } from '@tanstack/react-router';
import OrderDetails from '../-components/OrderDetails.tsx';
import { orderDetailsQueryOptions } from '../../../queries.ts';

export const Route = createFileRoute('/orders/$orderId/')({
  component: OrderDetails,
  loader: ({ context: { queryClient }, params: { orderId } }) => {
    queryClient.ensureQueryData(orderDetailsQueryOptions(orderId));
  },
});

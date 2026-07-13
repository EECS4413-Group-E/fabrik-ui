import { createFileRoute } from '@tanstack/react-router';
import OrderHistory from './-components/OrderHistory.tsx';
import { ordersQueryOptions } from '../../queries.ts';

export const Route = createFileRoute('/orders/')({
  component: OrderHistory,
  loader: ({ context: { queryClient } }) => {
    queryClient.ensureQueryData(ordersQueryOptions());
  },
});

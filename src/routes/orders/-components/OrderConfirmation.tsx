import { useParams } from '@tanstack/react-router';
import { useSuspenseQuery } from '@tanstack/react-query';
import { orderDetailsQueryOptions } from '../../../queries.ts';
import OrderItemSummary from './OrderItemSummary.tsx';
import { Box, Typography } from '@mui/material';

const OrderConfirmation = () => {
  const { orderId } = useParams({ from: '/orders/$orderId/confirm' });

  const { data: orderDetails } = useSuspenseQuery(orderDetailsQueryOptions(orderId));

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
      <Typography variant={'h1'}>Thank you for your purchase!</Typography>
      <Box>Order number: {orderDetails.orderNumber}</Box>
      <OrderItemSummary order={orderDetails} />
    </Box>
  );
};

export default OrderConfirmation;

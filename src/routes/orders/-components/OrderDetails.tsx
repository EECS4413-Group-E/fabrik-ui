import { useParams } from '@tanstack/react-router';
import { useSuspenseQuery } from '@tanstack/react-query';
import { orderDetailsQueryOptions } from '../../../queries.ts';
import OrderItemSummary from './OrderItemSummary.tsx';

const OrderDetails = () => {
  const { orderId } = useParams({ from: '/orders/$orderId/' });

  const { data: orderDetails } = useSuspenseQuery(orderDetailsQueryOptions(orderId));

  return (
    <div>
      <div>
        <h1>Order Details</h1>
        <div />
        <div>Order number: {orderDetails.orderNumber}</div>
        <OrderItemSummary orderItems={orderDetails.items} />
      </div>
    </div>
  );
};

export default OrderDetails;

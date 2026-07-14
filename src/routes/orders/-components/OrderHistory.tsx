import { useSuspenseQuery } from '@tanstack/react-query';
import { ordersQueryOptions } from '../../../queries.ts';
import { Link } from '@tanstack/react-router';

const OrderHistory = () => {
  const { data: orders } = useSuspenseQuery(ordersQueryOptions());

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <table>
        <thead>
          <tr>
            <th>Order Number</th>
            <th>Status</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.orderNumber}</td>
              <td>{order.shippingDetails.shippingStatus}</td>
              <td>{order.totalPrice}</td>
              <td>
                <Link to={'/orders/$orderId'} params={{ orderId: order.id }}>
                  Details
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderHistory;

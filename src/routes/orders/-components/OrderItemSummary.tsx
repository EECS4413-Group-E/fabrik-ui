import type { OrderItem } from '../../../models/Order.ts';

type OrderItemSummaryProps = {
  orderItems: OrderItem[];
};

const OrderItemSummary = ({ orderItems }: OrderItemSummaryProps) => {
  const orderTotal = orderItems.reduce((total, item) => total + item.quantity * item.price, 0);

  return (
    <section
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}
    >
      <h2>Order Summary</h2>

      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Color</th>
            <th>Size</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Subtotal</th>
          </tr>
        </thead>

        <tbody>
          {orderItems.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.colorName}</td>
              <td>{item.size}</td>
              <td>{item.quantity}</td>
              <td>${item.price.toFixed(2)}</td>
              <td>${(item.quantity * item.price).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p>
        <strong>Total:</strong> ${orderTotal.toFixed(2)}
      </p>
    </section>
  );
};

export default OrderItemSummary;

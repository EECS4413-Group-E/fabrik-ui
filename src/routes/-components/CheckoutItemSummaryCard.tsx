import type { CartItem } from "../../models/CartItem";

interface CheckoutItemSummaryCardProps {
  checkoutItems: CartItem[];
}

const CheckoutItemSummaryCard = ({
  checkoutItems,
}: CheckoutItemSummaryCardProps) => {
  const orderTotal = checkoutItems.reduce(
    (total, item) =>
      total + item.quantity * item.price,
    0,
  );

  return (
    <section>
      <h2>Order Summary</h2>

      <table>
        <thead>
          <tr>
            <th>Image</th>
            <th>Product</th>
            <th>Description</th>
            <th>Colour</th>
            <th>Size</th>
            <th>SKU</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Subtotal</th>
          </tr>
        </thead>

        <tbody>
          {checkoutItems.map((item) => (
            <tr key={item.id}>
              <td>
                {item.imageLink ? (
                  <img
                    src={item.imageLink}
                    alt={item.name}
                    width={80}
                  />
                ) : (
                  "No image"
                )}
              </td>

              <td>{item.name}</td>
              <td>{item.description}</td>
              <td>{item.colorName}</td>
              <td>{item.size}</td>
              <td>{item.sku}</td>
              <td>{item.quantity}</td>
              <td>${item.price.toFixed(2)}</td>

              <td>
                $
                {(
                  item.quantity * item.price
                ).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <p>
        <strong>
          Total: ${orderTotal.toFixed(2)}
        </strong>
      </p>
    </section>
  );
};

export default CheckoutItemSummaryCard;
import type { CartItem } from "../../models/CartItem";

interface CheckoutItemSummaryCardProps {
  checkoutItems: CartItem[];
}

const CheckoutItemSummaryCard = ({
  checkoutItems,
}: CheckoutItemSummaryCardProps) => {
  const orderTotal = checkoutItems.reduce(
    (total, item) => total + item.quantity * item.price,
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
            <th>Category</th>
            <th>Color</th>
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
                <img src={item.imageLink} alt={item.productName} width="80" />
              </td>
              <td>{item.productName}</td>
              <td>{item.productDescription}</td>
              <td>
                {item.departmentCategory} / {item.clothingCategory}
              </td>
              <td>
                {item.colorName} ({item.colorCategory})
              </td>
              <td>{item.size}</td>
              <td>{item.sku}</td>
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

export default CheckoutItemSummaryCard;

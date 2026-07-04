import type { CartItem } from "../../models/CartItem";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { addOrder } from "../../Api";
import { PaymentMethod, type CheckoutFormValues } from "../../models/Checkout";
import { OrderStatus, type CreateOrderRequest } from "../../models/Order";

const TEMP_USER_ID = "8ecf8276-e555-41cc-b2ba-e42353dc72b4";

// Temporary hardcoded cart items until the shopping cart page is connected
const checkoutItems: CartItem[] = [
  {
    id: "36299f29-e585-478b-ad9d-0019450c14ae",
    clothingCategory: "OTHER",
    departmentCategory: "OTHER",
    productDescription: "Goat",
    productName: "Messi Jersey",
    size: "L",
    colorName: "Blue",
    colorCategory: "Blue",
    imageLink: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSajKaXR50x3qV73W5SE8Fm3ia5xK1zJki8SOSkVkOR4w&s=10",
    price: 1000.0,
    sku: "00000021",
    quantity: 1,
  },
];

const orderTotal = checkoutItems.reduce(
  (total, item) => total + item.quantity * item.price,
  0,
);

const getErrorMessage = (error: unknown) => {
  const possibleApiError = error as {
    response?: {
      data?: {
        error?: string;
      };
    };
  };

  return possibleApiError.response?.data?.error ?? "Unable to place order.";
};

const CheckoutPage = () => {
  const placeOrderMutation = useMutation({
    mutationFn: addOrder,
    onSuccess: (createdOrder) => {
      window.location.href = `/order-details/${createdOrder.id}`;
    },
  });

  const form = useForm({
    defaultValues: {
      userId: TEMP_USER_ID,
      paymentMethod: PaymentMethod.CreditCard,
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      paypalEmail: "",
    } as CheckoutFormValues,
    onSubmit: async ({ value }) => {
      const orderRequest: CreateOrderRequest = {
        userId: value.userId,
        totalPrice: orderTotal,
        orderStatus: OrderStatus.Preparing,
        orderItems: checkoutItems.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
          price: item.price,
        })),
      };

      placeOrderMutation.mutate(orderRequest);
    },
  });

  return (
    <main>
      <h1>Checkout</h1>

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
          <img
            src={item.imageLink}
            alt={item.productName}
            width="80"
          />
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

      <hr />

      <section>
        <h2>Payment Details</h2>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <form.Field
            name="userId"
            validators={{
              onChange: ({ value }) => {
                if (!value) {
                  return "User ID is required";
                }

                return undefined;
              },
            }}
          >
            {(field) => (
              <div>
                <label htmlFor={field.name}>User ID:</label>
                <br />
                <input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  size={45}
                />
                {field.state.meta.errors.map((err) => (
                  <div key={err}>{err}</div>
                ))}
              </div>
            )}
          </form.Field>

          <br />

          <form.Field name="paymentMethod">
            {(field) => (
              <div>
                <p>Payment Method:</p>

                <label>
                  <input
                    type="radio"
                    name={field.name}
                    value={PaymentMethod.CreditCard}
                    checked={field.state.value === PaymentMethod.CreditCard}
                    onBlur={field.handleBlur}
                    onChange={() => field.handleChange(PaymentMethod.CreditCard)}
                  />
                  Credit Card
                </label>

                <br />

                <label>
                  <input
                    type="radio"
                    name={field.name}
                    value={PaymentMethod.PayPal}
                    checked={field.state.value === PaymentMethod.PayPal}
                    onBlur={field.handleBlur}
                    onChange={() => field.handleChange(PaymentMethod.PayPal)}
                  />
                  PayPal
                </label>
              </div>
            )}
          </form.Field>

          <br />

          <form.Subscribe selector={(state) => state.values.paymentMethod}>
            {(paymentMethod) =>
              paymentMethod === PaymentMethod.CreditCard ? (
                <fieldset>
                  <legend>Credit Card Information</legend>

                  <form.Field
                    name="cardNumber"
                    validators={{
                      onChange: ({ value }) => {
                        if (!value) {
                          return "Card number is required";
                        }

                        return undefined;
                      },
                    }}
                  >
                    {(field) => (
                      <div>
                        <label htmlFor={field.name}>Card Number:</label>
                        <br />
                        <input
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                        />
                        {field.state.meta.errors.map((err) => (
                          <div key={err}>{err}</div>
                        ))}
                      </div>
                    )}
                  </form.Field>

                  <br />

                  <form.Field
                    name="expiryDate"
                    validators={{
                      onChange: ({ value }) => {
                        if (!value) {
                          return "Expiry date is required";
                        }

                        return undefined;
                      },
                    }}
                  >
                    {(field) => (
                      <div>
                        <label htmlFor={field.name}>Expiry Date:</label>
                        <br />
                        <input
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          placeholder="MM/YY"
                        />
                        {field.state.meta.errors.map((err) => (
                          <div key={err}>{err}</div>
                        ))}
                      </div>
                    )}
                  </form.Field>

                  <br />

                  <form.Field
                    name="cvv"
                    validators={{
                      onChange: ({ value }) => {
                        if (!value) {
                          return "CVV is required";
                        }

                        return undefined;
                      },
                    }}
                  >
                    {(field) => (
                      <div>
                        <label htmlFor={field.name}>CVV:</label>
                        <br />
                        <input
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                        />
                        {field.state.meta.errors.map((err) => (
                          <div key={err}>{err}</div>
                        ))}
                      </div>
                    )}
                  </form.Field>
                </fieldset>
              ) : (
                <fieldset>
                  <legend>PayPal Information</legend>

                  <form.Field
                    name="paypalEmail"
                    validators={{
                      onChange: ({ value }) => {
                        if (!value) {
                          return "PayPal email is required";
                        }

                        return undefined;
                      },
                    }}
                  >
                    {(field) => (
                      <div>
                        <label htmlFor={field.name}>PayPal Email:</label>
                        <br />
                        <input
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          type="email"
                        />
                        {field.state.meta.errors.map((err) => (
                          <div key={err}>{err}</div>
                        ))}
                      </div>
                    )}
                  </form.Field>
                </fieldset>
              )
            }
          </form.Subscribe>

          <br />

          <button type="submit" disabled={placeOrderMutation.isPending}>
            {placeOrderMutation.isPending ? "Placing Order..." : "Place Order"}
          </button>
        </form>

        {placeOrderMutation.isError && (
          <p>
            <strong>Error:</strong> {getErrorMessage(placeOrderMutation.error)}
          </p>
        )}
      </section>
    </main>
  );
};

export default CheckoutPage;
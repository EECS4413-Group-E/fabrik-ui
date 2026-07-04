import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { placeOrder } from "../../Api";
import type { CartItem } from "../../models/CartItem";
import { PaymentMethod, type CheckoutFormValues } from "../../models/Checkout";
import type { PlaceOrderRequest } from "../../models/Order";
import CheckoutItemSummaryCard from "./CheckoutItemSummaryCard";
import CheckoutPaymentCard from "./CheckoutPaymentCard";

const TEMP_USER_ID = "8ecf8276-e555-41cc-b2ba-e42353dc72b4";

// Temporary hardcoded cart items until the shopping cart page is connected.
// This follows the flattened cart item shape discussed with the team lead.
const checkoutItems: CartItem[] = [
  {
    id: "36299f29-e585-478b-ad9d-0019450c14ae",
    clothingCategory: "OTHER",
    departmentCategory: "OTHER",
    productDescription: "GOAT",
    productName: "Messi Jersey",
    size: "L",
    colorName: "BlUE",
    colorCategory: "BLUE",
    imageLink:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSajKaXR50x3qV73W5SE8Fm3ia5xK1zJki8SOSkVkOR4w&s=10",
    price: 1000.0,
    sku: "00000021",
    quantity: 1,
  },
];

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
    mutationFn: placeOrder,
    onSuccess: (createdOrderId) => {
      window.location.href = `/order-details/${createdOrderId}`;
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
      const paymentDetails =
        value.paymentMethod === PaymentMethod.CreditCard
          ? {
              paymentMethod: value.paymentMethod,
              cardNumber: value.cardNumber,
              expiryDate: value.expiryDate,
              cvv: value.cvv,
            }
          : {
              paymentMethod: value.paymentMethod,
              paypalEmail: value.paypalEmail,
            };

      const orderRequest: PlaceOrderRequest = {
        userId: value.userId,
        orderItems: checkoutItems.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
          price: item.price,
        })),
        paymentDetails,
      };

      placeOrderMutation.mutate(orderRequest);
    },
  });

  return (
    <main>
      <h1>Checkout</h1>

      <CheckoutItemSummaryCard checkoutItems={checkoutItems} />

      <hr />

      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <CheckoutPaymentCard form={form} />

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
    </main>
  );
};

export default CheckoutPage;

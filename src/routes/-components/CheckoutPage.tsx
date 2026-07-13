import { Link } from "@tanstack/react-router";
import { useForm } from "@tanstack/react-form";
import {
  useMutation,
  useQuery,
} from "@tanstack/react-query";

import { placeOrder } from "../../Api";
import { cartQueryOptions } from "../../queries";
import { useClearCartMutation } from "../../mutations";

import {
  PaymentMethod,
  type CheckoutFormValues,
} from "../../models/Checkout";

import type { PlaceOrderRequest } from "../../models/Order";

import CheckoutItemSummaryCard from "./CheckoutItemSummaryCard";
import CheckoutPaymentCard from "./CheckoutPaymentCard";

const TEMP_USER_ID =
  "8ecf8276-e555-41cc-b2ba-e42353dc72b4";

const getErrorMessage = (error: unknown) => {
  const possibleApiError = error as {
    response?: {
      data?: {
        error?: string;
      };
    };
  };

  return (
    possibleApiError.response?.data?.error ??
    "Unable to place order."
  );
};

const CheckoutPage = () => {
  const cartQuery = useQuery(cartQueryOptions());
  const clearCartMutation = useClearCartMutation();

  const checkoutItems = cartQuery.data ?? [];

  const placeOrderMutation = useMutation({
    mutationFn: placeOrder,

    onSuccess: async (createdOrderId) => {
      try {
        await clearCartMutation.mutateAsync();
      } finally {
        window.location.href =
          `/order-details/${createdOrderId}`;
      }
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
      if (checkoutItems.length === 0) {
        return;
      }

      const paymentDetails =
        value.paymentMethod ===
        PaymentMethod.CreditCard
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
          productId: item.productId,
          size: item.size,
          quantity: item.quantity,
        })),

        paymentDetails,
      };

      placeOrderMutation.mutate(orderRequest);
    },
  });

  if (cartQuery.isLoading) {
    return <p>Loading checkout...</p>;
  }

  if (cartQuery.isError) {
    return (
      <main>
        <h1>Checkout</h1>

        <p>
          Error loading cart:{" "}
          {getErrorMessage(cartQuery.error)}
        </p>
      </main>
    );
  }

  if (checkoutItems.length === 0) {
    return (
      <main>
        <h1>Checkout</h1>

        <p>Your shopping cart is empty.</p>

        <Link to="/products">
          Continue Shopping
        </Link>
      </main>
    );
  }

  return (
    <main>
      <h1>Checkout</h1>

      <CheckoutItemSummaryCard
        checkoutItems={checkoutItems}
      />

      <p>
        Product availability and final prices will be
        checked by the server when the order is placed.
      </p>

      <hr />

      <form
        onSubmit={(event) => {
          event.preventDefault();
          event.stopPropagation();
          form.handleSubmit();
        }}
      >
        <CheckoutPaymentCard form={form} />

        <br />

        <button
          type="submit"
          disabled={
            placeOrderMutation.isPending ||
            clearCartMutation.isPending
          }
        >
          {placeOrderMutation.isPending
            ? "Placing Order..."
            : "Place Order"}
        </button>
      </form>

      {placeOrderMutation.isError && (
        <p>
          <strong>Error:</strong>{" "}
          {getErrorMessage(
            placeOrderMutation.error,
          )}
        </p>
      )}

      {clearCartMutation.isError && (
        <p>
          The order was placed, but the shopping cart
          could not be cleared automatically.
        </p>
      )}
    </main>
  );
};

export default CheckoutPage;
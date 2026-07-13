import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";

import { cartQueryOptions } from "../../queries";

import {
  useClearCartMutation,
  useRemoveCartItemMutation,
  useUpdateCartItemMutation,
} from "../../mutations";

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
    "Unable to update the shopping cart."
  );
};

const ShoppingCartPage = () => {
  const cartQuery = useQuery(cartQueryOptions());

  const updateCartItemMutation =
    useUpdateCartItemMutation();

  const removeCartItemMutation =
    useRemoveCartItemMutation();

  const clearCartMutation = useClearCartMutation();

  if (cartQuery.isLoading) {
    return <p>Loading shopping cart...</p>;
  }

  if (cartQuery.isError) {
    return (
      <main>
        <h1>Shopping Cart</h1>

        <p>
          Error loading cart:{" "}
          {getErrorMessage(cartQuery.error)}
        </p>
      </main>
    );
  }

  const cartItems = cartQuery.data ?? [];

  const cartTotal = cartItems.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0,
  );

  const mutationError =
    updateCartItemMutation.error ??
    removeCartItemMutation.error ??
    clearCartMutation.error;

  if (cartItems.length === 0) {
    return (
      <main>
        <h1>Shopping Cart</h1>

        <p>Your cart is empty.</p>

        <Link to="/products">
          Continue Shopping
        </Link>
      </main>
    );
  }

  return (
    <main>
      <h1>Shopping Cart</h1>

      <table>
        <thead>
          <tr>
            <th>Image</th>
            <th>Product</th>
            <th>Colour</th>
            <th>Size</th>
            <th>SKU</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Subtotal</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {cartItems.map((item) => (
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

              <td>
                <Link
                  to="/products/$listingId"
                  params={{
                    listingId: item.listingId,
                  }}
                >
                  <strong>{item.name}</strong>
                </Link>

                <br />

                {item.description}
              </td>

              <td>{item.colorName}</td>
              <td>{item.size}</td>
              <td>{item.sku}</td>
              <td>${item.price.toFixed(2)}</td>

              <td>
                <input
                  key={`${item.id}-${item.quantity}`}
                  type="number"
                  min={1}
                  defaultValue={item.quantity}
                  disabled={
                    updateCartItemMutation.isPending
                  }
                  aria-label={`Quantity for ${item.name}`}
                  onBlur={(event) => {
                    const input = event.currentTarget;
                    const nextQuantity = Number(input.value);

                    if (
                      !Number.isInteger(nextQuantity) ||
                      nextQuantity < 1
                    ) {
                      input.value =
                        String(item.quantity);

                      return;
                    }

                    if (
                      nextQuantity === item.quantity
                    ) {
                      return;
                    }

                    updateCartItemMutation.mutate(
                      {
                        productId: item.productId,
                        size: item.size,
                        quantity: nextQuantity,
                      },
                      {
                        onError: () => {
                          input.value =
                            String(item.quantity);
                        },
                      },
                    );
                  }}
                />
              </td>

              <td>
                $
                {(
                  item.price * item.quantity
                ).toFixed(2)}
              </td>

              <td>
                <button
                  type="button"
                  disabled={
                    removeCartItemMutation.isPending
                  }
                  onClick={() =>
                    removeCartItemMutation.mutate({
                      productId: item.productId,
                      size: item.size,
                    })
                  }
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <p>
        <strong>
          Cart Total: ${cartTotal.toFixed(2)}
        </strong>
      </p>

      <p>
        Product availability and final prices will be
        validated when the order is placed.
      </p>

      {mutationError && (
        <p>
          <strong>Error:</strong>{" "}
          {getErrorMessage(mutationError)}
        </p>
      )}

      <Link to="/products">
        Continue Shopping
      </Link>

      <br />
      <br />

      <Link to="/checkout">
        Proceed to Checkout
      </Link>

      <br />
      <br />

      <button
        type="button"
        disabled={clearCartMutation.isPending}
        onClick={() => {
          const shouldClear = window.confirm(
            "Are you sure you want to clear your cart?",
          );

          if (shouldClear) {
            clearCartMutation.mutate();
          }
        }}
      >
        {clearCartMutation.isPending
          ? "Clearing..."
          : "Clear Cart"}
      </button>
    </main>
  );
};

export default ShoppingCartPage;
import { Link } from '@tanstack/react-router';
import { useForm } from '@tanstack/react-form';
import { useCreateOrderMutation } from '../../mutations';

import { PaymentMethod, type CheckoutFormValues } from '../../models/Checkout';

import type { PlaceOrderRequest } from '../../models/Order';

import CheckoutItemSummaryCard from './CheckoutItemSummaryCard';
import CheckoutPaymentCard from './CheckoutPaymentCard';
import { Box, Button, Typography } from '@mui/material';
import { useCart } from '../../hooks/useCart.ts';

const TEMP_USER_ID = '8ecf8276-e555-41cc-b2ba-e42353dc72b4';

const getErrorMessage = (error: unknown) => {
  const possibleApiError = error as {
    response?: {
      data?: {
        error?: string;
      };
    };
  };

  return possibleApiError.response?.data?.error ?? 'Unable to place order.';
};

const CheckoutPage = () => {
  const cartQuery = useCart();

  const checkoutItems = cartQuery.data ?? [];

  const { mutate, isPending, isError, error } = useCreateOrderMutation();

  const form = useForm({
    defaultValues: {
      userId: TEMP_USER_ID,
      paymentMethod: PaymentMethod.CreditCard,
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      paypalEmail: '',
    } as CheckoutFormValues,

    onSubmit: async ({ value }) => {
      if (checkoutItems.length === 0) {
        return;
      }

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
          productId: item.productId,
          size: item.size,
          quantity: item.quantity,
        })),

        paymentDetails,
      };

      mutate(orderRequest);
    },
  });

  if (cartQuery.isLoading) {
    return <p>Loading checkout...</p>;
  }

  if (cartQuery.isError) {
    return (
      <Box>
        <Typography variant={'h1'}>Checkout</Typography>
        <Typography>Error loading cart: {getErrorMessage(cartQuery.error)}</Typography>
      </Box>
    );
  }

  if (checkoutItems.length === 0) {
    return (
      <Box>
        <Typography variant={'h1'}>Checkout</Typography>
        <Typography>Your shopping cart is empty.</Typography>
        <Link to="/products">Continue Shopping</Link>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant={'h1'}>Checkout</Typography>
      <CheckoutItemSummaryCard checkoutItems={checkoutItems} />
      <Typography>
        Product availability and final prices will be checked by the server when the order is
        placed.
      </Typography>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          event.stopPropagation();
          form.handleSubmit();
        }}
      >
        <CheckoutPaymentCard form={form} />
        <Button type="submit" disabled={isPending}>
          {isPending ? 'Placing Order...' : 'Place Order'}
        </Button>
      </form>

      {isError && (
        <Typography>
          <strong>Error:</strong> {getErrorMessage(error)}
        </Typography>
      )}
    </Box>
  );
};

export default CheckoutPage;

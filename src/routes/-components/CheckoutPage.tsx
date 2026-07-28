import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { useForm } from '@tanstack/react-form';
import { useQuery } from '@tanstack/react-query';

import { currentUserQueryOptions } from '../../queries';
import { useCreateOrderMutation } from '../../mutations';
import { useCart } from '../../hooks/useCart.ts';

import { PaymentMethod, type CheckoutFormValues } from '../../models/Checkout';

import type { PlaceOrderRequest } from '../../models/Order';

import CheckoutItemSummaryCard from './CheckoutItemSummaryCard';
import CheckoutPaymentCard from './CheckoutPaymentCard';
import LoanCalculator from './LoanCalculator';

import {
  Alert,
  Box,
  Button,
  Divider,
  TextField,
  Typography,
} from '@mui/material';

const PRODUCTS_SEARCH_DEFAULTS = {
  keyword: '',
  pageNumber: 0,
  pageSize: 10,
  department: '' as never,
  category: '' as never,
  deals: false,
};

const getErrorMessage = (error: unknown) => {
  const possibleApiError = error as {
    response?: {
      data?: {
        error?: string;
        message?: string;
      };
    };
  };

  return (
    possibleApiError.response?.data?.message ??
    possibleApiError.response?.data?.error ??
    'Unable to place order.'
  );
};

const CheckoutPage = () => {
  const cartQuery = useCart();

  const userQuery = useQuery(currentUserQueryOptions());

  const checkoutItems = cartQuery.data ?? [];

  const availablePoints = userQuery.data?.storePoints ?? 0;

  const orderTotal = checkoutItems.reduce((total, item) => {
    const discount = item.discountPercentage ?? 0;

    const unitPrice = discount > 0 ? item.price * (1 - discount / 100) : item.price;

    return total + unitPrice * item.quantity;
  }, 0);

  const { mutate, isPending, isError, error } = useCreateOrderMutation();
  const [installmentCount, setInstallmentCount] = useState(0);

  const form = useForm({
    defaultValues: {
      paymentMethod: PaymentMethod.CreditCard,
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      paypalEmail: '',
      storePoints: 0,
      installments: 0,
      fullName: '',
      address: '',
      city: '',
      province: '',
      postalCode: '',
      country: '',
    } as CheckoutFormValues,

    onSubmit: async ({ value }) => {
      if (checkoutItems.length === 0 || !userQuery.data) {
        return;
      }

      const paymentDetails =
        value.paymentMethod === PaymentMethod.CreditCard
          ? {
              paymentMethod: value.paymentMethod,
              cardNumber: value.cardNumber,
              expiryDate: value.expiryDate,
              cvv: value.cvv,
              storePoints: value.storePoints,
              installments: value.installments || undefined,
            }
          : {
              paymentMethod: value.paymentMethod,
              paypalEmail: value.paypalEmail,
              storePoints: value.storePoints,
              installments: value.installments || undefined,
            };

      const orderRequest: PlaceOrderRequest = {
        userId: userQuery.data.id,

        orderItems: checkoutItems.map((item) => ({
          productId: item.productId,
          size: item.size,
          quantity: item.quantity,
        })),

        paymentDetails,

        shippingDetails: {
          fullName: value.fullName,
          address: value.address,
          city: value.city,
          province: value.province,
          postalCode: value.postalCode,
          country: value.country,
        },
      };

      mutate(orderRequest);
    },
  });

if (cartQuery.isLoading || userQuery.isLoading) {
    return (
      <Box sx={{ maxWidth: 800, mx: 'auto', px: 3, py: 5 }}>
        <Typography>Loading checkout...</Typography>
      </Box>
    );
  }

  if (cartQuery.isError) {
    return (
      <Box sx={{ maxWidth: 800, mx: 'auto', px: 3, py: 5 }}>
        <Typography variant="h1" sx={{ mb: 3 }}>
          Checkout
        </Typography>

        <Alert severity="error">
          Error loading cart: {getErrorMessage(cartQuery.error)}
        </Alert>
      </Box>
    );
  }

  if (userQuery.isError) {
    return (
      <Box sx={{ maxWidth: 800, mx: 'auto', px: 3, py: 5 }}>
        <Typography variant="h1" sx={{ mb: 3 }}>
          Checkout
        </Typography>

        <Alert severity="error">
          Error loading your account: {getErrorMessage(userQuery.error)}
        </Alert>
      </Box>
    );
  }

  if (checkoutItems.length === 0) {
    return (
      <Box sx={{ maxWidth: 800, mx: 'auto', px: 3, py: 5 }}>
        <Typography variant="h1" sx={{ mb: 2 }}>
          Checkout
        </Typography>

        <Typography sx={{ mb: 3 }}>Your shopping cart is empty.</Typography>

        <Link
          to="/products"
          search={PRODUCTS_SEARCH_DEFAULTS}
          style={{ textDecoration: 'none' }}
        >
          <Button variant="contained">Continue Shopping</Button>
        </Link>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', px: 3, py: 5 }}>
      <Typography variant="h1" sx={{ mb: 3 }}>
        Checkout
      </Typography>

      <CheckoutItemSummaryCard checkoutItems={checkoutItems} />

      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
        Availability and final prices are confirmed by the server when the order is placed.
      </Typography>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          event.stopPropagation();
          form.handleSubmit();
        }}
      >
        <Divider sx={{ my: 4 }} />

        <Typography variant="h3" sx={{ mb: 2 }}>
          Shipping Details
        </Typography>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
            gap: 2,
          }}
        >
          <form.Field name="fullName">
            {(field) => (
              <TextField
                label="Full Name"
                value={field.state.value}
                onChange={(event) => field.handleChange(event.target.value)}
                required
                fullWidth
              />
            )}
          </form.Field>

          <form.Field name="address">
            {(field) => (
              <TextField
                label="Address"
                value={field.state.value}
                onChange={(event) => field.handleChange(event.target.value)}
                required
                fullWidth
              />
            )}
          </form.Field>

          <form.Field name="city">
            {(field) => (
              <TextField
                label="City"
                value={field.state.value}
                onChange={(event) => field.handleChange(event.target.value)}
                required
                fullWidth
              />
            )}
          </form.Field>

          <form.Field name="province">
            {(field) => (
              <TextField
                label="Province"
                value={field.state.value}
                onChange={(event) => field.handleChange(event.target.value)}
                required
                fullWidth
              />
            )}
          </form.Field>

          <form.Field name="postalCode">
            {(field) => (
              <TextField
                label="Postal Code"
                value={field.state.value}
                onChange={(event) => field.handleChange(event.target.value)}
                required
                fullWidth
              />
            )}
          </form.Field>

          <form.Field name="country">
            {(field) => (
              <TextField
                label="Country"
                value={field.state.value}
                onChange={(event) => field.handleChange(event.target.value)}
                required
                fullWidth
              />
            )}
          </form.Field>
        </Box>

        <Divider sx={{ my: 4 }} />

        <CheckoutPaymentCard form={form} />

        <Divider sx={{ my: 4 }} />

        <Typography variant="h3" sx={{ mb: 1 }}>
          Store Points
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          You have {availablePoints} points available. Points are applied as a
          discount on this order.
        </Typography>

        <form.Field name="storePoints">
          {(field) => (
            <TextField
              label="Points to use"
              type="number"
              value={field.state.value}
              disabled={availablePoints === 0 || installmentCount > 0}
              helperText={
                installmentCount > 0
                  ? 'Points cannot be used with installments'
                  : undefined
              }
              onChange={(event) => {
                const requested = Number(event.target.value);

                if (!Number.isInteger(requested) || requested < 0) {
                  return;
                }

                field.handleChange(Math.min(requested, availablePoints));
              }}
              sx={{ width: 200 }}
            />
          )}
        </form.Field>

        <form.Field name="installments">
          {(field) => (
            <LoanCalculator
              orderTotal={orderTotal}
              onChange={(installments) => {
                field.handleChange(installments);
                setInstallmentCount(installments);

                if (installments > 0) {
                  form.setFieldValue('storePoints', 0);
                }
              }}
            />
          )}
        </form.Field>
        
        <Divider sx={{ my: 4 }} />

        <Button
          type="submit"
          variant="contained"
          size="large"
          disabled={isPending}
          sx={{ px: 5, py: 1.5 }}
        >
          {isPending ? 'Placing Order...' : 'Place Order'}
        </Button>

        {isError && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {getErrorMessage(error)}
          </Alert>
        )}
      </form>
    </Box>
  );
};

export default CheckoutPage;
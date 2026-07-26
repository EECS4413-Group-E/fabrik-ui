import { Link } from '@tanstack/react-router';
import { Alert, Box, Button, Divider, IconButton, TextField, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CloseIcon from '@mui/icons-material/Close';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';

import {
  useClearCartMutation,
  useRemoveCartItemMutation,
  useUpdateCartItemMutation,
} from '../../mutations';
import { useCart } from '../../hooks/useCart.ts';
import { useState } from 'react';
import ConfirmationDialog from './ConfirmationDialog.tsx';

const getErrorMessage = (error: unknown) => {
  const possibleApiError = error as {
    response?: {
      data?: {
        error?: string;
      };
    };
  };

  return possibleApiError.response?.data?.error ?? 'Unable to update the shopping cart.';
};

const ShoppingCartPage = () => {
  const { data, isLoading, isError, error } = useCart();

  const [openClearDialog, setOpenClearDialog] = useState<boolean>(false);

  const updateCartItemMutation = useUpdateCartItemMutation();
  const removeCartItemMutation = useRemoveCartItemMutation();
  const clearCartMutation = useClearCartMutation();

  const pageHeader = (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 2,
      }}
    >
      <Typography variant="h1">Shopping Cart</Typography>

      <Button component={Link} to="/products" startIcon={<ArrowBackIcon />} sx={{ mt: 1 }}>
        Continue Shopping
      </Button>
    </Box>
  );

  if (isLoading) {
    return (
      <Box sx={{ maxWidth: 1100, mx: 'auto', px: 3, py: 5 }}>
        {pageHeader}
        <Typography sx={{ mt: 4 }}>Loading shopping cart...</Typography>
      </Box>
    );
  }

  if (isError) {
    return (
      <Box sx={{ maxWidth: 1100, mx: 'auto', px: 3, py: 5 }}>
        {pageHeader}

        <Alert severity="error" sx={{ mt: 4 }}>
          Error loading cart: {getErrorMessage(error)}
        </Alert>
      </Box>
    );
  }

  const cartItems = data ?? [];

  const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const mutationError =
    updateCartItemMutation.error ?? removeCartItemMutation.error ?? clearCartMutation.error;

  if (cartItems.length === 0) {
    return (
      <Box sx={{ maxWidth: 1100, mx: 'auto', px: 3, py: 5 }}>
        {pageHeader}

        <Divider sx={{ mt: 3 }} />

        <Box sx={{ textAlign: 'center', py: 10 }}>
          <ShoppingBagOutlinedIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />

          <Typography variant="h3" sx={{ mb: 1 }}>
            Your cart is empty
          </Typography>

          <Typography color="text.secondary" sx={{ mb: 3 }}>
            Add something you love and it will show up here.
          </Typography>

          <Button component={Link} to="/products" variant="contained">
            Browse Collection
          </Button>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 1100, mx: 'auto', px: 3, py: 5 }}>
      {pageHeader}

      <Typography color="text.secondary" sx={{ mt: 0.5 }}>
        {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart
      </Typography>

      <Divider sx={{ mt: 3, mb: 1 }} />

      {mutationError && (
        <Alert severity="error" sx={{ my: 2 }}>
          {getErrorMessage(mutationError)}
        </Alert>
      )}

      {cartItems.map((item) => (
        <Box key={`${item.productId}-${item.size}`}>
          <Box
            sx={{
              display: 'flex',
              gap: 3,
              py: 3,
              alignItems: 'flex-start',
              flexWrap: { xs: 'wrap', sm: 'nowrap' },
            }}
          >
            <Link
              to="/products/$listingId"
              params={{ listingId: item.listingId }}
              style={{ flexShrink: 0 }}
            >
              {item.imageLink ? (
                <Box
                  component="img"
                  src={item.imageLink}
                  alt={item.name}
                  sx={{
                    width: 120,
                    height: 150,
                    objectFit: 'cover',
                    display: 'block',
                  }}
                />
              ) : (
                <Box
                  sx={{
                    width: 120,
                    height: 150,
                    bgcolor: 'background.paper',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    No image
                  </Typography>
                </Box>
              )}
            </Link>

            <Box sx={{ flexGrow: 1, minWidth: 200 }}>
              <Link
                to="/products/$listingId"
                params={{ listingId: item.listingId }}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <Typography sx={{ fontWeight: 500 }}>{item.name}</Typography>
              </Link>

              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                {item.colorName} &nbsp;·&nbsp; Size {item.size}
              </Typography>

              <Typography variant="body2" color="text.secondary">
                SKU {item.sku}
              </Typography>

              <Typography sx={{ mt: 1 }}>${item.price.toFixed(2)}</Typography>
            </Box>

            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 3,
                ml: 'auto',
              }}
            >
              <TextField
                defaultValue={item.quantity}
                disabled={updateCartItemMutation.isPending}
                label="Qty"
                sx={{ width: 90 }}
                onBlur={(event) => {
                  const input = event.currentTarget;
                  const nextQuantity = Number(input.value);

                  if (!Number.isInteger(nextQuantity) || nextQuantity < 1) {
                    input.value = String(item.quantity);

                    return;
                  }

                  if (nextQuantity === item.quantity) {
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
                        input.value = String(item.quantity);
                      },
                    },
                  );
                }}
              />

              <Typography sx={{ minWidth: 80, textAlign: 'right', fontWeight: 500 }}>
                ${(item.price * item.quantity).toFixed(2)}
              </Typography>

              <IconButton
                aria-label={`Remove ${item.name}`}
                disabled={removeCartItemMutation.isPending}
                onClick={() =>
                  removeCartItemMutation.mutate({
                    productId: item.productId,
                    size: item.size,
                  })
                }
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </Box>
          </Box>

          <Divider />
        </Box>
      ))}

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          py: 3,
        }}
      >
        <Button
          color="inherit"
          disabled={clearCartMutation.isPending}
          onClick={() => {
            setOpenClearDialog(true);
          }}
        >
          {clearCartMutation.isPending ? 'Clearing...' : 'Clear Cart'}
        </Button>

        <Box sx={{ textAlign: 'right' }}>
          <Typography variant="h3">Total ${cartTotal.toFixed(2)}</Typography>

          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            Availability and final prices are confirmed at checkout.
          </Typography>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          component={Link}
          to="/checkout"
          variant="contained"
          size="large"
          sx={{ px: 5, py: 1.5 }}
        >
          Proceed to Checkout
        </Button>
      </Box>
      <ConfirmationDialog
        open={openClearDialog}
        onClose={() => setOpenClearDialog(false)}
        onConfirm={() => {
          clearCartMutation.mutate();
          setOpenClearDialog(false);
        }}
        message="Are you sure you want to clear your cart?"
      />
    </Box>
  );
};

export default ShoppingCartPage;

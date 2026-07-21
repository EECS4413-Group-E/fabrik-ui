import { Link } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import type { GridColDef } from '@mui/x-data-grid';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, Typography, Alert, TextField } from '@mui/material';

import { cartQueryOptions } from '../../queries';

import {
  useClearCartMutation,
  useRemoveCartItemMutation,
  useUpdateCartItemMutation,
} from '../../mutations';

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
  const cartQuery = useQuery(cartQueryOptions());

  const updateCartItemMutation = useUpdateCartItemMutation();

  const removeCartItemMutation = useRemoveCartItemMutation();

  const clearCartMutation = useClearCartMutation();

  if (cartQuery.isLoading) {
    return <Typography>Loading shopping cart...</Typography>;
  }

  if (cartQuery.isError) {
    return (
      <Box>
        <Typography variant="h4" sx={{ mb: 2 }}>
          Shopping Cart
        </Typography>

        <Alert severity="error">Error loading cart: {getErrorMessage(cartQuery.error)}</Alert>
      </Box>
    );
  }

  const cartItems = cartQuery.data ?? [];

  const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const mutationError =
    updateCartItemMutation.error ?? removeCartItemMutation.error ?? clearCartMutation.error;

  if (cartItems.length === 0) {
    return (
      <Box>
        <Typography variant="h4" sx={{ mb: 2 }}>
          Shopping Cart
        </Typography>

        <Typography sx={{ mb: 3 }}>Your cart is empty.</Typography>

        <Link to="/products">
          <Button variant="contained">Continue Shopping</Button>
        </Link>
      </Box>
    );
  }

  const columns: GridColDef[] = [
    {
      field: 'imageLink',
      headerName: 'Image',
      width: 100,
      sortable: false,
      filterable: false,
      renderCell: (params) =>
        params.row.imageLink ? (
          <img
            src={params.row.imageLink}
            alt={params.row.name}
            width={80}
            style={{ maxHeight: '80px', objectFit: 'contain' }}
          />
        ) : (
          'No image'
        ),
    },
    {
      field: 'name',
      headerName: 'Product',
      width: 200,
      sortable: false,
      renderCell: (params) => (
        <Box>
          <Link
            to="/products/$listingId"
            params={{
              listingId: params.row.listingId,
            }}
          >
            <Typography
              sx={{
                fontWeight: 'bold',
                color: 'primary.main',
                textDecoration: 'none',
                '&:hover': {
                  textDecoration: 'underline',
                },
              }}
            >
              {params.row.name}
            </Typography>
          </Link>
          <Typography variant="body2" sx={{ mt: 0.5 }}>
            {params.row.description}
          </Typography>
        </Box>
      ),
    },
    {
      field: 'colorName',
      headerName: 'Colour',
      width: 100,
    },
    {
      field: 'size',
      headerName: 'Size',
      width: 80,
    },
    {
      field: 'sku',
      headerName: 'SKU',
      width: 100,
    },
    {
      field: 'price',
      headerName: 'Price',
      width: 100,
      renderCell: (params) => `$${params.row.price.toFixed(2)}`,
    },
    {
      field: 'quantity',
      headerName: 'Quantity',
      width: 120,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <TextField
          defaultValue={params.row.quantity}
          disabled={updateCartItemMutation.isPending}
          label={`Quantity for ${params.row.name}`}
          style={{
            padding: '8px',
            borderRadius: '4px',
            border: '1px solid #ccc',
            fontSize: '14px',
          }}
          onBlur={(event) => {
            const input = event.currentTarget;
            const nextQuantity = Number(input.value);

            if (!Number.isInteger(nextQuantity) || nextQuantity < 1) {
              input.value = String(params.row.quantity);

              return;
            }

            if (nextQuantity === params.row.quantity) {
              return;
            }

            updateCartItemMutation.mutate(
              {
                productId: params.row.productId,
                size: params.row.size,
                quantity: nextQuantity,
              },
              {
                onError: () => {
                  input.value = String(params.row.quantity);
                },
              },
            );
          }}
        />
      ),
    },
    {
      field: 'subtotal',
      headerName: 'Subtotal',
      width: 100,
      sortable: false,
      filterable: false,
      renderCell: (params) => `$${(params.row.price * params.row.quantity).toFixed(2)}`,
    },
    {
      field: 'actions',
      headerName: 'Action',
      width: 120,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Button
          size="small"
          variant="contained"
          color="error"
          disabled={removeCartItemMutation.isPending}
          onClick={() =>
            removeCartItemMutation.mutate({
              productId: params.row.productId,
              size: params.row.size,
            })
          }
        >
          Remove
        </Button>
      ),
    },
  ];

  return (
    <Box sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Shopping Cart
      </Typography>

      <DataGrid
        rows={cartItems}
        columns={columns}
        pageSizeOptions={[5, 10, 25]}
        disableRowSelectionOnClick
        sx={{
          border: '1px solid #ddd',
          '& .MuiDataGrid-cell': {
            display: 'flex',
            alignItems: 'center',
          },
          mb: 3,
        }}
      />

      <Box sx={{ mb: 2 }}>
        <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 1 }}>
          Cart Total: ${cartTotal.toFixed(2)}
        </Typography>

        <Typography variant="body2" sx={{ mb: 2 }}>
          Product availability and final prices will be validated when the order is placed.
        </Typography>

        {mutationError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            <strong>Error:</strong> {getErrorMessage(mutationError)}
          </Alert>
        )}
      </Box>

      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <Link to="/products">
          <Button variant="outlined">Continue Shopping</Button>
        </Link>

        <Link to="/checkout">
          <Button variant="contained">Proceed to Checkout</Button>
        </Link>

        <Button
          variant="contained"
          color="error"
          disabled={clearCartMutation.isPending}
          onClick={() => {
            const shouldClear = window.confirm('Are you sure you want to clear your cart?');

            if (shouldClear) {
              clearCartMutation.mutate();
            }
          }}
        >
          {clearCartMutation.isPending ? 'Clearing...' : 'Clear Cart'}
        </Button>
      </Box>
    </Box>
  );
};

export default ShoppingCartPage;

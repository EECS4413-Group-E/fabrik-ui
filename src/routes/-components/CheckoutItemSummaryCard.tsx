import type { CartItem } from '../../models/CartItem';
import type { GridColDef } from '@mui/x-data-grid';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Typography } from '@mui/material';

interface CheckoutItemSummaryCardProps {
  checkoutItems: CartItem[];
}

const CheckoutItemSummaryCard = ({ checkoutItems }: CheckoutItemSummaryCardProps) => {
  const getDiscountedPrice = (price: number, discountPercentage?: number) => {
    const discount = discountPercentage ?? 0;

    return discount > 0 ? price * (1 - discount / 100) : price;
  };

  const orderTotal = checkoutItems.reduce(
    (total, item) =>
      total + item.quantity * getDiscountedPrice(item.price, item.discountPercentage),
    0,
  );

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
      width: 150,
    },
    {
      field: 'description',
      headerName: 'Description',
      width: 150,
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
      field: 'quantity',
      headerName: 'Quantity',
      width: 100,
      type: 'number',
    },
    {
      field: 'price',
      headerName: 'Price',
      width: 140,
      renderCell: (params) => {
        const discount = params.row.discountPercentage ?? 0;

        if (discount === 0) {
          return `$${params.row.price.toFixed(2)}`;
        }

        return (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="body2" sx={{ color: 'primary.main', fontWeight: 500 }}>
              ${getDiscountedPrice(params.row.price, discount).toFixed(2)}
            </Typography>

            <Typography
              variant="body2"
              sx={{ color: 'text.secondary', textDecoration: 'line-through' }}
            >
              ${params.row.price.toFixed(2)}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: 'subtotal',
      headerName: 'Subtotal',
      width: 100,
      sortable: false,
      filterable: false,
      renderCell: (params) =>
        `$${(
          params.row.quantity *
          getDiscountedPrice(params.row.price, params.row.discountPercentage)
        ).toFixed(2)}`,
    },
  ];

  return (
    <Box component="section" sx={{ p: 2 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Order Summary
      </Typography>

      <DataGrid
        rows={checkoutItems}
        columns={columns}
        pageSizeOptions={[5, 10, 25]}
        disableRowSelectionOnClick
        sx={{
          border: '1px solid #ddd',
          '& .MuiDataGrid-cell': {
            display: 'flex',
            alignItems: 'center',
          },
        }}
      />

      <Box sx={{ mt: 2 }}>
        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
          Total: ${orderTotal.toFixed(2)}
        </Typography>
      </Box>
    </Box>
  );
};

export default CheckoutItemSummaryCard;

import type { CartItem } from '../../models/CartItem';
import type { GridColDef } from '@mui/x-data-grid';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Typography } from '@mui/material';

interface CheckoutItemSummaryCardProps {
  checkoutItems: CartItem[];
}

const CheckoutItemSummaryCard = ({ checkoutItems }: CheckoutItemSummaryCardProps) => {
  const orderTotal = checkoutItems.reduce((total, item) => total + item.quantity * item.price, 0);

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
      width: 100,
      renderCell: (params) => `$${params.row.price.toFixed(2)}`,
    },
    {
      field: 'subtotal',
      headerName: 'Subtotal',
      width: 100,
      sortable: false,
      filterable: false,
      renderCell: (params) => `$${(params.row.quantity * params.row.price).toFixed(2)}`,
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

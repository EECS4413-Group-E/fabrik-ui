import type { OrderItem } from '../../../models/Order.ts';
import type { GridColDef } from '@mui/x-data-grid';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Typography } from '@mui/material';

type OrderItemSummaryProps = {
  orderItems: OrderItem[];
};

const OrderItemSummary = ({ orderItems }: OrderItemSummaryProps) => {
  const orderTotal = orderItems.reduce((total, item) => total + item.quantity * item.price, 0);

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Product',
      width: 200,
    },
    {
      field: 'colorName',
      headerName: 'Color',
      width: 120,
    },
    {
      field: 'size',
      headerName: 'Size',
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
      width: 120,
      renderCell: (params) => `$${params.row.price.toFixed(2)}`,
    },
    {
      field: 'subtotal',
      headerName: 'Subtotal',
      width: 120,
      sortable: false,
      filterable: false,
      renderCell: (params) => `$${(params.row.quantity * params.row.price).toFixed(2)}`,
    },
  ];

  return (
    <Box
      component="section"
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}
    >
      <Typography variant="h5">Order Summary</Typography>

      <Box sx={{ width: '100%', maxWidth: '900px' }}>
        <DataGrid
          rows={orderItems}
          columns={columns}
          pageSizeOptions={[5, 10, 25]}
          disableRowSelectionOnClick
          sx={{
            border: '1px solid #ddd',
          }}
        />
      </Box>

      <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
        Total: ${orderTotal.toFixed(2)}
      </Typography>
    </Box>
  );
};

export default OrderItemSummary;

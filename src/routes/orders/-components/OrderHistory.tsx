import { useSuspenseQuery } from '@tanstack/react-query';
import type { GridColDef } from '@mui/x-data-grid';
import { DataGrid } from '@mui/x-data-grid';
import { Link } from '@tanstack/react-router';
import { Box, Button } from '@mui/material';
import { ordersQueryOptions } from '../../../queries.ts';

const OrderHistory = () => {
  const { data: orders } = useSuspenseQuery(ordersQueryOptions());

  const columns: GridColDef[] = [
    {
      field: 'orderNumber',
      headerName: 'Order Number',
      width: 150,
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 150,
      renderCell: (params) => params.row.shippingDetails.shippingStatus,
    },
    {
      field: 'totalPrice',
      headerName: 'Price',
      width: 120,
      renderCell: (params) => `$${params.row.totalPrice.toFixed(2)}`,
    },
    {
      field: 'actions',
      headerName: 'Action',
      width: 150,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Link to={'/orders/$orderId'} params={{ orderId: params.row.id }}>
          <Button variant="contained" size="small">
            Details
          </Button>
        </Link>
      ),
    },
  ];

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
      <Box sx={{ width: '100%', maxWidth: '800px' }}>
        <DataGrid
          rows={orders}
          columns={columns}
          pageSizeOptions={[5, 10, 25]}
          disableRowSelectionOnClick
          sx={{
            border: '1px solid #ddd',
          }}
        />
      </Box>
    </Box>
  );
};

export default OrderHistory;

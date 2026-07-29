import type { Order } from '../../../models/Order.ts';
import type { GridColDef } from '@mui/x-data-grid';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Divider, Typography } from '@mui/material';
import PriceRow from '../../-components/PriceRow.tsx';

type OrderItemSummaryProps = {
  order: Order;
};

const OrderItemSummary = ({ order }: OrderItemSummaryProps) => {
  const { items, paymentDetails } = order;
  const orderTotal =
    paymentDetails.completedPayments.reduce((total, payment) => total + payment.amount, 0) +
    paymentDetails.scheduledPayments.reduce((total, payment) => total + payment.amount, 0);
  const pointsAmount = paymentDetails.completedPayments.reduce(
    (total, payment) => total + payment.usedStorePoints,
    0,
  ) * 0.05;
  const amountPayed = orderTotal - pointsAmount;

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
          rows={items}
          columns={columns}
          pageSizeOptions={[5, 10, 25]}
          disableRowSelectionOnClick
          sx={{
            border: '1px solid #ddd',
          }}
        />
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', gap: 1 }}>
        {paymentDetails.completedPayments[0].totalInstallments > 1 && (
          <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', gap: 1 }}>
            <Typography>Completed Payment</Typography>
            <PriceRow
              label={'Installment 1:'}
              value={paymentDetails.completedPayments[0]?.amount || 0}
            />
            <Divider />
            <Typography>Scheduled Payments</Typography>
            {paymentDetails.scheduledPayments.map((payment, index) => (
              <PriceRow key={index} label={`Installment ${index + 2}:`} value={payment.amount} />
            ))}
            <Divider />
          </Box>
        )}
        <PriceRow label="Total:" value={orderTotal} />
        {pointsAmount > 0 && <PriceRow label="Points Amount:" value={pointsAmount} />}
        {pointsAmount > 0 && <PriceRow label="Amount Payed:" value={amountPayed} />}
      </Box>
    </Box>
  );
};

export default OrderItemSummary;

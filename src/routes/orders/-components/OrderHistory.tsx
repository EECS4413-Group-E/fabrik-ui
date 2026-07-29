import { useSuspenseQuery } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';
import OrderHistoryCard from './OrderHistoryCard.tsx';

import {
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  Typography,
} from '@mui/material';

import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';

import { ordersQueryOptions } from '../../../queries.ts';
import { fabrikColors } from '../../../theme.ts';





const OrderHistory = () => {
  const { data: orders } = useSuspenseQuery( ordersQueryOptions());
  const sortedOrders = [...orders].sort(
    (firstOrder, secondOrder) =>
      new Date(secondOrder.createdDate).getTime() -
      new Date(firstOrder.createdDate).getTime(),
  );

  return (
    <Box
      component="main"
      sx={{
        minHeight: '100vh',
        backgroundColor: 'background.default',
        px: { xs: 2, sm: 3, md: 4 },
        py: { xs: 4, md: 6 },
      }}
    >
      <Box sx={{ maxWidth: 1100, mx: 'auto' }}>
        <Stack spacing={1} sx={{ mb: { xs: 4, md: 5 } }}>
          <Typography component="h1" variant="h1">
            My Orders
          </Typography>

          <Typography color="text.secondary">
            Review your previous purchases and check their
            delivery status.
          </Typography>
        </Stack>

        {sortedOrders.length === 0 ? (
          <EmptyOrders />
        ) : (
          <Stack spacing={3}>
            {sortedOrders.map((order) => (
              <OrderHistoryCard
                key={order.id}
                order={order}
              />
            ))}
          </Stack>
        )}
      </Box>
    </Box>
  );
};

const EmptyOrders = () => (
  <Card>
    <CardContent
      sx={{
        py: { xs: 6, md: 8 },
        textAlign: 'center',
      }}
    >
      <Inventory2OutlinedIcon
        sx={{
          fontSize: 56,
          color: fabrikColors.terracottaDark,
          mb: 2,
        }}
      />

      <Typography variant="h3" component="h2">
        No orders yet
      </Typography>

      <Typography
        color="text.secondary"
        sx={{
          mt: 1,
          maxWidth: 460,
          mx: 'auto',
        }}
      >
        Your completed purchases will appear here once you
        place an order.
      </Typography>

      <Button
        component={Link}
        to="/products"
        variant="contained"
        sx={{ mt: 3 }}
      >
        Start shopping
      </Button>
    </CardContent>
  </Card>
);

export default OrderHistory;